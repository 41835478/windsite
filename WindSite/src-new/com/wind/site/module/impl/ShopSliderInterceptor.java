package com.wind.site.module.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wind.core.service.IBaseService;

/**
 * 图片轮播拦截器
 * 
 * @author fxy
 * 
 */
public class ShopSliderInterceptor extends AbstractModuleInterceptor {

	@Override
	public String after(IBaseService service, Map<String, Object> params,
			String result) {
		return result;
	}

	@Override
	public void before(IBaseService service, Map<String, Object> params) {
		if (params.get("pics") != null) {
			String pics = String.valueOf(params.get("pics"));
			if (StringUtils.isNotEmpty(pics)) {
				if (StringUtils.isNotEmpty(pics)) {
					params.put("pics", new Gson().fromJson(pics,
							new TypeToken<List<Map<String, String>>>() {
							}.getType()));// 解析参数列表)
				}
			}
		}
	}
}
