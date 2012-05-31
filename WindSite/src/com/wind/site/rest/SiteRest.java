package com.wind.site.rest;

import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;
import java.util.TreeMap;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.NoSuchRequestHandlingMethodException;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.fivestars.interfaces.bbs.client.Client;
import com.fivestars.interfaces.bbs.util.XMLHelper;
import com.google.gdata.util.common.base.StringUtil;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.taobao.api.domain.Item;
import com.taobao.api.domain.ItemSearch;
import com.taobao.api.domain.Shop;
import com.taobao.api.domain.TaobaokeItem;
import com.taobao.api.domain.TaobaokeItemDetail;
import com.taobao.api.domain.TaobaokeShop;
import com.taobao.api.domain.TradeRate;
import com.taobao.api.request.ItemsSearchRequest;
import com.taobao.api.request.ShopGetRequest;
import com.taobao.api.request.TaobaokeItemsDetailGetRequest;
import com.taobao.api.request.TaobaokeItemsGetRequest;
import com.taobao.api.request.TaobaokeListurlGetRequest;
import com.taobao.api.request.TaobaokeShopsGetRequest;
import com.taobao.api.response.ItemsSearchResponse;
import com.taobao.api.response.TaobaokeItemsDetailGetResponse;
import com.taobao.api.response.TaobaokeItemsGetResponse;
import com.taobao.api.response.TaobaokeShopsGetResponse;
import com.taobao.api.response.TraderatesSearchResponse;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.site.command.CommandExecutor;
import com.wind.site.command.impl.ItemDetailCommand;
import com.wind.site.command.impl.ShopBlogCommand;
import com.wind.site.command.impl.ShopDetailCommand;
import com.wind.site.command.impl.UserItemDetailCommand;
import com.wind.site.command.impl.UserShopDetailCommand;
import com.wind.site.delay.WindSiteDelay;
import com.wind.site.env.EnvManager;
import com.wind.site.freemarker.IDeployZone;
import com.wind.site.freemarker.method.ModuleMethod;
import com.wind.site.freemarker.method.WidgetCustomerMethod;
import com.wind.site.model.AD;
import com.wind.site.model.Activity;
import com.wind.site.model.Channel;
import com.wind.site.model.CoolSite;
import com.wind.site.model.FanliClass;
import com.wind.site.model.ItemGroup;
import com.wind.site.model.Limit;
import com.wind.site.model.Member;
import com.wind.site.model.PageModule;
import com.wind.site.model.Site;
import com.wind.site.model.SiteCommission;
import com.wind.site.model.SiteImpl;
import com.wind.site.model.T_MallBrand;
import com.wind.site.model.T_SpaceUser;
import com.wind.site.model.T_TaobaokeItem;
import com.wind.site.model.T_TaobaokeShop;
import com.wind.site.model.User;
import com.wind.site.model.convert.UserConvert;
import com.wind.site.service.IPageService;
import com.wind.site.service.ISiteService;
import com.wind.site.util.EncryptUtil;
import com.wind.site.util.TaobaoFetchUtil;
import com.wind.site.util.WindSiteRestUtil;
import com.wind.uc.model.UCBlog;
import com.wind.uc.model.UCClass;
import com.wind.uc.service.IUCService;

import freemarker.template.Template;

/**
 * 网站通用功能RESTFUL服务,无需登录
 * 
 * @author fxy
 * 
 */
@Controller
@RequestMapping("/site")
public class SiteRest {
	private static final Logger logger = Logger.getLogger(SiteRest.class
			.getName());

	@Autowired
	private ISiteService siteService;
	@Autowired
	private IUCService ucService;
	@Autowired
	private WidgetCustomerMethod widgetCustomer;

	/**
	 * 404|500，生成404错误
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws NoSuchRequestHandlingMethodException
	 */
	@RequestMapping(value = "/error/item404")
	public ModelAndView errorItem404(HttpServletRequest request,
			HttpServletResponse response) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		WindSiteRestUtil.covertPID(siteService, result, userId);
		response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		result.put("msg", "您浏览的商品不存在或已下架");
		return new ModelAndView("site/siteError", result);
	}

	/**
	 * 404|500，生成404错误
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws NoSuchRequestHandlingMethodException
	 */
	@RequestMapping(value = "/error/shop404")
	public ModelAndView errorShop404(HttpServletRequest request,
			HttpServletResponse response) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		WindSiteRestUtil.covertPID(siteService, result, userId);
		response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		result.put("msg", "您浏览的店铺不存在");
		return new ModelAndView("site/siteError", result);
	}

	/**
	 * 根据软文分类查找并更新组件和页面
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getCommission/{numIid}")
	@ResponseBody
	public String getCommission(@PathVariable Long numIid,
			HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		WindSiteRestUtil.covertPID(siteService, result, userId);
		List<TaobaokeItem> items = TaobaoFetchUtil.huabaoItemConvert(String
				.valueOf(result.get("appType")), numIid + "", (String) result
				.get("nick"));
		if (items != null && items.size() == 1) {
			return "{\"co\":\"" + items.get(0).getCommission()
					+ "\",\"price\":\"" + items.get(0).getPrice() + "\"}";
		}
		return "{\"co\":\"\",\"price\":\"\"}";
	}

	/**
	 * 当前微购指定用户产生定时事件（发微博）
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/adsite/timer")
	@ResponseBody
	public String weigouTimer(HttpServletRequest request,
			HttpServletResponse response) {
		List<String> autoCrons = new ArrayList<String>();
		String userIdStr = request.getParameter("user_id");
		String groupIdStr = request.getParameter("group_id");
		if (StringUtils.isEmpty(userIdStr) || StringUtils.isEmpty(groupIdStr)) {
			return "user_id and group_id is null";
		}
		try {
			Long userId = Long.valueOf(userIdStr);
			// Integer groupId = Integer.valueOf(groupIdStr);
			// 商品推广
			autoCrons.add("weigou_" + userId + "_" + 0);
			autoCrons.add("weigou_" + userId + "_" + 1);
			autoCrons.add("weigou_" + userId + "_" + 2);
			autoCrons.add("weigou_" + userId + "_" + 3);
			// 非自己商品
			autoCrons.add("weigou_" + userId + "_" + 4);
			autoCrons.add("weigou_" + userId + "_" + 5);
			// 店铺推广
			autoCrons.add("weigou_" + userId + "_" + 6);
			// 非自己店铺
			autoCrons.add("weigou_" + userId + "_" + 7);
			autoCrons.add("weigou_" + userId + "_" + 8);
			autoCrons.add("weigou_" + userId + "_" + 9);
			autoCrons.add("weigou_" + userId + "_" + 10);
			autoCrons.add("weigou_" + userId + "_" + 11);
			autoCrons.add("weigou_" + userId + "_" + 100);
			autoCrons.add("weigou_" + userId + "_" + 101);
			autoCrons.add("weigou_" + userId + "_" + 102);
			autoCrons.add("weigou_" + userId + "_" + 103);
			autoCrons.add("weigou_" + userId + "_" + 104);
		} catch (Exception e) {
			e.printStackTrace();
		}
		Collections.shuffle(autoCrons);
		if (autoCrons != null) {
			Calendar calendar = Calendar.getInstance();
			for (int i = 0; i < autoCrons.size(); i++) {
				String autoCron = autoCrons.get(i);
				calendar.add(Calendar.SECOND, 60 * 2);// 2分钟间隔发布
				WindSiteDelay.addWeigouQueue(autoCron, calendar.getTime(),
						TimeUnit.SECONDS);//
			}
		}
		return new Gson().toJson(autoCrons, new TypeToken<List<String>>() {
		}.getType());
	}

	/**
	 * 独立站点推广搜索
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/adsite/search")
	@ResponseBody
	public String myAdsSiteSearch(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> params = new HashMap<String, Object>();
		List<Map<String, Object>> sites = (List<Map<String, Object>>) siteService
				.findByHql(
						"select new map(s.title as title,s.user_id as user_id,s.www as www) from Site s,T_UserSubscribe usb where s.www is not null and usb.versionNo!=0 and usb.user_id=s.user_id order by created desc",
						params);
		if (sites != null) {
			return new Gson().toJson(sites,
					new TypeToken<List<Map<String, Object>>>() {
					}.getType());
		}
		return "[]";
	}

	/**
	 * 站点公告
	 * 
	 * @return
	 */
	@RequestMapping(value = "/bulletin", method = RequestMethod.GET)
	public ModelAndView bulletin(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("bulletins", ucService.findAllByCriterionAndOrder(
				new Page<UCBlog>(1, 10), UCBlog.class, Order.desc("dateline"),
				R.eq("classid", 15)));
		return new ModelAndView("site/bulletin", result);
	}

	/**
	 * 品牌
	 * 
	 * @return
	 */
	@RequestMapping(value = "/brand/{id}")
	public ModelAndView brand(@PathVariable Long id,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		WindSiteRestUtil.covertPID(siteService, result, userId);
		List<T_MallBrand> brands = siteService.findAllByCriterionAndOrder(
				T_MallBrand.class, Order.asc("sortOrder"), R.eq("cid", id), R
						.eq("isValid", true));
		result.put("brands", brands);
		result.put("cats", EnvManager.getBrandCats());
		return new ModelAndView("site/brand", result);
	}

	/**
	 * 频道
	 * 
	 * @return
	 */
	@RequestMapping(value = "/channel/{value}")
	public ModelAndView channel(@PathVariable String value,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		WindSiteRestUtil.covertPID(siteService, result, userId);
		Channel channel = siteService.findByCriterion(Channel.class, R.eq(
				"value", value));
		if (channel == null) {
			channel = siteService.findByCriterion(Channel.class, R.eq("value",
					"channelcode"));
		}
		result.put("channel", channel);
		return new ModelAndView("site/channel", result);
	}

	/**
	 * 商品详情
	 * 
	 * @return
	 */
	@RequestMapping(value = "/description/{id}", method = RequestMethod.GET)
	public ModelAndView itemDetail(@PathVariable String id,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		WindSiteRestUtil.covertPID(siteService, result, userId);
		result.put("desc", TaobaoFetchUtil.itemDescription(id, String
				.valueOf(result.get("nick"))));
		return new ModelAndView("site/template/description", result);
	}

	/**
	 * 新版顶部导航
	 * 
	 * @return
	 */
	@RequestMapping(value = "/pageHeader", method = RequestMethod.GET)
	public ModelAndView pageHeader(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		WindSiteRestUtil.covertPID(siteService, result, userId);
		result.put("isAsyn", true);
		Member member = EnvManager.getMember();
		if (member == null) {
			Cookie[] cookies = request.getCookies();
			if (cookies != null) {
				try {
					String usernameCookie = null;
					String passwordCookie = null;
					for (Cookie cookie : cookies) {
						if ("SESSION_LOGIN_USERNAME".equals(cookie.getName())) {
							usernameCookie = URLDecoder.decode(cookie
									.getValue(), "UTF-8"); // 得到cookie的用户名
						}
						if ("SESSION_LOGIN_PASSWORD".equals(cookie.getName())) {
							passwordCookie = cookie.getValue(); // 得到cookie的密码
						}
					}
					if (usernameCookie != null && passwordCookie != null) { // 如果存在
						String site_id = String.valueOf(result.get("sid"));
						String nick = String.valueOf(result.get("nick"));
						member = siteService
								.validateCookieFanliMember(nick,
										usernameCookie, passwordCookie,
										site_id, userId);
						if (member != null) {
							SiteCommission commission = null;
							if (member.getCommissionRate() == null) {
								commission = siteService.get(
										SiteCommission.class, site_id);
								member.setCommissionRate(commission
										.getCommissionRate());
							}
							if (member.getAdCommissionRate() == null) {
								if (commission == null) {
									commission = siteService.get(
											SiteCommission.class, site_id);
								}
								member.setAdCommissionRate(commission
										.getAdCommissionRate());
							}
							EnvManager.setMember(member);// 设置当前返利会员
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}

		return new ModelAndView("site/designer/include/pageHeader", result);
	}

	/**
	 * 新版底部友情链接
	 * 
	 * @return
	 */
	@RequestMapping(value = "/pageFooter", method = RequestMethod.GET)
	public ModelAndView pageFooter(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		WindSiteRestUtil.covertPID(siteService, result, userId);
		return new ModelAndView("site/designer/include/pageFooter", result);
	}

	/**
	 * 顶部导航
	 * 
	 * @return
	 */
	@RequestMapping(value = "/siteHeader", method = RequestMethod.GET)
	public ModelAndView siteHeader(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		WindSiteRestUtil.covertPID(siteService, result, userId);
		String nick = String.valueOf(result.get("nick"));
		Object version = result.get("versionNo");
		if (EnvManager.getValidHuabaoMembers().contains(nick)
				|| (version != null && (Float) version > 1)
				|| "1".equals(String.valueOf(result.get("appType")))) {// 是否可使用画报
			result.put("isHuabao", true);
		} else {
			result.put("isHuabao", false);
		}
		return new ModelAndView("site/template/siteHeader", result);
	}

	/**
	 * 底部友情链接
	 * 
	 * @return
	 */
	@RequestMapping(value = "/siteFooter", method = RequestMethod.GET)
	public ModelAndView siteFooter(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		WindSiteRestUtil.covertPID(siteService, result, userId);
		return new ModelAndView("site/template/siteFooter2", result);
	}

	/**
	 * 首页
	 * 
	 * @return
	 */
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ModelAndView site(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();

		result.put("lastSites", siteService.findByHql(new Page<Site>(1, 50),
				"from Site where status=1 order by created desc",
				new HashMap<String, Object>()));// 最新更新站点
		result
				.put(
						"lastUsers",
						siteService
								.findByHql(
										new Page<Site>(1, 20),
										"select new map(user_id as user_id,nick as nick) from User order by created desc",
										new HashMap<String, Object>()));// 最新加入的会员
		Map<String, Object> coolParams = new HashMap<String, Object>();
		coolParams.put("isValid", true);
		result
				.put(
						"coolSites",
						siteService
								.findByHql(
										new Page<CoolSite>(1, 9),
										"from CoolSite where isValid=:isValid order by updated desc,sortOrder",
										coolParams));// 新建站点
		return new ModelAndView("site/index", result);
	}

	@RequestMapping(value = "/view/{view}", method = RequestMethod.GET)
	public ModelAndView siteView(@PathVariable String view,
			HttpServletResponse response) {
		if (StringUtils.isNotEmpty(view)) {
			if (EnvManager.getSiteViews().contains(view)) {
				return new ModelAndView("site/" + view);
			} else {
				try {
					response.sendError(404);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

		}
		return null;
	}

	// @RequestMapping(value = "/activity/{partner}", method =
	// RequestMethod.GET)
	// public ModelAndView activity(@PathVariable String partner,
	// HttpServletResponse response) {
	// Map<String, Object> result = new HashMap<String, Object>();
	// result.put("count", siteService.countItemsByNick("hanlong66"));
	// return new ModelAndView("site/activity/" + partner, result);
	// }

	/**
	 * 定向至购物站点
	 * 
	 * @param uid
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/myshop/{uid}", method = RequestMethod.GET)
	public void myshop(@PathVariable String uid, HttpServletRequest request,
			HttpServletResponse response) {
		User user = siteService.findByCriterion(User.class, R.eq("uc_id",
				Integer.parseInt(uid)));
		if (user == null) {
			String username = request.getParameter("username");
			if (StringUtils.isNotEmpty(username))
				try {
					username = new String(username.getBytes("ISO-8859-1"),
							"UTF-8");
					user = siteService.findByCriterion(User.class, R.eq("nick",
							username));

				} catch (UnsupportedEncodingException e) {
				}
		}
		if (user == null) {
			SystemException
					.handleMessageException("该新淘网购物站点与新淘家园尚未绑定,绑定后才可以互相访问.");
		}
		try {
			user.setSites(siteService.findAllByCriterion(Site.class, R.eq(
					"user_id", user.getUser_id())));
			Site site = user.getSites().get(0);
			String url = StringUtils.isNotEmpty(site.getWww()) ? ("http://" + site
					.getWww())
					: ("http://" + site.getDomainName() + ".xintaonet.com");
			response.sendRedirect(url);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 关键词搜索
	 * 
	 * @param word
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/keywords", method = RequestMethod.GET)
	public ModelAndView keyword(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String words = request.getParameter("words");
		String cid = request.getParameter("cid");
		try {
			if (StringUtils.isNotEmpty(words)) {
				words = URLEncoder.encode(new String(words
						.getBytes("ISO-8859-1"), "UTF-8"), "UTF-8");
			}
			if (StringUtils.isEmpty(cid)) {
				cid = "";
			}
			response.setStatus(301);
			response.sendRedirect(WindSiteRestUtil.getUrl(siteService, result,
					userId)
					+ "search?q=" + words + "&cid=" + cid);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 关键词搜索
	 * 
	 * @param word
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/activity/{eventId}", method = RequestMethod.GET)
	public ModelAndView activity(@PathVariable String eventId,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");

		try {
			WindSiteRestUtil.covertPID(siteService, result, userId);
			Activity activity = null;
			List<Activity> activities = EnvManager.getActivities();
			for (Activity a : activities) {
				if (a.getEventId().equals(eventId)) {
					activity = a;
					break;
				}
			}
			if (activity == null) {
				return redirect(result, response);
			}
			result.put("activity", activity);
		} catch (Exception e) {
			return redirect(result, response);
		}

		return new ModelAndView("site/activityDetail", result);
	}

	private ModelAndView redirect(Map<String, Object> result,
			HttpServletResponse response) {
		try {
			if (result.get("www") != null
					&& StringUtils.isNotEmpty((String) result.get("www"))) {// 顶级域名
				response.sendRedirect("http://" + result.get("www"));

			} else if (result.get("domainName") != null
					&& StringUtils
							.isNotEmpty((String) result.get("domainName"))) {// 自定义二级域名
				response.sendRedirect("http://" + result.get("domainName")
						+ ".xintaonet.com");
			} else if (result.get("user_id") != null
					&& StringUtils.isNotEmpty((String) result.get("user_id"))) {// 系统二级域名
				response.sendRedirect("http://shop" + result.get("user_id")
						+ ".xintaonet.com");
			} else {
				response.sendRedirect("http://www.xintaonet.com");
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 购物资讯列表页面(所有)
	 * 
	 * @param uid
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/tblogs", method = RequestMethod.GET)
	public ModelAndView tBlogsList(HttpServletRequest request,
			HttpServletResponse response) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		WindSiteRestUtil.covertPID(siteService, result, userId);
		String pageNoStr = request.getParameter("pageNo");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		Page<UCBlog> page = new Page<UCBlog>(pageNo, 15);
		result.put("blogs", ucService.findByHql(page,
				"from UCBlog b where b.friend=5 and b.uid="
						+ result.get("uc_id") + " order by b.dateline desc",
				new HashMap<String, Object>()));
		Object versionNo = result.get("versionNo");
		if ((versionNo != null && (Float) versionNo >= 1.5)) {// 如果是高版本
			result.put("classes", siteService.findAllByCriterionAndOrder(
					FanliClass.class, Order.asc("sortOrder"), R.eq("user_id",
							result.get("user_id")), R.eq("site_id", result
							.get("sid"))));
		}
		result.put("page", page);
		return new ModelAndView("site/blogList", result);
	}

	/**
	 * 指定分类列表页面
	 * 
	 * @param uid
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/tblogs/{classid}", method = RequestMethod.GET)
	public ModelAndView tBlogsListByClassId(@PathVariable Integer classid,
			HttpServletRequest request, HttpServletResponse response) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		WindSiteRestUtil.covertPID(siteService, result, userId);
		String pageNoStr = request.getParameter("pageNo");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		Page<UCBlog> page = new Page<UCBlog>(pageNo, 15);
		result.put("blogs", ucService.findByHql(page,
				"from UCBlog b where b.classid=" + classid
						+ " order by b.dateline desc",
				new HashMap<String, Object>()));
		result.put("clazz", ucService.get(UCClass.class, classid));
		Object versionNo = result.get("versionNo");
		if ((versionNo != null && (Float) versionNo >= 1.5)) {// 如果是高版本
			result.put("classes", siteService.findAllByCriterionAndOrder(
					FanliClass.class, Order.asc("sortOrder"), R.eq("user_id",
							result.get("user_id")), R.eq("site_id", result
							.get("sid"))));
		}
		result.put("page", page);
		return new ModelAndView("site/blogList", result);
	}

	/**
	 * 日志页面
	 * 
	 * @param uid
	 * @param request
	 * @param response
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/tblogs/{classid}/{blogid}", method = RequestMethod.GET)
	public ModelAndView tBlogs(@PathVariable Integer classid,
			@PathVariable Integer blogid, HttpServletRequest request,
			HttpServletResponse response) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		WindSiteRestUtil.covertPID(siteService, result, userId);

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("blogid", blogid);
		List<Map<String, Object>> fields = (List<Map<String, Object>>) ucService
				.findByHql(
						"select new map(b.username as username,b.blogid as blogid,b.subject as subject,b.classid as classid,b.dateline as dateline,b.hot as hot,f.tag as tag,f.message as message,f.uid as uid) from UCBlog b,UCBlogField f where b.blogid=:blogid and f.blogid=:blogid",
						params);
		if (fields == null || fields.size() == 0) {
			SystemException.handleMessageException("未找到此日志");
		}
		Map<String, Object> field = fields.get(0);
		// Object tag = field.get("tag");
		// if (tag != null && StringUtils.isNotEmpty(String.valueOf(tag))) {//
		// 标签存在
		// try {
		// SerializedPhpParser serializedPhpParser = new SerializedPhpParser(
		// String.valueOf(tag));
		// Map<String, Object> tags = (Map<String, Object>) serializedPhpParser
		// .parse();
		// result.put("tags", tags);
		// } catch (Exception e) {
		// e.printStackTrace();
		// }
		// }
		if (classid != 0) {
			result.put("clazz", ucService.get(UCClass.class, classid));
		}
		Object versionNo = result.get("versionNo");
		if ((versionNo != null && (Float) versionNo >= 1.5)) {// 如果是高版本
			result.put("classes", siteService.findAllByCriterionAndOrder(
					FanliClass.class, Order.asc("sortOrder"), R.eq("user_id",
							result.get("user_id")), R.eq("site_id", result
							.get("sid"))));
			Object adsObject = result.get("ads");
			if (adsObject != null) {
				Map<String, List<Map<String, Object>>> ads = (Map<String, List<Map<String, Object>>>) adsObject;
				List<Map<String, Object>> br = ads.get(AD.BLOG_RIGHT);
				if (br != null && br.size() > 0) {
					result.put("ad", br.get((int) (Math.random() * br.size())));// 随机获取广告位
				}
			}
		}
		result.put("prevBlog", ucService.getPrevBlog(blogid, classid));
		result.put("nextBlog", ucService.getNextBlog(blogid, classid));
		result.put("blog", field);
		return new ModelAndView("site/blog", result);
	}

	/**
	 * 查询我的日志
	 * 
	 * @param uid
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/blogs/me/{uid}", method = RequestMethod.GET)
	public ModelAndView getMyBLogs(@PathVariable Integer uid,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		try {
			response.setStatus(301);
			response.sendRedirect(WindSiteRestUtil.getUrl(siteService, result,
					userId)
					+ "tblogs.html");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 查询指定类别日志
	 * 
	 * @param uid
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/class/{cid}", method = RequestMethod.GET)
	public ModelAndView getBLogsByClass(@PathVariable Integer cid,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		try {
			response.setStatus(301);
			response.sendRedirect(WindSiteRestUtil.getUrl(siteService, result,
					userId)
					+ "tblogs/" + cid + ".html");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 推广组推广
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/tgroup/{gid}")
	public ModelAndView tGroup(@PathVariable String gid,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String type = request.getParameter("t");// 版式
		String skin = request.getParameter("s");// 皮肤
		String order = request.getParameter("o");// 排序字段
		result.put("nOrder", order);
		result.put("nType", type);
		result.put("nSkin", skin);
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("gid", gid);
		params.put("isValid", true);
		// 处理排序
		if (StringUtils.isNotEmpty(order)) {
			order = GROUP_ORDER.get(order);
		}
		if (StringUtils.isEmpty(order)) {
			order = "sortOrder";
		}
		// 处理版式
		if (StringUtils.isNotEmpty(type)) {
			type = TYPES.get(type);
		}
		if (StringUtils.isEmpty(type)) {
			type = "default";
		}
		// 处理版式
		if (StringUtils.isNotEmpty(skin)) {
			skin = SKINS.get(skin);
		}
		if (StringUtils.isEmpty(skin)) {
			skin = "default";
		}
		ItemGroup group = siteService.get(ItemGroup.class, gid);
		if (group == null) {
			SystemException.handleMessageException("当前推广组不存在");
		}
		List<ItemGroup> groups = siteService.findAllByCriterion(
				ItemGroup.class, R.eq("user_id", group.getUser_id()));
		List<T_TaobaokeItem> items = (List<T_TaobaokeItem>) siteService
				.findByHql(
						"from T_TaobaokeItem where gid=:gid and isValid=:isValid order by "
								+ order, params);// 查询指定推广组的商品(排序)

		try {
			String pid = WindSiteRestUtil
					.covertPID(siteService, result, userId);
			if (StringUtils.isEmpty(pid)) {
				result.put("pid", EnvManager.getDefaultPid());
			}
			result.put("group", group);
			result.put("groups", groups);
			result.put("items", items);
			result.put("tOrder", order);
			result.put("tType", type);
			result.put("tSkin", skin);
		} catch (Exception e) {
			return redirect(result, response);
		}
		return new ModelAndView("haibao/group/" + type + "/group", result);
	}

	/**
	 * 店铺推广
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/tshop/{sid}")
	public ModelAndView tShop(@PathVariable String sid,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		try {
			WindSiteRestUtil.covertPID(siteService, result, userId);
			List<TaobaokeShop> taokeShops = TaobaoFetchUtil.convertTaobaoShop(
					String.valueOf(result.get("appType")), (String) result
							.get("nick"), sid);
			if (taokeShops == null || taokeShops.size() != 1) {
				try {
					response
							.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
					response.sendRedirect(WindSiteRestUtil.getUrl(siteService,
							result, userId)
							+ "error/shop404");
				} catch (Exception e) {
				}
			}
			Long cid = null;
			TaobaokeShop shop = taokeShops.get(0);
			T_TaobaokeShop local = siteService.findByCriterion(
					T_TaobaokeShop.class, R.eq("sid", Long.valueOf(sid)));
			result.put("shop", shop);// 店铺
			result.put("sid", sid);
			if (local != null) {
				if (StringUtils.isNotEmpty(local.getNick())) {
					cid = local.getCid();
					result.put("local", local);// 本地店铺
				} else {
					return new ModelAndView("site/tshop", result);// 直接定向至推广
				}
			} else {// 如果本地没有则加入
				local = new T_TaobaokeShop();
				local.setCommissionRate(shop.getCommissionRate());
				local.setIsValid(true);
				local.setSellerCredit(shop.getSellerCredit());
				local.setTitle(shop.getShopTitle());
				local.setUserId(shop.getUserId());
				local.setSid(Long.valueOf(sid));
				siteService.save(local);
				return new ModelAndView("site/tshop", result);// 直接定向至推广
			}
			// 查询同类店铺
			if (cid != null) {
				TaobaokeShopsGetRequest shopGetRequest = new TaobaokeShopsGetRequest();
				try {
					shopGetRequest.setCid(Long.valueOf(cid));
				} catch (Exception e) {
				}
				shopGetRequest.setStartCredit("3crown");
				shopGetRequest.setEndCredit("5goldencrown");
				shopGetRequest.setFields(TaobaoFetchUtil.TAOBAOKESHOP_FIELDS);
				shopGetRequest.setNick((String) result.get("nick"));
				shopGetRequest.setPageNo(1L);
				shopGetRequest.setPageSize(Long.valueOf(10));
				TaobaokeShopsGetResponse shopGetResponse = TaobaoFetchUtil
						.shopsGet(String.valueOf(result.get("appType")),
								shopGetRequest);
				if (shopGetResponse != null) {
					if (shopGetResponse.isSuccess()) {
						Long total = shopGetResponse.getTotalResults();
						if (total != null && total > 0) {
							List<TaobaokeShop> shops = shopGetResponse
									.getTaobaokeShops();
							result.put("shops", shops);
							// 本地查询结束
						}
					}
				}
			}
			File file = new File(EnvManager.getUserPath("shop" + userId)
					+ "shopDetail.html");
			if (!file.exists()) {// 生成当前用户的新版店铺详情页
				if (!CommandExecutor.getCachecommands().containsKey(
						"usershop-" + userId)) {// 如果不在队列中
					UserShopDetailCommand command = new UserShopDetailCommand();
					command.setFcg(fcg);
					command.setPageService(pageService);
					command.setUserId(userId);
					CommandExecutor.getCachecommands().put(
							"usershop-" + userId, command);
				}
			}
			if (local != null && StringUtils.isNotEmpty(local.getNick())) {
				file = new File(EnvManager.getShopPath() + File.separator
						+ sid.substring(sid.length() - 2, sid.length())
						+ File.separator + sid + File.separator + sid + ".html");
				Calendar calendar = Calendar.getInstance();
				calendar.add(Calendar.DATE, -3);
				if (!file.exists()
						|| file.lastModified() < calendar.getTimeInMillis()) {// 如果不存在或者时间差超过3天
					// 生成当前店铺详情相关页
					if (!CommandExecutor.getCachecommands().containsKey(
							"shop-" + sid)) {// 如果不在队列中
						ShopDetailCommand command = new ShopDetailCommand();
						command.setFcg(fcg);
						command.setPageService(pageService);
						command.setSellerNick(local.getNick());
						command.setSid(Long.valueOf(sid));
						CommandExecutor.getCachecommands().put("shop-" + sid,
								command);
					}
				}
			}
		} catch (Exception e) {
			return redirect(result, response);
		}
		return new ModelAndView("site/shop", result);
	}

	/**
	 * 店铺推广
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/gshop/{sid}")
	public ModelAndView gShop(@PathVariable String sid,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		try {
			WindSiteRestUtil.covertPID(siteService, result, userId);
			Float versionNo = 1.0f;
			try {
				versionNo = Float.valueOf(String.valueOf(result
						.get("versionNo")));
			} catch (Exception e) {
				e.printStackTrace();
			}
			List<TaobaokeShop> shops = TaobaoFetchUtil.convertTaobaoShop(
					versionNo > 1.5f ? null : "1", WindSiteRestUtil
							.filterUnValidNick((String) result.get("nick")),
					sid);
			if (shops == null || shops.size() != 1) {
				SystemException.handleMessageException("该店铺不存在，或者未加入淘宝推广计划");
			}
			result.put("shop", shops.get(0));
			result.put("sid", sid);
		} catch (Exception e) {
			return redirect(result, response);
		}
		return new ModelAndView("site/tshop", result);
	}

	/**
	 * 商品推广
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/gitem/{nid}")
	public ModelAndView gItem(@PathVariable String nid,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");

		WindSiteRestUtil.covertPID(siteService, result, userId);
		// 详情
		TaobaokeItemsDetailGetRequest getRequest = new TaobaokeItemsDetailGetRequest();
		getRequest.setNick(WindSiteRestUtil.filterUnValidNick((String) result
				.get("nick")));// 昵称
		getRequest.setNumIids(nid);
		getRequest.setFields("click_url,num_iid,title,nick");
		getRequest.setOuterCode(EnvManager.getItemsOuterCode());
		Float versionNo = 1.0f;
		try {
			versionNo = Float.valueOf(String.valueOf(result.get("versionNo")));
		} catch (Exception e) {
			e.printStackTrace();
		}
		TaobaokeItemsDetailGetResponse getResponse = TaobaoFetchUtil
				.getItemsDetail(versionNo > 1.5f ? null : "1", getRequest);
		if (getResponse == null) {
			SystemException.handleMessageException("该商品已移除或者被卖家下架");
		}
		List<TaobaokeItemDetail> itemList = getResponse
				.getTaobaokeItemDetails();
		if (itemList == null || itemList.size() != 1) {
			String keyword = request.getParameter("keyword");
			String catid = request.getParameter("catid");
			if (StringUtils.isNotEmpty(keyword)) {
				TaobaokeListurlGetRequest req = new TaobaokeListurlGetRequest();
				try {
					keyword = new String(keyword.getBytes("ISO-8859-1"),
							"GB2312");
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
				req.setQ(keyword);
				req.setNick((String) result.get("nick"));
				req.setOuterCode(EnvManager.getKeywordsOuterCode());
				String clickurl = TaobaoFetchUtil.getKeyWordUrl(String
						.valueOf(result.get("appType")), req);
				if (StringUtils.isEmpty(clickurl)) {
					return redirect(result, response);
				}
				result.put("title", keyword);
				result.put("cid", catid);
				result.put("redirect", clickurl);
				return new ModelAndView("site/taobaoRedirect", result);
			}
			SystemException.handleMessageException("该商品不存在，或者未加入淘宝推广计划");
		}
		TaobaokeItemDetail detail = itemList.get(0);
		if (StringUtils.isEmpty(detail.getClickUrl())) {// 如果推广链接为空,则通过convert再次获取
			List<TaobaokeItem> items = TaobaoFetchUtil.huabaoItemConvert(String
					.valueOf(result.get("appType")), nid, (String) result
					.get("nick"));
			if (items != null && items.size() == 1) {
				detail.setClickUrl(items.get(0).getClickUrl());
			}
		}
		result.put("detail", detail);
		return new ModelAndView("site/titem", result);
	}

	/**
	 * 商品推广
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/titem/{nid}")
	public ModelAndView tItem(@PathVariable String nid,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		WindSiteRestUtil.covertPID(siteService, result, userId);
		// 详情
		TaobaokeItemsDetailGetRequest getRequest = new TaobaokeItemsDetailGetRequest();
		getRequest.setNick((String) result.get("nick"));// 昵称
		getRequest.setNumIids(nid);
		getRequest.setFields(TaobaoFetchUtil.DETAIL_FIELDS);
		getRequest.setOuterCode(EnvManager.getItemsOuterCode());
		TaobaokeItemsDetailGetResponse getResponse = TaobaoFetchUtil
				.getItemsDetail(String.valueOf(result.get("appType")),
						getRequest);
		if (getResponse == null) {
			try {
				response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
				response.sendRedirect(WindSiteRestUtil.getUrl(siteService,
						result, userId)
						+ "error/item404");
			} catch (Exception e) {
			}
			// SystemException.handleMessageException("该商品已移除或者被卖家下架");
		}
		List<TaobaokeItemDetail> itemList = getResponse
				.getTaobaokeItemDetails();
		if (itemList == null || itemList.size() != 1) {
			try {
				response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
				response.sendRedirect(WindSiteRestUtil.getUrl(siteService,
						result, userId)
						+ "error/item404");
			} catch (Exception e) {
			}
			// SystemException.handleMessageException("该商品已移除或者被卖家下架");
		}
		TaobaokeItemDetail item = itemList.get(0);// 单个商品
		List<TradeRate> rates = new ArrayList<TradeRate>();
		Long totalResults = 0L;
		if (StringUtils.isNotEmpty(item.getItem().getNick())) {// 详情
			TraderatesSearchResponse resp = TaobaoFetchUtil.traderatesSearch(
					Long.valueOf(nid), item.getItem().getNick(), 1L, 40L);
			if (resp != null) {
				totalResults = resp.getTotalResults();
				rates = resp.getTradeRates();
			}
		}
		result.put("totalResults", totalResults);
		result.put("rates", rates);
		result.put("item", item.getItem());
		result.put("detail", item);
		File file = new File(EnvManager.getUserPath("shop" + userId)
				+ "itemDetail.html");
		if (!file.exists()) {// 生成当前用户的新版宝贝详情页
			if (!CommandExecutor.getCachecommands().containsKey(
					"user-" + userId)) {// 如果不在队列中
				UserItemDetailCommand command = new UserItemDetailCommand();
				command.setFcg(fcg);
				command.setPageService(pageService);
				command.setUserId(userId);
				CommandExecutor.getCachecommands().put("user-" + userId,
						command);
			}
		}

		file = new File(EnvManager.getItemPath() + File.separator
				+ nid.substring(nid.length() - 3, nid.length())
				+ File.separator + nid + File.separator + nid + ".html");
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DATE, -1);
		if (!file.exists() || file.lastModified() < calendar.getTimeInMillis()) {// 如果不存在或者时间差超过1天
			// 生成当前商品详情相关页
			Long numIid = item.getItem().getNumIid();
			if (!CommandExecutor.getCachecommands().containsKey(
					"item-" + numIid)) {// 如果不在队列中
				ItemDetailCommand command = new ItemDetailCommand();
				command.setDetail(item);
				command.setFcg(fcg);
				command.setPageService(pageService);
				CommandExecutor.getCachecommands().put("item-" + numIid,
						command);
			}
		}
		return new ModelAndView("site/itemdetails", result);
	}

	/**
	 * 店铺收藏推广
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/tfavshop")
	public ModelAndView tFavShop(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String type = request.getParameter("t");// 版式
		String skin = request.getParameter("s");// 皮肤
		String order = request.getParameter("o");// 排序字段
		Map<String, Object> params = new HashMap<String, Object>();
		// 处理排序
		if (StringUtils.isNotEmpty(order)) {
			order = SHOP_ORDER.get(order);
		}
		if (StringUtils.isEmpty(order)) {
			order = "sf.sortOrder";
		}
		// 处理版式
		if (StringUtils.isNotEmpty(type)) {
			type = TYPES.get(type);
		}
		if (StringUtils.isEmpty(type)) {
			type = "default";
		}
		// 处理版式
		if (StringUtils.isNotEmpty(skin)) {
			skin = SKINS.get(skin);
		}
		if (StringUtils.isEmpty(skin)) {
			skin = "default";
		}

		try {
			String pid = WindSiteRestUtil
					.covertPID(siteService, result, userId);
			if (StringUtils.isEmpty(pid)) {
				result.put("pid", EnvManager.getDefaultPid());
			}
			if (StringUtils.isNotEmpty(userId)) {
				params.put("userId", userId);
			} else if (EnvManager.getUser() != null) {
				params.put("userId", EnvManager.getUser().getUser_id());
			} else {
				SystemException.handleMessageException("没有找到淘宝店铺");
			}
			List<T_TaobaokeShop> shops = (List<T_TaobaokeShop>) siteService
					.findByHql(
							new Page<T_TaobaokeShop>(1, 100),
							"select s from T_TaobaokeShop as s,W_ShopFavorite as sf,ShopGroup as sg where sg.user_id=:userId and sg.id=sf.gid and s.userId=sf.user_id and s.sid is not null order by s.sellerCredit desc",
							params);// 查询指定会员的店铺收藏(排序)
			result.put("shops", shops);
			result.put("tOrder", order);
			result.put("tType", type);
			result.put("tSkin", skin);
		} catch (Exception e) {
			return redirect(result, response);
		}
		return new ModelAndView("haibao/shop/" + type + "/shop", result);
	}

	/**
	 * 查询日志详情
	 * 
	 * @param uid
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/blog/{uid}/{blogid}", method = RequestMethod.GET)
	public ModelAndView getBLog(@PathVariable Integer uid,
			@PathVariable Integer blogid, HttpServletRequest request,
			HttpServletResponse response) {
		UCBlog blog = ucService.get(UCBlog.class, blogid);
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		try {
			if (blog != null) {
				response.setStatus(301);
				response.sendRedirect(WindSiteRestUtil.getUrl(siteService,
						result, userId)
						+ "tblogs/"
						+ blog.getClassid()
						+ "/"
						+ blogid
						+ ".html");
			} else {
				response.setStatus(301);
				response.sendRedirect(WindSiteRestUtil.getUrl(siteService,
						result, userId)
						+ "tblogs.html");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 查询全部日志
	 * 
	 * @param uid
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/blogs/{uid}", method = RequestMethod.GET)
	public ModelAndView getAllBLogs(@PathVariable Integer uid,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		try {
			response.setStatus(301);
			response.sendRedirect(WindSiteRestUtil.getUrl(siteService, result,
					userId)
					+ "tblogs.html");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 查询我的好友日志
	 * 
	 * @param uid
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/blogs/friends/{uid}", method = RequestMethod.GET)
	public ModelAndView getMyFriendsBLogs(@PathVariable Integer uid,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		try {
			response.setStatus(301);
			response.sendRedirect(WindSiteRestUtil.getUrl(siteService, result,
					userId)
					+ "tblogs.html");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/item/{id}", method = RequestMethod.GET)
	public ModelAndView getItemDetail(@PathVariable String id,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		T_TaobaokeItem item = siteService.get(T_TaobaokeItem.class, id);
		if (item == null) {// 如果商品不存在，定向至首页
			WindSiteRestUtil.covertPID(siteService, result, userId);
			response.setStatus(301);
			return redirect(result, response);
		} else {// 存在则定向至新的详情页面
			try {
				response.setStatus(301);
				response.sendRedirect(WindSiteRestUtil.getUrl(siteService,
						result, userId)
						+ "titem/" + item.getNum_iid() + ".html");
			} catch (IOException e) {
				e.printStackTrace();
				return null;
			}
		}
		return null;
	}

	public static final Properties properties = new Properties();
	static {
		try {
			properties.load(SiteRest.class
					.getResourceAsStream("cids.properties"));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/shops/{cid}", method = RequestMethod.GET)
	public ModelAndView searchShops(@PathVariable String cid,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		try {
			response.setStatus(301);
			response.sendRedirect(WindSiteRestUtil.getUrl(siteService, result,
					userId)
					+ "shops");
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/shops")
	public ModelAndView searchShopsByFilter(HttpServletRequest request,
			HttpServletResponse response) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		WindSiteRestUtil.covertPID(siteService, result, userId);
		TaobaokeShopsGetRequest shopGetRequest = new TaobaokeShopsGetRequest();
		String pageNoStr = request.getParameter("pageNo");
		Integer pageNo = 1;
		try {
			pageNo = Integer.parseInt(pageNoStr);
		} catch (Exception e) {
			pageNo = 1;
		}
		String cid = request.getParameter("cid");
		if (StringUtils.isNotEmpty(cid)) {
			shopGetRequest.setCid(Long.valueOf(cid));
		} else {
			cid = "";
		}
		String q = request.getParameter("q");
		if (StringUtils.isNotEmpty(q)) {
			if ("get".equalsIgnoreCase(request.getMethod())) {
				try {
					q = new String(q.getBytes("ISO-8859-1"), "UTF-8");
				} catch (UnsupportedEncodingException e) {
					q = "";
				}
			}
		}

		String keyword = request.getParameter("keyword");
		if (StringUtils.isNotEmpty(keyword)) {
			if ("get".equalsIgnoreCase(request.getMethod())) {
				try {
					q = new String(keyword.getBytes("ISO-8859-1"), "UTF-8");
				} catch (UnsupportedEncodingException e) {
					q = "";
				}
			}
		}
		shopGetRequest.setKeyword(q);
		if (StringUtils.isEmpty(cid) && StringUtils.isEmpty(q)) {
			shopGetRequest.setCid(14L);
		}
		String only_mall = request.getParameter("only_mall");
		if (StringUtils.isNotEmpty(only_mall)) {
			shopGetRequest.setOnlyMall("true".equals(only_mall) ? true : false);
		} else {
			only_mall = "";
		}
		result.put("catName", request.getParameter("catName"));
		String start_credit = request.getParameter("start_credit");
		if (StringUtils.isNotEmpty(start_credit)) {
			shopGetRequest.setStartCredit(start_credit);
		} else {
			start_credit = "";
		}
		String end_credit = request.getParameter("end_credit");
		if (StringUtils.isNotEmpty(end_credit)) {
			shopGetRequest.setEndCredit(end_credit);
		} else {
			end_credit = "";
		}
		shopGetRequest.setFields(TaobaoFetchUtil.TAOBAOKESHOP_FIELDS);
		shopGetRequest.setNick(String.valueOf(result.get("nick")));
		Page<T_TaobaokeShop> page = new Page<T_TaobaokeShop>(pageNo, 15);
		TaobaokeShopsGetResponse shopGetResponse = TaobaoFetchUtil.shopsGet(
				String.valueOf(result.get("appType")), shopGetRequest);
		if (shopGetResponse != null) {
			if (shopGetResponse.isSuccess()) {
				Long total = shopGetResponse.getTotalResults();
				if (total != null && total > 0) {
					List<TaobaokeShop> shops = shopGetResponse
							.getTaobaokeShops();
					result.put("shops", shops);
					// 本地查询开始
					String uids = "";
					Boolean isFirst = true;
					for (TaobaokeShop shop : shops) {
						if (isFirst) {
							isFirst = false;
						} else {
							uids += ",";
						}
						uids += shop.getUserId();
					}
					List<T_TaobaokeShop> localList = (List<T_TaobaokeShop>) siteService
							.findByHql("from T_TaobaokeShop where userId in ("
									+ uids + ")", new HashMap<String, Object>());
					Map<String, T_TaobaokeShop> local = new HashMap<String, T_TaobaokeShop>();
					if (localList != null && localList.size() > 0) {
						for (T_TaobaokeShop shop : localList) {
							local.put(shop.getUserId() + "", shop);
						}
					}
					result.put("extra", local);
					page.setTotalCount(total.intValue());
					// 本地查询结束
				}
			}
		}
		result.put("start_credit", start_credit);
		result.put("end_credit", end_credit);
		result.put("page", page);
		result.put("q", q);
		result.put("cid", cid);
		result.put("only_mall", only_mall);
		result.put("cats", EnvManager.getShopCats());
		return new ModelAndView("site/shopSearch", result);
	}

	@RequestMapping(value = "/ads", method = RequestMethod.GET)
	public ModelAndView getAds(HttpServletRequest request,
			HttpServletResponse response) {
		try {
			response.sendError(404);
		} catch (IOException e) {
			e.printStackTrace();
		}
		String partner = request.getParameter("partner");
		String page = request.getParameter("page");
		Map<String, Object> result = new HashMap<String, Object>();
		if (StringUtils.isNotEmpty(partner))
			result.put("partner", partner);
		if (StringUtils.isNotEmpty(page))
			result.put("page", page);
		return new ModelAndView("site/ads", result);
	}

	@RequestMapping(value = "/coolsites", method = RequestMethod.GET)
	public ModelAndView getCoolSites(HttpServletRequest request,
			HttpServletResponse response) {
		String pageNoStr = request.getParameter("pageNo");
		String pageSizeStr = request.getParameter("pageSize");
		Integer pageNo = 1;
		Integer pageSize = 15;
		try {
			if (StringUtils.isNotEmpty(pageNoStr)) {
				pageNo = Integer.parseInt(pageNoStr);
			}
			if (StringUtils.isNotEmpty(pageSizeStr)) {
				pageSize = Integer.parseInt(pageSizeStr);
			}
		} catch (Exception e) {
		}
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("isValid", true);
		Page<CoolSite> page = new Page<CoolSite>(pageNo, pageSize);
		List<CoolSite> sites = (List<CoolSite>) siteService.findByHql(page,
				"from CoolSite where isValid=:isValid order by updated desc",
				params);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("coolSites", sites);
		result.put("page", page);
		return new ModelAndView("site/coolsites", result);
	}

	@RequestMapping(value = "/coolsites/{id}", method = RequestMethod.GET)
	public ModelAndView getCoolSite(@PathVariable String id,
			HttpServletResponse response) {
		CoolSite site = siteService.get(CoolSite.class, id);
		if (site == null) {
			SystemException.handleMessageException("该酷站不存在!");
		}
		return new ModelAndView("site/coolsite", "coolSite", site);
	}

	/**
	 * 登录
	 * 
	 * @return
	 */
	@RequestMapping(value = "/login")
	public ModelAndView login(HttpServletRequest request,
			HttpServletResponse response) {
		String userId = request.getParameter("USER");
		String pid = request.getParameter("pid");
		if (StringUtils.isNotEmpty(pid)) {

		}
		if (StringUtils.isNotEmpty(userId)) {// 返利登录
			if (EnvManager.getMember() != null) {// 如果已登录
				return new ModelAndView(new RedirectView("router/fanlimember"),
						"USER", request.getParameter("USER"));// 重定向到会员中心
			}
			String username = request.getParameter("username");
			String password = request.getParameter("password");// TODO 密码加密
			// 暂不对密码加密，暂不加入验证码
			if (StringUtil.isEmpty(username) || StringUtil.isEmpty(password)) {
				SystemException.handleMessageException("会员用户名及密码不能为空");
			}
			Map<String, Object> result = new HashMap<String, Object>();
			WindSiteRestUtil.covertPID(siteService, result, userId);
			if (WindSiteRestUtil.isFanli(result)) {
				String site_id = String.valueOf(result.get("sid"));
				String nick = String.valueOf(result.get("nick"));
				Member member = siteService.validateFanliMember(nick, username,
						password, site_id, userId);
				if (member != null) {
					SiteCommission commission = null;
					if (member.getCommissionRate() == null) {
						commission = siteService.get(SiteCommission.class,
								site_id);
						member
								.setCommissionRate(commission
										.getCommissionRate());
					}
					if (member.getAdCommissionRate() == null) {
						if (commission == null) {
							commission = siteService.get(SiteCommission.class,
									site_id);
						}
						member.setAdCommissionRate(commission
								.getAdCommissionRate());
					}
					EnvManager.setMember(member);// 设置当前返利会员
					return new ModelAndView(new RedirectView(
							"router/fanlimember"), "USER", request
							.getParameter("USER"));// 重定向到会员中心
				} else {
					SystemException.handleMessageException("当前站点不支持会员登录");
				}
			}

		}
		if (StringUtils.isNotEmpty(request.getParameter("top_parameters"))) {// 淘宝回调
			validateTaobao(request);// 淘宝回调校验成功
		}
		// if (EnvManager.isAudit()) {// 如果是审核过程中，每次校验
		// if (StringUtils.isNotEmpty(request.getParameter("top_parameters")))
		// {// 淘宝回调
		// validateTaobao(request);// 淘宝回调校验成功
		// }
		// } else {// 非审核过程，可判断是否已登录
		// if (EnvManager.getUser() == null) {// 尚未登录
		// if (StringUtils.isNotEmpty(request
		// .getParameter("top_parameters"))) {// 淘宝回调
		// validateTaobao(request);// 淘宝回调校验成功
		// }
		// }
		// }
		String redirect = request.getParameter("redirect");
		if (StringUtils.isNotEmpty(redirect)) {
			try {
				response.sendRedirect(redirect);// 重定向
				return null;
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		if (EnvManager.getUser() != null) {
			try {
				// TODO 暂时不对不匹配版本进行校验
				if (EnvManager.getUser().getApp().equals(
						EnvManager.getUser().getAppType())) {//
					// 如果会员应用版本与登录版本一致，则进入管理后台，不一致则跳转至重定向页面重新登录
					if (EnvManager.getUser().getUsb() != null) {// 如果版本号存在
						Float versionNo = EnvManager.getUser().getUsb()
								.getVersionNo();
						if (versionNo >= 2) {// 设置ThinkPhp Cookie
							try {
								// User user = EnvManager.getUser();
								// Client e = new Client();
								// //
								// Cookie[userId+nick+pid+sid+versionNo+siteId+tSession+www]
								// Cookie auth = new Cookie("XINTAO-ID", e
								// .uc_authcode(user.getUser_id(),
								// "ENCODE"));
								// auth.setMaxAge(2400);
								// auth.setDomain(".xintaonet.com");
								// response.addCookie(auth);
								// Cookie nick = new Cookie("XINTAO-NICK", e
								// .uc_authcode(user.getNick(), "ENCODE"));
								// nick.setMaxAge(2400);
								// nick.setDomain(".xintaonet.com");
								// response.addCookie(nick);
								// Cookie tSession = new Cookie("XINTAO-TS",
								// EnvManager.getTaobaoSession());
								// tSession.setMaxAge(2400);
								// tSession.setDomain(".xintaonet.com");
								// response.addCookie(tSession);
							} catch (Exception e) {
								e.printStackTrace();
							}
						}
						String sid = EnvManager.getUser().getSid();
						if (versionNo > 2 && StringUtils.isNotEmpty(sid)
								&& !"0".equals(sid)) {// 收费版（卖家）
							response.sendRedirect("http://"
									+ request.getServerName()
									+ "/router/member/sellermanager");
						} else {// 免费版（淘客）
							response.sendRedirect("http://"
									+ request.getServerName()
									+ "/router/member/sitemanager");
						}
					} else {
						response.sendRedirect("http://"
								+ request.getServerName()
								+ "/router/site/redirect");
					}
				} else {
					response.sendRedirect("http://" + request.getServerName()
							+ "/router/site/redirect");
				}
				return null;
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			try {
				response.sendRedirect("http://" + request.getServerName()
						+ "/router/site");
				return null;
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	public static final String USER_TSESSION = "tSession"; // 淘宝SESSION
	public static final String USER_USERID = "userId"; // 站长用户标识
	public static final String USER_SITEID = "siteId"; // 站长站点标识
	public static final String USER_NICK = "nick"; // 站长昵称
	public static final String USER_VERSIONNO = "versionNo"; // 站长版本号
	public static final String USER_WWW = "www"; // 站长域名
	public static final String USER_REDIRECT = "redirect"; // 站长域名

	@RequestMapping(value = "/loginuc", method = RequestMethod.GET)
	public ModelAndView loginUC(HttpServletRequest request,
			HttpServletResponse response) {
		String redirect = request.getParameter("redirect");
		if (EnvManager.getUser() != null) {
			ModelAndView mav = loginDiscuz(EnvManager.getUser(), response);
			if (mav != null) {
				mav.addObject("redirect", redirect);
				mav.addObject("title", redirect.indexOf("home") != -1 ? "新淘家园"
						: "新淘网官方论坛");
				return mav;
			}
		} else {
			try {
				response.sendRedirect(redirect);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	public ModelAndView loginDiscuz(User user, HttpServletResponse response) {
		Client e = new Client();
		String result = e.uc_user_login(user.getNick(), "_i8c8e5u8y4");
		LinkedList<String> rs = XMLHelper.uc_unserialize(result);
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		String msg = "登录失败";
		String script = "";
		ModelAndView mav = new ModelAndView("site/loginuc");
		if (rs.size() > 0) {
			int $uid = Integer.parseInt(rs.get(0));
			String $username = rs.get(1);
			String $password = rs.get(2);
			@SuppressWarnings("unused")
			String $email = rs.get(3);
			if ($uid > 0) {
				msg = "登录成功";
				script = e.uc_user_synlogin($uid);
				Cookie auth = new Cookie("auth", e.uc_authcode($password + "\t"
						+ $uid, "ENCODE"));
				auth.setMaxAge(31536000);
				response.addCookie(auth);
				try {
					$username = URLEncoder.encode($username, "UTF-8");
				} catch (UnsupportedEncodingException e1) {
					e1.printStackTrace();
				}
				Cookie cuser = new Cookie("uchome_loginuser", $username);
				response.addCookie(cuser);
				if (user.getUc_id() == null || user.getUc_id() == 0) {// 如果用户UC_ID尚未同步
					user.setUc_id($uid);// 设置进当前session
					User wuser = siteService.get(User.class, user.getId());
					if (user != null) {
						wuser.setUc_id($uid);
						user
								.setSites(siteService.findAllByCriterion(
										Site.class, R.eq("user_id", user
												.getUser_id())));
						siteService.update(wuser);// 更新
					}
				}
			} else if ($uid == -1) {
				logger.info("【" + user.getNick() + "】用户不存在,或者被删除");
				return registerDiscuz(user, response);// 重新注册
			} else if ($uid == -2) {
				logger.info("【" + user.getNick() + "】密码错");
				return updateDiscuz(user, response);// 密码错误则修改为默认密码
			} else {
				msg = ("【" + user.getNick() + "】未定义");
			}
		} else {
			msg = ("【" + user.getNick() + "】" + result);
		}
		mav.addObject("msg", msg);
		mav.addObject("script", script);
		return mav;
	}

	public ModelAndView registerDiscuz(User user, HttpServletResponse response) {
		Client uc = new Client();
		String account = user.getAlipay_account();
		String $returns = uc
				.uc_user_register(user.getNick(), "_i8c8e5u8y4",
						(StringUtils.isNotEmpty(account) && account
								.indexOf("@") != -1) ? account
								: "test@xintaonet.com");
		int $uid = Integer.parseInt($returns);
		if ($uid <= 0) {
			if ($uid == -1) {
				logger.info("【" + user.getNick() + "】用户名不合法");
			} else if ($uid == -2) {
				logger.info("【" + user.getNick() + "】包含要允许注册的词语");
			} else if ($uid == -3) {
				logger.info("【" + user.getNick() + "】用户名已经存在");
				return loginDiscuz(user, response);// 如果存在以当前用户名登录
			} else if ($uid == -4) {
				logger.info("【" + user.getNick() + "】Email 格式有误");
			} else if ($uid == -5) {
				logger.info("【" + user.getNick() + "】Email 不允许注册");
			} else if ($uid == -6) {
				logger.info("【" + user.getNick() + "】该 Email 已经被注册");
			} else {
				logger.info("【" + user.getNick() + "】未定义");
			}
		} else {
			logger.info("【" + user.getNick() + "】OK:" + $returns);
			return loginDiscuz(user, response);
		}
		return null;
	}

	public ModelAndView updateDiscuz(User user, HttpServletResponse response) {
		Client e = new Client();
		try {
			String result = e.uc_user_edit(user.getNick(), null, "_i8c8e5u8y4",
					null, 1, null, null);
			int i = Integer.parseInt(result);
			switch (i) {
			case 1:
				logger.info("【" + user.getNick() + "】修改成功");
				return loginDiscuz(user, response);// 修改成功则登录
			case 0:
				logger.info("【" + user.getNick() + "】没有任何修改");
				break;
			case -1:
				logger.info("【" + user.getNick() + "】旧密码不正确");
				break;
			case -4:
				logger.info("【" + user.getNick() + "】email 格式有误");
				break;
			case -5:
				logger.info("【" + user.getNick() + "】email 不允许注册");
				break;
			case -6:
				logger.info("【" + user.getNick() + "】该 email 已经被注册");
				break;
			case -7:
				logger.info("【" + user.getNick() + "】没有做任何修改");
				break;
			case -8:
				logger.info("【" + user.getNick() + "】受保护的用户，没有权限修改");
				break;
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/notify", method = RequestMethod.GET)
	@ResponseBody
	public String notify(HttpServletRequest request) {
		// String tenantId = request.getParameter("tenantId");//
		// String租户ID，取值：USER＋MD5（userId）、CORP＋MD5（corpId）、TRIB＋MD5（tribeId）
		// String userId = request.getParameter("userId");// Long 订购者的用户数字Id
		// String nick = request.getParameter("nick");// String 订购者的用户昵称
		// String leaseId = request.getParameter("leaseId");//
		// Long租赁实体ID：应用ID或者应用包ID
		// String leaseType = request.getParameter("leaseType");//
		// Integer租赁实体类型，取值：0，应用，1，应用包
		// String subscId = request.getParameter("subscId");// Long AppStore订单ID
		// String validateDate = request.getParameter("validateDate");//
		// Date生效日期例如：2009-01-0100:00:00
		// String invalidateDate = request.getParameter("invalidateDate");//
		// Date失效日期，例如：2009-12-3123:59:59
		// String totalAmount = request.getParameter("totalAmount");//
		// double总金额，例如：9.80
		// String rentAmount = request.getParameter("rentAmount");//
		// double月租金额2.00
		// String resourceAmount = request.getParameter("resourceAmount");//
		// double资源金额7.80
		// String isvOrderId = request.getParameter("isvOrderId");//
		// StringISV外部订单号
		// String subscType = request.getParameter("subscType");//
		// Integer订购类型：0-无试用期新订、1-试用期新订、2-未到期续订、3-到期续订
		// String pricePolicy = request.getParameter("pricePolicy");//
		// Integer价格策略：0-免费、1-月租
		// String sign = request.getParameter("sign");// String 签名
		// String _sign = EncryptUtil.md5Signature(new HashMap(request
		// .getParameterMap()), EnvManager.getSecret(), "sign");
		// logger.info("订购通知:[tenantId=" + tenantId + ",userId=" + userId
		// + ",nick=" + nick + ",leaseId=" + leaseId + ",leaseType="
		// + leaseType + ",subscId=" + subscId + ",validateDate="
		// + validateDate + ",invalidateDate=" + invalidateDate
		// + ",totalAmount=" + totalAmount + ",rentAmount=" + rentAmount
		// + ",resourceAmount=" + resourceAmount + ",isvOrderId="
		// + isvOrderId + ",subscType=" + subscType + ",pricePolicy="
		// + pricePolicy + "]");
		// logger.info("订购校验:sign=" + sign + ",_sign=" + _sign);
		// if (StringUtils.isNotEmpty(sign) && sign.equals(_sign)) {//
		// 淘宝箱订阅签名校验成功
		// Integer _pricePolicy = Integer.parseInt(pricePolicy);
		// Notify notify = new Notify();
		// notify.setTenantId(tenantId);
		// notify.setUserId(userId);
		// notify.setNick(nick);
		// notify.setLeaseId(leaseId);
		// notify.setLeaseType(leaseType);
		// notify.setSubscId(subscId);
		// notify.setValidateDate(validateDate);
		// notify.setInvalidateDate(invalidateDate);
		// notify.setTotalAmount(totalAmount);
		// notify.setRentAmount(rentAmount);
		// notify.setResourceAmount(resourceAmount);
		// notify.setIsvOrderId(isvOrderId);
		// notify.setSubscType(subscType);
		// notify.setPricePolicy(pricePolicy);
		// siteService.save(notify);
		// if (0 == _pricePolicy) {// 免费(不处理)
		//
		// } else {// 月租(暂时没有此收费项目)
		// // TODO 收费处理
		// }
		//
		// } else {
		// logger.info("淘宝箱订阅通知失败:签名不正确");
		// SystemException.handleMessageException("淘宝箱订阅通知失败:签名不正确");
		// }
		// logger.info("【" + nick + "】淘宝箱订阅成功");
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 删除所有用户
	 * 
	 * @return
	 */
	@RequestMapping(value = "/deleteusers", method = RequestMethod.GET)
	@ResponseBody
	public String deleteUsers(HttpServletRequest request) {
		List<User> users = siteService.loadAll(User.class);
		siteService.deleteAll(User.class);
		return UserConvert.convertUsers2Json(users).toString();
	}

	@RequestMapping(value = "/group/{gid}", method = RequestMethod.GET)
	public ModelAndView getItemsGroup(@PathVariable String gid,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		try {
			response.sendRedirect(WindSiteRestUtil.getUrl(siteService, result,
					userId)
					+ "tgroup/" + gid + ".html");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public ModelAndView search(HttpServletRequest request,
			HttpServletResponse response) {
		return new ModelAndView("site/search");
	}

	@RequestMapping(value = "/search/result", method = RequestMethod.POST)
	public ModelAndView searchUser(HttpServletRequest request,
			HttpServletResponse response) {
		String type = request.getParameter("type");
		String keyword = request.getParameter("keyword");
		if (StringUtils.isEmpty(type)) {
			SystemException.handleMessageException("未指定搜索类型");
		}
		if (StringUtils.isEmpty(keyword)) {
			SystemException.handleMessageException("未指定搜索关键字");
		}
		List<User> users = new ArrayList<User>();
		if ("USER".equals(type)) {
			users = siteService.findAllByCriterion(User.class, R.like("nick",
					keyword, MatchMode.ANYWHERE));
		} else {
			users = siteService.searchUserBySiteTitle(keyword);
		}
		return new ModelAndView("site/searchResult", "users", users);
	}

	private Boolean validateTaobao(HttpServletRequest request) {
		// SystemException.handleMessageException("服务器数据同步中....请稍候登录，预计1-2小时");
		String topParams = request.getParameter("top_parameters");
		String topSession = request.getParameter("top_session");
		String topSign = request.getParameter("top_sign");
		String versionNo = request.getParameter("versionNo");
		String appType = request.getParameter("appType");// 当前应用类型
		String appKey = request.getParameter("top_appkey");// 当前应用标识
		String leaseId = request.getParameter("leaseId");
		String timestamp = request.getParameter("timestamp");
		String sign = request.getParameter("sign");
		String itemCode = request.getParameter("itemCode");
		if (EnvManager.getAppKey("0").equals(appKey)) {// 月租
			appType = "0";
		} else if (EnvManager.getAppKey("1").equals(appKey)) {// 分成
			appType = "1";
		} else {
			SystemException.handleMessageException("新淘网应用标识不正确");
		}
		Boolean isCheckVersion = EncryptUtil.verifyVersionNo(appType, sign,
				EnvManager.getSecret(appType), EnvManager.getAppKey(appType),
				leaseId, timestamp, versionNo, itemCode);// 是否需要后续检验版本号,如果带版本号，则后续检查，如果不带，则以本地为主
		if (EncryptUtil.verifyTopResponse(topParams, topSession, topSign,
				EnvManager.getAppKey(appType), EnvManager.getSecret(appType))) {// 校验签名
			Map<String, String> parameters = EncryptUtil
					.convertBase64StringtoMap(topParams);// 参数解析
			// 时间戳校验
			Long sessionTime = Long.valueOf(parameters.get("ts"));
			Calendar calendar = Calendar.getInstance(Locale.CHINA);
			Long time = calendar.getTimeInMillis() - sessionTime;
			logger.info("Session时间差：" + (time));
			if (time > 1800000) {
				SystemException.handleMessageException("当前Session已超时,请重新登录");
			}

			for (String un : WindSiteRestUtil.UNVALIDS) {
				if (parameters.get("visitor_nick").equals(un)) {
					SystemException.handleMessageException("已退款会员，不予登录");
				}
			}
			EnvManager.setTaobaoSession(topSession);// 设置淘宝Session
			siteService.synUser(appType, parameters.get("visitor_id"),
					parameters.get("visitor_nick"), topSession, isCheckVersion,
					versionNo, deployZone, fcg, widgetCustomer, pageService,
					moduleMethod);
			User user = EnvManager.getUser();
			if (user != null) {
				Limit limit = user.getLimit();
				if (limit != null && user.getUsb() != null) {
					if (user.getUsb().getVersionNo() > 1) {// 如果是月租返利或者分成返利
						limit.setPages(limit.getPages() + 5);// 页面限额
						limit.setGroups(limit.getGroups() + 10);// 推广组
						limit.setWidgets(limit.getWidgets() + 15);// 自定义组件
						limit.setFavWidgets(limit.getFavWidgets() + 20);// 收藏组件
						limit.setLayouts(limit.getLayouts() + 3);// 页面布局
						limit.setModules(limit.getModules() + 18);// 页面模块
						limit.setHeaders(limit.getHeaders() + 2);// 页头
					} else if (user.getUsb().getVersionNo() == 3) {
						limit.setPages(limit.getPages() + 10);// 页面限额
						limit.setGroups(limit.getGroups() + 20);// 推广组
						limit.setWidgets(limit.getWidgets() + 30);// 自定义组件
						limit.setFavWidgets(limit.getFavWidgets() + 40);// 收藏组件
						limit.setLayouts(limit.getLayouts() + 3);// 页面布局
						limit.setModules(limit.getModules() + 18);// 页面模块
						limit.setHeaders(limit.getHeaders() + 2);// 页头
					}
					user.setLimit(limit);
				}
				EnvManager.setUser(user);
				SiteImpl impl = EnvManager.getSites().get(user.getUser_id());
				if (impl != null) {// 每次登录则更新最新的缓存数据
					impl = siteService.getSiteImplByUserId(user.getUser_id());
					EnvManager.getSites().put(user.getUser_id(), impl);
				}
			}
		} else {
			logger.info("sign error|淘宝业务签名错误");
			logger.info("_sign:" + topSign);
			return false;
		}
		return true;
	}

	@Autowired
	private ModuleMethod moduleMethod;
	@Autowired
	private IPageService pageService;
	@Autowired
	private FreeMarkerConfigurer fcg;
	@Autowired
	private IDeployZone deployZone;

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public void logout(HttpServletRequest request, HttpServletResponse response) {
		@SuppressWarnings("unused")
		String appType = EnvManager.getAppType();
		if (EnvManager.getUser() != null) {
			appType = EnvManager.getUser().getApp();// 当前登录应用
		}
		if (EnvManager.getLoginLog() != null)
			EnvManager.getLoginLog().setIsTimeOut(false);// 设置为手动退出
		EnvManager.logoutSession();

		String from = request.getParameter("from");
		if (StringUtils.isEmpty(from)) {
			try {
				response.sendRedirect("http://www.xintaonet.com");
				// response.sendRedirect(getlogoffURL(appType));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 退出TOP登陆（清除top cookie）
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	private String logoffopenid(String appType) {
		TreeMap<String, CharSequence> apiparamsMap = new TreeMap<String, CharSequence>();
		// 组装协议参数。
		apiparamsMap.put("sign_method", "md5");
		apiparamsMap.put("app_key", EnvManager.getAppKey(appType));
		apiparamsMap.put("timestamp", new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss").format(new Date()));
		try {
			String sign = EncryptUtil.md5Signature(apiparamsMap, EnvManager
					.getSecret(appType), "sign");
			// 组装协议参数sign
			apiparamsMap.put("sign", sign);
			StringBuilder param = new StringBuilder();
			for (Iterator<Map.Entry<String, CharSequence>> it = apiparamsMap
					.entrySet().iterator(); it.hasNext();) {
				Map.Entry<String, CharSequence> e = it.next();
				param.append("&").append(e.getKey()).append("=").append(
						e.getValue());
			}
			return param.toString().substring(1);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}

	/*
	 * 获取app退出URL
	 */
	public String getlogoffURL(String appType)
			throws UnsupportedEncodingException {
		// 组装请求URL
		StringBuilder url = new StringBuilder(
				"http://container.api.taobao.com/container/logoff?");
		url.append(logoffopenid(appType));
		return url.toString();
	}

	/**
	 * 重定向至登录提示页
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/redirect", method = RequestMethod.GET)
	public ModelAndView redirectTaobao(HttpServletRequest request,
			HttpServletResponse response) {
		return new ModelAndView("site/redirect");
	}

	/**
	 * 根据软文分类查找并更新组件和页面
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/synblog/{uc_id}/{classid}")
	@ResponseBody
	public String updateSynShopBlog(@PathVariable String uc_id,
			@PathVariable String classid, HttpServletRequest request) {
		// 更新新版本
		List<PageModule> modules = (List<PageModule>) siteService.findByHql(
				"select m from PageModule m where m.name='shopBlog' and metadata like '%cid:\""
						+ classid + "\"%'", new HashMap<String, Object>());
		if (modules != null && modules.size() > 0) {
			for (PageModule module : modules) {
				// 生成文章模块异步命令
				ShopBlogCommand command = new ShopBlogCommand();
				command.setFcg(fcg);
				command.setModule(pageService.get(PageModule.class, module
						.getId()));
				command.setPageService(pageService);
				command.setUcService(ucService);
				CommandExecutor.getCommands().add(command);
			}
			// 如果会员设置了新版本的文章列表，则不再更新旧版本的
			return WindSiteRestUtil.SUCCESS;
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 查询资料
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/details/{id}", method = RequestMethod.GET)
	public ModelAndView getProfile(@PathVariable String id,
			HttpServletRequest request) {
		User user = siteService
				.findByCriterion(User.class, R.eq("user_id", id));
		T_SpaceUser sUser = siteService.findByCriterion(T_SpaceUser.class, R
				.eq("uid", id));
		Map<String, Object> map = new HashMap<String, Object>();
		if (user.getSid() != null && !user.getSid().equals("0")) {
			map.put("shop", siteService.get(T_TaobaokeShop.class, Long
					.valueOf(user.getUser_id())));
		}
		map.put("user", user);
		map.put("sUser", sUser);
		if (user == null) {
			SystemException.handleMessageException("用户[" + id + "]不存在");
		}
		return new ModelAndView("site/publicDetails", map);
	}

	/**
	 * 获取指定模块内容
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/module/{id}")
	@ResponseBody
	public String pageModule(@PathVariable Long id, HttpServletRequest request,
			HttpServletResponse response) {
		String nick = request.getParameter("nick");
		String pid = request.getParameter("pid");
		if (StringUtils.isEmpty(nick) || StringUtils.isEmpty(pid)) {
			return "未指定模块所属会员以及模块的PID";
		}
		String moduleContent = "${module('" + id + "','" + nick + "','" + pid
				+ "','false')}";

		Template template = null;

		try {
			template = new Template("module_" + id, new StringReader(
					moduleContent), fcg.getConfiguration());
		} catch (IOException e) {
			e.printStackTrace();
			return "";
		}
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("module", moduleMethod);
		params.put("pid", pid);
		if (template != null) {
			try {
				return FreeMarkerTemplateUtils.processTemplateIntoString(
						template, params);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		}
		return "";
	}

	/**
	 * 更新超过3天缓存的商品详情
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/synitem/{id}")
	@ResponseBody
	public String synItem(@PathVariable Long id, HttpServletRequest request,
			HttpServletResponse response) {
		String nid = String.valueOf(id);
		File file = new File(EnvManager.getItemPath() + File.separator
				+ nid.substring(nid.length() - 3, nid.length())
				+ File.separator + nid + File.separator + nid + ".html");
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DATE, -1);
		if (!file.exists() || file.lastModified() < calendar.getTimeInMillis()) {// 如果不存在或者时间差超过1天
			TaobaokeItemsDetailGetRequest getRequest = new TaobaokeItemsDetailGetRequest();
			getRequest.setNick("fxy060608");// 昵称
			getRequest.setNumIids(nid);
			getRequest.setFields(TaobaoFetchUtil.DETAIL_FIELDS);
			getRequest.setOuterCode(EnvManager.getItemsOuterCode());
			TaobaokeItemsDetailGetResponse getResponse = TaobaoFetchUtil
					.getItemsDetail(null, getRequest);
			if (getResponse == null) {
				SystemException.handleMessageException("该商品已移除或者被卖家下架");
			}
			List<TaobaokeItemDetail> itemList = getResponse
					.getTaobaokeItemDetails();
			if (itemList == null || itemList.size() != 1) {
				SystemException.handleMessageException("该商品已移除或者被卖家下架");
			}
			TaobaokeItemDetail item = itemList.get(0);// 单个商品
			// 生成当前商品详情相关页
			Long numIid = item.getItem().getNumIid();
			if (!CommandExecutor.getCachecommands().containsKey(
					"item-" + numIid)) {// 如果不在队列中
				ItemDetailCommand command = new ItemDetailCommand();
				command.setDetail(item);
				command.setFcg(fcg);
				command.setPageService(pageService);
				CommandExecutor.getCachecommands().put("item-" + numIid,
						command);
			}
		}
		return "";
	}

	/**
	 * 获取指定店铺信息
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/itemdetail/shopinfo")
	public ModelAndView pageDetailShopInfo(HttpServletRequest request,
			HttpServletResponse response) {
		String nick = request.getParameter("nick");
		Shop shop = null;
		if (StringUtils.isNotEmpty(nick)) {
			ShopGetRequest req = new ShopGetRequest();
			req.setFields("sid,cid,nick,title,pic_path,created,shop_score");
			req.setNick(nick);
			shop = TaobaoFetchUtil.getTaobaoShop("0", req);
		}
		return new ModelAndView("site/designer/template/shopInfo", "shop", shop);
	}

	/**
	 * 获取指定同类宝贝列表
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/itemdetail/hot")
	public ModelAndView pageDetailHot(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		WindSiteRestUtil.covertPID(siteService, result, userId);
		String nick = request.getParameter("nick");
		String cidStr = request.getParameter("cid");
		String countStr = request.getParameter("count");
		Long count = 5L;
		if (StringUtils.isNotEmpty(countStr)) {
			try {
				count = Long.parseLong(countStr);
			} catch (Exception e) {
				count = 5L;
			}
		}
		if (StringUtils.isNotEmpty(cidStr)) {
			Long cid = 16L;
			try {
				cid = Long.parseLong(cidStr);
			} catch (Exception e) {
				cid = 16L;
			}
			TaobaokeItemsGetRequest getRequest = new TaobaokeItemsGetRequest();
			getRequest.setFields(TaobaoFetchUtil.TAOBAOKEITEM_FIELDS);
			getRequest.setCid(cid);// 分类
			getRequest.setPageNo(1L);
			getRequest.setPageSize(count);
			getRequest.setSort("commissionNum_desc");
			getRequest.setNick(String.valueOf(result.get("nick")));
			TaobaokeItemsGetResponse getResponse = TaobaoFetchUtil.searchItems(
					String.valueOf(result.get("appType")), getRequest);
			if (getResponse != null) {//
				List<TaobaokeItem> items = getResponse.getTaobaokeItems();
				if (items != null) {
					result.put("data", items);
				}
			}
		} else {// 店铺相关热卖
			if (StringUtils.isNotEmpty(nick)) {
				ItemsSearchRequest itemSearchRequest = new ItemsSearchRequest();
				itemSearchRequest.setNicks(nick);
				itemSearchRequest.setOrderBy("volume:desc");
				itemSearchRequest.setPageNo(1L);
				itemSearchRequest.setPageSize(20L);
				itemSearchRequest.setFields("num_iid");
				ItemsSearchResponse itemSearchResponse = TaobaoFetchUtil
						.taobaoSearchItems(String
								.valueOf(result.get("appType")),
								itemSearchRequest);
				if (itemSearchResponse != null) {
					ItemSearch itemSearch = itemSearchResponse.getItemSearch();
					if (itemSearch != null) {
						List<Item> items = itemSearch.getItems();
						if (items != null && items.size() > 0) {
							Boolean isFirst = true;
							String numiids = "";
							for (Item i : items) {
								if (isFirst) {
									isFirst = false;
								} else {
									numiids += ",";
								}
								numiids += i.getNumIid();
							}
							List<TaobaokeItem> taokeItems = TaobaoFetchUtil
									.itemsConvert(String.valueOf(result
											.get("appType")), numiids, nick);
							result.put("data", taokeItems);
						}
					}
				}
			}
		}
		return new ModelAndView("site/designer/template/shopHot", result);
	}

	/**
	 * 获取指定同类宝贝列表
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/itemsearch/hot")
	public ModelAndView pageSearchHot(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		WindSiteRestUtil.covertPID(siteService, result, userId);
		String q = request.getParameter("q");
		String cidStr = request.getParameter("cid");
		if (StringUtils.isEmpty(q) && StringUtils.isEmpty(cidStr)) {
			return new ModelAndView("site/designer/template/shopHot", result);
		}
		String sort = request.getParameter("sort");
		String countStr = request.getParameter("count");
		Long count = 5L;
		if (StringUtils.isNotEmpty(countStr)) {
			try {
				count = Long.parseLong(countStr);
			} catch (Exception e) {
				count = 5L;
			}
		}
		if (StringUtils.isEmpty(sort)) {// 排序
			sort = "commissionRate_desc";
		}
		Long cid = null;// 分类
		if (StringUtils.isNotEmpty(cidStr)) {
			try {
				cid = Long.parseLong(cidStr);
			} catch (Exception e) {
				cid = null;
			}
		}
		TaobaokeItemsGetRequest getRequest = new TaobaokeItemsGetRequest();
		getRequest.setFields(TaobaoFetchUtil.TAOBAOKEITEM_FIELDS);
		if (StringUtils.isNotEmpty(q)) {// 关键词
			getRequest.setKeyword(q);
		}
		if (cid != null)
			getRequest.setCid(cid);// 分类
		getRequest.setPageNo(1L);
		getRequest.setPageSize(count);
		getRequest.setSort(sort);
		getRequest.setNick(String.valueOf(result.get("nick")));
		TaobaokeItemsGetResponse getResponse = TaobaoFetchUtil.searchItems(
				String.valueOf(result.get("appType")), getRequest);
		if (getResponse != null) {//
			List<TaobaokeItem> items = getResponse.getTaobaokeItems();
			if (items != null) {
				result.put("data", items);
			}
		}

		return new ModelAndView("site/designer/template/shopHot", result);
	}

	@RequestMapping(value = "/seconddomainerror")
	public ModelAndView seconddomainerror(HttpServletRequest request,
			HttpServletResponse response) {
		return new ModelAndView("site/seconddomainerror");
	}

	@RequestMapping(value = "/domainerror")
	public ModelAndView domainerror(HttpServletRequest request,
			HttpServletResponse response) {
		return new ModelAndView("site/domainerror");
	}

	@RequestMapping(value = "/unvalid")
	public ModelAndView unvalid(HttpServletRequest request,
			HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		return new ModelAndView("site/unvalid");
	}

	@RequestMapping(value = "/discuzerror")
	public ModelAndView fanlierror(HttpServletRequest request,
			HttpServletResponse response) {
		return new ModelAndView("site/fanlierror", "site", request
				.getParameter("site"));
	}

	/**
	 * 404|500，生成404错误
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws NoSuchRequestHandlingMethodException
	 */
	@RequestMapping(value = "/error/redirect")
	public ModelAndView error404(HttpServletRequest request,
			HttpServletResponse response) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		WindSiteRestUtil.covertPID(siteService, result, userId);
		return new ModelAndView("site/siteError", result);
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/error")
	public ModelAndView error(HttpServletRequest request,
			HttpServletResponse response) {
		// ie的状态代号
		Integer status_code = (Integer) request
				.getAttribute("javax.servlet.error.status_code");
		Map<String, Object> map = new HashMap<String, Object>();
		if (status_code != null) {
			map.put("code", status_code.toString());
		} else {
			map.put("code", "404");// 默认404错误
		}
		// 异常的错误信息
		Throwable exception = (Throwable) request
				.getAttribute("javax.servlet.error.exception");
		if (exception != null)
			map.put("cause", exception.toString());
		// 异常的类型
		Class exception_type = (Class) request
				.getAttribute("javax.servlet.error.exception_type");
		if (exception_type != null) {
			map.put("type", exception_type.toString());
		}
		// 自定义的信息
		String message = (String) request
				.getAttribute("javax.servlet.error.message");
		if (StringUtils.isNotEmpty(message)) {
			map.put("msg", message);
		}
		// 请求的uri地址
		String request_uri = (String) request
				.getAttribute("javax.servlet.error.request_uri");

		if (StringUtils.isNotEmpty(request_uri)) {
			map.put("uri", request_uri);
		}

		// servlet的名字
		String servlet_name = (String) request
				.getAttribute("javax.servlet.error.servlet_name");
		if (StringUtils.isNotEmpty(servlet_name)) {
			map.put("servlet", servlet_name);
		}
		return new ModelAndView("site/error", map);
	}

	/**
	 * 店铺排序
	 */
	public static final Map<String, String> SHOP_ORDER = new HashMap<String, String>();
	static {
		// 默认
		SHOP_ORDER.put("1", "sf.sortOrder");
		// 佣金比率从高到低
		SHOP_ORDER.put("2", "s.commission_rate desc");
		// 卖家信用从高到低
		SHOP_ORDER.put("4", "s.level desc");
	}
	/**
	 * 推广组排序
	 */
	public static final Map<String, String> GROUP_ORDER = new HashMap<String, String>();
	static {
		// 默认
		GROUP_ORDER.put("1", "sortOrder");
		// 佣金从高到低
		GROUP_ORDER.put("2", "commission desc");
		// 成交量从高到低
		GROUP_ORDER.put("3", "commission_num desc");
		// 卖家信用从高到低
		GROUP_ORDER.put("4", "seller_credit_score desc");
		// 价格从低到高
		GROUP_ORDER.put("5", "price asc");
		// 价格从高到低
		GROUP_ORDER.put("6", "price desc");
	}
	/**
	 * 版式
	 */
	public static final Map<String, String> TYPES = new HashMap<String, String>();
	static {
		TYPES.put("1", "list1");
		TYPES.put("2", "street");
	}
	/**
	 * 皮肤
	 */
	public static final Map<String, String> SKINS = new HashMap<String, String>();
	static {
		// 默认
		SKINS.put("1", "pink");
		SKINS.put("2", "green");
		SKINS.put("3", "silver");
		SKINS.put("4", "black");
		SKINS.put("5", "blue");
		SKINS.put("6", "purple");
		SKINS.put("7", "orange");
		SKINS.put("8", "brown");
		SKINS.put("9", "yellow");
		SKINS.put("10", "red");
	}
}
