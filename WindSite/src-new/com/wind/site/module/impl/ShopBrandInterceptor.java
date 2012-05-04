package com.wind.site.module.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;

import com.wind.core.dao.Page;
import com.wind.core.service.IBaseService;
import com.wind.site.model.T_MallBrand;

public class ShopBrandInterceptor extends AbstractModuleInterceptor {

	@Override
	public String after(IBaseService service, Map<String, Object> params,
			String result) {
		return result;
	}

	@SuppressWarnings("unchecked")
	@Override
	public void before(IBaseService service, Map<String, Object> params) {
		if (params.get("dataType") != null) {
			String dataType = String.valueOf(params.get("dataType"));
			if ("search".equals(dataType)) {
				if (params.get("cid") != null) {
					String cid = String.valueOf(params.get("cid"));
					String count = String.valueOf(params.get("count"));
					Integer c = 4;
					try {
						c = Integer.parseInt(count);
					} catch (Exception e) {
						c = 4;
					}
					params.put("data", service.findAllByCriterionAndOrder(
							new Page<T_MallBrand>(1, c), T_MallBrand.class,
							Order.asc("sortOrder"), R.eq("cid", Long
									.valueOf(cid)), R.eq("isValid", true)));
					params.put("moreUrl", "/brand/" + cid + ".html");
				}
			} else if ("custom".equals(dataType)) {
				if (params.get("bids") != null) {
					String bids = String.valueOf(params.get("bids"));
					String[] array = bids.split(",");
					Boolean isFirst = true;
					String in = "";
					for (String p : array) {
						if (isFirst) {
							isFirst = false;
						} else {
							in += ",";
						}
						in += "'" + p + "'";
					}
					String hql = "from T_MallBrand where sid in (" + in + ")";
					List<T_MallBrand> brands = (List<T_MallBrand>) service
							.findByHql(hql, new HashMap<String, Object>());
					params.put("data", brands);
				}
			}
		}

	}

}
