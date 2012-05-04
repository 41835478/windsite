package com.wind.site.command.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.logging.Logger;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.taobao.api.domain.Item;
import com.taobao.api.domain.TaobaokeItemDetail;
import com.taobao.api.domain.TradeRate;
import com.taobao.api.request.TaobaokeItemsDetailGetRequest;
import com.taobao.api.response.TaobaokeItemsDetailGetResponse;
import com.taobao.api.response.TraderatesSearchResponse;
import com.wind.site.command.CommandExecutor;
import com.wind.site.command.ICommand;
import com.wind.site.env.EnvManager;
import com.wind.site.model.ItemCacheLog;
import com.wind.site.service.ICommandService;
import com.wind.site.service.IPageService;
import com.wind.site.util.TaobaoFetchUtil;

/**
 * 静态化商品详情页
 * 
 * @author fxy
 * 
 */
public class ItemDetailCommand implements ICommand {
	private static final Logger logger = Logger
			.getLogger(ItemDetailCommand.class.getName());
	/**
	 * Freemarker 环境
	 */
	protected FreeMarkerConfigurer fcg;
	/**
	 * 新版本
	 */
	protected IPageService pageService;
	/**
	 * 商品
	 */
	private TaobaokeItemDetail detail;
	/**
	 * 商品NUMIID
	 */
	private Long numIid;

	@Override
	public void execute(ICommandService service) {
		if (detail == null) {// 如果未设置商品
			TaobaokeItemsDetailGetRequest getRequest = new TaobaokeItemsDetailGetRequest();
			getRequest.setNick("fxy060608");// 昵称
			getRequest.setFields(TaobaoFetchUtil.DETAIL_FIELDS);
			getRequest.setOuterCode(EnvManager.getItemsOuterCode());
			getRequest.setNumIids(numIid + "");
			TaobaokeItemsDetailGetResponse getResponse = TaobaoFetchUtil
					.getItemsDetail(null, getRequest);
			if (getResponse == null) {
				return;
			}
			List<TaobaokeItemDetail> itemList = getResponse
					.getTaobaokeItemDetails();
			if (itemList == null || itemList.size() != 1) {
				return;
			}
			detail = itemList.get(0);// 单个商品
		}
		try {
			deployItemDetailMeta();
			deployItemAndComments();
			Item item = detail.getItem();
			// 记录日志
			ItemCacheLog log = pageService.get(ItemCacheLog.class, item
					.getNumIid());
			if (log == null) {
				log = new ItemCacheLog();
				log.setDeploy(new Date());
				log.setId(item.getNumIid());
				log.setTotalHits(1L);
				log.setHits(1L);
			} else {
				log.setDeploy(new Date());
			}
			CopyOnWriteArraySet<ItemCacheLog> itemLogs = CommandExecutor
					.getItemlogs();
			itemLogs.add(log);// 加入缓存
			if (itemLogs.size() >= 1000) {// 超过1000，刷新至数据库
				logger.info("itemlogs[" + itemLogs.size() + "] is starting...");
				pageService.saveOrUpdateItemLog(itemLogs);
				logger.info("itemlogs[" + itemLogs.size() + "] is ended...");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 发布商品SEO
	 */
	public void deployItemDetailMeta() {
		pageService.deployItemDetailMeta(fcg, detail);
	}

	/**
	 * 发布商品内容及评论
	 */
	public void deployItemAndComments() {
		Item item = detail.getItem();
		List<TradeRate> rates = new ArrayList<TradeRate>();
		Long totalResults = 0L;
		if (StringUtils.isNotEmpty(item.getNick())) {// 详情
			TraderatesSearchResponse response = TaobaoFetchUtil
					.traderatesSearch(item.getNumIid(), item.getNick(), 1L, 40L);
			if (response != null) {
				totalResults = response.getTotalResults();
				rates = response.getTradeRates();
			}
		}
		pageService.deployItemDetailAndComments(fcg, detail, totalResults,
				rates);
	}

	/**
	 * 发布商品详情
	 */
	public void deployItemDetail() {
		pageService.deployItemDetail(fcg, detail);
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

	public void setDetail(TaobaokeItemDetail detail) {
		this.detail = detail;
	}

	public TaobaokeItemDetail getDetail() {
		return detail;
	}

	public void setNumIid(Long numIid) {
		this.numIid = numIid;
	}

	public Long getNumIid() {
		return numIid;
	}

}
