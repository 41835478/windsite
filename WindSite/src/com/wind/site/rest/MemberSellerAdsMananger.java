package com.wind.site.rest;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.taobao.api.domain.Item;
import com.taobao.api.domain.ItemSearch;
import com.taobao.api.domain.TaobaokeItem;
import com.taobao.api.request.ItemsSearchRequest;
import com.taobao.api.response.ItemsSearchResponse;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.site.env.EnvManager;
import com.wind.site.model.ADPlan;
import com.wind.site.model.ADPlanTag;
import com.wind.site.model.ADTaobaokeItem;
import com.wind.site.service.IMemberService;
import com.wind.site.util.TaobaoFetchUtil;
import com.wind.site.util.WindSiteRestUtil;

@Controller
@RequestMapping("/member/selleradsmanager")
public class MemberSellerAdsMananger {
	@Autowired
	private IMemberService memberService;

	/**
	 * 广告计划管理
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/plan/{view}", method = RequestMethod.GET)
	public ModelAndView indexAdsManager(@PathVariable String view,
			HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put(
				"plans",
				memberService.findAllByCriterion(ADPlan.class,
						R.eq("createdBy", EnvManager.getUser().getUser_id()),
						R.eq("type", view)));
		return new ModelAndView(
				"site/member/seller/ads/" + view + "AdsManager", result);
	}

	/**
	 * 广告计划新增视图
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/plan/add/{view}", method = RequestMethod.GET)
	public ModelAndView addIndexAdsView(@PathVariable String view,
			HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("cats", EnvManager.getRootCats());
		String hql = "from ADPlanTag where createdBy=:userId order by nums desc";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userId", EnvManager.getUser().getUser_id());
		result.put("tags", memberService.findByHql(new Page<ADPlanTag>(1, 10),
				hql, params));
		return new ModelAndView("site/member/seller/ads/" + view + "Ads",
				result);
	}

	/**
	 * 广告计划新增
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/plan/add", method = RequestMethod.POST)
	@ResponseBody
	public String addIndexAds(HttpServletRequest request) {
		String name = request.getParameter("planName");
		String type = request.getParameter("planType");
		String isDefault = request.getParameter("planIsDefault");
		String tags = request.getParameter("planTags");
		if (StringUtils.isEmpty(type)) {
			SystemException.handleMessageException("广告计划未指定类型");
		}
		if (StringUtils.isEmpty(name)) {
			SystemException.handleMessageException("广告计划名称不能为空");
		}
		ADPlan plan = memberService.findByCriterion(ADPlan.class,
				R.eq("name", name),
				R.eq("createdBy", EnvManager.getUser().getUser_id()));
		if (plan != null) {
			SystemException.handleMessageException("广告计划名称【" + name + "】重复");
		}
		String numIids = request.getParameter("planNumIids");
		if (StringUtils.isEmpty(numIids)) {
			SystemException.handleMessageException("广告计划未指定要推广的商品");
		}

		String cid = request.getParameter("planCid");
		String desc = request.getParameter("planDesc");
		plan = new ADPlan();
		plan.setCid(cid);
		plan.setName(name);
		if (StringUtils.isNotEmpty(desc))
			plan.setDescription(desc);
		plan.setIsDefault("true".equals(isDefault) ? true : false);
		plan.setNick(EnvManager.getUser().getNick());
		plan.setIsValid(true);
		plan.setType(type);
		plan.setIsSuccess(true);
		plan.setUsed(0);
		memberService.addADPlan(plan, TaobaoFetchUtil.newItemsConvert(numIids,
				EnvManager.getUser().getNick(), EnvManager.getUser().getPid()),
				tags);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 广告计划修改视图
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/plan/update/{view}/{id}", method = RequestMethod.GET)
	public ModelAndView updateIndexAdsView(@PathVariable String view,
			@PathVariable String id, HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		ADPlan plan = memberService.load(ADPlan.class, id);
		result.put("plan", plan);
		String hql = "select new map(t.name as name) from ADPlanTag t,ADPlanTags ts where ts.pid=:id and t.id=ts.tid";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("id", id);
		List<Map<String, Object>> tags = (List<Map<String, Object>>) memberService
				.findByHql(hql, params);
		String tagsStr = "";
		if (tags != null && tags.size() > 0) {
			Boolean isFirst = true;
			for (Map<String, Object> map : tags) {
				if (isFirst) {
					isFirst = false;
				} else {
					tagsStr += " ";
				}
				tagsStr += map.get("name");
			}
		}
		plan.setTags(tagsStr);
		plan.setItems(memberService.findAllByCriterion(ADTaobaokeItem.class,
				R.eq("planid", id)));
		String tagsHql = "from ADPlanTag where createdBy=:userId order by nums desc";
		Map<String, Object> tagsParams = new HashMap<String, Object>();
		tagsParams.put("userId", EnvManager.getUser().getUser_id());
		result.put("tags", memberService.findByHql(new Page<ADPlanTag>(1, 10),
				tagsHql, tagsParams));
		result.put("cats", EnvManager.getRootCats());
		return new ModelAndView("site/member/seller/ads/" + view + "Ads",
				result);
	}

	/**
	 * 广告计划修改
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/plan/update/{id}", method = RequestMethod.POST)
	@ResponseBody
	public String updateIndexAds(@PathVariable String id,
			HttpServletRequest request) {
		ADPlan plan = memberService.get(ADPlan.class, id);
		if (plan == null) {
			SystemException.handleMessageException("指定的广告计划不存在");
		}
		String name = request.getParameter("planName");
		String type = request.getParameter("planType");
		String tags = request.getParameter("planTags");
		String isDefault = request.getParameter("planIsDefault");
		if (StringUtils.isEmpty(type)) {
			SystemException.handleMessageException("广告计划未指定类型");
		}
		if (StringUtils.isEmpty(name)) {
			SystemException.handleMessageException("广告计划名称不能为空");
		}
		if (!name.equals(plan.getName())) {
			ADPlan namePlan = memberService.findByCriterion(ADPlan.class,
					R.eq("name", name),
					R.eq("createdBy", EnvManager.getUser().getUser_id()));
			if (namePlan != null) {
				SystemException
						.handleMessageException("广告计划名称【" + name + "】重复");
			}
		}
		String numIids = request.getParameter("planNumIids");
		if (StringUtils.isEmpty(numIids)) {
			SystemException.handleMessageException("广告计划未指定要推广的商品");
		}
		String cid = request.getParameter("planCid");
		String desc = request.getParameter("planDesc");
		plan.setCid(cid);
		plan.setName(name);
		if (StringUtils.isNotEmpty(desc))
			plan.setDescription(desc);
		memberService.updateADPlan(plan, TaobaoFetchUtil.newItemsConvert(
				numIids, EnvManager.getUser().getNick(), EnvManager.getUser()
						.getPid()), tags, "true".equals(isDefault) ? true
				: false);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 查询广告计划的推广商品
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/plan/items/{id}", method = RequestMethod.GET)
	public ModelAndView searchPlanItems(@PathVariable String id,
			HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put(
				"items",
				memberService.findAllByCriterion(ADTaobaokeItem.class,
						R.eq("planid", id)));
		return new ModelAndView("site/member/seller/ads/planItems", result);
	}

	/**
	 * 查询卖家商品
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/plan/items", method = RequestMethod.POST)
	public ModelAndView searchShopItems(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		ItemsSearchRequest req = new ItemsSearchRequest();
		req.setFields("num_iid");
		String q = request.getParameter("q");
		if (StringUtils.isNotEmpty(q)) {
			req.setQ(q);
		} else {
			q = "";
		}
		// 卖家昵称列表。多个之间用“,”分隔；最多支持5个卖家昵称。如:nick1,nick2,nick3。
		String nick = request.getParameter("nicks");
		if (StringUtils.isNotEmpty(nick)) {
			req.setNicks(nick);
		} else {
			req.setNicks(EnvManager.getUser().getNick());
		}
		String page_no = request.getParameter("pageNo");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(page_no)) {
			pageNo = Integer.parseInt(page_no);
		} else {
			pageNo = 1;
		}
		req.setPageNo(Long.valueOf(pageNo));
		req.setPageSize(9L);
		ItemsSearchResponse resp = TaobaoFetchUtil.taobaoSearchItems(EnvManager
				.getUser().getAppType(), req);
		Page<?> page = new Page(pageNo, 9);
		if (resp.getTotalResults() > 0 && resp.getItemSearch() != null) {
			page.setTotalCount(resp.getTotalResults().intValue());
			ItemSearch search = resp.getItemSearch();
			List<Item> items = search.getItems();
			if (items.size() > 0) {
				String numiids = "";
				Boolean isFirst = true;
				for (Item i : items) {
					if (isFirst) {
						isFirst = false;
					} else {
						numiids += ",";
					}
					numiids += i.getNumIid();
				}
				List<TaobaokeItem> taokeItems = TaobaoFetchUtil
						.newItemsConvert(numiids, EnvManager.getUser()
								.getNick(), EnvManager.getUser().getPid());
				result.put("items", taokeItems);
			}
		}
		result.put("page", page);
		result.put("q", q);
		return new ModelAndView("site/member/seller/ads/itemsSearch", result);
	}

	/**
	 * 获取广告计划投放效果
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/plan/ads/{id}", method = RequestMethod.GET)
	public ModelAndView getPlanAds(@PathVariable String id,
			HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		ADPlan plan = memberService.load(ADPlan.class, id);
		String type = plan.getType();
		List<Map<String, Object>> ads = new ArrayList<Map<String, Object>>();
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("aid", id);
		String page_no = request.getParameter("pageNo");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(page_no)) {
			pageNo = Integer.parseInt(page_no);
		} else {
			pageNo = 1;
		}
		Page<?> page = new Page(pageNo, 30);
		String isTaokeStr = request.getParameter("isTaoke");
		Boolean isTaoke = "true".equals(isTaokeStr) ? true : false;
		if ("index".equals(type)) {// 首页推广
			String hql = "select new map(t.title as name,t.nick as nick,t.user_id as userId,t.isIndex as isDefault,t.created as created) from UserPage t,ADPageSystem ad where ad.pk.aid=:aid and t.id=ad.pk.pid";
			covertAdsUserTemplate(plan, ads,
					(List<Map<String, Object>>) memberService.findByHql(page,
							hql, params));//
		} else if ("blog".equals(type)) {// 日志推广
			String hql = "select new map(s.title as name,s.domainName as domainName,s.www as www,s.user_id as userId) from ADBlogSystem ad,Site s where ad.pk.aid=:aid and s.id=ad.pk.sid";
			covertAdsBlog(plan, ads,
					(List<Map<String, Object>>) memberService.findByHql(page,
							hql, params));//
		}
		result.put("ads", ads);
		result.put("plan", plan);
		result.put(
				"plans",
				memberService.findAllByCriterion(ADPlan.class,
						R.eq("type", plan.getType()),
						R.eq("createdBy", plan.getCreatedBy())));
		result.put("isTaoke", isTaoke);
		result.put("page", page);
		return new ModelAndView("site/member/seller/ads/" + type + "PlanSites",
				result);
	}

	private void covertAdsUserTemplate(ADPlan plan,
			List<Map<String, Object>> ads, List<Map<String, Object>> typeAds) {
		if (typeAds != null && typeAds.size() > 0) {
			for (Map<String, Object> map : typeAds) {
				String cads = String.valueOf(map.get("cads"));
				if (cads.indexOf(plan.getId()) != -1) {
					map.put("type", "taoke");// 设置类型为淘客
				} else {
					map.put("type", "system");// 设置类型为系统
				}
				Object obj = map.get("isDefault");
				if (obj != null && (Boolean) obj) {// 首页
					map.put("path", null);
				} else {// 子页
					map.put("path", ((Date) (map.get("created"))).getTime()
							+ ".html");
				}
				ads.add(map);
			}
		}
	}

	private void covertAdsBlog(ADPlan plan, List<Map<String, Object>> ads,
			List<Map<String, Object>> typeAds) {
		if (typeAds != null && typeAds.size() > 0) {
			for (Map<String, Object> map : typeAds) {
				String cads = String.valueOf(map.get("cads"));
				if (cads.indexOf(plan.getId()) != -1) {
					map.put("type", "taoke");// 设置类型为淘客
				} else {
					map.put("type", "system");// 设置类型为系统
				}
				ads.add(map);
			}
		}
	}
}
