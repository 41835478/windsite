package com.wind.site.module.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wind.core.service.IBaseService;
import com.wind.site.model.SiteImpl;

public class ListParamsModuleInterceptor extends AbstractModuleInterceptor {

	@Override
	public String after(IBaseService service, Map<String, Object> params,
			String result) {
		return result;
	}

	@SuppressWarnings("unchecked")
	@Override
	public void before(IBaseService service, Map<String, Object> params) {
		if (params.get("list") != null) {
			String cats = String.valueOf(params.get("list"));
			if (StringUtils.isNotEmpty(cats)) {
				List<Map<String, String>> data = new Gson().fromJson(cats,
						new TypeToken<List<Map<String, String>>>() {
						}.getType());
				if ("shopHeader".equals(params.get("MODULE"))) {// 如果是店标模块
					if (data != null && data.size() > 0) {
						for (Map<String, String> map : data) {
							if ("sys".equals(map.get("t"))
									&& "pages".equals(map.get("v"))) {// 如果要显示所有页面
								Map<String, Object> _params = new HashMap<String, Object>();
								if (params.get("SITEIMPL") != null) {
									SiteImpl siteImpl = (SiteImpl) params
											.get("SITEIMPL");
									if (siteImpl.getVersionNo() > 1) {
										_params.put("userId", siteImpl
												.getUser_id());
										_params.put("status", true);
										List<Map<String, String>> pages = (List<Map<String, String>>) service
												.findByHql(
														"select new map(pageid as pageid,title as title) from UserPage where status=:status and user_id=:userId order by deployDate desc",
														_params);
										if (pages != null && pages.size() > 0) {
											params.put("extra", pages);
										}
									}
								}
							}
						}
					}
				}
				params.put("data", data);// 解析参数列表)
			}
		}
	}
}
