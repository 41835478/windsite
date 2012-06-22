package com.wind.site.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import org.apache.commons.lang.StringUtils;

import com.taobao.api.ApiException;
import com.taobao.api.Constants;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.TaobaoResponse;
import com.taobao.api.domain.ArticleBizOrder;
import com.taobao.api.domain.ArticleUserSubscribe;
import com.taobao.api.domain.Item;
import com.taobao.api.domain.ItemCat;
import com.taobao.api.domain.ItemProp;
import com.taobao.api.domain.PosterGoodsInfo;
import com.taobao.api.domain.PropValue;
import com.taobao.api.domain.Shop;
import com.taobao.api.domain.TaobaokeItem;
import com.taobao.api.domain.TaobaokeItemDetail;
import com.taobao.api.domain.TaobaokeShop;
import com.taobao.api.domain.User;
import com.taobao.api.request.HuabaoChannelsGetRequest;
import com.taobao.api.request.HuabaoPosterGetRequest;
import com.taobao.api.request.HuabaoPosterGoodsinfoGetRequest;
import com.taobao.api.request.HuabaoPostersGetRequest;
import com.taobao.api.request.HuabaoSpecialpostersGetRequest;
import com.taobao.api.request.ItemGetRequest;
import com.taobao.api.request.ItemcatsGetRequest;
import com.taobao.api.request.ItempropsGetRequest;
import com.taobao.api.request.ItempropvaluesGetRequest;
import com.taobao.api.request.ItemsSearchRequest;
import com.taobao.api.request.PosterPosterdetailGetRequest;
import com.taobao.api.request.PosterPostersSearchRequest;
import com.taobao.api.request.ShopGetRequest;
import com.taobao.api.request.ShopcatsListGetRequest;
import com.taobao.api.request.TaobaokeCaturlGetRequest;
import com.taobao.api.request.TaobaokeItemsConvertRequest;
import com.taobao.api.request.TaobaokeItemsDetailGetRequest;
import com.taobao.api.request.TaobaokeItemsGetRequest;
import com.taobao.api.request.TaobaokeListurlGetRequest;
import com.taobao.api.request.TaobaokeReportGetRequest;
import com.taobao.api.request.TaobaokeShopsConvertRequest;
import com.taobao.api.request.TaobaokeShopsGetRequest;
import com.taobao.api.request.TaobaokeToolRelationRequest;
import com.taobao.api.request.TraderatesSearchRequest;
import com.taobao.api.request.UserGetRequest;
import com.taobao.api.request.VasOrderSearchRequest;
import com.taobao.api.request.VasSubscribeGetRequest;
import com.taobao.api.response.HuabaoChannelsGetResponse;
import com.taobao.api.response.HuabaoPosterGetResponse;
import com.taobao.api.response.HuabaoPosterGoodsinfoGetResponse;
import com.taobao.api.response.HuabaoPostersGetResponse;
import com.taobao.api.response.HuabaoSpecialpostersGetResponse;
import com.taobao.api.response.ItemGetResponse;
import com.taobao.api.response.ItemcatsGetResponse;
import com.taobao.api.response.ItempropsGetResponse;
import com.taobao.api.response.ItempropvaluesGetResponse;
import com.taobao.api.response.ItemsSearchResponse;
import com.taobao.api.response.PosterPosterdetailGetResponse;
import com.taobao.api.response.PosterPostersSearchResponse;
import com.taobao.api.response.ShopGetResponse;
import com.taobao.api.response.ShopcatsListGetResponse;
import com.taobao.api.response.TaobaokeCaturlGetResponse;
import com.taobao.api.response.TaobaokeItemsConvertResponse;
import com.taobao.api.response.TaobaokeItemsDetailGetResponse;
import com.taobao.api.response.TaobaokeItemsGetResponse;
import com.taobao.api.response.TaobaokeListurlGetResponse;
import com.taobao.api.response.TaobaokeReportGetResponse;
import com.taobao.api.response.TaobaokeShopsConvertResponse;
import com.taobao.api.response.TaobaokeShopsGetResponse;
import com.taobao.api.response.TaobaokeToolRelationResponse;
import com.taobao.api.response.TraderatesSearchResponse;
import com.taobao.api.response.UserGetResponse;
import com.taobao.api.response.VasOrderSearchResponse;
import com.taobao.api.response.VasSubscribeGetResponse;
import com.wind.core.exception.SystemException;
import com.wind.site.env.EnvManager;
import com.wind.site.model.T_TaobaoItem;
import com.wind.site.model.T_TaobaokeItem;

/**
 * 淘宝辅助
 * 
 * @author fxy
 * 
 */
public class TaobaoFetchUtil {
	private static final Logger logger = Logger.getLogger(TaobaoFetchUtil.class
			.getName());
	public static final String VAS_APPSTORE = "appstore-10911";// 月租型收费代码
	public static final String VAS_APPSTORE_1 = "appstore-10911-1";// 普及型收费代码
	public static final String VAS_APPSTORE_2 = "appstore-10911-2";// 返利型收费代码
	public static final String VAS_APPSTORE_3 = "appstore-10911-3";// 卖家型收费代码
	public static final String VAS_APPSTORE_4 = "appstore-10911-4";// 普及版免费代码
	public static final String VAS_APPSTORE_5 = "appstore-10911-5";// 返利版独立代码
	public static final String VAS_APPSTORE_6 = "appstore-10911-6";// 卖家版独立代码
	public static final String TAOBAO_SHOPCAT_FIELDS = "cid,parent_cid,name,is_parent";
	public static final String DETAIL_FIELDS = "click_url,shop_click_url,seller_credit_score,num_iid,title,nick,cid,desc,pic_url,num,list_time,delist_time,location,price,post_fee,express_fee,ems_fee,volume,second_kill,sell_promise";
	public static final String TAOBAOKEITEM_FIELDS = "iid,title,nick,pic_url,price,click_url,commission,commission_num,commission_rate,commission_volume,num_iid,shop_click_url,seller_credit_score,item_location,volume";
	public static final String TAOBAOUSER_FIELDS = "user_id,nick,sex,buyer_credit,seller_credit,location.city,created,last_visit,birthday,type,has_more_pic,item_img_num,item_img_size,prop_img_num,prop_img_size,auto_repost,promoted_type,status,alipay_bind,consumer_protection,alipay_account,alipay_no";
	public static final String TAOBAOSHOP_FIELDS = "sid,cid,nick,title,desc,shop_score,bulletin,pic_path,created,modified";
	public static final String TAOBAOKESHOP_FIELDS = "user_id,shop_title,click_url,commission_rate,seller_credit,shop_type,total_auction,auction_count";
	public static final String TAOBAOKEITEMDETAIL_FIELDS = "cid,click_url,shop_click_url,seller_credit_score,title,nick,pic_url,delist_time,price,volume,num_iid";
	public static final String TAOBAOITEMCATPROPVALUE_FIELDS = "cid,pid,prop_name,vid,name,name_alias,is_parent,status,sort_order,binds";
	public static final String TAOBAOITEMCATITEMPROP_FIELDS = "pid,parent_pid,parent_vid,name,is_key_prop,is_sale_prop,is_color_prop,is_enum_prop,is_input_prop,is_item_prop,must,multi,prop_values,status,sort_order,child_template,is_allow_alias";
	public static final String TAOBAOREPORT_FIELDS = "app_key,outer_code,trade_id,pay_time,pay_price,num_iid,item_title,item_num,category_id,category_name,shop_title,commission_rate,commission,seller_nick";

	/**
	 * 获取订购关系
	 * 
	 * @param request
	 * @return
	 */
	public static VasSubscribeGetResponse vasSubscribeGet(
			VasSubscribeGetRequest request) {
		TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
				EnvManager.getAppKey(null), EnvManager.getSecret(null),
				Constants.FORMAT_JSON, 6000, 6000);

		try {
			VasSubscribeGetResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response;
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	/**
	 * 根据商品，卖家昵称获取评论
	 * 
	 * @param request
	 * @return
	 */
	public static TraderatesSearchResponse traderatesSearch(Long numIid,
			String sellerNick, Long pageNo, Long pageSize) {
		TraderatesSearchRequest request = new TraderatesSearchRequest();
		request.setNumIid(numIid);
		request.setSellerNick(sellerNick);
		request.setPageNo(pageNo);
		request.setPageSize(pageSize);
		TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
				EnvManager.getAppKey(null), EnvManager.getSecret(null),
				Constants.FORMAT_JSON, 6000, 6000);
		try {
			TraderatesSearchResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response;
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	/**
	 * 根据昵称，服务码获取订购关系
	 * 
	 * @param request
	 * @return
	 */
	public static List<ArticleUserSubscribe> vasSubscribeGet(String nick,
			String articleCode) {
		VasSubscribeGetRequest request = new VasSubscribeGetRequest();
		request.setNick(nick);
		request.setArticleCode(articleCode);
		TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
				EnvManager.getAppKey(null), EnvManager.getSecret(null),
				Constants.FORMAT_JSON, 6000, 6000);
		try {
			VasSubscribeGetResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response.getArticleUserSubscribes();
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	/**
	 * 根据昵称，服务码，获取普及版最近的一个订单记录
	 * 
	 * @param request
	 * @return
	 */
	public static ArticleBizOrder vasOrderSearchLast(String nick) {
		VasOrderSearchRequest request = new VasOrderSearchRequest();
		request.setNick(nick);
		request.setArticleCode(VAS_APPSTORE);
		request.setItemCode(VAS_APPSTORE_1);
		request.setEndCreated(new Date());
		request.setPageNo(1L);
		request.setPageSize(1L);
		TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
				EnvManager.getAppKey(null), EnvManager.getSecret(null),
				Constants.FORMAT_JSON, 6000, 6000);
		try {
			VasOrderSearchResponse response = client.execute(request);
			if (response.isSuccess()) {
				List<ArticleBizOrder> orders = response.getArticleBizOrders();
				if (orders != null && orders.size() == 1) {
					return orders.get(0);
				}
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	/**
	 * 获取订单记录
	 * 
	 * @param request
	 * @return
	 */
	public static VasOrderSearchResponse vasOrderSearch(
			VasOrderSearchRequest request) {
		TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
				EnvManager.getAppKey(null), EnvManager.getSecret(null),
				Constants.FORMAT_JSON, 6000, 6000);
		try {
			VasOrderSearchResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response;
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	/**
	 * 根据昵称，服务码获取所有订单记录
	 * 
	 * @param request
	 * @return
	 */
	public static List<ArticleBizOrder> vasOrderSearch(String nick,
			String articleCode, String itemCode) {
		VasOrderSearchRequest request = new VasOrderSearchRequest();
		request.setNick(nick);
		request.setArticleCode(articleCode);
		request.setItemCode(itemCode);
		TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
				EnvManager.getAppKey(null), EnvManager.getSecret(null),
				Constants.FORMAT_JSON, 6000, 6000);
		try {
			VasOrderSearchResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response.getArticleBizOrders();
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	public static Float convertVersionNo(List<ArticleUserSubscribe> subs) {
		Float versionNo = 0f;
		if (subs != null && subs.size() > 0) {// 如果收费记录不为空
			if (subs.size() == 1) {
				ArticleUserSubscribe sub = subs.get(0);
				String itemCode = sub.getItemCode();
				Date deadLine = sub.getDeadline();
				if (deadLine.after(new Date())) {// 如果有效期内
					if (VAS_APPSTORE_6.equals(itemCode)) {// 卖家版(独立)
						return 3f;// 卖家版
					} else if (VAS_APPSTORE_5.equals(itemCode)) {// 返利版(独立)
						return 2f;// 卖家版
					} else if (VAS_APPSTORE_3.equals(itemCode)) {// 卖家版
						return 3f;// 卖家版
					} else if (VAS_APPSTORE_2.equals(itemCode)) {// 返利版
						return 2f;// 返利版
					} else if (VAS_APPSTORE_1.equals(itemCode)) {// 普及版收费
						return 1f;
					} else if (VAS_APPSTORE_4.equals(itemCode)) {// 普及版免费
						return 1f;
					}
				}
			} else {
				for (ArticleUserSubscribe sub : subs) {// 查找是否有卖家版
					String itemCode = sub.getItemCode();
					Date deadLine = sub.getDeadline();
					if (deadLine.after(new Date())) {// 如果有效期内
						if (VAS_APPSTORE_3.equals(itemCode)
								|| VAS_APPSTORE_6.equals(itemCode)) {// 卖家版
							return 3f;// 卖家版
						}
					}
				}
				for (ArticleUserSubscribe sub : subs) {// 查找是否有返利版
					String itemCode = sub.getItemCode();
					Date deadLine = sub.getDeadline();
					if (deadLine.after(new Date())) {// 如果有效期内
						if (VAS_APPSTORE_2.equals(itemCode)
								|| VAS_APPSTORE_5.equals(itemCode)) {// 返利版
							return 2f;// 返利版
						}
					}
				}
				for (ArticleUserSubscribe sub : subs) {// 查找是否有普及版
					String itemCode = sub.getItemCode();
					Date deadLine = sub.getDeadline();
					if (deadLine.after(new Date())) {// 如果有效期内
						if (VAS_APPSTORE_1.equals(itemCode)) {// 普及版收费
							return 1f;// 普及版收费
						}
					}
				}
				for (ArticleUserSubscribe sub : subs) {// 查找是否有普及版
					String itemCode = sub.getItemCode();
					Date deadLine = sub.getDeadline();
					if (deadLine.after(new Date())) {// 如果有效期内
						if (VAS_APPSTORE_4.equals(itemCode)) {// 普及版免费
							return 1f;// 普及版免费
						}
					}
				}
			}
		}
		return versionNo;
	}

	public static List<T_TaobaokeItem> covertItems(List<TaobaokeItem> items) {
		List<T_TaobaokeItem> result = new ArrayList<T_TaobaokeItem>();
		if (items != null && items.size() > 0) {
			T_TaobaokeItem temp = null;
			for (TaobaokeItem item : items) {
				temp = new T_TaobaokeItem();
				convertItems(temp, item);
				result.add(temp);
			}
		}
		return result;
	}

	public static void convertItems(T_TaobaoItem item, TaobaokeItem tItem) {
		item.setIid(tItem.getIid());
		item.setClick_url(tItem.getClickUrl());
		item.setCommission(Float.parseFloat(tItem.getCommission()));
		item.setCommission_num(Integer.parseInt(tItem.getCommissionNum()));
		item.setCommission_rate(Float.parseFloat(tItem.getCommissionRate()));
		item
				.setCommission_volume(Float.parseFloat(tItem
						.getCommissionVolume()));
		item.setNick(tItem.getNick());
		item.setPic_url(tItem.getPicUrl());
		item.setPrice(Float.parseFloat(tItem.getPrice()));
		item.setTitle(tItem.getTitle());
		// 2010-5-22修订新字段
		item.setNum_iid(tItem.getNumIid());
		item.setItem_location(tItem.getItemLocation());
		item.setSeller_credit_score(tItem.getSellerCreditScore());
		item.setShop_click_url(tItem.getShopClickUrl());
		item.setVolume(tItem.getVolume());

	}

	public static void convertItems(T_TaobaokeItem oldItem, T_TaobaokeItem item) {
		oldItem.setNick(item.getNick());
		oldItem.setClick_url(item.getClick_url());
		oldItem.setCommission(item.getCommission());
		oldItem.setCommission_num(item.getCommission_num());
		oldItem.setCommission_rate(item.getCommission_rate());
		oldItem.setCommission_volume(item.getCommission_volume());
		oldItem.setPic_url(item.getPic_url());
		oldItem.setPrice(item.getPrice());
		oldItem.setTitle(item.getTitle());
		// 新淘内部
		oldItem.setGid(item.getGid());
		oldItem.setIsValid(item.getIsValid());
		oldItem.setIsRss(item.getIsRss());

		// 2010-5-22新增字段
		oldItem.setNum_iid(item.getNum_iid());
		oldItem.setItem_location(item.getItem_location());
		oldItem.setVolume(item.getVolume());
		oldItem.setShop_click_url(item.getShop_click_url());
		oldItem.setSeller_credit_score(item.getSeller_credit_score());

	}

	public static void handleError(TaobaoResponse response) {
		if (StringUtils.isEmpty(response.getSubCode())) {// 系统错误
			SystemException.handleException(response.getErrorCode(), response
					.getMsg());
		} else {// 业务错误
			SystemException.handleException(response.getSubCode(), response
					.getSubMsg());
		}
	}

	@SuppressWarnings("unused")
	private static void logError(TaobaoResponse response) {
		String code;
		String msg;
		if (StringUtils.isEmpty(response.getSubCode())) {// 系统错误
			code = response.getErrorCode();
			msg = response.getMsg();
		} else {// 业务错误
			code = response.getSubCode();
			msg = response.getSubMsg();
		}
		logger.warning("淘宝异常:" + code + "|" + msg);
	}

	/**
	 * 获取画报
	 * 
	 * @param request
	 * @return
	 */
	public static HuabaoChannelsGetResponse channelsGet(
			HuabaoChannelsGetRequest request) {
		TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
				EnvManager.getAppKey(null), EnvManager.getSecret(null),
				Constants.FORMAT_JSON, 6000, 6000);
		try {
			HuabaoChannelsGetResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response;
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	/**
	 * 获取指定画报(热门，推荐，最新)
	 * 
	 * @param request
	 * @return
	 */
	public static HuabaoSpecialpostersGetResponse specialPostersGet(
			HuabaoSpecialpostersGetRequest request) {
		TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
				EnvManager.getAppKey(null), EnvManager.getSecret(null),
				Constants.FORMAT_JSON, 6000, 6000);
		try {
			HuabaoSpecialpostersGetResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response;
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	/**
	 * 获取指定画报详情
	 * 
	 * @param request
	 * @return
	 */
	public static HuabaoPosterGetResponse posterGet(
			HuabaoPosterGetRequest request) {
		TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
				EnvManager.getAppKey(null), EnvManager.getSecret(null),
				Constants.FORMAT_JSON, 6000, 6000);
		try {
			HuabaoPosterGetResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response;
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	public static PosterPostersSearchResponse postersSearch(
			PosterPostersSearchRequest request) {
		TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
				EnvManager.getAppKey(null), EnvManager.getSecret(null),
				Constants.FORMAT_JSON, 6000, 6000);
		try {
			PosterPostersSearchResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response;
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	/**
	 * 获取指定画报详情(淘画报)
	 * 
	 * @param request
	 * @return
	 */
	public static PosterPosterdetailGetResponse posterdetailGet(
			PosterPosterdetailGetRequest request) {
		TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
				EnvManager.getAppKey(null), EnvManager.getSecret(null),
				Constants.FORMAT_JSON, 6000, 6000);
		try {
			PosterPosterdetailGetResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response;
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	/**
	 * 获取指定画报相关商品详情
	 * 
	 * @param request
	 * @return
	 */
	public static List<PosterGoodsInfo> posterGoodsinfoGet(Long posterId) {
		TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
				EnvManager.getAppKey(null), EnvManager.getSecret(null),
				Constants.FORMAT_JSON, 6000, 6000);
		try {
			HuabaoPosterGoodsinfoGetRequest request = new HuabaoPosterGoodsinfoGetRequest();
			request.setPosterId(posterId);
			HuabaoPosterGoodsinfoGetResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response.getGoodsinfolist();
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return new ArrayList<PosterGoodsInfo>();
	}

	/**
	 * 获取指定频道画报列表
	 * 
	 * @param request
	 * @return
	 */
	public static HuabaoPostersGetResponse postersGet(
			HuabaoPostersGetRequest request) {
		TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
				EnvManager.getAppKey(null), EnvManager.getSecret(null),
				Constants.FORMAT_JSON, 6000, 6000);
		try {
			HuabaoPostersGetResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response;
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	public static ShopcatsListGetResponse shopCatsGet(String appType,
			ShopcatsListGetRequest request) {
		TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
				EnvManager.getAppKey(appType), EnvManager.getSecret(appType),
				Constants.FORMAT_JSON, 6000, 6000);
		request.setFields(TAOBAO_SHOPCAT_FIELDS);
		try {
			ShopcatsListGetResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response;
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;

	}

	public static TaobaokeReportGetResponse reportGet(String appType,
			TaobaokeReportGetRequest request, String session) {
		TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
				EnvManager.getAppKey(appType), EnvManager.getSecret(appType),
				Constants.FORMAT_JSON, 6000, 6000);
		try {
			TaobaokeReportGetResponse response = client.execute(request,
					session);
			if (response.isSuccess()) {
				return response;
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	public static TaobaokeShopsGetResponse shopsGet(String appType,
			TaobaokeShopsGetRequest request) {
		TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
				EnvManager.getAppKey(appType), EnvManager.getSecret(appType),
				Constants.FORMAT_JSON, 6000, 6000);
		try {
			request.setOuterCode(EnvManager.getShopsOuterCode());
			TaobaokeShopsGetResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response;
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	public static String itemDescription(String numIids, String nick) {
		try {
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					EnvManager.getAppKey(null), EnvManager.getSecret(null),
					Constants.FORMAT_JSON, 6000, 6000);
			TaobaokeItemsDetailGetRequest request = new TaobaokeItemsDetailGetRequest();
			request.setFields("desc");
			request.setNick(StringUtils.isNotEmpty(nick) ? nick : EnvManager
					.getUser().getNick());
			request.setNumIids(numIids);
			request.setOuterCode(EnvManager.getItemsOuterCode());// 自定义输入串
			TaobaokeItemsDetailGetResponse response = client.execute(request);
			if (response.isSuccess()) {
				List<TaobaokeItemDetail> details = response
						.getTaobaokeItemDetails();
				if (details.size() == 1) {
					return details.get(0).getItem().getDesc();
				}
			}
		} catch (ApiException e) {
			return "暂无描述信息";
		}
		return "暂无描述信息";
	}

	public static Item taobaoItemGet(String appType, Long numIid) {
		try {
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					EnvManager.getAppKey(appType), EnvManager
							.getSecret(appType), Constants.FORMAT_JSON, 6000,
					6000);
			ItemGetRequest request = new ItemGetRequest();
			request.setFields("num_iid,title,nick,price,pic_url,location,num");
			request.setNumIid(numIid);
			ItemGetResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response.getItem();
			}
		} catch (ApiException e) {
			return null;
		}
		return null;
	}

	public static List<TaobaokeItem> huabaoItemConvert(String appType,
			String numIids, String nick) {
		try {
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					EnvManager.getAppKey(appType), EnvManager
							.getSecret(appType), Constants.FORMAT_JSON, 6000,
					6000);
			TaobaokeItemsConvertRequest request = new TaobaokeItemsConvertRequest();
			request.setFields("num_iid,click_url,commission,price");
			request.setNick(StringUtils.isNotEmpty(nick) ? nick : EnvManager
					.getUser().getNick());
			request.setNumIids(numIids);
			request.setOuterCode(EnvManager.getItemsOuterCode());// 自定义输入串
			TaobaokeItemsConvertResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response.getTaobaokeItems();
			}
		} catch (ApiException e) {
			return new ArrayList<TaobaokeItem>();
		}
		return new ArrayList<TaobaokeItem>();
	}

	public static List<TaobaokeItem> itemsConvert(String appType,
			String numIids, String nick) {
		try {
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					EnvManager.getAppKey(appType), EnvManager
							.getSecret(appType), Constants.FORMAT_JSON, 6000,
					6000);
			TaobaokeItemsConvertRequest request = new TaobaokeItemsConvertRequest();
			request.setFields(TaobaoFetchUtil.TAOBAOKEITEM_FIELDS);
			request.setNick(StringUtils.isNotEmpty(nick) ? nick : EnvManager
					.getUser().getNick());
			request.setNumIids(numIids);
			request.setOuterCode(EnvManager.getItemsOuterCode());// 自定义输入串
			TaobaokeItemsConvertResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response.getTaobaokeItems();
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return new ArrayList<TaobaokeItem>();
	}

	public static TaobaokeItemsDetailGetResponse getItemsDetail(String appType,
			Long num_iid) {
		TaobaokeItemsDetailGetRequest request = new TaobaokeItemsDetailGetRequest();
		request.setFields(TAOBAOKEITEMDETAIL_FIELDS);
		request.setNumIids(String.valueOf(num_iid));
		request.setNick(EnvManager.getUser().getNick());
		return getItemsDetail(appType, request);
	}

	public static TaobaokeItemsDetailGetResponse getItemsDetail(String appType,
			TaobaokeItemsDetailGetRequest request) {
		try {
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					EnvManager.getAppKey(appType), EnvManager
							.getSecret(appType), Constants.FORMAT_JSON, 6000,
					6000);
			TaobaokeItemsDetailGetResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response;
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException("淘宝请求失败,请重试:" + e);
		}
		return null;
	}

	/**
	 * 查询淘宝客商品
	 * 
	 * @param request
	 * @return
	 */
	public static TaobaokeItemsGetResponse searchItems(String appType,
			TaobaokeItemsGetRequest request) {
		try {
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					EnvManager.getAppKey(appType), EnvManager
							.getSecret(appType), Constants.FORMAT_JSON, 6000,
					6000);
			TaobaokeItemsGetResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response;
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException("淘宝请求失败,请重试:" + e);
		}
		return null;
	}

	/**
	 * 查询淘宝商品
	 * 
	 * @param request
	 * @return
	 */
	public static ItemsSearchResponse taobaoSearchItems(String appType,
			ItemsSearchRequest request) {
		try {
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					EnvManager.getAppKey(appType), EnvManager
							.getSecret(appType), Constants.FORMAT_JSON, 6000,
					6000);
			ItemsSearchResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response;
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException("淘宝请求失败,请重试：" + e);
		}
		return null;
	}

	public static User getTaobaoUser(String appType, String uid, String nick) {
		try {
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					EnvManager.getAppKey(appType), EnvManager
							.getSecret(appType), Constants.FORMAT_JSON, 6000,
					6000);
			UserGetRequest req = new UserGetRequest();
			req.setFields(TAOBAOUSER_FIELDS);
			req.setNick(nick);
			UserGetResponse response = client.execute(req, EnvManager
					.getTaobaoSession());
			if (response.isSuccess()) {
				return response.getUser();
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	public static Boolean isTaobaokeToolRelation(Long pid) {
		TaobaokeToolRelationRequest request = new TaobaokeToolRelationRequest();
		request.setPubid(pid);
		TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
				EnvManager.getAppKey("1"), EnvManager.getSecret("1"));
		try {
			TaobaokeToolRelationResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response.getToolsUser();
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return false;
	}

	public static Shop getTaobaoShop(String appType, String nick) {
		try {
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					EnvManager.getAppKey(appType), EnvManager
							.getSecret(appType), Constants.FORMAT_JSON, 6000,
					6000);
			ShopGetRequest req = new ShopGetRequest();
			req.setFields(TAOBAOSHOP_FIELDS);
			req.setNick(nick);
			ShopGetResponse response = client.execute(req);
			if (response.isSuccess()) {
				return response.getShop();
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	public static Long getTaobaoShop(String nick) {
		try {
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					EnvManager.getAppKey(null), EnvManager.getSecret(null),
					Constants.FORMAT_JSON, 6000, 6000);
			ShopGetRequest req = new ShopGetRequest();
			req.setFields("sid");
			req.setNick(nick);
			ShopGetResponse response = client.execute(req);
			if (response.isSuccess()) {
				Shop shop = response.getShop();
				if (shop != null) {
					return shop.getSid();
				}
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	public static Shop getTaobaoShop(String appType, ShopGetRequest req) {
		try {
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					EnvManager.getAppKey(appType), EnvManager
							.getSecret(appType), Constants.FORMAT_JSON, 6000,
					6000);
			ShopGetResponse response = client.execute(req);
			if (response.isSuccess()) {
				return response.getShop();
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	public static User getTaobaoShopCredit(String appType, String nick) {
		try {
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					EnvManager.getAppKey(appType), EnvManager
							.getSecret(appType), Constants.FORMAT_JSON, 6000,
					6000);
			UserGetRequest req = new UserGetRequest();
			req.setFields("seller_credit");
			req.setNick(nick);
			UserGetResponse response = client.execute(req, null);
			if (response.isSuccess()) {
				return response.getUser();
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	public static List<TaobaokeShop> convertTaobaoShop(String appType,
			String nick, String sids) {
		try {
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					EnvManager.getAppKey(appType), EnvManager
							.getSecret(appType), Constants.FORMAT_JSON, 6000,
					6000);
			TaobaokeShopsConvertRequest request = new TaobaokeShopsConvertRequest();
			request.setFields(TAOBAOKESHOP_FIELDS);
			request.setNick(nick);
			request.setOuterCode(EnvManager.getShopsOuterCode());
			request.setSids(sids);
			TaobaokeShopsConvertResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response.getTaobaokeShops();
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException("淘宝请求失败,请重试:" + e);
		}
		return null;
	}

	public static List<ItemCat> getItemCats(String appType,
			ItemcatsGetRequest request) {
		try {
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					EnvManager.getAppKey(appType), EnvManager
							.getSecret(appType), Constants.FORMAT_JSON, 6000,
					6000);
			ItemcatsGetResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response.getItemCats();
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	public static List<PropValue> getItemCatPropValues(String appType,
			ItempropvaluesGetRequest request) {
		try {
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					EnvManager.getAppKey(appType), EnvManager
							.getSecret(appType), Constants.FORMAT_JSON, 6000,
					6000);
			ItempropvaluesGetResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response.getPropValues();
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	public static List<ItemProp> getItemProps(String appType,
			ItempropsGetRequest request) {
		try {
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					EnvManager.getAppKey(appType), EnvManager
							.getSecret(appType), Constants.FORMAT_JSON, 6000,
					6000);
			ItempropsGetResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response.getItemProps();
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	public static String getKeyWordUrl(String appType,
			TaobaokeListurlGetRequest request) {
		try {
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					EnvManager.getAppKey(appType), EnvManager
							.getSecret(appType), Constants.FORMAT_JSON, 6000,
					6000);
			request.setOuterCode(EnvManager.getKeywordsOuterCode());
			TaobaokeListurlGetResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response.getTaobaokeItem().getKeywordClickUrl();
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;

	}

	public static String getItemCatUrl(String appType,
			TaobaokeCaturlGetRequest request) {
		try {
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					EnvManager.getAppKey(appType), EnvManager
							.getSecret(appType), Constants.FORMAT_JSON, 6000,
					6000);
			TaobaokeCaturlGetResponse response = client.execute(request);
			if (response.isSuccess()) {
				return response.getTaobaokeItem().getTaobaokeCatClickUrl();
			} else {
				handleError(response);
			}
		} catch (ApiException e) {
			SystemException.handleMessageException(e);
		}
		return null;

	}
}
