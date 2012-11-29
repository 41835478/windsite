package com.wind.site.module.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;
import org.hibernate.criterion.SimpleExpression;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.taobao.api.domain.Item;
import com.taobao.api.domain.ItemSearch;
import com.taobao.api.domain.Poster;
import com.taobao.api.domain.TaobaokeItem;
import com.taobao.api.domain.TaobaokeShop;
import com.taobao.api.request.HuabaoSpecialpostersGetRequest;
import com.taobao.api.request.ItemsSearchRequest;
import com.taobao.api.request.TaobaokeItemsGetRequest;
import com.taobao.api.request.TaobaokeShopsGetRequest;
import com.taobao.api.response.HuabaoSpecialpostersGetResponse;
import com.taobao.api.response.ItemsSearchResponse;
import com.taobao.api.response.TaobaokeItemsGetResponse;
import com.taobao.api.response.TaobaokeShopsGetResponse;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.core.service.IBaseService;
import com.wind.site.env.EnvManager;
import com.wind.site.model.Channel;
import com.wind.site.model.DianPu;
import com.wind.site.model.DianPuCategory;
import com.wind.site.model.DianPuModel;
import com.wind.site.model.SiteImpl;
import com.wind.site.model.T_TaobaokeItem;
import com.wind.site.model.T_TaobaokeShop;
import com.wind.site.model.YiqifaCategory;
import com.wind.site.model.YiqifaMall;
import com.wind.site.util.TaobaoFetchUtil;
import com.wind.site.util.WindSiteRestUtil;

public class CommonMultiAdTypeInterceptor extends AbstractModuleInterceptor {

	@Override
	public String after(IBaseService service, Map<String, Object> params,
			String result) {
		return result;
	}

	@SuppressWarnings("unchecked")
	@Override
	public void before(IBaseService service, Map<String, Object> params) {
		// 解析参数
		String adType = String.valueOf(params.get("adType"));
		if ("item".equals(adType)) {// 商品
			@SuppressWarnings("unused")
			Long mId = Long.valueOf(String.valueOf(params.get("MODULEID")));
			Boolean isDesigner = (Boolean) params.get("isDesigner");
			@SuppressWarnings({ "unused" })
			String page = String.valueOf(params.get("PAGEID"));
			@SuppressWarnings("unused")
			SiteImpl impl = (SiteImpl) params.get("SITEIMPL");
			String dataType = String.valueOf(params.get("dataType"));
			String sort = String.valueOf(params.get("sort"));// 排序方式
			String itemnum = String.valueOf(params.get("itemnum"));// 显示数量
			if ("search".equals(dataType)) {// 如果是根据搜索条件
				String q = String.valueOf(params.get("q"));// 关键词
				String cid = "";
				if (params.get("cid") != null)
					cid = String.valueOf(params.get("cid"));// 所属分类
				String sprice = String.valueOf(params.get("sprice"));// 开始价格
				String eprice = String.valueOf(params.get("eprice"));// 结束价格
				String scommission = String.valueOf(params.get("scommission"));// 开始佣金比率
				String ecommission = String.valueOf(params.get("ecommission"));// 结束佣金比率
				sort = SEARCH_ORDER.get(sort);
				if (StringUtils.isEmpty(sort)) {
					sort = "default";
				}
				TaobaokeItemsGetRequest request = new TaobaokeItemsGetRequest();
				request.setFields(TaobaoFetchUtil.TAOBAOKEITEM_FIELDS);
				if (StringUtils.isNotEmpty(cid) && !"0".equals(cid))
					request.setCid(Long.valueOf(cid));
				if (!"null".equals(ecommission) && !"null".equals(scommission)) {
					try {
						Float s = Float.valueOf(scommission);
						Float e = Float.valueOf(ecommission);
						request.setEndCommissionRate((e / 100) + "");
						request.setStartCommissionRate((s / 100) + "");
					} catch (Exception e) {
					}
				}
				request.setSort(sort);
				request.setStartPrice(sprice);
				request.setEndPrice(eprice);
				request.setKeyword(q);
				request.setSort(sort);
				request.setPageNo(1L);
				request.setNick(String.valueOf(params.get("nick")));
				request.setPageSize(Long.valueOf(itemnum));
				TaobaokeItemsGetResponse response = TaobaoFetchUtil
						.searchItems(null, null, "0", request,
								String.valueOf(params.get("pid")));
				if (response != null) {// 获取商品结果并转换为本次对象
					List<T_TaobaokeItem> items = TaobaoFetchUtil
							.covertItems(response.getTaobaokeItems());
					params.put("data", items);
					if (!isDesigner) {
						try {
							/*
							 * PageUtils.createADModuleItemCommand(mId, page,
							 * impl, items);
							 */
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
				try {
					params.put("moreUrl",
							"/search?q=" + URLEncoder.encode(q, "utf-8")
									+ "&cid=" + cid + "&start_price=" + sprice
									+ "&end_price=" + eprice);
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
			} else if ("seller".equals(dataType)) {// 根据卖家
				SiteImpl siteImpl = (SiteImpl) params.get("SITEIMPL");
				String nick = String.valueOf(params.get("sellernick"));// 卖家昵称
				String q = String.valueOf(params.get("sellerq"));// 关键词
				String sprice = String.valueOf(params.get("sellersprice"));// 开始价格
				String eprice = String.valueOf(params.get("sellereprice"));// 结束价格
				ItemsSearchRequest request = new ItemsSearchRequest();
				request.setNicks(nick);
				request.setQ(q);
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
				sort = String.valueOf(params.get("sellersort"));// 排序方式
				sort = SELLER_ORDER.get(sort);
				if (StringUtils.isEmpty(sort)) {
					sort = "volume:desc";
				}
				request.setOrderBy(sort);
				request.setPageNo(1L);
				request.setPageSize(Long.valueOf(itemnum));
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
									.newItemsConvert(siteImpl.getAppKey(),
											siteImpl.getAppSecret(),
											siteImpl.getAppType(), numiids,
											siteImpl.getNick(),
											siteImpl.getPid());
							if (StringUtils.isNotEmpty(sort)
									&& taokeItems != null
									&& taokeItems.size() > 0) {// 转换后排序
								if ("volume:desc".equals(sort)) {
									Collections.sort(taokeItems,
											new ItemVolumeDescComparator());
								} else if ("price:asc".equals(sort)) {
									Collections.sort(taokeItems,
											new ItemPriceAscComparator());
								} else if ("price:desc".equals(sort)) {
									Collections.sort(taokeItems,
											new ItemPriceDescComparator());
								}
							}
							if (response != null) {// 获取商品结果并转换为本次对象
								List<T_TaobaokeItem> _items = TaobaoFetchUtil
										.covertItems(taokeItems);
								params.put("data", _items);
								if (!isDesigner) {
									try {
										/*
										 * PageUtils.createADModuleItemCommand(
										 * mId, page, impl, _items);
										 */
									} catch (Exception e) {
										e.printStackTrace();
									}
								}
							}
							try {
								params.put(
										"moreUrl",
										"/search?q="
												+ URLEncoder.encode(q, "utf-8")
												+ "&nicks="
												+ URLEncoder.encode(nick,
														"utf-8")
												+ "&start_price=" + sprice
												+ "&end_price=" + eprice);
							} catch (UnsupportedEncodingException e) {
								e.printStackTrace();
							}
						}
					}
				}

			} else if ("group".equals(dataType)) {// 根据推广组
				String gid = String.valueOf(params.get("gid"));// 推广组标识
				if (StringUtils.isNotEmpty(gid)) {
					Map<String, Object> temp = new HashMap<String, Object>();
					temp.put("gid", gid);
					temp.put("isValid", true);
					sort = GROUP_ORDER.get(sort);
					if (StringUtils.isEmpty(sort)) {
						sort = "sortOrder";
					}
					List<T_TaobaokeItem> items = service.findByHql(
							new Page<T_TaobaokeItem>(1, Integer
									.parseInt(itemnum)),
							"from T_TaobaokeItem where gid=:gid and isValid=:isValid order by "
									+ sort, temp);// 查询指定推广组的商品(排序)
					if (!isDesigner) {
						try {
							// PageUtils.createADModuleItemCommand(mId, page,
							// impl, items);
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
					params.put("itemnum", Integer.parseInt(itemnum));
					params.put("data", items);
					params.put("moreUrl", "/tgroup/" + gid + ".html");
				}
			}
		} else if ("shop".equals(adType)) {// 店铺
			SiteImpl siteImpl = (SiteImpl) params.get("SITEIMPL");
			String dataType = String.valueOf(params.get("dataType"));
			String itemnum = String.valueOf(params.get("itemnum"));// 显示数量
			if ("search".equals(dataType)) {// 如果是根据搜索条件
				String only_mall = String.valueOf(params.get("mall"));
				String cid = "";
				if (params.get("cid") != null)
					cid = String.valueOf(params.get("cid"));// 所属分类
				else
					cid = "14";// 默认女装
				String scredit = String.valueOf(params.get("scredit"));// 开始价格
				String ecredit = String.valueOf(params.get("ecredit"));// 结束价格
				String scommission = String.valueOf(params.get("scommission"));// 开始佣金比率
				String ecommission = String.valueOf(params.get("ecommission"));// 结束佣金比率

				TaobaokeShopsGetRequest shopGetRequest = new TaobaokeShopsGetRequest();
				try {
					shopGetRequest.setCid(Long.valueOf(cid));
				} catch (Exception e) {
				}
				if ("true".equals(only_mall)) {// 只查询商城
					shopGetRequest.setOnlyMall(true);
				} else {
					shopGetRequest.setOnlyMall(false);
				}
				shopGetRequest.setFields(TaobaoFetchUtil.TAOBAOKESHOP_FIELDS);
				shopGetRequest.setNick(String.valueOf(params.get("nick")));
				if (!"null".equals(ecommission) && !"null".equals(scommission)) {
					try {
						Integer s = Integer.valueOf(scommission);
						Integer e = Integer.valueOf(ecommission);
						shopGetRequest.setStartCommissionrate((s * 100) + "");
						shopGetRequest.setEndCommissionrate((e * 100) + "");
					} catch (Exception e) {
					}
				}
				if (!"null".equals(scredit)) {
					shopGetRequest.setStartCredit(scredit);
					if (!"null".equals(ecredit)) {
						shopGetRequest.setEndCredit(ecredit);
					}
				}
				shopGetRequest.setPageNo(1L);
				shopGetRequest.setPageSize(Long.valueOf(itemnum));
				TaobaokeShopsGetResponse shopGetResponse = TaobaoFetchUtil
						.shopsGet(siteImpl.getAppKey(),
								siteImpl.getAppSecret(), siteImpl.getAppType(),
								shopGetRequest,
								String.valueOf(params.get("pid")));
				if (shopGetResponse != null) {
					if (shopGetResponse.isSuccess()) {
						Long total = shopGetResponse.getTotalResults();
						if (total != null && total > 0) {
							List<TaobaokeShop> shops = shopGetResponse
									.getTaobaokeShops();
							params.put("data", shops);
							// 本地查询开始
							String uids = "";
							Boolean isFirst = true;
							for (TaobaokeShop shop : shops) {
								if (isFirst) {
									isFirst = false;
								} else {
									uids += ",";
								}
								uids += shop.getUserId();
							}
							List<T_TaobaokeShop> localList = (List<T_TaobaokeShop>) service
									.findByHql(
											"from T_TaobaokeShop where userId in ("
													+ uids + ")",
											new HashMap<String, Object>());
							Map<String, T_TaobaokeShop> local = new HashMap<String, T_TaobaokeShop>();
							if (localList != null && localList.size() > 0) {
								for (T_TaobaokeShop shop : localList) {
									local.put(shop.getUserId() + "", shop);
								}
							}
							params.put("extra", local);
							// 本地查询结束
						}
					}
				}
				params.put("moreUrl", "/shops?cid=" + cid + "&start_credit="
						+ scredit + "&end_credit=" + ecredit);
			} else if ("group".equals(dataType)) {// 根据店铺分组
				String sort = String.valueOf(params.get("sort"));// 排序方式
				String gid = String.valueOf(params.get("gid"));// 推广组标识
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
							.findByHql(
									new Page<T_TaobaokeShop>(1, Integer
											.parseInt(itemnum)), hql, temp);// 查询指定店铺分组的店铺(排序)
					params.put("itemnum", Integer.parseInt(itemnum));
					params.put("data", shops);
				}
			}
		} else if ("page".equals(adType)) {// 页面
			if (params.get("pages") != null) {
				String pages = String.valueOf(params.get("pages"));
				if (StringUtils.isNotEmpty(pages)) {
					String[] array = pages.split(",");
					Boolean isFirst = true;
					String in = "";
					for (String p : array) {
						if (isFirst) {
							isFirst = false;
						} else {
							in += ",";
						}
						in += "'" + p + "'";
					}
					String hql = "from Channel where value in (" + in + ")";
					List<Channel> channels = (List<Channel>) service.findByHql(
							hql, new HashMap<String, Object>());
					params.put("data", channels);
				}

			}
		} else if ("poster".equals(adType)) {// 画报
			if (params.get("channels") != null) {
				String channels = String.valueOf(params.get("channels"));
				if (StringUtils.isNotEmpty(channels)) {
					String type = String.valueOf(params.get("poster_type"));
					HuabaoSpecialpostersGetRequest postersGet = new HuabaoSpecialpostersGetRequest();
					postersGet.setChannelIds(channels);
					postersGet
							.setType("HOT".equals(type) ? "HOT" : "RECOMMEND");
					postersGet.setNumber(Long.valueOf(String.valueOf(params
							.get("itemnum"))));// 显示数量
					HuabaoSpecialpostersGetResponse postersResp = TaobaoFetchUtil
							.specialPostersGet(service, postersGet);
					if (postersResp != null) {
						List<Poster> posters = postersResp.getPosters();
						params.put("data", posters);
					}
				}
			}
		} else if ("dianpu".equals(adType)) {// 淘店铺
			String rootStr = String.valueOf(params.get("root"));// 一级分类
			String catStr = String.valueOf(params.get("cat"));// 二级分类
			String isMallStr = String.valueOf(params.get("isMall"));// 仅商城
			String countStr = String.valueOf(params.get("count"));// 显示数量
			List<DianPu> shops = new ArrayList<DianPu>();
			SimpleExpression isMallFilter = null, catFilter = null;
			DianPuCategory root = service.get(DianPuCategory.class,
					Long.valueOf(rootStr));// 根分类
			if (root == null) {
				SystemException.handleMessageException("指定的淘店铺一级分类不存在");
			}
			if ("true".equals(isMallStr)) {// 仅商城
				isMallFilter = R.eq("sellerCredit", "mall");
			}
			Integer count = 4;
			if (StringUtils.isNotEmpty(countStr) && !"null".equals(countStr)) {
				try {
					count = Integer.parseInt(countStr);
				} catch (Exception e) {
					count = 4;
				}
			}
			String more = "/dianpu/";
			if (StringUtils.isNotEmpty(catStr) && !"null".equals(catStr)) {// 如果指定二级分类
				catFilter = R.eq("secCat", Long.valueOf(catStr));
				DianPuCategory secCat = service.get(DianPuCategory.class,
						Long.valueOf(catStr));
				if (secCat != null) {
					more += root.getName() + "/" + secCat.getName() + ".html";
				} else {
					more += root.getName() + ".html";
				}
			} else if (StringUtils.isNotEmpty(rootStr)
					&& !"null".equals(rootStr)) {
				catFilter = R.eq("rootCat", Long.valueOf(rootStr));// 根分类
				more += root.getName() + ".html";
			}
			shops = service.findAllByCriterion(new Page<DianPu>(1, count),
					DianPu.class, catFilter, isMallFilter, R.isNotNull("sid"));
			DianPuModel model = new DianPuModel();
			model.setShops(shops);
			model.setRoot(root);
			params.put("data", model);
			params.put("moreUrl", more);// 更多链接
		} else if ("mall".equals(adType)) {// 返现商城
			String dataType = String.valueOf(params.get("dataType"));
			if ("search".equals(dataType)) {// 根据分类搜索
				String cid = String.valueOf(params.get("cid"));// 二级分类
				String countStr = String.valueOf(params.get("count"));// 显示数量
				Integer count = 4;
				if (StringUtils.isNotEmpty(countStr)
						&& !"null".equals(countStr)) {
					try {
						count = Integer.parseInt(countStr);
					} catch (Exception e) {
						count = 4;
					}
				}
				List<YiqifaCategory> cats = EnvManager.getYiqifaCats();
				Map<String, YiqifaCategory> extra = new HashMap<String, YiqifaCategory>();
				if (cats != null && cats.size() > 0) {
					for (YiqifaCategory cat : cats) {
						extra.put(cat.getId() + "", cat);
					}
				}
				List<YiqifaMall> malls = service.findAllByCriterionAndOrder(
						new Page<YiqifaMall>(1, count), YiqifaMall.class,
						Order.desc("id"), R.eq("cid", Long.valueOf(cid)),
						R.eq("isValid", true));
				params.put("data", malls);
				params.put("extra", extra);
			} else if ("custom".equals(dataType)) {// 自定义挑选
				String mallsStr = String.valueOf(params.get("malls"));// 自定义选择商城
				List<YiqifaCategory> cats = EnvManager.getYiqifaCats();
				Map<String, YiqifaCategory> extra = new HashMap<String, YiqifaCategory>();
				if (cats != null && cats.size() > 0) {
					for (YiqifaCategory cat : cats) {
						extra.put(cat.getId() + "", cat);
					}
				}
				List<Map<String, String>> data = new Gson().fromJson(mallsStr,
						new TypeToken<List<Map<String, String>>>() {
						}.getType());
				params.put("data", data);
				params.put("extra", extra);
			}
		}

	}

	/**
	 * 卖家搜索排序
	 */
	public static final Map<String, String> SELLER_ORDER = new HashMap<String, String>();
	static {
		// 默认
		SELLER_ORDER.put("1", "volume:desc");
		// 成交量从高到低
		SELLER_ORDER.put("3", "volume:desc");
		// 商品人气值
		SELLER_ORDER.put("7", "popularity:desc");
		// 价格从低到高
		SELLER_ORDER.put("5", "price:asc");
		// 价格从高到低
		SELLER_ORDER.put("6", "price:desc");
	}
	/**
	 * 淘宝客商品直接搜索排序
	 */
	public static final Map<String, String> SEARCH_ORDER = new HashMap<String, String>();
	static {
		// 默认
		SEARCH_ORDER.put("1", "default");
		// 佣金从高到低
		SEARCH_ORDER.put("2", "commissionRate_desc");
		// 成交量从高到低
		SEARCH_ORDER.put("3", "commissionNum_desc");
		// 卖家信用从高到低
		SEARCH_ORDER.put("4", "credit_desc");
		// 价格从低到高
		SEARCH_ORDER.put("5", "price_asc");
		// 价格从高到低
		SEARCH_ORDER.put("6", "price_desc");
	}
	/**
	 * 推广组排序
	 */
	public static final Map<String, String> GROUP_ORDER = new HashMap<String, String>();
	static {
		// 默认
		GROUP_ORDER.put("1", "sortOrder");
		// 佣金从高到低
		GROUP_ORDER.put("2", "commission desc");
		// 成交量从高到低
		GROUP_ORDER.put("3", "commission_num desc");
		// 卖家信用从高到低
		GROUP_ORDER.put("4", "seller_credit_score desc");
		// 价格从低到高
		GROUP_ORDER.put("5", "price asc");
		// 价格从高到低
		GROUP_ORDER.put("6", "price desc");
	}

}
