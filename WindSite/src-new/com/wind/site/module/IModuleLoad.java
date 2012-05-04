package com.wind.site.module;

import java.util.Map;

/**
 * 模块加载接口
 * 
 * @author fxy
 * 
 */
public interface IModuleLoad {
	/**
	 * 加载模块
	 * 
	 * @param params
	 * @return
	 */
	String getModule(String module, Map<String, Object> params);
}
