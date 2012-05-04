package com.wind.site.module.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;

import com.wind.core.dao.Page;
import com.wind.core.service.IBaseService;
import com.wind.site.model.TaobaoKeyword;
import com.wind.site.model.TaobaoKeywordCategory;

public class ShopKeywordInterceptor extends AbstractModuleInterceptor {

	@Override
	public String after(IBaseService service, Map<String, Object> params,
			String result) {
		return result;
	}

	@Override
	public void before(IBaseService service, Map<String, Object> params) {
		if (params.get("cids") != null) {
			String cids = String.valueOf(params.get("cids"));
			String sort = String.valueOf(params.get("sort"));
			Order order = null;
			if ("idxRank".equals(sort)) {
				order = Order.asc("idxRank");// 热搜
			} else {
				order = Order.desc("idxChg");// 飙升
			}
			Map<String, List<TaobaoKeyword>> data = new HashMap<String, List<TaobaoKeyword>>();
			String[] cidArray = cids.split(",");
			Page<TaobaoKeyword> page = new Page<TaobaoKeyword>(1, 10);
			if (cidArray.length > 0) {// 查询所有分类
				for (String cid : cidArray) {
					TaobaoKeywordCategory cat = service.get(
							TaobaoKeywordCategory.class, Long.valueOf(cid));
					if (cat != null) {
						List<TaobaoKeyword> words = service
								.findAllByCriterionAndOrder(page,
										TaobaoKeyword.class, order, R.eq("cid",
												Long.valueOf(cid)));
						data.put(cat.getName(), words);
					}
				}
			}
			params.put("data", data);
		}
	}

}
