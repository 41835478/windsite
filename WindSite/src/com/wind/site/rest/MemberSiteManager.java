package com.wind.site.rest;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.core.exception.SystemException;
import com.wind.discuz.model.DiscuzMembers;
import com.wind.discuz.service.IDiscuzService;
import com.wind.site.env.EnvManager;
import com.wind.site.model.ADPlan;
import com.wind.site.model.ADTaobaokeItem;
import com.wind.site.model.ADUserTemplate;
import com.wind.site.model.CoolSite;
import com.wind.site.model.CreditsLog;
import com.wind.site.model.DomainHistory;
import com.wind.site.model.ItemGroup;
import com.wind.site.model.KeFuSupport;
import com.wind.site.model.Limit;
import com.wind.site.model.ShareSupport;
import com.wind.site.model.ShopGroup;
import com.wind.site.model.Site;
import com.wind.site.model.T_ItemCat;
import com.wind.site.model.T_TaobaokeShop;
import com.wind.site.model.UserPage;
import com.wind.site.model.UserTemplate;
import com.wind.site.service.IFanliService;
import com.wind.site.service.IMemberService;
import com.wind.site.service.IPageService;
import com.wind.site.util.WindSiteRestUtil;
import com.wind.uc.model.UCSpace;
import com.wind.uc.service.IUCService;

/**
 * 淘客建站
 * 
 * @author fxy
 * 
 */
@Controller
@RequestMapping("/member/sitemanager")
public class MemberSiteManager {
	@Autowired
	private IMemberService memberService;
	@Autowired
	private IFanliService fanliService;
	@Autowired
	private IPageService pageService;
	@Autowired
	private IUCService ucService;
	@Autowired
	private IDiscuzService discuzService;

	/**
	 * 站点分享系统
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/share", method = RequestMethod.GET)
	public ModelAndView shareView(HttpServletRequest request) {
		ShareSupport share = memberService.get(ShareSupport.class,
				Long.valueOf(EnvManager.getUser().getUser_id()));
		if (share == null) {
			share = new ShareSupport();
			share.setNick(EnvManager.getUser().getNick());
			share.setUserId(Long.valueOf(EnvManager.getUser().getUser_id()));
			memberService.save(share);
		}
		return new ModelAndView("site/member/site/share", "share", share);
	}

	/**
	 * 站点分享系统更新
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/share/update", method = RequestMethod.POST)
	@ResponseBody
	public String shareUpdate(HttpServletRequest request) {
		ShareSupport share = memberService.get(ShareSupport.class,
				Long.valueOf(EnvManager.getUser().getUser_id()));
		if (share == null) {
			SystemException.handleMessageException("您尚未创建分享与收藏");
		}
		String shareCode = request.getParameter("share");
		share.setShare(shareCode);
		memberService.update(share);
		pageService.deployFooter(fcg, String.valueOf(share.getUserId()));
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * xtao验证
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/xtaoAuth", method = RequestMethod.GET)
	public ModelAndView xtaoView(HttpServletRequest request) {
		KeFuSupport kefu = memberService.get(KeFuSupport.class,
				Long.valueOf(EnvManager.getUser().getUser_id()));
		if (kefu == null) {
			kefu = new KeFuSupport();
			kefu.setNick(EnvManager.getUser().getNick());
			kefu.setUserId(Long.valueOf(EnvManager.getUser().getUser_id()));
			memberService.save(kefu);
		}
		return new ModelAndView("site/member/site/xtaoAuth", "kefu", kefu);
	}

	/**
	 * xtao验证
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/xtaoAuth/update", method = RequestMethod.POST)
	@ResponseBody
	public String xtaoUpdate(HttpServletRequest request) {
		KeFuSupport kefu = memberService.get(KeFuSupport.class,
				Long.valueOf(EnvManager.getUser().getUser_id()));
		if (kefu == null) {
			SystemException.handleMessageException("刷新页面");
		}
		String xtaoAuth = request.getParameter("xtaoAuth");
		kefu.setXtaoAuth(xtaoAuth);
		memberService.update(kefu);
		pageService.deployXtaoAuth(fcg, String.valueOf(kefu.getUserId()),
				xtaoAuth);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 阿里妈妈验证
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/alimama", method = RequestMethod.GET)
	public ModelAndView alimamaView(HttpServletRequest request) {
		KeFuSupport kefu = memberService.get(KeFuSupport.class,
				Long.valueOf(EnvManager.getUser().getUser_id()));
		if (kefu == null) {
			kefu = new KeFuSupport();
			kefu.setNick(EnvManager.getUser().getNick());
			kefu.setUserId(Long.valueOf(EnvManager.getUser().getUser_id()));
			memberService.save(kefu);
		}
		return new ModelAndView("site/member/site/alimama", "kefu", kefu);
	}

	/**
	 * 阿里妈妈验证
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/alimama/update", method = RequestMethod.POST)
	@ResponseBody
	public String alimamaUpdate(HttpServletRequest request) {
		KeFuSupport kefu = memberService.get(KeFuSupport.class,
				Long.valueOf(EnvManager.getUser().getUser_id()));
		if (kefu == null) {
			SystemException.handleMessageException("刷新页面");
		}
		String alimama = request.getParameter("alimama");
		kefu.setAlimama(alimama);
		memberService.update(kefu);
		pageService.deployAlimamaRoot(fcg, String.valueOf(kefu.getUserId()),
				alimama);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 站点客服系统
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/kefu", method = RequestMethod.GET)
	public ModelAndView kefuView(HttpServletRequest request) {
		KeFuSupport kefu = memberService.get(KeFuSupport.class,
				Long.valueOf(EnvManager.getUser().getUser_id()));
		if (kefu == null) {
			kefu = new KeFuSupport();
			kefu.setNick(EnvManager.getUser().getNick());
			kefu.setUserId(Long.valueOf(EnvManager.getUser().getUser_id()));
			memberService.save(kefu);
		}
		return new ModelAndView("site/member/site/kefu", "kefu", kefu);
	}

	/**
	 * 站点客服系统更新
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/kefu/update", method = RequestMethod.POST)
	@ResponseBody
	public String kefuUpdate(HttpServletRequest request) {
		KeFuSupport kefu = memberService.get(KeFuSupport.class,
				Long.valueOf(EnvManager.getUser().getUser_id()));
		if (kefu == null) {
			SystemException.handleMessageException("您尚未创建客服");
		}
		String kefuCode = request.getParameter("kefu");
		kefu.setKefu(kefuCode);
		memberService.update(kefu);
		pageService.deployFooter(fcg, String.valueOf(kefu.getUserId()));
		return WindSiteRestUtil.SUCCESS;
	}

	@Autowired
	private FreeMarkerConfigurer fcg;

	/**
	 * 站点返利记录概要
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/trade/count", method = RequestMethod.GET)
	public ModelAndView flMemberTradeCount(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		Site site = EnvManager.getUser().getSites().get(0);
		String id = site.getId();
		result.put("allFanli", fanliService.countFanliTradeBySiteId(id, null));// 总返利金额
		// 等待站长支付返利记录数
		result.put("unBuyFanli",
				fanliService.countFanliTradeBySiteId(id, "BUY", 0));// 购买返利记录数
		result.put("unAdsFanli",
				fanliService.countFanliTradeBySiteId(id, "ADS", 0));// 推广返利记录数
		// 等待会员确认收款（已支付）记录数
		result.put("waitBuyFanli",
				fanliService.countFanliTradeBySiteId(id, "BUY", 1));// 购买返利记录数
		result.put("waitAdsFanli",
				fanliService.countFanliTradeBySiteId(id, "ADS", 1));// 推广返利记录数
		// 已完成记录数
		result.put("finishBuyFanli",
				fanliService.countFanliTradeBySiteId(id, "BUY", 2));// 购买返利记录数
		result.put("finishAdsFanli",
				fanliService.countFanliTradeBySiteId(id, "ADS", 2));// 推广返利记录数
		return new ModelAndView("site/member/fanli/back/flmemberTradeCount",
				result);
	}

	/**
	 * 站点收入信息
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/income", method = RequestMethod.GET)
	public ModelAndView flMemberIncome(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		Site site = EnvManager.getUser().getSites().get(0);
		String id = site.getId();
		result.put("allFanli", fanliService.sumFanliMoneyBySiteId(id, null));// 总返利金额
		// 等待站长支付返利
		result.put("unBuyFanli",
				fanliService.sumFanliMoneyBySiteId(id, "BUY", 0));// 购买返利金额
		result.put("unAdsFanli",
				fanliService.sumFanliMoneyBySiteId(id, "ADS", 0));// 推广返利金额
		// 等待会员确认收款（已支付）
		result.put("waitBuyFanli",
				fanliService.sumFanliMoneyBySiteId(id, "BUY", 1));// 购买返利金额
		result.put("waitAdsFanli",
				fanliService.sumFanliMoneyBySiteId(id, "ADS", 1));// 推广返利金额
		// 已完成
		result.put("finishBuyFanli",
				fanliService.sumFanliMoneyBySiteId(id, "BUY", 2));// 购买返利金额
		result.put("finishAdsFanli",
				fanliService.sumFanliMoneyBySiteId(id, "ADS", 2));// 推广返利金额
		return new ModelAndView("site/member/fanli/back/flmemberIncome", result);
	}

	/**
	 * 查询站点基本信息
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ModelAndView siteManager(HttpServletRequest request) {
		List<Site> list = (List<Site>) memberService.findAllByCriterion(
				Site.class, R.eq("user_id", EnvManager.getUser().getUser_id()));
		Map<String, Object> result = new HashMap<String, Object>();
		if (list != null && list.size() == 1) {
			Site site = list.get(0);
			if (site.getStatus() == null || site.getStatus() == 0) {// 未发布状态
				UserPage page = memberService.findByCriterion(UserPage.class,
						R.eq("isIndex", true),
						R.eq("user_id", site.getUser_id()));
				if (page == null) {
					result.put("site", site);
					result.put("cats", EnvManager.getRootCats());
					return new ModelAndView("site/step/step1", result);
				}
			}
		}
		result.put("sites", list);
		return new ModelAndView("site/member/site/siteManager", result);
	}

	/**
	 * 查询站点域名管理
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/domain", method = RequestMethod.GET)
	public ModelAndView domainManager(HttpServletRequest request) {
		List<Site> list = (List<Site>) memberService.findAllByCriterion(
				Site.class, R.eq("user_id", EnvManager.getUser().getUser_id()));
		Map<String, Object> result = new HashMap<String, Object>();
		if (list != null && list.size() == 1) {
			Site site = list.get(0);
			DomainHistory dh = memberService.findByCriterion(
					DomainHistory.class, R.eq("site_id", site.getId()));
			result.put("domain", dh);
		}
		result.put("sites", list);

		return new ModelAndView("site/member/site/domainManager", result);
	}

	/**
	 * 查询站点基本信息
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/profile", method = RequestMethod.GET)
	public ModelAndView siteProfile(HttpServletRequest request) {
		List<Site> list = (List<Site>) memberService.findAllByCriterion(
				Site.class, R.eq("user_id", EnvManager.getUser().getUser_id()));
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("sites", list);
		if (list != null && list.size() > 0) {
			String cid = list.get(0).getCid();
			if (StringUtils.isNotEmpty(cid)) {
				T_ItemCat cat = memberService.findByCriterion(T_ItemCat.class,
						R.eq("cid", cid));
				if (cat != null) {
					result.put("cat", cat);
				}
			}
		}

		result.put("cats", EnvManager.getRootCats());
		if (EnvManager.getUser().getLimit() == null) {
			EnvManager.getUser()
					.setLimit(
							memberService.findByCriterion(Limit.class, R.eq(
									"user_id", EnvManager.getUser()
											.getUser_id())));
		}
		return new ModelAndView("site/member/site/siteProfile", result);
	}

	/**
	 * 查询站点页面管理
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/templates", method = RequestMethod.GET)
	public ModelAndView templateManager(HttpServletRequest request) {
		List<Site> list = (List<Site>) memberService.findAllByCriterion(
				Site.class, R.eq("user_id", EnvManager.getUser().getUser_id()));
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("sites", list);
		if (EnvManager.getUser().getLimit() == null) {
			EnvManager.getUser()
					.setLimit(
							memberService.findByCriterion(Limit.class, R.eq(
									"user_id", EnvManager.getUser()
											.getUser_id())));
		}
		// result.put("templates", memberService.findUserTemplates(EnvManager
		// .getUser().getUser_id()));
		UserTemplate ut = memberService.findByCriterion(UserTemplate.class,
				R.eq("user_id", EnvManager.getUser().getUser_id()),
				R.isNull("parent"));
		if (ut != null) {
			result.put("parenttid", ut.getId());
			result.put("indexTemplate", ut);
		}
		return new ModelAndView("site/member/site/templateManager", result);
	}

	/**
	 * 查询站点酷站展示
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/coolsite", method = RequestMethod.GET)
	public ModelAndView coolSite(HttpServletRequest request) {
		List<Site> list = (List<Site>) memberService.findAllByCriterion(
				Site.class, R.eq("user_id", EnvManager.getUser().getUser_id()));
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("sites", list);
		if (EnvManager.getUser().getLimit() == null) {
			EnvManager.getUser()
					.setLimit(
							memberService.findByCriterion(Limit.class, R.eq(
									"user_id", EnvManager.getUser()
											.getUser_id())));
		}
		result.put(
				"coolSite",
				memberService.findByCriterion(CoolSite.class,
						R.eq("user_id", EnvManager.getUser().getUser_id())));
		return new ModelAndView("site/member/site/coolSite", result);
	}

	/**
	 * 查询站点第三方统计
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/analytics", method = RequestMethod.GET)
	public ModelAndView analytics(HttpServletRequest request) {
		List<Site> list = (List<Site>) memberService.findAllByCriterion(
				Site.class, R.eq("user_id", EnvManager.getUser().getUser_id()));
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("sites", list);
		if (EnvManager.getUser().getLimit() == null) {
			EnvManager.getUser()
					.setLimit(
							memberService.findByCriterion(Limit.class, R.eq(
									"user_id", EnvManager.getUser()
											.getUser_id())));
		}
		return new ModelAndView("site/member/site/thirdAnalytics", result);
	}

	/**
	 * 查询站点第三方统计
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/groups", method = RequestMethod.GET)
	public ModelAndView groups(HttpServletRequest request) {
		List<ItemGroup> list = (List<ItemGroup>) memberService
				.findAllByCriterion(ItemGroup.class,
						R.eq("user_id", EnvManager.getUser().getUser_id()));
		for (ItemGroup group : list) {
			group.setCount(memberService.countItemsByGid(group.getId()));
		}
		return new ModelAndView("site/member/site/itemgroups", "groups", list);
	}

	/**
	 * 查询我的淘宝店铺分组
	 * 
	 * @param id
	 * @param name
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/shops", method = RequestMethod.GET)
	public ModelAndView getMyShopsFavorite(HttpServletRequest request) {
		List<ShopGroup> list = (List<ShopGroup>) memberService
				.findAllByCriterion(ShopGroup.class,
						R.eq("user_id", EnvManager.getUser().getUser_id()));
		for (ShopGroup group : list) {
			group.setCount(memberService.countFavShops(group.getId()));
		}
		return new ModelAndView("site/member/site/shopgroups", "groups", list);
	}

	/**
	 * 增加店铺收藏分组
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/shops/group/create", method = RequestMethod.POST)
	@ResponseBody
	public String createShopGroup(HttpServletRequest request,
			HttpServletResponse response) {
		String name = request.getParameter("name");
		ShopGroup oldGroup = memberService.findByCriterion(ShopGroup.class,
				R.eq("name", name),
				R.eq("user_id", EnvManager.getUser().getUser_id()));
		if (oldGroup != null) {
			SystemException.handleMessageException("店铺分组名称[" + name
					+ "]重复,请重新命名");
		}
		ShopGroup group = new ShopGroup();
		group.setName(name);
		group.setUser_id(EnvManager.getUser().getUser_id());
		if (memberService.countShopGroups(group.getUser_id()) >= 10) {
			SystemException.handleMessageException("店铺分组限额已满，不允许再添加店铺分组");
		}
		memberService.save(group);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 删除店铺收藏分组
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/shops/group/delete/{id}", method = RequestMethod.GET)
	@ResponseBody
	public String deleteShopGroup(@PathVariable Long id,
			HttpServletRequest request) {
		ShopGroup group = memberService.get(ShopGroup.class, id);
		if (group == null) {
			SystemException.handleMessageException("指定店铺收藏分组不存在");
		}
		if (!group.getUser_id().equals(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("您无权删除此店铺分组");
		}
		memberService.deleteShopGroup(id);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 重命名店铺分组
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/shops/group/rename/{id}", method = RequestMethod.POST)
	@ResponseBody
	public String renameShopGroup(@PathVariable Long id,
			HttpServletRequest request) {
		memberService.renameShopGroup(id, request.getParameter("name"));
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 查看指定店铺分组
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/shopgroup/{id}", method = RequestMethod.GET)
	public ModelAndView getShopGroup(@PathVariable Long id,
			HttpServletRequest request) {
		ShopGroup group = memberService.get(ShopGroup.class, id);
		if (group == null) {
			SystemException.handleMessageException("当前指定店铺组[" + id + "]不存在");
		}
		String sortby = request.getParameter("sortBy");
		if (StringUtils.isNotEmpty(sortby)) {
			sortby = sortby.replace("_asc", " asc").replace("_desc", " desc");
		} else {
			sortby = null;
		}
		List<ShopGroup> groups = memberService.findAllByCriterion(
				ShopGroup.class, R.eq("user_id", group.getUser_id()));
		for (ShopGroup g : groups) {
			g.setCount(memberService.countFavShops(g.getId()));
		}
		List<T_TaobaokeShop> shops = (List<T_TaobaokeShop>) memberService
				.getShops(id, sortby, false);// 查询指定分组的店铺(排序，不过滤是否有效)
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("group", group);
		map.put("shops", shops);
		map.put("groups", groups);
		map.put("sortBy",
				sortby == null ? "sellerCredit_desc" : sortby.replace(" ", "_"));
		return new ModelAndView("site/member/shopgroup", map);
	}

	/**
	 * 访问兑换中心
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/credit", method = RequestMethod.GET)
	public ModelAndView getCredits(HttpServletRequest request) {
		Integer uid = EnvManager.getUser().getUc_id();
		if (null == uid || 0 == uid) {
			SystemException
					.handleMessageException("您尚未开通新淘家园和新淘论坛,点击新淘首页中的新淘家园后，将直接开通");
		}
		UCSpace space = ucService.get(UCSpace.class, uid);
		if (space == null) {
			SystemException.handleMessageException("系统错误，请联系管理员！");
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("space", space);
		DiscuzMembers member = discuzService.get(DiscuzMembers.class, uid);
		result.put("member", member);
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userId", EnvManager.getUser().getUser_id());
		List<CreditsLog> creditsHistory = (List<CreditsLog>) memberService
				.findByHql(
						"from CreditsLog where createdBy=:userId order by created desc",
						params);
		result.put("creditsHistory", creditsHistory);
		return new ModelAndView("site/member/site/credits", result);
	}

	/**
	 * 查询要检测的推广组及商品列表
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/doctor", method = RequestMethod.GET)
	public ModelAndView doctor(HttpServletRequest request) {
		Boolean itemsProcessing = memberService
				.isProcessingItemGroupDoctor(EnvManager.getUser().getUser_id());
		return new ModelAndView("site/member/site/doctor", "itemsProcessing",
				itemsProcessing);
	}

	/**
	 * 查询收入报表
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/report", method = RequestMethod.GET)
	public ModelAndView report(HttpServletRequest request) {
		return new ModelAndView("site/member/site/report");
	}

	/**
	 * 淘客首页广告管理
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/indexAds", method = RequestMethod.GET)
	public ModelAndView indexAdsManager(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String hql = "select new map(ad.tid as id,ut.name as name,ad.cads as cads,ad.sads as sads,ut.isDefault as isDefault,ut.created as created) from ADUserTemplate ad,UserTemplate ut where ad.tid=ut.id and ad.user_id=:userId";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userId", EnvManager.getUser().getUser_id());
		List<Map<String, Object>> ads = (List<Map<String, Object>>) memberService
				.findByHql(hql, params);
		covertAdsUserTemplate(ads);
		result.put("templates", ads);
		if (ads.size() > 0) {
			List<Site> list = (List<Site>) memberService.findAllByCriterion(
					Site.class,
					R.eq("user_id", EnvManager.getUser().getUser_id()));
			result.put("site", list.get(0));
		}
		return new ModelAndView("site/member/site/taokeIndexAdsManager", result);
	}

	/**
	 * 淘客文章广告管理
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/blogAds", method = RequestMethod.GET)
	public ModelAndView blogAdsManager(HttpServletRequest request) {
		// TODO 文章广告管理
		// Map<String, Object> result = new HashMap<String, Object>();
		// List<Site> sites = EnvManager.getUser().getSites();
		// if (sites != null && sites.size() == 1 && sites.get(0).getStatus() ==
		// 1) {
		// Site site = sites.get(0);
		// ADBlog ad = memberService.get(ADBlog.class, site.getId());
		// if (ad == null) {
		// SystemException.handleMessageException("您的站点尚未启用文章广告系统");
		// }
		// result.put("template", ad);
		// String cads = ad.getCads();
		// String sads = ad.getSads();
		// if (StringUtils.isNotEmpty(cads) || StringUtils.isNotEmpty(sads)) {//
		// 如果已经投放广告
		// List<ADPlan> caPlans = new ArrayList<ADPlan>();
		// List<ADPlan> saPlans = new ArrayList<ADPlan>();
		// if (StringUtils.isNotEmpty(cads)) {
		// caPlans = (List<ADPlan>) memberService.findByHql(
		// "from ADPlan where id in (" + cads + ")",
		// new HashMap<String, Object>());
		// String[] array = cads.split(",");
		// if (caPlans.size() != array.length) {// 如果已查询的计划与列表不一致，则重新生成投放列表
		// cads = "";
		// if (caPlans.size() > 0) {
		// Boolean isFirst = true;
		// for (ADPlan plan : caPlans) {
		// if (isFirst) {
		// isFirst = false;
		// } else {
		// cads += ",";
		// }
		// cads += "'" + plan.getId() + "'";
		// }
		// }
		// ad.setCads(cads);
		// memberService.update(ad);
		// }
		// }
		// if (StringUtils.isNotEmpty(sads)) {// 系统投放无需校验
		// saPlans = (List<ADPlan>) memberService.findByHql(
		// "from ADPlan where id in (" + sads + ")",
		// new HashMap<String, Object>());
		// }
		// saPlans.addAll(caPlans);
		// result.put("plans", saPlans);
		// }
		// } else {
		// SystemException.handleMessageException("您尚未发布您的站点，请进入设计器，设计站点并发布");
		// }
		// result.put("cats", EnvManager.getRootCats());
		return new ModelAndView("site/member/site/taokeBlogAdsManager");
	}

	/**
	 * 淘客首页广告
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/indexAds/{id}", method = RequestMethod.GET)
	public ModelAndView indexAds(@PathVariable String id,
			HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		ADUserTemplate ad = memberService.get(ADUserTemplate.class, id);
		if (ad == null) {
			SystemException.handleMessageException("当前页面尚未启用首页广告系统");
		}
		String cads = ad.getCads();
		String sads = ad.getSads();
		if (StringUtils.isNotEmpty(cads) || StringUtils.isNotEmpty(sads)) {// 如果已经投放广告
			List<ADPlan> caPlans = new ArrayList<ADPlan>();
			List<ADPlan> saPlans = new ArrayList<ADPlan>();
			if (StringUtils.isNotEmpty(cads)) {
				caPlans = (List<ADPlan>) memberService.findByHql(
						"from ADPlan where id in (" + cads + ")",
						new HashMap<String, Object>());
				String[] array = cads.split(",");
				if (caPlans.size() != array.length) {// 如果已查询的计划与列表不一致，则重新生成投放列表
					cads = "";
					if (caPlans.size() > 0) {
						Boolean isFirst = true;
						for (ADPlan plan : caPlans) {
							if (isFirst) {
								isFirst = false;
							} else {
								cads += ",";
							}
							cads += "'" + plan.getId() + "'";
						}
					}
					ad.setCads(cads);
					memberService.update(ad);
				}
			}
			if (StringUtils.isNotEmpty(sads)) {// 系统投放无需校验
				saPlans = (List<ADPlan>) memberService.findByHql(
						"from ADPlan where id in (" + sads + ")",
						new HashMap<String, Object>());
			}
			saPlans.addAll(caPlans);
			result.put("plans", saPlans);
		}
		String hql = "select new map(ad.tid as id,ut.name as name,ad.cads as cads,ad.sads as sads,ut.isDefault as isDefault,ut.created as created) from ADUserTemplate ad,UserTemplate ut where ad.tid=ut.id and ad.user_id=:userId";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userId", EnvManager.getUser().getUser_id());
		List<Map<String, Object>> templates = (List<Map<String, Object>>) memberService
				.findByHql(hql, params);
		result.put("templates", templates);
		result.put("template", ad);
		result.put("cats", EnvManager.getRootCats());
		return new ModelAndView("site/member/site/taokeIndexAds", result);
	}

	private void covertAdsUserTemplate(List<Map<String, Object>> ads) {
		if (ads != null && ads.size() > 0) {
			for (Map<String, Object> ad : ads) {
				Object obj = ad.get("isDefault");
				if (obj != null && (Boolean) obj) {// 首页
					ad.put("path", null);
				} else {// 子页
					ad.put("path", ((Date) (ad.get("created"))).getTime()
							+ ".html");
				}
			}
		}
	}

	/**
	 * 查询广告计划的推广商品
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/plan/items/{id}", method = RequestMethod.GET)
	public ModelAndView searchPlanItems(@PathVariable String id,
			HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put(
				"items",
				memberService.findAllByCriterion(ADTaobaokeItem.class,
						R.eq("planid", id)));
		return new ModelAndView("site/member/seller/ads/planItems", result);
	}
}
