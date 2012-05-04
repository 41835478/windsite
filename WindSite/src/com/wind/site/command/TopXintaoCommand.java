package com.wind.site.command;

import java.util.logging.Logger;

import com.wind.site.env.EnvManager;
import com.wind.site.service.IAdminService;
import com.wind.site.util.XintaoAnalyticsClient;

/**
 * 新淘排行榜定时事件
 */
public class TopXintaoCommand {
	private static final Logger logger = Logger
			.getLogger(TopXintaoCommand.class.getName());
	private IAdminService adminService;

	public void synXintaoTop() {
		try {
			logger.info("TOP is starting........");
			EnvManager.getDayTaoke().clear();
			EnvManager.setDayTaoke(adminService
					.getGATaoke(XintaoAnalyticsClient.getFyTaokeDay()));
			EnvManager.getWeekTaoke().clear();
			EnvManager.setWeekTaoke(adminService
					.getGATaoke(XintaoAnalyticsClient.getFyTaokeWeek()));
			EnvManager.getMonthTaoke().clear();
			EnvManager.setMonthTaoke(adminService
					.getGATaoke(XintaoAnalyticsClient.getFyTaokeMonth()));
			EnvManager.getAllTaoke().clear();
			EnvManager.setAllTaoke(adminService
					.getGATaoke(XintaoAnalyticsClient.getFyTaokeAll()));
			logger.info("TOP is ended!");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

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

}
