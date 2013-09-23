package com.wind.site.util;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;

import weibo4j.util.WeiboConfig;

import com.google.gson.JsonObject;
import com.taobao.api.request.TaobaokeCaturlGetRequest;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.core.service.IBaseService;
import com.wind.site.command.CommandExecutor;
import com.wind.site.command.impl.UnvalidCommand;
import com.wind.site.env.EnvManager;
import com.wind.site.model.Site;
import com.wind.site.model.SiteImpl;
import com.wind.site.model.T_UserSubscribe;
import com.wind.site.model.User;
import com.wind.site.model.W_UserSubscribe;
import com.wind.site.service.IPageService;
import com.wind.site.service.ISiteService;

/**
 * RESTFUL 辅助类
 * 
 * @author fxy
 * 
 */
public class WindSiteRestUtil {
	public static final String DOMAIN = "www.xintaonet.com";
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
		UNVALIDS.add("tamir0");
		UNVALIDS.add("e网情深资源坊");
		UNVALIDS.add("鼎胜服饰");
		UNVALIDS.add("魏梦得");
		UNVALIDS.add("huhu2da");
	}

	/**
	 * 默认成功信息
	 */
	public static final String SUCCESS = new JsonObject().toString();

	public static String xssFilter(String message) {
		if (StringUtils.isNotEmpty(message)) {
			message = message.replace('<', ' ');
			message = message.replace('>', ' ');
			message = message.replace('"', ' ');
			message = message.replace('\'', ' ');
			message = message.replace('/', ' ');
			message = message.replace('%', ' ');
			message = message.replace(';', ' ');
			message = message.replace('(', ' ');
			message = message.replace(')', ' ');
			message = message.replace('&', ' ');
			message = message.replace('+', '_');
		}
		return message;
	}

	public static Long getMiniTradeId(Long tradeId) {
		Long miniTradeId = tradeId;
		String tradeIdStr = String.valueOf(tradeId);
		Integer length = tradeIdStr.length();
		String miniTradeIdStr = tradeIdStr;
		if (length >= 8) {
			miniTradeIdStr = tradeIdStr.substring(0, 8)
					+ tradeIdStr.substring(length - 4);
		} else if (length >= 4) {
			miniTradeIdStr = tradeIdStr.substring(0, length)
					+ tradeIdStr.substring(length - 4);
		} else {
			miniTradeIdStr = tradeIdStr.substring(0) + tradeIdStr.substring(0);
		}
		miniTradeId = Long.valueOf(miniTradeIdStr);
		return miniTradeId;
	}

	public static void synPid(IBaseService service) {
		_synPid(service, new Page<User>(1, 1000));
	}

	public static void _synPid(IBaseService service, Page<User> page) {
		List<User> users = (List<User>) service.findByHql(page,
				"from User where nPid is null", new HashMap<String, Object>());
		TaobaokeCaturlGetRequest request = new TaobaokeCaturlGetRequest();
		request.setCid(0L);
		if (users != null && users.size() > 0) {
			for (User user : users) {
				request.setNick(user.getNick());
				user.getNick();
				try {
					String url = TaobaoFetchUtil.getItemCatUrl(null, null,
							user.getAppType(), request, user.getPid());
					String pid = url.split("pid=")[1].split("&")[0];
					if (StringUtils.isNotEmpty(pid)) {
						user.setnPid(pid);
						service.update(user);
					}
				} catch (Exception e) {
					logger.info(e.toString());
				}
			}
		}
		users.clear();
		users = null;
		if (page.isHasNextPage()) {
			page.setPageNo(page.getNextPage());
			_synPid(service, page);
		}
	}

	public static Long getPid(String pid) {
		Long PID = null;
		if (StringUtils.isNotEmpty(pid) && !"null".equals(pid)) {
			try {
				PID = Long.valueOf(pid.replace("mm_", "").replace("_0_0", ""));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		if (PID != null && PID > 0) {
			return PID;
		}
		return null;
	}

	public static void synSiteTitle(IBaseService service) {
		List<Site> sites = service.loadAll(Site.class);
		if (sites != null && sites.size() > 0) {
			Map<String, Object> params = new HashMap<String, Object>();
			for (Site site : sites) {
				params.put("title", site.getTitle());
				params.put("site_id", site.getId());
				service.executeNativeUpdateSql(
						"update w_page set title=:title where site_id=:site_id and isIndex=1",
						params);
			}
			sites.clear();
			sites = null;
		}
	}

	public static String getAuthorizationURLBySina(String client_id) {
		return WeiboConfig.getValue("authorizeURL").trim() + "?client_id="
				+ client_id.trim() + "&redirect_uri="
				+ WeiboConfig.getValue("redirect_URI").trim()
				+ "&response_type=code";
	}

	public static Float getNativeUsb(IBaseService service, String user_id) {
		Calendar calendar = Calendar.getInstance();
		W_UserSubscribe usb = service.findByCriterion(W_UserSubscribe.class,
				R.eq("user_id", user_id), R.gt("endDate", calendar.getTime()));
		if (usb != null) {
			return usb.getVersionNo();
		}
		return 1f;
	}

	public static Float getNativeUsb(IBaseService service, User user) {
		Calendar calendar = Calendar.getInstance();
		W_UserSubscribe usb = service.findByCriterion(W_UserSubscribe.class,
				R.eq("user_id", user.getUser_id()),
				R.gt("endDate", calendar.getTime()));
		if (usb != null) {
			user.setEndDate(usb.getEndDate());
			return usb.getVersionNo();
		}
		return 1f;
	}

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
					result.put("adCommissionRate",
							siteImpl.getAdCommissionRate());
					result.put("appType", siteImpl.getAppType());
					result.put("site_isLogin", siteImpl.getSite_isLogin());
					result.put("site_ico", siteImpl.getSite_ico());
					result.put("site_detialLayout",
							siteImpl.getSite_detailLayout());
					result.put("site_searchLayout",
							siteImpl.getSite_searchLayout());
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
					result.put("taobao_appsecret",
							siteImpl.getTaobao_appsecret());
					result.put("qq_appsecret", siteImpl.getQq_appsecret());
					result.put("uyan", siteImpl.getUyan());

					result.put("pPid", siteImpl.getpPid());
					result.put("tdjPid", siteImpl.getTdjPid());
					result.put("appKey",
							siteImpl.getAppKey() != null ? siteImpl.getAppKey()
									: "");
					result.put(
							"appSecret",
							siteImpl.getAppSecret() != null ? siteImpl
									.getAppSecret() : "");

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
						result.put("appType", EnvManager.getUser().getAppType());
						result.put("pPid", EnvManager.getUser().getpPid());
						result.put("tdjPid", EnvManager.getUser().getTdjPid());
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
					result.put("adCommissionRate",
							siteImpl.getAdCommissionRate());
					result.put("appType", siteImpl.getAppType());
					result.put("site_isLogin", siteImpl.getSite_isLogin());
					result.put("site_ico", siteImpl.getSite_ico());
					result.put("site_detialLayout",
							siteImpl.getSite_detailLayout());
					result.put("site_searchLayout",
							siteImpl.getSite_searchLayout());
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
					result.put("taobao_appsecret",
							siteImpl.getTaobao_appsecret());
					result.put("qq_appsecret", siteImpl.getQq_appsecret());
					result.put("uyan", siteImpl.getUyan());

					result.put("pPid", siteImpl.getpPid());
					result.put("tdjPid", siteImpl.getTdjPid());
					result.put("appKey",
							siteImpl.getAppKey() != null ? siteImpl.getAppKey()
									: "");
					result.put(
							"appSecret",
							siteImpl.getAppSecret() != null ? siteImpl
									.getAppSecret() : "");
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
				result.put("site_detialLayout", siteImpl.getSite_detailLayout());
				result.put("site_searchLayout", siteImpl.getSite_searchLayout());
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

				result.put("pPid", siteImpl.getpPid());
				result.put("tdjPid", siteImpl.getTdjPid());
				result.put("appKey",
						siteImpl.getAppKey() != null ? siteImpl.getAppKey()
								: "");
				result.put(
						"appSecret",
						siteImpl.getAppSecret() != null ? siteImpl
								.getAppSecret() : "");

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

					result.put("pPid", EnvManager.getUser().getpPid());
					result.put("tdjPid", EnvManager.getUser().getTdjPid());
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
			impl.setSina_appsecret(String.valueOf(result.get("sina_appsecret")));
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

		if (result.get("pPid") != null) {
			impl.setpPid(String.valueOf(result.get("pPid")));
		}
		if (result.get("tdjPid") != null) {
			impl.setpPid(String.valueOf(result.get("tdjPid")));
		}
		if (result.get("appKey") != null) {
			impl.setAppKey(String.valueOf(result.get("appKey")));
		}
		if (result.get("appSecert") != null) {
			impl.setAppKey(String.valueOf(result.get("appSecret")));
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

	private static final Logger logger = Logger
			.getLogger(WindSiteRestUtil.class.getName());

	@SuppressWarnings("unchecked")
	public static String unbind(String id, IBaseService adminService) {
		Map<String, Object> params = new HashMap<String, Object>();
		adminService.executeNativeUpdateSql(
				"delete from w_domain where user_id=" + id, params);// 删除域名申请
		adminService.executeNativeUpdateSql(
				"update w_site set www=null  where user_id=" + id, params);// 删除站点域名绑定
		// 刷新该站点缓存
		EnvManager.getSites().put(String.valueOf(id),
				adminService.getSiteImplByUserId(String.valueOf(id)));
		// 重新刷新绑定文件
		List<Map<String, Object>> sites = (List<Map<String, Object>>) adminService
				.findByHql(
						"select new map(www as www,user_id as user_id) from Site where www!=''",
						null);
		logger.info(" wwws[" + sites.size() + "]");
		try {
			FileWriter fw = new FileWriter(EnvManager.getApachePath()
					+ File.separator + "domain.txt", false);
			BufferedWriter bw = new BufferedWriter(fw);
			for (Map<String, Object> site : sites) {
				if (null != site.get("www")) {
					String user_id = String.valueOf(site.get("user_id"));
					bw.write(site.get("www") + "					     http://shop"
							+ user_id + ".xintaonet.com");
					bw.newLine();
				}
			}
			bw.flush();
			bw.close();
			fw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return String.valueOf(sites.size());
	}

	@SuppressWarnings("unchecked")
	public static void checkWwwExpired(IBaseService service) {
		List<String> result = (List<String>) service
				.executeNativeSql(
						"select w.user_id from w_site w,t_usersubscribe usb,w_user u where w.www != '' and w.user_id=usb.user_id and w.user_id=u.user_id and usb.versionno<=1.5 and datediff(now(),u.expired)>7",
						new HashMap<String, Object>());
		for (String id : result) {
			Map<String, Object> params = new HashMap<String, Object>();
			service.executeNativeUpdateSql(
					"delete from w_domain where user_id=" + id, params);// 删除域名申请
			service.executeNativeUpdateSql(
					"update w_site set www=null  where user_id=" + id, params);// 删除站点域名绑定
			// 刷新该站点缓存
			EnvManager.getSites().put(String.valueOf(id),
					service.getSiteImplByUserId(String.valueOf(id)));
		}
		List<Map<String, Object>> sites = (List<Map<String, Object>>) service
				.findByHql(
						"select new map(www as www,user_id as user_id) from Site where www!=''",
						null);
		logger.info(" wwws[" + sites.size() + "]");
		try {
			FileWriter fw = new FileWriter(EnvManager.getApachePath()
					+ File.separator + "domain.txt", false);
			BufferedWriter bw = new BufferedWriter(fw);
			for (Map<String, Object> site : sites) {
				if (null != site.get("www")) {
					String user_id = String.valueOf(site.get("user_id"));
					bw.write(site.get("www") + "					     http://shop"
							+ user_id + ".xintaonet.com");
					bw.newLine();
				}
			}
			bw.flush();
			bw.close();
			fw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@SuppressWarnings("unchecked")
	public static void checkWWW(IBaseService service, Boolean isUpdate) {
		List<String> result = (List<String>) service
				.executeNativeSql(
						"select w.www from w_site w,t_usersubscribe usb where w.www != '' and w.user_id=usb.user_id and versionno<=1.5",
						new HashMap<String, Object>());

		InetAddress myServer = null;
		Integer count = 0;
		for (String url : result) {
			try {
				myServer = InetAddress.getByName(url);

				if ("106.186.28.27".equals(myServer.getHostAddress())) {// 仍指向
				} else {// 已未指向
					count++;
					if (isUpdate) {
						List<String> ids = (List<String>) service
								.executeNativeSql(
										"select w.user_id from w_site w where w.www=\""
												+ url + "\"",
										new HashMap<String, Object>());
						if (ids != null && ids.size() == 1) {
							String id = ids.get(0);
							Map<String, Object> params = new HashMap<String, Object>();
							service.executeNativeUpdateSql(
									"delete from w_domain where user_id=" + id,
									params);// 删除域名申请
							service.executeNativeUpdateSql(
									"update w_site set www=null  where user_id="
											+ id, params);// 删除站点域名绑定
							// 刷新该站点缓存
							EnvManager.getSites().put(
									String.valueOf(id),
									service.getSiteImplByUserId(String
											.valueOf(id)));
						}
					}
				}
				System.out.println(url + ":" + myServer.getHostAddress());
			} catch (UnknownHostException e) {
				e.printStackTrace();
			}
		}
		logger.info(" unvalid www:" + count);
		List<Map<String, Object>> sites = (List<Map<String, Object>>) service
				.findByHql(
						"select new map(www as www,user_id as user_id) from Site where www!=''",
						null);
		logger.info(" wwws[" + sites.size() + "]");
		try {
			FileWriter fw = new FileWriter(EnvManager.getApachePath()
					+ File.separator + "domain.txt", false);
			BufferedWriter bw = new BufferedWriter(fw);
			for (Map<String, Object> site : sites) {
				if (null != site.get("www")) {
					String user_id = String.valueOf(site.get("user_id"));
					bw.write(site.get("www") + "					     http://shop"
							+ user_id + ".xintaonet.com");
					bw.newLine();
				}
			}
			bw.flush();
			bw.close();
			fw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static String checkFenCheng(IBaseService service) {
		List<T_UserSubscribe> usbs = service.findAllByCriterion(
				T_UserSubscribe.class, R.lt("versionNo", 0f));
		if (usbs != null && usbs.size() > 0) {
			for (T_UserSubscribe usb : usbs) {
				try {
					User user = service.findByCriterion(User.class,
							R.eq("user_id", usb.getUser_id()));
					if (user != null) {
						if (StringUtils.isNotEmpty(user.getPid())) {
							Long pid = Long.valueOf(user.getPid()
									.replaceAll("mm_", "")
									.replaceAll("_0_0", ""));
							Boolean isFC = TaobaoFetchUtil
									.isTaobaokeToolRelation(pid);// 获取分成型
							if (isFC) {
								usb.setVersionNo(1.5f);
							} else {
								usb.setVersionNo(0f);
							}
							service.update(usb);
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		CommandExecutor.getCommands().add(new UnvalidCommand());// 刷新无效
		return String.valueOf(usbs.size());
	}

	public static void main(String[] args) {
		System.out.println("215880265274241="
				+ WindSiteRestUtil.getMiniTradeId(215880265274241L));
		System.out.println("1966978999="
				+ WindSiteRestUtil.getMiniTradeId(1966978999L));
		System.out.println("19669789="
				+ WindSiteRestUtil.getMiniTradeId(19669789L));
		System.out.println("1966978="
				+ WindSiteRestUtil.getMiniTradeId(1966978L));
		System.out.println("1966=" + WindSiteRestUtil.getMiniTradeId(1966L));
		System.out.println("19=" + WindSiteRestUtil.getMiniTradeId(19L));
	}
}
