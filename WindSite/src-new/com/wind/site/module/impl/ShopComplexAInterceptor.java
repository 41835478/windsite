package com.wind.site.module.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;

import com.taobao.api.domain.Item;
import com.taobao.api.domain.ItemSearch;
import com.taobao.api.domain.Shop;
import com.taobao.api.domain.TaobaokeItem;
import com.taobao.api.request.ItemsSearchRequest;
import com.taobao.api.response.ItemsSearchResponse;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.core.service.IBaseService;
import com.wind.site.model.SiteImpl;
import com.wind.site.model.T_Poster;
import com.wind.site.model.T_TaobaokeItem;
import com.wind.site.model.T_TaobaokeShop;
import com.wind.site.util.TaobaoFetchUtil;

public class ShopComplexAInterceptor extends AbstractModuleInterceptor {

	@Override
	public String after(IBaseService service, Map<String, Object> params,
			String result) {
		return result;
	}

	@Override
	public void before(IBaseService service, Map<String, Object> params) {
		String adType = String.valueOf(params.get("adType"));
		Boolean isDesigner = (Boolean) params.get("isDesigner");
		if ("poster".equals(adType)) {// 画报
			if (params.get("channels") != null) {// 查询本地，排序（热门，最新）
				String channels = String.valueOf(params.get("channels"));
				if (StringUtils.isNotEmpty(channels)) {
					String type = String.valueOf(params.get("poster_type"));
					List<T_Poster> posters = service
							.findAllByCriterionAndOrder(new Page<T_Poster>(1,
									28), T_Poster.class, Order.desc(type), R
									.eq("channel_id", Long.valueOf(channels)));
					params.put("data", posters);
				}
			}
		} else {// 综合
			if (params.get("dataType") != null) {
				@SuppressWarnings("unused")
				Long mId = Long.valueOf(String.valueOf(params.get("MODULEID")));
				@SuppressWarnings("unused")
				String page = String.valueOf(params.get("PAGEID"));
				String dataType = String.valueOf(params.get("dataType"));
				Map<String, Object> data = new HashMap<String, Object>();
				SiteImpl siteImpl = (SiteImpl) params.get("SITEIMPL");
				if ("search".equals(dataType)) {
					if (params.get("shopNick") != null) {
						String shopNick = String
								.valueOf(params.get("shopNick"));
						Shop shop = TaobaoFetchUtil.getTaobaoShop(siteImpl
								.getAppType(), shopNick);
						if (shop == null) {
							SystemException.handleMessageException("当前指定卖家["
									+ shopNick + "]不存在");
						}
						// 中间商品
						ItemsSearchRequest request = new ItemsSearchRequest();
						String sprice = String.valueOf(params
								.get("sellersprice"));// 开始价格
						String eprice = String.valueOf(params
								.get("sellereprice"));// 结束价格
						if (!"null".equals(sprice)) {
							try {
								request.setStartPrice(Long.valueOf(sprice));
							} catch (Exception e) {
							}
						}
						if (!"null".equals(eprice)) {
							try {
								request.setEndPrice(Long.valueOf(eprice));
							} catch (Exception e) {
							}
						}
						String sort = String.valueOf(params.get("sellersort"));// 排序方式
						sort = CommonMultiAdTypeInterceptor.SELLER_ORDER
								.get(sort);
						if (StringUtils.isEmpty(sort)) {
							sort = "volume:desc";
						}
						request.setNicks(shopNick);
						request.setOrderBy(sort);
						request.setPageNo(1L);
						request.setPageSize(19L);
						request.setFields("num_iid");
						ItemsSearchResponse response = TaobaoFetchUtil
								.taobaoSearchItems("0", request);
						if (response != null) {
							ItemSearch itemSearch = response.getItemSearch();
							if (itemSearch != null) {
								List<Item> items = itemSearch.getItems();
								if (items != null && items.size() > 0) {
									Boolean isFirst = true;
									String numiids = "";
									for (Item i : items) {
										if (isFirst) {
											isFirst = false;
										} else {
											numiids += ",";
										}
										numiids += i.getNumIid();
									}
									List<TaobaokeItem> taokeItems = TaobaoFetchUtil
											.itemsConvert(
													siteImpl.getAppType(),
													numiids, siteImpl.getNick());
									if (StringUtils.isNotEmpty(sort)
											&& taokeItems != null
											&& taokeItems.size() > 0) {// 转换后排序
										if ("volume:desc".equals(sort)) {
											Collections
													.sort(
															taokeItems,
															new ItemVolumeDescComparator());
										} else if ("price:asc".equals(sort)) {
											Collections
													.sort(
															taokeItems,
															new ItemPriceAscComparator());
										} else if ("price:desc".equals(sort)) {
											Collections
													.sort(
															taokeItems,
															new ItemPriceDescComparator());
										}
									}
									if (response != null) {// 获取商品结果并转换为本次对象
										List<T_TaobaokeItem> temp = TaobaoFetchUtil
												.covertItems(taokeItems);
										if (!isDesigner) {
											try {// 记录推广日志
												/*
												 * PageUtils
												 * .createADModuleItemCommand(
												 * mId, page, siteImpl, temp);
												 */
											} catch (Exception e) {
												e.printStackTrace();
											}
										}
										ArrayList<T_TaobaokeItem> mItems = new ArrayList<T_TaobaokeItem>();
										ArrayList<T_TaobaokeItem> rItems = new ArrayList<T_TaobaokeItem>();
										if (temp.size() == 19) {
											for (int i = 0; i < 8; i++) {
												mItems.add(temp.get(i));
											}
											for (int i = 8; i < 19; i++) {
												rItems.add(temp.get(i));
											}
										} else if (temp.size() <= 8) {
											for (T_TaobaokeItem item : temp) {
												mItems.add(item);
											}
										} else if (temp.size() > 8) {
											for (int i = 0; i < 8; i++) {
												mItems.add(temp.get(i));
											}
											for (int i = 8; i < temp.size(); i++) {
												rItems.add(temp.get(i));
											}
										}
										// 中间
										data.put("mItems", mItems);
										// 右侧
										data.put("rItems", rItems);
									}
								}
							}
						}
						// 底部店铺
						Long cid = 14L;
						if (params.get("cid") != null) {
							cid = Long.valueOf(String
									.valueOf(params.get("cid")));// 所属分类
						} else {
							cid = shop.getCid();
							if (cid == null) {
								cid = 14L;
							}
						}
						String scredit = String.valueOf(params.get("scredit"));// 开始价格
						String ecredit = String.valueOf(params.get("ecredit"));// 结束价格
						Map<String, Object> _params = new HashMap<String, Object>();
						_params.put("cid", cid);
						String hql = "from T_TaobaokeShop where cid=:cid ";
						if (!"null".equals(scredit)) {
							hql += " and sellerCredit>=" + scredit;
						}
						if (!"null".equals(ecredit)) {
							hql += " and sellerCredit<=" + ecredit;
						}
						List<T_TaobaokeShop> shops = service.findByHql(
								new Page<T_TaobaokeShop>(1, 8), hql
										+ "order by sellerCredit*1 desc",
								_params);
						data.put("shops", shops);
						if (params.get("picUrl") == null) {
							params.put("picUrl",
									"http://logo.taobao.com/shop-logo"
											+ shop.getPicPath());
						}
						params.put("picTitle", shop.getTitle());
						params.put("picHref", "/tshop/" + shop.getSid()
								+ ".html");
					}
				} else if ("custom".equals(dataType)) {
					List<T_TaobaokeItem> tempAll = new ArrayList<T_TaobaokeItem>();
					// 中间
					if (params.get("mItemsGid") != null) {
						String gid = String.valueOf(params.get("mItemsGid"));
						String sort = String.valueOf(params.get("mItemsOrder"));
						sort = CommonMultiAdTypeInterceptor.GROUP_ORDER
								.get(sort);
						if (StringUtils.isEmpty(sort)) {
							sort = "sortOrder";
						}
						Map<String, Object> _params = new HashMap<String, Object>();
						_params.put("gid", gid);
						_params.put("isValid", true);
						List<T_TaobaokeItem> items = service.findByHql(
								new Page<T_TaobaokeItem>(1, 8),
								"from T_TaobaokeItem where gid=:gid and isValid=:isValid order by "
										+ sort, _params);// 查询指定推广组的商品(排序)
						data.put("mItems", items);
						tempAll.addAll(items);
					}
					// 右侧
					if (params.get("rItemsGid") != null) {
						String gid = String.valueOf(params.get("rItemsGid"));
						String sort = String.valueOf(params.get("rItemsOrder"));
						sort = CommonMultiAdTypeInterceptor.GROUP_ORDER
								.get(sort);
						if (StringUtils.isEmpty(sort)) {
							sort = "sortOrder";
						}
						Map<String, Object> _params = new HashMap<String, Object>();
						_params.put("gid", gid);
						_params.put("isValid", true);
						List<T_TaobaokeItem> items = service.findByHql(
								new Page<T_TaobaokeItem>(1, 11),
								"from T_TaobaokeItem where gid=:gid and isValid=:isValid order by "
										+ sort, _params);// 查询指定推广组的商品(排序)
						data.put("rItems", items);
						tempAll.addAll(items);
					}
					if (!isDesigner) {
						try {// 记录推广日志
							/*
							 * PageUtils.createADModuleItemCommand(mId, page,
							 * siteImpl, tempAll);
							 */
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
					// 底部
					if (params.get("shopsGid") != null) {
						String sort = String.valueOf(params.get("shopsOrder"));// 排序方式
						String gid = String.valueOf(params.get("shopsGid"));// 推广组标识
						if (StringUtils.isNotEmpty(gid)) {
							Map<String, Object> temp = new HashMap<String, Object>();
							temp.put("gid", Long.valueOf(gid));
							temp.put("isValid", true);
							if (sort.indexOf("commissionRate") != -1) {
								sort = "commissionRate*1 desc";
							} else {
								sort = "sellerCredit*1 desc";
							}
							// 查询有效的并且已经有SID的店铺
							String hql = "select s from T_TaobaokeShop s,W_ShopFavorite sf where sf.gid=:gid and s.userId=sf.user_id and s.isValid=:isValid and s.sid is not null order by s."
									+ sort;
							List<T_TaobaokeShop> shops = (List<T_TaobaokeShop>) service
									.findByHql(new Page<T_TaobaokeShop>(1, 8),
											hql, temp);// 查询指定店铺分组的店铺(排序)
							data.put("shops", shops);
						}
					}
				}
				params.put("data", data);
			}
		}
	}
}
