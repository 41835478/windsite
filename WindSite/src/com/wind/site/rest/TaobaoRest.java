package com.wind.site.rest;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;
import org.htmlparser.Node;
import org.htmlparser.Parser;
import org.htmlparser.PrototypicalNodeFactory;
import org.htmlparser.filters.HasAttributeFilter;
import org.htmlparser.filters.TagNameFilter;
import org.htmlparser.tags.ImageTag;
import org.htmlparser.tags.LinkTag;
import org.htmlparser.tags.ScriptTag;
import org.htmlparser.util.NodeList;
import org.htmlparser.util.ParserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.taobao.api.domain.Item;
import com.taobao.api.domain.ItemCat;
import com.taobao.api.domain.ItemCategory;
import com.taobao.api.domain.ItemProp;
import com.taobao.api.domain.ItemSearch;
import com.taobao.api.domain.TaobaokeItem;
import com.taobao.api.domain.TaobaokeItemDetail;
import com.taobao.api.domain.TaobaokeShop;
import com.taobao.api.request.ItemcatsGetRequest;
import com.taobao.api.request.ItemsSearchRequest;
import com.taobao.api.request.TaobaokeCaturlGetRequest;
import com.taobao.api.request.TaobaokeItemsDetailGetRequest;
import com.taobao.api.request.TaobaokeItemsGetRequest;
import com.taobao.api.request.TaobaokeListurlGetRequest;
import com.taobao.api.request.TaobaokeShopsGetRequest;
import com.taobao.api.response.ItemsSearchResponse;
import com.taobao.api.response.TaobaokeItemsDetailGetResponse;
import com.taobao.api.response.TaobaokeItemsGetResponse;
import com.taobao.api.response.TaobaokeShopsGetResponse;
import com.wind.core.dao.Page;
import com.wind.core.exception.BaseException;
import com.wind.core.exception.SystemException;
import com.wind.core.util.JoSqlUtils;
import com.wind.site.env.EnvManager;
import com.wind.site.htmlparser.StrongTag;
import com.wind.site.model.ADTaobaokeItem;
import com.wind.site.model.Activity;
import com.wind.site.model.ActivityType;
import com.wind.site.model.Channel;
import com.wind.site.model.Forum;
import com.wind.site.model.ForumType;
import com.wind.site.model.Huabao;
import com.wind.site.model.HuabaoData;
import com.wind.site.model.HuabaoItem;
import com.wind.site.model.HuabaoTag;
import com.wind.site.model.HuabaoType;
import com.wind.site.model.Huabaos;
import com.wind.site.model.KeyWord;
import com.wind.site.model.PopularSite;
import com.wind.site.model.Site;
import com.wind.site.model.T_ItemCat;
import com.wind.site.model.TaobaoBa;
import com.wind.site.model.User;
import com.wind.site.service.ISiteService;
import com.wind.site.service.ITaobaoService;
import com.wind.site.util.TaobaoFetchUtil;
import com.wind.site.util.WindSiteRestUtil;

/**
 * 淘宝TOP平台API RESTFUL访问
 * 
 * @author fxy
 * 
 */
@Controller
@RequestMapping("/top")
public class TaobaoRest {

	private static final Logger logger = Logger.getLogger(TaobaoRest.class
			.getName());
	@Autowired
	private ITaobaoService taobaoService;
	@Autowired
	private ISiteService siteService;

	/**
	 * 查询淘宝客商品
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/taoke/items/get", method = RequestMethod.POST)
	public ModelAndView taobaokeItemsGet(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertPID(siteService, result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
		TaobaokeItemsGetRequest req = new TaobaokeItemsGetRequest();
		String fields = request.getParameter("fields");
		if (StringUtils.isNotEmpty(fields)) {
			req.setFields(fields);
		} else {
			req.setFields(TaobaoFetchUtil.TAOBAOKEITEM_FIELDS);
		}
		// 增加外部商品标识
		req.setOuterCode(EnvManager.getItemsOuterCode());
		String cid = request.getParameter("cid");
		if (StringUtils.isNotEmpty(cid) && !"0".equals(cid)) {
			req.setCid(Long.parseLong(cid));
		}
		String keyword = request.getParameter("keyword");
		if (StringUtils.isNotEmpty(keyword)) {
			req.setKeyword(keyword);
		}
		String nick = request.getParameter("nick");
		if (StringUtils.isNotEmpty(nick)) {
			req.setNick(nick);
		} else {
			SystemException.handleMessageException("淘宝昵称不能为空！");
		}
		String start_price = request.getParameter("start_price");
		if (StringUtils.isNotEmpty(start_price)) {
			req.setStartPrice(start_price);
		}
		String end_price = request.getParameter("end_price");
		if (StringUtils.isNotEmpty(end_price)) {
			req.setEndPrice(end_price);
		}
		String auto_send = request.getParameter("auto_send");
		if (StringUtils.isNotEmpty(auto_send)) {
			req.setAutoSend(auto_send);
		}
		String area = request.getParameter("area");
		if (StringUtils.isNotEmpty(area)) {
			req.setArea(area);
		}
		String start_credit = request.getParameter("start_credit");
		if (StringUtils.isNotEmpty(start_credit)) {
			req.setStartCredit(start_credit);
		}
		String end_credit = request.getParameter("end_credit");
		if (StringUtils.isNotEmpty(end_credit)) {
			req.setEndCredit(end_credit);
		}
		String sort = request.getParameter("sort");
		if (StringUtils.isNotEmpty(sort)) {
			req.setSort(sort);
		}
		String is_guarantee = request.getParameter("is_guarantee");
		if (StringUtils.isNotEmpty(is_guarantee)) {
			req.setGuarantee(is_guarantee);
		}

		String start_commissionRate = request
				.getParameter("start_commissionRate");
		if (StringUtils.isNotEmpty(start_commissionRate)) {
			req.setStartCommissionRate(start_commissionRate);
		}
		String end_commissionRate = request.getParameter("end_commissionRate");
		if (StringUtils.isNotEmpty(end_commissionRate)) {
			req.setEndCommissionRate(end_commissionRate);
		}
		String start_commissionNum = request
				.getParameter("start_commissionNum");
		if (StringUtils.isNotEmpty(start_commissionNum)) {
			req.setStartCommissionNum(start_commissionNum);
		}
		String end_commissionNum = request.getParameter("end_commissionNum");
		if (StringUtils.isNotEmpty(end_commissionNum)) {
			req.setEndCommissionNum(end_commissionNum);
		}
		String page_no = request.getParameter("page_no");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(page_no)) {
			pageNo = Integer.parseInt(page_no);
		} else {
			pageNo = 1;
		}
		req.setPageNo(Long.valueOf(pageNo));
		String page_size = request.getParameter("page_size");
		if (StringUtils.isNotEmpty(page_size)) {
			req.setPageSize(Long.valueOf(page_size));
		} else {
			req.setPageSize(30L);
		}
		List<ADTaobaokeItem> aditems = taobaoService.searchADItemsByFilter(
				new Page<ADTaobaokeItem>(pageNo, 5), cid, keyword);
		TaobaokeItemsGetResponse resp = TaobaoFetchUtil.searchItems(String
				.valueOf(result.get("appType")), req);
		if (resp.getTaobaokeItems() != null) {
			result.put("items", resp.getTaobaokeItems());
		} else {
			result.put("items", new ArrayList<TaobaokeItem>());
		}
		if (resp.getTotalResults() != null) {
			result.put("totalResults", resp.getTotalResults());
		} else {
			result.put("totalResults", 0);
		}
		result.put("aditems", aditems);
		return new ModelAndView("site/template/searchResult", result);
	}

	/**
	 * 查询淘宝客店铺
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@Deprecated
	@RequestMapping(value = "/shops/search")
	public ModelAndView shopsSearch(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertPID(siteService, result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
		String nick = String.valueOf(result.get("nick"));
		if (StringUtils.isEmpty(nick)) {
			SystemException.handleMessageException("淘宝会员昵称不能为空");
		}
		TaobaokeShopsGetRequest req = new TaobaokeShopsGetRequest();
		req.setNick(nick);
		String fields = request.getParameter("fields");
		if (StringUtils.isNotEmpty(fields)) {
			req.setFields(fields);
		} else {
			req
					.setFields("user_id,shop_title,click_url,commission_rate,seller_credit,shop_type,total_auction,auction_count");
		}
		String cid = request.getParameter("cid");
		if (StringUtils.isNotEmpty(cid) && !"0".equals(cid)) {
			req.setCid(Long.valueOf(cid));
		} else {
			cid = "";
		}
		String start_credit = request.getParameter("start_credit");
		if (StringUtils.isNotEmpty(start_credit)) {
			req.setStartCredit(start_credit);
		}
		String end_credit = request.getParameter("end_credit");
		if (StringUtils.isNotEmpty(end_credit)) {
			req.setEndCredit(end_credit);
		}
		String start_commissionrate = request
				.getParameter("start_commissionrate");
		if (StringUtils.isNotEmpty(start_commissionrate)) {
			req.setStartCommissionrate(start_commissionrate);
		}
		String end_commissionrate = request.getParameter("end_commissionrate");
		if (StringUtils.isNotEmpty(end_commissionrate)) {
			req.setEndCommissionrate(end_commissionrate);
		}
		String start_auctioncount = request.getParameter("start_auctioncount");
		if (StringUtils.isNotEmpty(start_auctioncount)) {
			req.setStartAuctioncount(start_auctioncount);
		}
		String end_auctioncount = request.getParameter("end_auctioncount");
		if (StringUtils.isNotEmpty(end_auctioncount)) {
			req.setEndAuctioncount(end_auctioncount);
		}
		String start_totalaction = request.getParameter("start_totalaction");
		if (StringUtils.isNotEmpty(start_totalaction)) {
			req.setStartTotalaction(start_totalaction);
		}
		String end_totalaction = request.getParameter("end_totalaction");
		if (StringUtils.isNotEmpty(end_totalaction)) {
			req.setEndTotalaction(end_totalaction);
		}
		String only_mall = request.getParameter("only_mall");
		if (StringUtils.isNotEmpty(only_mall)) {
			req.setOnlyMall("true".equals(only_mall) ? true : false);
		}
		String keyword = request.getParameter("keyword");
		if (StringUtils.isNotEmpty(keyword)) {
			req.setKeyword(keyword);
		}
		// 页码。取值范围:大于零的整数;默认值为1，即返回第一页数据。
		String page_no = request.getParameter("page_no");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(page_no)) {
			pageNo = Integer.parseInt(page_no);
		} else {
			pageNo = 1;
		}
		req.setPageNo(Long.valueOf(pageNo));
		// 每页条数。取值范围:大于零的整数;最大值：200；默认值：40
		String page_size = request.getParameter("page_size");
		if (StringUtils.isNotEmpty(page_size)) {
			req.setPageSize(Long.valueOf(page_size));
		} else {
			req.setPageSize(30L);
		}
		Page<TaobaokeShop> page = new Page<TaobaokeShop>(pageNo, 30);
		TaobaokeShopsGetResponse resp = TaobaoFetchUtil.shopsGet(String
				.valueOf(result.get("appType")), req);
		if (resp != null) {
			page.setTotalCount(resp.getTotalResults().intValue());
			result.put("shops", resp.getTaobaokeShops());
		}
		result.put("page", page);
		result.put("cid", cid);
		result.put("start_credit", start_credit);
		result.put("end_credit", end_credit);
		result.put("start_commissionrate", start_commissionrate);
		result.put("end_commissionrate", end_commissionrate);
		result.put("start_auctioncount", start_auctioncount);
		result.put("end_auctioncount", end_auctioncount);
		result.put("start_totalaction", start_totalaction);
		result.put("end_totalaction", end_totalaction);
		result.put("only_mall", only_mall);
		result.put("keyword", keyword);
		return new ModelAndView("site/itemSearch", result);
	}

	private void searchWords(HttpServletResponse response, String q,
			String appType, String nick) {
		if (StringUtils.isEmpty(q)) {
			searchCid(response, null, appType, nick);
		}
		if (q.matches("[0-9]{7,20}")) {// 如果传入商品标识
			TaobaokeItemsDetailGetRequest getRequest = new TaobaokeItemsDetailGetRequest();
			getRequest.setNick(nick);// 昵称
			getRequest.setNumIids(q);
			getRequest.setFields(TaobaoFetchUtil.DETAIL_FIELDS);
			getRequest.setOuterCode(EnvManager.getItemsOuterCode());
			TaobaokeItemsDetailGetResponse getResponse = TaobaoFetchUtil
					.getItemsDetail(appType, getRequest);
			TaobaokeItemDetail item = null;
			if (getResponse != null) {
				List<TaobaokeItemDetail> itemList = getResponse
						.getTaobaokeItemDetails();
				if (itemList != null && itemList.size() == 1) {
					item = itemList.get(0);// 单个商品
					String clickUrl = item.getClickUrl();
					if (StringUtils.isNotEmpty(clickUrl)) {
						try {
							response.sendRedirect(clickUrl);
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}
		}

		TaobaokeListurlGetRequest req = new TaobaokeListurlGetRequest();
		req.setNick(nick);
		req.setOuterCode(EnvManager.getKeywordsOuterCode());
		req.setQ(q);
		String clickUrl = TaobaoFetchUtil.getKeyWordUrl(appType, req);
		if (StringUtils.isNotEmpty(clickUrl)) {
			try {
				response.sendRedirect(clickUrl);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		searchCid(response, null, appType, nick);
	}

	private void searchCid(HttpServletResponse response, String cid,
			String appType, String nick) {
		if (StringUtils.isEmpty(cid)) {
			cid = "16";
		}
		TaobaokeCaturlGetRequest request = new TaobaokeCaturlGetRequest();
		request.setCid(Long.valueOf(cid));
		request.setNick(nick);
		request.setOuterCode(EnvManager.getCatsOuterCode());
		try {
			String url = TaobaoFetchUtil.getItemCatUrl(appType, request);
			response.sendRedirect(url);
		} catch (Exception e) {
			logger.info(e.toString());
		}
	}

	/**
	 * 查询淘宝客商品(先查后转换)
	 * 
	 * @param request
	 * @param response
	 * @return
	 */

	@RequestMapping(value = "/items/search")
	public ModelAndView itemsSearch(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		WindSiteRestUtil.covertPID(siteService, result, userId);
		String q = request.getParameter("q");
		String appType = String.valueOf(result.get("appType"));
		String nick = String.valueOf(result.get("nick"));
		if (StringUtils.isNotEmpty(q)) {
			if ("get".equalsIgnoreCase(request.getMethod())) {
				try {
					q = new String(q.getBytes("ISO-8859-1"), "UTF-8");
				} catch (UnsupportedEncodingException e) {
					q = "";
				}
			}
			searchWords(response, q, appType, nick);
		} else {
			String cid = request.getParameter("cid");
			if (StringUtils.isNotEmpty(cid) && !"0".equals(cid)) {
			} else {
				cid = null;
			}
			searchCid(response, cid, appType, nick);
		}
		return null;
		// Map<String, Object> result = new HashMap<String, Object>();
		// ItemsSearchRequest req = new ItemsSearchRequest();
		// String userId = request.getParameter("USER");
		// String pid = WindSiteRestUtil.covertPID(siteService, result, userId);
		// if (StringUtils.isEmpty(pid)) {
		// result.put("pid", EnvManager.getDefaultPid());
		// result.put("nick", "fxy060608");
		// }
		// String view = request.getParameter("view");
		// if (StringUtils.isEmpty(view)) {
		// if (result.get("site_searchView") != null) {
		// view = String.valueOf(result.get("site_searchView"));
		// } else {
		// view = "list";
		// }
		// }
		// // 搜索字段。 用来搜索商品的title以及关键属性值的名称。
		// String q = request.getParameter("q");
		// if (StringUtils.isNotEmpty(q)) {
		// if ("get".equalsIgnoreCase(request.getMethod())) {
		// try {
		// q = new String(q.getBytes("ISO-8859-1"), "UTF-8");
		// } catch (UnsupportedEncodingException e) {
		// q = "";
		// }
		// }
		// req.setQ(q);
		// } else {
		// q = "";
		// }
		// TaobaokeItemDetail item = null;
		// Item normal = null;
		// if (q.matches("[0-9]{7,20}")) {// 如果传入商品标识
		// TaobaokeItemsDetailGetRequest getRequest = new
		// TaobaokeItemsDetailGetRequest();
		// getRequest.setNick((String) result.get("nick"));// 昵称
		// getRequest.setNumIids(q);
		// getRequest.setFields(TaobaoFetchUtil.DETAIL_FIELDS);
		// getRequest.setOuterCode(EnvManager.getItemsOuterCode());
		// TaobaokeItemsDetailGetResponse getResponse = TaobaoFetchUtil
		// .getItemsDetail(String.valueOf(result.get("appType")),
		// getRequest);
		// if (getResponse != null) {
		// List<TaobaokeItemDetail> itemList = getResponse
		// .getTaobaokeItemDetails();
		// if (itemList != null && itemList.size() == 1) {
		// item = itemList.get(0);// 单个商品
		// }
		// }
		// if (item == null) {
		// normal = TaobaoFetchUtil.taobaoItemGet(String.valueOf(result
		// .get("appType")), Long.valueOf(q));
		// }
		// }
		// if (item != null) {
		// q = item.getItem().getTitle();
		// view = "list";
		// result.put("taokeItem", item.getItem());
		// req.setQ(q);
		// } else if (normal != null) {
		// q = normal.getTitle();
		// view = "list";
		// result.put("normal", normal);
		// req.setQ(q);
		// }
		// String nick = String.valueOf(result.get("nick"));
		// if (StringUtils.isEmpty(nick)) {
		// SystemException.handleMessageException("淘宝会员昵称不能为空");
		// }
		// String fields = request.getParameter("fields");
		// if (StringUtils.isNotEmpty(fields)) {
		// req.setFields(fields);
		// } else {
		// req
		// .setFields("num_iid,post_fee,is_prepay,promoted_service,ww_status");//
		// 只获取NUM_IID
		// }
		// // 增加外部商品标识
		// // req.setOuterCode(EnvManager.getItemsOuterCode());
		//
		// // 商品所属类目Id。ItemCat中的cid。 可以通过taobao.itemcats.get.v2取到
		// String cid = request.getParameter("cid");
		// if (StringUtils.isNotEmpty(cid) && !"0".equals(cid)) {
		// req.setCid(Long.valueOf(cid));
		// } else {
		// cid = "";
		// }
		// // 卖家昵称列表。多个之间用“,”分隔；最多支持5个卖家昵称。如:nick1,nick2,nick3。
		// String nicks = request.getParameter("nicks");
		// if (StringUtils.isNotEmpty(nicks)) {
		// if ("get".equalsIgnoreCase(request.getMethod())) {
		// try {
		// nicks = new String(nicks.getBytes("ISO-8859-1"), "UTF-8");
		// } catch (UnsupportedEncodingException e) {
		// q = "";
		// }
		// }
		// req.setNicks(nicks);
		// } else {
		// nicks = "";
		// }
		// // 商品属性。商品属性。可以搜到拥有和输入属性一样的商品列表。字段格式为：pid1:vid1;pid2:vid2.属性的pid调用
		// // taobao.itemprops.get.v2取得，属性值的vid用taobao.itempropvalues.get取得vid。
		// String props = request.getParameter("props");
		// if (StringUtils.isNotEmpty(props)) {
		// req.setProps(props);
		// } else {
		// props = "";
		// }
		// // 默认查询16
		// if (StringUtils.isEmpty(q) && StringUtils.isEmpty(cid)
		// && StringUtils.isEmpty(nicks) && StringUtils.isEmpty(props)) {
		// req.setCid(16L);
		// }
		// // 可以根据产品Id搜索属于这个spu的商品。这个字段可以通过查询 taobao.products.get 取到
		// String product_id = request.getParameter("product_id");
		// if (StringUtils.isNotEmpty(product_id)) {
		// req.setProductId(Long.valueOf(product_id));
		// } else {
		// product_id = "";
		// }
		// // 排序方式。格式为column:asc/desc,column可选值为: price, delist_time,
		// //
		// seller_credit；默认按上架时间倒序.如按价格升序排列表示为：price:asc。新增排序字段：volume（30天成交量）；新增排序字段：popularity(商品的人气值)
		// String order_by = request.getParameter("order_by");
		// if (StringUtils.isNotEmpty(order_by)) {
		// req.setOrderBy(order_by);
		// } else {
		// order_by = "volume:desc";
		// }
		// // 旺旺在线状态（不设置结果包含所有状态，设置为true结果只有旺旺在线卖家的商品）不能单独使用，要和其他条件一起用才行。
		// String ww_status = request.getParameter("ww_status");
		// if (StringUtils.isNotEmpty(ww_status)) {
		// req.setWwStatus("true".equals(ww_status) ? true : false);
		// } else {
		// ww_status = "";
		// }
		// // 免运费（不设置包含所有邮费状态，设置为true结果只有卖家包邮的商品）不能单独使用，要和其他条件一起用才行。
		// String post_free = request.getParameter("post_free");
		// if (StringUtils.isNotEmpty(post_free)) {
		// req.setPostFree("true".equals(post_free) ? true : false);
		// } else {
		// post_free = "";
		// }
		// // 所在省。如：浙江
		// String state = request.getParameter("state");
		// if (StringUtils.isNotEmpty(state)) {
		// try {
		// state = new String(state.getBytes("ISO-8859-1"), "UTF-8");
		// } catch (UnsupportedEncodingException e) {
		// state = "";
		// }
		// req.setLocationState(state);
		// } else {
		// state = "";
		// }
		// // 所在市。如：杭州
		// String city = request.getParameter("city");
		// if (StringUtils.isNotEmpty(city)) {
		// try {
		// city = new String(city.getBytes("ISO-8859-1"), "UTF-8");
		// } catch (UnsupportedEncodingException e) {
		// city = "";
		// }
		// req.setLocationCity(city);
		// } else {
		// city = "";
		// }
		// // 是否是3D淘宝的商品,置为false或为空表示不对是否3D商品进行判断
		// String is_3D = request.getParameter("is_3D");
		// if (StringUtils.isNotEmpty(is_3D)) {
		// req.setIs3D("true".equals(is_3D) ? true : false);
		// } else {
		// is_3D = "";
		// }
		// // 商品所属卖家的最小信用等级数，1表示1心，2表示2心……，设置此条件表示搜索结果里的商品，所属的卖家信用必须大于等于设置的
		// // start_score。
		// String start_score = request.getParameter("start_score");
		// if (StringUtils.isNotEmpty(start_score)) {
		// req.setStartScore(Long.parseLong(start_score));
		// } else {
		// start_score = "";
		// }
		// //
		// 商品所属卖家的最大信用等级数，1表示1心，2表示2心……，设置此条件表示搜索结果里的商品，所属的卖家信用必须小于等于设置的end_score
		// String end_score = request.getParameter("end_score");
		// if (StringUtils.isNotEmpty(end_score)) {
		// req.setEndScore(Long.parseLong(end_score));
		// } else {
		// end_score = "";
		// }
		// // 商品30天内最小销售数，设置此条件表示搜索结果里的商品，30天内的销售量必须大于等于设置的start_volume
		// String start_volume = request.getParameter("start_volume");
		// if (StringUtils.isNotEmpty(start_volume)) {
		// req.setStartVolume(Long.parseLong(start_volume));
		// } else {
		// start_volume = "";
		// }
		// // 商品30天内最大销售数，设置此条件表示搜索结果里的商品，30天内的销售量必须小于等于设置的end_volume
		// String end_volume = request.getParameter("end_volume");
		// if (StringUtils.isNotEmpty(end_volume)) {
		// req.setEndVolume(Long.parseLong(end_volume));
		// } else {
		// end_volume = "";
		// }
		// // 是否淘1站代购商品，设置为true表示淘1站商品，设置为false或不设置表示不判断这个属性
		// String one_station = request.getParameter("one_station");
		// if (StringUtils.isNotEmpty(one_station)) {
		// req.setOneStation("true".equals(one_station) ? true : false);
		// } else {
		// one_station = "";
		// }
		// // 是否支持货到付款，设置为true表示支持货到付款，设置为false或不设置表示不判断这个属性
		// String is_cod = request.getParameter("is_cod");
		// if (StringUtils.isNotEmpty(is_cod)) {
		// req.setIsCod("true".equals(is_cod) ? true : false);
		// } else {
		// is_cod = "";
		// }
		// // 是否商城的商品，设置为true表示该商品是属于淘宝商城的商品，设置为false或不设置表示不判断这个属性
		// String is_mall = request.getParameter("is_mall");
		// if (StringUtils.isNotEmpty(is_mall)) {
		// req.setIsMall("true".equals(is_mall) ? true : false);
		// } else {
		// is_mall = "";
		// }
		// // 是否如实描述(即:先行赔付)商品，设置为true表示该商品是如实描述的商品，设置为false或不设置表示不判断这个属性
		// String is_prepay = request.getParameter("is_prepay");
		// if (StringUtils.isNotEmpty(is_prepay)) {
		// req.setIsPrepay("true".equals(is_prepay) ? true : false);
		// } else {
		// is_prepay = "";
		// }
		// //
		// 是否正品保障商品(既是如实描述，又是7天无理由退换货的商品，设置了这个属性时：is_prepay和promoted_service不能再行设置)，设置为true表示该商品是正品保障的商品，设置为false或不设置表示不判断这个属性
		// String genuine_security = request.getParameter("genuine_security");
		// if (StringUtils.isNotEmpty(genuine_security)) {
		// req.setGenuineSecurity("true".equals(genuine_security) ? true
		// : false);
		// } else {
		// genuine_security = "";
		// }
		// // 是否提供保障服务的商品。可选入参有：2、4。设置为2表示该商品是“假一赔三”的商品，设置为4表示该商品是“7天无理由退换货”的商品
		// String promoted_service = request.getParameter("promoted_service");
		// if (StringUtils.isNotEmpty(promoted_service)) {
		// req.setPromotedService(promoted_service);
		// } else {
		// promoted_service = "";
		// }
		// // 商品的新旧状态。可选入参有：new、second、unused
		// // 。设置为new表示该商品是全新的商品，设置为second表示该商品是二手的商品，设置为unused表示该商品是闲置的商品
		// String stuff_status = request.getParameter("stuff_status");
		// if (StringUtils.isNotEmpty(stuff_status)) {
		// req.setStuffStatus(stuff_status);
		// } else {
		// stuff_status = "";
		// }
		// // 商品最低价格。单位:元。正整数，取值范围:0-100000000。
		// String start_price = request.getParameter("start_price");
		// if (StringUtils.isNotEmpty(start_price)) {
		// req.setStartPrice(Long.valueOf(start_price));
		// }
		// // 商品最高价格。单位:元。正整数，取值范围:0-100000000
		// String end_price = request.getParameter("end_price");
		// if (StringUtils.isNotEmpty(end_price)) {
		// req.setEndPrice(Long.valueOf(end_price));
		// } else {
		// end_price = "";
		// }
		// // 页码。取值范围:大于零的整数;默认值为1，即返回第一页数据。
		// String page_no = request.getParameter("page_no");
		// Integer pageNo = 1;
		// if (StringUtils.isNotEmpty(page_no)) {
		// pageNo = Integer.parseInt(page_no);
		// } else {
		// pageNo = 1;
		// }
		// req.setPageNo(Long.valueOf(pageNo));
		// // 每页条数。取值范围:大于零的整数;最大值：200；默认值：40
		// String page_size = request.getParameter("page_size");
		// if (StringUtils.isNotEmpty(page_size)) {
		// req.setPageSize(Long.valueOf(page_size));
		// } else {
		// req.setPageSize(30L);
		// }
		// // 商品是否为虚拟商品 true：是虚拟商品 false：不是虚拟商品
		// String auction_flag = request.getParameter("auction_flag");
		// if (StringUtils.isNotEmpty(auction_flag)) {
		// req.setAuctionFlag(false);// 默认不查询虚拟商品
		// } else {
		// auction_flag = "false";
		// }
		// // 商品是否为自动发货 true：自动发货 false：非自动发货
		// String auto_post = request.getParameter("auto_post");
		// if (StringUtils.isNotEmpty(auto_post)) {
		// // req("true".equals(auto_post) ? true : false);
		// }
		// // 商品是否对会员打折
		// String has_discount = request.getParameter("has_discount");
		// if (StringUtils.isNotEmpty(has_discount)) {
		//
		// }
		//
		// ItemsSearchResponse resp = TaobaoFetchUtil.taobaoSearchItems(String
		// .valueOf(result.get("appType")), req);
		// Page<?> page = new Page(pageNo, 30);
		// if (resp.getTotalResults() > 0 && resp.getItemSearch() != null) {
		// page.setTotalCount(resp.getTotalResults().intValue());
		// ItemSearch search = resp.getItemSearch();
		// List<Item> items = search.getItems();
		// if (items.size() > 0) {
		// String numiids = "";
		// Boolean isFirst = true;
		// Map<String, Item> itemsMap = new HashMap<String, Item>();
		// for (Item i : items) {
		// if (isFirst) {
		// isFirst = false;
		// } else {
		// numiids += ",";
		// }
		// numiids += i.getNumIid();
		// itemsMap.put(String.valueOf(i.getNumIid()), i);
		// }
		// result.put("itemsMap", itemsMap);
		// List<TaobaokeItem> taokeItems = TaobaoFetchUtil.itemsConvert(
		// String.valueOf(result.get("appType")), numiids, nick);
		// List<ItemCategory> categories = search.getItemCategories();
		// if (categories != null && categories.size() > 0) {
		// List<T_ItemCat> itemCats = EnvManager.getCats();
		// Iterator<ItemCategory> itr = categories.iterator();
		// while (itr.hasNext()) {
		// ItemCategory cat = itr.next();
		// List<T_ItemCat> cs = (List<T_ItemCat>) JoSqlUtils.find(
		// itemCats, T_ItemCat.class, "cid", cat
		// .getCategoryId(), null);// 查找类目
		// if (cs != null && cs.size() == 1) {
		// T_ItemCat c = cs.get(0);
		// if (c.getName().equals("其它")) {
		// itr.remove();
		// } else {
		// cat.setName(c.getName());
		// }
		// } else {
		// itr.remove();
		// }
		// }
		// }
		// Collections.sort(categories, new ItemCategoryComparator());
		// if (categories.size() == 1) {
		// ItempropsGetRequest propsRequest = new ItempropsGetRequest();
		// propsRequest
		// .setFields(TaobaoFetchUtil.TAOBAOITEMCATITEMPROP_FIELDS);
		// propsRequest.setCid(categories.get(0).getCategoryId());
		// List<ItemProp> propsList = TaobaoFetchUtil
		// .getItemProps(
		// String.valueOf(result.get("appType")),
		// propsRequest);
		// // if (propsList.size() > 0)
		// // Collections.sort(propsList, new ItemPropsComparator());
		// result.put("itemProps", propsList);
		// }
		// if (StringUtils.isNotEmpty(order_by) && taokeItems != null
		// && taokeItems.size() > 0) {
		// if ("volume:desc".equals(order_by)) {
		// Collections.sort(taokeItems,
		// new ItemVolumeDescComparator());
		// } else if ("seller_credit:desc".equals(order_by)) {
		// Collections.sort(taokeItems,
		// new ItemCreditDescComparator());
		// } else if ("price:asc".equals(order_by)) {
		// Collections.sort(taokeItems,
		// new ItemPriceAscComparator());
		// } else if ("price:desc".equals(order_by)) {
		// Collections.sort(taokeItems,
		// new ItemPriceDescComparator());
		// }
		// }
		// result.put("categories", categories);
		// result.put("items", taokeItems);
		// if (taokeItems != null)
		// result
		// .put("invalidCount", items.size()
		// - taokeItems.size());
		// else
		// result.put("invalidCount", 30);
		// result.put("totalResults", resp.getTotalResults());
		// }
		// } else {
		// result.put("categories", new ArrayList<ItemCategory>());
		// result.put("items", new ArrayList<TaobaokeItem>());
		// result.put("invalidCount", 0);
		// result.put("totalResults", 0);
		// }
		// result.put("q", q);
		// result.put("nicks", nicks);
		// result.put("cid", cid);
		// result.put("is_mall", is_mall);
		// result.put("is_cod", is_cod);
		// result.put("post_free", post_free);
		// result.put("order_by", order_by);
		// result.put("state", state);
		// result.put("city", city);
		// result.put("start_price", start_price);
		// result.put("end_price", end_price);
		// result.put("page_no", page_no);
		// result.put("page", page);
		// result.put("view", view);
		// result.put("props", props);
		// return new ModelAndView("site/itemSearch", result);
	}

	/**
	 * 查询淘宝客商品(先查后转换)
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/taoke/items/search", method = RequestMethod.POST)
	public ModelAndView taobaokeItemsSearch(HttpServletRequest request,
			HttpServletResponse response) {
		ItemsSearchRequest req = new ItemsSearchRequest();
		String nick = request.getParameter("nick");
		if (StringUtils.isEmpty(nick)) {
			SystemException.handleMessageException("淘宝会员昵称不能为空");
		}
		String fields = request.getParameter("fields");
		if (StringUtils.isNotEmpty(fields)) {
			req.setFields(fields);
		} else {
			req.setFields("num_iid");// 只获取NUM_IID
		}
		// 增加外部商品标识
		// req.setOuterCode(EnvManager.getItemsOuterCode());
		// 搜索字段。 用来搜索商品的title以及关键属性值的名称。
		String q = request.getParameter("q");
		if (StringUtils.isNotEmpty(q)) {
			req.setQ(q);
		} else {
			q = "";
		}
		// 商品所属类目Id。ItemCat中的cid。 可以通过taobao.itemcats.get.v2取到
		String cid = request.getParameter("cid");
		if (StringUtils.isNotEmpty(cid) && !"0".equals(cid)) {
			req.setCid(Long.valueOf(cid));
		} else {
			cid = "";
		}
		// 卖家昵称列表。多个之间用“,”分隔；最多支持5个卖家昵称。如:nick1,nick2,nick3。
		String nicks = request.getParameter("nicks");
		if (StringUtils.isNotEmpty(nicks)) {
			req.setNicks(nicks);
		} else {
			nicks = "";
		}

		// 商品属性。商品属性。可以搜到拥有和输入属性一样的商品列表。字段格式为：pid1:vid1;pid2:vid2.属性的pid调用
		// taobao.itemprops.get.v2取得，属性值的vid用taobao.itempropvalues.get取得vid。
		String props = request.getParameter("props");
		if (StringUtils.isNotEmpty(props)) {
			req.setProps(props);
		} else {
			props = "";
		}
		// 默认查询16
		if (StringUtils.isEmpty(q) && StringUtils.isEmpty(cid)
				&& StringUtils.isEmpty(nicks) && StringUtils.isEmpty(props)) {
			req.setCid(16L);
		}
		// 可以根据产品Id搜索属于这个spu的商品。这个字段可以通过查询 taobao.products.get 取到
		String product_id = request.getParameter("product_id");
		if (StringUtils.isNotEmpty(product_id)) {
			req.setProductId(Long.valueOf(product_id));
		} else {
			product_id = "";
		}
		// 排序方式。格式为column:asc/desc,column可选值为: price, delist_time,
		// seller_credit；默认按上架时间倒序.如按价格升序排列表示为：price:asc。新增排序字段：volume（30天成交量）；新增排序字段：popularity(商品的人气值)
		String order_by = request.getParameter("order_by");
		if (StringUtils.isNotEmpty(order_by)) {
			req.setOrderBy(order_by);
		} else {
			order_by = "";
		}
		// 旺旺在线状态（不设置结果包含所有状态，设置为true结果只有旺旺在线卖家的商品）不能单独使用，要和其他条件一起用才行。
		String ww_status = request.getParameter("ww_status");
		if (StringUtils.isNotEmpty(ww_status)) {
			req.setWwStatus("true".equals(ww_status) ? true : false);
		} else {
			ww_status = "";
		}
		// 免运费（不设置包含所有邮费状态，设置为true结果只有卖家包邮的商品）不能单独使用，要和其他条件一起用才行。
		String post_free = request.getParameter("post_free");
		if (StringUtils.isNotEmpty(post_free)) {
			req.setPostFree("true".equals(post_free) ? true : false);
		} else {
			post_free = "";
		}
		// 所在省。如：浙江
		String state = request.getParameter("state");
		if (StringUtils.isNotEmpty(state)) {
			req.setLocationState(state);
		} else {
			state = "";
		}
		// 所在市。如：杭州
		String city = request.getParameter("city");
		if (StringUtils.isNotEmpty(city)) {
			req.setLocationCity(city);
		} else {
			city = "";
		}
		// 是否是3D淘宝的商品,置为false或为空表示不对是否3D商品进行判断
		String is_3D = request.getParameter("is_3D");
		if (StringUtils.isNotEmpty(is_3D)) {
			req.setIs3D("true".equals(is_3D) ? true : false);
		} else {
			is_3D = "";
		}
		// 商品所属卖家的最小信用等级数，1表示1心，2表示2心……，设置此条件表示搜索结果里的商品，所属的卖家信用必须大于等于设置的
		// start_score。
		String start_score = request.getParameter("start_score");
		if (StringUtils.isNotEmpty(start_score)) {
			req.setStartScore(Long.parseLong(start_score));
		} else {
			start_score = "";
		}
		// 商品所属卖家的最大信用等级数，1表示1心，2表示2心……，设置此条件表示搜索结果里的商品，所属的卖家信用必须小于等于设置的end_score
		String end_score = request.getParameter("end_score");
		if (StringUtils.isNotEmpty(end_score)) {
			req.setEndScore(Long.parseLong(end_score));
		} else {
			end_score = "";
		}
		// 商品30天内最小销售数，设置此条件表示搜索结果里的商品，30天内的销售量必须大于等于设置的start_volume
		String start_volume = request.getParameter("start_volume");
		if (StringUtils.isNotEmpty(start_volume)) {
			req.setStartVolume(Long.parseLong(start_volume));
		} else {
			start_volume = "";
		}
		// 商品30天内最大销售数，设置此条件表示搜索结果里的商品，30天内的销售量必须小于等于设置的end_volume
		String end_volume = request.getParameter("end_volume");
		if (StringUtils.isNotEmpty(end_volume)) {
			req.setEndVolume(Long.parseLong(end_volume));
		} else {
			end_volume = "";
		}
		// 是否淘1站代购商品，设置为true表示淘1站商品，设置为false或不设置表示不判断这个属性
		String one_station = request.getParameter("one_station");
		if (StringUtils.isNotEmpty(one_station)) {
			req.setOneStation("true".equals(one_station) ? true : false);
		} else {
			one_station = "";
		}
		// 是否支持货到付款，设置为true表示支持货到付款，设置为false或不设置表示不判断这个属性
		String is_cod = request.getParameter("is_cod");
		if (StringUtils.isNotEmpty(is_cod)) {
			req.setIsCod("true".equals(is_cod) ? true : false);
		} else {
			is_cod = "";
		}
		// 是否商城的商品，设置为true表示该商品是属于淘宝商城的商品，设置为false或不设置表示不判断这个属性
		String is_mall = request.getParameter("is_mall");
		if (StringUtils.isNotEmpty(is_mall)) {
			req.setIsMall("true".equals(is_mall) ? true : false);
		} else {
			is_mall = "";
		}
		// 是否如实描述(即:先行赔付)商品，设置为true表示该商品是如实描述的商品，设置为false或不设置表示不判断这个属性
		String is_prepay = request.getParameter("is_prepay");
		if (StringUtils.isNotEmpty(is_prepay)) {
			req.setIsPrepay("true".equals(is_prepay) ? true : false);
		} else {
			is_prepay = "";
		}
		// 是否正品保障商品(既是如实描述，又是7天无理由退换货的商品，设置了这个属性时：is_prepay和promoted_service不能再行设置)，设置为true表示该商品是正品保障的商品，设置为false或不设置表示不判断这个属性
		String genuine_security = request.getParameter("genuine_security");
		if (StringUtils.isNotEmpty(genuine_security)) {
			req.setGenuineSecurity("true".equals(genuine_security) ? true
					: false);
		} else {
			genuine_security = "";
		}
		// 是否提供保障服务的商品。可选入参有：2、4。设置为2表示该商品是“假一赔三”的商品，设置为4表示该商品是“7天无理由退换货”的商品
		String promoted_service = request.getParameter("promoted_service");
		if (StringUtils.isNotEmpty(promoted_service)) {
			req.setPromotedService(promoted_service);
		} else {
			promoted_service = "";
		}
		// 商品的新旧状态。可选入参有：new、second、unused
		// 。设置为new表示该商品是全新的商品，设置为second表示该商品是二手的商品，设置为unused表示该商品是闲置的商品
		String stuff_status = request.getParameter("stuff_status");
		if (StringUtils.isNotEmpty(stuff_status)) {
			req.setStuffStatus(stuff_status);
		} else {
			stuff_status = "";
		}
		// 商品最低价格。单位:元。正整数，取值范围:0-100000000。
		String start_price = request.getParameter("start_price");
		if (StringUtils.isNotEmpty(start_price)) {
			req.setStartPrice(Long.valueOf(start_price));
		}
		// 商品最高价格。单位:元。正整数，取值范围:0-100000000
		String end_price = request.getParameter("end_price");
		if (StringUtils.isNotEmpty(end_price)) {
			req.setEndPrice(Long.valueOf(end_price));
		} else {
			end_price = "";
		}
		// 页码。取值范围:大于零的整数;默认值为1，即返回第一页数据。
		String page_no = request.getParameter("page_no");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(page_no)) {
			pageNo = Integer.parseInt(page_no);
		} else {
			pageNo = 1;
		}
		req.setPageNo(Long.valueOf(pageNo));
		// 每页条数。取值范围:大于零的整数;最大值：200；默认值：40
		String page_size = request.getParameter("page_size");
		if (StringUtils.isNotEmpty(page_size)) {
			req.setPageSize(Long.valueOf(page_size));
		} else {
			req.setPageSize(30L);
		}
		// 商品是否为虚拟商品 true：是虚拟商品 false：不是虚拟商品
		String auction_flag = request.getParameter("auction_flag");
		if (StringUtils.isNotEmpty(auction_flag)) {
			req.setAuctionFlag(false);// 默认不查询虚拟商品
		} else {
			auction_flag = "false";
		}
		// 商品是否为自动发货 true：自动发货 false：非自动发货
		String auto_post = request.getParameter("auto_post");
		if (StringUtils.isNotEmpty(auto_post)) {
			// req("true".equals(auto_post) ? true : false);
		}
		// 商品是否对会员打折
		String has_discount = request.getParameter("has_discount");
		if (StringUtils.isNotEmpty(has_discount)) {

		}
		Map<String, Object> result = new HashMap<String, Object>();
		ItemsSearchResponse resp = TaobaoFetchUtil.taobaoSearchItems(String
				.valueOf(result.get("appType")), req);
		Page<?> page = new Page(pageNo, 30);
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
				List<TaobaokeItem> taokeItems = TaobaoFetchUtil.itemsConvert(
						String.valueOf(result.get("appType")), numiids, nick);
				List<ItemCategory> categories = search.getItemCategories();
				if (categories != null && categories.size() > 0) {
					List<T_ItemCat> itemCats = EnvManager.getCats();
					Iterator<ItemCategory> itr = categories.iterator();
					while (itr.hasNext()) {
						ItemCategory cat = itr.next();
						List<T_ItemCat> cs = (List<T_ItemCat>) JoSqlUtils.find(
								itemCats, T_ItemCat.class, "cid", cat
										.getCategoryId(), null);// 查找类目
						if (cs != null && cs.size() == 1) {
							T_ItemCat c = cs.get(0);
							if (c.getName().equals("其它")) {
								itr.remove();
							} else {
								cat.setName(c.getName());
							}
						} else {
							itr.remove();
						}
					}
				}
				Collections.sort(categories, new ItemCategoryComparator());
				if (StringUtils.isNotEmpty(order_by) && taokeItems != null
						&& taokeItems.size() > 0) {
					if ("volume:desc".equals(order_by)) {
						Collections.sort(taokeItems,
								new ItemVolumeDescComparator());
					} else if ("seller_credit:desc".equals(order_by)) {
						Collections.sort(taokeItems,
								new ItemCreditDescComparator());
					} else if ("price:asc".equals(order_by)) {
						Collections.sort(taokeItems,
								new ItemPriceAscComparator());
					} else if ("price:desc".equals(order_by)) {
						Collections.sort(taokeItems,
								new ItemPriceDescComparator());
					}
				}
				result.put("categories", categories);
				result.put("items", taokeItems);
				if (taokeItems != null)
					result
							.put("invalidCount", items.size()
									- taokeItems.size());
				else
					result.put("invalidCount", 30);
				result.put("totalResults", resp.getTotalResults());
			}
		} else {
			result.put("categories", new ArrayList<ItemCategory>());
			result.put("items", new ArrayList<TaobaokeItem>());
			result.put("invalidCount", 0);
			result.put("totalResults", 0);
		}
		result.put("q", q);
		result.put("nicks", nicks);
		result.put("cid", cid);
		result.put("is_mall", is_mall);
		result.put("order_by", order_by);
		result.put("state", state);
		result.put("city", city);
		result.put("start_price", start_price);
		result.put("end_price", end_price);
		result.put("page_no", page_no);
		result.put("page", page);
		return new ModelAndView("site/template/taobaoSearchResult", result);
	}

	class ItemCategoryComparator implements Comparator<ItemCategory> {
		@Override
		public int compare(ItemCategory o1, ItemCategory o2) {
			Long c1 = o1.getCount();
			Long c2 = o2.getCount();
			return c2.compareTo(c1);
		}

	}

	/**
	 * 价格从高到低
	 * 
	 * @author fxy
	 * 
	 */
	class ItemPriceDescComparator implements Comparator<TaobaokeItem> {
		@Override
		public int compare(TaobaokeItem o1, TaobaokeItem o2) {
			Double p1 = Double.parseDouble(o1.getPrice());
			Double p2 = Double.parseDouble(o2.getPrice());
			return p2.compareTo(p1);
		}

	}

	/**
	 * 价格从低到高
	 * 
	 * @author fxy
	 * 
	 */
	class ItemPriceAscComparator implements Comparator<TaobaokeItem> {
		@Override
		public int compare(TaobaokeItem o1, TaobaokeItem o2) {
			Double p1 = Double.parseDouble(o1.getPrice());
			Double p2 = Double.parseDouble(o2.getPrice());
			return p1.compareTo(p2);
		}
	}

	/**
	 * 信用从高到低
	 * 
	 * @author fxy
	 * 
	 */
	class ItemCreditDescComparator implements Comparator<TaobaokeItem> {
		@Override
		public int compare(TaobaokeItem o1, TaobaokeItem o2) {
			Long p1 = o1.getSellerCreditScore();
			Long p2 = o2.getSellerCreditScore();
			return p2.compareTo(p1);
		}
	}

	/**
	 * 属性排序
	 * 
	 * @author fxy
	 * 
	 */
	class ItemPropsComparator implements Comparator<ItemProp> {
		@Override
		public int compare(ItemProp o1, ItemProp o2) {
			Long p1 = o1.getSortOrder();
			Long p2 = o2.getSortOrder();
			return p1.compareTo(p2);
		}
	}

	/**
	 * 销量从高到低
	 * 
	 * @author fxy
	 * 
	 */
	class ItemVolumeDescComparator implements Comparator<TaobaokeItem> {
		@Override
		public int compare(TaobaokeItem o1, TaobaokeItem o2) {
			Long p1 = o1.getVolume();
			Long p2 = o2.getVolume();
			return p2.compareTo(p1);
		}
	}

	/**
	 * 获取用户PID
	 * 
	 * @param user
	 */
	@RequestMapping(value = "/pid/convert", method = RequestMethod.GET)
	@ResponseBody
	public void synPid(HttpServletRequest req) {
		List<User> users = taobaoService.findAllByCriterion(User.class, R
				.isNull("pid"));
		if (users.size() > 0) {
			logger.info("本次转换PID【" + users.size() + "】个");
			for (User user : users) {
				TaobaokeCaturlGetRequest request = new TaobaokeCaturlGetRequest();
				request.setCid(0L);
				request.setNick(user.getNick());
				request.setOuterCode(EnvManager.getCatsOuterCode());
				try {
					String url = TaobaoFetchUtil.getItemCatUrl(user
							.getAppType(), request);
					String pid = StringUtils
							.substringBetween(url, "?p=", "&u=");
					if (StringUtils.isNotEmpty(pid)) {
						user.setPid(pid);
						logger.info("用户【" + user.getNick() + "】=PID【" + pid
								+ "】");
						user
								.setSites(taobaoService.findAllByCriterion(
										Site.class, R.eq("user_id", user
												.getUser_id())));
						taobaoService.update(user);
					}
				} catch (Exception e) {
					logger.info(e.toString());
				}
			}
		}

	}

	@RequestMapping(value = "/taoke/cats/get", method = RequestMethod.GET)
	public void getCategory(HttpServletRequest request,
			HttpServletResponse response) {
		taobaoService.deleteAll(T_ItemCat.class);// 删除所有类目
		ItemcatsGetRequest req = new ItemcatsGetRequest();
		req.setParentCid(0L);
		List<ItemCat> cats = TaobaoFetchUtil.getItemCats("0", req);
		List<T_ItemCat> icats = taobaoService.saveTItemCat(cats);
		getCategory(icats);
	}

	/**
	 * 查询保存不成功的父类目的子类目
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/taoke/cats/unsuccess/get", method = RequestMethod.GET)
	public void getCategoryUnSuccess(HttpServletRequest request,
			HttpServletResponse response) {
		List<T_ItemCat> icats = taobaoService.findAllByCriterion(
				T_ItemCat.class, R.eq("isSuccess", false), R.eq("isParent",
						true));
		System.out.println("尚有[" + icats.size() + "]未同步成功");
		if (icats != null && icats.size() > 0) {
			getCategory(taobaoService.findAllByCriterion(T_ItemCat.class, R.eq(
					"isSuccess", false), R.eq("isParent", true)));
		}
	}

	/**
	 * 递归保存所有类目
	 * 
	 * @param icats
	 */
	private void getCategory(List<T_ItemCat> icats) {
		if (icats != null && icats.size() > 0) {
			for (T_ItemCat icat : icats) {
				if (icat.getIsParent()) {
					ItemcatsGetRequest req = new ItemcatsGetRequest();
					req.setParentCid(Long.valueOf(icat.getCid()));
					try {
						getCategory(taobaoService.saveTItemCat(TaobaoFetchUtil
								.getItemCats("0", req)));
					} catch (Exception e) {
						taobaoService.updateTItemCatUnSuccess(icat);
						System.out.println(e);
						if (e instanceof BaseException) {
							System.out.println("错误代码:"
									+ ((BaseException) e).getKey());
							if ("8".equals(((BaseException) e).getKey())) {
								try {
									Thread.sleep(1000 * 65);
								} catch (InterruptedException e1) {
									e1.printStackTrace();
								}// 休息1分钟
							} else if ("7".equals(((BaseException) e).getKey())) {
								break;
							}
						}

					}
				}
			}
		}

	}

	@RequestMapping(value = "/taoke/cats/clickurl/get", method = RequestMethod.GET)
	public void initCatClickUrl(HttpServletRequest request,
			HttpServletResponse response) {
		List<T_ItemCat> icats = taobaoService.findAllByCriterion(
				T_ItemCat.class, R.isNull("clickUrl"));
		System.out.println("尚有[" + icats.size() + "]未初始化推广链接");
		for (T_ItemCat icat : icats) {
			TaobaokeCaturlGetRequest req = new TaobaokeCaturlGetRequest();
			req.setCid(Long.valueOf(icat.getCid()));
			req.setNick("fxy060608");
			req.setOuterCode(EnvManager.getCatsOuterCode());
			try {
				String clickUrl = TaobaoFetchUtil.getItemCatUrl("0", req);
				if (StringUtils.isNotEmpty(clickUrl)) {
					icat.setClickUrl(clickUrl.replaceAll("mm_13667242_0_0",
							"{pid}"));
					taobaoService.update(icat);
				}
			} catch (Exception e) {
				System.out.println(e);
				if (e instanceof BaseException) {
					System.out.println("错误代码:" + ((BaseException) e).getKey());
					if ("8".equals(((BaseException) e).getKey())) {
						try {
							Thread.sleep(1000 * 65);
						} catch (InterruptedException e1) {
							e1.printStackTrace();
						}// 休息1分钟
					} else if ("7".equals(((BaseException) e).getKey())) {
						break;
					}
				}
			}

		}
	}

	@RequestMapping(value = "/daqi", method = RequestMethod.GET)
	public void parseDaqiCat(HttpServletRequest request,
			HttpServletResponse response) {
		Parser parser;
		try {
			parser = new Parser("http://www.daqi.com/paihang.html");
			NodeList as1 = parser.extractAllNodesThatMatch(
					new HasAttributeFilter("bordercolor", "#999999"))
					.elementAt(0).getChildren().extractAllNodesThatMatch(
							new TagNameFilter("a"), true);
			System.out.println("总分类:" + as1.size());
			for (int i = 0; i < as1.size(); i++) {
				ForumType type = new ForumType();
				LinkTag node = (LinkTag) as1.elementAt(i);
				if (node.getLinkText() == null
						|| node.getLinkText().length() == 0) {
					continue;
				}
				type.setTitle(node.getLinkText());
				type.setParent(null);
				type.setUrl(node.getLink());
				taobaoService.save(type);// 保存一级分类
				System.out.println(type.getTitle() + ":" + type.getUrl());
				Parser parser2 = new Parser(type.getUrl());
				NodeList as2 = parser2.extractAllNodesThatMatch(
						new HasAttributeFilter("bordercolor", "#999999"))
						.elementAt(0).getChildren().extractAllNodesThatMatch(
								new TagNameFilter("a"), true);
				System.out.println("二级分类:" + as2.size());
				for (int j = 0; j < as2.size(); j++) {
					LinkTag node2 = (LinkTag) as2.elementAt(j);
					if (node2.getLinkText() != null
							&& node2.getLinkText().length() > 0) {
						ForumType type2 = new ForumType();
						type2.setTitle(node2.getLinkText());
						type2.setParent(type.getId());
						type2.setUrl(node2.getLink());
						taobaoService.save(type2);
						System.out.println(type2.getTitle() + ":"
								+ type2.getUrl());
					}
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/daqi/forums", method = RequestMethod.GET)
	public void parseDaqiForum(HttpServletRequest request,
			HttpServletResponse response) {
		List<ForumType> types = taobaoService.findAllByCriterion(
				ForumType.class, R.eq("isSuccess", false));
		for (ForumType type : types) {
			parseForum(type);
		}
	}

	@RequestMapping(value = "/daqi/forums/convert", method = RequestMethod.GET)
	public void convertDaqiForum(HttpServletRequest request,
			HttpServletResponse response) {
		convert(new Page<Forum>(1, 1000));
	}

	private void convert(Page<Forum> page) {
		List<Forum> forums = taobaoService.findAllByCriterion(page,
				Forum.class, R.isNull("realUrl"), R.not(R.like("url",
						"%bbs.voc.com.cn%")));
		Parser parser = null;
		for (Forum forum : forums) {
			try {
				parser = new Parser(forum.getUrl());
				LinkTag a = (LinkTag) parser.extractAllNodesThatMatch(
						new HasAttributeFilter("class", "normal")).elementAt(0);
				if (a != null && StringUtils.isNotEmpty(a.getLink())
						&& a.getLinkText().equals("(点击访问原址)")) {
					forum.setRealUrl(a.getLink());
					System.out.println(forum.getTitle() + "【" + forum.getUrl()
							+ "】转换成功");
					taobaoService.update(forum);
				} else {
					System.out.println("未找到【" + forum.getTitle() + "】=【"
							+ forum.getUrl() + "】");
				}
			} catch (ParserException e) {
				e.printStackTrace();
			}
		}
		if (page.isHasNextPage()) {
			page.setPageNo(page.getPageNo() + 1);
			convert(page);
		}
	}

	private void parseForum(ForumType type) {
		for (int i = 1; i < 6; i++) {
			Parser parser;
			try {
				parser = new Parser(type.getUrl().split(".html")[0] + i
						+ ".html");
				NodeList trs = parser.extractAllNodesThatMatch(
						new HasAttributeFilter("width", "98%")).elementAt(0)
						.getChildren().extractAllNodesThatMatch(
								new TagNameFilter("tr"), true);
				for (int h = 0; h < trs.size(); h++) {
					Node node = trs.elementAt(h);
					NodeList children = node.getChildren()
							.extractAllNodesThatMatch(new TagNameFilter("td"));
					Node tdF = children.elementAt(2);
					LinkTag aF = (LinkTag) tdF.getChildren()
							.extractAllNodesThatMatch(new TagNameFilter("a"))
							.elementAt(0);
					if (StringUtils.isEmpty(aF.getLinkText())) {
						continue;
					}
					Node tdS = children.elementAt(3);
					LinkTag aS = (LinkTag) tdS.getChildren()
							.extractAllNodesThatMatch(new TagNameFilter("a"))
							.elementAt(0);
					PopularSite site = taobaoService.findByCriterion(
							PopularSite.class, R.eq("title", aS.getLinkText()));
					if (site == null) {
						site = new PopularSite();
						site.setTitle(aS.getLinkText());
						site.setFavorite(0);
						site.setUrl(aS.getLink());
						taobaoService.save(site);
					}
					Forum forum = taobaoService.findByCriterion(Forum.class, R
							.eq("site.id", site.getId()), R.eq("title", aF
							.getLinkText()), R.eq("type.id", type.getId()));
					if (forum == null) {
						forum = new Forum();
						forum.setFavorite(0);
						forum.setSite(site);
						forum.setSortOrder(h);
						forum.setTitle(aF.getLinkText());
						forum.setUrl(aF.getLink());
						forum.setType(type);
						taobaoService.save(forum);
					} else {
						forum.setType(type);
					}
					System.out.println(forum.getTitle() + ":" + forum.getUrl()
							+ "-------------------"
							+ forum.getSite().getTitle() + "------------------"
							+ forum.getSite().getUrl());
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		type.setIsSuccess(true);
		taobaoService.update(type);
	}

	@RequestMapping(value = "/baidu/site", method = RequestMethod.GET)
	public void parseBaiduSiteForum(HttpServletRequest request,
			HttpServletResponse response) {
		Parser parser;
		try {
			parser = new Parser("http://site.baidu.com/list/155blog.htm");
			NodeList as1 = parser.extractAllNodesThatMatch(
					new HasAttributeFilter("bgcolor", "C5D5C5")).elementAt(0)
					.getChildren().extractAllNodesThatMatch(
							new TagNameFilter("table"), true);
			System.out.println("总分类:" + as1.size());
			Node zonghetable = as1.elementAt(0);
			NodeList zonghe = zonghetable.getChildren()
					.extractAllNodesThatMatch(new TagNameFilter("a"), true);
			ForumType type31 = taobaoService.get(ForumType.class, "31");
			ForumType type32 = taobaoService.get(ForumType.class, "32");
			ForumType type33 = taobaoService.get(ForumType.class, "33");
			for (int i = 0; i < zonghe.size(); i++) {
				LinkTag a = (LinkTag) zonghe.elementAt(i);
				System.out.println(a.getLinkText() + "=" + a.getLink());
				Forum forum = taobaoService.findByCriterion(Forum.class, R.eq(
						"title", a.getLinkText()), R.eq("type.id", "31"));
				if (forum == null) {
					forum = new Forum();
					forum.setFavorite(0);
					forum.setRealUrl(a.getLink());
					forum.setUrl(a.getLink());
					forum.setTitle(a.getLinkText());
					forum.setType(type31);
					forum.setSortOrder(i);
					taobaoService.save(forum);
				}
			}
			System.out
					.println("===============================================综合共计"
							+ zonghe.size());
			Node zhoubiantable = as1.elementAt(1);
			NodeList zhoubian = zhoubiantable.getChildren()
					.extractAllNodesThatMatch(new TagNameFilter("a"), true);
			for (int i = 0; i < zhoubian.size(); i++) {
				LinkTag a = (LinkTag) zhoubian.elementAt(i);
				System.out.println(a.getLinkText() + "=" + a.getLink());
				Forum forum = taobaoService.findByCriterion(Forum.class, R.eq(
						"title", a.getLinkText()), R.eq("type.id", "32"));
				if (forum == null) {
					forum = new Forum();
					forum.setFavorite(0);
					forum.setRealUrl(a.getLink());
					forum.setUrl(a.getLink());
					forum.setTitle(a.getLinkText());
					forum.setType(type32);
					forum.setSortOrder(i);
					taobaoService.save(forum);
				}
			}
			System.out
					.println("===============================================周边共计"
							+ zhoubian.size());
			Node jingxuantable = as1.elementAt(2);
			NodeList jingxuan = jingxuantable.getChildren()
					.extractAllNodesThatMatch(new TagNameFilter("a"), true);
			for (int i = 0; i < jingxuan.size(); i++) {
				LinkTag a = (LinkTag) jingxuan.elementAt(i);
				System.out.println(a.getLinkText() + "=" + a.getLink());
				Forum forum = taobaoService.findByCriterion(Forum.class, R.eq(
						"title", a.getLinkText()), R.eq("type.id", "33"));
				if (forum == null) {
					forum = new Forum();
					forum.setFavorite(0);
					forum.setRealUrl(a.getLink());
					forum.setUrl(a.getLink());
					forum.setTitle(a.getLinkText());
					forum.setType(type33);
					forum.setSortOrder(i);
					taobaoService.save(forum);
				}
			}
			System.out
					.println("===============================================精选共计"
							+ jingxuan.size());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/mama/words", method = RequestMethod.GET)
	public void parseMaMaWords(HttpServletRequest request,
			HttpServletResponse response) {
		Parser parser;
		try {
			String url = request.getParameter("url");
			if (StringUtils.isEmpty(url)) {
				url = "http://club.alimama.com/read-htm-tid-706235.html";
			}
			parser = new Parser(url);
			Node table = parser.extractAllNodesThatMatch(
					new HasAttributeFilter("class", "read_form")).elementAt(0);
			NodeList list = table.getChildren().extractAllNodesThatMatch(
					new TagNameFilter("tr"), true);
			System.out.println("总数据条数:" + list.size());
			if (list != null && list.size() == 16) {
				taobaoService.deleteAll(KeyWord.class);
				for (int i = 1; i < list.size(); i++) {
					Node tr = list.elementAt(i);
					NodeList tds = tr.getChildren().extractAllNodesThatMatch(
							new TagNameFilter("td"), true);
					if (tds != null && tds.size() == 7) {
						KeyWord word = new KeyWord();
						word.setSortOrder(Integer.parseInt(tds.elementAt(0)
								.toPlainTextString()));
						word.setName(tds.elementAt(1).toPlainTextString());
						word.setRPM(tds.elementAt(2).toPlainTextString()
								.replace("￥", ""));
						taobaoService.save(word);
						KeyWord word1 = new KeyWord();
						word1.setSortOrder(Integer.parseInt(tds.elementAt(4)
								.toPlainTextString()));
						word1.setName(tds.elementAt(5).toPlainTextString());
						word1.setRPM(tds.elementAt(6).toPlainTextString()
								.replace("￥", ""));
						taobaoService.save(word1);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/mama/activity", method = RequestMethod.GET)
	public void parseMaMaActivity(HttpServletRequest request,
			HttpServletResponse response) {
		try {
			// 主题:

			Parser parser = new Parser(
					"http://taoke.alimama.com/activity_list.htm");
			Node div = parser.extractAllNodesThatMatch(
					new HasAttributeFilter("class", "show_down_div"))
					.elementAt(0);
			Node ul = div.getChildren().extractAllNodesThatMatch(
					new TagNameFilter("ul")).elementAt(0);
			NodeList li = ul.getChildren().extractAllNodesThatMatch(
					new TagNameFilter("li"));
			System.out.println("节点数量:" + li.size());
			for (int i = 1; i < li.size(); i++) {
				Node node = li.elementAt(i);
				String html = node.toHtml();
				String text = node.toPlainTextString();
				Integer iS = text.indexOf("(");
				Integer iE = text.indexOf(")");
				Integer cS = html.indexOf("category=") + 9;
				Integer cE = html.indexOf("&");
				String name = text.substring(0, iS);
				String count = text.substring(iS + 1, iE);
				String id = html.substring(cS, cE);
				ActivityType at = taobaoService.findByCriterion(
						ActivityType.class, R.eq("name", id));
				if (at == null) {
					at = new ActivityType();
					at.setName(id);
					at.setTitle(StringUtils.trim(name));
					at.setCount(Integer.parseInt(count));
					taobaoService.save(at);
				}
				getTopics(at);

			}

		} catch (ParserException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/tb/huabao", method = RequestMethod.GET)
	public void parseTaobaoHuabao(HttpServletRequest request,
			HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		Parser parser;
		try {
			List<HuabaoType> types = taobaoService.loadAll(HuabaoType.class);
			for (HuabaoType hbType : types) {
				String type = hbType.getName();
				List<Huabaos> hbs = taobaoService.findAllByCriterion(
						Huabaos.class, R.eq("type", hbType.getId()), R.eq(
								"isSuccess", false));
				if (hbs != null && hbs.size() > 0) {
					for (Huabaos hb : hbs) {
						parser = new Parser("http://huabao.taobao.com/" + type
								+ "/d-" + hb.getId() + ".htm#poster-detail");
						parser.setEncoding("UTF-8");
						Node content = parser.extractAllNodesThatMatch(
								new HasAttributeFilter("id", "content"))
								.elementAt(0);
						NodeList error = content
								.getChildren()
								.extractAllNodesThatMatch(
										new HasAttributeFilter("class", "error"),
										true);
						if (error.size() > 0) {
							taobaoService.delete(Huabaos.class, hb.getId());
							hbType.setNums(hbType.getNums() - 1);
							taobaoService.update(hbType);
							continue;
						}
						Node Nodetags = content.getChildren()
								.extractAllNodesThatMatch(
										new HasAttributeFilter("id",
												"poster-tags"), true)
								.elementAt(0);
						NodeList as = Nodetags.getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("a"), true);
						Set<HuabaoTag> tags = new HashSet<HuabaoTag>();
						if (as.size() > 0) {// 处理标签
							HuabaoTag tag = null;
							for (int i = 0; i < as.size(); i++) {
								LinkTag a = (LinkTag) as.elementAt(i);
								String tagName = a.getLinkText();
								tag = taobaoService.findByCriterion(
										HuabaoTag.class, R.eq("name", tagName));
								if (tag == null) {
									tag = new HuabaoTag();
									tag.setName(tagName);
									tag.setNums(1);
								} else {
									tag.setNums(tag.getNums() + 1);
								}
								tags.add(tag);
							}
						}
						NodeList list = content.getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("script"), true);
						ScriptTag tag = (ScriptTag) list
								.elementAt(list.size() - 1);
						String json = tag
								.toPlainTextString()
								.replaceAll("var data = ", "")
								.replace("TB.posterDetail.init(data);", "")
								.replace("TB.shareTo.init(data);", "")
								.replaceAll("//分享模块的初使化", "")
								.replaceAll("};", "}")
								.replaceAll(".replaceAll\\(.*\\)", "")
								.replaceAll(
										"\\+escape\\(document.getElementsByName\\('_tb_token_'\\)\\[0\\].value\\)",
										"").replaceAll("\\+'&_tb_token_='", "");

						Pattern p = Pattern.compile("\\s*|\t|\r|\n");
						Matcher m = p.matcher(json);
						json = m.replaceAll("");
						String result = new String(json.getBytes(), "UTF-8")
								.replaceAll(
										"\\\\r\\\\n\\\\r\\\\n-----\\\\u70B9\\\\u51FB\\\\u56FE\\\\u7247\\\\u4E0A\\\\u7684\\\\u5708\\\\u6846\\\\uFF0C\\\\u76F4\\\\u63A5\\\\u8D2D\\\\u4E70\\\\u6B64\\\\u5B9D\\\\u8D1D-------",
										"").replaceAll("\\\\r\\\\n", "<br>")
								.replaceAll("\\\\',", "',").replaceAll(
										"\\\\',", "',");
						System.out.println("result:" + result);
						HuabaoData data = new Gson().fromJson(result,
								HuabaoData.class);
						System.out.println(data);
						taobaoService.addHuabao(hb, tags, data);
						Thread.sleep(1000);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
	}

	@RequestMapping(value = "/huabao/count", method = RequestMethod.GET)
	public void countHuabao(HttpServletRequest request,
			HttpServletResponse response) {
		Page<Huabao> page = new Page<Huabao>(1, 500);
		countHuabao(page);
	}

	private void countHuabao(Page<Huabao> page) {
		// 查询未统计的画报
		List<Huabao> hbs = taobaoService.findAllByCriterion(page, Huabao.class,
				R.isNull("nums"));
		if (hbs != null && hbs.size() > 0) {
			for (Huabao h : hbs) {
				List<HuabaoItem> items = taobaoService.findAllByCriterion(
						HuabaoItem.class, R.eq("picId", h.getPicId()));
				if (items != null && items.size() > 0) {
					h.setNums(items.size());
				} else {
					h.setNums(0);
				}
				taobaoService.update(h);
			}
		}
		hbs.clear();
		if (page.isHasNextPage()) {
			page.setPageNo(page.getNextPage());
			countHuabao(page);
		}
	}

	@RequestMapping(value = "/tb/huabaos", method = RequestMethod.GET)
	public void parseTaobaoHuabaos(HttpServletRequest request,
			HttpServletResponse response) {
		List<HuabaoType> types = taobaoService.loadAll(HuabaoType.class);
		Parser parser;
		try {
			for (HuabaoType huabaoType : types) {
				String type = huabaoType.getName();
				parser = new Parser("http://huabao.taobao.com/" + type
						+ "/tag-g,nz2wy3a.htm?type=guide&page=1");
				Node searchResultInner = parser.extractAllNodesThatMatch(
						new HasAttributeFilter("id", "search-result-inner"))
						.elementAt(0);
				Node numsNode = searchResultInner.getChildren()
						.extractAllNodesThatMatch(
								new HasAttributeFilter("class", "highlight"),
								true).elementAt(0);
				Integer nums = Integer.parseInt(numsNode.toPlainTextString()
						.replace("个", ""));
				huabaoType.setNums(nums);
				taobaoService.update(huabaoType);
				Integer pageCount = 0;
				if (nums > 0) {
					pageCount = nums / 12;
					if (nums % 12 > 0) {
						pageCount++;
					}
				}
				Boolean isContinue = true;
				for (int i = 1; i < (pageCount + 1); i++) {
					if (!isContinue) {
						break;
					}
					parser = new Parser("http://huabao.taobao.com/" + type
							+ "/tag-g,nz2wy3a.htm?type=guide&page=" + i);
					Node searchResults = parser.extractAllNodesThatMatch(
							new HasAttributeFilter("id", "list-view"))
							.elementAt(0);
					NodeList lis = searchResults.getChildren()
							.extractAllNodesThatMatch(new TagNameFilter("li"));
					if (lis.size() > 0) {
						for (int j = 0; j < lis.size(); j++) {
							Node li = lis.elementAt(j);
							Node divBd = li.getChildren()
									.extractAllNodesThatMatch(
											new HasAttributeFilter("class",
													"bd"), true).elementAt(0);
							NodeList dds = divBd.getChildren()
									.extractAllNodesThatMatch(
											new TagNameFilter("dd"), true);
							if (dds.size() == 2) {
								Node dd1 = dds.elementAt(0);
								LinkTag a = (LinkTag) dd1.getChildren()
										.extractAllNodesThatMatch(
												new TagNameFilter("a"))
										.elementAt(0);
								Integer id = Integer.parseInt(a.getLink()
										.replace(
												"http://huabao.taobao.com/"
														+ type + "/d-", "")
										.split("\\.")[0]);
								Huabaos huabaos = taobaoService.get(
										Huabaos.class, id);
								if (huabaos == null) {
									huabaos = new Huabaos();
									ImageTag image = (ImageTag) a.getChildren()
											.extractAllNodesThatMatch(
													new TagNameFilter("img"))
											.elementAt(0);
									String name = image.getAttribute("alt");
									String cover = image.getImageURL();
									String shortName = dds.elementAt(1)
											.toPlainTextString();

									huabaos.setCover(cover);
									huabaos.setId(id);
									huabaos.setName(name);
									huabaos.setShortName(shortName);
									huabaos.setType(huabaoType.getId());
									huabaos.setIsSuccess(false);
									taobaoService.save(huabaos);
								} else {
									System.out
											.println("分类【"
													+ huabaoType.getTitle()
													+ "】增量抓取完毕");
									isContinue = false;
								}
							}
						}
					}
					System.out.println("第" + i + "页完成抓取");
					Thread.sleep(1000);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@RequestMapping(value = "/ba", method = RequestMethod.GET)
	public void parseBa(HttpServletRequest request, HttpServletResponse response) {
		Parser parser;

		for (int i = 10000; i < 1000000; i++) {
			try {
				parser = new Parser(
						"http://ba.taobao.com/thread_list.htm?bar_id=" + i);
				Node as1 = parser.extractAllNodesThatMatch(
						new HasAttributeFilter("class", "list-item"))
						.elementAt(1);
				NodeList tags = as1.getChildren().extractAllNodesThatMatch(
						new TagNameFilter("a"), true);
				TaobaoBa ba = new TaobaoBa();
				if (tags == null || tags.size() == 0) {
					System.out.println(i + "=" + as1.toPlainTextString());
				} else {
					ba.setId(i);
					ba.setName(tags.elementAt(0).toPlainTextString());
					taobaoService.save(ba);
				}
			} catch (Exception e) {
				e.printStackTrace();
				FileWriter fw;
				try {
					fw = new FileWriter(EnvManager.getApachePath()
							+ File.separator + "baerror.txt", true);

					BufferedWriter bw = new BufferedWriter(fw);
					bw.write(i);
					bw.newLine();
					bw.flush();
					bw.close();
					fw.close();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
			try {
				Thread.sleep(500);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}

	}

	@RequestMapping(value = "/mama/channel", method = RequestMethod.GET)
	public void parseMaMaChannel(HttpServletRequest request,
			HttpServletResponse response) {
		try {
			Parser parser = new Parser(
					"http://taoke.alimama.com/channels_list.htm");
			Node main = parser.extractAllNodesThatMatch(
					new HasAttributeFilter("class", "main-wrap")).elementAt(0);
			NodeList mainChilds = main.getChildren();
			Node ul = mainChilds.extractAllNodesThatMatch(
					new HasAttributeFilter("class", "J_scrollI_list"), true)
					.elementAt(0);
			NodeList content = mainChilds.extractAllNodesThatMatch(
					new HasAttributeFilter("class", "channel_body"), true);

			NodeList li = ul.getChildren().extractAllNodesThatMatch(
					new TagNameFilter("li"));
			System.out.println("节点数量:" + li.size());
			for (int i = 0; i < li.size(); i++) {
				Node node = li.elementAt(i);
				NodeList childs = node.getChildren();
				ImageTag img = (ImageTag) childs.extractAllNodesThatMatch(
						new TagNameFilter("img"), true).elementAt(0);
				String pic = img.getAttribute("src");
				LinkTag a = (LinkTag) childs.extractAllNodesThatMatch(
						new TagNameFilter("a"), true).elementAt(0);
				String name = a.getLinkText();
				String clickUrl = a.getLink();
				String eventId = clickUrl.split("eventid=")[1];
				String value = clickUrl.substring(
						clickUrl.indexOf("channel/") + 8, clickUrl
								.indexOf(".htm"));
				ImageTag bigImg = (ImageTag) content
						.extractAllNodesThatMatch(
								new HasAttributeFilter("id", "channel_body_"
										+ eventId)).elementAt(0).getChildren()
						.extractAllNodesThatMatch(new TagNameFilter("img"),
								true).elementAt(0);
				String bigPic = bigImg.getImageURL();
				System.out.println("[pic=" + pic + ",name=" + name + ",value="
						+ value + ",eventid=" + eventId + ",clickurl="
						+ clickUrl + ",bigpic=" + bigPic + "]");
				Channel channel = taobaoService.findByCriterion(Channel.class,
						R.eq("eventId", Integer.parseInt(eventId)));
				if (channel == null) {
					channel = new Channel();
					channel.setName(name);
					channel.setBigPic(bigPic);
					channel.setClickUrl(clickUrl);
					channel.setEventId(Integer.parseInt(eventId));
					channel.setPic(pic);
					channel.setSortOrder(i);
					channel.setValue(value);
					taobaoService.save(channel);
				} else {
					channel.setName(name);
					channel.setBigPic(bigPic);
					channel.setClickUrl(clickUrl);
					channel.setPic(pic);
					channel.setSortOrder(i);
					channel.setValue(value);
					taobaoService.update(channel);
				}
			}
			List<Channel> channels = taobaoService.loadAll(Channel.class);
			if (channels != null && channels.size() > 0) {
				String s = "var channels={";
				Boolean isFirst = true;
				for (Channel c : channels) {
					if (isFirst) {
						isFirst = false;
					} else {
						s += ",";
					}
					s += "'" + c.getValue() + "':{";
					s += "name:'" + c.getName() + "',";
					s += "value:'" + c.getValue() + "',";
					s += "pic:'" + c.getPic() + "',";
					s += "bigPic:'" + c.getBigPic() + "',";
					s += "height:" + c.getHeight() + ",";
					s += "clickUrl:'" + c.getClickUrl() + "'";
					s += "}";
				}
				System.out.println(s + "}");
			}

		} catch (ParserException e) {
			e.printStackTrace();
		}
	}

	private void getTopics(ActivityType at) {
		if (at != null) {
			Integer count = at.getCount();
			Integer pageSize = 1;
			if (count > 1000) {
				pageSize = count / 1000;
				if (count % 1000 > 0) {
					pageSize++;
				}
			}
			for (int i = 0; i < pageSize; i++) {
				try {
					Parser parser = new Parser(
							"http://taoke.alimama.com/activity_list.htm?topicType=0&category="
									+ at.getName() + "&toPage=" + (i + 1)
									+ "&perPageSize=1000");
					PrototypicalNodeFactory factory = new PrototypicalNodeFactory();
					factory.registerTag(new StrongTag());
					parser.setNodeFactory(factory);
					Node ul = parser.extractAllNodesThatMatch(
							new HasAttributeFilter("class", "J_scrollI_list"))
							.elementAt(0);
					NodeList lis = ul.getChildren().extractAllNodesThatMatch(
							new TagNameFilter("li"));
					for (int j = 0; j < lis.size(); j++) {
						Node li = lis.elementAt(j);
						NodeList childs = li.getChildren();
						ImageTag img = (ImageTag) childs
								.extractAllNodesThatMatch(
										new TagNameFilter("img"), true)
								.elementAt(0);
						String link = img.getAttribute("alt");
						String id = link.split("eventid=")[1];
						Node node = childs
								.extractAllNodesThatMatch(
										new HasAttributeFilter("class",
												"activity_desc"), true)
								.elementAt(0);
						String name = StringUtils
								.trim(node.toPlainTextString());
						String image = img.getImageURL();

						Activity ac = taobaoService.findByCriterion(
								Activity.class, R.eq("eventId", id));
						if (ac == null) {
							ac = new Activity();
							ac.setType(at);
							ac.setEventId(id);
							ac.setClickUrl(link.replace("mm_10011550_0_0",
									"{pid}"));
							ac.setPicUrl(image);
							ac.setTitle(name);
							taobaoService.save(ac);
						}
					}
				} catch (ParserException e) {
					e.printStackTrace();
				}
			}
		}
	}

	public void setTaobaoService(ITaobaoService taobaoService) {
		this.taobaoService = taobaoService;
	}

	public ITaobaoService getTaobaoService() {
		return taobaoService;
	}

}
