package com.wind.site.module.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;

import com.wind.core.dao.Page;
import com.wind.core.service.IBaseService;
import com.wind.site.model.T_ItemCat;
import com.wind.site.model.TaobaoKeyword;
import com.wind.site.model.TaobaoKeywordCategory;

public class CategoryMultiAdTypeInterceptor extends AbstractModuleInterceptor {

	@Override
	public String after(IBaseService service, Map<String, Object> params,
			String result) {
		return result;
	}

	@Override
	public void before(IBaseService service, Map<String, Object> params) {
		// 解析参数
		String adType = String.valueOf(params.get("adType"));
		if ("cat".equals(adType)) {// 根据类目显示
			if (params.get("cids") != null) {
				String[] cids = String.valueOf(params.get("cids")).split(",");
				if (cids.length > 0) {
					Map<String, List<T_ItemCat>> data = new HashMap<String, List<T_ItemCat>>();
					for (String cid : cids) {
						T_ItemCat parent = service.findByCriterion(
								T_ItemCat.class, R.eq("cid", cid));
						if (parent != null) {
							List<T_ItemCat> cats = service.findAllByCriterion(
									T_ItemCat.class, R.eq("parentCid", cid));
							data.put(parent.getCid() + "#" + parent.getName(),
									cats);
						}
					}
					params.put("data", data);
				}
			}
		} else if ("keyword".equals(adType)) {
			if (params.get("cids") != null) {
				String cids = String.valueOf(params.get("cids"));
				Order order = Order.desc("idxChg");// 飙升
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
											TaobaoKeyword.class, order, R.eq(
													"cid", Long.valueOf(cid)));
							data.put(cat.getName(), words);
						}
					}
				}
				params.put("data", data);
			}
		}

	}

}
