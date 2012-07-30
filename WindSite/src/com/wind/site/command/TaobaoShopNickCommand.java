package com.wind.site.command;

import java.io.FileNotFoundException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;
import org.htmlparser.Parser;
import org.htmlparser.filters.HasAttributeFilter;
import org.htmlparser.nodes.TagNode;
import org.htmlparser.util.NodeList;
import org.htmlparser.util.ParserException;

import com.taobao.api.domain.ArticleBizOrder;
import com.taobao.api.domain.ArticleUserSubscribe;
import com.taobao.api.domain.Shop;
import com.taobao.api.request.ShopGetRequest;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.site.model.Site;
import com.wind.site.model.T_TaobaokeShop;
import com.wind.site.model.T_UserSubscribe;
import com.wind.site.model.User;
import com.wind.site.model.W_ShopFavorite;
import com.wind.site.service.IAdminService;
import com.wind.site.util.TaobaoFetchUtil;
import com.wind.site.util.WindSiteRestUtil;

/**
 * 同步店铺（根据USER_ID查找NICK）
 * 
 * @author Administrator
 * 
 */
public class TaobaoShopNickCommand {
	private static final Logger logger = Logger
			.getLogger(TaobaoShopNickCommand.class.getName());
	private IAdminService adminService;

	/**
	 * 检查当前会员版本号
	 * 
	 * @param user
	 * @param nick
	 */
	public void synVersionNo(String nick) {
		User user = adminService
				.findByCriterion(User.class, R.eq("nick", nick));
		user.setSites(adminService.findAllByCriterion(Site.class, R.eq(
				"user_id", user.getUser_id())));
		if (user != null) {// 如果尚未保存订购记录
			T_UserSubscribe tus = new T_UserSubscribe();
			tus.setUser_id(user.getUser_id());
			tus.setNick(nick);
			List<ArticleUserSubscribe> subs = TaobaoFetchUtil.vasSubscribeGet(
					nick, TaobaoFetchUtil.VAS_APPSTORE);
			Float vn = TaobaoFetchUtil.convertVersionNo(subs);
			if (vn == 1f) {// 如果是普及版，则判断是否已付费
				ArticleBizOrder order = TaobaoFetchUtil
						.vasOrderSearchLast(nick);
				tus.setVersionNo(vn);// 预设1f;
				user.setAppType("0");
				if (order != null) {
					Float pay = Float.valueOf(order.getTotalPayFee());
					if (pay > 0) {
						Float versionNo = WindSiteRestUtil.getNativeUsb(
								adminService, tus.getUser_id());
						if (versionNo > 1.6f) {// 本地升级
							tus.setVersionNo(versionNo);
						} else {
							tus.setVersionNo(1.6f);// 普及版（付费）
						}
					}
				}
				if (tus.getVersionNo() == 1f) {// 如果仍是普及版（未付费用户），则查询是否订购分成版
					Long pid = Long.valueOf(user.getPid().replaceAll("mm_", "")
							.replaceAll("_0_0", ""));
					Boolean isFC = TaobaoFetchUtil.isTaobaokeToolRelation(pid);// 获取分成型
					if (isFC) {
						user.setAppType("1");// 如果订购了分成版，则设置为分成
						tus.setVersionNo(1.5f);
					} else {
						user.setAppType("0");
						tus.setVersionNo(1f);
					}
				}
			} else if (vn > 1f) {// 如果是返利，卖家版
				user.setAppType("0");
				tus.setVersionNo(vn);
			} else if (vn == 0f) {// 如果未订购月租型，则查询分成型
				Long pid = Long.valueOf(user.getPid().replaceAll("mm_", "")
						.replaceAll("_0_0", ""));
				Boolean isFC = TaobaoFetchUtil.isTaobaokeToolRelation(pid);// 获取分成型
				if (isFC) {
					user.setAppType("1");// 如果订购了分成版，则设置为分成
					tus.setVersionNo(1.5f);
					Float versionNo = WindSiteRestUtil.getNativeUsb(
							adminService, user.getUser_id());
					if (versionNo > 1.5f) {
						user.setAppType("0");
						tus.setVersionNo(versionNo);
					}
					Site site = adminService.findByCriterion(Site.class, R.eq(
							"user_id", tus.getUser_id()));
					if (StringUtils.isNotEmpty(site.getWww())) {
						if (versionNo > 1.5f) {
							if (user.getExpired() != null) {
								user.setExpired(null);
								adminService.update(user);
							}
						} else {
							if (user.getExpired() == null) {
								user.setExpired(new Date());
								adminService.update(user);
							}
						}
					}

				} else {
					user.setAppType("0");
					tus.setVersionNo(-1f);
					Site site = adminService.findByCriterion(Site.class, R.eq(
							"user_id", tus.getUser_id()));
					if (StringUtils.isNotEmpty(site.getWww())) {
						if (user.getExpired() == null) {
							user.setExpired(new Date());
							adminService.update(user);
						}
					}
				}

			}
			adminService.save(tus);// 保存版本号
			adminService.update(user);// 保存用户版本
		}
	}

	@SuppressWarnings("unchecked")
	public void synVersion() {
		String sql = "select nick from w_user where user_id not in (select user_id from t_usersubscribe)";// 查找未同步元信息的页面
		List<String> result = (List<String>) adminService.executeNativeSql(sql,
				new HashMap<String, Object>());
		if (result != null && result.size() > 0) {
			for (String nick : result) {
				try {
					synVersionNo(nick);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	public void synNicks() {
		// synVersion();
		List<T_TaobaokeShop> shops = adminService.findAllByCriterion(
				new Page<T_TaobaokeShop>(1, 200), T_TaobaokeShop.class, R
						.isNull("nick"));
		ShopGetRequest request = new ShopGetRequest();
		request.setFields("sid,cid,pic_path,shop_score");
		if (shops != null && shops.size() > 0) {
			for (T_TaobaokeShop shop : shops) {
				if (StringUtils.isEmpty(shop.getNick())) { // 获取昵称
					try {
						Parser parser = new Parser(
								"http://rate.taobao.com/user-rate-"
										+ shop.getUserId() + ".htm");
						NodeList list = parser
								.extractAllNodesThatMatch(new HasAttributeFilter(
										"class", "J_WangWang"));
						if (list != null && list.size() > 0) {
							TagNode ww = (TagNode) list
									.elementAt(list.size() - 1);
							shop.setNick(ww.getAttribute("data-nick"));
						}
					} catch (Exception e) {
						if (e instanceof ParserException
								|| e instanceof FileNotFoundException) {
							break;
						}
						// 删除无法获取昵称的店铺
						adminService.delete(T_TaobaokeShop.class, shop
								.getUserId());
					}
				}
				if (StringUtils.isNotEmpty(shop.getNick())
						&& StringUtils.isEmpty(shop.getItemScore())) {
					request.setNick(shop.getNick());
					try {
						Shop tShop = TaobaoFetchUtil
								.getTaobaoShop("0", request);
						if (tShop != null) {
							shop.setCid(tShop.getCid());
							shop.setPicPath(tShop.getPicPath());
							shop.setSid(tShop.getSid());
							shop.setItemScore(tShop.getShopScore()
									.getItemScore());
							shop.setServiceScore(tShop.getShopScore()
									.getServiceScore());
							shop.setDeliveryScore(tShop.getShopScore()
									.getDeliveryScore());
						}
						adminService.update(shop);
					} catch (Exception e) {
						if (e instanceof SystemException) {
							if ("isv.shop-service-error:SHOP_IS_NOT_EXIST"
									.equals(((SystemException) e).getKey())
									|| "isv.invalid-parameter:user-without-shop"
											.equals(((SystemException) e)
													.getKey())) {// 店铺不存在
								adminService.deleteAll(W_ShopFavorite.class, R
										.eq("user_id", shop.getUserId()));
								logger.info(shop.getNick() + "====不存在店铺");
							}
						}
						// 删除无法转换的店铺，避免重复调用降低API成功率
						adminService.delete(T_TaobaokeShop.class, shop
								.getUserId());
					}
				} else {
					adminService.update(shop);
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

}
