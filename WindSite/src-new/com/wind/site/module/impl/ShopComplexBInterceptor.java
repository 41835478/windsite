package com.wind.site.module.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;

import com.wind.core.dao.Page;
import com.wind.core.service.IBaseService;
import com.wind.site.model.T_Poster;

public class ShopComplexBInterceptor extends AbstractModuleInterceptor {

	@Override
	public String after(IBaseService service, Map<String, Object> params,
			String result) {
		return result;
	}

	@Override
	public void before(IBaseService service, Map<String, Object> params) {
		String adType = String.valueOf(params.get("adType"));
		if ("poster".equals(adType)) {// 画报
			if (params.get("channels") != null) {// 查询本地，排序（热门，最新）
				String channels = String.valueOf(params.get("channels"));
				if (StringUtils.isNotEmpty(channels)) {
					String type = String.valueOf(params.get("poster_type"));
					List<T_Poster> posters = service
							.findAllByCriterionAndOrder(new Page<T_Poster>(1,
									11), T_Poster.class, Order.desc(type), R
									.eq("channel_id", Long.valueOf(channels)));
					params.put("data", posters);
				}
			}
		}
	}

}
