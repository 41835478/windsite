package com.wind.site.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.taobao.api.domain.Shop;
import com.taobao.api.domain.ShopScore;
import com.taobao.api.domain.TaobaokeShop;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.site.env.EnvManager;
import com.wind.site.model.Site;
import com.wind.site.model.T_TaobaokeShop;
import com.wind.site.model.User;
import com.wind.site.service.IMemberService;
import com.wind.site.util.TaobaoFetchUtil;
import com.wind.site.util.WindSiteRestUtil;
import com.wind.uc.service.IUCService;

@Controller
@RequestMapping("/member/sellermanager")
public class MemberSellerManager {
	@Autowired
	private IMemberService memberService;

	/**
	 * 卖家功能首页
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ModelAndView manager(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		T_TaobaokeShop shop = memberService.get(T_TaobaokeShop.class,
				Long.valueOf(EnvManager.getUser().getUser_id()));
		if (shop == null) {
			Shop nShop = TaobaoFetchUtil.getTaobaoShop(EnvManager.getUser()
					.getAppType(), EnvManager.getUser().getNick());
			if (nShop == null) {
				SystemException
						.handleMessageException("您不是淘宝网的卖家用户，无法使用新淘网的卖家功能");
			} else {
				shop = new T_TaobaokeShop();
				shop.setUserId(Long.valueOf(EnvManager.getUser().getUser_id()));
				shop.setCid(nShop.getCid());
				shop.setTitle(nShop.getTitle());
				shop.setPicPath(nShop.getPicPath());
				shop.setSid(nShop.getSid());
				shop.setNick(nShop.getNick());
				ShopScore score = nShop.getShopScore();
				if (score != null) {
					shop.setItemScore(score.getItemScore());
					shop.setServiceScore(score.getServiceScore());
					shop.setDeliveryScore(score.getDeliveryScore());
				}
				List<TaobaokeShop> shops = TaobaoFetchUtil.convertTaobaoShop(
						EnvManager.getAppType(),
						EnvManager.getUser().getNick(), nShop.getSid() + "",
						EnvManager.getUser().getPid());
				if (shops != null && shops.size() == 1) {// 查询信用和佣金比率
					shop.setCommissionRate(shops.get(0).getCommissionRate());
					shop.setIsValid(true);
				} else {
					shop.setIsValid(false);
				}
				shop.setIsValid(true);
				memberService.save(shop);
				User user = memberService.get(User.class, EnvManager.getUser()
						.getId());
				user.setSites(memberService.findAllByCriterion(Site.class,
						R.eq("user_id", user.getUser_id())));
				user.setSid(shop.getSid() + "");
				memberService.update(user);
			}
		}
		result.put("shop", shop);
		return new ModelAndView("site/member/seller/sellerManager", result);
	}

	/**
	 * 同步店铺推广信息
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/shop/syn", method = RequestMethod.GET)
	@ResponseBody
	public String synShop(HttpServletRequest request) {
		T_TaobaokeShop shop = memberService.get(T_TaobaokeShop.class,
				Long.valueOf(EnvManager.getUser().getUser_id()));
		Shop nShop = TaobaoFetchUtil.getTaobaoShop(EnvManager.getUser()
				.getAppType(), EnvManager.getUser().getNick());
		if (nShop == null) {
			SystemException.handleMessageException("店铺不存在");
		}
		if (shop == null) {
			shop = new T_TaobaokeShop();
			shop.setUserId(Long.valueOf(EnvManager.getUser().getUser_id()));
			shop.setCid(nShop.getCid());
			shop.setTitle(nShop.getTitle());
			shop.setPicPath(nShop.getPicPath());
			shop.setSid(nShop.getSid());
			shop.setNick(nShop.getNick());
			ShopScore score = nShop.getShopScore();
			if (score != null) {
				shop.setItemScore(score.getItemScore());
				shop.setServiceScore(score.getServiceScore());
				shop.setDeliveryScore(score.getDeliveryScore());
			}
			List<TaobaokeShop> shops = TaobaoFetchUtil.convertTaobaoShop(
					EnvManager.getUser().getAppType(), EnvManager.getUser()
							.getNick(), shop.getSid() + "", EnvManager
							.getUser().getPid());
			if (shops != null && shops.size() == 1) {// 查询信用和佣金比率
				shop.setCommissionRate(shops.get(0).getCommissionRate());
				shop.setIsValid(true);
			} else {
				shop.setIsValid(false);
			}
			memberService.save(shop);
		} else {
			shop.setCid(nShop.getCid());
			shop.setTitle(nShop.getTitle());
			shop.setPicPath(nShop.getPicPath());
			shop.setSid(nShop.getSid());
			shop.setNick(nShop.getNick());
			ShopScore score = nShop.getShopScore();
			if (score != null) {
				shop.setItemScore(score.getItemScore());
				shop.setServiceScore(score.getServiceScore());
				shop.setDeliveryScore(score.getDeliveryScore());
			}
			List<TaobaokeShop> shops = TaobaoFetchUtil.convertTaobaoShop(
					EnvManager.getUser().getAppType(), EnvManager.getUser()
							.getNick(), shop.getSid() + "", EnvManager
							.getUser().getPid());
			if (shops != null && shops.size() == 1) {// 查询信用和佣金比率
				shop.setCommissionRate(shops.get(0).getCommissionRate());
				shop.setIsValid(true);
			} else {
				shop.setIsValid(false);
			}
			memberService.update(shop);
		}
		User user = memberService.get(User.class, EnvManager.getUser().getId());
		user.setSites(memberService.findAllByCriterion(Site.class,
				R.eq("user_id", user.getUser_id())));
		user.setSid(shop.getSid() + "");
		memberService.update(user);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 推广组类淘宝客
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/group", method = RequestMethod.GET)
	public ModelAndView group(HttpServletRequest request) {
		return new ModelAndView("site/member/seller/groupMembers");
	}

	/**
	 * 店铺类淘宝客
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/shop", method = RequestMethod.GET)
	public ModelAndView shop(HttpServletRequest request) {
		return new ModelAndView("site/member/seller/shopMembers");
	}

	/**
	 * 组件类淘宝客
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/widget", method = RequestMethod.GET)
	public ModelAndView widget(HttpServletRequest request) {
		return new ModelAndView("site/member/seller/widgetMembers");
	}

	@Autowired
	private IUCService ucService;

	/**
	 * 找淘客
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/taoke", method = RequestMethod.GET)
	public ModelAndView taokeManager(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("cats", EnvManager.getRootCats());
		result.put(
				"shop",
				memberService.get(T_TaobaokeShop.class,
						Long.valueOf(EnvManager.getUser().getUser_id())));
		return new ModelAndView("site/member/seller/taokes", result);
	}

	/**
	 * 找淘客结果页面
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/taoke/search", method = RequestMethod.POST)
	public ModelAndView taokeSearch(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String q = request.getParameter("q");
		String cid = request.getParameter("cid");
		String isTaoke = request.getParameter("isTaoke");
		String pageNoStr = request.getParameter("pageNo");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		Map<String, Object> params = new HashMap<String, Object>();
		String hql = "select new map(u.nick as nick,u.user_id as user_id,u.uc_id as uc_id,s.status as status,s.domainName as domainName,s.www as www,s.title as title) from User u,Site s where u.user_id=s.user_id";
		if (StringUtils.isNotEmpty(q)) {
			params.put("nick", "%" + q + "%");
			hql += " and u.nick like :nick ";
		}
		if (StringUtils.isNotEmpty(cid)) {
			params.put("cid", cid);
			hql += " and s.cid=:cid ";
		}
		if (StringUtils.isNotEmpty(isTaoke) && "true".equals(isTaoke)) {
			hql += " and u.sid = '0'";
		}
		hql += " order by s.pv desc";
		Page page = new Page(pageNo, 30);
		result.put("taokes", memberService.findByHql(page, hql, params));
		result.put("page", page);
		if (EnvManager.getUser().getUc_id() != null) {
			result.put("friendIds",
					ucService.getFriends(EnvManager.getUser().getUc_id()));// 好友列表
			result.put("unFriendIds",
					ucService.getUnFriends(EnvManager.getUser().getUc_id()));// 未通过验证的好友列表
		} else {
			result.put("friendIds", "");
			result.put("unFriendIds", "");
		}
		return new ModelAndView("site/member/seller/taokesResult", result);
	}
}
