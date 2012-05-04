package com.wind.weibo.rest;

import java.io.IOException;
import java.security.MessageDigest;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;
import org.hibernate.criterion.SimpleExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import sun.misc.BASE64Encoder;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.site.env.EnvManager;
import com.wind.site.model.NewWeiboSysConfig;
import com.wind.site.model.Site;
import com.wind.site.model.WeiboDomainHistory;
import com.wind.site.model.WeiboSysConfig;
import com.wind.site.service.ISiteService;
import com.wind.site.util.EncryptUtil;
import com.wind.site.util.WindSiteRestUtil;
import com.wind.weibo.config.IWeiboConfig;
import com.wind.weibo.model.UserToken;
import com.wind.weibo.service.IWeiboService;

/**
 * 微博REST服务
 * 
 * @author fxy
 * 
 */
@Controller
@RequestMapping("/member/fl/weibo")
public class WeiboRest {
	@Autowired
	private IWeiboService weiboService;
	@Autowired
	private FreeMarkerConfigurer fcg;
	@Autowired
	private ISiteService siteService;

	/**
	 * 跳转至微博系统
	 * 
	 * @return
	 */
	@RequestMapping(value = "/goWeibo", method = RequestMethod.GET)
	public ModelAndView validateWB(HttpServletRequest request,
			HttpServletResponse response) {
		String top_appkey = EnvManager.getAppKey(null);
		String top_session = EnvManager.getTaobaoSession();
		Map<String, CharSequence> params = new HashMap<String, CharSequence>();
		params.put("ts", Calendar.getInstance(Locale.CHINA).getTimeInMillis()
				+ "");// 时间戳
		params.put("visitor_id", EnvManager.getUser().getUser_id());
		params.put("pid", EnvManager.getUser().getPid());
		params.put("sid", "0".equals(EnvManager.getUser().getSid()) ? "-1"
				: EnvManager.getUser().getSid());
		params.put("visitor_nick", EnvManager.getUser().getNick());
		String top_parameters = EncryptUtil.encodeMaptoString(params);// 参数BASE64
		String top_sign = sign(top_parameters, top_session, top_appkey,
				EnvManager.getSecret(null));// 加密
		try {
			response.sendRedirect("http://weibo.xintaonet.com/top?top_appkey="
					+ top_appkey + "&top_parameters=" + top_parameters
					+ "&top_session=" + top_session + "&top_sign=" + top_sign);
		} catch (IOException e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	public static String sign(String topParams, String topSession,
			String appKey, String appSecret) {

		String sign = "";
		try {
			MessageDigest md5 = MessageDigest.getInstance("MD5");
			String result = appKey + topParams + topSession + appSecret;
			byte[] bytes = md5.digest(result.toString().getBytes("GBK"));
			BASE64Encoder encode = new BASE64Encoder();
			sign = encode.encode(bytes);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sign;
	}

	private ModelAndView weibo(String ftl) {
		Map<String, Object> result = new HashMap<String, Object>();
		Site site = EnvManager.getUser().getSites().get(0);
		if (StringUtils.isNotEmpty(site.getWww())) {
			WeiboSysConfig config = siteService.get(WeiboSysConfig.class, site
					.getId());
			if (config == null) {
				config = new WeiboSysConfig();
				// 基本设置：
				/* 可编辑字段 */
				config.setSite_name(site.getTitle());// 站点名称
				config.setSite_record(null);// 备案
				config.setSite_info(site.getDescription());
				config.setSkin_default("6");// 皮肤
				config.setLogo(null);// 网站LOGO
				config.setThird_code(null);// 第三方统计

				/* 下列字段暂不开放编辑 */
				config.setAddress_icon(null);// 网站地址图标
				config.setGuide_auto_follow("0");// 是否自动关注
				config.setGuide_auto_follow_id(null);// 关注列表
				config.setLogin_way("3");// 登录方式
				// 链接管理
				config.setHead_link("[]");// 顶部链接
				config.setFoot_link("[]");// 底部链接
				// 开放平台
				config.setApp_key(IWeiboConfig.app_key);
				config.setApp_secret(IWeiboConfig.app_secret);
				config.setUser_oauth_token(IWeiboConfig.user_oauth_token);
				config
						.setUser_oauth_token_secret(IWeiboConfig.user_oauth_token_secret);
				// 广告设置：
				config.setAd_footer(null);
				config.setAd_header(null);
				// 用户首页聚焦位
				config.setBg_pic(null);
				config.setBtnTitle("发布微博");
				config.setLink(null);
				config.setOper("1");
				config.setText("欢迎大家分享网购返利心得");
				config.setTitle("今天您网购返利了吗？");
				config.setTopic("网购返利");
				// 认证设置：（暂不开放编辑）
				config.setAuthen_big_icon("var/data/logo/big_auth_icon.png");
				config.setAuthen_enable("0");
				config
						.setAuthen_small_icon("var/data/logo/small_auth_icon.png");
				config.setAuthen_small_icon_title(null);

				// 新淘网字段
				config.setNick(EnvManager.getUser().getNick());
				config.setUser_id(site.getUser_id());
				config.setSite_id(site.getId());
				// 其他：：（暂不开放编辑）
				config.setRewrite_enable("0");
				config.setWb_version("1.1.0");
				siteService.addWeiboSysConfig(config, fcg, site);
			}
			if ("links".equals(ftl)) {
				String headLinksStr = config.getHead_link();
				if (StringUtils.isNotEmpty(headLinksStr)
						&& !"[]".equals(headLinksStr)) {
					Map<String, Map<String, String>> headLinks = new Gson()
							.fromJson(
									headLinksStr,
									new TypeToken<Map<String, Map<String, String>>>() {
									}.getType());
					result.put("headLinks", headLinks);
				}
				String footLinksStr = config.getFoot_link();
				if (StringUtils.isNotEmpty(footLinksStr)
						&& !"[]".equals(footLinksStr)) {
					Map<String, Map<String, String>> footLinks = new Gson()
							.fromJson(
									footLinksStr,
									new TypeToken<Map<String, Map<String, String>>>() {
									}.getType());
					result.put("footLinks", footLinks);
				}
				String profileLinksStr = config.getProfile_link();
				if (StringUtils.isNotEmpty(profileLinksStr)) {
					List<Map<String, String>> profileLinks = new Gson()
							.fromJson(profileLinksStr,
									new TypeToken<List<Map<String, String>>>() {
									}.getType());
					result.put("profileLinks", profileLinks);
				}
			}
			result.put("wdh", siteService.get(WeiboDomainHistory.class, site
					.getId()));
			result.put("config", config);
		}
		return new ModelAndView("site/member/weibo/" + ftl, result);
	}

	/**
	 * 微博管理首页
	 * 
	 * @return
	 */
	@RequestMapping(value = "/manager", method = RequestMethod.GET)
	public ModelAndView manager(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		Site site = EnvManager.getUser().getSites().get(0);
		if (StringUtils.isNotEmpty(site.getWww())) {
			NewWeiboSysConfig config = siteService.get(NewWeiboSysConfig.class,
					site.getId());
			if (config == null) {
				config = new NewWeiboSysConfig();
				// 基本设置：
				/* 可编辑字段 */
				config.setSite_name(site.getTitle());// 站点名称
				config.setSite_record(null);// 备案
				config.setSkin_default("6");// 皮肤
				config.setLogo(null);// 网站LOGO
				config.setThird_code(null);// 第三方统计

				/* 下列字段暂不开放编辑 */
				config.setAddress_icon(null);// 网站地址图标
				config.setGuide_auto_follow("0");// 是否自动关注
				config.setGuide_auto_follow_id(null);// 关注列表
				config.setLogin_way("3");// 登录方式
				// 链接管理
				config.setHead_link("[]");// 顶部链接
				config.setFoot_link("[]");// 底部链接
				// 开放平台
				config.setApp_key(IWeiboConfig.app_key);
				config.setApp_secret(IWeiboConfig.app_secret);
				config.setUser_oauth_token(IWeiboConfig.user_oauth_token);
				config
						.setUser_oauth_token_secret(IWeiboConfig.user_oauth_token_secret);
				// 广告设置：
				config.setAd_footer(null);
				config.setAd_header(null);
				// 用户首页聚焦位
				config.setBg_pic(null);
				config.setBtnTitle("发布微博");
				config.setLink(null);
				config.setOper("1");
				config.setText("欢迎大家分享网购返利心得");
				config.setTitle("今天您网购返利了吗？");
				config.setTopic("网购返利");
				// 认证设置：（暂不开放编辑）
				config.setAuthen_big_icon("var/data/logo/big_auth_icon.png");
				config.setAuthen_type("3");
				config
						.setAuthen_small_icon("var/data/logo/small_auth_icon.png");
				config.setAuthen_small_icon_title(null);

				// 新淘网字段
				config.setNick(EnvManager.getUser().getNick());
				config.setUser_id(site.getUser_id());
				config.setSite_id(site.getId());
				// 其他：：（暂不开放编辑）
				config.setWb_version("2.1");
				// TODO 还有其他属性尚未设置默认
				// siteService.addNewWeiboSysConfig(config, fcg, site);
			}
		}
		return new ModelAndView("/weibo/manager", result);
	}

	/**
	 * 基本设置
	 * 
	 * @return
	 */
	@RequestMapping(value = "/profile", method = RequestMethod.GET)
	public ModelAndView profile(HttpServletRequest request,
			HttpServletResponse response) {
		return weibo("profile");
	}

	/**
	 * 修改基本设置
	 * 
	 * @return
	 */
	@RequestMapping(value = "/profile/update", method = RequestMethod.POST)
	@ResponseBody
	public String profileUpdate(HttpServletRequest request,
			HttpServletResponse response) {
		Site site = EnvManager.getUser().getSites().get(0);
		WeiboSysConfig config = siteService.get(WeiboSysConfig.class, site
				.getId());
		if (config == null) {
			SystemException.handleMessageException("尚未完成微博基本设置");
		}
		String wb_site_title = request.getParameter("wb_site_title");
		String wb_site_record = request.getParameter("wb_site_record");
		String wb_site_info = request.getParameter("wb_site_info");
		String wb_skin_default = request.getParameter("wb_skin_default");
		String wb_logo = request.getParameter("wb_logo");
		String wb_third_code = request.getParameter("wb_third_code");
		String wb_login_way = request.getParameter("wb_login_way");
		if (StringUtils.isNotEmpty(wb_site_title))
			config.setSite_name(wb_site_title);// 站点名称
		if (StringUtils.isNotEmpty(wb_site_record))
			config.setSite_record(wb_site_record);// 备案
		if (StringUtils.isNotEmpty(wb_site_info))
			config.setSite_info(wb_site_info);
		if (StringUtils.isNotEmpty(wb_skin_default))
			config.setSkin_default(wb_skin_default);// 皮肤
		if (StringUtils.isNotEmpty(wb_logo))
			config.setLogo(wb_logo);// 网站LOGO
		if (StringUtils.isNotEmpty(wb_third_code))
			config.setThird_code(wb_third_code);// 第三方统计
		if (StringUtils.isNotEmpty(wb_login_way)) {// 登录设置
			config.setLogin_way(wb_login_way);
		}
		siteService.updateWeiboSysConfig(config, fcg, site);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 链接设置
	 * 
	 * @return
	 */
	@RequestMapping(value = "/links", method = RequestMethod.GET)
	public ModelAndView links(HttpServletRequest request,
			HttpServletResponse response) {

		return weibo("links");
	}

	/**
	 * 修改基本设置
	 * 
	 * @return
	 */
	@RequestMapping(value = "/links/update", method = RequestMethod.POST)
	@ResponseBody
	public String linksUpdate(HttpServletRequest request,
			HttpServletResponse response) {
		Site site = EnvManager.getUser().getSites().get(0);
		WeiboSysConfig config = siteService.get(WeiboSysConfig.class, site
				.getId());
		if (config == null) {
			SystemException.handleMessageException("尚未完成微博基本设置");
		}
		String headLink = request.getParameter("wb_head_link");
		String footLink = request.getParameter("wb_foot_link");
		String profileLink = request.getParameter("wb_profile_link");
		if (StringUtils.isNotEmpty(headLink))// 顶部链接
			config.setHead_link(headLink);
		if (StringUtils.isNotEmpty(footLink)) // 底部链接
			config.setFoot_link(footLink);
		if (StringUtils.isNotEmpty(profileLink)) {// 用户资料链接
			config.setProfile_link(profileLink);
		}
		siteService.updateWeiboSysConfig(config, fcg, site);
		return WindSiteRestUtil.SUCCESS;

	}

	/**
	 * 微博站点管理员设置
	 * 
	 * @return
	 */
	@RequestMapping(value = "/users/search", method = RequestMethod.POST)
	public ModelAndView usersSearch(HttpServletRequest request,
			HttpServletResponse response) {
		Site site = EnvManager.getUser().getSites().get(0);
		WeiboSysConfig config = siteService.get(WeiboSysConfig.class, site
				.getId());
		if (config == null) {
			SystemException.handleMessageException("您尚未配置微博站点基本信息");
		}
		String nick = request.getParameter("nick");
		String pageNoStr = request.getParameter("pageNo");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		Page<UserToken> page = new Page<UserToken>(pageNo, 15);
		SimpleExpression nickFilter = null;
		if (StringUtils.isNotEmpty(nick)) {
			nickFilter = R.like("nickname", nick, MatchMode.ANYWHERE);
		}
		List<UserToken> tokens = weiboService
				.findAllByCriterionAndOrder(page, UserToken.class, Order
						.desc("id"), R.eq("app_key", config.getApp_key()), R
						.isNotNull("access_token"), nickFilter);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("tokens", tokens);
		return new ModelAndView("site/member/weibo/userSearch", result);
	}

	/**
	 * 微博站点管理员设置
	 * 
	 * @return
	 */
	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public ModelAndView users(HttpServletRequest request,
			HttpServletResponse response) {
		return weibo("users");
	}

	/**
	 * 修改微博站点管理员
	 * 
	 * @return
	 */
	@RequestMapping(value = "/users/admin", method = RequestMethod.POST)
	@ResponseBody
	public String usersAdmin(HttpServletRequest request,
			HttpServletResponse response) {
		Site site = EnvManager.getUser().getSites().get(0);
		WeiboSysConfig config = siteService.get(WeiboSysConfig.class, site
				.getId());
		if (config == null) {
			SystemException.handleMessageException("尚未完成微博基本设置");
		}
		if (config.getApp_key().equals(IWeiboConfig.app_key)) {
			SystemException
					.handleMessageException("您必须设置自己的App Key之后，才可以设置微博站点的管理员");
		}
		String idStr = request.getParameter("id");
		Integer id = null;
		UserToken token = null;
		if (StringUtils.isNotEmpty(idStr)) {
			try {
				id = Integer.parseInt(idStr);
				token = weiboService.get(UserToken.class, id);// 获取当前指定用户授权记录
			} catch (Exception e) {
				id = null;
			}
		}
		if (token == null) {
			String nick = request.getParameter("nick");
			if (StringUtils.isNotEmpty(nick)) {// 昵称不为空
				List<UserToken> tokens = weiboService.findAllByCriterion(
						UserToken.class, R.eq("app_key", config.getApp_key()),
						R.eq("nickname", nick));
				if (tokens.size() == 0) {
					SystemException
							.handleMessageException("该会员尚未在您的站点绑定新浪微博，请使用该帐号登录微博站点，并绑定新浪微博帐号");
				}
				token = tokens.get(0);
			}
		}
		if (token == null) {
			SystemException.handleMessageException("未找到此会员在您微博站点的记录");
		}
		if (!token.getApp_key().equals(config.getApp_key())) {
			SystemException
					.handleMessageException("此会员授权App Key与您开放平台设置的App Key不一致");
		}
		// 设置当前微博站点的开放平台系统配置信息
		config.setUser_oauth_token(token.getAccess_token());
		config.setUser_oauth_token_secret(token.getToken_secret());
		config.setSina_uid(token.getSina_uid() != null ? String.valueOf(token
				.getSina_uid()) : "");
		config.setSite_uid(token.getUid() != null ? String.valueOf(token
				.getUid()) : "");
		siteService.updateWeiboSysConfig(config, fcg, site);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 平台设置
	 * 
	 * @return
	 */
	@RequestMapping(value = "/open", method = RequestMethod.GET)
	public ModelAndView openSina(HttpServletRequest request,
			HttpServletResponse response) {
		return weibo("open");
	}

	/**
	 * 修改平台设置
	 * 
	 * @return
	 */
	@RequestMapping(value = "/open/update", method = RequestMethod.POST)
	@ResponseBody
	public String openUpdate(HttpServletRequest request,
			HttpServletResponse response) {
		Site site = EnvManager.getUser().getSites().get(0);
		WeiboSysConfig config = siteService.get(WeiboSysConfig.class, site
				.getId());
		if (config == null) {
			SystemException.handleMessageException("尚未完成微博基本设置");
		}
		String wb_app_key = request.getParameter("wb_app_key");
		String wb_app_secret = request.getParameter("wb_app_secret");
		if (StringUtils.isNotEmpty(wb_app_key))// 平台Key
			config.setApp_key(wb_app_key);
		if (StringUtils.isNotEmpty(wb_app_secret)) // 平台Secret
			config.setApp_secret(wb_app_secret);
		if ("系统分配".equals(config.getApp_key())) {// 如果是系统AppKey
			config.setApp_key(IWeiboConfig.app_key);
			config.setApp_secret(IWeiboConfig.app_secret);
			config.setUser_oauth_token(IWeiboConfig.user_oauth_token);
			config
					.setUser_oauth_token_secret(IWeiboConfig.user_oauth_token_secret);
			config.setNickname(null);
		} else {
			String nick = request.getParameter("wb_nick");
			UserToken token = null;
			if (StringUtils.isNotEmpty(nick)) {// 昵称不为空
				List<UserToken> tokens = weiboService.findAllByCriterion(
						UserToken.class, R.eq("app_key", config.getApp_key()),
						R.eq("nickname", nick));
				if (tokens.size() == 0) {
					SystemException
							.handleMessageException("该会员尚未在您的站点绑定新浪微博，请使用该帐号登录微博站点，并绑定新浪微博帐号");
				}
				token = tokens.get(0);
				config.setUser_oauth_token(token.getAccess_token());
				config.setUser_oauth_token_secret(token.getToken_secret());
				config.setSina_uid(token.getSina_uid() != null ? String
						.valueOf(token.getSina_uid()) : "");
				config.setSite_uid(token.getUid() != null ? String
						.valueOf(token.getUid()) : "");
				config.setNickname(nick);
			} else {// 如果不填写管理员昵称，则仍旧启用系统内置App Key
				config.setUser_oauth_token(IWeiboConfig.user_oauth_token);
				config
						.setUser_oauth_token_secret(IWeiboConfig.user_oauth_token_secret);
				config.setNickname(null);
			}
		}
		siteService.updateWeiboSysConfig(config, fcg, site);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 广告设置
	 * 
	 * @return
	 */
	@RequestMapping(value = "/weiboad", method = RequestMethod.GET)
	public ModelAndView weiboad(HttpServletRequest request,
			HttpServletResponse response) {
		return weibo("weiboad");
	}

	/**
	 * 修改广告设置
	 * 
	 * @return
	 */
	@RequestMapping(value = "/weiboad/update", method = RequestMethod.POST)
	@ResponseBody
	public String weiboadUpdate(HttpServletRequest request,
			HttpServletResponse response) {
		Site site = EnvManager.getUser().getSites().get(0);
		WeiboSysConfig config = siteService.get(WeiboSysConfig.class, site
				.getId());
		if (config == null) {
			SystemException.handleMessageException("尚未完成微博基本设置");
		}
		String wb_ad_header = request.getParameter("wb_ad_header");
		String wb_ad_footer = request.getParameter("wb_ad_footer");
		if (StringUtils.isNotEmpty(wb_ad_header))// 顶部广告位
			config.setAd_header(wb_ad_header);
		if (StringUtils.isNotEmpty(wb_ad_footer)) // 底部广告位
			config.setAd_footer(wb_ad_footer);
		siteService.updateWeiboSysConfig(config, fcg, site);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 用户首页聚焦设置
	 * 
	 * @return
	 */
	@RequestMapping(value = "/wbindex", method = RequestMethod.GET)
	public ModelAndView wbindex(HttpServletRequest request,
			HttpServletResponse response) {
		return weibo("wbindex");
	}

	/**
	 * 修改用户首页聚焦设置
	 * 
	 * @return
	 */
	@RequestMapping(value = "/wbindex/update", method = RequestMethod.POST)
	@ResponseBody
	public String wbindexUpdate(HttpServletRequest request,
			HttpServletResponse response) {
		Site site = EnvManager.getUser().getSites().get(0);
		WeiboSysConfig config = siteService.get(WeiboSysConfig.class, site
				.getId());
		if (config == null) {
			SystemException.handleMessageException("尚未完成微博基本设置");
		}
		String wb_bg_pic = request.getParameter("wb_bg_pic");
		String wb_btn_title = request.getParameter("wb_btn_title");
		String wb_link = request.getParameter("wb_link");
		String wb_oper = request.getParameter("wb_oper");
		String wb_text = request.getParameter("wb_text");
		String wb_title = request.getParameter("wb_title");
		String wb_topic = request.getParameter("wb_topic");
		if (StringUtils.isNotEmpty(wb_bg_pic))
			config.setBg_pic(wb_bg_pic);
		if (StringUtils.isNotEmpty(wb_btn_title))
			config.setBtnTitle(wb_btn_title);
		if (StringUtils.isNotEmpty(wb_link))
			config.setLink(wb_link);
		if (StringUtils.isNotEmpty(wb_oper))
			config.setOper(wb_oper);
		if (StringUtils.isNotEmpty(wb_text))
			config.setText(wb_text);
		if (StringUtils.isNotEmpty(wb_title))
			config.setTitle(wb_title);
		if (StringUtils.isNotEmpty(wb_topic))
			config.setTopic(wb_topic);

		siteService.updateWeiboSysConfig(config, fcg, site);
		return WindSiteRestUtil.SUCCESS;
	}
}
