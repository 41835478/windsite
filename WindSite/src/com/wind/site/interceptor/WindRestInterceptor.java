package com.wind.site.interceptor;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.wind.core.cache.ICache;
import com.wind.core.exception.SystemException;
import com.wind.core.iptable.IPTable;
import com.wind.site.command.CommandExecutor;
import com.wind.site.command.impl.IPCrawlerCommand;
import com.wind.site.env.EnvManager;
import com.wind.site.service.ISiteService;
import com.wind.site.util.HMacMD5;
import com.wind.site.util.WindSiteRestUtil;

/**
 * REST 拦截器(主要是安全校验)
 * 
 * @author fxy
 * 
 */
public class WindRestInterceptor extends HandlerInterceptorAdapter {

	private ISiteService siteService;
	private IPTable ipTable;

	@SuppressWarnings("unused")
	private static final Logger logger = Logger
			.getLogger(WindRestInterceptor.class.getName());

	public String getRemortIP(HttpServletRequest request) {
		if (request.getHeader("x-forwarded-for") == null) {
			return request.getRemoteAddr();
		}
		return request.getHeader("x-forwarded-for");
	}

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		response.setHeader(
				"P3P",
				"CP=\"CURa ADMa DEVa PSAo PSDo OUR BUS UNI PUR INT DEM STA PRE COM NAV OTC NOI DSP COR\"");
		String uri = request.getRequestURI();
		// IPTABLE start 后台IP调整,黑名单页面,验证码页面无过滤,其他页面需过滤
		// 客户端IP
		String ip = getRemortIP(request);
		if (StringUtils.isNotEmpty(uri) && uri.indexOf("/admin") == -1
				&& StringUtils.isNotEmpty(ip)) {
			try {
				ip = ip.split(",")[0];
				String[] ips = ip.split("\\.");
				if (ips.length == 4) {
					if (!ipTable.isWhite(ips[0] + "." + ips[1] + "." + ips[2])) {// 判断前三位是否在IP段,如果不在白名单,则继续
						if (!ipTable.isBlack(ip)) {// 如果不在黑名单,计数
							ICache<String, Object> cache = EnvManager
									.getCache();
							ICache<String, Object> tempCache = EnvManager
									.getCache();
							Object tempV = tempCache.get(ip);// 获取当前IP计数
							if (tempV != null) {// 如果已存在
								Long count = (Long) tempV + 1;
								tempCache.putExpiry(ip, count);// 计数加一,保留有效期数据
								if (ipTable.getIsFilter() && count > 50) {// 如果允许过滤并超出流量
									// TODO 进入验证码页面
									// 记录 Crawler IP
									IPCrawlerCommand command = new IPCrawlerCommand();
									command.setIp(ip);
									CommandExecutor.getCommands().add(command);
									response.sendRedirect("http://"
											+ WindSiteRestUtil.DOMAIN
											+ "/help/crawler.html");
								}
							} else {// 不存在,带过期值进入缓存
								tempCache.put(ip, 1L, 10);// 10秒超时
							}
							Object v = cache.get(ip);// 获取当前IP计数
							if (v != null) {// 如果已存在
								Long count = (Long) v + 1;
								cache.putExpiry(ip, count);// 计数加一,保留有效期数据
								if (ipTable.getIsFilter()
										&& count > ipTable.getLIMIT()) {// 如果允许过滤并超出流量
									// TODO 进入验证码页面
									// 记录 Crawler IP
									IPCrawlerCommand command = new IPCrawlerCommand();
									command.setIp(ip);
									CommandExecutor.getCommands().add(command);
									response.sendRedirect("http://"
											+ WindSiteRestUtil.DOMAIN
											+ "/help/crawler.html");
								}
							} else {// 不存在,带过期值进入缓存
								cache.put(ip, 1L, 1800);// 30分钟超时
							}
						} else {// 黑名单,拒绝访问
							// TODO 进入黑名单页面
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		// IPTABLE end

		if (StringUtils.isEmpty(EnvManager.getRealPath()))
			EnvManager.setRealPath(request.getSession().getServletContext()
					.getRealPath("/"));
		HttpSession session = request.getSession();
		EnvManager.registerSession(session);
		String userId = request.getParameter("USER");
		if (StringUtils.isNotEmpty(userId)) {
			Map<String, Object> result = new HashMap<String, Object>();
			WindSiteRestUtil.covertPID(siteService, result, userId);
			Object appKeyObj = result.get("appKey");
			String appKey = EnvManager.getAppKey(null);
			String appSecret = EnvManager.getSecret(null);
			if (appKeyObj != null) {
				if (StringUtils.isNotEmpty(String.valueOf(appKeyObj))) {
					appKey = String.valueOf(appKeyObj);
					appSecret = String.valueOf(result.get("appSecret"));
				}
			}
			String timestamp = String.valueOf(System.currentTimeMillis());
			Cookie c1 = new Cookie("timestamp", timestamp);
			Cookie c2 = new Cookie("sign",
					getSign(appKey, appSecret, timestamp));
			// Cookie c3 = new Cookie("orignalSign", getOriginalSign(appKey,
			// appSecret));
			if (StringUtils.isNotEmpty(request.getParameter("topPath"))) {
				String topPath = request.getParameter("topPath");
				c1.setPath(topPath);
				c2.setPath(topPath);
				// c3.setPath(topPath);
			}
			response.addCookie(c1);
			response.addCookie(c2);
			// response.addCookie(c3);
		}
		if (isFanliNotMember(uri, request)) {// 如果是返利非会员功能
			Map<String, Object> result = new HashMap<String, Object>();
			WindSiteRestUtil.covertFanliPID(siteService, request, result,
					userId);
			if (WindSiteRestUtil.isFanli(result)) {// 如果支持返利
			}
		}
		if (isMember(uri, request)) {// 会员服务
			if ((EnvManager.getUser() == null)) {// 如果未登录,导航至登录
				return unLogin(request, response);
			} else {
				if (EnvManager.getUser().getLimit() == null) {
					siteService.synLimit(EnvManager.getUser());
				}
				if (EnvManager.getUser().getUsb() == null) {
					siteService.synVersionNo(EnvManager.getUser(), EnvManager
							.getUser().getNick(), false);
				}
				if (EnvManager.getUser().getLimit() == null
						|| EnvManager.getUser().getUsb() == null) {// 如果限额为空或者订购信息为空
					return unLogin(request, response);
				}
				if (uri.indexOf("/taobao") != -1
						&& !StringUtils.isNotEmpty(EnvManager
								.getTaobaoSession())) {// 如果淘宝Session不存在,导航至登录
					return unLogin(request, response);
				}
				if (!"admin".equals(EnvManager.getUser().getRole())
						&& isPuji(uri, request)
						&& (EnvManager.getUser().getUsb().getVersionNo() < 1.5)) {
					SystemException.handleException("102", "您需要升级版本才可以使用该功能");
				}
				if (!"admin".equals(EnvManager.getUser().getRole())
						&& isFanli(uri, request)
						&& (EnvManager.getUser().getUsb().getVersionNo() < 2)) {
					SystemException.handleException("102", "您需要升级版本才可以使用返利功能");
				}
				if (!"admin".equals(EnvManager.getUser().getRole())
						&& isSeller(uri, request)
						&& EnvManager.getUser().getUsb().getVersionNo() < 3) {
					SystemException.handleException("102", "您需要升级版本才可以使用卖家功能");
				}
				if (isAdmin(uri, request)// 如果是管理员功能并且当前用户非管理员角色
						&& !"admin".equals(EnvManager.getUser().getRole())) {
					SystemException.handleException("101", "您没有权限访问管理员功能");
				}

				// logger.info("当前登录用户[" + EnvManager.getUser().getNick() +
				// "]");
			}

		} else if (isFanliMember(uri, request)) {// 返利会员
			if ((EnvManager.getMember() == null)) {// 如果未登录,导航至登录
				return unFanliLogin(request, response);
			}
		} else {// 非会员功能
			// logger.info("当前请求服务为非会员功能");
		}
		return true;
	}

	/**
	 * 是否是管理员功能
	 * 
	 * @param uri
	 * @param request
	 * @return
	 */
	private boolean isAdmin(String uri, HttpServletRequest request) {
		return uri.indexOf("/admin") != -1;
	}

	/**
	 * 是否是买家返利非会员功能
	 * 
	 * @param uri
	 * @param request
	 * @return
	 */
	private boolean isFanliNotMember(String uri, HttpServletRequest request) {
		return uri.indexOf("/fanli/") != -1;
	}

	/**
	 * 是否是主站返利功能
	 * 
	 * @param uri
	 * @param request
	 * @return
	 */
	private boolean isFanli(String uri, HttpServletRequest request) {
		return uri.indexOf("/fl/") != -1;
	}

	/**
	 * 是否是主站普及收费功能
	 * 
	 * @param uri
	 * @param request
	 * @return
	 */
	private boolean isPuji(String uri, HttpServletRequest request) {
		return uri.indexOf("/puji/") != -1;
	}

	/**
	 * 是否是卖家功能
	 * 
	 * @param uri
	 * @param request
	 * @return
	 */
	private boolean isSeller(String uri, HttpServletRequest request) {
		return uri.indexOf("/seller") != -1;
	}

	private boolean unLogin(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if ("AJAX".equalsIgnoreCase(request.getHeader("WindType"))) {
			SystemException.handleException("100", "未登录或登录超时");
		} else {
			EnvManager.clear();// 跳转前清除数据
			response.sendRedirect("http://" + WindSiteRestUtil.DOMAIN
					+ "/router/site/redirect");
		}
		return false;
	}

	private boolean unFanliLogin(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		WindSiteRestUtil.covertFanliPID(siteService, request, result, userId);
		if (WindSiteRestUtil.isFanli(result)) {// 如果支持返利
			if ("AJAX".equalsIgnoreCase(request.getHeader("WindType"))) {
				SystemException.handleException("200", "未登录或登录超时");
			} else {
				EnvManager.clear();// 跳转前清除数据
				response.sendRedirect("http://" + result.get("www")
						+ "/router/fanli/redirect");
			}
		}
		return false;
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		EnvManager.clear();
	}

	private Boolean isFanliMember(String uri, HttpServletRequest request) {
		if (uri.indexOf("/fanlimember") != -1) {
			return true;
		}
		return false;
	}

	private Boolean isMember(String uri, HttpServletRequest request) {
		// TODO 如果是设计器请求(暂时不列为权限控制,因为剑峰没有网络,无法登录)
		// if (uri.indexOf("/designer") != -1) {
		// return false;
		// }
		if (uri.indexOf("/member") != -1) {// 如果是会员服务
			return true;
		} else if (uri.indexOf("/taobao") != -1) {// 如果是淘宝服务
			String method = request.getParameter("method");
			if (EnvManager.getAPI().containsKey(method)) {
				if (EnvManager.getAPI().get(method) == 1) {// 如果需登录
					return true;
				}
			} else {
				SystemException.handleMessageException("暂未开放[" + method
						+ "]的淘宝访问权");
			}
		}
		return false;
	}

	/**
	 * @return the siteService
	 */
	public ISiteService getSiteService() {
		return siteService;
	}

	/**
	 * @param siteService
	 *            the siteService to set
	 */
	public void setSiteService(ISiteService siteService) {
		this.siteService = siteService;
	}

	public void setIpTable(IPTable ipTable) {
		this.ipTable = ipTable;
	}

	public IPTable getIpTable() {
		return ipTable;
	}

	/**
	 * $secret.'app_key'.$app_key.'timestamp'.$timestamp.$secret;
	 * 
	 * @return
	 */
	public static String getSign(String appkey, String secret, String timestamp) {
		String result = null;
		StringBuilder signStr = new StringBuilder();
		signStr.append(secret).append("app_key").append(appkey)
				.append("timestamp").append(timestamp).append(secret);
		try {
			result = byte2hex(HMacMD5.getHmacMd5Bytes(signStr.toString()
					.getBytes("utf-8"), secret.getBytes("utf-8")));
		} catch (Exception ex) {
			throw new java.lang.RuntimeException("sign error !");
		}
		return result;
	}

	// public static String getOriginalSign(String appkey, String secret) {
	// String result = null;
	// StringBuilder signStr = new StringBuilder();
	// signStr.append(secret).append("app_key").append(appkey)
	// .append("timestamp").append(timestamp).append(secret);
	// try {
	// result = signStr.toString();
	// } catch (Exception ex) {
	// throw new java.lang.RuntimeException("sign error !");
	// }
	// return result;
	// }

	private static String byte2hex(byte[] data) {
		StringBuffer hs = new StringBuffer();
		String stmp = "";
		for (int n = 0; n < data.length; n++) {
			stmp = (java.lang.Integer.toHexString(data[n] & 0XFF));
			if (stmp.length() == 1)
				hs.append("0").append(stmp);
			else
				hs.append(stmp);
		}
		return hs.toString().toUpperCase();
	}

	public static void main(String[] args) {
		System.out.println(String.valueOf(null));
	}
}
