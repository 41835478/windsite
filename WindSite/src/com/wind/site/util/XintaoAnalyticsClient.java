package com.wind.site.util;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.google.gdata.data.analytics.DataEntry;
import com.google.gdata.data.analytics.DataFeed;
import com.wind.core.dao.Page;
import com.wind.core.util.DateUtils;
import com.wind.site.ga.AnalyticsClient;

public class XintaoAnalyticsClient extends AnalyticsClient {

	public static String startDate;

	/**
	 * 查询卖家30天内PV,UV
	 * 
	 * @param sid
	 * @param nick
	 * @return
	 */
	public static List<Map<String, Object>> getSellerSiteProfile(String sid,
			String nick) {
		return _getLast30("ga:eventAction=@-" + nick + "-,ga:eventAction=@-"
				+ sid);
	}

	/**
	 * 查询淘客30天内PV,UV
	 * 
	 * @param pid
	 * @return
	 */
	public static List<Map<String, Object>> getSiteProfile(String pid) {
		return _getLast30("ga:eventCategory=@xt-" + pid);
	}

	/**
	 * 查询卖家30天内PV,UV
	 * 
	 * @param sid
	 * @param nick
	 * @return
	 */
	public static List<Map<String, Object>> getSellerLastVisit(String sid,
			String nick) {
		return _getLastVisit("ga:eventAction=@-" + nick + "-,ga:eventAction=@-"
				+ sid);
	}

	/**
	 * 查询淘客最近50条访客
	 * 
	 * @param pid
	 * @return
	 */
	public static List<Map<String, Object>> getLastVisit(String pid) {
		return _getLastVisit("ga:eventCategory=@xt-" + pid);
	}

	/**
	 * 查询淘客时段分析
	 * 
	 * @param pid
	 * @return
	 */
	public static List<Map<String, Object>> getSellerHourProfile(String sid,
			String nick, String date) {
		return _getHourProfile("ga:eventAction=@-" + nick
				+ "-,ga:eventAction=@-" + sid, date);
	}

	/**
	 * 查询淘客时段分析
	 * 
	 * @param pid
	 * @return
	 */
	public static List<Map<String, Object>> getHourProfile(String pid,
			String date) {
		return _getHourProfile("ga:eventCategory=@xt-" + pid, date);
	}

	/**
	 * 查询卖家时间段内每日分析
	 * 
	 * @param sid
	 * @param nick
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static List<Map<String, Object>> getSellerDayProfile(String sid,
			String nick, String startDate, String endDate) {
		return _getDayProfile("ga:eventAction=@-" + nick
				+ "-,ga:eventAction=@-" + sid, startDate, endDate);

	}

	/**
	 * 查询淘客时间段内每日分析
	 * 
	 * @param pid
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static List<Map<String, Object>> getDayProfile(String pid,
			String startDate, String endDate) {
		return _getDayProfile("ga:eventCategory=@xt-" + pid, startDate, endDate);

	}

	/**
	 * 查询淘客时间段内排行
	 * 
	 * @param pid
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static List<Map<String, Object>> getFyTaoke(String startDate,
			String endDate) {
		return _getFyTaoke("ga:eventCategory=@xt-mm_", startDate, endDate);

	}

	/**
	 * 查询淘客日排行
	 * 
	 * @return
	 */
	public static List<Map<String, Object>> getFyTaokeDay() {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DATE, -1);
		String date = DateUtils
				.format(calendar.getTime(), DateUtils.YYYY_MM_DD);
		return getFyTaoke(date, date);

	}

	/**
	 * 查询淘客周排行
	 * 
	 * @return
	 */
	public static List<Map<String, Object>> getFyTaokeWeek() {
		Calendar dateThisWeek = Calendar.getInstance();
		String endThisWeekDate = DateUtils.format(dateThisWeek.getTime(),
				DateUtils.YYYY_MM_DD);
		dateThisWeek
				.set(Calendar.DAY_OF_WEEK, dateThisWeek.getFirstDayOfWeek());
		String startThisWeekDate = DateUtils.format(dateThisWeek.getTime(),
				DateUtils.YYYY_MM_DD);
		return getFyTaoke(startThisWeekDate, endThisWeekDate);

	}

	/**
	 * 查询淘客月排行
	 * 
	 * @param pid
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static List<Map<String, Object>> getFyTaokeMonth() {
		Calendar dateThisMonth = Calendar.getInstance();
		String endThisMonthDate = DateUtils.format(dateThisMonth.getTime(),
				DateUtils.YYYY_MM_DD);
		dateThisMonth.set(Calendar.DAY_OF_MONTH, dateThisMonth
				.getActualMinimum(Calendar.MONTH));
		String startThisMonthDate = DateUtils.format(dateThisMonth.getTime(),
				DateUtils.YYYY_MM_DD);
		return getFyTaoke(startThisMonthDate, endThisMonthDate);

	}

	/**
	 * 查询淘客总排行
	 * 
	 * @param pid
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static List<Map<String, Object>> getFyTaokeAll() {
		Calendar calendar = Calendar.getInstance();
		String date = DateUtils
				.format(calendar.getTime(), DateUtils.YYYY_MM_DD);
		return getFyTaoke("2010-07-20", date);

	}

	/**
	 * 查询淘客时间段内排行
	 * 
	 * @param pid
	 * @return
	 */
	public static List<Map<String, Object>> _getFyTaoke(String filters,
			String startDate, String endDate) {
		List<Map<String, Object>> analytics = new ArrayList<Map<String, Object>>();
		String dimensions = "ga:eventCategory";
		String metrics = "ga:totalEvents";
		String sort = "-ga:totalEvents";
		DataFeed dataFeed = getDataFeed(dimensions, metrics, filters, sort,
				startDate, endDate, null, 10);
		Integer totalResults = dataFeed.getTotalResults();
		if (totalResults > 0) {
			Map<String, Object> en = null;
			for (DataEntry entry : dataFeed.getEntries()) {
				en = new HashMap<String, Object>();
				en.put("pid", entry.stringValueOf("ga:eventCategory").replace(
						"xt-", ""));
				en.put("pv", entry.longValueOf("ga:totalEvents"));
				analytics.add(en);
			}
		}
		return analytics;
	}

	/**
	 * 查询最近30天趋势
	 * 
	 * @param filters
	 * @return
	 */
	public static List<Map<String, Object>> _getLast30(String filters) {
		List<Map<String, Object>> analytics = new ArrayList<Map<String, Object>>();
		String dimensions = "ga:date";
		String metrics = "ga:totalEvents,ga:uniqueEvents";
		String sort = "-ga:date";
		Calendar start = Calendar.getInstance();
		start.add(Calendar.DAY_OF_YEAR, -29);
		Calendar end = Calendar.getInstance();
		DataFeed dataFeed = getDataFeed(dimensions, metrics, filters, sort,
				DateUtils.format(start.getTime(), DateUtils.YYYY_MM_DD),
				DateUtils.format(end.getTime(), DateUtils.YYYY_MM_DD), null,
				null);
		Integer totalResults = dataFeed.getTotalResults();
		if (totalResults > 0) {
			Map<String, Object> en = null;
			for (DataEntry entry : dataFeed.getEntries()) {
				en = new HashMap<String, Object>();
				try {
					en.put("date", DateUtils.format(DateUtils.parseDate(entry
							.stringValueOf("ga:date"),
							new String[] { DateUtils.YYYYMMDD }),
							DateUtils.YYYY_MM_DD));
				} catch (ParseException e) {
					e.printStackTrace();
				}
				en.put("pv", entry.longValueOf("ga:totalEvents"));
				en.put("uv", entry.longValueOf("ga:uniqueEvents"));
				analytics.add(en);
			}
		}
		return analytics;
	}

	/**
	 * 查询最近访客
	 * 
	 * @param pid
	 * @return
	 */
	public static List<Map<String, Object>> _getLastVisit(String filters) {
		List<Map<String, Object>> analytics = new ArrayList<Map<String, Object>>();
		String dimensions = "ga:date,ga:hour,ga:eventAction,ga:eventLabel,ga:source,ga:city";
		String metrics = "ga:totalEvents,ga:uniqueEvents";
		String sort = "-ga:date,-ga:hour";
		Calendar end = Calendar.getInstance();
		DataFeed dataFeed = getDataFeed(dimensions, metrics, filters, sort,
				startDate, DateUtils
						.format(end.getTime(), DateUtils.YYYY_MM_DD), 1, 50);
		Integer totalResults = dataFeed.getTotalResults();
		if (totalResults > 0) {
			Map<String, Object> en = null;
			for (DataEntry entry : dataFeed.getEntries()) {
				en = new HashMap<String, Object>();
				try {
					en.put("date", DateUtils.format(DateUtils.parseDate(entry
							.stringValueOf("ga:date"),
							new String[] { DateUtils.YYYYMMDD }),
							DateUtils.YYYY_MM_DD));
				} catch (ParseException e) {
					e.printStackTrace();
				}
				en.put("hour", entry.stringValueOf("ga:hour"));
				en.put("action", entry.stringValueOf("ga:eventAction"));
				en.put("label", entry.stringValueOf("ga:eventLabel"));
				en.put("source", entry.stringValueOf("ga:source"));
				en.put("city", entry.stringValueOf("ga:city"));
				en.put("pv", entry.longValueOf("ga:totalEvents"));
				en.put("uv", entry.longValueOf("ga:uniqueEvents"));
				analytics.add(en);
			}
		}
		return analytics;
	}

	/**
	 * 查询站点PV，UV
	 * 
	 * @param page
	 * @return
	 */
	public static List<Map<String, Object>> _getSiteAnalytics(Page<?> page) {
		List<Map<String, Object>> analytics = new ArrayList<Map<String, Object>>();
		String dimensions = "ga:eventCategory";
		String metrics = "ga:totalEvents,ga:uniqueEvents";
		String filters = "ga:eventCategory=@mm_";
		String sort = "-ga:totalEvents";
		String startDate = "2010-08-15";
		String endDate = DateUtils.format(new Date(), DateUtils.YYYY_MM_DD);
		DataFeed dataFeed = getDataFeed(dimensions, metrics, filters, sort,
				startDate, endDate, page.getStart() + 1, 1000);
		Integer totalResults = dataFeed.getTotalResults();
		if (totalResults > 0) {
			page.setTotalCount(totalResults);
			Map<String, Object> en = null;
			for (DataEntry entry : dataFeed.getEntries()) {
				en = new HashMap<String, Object>();
				en.put("pid", entry.stringValueOf("ga:eventCategory"));
				en.put("pv", entry.longValueOf("ga:totalEvents"));
				en.put("uv", entry.longValueOf("ga:uniqueEvents"));
				analytics.add(en);
			}
		}
		return analytics;
	}

	/**
	 * 查询页面PV
	 * 
	 * @param page
	 * @return
	 */
	public static List<Map<String, Object>> _getPageAnalytics(Page<?> page) {
		List<Map<String, Object>> analytics = new ArrayList<Map<String, Object>>();
		String dimensions = "ga:pagePath";
		String metrics = "ga:uniquePageviews";
		String filters = "ga:pagePath=@/pages/";
		String sort = "-ga:uniquePageviews";
		String startDate = "2010-08-15";
		String endDate = DateUtils.format(new Date(), DateUtils.YYYY_MM_DD);
		DataFeed dataFeed = getDataFeed(dimensions, metrics, filters, sort,
				startDate, endDate, page.getStart() + 1, 1000);
		Integer totalResults = dataFeed.getTotalResults();
		if (totalResults > 0) {
			page.setTotalCount(totalResults);
			Map<String, Object> en = null;
			for (DataEntry entry : dataFeed.getEntries()) {
				en = new HashMap<String, Object>();
				en.put("page", entry.stringValueOf("ga:pagePath"));
				en.put("uv", entry.longValueOf("ga:uniquePageviews"));
				analytics.add(en);
			}
		}
		return analytics;
	}

	/**
	 * 查询某天的时段分析
	 * 
	 * @param pid
	 * @return
	 */
	public static List<Map<String, Object>> _getHourProfile(String filters,
			String date) {
		List<Map<String, Object>> analytics = new ArrayList<Map<String, Object>>();
		String dimensions = "ga:hour";
		String metrics = "ga:totalEvents,ga:uniqueEvents";
		String sort = "-ga:hour";
		DataFeed dataFeed = getDataFeed(dimensions, metrics, filters, sort,
				date, date, null, null);
		Integer totalResults = dataFeed.getTotalResults();
		if (totalResults > 0) {
			Map<String, Object> en = null;
			for (DataEntry entry : dataFeed.getEntries()) {
				en = new HashMap<String, Object>();
				en.put("hour", entry.stringValueOf("ga:hour"));
				en.put("pv", entry.longValueOf("ga:totalEvents"));
				en.put("uv", entry.longValueOf("ga:uniqueEvents"));
				analytics.add(en);
			}
		}
		return analytics;
	}

	/**
	 * 查询时间段内每日分析
	 * 
	 * @param pid
	 * @return
	 */
	public static List<Map<String, Object>> _getDayProfile(String filters,
			String startDate, String endDate) {
		List<Map<String, Object>> analytics = new ArrayList<Map<String, Object>>();
		String dimensions = "ga:date";
		String metrics = "ga:totalEvents,ga:uniqueEvents";
		String sort = "-ga:date";
		DataFeed dataFeed = getDataFeed(dimensions, metrics, filters, sort,
				startDate, endDate, null, null);
		Integer totalResults = dataFeed.getTotalResults();
		if (totalResults > 0) {
			Map<String, Object> en = null;
			for (DataEntry entry : dataFeed.getEntries()) {
				en = new HashMap<String, Object>();
				try {
					en.put("date", DateUtils.format(DateUtils.parseDate(entry
							.stringValueOf("ga:date"),
							new String[] { DateUtils.YYYYMMDD }),
							DateUtils.YYYY_MM_DD));
				} catch (ParseException e) {
					e.printStackTrace();
				}
				en.put("pv", entry.longValueOf("ga:totalEvents"));
				en.put("uv", entry.longValueOf("ga:uniqueEvents"));
				analytics.add(en);
			}
		}
		return analytics;
	}

	/**
	 * 高级统计
	 * 
	 * @return
	 */
	public static List<Map<String, Object>> getAdvancedProfile(
			String startDate, String endDate, String dimensions,
			String categoryFilter, String sort, Page<?> page) {
		List<Map<String, Object>> analytics = new ArrayList<Map<String, Object>>();
		String metrics = "ga:totalEvents,ga:uniqueEvents";
		if (StringUtils.isEmpty(sort)) {
			sort = "-ga:totalEvents";
		}
		DataFeed dataFeed = getDataFeed(dimensions, metrics, categoryFilter,
				sort, startDate, endDate, page.getStart() + 1, page
						.getPageSize());
		Integer totalResults = dataFeed.getTotalResults();
		page.setTotalCount(totalResults);
		if (totalResults > 0) {
			Map<String, Object> en = null;
			for (DataEntry entry : dataFeed.getEntries()) {
				en = new HashMap<String, Object>();
				if (dimensions.contains("ga:eventAction")) {
					en.put("action", convertAnalyticsAction(entry
							.stringValueOf("ga:eventAction")));
				}
				if (dimensions.contains("ga:eventLabel")) {
					en.put("label", entry.stringValueOf("ga:eventLabel"));
				}
				if (dimensions.contains("ga:source")) {
					en.put("source", convertAnalyticsSource(entry
							.stringValueOf("ga:source")));
				}
				if (dimensions.contains("ga:city")) {
					en.put("city", entry.stringValueOf("ga:city"));
				}
				if (dimensions.contains("ga:date")) {
					try {
						en.put("date", DateUtils.format(DateUtils.parseDate(
								entry.stringValueOf("ga:date"),
								new String[] { DateUtils.YYYYMMDD }),
								DateUtils.YYYY_MM_DD));
					} catch (ParseException e) {
						e.printStackTrace();
					}
				}
				en.put("pv", entry.longValueOf("ga:totalEvents"));
				en.put("uv", entry.longValueOf("ga:uniqueEvents"));
				analytics.add(en);
			}
		}
		return analytics;
	}

	public static String convertAnalyticsAction(String action) {
		if (action.indexOf("item-") != -1)
			return "<span style='color:#FF4500;'>商品推广</span>";
		else if (action.indexOf("shop-") != -1)
			return "<span style='color:#FF7F50;'>店铺推广</span>";
		else if (action.indexOf("channel-") != -1)
			return "<span style='color:#FFA07A;'>频道推广</span>";
		else if (action.indexOf("key-") != -1)
			return "<span style='color:#A0522D;'>关键词推广</span>";
		else if (action.indexOf("blog-") != -1)
			return "<span style='color:#8B4513;'>软文推广</span>";
		else if (action.indexOf("activity-") != -1)
			return "<span style='color:#D2691E;'>活动推广</span>";
		else if (action.indexOf("poster") != -1) {
			return "<span style='color:#D2691E;'>画报推广</span>";
		}
		return "未知";
	}

	public static String convertAnalyticsSource(String source) {
		if ("(direct)".equals(source)) {
			return "直接访问";
		} else {
			return source;
		}
	}

	/**
	 * @return the startDate
	 */
	public static String getStartDate() {
		return startDate;
	}

	/**
	 * @param startDate
	 *            the startDate to set
	 */
	public void setStartDate(String startDate) {
		XintaoAnalyticsClient.startDate = startDate;
	}
}
