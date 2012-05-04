package com.wind.site.module.impl;

import java.util.List;

import com.wind.site.module.IModuleInterceptor;

/**
 * 拦截器抽象
 * 
 * @author fxy
 * 
 */
public abstract class AbstractModuleInterceptor implements IModuleInterceptor {
	protected List<String> modules;

	@Override
	public Boolean support(String module) {
		return modules.contains(module);
	}

	public void setModules(List<String> modules) {
		this.modules = modules;
	}

	public List<String> getModules() {
		return modules;
	}
}
