package com.wind.site.module.impl;

import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;

import com.wind.core.service.IBaseService;
import com.wind.site.model.Channel;

public class ShopChannelInterceptor extends AbstractModuleInterceptor {

	@Override
	public String after(IBaseService service, Map<String, Object> params,
			String result) {
		return result;
	}

	@Override
	public void before(IBaseService service, Map<String, Object> params) {
		String src = null;
		if (params.get("channel") != null) {
			String channel = String.valueOf(params.get("channel"));
			if (StringUtils.isNotEmpty(channel)) {
				Channel c = service.findByCriterion(Channel.class, R.eq(
						"value", channel));
				if (c != null) {
					src = c.getClickUrl().replaceAll("mm_10011550_0_0",
							String.valueOf(params.get("pid")));
				}
			}
		}
		params.put("bd", src);
	}

}
