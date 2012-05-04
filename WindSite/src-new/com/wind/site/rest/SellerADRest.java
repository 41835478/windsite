package com.wind.site.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;
import org.hibernate.criterion.SimpleExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.site.env.EnvManager;
import com.wind.site.model.ADModuleItem;
import com.wind.site.model.Site;
import com.wind.site.service.IMemberService;

@Controller
@RequestMapping("/member/sellerads")
public class SellerADRest {
	@Autowired
	private IMemberService memberService;

	@RequestMapping(value = "/adsite", method = RequestMethod.GET)
	public ModelAndView adsite(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		return new ModelAndView("site/member/seller/newads/adSiteManager",
				result);
	}

	/**
	 * 独立站点推广搜索
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/adsite/search")
	public ModelAndView myAdsSiteSearch(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String pageNoStr = request.getParameter("pageNo");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		Page<Site> page = new Page<Site>(pageNo, 30);
		List<Site> sites = memberService
				.findByHql(
						page,
						"select s from Site s,T_UserSubscribe usb where s.www is not null and usb.versionNo!=0 and usb.user_id=s.user_id order by created desc",
						new HashMap<String, Object>());
		result.put("sites", sites);
		result.put("page", page);
		return new ModelAndView("site/member/seller/newads/adSiteSearch",
				result);
	}

	@RequestMapping(value = "/admodule", method = RequestMethod.GET)
	public ModelAndView admodule(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("sellerNick", EnvManager.getUser().getNick());
		return new ModelAndView(
				"site/member/seller/newads/adModuleItemManager", result);
	}

	/**
	 * 商品推广搜索
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/admodule/search")
	public ModelAndView myAdsSearch(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String pageNoStr = request.getParameter("pageNo");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		String q = request.getParameter("sellerNick");
		SimpleExpression qFilter = null;
		if (StringUtils.isNotEmpty(q)) {
			qFilter = R.eq("sellerNick", q);
		} else {
			SystemException.handleMessageException("未指定要查找的卖家");
		}
		Page<ADModuleItem> page = new Page<ADModuleItem>(pageNo, 15);
		List<ADModuleItem> ads = memberService.findAllByCriterionAndOrder(page,
				ADModuleItem.class, Order.desc("adDate"), qFilter);
		result.put("ads", ads);
		result.put("page", page);
		return new ModelAndView("site/member/seller/newads/adModuleItemSearch",
				result);
	}
}
