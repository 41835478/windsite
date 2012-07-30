package com.wind.site.command;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;

import com.taobao.api.domain.ArticleBizOrder;
import com.taobao.api.domain.ArticleUserSubscribe;
import com.wind.site.env.EnvManager;
import com.wind.site.model.ADBlogSystem;
import com.wind.site.model.ADPageSystem;
import com.wind.site.model.ADPlan;
import com.wind.site.model.Site;
import com.wind.site.model.SiteImpl;
import com.wind.site.model.T_UserSubscribe;
import com.wind.site.model.User;
import com.wind.site.service.IAdminService;
import com.wind.site.service.ICommandService;
import com.wind.site.util.TaobaoFetchUtil;
import com.wind.site.util.WindSiteRestUtil;

/**
 * 定时事件（刷新所有广告计划）
 * 
 * @author fxy
 * 
 */
public class AdsCommand {
	private static final Logger logger = Logger.getLogger(AdsCommand.class
			.getName());
	private IAdminService adminService;
	private ICommandService commandService;

	@SuppressWarnings("unchecked")
	public void refreshAds() {
		try {
			logger.info("IndexAds is starting........");
			refreshVersionNo();
			WindSiteRestUtil.checkWwwExpired(commandService);// 取消已过期的域名绑定
			// 检查所有计划是否有效【根据卖家订购是否在有效期内】
			List<String> nicks = (List<String>) adminService.executeNativeSql(
					"select distinct nick from w_ad_plan where isValid=1",
					new HashMap<String, Object>());
			List<String> invalids = new ArrayList<String>();
			// 获取所有无效卖家
			if (nicks != null && nicks.size() > 0) {
				for (String nick : nicks) {
					try {
						T_UserSubscribe tus = adminService.findByCriterion(
								T_UserSubscribe.class, R.eq("nick", nick));
						if (tus == null) {// 如果本地不存在订购记录
							invalids.add(nick);
							continue;
						}
						List<ArticleUserSubscribe> subs = TaobaoFetchUtil
								.vasSubscribeGet(nick,
										TaobaoFetchUtil.VAS_APPSTORE);
						Float vn = TaobaoFetchUtil.convertVersionNo(subs);
						if (vn != 3f) {
							tus.setVersionNo(vn);
							adminService.update(tus);
							invalids.add(nick);
						}

					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
			if (invalids.size() > 0) {
				for (String nick : invalids) {
					adminService.setAdPlanisInValid(nick);
				}
			}
			refreshSellerAds();
			logger.info("IndexAds is ended!");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void refreshVersionNo() {
		// 更新所有订购收费版会员
		List<T_UserSubscribe> usbs = adminService.findAllByCriterion(
				T_UserSubscribe.class, R.gt("versionNo", 1.5f));
		if (usbs.size() > 0) {
			for (T_UserSubscribe usb : usbs) {
				if (usb != null) {
					try {
						List<ArticleUserSubscribe> subs = TaobaoFetchUtil
								.vasSubscribeGet(usb.getNick(),
										TaobaoFetchUtil.VAS_APPSTORE);
						Float vn = TaobaoFetchUtil.convertVersionNo(subs);
						if (vn == 1f) {// 如果是普及版，则判断是否已付费
							ArticleBizOrder order = TaobaoFetchUtil
									.vasOrderSearchLast(usb.getNick());
							usb.setVersionNo(1f);// 预设1f;
							if (order != null) {
								Float pay = Float.valueOf(order
										.getTotalPayFee());
								if (pay > 0) {
									Float versionNo = WindSiteRestUtil
											.getNativeUsb(adminService, usb
													.getUser_id());
									if (versionNo > 1.6f) {// 本地升级
										usb.setVersionNo(versionNo);
									} else {
										usb.setVersionNo(1.6f);// 普及版（付费）
									}
								}
							}
						} else if (vn > 1f) {// 如果是返利，卖家版
							usb.setVersionNo(vn);
						} else if (vn == 0f) {// 如果未订购月租型，则查询分成型
							Float versionNo = WindSiteRestUtil.getNativeUsb(
									adminService, usb.getUser_id());
							if (versionNo > 1.5f) {
								usb.setVersionNo(versionNo);
							} else {
								usb.setVersionNo(-1f);
							}
							Site site = adminService.findByCriterion(
									Site.class, R.eq("user_id", usb
											.getUser_id()));
							if (StringUtils.isNotEmpty(site.getWww())) {
								User user = adminService.findByCriterion(
										User.class, R.eq("user_id", usb
												.getUser_id()));
								if (user.getExpired() == null) {
									user.setExpired(new Date());
									adminService.update(user);
								}
							}
						}
						adminService.update(usb);
						if (usb.getVersionNo() >= 3) {// 卖家版，校验广告计划是否无效
							List<ADPlan> plans = adminService
									.findAllByCriterion(ADPlan.class, R.eq(
											"nick", usb.getNick()));
							if (plans != null && plans.size() > 0) {
								for (ADPlan plan : plans) {
									plan.setIsValid(true);
								}
							}
							adminService.updateAll(plans);// 将所有无效卖家的广告计划设置为有效
						}
					} catch (Exception e) {// 屏蔽错误
						e.printStackTrace();
						continue;
					}
				}
			}
			adminService.reBuildFanliDomainText();
			Map<String, SiteImpl> sites = EnvManager.getSites();
			if (sites != null && sites.size() > 0) {// 清空所有站点缓存
				sites.clear();
			}
		}
	}

	public void refreshSellerAds() {
		// 清空所有投放
		adminService.deleteAll(ADPageSystem.class);
		adminService.deleteAll(ADBlogSystem.class);
		adminService.executeNativeUpdateSql(
				"update w_ad_blog_status set ads=0,isValid=0",
				new HashMap<String, Object>());
		adminService.executeNativeUpdateSql(
				"update w_ad_page_status set ads=0,isValid=0",
				new HashMap<String, Object>());
		adminService
				.executeNativeUpdateSql(
						"update w_ad_blog_status set isValid=1 where id in (select s.id from w_site s,t_usersubscribe usb where s.user_id=usb.user_id and usb.versionNo<>0)",
						new HashMap<String, Object>());
		adminService
				.executeNativeUpdateSql(
						"update w_ad_page_status set isValid=1 where id in (select p.id from w_page p,t_usersubscribe usb where p.user_id=usb.user_id and usb.versionNo<>0)",
						new HashMap<String, Object>());
		// 初始化广告投放参数
		Integer validPage = adminService.countValidPage();// 总的可供投放首页计划的单页面数
		Integer validADPlanIndex = adminService.countValidADPlan("index");// 总的有效首页计划数
		Integer validADPlanBlog = adminService.countValidADPlan("blog");// 总的有效文章广告计划数
		Integer validSite = adminService.countValidSite();// 总的可供投放文章计划的站点数
		EnvManager.setADPageLimit(validPage * 5 / (validADPlanIndex + 20));// 预计每天最多会增加20个新卖家
		EnvManager.setADBlogLimit(validSite * 5 / (validADPlanBlog + 20));
		logger.info("adPageLimit[" + EnvManager.getADPageLimit()
				+ "],adBlogLimit[" + EnvManager.getADBlogLimit() + "]");
		// 重置所有广告投放
		List<ADPlan> plans = adminService.findAllByCriterion(ADPlan.class, R
				.eq("isDefault", true), R.eq("isValid", true));
		if (plans != null && plans.size() > 0) {
			Collections.shuffle(plans);// 随机广告计划
			for (ADPlan plan : plans) {
				if (plan.getIsDefault()) {// 必须是主推
					if ("index".equals(plan.getType())) {// 首页推广
						try {
							// commandService.clearUserTemplate(plan);//清理
							commandService.adsUserTemplate(plan);// 处理首页投放
						} catch (Exception e) {
							e.printStackTrace();
						}
					} else if ("blog".equals(plan.getType())) {// 文章推广
						try {
							// commandService.clearAdsBlog(plan);//清理
							commandService.adsBlog(plan);// 处理文章投放
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}
		}
	}

	/**
	 * @return the adminService
	 */
	public IAdminService getAdminService() {
		return adminService;
	}

	/**
	 * @param adminService
	 *            the adminService to set
	 */
	public void setAdminService(IAdminService adminService) {
		this.adminService = adminService;
	}

	public void setCommandService(ICommandService commandService) {
		this.commandService = commandService;
	}

	public ICommandService getCommandService() {
		return commandService;
	}
}
