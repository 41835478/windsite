package com.wind.site.freemarker;

import java.util.Date;
import java.util.Map;

import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.site.freemarker.method.WidgetCustomerMethod;

/**
 * 空间部署接口
 * 
 * @author fxy
 * 
 */
public interface IDeployZone {

	/**
	 * 发布自定义组件
	 * 
	 * @param fcg
	 * @param result
	 * @param filename
	 */
	void deployWidget(FreeMarkerConfigurer fcg, Map<String, Object> result,
			String filename);

	/**
	 * 发布用户模板
	 * 
	 * @param fcg
	 * @param userId
	 * @param tid
	 */
	void deploy(FreeMarkerConfigurer fcg, String userId, String tid,
			WidgetCustomerMethod widgetCustomer);

	/**
	 * 发布系统模板
	 * 
	 * @param fcg
	 * @param stid
	 */
	void deploySysTemplate(FreeMarkerConfigurer fcg, String stid,
			WidgetCustomerMethod widgetCustomer);

	/**
	 * 用户模板发布路径
	 * 
	 * @param domainName
	 * @return
	 */
	String getPath(Integer type, String domainName, Date created);

	/**
	 * 系统模板发布路径
	 * 
	 * @param tname
	 * @return
	 */
	String getSysPath(String tname);
}
