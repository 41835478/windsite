package com.wind.site.module.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wind.core.dao.Page;
import com.wind.core.service.IBaseService;
import com.wind.site.env.EnvManager;
import com.wind.site.model.Channel;
import com.wind.site.model.SiteImpl;

import freemarker.template.Template;

public class ShopTemplateInterceptor extends AbstractModuleInterceptor {
	private FreeMarkerConfigurer fcg;

	@Override
	public String after(IBaseService service, Map<String, Object> params,
			String result) {
		return result;
	}

	@SuppressWarnings("unchecked")
	@Override
	public void before(IBaseService service, Map<String, Object> params) {
		String module = String.valueOf(params.get("MODULE"));
		if ("shopTemplate".equals(module)) {
			String bd = String.valueOf(params.get("bd"));
			if (StringUtils.isEmpty(bd) || "null".equals(bd)) {// 如果内容为空
				String temp = String.valueOf(params.get("template"));
				if (!"null".equals(temp) && StringUtils.isNotEmpty(temp)) {// 如果不为空
					try {
						Template template = fcg.getConfiguration().getTemplate(
								"assets/js/page/module/template/" + temp
										+ ".ftl");
						template.setEncoding("UTF-8");
						String result = FreeMarkerTemplateUtils
								.processTemplateIntoString(template,
										new HashMap<String, Object>());
						params.put("bd", result);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		} else if ("shopMarketCat".equals(module)) {
			String cat = String.valueOf(params.get("cat"));
			if (StringUtils.isNotEmpty(cat) && !"null".equals(cat)) {
				try {
					Template template = fcg.getConfiguration().getTemplate(
							"assets/js/page/module/extra/" + cat + ".ftl");
					template.setEncoding("UTF-8");
					String result = FreeMarkerTemplateUtils
							.processTemplateIntoString(template,
									new HashMap<String, Object>());
					params.put("bd", result);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		} else if ("shopMallFloor".equals(module)) {
			String layout = String.valueOf(params.get("layout"));
			String cat = String.valueOf(params.get("cat"));
			if (StringUtils.isNotEmpty(cat) && !"null".equals(cat)) {
				String ftl = "assets/js/page/module/extra/floor_left_" + cat
						+ ".ftl";// 190,仅显示品牌
				if ("4".equals(layout)) {// 950,显示所有
					ftl = "assets/js/page/module/extra/floor_" + cat + ".ftl";
				}
				try {
					Template template = fcg.getConfiguration().getTemplate(ftl);
					template.setEncoding("UTF-8");
					String result = FreeMarkerTemplateUtils
							.processTemplateIntoString(template, params);
					params.put("bd", result);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		} else if ("shopMallNewFloor".equals(module)) {

			String cat = String.valueOf(params.get("cat"));
			if (StringUtils.isNotEmpty(cat) && !"null".equals(cat)) {
				String ftl = "assets/js/page/module/extra/new_floor_" + cat
						+ ".ftl";// 190,仅显示品牌
				try {
					Template template = fcg.getConfiguration().getTemplate(ftl);
					template.setEncoding("UTF-8");
					String result = FreeMarkerTemplateUtils
							.processTemplateIntoString(template, params);
					params.put("bd", result);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		} else if ("shopSliderTemplate".equals(module)) {
			String cat = String.valueOf(params.get("cat"));
			if (StringUtils.isNotEmpty(cat) && !"null".equals(cat)) {
				String ftl = "assets/js/page/module/extra/" + cat
						+ "_shopSliderTemplate.ftl";// 轮播
				try {
					Template template = fcg.getConfiguration().getTemplate(ftl);
					template.setEncoding("UTF-8");
					String result = FreeMarkerTemplateUtils
							.processTemplateIntoString(template, params);
					params.put("bd", result);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		} else if ("shopMallTabNav".equals(module)) {
			String cats = String.valueOf(params.get("cats"));
			if (StringUtils.isNotEmpty(cats) && !"null".equals(cats)) {
				String[] catsArray = cats.split(",");
				String where = "(";
				Boolean isFirst = true;
				for (String c : catsArray) {
					if (isFirst) {
						isFirst = false;
					} else {
						where += ",";
					}
					where += c;
				}
				where += ")";
				params.put("data", service.findByHql(
						"from YiqifaCategory where id in " + where,
						new HashMap<String, Object>()));
			}
		} else if ("shopTabNav".equals(module)) {
			if (null != params.get("SITEIMPL")) {// 查询当前用户的已发布的非首页的自定义页面
				List<Map<String, Object>> pages = new ArrayList<Map<String, Object>>();
				SiteImpl impl = (SiteImpl) params.get("SITEIMPL");
				Map<String, Object> _params = new HashMap<String, Object>();
				String hql = "select new map(title as title,pageid as pageid) from UserPage where user_id=:user_id and isIndex=:isIndex and status=:status and pageid is not null order by deployDate desc";
				_params.put("user_id", impl.getUser_id());
				_params.put("status", true);
				_params.put("isIndex", false);
				List<Map<String, Object>> myPages = service.findByHql(
						new Page<Map<String, Object>>(1, 36), hql, _params);
				Map<String, Object> page = null;
				for (Map<String, Object> map : myPages) {// 拷贝自定义页面进入结果
					page = new HashMap<String, Object>();
					page.put("title", map.get("title"));
					page.put("url", "/pages/" + map.get("pageid") + ".html");
					pages.add(page);
				}
				Integer count = 36 - pages.size();
				Integer length = 0;
				if (count > 0) {
					if ("0".equals(impl.getAppType())) {// 如果是月租型，则添加淘宝频道
						List<Channel> channels = EnvManager.getChannels();
						length = Math.min(count, channels.size());
						Map<String, Object> obj = null;
						for (int i = 0; i < length; i++) {
							Channel channel = channels.get(i);
							obj = new HashMap<String, Object>();
							obj.put("title", channel.getName());
							obj.put("url", "/channel/" + channel.getValue()
									+ ".html");
							pages.add(obj);
						}
					}
					count = 36 - pages.size();
					if (count > 0) {// 使用卖家版店铺补充
						hql = "select new map(s.title as title,s.sid as sid) from T_TaobaokeShop s,T_UserSubscribe usb where usb.versionNo=3 and s.sid is not null and usb.user_id=s.userId";
						List<Map<String, Object>> shops = (List<Map<String, Object>>) service
								.findByHql(hql, new HashMap<String, Object>());
						Collections.shuffle(shops);
						length = Math.min(count, shops.size());
						Map<String, Object> obj = null;
						for (int i = 0; i < length; i++) {
							obj = new HashMap<String, Object>();
							Map<String, Object> shop = shops.get(i);
							obj.put("title", shop.get("title"));
							obj.put("url", "/tshop/" + shop.get("sid")
									+ ".html");
							pages.add(obj);
						}
					}
				}
				params.put("data", pages);
			}
			if (null != params.get("links")) {// 自定义右侧链接
				String links = String.valueOf(params.get("links"));
				if (StringUtils.isNotEmpty(links) && !"null".equals(links)) {
					List<Map<String, String>> extra = new Gson().fromJson(
							links, new TypeToken<List<Map<String, String>>>() {
							}.getType());
					params.put("extra", extra);
				}
			}
		}
	}

	public void setFcg(FreeMarkerConfigurer fcg) {
		this.fcg = fcg;
	}

	public FreeMarkerConfigurer getFcg() {
		return fcg;
	}

}
