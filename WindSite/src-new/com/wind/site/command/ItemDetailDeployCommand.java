package com.wind.site.command;

import java.util.Calendar;
import java.util.List;
import java.util.logging.Logger;

import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;
import org.hibernate.criterion.SimpleExpression;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.core.dao.Page;
import com.wind.site.command.impl.ItemDetailCommand;
import com.wind.site.model.ItemCacheLog;
import com.wind.site.service.IPageService;

public class ItemDetailDeployCommand {
	private static final Logger logger = Logger
			.getLogger(ItemDetailDeployCommand.class.getName());
	/**
	 * Freemarker 环境
	 */
	protected FreeMarkerConfigurer fcg;
	/**
	 * 新版本
	 */
	protected IPageService pageService;

	private static int count = 0;

	public void deployItemDetail() {
		deployItemDetail(false);
	}

	public void deployItemDetail(Boolean isAll) {
		logger.info("itemdetail is starting...");
		SimpleExpression filter = null;
		if (!isAll) {
			Calendar calendar = Calendar.getInstance();
			calendar.add(Calendar.DATE, -3);// 三天缓存期
			filter = R.lt("deploy", calendar.getTime());
		}
		count = 0;
		deployByPage(new Page<ItemCacheLog>(1, 1000), filter);
		logger.info("itemdetail[" + count + "] is ended...");
	}

	private void deployByPage(Page<ItemCacheLog> page, SimpleExpression filter) {
		List<ItemCacheLog> logs = pageService.findAllByCriterionAndOrder(page,
				ItemCacheLog.class, Order.asc("deploy"), filter);
		if (logs != null && logs.size() > 0) {
			logger.info("itemdetail[" + page.getTotalCount() + "-"
					+ page.getPageNo() + "] is starting...");
			for (ItemCacheLog log : logs) {
				try {
					String key = "item-" + log.getId();
					if (!CommandExecutor.getCachecommands().containsKey(key)) {// 如果不在队列中
						// 生成当前商品详情相关页
						ItemDetailCommand command = new ItemDetailCommand();
						command.setNumIid(log.getId());
						command.setFcg(fcg);
						command.setPageService(pageService);
						CommandExecutor.getCachecommands().put(key, command);
						count++;
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			logger.info("itemdetail[" + page.getTotalCount() + "-"
					+ page.getPageNo() + "] is ended...");
		}
		if (page.isHasNextPage()) {
			page.setPageNo(page.getNextPage());
			deployByPage(page, filter);
		}
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
