package com.wind.site.command;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TimeZone;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;
import org.htmlparser.Parser;
import org.htmlparser.filters.NodeClassFilter;
import org.htmlparser.tags.LinkTag;
import org.htmlparser.util.NodeIterator;
import org.htmlparser.util.NodeList;
import org.htmlparser.util.ParserException;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.redfin.sitemapgenerator.ChangeFreq;
import com.redfin.sitemapgenerator.W3CDateFormat;
import com.redfin.sitemapgenerator.WebSitemapGenerator;
import com.redfin.sitemapgenerator.WebSitemapUrl;
import com.taobao.api.domain.TaobaokeShop;
import com.wind.core.dao.Page;
import com.wind.site.delay.WindSiteDelay;
import com.wind.site.env.EnvManager;
import com.wind.site.freemarker.method.ModuleMethod;
import com.wind.site.model.Channel;
import com.wind.site.model.Site;
import com.wind.site.model.T_MallBrand;
import com.wind.site.model.T_UserSubscribe;
import com.wind.site.model.UserPage;
import com.wind.site.service.IPageService;
import com.wind.site.util.ExtWebSiteMapUrl;
import com.wind.site.util.TaobaoFetchUtil;
import com.wind.site.util.WindSiteRestUtil;
import com.wind.uc.service.IUCService;

import freemarker.template.Template;

/**
 * 新版本自动发布
 * 
 * @author fxy
 * 
 */
public class AutoDeployPageCommand {
	private static final Logger logger = Logger
			.getLogger(AutoDeployPageCommand.class.getName());
	/**
	 * Freemarker 环境
	 */
	private FreeMarkerConfigurer fcg;
	/**
	 * 新版本
	 */
	private IPageService pageService;
	/**
	 * UC
	 */
	private IUCService ucService;

	private List<String> pings;
	/**
	 * 新版本
	 */
	private ModuleMethod moduleMethod;

	@SuppressWarnings("unchecked")
	public void deployPage() {
		logger.info("Brand updating.....");
		updateMallBrand();// 更新同步品牌库
		// 开始刷新最新的发布时间及超时任务
		String hql = "select new map(up.id as id,up.deployDate as deployDate,up.nick as nick,usb.versionNo as versionNo) from UserPage up,T_UserSubscribe usb where usb.user_id=up.user_id and up.status=:status  and usb.versionNo>0";
		Map<String, Object> _params = new HashMap<String, Object>();
		_params.put("status", true);
		List<Map<String, Object>> pages = (List<Map<String, Object>>) pageService
				.findByHql(hql, _params);
		if (pages != null && pages.size() > 0) {
			for (Map<String, Object> page : pages) {
				if (WindSiteRestUtil.UNVALIDS.contains(String.valueOf(page
						.get("nick")))) {
					continue;
				}
				WindSiteDelay.addPageQueue(String.valueOf(page.get("id")),
						(Date) page.get("deployDate"), WindSiteDelay
								.getDays(Float.valueOf(String.valueOf(page
										.get("versionNo")))), TimeUnit.SECONDS);// 加入超时队列(加入3小时的随机)
			}
		}

		generateSiteMap(pageService.findAllByCriterion(T_UserSubscribe.class,
				R.gt("versionNo", 1.5f)));// 生成返利版站点地图
	}

	private static NodeClassFilter LINK_FILTER = new NodeClassFilter(
			LinkTag.class);
	private Parser parser = new Parser();
	private WebSitemapGenerator wsg = null;
	private static W3CDateFormat dateFormat = new W3CDateFormat(
			W3CDateFormat.Pattern.DAY);
	private static List<String> huabaos = new ArrayList<String>();
	static {
		dateFormat.setTimeZone(TimeZone.getTimeZone("GMT+8"));
		huabaos.add("index");
		huabaos.add("man");
		huabaos.add("lady");
		huabaos.add("fashion");
		huabaos.add("life");
		huabaos.add("baby");
		huabaos.add("idea");
		huabaos.add("tour");
		huabaos.add("star");

	}

	private void updateMallBrand() {
		List<T_MallBrand> brands = pageService.loadAll(T_MallBrand.class);
		if (brands != null && brands.size() > 0) {
			for (T_MallBrand brand : brands) {
				try {
//					List<TaobaokeShop> shops = TaobaoFetchUtil
//							.convertTaobaoShop(null, null, "0", "fxy060608",
//									brand.getSid().toString(), null);
//					if (shops != null && shops.size() == 1) {
						brand.setIsValid(true);
//					} else {
//						brand.setIsValid(false);
//					}
					pageService.update(brand);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}

		}
	}

	/**
	 * 生成SiteMap
	 * 
	 * @param usbs
	 */
	@SuppressWarnings("unchecked")
	public void generateSiteMap(List<T_UserSubscribe> usbs) {
		Set<ExtWebSiteMapUrl> set = null;
		List<Channel> channels = EnvManager.getChannels();// 淘宝频道
		// 查询所有购物日志
		// List<Map<String, Integer>> blogs = (List<Map<String, Integer>>)
		// ucService
		// .findByHql(
		// new Page<Map<String, Integer>>(1, 200),
		// "select new map(blogid as id,classid as cid) from UCBlog b where b.friend=5 order by b.dateline desc",
		// new HashMap<String, Object>());
		List<ExtWebSiteMapUrl> pageUrls = new ArrayList<ExtWebSiteMapUrl>();
		for (T_UserSubscribe usb : usbs) {
			try {
				set = new HashSet<ExtWebSiteMapUrl>();
				Site site = pageService.findByCriterion(Site.class,
						R.eq("user_id", usb.getUser_id()));

				if (site != null && site.getStatus() == 1
						&& StringUtils.isNotEmpty(site.getWww())) {// 如果站点存在，并且已发布，并且绑定了顶级域名
					logger.info("user[" + site.getUser_id()
							+ "] sitemap staring");
					Map<String, Object> params = new HashMap<String, Object>();
					params.put("user_id", usb.getUser_id());
					List<Map<String, Integer>> uidMap = (List<Map<String, Integer>>) pageService
							.findByHql(
									"select new map(uc_id as uid) from User where user_id=:user_id",
									params);
					List<UserPage> pages = pageService.findAllByCriterion(
							UserPage.class, R.eq("user_id", usb.getUser_id()),
							R.eq("status", true), R.eq("isIndex", false));// 所有子页面
					String www = "http://" + site.getWww();
					try {
						wsg = WebSitemapGenerator
								.builder(
										www,
										new File(EnvManager.getUserPath("shop"
												+ site.getUser_id())))
								.dateFormat(dateFormat).autoValidate(true)
								.gzip(true).build();
						ExtWebSiteMapUrl url = new ExtWebSiteMapUrl(
								new WebSitemapUrl.Options(www)
										.lastMod(new Date()).priority(1.0)
										.changeFreq(ChangeFreq.DAILY));
						ExtWebSiteMapUrl pageUrl = new ExtWebSiteMapUrl(
								new WebSitemapUrl.Options(www)
										.lastMod(new Date()).priority(1.0)
										.changeFreq(ChangeFreq.DAILY));
						pageUrls.add(pageUrl);// 加入要抓取的页面
						set.add(url);// 加入首页
						// 自定义页面
						if (pages != null && pages.size() > 0) {
							for (UserPage page : pages) {
								url = new ExtWebSiteMapUrl(
										new WebSitemapUrl.Options(www
												+ "/pages/"
												+ page.getCreated().getTime()
												+ ".html")
												.lastMod(page.getDeployDate())
												.priority(1.0)
												.changeFreq(ChangeFreq.DAILY));
								set.add(url);// 加入自定义,权重1.0,每天更新
								pageUrl = new ExtWebSiteMapUrl(
										new WebSitemapUrl.Options(www
												+ "/pages/"
												+ page.getCreated().getTime()
												+ ".html")
												.lastMod(page.getDeployDate())
												.priority(0.9)
												.changeFreq(ChangeFreq.DAILY));
								pageUrls.add(pageUrl);// 加入要抓取的页面
							}
						}
						// 画报
						for (String huabao : huabaos) {
							url = new ExtWebSiteMapUrl(
									new WebSitemapUrl.Options(www + "/huabao/"
											+ huabao + ".html")
											.lastMod(new Date()).priority(1.0)
											.changeFreq(ChangeFreq.DAILY));
							set.add(url);// 加入画报页,权重1.0,每天更新
						}
						// 品牌
						for (int i = 1; i < 12; i++) {
							url = new ExtWebSiteMapUrl(
									new WebSitemapUrl.Options(www + "/brand/"
											+ i + ".html").lastMod(new Date())
											.priority(1.0)
											.changeFreq(ChangeFreq.DAILY));
							set.add(url);// 加入画报页,权重1.0,每天更新
						}
						// 淘宝频道
						for (Channel channel : channels) {
							url = new ExtWebSiteMapUrl(
									new WebSitemapUrl.Options(www + "/channel/"
											+ channel.getValue() + ".html")
											.lastMod(new Date()).priority(1.0)
											.changeFreq(ChangeFreq.WEEKLY));
							set.add(url);// 加入频道页,权重1.0,每周更新
						}
						// 购物日志页面
						// for (Map<String, Integer> map : blogs) {
						// Integer bid = map.get("id");
						// Integer cid = map.get("cid");
						// url = new ExtWebSiteMapUrl(
						// new WebSitemapUrl.Options(www + "/tblogs/"
						// + cid + "/" + bid + ".html")
						// .lastMod(new Date()).priority(1.0)
						// .changeFreq(ChangeFreq.MONTHLY));
						// set.add(url);// 加入频道页,权重1.0,每周更新
						// }
						// 我的日志页面
						if (uidMap != null && uidMap.size() == 1) {
							Integer uid = uidMap.get(0).get("uid");
							if (uid != null && uid != 0) {
								params.put("uid", uid);
								try {
									List<Map<String, Integer>> myBlogs = (List<Map<String, Integer>>) ucService
											.findByHql(
													new Page<Map<String, Integer>>(
															1, 200),
													"select new map(blogid as id,classid as cid) from UCBlog b where b.uid=:uid order by b.dateline desc",
													params);
									for (Map<String, Integer> map : myBlogs) {
										Integer bid = map.get("id");
										Integer cid = map.get("cid");
										url = new ExtWebSiteMapUrl(
												new WebSitemapUrl.Options(www
														+ "/tblogs/" + cid
														+ "/" + bid + ".html")
														.lastMod(new Date())
														.priority(1.0)
														.changeFreq(
																ChangeFreq.MONTHLY));
										set.add(url);// 加入频道页,权重1.0,每周更新
									}
								} catch (Exception e) {
									e.printStackTrace();
								}
							}
						}
						crawl(www, pageUrls, set);// 抓取自定义页面内
						if (set != null && set.size() > 0) {// 生成SiteMap，暂时不考虑超过50000的
							for (WebSitemapUrl u : set) {
								wsg.addUrl(u);
							}
							set.clear();
							try {
								wsg.write();
							} catch (Exception e) {
								e.printStackTrace();
							}
							try {
								// 生成ROBOTS.TXT
								File htmlFile = new File(
										EnvManager.getUserPath("shop"
												+ site.getUser_id())
												+ File.separator + "robots.txt");
								File parent = new File(htmlFile.getParent());
								if (!parent.exists()) {
									parent.mkdirs();
								}
								if (!htmlFile.exists()) {// 如果不存在则是第一次发布
									htmlFile.createNewFile();
								}
								Writer out = new BufferedWriter(
										new OutputStreamWriter(
												new FileOutputStream(htmlFile),
												"UTF-8"));
								Template template = fcg
										.getConfiguration()
										.getTemplate(
												"site/designer/template/robots.ftl");
								Map<String, Object> maps = new HashMap<String, Object>();
								maps.put("www", www);
								template.setEncoding("UTF-8");
								template.process(maps, out);// 生成具体模块内容并输出
								out.flush();
								out.close();
							} catch (Exception e) {
								e.printStackTrace();
							}
						}

						if (pings != null && pings.size() > 0) {
							for (String ping : pings) {
								getConnection(ping, www + "/sitemap.xml");// 主动提交SITEMAP.XML
							}
						}
						logger.info("user[" + site.getUser_id()
								+ "] sitemap end");
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 抓取页面上的URL
	 * 
	 * @param queue
	 * @param wsg
	 */
	public void crawl(String www, List<ExtWebSiteMapUrl> urls,
			Set<ExtWebSiteMapUrl> set) {
		if (urls != null && urls.size() > 0) {
			Boolean isContinue = true;
			for (ExtWebSiteMapUrl url : urls) {
				if (url != null && url.canCrawl()) {
					try {
						if (!isContinue) {
							break;
						}
						parser.setURL(url.getUrl().toExternalForm());
						NodeList list = parser.parse(LINK_FILTER);
						for (NodeIterator iter = list.elements(); iter
								.hasMoreNodes();) {
							String link = ((LinkTag) iter.nextNode()).getLink();
							if (StringUtils.isNotEmpty(link)
									&& link.endsWith("#")) {// 移除最后的#
								link = link.substring(0, link.length() - 1);
							}
							if (StringUtils.isNotEmpty(link)
									&& link.indexOf("?") != -1) {
								String[] links = link.split("\\?");
								try {
									link = links[0]
											+ "?"
											+ URLEncoder.encode(links[1],
													"utf-8");
								} catch (UnsupportedEncodingException e1) {
									link = null;
								}
							}
							if (StringUtils.isEmpty(link)) {
								continue;
							}
							ExtWebSiteMapUrl newUrl = null;
							try {
								newUrl = new ExtWebSiteMapUrl(
										new WebSitemapUrl.Options(link)
												.lastMod(new Date())
												.priority(1.0)
												.changeFreq(ChangeFreq.DAILY));
							} catch (MalformedURLException e) {
								continue;
							}
							if (check(link, www)) {
								if (set.size() > 49000) {// 如果连接数大于49000，则不再添加
									isContinue = false;
									break;
								}
								set.add(newUrl);
							}
						}
					} catch (ParserException e) {
						System.out.println("can not parser the url : "
								+ url.getUrl());
					} finally {
						url.disable();
					}
				}
			}
		}
	}

	private static HttpURLConnection getConnection(String strUrl, String www)
			throws IOException {
		URL url = new URL(strUrl + www);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		return conn;
	}

	/** */
	/**
	 * 检测是否为同一个域下的url
	 * 
	 * @param url
	 * @param basePrefix
	 * @return
	 */
	public static boolean check(String url, String basePrefix) {
		return StringUtils.isNotBlank(url) ? url.startsWith(basePrefix) : false;
	}

	/**
	 * @return the fcg
	 */
	public FreeMarkerConfigurer getFcg() {
		return fcg;
	}

	/**
	 * @param fcg
	 *            the fcg to set
	 */
	public void setFcg(FreeMarkerConfigurer fcg) {
		this.fcg = fcg;
	}

	/**
	 * @return the pageService
	 */
	public IPageService getPageService() {
		return pageService;
	}

	/**
	 * @param pageService
	 *            the pageService to set
	 */
	public void setPageService(IPageService pageService) {
		this.pageService = pageService;
	}

	/**
	 * @return the moduleMethod
	 */
	public ModuleMethod getModuleMethod() {
		return moduleMethod;
	}

	/**
	 * @param moduleMethod
	 *            the moduleMethod to set
	 */
	public void setModuleMethod(ModuleMethod moduleMethod) {
		this.moduleMethod = moduleMethod;
	}

	public void setUcService(IUCService ucService) {
		this.ucService = ucService;
	}

	public IUCService getUcService() {
		return ucService;
	}

	/**
	 * @return the pings
	 */
	public List<String> getPings() {
		return pings;
	}

	/**
	 * @param pings
	 *            the pings to set
	 */
	public void setPings(List<String> pings) {
		this.pings = pings;
	}

}
