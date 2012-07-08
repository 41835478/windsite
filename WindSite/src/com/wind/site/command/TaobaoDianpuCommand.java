package com.wind.site.command;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

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
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.taobao.api.domain.Shop;
import com.taobao.api.domain.TaobaokeShop;
import com.wind.core.dao.Page;
import com.wind.site.env.EnvManager;
import com.wind.site.model.DianPu;
import com.wind.site.model.DianPuCategory;
import com.wind.site.model.DianPuModel;
import com.wind.site.service.IAdminService;
import com.wind.site.util.TaobaoFetchUtil;

import freemarker.template.Template;

public class TaobaoDianpuCommand {
	private static final Logger logger = Logger
			.getLogger(TaobaoDianpuCommand.class.getName());
	private IAdminService adminService;
	private FreeMarkerConfigurer fcg;

	public void synDianpu() {
		//getCat();
		getDianpu();
		synTaobaoDianpu();
		// 重新设置店铺分类
		Map<String, List<DianPuCategory>> dianpuCats = new HashMap<String, List<DianPuCategory>>();
		List<DianPuCategory> dRoots = adminService.findAllByCriterion(
				DianPuCategory.class, R.isNull("parent"));// 查询所有父分类
		if (dRoots != null && dRoots.size() > 0) {
			for (DianPuCategory root : dRoots) {
				dianpuCats.put(root.getName(), adminService.findAllByCriterion(
						DianPuCategory.class, R.eq("parent", root.getId())));
			}
		}
		EnvManager.setDianpuCats(dianpuCats);
		deployDianpuIndex();
	}

	/**
	 * 发布店铺首页右侧
	 */
	public void deployDianpuIndex() {
		try {
			File htmlFile = new File(EnvManager.getZonePath() + File.separator
					+ "dianpu" + File.separator + "dianpu.html");
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Template template = fcg.getConfiguration().getTemplate(
					"site/designer/template/dianpuRight.ftl");
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Map<String, Object> params = new HashMap<String, Object>();
			List<DianPuModel> data = new ArrayList<DianPuModel>();
			List<DianPuCategory> roots = adminService.findAllByCriterion(
					DianPuCategory.class, R.isNull("parent"));// 查询所有父分类
			Collections.shuffle(roots);
			if (roots != null && roots.size() > 0) {
				DianPuModel model = null;
				List<DianPuCategory> cats = null;
				List<DianPu> shops = null;
				Integer count = 0;
				for (DianPuCategory root : roots) {
					model = new DianPuModel();
					cats = adminService.findAllByCriterion(
							new Page<DianPuCategory>(1, 5),
							DianPuCategory.class, R.eq("parent", root.getId()));// 查询子分类
					if (cats != null && cats.size() >= 5) {
						count++;
						for (DianPuCategory cat : cats) {
							shops = adminService.findAllByCriterionAndOrder(
									new Page<DianPu>(1, 5), DianPu.class, Order
											.asc("id"), R.eq("secCat", cat
											.getId()), R.isNotNull("sid"));// 查询子分类的店铺
							cat.setShops(shops);
						}
						model.setRoot(root);
						model.setCats(cats);
						data.add(model);
						if (count == 6) {// 如果第6个退出
							break;
						}
					}
				}
			}
			params.put("isHd", "false");
			params.put("data", data);
			template.setEncoding("UTF-8");
			template.process(params, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
			// 部署侧边栏
			htmlFile = new File(EnvManager.getZonePath() + File.separator
					+ "dianpu" + File.separator + "sidebar.html");
			parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			template = fcg.getConfiguration().getTemplate(
					"site/designer/template/dianpuSidebar.ftl");
			out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			List<DianPuModel> dianpuCats = new ArrayList<DianPuModel>();
			List<DianPuCategory> dRoots = adminService.findAllByCriterion(
					DianPuCategory.class, R.isNull("parent"));// 查询所有父分类
			DianPuModel dpm = null;
			if (dRoots != null && dRoots.size() > 0) {
				for (DianPuCategory root : dRoots) {
					dpm = new DianPuModel();
					dpm.setRoot(root);
					dpm
							.setCats(adminService.findAllByCriterion(
									DianPuCategory.class, R.eq("parent", root
											.getId())));// 设置子分类
					dianpuCats.add(dpm);
				}
			}
			params.put("dianpuCats", dianpuCats);
			template.setEncoding("UTF-8");
			template.process(params, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void synTaobaoDianpu() {
		synTaobaoDianpu(new Page<DianPu>(1, 200));
	}

	private void synTaobaoDianpu(Page<DianPu> page) {
		logger.info("syn taobao dianpu starting...." + page.getPageNo() + "|"
				+ page.getTotalCount());
		List<DianPu> dps = adminService.findAllByCriterion(page, DianPu.class,
				R.isNull("nick"));
		Collections.shuffle(dps);// 打乱
		if (dps != null && dps.size() > 0) {
			Parser parser;
			for (DianPu dp : dps) {
				try {
					parser = new Parser(dp.getUrl());
					String nick = null;
					if ("mall".equals(dp.getSellerCredit())) {// 商城
						nick = parser.extractAllNodesThatMatch(
								new HasAttributeFilter("class", "shop-title"))
								.elementAt(0).getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("a"), true)
								.elementAt(0).toPlainTextString();
					} else {// 普通
						nick = parser.extractAllNodesThatMatch(
								new HasAttributeFilter("class", "hCard fn"))
								.elementAt(0).toPlainTextString();
					}
					if (StringUtils.isNotEmpty(nick)) {
						Shop shop = null;
						try {
							shop = TaobaoFetchUtil.getTaobaoShop("0", nick);
						} catch (Exception e) {
							e.printStackTrace();
							adminService.delete(DianPu.class, dp.getId());// 删除不存在的店铺
						}
						if (shop != null) {
							List<TaobaokeShop> shops = TaobaoFetchUtil
									.convertTaobaoShop("0", "fxy060608", String
											.valueOf(shop.getSid()));
							dp.setNick(nick);
							dp.setSid(shop.getSid());
							dp.setCid(shop.getCid());
							dp.setTitle(shop.getTitle());
							if (shops != null && shops.size() == 1) {
								TaobaokeShop s = shops.get(0);
								dp.setCommissionRate(s.getCommissionRate());
								dp.setUserId(s.getUserId());
								adminService.update(dp);
							}
						} else {
							logger.info(nick + " is not exist");
							adminService.delete(DianPu.class, dp.getId());// 删除非推广店铺
						}
					}
					Thread.sleep(1000);
				} catch (Exception e) {
					e.printStackTrace();
					adminService.delete(DianPu.class, dp.getId());// 删除非推广店铺
				}
			}
		}
		if (page.isHasNextPage()) {
			page.setPageNo(page.getNextPage());
			synTaobaoDianpu(page);
		}
		logger.info("syn taobao dianpu ended....");
	}

	private void getDianpu() {
		logger.info("dianpu staring...");
		List<DianPuCategory> cats = adminService.findAllByCriterion(
				DianPuCategory.class, R.isNotNull("parent"));// 所有子分类店铺
		Parser parser;
		for (DianPuCategory cat : cats) {
			try {
				parser = new Parser("http://dianpu.tao123.com/" + cat.getName()
						+ "/");
				NodeList paginator = parser.extractAllNodesThatMatch(
						new HasAttributeFilter("class", "paginator"))
						.elementAt(0).getChildren();
				NodeList aList = paginator.extractAllNodesThatMatch(
						new TagNameFilter("a"), true);
				Integer page = 1;
				if (aList.size() > 1) {
					page = aList.size();
				}
				if (page > 1) {
					for (int p = 1; p < page; p++) {
						try {
							getDianpuByPage(cat, p);
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				} else {
					getDianpuByPage(cat, 1);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		logger.info("dianpu ended...");
	}

	private void getDianpuByPage(DianPuCategory cat, int page) {
		try {
			logger.info(cat.getName() + "[" + page + "page] starting...");
			Parser parser = new Parser("http://dianpu.tao123.com/"
					+ cat.getName() + "/" + page + ".php");
			NodeList as2 = parser
					.extractAllNodesThatMatch(new HasAttributeFilter("class",
							"cf"));
			if (as2 != null && as2.size() > 0) {
				NodeList as1 = as2
						.elementAt(0)
						.getChildren()
						.extractAllNodesThatMatch(new TagNameFilter("li"), true);
				if (as1 != null && as1.size() > 0) {
					for (int i = 0; i < as1.size(); i++) {
						try {
							NodeList childrens = as1.elementAt(i).getChildren();
							LinkTag href = (LinkTag) childrens
									.extractAllNodesThatMatch(
											new HasAttributeFilter("class",
													"shop_logo")).elementAt(0);
							if (href != null) {
								String link = href.getLink();

								ImageTag image = (ImageTag) href.getChildren()
										.extractAllNodesThatMatch(
												new TagNameFilter("img"), true)
										.elementAt(0);
								NodeList as = childrens
										.extractAllNodesThatMatch(
												new TagNameFilter("span"), true);
								if (as != null && as.size() == 4) {
									TagNode tag0 = (TagNode) as.elementAt(0);
									TagNode tag1 = (TagNode) as.elementAt(1);
									TagNode tag2 = (TagNode) as.elementAt(2);
									TagNode tag3 = (TagNode) as.elementAt(3);
									String picPath = image.getImageURL();
									String shortTitle = image
											.getAttribute("alt");
									String zhuying = tag0.getAttribute("title");
									String haoping = tag1.toPlainTextString();
									String sellerCredit = tag2.getAttribute(
											"class").replace("rank r", "");
									String city = tag3.toPlainTextString();
									DianPu dianpu = adminService
											.findByCriterion(DianPu.class, R
													.eq("url", link));
									if (dianpu == null) {
										dianpu = new DianPu();
										dianpu.setUrl(link);
										dianpu.setShortTitle(shortTitle);
										dianpu.setPicPath(picPath);
										dianpu.setZhuying(zhuying);
										dianpu.setHaoping(haoping);
										dianpu.setSellerCredit(sellerCredit);
										dianpu.setCity(city);
										dianpu.setSecCat(cat.getId());
										dianpu.setRootCat(cat.getParent());
										adminService.save(dianpu);
									} else {
										dianpu.setUrl(link);
										dianpu.setShortTitle(shortTitle);
										dianpu.setPicPath(picPath);
										dianpu.setZhuying(zhuying);
										dianpu.setHaoping(haoping);
										dianpu.setSellerCredit(sellerCredit);
										dianpu.setCity(city);
										dianpu.setSecCat(cat.getId());
										dianpu.setRootCat(cat.getParent());
										adminService.update(dianpu);
									}
								}
							}
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}
			logger.info(cat.getName() + "[" + page + "page] ended...");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void getCat() {
		logger.info("dianpu category staring...");
		Parser parser;
		try {
			parser = new Parser("http://dianpu.tao123.com");
			parser.setEncoding("gbk");
			NodeList as1 = parser.extractAllNodesThatMatch(
					new HasAttributeFilter("data-area", "sidebar"))
					.elementAt(0).getChildren().extractAllNodesThatMatch(
							new TagNameFilter("li"), true);
			if (as1 != null && as1.size() > 0) {
				for (int i = 0; i < as1.size(); i++) {
					NodeList as = as1.elementAt(i).getChildren()
							.extractAllNodesThatMatch(new TagNameFilter("a"),
									true);
					if (as != null && as.size() > 0) {
						LinkTag parent = (LinkTag) as.elementAt(0);
						String name = parent.getLink().replaceAll("\\/", "");
						String title = parent.getLinkText();
						DianPuCategory pCat = adminService.findByCriterion(
								DianPuCategory.class, R.eq("name", name));
						if (pCat == null) {
							pCat = new DianPuCategory();
							pCat.setName(name);
							pCat.setTitle(title);
							pCat.setParent(null);
							adminService.save(pCat);
						} else {
							pCat.setName(name);
							pCat.setTitle(title);
							pCat.setParent(null);
							adminService.update(pCat);
						}
						for (int j = 1; j < as.size(); j++) {
							LinkTag a = (LinkTag) as.elementAt(j);
							name = a.getLink().replaceAll("\\/", "");
							title = a.getLinkText();
							DianPuCategory cat = adminService.findByCriterion(
									DianPuCategory.class, R.eq("name", name));
							if (cat == null) {
								cat = new DianPuCategory();
								cat.setName(name);
								cat.setTitle(title);
								cat.setParent(pCat.getId());
								adminService.save(cat);
							} else {
								cat.setName(name);
								cat.setTitle(title);
								cat.setParent(pCat.getId());
								adminService.update(cat);
							}
						}
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		logger.info("dianpu category ended...");
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

	public void setAdminService(IAdminService adminService) {
		this.adminService = adminService;
	}

	public IAdminService getAdminService() {
		return adminService;
	}
}
