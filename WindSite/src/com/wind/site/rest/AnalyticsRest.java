package com.wind.site.rest;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.core.util.DateUtils;
import com.wind.site.util.XintaoAnalyticsClient;

/**
 * GA报表
 * 
 * @author fxy
 * 
 */
@Controller
@RequestMapping("/member/ga")
public class AnalyticsRest {

	/**
	 * 查询站点30天内统计报表
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/siteprofile/{pid}", method = RequestMethod.GET)
	@ResponseBody
	public String siteProfile(@PathVariable String pid,
			HttpServletRequest request) {
		List<Map<String, Object>> result = null;
		if (StringUtils.isNotEmpty(pid)) {
			result = XintaoAnalyticsClient.getSiteProfile(pid);
		} else {
			result = new ArrayList<Map<String, Object>>();
		}
		return new Gson().toJson(result,
				new TypeToken<List<Map<String, Object>>>() {
				}.getType()).toString();
	}

	/**
	 * 查询卖家站点30天内统计报表
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/seller/siteprofile/{sid}", method = RequestMethod.POST)
	@ResponseBody
	public String sellerSiteProfile(@PathVariable String sid,
			HttpServletRequest request) {
		List<Map<String, Object>> result = null;
		String nick = request.getParameter("nick");
		if (StringUtils.isNotEmpty(sid) && StringUtils.isNotEmpty(nick)) {
			result = XintaoAnalyticsClient.getSellerSiteProfile(sid, nick);
		} else {
			result = new ArrayList<Map<String, Object>>();
		}
		return new Gson().toJson(result,
				new TypeToken<List<Map<String, Object>>>() {
				}.getType()).toString();
	}

	/**
	 * 查询站点最近访客
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/lastvisit/{pid}", method = RequestMethod.GET)
	@ResponseBody
	public String lastVisit(@PathVariable String pid, HttpServletRequest request) {
		List<Map<String, Object>> result = null;
		if (StringUtils.isNotEmpty(pid)) {
			result = XintaoAnalyticsClient.getLastVisit(pid);
		} else {
			result = new ArrayList<Map<String, Object>>();
		}
		return new Gson().toJson(result,
				new TypeToken<List<Map<String, Object>>>() {
				}.getType()).toString();
	}

	/**
	 * 查询卖家最近访客
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/seller/lastvisit/{sid}", method = RequestMethod.POST)
	@ResponseBody
	public String sellerLastVisit(@PathVariable String sid,
			HttpServletRequest request) {
		List<Map<String, Object>> result = null;
		String nick = request.getParameter("nick");
		if (StringUtils.isNotEmpty(sid) && StringUtils.isNotEmpty(nick)) {
			result = XintaoAnalyticsClient.getSellerLastVisit(sid, nick);
		} else {
			result = new ArrayList<Map<String, Object>>();
		}
		return new Gson().toJson(result,
				new TypeToken<List<Map<String, Object>>>() {
				}.getType()).toString();
	}

	/**
	 * 查询站点时段分析
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/hour/{pid}", method = RequestMethod.GET)
	@ResponseBody
	public String hour(@PathVariable String pid, HttpServletRequest request) {
		String date = request.getParameter("date");
		List<Map<String, Object>> result = null;
		if (StringUtils.isNotEmpty(pid)) {
			result = XintaoAnalyticsClient.getHourProfile(pid, date);
		} else {
			result = new ArrayList<Map<String, Object>>();
		}
		return new Gson().toJson(result,
				new TypeToken<List<Map<String, Object>>>() {
				}.getType()).toString();
	}

	/**
	 * 查询站点时段分析
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/seller/hour/{sid}", method = RequestMethod.POST)
	@ResponseBody
	public String sellerHour(@PathVariable String sid,
			HttpServletRequest request) {
		String date = request.getParameter("date");
		List<Map<String, Object>> result = null;
		String nick = request.getParameter("nick");
		if (StringUtils.isNotEmpty(sid) && StringUtils.isNotEmpty(nick)) {
			result = XintaoAnalyticsClient
					.getSellerHourProfile(sid, nick, date);
		} else {
			result = new ArrayList<Map<String, Object>>();
		}
		return new Gson().toJson(result,
				new TypeToken<List<Map<String, Object>>>() {
				}.getType()).toString();
	}

	/**
	 * 查询站点每日分析
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/day/{pid}", method = RequestMethod.GET)
	@ResponseBody
	public String day(@PathVariable String pid, HttpServletRequest request) {
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String year = request.getParameter("year");
		String month = request.getParameter("month");
		if (StringUtils.isEmpty(startDate)) {
			if (StringUtils.isNotEmpty(year) && StringUtils.isNotEmpty(month)) {
				Calendar start = Calendar.getInstance();
				start.set(Integer.parseInt(year), Integer.parseInt(month) - 1,
						1);
				startDate = DateUtils.format(start.getTime(),
						DateUtils.YYYY_MM_DD);
				start.set(Calendar.DAY_OF_MONTH, start
						.getActualMaximum(Calendar.DAY_OF_MONTH));
				endDate = DateUtils.format(start.getTime(),
						DateUtils.YYYY_MM_DD);
			} else {
				SystemException.handleMessageException("查询日期错误");
			}
		}
		List<Map<String, Object>> result = null;
		if (StringUtils.isNotEmpty(pid)) {
			result = XintaoAnalyticsClient.getDayProfile(pid, startDate,
					endDate);
		} else {
			result = new ArrayList<Map<String, Object>>();
		}
		return new Gson().toJson(result,
				new TypeToken<List<Map<String, Object>>>() {
				}.getType()).toString();
	}

	/**
	 * 查询站点每日分析
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/seller/day/{sid}", method = RequestMethod.POST)
	@ResponseBody
	public String sellerDay(@PathVariable String sid, HttpServletRequest request) {
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String year = request.getParameter("year");
		String month = request.getParameter("month");
		if (StringUtils.isEmpty(startDate)) {
			if (StringUtils.isNotEmpty(year) && StringUtils.isNotEmpty(month)) {
				Calendar start = Calendar.getInstance();
				start.set(Integer.parseInt(year), Integer.parseInt(month) - 1,
						1);
				startDate = DateUtils.format(start.getTime(),
						DateUtils.YYYY_MM_DD);
				start.set(Calendar.DAY_OF_MONTH, start
						.getActualMaximum(Calendar.DAY_OF_MONTH));
				endDate = DateUtils.format(start.getTime(),
						DateUtils.YYYY_MM_DD);
			} else {
				SystemException.handleMessageException("查询日期错误");
			}
		}
		List<Map<String, Object>> result = null;
		String nick = request.getParameter("nick");
		if (StringUtils.isNotEmpty(sid) && StringUtils.isNotEmpty(nick)) {
			result = XintaoAnalyticsClient.getSellerDayProfile(sid, nick,
					startDate, endDate);
		} else {
			result = new ArrayList<Map<String, Object>>();
		}
		return new Gson().toJson(result,
				new TypeToken<List<Map<String, Object>>>() {
				}.getType()).toString();
	}

	/**
	 * 查询站点高级统计
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/advanced/{pid}", method = RequestMethod.GET)
	public ModelAndView advanced(@PathVariable String pid,
			HttpServletRequest request) {
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String dimensions = request.getParameter("dimensions");
		String pageNoStr = request.getParameter("pageNo");
		String pageSizeStr = request.getParameter("pageSize");
		String categoryFilter = request.getParameter("categoryFilter");
		String sort = request.getParameter("sort");
		if (StringUtils.isEmpty(sort))
			sort = "";
		Integer pageNo = 1;
		Integer pageSize = 30;
		try {
			pageNo = Integer.parseInt(pageNoStr);
		} catch (Exception e) {
			pageNo = 1;
		}
		try {
			pageSize = Integer.parseInt(pageSizeStr);
		} catch (Exception e) {
			pageSize = 30;
		}
		String d = "";// 维度
		String f = "ga:eventCategory=@xt-" + pid;// 过滤器
		if (StringUtils.isNotEmpty(dimensions)) {// 解析维度
			if (dimensions.contains("date")) {
				d += "ga:date,";
			}
			if (dimensions.contains("category")) {
				d += "ga:eventAction,";
			}
			if (dimensions.contains("label")) {
				d += "ga:eventLabel,";
			}
			if (dimensions.contains("source")) {
				d += "ga:source,";
			}
			if (dimensions.contains("city")) {
				d += "ga:city,";
			}
			if (d.endsWith(",")) {
				d = d.substring(0, d.length() - 1);
			}
		}
		if (StringUtils.isNotEmpty(categoryFilter)) {// 解析过滤
			String[] ss = categoryFilter.split(":");
			if (ss.length == 2 && !"0".equals(ss[0])) {
				f += ";ga:eventAction=@" + ss[0] + "-";
				if (!"0".equals(ss[1])) {
					f += ";ga:eventAction=~^" + ss[0] + "-.*" + ss[1];
				}
			}
		}
		Page<List<Map<String, Object>>> page = new Page<List<Map<String, Object>>>(
				pageNo, pageSize);
		List<Map<String, Object>> analytics = null;
		if (StringUtils.isNotEmpty(pid)) {
			analytics = XintaoAnalyticsClient.getAdvancedProfile(startDate,
					endDate, d, f, sort, page);
		} else {
			analytics = new ArrayList<Map<String, Object>>();
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("sort", sort);
		result.put("page", page);
		result.put("dimensions", dimensions);
		result.put("analytics", analytics);
		return new ModelAndView("site/member/analytics/advancedAnalytics",
				result);
	}

	/**
	 * 查询站点高级统计
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/seller/advanced/{sid}", method = RequestMethod.POST)
	public ModelAndView sellerAdvanced(@PathVariable String sid,
			HttpServletRequest request) {
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String dimensions = request.getParameter("dimensions");
		String pageNoStr = request.getParameter("pageNo");
		String pageSizeStr = request.getParameter("pageSize");
		String categoryFilter = request.getParameter("categoryFilter");
		String sort = request.getParameter("sort");
		if (StringUtils.isEmpty(sort))
			sort = "";
		Integer pageNo = 1;
		Integer pageSize = 30;
		try {
			pageNo = Integer.parseInt(pageNoStr);
		} catch (Exception e) {
			pageNo = 1;
		}
		try {
			pageSize = Integer.parseInt(pageSizeStr);
		} catch (Exception e) {
			pageSize = 30;
		}
		String nick = request.getParameter("nick");
		String d = "";// 维度
		String f = "ga:eventAction=@-" + nick + "-,ga:eventAction=@-" + sid;// 过滤器
		if (StringUtils.isNotEmpty(dimensions)) {// 解析维度
			if (dimensions.contains("date")) {
				d += "ga:date,";
			}
			if (dimensions.contains("category")) {
				d += "ga:eventAction,";
			}
			if (dimensions.contains("label")) {
				d += "ga:eventLabel,";
			}
			if (dimensions.contains("source")) {
				d += "ga:source,";
			}
			if (dimensions.contains("city")) {
				d += "ga:city,";
			}
			if (d.endsWith(",")) {
				d = d.substring(0, d.length() - 1);
			}
		}
		if (StringUtils.isNotEmpty(categoryFilter)) {// 解析过滤
			if (categoryFilter.equals("shop:0")) {
				f += ";ga:eventAction=@shop-";
			} else {
				String[] ss = categoryFilter.split(":");
				if (ss.length == 2 && !"0".equals(ss[0])) {
					f += ";ga:eventAction=@" + ss[0] + "-";
					if (!"0".equals(ss[1])) {
						f += ";ga:eventAction=~^" + ss[0] + "-.*" + ss[1];
					}
				}
			}
		}
		Page<List<Map<String, Object>>> page = new Page<List<Map<String, Object>>>(
				pageNo, pageSize);
		List<Map<String, Object>> analytics = null;
		if (StringUtils.isNotEmpty(sid) && StringUtils.isNotEmpty(nick)) {
			analytics = XintaoAnalyticsClient.getAdvancedProfile(startDate,
					endDate, d, f, sort, page);
		} else {
			analytics = new ArrayList<Map<String, Object>>();
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("sort", sort);
		result.put("page", page);
		result.put("dimensions", dimensions);
		result.put("analytics", analytics);
		return new ModelAndView("site/member/analytics/advancedAnalytics",
				result);
	}
}
