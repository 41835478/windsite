package com.wind.site.rest;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.wind.core.dao.Page;
import com.wind.site.env.EnvManager;
import com.wind.site.service.ISellerService;
import com.wind.uc.service.IUCService;

/**
 * 管理功能RESTFUL服务
 * 
 * @author fxy
 * 
 */
@Controller
@RequestMapping("/member/seller")
public class SellerRest {
	@Autowired
	private ISellerService sellerService;
	@Autowired
	private IUCService ucService;

	@RequestMapping(value = "/members/group", method = RequestMethod.POST)
	public ModelAndView sellerGroupMembers(HttpServletRequest request) {
		String pageNoStr = request.getParameter("pageNo");
		String nick = request.getParameter("nick");
		String num_iid = request.getParameter("num_iid");
		String member = request.getParameter("member");
		if (StringUtils.isEmpty(nick)) {
			nick = EnvManager.getUser().getNick();
		}
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		Map<String, Object> result = new HashMap<String, Object>();
		Page<Map<String, Object>> page = new Page<Map<String, Object>>(pageNo,
				30);
		result.put("num_iid", num_iid);
		result.put("member", member);
		result.put("members", sellerService.sellerGroupMembers(nick, num_iid,
				member, page));
		result.put("page", page);
		result.put("nick", nick);
		if (EnvManager.getUser().getUc_id() != null) {
			result.put("friendIds", ucService.getFriends(EnvManager.getUser()
					.getUc_id()));// 好友列表
			result.put("unFriendIds", ucService.getUnFriends(EnvManager
					.getUser().getUc_id()));// 未通过验证的好友列表
		} else {
			result.put("friendIds", "");
			result.put("unFriendIds", "");
		}
		return new ModelAndView("site/seller/groupMembers", result);
	}

	@RequestMapping(value = "/members/shop", method = RequestMethod.POST)
	public ModelAndView sellerShopMembers(HttpServletRequest request) {
		String pageNoStr = request.getParameter("pageNo");
		String userId = request.getParameter("userId");
		if (StringUtils.isEmpty(userId)) {
			userId = EnvManager.getUser().getUser_id();
		}
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		Map<String, Object> result = new HashMap<String, Object>();
		Page<Map<String, Object>> page = new Page<Map<String, Object>>(pageNo,
				30);
		result.put("members", sellerService.sellerShopMembers(userId, page));
		result.put("page", page);
		result.put("userId", userId);
		if (EnvManager.getUser().getUc_id() != null) {
			result.put("friendIds", ucService.getFriends(EnvManager.getUser()
					.getUc_id()));// 好友列表
			result.put("unFriendIds", ucService.getUnFriends(EnvManager
					.getUser().getUc_id()));// 未通过验证的好友列表
		} else {
			result.put("friendIds", "");
			result.put("unFriendIds", "");
		}
		return new ModelAndView("site/seller/shopMembers", result);
	}

	@RequestMapping(value = "/members/widget", method = RequestMethod.POST)
	public ModelAndView sellerWidgetMembers(HttpServletRequest request) {
		String wid = request.getParameter("wid");
		String pageNoStr = request.getParameter("pageNo");
		String user_id = request.getParameter("user_id");
		if (StringUtils.isEmpty(user_id)) {
			user_id = EnvManager.getUser().getUser_id();
		}
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		Map<String, Object> result = new HashMap<String, Object>();
		Page<Map<String, Object>> page = new Page<Map<String, Object>>(pageNo,
				30);
		result.put("wid", wid);
		result.put("members", sellerService.sellerWidgetMembers(user_id, wid,
				page));
		result.put("page", page);
		result.put("user_id", user_id);
		if (EnvManager.getUser().getUc_id() != null) {
			result.put("friendIds", ucService.getFriends(EnvManager.getUser()
					.getUc_id()));// 好友列表
			result.put("unFriendIds", ucService.getUnFriends(EnvManager
					.getUser().getUc_id()));// 未通过验证的好友列表
		} else {
			result.put("friendIds", "");
			result.put("unFriendIds", "");
		}
		return new ModelAndView("site/seller/widgetMembers", result);
	}
}
