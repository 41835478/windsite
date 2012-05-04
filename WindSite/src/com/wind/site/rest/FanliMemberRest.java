package com.wind.site.rest;

import java.text.ParseException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.springframework.web.servlet.ModelAndView;

import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.core.util.DateUtils;
import com.wind.site.env.EnvManager;
import com.wind.site.model.BuyFanliTrade;
import com.wind.site.model.FanliTrade;
import com.wind.site.model.Member;
import com.wind.site.model.MemberInfo;
import com.wind.site.model.SiteCommission;
import com.wind.site.model.T_TaobaokeReportMember;
import com.wind.site.model.YiqifaReport;
import com.wind.site.service.ICommandService;
import com.wind.site.service.IFanliService;
import com.wind.site.service.ISiteService;
import com.wind.site.util.WindSiteRestUtil;

@Controller
@RequestMapping("/fanlimember")
public class FanliMemberRest {
	@Autowired
	private ISiteService siteService;
	@Autowired
	private IFanliService fanliService;
	@Autowired
	private ICommandService commandService;

	/**
	 * 会员中心
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "")
	public ModelAndView registeView(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
		Member member = fanliService.get(Member.class, EnvManager.getMember()
				.getId());
		result.put("member", member);
		result.put("siteCommission", fanliService.get(SiteCommission.class,
				String.valueOf(result.get("sid"))));
		return new ModelAndView("site/member/fanli/front/profile", result);
	}

	/**
	 * 找回淘宝订单
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/order/tao")
	public ModelAndView orderManagerTaobao(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
		return new ModelAndView(
				"site/member/fanli/front/fanliOrderManagerTaobao", result);
	}

	/**
	 * 找回商城订单
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/order/mall")
	public ModelAndView orderManagerMall(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
		return new ModelAndView(
				"site/member/fanli/front/fanliOrderManagerMall", result);
	}

	/**
	 * 找回淘宝订单
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/order/search/tao")
	public ModelAndView orderSearchTao(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
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
				pageNo, 30);
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		Criterion dateFilter = null;
		if (StringUtils.isNotEmpty(startDate)
				&& StringUtils.isNotEmpty(endDate)) {
			String[] p = new String[] { DateUtils.YYYY_MM_DD };
			try {

				Calendar end = Calendar.getInstance();
				end.setTime(DateUtils.parseDate(endDate, p));
				end.add(Calendar.DATE, 1);
				dateFilter = R.between("pay_time", DateUtils.parseDate(
						startDate, p), end.getTime());
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		Member member = EnvManager.getMember();
		List<T_TaobaokeReportMember> reports = fanliService
				.findAllByCriterionAndOrder(page, T_TaobaokeReportMember.class,
						Order.desc("pay_time"), dateFilter, R.eq("user_id",
								member.getUser_id()), R.eq("site_id", member
								.getSite_id()), R.isNull("nick"));
		result.put("reports", reports);
		result.put("page", page);
		result.put("startDate", startDate);
		result.put("endDate", endDate);
		return new ModelAndView(
				"site/member/fanli/front/fanliOrderSearchTaobao", result);
	}

	/**
	 * 找回商城订单
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/order/search/mall")
	public ModelAndView orderSearchMall(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String pageNoStr = request.getParameter("pageNo");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		Page<YiqifaReport> page = new Page<YiqifaReport>(pageNo, 30);
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		Criterion dateFilter = null;
		if (StringUtils.isNotEmpty(startDate)
				&& StringUtils.isNotEmpty(endDate)) {
			String[] p = new String[] { DateUtils.YYYY_MM_DD };
			try {

				Calendar end = Calendar.getInstance();
				end.setTime(DateUtils.parseDate(endDate, p));
				end.add(Calendar.DATE, 1);
				dateFilter = R.between("orderTime", startDate, DateUtils
						.format(end.getTime(), DateUtils.YYYY_MM_DD));
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		Member member = EnvManager.getMember();
		List<YiqifaReport> reports = fanliService.findAllByCriterionAndOrder(
				page, YiqifaReport.class, Order.desc("orderTime"), dateFilter,
				R.eq("user_id", member.getUser_id()), R.eq("site_id", member
						.getSite_id()), R.isNull("nick"));
		result.put("reports", reports);
		result.put("page", page);
		result.put("startDate", startDate);
		result.put("endDate", endDate);
		result.put("malls", EnvManager.getYiqifaMalls());
		return new ModelAndView("site/member/fanli/front/fanliOrderSearchMall",
				result);
	}

	/**
	 * 用户信息
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/info")
	public ModelAndView memberInfo(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
		Member member = fanliService.get(Member.class, EnvManager.getMember()
				.getId());
		result.put("member", member);
		return new ModelAndView("site/member/fanli/front/fanliMemberInfo",
				result);
	}

	/**
	 * 修改信息
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/info/update", method = RequestMethod.POST)
	@ResponseBody
	public String updateMemberInfo(HttpServletRequest request,
			HttpServletResponse response) {
		String password = request.getParameter("oldpwd");
		String newpassword = request.getParameter("newpwd");
		String email = request.getParameter("email");
		String qq = request.getParameter("qq");
		String msn = request.getParameter("msn");
		String wangwang = request.getParameter("wangwang");
		String alipay = request.getParameter("alipay");
		String alipayName = request.getParameter("alipayName");
		String mobile = request.getParameter("mobile");
		Member member = siteService.get(Member.class, EnvManager.getMember()
				.getId());
		if (member == null) {
			SystemException.handleMessageException("当前指定的会员不存在");
		}
		if (!member.getInfo().getPwd().equals(password)) {
			SystemException.handleMessageException("旧密码不正确");
		}

		if (StringUtils.isEmpty(newpassword) || StringUtils.isEmpty(email)) {
			SystemException.handleMessageException("新密码，邮箱不能为空");
		}
		if (StringUtils.isEmpty(qq) && StringUtils.isEmpty(msn)
				&& StringUtils.isEmpty(wangwang) && StringUtils.isEmpty(mobile)) {
			SystemException.handleMessageException("QQ，MSN，旺旺，手机号至少填写一种联系方式");
		}
		MemberInfo info = member.getInfo();
		info.setPwd(newpassword);
		info.setEmail(email);
		info.setQq(qq);
		info.setMsn(msn);
		info.setWangwang(wangwang);
		info.setAlipay(alipay);
		info.setAlipayName(alipayName);
		info.setMobile(mobile);
		siteService.update(member);
		EnvManager.setMember(member);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 我的推广会员
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/ads")
	public ModelAndView myAds(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
		Member member = fanliService.get(Member.class, EnvManager.getMember()
				.getId());
		result.put("member", member);
		result.put("siteCommission", fanliService.get(SiteCommission.class,
				String.valueOf(result.get("sid"))));
		return new ModelAndView("site/member/fanli/front/fanliAdsManager",
				result);
	}

	/**
	 * 我的推广搜索(搜索我的推广会员)
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/ads/search")
	public ModelAndView myAdsSearch(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
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
		SimpleExpression qFilter = null;
		if (StringUtils.isNotEmpty(q)) {
			qFilter = R.like("username", q, MatchMode.ANYWHERE);
		}
		Page<Member> page = new Page<Member>(pageNo, 30);
		List<Member> members = fanliService.findAllByCriterionAndOrder(page,
				Member.class, Order.desc("created"), R.eq("parentId",
						EnvManager.getMember().getId()), qFilter);
		result.put("members", members);
		result.put("q", q);
		result.put("page", page);
		return new ModelAndView("site/member/fanli/front/fanliAdsSearch",
				result);
	}

	/**
	 * 淘宝推广记录
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/ads/report/tao")
	public ModelAndView myAdsTaobao(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
		return new ModelAndView(
				"site/member/fanli/front/fanliAdsManagerTaobao", result);
	}

	/**
	 * 商城推广记录
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/ads/report/mall")
	public ModelAndView myAdsMall(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
		return new ModelAndView("site/member/fanli/front/fanliAdsManagerMall",
				result);
	}

	/**
	 * 淘宝推广交易记录查询
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/ads/report/search/tao")
	public ModelAndView reportSearch(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
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
		String nick = request.getParameter("nick");
		String hql = "";
		Map<String, Object> _params = new HashMap<String, Object>();
		_params.put("adNick", result.get("nick"));
		// TODO 使用了MySql的字符串相加函数CONCAT
		if (StringUtils.isNotEmpty(nick)) {// 如果根据用户昵称查找
			_params.put("nick", nick);
			hql = "from T_TaobaokeReportMember where adNick=:adNick and nick like :nick order by pay_time desc ";
		} else {
			hql = "from T_TaobaokeReportMember where adNick=:adNick order by pay_time desc";
		}
		// 查询当前会员的交易记录
		result.put("reports", fanliService.findByHql(page, hql, _params));
		result.put("page", page);
		result.put("nick", nick);
		return new ModelAndView("site/member/fanli/front/fanliAdsReportTaobao",
				result);
	}

	/**
	 * 商城推广交易记录查询
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/ads/report/search/mall")
	public ModelAndView reportAdsSearchMall(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
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
		String nick = request.getParameter("nick");
		String hql = "";
		Map<String, Object> _params = new HashMap<String, Object>();
		_params.put("adNick", result.get("nick"));
		// TODO 使用了MySql的字符串相加函数CONCAT
		if (StringUtils.isNotEmpty(nick)) {// 如果根据用户昵称查找
			_params.put("nick", nick);
			hql = "from YiqifaReport where adNick=:adNick and nick like :nick order by orderTime desc ";
		} else {
			hql = "from YiqifaReport where adNick=:adNick order by orderTime desc";
		}
		// 查询当前会员的交易记录
		result.put("reports", fanliService.findByHql(page, hql, _params));
		result.put("page", page);
		result.put("nick", nick);
		result.put("malls", EnvManager.getYiqifaMalls());
		return new ModelAndView("site/member/fanli/front/fanliAdsReportMall",
				result);
	}

	/**
	 * 交易管理
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/report/tao")
	public ModelAndView reportManagerTaobao(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		if (StringUtils.isEmpty(startDate) || StringUtils.isEmpty(endDate)) {
			Calendar end = Calendar.getInstance();
			endDate = DateUtils.format(end.getTime(), DateUtils.YYYY_MM_DD);
			end.add(Calendar.MONTH, -1);
			startDate = DateUtils.format(end.getTime(), DateUtils.YYYY_MM_DD);
		}
		result.put("startDate", startDate);
		result.put("endDate", endDate);
		result.put("tradeId", request.getParameter("tradeId"));
		return new ModelAndView(
				"site/member/fanli/front/fanliReportManagerTaobao", result);
	}

	/**
	 * 交易管理
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/report/mall")
	public ModelAndView reportManagerMall(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		if (StringUtils.isEmpty(startDate) || StringUtils.isEmpty(endDate)) {
			Calendar end = Calendar.getInstance();
			endDate = DateUtils.format(end.getTime(), DateUtils.YYYY_MM_DD);
			end.add(Calendar.MONTH, -1);
			startDate = DateUtils.format(end.getTime(), DateUtils.YYYY_MM_DD);
		}
		result.put("startDate", startDate);
		result.put("endDate", endDate);
		result.put("tradeId", request.getParameter("tradeId"));
		return new ModelAndView(
				"site/member/fanli/front/fanliReportManagerMall", result);
	}

	/**
	 * 交易详情
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/report/tao/{id}")
	public ModelAndView reportDetail(@PathVariable Long id,
			HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		T_TaobaokeReportMember report = fanliService.get(
				T_TaobaokeReportMember.class, id);
		if (report == null) {
			SystemException.handleMessageException("当前指定订单不存在");
		}
		if (!(report.getUser_id().equals(EnvManager.getMember().getUser_id()) && report
				.getSite_id().equals(EnvManager.getMember().getSite_id()))) {
			SystemException.handleMessageException("您无权找回当前订单");
		}
		result.put("report", report);
		return new ModelAndView(
				"site/member/fanli/front/fanliOrderDetailTaobao", result);
	}

	/**
	 * 商城交易详情
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/report/mall/{id}")
	public ModelAndView reportDetailMall(@PathVariable String id,
			HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		YiqifaReport report = fanliService.get(YiqifaReport.class, id);
		if (report == null) {
			SystemException.handleMessageException("当前指定订单不存在");
		}
		if (!(report.getUser_id().equals(EnvManager.getMember().getUser_id()) && report
				.getSite_id().equals(EnvManager.getMember().getSite_id()))) {
			SystemException.handleMessageException("您无权找回当前订单");
		}
		result.put("report", report);
		return new ModelAndView("site/member/fanli/front/fanliOrderDetailMall",
				result);
	}

	/**
	 * 淘宝交易确认
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/report/confirm/tao/{id}")
	@ResponseBody
	public String reportConfirm(@PathVariable Long id,
			HttpServletRequest request) {
		T_TaobaokeReportMember report = fanliService.get(
				T_TaobaokeReportMember.class, id);
		if (report == null) {
			SystemException.handleMessageException("当前指定订单不存在");
		}
		Member member = EnvManager.getMember();
		if (!(report.getUser_id().equals(member.getUser_id()) && report
				.getSite_id().equals(member.getSite_id()))) {
			SystemException.handleMessageException("您无权确认当前订单");
		}
		commandService.confirmReportTrade(id, member.getId());
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 商城交易确认
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/report/confirm/mall/{id}")
	@ResponseBody
	public String reportConfirm(@PathVariable String id,
			HttpServletRequest request) {
		YiqifaReport report = fanliService.get(YiqifaReport.class, id);
		if (report == null) {
			SystemException.handleMessageException("当前指定订单不存在");
		}
		Member member = EnvManager.getMember();
		if (!(report.getUser_id().equals(member.getUser_id()) && report
				.getSite_id().equals(member.getSite_id()))) {
			SystemException.handleMessageException("您无权确认当前订单");
		}
		String orderNo = request.getParameter("orderNo");
		if (StringUtils.isNotEmpty(orderNo)
				&& orderNo.equals(report.getOrderNo())) {
			commandService.confirmMallReportTrade(id, member.getId());
		} else {
			SystemException.handleMessageException("订单编号错误");
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 最新的淘宝交易记录查询
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/report/search/tao/last")
	public ModelAndView reportSearchTaobaoLast(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
		Member member = EnvManager.getMember();
		Page<T_TaobaokeReportMember> page = new Page<T_TaobaokeReportMember>(1,
				5);
		result.put("reports", fanliService.findAllByCriterionAndOrder(page,
				T_TaobaokeReportMember.class, Order.desc("pay_time"), R.eq(
						"outer_code", "xtfl" + member.getId())));
		return new ModelAndView(
				"site/member/fanli/front/fanliReportSearchTaobao", result);
	}

	/**
	 * 最新的商城交易记录查询
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/report/search/mall/last")
	public ModelAndView reportSearchMallLast(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
		Member member = EnvManager.getMember();
		Page<YiqifaReport> page = new Page<YiqifaReport>(1, 5);
		result.put("reports", fanliService.findAllByCriterionAndOrder(page,
				YiqifaReport.class, Order.desc("orderTime"), R.eq("outerCode",
						"xtfl" + member.getId())));
		result.put("malls", EnvManager.getYiqifaMalls());
		return new ModelAndView(
				"site/member/fanli/front/fanliReportSearchMall", result);
	}

	/**
	 * 交易记录查询
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/report/search/tao")
	public ModelAndView reportSearchTaobao(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
		Member member = EnvManager.getMember();
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
		SimpleExpression tradeFilter = null;
		Criterion dateFilter = null;
		// 订单号过滤
		String tradeId = request.getParameter("tradeId");
		if (StringUtils.isNotEmpty(tradeId)) {
			tradeFilter = R.eq("trade_id", Long.valueOf(tradeId));
		}
		// 日期过滤
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		if (StringUtils.isNotEmpty(startDate)
				&& StringUtils.isNotEmpty(endDate)) {
			String[] p = new String[] { DateUtils.YYYY_MM_DD };
			try {
				Calendar end = Calendar.getInstance();
				end.setTime(DateUtils.parseDate(endDate, p));
				end.add(Calendar.DATE, 1);
				dateFilter = R.between("pay_time", DateUtils.parseDate(
						startDate, p), end.getTime());
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		// 可分页，过滤订单号，时间排序
		result.put("reports", fanliService.findAllByCriterionAndOrder(page,
				T_TaobaokeReportMember.class, Order.desc("pay_time"),
				tradeFilter, dateFilter, R.eq("outer_code", "xtfl"
						+ member.getId())));
		result.put("page", page);
		result.put("tradeId", tradeId);
		result.put("startDate", startDate);
		result.put("endDate", endDate);
		return new ModelAndView(
				"site/member/fanli/front/fanliReportSearchTaobaoAll", result);
	}

	/**
	 * 商城交易记录查询
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/report/search/mall")
	public ModelAndView reportSearchMall(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
		Member member = EnvManager.getMember();
		String pageNoStr = request.getParameter("pageNo");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		Page<YiqifaReport> page = new Page<YiqifaReport>(pageNo, 15);
		SimpleExpression tradeFilter = null;
		Criterion dateFilter = null;
		// 订单号过滤
		String tradeId = request.getParameter("tradeId");
		if (StringUtils.isNotEmpty(tradeId)) {
			tradeFilter = R.eq("orderNo", tradeId);
		}
		// 日期过滤
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		if (StringUtils.isNotEmpty(startDate)
				&& StringUtils.isNotEmpty(endDate)) {
			String[] p = new String[] { DateUtils.YYYY_MM_DD };
			try {
				Calendar end = Calendar.getInstance();
				end.setTime(DateUtils.parseDate(endDate, p));
				end.add(Calendar.DATE, 1);
				dateFilter = R.between("orderTime", startDate, DateUtils
						.format(end.getTime(), DateUtils.YYYY_MM_DD));
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		// 可分页，过滤订单号，时间排序
		result.put("reports", fanliService.findAllByCriterionAndOrder(page,
				YiqifaReport.class, Order.desc("orderTime"), tradeFilter,
				dateFilter, R.eq("outerCode", "xtfl" + member.getId())));
		result.put("page", page);
		result.put("tradeId", tradeId);
		result.put("startDate", startDate);
		result.put("endDate", endDate);
		result.put("malls", EnvManager.getYiqifaMalls());
		return new ModelAndView(
				"site/member/fanli/front/fanliReportSearchMallAll", result);
	}

	/**
	 * 返利记录
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/trade", method = RequestMethod.GET)
	public ModelAndView tradeManager(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		if (StringUtils.isEmpty(startDate) || StringUtils.isEmpty(endDate)) {
			Calendar end = Calendar.getInstance();
			endDate = DateUtils.format(end.getTime(), DateUtils.YYYY_MM_DD);
			end.add(Calendar.MONTH, -1);
			startDate = DateUtils.format(end.getTime(), DateUtils.YYYY_MM_DD);
		}
		result.put("startDate", startDate);
		result.put("endDate", endDate);
		result.put("tradeId", request.getParameter("tradeId"));
		result.put("status", request.getParameter("status"));
		result.put("type", request.getParameter("type"));
		return new ModelAndView("site/member/fanli/front/fanliTradeManager",
				result);
	}

	/**
	 * 返利记录搜索
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/trade/search")
	public ModelAndView tradeSearch(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
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
		// 订单号过滤
		String tradeId = request.getParameter("tradeId");
		// 日期过滤
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String status = request.getParameter("status");
		String type = request.getParameter("type");
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("id", EnvManager.getMember().getId());
		String hql = "from FanliTrade where flMember.id=:id ";
		if (StringUtils.isNotEmpty(status) && !"-1".equals(status)) {// 状态
			params.put("status", Integer.parseInt(status));
			hql += " and status=:status ";
		}
		if (StringUtils.isNotEmpty(type) && !"-1".equals(type)) {// 返利类型
			params.put("type", type);
			hql += " and type=:type ";
		}
		if (StringUtils.isNotEmpty(startDate)
				&& StringUtils.isNotEmpty(endDate)) {
			try {
				String[] p = new String[] { DateUtils.YYYY_MM_DD };
				Calendar end = Calendar.getInstance();
				end.setTime(DateUtils.parseDate(endDate, p));
				end.add(Calendar.DATE, 1);
				params.put("start", DateUtils.parseDate(startDate, p));
				params.put("end", end.getTime());
				params.put("yStart", startDate);
				params.put("yEnd", endDate);
				hql += " and statusDate between :start and :end";
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		if (StringUtils.isNotEmpty(tradeId)) {
			params.put("tradeId", Long.valueOf(tradeId));
			hql += " and report.trade_id=:tradeId ";
		}
		hql += " order by status asc,statusDate desc";
		// 可分页，过滤订单号，时间排序
		result.put("trades", fanliService.findByHql(page, hql, params));
		result.put("page", page);
		result.put("tradeId", tradeId);
		result.put("startDate", startDate);
		result.put("endDate", endDate);
		result.put("status", status);
		result.put("type", type);
		result.put("malls", EnvManager.getYiqifaMalls());
		return new ModelAndView("site/member/fanli/fanliTradeSearch", result);
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
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
		FanliTrade trade = fanliService.get(FanliTrade.class, id);
		if (trade == null) {
			SystemException.handleMessageException("指定返利记录不存在");
		}
		if (!trade.getFlMember().getId().equals(EnvManager.getMember().getId())) {
			SystemException.handleMessageException("您无权修改当前返利记录状态");
		}
		result.put("trade", trade);
		return new ModelAndView("site/member/fanli/fanliTradeDetail", result);
	}

	/**
	 * 修改返利状态（确认已收款--转向完成状态）
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/trade/update/status/{id}/{status}", method = RequestMethod.GET)
	@ResponseBody
	public String tradeStatus(@PathVariable Long id,
			@PathVariable Integer status, HttpServletRequest request) {
		FanliTrade trade = fanliService.get(FanliTrade.class, id);
		if (!trade.getFlMember().getId().equals(EnvManager.getMember().getId())) {
			SystemException.handleMessageException("您无权修改当前返利记录状态");
		}
		if (trade.getStatus() == 2) {
			SystemException.handleMessageException("当前返利记录已经完成，不允许再修改");
		}
		trade.setStatus(status);
		fanliService.update(trade);
		return WindSiteRestUtil.SUCCESS;
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
		result.put("trades", fanliService.findAllByCriterion(
				BuyFanliTrade.class, R.eq("report.trade_id", id)));
		return new ModelAndView("site/member/fanli/trade", result);
	}

	/**
	 * 返利会员返利记录概要
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/trade/count/{id}", method = RequestMethod.GET)
	public ModelAndView flMemberTradeCount(@PathVariable Long id,
			HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		result
				.put("allFanli", fanliService.countFanliTradeByMemberId(id,
						null));// 总返利金额
		// 等待站长支付返利记录数
		result.put("unBuyFanli", fanliService.countFanliTradeByMemberId(id,
				"BUY", 0));// 购买返利记录数
		result.put("unAdsFanli", fanliService.countFanliTradeByMemberId(id,
				"ADS", 0));// 推广返利记录数
		// 等待会员确认收款（已支付）记录数
		result.put("waitBuyFanli", fanliService.countFanliTradeByMemberId(id,
				"BUY", 1));// 购买返利记录数
		result.put("waitAdsFanli", fanliService.countFanliTradeByMemberId(id,
				"ADS", 1));// 推广返利记录数
		// 已完成记录数
		result.put("finishBuyFanli", fanliService.countFanliTradeByMemberId(id,
				"BUY", 2));// 购买返利记录数
		result.put("finishAdsFanli", fanliService.countFanliTradeByMemberId(id,
				"ADS", 2));// 推广返利记录数
		return new ModelAndView("site/member/fanli/flmemberTradeCount", result);
	}

	/**
	 * 返利会员收入信息
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/income/{id}", method = RequestMethod.GET)
	public ModelAndView flMemberIncome(@PathVariable Long id,
			HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("allFanli", fanliService.sumFanliMoneyByMemberId(id, null));// 总返利金额
		// 等待站长支付返利
		result.put("unBuyFanli", fanliService.sumFanliMoneyByMemberId(id,
				"BUY", 0));// 购买返利金额
		result.put("unAdsFanli", fanliService.sumFanliMoneyByMemberId(id,
				"ADS", 0));// 推广返利金额
		// 等待会员确认收款（已支付）
		result.put("waitBuyFanli", fanliService.sumFanliMoneyByMemberId(id,
				"BUY", 1));// 购买返利金额
		result.put("waitAdsFanli", fanliService.sumFanliMoneyByMemberId(id,
				"ADS", 1));// 推广返利金额
		// 已完成
		result.put("finishBuyFanli", fanliService.sumFanliMoneyByMemberId(id,
				"BUY", 2));// 购买返利金额
		result.put("finishAdsFanli", fanliService.sumFanliMoneyByMemberId(id,
				"ADS", 2));// 推广返利金额
		return new ModelAndView("site/member/fanli/flmemberIncome", result);
	}
}
