package com.wind.site.rest;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import sun.misc.BASE64Encoder;
import weibo4j.Oauth;
import weibo4j.Weibo;
import weibo4j.http.AccessToken;
import weibo4j.model.WeiboException;
import weibo4j.util.WeiboConfig;

import com.fivestars.interfaces.bbs.client.FanliClient;
import com.fivestars.interfaces.bbs.util.XMLHelper;
import com.google.gdata.util.common.base.StringUtil;
import com.wind.core.exception.SystemException;
import com.wind.site.env.EnvManager;
import com.wind.site.model.FanliLinks;
import com.wind.site.model.Member;
import com.wind.site.model.MemberInfo;
import com.wind.site.model.SiteCommission;
import com.wind.site.service.ISiteService;
import com.wind.site.util.WindSiteRestUtil;

@Controller
@RequestMapping("/fanli")
public class FanliRest {
	@Autowired
	private ISiteService siteService;
	private static final Logger logger = Logger.getLogger(FanliRest.class
			.getName());

	@RequestMapping(value = "/loginuc", method = RequestMethod.GET)
	public ModelAndView loginUC(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);

		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
		String www = String.valueOf(result.get("www"));
		String redirect = request.getParameter("redirect");
		if (StringUtils.isNotEmpty(www)) {
			www = "http://" + www.replaceFirst("www.", "x.") + "/uc_server";
		}
		if (EnvManager.getMember() != null) {
			ModelAndView mav = loginDiscuz(www, EnvManager.getMember(),
					response);
			if (mav != null) {
				mav.addObject("redirect", redirect);
				mav.addObject("title",
						redirect.startsWith("http://x.") ? "购物社区" : "购物微博");
				mav.addAllObjects(result);
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

	public ModelAndView loginDiscuz(String uc_api, Member member,
			HttpServletResponse response) {
		FanliClient e = new FanliClient();
		e.setUc_api(uc_api);
		MemberInfo info = member.getInfo();
		String result = e.uc_user_login(info.getUsername(), info.getPwd());
		LinkedList<String> rs = XMLHelper.uc_unserialize(result);
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		String msg = "登录失败";
		String script = "";
		ModelAndView mav = new ModelAndView("site/member/fanli/loginuc");
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
				if (info.getUc_id() == null || info.getUc_id() == 0) {// 如果用户UC_ID尚未同步
					info.setUc_id($uid);// 设置进当前session
					Member wmember = siteService.get(Member.class, member
							.getId());
					if (wmember != null) {
						wmember.getInfo().setUc_id($uid);
						siteService.update(wmember);// 更新
					}
				}
			} else if ($uid == -1) {
				logger.info("【" + info.getUsername() + "】用户不存在,或者被删除");
				return registerDiscuz(uc_api, member, response);// 重新注册
			} else if ($uid == -2) {
				logger.info("【" + info.getUsername() + "】密码错");
				return updateDiscuz(uc_api, member, response);// 密码错误则修改为默认密码
			} else {
				msg = ("【" + info.getUsername() + "】未定义");
			}
		} else {
			msg = ("【" + info.getUsername() + "】" + result);
		}
		mav.addObject("msg", msg);
		mav.addObject("script", script);
		return mav;
	}

	public ModelAndView registerDiscuz(String uc_api, Member member,
			HttpServletResponse response) {
		FanliClient uc = new FanliClient();
		uc.setUc_api(uc_api);
		MemberInfo info = member.getInfo();
		String $returns = uc.uc_user_register(info.getUsername(),
				info.getPwd(), info.getEmail());
		int $uid = Integer.parseInt($returns);
		if ($uid <= 0) {
			if ($uid == -1) {
				logger.info("【" + info.getUsername() + "】用户名不合法");
			} else if ($uid == -2) {
				logger.info("【" + info.getUsername() + "】包含要允许注册的词语");
			} else if ($uid == -3) {
				logger.info("【" + info.getUsername() + "】用户名已经存在");
				return loginDiscuz(uc_api, member, response);// 如果存在以当前用户名登录
			} else if ($uid == -4) {
				logger.info("【" + info.getUsername() + "】Email 格式有误");
			} else if ($uid == -5) {
				logger.info("【" + info.getUsername() + "】Email 不允许注册");
			} else if ($uid == -6) {
				logger.info("【" + info.getUsername() + "】该 Email 已经被注册");
			} else {
				logger.info("【" + info.getUsername() + "】未定义");
			}
		} else {
			logger.info("【" + info.getUsername() + "】OK:" + $returns);
			return loginDiscuz(uc_api, member, response);
		}
		return null;
	}

	public ModelAndView updateDiscuz(String uc_api, Member member,
			HttpServletResponse response) {
		FanliClient e = new FanliClient();
		e.setUc_api(uc_api);
		try {
			MemberInfo info = member.getInfo();
			String result = e.uc_user_edit(info.getUsername(), null, info
					.getPwd(), null, 1, null, null);
			int i = Integer.parseInt(result);
			switch (i) {
			case 1:
				logger.info("【" + info.getUsername() + "】修改成功");
				return loginDiscuz(uc_api, member, response);// 修改成功则登录
			case 0:
				logger.info("【" + info.getUsername() + "】没有任何修改");
				break;
			case -1:
				logger.info("【" + info.getUsername() + "】旧密码不正确");
				break;
			case -4:
				logger.info("【" + info.getUsername() + "】email 格式有误");
				break;
			case -5:
				logger.info("【" + info.getUsername() + "】email 不允许注册");
				break;
			case -6:
				logger.info("【" + info.getUsername() + "】该 email 已经被注册");
				break;
			case -7:
				logger.info("【" + info.getUsername() + "】没有做任何修改");
				break;
			case -8:
				logger.info("【" + info.getUsername() + "】受保护的用户，没有权限修改");
				break;
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		return null;
	}

	/**
	 * 注册会员页面
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/registe", method = RequestMethod.GET)
	public ModelAndView registeView(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		String pid = WindSiteRestUtil.covertFanliPID(siteService, request,
				result, userId);
		if (StringUtils.isEmpty(pid)) {
			result.put("pid", EnvManager.getDefaultPid());
			result.put("nick", "fxy060608");
		}
		String id = request.getParameter("id");
		if (StringUtils.isNotEmpty(id)) {
			try {
				Long invitation = Long.valueOf(id);
				Member member = siteService.get(Member.class, invitation);
				if (member.getUser_id().equals(userId)) {// 如果推广人存在，并且是当前站点的会员
					EnvManager.setInvitation(invitation);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		String site_id = String.valueOf(result.get("sid"));
		result.put("links", siteService.findAllByCriterionAndOrder(
				FanliLinks.class, Order.asc("sortOrder"), R.eq("site_id",
						site_id), R.eq("user_id", userId)));
		result.put("referer", request.getParameter("referer"));
		Object third_type = EnvManager.getSessionAttribute("THIRD_TYPE");
		Object third_id = EnvManager.getSessionAttribute("THIRD_ID");
		Object third_nick = EnvManager.getSessionAttribute("THIRD_NICK");
		if (third_type != null && third_id != null && third_nick != null) {
			result.put("is_bind", true);
			result.put("third_nick", third_nick);
		} else {
			result.put("is_bind", false);
			result.put("third_nick", "");
		}
		return new ModelAndView("site/member/fanli/registe", result);
	}

	/**
	 * 注册会员
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/registe/addMember", method = RequestMethod.POST)
	@ResponseBody
	public String registe(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		WindSiteRestUtil.covertFanliPID(siteService, request, result, userId);
		String username = request.getParameter("username");
		String password = request.getParameter("pwd");
		String email = request.getParameter("email");
		String qq = request.getParameter("qq");
		String msn = request.getParameter("msn");
		String wangwang = request.getParameter("wangwang");
		String mobile = request.getParameter("mobile");
		String alipay = request.getParameter("alipay");
		String alipayName = request.getParameter("alipayName");
		String site_id = String.valueOf(result.get("sid"));
		if (StringUtils.isEmpty(username) || StringUtils.isEmpty(password)
				|| StringUtils.isEmpty(email)) {
			SystemException.handleMessageException("会员名称，密码，邮箱不能为空");
		}
		// 查询会员基本资料中的会员名
		MemberInfo info = siteService.findByCriterion(MemberInfo.class, R.eq(
				"username", username));
		if (info != null) {
			SystemException.handleMessageException("会员名称【" + username
					+ "】重复,请修改后重新提交注册");
		}
		info = new MemberInfo();
		info.setUsername(username);
		info.setPwd(password);
		info.setEmail(email);
		info.setQq(qq);
		info.setMsn(msn);
		info.setWangwang(wangwang);
		info.setMobile(mobile);
		info.setAlipay(alipay);
		info.setAlipayName(alipayName);

		Member member = new Member();
		member.setInfo(info);// 设置基本信息
		member.setNick(String.valueOf(result.get("nick")));
		member.setUser_id(userId);
		member.setSite_id(site_id);
		member.setCreated(new Date());
		member.setIsOnline(true);
		member.setLastVisit(new Date());
		member.setNums(0);
		member.setType(0);
		member.setVisits(1);
		Object third_type = EnvManager.getSessionAttribute("THIRD_TYPE");
		Object third_id = EnvManager.getSessionAttribute("THIRD_ID");
		if (third_type != null && third_id != null) {
			String t_type = String.valueOf(third_type);
			String t_id = String.valueOf(third_id);
			if ("sina".equals(t_type)) {
				member.setSina_uid(t_id);
				if (EnvManager.getSessionAttribute("THIRD_NICK") != null) {
					member.setSina_nick(String.valueOf(EnvManager
							.getSessionAttribute("THIRD_NICK")));
				}
				if (EnvManager.getSessionAttribute("THIRD_TOKEN") != null) {
					member.setSina_token(String.valueOf(EnvManager
							.getSessionAttribute("THIRD_TOKEN")));
				}
				if (EnvManager.getSessionAttribute("THIRD_SECRET") != null) {
					member.setSina_secret(String.valueOf(EnvManager
							.getSessionAttribute("THIRD_SECRET")));
				}
			} else if ("taobao".equals(t_type)) {
				member.setTaobao_uid(t_id);
				if (EnvManager.getSessionAttribute("THIRD_NICK") != null) {
					member.setTaobao_nick(String.valueOf(EnvManager
							.getSessionAttribute("THIRD_NICK")));
				}
				if (EnvManager.getSessionAttribute("THIRD_TOKEN") != null) {
					member.setTaobao_token(String.valueOf(EnvManager
							.getSessionAttribute("THIRD_TOKEN")));
				}
				if (EnvManager.getSessionAttribute("THIRD_SECRET") != null) {
					member.setTaobao_secret(String.valueOf(EnvManager
							.getSessionAttribute("THIRD_SECRET")));
				}
			} else if ("qq".equals(t_type)) {
				member.setQq_uid(t_id);
				if (EnvManager.getSessionAttribute("THIRD_NICK") != null) {
					member.setQq_nick(String.valueOf(EnvManager
							.getSessionAttribute("THIRD_NICK")));
				}
				if (EnvManager.getSessionAttribute("THIRD_TOKEN") != null) {
					member.setQq_token(String.valueOf(EnvManager
							.getSessionAttribute("THIRD_TOKEN")));
				}
				if (EnvManager.getSessionAttribute("THIRD_SECRET") != null) {
					member.setQq_secret(String.valueOf(EnvManager
							.getSessionAttribute("THIRD_SECRET")));
				}
			}
		}
		siteService.registeMember(member, EnvManager.getInvitation());
		// 默认使用站点统一的分成比例
		SiteCommission commission = siteService.get(SiteCommission.class,
				site_id);
		member.setAdCommissionRate(commission.getAdCommissionRate());
		member.setCommissionRate(commission.getCommissionRate());
		EnvManager.setMember(member);
		return WindSiteRestUtil.SUCCESS;
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
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		WindSiteRestUtil.covertFanliPID(siteService, request, result, userId);
		return new ModelAndView("site/member/fanli/redirect", result);
	}

	/**
	 * 登录界面
	 * 
	 * @return
	 */
	@RequestMapping(value = "/login")
	public ModelAndView login(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String userId = request.getParameter("USER");
		WindSiteRestUtil.covertFanliPID(siteService, request, result, userId);
		String site_id = String.valueOf(result.get("sid"));
		result.put("links", siteService.findAllByCriterionAndOrder(
				FanliLinks.class, Order.asc("sortOrder"), R.eq("site_id",
						site_id), R.eq("user_id", userId)));
		result.put("referer", request.getParameter("referer"));
		return new ModelAndView("site/member/fanli/login", result);
	}

	/**
	 * 第三方登录返回
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping(value = "/loginfl/third/authorize")
	@ResponseBody
	public String loginFanliThirdAuthorize(HttpServletRequest request,
			HttpServletResponse response) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		WindSiteRestUtil.covertFanliPID(siteService, request, result, userId);
		String third_type = request.getParameter("third_type");
		if ("sina".equals(third_type)) {

			try {
				response
						.sendRedirect(WeiboConfig.getValue("authorizeURL")
								.trim()
								+ "?client_id="
								+ String.valueOf(result.get("sina_appkey"))
								+ "&redirect_uri="
								+ URLEncoder
										.encode(
												"http://"
														+ String.valueOf(result
																.get("www"))
														+ "/router/fanli/loginfl/third/callback?third_type=sina",
												"utf-8")
								+ "&response_type=code");
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 第三方登录返回
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping(value = "/loginfl/third/callback")
	@ResponseBody
	public String loginFanliThirdCallback(HttpServletRequest request,
			HttpServletResponse response) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		WindSiteRestUtil.covertFanliPID(siteService, request, result, userId);
		String third_type = request.getParameter("third_type");
		if ("sina".equals(third_type)) {
			String code = request.getParameter("code");
			Oauth oauth = new Oauth();
			try {
				WeiboConfig.updateProperties("client_ID", String.valueOf(result
						.get("sina_appkey")));
				WeiboConfig.updateProperties("client_SERCRET", String
						.valueOf(result.get("sina_appsecret")));
				WeiboConfig.updateProperties("redirect_URI", "");
				AccessToken token = oauth.getAccessTokenByCode(code);
				Weibo weibo = new Weibo();
				weibo.setToken(token.getAccessToken());
				// Users users = new Users();
			} catch (WeiboException e) {
				SystemException.handleMessageException(e.getMessage());
			}
		}

		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 第三方登录
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping(value = "/loginfl/unbind")
	@ResponseBody
	public String loginFanliThirdUnBind(HttpServletRequest request,
			HttpServletResponse response) {
		String type = request.getParameter("third_type");
		Member member = siteService.get(Member.class, EnvManager.getMember()
				.getId());
		if ("sina".equals(type)) {
			member.setSina_uid(null);
			member.setSina_nick(null);
			member.setSina_token(null);
			member.setSina_secret(null);
		} else if ("taobao".equals(type)) {
			member.setTaobao_uid(null);
			member.setTaobao_nick(null);
			member.setTaobao_token(null);
			member.setTaobao_secret(null);
		} else if ("qq".equals(type)) {
			member.setQq_uid(null);
			member.setQq_nick(null);
			member.setQq_token(null);
			member.setQq_secret(null);
		}
		siteService.update(member);// 更新
		return "200";// 绑定

	}

	/**
	 * 第三方登录
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping(value = "/loginfl/bind")
	@ResponseBody
	public String loginFanliThirdBind(HttpServletRequest request,
			HttpServletResponse response) {
		String userId = request.getParameter("USER");
		String type = request.getParameter("third_type");
		String id = request.getParameter("third_id");
		if (!"sina".equals(type) && !"taobao".equals(type)
				&& !"qq".equals(type)) {
			SystemException.handleMessageException("当前指定第三方平台尚未接入");
		}
		if (StringUtils.isEmpty(id)) {
			SystemException.handleMessageException("第三方平台登录失败");
		}
		String third_nick = request.getParameter("third_nick");
		String token = request.getParameter("third_token");
		String secret = request.getParameter("third_secret");
		Member member = siteService.findByCriterion(Member.class, R.eq(type
				+ "_uid", id), R.eq("user_id", userId));
		if (member != null) {// 绑定
			return member.getInfo().getUsername();// 该帐号已被绑定
		}
		member = siteService.get(Member.class, EnvManager.getMember().getId());
		if ("sina".equals(type)) {
			member.setSina_uid(id);
			member.setSina_nick(third_nick);
			member.setSina_token(token);
			member.setSina_secret(secret);
		} else if ("taobao".equals(type)) {
			member.setTaobao_uid(id);
			member.setTaobao_nick(third_nick);
			member.setTaobao_token(token);
			member.setTaobao_secret(secret);
		} else if ("qq".equals(type)) {
			member.setQq_uid(id);
			member.setQq_nick(third_nick);
			member.setQq_token(token);
			member.setQq_secret(secret);
		}
		siteService.update(member);// 更新
		return "200";// 绑定

	}

	/**
	 * 第三方登录
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping(value = "/loginfl/third")
	@ResponseBody
	public String loginFanliThird(HttpServletRequest request,
			HttpServletResponse response) {
		String userId = request.getParameter("USER");
		String type = request.getParameter("third_type");
		String id = request.getParameter("third_id");
		if (!"sina".equals(type) && !"taobao".equals(type)
				&& !"qq".equals(type)) {
			SystemException.handleMessageException("当前指定第三方平台尚未接入");
		}
		if (StringUtils.isEmpty(id)) {
			SystemException.handleMessageException("第三方平台登录失败");
		}
		String third_nick = request.getParameter("third_nick");
		String token = request.getParameter("third_token");
		String secret = request.getParameter("third_secret");
		Member member = siteService.findByCriterion(Member.class, R.eq(type
				+ "_uid", id), R.eq("user_id", userId));
		if (member == null) {// 转向注册绑定页面
			EnvManager.setSessionAttribute("THIRD_TYPE", type);
			EnvManager.setSessionAttribute("THIRD_ID", id);
			EnvManager.setSessionAttribute("THIRD_NICK", third_nick);
			EnvManager.setSessionAttribute("THIRD_TOKEN", token);
			EnvManager.setSessionAttribute("THIRD_SECRET", secret);
			// 跳转到注册页面
			Map<String, Object> result = new HashMap<String, Object>();
			WindSiteRestUtil.covertPID(siteService, result, userId);
			return "202";// 注册
		} else {
			if ("sina".equals(type)) {
				member.setSina_nick(third_nick);
				member.setSina_token(token);
				member.setSina_secret(secret);
			} else if ("taobao".equals(type)) {
				member.setTaobao_nick(third_nick);
				member.setTaobao_token(token);
				member.setTaobao_secret(secret);
			} else if ("qq".equals(type)) {
				member.setQq_nick(third_nick);
				member.setQq_token(token);
				member.setQq_secret(secret);
			}
			siteService.update(member);// 更新

			if (StringUtils.isNotEmpty(userId)) {
				MemberInfo info = member.getInfo();
				String username = info.getUsername();
				String password = info.getPwd();// TODO 密码加密
				Map<String, Object> result = new HashMap<String, Object>();
				WindSiteRestUtil.covertPID(siteService, result, userId);
				if (WindSiteRestUtil.isFanli(result)) {
					String site_id = String.valueOf(result.get("sid"));
					String nick = String.valueOf(result.get("nick"));
					String www = String.valueOf(result.get("www"));
					member = siteService.validateFanliMember(nick, username,
							password, site_id, userId);
					if (member != null) {
						SiteCommission commission = null;
						if (member.getCommissionRate() == null) {
							commission = siteService.get(SiteCommission.class,
									site_id);
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
						try {
							// 设置Cookie
							Cookie cookie = new Cookie(
									"SESSION_LOGIN_USERNAME", URLEncoder
											.encode(username, "utf-8")); // 保存用户名到Cookie
							cookie.setPath("/");
							cookie.setDomain(www);
							cookie.setMaxAge(99999999);
							response.addCookie(cookie);
							// 保存密码到Cookie，注意需要加密一下
							MessageDigest md5 = MessageDigest
									.getInstance("MD5");
							byte[] bytes = md5.digest(password.toString()
									.getBytes("UTF-8"));
							BASE64Encoder encode = new BASE64Encoder();
							cookie = new Cookie("SESSION_LOGIN_PASSWORD",
									URLEncoder.encode(encode.encode(bytes),
											"UTF-8"));
							cookie.setPath("/");
							cookie.setDomain(www);
							cookie.setMaxAge(99999999);
							response.addCookie(cookie);
						} catch (Exception e) {
							e.printStackTrace();
						}
					} else {
						SystemException.handleMessageException("当前站点不支持会员登录");
					}
				}
			}
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 登录
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping(value = "/loginfl")
	@ResponseBody
	public String loginFanli(HttpServletRequest request,
			HttpServletResponse response) {
		String userId = request.getParameter("USER");
		if (StringUtils.isNotEmpty(userId)) {// 返利登录
			if (EnvManager.getMember() != null) {// 如果已登录
				return WindSiteRestUtil.SUCCESS;
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
				String www = String.valueOf(result.get("www"));
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
					Object third_type = EnvManager
							.getSessionAttribute("THIRD_TYPE");
					Object third_id = EnvManager
							.getSessionAttribute("THIRD_ID");
					if (third_type != null && third_id != null) {
						// MemberInfo info = member.getInfo();
						String t_type = String.valueOf(third_type);
						String t_id = String.valueOf(third_id);
						if ("sina".equals(t_type)) {
							member.setSina_uid(t_id);
							if (EnvManager.getSessionAttribute("THIRD_NICK") != null) {
								member.setSina_nick(String.valueOf(EnvManager
										.getSessionAttribute("THIRD_NICK")));
							}
							if (EnvManager.getSessionAttribute("THIRD_TOKEN") != null) {
								member.setSina_token(String.valueOf(EnvManager
										.getSessionAttribute("THIRD_TOKEN")));
							}
							if (EnvManager.getSessionAttribute("THIRD_SECRET") != null) {
								member.setSina_secret(String.valueOf(EnvManager
										.getSessionAttribute("THIRD_SECRET")));
							}
						} else if ("taobao".equals(t_type)) {
							member.setTaobao_uid(t_id);
							if (EnvManager.getSessionAttribute("THIRD_NICK") != null) {
								member.setTaobao_nick(String.valueOf(EnvManager
										.getSessionAttribute("THIRD_NICK")));
							}
							if (EnvManager.getSessionAttribute("THIRD_TOKEN") != null) {
								member
										.setTaobao_token(String
												.valueOf(EnvManager
														.getSessionAttribute("THIRD_TOKEN")));
							}
							if (EnvManager.getSessionAttribute("THIRD_SECRET") != null) {
								member
										.setTaobao_secret(String
												.valueOf(EnvManager
														.getSessionAttribute("THIRD_SECRET")));
							}
						} else if ("qq".equals(t_type)) {
							member.setQq_uid(t_id);
							if (EnvManager.getSessionAttribute("THIRD_NICK") != null) {
								member.setQq_nick(String.valueOf(EnvManager
										.getSessionAttribute("THIRD_NICK")));
							}
							if (EnvManager.getSessionAttribute("THIRD_TOKEN") != null) {
								member.setQq_token(String.valueOf(EnvManager
										.getSessionAttribute("THIRD_TOKEN")));
							}
							if (EnvManager.getSessionAttribute("THIRD_SECRET") != null) {
								member.setQq_secret(String.valueOf(EnvManager
										.getSessionAttribute("THIRD_SECRET")));
							}
						}
						siteService.update(member);
					}
					EnvManager.setMember(member);// 设置当前返利会员
					try {
						// 设置Cookie
						Cookie cookie = new Cookie("SESSION_LOGIN_USERNAME",
								URLEncoder.encode(username, "utf-8")); // 保存用户名到Cookie
						cookie.setPath("/");
						cookie.setDomain(www);
						cookie.setMaxAge(99999999);
						response.addCookie(cookie);
						// 保存密码到Cookie，注意需要加密一下
						MessageDigest md5 = MessageDigest.getInstance("MD5");
						byte[] bytes = md5.digest(password.toString().getBytes(
								"UTF-8"));
						BASE64Encoder encode = new BASE64Encoder();
						cookie = new Cookie("SESSION_LOGIN_PASSWORD",
								URLEncoder
										.encode(encode.encode(bytes), "UTF-8"));
						cookie.setPath("/");
						cookie.setDomain(www);
						cookie.setMaxAge(99999999);
						response.addCookie(cookie);
					} catch (Exception e) {
						e.printStackTrace();
					}
				} else {
					SystemException.handleMessageException("当前站点不支持会员登录");
				}
			}

		}

		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 登出
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public void logout(HttpServletRequest request, HttpServletResponse response) {
		String userId = request.getParameter("USER");
		Map<String, Object> result = new HashMap<String, Object>();
		WindSiteRestUtil.covertFanliPID(siteService, request, result, userId);
		EnvManager.logoutSession();
		// 清空
		Cookie cookie = new Cookie("SESSION_LOGIN_USERNAME", null); // 保存用户名到Cookie
		cookie.setPath("/");
		cookie.setDomain(String.valueOf(result.get("www")));
		cookie.setMaxAge(0);
		response.addCookie(cookie);
		String from = request.getParameter("from");
		if (StringUtils.isEmpty(from)) {
			try {
				response.sendRedirect("http://" + result.get("www"));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
