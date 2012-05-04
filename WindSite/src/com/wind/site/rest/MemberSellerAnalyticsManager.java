package com.wind.site.rest;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.wind.core.util.DateUtils;
import com.wind.site.env.EnvManager;
import com.wind.site.service.IMemberService;

@Controller
@RequestMapping("/member/analyticsmanager/seller")
public class MemberSellerAnalyticsManager {
	@SuppressWarnings("unused")
	@Autowired
	private IMemberService memberService;

	// @Autowired
	// private IUCService ucService;

	/**
	 * 综合报告
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ModelAndView siteManager(HttpServletRequest request) {
		return new ModelAndView("site/member/seller/analytics/profile");
	}

	/**
	 * 最近访客
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/lastvisit", method = RequestMethod.GET)
	public ModelAndView lastVisit(HttpServletRequest request) {
		return new ModelAndView("site/member/seller/analytics/lastVisit");
	}

	/**
	 * 时段分析
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/hour", method = RequestMethod.GET)
	public ModelAndView hour(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		Calendar today = Calendar.getInstance();
		result.put("today", DateUtils.format(today.getTime(),
				DateUtils.YYYY_MM_DD));
		today.add(Calendar.DAY_OF_YEAR, -1);
		result.put("yesterday", DateUtils.format(today.getTime(),
				DateUtils.YYYY_MM_DD));
		today.add(Calendar.DAY_OF_YEAR, -1);
		result.put("todaybeforeyesterday", DateUtils.format(today.getTime(),
				DateUtils.YYYY_MM_DD));
		return new ModelAndView("site/member/seller/analytics/hour", result);
	}

	/**
	 * 每日分析
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/day", method = RequestMethod.GET)
	public ModelAndView day(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		// 最近30天
		Calendar dateMonth = Calendar.getInstance();
		result.put("endMonthDate", DateUtils.format(dateMonth.getTime(),
				DateUtils.YYYY_MM_DD));
		dateMonth.add(Calendar.DAY_OF_YEAR, -29);
		result.put("startMonthDate", DateUtils.format(dateMonth.getTime(),
				DateUtils.YYYY_MM_DD));
		// 本周
		Calendar dateThisWeek = Calendar.getInstance();
		dateThisWeek
				.set(Calendar.DAY_OF_WEEK, dateThisWeek.getFirstDayOfWeek());
		result.put("startThisWeekDate", DateUtils.format(
				dateThisWeek.getTime(), DateUtils.YYYY_MM_DD));
		dateThisWeek.add(Calendar.DAY_OF_WEEK, 6);
		result.put("endThisWeekDate", DateUtils.format(dateThisWeek.getTime(),
				DateUtils.YYYY_MM_DD));
		// 上周
		dateThisWeek.add(Calendar.DAY_OF_YEAR, -1);
		result.put("endLastWeekDate", DateUtils.format(dateThisWeek.getTime(),
				DateUtils.YYYY_MM_DD));
		dateThisWeek
				.set(Calendar.DAY_OF_WEEK, dateThisWeek.getFirstDayOfWeek());
		result.put("startLastWeekDate", DateUtils.format(
				dateThisWeek.getTime(), DateUtils.YYYY_MM_DD));
		return new ModelAndView("site/member/seller/analytics/day", result);
	}

	/**
	 * 高级统计
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/advanced", method = RequestMethod.GET)
	public ModelAndView advanced(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String dimensions = request.getParameter("dimensions");
		String startDate = request.getParameter("startDate");
		if (StringUtils.isEmpty(startDate)) {
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(new Date());
			calendar.add(Calendar.MONTH, -1);
			startDate = DateUtils.format(calendar.getTime(),
					DateUtils.YYYY_MM_DD);
		}
		result.put("startDate", startDate);
		String endDate = request.getParameter("endDate");
		if (StringUtils.isEmpty(endDate)) {
			endDate = DateUtils.format(new Date(), DateUtils.YYYY_MM_DD);

		}
		result.put("endDate", endDate);
		if (StringUtils.isNotEmpty(dimensions)) {
			result.put("dimensions", dimensions);
			if (dimensions.contains("label")) {// 如果包含推广标题
				String labelFilter = request.getParameter("labelFilter");
				if (StringUtils.isNotEmpty(labelFilter)) {
					result.put("labelFilter", labelFilter);
				}
			}
			if (dimensions.contains("category")) {// 如果包含推广类型
				String categoryFilter = request.getParameter("categoryFilter");
				if (StringUtils.isNotEmpty(categoryFilter)) {
					result.put("categoryFilter", categoryFilter);
				}
			}
		} else {
			result.put("dimensions", "category,label");
		}
		Map<String, Object> itemParams = new HashMap<String, Object>();
		itemParams.put("user_id", EnvManager.getUser().getUser_id());
		itemParams.put("nick", EnvManager.getUser().getNick());
		// TODO 慢查询 效率优化
		// result
		// .put(
		// "items",
		// memberService
		// .findByHql(
		// "select distinct new map(num_iid as num_iid,title as title) from T_TaobaokeItem where createdBy=:user_id and nick=:nick",
		// itemParams));
		return new ModelAndView("site/member/seller/analytics/advanced", result);
	}
}
