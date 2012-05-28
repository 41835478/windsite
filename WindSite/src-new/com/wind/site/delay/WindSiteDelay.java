package com.wind.site.delay;

import java.util.Calendar;
import java.util.Date;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.DelayQueue;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.core.util.DateUtils;
import com.wind.site.command.CommandExecutor;
import com.wind.site.command.impl.UpdateUserTemplateByTemplateCommand;
import com.wind.site.command.impl.WeigouAutoCronCommand;
import com.wind.site.freemarker.method.ModuleMethod;
import com.wind.site.rest.taobao.TaobaoFetch;
import com.wind.site.service.IPageService;

/**
 * 新淘网超时线程
 * 
 * @author fxy
 * 
 */
public class WindSiteDelay {
	private static final Logger logger = Logger.getLogger(WindSiteDelay.class
			.getName());
	public static final int DAYS = 4, DAYS_1 = 1, DAYS_2 = 2, DAYS_3 = 7,
			DAYS_4 = 10;// 不同版本超时发布
	private static ConcurrentMap<String, Date> cacheObjMap = new ConcurrentHashMap<String, Date>();
	private static DelayQueue<DelayItem<String>> pageQueue = new DelayQueue<DelayItem<String>>();

	private Thread daemonThread;

	private IPageService pageService;
	private FreeMarkerConfigurer fcg;
	private ModuleMethod moduleMethod;
	private TaobaoFetch fetch;

	public WindSiteDelay(FreeMarkerConfigurer fcg, IPageService pageService,
			ModuleMethod moduleMethod, TaobaoFetch fetch) {
		logger.info("user page delay deploy is starting...");
		Runnable daemonTask = new Runnable() {
			public void run() {
				daemonCheck();
			}
		};
		this.pageService = pageService;
		this.fcg = fcg;
		this.moduleMethod = moduleMethod;
		this.fetch = fetch;
		daemonThread = new Thread(daemonTask);
		daemonThread.setDaemon(true);
		daemonThread.setName("WindSiteDelay Daemon");
		daemonThread.start();
	}

	private void daemonCheck() {
		for (;;) {
			try {
				// 页面发布超时
				DelayItem<String> delayPage = pageQueue.take();
				if (delayPage != null) {
					String pageId = delayPage.getItem();
					if (pageId.startsWith("weigou")) {// 微购
//						logger.info("weigou[" + pageId + "] "
//								+ delayPage.getDelay(TimeUnit.SECONDS));
						WeigouAutoCronCommand command = new WeigouAutoCronCommand();
						command.setFetch(fetch);
						command.setKey(pageId);
						CommandExecutor.getWeigoucommands().putIfAbsent(pageId,
								command);
					} else {// 新淘网
						if (!CommandExecutor.getUpdatecommands().containsKey(
								"p-" + pageId)) {// 如果没有包含修改命令
							UpdateUserTemplateByTemplateCommand command = new UpdateUserTemplateByTemplateCommand();
							command.setFcg(fcg);
							command.setPageId(pageId);
							command.setModuleMethod(moduleMethod);
							command.setPageService(pageService);
							CommandExecutor.getUpdatecommands().putIfAbsent(
									"p" + pageId, command);
						}
					}
					cacheObjMap.remove(pageId);
				}
			} catch (InterruptedException e) {
				break;
			}
		}
	}

	public static int getDays(Float v) {
		if (null == v) {
			return DAYS_4;
		}
		if (v < 1.5f) {// 免费版
			return DAYS_4;
		} else if (v < 1.6f) {// 分成版
			return DAYS_3;
		} else if (v < 2.0f) {// 普及版收费
			return DAYS_2;
		} else if (v <= 3.0f) {// 卖家版/返利版
			return DAYS_1;
		}
		return DAYS_4;
	}

	// 添加微购超时对象
	public static void addWeigouQueue(String key, Date deploy, TimeUnit unit) {
		Calendar next = Calendar.getInstance();
		next.setTime(deploy);// 设置部署时间
		Calendar now = Calendar.getInstance();
		now.setTime(new Date());
		Long time = (next.getTimeInMillis() - now.getTimeInMillis()) / 1000;
		Date oldValue = cacheObjMap.put(key, next.getTime());// 设置下次发布时间
		long nanoTime = TimeUnit.NANOSECONDS.convert(time, unit);
		DelayItem<String> item = new DelayItem<String>(key, nanoTime);
		if (null != oldValue) {
			pageQueue.remove(item);
		}
		pageQueue.put(item);
		logger.info("weigou["
				+ key
				+ "] timeout["
				+ nanoTime
				+ "] wget["
				+ DateUtils.format(next.getTime(),
						DateUtils.yyyy_MM_DD_HH_MM_SS) + "]");
	}

	// 添加超时对象
	public static void addPageQueue(String pageId, Date deploy, int days,
			TimeUnit unit) {
		Calendar next = Calendar.getInstance();
		next.setTime(deploy);// 设置部署时间
		next.add(Calendar.DATE, days);// 向后滑动一个间隔
		next.add(Calendar.SECOND, new Random().nextInt(60 * 60 * 3));// 加入3小时的随机
		Calendar now = Calendar.getInstance();
		now.setTime(new Date());
		Long time = (next.getTimeInMillis() - now.getTimeInMillis()) / 1000;
		Date oldValue = cacheObjMap.put(pageId, next.getTime());// 设置下次发布时间
		long nanoTime = TimeUnit.NANOSECONDS.convert(time, unit);
		DelayItem<String> item = new DelayItem<String>(pageId, nanoTime);
		if (null != oldValue) {
			pageQueue.remove(item);
		}
		pageQueue.put(item);
		// logger.info("userpage["
		// + pageId
		// + "] timeout["
		// + nanoTime
		// + "] deploy["
		// + DateUtils.format(next.getTime(),
		// DateUtils.yyyy_MM_DD_HH_MM_SS) + "]");
	}

	public static Date getPage(String pageId) {
		return cacheObjMap.get(pageId);
	}

	/**
	 * @return the cacheObjMap
	 */
	public static ConcurrentMap<String, Date> getCacheObjMap() {
		return cacheObjMap;
	}

	/**
	 * @return the pageQueue
	 */
	public static DelayQueue<DelayItem<String>> getPageQueue() {
		return pageQueue;
	}

	/**
	 * @return the fetch
	 */
	public TaobaoFetch getFetch() {
		return fetch;
	}

	/**
	 * @param fetch
	 *            the fetch to set
	 */
	public void setFetch(TaobaoFetch fetch) {
		this.fetch = fetch;
	}

	// 测试入口函数
	public static void main(String[] args) throws Exception {

	}

}
