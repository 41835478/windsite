package com.wind.site.command.impl;

import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.site.freemarker.IDeployZone;
import com.wind.site.freemarker.method.ModuleMethod;
import com.wind.site.freemarker.method.WidgetCustomerMethod;
import com.wind.site.service.IPageService;

/**
 * 模板更新基类
 * 
 * @author fxy
 * 
 */
public abstract class AbstractUpdateTemplateCommand extends
		AbstractUCCenterCommand {
	/**
	 * Freemarker 环境
	 */
	protected FreeMarkerConfigurer fcg;
	/**
	 * 新版本
	 */
	protected IPageService pageService;
	/**
	 * 新版本
	 */
	protected ModuleMethod moduleMethod;
	/**
	 * 部署类
	 */
	protected IDeployZone deployZone;
	/**
	 * 自定义组件函数
	 */
	protected WidgetCustomerMethod widgetCustomer;

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
	 * @return the deployZone
	 */
	public IDeployZone getDeployZone() {
		return deployZone;
	}

	/**
	 * @param deployZone
	 *            the deployZone to set
	 */
	public void setDeployZone(IDeployZone deployZone) {
		this.deployZone = deployZone;
	}

	/**
	 * @return the widgetCustomer
	 */
	public WidgetCustomerMethod getWidgetCustomer() {
		return widgetCustomer;
	}

	/**
	 * @param widgetCustomer
	 *            the widgetCustomer to set
	 */
	public void setWidgetCustomer(WidgetCustomerMethod widgetCustomer) {
		this.widgetCustomer = widgetCustomer;
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
