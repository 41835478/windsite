package com.wind.site.command;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wind.site.delay.WindSiteDelay;
import com.wind.site.rest.taobao.TaobaoFetch;

/**
 * 定时获取今日的微购营销
 * 
 * @author fxy
 * 
 */
public class WeigouAutocronGetTimer {

	private static final Logger logger = Logger
			.getLogger(WeigouAutocronGetTimer.class.getName());
	private TaobaoFetch fetch;

	public static void main(String[] args) {

		new WeigouAutocronGetTimer().getAutocrons();
	}

	public void getAutocrons() {
		logger.info("weigou autocrons is starting");
		List<String> autoCrons = new ArrayList<String>();
		if (fetch == null) {
			fetch = new TaobaoFetch();
		}
		if (fetch != null) {
			String result = fetch.fetch(
					"http://www.xintaowang.com/map.autoCrons",
					new HashMap<String, Object>());
			if (StringUtils.isNotEmpty(result)) {
				try {
					List<Map<String, String>> users = new Gson().fromJson(
							result, new TypeToken<List<Map<String, String>>>() {
							}.getType());
					if (users.size() > 0) {
						for (Map<String, String> entry : users) {
							try {
								Long userId = Long
										.valueOf(entry.get("user_id"));
								Integer groupId = Integer.valueOf(entry
										.get("group_id"));
								// String appKey = String.valueOf(entry
								// .get("appKey"));
								// if(StringUtils.isNotEmpty(appKey)&&!appKey.equals("null"))
								String crons = entry.get("crons");
								Map<String, Integer> cronMap = new HashMap<String, Integer>();
								if (StringUtils.isNotEmpty(crons)) {
									try {
										cronMap = new Gson()
												.fromJson(
														crons,
														new TypeToken<Map<String, Integer>>() {
														}.getType());
									} catch (Exception e) {
										cronMap = new HashMap<String, Integer>();
									}
								}
								if (cronMap.size() == 0) {
									if (groupId > 4) {
										cronMap.put("xiaohua", 8);
										cronMap.put("poster", 8);
										cronMap.put("taokeItem", 8);
										cronMap.put("tv", 8);
									} else {
										cronMap.put("xiaohua", 2);
										cronMap.put("poster", 0);
										cronMap.put("taokeItem", 2);
										cronMap.put("tv", 0);
									}
								}
								// 商品推广
								autoCrons.add("weigou_" + userId + "_" + 0);
								autoCrons.add("weigou_" + userId + "_" + 1);
								// autoCrons.add("weigou_" + userId + "_" + 2);
								// autoCrons.add("weigou_" + userId + "_" + 3);
								// 非自己商品
								// autoCrons.add("weigou_" + userId + "_" + 4);
								autoCrons.add("weigou_" + userId + "_" + 5);
								// 店铺推广
								autoCrons.add("weigou_" + userId + "_" + 6);
								// 非自己店铺
								autoCrons.add("weigou_" + userId + "_" + 7);
								if (groupId != 5) {// 非淘客服务，额外增加4条
									// autoCrons.add("weigou_" + userId + "_" +
									// 8);
									// autoCrons.add("weigou_" + userId + "_" +
									// 9);
									// autoCrons
									// .add("weigou_" + userId + "_" + 10);
									autoCrons
											.add("weigou_" + userId + "_" + 11);
								}
								if (groupId > 4) {// 正式版

									Integer taokeItem = cronMap
											.get("taokeItem");
									for (int i = 500; i < (500 + taokeItem); i++) {// 500-600之间为淘客商品
										autoCrons.add("weigou_" + userId + "_"
												+ i);
									}
									Integer xiaohua = cronMap.get("xiaohua");
									for (int i = 100; i < (100 + xiaohua); i++) {// 100-200之间为笑话
										autoCrons.add("weigou_" + userId + "_"
												+ i);
									}
									Integer poster = cronMap.get("poster");
									for (int i = 200; i < (200 + poster); i++) {// 200-300之间为画报
										autoCrons.add("weigou_" + userId + "_"
												+ i);
									}
									Integer tv = cronMap.get("tv");
									for (int i = 300; i < (300 + tv); i++) {// 300-400之间为影视
										autoCrons.add("weigou_" + userId + "_"
												+ i);
									}
									Integer share = cronMap.get("share");
									for (int i = 400; i < (400 + share); i++) {// 400-500之间为影视
										autoCrons.add("weigou_" + userId + "_"
												+ i);
									}
								} else {// 免费版
									// 两个笑话
									autoCrons.add("weigou_" + userId + "_"
											+ 100);
									autoCrons.add("weigou_" + userId + "_"
											+ 101);
									autoCrons.add("weigou_" + userId + "_"
											+ 102);
									autoCrons.add("weigou_" + userId + "_"
											+ 103);
									autoCrons.add("weigou_" + userId + "_"
											+ 104);
									autoCrons.add("weigou_" + userId + "_"
											+ 105);
									// 两个淘客商品
									autoCrons.add("weigou_" + userId + "_"
											+ 500);
									autoCrons.add("weigou_" + userId + "_"
											+ 501);
								}

							} catch (Exception e) {
								e.printStackTrace();
							}
						}
						Collections.shuffle(autoCrons);
						if (autoCrons != null) {
							// 加入定时推广9-10点，12点-13点，16—18点，20—24点
							// 调整为9-14点，16-18点，20-24点
							Integer count = autoCrons.size();
							// Integer preCount = Double.valueOf(
							// Math.ceil(count / 11)).intValue();//
							// 得到每小时的发布数量（目前11个热点小时段）
							// Integer preSeconds = Double.valueOf(
							// Math.floor((11 * 3600) / count)).intValue();//
							// 得到两个微博之间的发布间隔（秒）
							// if (preSeconds <= 0) {
							// preSeconds = 1;
							// }
							// 9点-14点
							List<Integer> pre = new ArrayList<Integer>();
							pre.add(1);
							pre.add(2);
							pre.add(1);
							pre.add(1);
							Calendar calendar = Calendar.getInstance();
							calendar.set(Calendar.HOUR_OF_DAY, 9);
							calendar.set(Calendar.MINUTE, 0);
							calendar.set(Calendar.SECOND, 0);
							// for (int i = 0; i < preCount * 5; i++) {
							// String autoCron = autoCrons.get(i);
							// calendar.add(Calendar.SECOND, preSeconds);
							// WindSiteDelay.addWeigouQueue(autoCron, calendar
							// .getTime(), TimeUnit.SECONDS);//
							// // 加入超时队列(加入3小时的随机)
							// }
							// 12点-13点
							// calendar.set(Calendar.HOUR_OF_DAY, 12);
							// calendar.set(Calendar.MINUTE, 0);
							// calendar.set(Calendar.SECOND, 0);
							// for (int i = preCount; i < preCount * 2; i++) {
							// String autoCron = autoCrons.get(i);
							// calendar.add(Calendar.SECOND, preSeconds);
							// WindSiteDelay.addWeigouQueue(autoCron, calendar
							// .getTime(), TimeUnit.SECONDS);//
							// // 加入超时队列(加入3小时的随机)
							// }
							// 16—18点
							// calendar.set(Calendar.HOUR_OF_DAY, 16);
							// calendar.set(Calendar.MINUTE, 0);
							// calendar.set(Calendar.SECOND, 0);
							// for (int i = preCount * 5; i < preCount * 7; i++)
							// {
							// String autoCron = autoCrons.get(i);
							// calendar.add(Calendar.SECOND,
							// (int)(Math.random()*2)+1);
							// WindSiteDelay.addWeigouQueue(autoCron, calendar
							// .getTime(), TimeUnit.SECONDS);//
							// // 加入超时队列(加入3小时的随机)
							// }
							// 20—24点
							// calendar.set(Calendar.HOUR_OF_DAY, 9);
							// calendar.set(Calendar.MINUTE, 0);
							// calendar.set(Calendar.SECOND, 0);
							for (int i = 0; i < count; i++) {
								String autoCron = autoCrons.get(i);
								calendar.add(Calendar.SECOND, pre
										.get((int) (Math.random() * 3) + 1));// 随机获取pre里的1，2，3元素
								WindSiteDelay.addWeigouQueue(autoCron, calendar
										.getTime(), TimeUnit.SECONDS);//
								// 加入超时队列(加入3小时的随机)
							}
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		logger.info("weigou autocrons [" + autoCrons.size() + "] is ended");

	}

	public void setFetch(TaobaoFetch fetch) {
		this.fetch = fetch;
	}

	public TaobaoFetch getFetch() {
		return fetch;
	}

}
