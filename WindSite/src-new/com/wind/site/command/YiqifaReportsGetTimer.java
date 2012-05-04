package com.wind.site.command;

import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;

import com.wind.site.model.SiteCommission;
import com.wind.site.service.IAdminService;
import com.wind.site.yiqifa.YiqifaRequest;

/**
 * 定时获取所有站长的亿起发报表
 * 
 * @author fxy
 * 
 */
public class YiqifaReportsGetTimer {

	private static final Logger logger = Logger
			.getLogger(YiqifaReportsGetTimer.class.getName());
	private IAdminService adminService;

	@SuppressWarnings("unchecked")
	public void synYiqifaReports() {
		logger.info("yiqifa reports is starting");
		String hql = "select site from T_UserSubscribe usb,SiteCommission site where usb.versionNo>=2 and usb.user_id= site.user_id and site.yiqifa_username is not null and site.yiqifa_sid is not null and site.yiqifa_secret is not null";
		List<SiteCommission> sites = (List<SiteCommission>) adminService
				.findByHql(hql, new HashMap<String, Object>());
		if (sites != null && sites.size() > 0) {
			for (SiteCommission site : sites) {
				// 产生查询当前的亿起发记录
				YiqifaReportsGetCommand command = new YiqifaReportsGetCommand();
				YiqifaRequest request = new YiqifaRequest();
				request.setPrivatekey(site.getYiqifa_secret());
				request.setWid(site.getYiqifa_sid());
				request.setUsername(site.getYiqifa_username());
				request.setUser_id(site.getUser_id());
				request.setSite_id(site.getSite_id());
				command.setRequest(request);
				CommandExecutor.getCommands().add(command);
			}
		}
		logger.info("yiqifa reports [" + sites.size() + "] is ended");
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
