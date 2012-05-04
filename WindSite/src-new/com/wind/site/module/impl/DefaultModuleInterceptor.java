package com.wind.site.module.impl;

import java.util.Map;

import com.wind.core.service.IBaseService;

/**
 * 默认模块加载拦截器（不作任何处理）
 * 
 * @author fxy
 * 
 */
public class DefaultModuleInterceptor extends AbstractModuleInterceptor {

	/**
	 * 默认的全支持
	 */
	@Override
	public Boolean support(String module) {
		return true;
	}

	/**
	 * 空处理
	 */
	@Override
	public String after(IBaseService service, Map<String, Object> params,
			String result) {
		return result;
	}

	/**
	 * 空处理
	 */
	@Override
	public void before(IBaseService service, Map<String, Object> params) {
	}

}
