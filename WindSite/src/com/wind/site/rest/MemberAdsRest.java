package com.wind.site.rest;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wind.site.service.IMemberService;
import com.wind.site.util.WindSiteRestUtil;

@Controller
@RequestMapping("/member/ads")
public class MemberAdsRest {
	@SuppressWarnings("unused")
	@Autowired
	private IMemberService memberService;

	/**
	 * 当前页面新增广告计划
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/{type}/add/{tid}")
	@ResponseBody
	public String addIndexAdsPlan(@PathVariable String type,
			@PathVariable String tid, HttpServletRequest request) {
		// TODO 添加广告计划
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 当前页面删除广告计划
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/{type}/delete/{tid}")
	@ResponseBody
	public String deleteIndexAdsPlan(@PathVariable String type,
			@PathVariable String tid, HttpServletRequest request) {
		// TODO 删除广告计划
		return WindSiteRestUtil.SUCCESS;
	}
}
