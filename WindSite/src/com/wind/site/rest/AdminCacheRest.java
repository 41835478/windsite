package com.wind.site.rest;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wind.site.command.HuabaoXintaoCommand;
import com.wind.site.command.TaobaoKeywordCommand;
import com.wind.site.env.EnvManager;
import com.wind.site.model.Activity;
import com.wind.site.model.Channel;
import com.wind.site.model.KeyWord;
import com.wind.site.model.T_ShopCat;
import com.wind.site.service.IAdminService;
import com.wind.site.util.WindSiteRestUtil;

@Controller
@RequestMapping("/member/admin/cache")
public class AdminCacheRest {
	@Autowired
	private IAdminService adminService;
	/**
	 * 画报更新
	 */
	@Autowired
	private HuabaoXintaoCommand xintaoHuabaoJob;
	/**
	 * 关键词更新
	 */
	@Autowired
	private TaobaoKeywordCommand taobaoKeywordJob;

	@RequestMapping(value = "/command/huabao", method = RequestMethod.GET)
	@ResponseBody
	public String huabaoXintaoCommand(HttpServletRequest request) {
		xintaoHuabaoJob.synXintaoHuabao();// 执行命令
		return WindSiteRestUtil.SUCCESS;
	}

	@RequestMapping(value = "/command/keywords", method = RequestMethod.GET)
	@ResponseBody
	public String taobaoKeywordCommand(HttpServletRequest request) {
		taobaoKeywordJob.synKeywords();// 执行命令
		return WindSiteRestUtil.SUCCESS;
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/words", method = RequestMethod.GET)
	@ResponseBody
	public String wordsCache(HttpServletRequest request) {
		EnvManager.getTotalWords().clear();
		EnvManager.setTotalWords((List<KeyWord>) adminService.findByHql(
				"from KeyWord order by sortOrder",
				new HashMap<String, Object>()));
		return WindSiteRestUtil.SUCCESS;
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/activities", method = RequestMethod.GET)
	@ResponseBody
	public String activitiesCache(HttpServletRequest request) {
		EnvManager.getActivities().clear();
		EnvManager.setActivities((List<Activity>) adminService.findByHql(
				"from Activity order by created desc",
				new HashMap<String, Object>()));
		return WindSiteRestUtil.SUCCESS;
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/channels", method = RequestMethod.GET)
	@ResponseBody
	public String channelsCache(HttpServletRequest request) {
		EnvManager.getChannels().clear();
		EnvManager.setChannels((List<Channel>) adminService.findByHql(
				"from Channel order by sortOrder",
				new HashMap<String, Object>()));
		return WindSiteRestUtil.SUCCESS;
	}

	@RequestMapping(value = "/shopCats", method = RequestMethod.GET)
	@ResponseBody
	public String shopCatsCache(HttpServletRequest request) {
		EnvManager.getShopCats().clear();
		EnvManager.setShopCats(adminService.loadAll(T_ShopCat.class));
		return WindSiteRestUtil.SUCCESS;
	}
}
