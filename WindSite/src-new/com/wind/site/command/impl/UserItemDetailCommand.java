package com.wind.site.command.impl;

import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.site.command.ICommand;
import com.wind.site.service.ICommandService;
import com.wind.site.service.IPageService;

public class UserItemDetailCommand implements ICommand {

	/**
	 * Freemarker 环境
	 */
	protected FreeMarkerConfigurer fcg;
	/**
	 * 新版本
	 */
	protected IPageService pageService;
	private String userId;

	@Override
	public void execute(ICommandService service) {
		// 部署用户新版页头（js，css）
		pageService.deployUserHtmlHeader(fcg, userId);
		// 部署用户新版详情页
		pageService.deployUserItemDetail(fcg, userId);
	}

	/**
	 * @return the fcg
	 */
	public FreeMarkerConfigurer getFcg() {
		return fcg;
	}

	/**
	 * @param fcg
	 *            the fcg to set
	 */
	public void setFcg(FreeMarkerConfigurer fcg) {
		this.fcg = fcg;
	}

	/**
	 * @return the pageService
	 */
	public IPageService getPageService() {
		return pageService;
	}

	/**
	 * @param pageService
	 *            the pageService to set
	 */
	public void setPageService(IPageService pageService) {
		this.pageService = pageService;
	}

	/**
	 * @return the userId
	 */
	public String getUserId() {
		return userId;
	}

	/**
	 * @param userId
	 *            the userId to set
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}

}
