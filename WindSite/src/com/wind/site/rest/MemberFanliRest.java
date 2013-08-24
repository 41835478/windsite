package com.wind.site.rest;

import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;
import org.hibernate.criterion.SimpleExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.taobao.api.domain.TaobaokeReport;
import com.taobao.api.domain.TaobaokeReportMember;
import com.taobao.api.request.TaobaokeRebateReportGetRequest;
import com.taobao.api.response.TaobaokeRebateReportGetResponse;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.core.util.DateUtils;
import com.wind.site.command.CommandExecutor;
import com.wind.site.command.impl.ReportsGetCommand;
import com.wind.site.command.impl.UpdateUserTemplateByUserIdCommand;
import com.wind.site.command.impl.UserItemDetailCommand;
import com.wind.site.command.impl.UserShopDetailCommand;
import com.wind.site.env.EnvManager;
import com.wind.site.freemarker.method.ModuleMethod;
import com.wind.site.model.AD;
import com.wind.site.model.FanliTrade;
import com.wind.site.model.Member;
import com.wind.site.model.Site;
import com.wind.site.model.SiteCommission;
import com.wind.site.model.SiteImpl;
import com.wind.site.model.SiteMap;
import com.wind.site.model.SiteMapCategory;
import com.wind.site.model.SiteMetadata;
import com.wind.site.model.T_TaobaokeReportMember;
import com.wind.site.model.User;
import com.wind.site.service.ICommandService;
import com.wind.site.service.IFanliService;
import com.wind.site.service.IMemberService;
import com.wind.site.service.IPageService;
import com.wind.site.service.ISiteService;
import com.wind.site.util.JExcelUtil;
import com.wind.site.util.TaobaoFetchUtil;
import com.wind.site.util.WindSiteRestUtil;

@Controller
@RequestMapping("/member/fl")
public class MemberFanliRest {
	@Autowired
	private IMemberService memberService;

	@Autowired
	private IFanliService fanliService;
	@Autowired
	private ISiteService siteService;
	@Autowired
	private ICommandService commandService;

	/**
	 * 上传淘宝客推广记录
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/taobao/upload", method = RequestMethod.POST)
	public void uploadTaobao(HttpServletRequest request,
			HttpServletResponse response) {
		if (StringUtils.isEmpty(EnvManager.getRealPath()))
			EnvManager.setRealPath(request.getSession().getServletContext()
					.getRealPath("/"));
		SiteCommission commission = memberService.get(SiteCommission.class,
				EnvManager.getUser().getSites().get(0).getId());
		if (commission == null) {
			SystemException.handleMessageException("您的站点尚未启用返利功能");
		}

		try {
			// 转型为MultipartHttpRequest：
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			// 获得文件：
			Map<String, MultipartFile> files = multipartRequest.getFileMap();
			if (files.size() == 1) {
				String userId = (EnvManager.getUser().getUser_id());
				String siteId = EnvManager.getUser().getSites().get(0).getId();
				for (String fileName : files.keySet()) {
					// 获得输入流：
					Set<TaobaokeReportMember> members = JExcelUtil
							.readTaobao(files.get(fileName).getInputStream());
					// 批量更新
					if (members != null && members.size() > 0) {
						commandService.mergeReportTrades(userId, siteId,
								members);
					}
				}
				response.sendRedirect("http://" + WindSiteRestUtil.DOMAIN
						+ "/router/member/fl/report");
			}
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}
	}

	/**
	 * 返利基本设置
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/profile", method = RequestMethod.GET)
	public ModelAndView siteManager(HttpServletRequest request) {
		Site site = EnvManager.getUser().getSites().get(0);
		SiteCommission commission = memberService.get(SiteCommission.class,
				site.getId());
		if (commission == null) {
			commission = new SiteCommission();
			commission.setUser_id(EnvManager.getUser().getUser_id());
			commission.setNick(EnvManager.getUser().getNick());
			commission.setSite_id(site.getId());
			commission.setRegisteCash(0);
			commission.setCommissionLimit(1);
			commission.setCommissionRate(50);
			commission.setAdCommissionRate(10);
			commission.setIsValid(true);
			memberService.save(commission);
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("commission", commission);
		return new ModelAndView("site/member/fanli/profile", result);
	}

	/**
	 * 返利站长认证
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/meta", method = RequestMethod.GET)
	public ModelAndView flMetadata(HttpServletRequest request) {
		List<SiteMetadata> metas = memberService.findAllByCriterion(
				SiteMetadata.class,
				R.eq("user_id", EnvManager.getUser().getUser_id()));
		return new ModelAndView("site/member/fanli/metaManager", "metas", metas);
	}

	/**
	 * 返利站点地图
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/sitemap", method = RequestMethod.GET)
	public ModelAndView flSiteMap(HttpServletRequest request) {
		List<SiteMapCategory> cats = memberService.findAllByCriterionAndOrder(
				SiteMapCategory.class, Order.asc("sortOrder"),
				R.eq("user_id", EnvManager.getUser().getUser_id()));
		if (cats == null || cats.size() == 0) {
			cats = new ArrayList<SiteMapCategory>();
			String nick = EnvManager.getUser().getNick();
			String userId = EnvManager.getUser().getUser_id();
			SiteMapCategory p = new SiteMapCategory();
			p.setTitle("推荐购物频道");
			p.setDescription("该分类为系统分类，自动排版显示您已发布的自定义页面");
			p.setSortOrder(0);
			p.setType(SiteMapCategory.PAGE);
			p.setNick(nick);
			p.setUser_id(userId);
			cats.add(p);
			SiteMapCategory x = new SiteMapCategory();
			x.setTitle("系统频道");
			x.setDescription("该分类为系统分类，自动排版显示新淘网提供的系统频道如淘店铺，画报导购");
			x.setSortOrder(1);
			x.setType(SiteMapCategory.XINTAO);
			x.setNick(nick);
			x.setUser_id(userId);
			cats.add(x);
			SiteMapCategory t = new SiteMapCategory();
			t.setTitle("淘宝频道");
			t.setDescription("该分类为系统分类，自动排版显示淘宝的推广频道");
			t.setSortOrder(2);
			t.setType(SiteMapCategory.TAOBAO);
			t.setNick(nick);
			t.setUser_id(userId);
			cats.add(t);
			SiteMapCategory s = new SiteMapCategory();
			s.setTitle("合作商家");
			s.setDescription("该分类为系统分类，自动排版显示新淘网卖家版的淘宝店铺");
			s.setSortOrder(3);
			s.setType(SiteMapCategory.SHOP);
			s.setNick(nick);
			s.setUser_id(userId);
			cats.add(s);
			memberService.saveAll(cats);// 保存所有分类
		} else {
			for (SiteMapCategory cat : cats) {
				if ("C".equals(cat.getType())) {// 如果是自定义,查询自定义链接
					cat.setSites(memberService.findAllByCriterionAndOrder(
							SiteMap.class, Order.asc("sortOrder"),
							R.eq("cid", cat.getId())));
				}
			}
		}
		return new ModelAndView("site/member/fanli/siteMapManager", "cats",
				cats);
	}

	/**
	 * 保存最新自定义站点地图
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/sitemapcategory/modify", method = RequestMethod.POST)
	@ResponseBody
	public String flSiteMapCategoryUpdate(HttpServletRequest request) {
		String json = request.getParameter("json");
		if (StringUtils.isEmpty(json)) {
			SystemException.handleMessageException("站点地图内容为空");
		}
		List<SiteMapCategory> cats = new Gson().fromJson(json,
				new TypeToken<List<SiteMapCategory>>() {
				}.getType());
		if (cats == null || cats.size() == 0) {
			SystemException.handleMessageException("站点地图内容为空");
		}
		memberService.modifySiteMap(cats, EnvManager.getUser().getUser_id(),
				EnvManager.getUser().getNick());
		// TODO 发布站点地图
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 删除自定义站点分类
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/sitemapcategory/delete/{id}")
	@ResponseBody
	public String flSiteMapCategoryDelete(@PathVariable Long id,
			HttpServletRequest request) {
		memberService.deleteSiteMapCategory(id);
		// TODO 发布站点地图
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 删除自定义站点地图
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/sitemap/delete/{id}")
	@ResponseBody
	public String flSiteMapDelete(@PathVariable Long id,
			HttpServletRequest request) {
		memberService.delete(SiteMap.class, id);
		// TODO 发布站点地图
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 返利广告设置
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/ad", method = RequestMethod.GET)
	public ModelAndView flAd(HttpServletRequest request) {
		List<AD> ads = memberService.findAllByCriterion(AD.class,
				R.eq("user_id", EnvManager.getUser().getUser_id()));
		return new ModelAndView("site/member/fanli/adManager", "ads", ads);
	}

	/**
	 * 新增广告位
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/ad/add", method = RequestMethod.POST)
	@ResponseBody
	public String flAdAdd(HttpServletRequest request) {
		String title = request.getParameter("title");
		String pageType = request.getParameter("pageType");
		String adType = request.getParameter("adType");
		String adMeta = request.getParameter("adMeta");
		String isValid = request.getParameter("isValid");
		if (StringUtils.isEmpty(title) || StringUtils.isEmpty(pageType)
				|| StringUtils.isEmpty(adType) || StringUtils.isEmpty(adMeta)
				|| StringUtils.isEmpty(isValid)) {
			SystemException.handleMessageException("广告标题，页面位置，广告类型，广告代码不能为空");
		}
		try {
			new Gson().fromJson(adMeta, new TypeToken<Map<String, String>>() {
			}.getType());
		} catch (Exception e) {
			SystemException.handleMessageException("广告代码不规范");
		}
		AD ad = new AD();
		ad.setAdMeta(adMeta);
		ad.setAdType(adType);
		ad.setIsValid("true".equals(isValid) ? true : false);
		ad.setPageType(pageType);
		ad.setTitle(title);
		ad.setUser_id(EnvManager.getUser().getUser_id());
		ad.setSite_id(EnvManager.getUser().getSites().get(0).getId());
		ad.setNick(EnvManager.getUser().getNick());
		memberService.save(ad);
		SiteImpl impl = EnvManager.getSites().get(
				EnvManager.getUser().getUser_id());
		if (impl != null) {
			impl.setAds(siteService.getAds(EnvManager.getUser().getUser_id()));
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 查看广告位详情
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/ad/add/view", method = RequestMethod.GET)
	public ModelAndView flAdDetail(HttpServletRequest request) {
		return new ModelAndView("site/member/fanli/adDetail");
	}

	/**
	 * 查看广告位详情
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/ad/detail/{id}", method = RequestMethod.GET)
	public ModelAndView flAdDetail(@PathVariable Long id,
			HttpServletRequest request) {
		AD ad = memberService.get(AD.class, id);
		if (ad == null) {
			SystemException.handleMessageException("当前指定的广告不存在");
		}
		if (!ad.getUser_id().equals(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("您无权操作当前指定的广告");
		}
		ad.setCode((Map<String, String>) new Gson().fromJson(ad.getAdMeta(),
				new TypeToken<Map<String, String>>() {
				}.getType()));// 转换为Map
		return new ModelAndView("site/member/fanli/adDetail", "ad", ad);
	}

	/**
	 * 修改广告位
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/ad/update/{id}", method = RequestMethod.POST)
	@ResponseBody
	public String flAdUpdate(@PathVariable Long id, HttpServletRequest request) {
		AD ad = memberService.get(AD.class, id);
		if (ad == null) {
			SystemException.handleMessageException("当前指定的广告不存在");
		}
		if (!ad.getUser_id().equals(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("您无权操作当前指定的广告");
		}
		String title = request.getParameter("title");
		String pageType = request.getParameter("pageType");
		String adType = request.getParameter("adType");
		String adMeta = request.getParameter("adMeta");
		String isValid = request.getParameter("isValid");
		if (StringUtils.isEmpty(title) || StringUtils.isEmpty(pageType)
				|| StringUtils.isEmpty(adType) || StringUtils.isEmpty(adMeta)
				|| StringUtils.isEmpty(isValid)) {
			SystemException.handleMessageException("广告标题，页面位置，广告类型，广告代码不能为空");
		}
		try {
			new Gson().fromJson(adMeta, new TypeToken<Map<String, String>>() {
			}.getType());
		} catch (Exception e) {
			SystemException.handleMessageException("广告代码不规范");
		}
		ad.setAdMeta(adMeta);
		ad.setAdType(adType);
		ad.setIsValid("true".equals(isValid) ? true : false);
		ad.setPageType(pageType);
		ad.setTitle(title);
		ad.setUser_id(EnvManager.getUser().getUser_id());
		ad.setSite_id(EnvManager.getUser().getSites().get(0).getId());
		ad.setNick(EnvManager.getUser().getNick());
		memberService.update(ad);
		SiteImpl impl = EnvManager.getSites().get(
				EnvManager.getUser().getUser_id());
		if (impl != null) {
			impl.setAds(siteService.getAds(EnvManager.getUser().getUser_id()));
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 删除广告位
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/ad/delete")
	@ResponseBody
	public String flAdDelete(HttpServletRequest request) {
		String ids = request.getParameter("ids");
		if (StringUtils.isEmpty("ids")) {
			SystemException.handleMessageException("未指定要删除的广告列表");
		}
		String[] strs = ids.split(",");
		if (strs != null && strs.length > 0) {
			for (String str : strs) {
				try {
					Long id = Long.parseLong(str);
					AD ad = memberService.get(AD.class, id);
					if (ad != null
							&& ad.getUser_id().equals(
									EnvManager.getUser().getUser_id())) {// 如果不为空，并且有权限
						memberService.delete(AD.class, id);// 删除
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		SiteImpl impl = EnvManager.getSites().get(
				EnvManager.getUser().getUser_id());
		if (impl != null) {
			impl.setAds(siteService.getAds(EnvManager.getUser().getUser_id()));
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 返利站长认证
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/meta/add", method = RequestMethod.POST)
	@ResponseBody
	public String flMetadataAdd(HttpServletRequest request) {
		String meta = request.getParameter("meta");
		if (StringUtils.isEmpty(meta)) {
			SystemException.handleMessageException("META标签不能为空");
		}
		SiteMetadata metadata = memberService.findByCriterion(
				SiteMetadata.class, R.eq("metadata", meta),
				R.eq("user_id", EnvManager.getUser().getUser_id()));
		if (metadata != null) {
			SystemException.handleMessageException("【" + meta + "】标签已存在");
		}
		metadata = new SiteMetadata();
		metadata.setMetadata(meta);
		metadata.setNick(EnvManager.getUser().getNick());
		metadata.setSite_id(EnvManager.getUser().getSites().get(0).getId());
		metadata.setUser_id(EnvManager.getUser().getUser_id());
		memberService.save(metadata);
		pageService.deployMetaData(fcg, EnvManager.getUser().getUser_id());
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 返利站长认证修改
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/meta/update/{id}", method = RequestMethod.POST)
	@ResponseBody
	public String flMetadataUpdate(@PathVariable Long id,
			HttpServletRequest request) {
		SiteMetadata metadata = memberService.get(SiteMetadata.class, id);
		String meta = request.getParameter("meta");
		if (StringUtils.isEmpty(meta)) {
			SystemException.handleMessageException("META标签不能为空");
		}
		if (metadata == null) {
			SystemException.handleMessageException("指定的META标签不存在");
		}
		if (!metadata.getUser_id().equals(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("您没有权限修改此META标签");
		}
		metadata.setMetadata(meta);
		memberService.update(metadata);
		pageService.deployMetaData(fcg, EnvManager.getUser().getUser_id());
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 返利站长认证删除
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/meta/delete/{id}", method = RequestMethod.POST)
	@ResponseBody
	public String flMetadataDelete(@PathVariable Long id,
			HttpServletRequest request) {
		SiteMetadata metadata = memberService.get(SiteMetadata.class, id);
		if (metadata == null) {
			SystemException.handleMessageException("指定的META标签不存在");
		}
		if (!metadata.getUser_id().equals(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("您没有权限修改此META标签");
		}
		memberService.delete(SiteMetadata.class, id);
		pageService.deployMetaData(fcg, EnvManager.getUser().getUser_id());
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 返利会员基本信息
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/flmember/{id}", method = RequestMethod.GET)
	public ModelAndView flMember(@PathVariable Long id,
			HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		Member member = memberService.get(Member.class, id);
		if (member == null) {
			SystemException.handleMessageException("当前指定会员不存在");
		}
		if (!member.getUser_id().equals(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("您没有权限查看当前会员");
		}
		SiteCommission commission = memberService.get(SiteCommission.class,
				EnvManager.getUser().getSites().get(0).getId());
		result.put("siteCommission", commission);
		result.put("member", member);
		return new ModelAndView("site/member/fanli/flmember", result);
	}

	/**
	 * 修改个人返利
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/flmember/rate/update/{id}", method = RequestMethod.GET)
	@ResponseBody
	public String flMemberRate(@PathVariable Long id, HttpServletRequest request) {
		Member member = memberService.get(Member.class, id);
		if (member == null) {
			SystemException.handleMessageException("当前指定会员不存在");
		}
		if (!member.getUser_id().equals(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("您没有权限查看当前会员");
		}
		String commissionRate = request.getParameter("commissionRate");
		String adsCommissionRate = request.getParameter("adsCommissionRate");
		if (StringUtils.isNotEmpty(commissionRate)) {
			member.setCommissionRate(Integer.parseInt(commissionRate));
		} else {
			member.setCommissionRate(null);
		}
		if (StringUtils.isNotEmpty(adsCommissionRate)) {
			member.setAdCommissionRate(Integer.parseInt(adsCommissionRate));
		} else {
			member.setAdCommissionRate(null);
		}
		memberService.update(member);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 返利会员收入信息
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/flmember/income/{id}", method = RequestMethod.GET)
	public ModelAndView flMemberIncome(@PathVariable Long id,
			HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("allFanli", fanliService.sumFanliMoneyByMemberId(id, null));// 总返利金额
		// 等待站长支付返利
		result.put("unBuyFanli",
				fanliService.sumFanliMoneyByMemberId(id, "BUY", 0));// 购买返利金额
		result.put("unAdsFanli",
				fanliService.sumFanliMoneyByMemberId(id, "ADS", 0));// 推广返利金额
		// 等待会员确认收款（已支付）
		result.put("waitBuyFanli",
				fanliService.sumFanliMoneyByMemberId(id, "BUY", 1));// 购买返利金额
		result.put("waitAdsFanli",
				fanliService.sumFanliMoneyByMemberId(id, "ADS", 1));// 推广返利金额
		// 已完成
		result.put("finishBuyFanli",
				fanliService.sumFanliMoneyByMemberId(id, "BUY", 2));// 购买返利金额
		result.put("finishAdsFanli",
				fanliService.sumFanliMoneyByMemberId(id, "ADS", 2));// 推广返利金额
		return new ModelAndView("site/member/fanli/back/flmemberIncome", result);
	}

	/**
	 * 交易管理
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/report")
	public ModelAndView reportManager(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String q = request.getParameter("q");
		if (StringUtils.isNotEmpty(q)) {
			if ("get".equalsIgnoreCase(request.getMethod())) {
				try {
					q = new String(q.getBytes("ISO-8859-1"), "UTF-8");
				} catch (UnsupportedEncodingException e) {
					q = "";
				}
			}
		} else {
			q = "";
		}
		result.put("q", q);
		result.put("rel", request.getParameter("rel"));
		return new ModelAndView("site/member/fanli/reportManager", result);
	}

	/**
	 * 获取交易记录
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/report/get")
	@ResponseBody
	public String reportGet(HttpServletRequest request) {
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		if (StringUtils.isEmpty(startDate) || StringUtils.isEmpty(endDate)) {
			SystemException.handleMessageException("开始时间与结束时间不能为空");
		}
		String user_id = EnvManager.getUser().getUser_id();
		User user = siteService.findByCriterion(User.class,
				R.eq("user_id", user_id));
		EnvManager.getUser().setReportSession(user.getReportSession());
		if (StringUtils.isEmpty(EnvManager.getUser().getAppKey())) {
			SystemException.handleMessageException("尚未配置appKey");
		}
		// if (StringUtils.isEmpty(EnvManager.getUser().getReportSession())) {
		// SystemException.handleMessageException("尚未授权");
		// }
		String[] p = new String[] { DateUtils.YYYY_MM_DD };
		try {
			Calendar start = Calendar.getInstance();
			// Calendar end = Calendar.getInstance();
			start.setTime(DateUtils.parseDate(startDate, p));
			// end.setTime(DateUtils.parseDate(endDate, p));
			start.set(Calendar.HOUR_OF_DAY, 0);
			start.set(Calendar.MINUTE, 0);
			start.set(Calendar.SECOND, 0);
			// end.add(Calendar.DATE, 1);
			// end.set(Calendar.HOUR_OF_DAY, 0);
			// end.set(Calendar.MINUTE, 0);
			// end.set(Calendar.SECOND, 0);
			// if (!end.after(start)) {
			// SystemException.handleMessageException("结束时间不能小于开始时间");
			// }
			// if (end.get(Calendar.DATE) - start.get(Calendar.DATE) > 90) {
			// SystemException.handleMessageException("您一次最多只能获取90天的交易记录");
			// }
			Map<String, Integer> result = new HashMap<String, Integer>();
			result.put("all", 0);
			result.put("count", 0);
			List<Date> froms = TaobaoFetchUtil.getReportTimes(start.getTime());
			for (Date date : froms) {
				getReportByPage(result, 1L, date);
			}
			// for (; end.after(start); start.add(Calendar.DATE, 1)) {// 循环时间段
			// getReportByPage(result, 1L, start);
			// }
			return "{\"all\":\"" + result.get("all") + "\",\"success\":\""
					+ result.get("count") + "\"}";
		} catch (ParseException e) {
			SystemException.handleMessageException(e);
		}
		return "{\"all\":\"0\",\"success\":\"0\"}";
	}

	private void getReportByPage(Map<String, Integer> result, Long page,
			Date start) {
		TaobaokeRebateReportGetRequest req = new TaobaokeRebateReportGetRequest();
		req.setFields(TaobaoFetchUtil.TAOBAOREPORT_FIELDS);
		req.setStartTime(start);
		req.setSpan(600L);
		req.setPageNo(page);
		req.setPageSize(ReportsGetCommand.PAGE_SIZE);
		TaobaokeRebateReportGetResponse response = TaobaoFetchUtil
				.reportRebateGet(EnvManager.getUser().getAppKey(), EnvManager
						.getUser().getAppSecret(), req, EnvManager.getUser()
						.getReportSession());
		if (response != null) {
			// TaobaokeReport report = response.getTaobaokeReport();
			TaobaokeReport report = TaobaoFetchUtil.convertReport(response
					.getTaobaokePayments());
			if (report != null) {
				List<TaobaokeReportMember> members = report
						.getTaobaokeReportMembers();
				if (members != null && members.size() > 0) {
					result.put("all", result.get("all") + members.size());
					String user_id = EnvManager.getUser().getUser_id();
					String site_id = EnvManager.getUser().getSites().get(0)
							.getId();
					for (TaobaokeReportMember member : members) {
						if (member != null) {
							String outCode = member.getOuterCode();
							if (StringUtils.isNotEmpty(outCode)
									&& outCode.startsWith("xtfl")) {// 如果推广渠道不为空，并且是新淘返利
								if (commandService.mergeReportTrade(Long
										.valueOf(outCode.replace("xtfl", "")),
										user_id, site_id, member)) {
									result.put("count", result.get("count") + 1);
								}
							} else {
								if (commandService.mergeReportTrade(user_id,
										site_id, member)) {
									result.put("count", result.get("count") + 1);
								}
							}
						}
					}
					if (members.size() == ReportsGetCommand.PAGE_SIZE) {
						getReportByPage(result, page + 1, start);
					}
					// Long results = report.getTotalResults();
					// if (results != null
					// && results > ReportsGetCommand.PAGE_SIZE) {
					// int totalPageCount = (int) (results /
					// ReportsGetCommand.PAGE_SIZE);
					// if (results % ReportsGetCommand.PAGE_SIZE > 0) {
					// totalPageCount++;
					// }
					// if (page < totalPageCount) {// 如果当前页数小于总页数,继续同步
					// getReportByPage(result, page + 1, start);
					// }
					// }
				}
			}
		}
	}

	/**
	 * 交易记录查询
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/report/search", method = RequestMethod.POST)
	public ModelAndView reportSearch(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		Site site = EnvManager.getUser().getSites().get(0);
		String pageNoStr = request.getParameter("pageNo");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		Page<T_TaobaokeReportMember> page = new Page<T_TaobaokeReportMember>(
				pageNo, 15);
		SimpleExpression nickFilter = null;
		Criterion isFollowFilter = null;
		String q = request.getParameter("q");
		String rel = request.getParameter("rel");
		String isFollow = request.getParameter("isFollow");
		if (StringUtils.isNotEmpty(isFollow) && !"-1".equals(isFollow)) {// 是否跟单
			if ("true".equals(isFollow)) {
				isFollowFilter = R.isNotNull("nick");
			} else {
				isFollowFilter = R.isNull("nick");
			}
		}

		if (StringUtils.isNotEmpty(q)) {
			if (StringUtils.isNotEmpty(rel) && "trade".equals(rel)) {// 过滤交易号
				nickFilter = R.eq("trade_id", Long.valueOf(q));
			} else {// 过滤会员昵称
				nickFilter = R.like("nick", q, MatchMode.ANYWHERE);
			}
		}

		// 可分页，过滤会员名，时间排序
		result.put("reports", memberService.findAllByCriterionAndOrder(page,
				T_TaobaokeReportMember.class, Order.desc("pay_time"),
				nickFilter, isFollowFilter, R.eq("site_id", site.getId()),
				R.eq("user_id", EnvManager.getUser().getUser_id())));
		result.put("page", page);
		result.put("q", q);
		result.put("rel", rel);
		return new ModelAndView("site/member/fanli/reportSearch", result);
	}

	/**
	 * 返利管理
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/trade", method = RequestMethod.GET)
	public ModelAndView tradeManager(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String q = request.getParameter("q");
		if (StringUtils.isNotEmpty(q)) {
			if ("get".equalsIgnoreCase(request.getMethod())) {
				try {
					q = new String(q.getBytes("ISO-8859-1"), "UTF-8");
				} catch (UnsupportedEncodingException e) {
					q = "";
				}
			}
		} else {
			q = "";
		}
		result.put("q", q);
		result.put("status", request.getParameter("status"));
		result.put("type", request.getParameter("type"));
		result.put("rel", request.getParameter("rel"));
		return new ModelAndView("site/member/fanli/tradeManager", result);
	}

	/**
	 * 根据订单号查看返利记录
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/trade/report/{id}", method = RequestMethod.GET)
	public ModelAndView tradeReport(@PathVariable Long id,
			HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put(
				"trades",
				memberService.findAllByCriterion(FanliTrade.class,
						R.eq("report.trade_id", id)));
		return new ModelAndView("site/member/fanli/trade", result);
	}

	/**
	 * 根据返利号查看返利记录
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/trade/{id}", method = RequestMethod.GET)
	public ModelAndView tradeDetail(@PathVariable Long id,
			HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		FanliTrade trade = memberService.get(FanliTrade.class, id);
		if (trade == null) {
			SystemException.handleMessageException("指定返利记录不存在");
		}
		if (!trade.getUser_id().equals(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("您无权操作此条返利记录");
		}
		if (trade.getYiqifa() != null) {
			result.put("malls", EnvManager.getYiqifaMalls());
		}
		result.put("trade", trade);
		return new ModelAndView("site/member/fanli/tradeDetail", result);
	}

	/**
	 * 修改返利状态（站长支付状态---等待会员确认状态）
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/trade/update/status/{id}/{status}", method = RequestMethod.GET)
	@ResponseBody
	public String tradeStatus(@PathVariable Long id,
			@PathVariable Integer status, HttpServletRequest request) {
		FanliTrade trade = memberService.get(FanliTrade.class, id);
		if (!trade.getUser_id().equals(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("您无权修改当前返利记录状态");
		}
		if (trade.getStatus() == 2) {
			SystemException.handleMessageException("当前返利记录已经完成，不允许再修改");
		}
		trade.setStatus(status);
		memberService.update(trade);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 返利记录查询
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/trade/search", method = RequestMethod.POST)
	public ModelAndView tradeSearch(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		Site site = EnvManager.getUser().getSites().get(0);
		String pageNoStr = request.getParameter("pageNo");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		Page<FanliTrade> page = new Page<FanliTrade>(pageNo, 15);
		String q = request.getParameter("q");
		String rel = request.getParameter("rel");
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("site_id", site.getId());
		params.put("user_id", EnvManager.getUser().getUser_id());
		String status = request.getParameter("status");
		String type = request.getParameter("type");
		String hql = "from FanliTrade where site_id=:site_id and user_id=:user_id ";
		if (StringUtils.isNotEmpty(status) && !"-1".equals(status)) {// 状态
			params.put("status", Integer.parseInt(status));
			hql += " and status=:status ";
		}
		if (StringUtils.isNotEmpty(type) && !"-1".equals(type)) {// 返利类型
			params.put("type", type);
			hql += " and type=:type ";
		}
		if (StringUtils.isNotEmpty(q)) {
			if (StringUtils.isNotEmpty(rel) && "trade".equals(rel)) {// 过滤交易号
				params.put("q", Long.valueOf(q));
				hql += " and report.trade_id=:q ";
			} else {// 过滤会员昵称
				hql += " and flMember.info.username like '%" + q + "%' ";
			}
		}
		hql += " order by status asc,statusDate desc";
		// 可分页，过滤会员名,交易号，时间排序
		result.put("trades", memberService.findByHql(page, hql, params));
		result.put("page", page);
		result.put("q", q);
		result.put("rel", rel);
		result.put("status", status);
		result.put("type", type);
		return new ModelAndView("site/member/fanli/tradeSearch", result);
	}

	/**
	 * 返利会员管理
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/members", method = RequestMethod.GET)
	public ModelAndView memberManager(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		return new ModelAndView("site/member/fanli/members", result);
	}

	/**
	 * 返利会员查询
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/members/search", method = RequestMethod.POST)
	public ModelAndView memberSearch(HttpServletRequest request) {
		String pageNoStr = request.getParameter("pageNo");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		String q = request.getParameter("q");
		Site site = EnvManager.getUser().getSites().get(0);
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("user_id", EnvManager.getUser().getUser_id());
		params.put("site_id", site.getId());
		String hql = "from Member where site_id=:site_id and user_id=:user_id ";
		if (StringUtils.isNotEmpty(q)) {
			hql += " and info.username like '%" + q + "%'";
		}
		hql += " order by created desc";
		Page<Member> page = new Page<Member>(pageNo, 30);
		Map<String, Object> result = new HashMap<String, Object>();
		List<Member> members = memberService.findByHql(page, hql, params);
		result.put("members", members);
		result.put("q", q);
		result.put("page", page);
		return new ModelAndView("site/member/fanli/membersSearch", result);
	}

	@Autowired
	private FreeMarkerConfigurer fcg;

	@Autowired
	private ModuleMethod moduleMethod;

	/**
	 * 更新当前返利
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/profile/update")
	@ResponseBody
	public String addIndexAdsPlan(HttpServletRequest request) {
		Site site = EnvManager.getUser().getSites().get(0);
		SiteCommission commission = memberService.get(SiteCommission.class,
				site.getId());
		if (commission == null) {
			SystemException.handleMessageException("您尚未开通返利");
		}
		String commissionRateStr = request.getParameter("commissionRate");
		String adCommissionRateStr = request.getParameter("adCommissionRate");
		String commissionLimitStr = request.getParameter("commissionLimit");
		String registeCashStr = request.getParameter("registeCash");
		String isValid = request.getParameter("isValid");
		String bulletin = request.getParameter("bulletin");
		String alimamaScript = request.getParameter("alimamaScript");
		String baiduTongJi = request.getParameter("baiduTongJi");
		String isLogin = request.getParameter("isLogin");
		String isAd = request.getParameter("isAd");
		String sina_appkey = request.getParameter("sina_appkey");
		String qq_appkey = request.getParameter("qq_appkey");
		String taobao_appkey = request.getParameter("taobao_appkey");

		String uyan = request.getParameter("uyan");
		if (StringUtils.isEmpty(commissionRateStr)) {
			SystemException.handleMessageException("返利比例不能为空");
		} else {
			commission.setCommissionRate(Integer.parseInt(commissionRateStr));
		}
		if (StringUtils.isEmpty(adCommissionRateStr)) {
			SystemException.handleMessageException("推广返利比例不能为空");
		} else {
			commission.setAdCommissionRate(Integer
					.parseInt(adCommissionRateStr));
		}
		if (StringUtils.isNotEmpty(commissionLimitStr)) {
			commission.setCommissionLimit(Integer.parseInt(commissionLimitStr));
		}
		if (StringUtils.isNotEmpty(registeCashStr)) {
			commission.setRegisteCash(Integer.parseInt(registeCashStr));
		}
		if (StringUtils.isNotEmpty(alimamaScript)) {
			commission.setAlimamaScript(alimamaScript);
		}
		if (StringUtils.isNotEmpty(isLogin)) {
			commission.setIsLogin("true".equals(isLogin) ? true : false);
		}
		if ("false".equals(isAd)) {
			commission.setIsAd(false);
		} else {
			commission.setIsAd(true);
		}
		if (StringUtils.isNotEmpty(baiduTongJi)) {
			commission.setBaiduTongJi(baiduTongJi);
		} else {
			commission.setBaiduTongJi(null);
		}
		if (StringUtils.isNotEmpty(bulletin))
			commission.setBulletin(bulletin);
		else
			commission.setBulletin(null);

		// 网站合作
		if (StringUtils.isNotEmpty(sina_appkey)) {
			commission.setSina_appkey(sina_appkey);
		} else
			commission.setSina_appkey(null);

		if (qq_appkey == null) {
			qq_appkey = "";
		}
		if (!qq_appkey.equals(commission.getQq_appkey())) {
			if (!CommandExecutor.getUpdatecommands().containsKey(// 如果没有包含修改命令,QQ修改了,则发布所有页面
					"u-" + EnvManager.getUser().getUser_id())) {
				UpdateUserTemplateByUserIdCommand command = new UpdateUserTemplateByUserIdCommand();
				command.setFcg(fcg);
				command.setType("站点基本信息");
				command.setUser(EnvManager.getUser());
				command.setPageService(pageService);
				command.setModuleMethod(moduleMethod);
				CommandExecutor.getUpdatecommands().putIfAbsent(
						"u-" + EnvManager.getUser().getUser_id(), command);
			}
		}
		if (StringUtils.isNotEmpty(qq_appkey)) {
			commission.setQq_appkey(qq_appkey);
		} else
			commission.setQq_appkey(null);

		if (StringUtils.isNotEmpty(taobao_appkey)) {
			commission.setTaobao_appkey(taobao_appkey);
		} else
			commission.setTaobao_appkey(null);
		// 友言评论

		if (StringUtils.isNotEmpty(uyan)) {
			commission.setUyan(uyan);
		} else
			commission.setUyan(null);
		String userId = EnvManager.getUser().getUser_id();
		if (!CommandExecutor.getCachecommands().containsKey(
				"usershop-" + userId)) {// 如果不在队列中
			UserShopDetailCommand command = new UserShopDetailCommand();
			command.setFcg(fcg);
			command.setPageService(pageService);
			command.setUserId(userId);
			CommandExecutor.getCachecommands().put("usershop-" + userId,
					command);
		}
		if (!CommandExecutor.getCachecommands().containsKey("user-" + userId)) {// 如果不在队列中
			UserItemDetailCommand command = new UserItemDetailCommand();
			command.setFcg(fcg);
			command.setPageService(pageService);
			command.setUserId(userId);
			CommandExecutor.getCachecommands().put("user-" + userId, command);
		}
		// 更新缓存中的站点信息
		commission.setIsValid("false".equals(isValid) ? false : true);
		memberService.update(commission);
		pageService.deployFooter(fcg, site.getUser_id());// 发布页尾
		EnvManager.getSites().put(site.getUser_id(),
				siteService.getSiteImplByUserId(site.getUser_id()));
		return WindSiteRestUtil.SUCCESS;
	}

	@Autowired
	private IPageService pageService;
}
