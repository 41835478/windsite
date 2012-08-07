package com.wind.site.command;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;
import org.htmlparser.Parser;
import org.htmlparser.filters.HasAttributeFilter;
import org.htmlparser.filters.TagNameFilter;
import org.htmlparser.nodes.TagNode;
import org.htmlparser.tags.ImageTag;
import org.htmlparser.tags.LinkTag;
import org.htmlparser.util.NodeList;
import org.htmlparser.util.ParserException;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.taobao.api.domain.Poster;
import com.taobao.api.request.HuabaoPostersGetRequest;
import com.taobao.api.request.HuabaoSpecialpostersGetRequest;
import com.taobao.api.response.HuabaoPostersGetResponse;
import com.taobao.api.response.HuabaoSpecialpostersGetResponse;
import com.wind.core.dao.Page;
import com.wind.site.env.EnvManager;
import com.wind.site.model.J_ImageData;
import com.wind.site.model.J_PosterData;
import com.wind.site.model.J_PosterImageData;
import com.wind.site.model.J_PosterMarkerData;
import com.wind.site.model.T_Poster;
import com.wind.site.model.T_PosterChannel;
import com.wind.site.model.T_PosterPicture;
import com.wind.site.model.T_PosterTag;
import com.wind.site.model.T_PosterTags;
import com.wind.site.service.ITaobaoService;
import com.wind.site.util.TaobaoFetchUtil;

import freemarker.template.Template;

/**
 * 画报定时更新事件
 * 
 * @author fxy
 * 
 */
public class HuabaoXintaoCommand {
	private static final Logger logger = Logger
			.getLogger(HuabaoXintaoCommand.class.getName());
	private ITaobaoService taobaoService;

	private Parser parser;

	private FreeMarkerConfigurer fcg;

	public void synXintaoHuabao() {
		logger.info("Huabaos is starting........");
		List<T_PosterChannel> channels = taobaoService
				.loadAll(T_PosterChannel.class);
		// try {
		// for (T_PosterChannel channel : channels) {
		// logger.info("channel[" + channel.getName() + "] staring....");
		// HuabaoPostersGetRequest request = new HuabaoPostersGetRequest();
		// request.setChannelId(channel.getId());
		// request.setPageSize(100L);
		// request.setPageNo(1L);
		// postersGet(request);// 同步更新频道内最新画报
		// logger.info("channel[" + channel.getName() + "] end....");
		// }
		// } catch (Exception e) {
		// e.printStackTrace();
		// }
		logger.info("Huabaos is ended!");
		logger.info("Huabao is starting");
		try {
			// posterGet(new Page<T_Poster>(1, 100));
		} catch (Exception e) {
			e.printStackTrace();
		}
		logger.info("Huabao is ended");
		logger.info("Huabao Cache updating");
		// 初始化所有画报热门标签
		EnvManager.setPosterTags(taobaoService.findByHql(new Page<T_PosterTag>(
				1, 400), "from T_PosterTag order by nums desc",
				new HashMap<String, Object>()));
		// 初始化画报热门标签
		EnvManager.setHotTags(taobaoService.findByHql(new Page<T_PosterTag>(1,
				50), "from T_PosterTag order by nums desc",
				new HashMap<String, Object>()));
		// 初始化画报统计数据
		Map<String, Integer> counts = new HashMap<String, Integer>();
		counts.put("totalHuabaos", ((Long) (taobaoService.findByHql(
				"select count(h) from T_Poster h",
				new HashMap<String, Object>())).get(0)).intValue());
		counts.put("totalPics", ((Long) (taobaoService.findByHql(
				"select count(h) from T_PosterPicture h",
				new HashMap<String, Object>())).get(0)).intValue());
		EnvManager.setHuabaoCounts(counts);
		logger.info("Huabao Cache updated");
		logger.info("huabao html updating");
		// 首页
		deployHuabaoIndex();
		// 画报频道,详情推荐, 详情最新
		for (T_PosterChannel channel : channels) {
			deployHuabaoChannel(channel);
			deployHuabaoRecommand(channel);
			deployHuabaoLast(channel);
		}
		logger.info("huabao html updated");
	}

	/**
	 * 发布详情最新
	 * 
	 * @param channel
	 */
	private void deployHuabaoLast(T_PosterChannel channel) {
		try {
			File htmlFile = new File(EnvManager.getZonePath() + File.separator
					+ "huabao" + File.separator + "hot_" + channel.getName()
					+ ".html");
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Template template = fcg.getConfiguration().getTemplate(
					"site/huabao/template/posterDetailHot.ftl");
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("lasts", taobaoService.findAllByCriterionAndOrder(
					new Page<T_Poster>(1, 24), T_Poster.class, Order
							.desc("created"), R.eq("channel_id", channel
							.getId())));// 最新
			params.put("channel", channel);
			template.setEncoding("UTF-8");
			template.process(params, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 发布画报详情推荐
	 * 
	 * @param channel
	 */
	private void deployHuabaoRecommand(T_PosterChannel channel) {
		try {
			File htmlFile = new File(EnvManager.getZonePath() + File.separator
					+ "huabao" + File.separator + "recommand_"
					+ channel.getName() + ".html");
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Template template = fcg.getConfiguration().getTemplate(
					"site/huabao/template/posterDetailRecommand.ftl");
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("channel", channel);
			// 推荐（远程获取）
			HuabaoSpecialpostersGetRequest request = new HuabaoSpecialpostersGetRequest();
			request.setChannelIds(channel.getId().toString());
			request.setNumber(5L);
			request.setType("RECOMMEND");
			try {
				HuabaoSpecialpostersGetResponse response = TaobaoFetchUtil
						.specialPostersGet(taobaoService, request);
				if (response != null) {
					List<Poster> posters = response.getPosters();
					if (posters != null && posters.size() > 0) {
						params.put("posters", posters);
					} else {
						request.setType("HOT");
						response = TaobaoFetchUtil.specialPostersGet(
								taobaoService, request);
						if (response != null) {
							posters = response.getPosters();
							if (posters != null && posters.size() > 0) {
								params.put("posters", posters);
							}
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			template.setEncoding("UTF-8");
			template.process(params, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 发布画报频道页
	 * 
	 * @param channel
	 */
	private void deployHuabaoChannel(T_PosterChannel channel) {
		try {
			File htmlFile = new File(EnvManager.getZonePath() + File.separator
					+ "huabao" + File.separator + channel.getName() + ".html");
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Template template = fcg.getConfiguration().getTemplate(
					"site/huabao/template/channelTemplate.ftl");
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("hotTags", EnvManager.getHotTags());// 标签
			params
					.put("hots", taobaoService.findAllByCriterionAndOrder(
							new Page<T_Poster>(1, 30), T_Poster.class, Order
									.desc("hits"), R.eq("channel_id", channel
									.getId())));// 热门
			params.put("lasts", taobaoService.findAllByCriterionAndOrder(
					new Page<T_Poster>(1, 24), T_Poster.class, Order
							.desc("created"), R.eq("channel_id", channel
							.getId())));// 最新
			params.put("channel", channel);
			// 推荐（远程获取）
			HuabaoSpecialpostersGetRequest request = new HuabaoSpecialpostersGetRequest();
			request.setChannelIds(channel.getId().toString());
			request.setNumber(20L);
			request.setType("RECOMMEND");
			try {
				HuabaoSpecialpostersGetResponse response = TaobaoFetchUtil
						.specialPostersGet(taobaoService, request);
				if (response != null) {
					List<Poster> posters = response.getPosters();
					if (posters != null && posters.size() > 0) {
						params.put("recommands", posters);
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			template.setEncoding("UTF-8");
			template.process(params, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 发布画报首页
	 */
	private void deployHuabaoIndex() {
		List<Map<String, Object>> bigsList = new ArrayList<Map<String, Object>>();
		List<String> smallList = new ArrayList<String>();
		try {
			// 处理画报首页大图（抓取淘宝）
			Parser parser;
			try {
				parser = new Parser("http://huabao.taobao.com/");
				NodeList as1 = parser.extractAllNodesThatMatch(
						new HasAttributeFilter("id", "carrousel-box"))
						.elementAt(0).getChildren();
				NodeList bigs = as1.extractAllNodesThatMatch(
						new HasAttributeFilter("class", "slide-pic-box"), true);
				if (bigs != null && bigs.size() > 0) {
					Map<String, Object> big = null;
					for (int i = 0; i < bigs.size(); i++) {
						LinkTag a = (LinkTag) bigs.elementAt(i).getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("a"), true)
								.elementAt(0);
						if (a != null) {
							ImageTag img = (ImageTag) a.getChildren()
									.extractAllNodesThatMatch(
											new TagNameFilter("img"), true)
									.elementAt(0);
							String src = img.getImageURL();
							if (StringUtils.isEmpty(src)) {
								src = img.getAttribute("data-lazyload-src");
							}
							if (StringUtils.isNotEmpty(src)) {
								big = new HashMap<String, Object>();
								String link = a.getLink();
								Pattern p = Pattern.compile("d-[0-9]+");
								Matcher m = p.matcher(link);
								if (m.find()) {
									big.put("id", m.group(0).replace("d-", ""));
								}
								big.put("pic", src);
								bigsList.add(big);
							}
						}
					}
					NodeList smalls = as1.extractAllNodesThatMatch(
							new TagNameFilter("ol"), true).elementAt(0)
							.getChildren().extractAllNodesThatMatch(
									new TagNameFilter("img"), true);
					if (smalls != null && smalls.size() > 0) {
						for (int i = 0; i < smalls.size(); i++) {
							smallList.add(((ImageTag) smalls.elementAt(i))
									.getImageURL());
						}
					}

				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			File htmlFile = new File(EnvManager.getZonePath() + File.separator
					+ "huabao" + File.separator + "index.html");
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Template template = fcg.getConfiguration().getTemplate(
					"site/huabao/template/indexTemplate.ftl");
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Map<String, Object> params = new HashMap<String, Object>();
			try {
				// 推荐（远程获取）
				HuabaoSpecialpostersGetRequest request = new HuabaoSpecialpostersGetRequest();
				request.setChannelIds("0");
				request.setNumber(6L);
				request.setType("RECOMMEND");
				HuabaoSpecialpostersGetResponse response = TaobaoFetchUtil
						.specialPostersGet(taobaoService, request);
				if (response != null) {
					List<Poster> posters = response.getPosters();
					if (posters != null && posters.size() > 0) {
						params.put("recommands", posters);
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			params.put("bigs", bigsList);
			params.put("smalls", smallList);
			Page<T_Poster> page = new Page<T_Poster>(1, 28);
			params.put("lady", taobaoService.findAllByCriterionAndOrder(page,
					T_Poster.class, Order.desc("created"), R.eq("channel_id",
							9L)));// 女人
			params.put("fashion", taobaoService.findAllByCriterionAndOrder(
					page, T_Poster.class, Order.desc("created"), R.eq(
							"channel_id", 2L)));// 服饰
			params.put("man", taobaoService.findAllByCriterionAndOrder(page,
					T_Poster.class, Order.desc("created"), R.eq("channel_id",
							3L)));// 男人
			params.put("baby", taobaoService.findAllByCriterionAndOrder(page,
					T_Poster.class, Order.desc("created"), R.eq("channel_id",
							6L)));// 亲子
			params.put("life", taobaoService.findAllByCriterionAndOrder(page,
					T_Poster.class, Order.desc("created"), R.eq("channel_id",
							5L)));// 居家
			params.put("star", taobaoService.findAllByCriterionAndOrder(page,
					T_Poster.class, Order.desc("created"), R.eq("channel_id",
							16L)));// 明星
			params.put("tour", taobaoService.findAllByCriterionAndOrder(page,
					T_Poster.class, Order.desc("created"), R.eq("channel_id",
							18L)));// 旅游
			params.put("idea", taobaoService.findAllByCriterionAndOrder(page,
					T_Poster.class, Order.desc("created"), R.eq("channel_id",
							13L)));// 创意站
			template.setEncoding("UTF-8");
			template.process(params, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 抓取并生成未处理的画报
	 * 
	 * @param page
	 */
	public void posterGet(Page<T_Poster> page) {
		List<T_Poster> posters = taobaoService.findAllByCriterionAndOrder(page,
				T_Poster.class, Order.desc("id"), R.isNull("isPic"));
		if (posters != null && posters.size() > 0) {
			for (T_Poster poster : posters) {
				posterPictureParse(poster);
			}
			posterGet(page);// 继续抓取，直到没有
		}
	}

	public void posterPictureParse(T_Poster poster) {
		try {
			try {
				parser = new Parser("http://huabao.taobao.com/man/d-"
						+ poster.getId() + ".htm#poster-detail");
			} catch (ParserException e) {
				taobaoService.delete(T_Poster.class, poster.getId());// 说明不存在，删除
			}
			if (parser == null) {
				return;
			}
			NodeList as1 = parser.extractAllNodesThatMatch(new TagNameFilter(
					"script"));
			if (as1 != null && as1.size() > 0) {
				J_PosterImageData data = null;
				for (int i = 0; i < as1.size(); i++) {
					TagNode node = (TagNode) as1.elementAt(i);
					String id = node.getAttribute("id");
					if (id != null) {
						if ("J_PosterImageData".equals(id)) {// ImageData
							String script = node.toPlainTextString();
							if (StringUtils.isNotEmpty(script)) {
								try {
									Gson gson = new Gson();
									data = gson.fromJson(script,
											new TypeToken<J_PosterImageData>() {
											}.getType());

								} catch (Exception e) {
									e.printStackTrace();
								}
							}
						}
					}

				}
				if (data != null) {
					List<J_ImageData> pics = data.getImageData();
					if (pics != null && pics.size() > 0) {
						List<T_PosterPicture> pp = new ArrayList<T_PosterPicture>();
						for (J_ImageData d : pics) {
							T_PosterPicture pic = new T_PosterPicture();
							pic.setCreated(new Date());
							pic.setDescription(d.getPicDesc());
							pic.setId(d.getPicId());
							pic.setModified(new Date());
							pic.setPoster_id(poster.getId());
							pic.setUrl(d.getPicSrc());
							pp.add(pic);
						}
						taobaoService.addHuabaoPic(pp, poster);
						logger.info("poster[" + poster.getId()
								+ "] is completed");
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void posterParse(T_Poster poster) {
		try {
			try {
				parser = new Parser("http://huabao.taobao.com/man/d-"
						+ poster.getId() + ".htm#poster-detail");
			} catch (ParserException e) {
				taobaoService.delete(T_Poster.class, poster.getId());// 说明不存在，删除
			}
			if (parser == null) {
				return;
			}
			NodeList as1 = parser.extractAllNodesThatMatch(new TagNameFilter(
					"script"));
			if (as1 != null && as1.size() > 0) {
				String posterData = "";
				String imageData = "";
				String markerData = "";
				for (int i = 0; i < as1.size(); i++) {
					TagNode node = (TagNode) as1.elementAt(i);
					String id = node.getAttribute("id");
					if (id != null) {
						if ("J_PosterData".equals(id)) {// PosterData
							String script = node.toPlainTextString();
							if (StringUtils.isNotEmpty(script)) {
								try {
									Gson gson = new Gson();
									J_PosterData obj = gson.fromJson(script,
											new TypeToken<J_PosterData>() {
											}.getType());
									posterData = gson.toJson(obj,
											new TypeToken<J_PosterData>() {
											}.getType());
								} catch (Exception e) {
									e.printStackTrace();
								}
							}
						} else if ("J_PosterImageData".equals(id)) {// ImageData
							String script = node.toPlainTextString();
							if (StringUtils.isNotEmpty(script)) {
								try {
									Gson gson = new Gson();
									J_PosterImageData obj = gson.fromJson(
											script,
											new TypeToken<J_PosterImageData>() {
											}.getType());
									imageData = gson.toJson(obj,
											new TypeToken<J_PosterImageData>() {
											}.getType());
								} catch (Exception e) {
									e.printStackTrace();
								}
							}
						} else if ("J_PosterMarkerData".equals(id)) {// PosterMarkerData
							String script = node.toPlainTextString();
							if (StringUtils.isNotEmpty(script)) {
								try {
									Gson gson = new Gson();
									J_PosterMarkerData obj = gson
											.fromJson(
													script,
													new TypeToken<J_PosterMarkerData>() {
													}.getType());
									markerData = gson
											.toJson(
													obj,
													new TypeToken<J_PosterMarkerData>() {
													}.getType());
								} catch (Exception e) {
									e.printStackTrace();
								}
							}
						}
					}

				}
				if (StringUtils.isNotEmpty(posterData)
						&& StringUtils.isNotEmpty(imageData)
						&& StringUtils.isNotEmpty(markerData)) {
					String id = poster.getId().toString();
					String js = getPosterPath(id) + id + ".js";
					// FileUtils.writeStringToFile(new File(js), script,
					// "UTF-8");// 生成原始JS
					File htmlFile = new File(js);
					File parent = new File(htmlFile.getParent());
					if (!parent.exists()) {
						parent.mkdirs();
					}
					if (!htmlFile.exists()) {// 如果不存在则是第一次发布
						htmlFile.createNewFile();
					}
					Template template = fcg.getConfiguration().getTemplate(
							"site/huabao/template/posterJs.ftl");
					Writer out = new BufferedWriter(new OutputStreamWriter(
							new FileOutputStream(htmlFile), "UTF-8"));
					Map<String, Object> params = new HashMap<String, Object>();
					params.put("posterData", posterData);
					params.put("imageData", imageData);
					params.put("markerData", markerData);
					template.setEncoding("UTF-8");
					template.process(params, out);// 生成具体模块内容并输出
					out.flush();
					out.close();
					poster.setIsSuccess(true);
					taobaoService.update(poster);// 更新状态
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {

	}

	public static String getPosterPath(String poster) {
		return EnvManager.getHuabaoJsPath() + File.separator
				+ poster.substring(poster.length() - 2, poster.length())
				+ File.separator;
	}

	@SuppressWarnings("unused")
	private void postersGet(HuabaoPostersGetRequest request) {
		try {
			HuabaoPostersGetResponse response = TaobaoFetchUtil
					.postersGet(request);
			if (response != null) {
				List<Poster> posters = response.getPosters();
				Boolean isContinue = true;
				if (isContinue && posters != null && posters.size() > 0) {
					for (Poster poster : posters) {
						try {
							T_Poster tPoster = taobaoService.get(
									T_Poster.class, Long
											.valueOf(poster.getId()));
							if (tPoster != null) {// 同步画报点击，标题，短标题
								isContinue = false;
								break;
							} else {
								tPoster = new T_Poster();
								tPoster.setChannel_id(Long.valueOf(poster
										.getChannelId()));
								tPoster.setCover_urls(poster.getCoverUrls());
								tPoster.setCreated(poster.getCreated());
								tPoster.setHits(poster.getHits());
								tPoster.setId(Long.valueOf(poster.getId()));
								tPoster.setIsSuccess(false);
								tPoster.setModified(poster.getModified());
								tPoster.setShort_title(poster.getShortTitle());
								tPoster.setTags(poster.getTags());
								tPoster.setTitle(poster.getTitle());
								tPoster
										.setWeight(poster.getWeight() != null ? poster
												.getWeight().intValue()
												: null);
								taobaoService.save(tPoster);// 保存画报
								// 处理标签
								String tags = tPoster.getTags();
								if (StringUtils.isNotEmpty(tags)) {
									String[] tagsArray = tags.split(",");
									Set<String> set = new HashSet<String>();
									for (String tag : tagsArray) {
										set.add(tag);
									}
									for (String tag : set) {
										// 新增或修改标签
										T_PosterTag pt = taobaoService
												.findByCriterion(
														T_PosterTag.class, R
																.eq("title",
																		tag));
										if (pt == null) {
											pt = new T_PosterTag();
											pt.setTitle(tag);
											pt.setNums(1L);
											taobaoService.save(pt);
										} else {
											pt.setNums(pt.getNums() + 1);
											taobaoService.update(pt);
										}
										// 新增标签关系
										T_PosterTags htag = taobaoService
												.findByCriterion(
														T_PosterTags.class,
														R.eq("hid", tPoster
																.getId()),
														R.eq("tid", pt.getId()));
										if (htag == null) {
											htag = new T_PosterTags();
											htag.setHid(tPoster.getId());// 专辑ID
											htag.setTid(pt.getId());// 标签ID
											taobaoService.save(htag);
										}
									}
								}
							}
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
					if (isContinue) {
						request.setPageNo(request.getPageNo() + 1);
						postersGet(request);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void setTaobaoService(ITaobaoService taobaoService) {
		this.taobaoService = taobaoService;
	}

	public ITaobaoService getTaobaoService() {
		return taobaoService;
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

}
