package com.wind.site.rest;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.wind.site.env.EnvManager;
import com.wind.site.service.IAdminService;
import com.wind.site.util.WindSiteRestUtil;
import com.wind.site.util.XintaoAnalyticsClient;

/**
 * 新淘排行榜
 * 
 * @author fxy
 * 
 */
@Controller
@RequestMapping("/member/topmanager")
public class MemberTopRestManager {

	@Autowired
	private IAdminService adminService;

	/**
	 * 查询淘客日排行
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "")
	public ModelAndView taokeTotalEvents(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("day", EnvManager.getDayTaoke());
		result.put("week", EnvManager.getWeekTaoke());
		result.put("month", EnvManager.getMonthTaoke());
		result.put("all", EnvManager.getAllTaoke());
		return new ModelAndView("site/member/top/totalevent", result);
	}

	/**
	 * 同步排行榜数据
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/taoke/syn/totalevents")
	@ResponseBody
	public String synTaokeTotalEvents(HttpServletRequest request) {
		EnvManager.getDayTaoke().clear();
		EnvManager.setDayTaoke(adminService.getGATaoke(XintaoAnalyticsClient
				.getFyTaokeDay()));
		EnvManager.getWeekTaoke().clear();
		EnvManager.setWeekTaoke(adminService.getGATaoke(XintaoAnalyticsClient
				.getFyTaokeWeek()));
		EnvManager.getMonthTaoke().clear();
		EnvManager.setMonthTaoke(adminService.getGATaoke(XintaoAnalyticsClient
				.getFyTaokeMonth()));
		EnvManager.getAllTaoke().clear();
		EnvManager.setAllTaoke(adminService.getGATaoke(XintaoAnalyticsClient
				.getFyTaokeAll()));
		return WindSiteRestUtil.SUCCESS;
	}
}
