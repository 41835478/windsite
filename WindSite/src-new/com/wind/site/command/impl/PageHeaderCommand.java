package com.wind.site.command.impl;

import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.site.command.ICommand;
import com.wind.site.freemarker.method.ModuleMethod;
import com.wind.site.service.ICommandService;
import com.wind.site.service.IPageService;

public class PageHeaderCommand implements ICommand {
	/**
	 * Freemarker 环境
	 */
	protected FreeMarkerConfigurer fcg;
	/**
	 * 新版本
	 */
	protected IPageService pageService;
	/**
	 * 首页标识
	 */
	private String id;

	private ModuleMethod moduleMethod;

	@Override
	public void execute(ICommandService service) {
		pageService.deployHeaderAndFooter(id, fcg, moduleMethod);
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
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the moduleMethod
	 */
	public ModuleMethod getModuleMethod() {
		return moduleMethod;
	}

	/**
	 * @param moduleMethod
	 *            the moduleMethod to set
	 */
	public void setModuleMethod(ModuleMethod moduleMethod) {
		this.moduleMethod = moduleMethod;
	}

}
