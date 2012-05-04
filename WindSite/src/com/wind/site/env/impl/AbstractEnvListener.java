package com.wind.site.env.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

import org.hibernate.criterion.R;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.core.dao.Page;
import com.wind.site.command.TopCometStreamCommand;
import com.wind.site.delay.WindSiteDelay;
import com.wind.site.env.EnvManager;
import com.wind.site.env.IEnvListener;
import com.wind.site.freemarker.method.ModuleMethod;
import com.wind.site.model.Activity;
import com.wind.site.model.Channel;
import com.wind.site.model.DianPuCategory;
import com.wind.site.model.ForumType;
import com.wind.site.model.KeyWord;
import com.wind.site.model.LayoutModel;
import com.wind.site.model.PageMeta;
import com.wind.site.model.PageModel;
import com.wind.site.model.PageModule;
import com.wind.site.model.PageTemplate;
import com.wind.site.model.Site;
import com.wind.site.model.SiteImpl;
import com.wind.site.model.T_ItemCat;
import com.wind.site.model.T_MallBrandCat;
import com.wind.site.model.T_PosterTag;
import com.wind.site.model.T_ShopCat;
import com.wind.site.model.TaobaoKeywordCategory;
import com.wind.site.model.YiqifaCategory;
import com.wind.site.model.YiqifaMall;
import com.wind.site.rest.taobao.TaobaoFetch;
import com.wind.site.service.IAdminService;
import com.wind.site.service.IPageService;
import com.wind.site.util.PageUtils;
import com.wind.uc.service.IUCService;

public abstract class AbstractEnvListener implements IEnvListener {
	private static final Logger logger = Logger
			.getLogger(AbstractEnvListener.class.getName());
	private IAdminService adminService;
	private IUCService ucService;
	private IPageService pageService;
	private TopCometStreamCommand topCometStreamJob;
	private TaobaoFetch fetch;
	/**
	 * Freemarker 环境
	 */
	private FreeMarkerConfigurer fcg;
	/**
	 * 新版本
	 */
	private ModuleMethod moduleMethod;

	@SuppressWarnings("unchecked")
	@Override
	public void init() {
		// 亿起发商城分类
		EnvManager.setYiqifaCats(adminService.loadAll(YiqifaCategory.class));
		// 亿起发所有B2C商城
		List<YiqifaMall> malls = adminService.loadAll(YiqifaMall.class);
		Map<String, YiqifaMall> map = new HashMap<String, YiqifaMall>();
		if (malls != null && malls.size() > 0) {
			for (YiqifaMall m : malls) {
				map.put(m.getB2cId() + "", m);
			}
		}
		EnvManager.setYiqifaMalls(map);
		Map<String, List<LayoutModel>> templates = new ConcurrentHashMap<String, List<LayoutModel>>();
		Map<Long, PageModule> modules = new ConcurrentHashMap<Long, PageModule>();
		List<PageTemplate> ts = adminService.loadAll(PageTemplate.class);
		if (ts != null && ts.size() > 0) {
			for (PageTemplate t : ts) {
				PageMeta meta = pageService.get(PageMeta.class, t.getId());
				PageModel model = PageUtils
						.convertPageModel(meta.getMetadata());
				templates.put(t.getId(), model.getBd());
				List<PageModule> ms = pageService.findAllByCriterion(
						PageModule.class, R.eq("page", t.getId()));
				if (ms != null && ms.size() > 0) {
					for (PageModule module : ms) {
						modules.put(module.getId(), module);
					}
				}
			}
		}
		EnvManager.setTemplates(templates);
		EnvManager.setModules(modules);
		Map<String, SiteImpl> sites = new ConcurrentHashMap<String, SiteImpl>();
		EnvManager.setSites(sites);
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
		// }
		// 初始化所有分类
		EnvManager.setCats(adminService.loadAll(T_ItemCat.class));
		// 初始化品牌分类
		EnvManager.setBrandCats(adminService.loadAll(T_MallBrandCat.class));
		// 初始化根类目
		EnvManager.setRootCats(adminService.findAllByCriterion(T_ItemCat.class,
				R.eq("parentCid", "0")));
		// 初始化所有店铺前台分类
		EnvManager.setShopCats(adminService.loadAll(T_ShopCat.class));
		// 初始化所有关键词分类
		List<TaobaoKeywordCategory> cats = adminService.findAllByCriterion(
				TaobaoKeywordCategory.class, R.isNull("parent"));
		if (cats != null && cats.size() > 0) {
			for (TaobaoKeywordCategory cat : cats) {
				cat.setCats(adminService.findAllByCriterion(
						TaobaoKeywordCategory.class, R
								.eq("parent", cat.getId())));
			}
		}
		EnvManager.setKeywordCats(cats);
		// 初始化阵地分类
		EnvManager.setForumTypes(adminService.findAllByCriterion(
				ForumType.class, R.eq("parent", "1")));
		// 初始化活动
		EnvManager.setActivities((List<Activity>) adminService.findByHql(
				"from Activity order by created desc",
				new HashMap<String, Object>()));
		// 初始化频道
		EnvManager.setChannels((List<Channel>) adminService.findByHql(
				"from Channel order by sortOrder",
				new HashMap<String, Object>()));
		// 初始化金词
		EnvManager.setTotalWords(new ArrayList<KeyWord>());
		// 初始化所有画报热门标签
		EnvManager.setPosterTags((List<T_PosterTag>) adminService.findByHql(
				new Page<T_PosterTag>(1, 400),
				"from T_PosterTag order by nums desc",
				new HashMap<String, Object>()));
		// 初始化画报热门标签
		EnvManager.setHotTags(adminService.findByHql(new Page<T_PosterTag>(1,
				50), "from T_PosterTag order by nums desc",
				new HashMap<String, Object>()));
		// 初始化画报统计数据
		Map<String, Integer> counts = new HashMap<String, Integer>();
		counts.put("totalHuabaos", ((Long) (adminService.findByHql(
				"select count(h) from T_Poster h",
				new HashMap<String, Object>())).get(0)).intValue());
		counts.put("totalPics", ((Long) (adminService.findByHql(
				"select count(h) from T_PosterPicture h",
				new HashMap<String, Object>())).get(0)).intValue());
		EnvManager.setHuabaoCounts(counts);
		// 初始化画报有效会员
		EnvManager.setValidHuabaoMembers(new HashSet<String>());
		// try {
		// // 初始化排行榜
		// EnvManager.setDayTaoke(adminService
		// .getGATaoke(XintaoAnalyticsClient.getFyTaokeDay()));
		// EnvManager.setWeekTaoke(adminService
		// .getGATaoke(XintaoAnalyticsClient.getFyTaokeWeek()));
		// EnvManager.setMonthTaoke(adminService
		// .getGATaoke(XintaoAnalyticsClient.getFyTaokeMonth()));
		// EnvManager.setAllTaoke(adminService
		// .getGATaoke(XintaoAnalyticsClient.getFyTaokeAll()));
		// } catch (Exception e) {
		// e.printStackTrace();
		// }
		// 修订所有未同步元信息的页面
		String sql = "select id from w_page where id not in (select id from w_page_meta)";// 查找未同步元信息的页面
		List<String> result = (List<String>) adminService.executeNativeSql(sql,
				new HashMap<String, Object>());
		if (result != null && result.size() > 0) {
			for (String id : result) {
				try {
					adminService.refreshPageMeta(id);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		// result.clear();
		// 修订所有已发布的页面广告计划表
		adminService.refreshAdsUserTemplate();
		// 修订所有已发布的站点文章广告计划表
		adminService.refreshAdsBlog();
		// refreshUserTemplatePageId(new Page<UserTemplate>(1, 100));
		// 初始化广告投放参数
		Integer validPage = adminService.countValidPage();// 总的可供投放首页计划的单页面数
		Integer validADPlanIndex = adminService.countValidADPlan("index");// 总的有效首页计划数
		Integer validADPlanBlog = adminService.countValidADPlan("blog");// 总的有效文章广告计划数
		Integer validSite = adminService.countValidSite();// 总的可供投放文章计划的站点数
		EnvManager.setADPageLimit(validPage * 5 / (validADPlanIndex + 20));// 预计每天最多会增加20个新卖家
		EnvManager.setADBlogLimit(validSite * 5 / (validADPlanBlog + 20));
		logger.info("adPageLimit[" + EnvManager.getADPageLimit()
				+ "],adBlogLimit[" + EnvManager.getADBlogLimit() + "]");

		String hql = "select new map(up.id as id,up.deployDate as deployDate,usb.versionNo as versionNo) from UserPage up,T_UserSubscribe usb where usb.user_id=up.user_id and up.status=:status";
		Map<String, Object> _params = new HashMap<String, Object>();
		_params.put("status", true);
		List<Map<String, Object>> pages = (List<Map<String, Object>>) pageService
				.findByHql(hql, _params);
		if (pages != null && pages.size() > 0) {
			for (Map<String, Object> page : pages) {
				WindSiteDelay.addPageQueue(String.valueOf(page.get("id")),
						(Date) page.get("deployDate"), WindSiteDelay
								.getDays(Float.valueOf(String.valueOf(page
										.get("versionNo")))), TimeUnit.SECONDS);// 加入超时队列(加入3小时的随机)
			}
		}
		new WindSiteDelay(fcg, pageService, moduleMethod, fetch);// 启动守护线程
		if (!EnvManager.getZonePath().contains("Apache2.2")) {// 本地不启用主动通知，避免踢掉服务器主动通知，测试的话，可以注释掉该代码
			//topCometStreamJob.topCometRefresh();// 主动通知
		}
		initEnv();

	}

	@SuppressWarnings("unused")
	private void refreshSecondDomainName(Page<Site> page) {
		List<Site> sites = adminService.findByHql(page,
				"from Site where domainName not like 'shop%'",
				new HashMap<String, Object>());
		if (sites != null && sites.size() > 0) {
			for (Site site : sites) {
				adminService.refreshSecondDomainName(site);
			}
		}
		if (page.isHasNextPage()) {
			page.setPageNo(page.getNextPage());
			refreshSecondDomainName(page);
		}
	}

	public abstract void initEnv();

	/**
	 * @return the adminService
	 */
	public IAdminService getAdminService() {
		return adminService;
	}

	/**
	 * @param adminService
	 *            the adminService to set
	 */
	public void setAdminService(IAdminService adminService) {
		this.adminService = adminService;
	}

	/**
	 * @return the ucService
	 */
	public IUCService getUcService() {
		return ucService;
	}

	/**
	 * @param ucService
	 *            the ucService to set
	 */
	public void setUcService(IUCService ucService) {
		this.ucService = ucService;
	}

	public void setPageService(IPageService pageService) {
		this.pageService = pageService;
	}

	public IPageService getPageService() {
		return pageService;
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

	public void setTopCometStreamJob(TopCometStreamCommand topCometStreamJob) {
		this.topCometStreamJob = topCometStreamJob;
	}

	public TopCometStreamCommand getTopCometStreamJob() {
		return topCometStreamJob;
	}

	/**
	 * @return the fetch
	 */
	public TaobaoFetch getFetch() {
		return fetch;
	}

	/**
	 * @param fetch
	 *            the fetch to set
	 */
	public void setFetch(TaobaoFetch fetch) {
		this.fetch = fetch;
	}

}
