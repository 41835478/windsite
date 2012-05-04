package com.wind.site.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;
import org.hibernate.criterion.SimpleExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.wind.core.dao.Page;
import com.wind.site.env.EnvManager;
import com.wind.site.model.ADPage;
import com.wind.site.model.ADPlan;
import com.wind.site.model.ADTaobaokeItem;
import com.wind.site.model.T_TaobaokeShop;
import com.wind.site.service.ISiteService;
import com.wind.site.util.WindSiteRestUtil;

@Controller
@RequestMapping("/ad")
public class ADRest {
	@Autowired
	private ISiteService siteService;

	@RequestMapping(value = "/page/{userId}/{pageId}")
	public ModelAndView adPage(@PathVariable Long userId,
			@PathVariable String pageId, HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		List<ADPage> ads = siteService.findAllByCriterion(
				new Page<ADPage>(1, 5), ADPage.class, R.eq("pk.pid", pageId));
		List<Map<String, Object>> adResult = new ArrayList<Map<String, Object>>();
		if (ads != null && ads.size() > 0) {
			Collections.shuffle(ads);
			for (ADPage ad : ads) {
				ADPlan plan = siteService
						.get(ADPlan.class, ad.getPk().getAid());
				if (plan != null && plan.getIsValid()) {
					String sellerId = plan.getCreatedBy();
					T_TaobaokeShop shop = siteService.get(T_TaobaokeShop.class,
							Long.valueOf(sellerId));
					if (shop != null) {// 广告计划所属卖家存在
						List<ADTaobaokeItem> items = siteService
								.findAllByCriterion(ADTaobaokeItem.class, R.eq(
										"planid", plan.getId()));
						if (items != null && items.size() > 0) {
							Map<String, Object> adMap = new HashMap<String, Object>();
							adMap.put("shop", shop);
							adMap.put("items", items);
							adResult.add(adMap);
						}
					}
				}
			}
		}
		result.put("ads", adResult);
		return new ModelAndView("site/ad/adBottomRight", result);
	}

	@RequestMapping(value = "/item/{id}")
	public ModelAndView adItem(@PathVariable String id,
			HttpServletRequest request, HttpServletResponse response) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		String pid = WindSiteRestUtil.covertPID(siteService, result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
		}
		ADTaobaokeItem item = siteService.get(ADTaobaokeItem.class, id);
		if (item == null) {
			try {
				if (StringUtils.isNotEmpty(userId)) {
					response.sendRedirect("http://shop" + userId
							+ ".xintaonet.com");
				} else {
					response.sendRedirect("http://www.xintaonet.com");
				}
				return null;
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			result.put("item", item);// 当前推广商品
			List<ADTaobaokeItem> items = siteService.findAllByCriterion(
					ADTaobaokeItem.class, R.eq("planid", item.getPlanid()), R
							.not(R.eq("id", item.getId())));// 当前推广计划中的其他商品
			List<ADTaobaokeItem> others = siteService.findAllByCriterion(
					ADTaobaokeItem.class, R.eq("nick", item.getNick()), R.not(R
							.eq("planid", item.getPlanid())));// 当前卖家的其他推广计划中的所有商品
			T_TaobaokeShop shop = siteService.findByCriterion(
					T_TaobaokeShop.class, R.eq("nick", item.getNick()));// 店铺信息
			result.put("items", items);
			result.put("others", others);
			result.put("shop", shop);
		}
		return new ModelAndView("site/ad/adItemDetail", result);

	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/blog")
	public ModelAndView adBlog(HttpServletRequest request) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		String pid = WindSiteRestUtil.covertPID(siteService, result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
		}
		String sid = request.getParameter("sid");
		String type = request.getParameter("type");
		if (StringUtils.isEmpty(sid) || StringUtils.isEmpty(type)) {
			return new ModelAndView("site/ad/scrollAd");
		}

		Map<String, Object> params = new HashMap<String, Object>();
		String hql = "select new map(cads as cads,sads as sads) from ADBlog where sid=:sid";
		params.put("sid", sid);
		List<Map<String, Object>> ads = (List<Map<String, Object>>) siteService
				.findByHql(hql, params);
		if (ads != null && ads.size() == 1) {
			Map<String, Object> adTemplate = ads.get(0);
			String cads = String.valueOf(adTemplate.get("cads"));
			String sads = String.valueOf(adTemplate.get("sads"));
			String hqlwhere = "";
			if (StringUtils.isNotEmpty(cads) && !cads.equals("null")) {
				hqlwhere += cads;
				if (StringUtils.isNotEmpty(sads) && !sads.equals("null")) {
					hqlwhere += ",";
				}
			}
			if (StringUtils.isNotEmpty(sads) && !sads.equals("null")) {
				hqlwhere += sads;
			}
			if (hqlwhere.length() > 0) {
				List<ADPlan> plans = siteService.getADPlan(hqlwhere);
				Collections.shuffle(plans);
				result.put("ads", plans);
				return new ModelAndView("site/ad/scrollAd", result);
			}
		}
		return new ModelAndView("site/ad/scrollAd", result);

	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/page/blog")
	public ModelAndView adPageBlog(HttpServletRequest request) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		String pid = WindSiteRestUtil.covertPID(siteService, result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
		}
		String sid = request.getParameter("sid");
		if (StringUtils.isEmpty(sid)) {
			return new ModelAndView("assets/js/page/module/ShopDisplay");
		}
		Map<String, Object> params = new HashMap<String, Object>();
		String hql = "select new map(t.pk.aid as aid) from ADBlogSystem t where t.pk.sid=:sid";
		params.put("sid", sid);
		List<Map<String, Object>> ads = (List<Map<String, Object>>) siteService
				.findByHql(new Page<Map<String, Object>>(1, 5), hql, params);
		result.put("title", "热卖推荐");
		result.put("isHd", true);
		result.put("adType", "item");
		result.put("isVolume", "false");// 设置为不显示销量
		if (ads != null && ads.size() > 0) {
			String aids = "";
			Boolean isFirst = true;
			for (Map<String, Object> map : ads) {
				if (isFirst) {
					isFirst = false;
				} else {
					aids += ",";
				}
				aids += "'" + map.get("aid") + "'";
			}
			hql = "from ADTaobaokeItem where planid in (" + aids + ")";
			List<ADTaobaokeItem> items = (List<ADTaobaokeItem>) siteService
					.findByHql(hql, new HashMap<String, Object>());
			if (items != null && items.size() > 0)
				Collections.shuffle(items);
			result.put("data", items);
		}
		return new ModelAndView("assets/js/page/module/ShopDisplay", result);
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/index")
	public ModelAndView adIndex(HttpServletRequest request) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		String pid = WindSiteRestUtil.covertPID(siteService, result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
		}
		if (StringUtils.isEmpty(userId)) {
			userId = String.valueOf(result.get("user_id"));
		}
		String ad = request.getParameter("ad");
		String page = request.getParameter("page");
		Boolean isLast = true;
		if (StringUtils.isEmpty(ad)) {// 如果是旧版本，提取页面
			isLast = false;
			if (StringUtils.isNotEmpty(page)) {// 如果是子页面
				String hql = "select new map(id as id) from UserTemplate where pageid=:pageid";
				Map<String, Object> params = new HashMap<String, Object>();
				params.put("pageid", page);
				List<Map<String, Object>> ts = (List<Map<String, Object>>) siteService
						.findByHql(hql, params);
				if (ts != null && ts.size() == 1) {
					ad = String.valueOf(ts.get(0).get("id"));
				}
			} else {// 如果是主页面
				String hql = "select new map(id as id) from UserTemplate where user_id=:userId and isDefault=:isDefault";
				Map<String, Object> params = new HashMap<String, Object>();
				params.put("userId", userId);
				params.put("isDefault", true);
				List<Map<String, Object>> ts = (List<Map<String, Object>>) siteService
						.findByHql(hql, params);
				if (ts != null && ts.size() == 1) {
					ad = String.valueOf(ts.get(0).get("id"));
				}
			}
		}
		if (StringUtils.isEmpty(ad)) {
			return new ModelAndView("site/ad/scrollAd");
		}

		Map<String, Object> params = new HashMap<String, Object>();
		String hql = "select new map(cads as cads,sads as sads,layout as layout) from ADUserTemplate where tid=:tid";
		params.put("tid", ad);
		List<Map<String, Object>> ads = (List<Map<String, Object>>) siteService
				.findByHql(hql, params);
		if (ads != null && ads.size() == 1) {
			Map<String, Object> adTemplate = ads.get(0);
			String cads = String.valueOf(adTemplate.get("cads"));
			String sads = String.valueOf(adTemplate.get("sads"));
			Integer layout = Integer.parseInt(String.valueOf(adTemplate
					.get("layout")));
			String hqlwhere = "";
			if (StringUtils.isNotEmpty(cads) && !cads.equals("null")) {
				hqlwhere += cads;
				if (StringUtils.isNotEmpty(sads) && !sads.equals("null")) {
					hqlwhere += ",";
				}
			}
			if (StringUtils.isNotEmpty(sads) && !sads.equals("null")) {
				hqlwhere += sads;
			}
			if (hqlwhere.length() > 0) {
				result.put("isLast", isLast);
				List<ADPlan> plans = siteService.getADPlan(hqlwhere);
				Collections.shuffle(plans);
				result.put("ads", plans);
				if (layout == 2) {// 滚动
					return new ModelAndView("site/ad/scrollAd", result);
				}// 对联
				return new ModelAndView("site/ad/scrollAd", result);
			}
		}
		return new ModelAndView("site/ad/scrollAd", result);

	}

	@RequestMapping(value = "/plans/relate/{id}")
	public ModelAndView plansRelate(@PathVariable String id,
			HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		WindSiteRestUtil.covertPID(siteService, result, userId);
		result.put("items", siteService.getRelatePlans(id, 5));
		return new ModelAndView("site/ad/adRelateItems", result);
	}

	@RequestMapping(value = "/plans/dialog")
	public ModelAndView searchPlansView(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("validNums", request.getParameter("validNums"));
		result.put("pType", request.getParameter("pType"));
		return new ModelAndView("site/member/ads/adPlansSearch", result);
	}

	@RequestMapping(value = "/fha")
	public ModelAndView fanliheaderads(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		if (StringUtils.isEmpty(userId)) {
			return new ModelAndView("site/member/ads/fha", result);
		}
		WindSiteRestUtil.covertFanliPID(siteService, request, result, userId);
		return new ModelAndView("site/member/ads/fha", result);
	}

	@RequestMapping(value = "/plans")
	public ModelAndView plans(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String q = request.getParameter("q");
		String type = request.getParameter("type");
		String pType = request.getParameter("pType");
		String cid = request.getParameter("cid");
		String pageNoStr = request.getParameter("pageNo");
		SimpleExpression qExpression = null;
		SimpleExpression cidExpression = null;
		SimpleExpression pTypeExpression = null;
		if (StringUtils.isNotEmpty("type") && "nick".equals(type)) {// 根据卖家搜索
			qExpression = R.like("nick", q, MatchMode.ANYWHERE);
		} else {// 根据计划名称搜索
			qExpression = R.like("name", q, MatchMode.ANYWHERE);
		}
		if (StringUtils.isNotEmpty(cid) && !"0".equals(cid)) {// 如果指定了分类
			cidExpression = R.eq("cid", cid);
		}
		if (StringUtils.isNotEmpty(pType) && !"0".equals(pType)) {// 如果指定了查询计划类型
			pTypeExpression = R.eq("type", pType);
		}
		Integer pageNo = 1;
		try {
			pageNo = Integer.parseInt(pageNoStr);
		} catch (Exception e) {
			pageNo = 1;
		}
		Page<ADPlan> page = new Page<ADPlan>(pageNo, 10);
		result.put("plans", siteService.findAllByCriterionAndOrder(page,
				ADPlan.class, Order.asc("used"), R.eq("isValid", true),
				qExpression, cidExpression, pTypeExpression));
		result.put("page", page);
		return new ModelAndView("site/member/ads/adPlansSearchResult", result);
	}
}
