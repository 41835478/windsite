package com.wind.site.command;

import java.util.List;
import java.util.logging.Logger;

import org.hibernate.criterion.R;

import com.wind.site.model.SiteCommission;
import com.wind.site.model.YiqifaReport;
import com.wind.site.service.IAdminService;
import com.wind.site.yiqifa.YiqifaRequest;

/**
 * 同步未确认的亿起发订单
 * 
 * @author fxy
 * 
 */
public class YiqifaReportsOrderStatusCommand {

	private static final Logger logger = Logger
			.getLogger(YiqifaReportsOrderStatusCommand.class.getName());
	private IAdminService adminService;

	public void synYiqifaOrderStatus() {
		logger.info("yiqifa reports order status is starting");
		List<YiqifaReport> orders = adminService.findAllByCriterion(
				YiqifaReport.class, R.eq("orderStatus", "R"));
		if (orders != null && orders.size() > 0) {
			for (YiqifaReport order : orders) {
				// 同步未确认的订单的状态
				SiteCommission site = adminService.get(SiteCommission.class,
						order.getSite_id());
				YiqifaReportsGetCommand command = new YiqifaReportsGetCommand();
				YiqifaRequest request = new YiqifaRequest();
				request.setPrivatekey(site.getYiqifa_secret());
				request.setWid(site.getYiqifa_sid());
				request.setOrder_no(order.getOrderNo());
				request.setUsername(site.getYiqifa_username());
				request.setUser_id(site.getUser_id());
				request.setSite_id(site.getSite_id());
				command.setRequest(request);
				CommandExecutor.getCommands().add(command);
			}
		}
		logger.info("yiqifa reports order status [" + orders.size()
				+ "] is ended");
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
