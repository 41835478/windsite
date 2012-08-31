package com.wind.site.command;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;
import org.htmlparser.Parser;
import org.htmlparser.filters.HasAttributeFilter;
import org.htmlparser.filters.TagNameFilter;
import org.htmlparser.tags.ImageTag;
import org.htmlparser.tags.LinkTag;
import org.htmlparser.util.NodeList;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.core.util.DateUtils;
import com.wind.site.env.EnvManager;
import com.wind.site.model.MallDetail;
import com.wind.site.model.YiqifaCategory;
import com.wind.site.model.YiqifaMall;
import com.wind.site.service.IAdminService;

import freemarker.template.Template;

/**
 * 亿起发 广告分类，广告活动同步
 * 
 * @author fxy
 * 
 */
public class YiqifaCommand {
	private static final Logger logger = Logger.getLogger(YiqifaCommand.class
			.getName());
	private IAdminService adminService;
	private FreeMarkerConfigurer fcg;

	private static final List<String> invalids = new ArrayList<String>();
	static {
		invalids.add("2060");
	}

	public void synYiqifa() {
		synYiqifaCategory();
		synYiqifaMall();
		synYiqifaMallDetail();
		deployYiqifaMallTabNav();
		deployYiqifaMallSideNav();
		deployYiqifaMallJs();
	}

	public void synYiqifaMallDetail() {
		logger.info("yiqifa mall detail staring...");
		List<YiqifaMall> malls = adminService.loadAll(YiqifaMall.class);
		Parser parser;
		MallDetail detail = null;
		for (YiqifaMall mall : malls) {
			try {
				parser = new Parser(
						"http://www.yiqifa.com/searchCampaignView.do?campaignId="
								+ mall.getB2cId());
				NodeList list = parser
						.extractAllNodesThatMatch(
								new HasAttributeFilter("class", "main"))
						.elementAt(0).getChildren();
				String url = list
						.extractAllNodesThatMatch(
								new HasAttributeFilter("class",
										"font_blue_number"), true).elementAt(0)
						.toPlainTextString().trim();
				String desc = list
						.extractAllNodesThatMatch(new TagNameFilter("tr"), true)
						.elementAt(1)
						.getChildren()
						.extractAllNodesThatMatch(new TagNameFilter("td"), true)
						.elementAt(0).toPlainTextString().trim();
				NodeList tds = list
						.extractAllNodesThatMatch(new TagNameFilter("table"),
								true)
						.elementAt(1)
						.getChildren()
						.extractAllNodesThatMatch(new TagNameFilter("tr"), true)
						.elementAt(4)
						.getChildren()
						.extractAllNodesThatMatch(new TagNameFilter("td"), true);
				String isFanli = tds.elementAt(tds.size() - 1)
						.toPlainTextString().trim();
				detail = adminService.get(MallDetail.class, mall.getId());
				if (detail != null) {// 更新
					detail.setDescription(desc);
					adminService.update(detail);
				} else {// 新增
					detail = new MallDetail();
					detail.setId(mall.getId());
					detail.setDescription(desc);
					adminService.save(detail);
				}
				mall.setIsFanLi("支持反馈标签".equalsIgnoreCase(isFanli) ? true
						: false);
				mall.setUrl(url);
				adminService.update(mall);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		// 亿起发所有B2C商城
		Map<String, YiqifaMall> mallsMap = new HashMap<String, YiqifaMall>();
		if (malls != null && malls.size() > 0) {
			for (YiqifaMall m : malls) {
				mallsMap.put(m.getB2cId() + "", m);
			}
		}
		EnvManager.setYiqifaMalls(mallsMap);
		logger.info("yiqifa mall detail ended...");
		// 发布商城静态页面
		deployYiqifaMall();
	}

	/**
	 * 同步亿起发商城
	 */
	public void synYiqifaMall() {
		logger.info("yiqifa mall staring...");
		List<YiqifaCategory> catList = adminService
				.loadAll(YiqifaCategory.class);
		Map<String, YiqifaCategory> map = new HashMap<String, YiqifaCategory>();
		for (YiqifaCategory cat : catList) {
			map.put(cat.getTitle(), cat);
		}
		Parser parser;
		for (int page = 1; page < 6; page++) {
			try {
				parser = new Parser(
						"http://www.yiqifa.com/searchCampaignBeginList.do?pageNumber="
								+ page + "&pageSize=100");
				NodeList list = parser
						.extractAllNodesThatMatch(
								new HasAttributeFilter("class", "adv-active"))
						.extractAllNodesThatMatch(new TagNameFilter("tr"), true);
				if (list != null && list.size() != 0) {
					YiqifaMall mall = null;
					for (int i = 1; i < list.size(); i++) {//
						NodeList tds = list
								.elementAt(i)
								.getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("td"), true);
						if (tds.size() != 8) {
							logger.info("yiqifa error:" + page);
							continue;
						} else {
							if (page == 1 && i == 1) {// 如果已成功抓取，则先将所有商城设置为无效
								List<YiqifaMall> _malls = adminService
										.loadAll(YiqifaMall.class);
								for (YiqifaMall m : _malls) {
									m.setIsValid(false);
									adminService.update(m);
								}
							}
						}
						// LOGO
						String logo = ((ImageTag) tds
								.elementAt(0)
								.getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("img"), true)
								.elementAt(0)).getImageURL();
						// B2C ID
						String b2cId = tds.elementAt(1).toPlainTextString()
								.trim();
						// title
						String title = tds
								.elementAt(2)
								.getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("p"), true)
								.elementAt(0).toPlainTextString().trim();
						// adType
						String adType = tds.elementAt(3).toPlainTextString()
								.trim();
						// cat
						String cat = tds.elementAt(4).toPlainTextString()
								.trim();
						// commission
						String commissionRate = tds.elementAt(5)
								.toPlainTextString().trim();
						// date
						String date = tds.elementAt(6).toPlainTextString()
								.trim();
						String startDate = date.split("/")[0].trim();
						String endDate = date.split("/")[1].trim();
						// audit
						String audit = tds.elementAt(7).toPlainTextString()
								.trim();
						mall = adminService.findByCriterion(YiqifaMall.class,
								R.eq("b2cId", b2cId));
						String auditV = "needless";
						if ("自动审核".equals(audit)) {
							auditV = "auto";
						} else if ("人工审核".equals(audit)) {
							auditV = "manual";
						}
						List<String> un = new ArrayList<String>();
						un.add("满座");
						un.add("大众点评");
						un.add("美团");
						un.add("乐峰");
						un.add("糯米网");
						un.add("学而思");
						un.add("衣联网");
						un.add("好乐买");
						un.add("京东");
						un.add("嘀嗒");
						un.add("无忧英语");
						un.add("58团");
						for (String u : un) {
							if (title.contains(u)) {
								auditV = "manual";
								break;
							}
						}
						if (mall != null) {// 更新（不更新佣金）
							mall.setAdType(adType);
							mall.setAudit(auditV);
							mall.setCid(map.get(cat).getId());
							// mall.setCommissionRate(commissionRate);
							mall.setEndDate(DateUtils.parseDate(endDate,
									new String[] { DateUtils.YYYY_MM_DD }));
							mall.setStartDate(DateUtils.parseDate(startDate,
									new String[] { DateUtils.YYYY_MM_DD }));
							mall.setLogo(logo);
							mall.setTitle(title);
							if ("manual".equals(auditV)) {
								mall.setIsValid(false);
							} else {
								if (invalids.contains(b2cId)) {
									mall.setIsValid(false);
								} else {
									mall.setIsValid(true);
								}
							}
							adminService.update(mall);
						} else {// 新增
							mall = new YiqifaMall();
							mall.setB2cId(b2cId);
							mall.setAdType(adType);
							mall.setAudit(auditV);
							mall.setCid(map.get(cat).getId());
							mall.setCommissionRate(commissionRate);
							mall.setTopRate(commissionRate);
							mall.setEndDate(DateUtils.parseDate(endDate,
									new String[] { DateUtils.YYYY_MM_DD }));
							mall.setStartDate(DateUtils.parseDate(startDate,
									new String[] { DateUtils.YYYY_MM_DD }));
							mall.setLogo(logo);
							mall.setTitle(title);
							if ("manual".equals(auditV)) {
								mall.setIsValid(false);
							} else {
								if (invalids.contains(b2cId)) {
									mall.setIsValid(false);
								} else {
									mall.setIsValid(true);
								}
							}
							adminService.save(mall);
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		logger.info("yiqifa mall ended...");
	}

	public static void main(String[] args) {
		new YiqifaCommand().synYiqifaCategory();
	}

	/**
	 * 同步亿起发分类
	 */
	public void synYiqifaCategory() {
		logger.info("yiqifa category starting...");
		Parser parser;
		try {
			parser = new Parser(
					"http://www.yiqifa.com/searchCampaignBeginList.do");
			NodeList list = parser
					.extractAllNodesThatMatch(new HasAttributeFilter("class",
							"font_index_b0627"));
			YiqifaCategory cat = null;
			if (list != null && list.size() != 0) {
				for (int i = 0; i < list.size(); i++) {//
					LinkTag a = (LinkTag) list.elementAt(i);
					if (a != null) {
						try {
							String text = a.toPlainTextString();
							String title = text.split("\\(")[0].trim();
							Integer nums = Integer
									.parseInt(text.split("\\(")[1].replace(")",
											"").trim());
							cat = adminService.findByCriterion(
									YiqifaCategory.class, R.eq("title", title));
							if (cat != null) {// 更新
								cat.setNums(nums);
								adminService.update(cat);
							} else {// 新增
								cat = new YiqifaCategory();
								cat.setNums(nums);
								cat.setTitle(title);
								adminService.save(cat);
							}
						} catch (Exception e) {
							e.printStackTrace();
						}

					}
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		EnvManager.setYiqifaCats(adminService.loadAll(YiqifaCategory.class));
		logger.info("yiqifa category ended...");
		// 发布商城分类页面
		deployYiqifaCateogry();
	}

	/**
	 * 部署页头分类模块数据
	 */
	public void deployYiqifaMallTabNav() {
		List<YiqifaCategory> cats = EnvManager.getYiqifaCats();
		if (cats != null && cats.size() > 0) {
			File htmlFile = null;
			File parent = null;
			Template template = null;
			Writer out = null;
			for (YiqifaCategory cat : cats) {
				try {
					logger.info("deploy yiqifa mall-tabnav[" + cat.getId()
							+ "] is starting...");
					List<YiqifaMall> malls = adminService
							.findAllByCriterionAndOrder(new Page<YiqifaMall>(1,
									30), YiqifaMall.class, Order.asc("b2cId"),
									R.eq("cid", cat.getId()), R.eq("isValid",
											true));// 查找当前分类商城
					htmlFile = new File(EnvManager.getZonePath()
							+ File.separator + "ymall" + File.separator
							+ "cats" + File.separator + "tabnav_" + cat.getId()
							+ ".html");
					parent = new File(htmlFile.getParent());
					if (!parent.exists()) {
						parent.mkdirs();
					}
					if (!htmlFile.exists()) {// 如果不存在则是第一次发布
						htmlFile.createNewFile();
					}
					template = fcg
							.getConfiguration()
							.getTemplate(
									"assets/js/page/module/template/shopMallTabNavTemplate.ftl");
					out = new BufferedWriter(new OutputStreamWriter(
							new FileOutputStream(htmlFile), "UTF-8"));
					Map<String, Object> params = new HashMap<String, Object>();
					params.put("malls", malls);// 商城
					template.setEncoding("UTF-8");
					template.process(params, out);// 生成具体模块内容并输出
					out.flush();
					out.close();
					logger.info("deploy yiqifa mall-tabnav[" + cat.getId()
							+ "] is ended...");
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	/**
	 * 部署亿起发商城JS
	 */
	public void deployYiqifaMallJs() {
		logger.info("deploy yiqifa mall js is staring...");
		try {
			File htmlFile = new File(EnvManager.getZonePath() + File.separator
					+ "ymall" + File.separator + "yiqifa.js");
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Template template = fcg.getConfiguration().getTemplate(
					"assets/js/page/module/template/yiqifaMallsTemplate.ftl");
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Map<String, Object> params = new HashMap<String, Object>();
			List<YiqifaCategory> cats = EnvManager.getYiqifaCats();
			Map<String, List<YiqifaMall>> catsMap = new HashMap<String, List<YiqifaMall>>();
			for (YiqifaCategory cat : cats) {
				catsMap.put(cat.getId() + "", adminService.findAllByCriterion(
						YiqifaMall.class, R.eq("cid", cat.getId()),
						R.eq("isValid", true)));
			}
			params.put("b2cMallsJson", new Gson().toJson(catsMap,
					new TypeToken<Map<String, List<YiqifaMall>>>() {
					}.getType()));
			template.setEncoding("UTF-8");
			template.process(params, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		logger.info("deploy yiqifa mall js is ended...");
	}

	/**
	 * 部署侧边栏浮动模块数据
	 */
	public void deployYiqifaMallSideNav() {
		logger.info("deploy yiqifa mall category-sidenav is staring...");
		try {
			File htmlFile = new File(EnvManager.getZonePath() + File.separator
					+ "ymall" + File.separator + "shopMallSideNav.html");
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Template template = fcg
					.getConfiguration()
					.getTemplate(
							"assets/js/page/module/template/shopMallSideNavTemplate.ftl");
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Map<String, Object> params = new HashMap<String, Object>();
			List<YiqifaCategory> cats = EnvManager.getYiqifaCats();
			params.put("cats", cats);
			for (YiqifaCategory cat : cats) {
				cat.setMalls(adminService.findAllByCriterion(YiqifaMall.class,
						R.eq("cid", cat.getId()), R.eq("isValid", true)));
			}
			template.setEncoding("UTF-8");
			template.process(params, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		logger.info("deploy yiqifa mall category-sidenav is ended...");
	}

	/**
	 * 部署亿起发商城页面
	 */
	public void deployYiqifaMall() {
		logger.info("deploy yiqifa malls is staring...");
		Map<String, YiqifaMall> malls = EnvManager.getYiqifaMalls();
		if (malls != null && malls.size() > 0) {
			Collection<YiqifaMall> cMalls = malls.values();
			File htmlFile = null;
			File parent = null;
			Template template = null;
			Writer out = null;
			List<YiqifaMall> news = adminService.findAllByCriterionAndOrder(
					new Page<YiqifaMall>(1, 20), YiqifaMall.class,
					Order.asc("b2cId"), R.eq("isValid", true));// 查找最新
			List<YiqifaCategory> cats = EnvManager.getYiqifaCats();
			for (YiqifaMall m : cMalls) {
				try {
					logger.info("deploy yiqifa mall[" + m.getB2cId()
							+ "] is starting...");
					htmlFile = new File(EnvManager.getZonePath()
							+ File.separator + "ymall" + File.separator
							+ "malls" + File.separator + m.getB2cId() + ".html");
					parent = new File(htmlFile.getParent());
					if (!parent.exists()) {
						parent.mkdirs();
					}
					if (!htmlFile.exists()) {// 如果不存在则是第一次发布
						htmlFile.createNewFile();
					}
					template = fcg.getConfiguration().getTemplate(
							"site/mall/template/mallDetailTemplate.ftl");
					out = new BufferedWriter(new OutputStreamWriter(
							new FileOutputStream(htmlFile), "UTF-8"));
					Map<String, Object> params = new HashMap<String, Object>();
					Long id = m.getId();
					YiqifaMall mall = adminService.get(YiqifaMall.class, id);
					if (mall == null) {
						SystemException.handleMessageException("未找到指定的商城");
					}
					params.put("mall", mall);// 当前商城
					YiqifaCategory cat = adminService.get(YiqifaCategory.class,
							mall.getCid());
					params.put("cat", cat);// 当前商城分类
					MallDetail detail = adminService.get(MallDetail.class, id);// 查找商城详情
					params.put("detail", detail);// 详情
					List<YiqifaMall> catMalls = adminService
							.findAllByCriterionAndOrder(YiqifaMall.class,
									Order.asc("sortOrder"),
									R.eq("cid", mall.getCid()),
									R.eq("isValid", true));// 查找同类（暂时不考虑此处的性能优化【同类商城本可以缓存一下的】）
					params.put("malls", catMalls);
					params.put("news", news);// 最新
					params.put("cats", cats);// 分类
					template.setEncoding("UTF-8");
					template.process(params, out);// 生成具体模块内容并输出
					out.flush();
					out.close();
					logger.info("deploy yiqifa mall[" + m.getB2cId()
							+ "] is ended...");
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		logger.info("deploy yiqifa malls is ended...");
	}

	/**
	 * 部署商城分类页面
	 */
	public void deployYiqifaCateogry() {
		logger.info("deploy yiqifa mall category is staring...");
		try {
			File htmlFile = new File(EnvManager.getZonePath() + File.separator
					+ "ymall" + File.separator + "mallCateogry.html");
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Template template = fcg.getConfiguration().getTemplate(
					"site/mall/template/mallCategoryTemplate.ftl");
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			Map<String, Object> params = new HashMap<String, Object>();
			List<YiqifaCategory> cats = EnvManager.getYiqifaCats();
			params.put("cats", cats);
			for (YiqifaCategory cat : cats) {
				cat.setMalls(adminService.findAllByCriterion(YiqifaMall.class,
						R.eq("cid", cat.getId()), R.eq("isValid", true)));
			}
			template.setEncoding("UTF-8");
			template.process(params, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		logger.info("deploy yiqifa mall category is ended...");
	}

	public void setAdminService(IAdminService adminService) {
		this.adminService = adminService;
	}

	public IAdminService getAdminService() {
		return adminService;
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
