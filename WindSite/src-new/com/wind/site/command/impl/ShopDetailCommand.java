package com.wind.site.command.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.taobao.api.domain.Item;
import com.taobao.api.domain.ItemSearch;
import com.taobao.api.domain.Shop;
import com.taobao.api.domain.TaobaokeItem;
import com.taobao.api.domain.TaobaokeShop;
import com.taobao.api.request.ItemsSearchRequest;
import com.taobao.api.response.ItemsSearchResponse;
import com.wind.site.command.CommandExecutor;
import com.wind.site.command.ICommand;
import com.wind.site.model.ShopCacheLog;
import com.wind.site.service.ICommandService;
import com.wind.site.service.IPageService;
import com.wind.site.util.TaobaoFetchUtil;

/**
 * 发布店铺详情页命令
 * 
 * @author fxy
 * 
 */
public class ShopDetailCommand implements ICommand {
	/**
	 * Freemarker 环境
	 */
	protected FreeMarkerConfigurer fcg;
	/**
	 * 新版本
	 */
	protected IPageService pageService;

	private String sellerNick;

	private String pid;

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	private Long sid;

	@Override
	public void execute(ICommandService service) {
		try {
			List<TaobaokeShop> tShops = TaobaoFetchUtil.convertTaobaoShop(null,
					"fxy060608", sid + "", null);
			if (tShops != null && tShops.size() == 1) {
				TaobaokeShop tShop = tShops.get(0);
				Shop shop = TaobaoFetchUtil.getTaobaoShop(null, sellerNick);
				if (shop != null) {
					Long cid = shop.getCid();
					if (null != cid) {
						String key = "shopcat-" + cid;
						if (!CommandExecutor.getCachecommands()
								.containsKey(key)) {// 静态化当前店铺分类
							ShopCatsCommand command = new ShopCatsCommand();
							command.setCid(cid);
							command.setFcg(fcg);
							command.setPageService(pageService);
							command.setIsAll(false);
							CommandExecutor.getCachecommands()
									.put(key, command);
						}
					}
					List<TaobaokeItem> taokeItems = new ArrayList<TaobaokeItem>();
					ItemsSearchRequest itemSearchRequest = new ItemsSearchRequest();
					itemSearchRequest.setNicks(sellerNick);
					itemSearchRequest.setOrderBy("volume:desc");
					itemSearchRequest.setPageNo(1L);
					itemSearchRequest.setPageSize(20L);
					itemSearchRequest.setFields("num_iid");
					ItemsSearchResponse itemSearchResponse = TaobaoFetchUtil
							.taobaoSearchItems(null, itemSearchRequest);
					if (itemSearchResponse != null) {
						ItemSearch itemSearch = itemSearchResponse
								.getItemSearch();
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
								taokeItems = TaobaoFetchUtil.itemsConvert(null,
										numiids, sellerNick, pid);
							}
						}
					}
					deployShopDetailMeta(shop);
					deployShopAnddesc(shop, tShop, taokeItems);
					// 记录日志
					ShopCacheLog log = pageService.get(ShopCacheLog.class, sid);
					if (log == null) {
						log = new ShopCacheLog();
						log.setDeploy(new Date());
						log.setId(sid);
						log.setNick(sellerNick);
						log.setTotalHits(1L);
						log.setHits(1L);
						pageService.save(log);
					} else {
						log.setDeploy(new Date());
						pageService.update(log);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	private void deployShopDetailMeta(Shop shop) {
		pageService.deployShopDetailMeta(fcg, shop);
	}

	private void deployShopAnddesc(Shop shop, TaobaokeShop tShop,
			List<TaobaokeItem> items) {
		pageService.deployShopDetail(fcg, shop, tShop, items);
	}

	/**
	 * @return the sellerNick
	 */
	public String getSellerNick() {
		return sellerNick;
	}

	/**
	 * @param sellerNick
	 *            the sellerNick to set
	 */
	public void setSellerNick(String sellerNick) {
		this.sellerNick = sellerNick;
	}

	/**
	 * @return the sid
	 */
	public Long getSid() {
		return sid;
	}

	/**
	 * @param sid
	 *            the sid to set
	 */
	public void setSid(Long sid) {
		this.sid = sid;
	}

	/**
	 * @return the fcg
	 */
	public FreeMarkerConfigurer getFcg() {
		return fcg;
	}

	/**
	 * @param fcg
	 *            the fcg to set
	 */
	public void setFcg(FreeMarkerConfigurer fcg) {
		this.fcg = fcg;
	}

	/**
	 * @return the pageService
	 */
	public IPageService getPageService() {
		return pageService;
	}

	/**
	 * @param pageService
	 *            the pageService to set
	 */
	public void setPageService(IPageService pageService) {
		this.pageService = pageService;
	}

}
