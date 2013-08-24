package com.wind.site.util;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.apache.commons.lang.StringUtils;

import com.taobao.api.ApiException;
import com.taobao.api.Constants;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.TaobaoParser;
import com.taobao.api.TaobaoResponse;
import com.taobao.api.domain.ArticleBizOrder;
import com.taobao.api.domain.ArticleUserSubscribe;
import com.taobao.api.domain.Huabao;
import com.taobao.api.domain.HuabaoPicture;
import com.taobao.api.domain.Item;
import com.taobao.api.domain.ItemCat;
import com.taobao.api.domain.ItemProp;
import com.taobao.api.domain.Location;
import com.taobao.api.domain.Poster;
import com.taobao.api.domain.PosterGoodsInfo;
import com.taobao.api.domain.PropValue;
import com.taobao.api.domain.Shop;
import com.taobao.api.domain.TaobaokeItem;
import com.taobao.api.domain.TaobaokeItemDetail;
import com.taobao.api.domain.TaobaokePayment;
import com.taobao.api.domain.TaobaokeReport;
import com.taobao.api.domain.TaobaokeReportMember;
import com.taobao.api.domain.TaobaokeShop;
import com.taobao.api.domain.User;
import com.taobao.api.internal.parser.json.ObjectJsonParser;
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
import com.taobao.api.request.TaobaokeRebateReportGetRequest;
import com.taobao.api.request.TaobaokeShopsGetRequest;
import com.taobao.api.request.TaobaokeToolRelationRequest;
import com.taobao.api.request.UserBuyerGetRequest;
import com.taobao.api.request.UserSellerGetRequest;
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
import com.taobao.api.response.TaobaokeRebateReportGetResponse;
import com.taobao.api.response.TaobaokeShopsGetResponse;
import com.taobao.api.response.TaobaokeToolRelationResponse;
import com.taobao.api.response.UserBuyerGetResponse;
import com.taobao.api.response.UserSellerGetResponse;
import com.taobao.api.response.VasOrderSearchResponse;
import com.taobao.api.response.VasSubscribeGetResponse;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.core.service.IBaseService;
import com.wind.core.util.DateUtils;
import com.wind.site.env.EnvManager;
import com.wind.site.model.T_Poster;
import com.wind.site.model.T_PosterPicture;
import com.wind.site.model.T_TaobaoItem;
import com.wind.site.model.T_TaobaokeItem;
import com.wind.site.util.taobao.HttpRequestUtil;

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
	public static final String TAOBAOKEITEMDETAIL_FIELDS = "cid,click_url,shop_click_url,seller_credit_score,title,nick,pic_url,delist_time,price,volume,num_iid,location";
	public static final String TAOBAOITEMCATPROPVALUE_FIELDS = "cid,pid,prop_name,vid,name,name_alias,is_parent,status,sort_order,binds";
	public static final String TAOBAOITEMCATITEMPROP_FIELDS = "pid,parent_pid,parent_vid,name,is_key_prop,is_sale_prop,is_color_prop,is_enum_prop,is_input_prop,is_item_prop,must,multi,prop_values,status,sort_order,child_template,is_allow_alias";
	public static final String TAOBAOREPORT_FIELDS = "app_key,outer_code,trade_id,pay_time,pay_price,num_iid,item_title,item_num,category_id,category_name,shop_title,commission_rate,commission,seller_nick";

	public static final Integer TIMEOUT = 10000;

	public static Huabao convertHuabao(T_Poster poster) {
		Huabao huabao = new Huabao();
		huabao.setChannelId(poster.getChannel_id());
		huabao.setCoverPicUrl(poster.getCover_urls());
		huabao.setCreateDate(poster.getCreated());
		huabao.setHits(poster.getHits());
		huabao.setId(poster.getId());
		huabao.setModifiedDate(poster.getModified());
		huabao.setTag(poster.getTags());
		huabao.setTitle(poster.getTitle());
		huabao.setTitleShort(poster.getShort_title());
		huabao.setWeight(Long.valueOf(poster.getWeight()));
		return huabao;
	}

	public static HuabaoPicture convertHuabaoPicture(T_PosterPicture posterPic) {
		HuabaoPicture pic = new HuabaoPicture();
		pic.setCreateDate(posterPic.getCreated());
		pic.setModifiedDate(posterPic.getModified());
		pic.setPicId(String.valueOf(posterPic.getId()));
		pic.setPicNote(posterPic.getDescription());
		pic.setPicUrl(posterPic.getUrl());
		pic.setPosterId(posterPic.getPoster_id());
		return pic;
	}

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
				Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);

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
	// public static TraderatesSearchResponse traderatesSearch(Long numIid,
	// String sellerNick, Long pageNo, Long pageSize) {
	// TraderatesSearchRequest request = new TraderatesSearchRequest();
	// request.setNumIid(numIid);
	// request.setSellerNick(sellerNick);
	// request.setPageNo(pageNo);
	// request.setPageSize(pageSize);
	// TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
	// EnvManager.getAppKey(null), EnvManager.getSecret(null),
	// Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
	// try {
	// TraderatesSearchResponse response = client.execute(request);
	// if (response.isSuccess()) {
	// return response;
	// } else {
	// handleError(response);
	// }
	// } catch (ApiException e) {
	// SystemException.handleMessageException(e);
	// }
	// return null;
	// }

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
				Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
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
				Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
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
				Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
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
				Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
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

	public static Float convertVersionNo(List<ArticleUserSubscribe> subs,
			com.wind.site.model.User user) {
		Float versionNo = 0f;
		if (subs != null && subs.size() > 0) {// 如果收费记录不为空
			if (subs.size() == 1) {
				ArticleUserSubscribe sub = subs.get(0);
				String itemCode = sub.getItemCode();
				Date deadLine = sub.getDeadline();
				if (deadLine.after(new Date())) {// 如果有效期内
					user.setEndDate(deadLine);
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
					user.setEndDate(deadLine);
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
					user.setEndDate(deadLine);
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
					user.setEndDate(deadLine);
					if (deadLine.after(new Date())) {// 如果有效期内
						if (VAS_APPSTORE_1.equals(itemCode)) {// 普及版收费
							return 1f;// 普及版收费
						}
					}
				}
				for (ArticleUserSubscribe sub : subs) {// 查找是否有普及版
					String itemCode = sub.getItemCode();
					Date deadLine = sub.getDeadline();
					user.setEndDate(deadLine);
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
		if (tItem.getCommission() != null) {
			item.setCommission(Float.parseFloat(tItem.getCommission()));
		}
		if (tItem.getCommissionNum() != null) {
			item.setCommission_num(Integer.parseInt(tItem.getCommissionNum()));
		}
		if (tItem.getCommissionRate() != null) {
			item.setCommission_rate(Float.parseFloat(tItem.getCommissionRate()));
		}
		if (tItem.getCommissionVolume() != null) {
			item.setCommission_volume(Float.parseFloat(tItem
					.getCommissionVolume()));
		}
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
			SystemException.handleException(response.getErrorCode(), "["
					+ response.getErrorCode() + "]" + response.getMsg());
		} else {// 业务错误
			SystemException.handleException(response.getSubCode(), "["
					+ response.getSubCode() + "]" + response.getSubMsg());
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
				Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
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
			IBaseService service, HuabaoSpecialpostersGetRequest request) {
		String ids = request.getChannelIds();
		String type = request.getType();
		Long limit = request.getNumber();
		String hql = "from T_Poster where channel_id in (" + ids
				+ ") order by "
				+ ("HOT".equals(type) ? " hits desc" : " id desc ");
		List<T_Poster> posters = service.findByHql(
				new Page<T_Poster>(1, limit.intValue()), hql,
				new HashMap<String, Object>());
		List<Poster> ps = new ArrayList<Poster>();
		if (posters != null && posters.size() > 0) {
			Poster p = null;
			for (T_Poster t : posters) {
				p = new Poster();
				p.setChannelId(String.valueOf(t.getChannel_id()));
				p.setCoverUrls(t.getCover_urls());
				p.setCreated(t.getCreated());
				p.setHits(t.getHits());
				p.setId(String.valueOf(t.getId()));
				p.setModified(t.getModified());
				p.setShortTitle(t.getShort_title());
				p.setTags(t.getTags());
				p.setTitle(t.getTitle());
				p.setWeight(Long.valueOf(t.getWeight()));
				ps.add(p);
			}
		}
		HuabaoSpecialpostersGetResponse response = new HuabaoSpecialpostersGetResponse();
		response.setPosters(ps);
		return response;
	}

	/**
	 * 获取指定画报(热门，推荐，最新)
	 * 
	 * @param request
	 * @return
	 */
	// public static HuabaoSpecialpostersGetResponse specialPostersGet(
	// HuabaoSpecialpostersGetRequest request) {
	// TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
	// EnvManager.getAppKey(null), EnvManager.getSecret(null),
	// Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
	// try {
	// HuabaoSpecialpostersGetResponse response = client.execute(request);
	// if (response.isSuccess()) {
	// return response;
	// } else {
	// handleError(response);
	// }
	// } catch (ApiException e) {
	// SystemException.handleMessageException(e);
	// }
	// return null;
	// }

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
				Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
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
				Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
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
				Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
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
				Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
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
				Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
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
				Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
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

	public static ShopcatsListGetResponse shopCatsGet(String appKey,
			String appSecret, ShopcatsListGetRequest request) {
		TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
				appKey, appSecret, Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
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

	public static List<Date> getReportTimes(Date date) {
		List<Date> dates = new ArrayList<Date>();
		Calendar from = Calendar.getInstance();
		from.setTime(date);
		from.set(Calendar.HOUR_OF_DAY, 0);
		from.set(Calendar.MINUTE, 0);
		from.set(Calendar.SECOND, 0);
		for (int i = 0; i < 144; i++) {
			System.out.println(DateUtils.format(from.getTime(),
					DateUtils.yyyy_MM_DD_HH_MM_SS));
			dates.add(from.getTime());
			from.add(Calendar.MINUTE, 10);

		}
		return dates;
	}

	public static TaobaokeReport convertReport(List<TaobaokePayment> payments) {
		TaobaokeReport report = new TaobaokeReport();
		List<TaobaokeReportMember> members = new ArrayList<TaobaokeReportMember>();
		for (TaobaokePayment payment : payments) {
			TaobaokeReportMember member = new TaobaokeReportMember();
			member.setAppKey(payment.getAppKey());
			member.setCategoryId(payment.getCategoryId());
			member.setCategoryName(payment.getCategoryName());
			member.setCommission(payment.getCommission());
			member.setCommissionRate(payment.getCommissionRate());
			member.setItemNum(payment.getItemNum());
			member.setItemTitle(payment.getItemTitle());
			member.setNumIid(payment.getNumIid());
			member.setOuterCode(payment.getOuterCode());
			member.setPayPrice(payment.getPayPrice());
			member.setPayTime(payment.getPayTime());
			member.setRealPayFee(payment.getRealPayFee());
			member.setSellerNick(payment.getSellerNick());
			member.setShopTitle(payment.getShopTitle());
			member.setTradeId(payment.getTradeId());
			members.add(member);
		}
		report.setTaobaokeReportMembers(members);
		return report;
	}

	public static TaobaokeRebateReportGetResponse reportRebateGet(
			String appKey, String appSecret,
			TaobaokeRebateReportGetRequest request, String session) {

		TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
				appKey, appSecret, Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
		try {
			TaobaokeRebateReportGetResponse response = client.execute(request);
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

	public static TaobaokeShopsGetResponse shopsGet(String appKey,
			String appSecret, String appType, TaobaokeShopsGetRequest request,
			String pid) {
		if (StringUtils.isEmpty(appKey) || StringUtils.isEmpty(appSecret)
				|| "null".equals(appKey) || "null".equals(appSecret)) {
			appKey = EnvManager.getAppKey(appType);
			appSecret = EnvManager.getSecret(appType);
		}
		TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
				appKey, appSecret, Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
		try {
			request.setOuterCode(EnvManager.getShopsOuterCode());
			request.setPid(WindSiteRestUtil.getPid(pid));
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

	public static String itemDescription(String appKey, String appSecret,
			String numIids, String nick, String pid) {
		try {
			if (StringUtils.isEmpty(appKey) || StringUtils.isEmpty(appSecret)
					|| "null".equals(appKey) || "null".equals(appSecret)) {
				appKey = EnvManager.getAppKey(null);
				appSecret = EnvManager.getSecret(null);
			}
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					appKey, appSecret, Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
			TaobaokeItemsDetailGetRequest request = new TaobaokeItemsDetailGetRequest();
			request.setFields("desc");
			request.setNick(StringUtils.isNotEmpty(nick) ? nick : EnvManager
					.getUser().getNick());
			request.setPid(WindSiteRestUtil.getPid(pid));
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
					EnvManager.getAppKey(appType),
					EnvManager.getSecret(appType), Constants.FORMAT_JSON,
					TIMEOUT, TIMEOUT);
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

	public static List<TaobaokeItem> huabaoItemConvert(String appKey,
			String appSecret, String appType, String numIids, String nick,
			String pid) {
		try {
			if (StringUtils.isEmpty(appKey) || StringUtils.isEmpty(appSecret)
					|| "null".equals(appKey) || "null".equals(appSecret)) {
				appKey = EnvManager.getAppKey(appType);
				appSecret = EnvManager.getSecret(appType);
			}
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					appKey, appSecret, Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
			TaobaokeItemsConvertRequest request = new TaobaokeItemsConvertRequest();
			request.setFields("num_iid,click_url,commission,price");
			request.setNick(StringUtils.isNotEmpty(nick) ? nick : EnvManager
					.getUser().getNick());
			request.setPid(WindSiteRestUtil.getPid(pid));
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

	public static List<TaobaokeItem> itemsConvert(String numIids, String nick,
			String pid) {
		try {
			String appKey = EnvManager.getAppKey("0");
			String appSecret = EnvManager.getSecret("0");
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					appKey, appSecret, Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
			TaobaokeItemsConvertRequest request = new TaobaokeItemsConvertRequest();
			request.setFields(TaobaoFetchUtil.TAOBAOKEITEM_FIELDS);
			request.setNick(StringUtils.isNotEmpty(nick) ? nick : EnvManager
					.getUser().getNick());
			request.setPid(WindSiteRestUtil.getPid(pid));
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

	public static List<TaobaokeItem> itemsConvert(String appKey,
			String appSecret, String appType, String numIids, String nick,
			String pid) {
		try {
			if (StringUtils.isEmpty(appKey) || StringUtils.isEmpty(appSecret)
					|| "null".equals(appKey) || "null".equals(appSecret)) {
				appKey = EnvManager.getAppKey(appType);
				appSecret = EnvManager.getSecret(appType);
			}
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					appKey, appSecret, Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
			TaobaokeItemsConvertRequest request = new TaobaokeItemsConvertRequest();
			request.setFields(TaobaoFetchUtil.TAOBAOKEITEM_FIELDS);
			request.setNick(StringUtils.isNotEmpty(nick) ? nick : EnvManager
					.getUser().getNick());
			request.setPid(WindSiteRestUtil.getPid(pid));
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

	public static TaobaokeItemsDetailGetResponse getItemsDetail(String appKey,
			String appSecret, String appType, Long num_iid, String pid) {
		TaobaokeItemsDetailGetRequest request = new TaobaokeItemsDetailGetRequest();
		request.setFields(TAOBAOKEITEMDETAIL_FIELDS);
		request.setNumIids(String.valueOf(num_iid));
		request.setNick(EnvManager.getUser().getNick());
		request.setPid(WindSiteRestUtil.getPid(EnvManager.getUser().getPid()));
		return getItemsDetail(appKey, appSecret, appType, request, pid);
	}

	public static List<TaobaokeItem> items(String appKey, String appSecret,
			String appType, String num_iids, String pid) {
		TaobaokeItemsDetailGetRequest request = new TaobaokeItemsDetailGetRequest();
		request.setFields(TAOBAOKEITEMDETAIL_FIELDS);
		request.setNumIids(num_iids);
		request.setNick(EnvManager.getUser().getNick());
		request.setPid(WindSiteRestUtil.getPid(EnvManager.getUser().getPid()));
		TaobaokeItemsDetailGetResponse response = getItemsDetail(appKey,
				appSecret, appType, request, pid);
		return convertDetailToTaobaokeItem(response.getTaobaokeItemDetails());
	}

	public static TaobaokeItemsDetailGetResponse getItemsDetail(String appKey,
			String appSecret, String appType,
			TaobaokeItemsDetailGetRequest request, String pid) {
		try {
			if (StringUtils.isEmpty(appKey) || StringUtils.isEmpty(appSecret)
					|| "null".equals(appKey) || "null".equals(appSecret)) {
				appKey = EnvManager.getAppKey(appType);
				appSecret = EnvManager.getSecret(appType);
			}
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					appKey, appSecret, Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
			request.setPid(WindSiteRestUtil.getPid(pid));
			TaobaokeItemsDetailGetResponse response = client.execute(request);
			if (response.isSuccess()) {
				List<TaobaokeItemDetail> details = response
						.getTaobaokeItemDetails();
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
	public static TaobaokeItemsGetResponse searchItems(String appKey,
			String appSecret, String appType, TaobaokeItemsGetRequest request,
			String pid) {
		try {
			if (StringUtils.isEmpty(appKey) || StringUtils.isEmpty(appSecret)
					|| "null".equals(appKey) || "null".equals(appSecret)) {
				appKey = EnvManager.getAppKey(appType);
				appSecret = EnvManager.getSecret(appType);
			}
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					appKey, appSecret, Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
			Long PID = WindSiteRestUtil.getPid(pid);
			if (PID != null)
				request.setPid(String.valueOf(PID));
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
					EnvManager.getAppKey("0"), EnvManager.getSecret("0"),
					Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
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
					EnvManager.getAppKey(null), EnvManager.getSecret(null),
					Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
			UserBuyerGetRequest req = new UserBuyerGetRequest();
			req.setFields(TAOBAOUSER_FIELDS);
			UserBuyerGetResponse response = client.execute(req,
					EnvManager.getTaobaoSession());
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
					EnvManager.getAppKey(appType),
					EnvManager.getSecret(appType), Constants.FORMAT_JSON,
					TIMEOUT, TIMEOUT);
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
					Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
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
					EnvManager.getAppKey(appType),
					EnvManager.getSecret(appType), Constants.FORMAT_JSON,
					TIMEOUT, TIMEOUT);
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
					EnvManager.getAppKey(appType),
					EnvManager.getSecret(appType), Constants.FORMAT_JSON,
					TIMEOUT, TIMEOUT);
			UserSellerGetRequest req = new UserSellerGetRequest();
			req.setFields("seller_credit");
			UserSellerGetResponse response = client.execute(req,
					EnvManager.getTaobaoSession());
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

	public static List<TaobaokeShop> convertTaobaoShop(String appKey,
			String appSecret, String appType, String nick, String sids,
			String pid) {
		// try {
		// // if (StringUtils.isEmpty(appKey) || StringUtils.isEmpty(appSecret)
		// // || "null".equals(appKey) || "null".equals(appSecret)) {
		// appKey = EnvManager.getAppKey(null);
		// appSecret = EnvManager.getSecret(null);
		// // }
		// TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
		// appKey, appSecret, Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
		// TaobaokeShopsConvertRequest request = new
		// TaobaokeShopsConvertRequest();
		// request.setFields(TAOBAOKESHOP_FIELDS);
		// request.setNick(nick);
		// request.setOuterCode(EnvManager.getShopsOuterCode());
		// request.setSids(sids);
		//
		// request.setPid(WindSiteRestUtil.getPid(pid));
		// TaobaokeShopsConvertResponse response = client.execute(request);
		// if (response.isSuccess()) {
		// return response.getTaobaokeShops();
		// } else {
		// handleError(response);
		// }
		// } catch (ApiException e) {
		// SystemException.handleMessageException("淘宝请求失败,请重试:" + e);
		// }
		return new ArrayList<TaobaokeShop>();
	}

	public static List<ItemCat> getItemCats(String appType,
			ItemcatsGetRequest request) {
		try {
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					EnvManager.getAppKey(appType),
					EnvManager.getSecret(appType), Constants.FORMAT_JSON,
					TIMEOUT, TIMEOUT);
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
					EnvManager.getAppKey(appType),
					EnvManager.getSecret(appType), Constants.FORMAT_JSON,
					TIMEOUT, TIMEOUT);
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
					EnvManager.getAppKey(appType),
					EnvManager.getSecret(appType), Constants.FORMAT_JSON,
					TIMEOUT, TIMEOUT);
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

	public static String getKeyWordUrl(String appKey, String appSecret,
			String appType, TaobaokeListurlGetRequest request, String pid) {
		try {
			if (StringUtils.isEmpty(appKey) || StringUtils.isEmpty(appSecret)
					|| "null".equals(appKey) || "null".equals(appSecret)) {
				appKey = EnvManager.getAppKey(appType);
				appSecret = EnvManager.getSecret(appType);
			}
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					appKey, appSecret, Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
			request.setOuterCode(EnvManager.getKeywordsOuterCode());
			request.setPid(WindSiteRestUtil.getPid(pid));
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

	public static String getItemCatUrl(String appKey, String appSecret,
			String appType, TaobaokeCaturlGetRequest request, String pid) {
		try {
			if (StringUtils.isEmpty(appKey) || StringUtils.isEmpty(appSecret)
					|| "null".equals(appKey) || "null".equals(appSecret)) {
				appKey = EnvManager.getAppKey(appType);
				appSecret = EnvManager.getSecret(appType);
			}
			TaobaoClient client = new DefaultTaobaoClient(EnvManager.getUrl(),
					appKey, appSecret, Constants.FORMAT_JSON, TIMEOUT, TIMEOUT);
			request.setPid(WindSiteRestUtil.getPid(pid));
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

	public static Object[][] obj_array_chunk(Object[] array, int size) {
		Object[][] target = new Object[(array.length + size - 1) / size][];

		for (int i = 0; i < target.length; i++) {
			int innerArraySize = array.length - i * size >= size ? size
					: array.length - i * size;
			Object[] inner = new Object[innerArraySize];
			System.arraycopy(array, i * size, inner, 0, innerArraySize);
			target[i] = inner;
		}

		return target;
	}

	public static String[][] array_chunk(String[] array, int size) {
		String[][] target = new String[(array.length + size - 1) / size][];

		for (int i = 0; i < target.length; i++) {
			int innerArraySize = array.length - i * size >= size ? size
					: array.length - i * size;
			String[] inner = new String[innerArraySize];
			System.arraycopy(array, i * size, inner, 0, innerArraySize);
			target[i] = inner;
		}

		return target;
	}

	public static List<TaobaokeItem> newItemsConvert(String num_iids,
			String nick, String pid) {
		return newItemsConvert(EnvManager.getAppKey(null),
				EnvManager.getSecret(null), null, num_iids, nick, pid);
	}

	public static List<TaobaokeItem> newItemsConvert(String appKey,
			String appSecret, String appType, String num_iids, String nick,
			String pid) {
		// return itemsConvert(num_iids, nick, pid);
		// logger.info("nick:" + nick);
		// logger.info("pid:" + pid);
		if (StringUtils.isEmpty(appKey) || StringUtils.isEmpty(appSecret)
				|| "null".equals(appKey) || "null".equals(appSecret)) {
			appKey = EnvManager.getAppKey(appType);
			appSecret = EnvManager.getSecret(appType);
		}
		String url = "http://gw.api.taobao.com/tql/2.0/json";
		Map<String, Object> params = new HashMap<String, Object>();
		if (StringUtils.isNotEmpty(num_iids)) {
			String qls = "";
			String[][] chunkedArray = array_chunk(num_iids.split(","), 10);
			if (StringUtils.isNotEmpty(nick)) {
				nick = " and nick=" + nick;
			}
			if (StringUtils.isNotEmpty(pid) && !pid.equals("null")) {
				pid = " and pid=" + pid.replace("mm_", "").replace("_0_0", "");
			}
			for (String[] objs : chunkedArray) {
				String strs = "";
				Boolean isFirst = true;
				for (String obj : objs) {
					if (!isFirst) {
						strs += ",";
					} else {
						isFirst = false;
					}
					strs += obj;
				}
				qls += "{select "
						+ TAOBAOKEITEMDETAIL_FIELDS
						+ " from taobao.taobaoke.items.detail.get where num_iids ="
						+ strs + nick + pid + " }";
			}
			params.put("ql", qls);
			params.put("top_tql_seperator", "true");
			params.put("app_key", appKey);
			params.put("sign_method", "md5");

			byte[] result = HttpRequestUtil.sendRequestV1(url, params,
					appSecret, "post", null, "UTF-8", null, null, null);

			String rs = null;
			try {
				rs = new String(result, "utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			// logger.info(qls);
			// logger.info(rs);
			String[] rss = rs.split("\r\n");
			TaobaokeItemsDetailGetRequest request = new TaobaokeItemsDetailGetRequest();
			TaobaoParser<TaobaokeItemsDetailGetResponse> parser = new ObjectJsonParser<TaobaokeItemsDetailGetResponse>(
					request.getResponseClass());
			List<TaobaokeItemDetail> taobaokeItemDetails = new ArrayList<TaobaokeItemDetail>();
			TaobaokeItemsDetailGetResponse response;
			for (String detail : rss) {
				if (StringUtils.isNotEmpty(detail)) {
					try {
						response = parser.parse(detail);
						List<TaobaokeItemDetail> details = response
								.getTaobaokeItemDetails();
						if (details != null && details.size() > 1) {
							for (TaobaokeItemDetail d : details) {
								taobaokeItemDetails.add(d);
							}
						}
					} catch (ApiException e) {
						SystemException.handleMessageException(e);
					}
				}
			}
			return convertDetailToTaobaokeItem(taobaokeItemDetails);
		}
		return new ArrayList<TaobaokeItem>();
	}

	public static List<TaobaokeItem> convertDetailToTaobaokeItem(
			List<TaobaokeItemDetail> details) {
		List<TaobaokeItem> items = new ArrayList<TaobaokeItem>();
		if (details != null && details.size() > 0) {
			TaobaokeItem item = null;
			for (TaobaokeItemDetail detail : details) {
				Item detailItem = detail.getItem();
				item = new TaobaokeItem();
				item.setClickUrl(detail.getClickUrl());
				Location location = detailItem.getLocation();
				if (location != null)
					item.setItemLocation(location.getState() + " "
							+ location.getCity());
				item.setNick(detailItem.getNick());
				item.setNumIid(detailItem.getNumIid());
				item.setPicUrl(detailItem.getPicUrl());
				item.setPrice(detailItem.getPrice());
				item.setSellerCreditScore(detail.getSellerCreditScore());
				item.setShopClickUrl(detail.getShopClickUrl());
				item.setTitle(detailItem.getTitle());
				item.setVolume(detailItem.getVolume());
				items.add(item);
			}
		}
		return items;
	}

	public static void main(String[] args) {
		System.out.println(getReportTimes(new Date()));
		// String num_iids =
		// "16272290352,17820515411,16078842780,20226124528,15439073490,16526411341,19392072071,15678998794,16574707167,15679074799,17385691153,15474174172,17834239180,18997436570,16082317715,16129538834,20226148341,19392080537,20226100648,15678978334,16419445989,16078658537,18855152155,20226096630,20329928036,15438074853,20226188056,19401900860,20329852318,19402684118,20225936932,20919260054,17834083716,20919008887,20918968915,20919060655,20329908292";
		// List<TaobaokeItem> items = newItemsConvert("12034285",
		// "2c18a03c14736c62a0b70804618f8c45", null, num_iids, "",
		// "25170759");
		// System.out.println(items.size());
		// System.out.println(Arrays.deepToString(chunkedArray));
		// List<TaobaokeItem> items = getTaobaokeItemsBySeller("珂丝琪旗舰店",
		// "12034285", "2c18a03c14736c62a0b70804618f8c45", "", 1);
		// String str = "";
		// for (TaobaokeItem item : items) {
		// str = str + item.getNumIid() + ",";
		// }
		// System.out.println(str);
		// System.out.println(getTaobaokeItemsBySeller("珂丝琪旗舰店", "12034285",
		// "2c18a03c14736c62a0b70804618f8c45", "", 2));
		// System.out.println(getTaobaokeItemsBySeller("珂丝琪旗舰店", "12034285",
		// "2c18a03c14736c62a0b70804618f8c45", "", 3));
	}
}
