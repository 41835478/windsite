package com.wind.site.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.site.env.EnvManager;
import com.wind.site.model.DianPu;
import com.wind.site.model.DianPuCategory;
import com.wind.site.service.ISiteService;
import com.wind.site.util.WindSiteRestUtil;

@Controller
@RequestMapping("/dianpu")
public class DianPuRest {
	@Autowired
	private ISiteService siteService;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public ModelAndView dianpu(HttpServletRequest request) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		String pid = WindSiteRestUtil.covertSysChannelPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
		}
		return new ModelAndView("site/dianpu", result);
	}

	@RequestMapping(value = "/{root}", method = RequestMethod.GET)
	public ModelAndView dianpuRoot(@PathVariable String root,
			HttpServletRequest request) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		String pid = WindSiteRestUtil.covertSysChannelPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
		}
		DianPuCategory cat = siteService.findByCriterion(DianPuCategory.class,
				R.eq("name", root));
		if (cat != null) {
			String pageNoStr = request.getParameter("pageNo");
			Integer pageNo = 1;
			if (StringUtils.isNotEmpty(pageNoStr)) {
				try {
					pageNo = Integer.parseInt(pageNoStr);
				} catch (Exception e) {
					pageNo = 1;
				}
			}
			Page<DianPu> page = new Page<DianPu>(pageNo, 10);
			List<DianPu> shops = siteService.findAllByCriterionAndOrder(page,
					DianPu.class, Order.asc("id"),
					R.eq("rootCat", cat.getId()), R.isNotNull("sid"));
			result.put("page", page);
			result.put("shops", shops);
			result.put("rootCat", cat);
			result.put("dianpuCats", EnvManager.getDianpuCats().get(
					cat.getName()));
		} else {
			SystemException.handleMessageException("未找到符合的淘店铺分类");
		}
		return new ModelAndView("site/dianpu", result);
	}

	@RequestMapping(value = "/{root}/{catName}", method = RequestMethod.GET)
	public ModelAndView dianpuRoot(@PathVariable String root,
			@PathVariable String catName, HttpServletRequest request) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		String pid = WindSiteRestUtil.covertSysChannelPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
		}
		DianPuCategory cat = siteService.findByCriterion(DianPuCategory.class,
				R.eq("name", catName));
		if (cat != null && cat.getParent() != null) {
			String pageNoStr = request.getParameter("pageNo");
			Integer pageNo = 1;
			if (StringUtils.isNotEmpty(pageNoStr)) {
				try {
					pageNo = Integer.parseInt(pageNoStr);
				} catch (Exception e) {
					pageNo = 1;
				}
			}
			DianPuCategory rootCat = siteService.get(DianPuCategory.class, cat
					.getParent());
			Page<DianPu> page = new Page<DianPu>(pageNo, 10);
			List<DianPu> shops = siteService.findAllByCriterionAndOrder(page,
					DianPu.class, Order.asc("id"), R.eq("secCat", cat.getId()),
					R.isNotNull("sid"));
			result.put("page", page);
			result.put("shops", shops);
			result.put("rootCat", rootCat);// 一级分类
			result.put("secCat", cat);// 二级分类
			result.put("dianpuCats", EnvManager.getDianpuCats().get(
					rootCat.getName()));
		} else {
			SystemException.handleMessageException("未找到符合的淘店铺分类");
		}
		return new ModelAndView("site/dianpu", result);
	}
}
