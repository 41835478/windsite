package com.wind.site.module.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;
import org.hibernate.criterion.SimpleExpression;

import com.wind.core.dao.Page;
import com.wind.core.service.IBaseService;
import com.wind.site.env.EnvManager;
import com.wind.site.model.DianPu;
import com.wind.site.model.DianPuCategory;
import com.wind.site.model.DianPuModel;
import com.wind.site.model.YiqifaCategory;
import com.wind.site.model.YiqifaMall;

public class CommonDianPuInterceptor extends AbstractModuleInterceptor {

	@Override
	public String after(IBaseService service, Map<String, Object> params,
			String result) {
		return result;
	}

	@Override
	public void before(IBaseService service, Map<String, Object> params) {
		String module = String.valueOf(params.get("MODULE"));
		if ("shopDianPuCat".equals(module)) {// 分类
			if (params.get("cats") != null) {
				String cats = String.valueOf(params.get("cats"));
				if (StringUtils.isNotEmpty(cats)) {
					String[] catArray = cats.split(",");
					List<DianPuModel> models = new ArrayList<DianPuModel>();
					DianPuModel model = null;
					DianPuCategory root = null;
					for (String cat : catArray) {
						root = service.get(DianPuCategory.class, Long
								.valueOf(cat));// 根分类
						if (root != null) {
							model = new DianPuModel();
							model.setRoot(root);
							model.setCats(EnvManager.getDianpuCats().get(
									root.getName()));
							models.add(model);
						}
					}
					params.put("data", models);
				}
			}
		} else if ("shopDianPuList".equals(module)) {// 列表
			String adType = String.valueOf(params.get("adType"));
			if ("mall".equals(adType)) {
				String cats = String.valueOf(params.get("cats"));
				String[] catArray = cats.split(",");
				List<YiqifaCategory> catsData = new ArrayList<YiqifaCategory>();
				for (String c : catArray) {
					YiqifaCategory cat = service.get(YiqifaCategory.class, Long
							.valueOf(c));
					if (cat != null) {
						cat.setMalls(service.findAllByCriterionAndOrder(
								new Page<YiqifaMall>(1, 5), YiqifaMall.class,
								Order.desc("id"), R.eq("cid", cat.getId()), R
										.eq("isValid", true)));
					}
					catsData.add(cat);
				}
				params.put("data", catsData);
			} else {
				if (params.get("cats") != null) {
					String cats = String.valueOf(params.get("cats"));
					if (StringUtils.isNotEmpty(cats)) {
						String[] catArray = cats.split(",");
						List<DianPuCategory> dpcs = new ArrayList<DianPuCategory>();
						DianPuCategory cat = null;
						List<DianPu> shops = null;
						SimpleExpression catFilter = null;
						for (String id : catArray) {
							cat = service.get(DianPuCategory.class, Long
									.valueOf(id));// 根分类
							if (cat != null) {
								if (cat.getParent() != null) {// 设置父类
									cat.setParentCat(service.get(
											DianPuCategory.class, cat
													.getParent()));
									catFilter = R.eq("secCat", cat.getId());
								} else {
									catFilter = R.eq("rootCat", cat.getId());
								}
								shops = service.findAllByCriterion(
										new Page<DianPu>(1, 5), DianPu.class,
										catFilter, R.isNotNull("sid"));// 查询子分类的店铺
								cat.setShops(shops);
								dpcs.add(cat);
							}
						}
						params.put("data", dpcs);
					}
				}
			}
		}
	}
}
