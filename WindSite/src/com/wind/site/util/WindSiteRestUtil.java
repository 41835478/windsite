package com.wind.site.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

import com.google.gson.JsonObject;
import com.wind.core.exception.SystemException;
import com.wind.core.service.IBaseService;
import com.wind.site.env.EnvManager;
import com.wind.site.model.Site;
import com.wind.site.model.SiteImpl;
import com.wind.site.service.IPageService;
import com.wind.site.service.ISiteService;

/**
 * RESTFUL 辅助类
 * 
 * @author fxy
 * 
 */
public class WindSiteRestUtil {

	public static final List<String> UNVALIDS = new ArrayList<String>();
	static {
		UNVALIDS.add("jiege0316");
		UNVALIDS.add("寂寞高手s");
		UNVALIDS.add("oqoq2oqoq2");
		UNVALIDS.add("花花公子4421");
		UNVALIDS.add("zhou8");
		UNVALIDS.add("kqysg");
		UNVALIDS.add("我的朔或");
		UNVALIDS.add("f0y520");
		UNVALIDS.add("ybq198309222009");
		UNVALIDS.add("一切杰杰有可能");
		UNVALIDS.add("yydyl1989love");
	}

	/**
	 * 默认成功信息
	 */
	public static final String SUCCESS = new JsonObject().toString();

	public static String getUrl(ISiteService siteService,
			Map<String, Object> result, String userId) {
		covertPID(siteService, result, userId);
		Object www = result.get("www");
		if (www != null && StringUtils.isNotEmpty((String) www)) {
			return "http://" + www + "/";
		}
		return "http://" + result.get("domainName") + ".xintaonet.com/";
	}

	public static Boolean isSysChannel(Float versionNo, String www) {
		if (null == versionNo) {
			return false;
		}
		if (versionNo >= 1.6) {// 普及版（付费）以上版本
			return true;
		} else if (versionNo == 1.5 && StringUtils.isNotEmpty(www)) {// 分成版（绑定域名）
			return true;
		}
		return false;
	}

	public static Boolean isFanli(Float versionNo, String www) {
		if (null == versionNo) {
			return false;
		}
		if (versionNo >= 2) {// 返利以上版本
			return true;
		}
		return false;
	}

	public static Boolean isFanli(Map<String, Object> result) {
		Object versionNo = result.get("versionNo");
		if (versionNo != null) {
			if ((Float) versionNo >= 2) {
				Object www = result.get("www");
				if (www != null && StringUtils.isNotEmpty((String) www)) {
					return true;
				} else {
					SystemException
							.handleMessageException("当前站点需要绑定顶级域名才可以正常使用返利版");
				}
			} else {
				SystemException.handleMessageException("当前站点尚未升级为返利版");
			}
		} else {
			SystemException.handleMessageException("当前站点站长尚未订购新淘网服务");
		}
		return false;
	}

	public static String covertSysChannelPID(IBaseService baseService,
			HttpServletRequest request, Map<String, Object> result,
			String userId) {
		if (StringUtils.isNotEmpty(userId)) {
			SiteImpl siteImpl = EnvManager.getSites().get(userId);
			if (siteImpl == null) {// 是否已缓存
				siteImpl = baseService.getSiteImplByUserId(userId);
				if (siteImpl != null) {
					if (siteImpl.getVersionNo() == null) {
						siteImpl.setVersionNo(1f);
					}
					EnvManager.getSites().put(siteImpl.getUser_id(), siteImpl);
				}
			}
			if (siteImpl != null) {
				if (isSysChannel(siteImpl.getVersionNo(), siteImpl.getWww())) {
					result.put("pid", siteImpl.getPid());
					result.put("sitetitle", siteImpl.getSiteTitle());
					result.put("analyticsType", siteImpl.getAnalyticsType());
					result.put("laid", siteImpl.getLaid());
					result.put("lid", siteImpl.getLid());
					result.put("gid", siteImpl.getGid());
					result.put("nick", siteImpl.getNick());
					result.put("sid", siteImpl.getSid());
					result.put("user_id", siteImpl.getUser_id());
					result.put("uc_id", siteImpl.getUc_id());
					result.put("www", siteImpl.getWww());
					result.put("weibo", siteImpl.getWeibo());
					result.put("discuzx", siteImpl.getDiscuzx());
					result.put("domainName", siteImpl.getDomainName());
					result.put("versionNo", siteImpl.getVersionNo());
					result.put("bulletin", siteImpl.getBulletin());
					result.put("statement", siteImpl.getStatement());
					result.put("baiduTongJi", siteImpl.getBaiduTongJi());
					result.put("site_skin", siteImpl.getSite_skin());
					result.put("site_theme", siteImpl.getSite_theme());
					result.put("commissionRate", siteImpl.getCommissionRate());
					result.put("adCommissionRate", siteImpl
							.getAdCommissionRate());
					result.put("appType", siteImpl.getAppType());
					result.put("site_isLogin", siteImpl.getSite_isLogin());
					result.put("site_ico", siteImpl.getSite_ico());
					result.put("site_detialLayout", siteImpl
							.getSite_detailLayout());
					result.put("site_searchLayout", siteImpl
							.getSite_searchLayout());
					result.put("site_searchBox", siteImpl.getSite_searchBox());
					result.put("isAd", siteImpl.getIsAd());
					result
							.put("site_searchView", siteImpl
									.getSite_searchView());
					result.put("ads", siteImpl.getAds());
					result
							.put("yiqifa_username", siteImpl
									.getYiqifa_username());
					result.put("yiqifa_sid", siteImpl.getYiqifa_sid());
					result.put("yiqifa_secret", siteImpl.getYiqifa_secret());

					result.put("sina_appkey", siteImpl.getSina_appkey());
					result.put("taobao_appkey", siteImpl.getTaobao_appkey());
					result.put("qq_appkey", siteImpl.getQq_appkey());
					result.put("sina_appsecret", siteImpl.getSina_appsecret());
					result.put("taobao_appsecret", siteImpl
							.getTaobao_appsecret());
					result.put("qq_appsecret", siteImpl.getQq_appsecret());
					result.put("uyan", siteImpl.getUyan());

				} else {
					SystemException
							.handleException("该站点暂时没有权限访问该页面（需要您升级为分成版（绑定域名），淘客普及版（付费），返利版，卖家版）");
				}
				return siteImpl.getPid();
			}
		} else {
			if (EnvManager.getUser() != null) {
				result.put("pid", EnvManager.getUser().getPid());
				if (EnvManager.getUser().getSites().size() == 1) {
					Site site = EnvManager.getUser().getSites().get(0);
					if (isSysChannel(EnvManager.getUser().getUsb()
							.getVersionNo(), site.getWww())) {
						result.put("sitetitle", site.getTitle());
						result.put("analyticsType", site.getAnalyticsType());
						result.put("laid", site.getLaid());
						result.put("lid", site.getLid());
						result.put("gid", site.getGid());
						result.put("sid", site.getId());
						result.put("user_id", site.getUser_id());
						result.put("uc_id", EnvManager.getUser().getUc_id());
						result.put("nick", EnvManager.getUser().getNick());
						result.put("www", site.getWww());
						result.put("weibo", site.getWeibo());
						result.put("discuzx", site.getDiscuzx());
						result.put("domainName", site.getDomainName());
						result.put("versionNo", EnvManager.getUser().getUsb()
								.getVersionNo());
						result
								.put("appType", EnvManager.getUser()
										.getAppType());
					} else {
						SystemException
								.handleException("该站点暂时没有权限访问该页面（需要您升级为分成版（绑定域名），淘客普及版（付费），返利版，卖家版）");
					}
				}
				return EnvManager.getUser().getPid();
			} else {
				SystemException.handleException("100", "未登录或登录超时");
			}
		}
		result.put("pid", EnvManager.getDefaultPid());
		result.put("nick", "fxy060608");
		return EnvManager.getDefaultPid();
	}

	public static String covertFanliPID(IBaseService baseService,
			HttpServletRequest request, Map<String, Object> result,
			String userId) {
		if (StringUtils.isNotEmpty(userId)) {
			SiteImpl siteImpl = EnvManager.getSites().get(userId);
			if (siteImpl == null) {// 是否已缓存
				siteImpl = baseService.getSiteImplByUserId(userId);
				if (siteImpl != null) {
					if (siteImpl.getVersionNo() == null) {
						siteImpl.setVersionNo(1f);
					}
					EnvManager.getSites().put(siteImpl.getUser_id(), siteImpl);
				}
			}
			if (siteImpl != null) {
				if (isFanli(siteImpl.getVersionNo(), siteImpl.getWww())) {
					result.put("pid", siteImpl.getPid());
					result.put("sitetitle", siteImpl.getSiteTitle());
					result.put("analyticsType", siteImpl.getAnalyticsType());
					result.put("laid", siteImpl.getLaid());
					result.put("lid", siteImpl.getLid());
					result.put("gid", siteImpl.getGid());
					result.put("nick", siteImpl.getNick());
					result.put("sid", siteImpl.getSid());
					result.put("user_id", siteImpl.getUser_id());
					result.put("uc_id", siteImpl.getUc_id());
					result.put("www", siteImpl.getWww());
					result.put("weibo", siteImpl.getWeibo());
					result.put("discuzx", siteImpl.getDiscuzx());
					result.put("domainName", siteImpl.getDomainName());
					result.put("versionNo", siteImpl.getVersionNo());
					result.put("bulletin", siteImpl.getBulletin());
					result.put("statement", siteImpl.getStatement());
					result.put("baiduTongJi", siteImpl.getBaiduTongJi());
					result.put("site_skin", siteImpl.getSite_skin());
					result.put("site_theme", siteImpl.getSite_theme());
					result.put("commissionRate", siteImpl.getCommissionRate());
					result.put("adCommissionRate", siteImpl
							.getAdCommissionRate());
					result.put("appType", siteImpl.getAppType());
					result.put("site_isLogin", siteImpl.getSite_isLogin());
					result.put("site_ico", siteImpl.getSite_ico());
					result.put("site_detialLayout", siteImpl
							.getSite_detailLayout());
					result.put("site_searchLayout", siteImpl
							.getSite_searchLayout());
					result.put("site_searchBox", siteImpl.getSite_searchBox());
					result.put("isAd", siteImpl.getIsAd());
					result
							.put("site_searchView", siteImpl
									.getSite_searchView());
					result.put("ads", siteImpl.getAds());
					result
							.put("yiqifa_username", siteImpl
									.getYiqifa_username());
					result.put("yiqifa_sid", siteImpl.getYiqifa_sid());
					result.put("yiqifa_secret", siteImpl.getYiqifa_secret());

					result.put("sina_appkey", siteImpl.getSina_appkey());
					result.put("taobao_appkey", siteImpl.getTaobao_appkey());
					result.put("qq_appkey", siteImpl.getQq_appkey());
					result.put("sina_appsecret", siteImpl.getSina_appsecret());
					result.put("taobao_appsecret", siteImpl
							.getTaobao_appsecret());
					result.put("qq_appsecret", siteImpl.getQq_appsecret());
					result.put("uyan", siteImpl.getUyan());

					return siteImpl.getPid();
				} else {
					SystemException
							.handleException("该站点暂时没有权限使用返利功能，需要您升级为返利版(绑定域名)，卖家版）");
				}
			}
		} else {
			if (EnvManager.getUser() != null) {
				result.put("pid", EnvManager.getUser().getPid());
				if (EnvManager.getUser().getSites().size() == 1) {
					Site site = EnvManager.getUser().getSites().get(0);
					if (isFanli(EnvManager.getUser().getUsb().getVersionNo(),
							site.getWww())) {
						return EnvManager.getUser().getPid();
					} else {
						SystemException
								.handleException("该站点暂时没有权限使用返利功能，需要您升级为返利版(绑定域名)，卖家版，）");
					}
				}
			} else {
				result.put("pid", EnvManager.getDefaultPid());
				result.put("sitetitle", "新淘网");
				result.put("nick", "fxy060608");
				result.put("user_id", "71614142");
				result.put("uc_id", 1);
				result.put("www", "www.xintaonet.com");
				result.put("domainName", "fxy060608");
				result.put("versionNo", "3");
				result.put("appType", "0");
				return EnvManager.getDefaultPid();
			}
		}
		result.put("pid", EnvManager.getDefaultPid());
		result.put("nick", "fxy060608");
		return EnvManager.getDefaultPid();
	}

	public static String covertPID(IBaseService baseService,
			Map<String, Object> result, String userId) {
		if (StringUtils.isNotEmpty(userId)) {
			SiteImpl siteImpl = EnvManager.getSites().get(userId);
			if (siteImpl == null) {// 是否已缓存
				try {
					siteImpl = baseService.getSiteImplByUserId(userId);
					if (siteImpl != null) {
						if (siteImpl.getVersionNo() == null) {
							siteImpl.setVersionNo(1f);
						}
						EnvManager.getSites().put(siteImpl.getUser_id(),
								siteImpl);
					}
				} catch (Exception e) {
					SystemException
							.handleMessageException("error siteimpl user_id:"
									+ userId);
				}
			}
			if (siteImpl != null) {
				result.put("pid", siteImpl.getPid());
				result.put("sitetitle", siteImpl.getSiteTitle());
				result.put("analyticsType", siteImpl.getAnalyticsType());
				result.put("laid", siteImpl.getLaid());
				result.put("lid", siteImpl.getLid());
				result.put("gid", siteImpl.getGid());
				result.put("nick", siteImpl.getNick());
				result.put("sid", siteImpl.getSid());
				result.put("user_id", siteImpl.getUser_id());
				result.put("uc_id", siteImpl.getUc_id());
				result.put("www", siteImpl.getWww());
				result.put("weibo", siteImpl.getWeibo());
				result.put("discuzx", siteImpl.getDiscuzx());
				result.put("domainName", siteImpl.getDomainName());
				result.put("versionNo", siteImpl.getVersionNo());
				result.put("bulletin", siteImpl.getBulletin());
				result.put("statement", siteImpl.getStatement());
				result.put("baiduTongJi", siteImpl.getBaiduTongJi());
				result.put("site_skin", siteImpl.getSite_skin());
				result.put("site_theme", siteImpl.getSite_theme());
				result.put("commissionRate", siteImpl.getCommissionRate());
				result.put("adCommissionRate", siteImpl.getAdCommissionRate());
				result.put("appType", siteImpl.getAppType());
				result.put("site_isLogin", siteImpl.getSite_isLogin());
				result.put("site_ico", siteImpl.getSite_ico());
				result
						.put("site_detialLayout", siteImpl
								.getSite_detailLayout());
				result
						.put("site_searchLayout", siteImpl
								.getSite_searchLayout());
				result.put("site_searchBox", siteImpl.getSite_searchBox());
				result.put("isAd", siteImpl.getIsAd());
				result.put("site_searchView", siteImpl.getSite_searchView());
				result.put("ads", siteImpl.getAds());
				result.put("yiqifa_username", siteImpl.getYiqifa_username());
				result.put("yiqifa_sid", siteImpl.getYiqifa_sid());
				result.put("yiqifa_secret", siteImpl.getYiqifa_secret());

				result.put("sina_appkey", siteImpl.getSina_appkey());
				result.put("taobao_appkey", siteImpl.getTaobao_appkey());
				result.put("qq_appkey", siteImpl.getQq_appkey());
				result.put("sina_appsecret", siteImpl.getSina_appsecret());
				result.put("taobao_appsecret", siteImpl.getTaobao_appsecret());
				result.put("qq_appsecret", siteImpl.getQq_appsecret());
				result.put("uyan", siteImpl.getUyan());

				return siteImpl.getPid();
			}
		} else {
			if (EnvManager.getUser() != null) {
				result.put("pid", EnvManager.getUser().getPid());
				if (EnvManager.getUser().getSites().size() == 1) {
					Site site = EnvManager.getUser().getSites().get(0);
					result.put("sitetitle", site.getTitle());
					result.put("analyticsType", site.getAnalyticsType());
					result.put("laid", site.getLaid());
					result.put("lid", site.getLid());
					result.put("gid", site.getGid());
					result.put("sid", site.getId());
					result.put("user_id", site.getUser_id());
					result.put("uc_id", EnvManager.getUser().getUc_id());
					result.put("nick", EnvManager.getUser().getNick());
					result.put("www", site.getWww());
					result.put("weibo", site.getWeibo());
					result.put("discuzx", site.getDiscuzx());
					result.put("domainName", site.getDomainName());
					result.put("versionNo", EnvManager.getUser().getUsb()
							.getVersionNo());
					result.put("appType", EnvManager.getUser().getAppType());
				}
				return EnvManager.getUser().getPid();
			} else {
				SystemException.handleException("未登录");
			}
		}
		result.put("pid", EnvManager.getDefaultPid());
		result.put("nick", "fxy060608");
		return EnvManager.getDefaultPid();
	}

	public static SiteImpl getSiteImpl(IPageService pageService, String userId) {
		SiteImpl impl = new SiteImpl();
		Map<String, Object> result = new HashMap<String, Object>();
		covertPID(pageService, result, userId);
		impl.setPid(String.valueOf(result.get("pid")));
		impl.setSiteTitle(String.valueOf(result.get("sitetitle")));
		impl.setNick(String.valueOf(result.get("nick")));
		impl.setSid(String.valueOf(result.get("sid")));
		impl.setUser_id(String.valueOf(result.get("user_id")));
		impl.setUc_id(String.valueOf(result.get("uc_id")));
		if (result.get("www") != null)
			impl.setWww(String.valueOf(result.get("www")));
		if (result.get("domainName") != null)
			impl.setDomainName(String.valueOf(result.get("domainName")));
		if (result.get("versionNo") != null)
			impl.setVersionNo(Float.valueOf(String.valueOf(result
					.get("versionNo"))));
		if (result.get("commissionRate") != null)
			impl.setCommissionRate(Integer.parseInt(String.valueOf(result
					.get("commissionRate"))));
		if (result.get("adCommissionRate") != null)
			impl.setAdCommissionRate(Integer.parseInt(String.valueOf(result
					.get("adCommissionRate"))));
		if (result.get("appType") != null)
			impl.setAppType(String.valueOf(result.get("appType")));
		else
			impl.setAppType("1");
		if (result.get("yiqifa_username") != null)
			impl.setYiqifa_username(String.valueOf(result
					.get("yiqifa_username")));
		if (result.get("yiqifa_sid") != null)
			impl.setYiqifa_sid(String.valueOf(result.get("yiqifa_sid")));
		if (result.get("yiqifa_secret") != null)
			impl.setYiqifa_secret(String.valueOf(result.get("yiqifa_secret")));

		if (result.get("sina_appkey") != null) {
			impl.setSina_appkey(String.valueOf(result.get("sina_appkey")));
		}
		if (result.get("taobao_appkey") != null) {
			impl.setTaobao_appkey(String.valueOf(result.get("taobao_appkey")));
		}
		if (result.get("qq_appkey") != null) {
			impl.setQq_appkey(String.valueOf(result.get("qq_appkey")));
		}
		if (result.get("sina_appsecret") != null) {
			impl
					.setSina_appsecret(String.valueOf(result
							.get("sina_appsecret")));
		}
		if (result.get("taobao_appsecret") != null) {
			impl.setTaobao_appsecret(String.valueOf(result
					.get("taobao_appsecret")));
		}
		if (result.get("qq_appsecret") != null) {
			impl.setQq_appsecret(String.valueOf(result.get("qq_appsecret")));
		}
		if (result.get("uyan") != null) {
			impl.setUyan(String.valueOf(result.get("uyan")));
		}

		return impl;
	}

	public static String filterUnValidNick(String nick) {
		for (String un : UNVALIDS) {
			if (un.equals(nick)) {
				return "fxy060608";
			}
		}
		return nick;
	}
}
