package com.wind.site.command.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;

import com.taobao.api.domain.TaobaokeReport;
import com.taobao.api.domain.TaobaokeReportMember;
import com.taobao.api.request.TaobaokeRebateReportGetRequest;
import com.taobao.api.response.TaobaokeRebateReportGetResponse;
import com.wind.core.exception.BaseException;
import com.wind.site.command.ICommand;
import com.wind.site.model.Site;
import com.wind.site.model.User;
import com.wind.site.service.ICommandService;
import com.wind.site.service.impl.CommandServiceImpl;
import com.wind.site.util.TaobaoFetchUtil;

public class ReportsGetCommand implements ICommand {

	public static final Long PAGE_SIZE = 100L;
	private String user_id;
	private String site_id;
	private String appType;
	private String appKey;
	private String appSecret;
	private Date start;
	private Boolean isTimer = false;

	@Override
	public void execute(ICommandService service) {
		if (user_id != null && site_id != null && start != null
				&& appKey != null) {
			Calendar from = Calendar.getInstance();
			from.setTime(start);
			from.set(Calendar.HOUR_OF_DAY, 0);
			from.set(Calendar.MINUTE, 0);
			from.set(Calendar.SECOND, 0);
			List<Date> froms = TaobaoFetchUtil.getReportTimes(from.getTime());
//			for (Date date : froms) {
//				getReportByPage(1L, date, service);
//			}
			// Calendar now = Calendar.getInstance();
			// now.setTime(new Date());
			// now.add(Calendar.DATE, 1);
			// Integer diff = now.get(Calendar.DATE) - from.get(Calendar.DATE);
			// if (diff > 90) {// 如果时间差大于90.则将开始时间移至90天前
			// from.add(Calendar.DATE, diff - 90);
			// diff = 90;
			// }
			// // 日期迭代
			// for (int i = 0; i < diff; i++) {
			// getReportByPage(1L, from, service);
			// }
		}
	}

	public void getReportByPage(Long page, Date from, ICommandService service) {
		TaobaokeRebateReportGetRequest request = new TaobaokeRebateReportGetRequest();
		request.setFields(TaobaoFetchUtil.TAOBAOREPORT_FIELDS);
		request.setStartTime(from);
		request.setSpan(600L);
		request.setPageNo(page);
		request.setPageSize(PAGE_SIZE);
		try {
			TaobaokeRebateReportGetResponse response = TaobaoFetchUtil
					.reportRebateGet(appKey, appSecret, request, null);
			if (response != null) {
				TaobaokeReport report = TaobaoFetchUtil.convertReport(response
						.getTaobaokePayments());
				if (report != null) {
					List<TaobaokeReportMember> members = report
							.getTaobaokeReportMembers();
					if (members != null && members.size() > 0) {
						for (TaobaokeReportMember member : members) {
							if (member != null) {
								String outCode = member.getOuterCode();
								if (StringUtils.isNotEmpty(outCode)
										&& outCode.startsWith("xtfl")) {// 如果推广渠道不为空，并且是新淘返利
									service.mergeReportTrade(Long
											.valueOf(outCode
													.replace("xtfl", "")),
											user_id, site_id, member);
								} else {
									service.mergeReportTrade(user_id, site_id,
											member);

								}
							}
						}
						if (members.size() == PAGE_SIZE) {
							getReportByPage(page + 1, from, service);
						}
					}
					// Long results = report.getTotalResults();
					// if (results != null && results > PAGE_SIZE) {
					// int totalPageCount = (int) (results / PAGE_SIZE);
					// if (results % PAGE_SIZE > 0) {
					// totalPageCount++;
					// }
					// if (page < totalPageCount) {// 如果当前页数小于总页数,继续同步
					// getReportByPage(page + 1, from, service);
					// }
					// }
				}
			}
		} catch (Exception exception) {
			if (isTimer != null && isTimer) {// 如果是定时抓取
				if (exception instanceof BaseException) {// 如果是本系统级错误
					BaseException e = (BaseException) exception;
					if ("27".equals(e.getKey())) {// 如果是淘宝Session超时
						User user = service.findByCriterion(User.class,
								R.eq("user_id", user_id));
						if (user != null) {// 将该用户的淘宝Session置为空
							user.setSites(service.findAllByCriterion(
									Site.class,
									R.eq("user_id", user.getUser_id())));
							user.settSession(null);
							service.update(user);
						}
					}
				}
			}
			exception.printStackTrace();
		}
		//from.add(Calendar.DATE, 1);
	}

	public static void main(String[] args) {
		String str = "10.12321434";
		System.out.println(str + "===="
				+ CommandServiceImpl.convertCommission(str));
		str = "0.23213213";
		System.out.println(str + "===="
				+ CommandServiceImpl.convertCommission(str));
		str = "14";
		System.out.println(str + "===="
				+ CommandServiceImpl.convertCommission(str));
		str = "14.02";
		System.out.println(str + "===="
				+ CommandServiceImpl.convertCommission(str));
		str = "14.0";
		System.out.println(str + "===="
				+ CommandServiceImpl.convertCommission(str));
	}

	public static List<TaobaokeReportMember> createTempReport() {
		List<TaobaokeReportMember> result = new ArrayList<TaobaokeReportMember>();
		TaobaokeReportMember member = null;
		for (int i = 0; i < 100; i++) {
			member = new TaobaokeReportMember();
			member.setAppKey("12034285");
			member.setCategoryId(Long.valueOf(i + ""));
			member.setCategoryName("精品女装" + i);
			String co = String.valueOf(i * Math.random());
			member.setCommission(co.length() > 5 ? co.substring(0, 4) : co);
			member.setCommissionRate("10");
			member.setItemNum(1L);
			member.setItemTitle("商品标题" + i);
			member.setNumIid(Long.valueOf(i + ""));
			member.setOuterCode("xtfl" + (i % 2 == 0 ? 1 : 2));
			member.setPayPrice("100." + i);
			member.setPayTime(new Date());
			member.setSellerNick("卖家" + i);
			member.setShopTitle("店铺" + i);
			member.setTradeId(Long.valueOf(i + ""));
			result.add(member);
		}
		return result;
	}

	/**
	 * @return the user_id
	 */
	public String getUser_id() {
		return user_id;
	}

	/**
	 * @param userId
	 *            the user_id to set
	 */
	public void setUser_id(String userId) {
		user_id = userId;
	}

	/**
	 * @return the site_id
	 */
	public String getSite_id() {
		return site_id;
	}

	/**
	 * @param siteId
	 *            the site_id to set
	 */
	public void setSite_id(String siteId) {
		site_id = siteId;
	}

	public void setStart(Date start) {
		this.start = start;
	}

	public Date getStart() {
		return start;
	}

	public void setIsTimer(Boolean isTimer) {
		this.isTimer = isTimer;
	}

	public Boolean getIsTimer() {
		return isTimer;
	}

	public void setAppType(String appType) {
		this.appType = appType;
	}

	public String getAppType() {
		return appType;
	}

	public String getAppKey() {
		return appKey;
	}

	public void setAppKey(String appKey) {
		this.appKey = appKey;
	}

	public String getAppSecret() {
		return appSecret;
	}

	public void setAppSecret(String appSecret) {
		this.appSecret = appSecret;
	}

}
