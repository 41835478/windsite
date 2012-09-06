package com.wind.site.rest;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.taobao.api.domain.TaobaokeItem;
import com.taobao.api.domain.TaobaokeShop;
import com.taobao.api.request.TaobaokeShopsGetRequest;
import com.taobao.api.response.TaobaokeShopsGetResponse;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.site.env.EnvManager;
import com.wind.site.model.FanliLinks;
import com.wind.site.model.ItemGroup;
import com.wind.site.model.ShopGroup;
import com.wind.site.model.T_TaobaokeItem;
import com.wind.site.model.T_TaobaokeShop;
import com.wind.site.model.XintaoLink;
import com.wind.site.service.IMemberService;
import com.wind.site.util.TaobaoFetchUtil;
import com.wind.site.util.WindSiteRestUtil;

@Controller
@RequestMapping("/member/links")
public class LinkRest {
	@Autowired
	private IMemberService memberService;

	/**
	 * 获取常用链接
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/shortcut", method = RequestMethod.GET)
	public ModelAndView createLinks(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		// 频道
		result.put("channels", EnvManager.getChannels());
		// 我的设计页面
		// result.put("mytemplates", memberService.findUserTemplates(EnvManager
		// .getUser().getUser_id()));
		return new ModelAndView("site/member/fanli/createLinks", result);
	}

	/**
	 * 获取常用链接
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/shortcut/update/{id}", method = RequestMethod.GET)
	public ModelAndView updateLinks(@PathVariable Long id,
			HttpServletRequest request, HttpServletResponse response) {
		FanliLinks link = memberService.get(FanliLinks.class, id);
		if (link == null) {
			SystemException.handleMessageException("指定要修改的链接不存在");
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("link", link);
		// 频道
		result.put("channels", EnvManager.getChannels());
		// 我的设计页面
		// result.put("mytemplates", memberService.findUserTemplates(EnvManager
		// .getUser().getUser_id()));
		return new ModelAndView("site/member/fanli/updateLinks", result);
	}

	/**
	 * 链接管理页面
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ModelAndView links(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		List<ItemGroup> groups = (List<ItemGroup>) memberService
				.findAllByCriterion(ItemGroup.class,
						R.eq("user_id", EnvManager.getUser().getUser_id()));
		if (groups.size() > 0) {
			for (ItemGroup group : groups) {
				group.setCount(memberService.countItemsByGid(group.getId()));
			}
		}
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userId", EnvManager.getUser().getUser_id());
		// TODO 店铺收藏推广
		// List<T_Shop> shops = (List<T_Shop>) memberService
		// .findByHql(
		// "select s from T_Shop as s,W_ShopFavorite as sf where sf.user_id=:userId and s.sid=sf.sid order by level desc",
		// params);
		// result.put("shops", shops);
		result.put("groups", groups);
		result.put("totalWords", EnvManager.getTotalWords());
		return new ModelAndView("site/member/link/links", result);
	}

	/**
	 * 高级商品查询
	 * 
	 * @param view
	 * @param response
	 * @return
	 */

	@RequestMapping(value = "/items", method = RequestMethod.GET)
	public ModelAndView items(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();

		result.put("cats", EnvManager.getRootCats());
		return new ModelAndView("site/member/link/advanceItems", result);
	}

	/**
	 * 高级店铺查询
	 * 
	 * @param view
	 * @param response
	 * @return
	 */

	@RequestMapping(value = "/shops", method = RequestMethod.GET)
	public ModelAndView shops(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("cats", EnvManager.getShopCats());
		return new ModelAndView("site/member/link/advanceShops", result);
	}

	/**
	 * 查询我所有的店铺分组（dialog）
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/shopgroupsdialog", method = RequestMethod.GET)
	public ModelAndView getMyShopGroupForDialog(HttpServletRequest request) {
		List<ShopGroup> list = (List<ShopGroup>) memberService
				.findAllByCriterion(ShopGroup.class,
						R.eq("user_id", EnvManager.getUser().getUser_id()));
		for (ShopGroup group : list) {
			group.setCount(memberService.countFavShops(group.getId()));
		}
		String length = request.getParameter("length");
		if (StringUtils.isEmpty(length)) {
			length = "1";
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("groups", list);
		result.put("length", Integer.parseInt(length));
		return new ModelAndView("site/member/shopgroupsdialog", result);
	}

	@RequestMapping(value = "/shops/search")
	public ModelAndView searchShopsByFilter(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		TaobaokeShopsGetRequest shopGetRequest = new TaobaokeShopsGetRequest();
		String pageNoStr = request.getParameter("pageNo");
		Integer pageNo = 1;
		try {
			pageNo = Integer.parseInt(pageNoStr);
		} catch (Exception e) {
			pageNo = 1;
		}
		String cid = request.getParameter("cid");
		if (StringUtils.isNotEmpty(cid)) {
			shopGetRequest.setCid(Long.valueOf(cid));
		} else {
			cid = "";
		}
		String q = request.getParameter("q");
		if (StringUtils.isNotEmpty(q)) {
			if ("get".equalsIgnoreCase(request.getMethod())) {
				try {
					q = new String(q.getBytes("ISO-8859-1"), "UTF-8");
				} catch (UnsupportedEncodingException e) {
					q = "";
				}
			}
		}

		String keyword = request.getParameter("keyword");
		if (StringUtils.isNotEmpty(keyword)) {
			if ("get".equalsIgnoreCase(request.getMethod())) {
				try {
					q = new String(keyword.getBytes("ISO-8859-1"), "UTF-8");
				} catch (UnsupportedEncodingException e) {
					q = "";
				}
			}
		}
		shopGetRequest.setKeyword(q);
		if (StringUtils.isEmpty(cid) && StringUtils.isEmpty(q)) {
			shopGetRequest.setCid(14L);
		}
		String only_mall = request.getParameter("only_mall");
		if (StringUtils.isNotEmpty(only_mall)) {
			shopGetRequest.setOnlyMall("true".equals(only_mall) ? true : false);
		} else {
			only_mall = "";
		}
		String start_credit = request.getParameter("start_credit");
		if (StringUtils.isNotEmpty(start_credit)) {
			shopGetRequest.setStartCredit(start_credit);
		} else {
			start_credit = "";
		}
		String end_credit = request.getParameter("end_credit");
		if (StringUtils.isNotEmpty(end_credit)) {
			shopGetRequest.setEndCredit(end_credit);
		} else {
			end_credit = "";
		}
		String start_commissionrate = request
				.getParameter("start_commissionrate");
		if (StringUtils.isNotEmpty(start_commissionrate)) {
			shopGetRequest.setStartCommissionrate(start_commissionrate);
		} else {
			start_commissionrate = "";
		}
		String end_commissionrate = request.getParameter("end_commissionrate");
		if (StringUtils.isNotEmpty(end_commissionrate)) {
			shopGetRequest.setEndCommissionrate(end_commissionrate);
		} else {
			end_commissionrate = "";
		}
		String start_auctioncount = request.getParameter("start_auctioncount");
		if (StringUtils.isNotEmpty(start_auctioncount)) {
			shopGetRequest.setStartAuctioncount(start_auctioncount);
		} else {
			start_auctioncount = "";
		}
		String end_auctioncount = request.getParameter("end_auctioncount");
		if (StringUtils.isNotEmpty(end_auctioncount)) {
			shopGetRequest.setEndAuctioncount(end_auctioncount);
		} else {
			end_auctioncount = "";
		}
		String start_totalaction = request.getParameter("start_totalaction");
		if (StringUtils.isNotEmpty(start_totalaction)) {
			shopGetRequest.setStartTotalaction(start_totalaction);
		} else {
			start_totalaction = "";
		}
		String end_totalaction = request.getParameter("end_totalaction");
		if (StringUtils.isNotEmpty(end_totalaction)) {
			shopGetRequest.setEndTotalaction(end_totalaction);
		} else {
			end_totalaction = "";
		}
		shopGetRequest.setFields(TaobaoFetchUtil.TAOBAOKESHOP_FIELDS);
		shopGetRequest.setNick(EnvManager.getUser().getNick());
		shopGetRequest.setPageSize(10L);
		shopGetRequest.setPageNo(Long.valueOf(pageNo));
		Page<T_TaobaokeShop> page = new Page<T_TaobaokeShop>(pageNo, 10);
		TaobaokeShopsGetResponse shopGetResponse = TaobaoFetchUtil.shopsGet(
				String.valueOf(result.get("appKey")),
				String.valueOf(result.get("appSecret")),
				String.valueOf(result.get("appType")), shopGetRequest,
				EnvManager.getUser().getPid());
		if (shopGetResponse != null) {
			if (shopGetResponse.isSuccess()) {
				Long total = shopGetResponse.getTotalResults();
				if (total != null && total > 0) {
					Map<String, T_TaobaokeShop> localMaps = new HashMap<String, T_TaobaokeShop>();
					List<TaobaokeShop> shops = shopGetResponse
							.getTaobaokeShops();
					for (TaobaokeShop shop : shops) {
						T_TaobaokeShop localShop = memberService.get(
								T_TaobaokeShop.class, shop.getUserId());
						if (localShop == null) {
							localShop = new T_TaobaokeShop();
							localShop.setCommissionRate(shop
									.getCommissionRate());
							localShop.setIsValid(true);
							localShop.setSellerCredit(shop.getSellerCredit());
							localShop.setTitle(shop.getShopTitle());
							localShop.setUserId(shop.getUserId());
							memberService.save(localShop);
						} else {
							if (StringUtils.isNotEmpty(localShop.getNick())) {
								localMaps.put(localShop.getUserId() + "",
										localShop);
							}
						}
					}
					result.put("shops", shops);
					result.put("extra", localMaps);
					page.setTotalCount(total.intValue());
				}
			}
		}
		result.put("start_credit", start_credit);
		result.put("end_credit", end_credit);
		result.put("start_commissionrate", start_commissionrate);
		result.put("end_commissionrate", end_commissionrate);
		result.put("start_auctioncount", start_auctioncount);
		result.put("end_auctioncount", end_auctioncount);
		result.put("start_totalaction", start_totalaction);
		result.put("end_totalaction", end_totalaction);

		result.put("page", page);
		result.put("q", q);
		result.put("cid", cid);
		result.put("only_mall", only_mall);
		result.put("cats", EnvManager.getShopCats());
		return new ModelAndView("site/member/link/advanceShopsResult", result);
	}

	/**
	 * 博客软文推广
	 * 
	 * @param view
	 * @param response
	 * @return
	 */

	@RequestMapping(value = "/blogs", method = RequestMethod.GET)
	public ModelAndView blogs(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		// result.put("cats", EnvManager.getRootCats());
		return new ModelAndView("site/member/link/advanceBlogs", result);
	}

	/**
	 * 链接转换工具
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/convert")
	public ModelAndView convert(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		return new ModelAndView("site/member/link/convert/convert", result);
	}

	/**
	 * 链接转换结果
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/convert/result")
	public ModelAndView convertResult(HttpServletRequest request,
			HttpServletResponse response) {
		String nids = request.getParameter("nids");
		if (StringUtils.isEmpty(nids)) {
			SystemException.handleMessageException("未提供转换商品的标识列表");
		}
		List<TaobaokeItem> items = TaobaoFetchUtil.itemsConvert(EnvManager
				.getUser().getAppKey(), EnvManager.getUser().getAppSecret(),
				EnvManager.getUser().getAppType(), nids, EnvManager.getUser()
						.getNick(), EnvManager.getUser().getPid());
		Map<String, Object> result = new HashMap<String, Object>();
		// TODO 目前因权限问题无法根据商品标识查询非推广商品（需要高级权限来使用taobao.items.list.get）
		// if (items != null && items.size() > 0) {
		//
		// List<String> nidsList = Arrays.asList(nids.split(","));
		// if (items.size() < nidsList.size()) {// 如果有部分商品未加入推广
		// for (TaobaokeItem item : items) {
		// if (nidsList.contains(item.getNumIid())) {
		// nidsList.remove(item.getNumIid());// 移除已匹配商品
		// }
		// }
		//
		// }
		// }
		result.put("items", items);
		return new ModelAndView("site/member/link/convert/convertresult",
				result);
	}

	/**
	 * 新增推广链接
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	@ResponseBody
	public String addLinkPost(HttpServletRequest request,
			HttpServletResponse response) {
		// String name = request.getParameter("name");
		// String type = request.getParameter("type");
		// String value = request.getParameter("value");
		// Integer count = memberService.countMyXintaoLink(EnvManager.getUser()
		// .getUser_id());
		// if (count < EnvManager.getUser().getLimit().getLinks()) {
		// XintaoLink link = new XintaoLink();
		// link.setName(name);
		// link.setType(Integer.parseInt(type));
		// link.setValue(value);
		// memberService.save(link);
		// return "{\"id\":\"" + link.getId() + "\"}";
		// } else {
		// SystemException.handleMessageException("您的推广链接限额已使用完");
		// }
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 访问推广页面
	 * 
	 * 
	 * @return
	 */

	@RequestMapping(value = "/link/{type}")
	public ModelAndView getLink(@PathVariable String type,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		Integer t = 1;
		try {
			t = Integer.parseInt(type);
		} catch (Exception e) {
			SystemException.handleMessageException("不存在此推广类型");
		}
		String value = request.getParameter("value");
		switch (t) {
		case 1:// 商品推广
			Long num_iid = null;
			try {
				num_iid = Long.parseLong(value);
			} catch (Exception e) {
				SystemException.handleMessageException("当前商品推广链接对应的商品标识错误");
			}
			if (num_iid != null) {
				List<TaobaokeItem> items = TaobaoFetchUtil.itemsConvert(
						EnvManager.getUser().getAppKey(), EnvManager.getUser()
								.getAppSecret(), EnvManager.getUser()
								.getAppType(), String.valueOf(num_iid),
						EnvManager.getUser().getNick(), EnvManager.getUser()
								.getPid());
				if (items != null && items.size() == 1) {
					result.put("item", items.get(0));
				} else {
					SystemException.handleMessageException("要转换的商品不存在，或已下架");
				}
			}
			return new ModelAndView("site/member/link/itemLink", result);
		case 2:// 店铺推广
			String sid = value;
			if (StringUtils.isNotEmpty(sid)) {
				List<TaobaokeShop> shops = TaobaoFetchUtil.convertTaobaoShop(
						EnvManager.getUser().getAppKey(), EnvManager.getUser()
								.getAppSecret(), EnvManager.getUser()
								.getAppType(), EnvManager.getUser().getNick(),
						sid, EnvManager.getUser().getPid());
				if (shops != null && shops.size() == 1) {
					TaobaokeShop shop = shops.get(0);
					T_TaobaokeShop oShop = memberService.get(
							T_TaobaokeShop.class,
							R.eq("sid", Long.valueOf(sid)));
					if (oShop != null) {
						oShop.setCommissionRate(shop.getCommissionRate());
						oShop.setTitle(shop.getShopTitle());
						memberService.update(oShop);
						result.put("shop", oShop);
					} else {
						SystemException
								.handleMessageException("当前指定店铺尚未被新淘网收录");
					}
				} else {
					SystemException
							.handleMessageException("当前推广店铺转换时发生错误【请确认当前店铺加入了淘宝客推广】");
				}
			} else {
				SystemException.handleMessageException("当前店铺推广链接对应的店铺标识错误");
			}
			return new ModelAndView("site/member/link/shopLink", result);
		case 3:// 推广组推广
			String gid = value;
			if (StringUtils.isNotEmpty(gid)) {
				ItemGroup group = memberService.get(ItemGroup.class, gid);
				if (group == null) {
					SystemException
							.handleMessageException("当前推广组推广链接对应的推广组已被删除");
				}
				List<T_TaobaokeItem> items = memberService.findAllByCriterion(
						T_TaobaokeItem.class, R.eq("gid", group.getId()),
						R.eq("isValid", true));
				if (items.size() > 0) {
					result.put("group", group);
					result.put("items", items);
				} else {
					SystemException
							.handleMessageException("当前推广组推广链接对应的推广组中已没有有效的推广商品，请向该推广组添加有效的推广商品");
				}
			} else {
				SystemException.handleMessageException("当前推广组推广链接对应的推广组标识错误");
			}
			return new ModelAndView("site/member/link/groupLink", result);
		case 4:// 店铺收藏推广
			return new ModelAndView("site/member/link/favShopLink", result);
		case 5:// 关键词推广
			result.put("keyword", value);
			return new ModelAndView("site/member/link/keywordLink", result);
		}
		return null;
	}

	/**
	 * 新增链接页面/推广组
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/addlink", method = RequestMethod.GET)
	public ModelAndView addLink(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		List<ItemGroup> groups = (List<ItemGroup>) memberService
				.findAllByCriterion(ItemGroup.class,
						R.eq("user_id", EnvManager.getUser().getUser_id()));
		if (groups.size() > 0) {
			for (ItemGroup group : groups) {
				group.setCount(memberService.countItemsByGid(group.getId()));
			}
		}
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userId", EnvManager.getUser().getUser_id());
		// TODO 店铺收藏推广
		// List<T_Shop> shops = (List<T_Shop>) memberService
		// .findByHql(
		// "select s from T_Shop as s,W_ShopFavorite as sf where sf.user_id=:userId and s.sid=sf.sid order by level desc",
		// params);
		// result.put("shops", shops);
		result.put("groups", groups);
		return new ModelAndView("site/member/link/addLink", result);
	}

	/**
	 * 链接页面
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/data", method = RequestMethod.GET)
	public ModelAndView linksData(HttpServletRequest request,
			HttpServletResponse response) {
		String pageNoStr = request.getParameter("pageNo");
		String type = request.getParameter("type");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		Page<XintaoLink> page = new Page<XintaoLink>(pageNo, 30);
		Map<String, Object> result = new HashMap<String, Object>();
		String hql = "from XintaoLink order by created desc";
		Map<String, Object> params = new HashMap<String, Object>();
		if (StringUtils.isNotEmpty(type)) {
			try {
				params.put("type", Integer.parseInt(type));
				hql = "from XintaoLink where type=:type order by created desc ";
			} catch (Exception e) {
				hql = "from XintaoLink order by created desc";
			}
		}
		result.put("links", memberService.findByHql(page, hql, params));
		result.put("page", page);
		return new ModelAndView("site/member/link/linksData", result);
	}

}
