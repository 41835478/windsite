package com.wind.site.module;

import java.util.Map;

import com.wind.core.service.IBaseService;

/**
 * 模块加载拦截器
 * 
 * @author fxy
 * 
 */
public interface IModuleInterceptor {
	/**
	 * 支持的模块
	 * 
	 * @param module
	 * @return
	 */
	Boolean support(String module);

	/**
	 * 模块加载前置处理（一般处理参数）
	 * 
	 * @param params
	 */
	void before(IBaseService service, Map<String, Object> params);

	/**
	 * 模块加载后置处理(一般处理返回的HTML)
	 * 
	 * @param params
	 * @param result
	 * @return
	 */
	String after(IBaseService service, Map<String, Object> params, String result);
}
