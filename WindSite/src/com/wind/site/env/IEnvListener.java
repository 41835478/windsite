package com.wind.site.env;

import com.wind.site.service.IAdminService;

/**
 * 环境启动监听
 * 
 * @author fxy
 * 
 */
public interface IEnvListener {

	/**
	 * 环境监听启动事件<br>
	 */
	void init();

	IAdminService getAdminService();
}
