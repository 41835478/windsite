package com.wind.site.command;

import java.util.Calendar;
import java.util.List;
import java.util.logging.Logger;

import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;
import org.hibernate.criterion.SimpleExpression;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.core.dao.Page;
import com.wind.site.command.impl.ShopDetailCommand;
import com.wind.site.model.ShopCacheLog;
import com.wind.site.service.IPageService;

public class ShopDetailDeployCommand {
	private static final Logger logger = Logger
			.getLogger(ShopDetailDeployCommand.class.getName());
	/**
	 * Freemarker 环境
	 */
	protected FreeMarkerConfigurer fcg;
	/**
	 * 新版本
	 */
	protected IPageService pageService;
	private static int count = 0;

	public void deployShopDetail() {
		deployShopDetail(false);
	}

	public void deployShopDetail(Boolean isAll) {
		logger.info("shopdetail is starting...");

		SimpleExpression filter = null;
		if (!isAll) {
			Calendar calendar = Calendar.getInstance();
			calendar.add(Calendar.DATE, -3);
			filter = R.lt("deploy", calendar.getTime());
		}
		count = 0;
		deployByPage(new Page<ShopCacheLog>(1, 1000), filter);
		logger.info("shopdetail[" + count + "] is ended...");
	}

	private void deployByPage(Page<ShopCacheLog> page, SimpleExpression filter) {
		List<ShopCacheLog> logs = pageService.findAllByCriterionAndOrder(page,
				ShopCacheLog.class, Order.asc("deploy"), filter);
		if (logs != null && logs.size() > 0) {
			logger.info("shopdetail[" + page.getPageNo() + "] is starting...");
			for (ShopCacheLog log : logs) {
				try {
					// 生成当前店铺详情相关页
					String key = "shop-" + log.getId();
					if (!CommandExecutor.getCachecommands().containsKey(key)) {// 如果不在队列中
						ShopDetailCommand command = new ShopDetailCommand();
						command.setSellerNick(log.getNick());
						command.setSid(log.getId());
						command.setFcg(fcg);
						command.setPageService(pageService);
						CommandExecutor.getCachecommands().put(key, command);
						count++;
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			logger.info("shopdetail[" + page.getPageNo() + "] is ended...");
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
