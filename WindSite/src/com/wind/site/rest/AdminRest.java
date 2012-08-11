package com.wind.site.rest;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.aspectj.util.FileUtil;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.R;
import org.hibernate.criterion.SimpleExpression;
import org.htmlparser.Node;
import org.htmlparser.Parser;
import org.htmlparser.filters.HasAttributeFilter;
import org.htmlparser.filters.TagNameFilter;
import org.htmlparser.nodes.TagNode;
import org.htmlparser.tags.ImageTag;
import org.htmlparser.tags.LinkTag;
import org.htmlparser.util.NodeList;
import org.htmlparser.util.ParserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.taobao.api.domain.PosterChannel;
import com.taobao.api.domain.Shop;
import com.taobao.api.domain.ShopCat;
import com.taobao.api.domain.ShopScore;
import com.taobao.api.domain.TaobaokeItemDetail;
import com.taobao.api.domain.TaobaokeShop;
import com.taobao.api.request.HuabaoChannelsGetRequest;
import com.taobao.api.request.ShopGetRequest;
import com.taobao.api.request.ShopcatsListGetRequest;
import com.taobao.api.request.TaobaokeItemsDetailGetRequest;
import com.taobao.api.response.HuabaoChannelsGetResponse;
import com.taobao.api.response.ShopcatsListGetResponse;
import com.taobao.api.response.TaobaokeItemsDetailGetResponse;
import com.wind.core.cache.ICache;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.core.util.DateUtils;
import com.wind.site.command.AdsCommand;
import com.wind.site.command.ArticleBizOrderCommand;
import com.wind.site.command.AutoDeployPageCommand;
import com.wind.site.command.CommandExecutor;
import com.wind.site.command.HuabaoXintaoCommand;
import com.wind.site.command.IMailSendCommand;
import com.wind.site.command.ItemDetailDeployCommand;
import com.wind.site.command.ShopDetailDeployCommand;
import com.wind.site.command.TaobaoDianpuCommand;
import com.wind.site.command.TaobaoKeywordCommand;
import com.wind.site.command.TaobaoSessionCommand;
import com.wind.site.command.TaobaoShopNickCommand;
import com.wind.site.command.TopXintaoCommand;
import com.wind.site.command.VanclCommand;
import com.wind.site.command.WeeklyMailCreateCommand;
import com.wind.site.command.WeigouAutocronGetTimer;
import com.wind.site.command.YiqifaCommand;
import com.wind.site.command.YiqifaReportsGetTimer;
import com.wind.site.command.YiqifaReportsOrderStatusCommand;
import com.wind.site.command.impl.ADPlanCommand;
import com.wind.site.command.impl.ItemDetailCommand;
import com.wind.site.command.impl.ShopBlogCommand;
import com.wind.site.command.impl.ShopCatsCommand;
import com.wind.site.command.impl.UpdateUserTemplateCommand;
import com.wind.site.command.impl.UserItemDetailCommand;
import com.wind.site.delay.WindSiteDelay;
import com.wind.site.env.EnvManager;
import com.wind.site.freemarker.IDeployZone;
import com.wind.site.freemarker.method.ModuleMethod;
import com.wind.site.freemarker.method.WidgetCustomerMethod;
import com.wind.site.model.ADPlan;
import com.wind.site.model.ADTaobaokeItem;
import com.wind.site.model.CoolSite;
import com.wind.site.model.CustomeWidget;
import com.wind.site.model.DesignerErrorLog;
import com.wind.site.model.DomainHistory;
import com.wind.site.model.Forum;
import com.wind.site.model.ForumType;
import com.wind.site.model.Huabao;
import com.wind.site.model.IPLog;
import com.wind.site.model.ItemCacheLog;
import com.wind.site.model.LayoutModel;
import com.wind.site.model.PageMeta;
import com.wind.site.model.PageModel;
import com.wind.site.model.PageModule;
import com.wind.site.model.PageTemplate;
import com.wind.site.model.PageTheme;
import com.wind.site.model.PageThemeColor;
import com.wind.site.model.PageThemeIndustry;
import com.wind.site.model.PageThemeSkin;
import com.wind.site.model.Site;
import com.wind.site.model.SiteImpl;
import com.wind.site.model.T_ItemCat;
import com.wind.site.model.T_MallBrand;
import com.wind.site.model.T_MallBrandCat;
import com.wind.site.model.T_Poster;
import com.wind.site.model.T_PosterChannel;
import com.wind.site.model.T_ShopCat;
import com.wind.site.model.T_TaobaokeShop;
import com.wind.site.model.T_UserSubscribe;
import com.wind.site.model.User;
import com.wind.site.model.UserPage;
import com.wind.site.model.W_ShopFavorite;
import com.wind.site.model.WeiboDomainHistory;
import com.wind.site.model.Widget;
import com.wind.site.model.WidgetDataType;
import com.wind.site.model.WidgetType;
import com.wind.site.module.IModuleSpider;
import com.wind.site.service.IAdminService;
import com.wind.site.service.IPageService;
import com.wind.site.util.PageUtils;
import com.wind.site.util.TaobaoFetchUtil;
import com.wind.site.util.WindSiteRestUtil;
import com.wind.uc.service.IUCService;

import freemarker.template.Template;

/**
 * 管理功能RESTFUL服务
 * 
 * @author fxy
 * 
 */
@Controller
@RequestMapping("/member/admin")
public class AdminRest {
	private static final Logger logger = Logger.getLogger(AdminRest.class
			.getName());
	@Autowired
	private IAdminService adminService;
	@Autowired
	private IUCService ucService;

	@Autowired
	private FreeMarkerConfigurer fcg;
	@Autowired
	private IMailSendCommand mailSendJob;
	@Autowired
	private TaobaoDianpuCommand dianpuCommand;
	@Autowired
	private TopXintaoCommand xintaoTopJob;
	@Autowired
	private TaobaoKeywordCommand taobaoKeywordJob;
	@Autowired
	private IModuleSpider mallIndexFloorSpider;
	@Autowired
	private IModuleSpider mallIndexNewFloorSpider;
	@Autowired
	private IModuleSpider mallSliderPicturesSpider;
	@Autowired
	private IModuleSpider dianpuPaihangSpider;
	@Autowired
	private AdsCommand adsCommand;
	@Autowired
	private ArticleBizOrderCommand articleBizOrderJob;
	@Autowired
	private AutoDeployPageCommand autoDeployPageJob;
	@Autowired
	private TaobaoShopNickCommand taobaoNicksJob;
	@Autowired
	private TaobaoSessionCommand taobaoSessionJob;
	@Autowired
	private YiqifaCommand yiqifaJob;
	@Autowired
	private YiqifaReportsGetTimer yiqifaReportsJob;
	@Autowired
	private YiqifaReportsOrderStatusCommand yiqifaOrderStatusJob;
	@Autowired
	private ItemDetailDeployCommand itemDetailDeployJob;
	@Autowired
	private ShopDetailDeployCommand shopDetailDeployJob;
	@Autowired
	private HuabaoXintaoCommand xintaoHuabaoJob;
	@Autowired
	private VanclCommand vanclCommand;

	@Autowired
	private WeigouAutocronGetTimer autoCronCommand;
	@Autowired
	private WeeklyMailCreateCommand mailCommand;

	@RequestMapping(value = "/checkfencheng")
	@ResponseBody
	public String checkFenCheng() {
		return WindSiteRestUtil.checkFenCheng(adminService);
	}

	@RequestMapping(value = "/synSiteTitle")
	@ResponseBody
	public String synSiteTitle() {
		WindSiteRestUtil.synSiteTitle(adminService);
		return "";
	}

	@RequestMapping(value = "/checkwww/{isUpdate}")
	@ResponseBody
	public String checkWWW(@PathVariable String isUpdate) {
		WindSiteRestUtil.checkWWW(adminService, "true".equals(isUpdate) ? true
				: false);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 解除绑定
	 * 
	 * @return
	 */
	@RequestMapping(value = "/unbind/{id}")
	@ResponseBody
	public String unbindWWW(@PathVariable Long id) {
		if (id > 0) {
			return WindSiteRestUtil.unbind(String.valueOf(id), adminService);
		}
		return "";
	}

	/**
	 * 重新生成绑定
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/refreshWWW")
	@ResponseBody
	public String refreshWWW() {
		List<Map<String, Object>> sites = (List<Map<String, Object>>) adminService
				.findByHql(
						"select new map(www as www,user_id as user_id) from Site where www!=''",
						null);
		logger.info(" wwws[" + sites.size() + "]");
		try {
			FileWriter fw = new FileWriter(EnvManager.getApachePath()
					+ File.separator + "domain.txt", false);
			BufferedWriter bw = new BufferedWriter(fw);
			for (Map<String, Object> site : sites) {
				if (null != site.get("www")) {
					String user_id = String.valueOf(site.get("user_id"));
					bw.write(site.get("www") + "					     http://shop"
							+ user_id + ".xintaonet.com");
					bw.newLine();
				}
			}
			bw.flush();
			bw.close();
			fw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return String.valueOf(sites.size());
	}

	/**
	 * 根据软文分类查找并更新组件和页面
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/synblog")
	@ResponseBody
	public String updateSynShopBlog(HttpServletRequest request) {
		// 更新新版本
		List<PageModule> modules = (List<PageModule>) adminService.findByHql(
				"select m from PageModule m where m.name='shopBlog'",
				new HashMap<String, Object>());
		if (modules != null && modules.size() > 0) {
			for (PageModule module : modules) {
				// 生成文章模块异步命令
				ShopBlogCommand command = new ShopBlogCommand();
				command.setFcg(fcg);
				command.setModule(pageService.get(PageModule.class,
						module.getId()));
				command.setPageService(pageService);
				command.setUcService(ucService);
				CommandExecutor.getCommands().add(command);
			}
			// 如果会员设置了新版本的文章列表，则不再更新旧版本的
			return WindSiteRestUtil.SUCCESS;
		}
		return WindSiteRestUtil.SUCCESS;
	}

	@RequestMapping(value = "/unvalid", method = RequestMethod.GET)
	@ResponseBody
	public String unvalid() {
		mailCommand.createMail();
		return WindSiteRestUtil.SUCCESS;
	}

	@RequestMapping(value = "/autoCron", method = RequestMethod.GET)
	@ResponseBody
	public String autoCron() {
		autoCronCommand.getAutocrons();
		return WindSiteRestUtil.SUCCESS;
	}

	@RequestMapping(value = "/vancl", method = RequestMethod.GET)
	@ResponseBody
	public String synVancl() {
		vanclCommand.synVancl();
		return WindSiteRestUtil.SUCCESS;
	}

	@RequestMapping(value = "/vancl/special", method = RequestMethod.GET)
	@ResponseBody
	public String synVanclSpecial() {
		vanclCommand.synVanclSpecial();
		return WindSiteRestUtil.SUCCESS;
	}

	@RequestMapping(value = "/xintaohuabao/{id}", method = RequestMethod.GET)
	@ResponseBody
	public String xintaohuabaoPosterGet(@PathVariable Long id) {
		T_Poster poster = new T_Poster();
		poster.setId(id);
		xintaoHuabaoJob.posterParse(poster);
		return WindSiteRestUtil.SUCCESS;
	}

	@RequestMapping(value = "/xintaohuabao", method = RequestMethod.GET)
	@ResponseBody
	public String xintaohuabaoPosterGet() {
		xintaoHuabaoJob.synXintaoHuabao();
		return WindSiteRestUtil.SUCCESS;
	}

	@RequestMapping(value = "/huabaopic", method = RequestMethod.GET)
	@ResponseBody
	public String xintaohuabaoPosterPicGet() {
		xintaoHuabaoJob.posterGet(new Page<T_Poster>(1, 100));
		return WindSiteRestUtil.SUCCESS;
	}

	@RequestMapping(value = "/onlinemembers", method = RequestMethod.GET)
	public ModelAndView getOnlineMembers() {
		return new ModelAndView("site/onlineMembers", "onlineMembers",
				adminService.findAllByCriterion(User.class,
						R.eq("isOnline", true)));
	}

	/**
	 * 调整缓存IP
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/cache/local/update")
	@ResponseBody
	public String cacheLocalUpdate(HttpServletRequest request) {
		String ip = request.getParameter("ip");
		String hitsStr = request.getParameter("hits");
		Long hits = Long.valueOf(hitsStr);
		EnvManager.getCache().putExpiry(ip, hits);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 本地缓存IP
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/cache/local")
	public ModelAndView cacheLocal(HttpServletRequest request) {
		ICache<String, Object> cache = EnvManager.getCache();
		Set<String> set = cache.keySet();
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		Map<String, Object> obj = null;
		for (String key : set) {
			obj = new HashMap<String, Object>();
			obj.put("key", key);
			obj.put("value", cache.get(key));
			list.add(obj);
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("caches", list);
		return new ModelAndView("site/admin/localCache", result);
	}

	/**
	 * 队列数据
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/cache/synitemlog")
	@ResponseBody
	public String synitemlog(HttpServletRequest request) {
		CopyOnWriteArraySet<ItemCacheLog> itemLogs = CommandExecutor
				.getItemlogs();
		CopyOnWriteArraySet<IPLog> ipLogs = CommandExecutor.getIPlogs();
		int size = itemLogs.size();
		int size1 = ipLogs.size();
		pageService.saveOrUpdateItemLog(itemLogs);
		pageService.saveAll(ipLogs);
		ipLogs.clear();
		return String.valueOf(size) + "|" + String.valueOf(size1);
	}

	/**
	 * 生成超时队列数据
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/cache/delay/create")
	public ModelAndView createCacheDelay(HttpServletRequest request) {
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
		return new ModelAndView("site/admin/delay", "delay",
				WindSiteDelay.getCacheObjMap());
	}

	/**
	 * 队列数据
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/cache/view/commonds")
	@ResponseBody
	public String cacheViewCommonds(HttpServletRequest request) {
		return CommandExecutor.getCommands().toString();
	}

	/**
	 * 队列数据
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/cache/view")
	@ResponseBody
	public String cacheView(HttpServletRequest request) {

		return "详情队列：" + CommandExecutor.getCachecommands().size()
				+ ",商品详情日志队列:" + CommandExecutor.getItemlogs().size()
				+ ",IP详情日志队列:" + CommandExecutor.getIPlogs().size()
				+ ",常规任务队列:" + CommandExecutor.getCommands().size() + ",模板更新队列"
				+ CommandExecutor.getUpdatecommands().size() + ",超时任务对列:"
				+ WindSiteDelay.getPageQueue().size() + "|"
				+ WindSiteDelay.getCacheObjMap().size();
	}

	/**
	 * 超时队列数据
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/cache/delay")
	public ModelAndView cacheDelay(HttpServletRequest request) {
		return new ModelAndView("site/admin/delay", "delay",
				WindSiteDelay.getCacheObjMap());
	}

	/**
	 * 更新所有详情页面
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/shopcats/{id}")
	@ResponseBody
	public String deployShopCats(@PathVariable Long id,
			HttpServletRequest request) {
		String key = "shopcat-" + id;
		if (!CommandExecutor.getCachecommands().containsKey(key)) {// 静态化当前店铺分类
			ShopCatsCommand command = new ShopCatsCommand();
			command.setCid(id);
			command.setFcg(fcg);
			command.setPageService(pageService);
			command.setIsAll(true);// 强制更新
			CommandExecutor.getCachecommands().put(key, command);
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 更新所有详情页面
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/shopdetail/deploy/all")
	@ResponseBody
	public String deployShopDetail(HttpServletRequest request) {
		shopDetailDeployJob.deployShopDetail("true".equals(request
				.getParameter("isAll")) ? true : false);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 更新所有详情页面
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/itemdetail/deploy/all")
	@ResponseBody
	public String deployItemDetail(HttpServletRequest request) {
		itemDetailDeployJob.deployItemDetail("true".equals(request
				.getParameter("isAll")) ? true : false);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 生成所有用户新版详情页面
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/deploy/useritemdetail")
	@ResponseBody
	public String useritemdetail(HttpServletRequest request) {
		String sql = "select distinct user_id from w_page where status=:status";// 查找所有已发布过得用户
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("status", true);
		List<String> result = (List<String>) adminService.executeNativeSql(sql,
				map);
		if (result != null && result.size() > 0) {
			for (String userId : result) {
				try {
					if (!CommandExecutor.getCachecommands().containsKey(
							"user-" + userId)) {// 如果不在队列中
						UserItemDetailCommand command = new UserItemDetailCommand();
						command.setFcg(fcg);
						command.setPageService(pageService);
						command.setUserId(userId);
						CommandExecutor.getCachecommands().put(
								"user-" + userId, command);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 生成指定用户新版详情页面
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/deploy/useritemdetail/{userId}")
	@ResponseBody
	public String useritemdetail(@PathVariable String userId,
			HttpServletRequest request) {
		if (!CommandExecutor.getCachecommands().containsKey("user-" + userId)) {// 如果不在队列中
			UserItemDetailCommand command = new UserItemDetailCommand();
			command.setFcg(fcg);
			command.setPageService(pageService);
			command.setUserId(userId);
			CommandExecutor.getCachecommands().put("user-" + userId, command);
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 生成指定商品新版详情页面
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/deploy/itemdetail/{numIid}")
	@ResponseBody
	public String useritemdetail(@PathVariable Long numIid,
			HttpServletRequest request) {
		// 详情
		TaobaokeItemsDetailGetRequest getRequest = new TaobaokeItemsDetailGetRequest();
		getRequest.setNick("fxy060608");// 昵称
		getRequest.setNumIids(numIid + "");
		getRequest.setFields(TaobaoFetchUtil.DETAIL_FIELDS);
		getRequest.setOuterCode(EnvManager.getItemsOuterCode());
		TaobaokeItemsDetailGetResponse getResponse = TaobaoFetchUtil
				.getItemsDetail(null, getRequest);
		if (getResponse == null) {
			SystemException.handleMessageException("该商品已移除或者被卖家下架");
		}
		List<TaobaokeItemDetail> itemList = getResponse
				.getTaobaokeItemDetails();
		if (itemList == null || itemList.size() != 1) {
			SystemException.handleMessageException("该商品已移除或者被卖家下架");
		}
		TaobaokeItemDetail item = itemList.get(0);// 单个商品
		// 生成当前商品详情相关页
		if (!CommandExecutor.getCachecommands().containsKey("item-" + numIid)) {// 如果不在队列中
			ItemDetailCommand command = new ItemDetailCommand();
			command.setDetail(item);
			command.setFcg(fcg);
			command.setPageService(pageService);
			CommandExecutor.getCachecommands().put("item-" + numIid, command);
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 重设指定用户环境数据
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/synsiteimpl/{userId}")
	@ResponseBody
	public String synsiteimpl(@PathVariable String userId,
			HttpServletRequest request) {
		SiteImpl impl = adminService.getSiteImplByUserId(userId);
		if (impl != null) {
			EnvManager.getSites().put(userId, impl);
		} else {
			return "未找到该用户";
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 生成静态模块
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/module/deploy")
	@ResponseBody
	public String deployStaticModule(HttpServletRequest request) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("shopMallFooter",
				"assets/js/page/module/extra/shopMallFooter_template.ftl");
		map.put("shopMallCategory",
				"assets/js/page/module/extra/shopMallCategory_template.ftl");
		map.put("nav_shuma", "assets/js/page/module/extra/nav_shuma.ftl");
		map.put("nav_jiadian", "assets/js/page/module/extra/nav_jiadian.ftl");
		map.put("nav_nvzhuang", "assets/js/page/module/extra/nav_nvzhuang.ftl");
		map.put("nav_nanzhuang",
				"assets/js/page/module/extra/nav_nanzhuang.ftl");
		map.put("nav_nvxie", "assets/js/page/module/extra/nav_nvxie.ftl");
		map.put("nav_nanxie", "assets/js/page/module/extra/nav_nanxie.ftl");
		map.put("nav_yundongxiefu",
				"assets/js/page/module/extra/nav_yundongxiefu.ftl");
		map.put("nav_yundonghuwai",
				"assets/js/page/module/extra/nav_yundonghuwai.ftl");
		map.put("nav_meirong", "assets/js/page/module/extra/nav_meirong.ftl");
		map.put("nav_neiyi", "assets/js/page/module/extra/nav_neiyi.ftl");
		map.put("nav_xiangbao", "assets/js/page/module/extra/nav_xiangbao.ftl");
		map.put("nav_fushipeijian",
				"assets/js/page/module/extra/nav_fushipeijian.ftl");
		map.put("nav_shipin", "assets/js/page/module/extra/nav_shipin.ftl");
		map.put("nav_zhubao", "assets/js/page/module/extra/nav_zhubao.ftl");
		map.put("nav_shoubiao", "assets/js/page/module/extra/nav_shoubiao.ftl");
		map.put("nav_muying", "assets/js/page/module/extra/nav_muying.ftl");
		map.put("nav_jiaju", "assets/js/page/module/extra/nav_jiaju.ftl");
		map.put("nav_riyong", "assets/js/page/module/extra/nav_riyong.ftl");
		map.put("nav_food", "assets/js/page/module/extra/nav_food.ftl");
		map.put("nav_jiankang", "assets/js/page/module/extra/nav_jiankang.ftl");
		map.put("nav_qiche", "assets/js/page/module/extra/nav_qiche.ftl");
		map.put("nav_wanju", "assets/js/page/module/extra/nav_wanju.ftl");
		try {
			File htmlFile = null;
			File parent = null;
			Writer out = null;
			Template template = null;
			for (String module : map.keySet()) {
				htmlFile = new File(EnvManager.getZonePath() + File.separator
						+ "module" + File.separator + module + ".html");
				parent = new File(htmlFile.getParent());
				if (!parent.exists()) {
					parent.mkdirs();
				}
				if (!htmlFile.exists()) {// 如果不存在则是第一次发布
					htmlFile.createNewFile();
				}
				out = new BufferedWriter(new OutputStreamWriter(
						new FileOutputStream(htmlFile), "UTF-8"));
				template = fcg.getConfiguration().getTemplate(map.get(module));
				Map<String, Object> maps = new HashMap<String, Object>();
				template.setEncoding("UTF-8");
				template.process(maps, out);// 生成具体模块内容并输出
				out.flush();
				out.close();
				logger.info(module + " deploy");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 同步亿起发
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/synyiqifa/{method}")
	@ResponseBody
	public String synQiyifa(@PathVariable String method,
			HttpServletRequest request) {
		if ("cat".equals(method)) {
			yiqifaJob.synYiqifaCategory();
		} else if ("mall".equals(method)) {
			yiqifaJob.synYiqifaMall();
		} else if ("detail".equals(method)) {
			yiqifaJob.synYiqifaMallDetail();
		} else if ("all".equals(method)) {
			yiqifaJob.synYiqifa();
		} else if ("reports".equals(method)) {
			yiqifaReportsJob.synYiqifaReports();
		} else if ("orderstatus".equals(method)) {
			yiqifaOrderStatusJob.synYiqifaOrderStatus();
		} else if ("deployCat".equals(method)) {
			yiqifaJob.deployYiqifaCateogry();
		} else if ("deployMall".equals(method)) {
			yiqifaJob.deployYiqifaMall();
		} else if ("deployMallTabNav".equals(method)) {
			yiqifaJob.deployYiqifaMallTabNav();
		} else if ("deployMallSideNav".equals(method)) {
			yiqifaJob.deployYiqifaMallSideNav();
		} else if ("deployJs".equals(method)) {
			yiqifaJob.deployYiqifaMallJs();
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 同步未生成广告投放的页面
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/synadspage")
	@ResponseBody
	public String synadspage(HttpServletRequest request) {
		adminService.refreshAdsUserTemplate();
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 同步推广订单
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/synsession")
	@ResponseBody
	public String synsession(HttpServletRequest request) {
		taobaoSessionJob.synTaobaoSession();
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 同步未同步的版本号（一般为审核期间造成用户版本未存储在本地）
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/unsynversion")
	@ResponseBody
	public String synversion(HttpServletRequest request) {
		taobaoNicksJob.synVersion();
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 同步所有1f的版本号（同步完后，生成禁止爬虫的robots）
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/noversion")
	@ResponseBody
	public String synlowVersion(HttpServletRequest request) {

		List<T_UserSubscribe> usbs = adminService.findAllByCriterion(
				T_UserSubscribe.class, R.lt("versionNo", 1f));
		for (T_UserSubscribe usb : usbs) {
			List<Site> sites = pageService.findAllByCriterion(Site.class,
					R.eq("status", 1), R.eq("user_id", usb.getUser_id()));
			if (sites != null && sites.size() > 0) {
				for (Site site : sites) {
					try {
						// 生成ROBOTS.TXT
						File htmlFile = new File(EnvManager.getUserPath("shop"
								+ site.getUser_id())
								+ File.separator + "robots.txt");
						File parent = new File(htmlFile.getParent());
						if (!parent.exists()) {
							parent.mkdirs();
						}
						if (!htmlFile.exists()) {// 如果不存在则是第一次发布
							htmlFile.createNewFile();
						}
						Writer out = new BufferedWriter(new OutputStreamWriter(
								new FileOutputStream(htmlFile), "UTF-8"));
						Template template = fcg.getConfiguration().getTemplate(
								"site/designer/template/noRobots.ftl");
						Map<String, Object> maps = new HashMap<String, Object>();
						template.setEncoding("UTF-8");
						template.process(maps, out);// 生成具体模块内容并输出
						out.flush();
						out.close();
						logger.info(site.getUser_id() + " robots Disallow");
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 发布高版本页面
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/autoDeployPageJob")
	@ResponseBody
	public String autoDeployPageJob(HttpServletRequest request) {
		autoDeployPageJob.deployPage();
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 发布高版本页面
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/sitemap/{user_id}")
	@ResponseBody
	public String sitemap(@PathVariable String user_id,
			HttpServletRequest request) {
		List<T_UserSubscribe> usbs = new ArrayList<T_UserSubscribe>();
		if (user_id != null) {
			usbs = adminService.findAllByCriterion(T_UserSubscribe.class,
					R.eq("user_id", user_id));
		} else {
			usbs = adminService.findAllByCriterion(T_UserSubscribe.class,
					R.gt("versionNo", 1.5f));
		}

		if (usbs != null && usbs.size() > 0)
			autoDeployPageJob.generateSiteMap(usbs);

		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 抓取所有的订单记录
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/orders")
	@ResponseBody
	public String orders(HttpServletRequest request) {
		articleBizOrderJob.getAllOrders();
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 抓取前一天的订单记录
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/orders/lastday")
	@ResponseBody
	public String ordersLastday(HttpServletRequest request) {
		articleBizOrderJob.synOrders();
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 刷新所有会员版本号
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/ads/versionNo")
	@ResponseBody
	public String versionNos(HttpServletRequest request) {
		adsCommand.refreshVersionNo();
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * adsCommand
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/ads/refreshAds")
	@ResponseBody
	public String refreshAds(HttpServletRequest request) {
		adsCommand.refreshAds();
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 蜘蛛
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/spider/{spider}")
	@ResponseBody
	public String templates(@PathVariable String spider,
			HttpServletRequest request) {
		if ("mallIndexFloorSpider".equals(spider)) {
			mallIndexFloorSpider.crawl(adminService, fcg);
		} else if ("mallSliderPicturesSpider".equals(spider)) {
			mallSliderPicturesSpider.crawl(adminService, fcg);
		} else if ("mallIndexNewFloorSpider".equals(spider)) {
			mallIndexNewFloorSpider.crawl(adminService, fcg);
		} else if ("dianpuPaihangSpider".equals(spider)) {
			dianpuPaihangSpider.crawl(adminService, fcg);
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 更新系统模板
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/templates")
	@ResponseBody
	public String templates(HttpServletRequest request) {
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
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 更新排行榜
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/top")
	@ResponseBody
	public String synTop(HttpServletRequest request) {
		xintaoTopJob.synXintaoTop();
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 更新关键词
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/keyword")
	@ResponseBody
	public String synKeyword(HttpServletRequest request) {
		taobaoKeywordJob.synKeywords();
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 同步店铺街
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/dianpu")
	@ResponseBody
	public String synDianPu(HttpServletRequest request) {
		dianpuCommand.synDianpu();
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 发布店铺街首页右侧
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/dianpu/deploy")
	@ResponseBody
	public String deployDianpuIndex(HttpServletRequest request) {
		dianpuCommand.deployDianpuIndex();
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 同步淘店铺的淘宝店铺
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/dianpu/syntaobao")
	@ResponseBody
	public String synDianpuTaobao(HttpServletRequest request) {
		dianpuCommand.synTaobaoDianpu();
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 同步页面元信息
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/page/meta")
	@ResponseBody
	public String synPageMeta(HttpServletRequest request) {
		String sql = "select id from w_page where id not in (select id from w_page_meta)";// 查找未同步元信息的页面
		List<String> result = (List<String>) adminService.executeNativeSql(sql,
				new HashMap<String, Object>());
		if (result != null && result.size() > 0) {
			for (String id : result) {
				adminService.refreshPageMeta(id);
			}
		}
		result.clear();
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 同步指定页面元信息
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/page/meta/{id}")
	@ResponseBody
	public String synPageMeta(@PathVariable String id,
			HttpServletRequest request) {
		adminService.refreshPageMeta(id);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 更新主题有效
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/mail/send")
	@ResponseBody
	public String mailSend(HttpServletRequest request) {
		mailSendJob.mailSend();
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 新版本
	 */
	@Autowired
	private IPageService pageService;
	/**
	 * 新版本
	 */
	@Autowired
	private ModuleMethod moduleMethod;

	@RequestMapping(value = "/robots/all")
	@ResponseBody
	public String robots() {
		List<Site> sites = pageService.findAllByCriterion(Site.class,
				R.eq("status", 1));
		if (sites != null && sites.size() > 0) {
			for (Site site : sites) {
				try {
					// 生成ROBOTS.TXT
					File htmlFile = new File(EnvManager.getUserPath("shop"
							+ site.getUser_id())
							+ File.separator + "robots.txt");
					File parent = new File(htmlFile.getParent());
					if (!parent.exists()) {
						parent.mkdirs();
					}
					if (!htmlFile.exists()) {// 如果不存在则是第一次发布
						htmlFile.createNewFile();
					}
					Writer out = new BufferedWriter(new OutputStreamWriter(
							new FileOutputStream(htmlFile), "UTF-8"));
					Template template = fcg.getConfiguration().getTemplate(
							"site/designer/template/robots.ftl");
					Map<String, Object> maps = new HashMap<String, Object>();
					if (StringUtils.isNotBlank(site.getWww())) {
						maps.put("www", "http://" + site.getWww());
					}
					template.setEncoding("UTF-8");
					template.process(maps, out);// 生成具体模块内容并输出
					out.flush();
					out.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return WindSiteRestUtil.SUCCESS;
	}

	@RequestMapping(value = "/deploy/all")
	@ResponseBody
	public String deployAll() {
		List<UserPage> pages = pageService.findAllByCriterion(UserPage.class,
				R.eq("status", true));
		if (pages != null && pages.size() > 0) {
			for (UserPage page : pages) {
				try {
					pageService.deployPage(fcg, page.getUser_id(),
							page.getId(), moduleMethod, false);
					logger.info(page.getId() + "[" + page.getNick() + "-"
							+ page.getTitle() + "] deploy successful");
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return WindSiteRestUtil.SUCCESS;
	}

	@RequestMapping(value = "/deploy/page/{id}")
	@ResponseBody
	public String deployById(@PathVariable String id) {
		UserPage page = pageService.get(UserPage.class, id);
		if (page != null) {
			try {
				pageService.deployPage(fcg, page.getUser_id(), page.getId(),
						moduleMethod, false);
				logger.info(page.getId() + "[" + page.getNick() + "-"
						+ page.getTitle() + "] deploy successful");
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			SystemException.handleMessageException("页面不存在");
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 更新主题有效
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/syn/posterchannel")
	@ResponseBody
	public String synPosterChannel(HttpServletRequest request) {
		adminService.deleteAll(T_PosterChannel.class);// 删除所有画报频道
		HuabaoChannelsGetRequest req = new HuabaoChannelsGetRequest();
		HuabaoChannelsGetResponse resp = TaobaoFetchUtil.channelsGet(req);
		if (resp != null) {
			List<PosterChannel> channels = resp.getChannels();
			if (channels != null && channels.size() > 0) {
				T_PosterChannel c = null;
				for (PosterChannel channel : channels) {
					c = new T_PosterChannel();
					c.setCn_name(channel.getCnName());
					c.setDescription(channel.getDesc());
					c.setId(Long.valueOf(channel.getId()));
					c.setName(channel.getName());
					c.setUrl(channel.getUrl());
					adminService.save(c);
				}
			}
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 获取淘宝店铺前台类目
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/shopCats/get")
	@ResponseBody
	public String shopCatsGet(HttpServletRequest request) {
		ShopcatsListGetResponse response = TaobaoFetchUtil.shopCatsGet("0",
				new ShopcatsListGetRequest());
		if (response != null) {
			List<ShopCat> cats = response.getShopCats();
			if (cats != null && cats.size() > 0) {
				adminService.deleteAll(T_ShopCat.class);// 删除所有分类
				T_ShopCat nCat = null;
				for (ShopCat cat : cats) {
					nCat = new T_ShopCat();
					nCat.setCid(cat.getCid());
					nCat.setIsParent(cat.getIsParent());
					nCat.setName(cat.getName());
					nCat.setParentCid(cat.getParentCid());
					adminService.save(nCat);
				}
			}
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 获取淘宝推广店铺昵称
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/taobaokeShop/getnicks")
	@ResponseBody
	public String taobakeShopNickGet(HttpServletRequest request) {
		getTaobaokeShopNick(new Page<T_TaobaokeShop>(1, 1000));
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 同步店铺标题，信用，佣金信息（taobao.shop.get:sid,cid,pic_path,shop_score）
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/taobaokeShop/syncomm")
	@ResponseBody
	public String taobakeShopSynCommission(HttpServletRequest request) {
		getTaobaokeShopCommission(new Page<T_TaobaokeShop>(1, 10));
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 同步店铺标题，信用，佣金信息（taobao.shop.get:sid,cid,pic_path,shop_score）
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/taobaokeShop/syncommbynick")
	@ResponseBody
	public String taobakeShopSynCommissionBynick(HttpServletRequest request) {
		getTaobaokeShopCommissionByNick(new Page<T_TaobaokeShop>(1, 10));
		return WindSiteRestUtil.SUCCESS;
	}

	private void getTaobaokeShopCommissionByNick(Page<T_TaobaokeShop> page) {
		List<T_TaobaokeShop> shops = adminService.findAllByCriterion(page,
				T_TaobaokeShop.class, R.isNull("title"), R.isNotNull("nick"));
		if (shops != null && shops.size() > 0) {
			for (T_TaobaokeShop shop : shops) {
				try {
					Shop tShop = TaobaoFetchUtil.getTaobaoShop("0",
							shop.getNick());
					shop.setCid(tShop.getCid());
					shop.setCid(tShop.getCid());
					shop.setTitle(tShop.getTitle());
					shop.setPicPath(tShop.getPicPath());
					shop.setSid(tShop.getSid());
					shop.setNick(tShop.getNick());
					ShopScore score = tShop.getShopScore();
					if (score != null) {
						shop.setItemScore(score.getItemScore());
						shop.setServiceScore(score.getServiceScore());
						shop.setDeliveryScore(score.getDeliveryScore());
					}
					List<TaobaokeShop> tShops = TaobaoFetchUtil
							.convertTaobaoShop(EnvManager.getAppType(),
									"fxy060608", shop.getSid() + "");
					if (tShops != null && tShops.size() == 1) {// 查询信用和佣金比率
						shop.setTitle(tShops.get(0).getShopTitle());
						shop.setCommissionRate(tShops.get(0)
								.getCommissionRate());
						shop.setIsValid(true);
					} else {
						shop.setIsValid(false);
					}
					shop.setIsValid(true);
					adminService.update(shop);
				} catch (Exception e) {
					if (e instanceof SystemException) {
						if ("isv.shop-service-error:SHOP_IS_NOT_EXIST"
								.equals(((SystemException) e).getKey())
								|| "isv.invalid-parameter:user-without-shop"
										.equals(((SystemException) e).getKey())) {// 店铺不存在
							adminService.deleteAll(W_ShopFavorite.class,
									R.eq("user_id", shop.getUserId()));
							adminService.delete(T_TaobaokeShop.class,
									shop.getUserId());
							logger.info(shop.getNick() + "====不存在店铺");
						}
					}
				}
			}
		}
		if (page.isHasNextPage()) {
			page.setPageNo(page.getNextPage());
			getTaobaokeShopCommissionByNick(page);
		}
	}

	private void getTaobaokeShopCommission(Page<T_TaobaokeShop> page) {
		List<T_TaobaokeShop> shops = adminService.findAllByCriterion(page,
				T_TaobaokeShop.class,
				R.or(R.isNull("title"), R.isNull("sellerCredit")),
				R.isNotNull("sid"));
		if (shops != null && shops.size() > 0) {
			String sids = "";
			Boolean isFirst = true;
			for (T_TaobaokeShop shop : shops) {
				if (isFirst) {
					isFirst = false;
				} else {
					sids += ",";
				}
				sids += shop.getSid();
			}
			List<TaobaokeShop> tShops = TaobaoFetchUtil.convertTaobaoShop("0",
					"fxy060608", sids);
			if (tShops != null && tShops.size() > 0) {
				for (TaobaokeShop shop : tShops) {
					T_TaobaokeShop oShop = adminService.get(
							T_TaobaokeShop.class, shop.getUserId());
					oShop.setTitle(shop.getShopTitle());
					oShop.setCommissionRate(shop.getCommissionRate());
					adminService.update(oShop);
				}
			}
		}
		if (page.isHasNextPage()) {
			page.setPageNo(page.getNextPage());
			getTaobaokeShopCommission(page);
		}
	}

	/**
	 * 根据昵称同步店铺信息（taobao.shop.get:sid,cid,pic_path,shop_score）
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/taobaokeShop/syninfo")
	@ResponseBody
	public String taobakeShopSynInfo(HttpServletRequest request) {
		getTaobaokeShopInfo(new Page<T_TaobaokeShop>(1, 1000));
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 根据昵称同步店铺信息（taobao.shop.get:sid,cid,pic_path,shop_score）
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/taobaokeShop/syncredit")
	@ResponseBody
	public String taobakeShopSynCredit(HttpServletRequest request) {
		getTaobaokeShopCredit(new Page<T_TaobaokeShop>(1, 1000));
		return WindSiteRestUtil.SUCCESS;
	}

	private void getTaobaokeShopCredit(Page<T_TaobaokeShop> page) {
		List<T_TaobaokeShop> shops = adminService.findAllByCriterion(page,
				T_TaobaokeShop.class, R.isNotNull("nick"),
				R.isNull("sellerCredit"));
		if (shops != null && shops.size() > 0) {
			for (T_TaobaokeShop shop : shops) {
				com.taobao.api.domain.User user = TaobaoFetchUtil
						.getTaobaoShopCredit("0", shop.getNick());
				if (user.getSellerCredit() != null) {
					Long level = user.getSellerCredit().getLevel();
					shop.setSellerCredit(level != null ? (level + "") : "1");
					adminService.update(shop);
				}
			}
		}
		if (page.isHasNextPage()) {
			page.setPageNo(page.getNextPage());
			getTaobaokeShopCredit(page);
		}
	}

	private void getTaobaokeShopInfo(Page<T_TaobaokeShop> page) {
		List<T_TaobaokeShop> shops = adminService.findAllByCriterion(page,
				T_TaobaokeShop.class, R.isNotNull("nick"), R.isNull("sid"));
		ShopGetRequest request = new ShopGetRequest();
		request.setFields("sid,cid,pic_path,shop_score");
		if (shops != null && shops.size() > 0) {
			for (T_TaobaokeShop shop : shops) {
				try {
					request.setNick(shop.getNick());
					Shop tShop = TaobaoFetchUtil.getTaobaoShop("0", request);
					if (tShop != null) {
						shop.setCid(tShop.getCid());
						shop.setPicPath(tShop.getPicPath());
						shop.setSid(tShop.getSid());
						shop.setItemScore(tShop.getShopScore().getItemScore());
						shop.setServiceScore(tShop.getShopScore()
								.getServiceScore());
						shop.setDeliveryScore(tShop.getShopScore()
								.getDeliveryScore());
					}
					adminService.update(shop);
				} catch (Exception e) {
					if ("isv.shop-service-error:SHOP_IS_NOT_EXIST"
							.equals(((SystemException) e).getKey())
							|| "isv.invalid-parameter:user-without-shop"
									.equals(((SystemException) e).getKey())) {// 店铺不存在
						adminService.deleteAll(W_ShopFavorite.class,
								R.eq("user_id", shop.getUserId()));
						adminService.delete(T_TaobaokeShop.class,
								shop.getUserId());
						logger.info(shop.getNick() + "====不存在店铺");
					}
					e.printStackTrace();
				}
			}
		}
		if (page.isHasNextPage()) {
			getTaobaokeShopInfo(page);
		}
	}

	/**
	 * 店铺街淘宝推广店铺昵称（可查询店铺用户id，昵称）
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/taobaokeShop/getnicksanduserid")
	@ResponseBody
	public String taobakeShopStreetNickGet(HttpServletRequest request) {
		try {
			// 主题:
			Integer count = 110;
			Integer pageCount = 40;
			String sort = request.getParameter("sort");
			if (StringUtils.isNotEmpty(sort)) {
				if ("1".equals(sort)) {
					sort = "shop_renqi_desc";
				} else {
					sort = "ratesum_desc";
				}
			} else {
				sort = "ratesum_desc";
			}
			for (int page = 0; page < count; page++) {
				Parser parser = new Parser(
						"http://shopsearch.taobao.com/browse/shop_search.htm?s="
								+ pageCount * page + "&stat=4&sort=" + sort);
				NodeList div = parser
						.extractAllNodesThatMatch(new HasAttributeFilter(
								"class", "nick"));
				if (div != null && div.size() > 0) {
					for (int i = 0; i < div.size(); i++) {
						LinkTag nick = (LinkTag) (div
								.elementAt(i)
								.getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("a"), true)
								.elementAt(0));
						String userId = nick.getAttribute("href").split(".htm")[0]
								.split("user-rate-")[1];
						String nickStr = nick.getLinkText().trim();
						T_TaobaokeShop shop = adminService.get(
								T_TaobaokeShop.class, Long.valueOf(userId));
						if (shop != null) {
							shop.setNick(nickStr);
							adminService.update(shop);
						} else {
							shop = new T_TaobaokeShop();
							shop.setUserId(Long.valueOf(userId));
							shop.setNick(nickStr);
							adminService.save(shop);
						}
					}
				}
			}

		} catch (ParserException e) {
			e.printStackTrace();
		}
		return WindSiteRestUtil.SUCCESS;
	}

	private void getTaobaokeShopNick(Page<T_TaobaokeShop> page) {
		List<T_TaobaokeShop> shops = adminService.findAllByCriterion(page,
				T_TaobaokeShop.class, R.isNull("nick"), R.eq("isValid", true));
		ShopGetRequest request = new ShopGetRequest();
		request.setFields("sid,cid,pic_path,shop_score");
		if (shops != null && shops.size() > 0) {
			for (T_TaobaokeShop shop : shops) {

				if (StringUtils.isEmpty(shop.getNick())) { // 获取昵称
					try {
						Parser parser = new Parser(
								"http://rate.taobao.com/user-rate-"
										+ shop.getUserId() + ".htm");
						NodeList list = parser
								.extractAllNodesThatMatch(new HasAttributeFilter(
										"class", "J_WangWang"));
						if (list != null && list.size() > 0) {
							TagNode ww = (TagNode) list
									.elementAt(list.size() - 1);
							shop.setNick(ww.getAttribute("data-nick"));
						}
						Thread.sleep(8000);
					} catch (Exception e) {
						if (e instanceof ParserException
								|| e instanceof FileNotFoundException) {
							break;
						}
					}
				}
				if (StringUtils.isNotEmpty(shop.getNick())
						&& StringUtils.isEmpty(shop.getItemScore())) {
					request.setNick(shop.getNick());
					try {
						Shop tShop = TaobaoFetchUtil
								.getTaobaoShop("0", request);
						if (tShop != null) {
							shop.setCid(tShop.getCid());
							shop.setPicPath(tShop.getPicPath());
							shop.setSid(tShop.getSid());
							shop.setItemScore(tShop.getShopScore()
									.getItemScore());
							shop.setServiceScore(tShop.getShopScore()
									.getServiceScore());
							shop.setDeliveryScore(tShop.getShopScore()
									.getDeliveryScore());
						}
						adminService.update(shop);
						logger.info("shop[" + shop.getUserId() + "]====updated");
					} catch (Exception e) {
						if (e instanceof SystemException) {
							if ("isv.shop-service-error:SHOP_IS_NOT_EXIST"
									.equals(((SystemException) e).getKey())
									|| "isv.invalid-parameter:user-without-shop"
											.equals(((SystemException) e)
													.getKey())) {// 店铺不存在
								shop.setIsValid(false);
								adminService.update(shop);
								logger.info(shop.getNick() + "====不存在店铺");
							}
						}
						e.printStackTrace();
					}
				} else {
					adminService.update(shop);
				}
			}
		}
	}

	/**
	 * 更新主题有效
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/tbtheme/valid")
	@ResponseBody
	public String updateThemeValid(HttpServletRequest request) {
		String[] themes = FileUtil.listFiles(new File(EnvManager
				.getApachePath()
				+ File.separator
				+ "htdocs"
				+ File.separator
				+ "assets"
				+ File.separator
				+ "min"
				+ File.separator
				+ "stylesheets" + File.separator + "theme"));
		if (themes != null && themes.length > 0) {
			for (String str : themes) {
				str = str.replace(".css", "");
				PageTheme theme = adminService.get(PageTheme.class,
						Long.valueOf(str));
				if (theme != null) {
					theme.setIsValid(true);
					adminService.update(theme);
				} else {
					System.out.println("未找到【" + str + "】主题");
				}
			}
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 访问所有系统模板（新）
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/pages")
	public ModelAndView pagesManager(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		List<PageTemplate> pages = adminService
				.findAllByCriterion(PageTemplate.class);
		result.put("pages", pages);
		return new ModelAndView("site/admin/page/pageManager", result);
	}

	/**
	 * 访问所有广告计划管理
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/ads", method = RequestMethod.POST)
	public ModelAndView adsManager(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		return new ModelAndView("site/admin/ads/adsSearch", result);
	}

	/**
	 * 访问所有广告计划管理
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/ads/plan/{id}", method = RequestMethod.GET)
	@ResponseBody
	public String adsPlan(@PathVariable String id, HttpServletRequest request) {
		ADPlan plan = adminService.get(ADPlan.class, id);
		if (plan != null && plan.getIsDefault()) {
			ADPlanCommand command = new ADPlanCommand();// 产生广告投放异步命令
			command.setPlan(plan);
			CommandExecutor.getCommands().add(command);
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 访问所有广告计划
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/ads/search", method = RequestMethod.POST)
	public ModelAndView adsSearch(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String q = request.getParameter("q");// 卖家昵称
		String pageNoStr = request.getParameter("pageNo");// 页码
		String isDefaultStr = request.getParameter("isDefault");// 是否主推
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		Page<ADPlan> page = new Page<ADPlan>(pageNo, 30);
		SimpleExpression nickFilter = null;
		SimpleExpression isDefaultFilter = null;
		if (StringUtils.isNotEmpty(q)) {
			nickFilter = R.like("nick", q, MatchMode.ANYWHERE);
		}
		if (StringUtils.isNotEmpty(isDefaultStr) && "true".equals(isDefaultStr)) {
			isDefaultFilter = R.eq("isDefault", true);
		}
		result.put("plans", adminService.findAllByCriterion(page, ADPlan.class,
				nickFilter, isDefaultFilter));
		result.put("page", page);
		return new ModelAndView("site/admin/ads/adsSearchResult", result);
	}

	/**
	 * 访问新增阵地页面
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/forum/add/{type}", method = RequestMethod.GET)
	public ModelAndView addForumView(@PathVariable String type,
			HttpServletRequest request) {
		return new ModelAndView("site/admin/forum/addForum", "types",
				adminService.findAllByCriterion(ForumType.class,
						R.eq("parent", type)));
	}

	@Autowired
	private WidgetCustomerMethod widgetCustomer;

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/widgetauto", method = RequestMethod.GET)
	@ResponseBody
	public String deployautoWidget(HttpServletRequest request) {
		List<CustomeWidget> cws = (List<CustomeWidget>) adminService.findByHql(
				"from CustomeWidget where content like '%mm_13667242_0_0%'",
				new HashMap<String, Object>());
		if (cws != null && cws.size() > 0) {
			for (CustomeWidget cw : cws) {
				cw.setContent(cw.getContent().replaceAll("mm_13667242_0_0",
						"\\${pid}"));
				adminService.update(cw);
				if (cw.getUsed() != null && cw.getUsed() > 0) {
					if (!CommandExecutor.getUpdatecommands().containsKey(
							"w-" + cw.getId())) {// 如果队列中不包含此组件的更新命令
						UpdateUserTemplateCommand command = new UpdateUserTemplateCommand();
						command.setDeployZone(deployZone);
						command.setFcg(fcg);
						command.setWidget(cw);
						command.setWidgetCustomer(widgetCustomer);
						CommandExecutor.getUpdatecommands().putIfAbsent(
								"w-" + cw.getId(), command);
					}
				}
			}
		}
		return WindSiteRestUtil.SUCCESS;
	}

	@RequestMapping(value = "/memupgrade", method = RequestMethod.GET)
	@ResponseBody
	public String memupgrade(HttpServletRequest request) {
		adminService.modifyMemberAndMemberInfo();
		return WindSiteRestUtil.SUCCESS;
	}

	@RequestMapping(value = "/reportupgrade", method = RequestMethod.GET)
	@ResponseBody
	public String reportupgrade(HttpServletRequest request) {
		adminService.modifyReportAndTrade();
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 重新开始发送周报
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/forum/add", method = RequestMethod.POST)
	@ResponseBody
	public String addForum(HttpServletRequest request) {
		String title = request.getParameter("title");
		String sortOrder = request.getParameter("sortOrder");
		String url = request.getParameter("url");
		String realUrl = request.getParameter("realUrl");
		String type = request.getParameter("type");
		Forum forum = adminService.findByCriterion(Forum.class,
				R.eq("title", title), R.eq("type.id", type));
		if (forum == null) {
			forum = new Forum();
			forum.setTitle(title);
			forum.setSortOrder(Integer.parseInt(sortOrder));
			forum.setUrl(url);
			forum.setRealUrl(realUrl);
			forum.setFavorite(0);
			ForumType forumType = adminService.get(ForumType.class, type);
			if (forumType != null) {
				forum.setType(forumType);
				adminService.save(forum);
			}
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 管理控制台
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ModelAndView admin(HttpServletRequest request) {
		return new ModelAndView("site/admin/admin");
	}

	/**
	 * 创建索引
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/createIndexer/{type}", method = RequestMethod.GET)
	@ResponseBody
	public String createIndexer(@PathVariable String type,
			HttpServletRequest request) {
		if ("shop".equals(type)) {

		} else if ("huabao".equals(type)) {
			Page<Huabao> page = new Page<Huabao>(1, 500);
			List<Huabao> temp = new ArrayList<Huabao>();
			createIndexer(page, temp, Huabao.class);
		} else if ("poster".equals(type)) {
			Page<T_Poster> page = new Page<T_Poster>(1, 500);
			List<T_Poster> temp = new ArrayList<T_Poster>();
			createIndexer(page, temp, T_Poster.class);
		}
		return WindSiteRestUtil.SUCCESS;
	}

	private <T> void createIndexer(Page<T> page, List<T> temp, Class<T> clazz) {
		adminService.createIndexer(page, temp, clazz);
		if (page.isHasNextPage()) {
			page.setPageNo(page.getNextPage());
			createIndexer(page, temp, clazz);
		}
	}

	/**
	 * 用户分析
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/userAnalytics", method = RequestMethod.GET)
	public ModelAndView userAnalytics(HttpServletRequest request) {
		return new ModelAndView("site/admin/userAnalytics");
	}

	/**
	 * 用户管理
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/userManager", method = RequestMethod.GET)
	public ModelAndView userManager(HttpServletRequest request) {
		String date = request.getParameter("date");
		Calendar start = Calendar.getInstance();
		if (StringUtils.isNotEmpty(date)) {
			try {
				start.setTime(DateUtils.parseDate(date,
						new String[] { DateUtils.YYYY_MM_DD }));
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		start.set(Calendar.HOUR, 0);
		start.set(Calendar.MINUTE, 0);
		start.set(Calendar.SECOND, 0);
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("start", start.getTime());
		start.add(Calendar.DATE, 1);
		params.put("end", start.getTime());
		int userCount = ((Long) adminService.findByHql(
				"select count(*) from User", new HashMap<String, Object>())
				.get(0)).intValue();
		int siteCount = ((Long) adminService.findByHql(
				"select count(*) from Site where status=1",
				new HashMap<String, Object>()).get(0)).intValue();
		int currentSiteCount = ((Long) adminService
				.findByHql(
						"select count(*) from Site where status=1 and created between :start and :end",
						params).get(0)).intValue();
		String hql = "from User where created between :start and :end order by created desc";
		List<User> users = (List<User>) adminService.findByHql(hql, params);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("userCount", userCount);
		result.put("users", users);
		result.put("siteCount", siteCount);
		result.put("currentDate", date);
		result.put("currentSiteCount", currentSiteCount);
		return new ModelAndView("site/admin/userManager", result);
	}

	/**
	 * 商品推荐
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/adItemsManager", method = RequestMethod.POST)
	public ModelAndView adItemsManager(HttpServletRequest request) {
		String nick = request.getParameter("nick");
		List<ADTaobaokeItem> items = new ArrayList<ADTaobaokeItem>();
		if (StringUtils.isNotEmpty(nick)) {
			items = adminService.findAllByCriterion(ADTaobaokeItem.class,
					R.eq("nick", nick));
		} else {
			items = adminService.findAllByCriterion(ADTaobaokeItem.class);
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("nick", nick);
		result.put("items", items);
		return new ModelAndView("site/admin/adItemsManager", result);
	}

	/**
	 * 增加商品推荐
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/adItemsManager/add/{id}", method = RequestMethod.POST)
	@ResponseBody
	public String AddadItemsManager(@PathVariable String id,
			HttpServletRequest request) {
		// List<TaobaokeItem> items = TaobaoFetchUtil.itemsConvert(id,
		// EnvManager
		// .getUser().getNick());
		// String cid = request.getParameter("cid");
		// if (StringUtils.isEmpty(cid)) {
		// cid = "0";
		// }
		// if (items != null && items.size() == 1) {
		// ADTaobaokeItem item = adminService.findByCriterion(
		// ADTaobaokeItem.class, R.eq("num_iid", Long.parseLong(id)));
		// TaobaokeItem tItem = items.get(0);
		// if (item == null) {
		// item = new ADTaobaokeItem();
		// TaobaoFetchUtil.convertItems(item, tItem);
		// item.setIsValid(true);
		// item.setCid(cid);
		// adminService.save(item);
		// } else {
		// TaobaoFetchUtil.convertItems(item, tItem);
		// item.setIsValid(true);
		// item.setCid(cid);
		// adminService.update(item);
		// }
		// } else {
		// SystemException.handleMessageException("该商品不存在或者没有加入推广");
		// }
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 设计器错误日志
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/designer/error", method = RequestMethod.GET)
	public ModelAndView designerError(HttpServletRequest request) {
		List<DesignerErrorLog> errors = (List<DesignerErrorLog>) adminService
				.findByHql("from DesignerErrorLog order by created desc",
						new HashMap<String, Object>());
		return new ModelAndView("site/admin/designerError", "errors", errors);
	}

	/**
	 * 获取报表数据
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/userAnalytics/data", method = RequestMethod.POST)
	@ResponseBody
	public String userAnalyticsResult(HttpServletRequest request) {
		String type = request.getParameter("type");
		if (StringUtils.isEmpty(type)) {
			SystemException.handleMessageException("未指定报表类型");
		}
		Integer t = Integer.parseInt(type);
		switch (t) {
		case 0:// 用户注册分析
			return userRegisterAnalytics(request);
		case 1:// 用户登录分析
			return userLoginAnalytics(request);
		}
		return WindSiteRestUtil.SUCCESS;
	}

	@SuppressWarnings("unchecked")
	private String userRegisterAnalytics(HttpServletRequest request) {
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String analyticsType = request.getParameter("analyticsType");
		List<Object[]> result = (List<Object[]>) adminService
				.userRegisterAnalytics(analyticsType, startDate, endDate);
		JsonArray array = new JsonArray();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		for (Object[] obj : result) {
			JsonObject jObj = new JsonObject();
			if (obj[0] instanceof Date) {
				jObj.addProperty("created", format.format((Date) obj[0]));
			} else {
				jObj.addProperty("created", (Integer) obj[0]);
			}
			jObj.addProperty("count", (BigInteger) obj[1]);
			array.add(jObj);
		}
		return array.toString();
	}

	@SuppressWarnings("unchecked")
	private String userLoginAnalytics(HttpServletRequest request) {
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String analyticsType = request.getParameter("analyticsType");
		List<Object[]> result = (List<Object[]>) adminService
				.userLoginAnalytics(analyticsType, startDate, endDate);
		JsonArray array = new JsonArray();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		for (Object[] obj : result) {
			JsonObject jObj = new JsonObject();
			if (obj[0] instanceof Date) {
				jObj.addProperty("created", format.format((Date) obj[0]));
			} else if (obj[0] instanceof Integer) {
				jObj.addProperty("created", (Integer) obj[0]);
			} else {
				jObj.addProperty("created", obj[0] != null ? obj[0].toString()
						: "");
			}
			jObj.addProperty("count", (BigInteger) obj[1]);
			array.add(jObj);
		}
		return array.toString();
	}

	/**
	 * 查询未审核酷站
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/coolsites/audit", method = RequestMethod.GET)
	public ModelAndView getUnAuditCoolSites(HttpServletRequest request) {
		List<CoolSite> sites = adminService.findAllByCriterion(CoolSite.class,
				R.eq("isValid", false), R.isNull("remark"));
		return new ModelAndView("site/admin/coolsites", "sites", sites);
	}

	/**
	 * 查询未审核域名
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/domain/audit", method = RequestMethod.GET)
	public ModelAndView getUnAuditDomains(HttpServletRequest request) {
		List<DomainHistory> domains = adminService.findAllByCriterion(
				DomainHistory.class, R.eq("status", 0));
		return new ModelAndView("site/admin/domain", "domains", domains);
	}

	/**
	 * 查询未审核的微博域名
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/wbdomain/audit", method = RequestMethod.GET)
	public ModelAndView getUnAuditWeiboDomains(HttpServletRequest request) {
		List<WeiboDomainHistory> domains = adminService.findAllByCriterion(
				WeiboDomainHistory.class, R.eq("status", 0));
		return new ModelAndView("site/admin/weiboDomain", "domains", domains);
	}

	/**
	 * 微博域名审核
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/wbdomain/{id}/audit", method = RequestMethod.POST)
	@ResponseBody
	public String auditWeiboDomains(@PathVariable String id,
			HttpServletRequest request) {
		WeiboDomainHistory dh = adminService.get(WeiboDomainHistory.class, id);
		if (dh == null) {
			SystemException.handleMessageException("当前域名记录不存在");
		}
		String status = request.getParameter("status");
		if ("2".equals(status)) {// 审核未通过
			dh.setDescription(request.getParameter("remark"));
		}
		dh.setStatus(Integer.parseInt(status));
		adminService.auditWeiboDomain(dh);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 审核域名
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/domain/{id}/audit", method = RequestMethod.POST)
	@ResponseBody
	public String auditDomains(@PathVariable String id,
			HttpServletRequest request) {
		DomainHistory dh = adminService.get(DomainHistory.class, id);
		if (dh == null) {
			SystemException.handleMessageException("当前域名记录不存在");
		}
		String status = request.getParameter("status");
		if ("2".equals(status)) {// 审核未通过
			dh.setDescription(request.getParameter("remark"));
		}
		dh.setStatus(Integer.parseInt(status));
		adminService.auditDomain(dh);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 审核酷站
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/coolsite/{id}/audit", method = RequestMethod.POST)
	@ResponseBody
	public String auditCoolSite(@PathVariable String id,
			HttpServletRequest request) {
		CoolSite site = adminService.get(CoolSite.class, id);
		if (site == null) {
			SystemException.handleMessageException("当前酷站不存在");
		}
		Boolean isValid = ("true").equals(request.getParameter("isAudit")) ? true
				: false;
		if (!isValid) {
			site.setRemark(request.getParameter("remark"));
		}
		site.setIsValid(isValid);
		adminService.update(site);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 查询组件类型
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/type/get", method = RequestMethod.GET)
	public ModelAndView getWidgetType(HttpServletRequest request) {
		return new ModelAndView("site/admin/widgettype", "types",
				adminService.getWidgetTypes());
	}

	/**
	 * 查询指定类型所有组件
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/widgets/get/{id}", method = RequestMethod.GET)
	public ModelAndView getWidgets(@PathVariable String id,
			HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		if (id.equals("0")) {// 查询所有
			String hql = "select w from Widget w order by w.sortOrder";
			map.put("widgets",
					adminService.findByHql(hql, new HashMap<String, Object>()));
		} else {
			WidgetType type = adminService.get(WidgetType.class, id);
			if (type == null) {
				SystemException.handleMessageException("组件类型[" + id + "]不存在");
			}
			map.put("type", type);// 当前类型
			Map<String, Object> params = new HashMap<String, Object>();
			String hql = "select w from Widget w where w.type.id=:id order by w.sortOrder";
			params.put("id", id);
			map.put("widgets", adminService.findByHql(hql, params));
		}
		map.put("types", adminService.loadAll(WidgetType.class));// 所有类型
		return new ModelAndView("site/admin/widgets", map);
	}

	/**
	 * 查询指定组件
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/widget/get/{id}", method = RequestMethod.GET)
	public ModelAndView getWidget(@PathVariable String id,
			HttpServletRequest request) {
		Widget widget = adminService.get(Widget.class, id);
		if (widget == null) {
			SystemException.handleMessageException("组件类型[" + id + "]不存在");
		}
		Map<String, Object> result = new HashMap<String, Object>();
		// result.put("datatypes", adminService
		// .findAllByCriterion(WidgetDataType.class, R.eq("type.id",
		// widget.getType().getId())));
		result.put("widget", widget);
		return new ModelAndView("site/admin/widget", result);
	}

	/**
	 * 创建组件类型
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/type/create", method = RequestMethod.POST)
	@ResponseBody
	public String createWidgetType(HttpServletRequest request) {
		String name = request.getParameter("name");
		WidgetType type = adminService.findByCriterion(WidgetType.class,
				R.eq("name", name));
		if (type != null) {
			SystemException.handleMessageException("类别[" + name + "]名称冲突！");
		}
		type = new WidgetType();
		String title = request.getParameter("title");
		String description = request.getParameter("description");
		String sortOrder = request.getParameter("sortOrder");
		type.setTitle(title);
		type.setName(name);
		type.setDescription(description);
		type.setSortOrder(Integer.parseInt(sortOrder));
		adminService.save(type);
		return "{\"id\":\"" + type.getId() + "\"}";
	}

	/**
	 * 修改组件类型
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/type/update/{id}", method = RequestMethod.POST)
	@ResponseBody
	public String updateWidgetType(@PathVariable String id,
			HttpServletRequest request) {
		WidgetType type = adminService.get(WidgetType.class, id);
		if (type == null) {
			SystemException.handleMessageException("未找到类别[" + id + "]！");
		}
		String name = request.getParameter("name");
		WidgetType nameType = adminService.findByCriterion(WidgetType.class,
				R.eq("name", name));
		if (nameType != null) {
			SystemException.handleMessageException("类别[" + name + "]名称冲突！");
		}
		String title = request.getParameter("title");
		String description = request.getParameter("description");
		String sortOrder = request.getParameter("sortOrder");
		type.setTitle(title);
		type.setName(name);
		type.setDescription(description);
		type.setSortOrder(Integer.parseInt(sortOrder));
		adminService.update(type);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 删除组件类型
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/type/delete/{id}", method = RequestMethod.GET)
	@ResponseBody
	public String deleteWidgetType(@PathVariable String id,
			HttpServletRequest request) {
		adminService.delete(WidgetType.class, id);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 创建组件数据类型
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/widgetdatatype/create", method = RequestMethod.POST)
	@ResponseBody
	public String createWidgetDataType(HttpServletRequest request) {
		String name = request.getParameter("name");
		WidgetDataType dataType = adminService.findByCriterion(
				WidgetDataType.class, R.eq("name", name));
		if (dataType != null) {
			SystemException.handleMessageException("组件数据类型[" + name + "]名称冲突！");
		}
		dataType = new WidgetDataType();
		String type = request.getParameter("type");
		if (StringUtils.isNotEmpty(type)) {
			WidgetType wt = adminService.get(WidgetType.class, type);
			if (wt == null) {
				SystemException
						.handleMessageException("组件类型[" + type + "]不存在！");
			}
			dataType.setType(wt);
		} else {
			SystemException.handleMessageException("未指定组件类型！");
		}
		String isDefault = request.getParameter("isDefault");
		String sortOrder = request.getParameter("sortOrder");
		String title = request.getParameter("title");
		dataType.setTitle(title);
		dataType.setName(name);
		dataType.setIsDefault("true".equals(isDefault) ? true : false);
		dataType.setSortOrder(Integer.parseInt(sortOrder));
		adminService.save(dataType);
		return "{\"id\":\"" + dataType.getId() + "\"}";
	}

	/**
	 * 创建组件
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/widget/create", method = RequestMethod.POST)
	@ResponseBody
	public String createWidget(HttpServletRequest request) {
		String name = request.getParameter("name");
		Widget widget = adminService.findByCriterion(Widget.class,
				R.eq("name", name));
		if (widget != null) {
			SystemException.handleMessageException("组件[" + name + "]名称冲突！");
		}
		widget = new Widget();
		String type = request.getParameter("type");
		if (StringUtils.isNotEmpty(type)) {
			WidgetType wt = adminService.get(WidgetType.class, type);
			if (wt == null) {
				SystemException
						.handleMessageException("组件类型[" + type + "]不存在！");
			}
			widget.setType(wt);
		} else {
			SystemException.handleMessageException("未指定组件类型！");
		}
		String title = request.getParameter("title");
		String description = request.getParameter("description");
		String isDefault = request.getParameter("isDefault");
		String isCharge = request.getParameter("isCharge");
		String sortOrder = request.getParameter("sortOrder");
		String layout = request.getParameter("layout");
		String a_s = request.getParameter("a_s");
		String l_a_s = request.getParameter("l_a_s");
		String l_a_s_p = request.getParameter("l_a_s_p");
		String d_a_i = request.getParameter("d_a_i");
		String l_d_a_i = request.getParameter("l_d_a_i");
		String l_d_a_i_p = request.getParameter("l_d_a_i_p");

		widget.setTitle(title);
		widget.setName(name);
		widget.setIsDefault("true".equals(isDefault) ? true : false);
		widget.setIsCharge("true".equals(isCharge) ? true : false);
		widget.setDescription(description);
		widget.setSortOrder(Integer.parseInt(sortOrder));
		widget.setLayout(Integer.parseInt(layout));
		widget.setA_s(Integer.parseInt(a_s));
		widget.setL_a_s(Integer.parseInt(l_a_s));
		widget.setL_a_s_p(Integer.parseInt(l_a_s_p));
		widget.setD_a_i(Integer.parseInt(d_a_i));
		widget.setL_d_a_i(Integer.parseInt(l_d_a_i));
		widget.setL_d_a_i_p(Integer.parseInt(l_d_a_i_p));
		adminService.save(widget);
		return "{\"id\":\"" + widget.getId() + "\"}";
	}

	/**
	 * 修改组件
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/widget/update/{id}", method = RequestMethod.POST)
	@ResponseBody
	public String updateWidget(@PathVariable String id,
			HttpServletRequest request) {
		Widget widget = adminService.get(Widget.class, id);
		if (widget == null) {
			SystemException.handleMessageException("未找到组件[" + id + "]！");
		}
		String name = request.getParameter("name");
		Widget nameWidget = adminService.findByCriterion(Widget.class,
				R.eq("name", name));
		if (nameWidget != null) {
			SystemException.handleMessageException("组件[" + name + "]名称冲突！");
		}
		// String type = request.getParameter("type");
		// if (StringUtils.isNotEmpty(type)) {
		// WidgetType wt = adminService.get(WidgetType.class, type);
		// if (wt == null) {
		// SystemException
		// .handleMessageException("组件类型[" + type + "]不存在！");
		// }
		// widget.setType(wt);
		// } else {
		// SystemException.handleMessageException("未指定组件类型！");
		// }
		String title = request.getParameter("title");
		String description = request.getParameter("description");
		String isDefault = request.getParameter("isDefault");
		String isCharge = request.getParameter("isCharge");
		String sortOrder = request.getParameter("sortOrder");

		widget.setTitle(title);
		widget.setName(name);
		widget.setIsDefault("true".equals(isDefault) ? true : false);
		widget.setIsCharge("true".equals(isCharge) ? true : false);
		widget.setDescription(description);
		widget.setSortOrder(Integer.parseInt(sortOrder));
		adminService.update(widget);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 删除组件
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/widget/delete/{id}", method = RequestMethod.GET)
	@ResponseBody
	public String deleteWidget(@PathVariable String id,
			HttpServletRequest request) {
		adminService.delete(Widget.class, id);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 预览
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/preview/{wid}/{did}", method = RequestMethod.GET)
	public ModelAndView preview(@PathVariable String wid,
			@PathVariable String did, HttpServletRequest request,
			HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("wid", wid);
		params.put("did", did);
		Map<String, Object> result = new HashMap<String, Object>();
		storeMap(result, params);
		result.put("mode", "preview");
		return new ModelAndView("site/admin/widgets/"
				+ adminService.get(Widget.class, wid).getName(), result);
	}

	/**
	 * 编辑组件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/editor/{wid}/{did}", method = RequestMethod.GET)
	public ModelAndView customeEditor(@PathVariable String wid,
			@PathVariable String did, HttpServletRequest request,
			HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("wid", wid);
		params.put("did", did);
		Map<String, Object> result = new HashMap<String, Object>();
		Widget widget = adminService.get(Widget.class, wid);
		// storeEditorMap(result, params, widget);
		result.put("mode", "editor");
		return new ModelAndView("site/admin/widgets/" + widget.getName(),
				result);
	}

	/**
	 * 发布
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/deploy/{wid}/{did}", method = RequestMethod.GET)
	@ResponseBody
	public String deploy(@PathVariable String wid, @PathVariable String did,
			HttpServletRequest request, HttpServletResponse response) {
		if (StringUtils.isEmpty(EnvManager.getRealPath()))
			EnvManager.setRealPath(request.getSession().getServletContext()
					.getRealPath("/"));
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("wid", wid);
		params.put("did", did);
		Map<String, Object> result = new HashMap<String, Object>();
		storeMap(result, params);
		deployZone.deployWidget(fcg, result, getPath(wid, did));
		return WindSiteRestUtil.SUCCESS;
	}

	private String getPath(String wid, String did) {
		Widget widget = adminService.get(Widget.class, wid);
		WidgetDataType dataType = adminService.get(WidgetDataType.class, did);
		return widget.getName() + "_" + dataType.getName();
	}

	private void storeMap(Map<String, Object> result, Map<String, Object> params) {
		String hql = "from WidgetAttribute where widget.id=:wid and dataType.id=:did ";
		result.put(
				"asa",
				adminService.findByHql(hql
						+ "and type='a-s' order by sortOrder", params));
		result.put(
				"las",
				adminService.findByHql(hql
						+ " and type='l-a-s' order by sortOrder", params));
		result.put(
				"lasp",
				adminService.findByHql(hql
						+ " and type='l-a-s-p' order by sortOrder", params));
		result.put(
				"dai",
				adminService.findByHql(hql
						+ "and type='d-a-i' order by sortOrder", params));
		result.put(
				"ldai",
				adminService.findByHql(hql
						+ "and type='l-d-a-i' order by sortOrder", params));
		result.put(
				"ldaip",
				adminService.findByHql(hql
						+ "and type='l-d-a-i-p' order by sortOrder", params));
	}

	/**
	 * 初始化类目分类类目属性
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/itemcat/itemprops", method = RequestMethod.GET)
	@ResponseBody
	public String itemprops(HttpServletRequest request,
			HttpServletResponse response) {
		Page<T_ItemCat> page = new Page<T_ItemCat>(1, 1000);
		getItemProps(page);
		return WindSiteRestUtil.SUCCESS;
	}

	private void getItemProps(Page<T_ItemCat> page) {
		List<T_ItemCat> cats = adminService.findAllByCriterion(page,
				T_ItemCat.class, R.eq("isParent", false),
				R.eq("isSuccess", false));
		if (cats != null && cats.size() > 0) {
			for (T_ItemCat cat : cats) {
				adminService.getItemCatPropValues(cat);
			}
		}
		if (page.isHasNextPage()) {
			page.setPageNo(page.getNextPage());
			getItemProps(page);
		}
	}

	/**
	 * 初始化类目分类类目属性
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/itemcat/propvalue", method = RequestMethod.GET)
	@ResponseBody
	public String itemCatPropValue(HttpServletRequest request,
			HttpServletResponse response) {
		Page<T_ItemCat> page = new Page<T_ItemCat>(1, 1000);
		getItemCatPropValues(page);
		return WindSiteRestUtil.SUCCESS;
	}

	private void getItemCatPropValues(Page<T_ItemCat> page) {
		List<T_ItemCat> cats = adminService.findAllByCriterion(page,
				T_ItemCat.class, R.eq("isParent", false),
				R.eq("isSuccess", false));
		if (cats != null && cats.size() > 0) {
			for (T_ItemCat cat : cats) {
				adminService.getItemCatPropValues(cat);
			}
		}
		if (page.isHasNextPage()) {
			page.setPageNo(page.getNextPage());
			getItemCatPropValues(page);
		}
	}

	/**
	 * 更新淘宝商城品牌
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/tbbrand/syn", method = RequestMethod.GET)
	@ResponseBody
	public String updateTBBrand(HttpServletRequest request) {
		getMallBrandCat();// 分类
		getMallBrand();// 品牌
		return WindSiteRestUtil.SUCCESS;
	}

	public void getMallBrand() {
		Parser parser;
		List<T_MallBrandCat> cats = adminService.loadAll(T_MallBrandCat.class);
		if (cats != null && cats.size() > 0) {
			for (T_MallBrandCat cat : cats) {
				try {
					parser = new Parser(
							"http://www.tmall.com/go/chn/mall/brandshop_"
									+ cat.getName() + ".php");
					NodeList as1 = parser
							.extractAllNodesThatMatch(
									new HasAttributeFilter("class",
											"ul-new clearfix"))
							.elementAt(0)
							.getChildren()
							.extractAllNodesThatMatch(new TagNameFilter("li"),
									true);
					if (as1 != null && as1.size() > 0) {
						for (int i = 0; i < as1.size(); i++) {
							Node li = as1.elementAt(i);
							ImageTag img = (ImageTag) li
									.getChildren()
									.extractAllNodesThatMatch(
											new TagNameFilter("img"), true)
									.elementAt(0);
							String picPath = img.getImageURL();
							LinkTag tag = (LinkTag) li
									.getChildren()
									.extractAllNodesThatMatch(
											new HasAttributeFilter("class",
													"title"), true)
									.elementAt(0)
									.getChildren()
									.extractAllNodesThatMatch(
											new TagNameFilter("a"))
									.elementAt(0);
							String title = tag.getLinkText();
							String url = tag.getLink();
							T_MallBrand brand = adminService.findByCriterion(
									T_MallBrand.class, R.eq("url", url));
							if (brand != null) {// 如果已收录
								brand.setTitle(title);
								brand.setPicPath(picPath);
								brand.setCid(cat.getId());
								brand.setSortOrder(i);
								adminService.update(brand);
							} else {
								parser = new Parser(url);
								try {
									LinkTag tagNick = (LinkTag) parser
											.extractAllNodesThatMatch(
													new HasAttributeFilter(
															"class",
															"shopkeeper"))
											.elementAt(0)
											.getChildren()
											.extractAllNodesThatMatch(
													new TagNameFilter("a"),
													true).elementAt(0);
									String nick = tagNick.getLinkText();
									brand = adminService.findByCriterion(
											T_MallBrand.class,
											R.eq("nick", nick));
									if (brand != null) {
										brand.setTitle(title);
										brand.setPicPath(picPath);
										brand.setUrl(url);
										brand.setCid(cat.getId());
										brand.setSortOrder(i);
										adminService.update(brand);
									} else {
										Shop shop = TaobaoFetchUtil
												.getTaobaoShop("0", nick);
										if (shop != null) {
											brand = new T_MallBrand();
											brand.setUrl(url);
											brand.setCid(cat.getId());
											brand.setNick(nick);
											brand.setPicPath(picPath);
											brand.setTitle(title);
											brand.setSortOrder(i);
											brand.setSid(shop.getSid());
											adminService.save(brand);
										} else {
											System.out.println("未找到此店铺[" + nick
													+ "]");
										}
									}
									Thread.sleep(8000);
								} catch (Exception e) {
									System.out.println("发生错误：" + url);
								}
							}
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}

	}

	public void getMallBrandCat() {
		Parser parser;
		try {
			parser = new Parser("http://brand.tmall.com/");
			NodeList as1 = parser
					.extractAllNodesThatMatch(
							new HasAttributeFilter("id", "J_brandNav"))
					.elementAt(0).getChildren()
					.extractAllNodesThatMatch(new TagNameFilter("li"), true);
			if (as1.size() > 0) {
				for (int i = 1; i < as1.size(); i++) {
					Node li = as1.elementAt(i);
					if (li != null) {
						LinkTag tag = (LinkTag) li
								.getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("a")).elementAt(0);
						if (tag != null) {
							String name = tag.getLink().split("brandshop_")[1]
									.replace(".php", "");// 分类名称
							String title = tag.getLinkText();
							T_MallBrandCat cat = adminService.findByCriterion(
									T_MallBrandCat.class, R.eq("name", name));
							if (cat == null) {
								cat = new T_MallBrandCat();
								cat.setTitle(title);
								cat.setName(name);
								adminService.save(cat);
							} else {
								cat.setTitle(title);
								adminService.update(cat);
							}
						}
					}
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 更新淘宝扶植版的主题
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/tbtheme", method = RequestMethod.GET)
	@ResponseBody
	public String updateTemplateTheme(HttpServletRequest request) {
		Parser parser;
		try {
			parser = new Parser(
					"http://zx.taobao.com/template_list.htm?sort=1&site=1&p=1");
			Node as1 = parser.extractAllNodesThatMatch(
					new HasAttributeFilter("id", "J_page-redirect")).elementAt(
					0);
			NodeList tags = as1.getChildren().extractAllNodesThatMatch(
					new TagNameFilter("a"), true);
			if (tags == null || tags.size() == 0) {
				System.out.println(as1.toPlainTextString());
			} else {
				Node sizeN = tags.elementAt(tags.size() - 2);
				Integer size = Integer.valueOf(sizeN.toPlainTextString());
				int count = 0;
				for (int i = 1; i < size + 1; i++) {
					parser = new Parser(
							"http://zx.taobao.com/template_list.htm?sort=1&site=1&p="
									+ i);
					NodeList dls = parser
							.extractAllNodesThatMatch(
									new HasAttributeFilter("id", "J_img-zoom"))
							.elementAt(0)
							.getChildren()
							.extractAllNodesThatMatch(new TagNameFilter("dl"),
									true);
					for (int j = 0; j < dls.size(); j++) {
						NodeList dts = dls
								.elementAt(j)
								.getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("dt"), true);
						ImageTag img = (ImageTag) dts
								.elementAt(0)
								.getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("img"), true)
								.elementAt(0);
						String pic = img.getImageURL();
						NodeList divs = dts
								.elementAt(1)
								.getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("div"), true);
						LinkTag titleTag = (LinkTag) divs
								.elementAt(0)
								.getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("a"), true)
								.elementAt(0);
						String title = titleTag.toPlainTextString();
						String id = titleTag.getAttribute("href").split("id=")[1];
						LinkTag designerTag = (LinkTag) divs
								.elementAt(1)
								.getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("a"), true)
								.elementAt(0);
						String designer = designerTag.toPlainTextString();
						String price = divs.elementAt(2).toPlainTextString()
								.replace("模板价格：", "").replace("元", "").trim();
						String tagsStr = divs
								.elementAt(4)
								.getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("span"), true)
								.elementAt(0).toPlainTextString();
						PageTheme theme = adminService.get(PageTheme.class,
								Long.valueOf(id));
						if (theme == null) {
							theme = new PageTheme();
							theme.setDesigner(designer);
							theme.setId(Long.valueOf(id));
							theme.setPic(pic);
							theme.setPrice(price);
							theme.setTags(tagsStr);
							theme.setTitle(title);
							adminService.save(theme);
						} else {
							theme.setDesigner(designer);
							theme.setId(Long.valueOf(id));
							theme.setPic(pic);
							theme.setPrice(price);
							theme.setTags(tagsStr);
							theme.setTitle(title);
							adminService.update(theme);
						}
						System.out.println("第" + i + "页，" + (count++)
								+ "个：pic=" + pic + ",title=" + title + ",id="
								+ id + ",designer=" + designer + ",price="
								+ price + ",tags=" + tagsStr);
					}
					Thread.sleep(1000);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 更新淘宝扶植版的主题
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/tbtheme/update", method = RequestMethod.GET)
	@ResponseBody
	public String updateTemplateCIS(HttpServletRequest request) {
		Parser parser;
		// 更新行业
		try {
			for (int n = 1; n < 14; n++) {
				parser = new Parser(
						"http://zx.taobao.com/template_list.htm?sort=1&site=1&industry="
								+ n);
				Node as1 = parser.extractAllNodesThatMatch(
						new HasAttributeFilter("id", "J_page-redirect"))
						.elementAt(0);
				NodeList tags = as1.getChildren().extractAllNodesThatMatch(
						new TagNameFilter("a"), true);
				if (tags == null || tags.size() == 0) {
					System.out.println(as1.toPlainTextString());
				} else {
					Node sizeN = tags.elementAt(tags.size() - 2);
					Integer size = 1;
					try {
						size = Integer.valueOf(sizeN.toPlainTextString());
					} catch (Exception e) {
					}
					System.out.println("industry=" + n + ",size=" + size);

					int count = 0;
					for (int i = 1; i < size + 1; i++) {
						parser = new Parser(
								"http://zx.taobao.com/template_list.htm?sort=1&site=1&p="
										+ i + "&industry=" + n);
						NodeList dls = parser
								.extractAllNodesThatMatch(
										new HasAttributeFilter("id",
												"J_img-zoom"))
								.elementAt(0)
								.getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("dl"), true);
						for (int j = 0; j < dls.size(); j++) {
							NodeList dts = dls
									.elementAt(j)
									.getChildren()
									.extractAllNodesThatMatch(
											new TagNameFilter("dt"), true);
							NodeList divs = dts
									.elementAt(1)
									.getChildren()
									.extractAllNodesThatMatch(
											new TagNameFilter("div"), true);
							LinkTag titleTag = (LinkTag) divs
									.elementAt(0)
									.getChildren()
									.extractAllNodesThatMatch(
											new TagNameFilter("a"), true)
									.elementAt(0);

							String id = titleTag.getAttribute("href").split(
									"id=")[1];
							PageThemeIndustry industry = adminService
									.findByCriterion(PageThemeIndustry.class,
											R.eq("theme", Long.valueOf(id)),
											R.eq("industry", Long.valueOf(n)));
							if (industry == null) {
								industry = new PageThemeIndustry();
								industry.setIndustry(Long.valueOf(n));
								industry.setTheme(Long.valueOf(id));
								adminService.save(industry);
							}
							System.out.println("第" + i + "页，" + (count++)
									+ "个：id=" + id);
						}
						Thread.sleep(1000);
					}
				}
			}
			for (int n = 1; n < 8; n++) {
				parser = new Parser(
						"http://zx.taobao.com/template_list.htm?sort=1&site=1&theme="
								+ n);
				Node as1 = parser.extractAllNodesThatMatch(
						new HasAttributeFilter("id", "J_page-redirect"))
						.elementAt(0);
				NodeList tags = as1.getChildren().extractAllNodesThatMatch(
						new TagNameFilter("a"), true);
				if (tags == null || tags.size() == 0) {
					System.out.println(as1.toPlainTextString());
				} else {
					Node sizeN = tags.elementAt(tags.size() - 2);
					Integer size = 1;
					try {
						size = Integer.valueOf(sizeN.toPlainTextString());
					} catch (Exception e) {
					}
					System.out.println("theme=" + n + ",size=" + size);

					int count = 0;
					for (int i = 1; i < size + 1; i++) {
						parser = new Parser(
								"http://zx.taobao.com/template_list.htm?sort=1&site=1&p="
										+ i + "&theme=" + n);
						NodeList dls = parser
								.extractAllNodesThatMatch(
										new HasAttributeFilter("id",
												"J_img-zoom"))
								.elementAt(0)
								.getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("dl"), true);
						for (int j = 0; j < dls.size(); j++) {
							NodeList dts = dls
									.elementAt(j)
									.getChildren()
									.extractAllNodesThatMatch(
											new TagNameFilter("dt"), true);
							NodeList divs = dts
									.elementAt(1)
									.getChildren()
									.extractAllNodesThatMatch(
											new TagNameFilter("div"), true);
							LinkTag titleTag = (LinkTag) divs
									.elementAt(0)
									.getChildren()
									.extractAllNodesThatMatch(
											new TagNameFilter("a"), true)
									.elementAt(0);
							String id = titleTag.getAttribute("href").split(
									"id=")[1];
							PageThemeSkin skin = adminService.findByCriterion(
									PageThemeSkin.class,
									R.eq("theme", Long.valueOf(id)),
									R.eq("skin", Long.valueOf(n)));
							if (skin == null) {
								skin = new PageThemeSkin();
								skin.setSkin(Long.valueOf(n));
								skin.setTheme(Long.valueOf(id));
								adminService.save(skin);
							}

							System.out.println("第" + i + "页，" + (count++)
									+ "个：id=" + id);
						}
						Thread.sleep(1000);
					}
				}
			}
			for (int n = 1; n < 9; n++) {
				parser = new Parser(
						"http://zx.taobao.com/template_list.htm?sort=1&site=1&color="
								+ n);
				Node as1 = parser.extractAllNodesThatMatch(
						new HasAttributeFilter("id", "J_page-redirect"))
						.elementAt(0);
				NodeList tags = as1.getChildren().extractAllNodesThatMatch(
						new TagNameFilter("a"), true);
				if (tags == null || tags.size() == 0) {
					System.out.println(as1.toPlainTextString());
				} else {
					Node sizeN = tags.elementAt(tags.size() - 2);
					Integer size = 1;
					try {
						size = Integer.valueOf(sizeN.toPlainTextString());
					} catch (Exception e) {
					}
					System.out.println("color=" + n + ",size=" + size);
					int count = 0;
					for (int i = 1; i < size + 1; i++) {
						parser = new Parser(
								"http://zx.taobao.com/template_list.htm?sort=1&site=1&p="
										+ i + "&color=" + n);
						NodeList dls = parser
								.extractAllNodesThatMatch(
										new HasAttributeFilter("id",
												"J_img-zoom"))
								.elementAt(0)
								.getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("dl"), true);
						for (int j = 0; j < dls.size(); j++) {
							NodeList dts = dls
									.elementAt(j)
									.getChildren()
									.extractAllNodesThatMatch(
											new TagNameFilter("dt"), true);
							NodeList divs = dts
									.elementAt(1)
									.getChildren()
									.extractAllNodesThatMatch(
											new TagNameFilter("div"), true);
							LinkTag titleTag = (LinkTag) divs
									.elementAt(0)
									.getChildren()
									.extractAllNodesThatMatch(
											new TagNameFilter("a"), true)
									.elementAt(0);

							String id = titleTag.getAttribute("href").split(
									"id=")[1];
							PageThemeColor color = adminService
									.findByCriterion(PageThemeColor.class,
											R.eq("theme", Long.valueOf(id)),
											R.eq("color", Long.valueOf(n)));
							if (color == null) {
								color = new PageThemeColor();
								color.setColor(Long.valueOf(n));
								color.setTheme(Long.valueOf(id));
								adminService.save(color);
							}
							System.out.println("第" + i + "页，" + (count++)
									+ "个：id=" + id);
						}
						Thread.sleep(1000);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return WindSiteRestUtil.SUCCESS;
	}

	public void setAdminService(IAdminService adminService) {
		this.adminService = adminService;
	}

	public IAdminService getAdminService() {
		return adminService;
	}

	public void setAutoCronCommand(WeigouAutocronGetTimer autoCronCommand) {
		this.autoCronCommand = autoCronCommand;
	}

	public WeigouAutocronGetTimer getAutoCronCommand() {
		return autoCronCommand;
	}

	@Autowired
	private IDeployZone deployZone;
}
