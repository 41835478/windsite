package com.wind.site.rest;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.taobao.api.request.ShopcatsListGetRequest;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.core.util.DateUtils;
import com.wind.discuz.model.DiscuzMembers;
import com.wind.discuz.service.IDiscuzService;
import com.wind.site.command.CommandExecutor;
import com.wind.site.command.impl.ItemGroupDoctorCommand;
import com.wind.site.command.impl.UpdateUserTemplateByTemplateCommand;
import com.wind.site.command.impl.UpdateUserTemplateByUserIdCommand;
import com.wind.site.command.impl.UpdateUserTemplateCommand;
import com.wind.site.command.impl.UserItemDetailCommand;
import com.wind.site.command.impl.UserShopDetailCommand;
import com.wind.site.env.EnvManager;
import com.wind.site.freemarker.IDeployZone;
import com.wind.site.freemarker.method.DatelineMethod;
import com.wind.site.freemarker.method.ModuleMethod;
import com.wind.site.freemarker.method.WidgetCustomerMethod;
import com.wind.site.model.ADBlogStatus;
import com.wind.site.model.ADUserTemplate;
import com.wind.site.model.CoolSite;
import com.wind.site.model.CreditsLog;
import com.wind.site.model.CustomeWidget;
import com.wind.site.model.DomainHistory;
import com.wind.site.model.FavoriteForum;
import com.wind.site.model.FavoriteWidget;
import com.wind.site.model.Forum;
import com.wind.site.model.ForumAccount;
import com.wind.site.model.ForumThread;
import com.wind.site.model.ForumType;
import com.wind.site.model.ItemGroup;
import com.wind.site.model.ItemGroupDoctor;
import com.wind.site.model.Limit;
import com.wind.site.model.ShopGroup;
import com.wind.site.model.Site;
import com.wind.site.model.SiteImpl;
import com.wind.site.model.T_ItemCat;
import com.wind.site.model.T_SpaceUser;
import com.wind.site.model.T_TaobaokeItem;
import com.wind.site.model.T_TaobaokeShop;
import com.wind.site.model.UsedCustomeWidget;
import com.wind.site.model.User;
import com.wind.site.model.UserTemplate;
import com.wind.site.model.Widget;
import com.wind.site.model.WidgetAttribute;
import com.wind.site.model.convert.ItemGroupConvert;
import com.wind.site.model.convert.WidgetAttributeConvert;
import com.wind.site.service.IMemberService;
import com.wind.site.service.IPageService;
import com.wind.site.service.ISiteService;
import com.wind.site.util.TaobaoFetchUtil;
import com.wind.site.util.WidgetUtil;
import com.wind.site.util.WindSiteRestUtil;
import com.wind.uc.model.UCSpace;
import com.wind.uc.service.IUCService;

import freemarker.template.Template;

/**
 * 会员功能RESTFUL服务,需登录
 * 
 * @author fxy
 * 
 */
@Controller
@RequestMapping("/member")
public class MemberRest {
	// private static final Logger logger = Logger.getLogger(MemberRest.class
	// .getName());

	@Autowired
	private IMemberService memberService;
	@Autowired
	private ISiteService siteService;
	@Autowired
	private IUCService ucService;
	@Autowired
	private IDiscuzService discuzService;
	@Autowired
	private FreeMarkerConfigurer fcg;
	@Autowired
	private IDeployZone deployZone;
	@Autowired
	private WidgetCustomerMethod widgetCustomer;
	@Autowired
	private DatelineMethod dateline;

	/**
	 * 会员普通功能通用视图访问
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/view/{view}", method = RequestMethod.GET)
	public ModelAndView memberView(@PathVariable String view,
			HttpServletRequest request, HttpServletResponse response) {
		if (StringUtils.isNotEmpty(view)) {
			if (EnvManager.getMemberViews().contains(view)) {
				return new ModelAndView("site/member/" + view);
			} else {
				try {
					if ("AJAX".equalsIgnoreCase(request.getHeader("WindType"))) {
						SystemException.handleMessageException("您访问的页面[" + view
								+ "]不存在");
					} else {
						response.sendError(404);
					}

				} catch (IOException e) {
					e.printStackTrace();
				}
			}

		}
		return null;
	}

	/**
	 * 当前版本说明
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/versions")
	public ModelAndView versionsView(HttpServletRequest request,
			HttpServletResponse response) {
		return new ModelAndView("site/versions");
	}

	/**
	 * 创建自定义二级域名
	 * 
	 * @return
	 */
	@RequestMapping(value = "/domainname/create/{sid}", method = RequestMethod.POST)
	@ResponseBody
	public String createDomainName(@PathVariable String sid,
			HttpServletRequest request, HttpServletResponse response) {
		String domainName = request.getParameter("domainName");
		if (StringUtils.isEmpty(domainName)) {
			SystemException.handleMessageException("未指定自定义二级域名");
		}
		if (domainName.startsWith("shop")) {
			SystemException.handleMessageException("自定义二级域名不能以shop开头");
		}
		if (domainName.length() < 5) {
			SystemException.handleMessageException("自定义二级域名长度不能小于5");
		}
		if (domainName.length() > 30) {
			SystemException.handleMessageException("自定义二级域名长度不能大于30");
		}
		String regEx = "^[a-zA-Z]+[0-9]+$"; // 表示a或f
		Pattern p = Pattern.compile(regEx);
		if (!p.matcher(domainName).find()) {
			SystemException.handleMessageException("自定义二级域名必须是英文字母+数字形式");
		}
		memberService.createDomainName(sid, domainName);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 创建独立域名
	 * 
	 * @return
	 */
	@RequestMapping(value = "/www/create/{sid}", method = RequestMethod.POST)
	@ResponseBody
	public String createWWW(@PathVariable String sid,
			HttpServletRequest request, HttpServletResponse response) {
		String www = request.getParameter("www");
		String icp = request.getParameter("icp");
		if (StringUtils.isEmpty(www)) {
			SystemException.handleMessageException("未指定独立域名");
		}
		if (EnvManager.getUser().getUsb().getVersionNo() <= 1.5f) {
			SystemException.handleMessageException("必须升级为付费版本(普及付费或返利版或卖家版)");
		}
		www = www.toLowerCase();
		List<DomainHistory> dhs = memberService.findAllByCriterion(
				DomainHistory.class, R.eq("site_id", sid));
		DomainHistory dh = null;
		if (dhs.size() == 1) {// 已存在
			dh = dhs.get(0);
			if (dh.getStatus() == 1) {
				SystemException.handleMessageException("该站点已经启用独立域名【"
						+ dh.getWww() + "】，会员【" + dh.getNick() + "】");
			} else {
				SystemException.handleMessageException("该站点已被会员【"
						+ dh.getNick() + "】提交了独立域名【" + dh.getWww() + "】");
			}
		} else if (dhs.size() == 0) {// 新增独立域名记录
			dh = new DomainHistory();
			dh.setNick(EnvManager.getUser().getNick());
			dh.setSite_id(sid);
			dh.setStatus(0);
			dh.setUser_id(EnvManager.getUser().getUser_id());
			if (!www.startsWith("www.")) {
				www = "www." + www;
			}
			dh.setWww(www);
			dh.setIcp(icp);
			memberService.save(dh);
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 修改独立域名
	 * 
	 * @return
	 */
	@RequestMapping(value = "/www/update/{did}", method = RequestMethod.POST)
	@ResponseBody
	public String updateWWW(@PathVariable String did,
			HttpServletRequest request, HttpServletResponse response) {
		String www = request.getParameter("www");
		String icp = request.getParameter("icp");
		if (StringUtils.isEmpty(www)) {
			SystemException.handleMessageException("未指定独立域名");
		}
		DomainHistory dh = memberService.get(DomainHistory.class, did);
		if (dh == null) {// 已存在
			SystemException.handleMessageException("该站点尚未绑定顶级域名");

		} else {// 修改独立域名记录
			if (!dh.getUser_id().equals(EnvManager.getUser().getUser_id())) {
				SystemException.handleMessageException("您没有权限修改此域名绑定记录");
			}
			if (!www.startsWith("www.")) {
				www = "www." + www;
			}
			dh.setStatus(0);
			dh.setWww(www);
			dh.setIcp(icp);
			memberService.update(dh);
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 审核独立域名
	 * 
	 * @return
	 */
	@RequestMapping(value = "/www/check/{did}", method = RequestMethod.POST)
	@ResponseBody
	public String checkWWW(@PathVariable String did,
			HttpServletRequest request, HttpServletResponse response) {
		String status = request.getParameter("status");
		String desc = request.getParameter("description");
		DomainHistory dh = memberService.get(DomainHistory.class, did);
		if (dh == null) {// 已存在
			SystemException.handleMessageException("该站点尚未绑定顶级域名");
		} else {// 修改独立域名记录
			if ("1".equals(status)) {// 审核通过
				dh.setStatus(1);
				dh.setDescription(null);
			} else {
				dh.setStatus(2);
				dh.setDescription(desc);
			}
			memberService.checkWWW(dh);
		}
		return WindSiteRestUtil.SUCCESS;
	}

	@RequestMapping(value = "/domainname/check/{domainName}", method = RequestMethod.GET)
	public String checkDomainName(@PathVariable String domainName,
			HttpServletRequest request, HttpServletResponse response) {
		List<Site> site = memberService.findAllByCriterion(Site.class,
				R.eq("domainName", domainName));
		if (site.size() > 0) {
			SystemException.handleMessageException("自定义二级域名【" + domainName
					+ "】重复,请重新输入");
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 盟友详情
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/forums/favorite/partners/{fid}", method = RequestMethod.GET)
	public ModelAndView partnerDetail(@PathVariable String fid,
			HttpServletRequest request, HttpServletResponse response) {
		Forum forum = memberService.get(Forum.class, fid);
		if (forum == null) {
			SystemException.handleMessageException("未找到指定的推广阵地");
		}
		String pageNoStr = request.getParameter("pageNo");
		String pageSizeStr = request.getParameter("pageSize");
		Integer pageNo = 1, pageSize = 20;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		if (StringUtils.isNotEmpty(pageSizeStr)) {
			try {
				pageSize = Integer.parseInt(pageSizeStr);
			} catch (Exception e) {
				pageSize = 20;
			}
		}

		Page<ForumThread> page = new Page<ForumThread>(pageNo, pageSize);
		Map<String, Object> result = new HashMap<String, Object>();
		// 查询所有收藏（论坛，博客，微博）
		Map<String, Object> params = new HashMap<String, Object>();
		String forumHql = "select new map(forum.id as id,forum.title as title,forum.site.title as siteTitle,forum.favorite as favorite)  from FavoriteForum where user_id=:user_id and type='1' ";
		String blogHql = "select new map(forum.id as id,forum.title as title,forum.title as siteTitle,forum.favorite as favorite)  from FavoriteForum where user_id=:user_id and type='3' ";
		String microblogHql = "select new map(forum.id as id,forum.title as title,forum.title as siteTitle,forum.favorite as favorite) from FavoriteForum where user_id=:user_id and type='4' ";
		params.put("user_id", EnvManager.getUser().getUser_id());// 查找当前用户收藏
		result.put(
				"forums",
				memberService.findByHql(forumHql
						+ " order by forum.sortOrder asc", params));
		result.put(
				"blogs",
				memberService.findByHql(blogHql
						+ " order by forum.sortOrder asc", params));
		result.put(
				"microblogs",
				memberService.findByHql(microblogHql
						+ " order by forum.sortOrder asc", params));
		// 查询当前收藏下的盟友记录
		Map<String, Object> partnerParams = new HashMap<String, Object>();

		String partnerHql = "";
		if (forum.getSite() != null) {
			partnerHql = "select new map(ff.id as id,ff.forum.id as forumId,u.uc_id as uc_id,ff.nick as nick,ff.forum.site.title as forum,ff.type as type) from FavoriteForum ff,User u where ff.forum.id=:fid and ff.user_id=u.user_id";
		} else {
			partnerHql = "select new map(ff.id as id,ff.forum.id as forumId,u.uc_id as uc_id,ff.nick as nick,ff.forum.title as forum,ff.type as type) from FavoriteForum ff,User u where ff.forum.id=:fid and ff.user_id=u.user_id";
		}
		partnerParams.put("fid", fid);
		result.put(
				"partners",
				memberService.findByHql(page, partnerHql
						+ " order by ff.created desc", partnerParams));
		if (EnvManager.getUser().getUc_id() != null) {
			result.put("friendIds",
					ucService.getFriends(EnvManager.getUser().getUc_id()));// 好友列表
			result.put("unFriendIds",
					ucService.getUnFriends(EnvManager.getUser().getUc_id()));// 未通过验证的好友列表
		} else {
			result.put("friendIds", "");
			result.put("unFriendIds", "");
		}
		result.put("page", page);
		result.put("forum", forum);
		return new ModelAndView("site/member/forum/partnerDetail", result);
	}

	/**
	 * 阵地详情
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/forums/favorite/detail/{fid}", method = RequestMethod.GET)
	public ModelAndView favoriteForumDetail(@PathVariable String fid,
			HttpServletRequest request, HttpServletResponse response) {
		FavoriteForum ff = memberService.get(FavoriteForum.class, fid);
		if (ff == null) {
			SystemException.handleMessageException("未找到指定的推广阵地");
		}
		String pageNoStr = request.getParameter("pageNo");
		String pageSizeStr = request.getParameter("pageSize");
		String dateStr = request.getParameter("date");
		Integer pageNo = 1, pageSize = 20;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		if (StringUtils.isNotEmpty(pageSizeStr)) {
			try {
				pageSize = Integer.parseInt(pageSizeStr);
			} catch (Exception e) {
				pageSize = 20;
			}
		}

		Page<ForumThread> page = new Page<ForumThread>(pageNo, pageSize);
		Map<String, Object> result = new HashMap<String, Object>();
		// 查询所有收藏（论坛，博客，微博）
		Map<String, Object> params = new HashMap<String, Object>();
		String forumHql = "select new map(id as id,forum.title as title,forum.site.title as siteTitle,threads as threads)  from FavoriteForum where user_id=:user_id and type='1' ";
		String blogHql = "select new map(id as id,forum.title as title,forum.title as siteTitle,threads as threads)  from FavoriteForum where user_id=:user_id and type='3' ";
		String microblogHql = "select new map(id as id,forum.title as title,forum.title as siteTitle,threads as threads) from FavoriteForum where user_id=:user_id and type='4' ";
		params.put("user_id", ff.getUser_id());
		result.put(
				"forums",
				memberService.findByHql(forumHql
						+ " order by forum.sortOrder asc", params));
		result.put(
				"blogs",
				memberService.findByHql(blogHql
						+ " order by forum.sortOrder asc", params));
		result.put(
				"microblogs",
				memberService.findByHql(microblogHql
						+ " order by forum.sortOrder asc", params));
		// 查询当前收藏下的推广记录
		Map<String, Object> threadParams = new HashMap<String, Object>();
		String threadHql = "select new map(id as id,title as title,url as url,account as account,fav.forum.title as forum,fav.type as type,createdDate as createdDate,createdBy as user_id) from ForumThread where fav.id=:fid";
		threadParams.put("fid", fid);
		if (StringUtils.isNotEmpty(dateStr)) {// 如果带有日期查询条件
			try {
				Date date = DateUtils.parseDate(dateStr,
						new String[] { DateUtils.YYYY_MM_DD });
				Calendar end = Calendar.getInstance();
				end.setTime(date);
				end.add(Calendar.DATE, 1);
				threadHql += "  and createdDate between :start and :end";
				threadParams.put("start", date);
				threadParams.put("end", end.getTime());
				result.put("date", dateStr);
			} catch (ParseException e) {
			}
		}
		result.put(
				"threads",
				memberService.findByHql(page, threadHql
						+ " order by createdDate desc", threadParams));
		result.put("page", page);
		// 查询当前收藏下的帐号信息
		// String accountHql =
		// "select new map(id as id,nick as nick,account as account,pwd as pwd,createdBy as user_id) from ForumAccount where fav.id=:fid";
		// result.put("accounts", memberService
		// .findByHql(accountHql, threadParams));
		result.put("favforum", ff);
		return new ModelAndView("site/member/forum/threadDetail", result);
	}

	/**
	 * 访问添加推广记录的Dialog
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/threaddialog/add/{fid}", method = RequestMethod.GET)
	public ModelAndView addThreadDialog(@PathVariable String fid,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		// result.put("accounts", memberService.findAllByCriterion(
		// ForumAccount.class, R.eq("fav.id", fid)));
		return new ModelAndView("site/member/forum/threadDialog", result);
	}

	/**
	 * 访问修改推广记录的Dialog
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/threaddialog/update/{tid}", method = RequestMethod.GET)
	public ModelAndView updateThreadDialog(@PathVariable String tid,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		ForumThread thread = memberService.get(ForumThread.class, tid);
		if (thread == null) {
			SystemException.handleMessageException("未找到指定推广记录");
		}
		result.put("thread", thread);
		// result.put("accounts", memberService.findAllByCriterion(
		// ForumAccount.class, R.eq("fav.id", thread.getAccount().getFav()
		// .getId())));
		return new ModelAndView("site/member/forum/threadDialog", result);
	}

	/**
	 * 新增推广记录
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/forum/favorite/addthread/{fid}", method = RequestMethod.POST)
	@ResponseBody
	public String addThread(@PathVariable String fid,
			HttpServletRequest request, HttpServletResponse response) {
		FavoriteForum ff = memberService.get(FavoriteForum.class, fid);
		if (ff == null) {
			SystemException.handleMessageException("未找到指定推广阵地");
		}
		String title = request.getParameter("title");
		String url = request.getParameter("url");
		String date = request.getParameter("date");
		String account = request.getParameter("account");
		String type = request.getParameter("type");
		String desc = request.getParameter("desc");
		ForumThread thread = new ForumThread();
		thread.setTitle(title);
		thread.setUrl(url);
		try {
			thread.setCreatedDate(DateUtils.parseDate(date,
					new String[] { DateUtils.YYYY_MM_DD }));
		} catch (ParseException e) {
			thread.setCreatedDate(new Date());
		}
		thread.setType(Integer.parseInt(type));
		if (StringUtils.isNotEmpty(desc)) {
			thread.setDescription(desc);
		}
		if (StringUtils.isNotEmpty(account))
			thread.setAccount(account);
		thread.setFav(ff);
		memberService.addThread(thread);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 修改推广记录
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/forum/favorite/modifythread/{tid}", method = RequestMethod.POST)
	@ResponseBody
	public String updateThread(@PathVariable String tid,
			HttpServletRequest request, HttpServletResponse response) {
		ForumThread thread = memberService.get(ForumThread.class, tid);
		if (thread == null) {
			SystemException.handleMessageException("未找到指定的推广记录");
		}
		String title = request.getParameter("title");
		String url = request.getParameter("url");
		String date = request.getParameter("date");
		String account = request.getParameter("account");
		String type = request.getParameter("type");
		String desc = request.getParameter("desc");
		thread.setTitle(title);
		thread.setUrl(url);
		try {
			thread.setCreatedDate(DateUtils.parseDate(date,
					new String[] { DateUtils.YYYY_MM_DD }));
		} catch (ParseException e) {
			thread.setCreatedDate(new Date());
		}
		thread.setType(Integer.parseInt(type));
		if (StringUtils.isNotEmpty(desc)) {
			thread.setDescription(desc);
		}
		if (StringUtils.isNotEmpty(account))
			thread.setAccount(account);
		memberService.update(thread);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 访问添加会员的Dialog
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/accountdialog/add/{fid}", method = RequestMethod.GET)
	public ModelAndView addAccountDialog(@PathVariable String fid,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		return new ModelAndView("site/member/forum/accountDialog", result);
	}

	/**
	 * 访问修改会员的Dialog
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/accountdialog/update/{aid}", method = RequestMethod.GET)
	public ModelAndView updateAccountDialog(@PathVariable String aid,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		ForumAccount account = memberService.get(ForumAccount.class, aid);
		if (account == null) {
			SystemException.handleMessageException("未找到指定会员");
		}
		result.put("account", account);
		return new ModelAndView("site/member/forum/accountDialog", result);
	}

	/**
	 * 新增会员信息
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/forum/favorite/addaccount/{fid}", method = RequestMethod.POST)
	@ResponseBody
	public String addAccount(@PathVariable String fid,
			HttpServletRequest request, HttpServletResponse response) {
		FavoriteForum ff = memberService.get(FavoriteForum.class, fid);
		if (ff == null) {
			SystemException.handleMessageException("未找到指定推广阵地");
		}
		String nick = request.getParameter("nick");
		String account = request.getParameter("account");
		String pwd = request.getParameter("pwd");
		String desc = request.getParameter("desc");
		ForumAccount acc = memberService.findByCriterion(ForumAccount.class,
				R.eq("nick", nick), R.eq("fav.id", fid));
		if (acc != null) {
			SystemException.handleMessageException("会员昵称信息重复");
		}
		acc = new ForumAccount();
		acc.setNick(nick);
		acc.setAccount(account);
		acc.setPwd(pwd);
		if (StringUtils.isNotEmpty(desc))
			acc.setDescription(desc);
		acc.setFav(ff);
		memberService.save(acc);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 修改推广阵地会员信息
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/forum/favorite/modifyaccount/{aid}", method = RequestMethod.POST)
	@ResponseBody
	public String updateAccount(@PathVariable String aid,
			HttpServletRequest request, HttpServletResponse response) {
		ForumAccount acc = memberService.get(ForumAccount.class, aid);
		if (acc == null) {
			SystemException.handleMessageException("当前指定会员信息不存在");
		}
		String nick = request.getParameter("nick");
		String account = request.getParameter("account");
		String pwd = request.getParameter("pwd");
		String desc = request.getParameter("desc");
		if (!acc.getNick().equals(nick)) {
			ForumAccount oldAcc = memberService.findByCriterion(
					ForumAccount.class, R.eq("nick", nick),
					R.eq("fav.id", acc.getFav().getId()));
			if (oldAcc != null) {
				SystemException.handleMessageException("会员昵称信息重复");
			}
		}
		acc.setNick(nick);
		if (StringUtils.isNotEmpty(account))
			acc.setAccount(account);
		if (StringUtils.isNotEmpty(pwd))
			acc.setPwd(pwd);
		if (StringUtils.isNotEmpty(desc))
			acc.setDescription(desc);
		memberService.update(acc);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 删除指定推广阵地会员信息
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/forum/favorite/deleteaccount/{aid}", method = RequestMethod.GET)
	@ResponseBody
	public String deleteAccount(@PathVariable String aid,
			HttpServletRequest request, HttpServletResponse response) {
		memberService.deleteAccount(aid);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 删除指定推广阵地推广记录
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/forum/favorite/deletethread/{tid}", method = RequestMethod.GET)
	@ResponseBody
	public String deleteThread(@PathVariable String tid,
			HttpServletRequest request, HttpServletResponse response) {
		memberService.deleteThread(tid);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 我的推广阵地
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/forums", method = RequestMethod.GET)
	public ModelAndView myFavForums(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> params = new HashMap<String, Object>();
		String hql = "select new map(id as id,forum.type.title as typeTitle,forum.id as forumId,forum.title as title,forum.url as url,forum.realUrl as realUrl,forum.favorite as favorite,forum.site.title as siteTitle,forum.site.url as siteUrl)  from FavoriteForum where user_id=:user_id and type=:type ";
		String tid = request.getParameter("tid");
		if (StringUtils.isEmpty(tid)) {// 如果未指定一级类目
			tid = "1";
		} else if (!"1".equals(tid)) {
			hql = "select new map(id as id,forum.type.title as typeTitle,forum.id as forumId,forum.title as title,forum.url as url,forum.realUrl as realUrl,forum.favorite as favorite,forum.title as siteTitle,forum.url as siteUrl)  from FavoriteForum where user_id=:user_id and type=:type ";
		}
		params.put("type", tid);
		params.put("user_id", EnvManager.getUser().getUser_id());
		result.put("forums", memberService.findByHql(hql
				+ " order by forum.sortOrder asc", params));
		result.put("tid", tid);
		result.put("myFavoritedCount",
				memberService.countMyFavoriteForumByUserId(EnvManager.getUser()
						.getUser_id()));
		return new ModelAndView("site/member/forum/forums", result);
	}

	/**
	 * 推广阵地大全（微博）
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/microblogforums/market", method = RequestMethod.GET)
	public ModelAndView microblogforums(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> params1 = new HashMap<String, Object>();
		params1.put("cid", "41");
		Map<String, Object> params2 = new HashMap<String, Object>();
		params2.put("cid", "42");
		Map<String, Object> params3 = new HashMap<String, Object>();
		params3.put("cid", "43");
		Map<String, Object> params4 = new HashMap<String, Object>();
		params4.put("cid", "44");
		Map<String, Object> params5 = new HashMap<String, Object>();
		params5.put("cid", "45");
		Map<String, Object> params6 = new HashMap<String, Object>();
		params6.put("cid", "46");
		String hql = "select new map(id as id,title as title,url as url,realUrl as realUrl,favorite as favorite,threads as threads) from Forum where type.id =:cid ";
		result.put("forums1", memberService.findByHql(hql
				+ " order by sortOrder asc", params1));
		result.put("forums2", memberService.findByHql(hql
				+ " order by sortOrder asc", params2));
		result.put("forums3", memberService.findByHql(hql
				+ " order by sortOrder asc", params3));
		result.put("forums4", memberService.findByHql(hql
				+ " order by sortOrder asc", params4));
		result.put("forums5", memberService.findByHql(hql
				+ " order by sortOrder asc", params5));
		result.put("forums6", memberService.findByHql(hql
				+ " order by sortOrder asc", params6));
		result.put("myFavorited", memberService.getMyFavoriteForumIds(
				EnvManager.getUser().getUser_id(), "4"));
		result.put("myFavoritedCount",
				memberService.countMyFavoriteForumByUserId(EnvManager.getUser()
						.getUser_id()));
		return new ModelAndView("site/member/forum/microblogmarket", result);
	}

	/**
	 * 推广阵地大全（博客）
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/blogforums/market", method = RequestMethod.GET)
	public ModelAndView blogforums(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> params1 = new HashMap<String, Object>();
		params1.put("cid", "31");
		Map<String, Object> params2 = new HashMap<String, Object>();
		params2.put("cid", "32");
		Map<String, Object> params3 = new HashMap<String, Object>();
		params3.put("cid", "33");
		String hql = "select new map(id as id,title as title,url as url,realUrl as realUrl,favorite as favorite,threads as threads) from Forum where type.id =:cid ";
		result.put("forums1", memberService.findByHql(hql
				+ " order by sortOrder asc", params1));
		result.put("forums2", memberService.findByHql(hql
				+ " order by sortOrder asc", params2));
		result.put("forums3", memberService.findByHql(hql
				+ " order by sortOrder asc", params3));
		result.put("myFavorited", memberService.getMyFavoriteForumIds(
				EnvManager.getUser().getUser_id(), "3"));
		result.put("myFavoritedCount",
				memberService.countMyFavoriteForumByUserId(EnvManager.getUser()
						.getUser_id()));
		return new ModelAndView("site/member/forum/blogsmarket", result);
	}

	/**
	 * 推广阵地大全（论坛）
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/forums/market", method = RequestMethod.GET)
	public ModelAndView forums(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> params = new HashMap<String, Object>();
		String hql = "select new map(id as id,title as title,url as url,realUrl as realUrl,favorite as favorite,site.title as siteTitle,site.url as siteUrl,threads as threads) from Forum where type.id =:cid ";
		String cid = request.getParameter("cid");
		String pcid = request.getParameter("pcid");
		ForumType type = null;// 二级类目
		ForumType parent = null;// 一级类目
		List<ForumType> types = new ArrayList<ForumType>();// 二级类目集合
		if (StringUtils.isEmpty(pcid)) {// 如果未指定一级类目
			parent = EnvManager.getForumTypes().get(0);
		} else {
			parent = memberService.get(ForumType.class, pcid);
		}
		types = memberService.findAllByCriterion(ForumType.class,
				R.eq("parent", parent.getId()));// 获取二级类目
		if (StringUtils.isEmpty(cid)) {// 如果未指定二级类目
			type = types.get(0);
			cid = type.getId();
		} else {
			type = memberService.get(ForumType.class, cid);
		}
		params.put("cid", cid);
		result.put("forums", memberService.findByHql(hql
				+ " order by sortOrder asc", params));
		result.put("parent", parent);
		result.put("type", type);
		result.put("types", types);
		result.put("parents", EnvManager.getForumTypes());
		result.put("myFavorited", memberService.getMyFavoriteForumIds(
				EnvManager.getUser().getUser_id(), "1"));
		result.put("myFavoritedCount",
				memberService.countMyFavoriteForumByUserId(EnvManager.getUser()
						.getUser_id()));
		return new ModelAndView("site/member/forum/forumsmarket", result);
	}

	/**
	 * 新增阵地收藏
	 * 
	 * @return
	 */
	@RequestMapping(value = "/forum/favorite/add/{fid}")
	@ResponseBody
	public String addFavForum(@PathVariable String fid,
			HttpServletRequest request) {
		String type = request.getParameter("type");
		if (StringUtils.isEmpty(type)) {
			SystemException.handleMessageException("收藏的阵地类型不能为空");
		}
		FavoriteForum ff = memberService.findByCriterion(FavoriteForum.class,
				R.eq("user_id", EnvManager.getUser().getUser_id()),
				R.eq("forum.id", fid));
		if (ff != null) {
			return "{\"code\":\"0\"}";// 已经收藏
		}
		memberService.addMyFavoriteForum(fid, type);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 删除收藏阵地
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/forum/favorite/delete/{ffid}", method = RequestMethod.GET)
	@ResponseBody
	public String deleteFavoriteForum(@PathVariable String ffid,
			HttpServletRequest request, HttpServletResponse response) {
		memberService.deleteMyFavoriteForum(ffid);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 组件设计大侠排行
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/widget/hotdesigners", method = RequestMethod.GET)
	public ModelAndView hotDesigners(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String sql = "select count(c.id) as widgets, u.user_id as user_id, u.nick as nick, sum(c.favorite) as favorite, sum(c.used) as used from w_user u ,w_widget_custome c where c.createdBy=u.user_id group by c.createdBy order by sum(c.used) desc limit 48";
		result.put("designers", memberService.executeNativeSql(sql,
				new HashMap<String, Object>()));
		return new ModelAndView("site/member/widget/bigwidgetdesigners", result);
	}

	/**
	 * 新增会员组件
	 * 
	 * @return
	 */
	@RequestMapping(value = "/widget/create/{wid}", method = RequestMethod.POST)
	@ResponseBody
	public String createWidget(@PathVariable String wid,
			HttpServletRequest request) {
		Widget widget = memberService.get(Widget.class, wid);
		if (widget == null) {
			SystemException.handleMessageException("您当前选择的组件模板不存在！");
		}
		if (!"complex".equals(widget.getType().getName())
				&& !("search").equals(widget.getType().getName())) {
			SystemException.handleMessageException("当前组件模板非混合型组件或者搜索类组件");
		}
		String title = request.getParameter("title");
		String cid = request.getParameter("cid");
		String friend = request.getParameter("friend");
		String color = request.getParameter("color");
		String description = request.getParameter("desc");
		String content = request.getParameter("content");
		CustomeWidget cw = new CustomeWidget();
		T_ItemCat cat = memberService.findByCriterion(T_ItemCat.class,
				R.eq("cid", cid));
		if (cat != null) {
			cw.setCat(cat);
		}
		if (StringUtils.isNotEmpty(description)) {
			cw.setDescription(description);
		}

		if (StringUtils.isNotEmpty(content)) {// 替换所有不正确的spid和pid
			content = content
					.replaceAll(EnvManager.getUser().getPid(), "\\${pid}")
					.replaceAll("http://www.xintaonet.com", "\\${siteurl}")
					.replaceAll(HtmlDesignerRest.JQUERY_REGEX, "");
		}
		cw.setContent(content);
		cw.setFriend(Integer.parseInt(friend));
		cw.setIsCharge(false);
		cw.setColor(Integer.parseInt(color));
		cw.setLayout(widget.getLayout());
		cw.setName(title);
		cw.setNick(EnvManager.getUser().getNick());
		cw.setSortOrder(0);
		cw.setStatus(1);
		cw.setIsEdit(true);
		cw.setWidgetUpdated(new Date());
		cw.setWidget(widget);
		memberService.createCustomeWidget(cw);
		return "{\"id\":\"" + cw.getId() + "\"}";
	}

	/**
	 * 删除会员组件
	 * 
	 * @return
	 */
	@RequestMapping(value = "/widget/delete/{cwid}")
	@ResponseBody
	public String deleteWidget(@PathVariable String cwid,
			HttpServletRequest request) {
		CustomeWidget cw = memberService.get(CustomeWidget.class, cwid);
		if (cw == null) {
			SystemException.handleMessageException("您当前选择的自定义组件不存在！");
		}
		if (!cw.getCreatedBy().equals(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("您没有权限删除他人的自定义组件！");
		}
		if (cw.getUsed() != null && cw.getUsed() > 0) {
			SystemException.handleMessageException("该组件已被他人使用，您无法删除！");
		}
		memberService.deleteCustomeWidget(cw);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 更新会员组件
	 * 
	 * @return
	 */
	@RequestMapping(value = "/widget/update/{cwid}", method = RequestMethod.POST)
	@ResponseBody
	public String updateWidget(@PathVariable String cwid,
			HttpServletRequest request) {
		CustomeWidget cw = memberService.get(CustomeWidget.class, cwid);
		if (cw == null) {
			SystemException.handleMessageException("您当前选择的自定义组件不存在！");
		}
		if (!cw.getCreatedBy().equals(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("您没有权限修改他人的自定义组件！");
		}
		if (!"complex".equals(cw.getWidget().getType().getName())
				&& !("search").equals(cw.getWidget().getType().getName())) {
			SystemException.handleMessageException("当前组件非混合型组件或者搜索类组件");
		}
		String title = request.getParameter("title");
		String cid = request.getParameter("cid");
		String friend = request.getParameter("friend");
		String color = request.getParameter("color");
		String description = request.getParameter("desc");
		String content = request.getParameter("content");
		T_ItemCat cat = memberService.findByCriterion(T_ItemCat.class,
				R.eq("cid", cid));
		if (cat != null) {
			cw.setCat(cat);
		}
		if (StringUtils.isNotEmpty(description)) {
			cw.setDescription(description);
		}
		if (StringUtils.isNotEmpty(content)) {// 替换所有不正确的spid和pid
			content = content
					.replaceAll(EnvManager.getUser().getPid(), "\\${pid}")
					.replaceAll("http://www.xintaonet.com", "\\${siteurl}")
					.replaceAll(HtmlDesignerRest.JQUERY_REGEX, "");
			;
		}
		cw.setContent(content);
		cw.setFriend(Integer.parseInt(friend));
		cw.setColor(Integer.parseInt(color));
		cw.setName(title);
		cw.setWidgetUpdated(new Date());
		memberService.update(cw);
		if (cw.getUsed() != null && cw.getUsed() > 0) {
			if (!CommandExecutor.getUpdatecommands().containsKey(
					"w-" + cw.getId())) {// 如果队列中不包含此组件的更新命令
				UpdateUserTemplateCommand command = new UpdateUserTemplateCommand();
				command.setDeployZone(deployZone);
				command.setFcg(fcg);
				command.setWidget(cw);
				command.setWidgetCustomer(widgetCustomer);
				CommandExecutor.getUpdatecommands().putIfAbsent(
						"w-" + cw.getId(), command);
			}
		}
		return "{\"id\":\"" + cw.getId() + "\"}";
	}

	/**
	 * 查看指定组件详情
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/widget/detail/{cwid}", method = RequestMethod.GET)
	public ModelAndView widgetDetail(@PathVariable String cwid,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		CustomeWidget widget = memberService.get(CustomeWidget.class, cwid);
		if (widget == null) {
			SystemException.handleMessageException("当前指定的自定义组件不存在");
		}
		widget.setContent(WidgetUtil.convertContentInner(widget, fcg));

		result.put("widget", widget);
		result.put("myFavorited", memberService.getMyFavoriteIds(EnvManager
				.getUser().getUser_id()));
		result.put("myCount", memberService
				.countCustomeWidgetByUserId(EnvManager.getUser().getUser_id()));
		result.put("favCount", memberService
				.countFavoriteWidgetByUserId(EnvManager.getUser().getUser_id()));
		result.put("allCount", memberService.countCustomeWidget());
		result.put("sysCount", memberService.countWidget());

		return new ModelAndView("site/member/widget/widgetDetail", result);
	}

	/**
	 * 查询指定组件的收藏记录
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/widget/detail/favorite/{cwid}", method = RequestMethod.GET)
	public ModelAndView widgetDetailFavorite(@PathVariable String cwid,
			HttpServletRequest request, HttpServletResponse response) {
		String pageNoStr = request.getParameter("pageNo");
		String pageSizeStr = request.getParameter("pageSize");
		Integer pageNo = 1, pageSize = 20;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		if (StringUtils.isNotEmpty(pageSizeStr)) {
			try {
				pageSize = Integer.parseInt(pageSizeStr);
			} catch (Exception e) {
				pageSize = 5;
			}
		}
		Page<FavoriteWidget> page = new Page<FavoriteWidget>(pageNo, pageSize);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("page", page);
		result.put("widgets", memberService.getFavoriteWidget(page, cwid));

		return new ModelAndView("site/member/widget/widgetDetailFavorite",
				result);
	}

	/**
	 * 查询指定组件的使用记录
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/widget/detail/used/{cwid}", method = RequestMethod.GET)
	public ModelAndView widgetDetailUsed(@PathVariable String cwid,
			HttpServletRequest request, HttpServletResponse response) {
		String pageNoStr = request.getParameter("pageNo");
		String pageSizeStr = request.getParameter("pageSize");
		Integer pageNo = 1, pageSize = 20;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		if (StringUtils.isNotEmpty(pageSizeStr)) {
			try {
				pageSize = Integer.parseInt(pageSizeStr);
			} catch (Exception e) {
				pageSize = 5;
			}
		}
		Page<UsedCustomeWidget> page = new Page<UsedCustomeWidget>(pageNo,
				pageSize);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("page", page);
		result.put("widgets", memberService.getUsedCustomeWidget(page, cwid));
		return new ModelAndView("site/member/widget/widgetDetailUsed", result);
	}

	/**
	 * 我的组件库
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/widget/my", method = RequestMethod.GET)
	public ModelAndView getMyWidgets(HttpServletRequest request,
			HttpServletResponse response) {
		String pageNoStr = request.getParameter("pageNo");
		String pageSizeStr = request.getParameter("pageSize");
		String layoutfilter = request.getParameter("layout");
		String typefilter = request.getParameter("type");
		String cidfilter = request.getParameter("cid");
		String sortOrderStr = request.getParameter("sortOrder");
		String q = request.getParameter("q");
		if (StringUtils.isNotEmpty(q)) {
			try {
				q = new String(q.getBytes("ISO-8859-1"), "UTF-8");
			} catch (UnsupportedEncodingException e) {
				q = "";
			}
		}
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> params = new HashMap<String, Object>();
		if (StringUtils.isNotEmpty(sortOrderStr)) {
			result.put("sortOrder", sortOrderStr);
			sortOrderStr = sortOrderStr.replace("_desc", " desc").replace(
					"_asc", " asc");
		} else {
			sortOrderStr = "widgetUpdated desc";
			result.put("sortOrder", "widgetUpdated_desc");
		}
		Integer pageNo = 1, pageSize = 5;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		if (StringUtils.isNotEmpty(pageSizeStr)) {
			try {
				pageSize = Integer.parseInt(pageSizeStr);
			} catch (Exception e) {
				pageSize = 5;
			}
		}
		Page<CustomeWidget> page = new Page<CustomeWidget>(pageNo, pageSize);
		params.put("userId", EnvManager.getUser().getUser_id());
		String hql = "from CustomeWidget where createdBy=:userId ";
		if (StringUtils.isNotEmpty(layoutfilter) && !layoutfilter.equals("-1")) {
			try {
				params.put("layout", Integer.parseInt(layoutfilter));
				hql += " and layout=:layout";
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			layoutfilter = "-1";
		}
		if (StringUtils.isNotEmpty(typefilter) && !typefilter.equals("-1")) {
			try {
				params.put("type", typefilter);
				hql += " and widget.type.name=:type";
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			typefilter = "-1";
		}
		if (StringUtils.isNotEmpty(cidfilter) && !cidfilter.equals("0")) {
			params.put("cid", cidfilter);
			hql += " and cat.cid=:cid";
		} else {
			cidfilter = "0";
		}
		if (StringUtils.isNotEmpty(q)) {
			hql += " and name like :q";
			params.put("q", "%" + q + "%");
		}
		hql += " order by " + sortOrderStr;
		List<CustomeWidget> widgets = memberService
				.findByHql(page, hql, params);
		if (widgets.size() > 0) {
			Map<String, Object> maps = new HashMap<String, Object>();
			maps.put("pid", EnvManager.getUser().getPid());
			maps.put("spid", EnvManager.getUser().getPid()
					.replaceAll("mm_", "").replaceAll("_0_0", ""));
			maps.put("siteurl", "");
			for (CustomeWidget widget : widgets) {
				widget.setContent(WidgetUtil.convertContent(widget, fcg, maps));
			}
		}
		result.put("favCount", memberService
				.countFavoriteWidgetByUserId(EnvManager.getUser().getUser_id()));
		result.put("allCount", memberService.countCustomeWidget());
		result.put("sysCount", memberService.countWidget());
		result.put("widgets", widgets);
		result.put("page", page);
		result.put("layoutfilter", layoutfilter);
		result.put("typefilter", typefilter);
		result.put("cidfilter", cidfilter);
		result.put("q", q);

		result.put("cats", EnvManager.getRootCats());
		return new ModelAndView("site/member/widget/myWidgets", result);
	}

	/**
	 * 访问指定会员组件库
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/widget/designers/{id}", method = RequestMethod.GET)
	public ModelAndView getDesignerWidgets(@PathVariable String id,
			HttpServletRequest request, HttpServletResponse response) {
		String pageNoStr = request.getParameter("pageNo");
		String pageSizeStr = request.getParameter("pageSize");
		String layoutfilter = request.getParameter("layout");
		String cidfilter = request.getParameter("cid");
		String sortOrderStr = request.getParameter("sortOrder");

		Map<String, Object> result = new HashMap<String, Object>();
		if (StringUtils.isNotEmpty(sortOrderStr)) {
			result.put("sortOrder", sortOrderStr);
			sortOrderStr = sortOrderStr.replace("_desc", " desc").replace(
					"_asc", " asc");
		} else {
			sortOrderStr = "widgetUpdated desc";
			result.put("sortOrder", "widgetUpdated_desc");
		}
		Integer pageNo = 1, pageSize = 5;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		if (StringUtils.isNotEmpty(pageSizeStr)) {
			try {
				pageSize = Integer.parseInt(pageSizeStr);
			} catch (Exception e) {
				pageSize = 5;
			}
		}

		Page<CustomeWidget> page = new Page<CustomeWidget>(pageNo, pageSize);
		User user = memberService.findByCriterion(User.class,
				R.eq("user_id", id));
		if (user == null) {
			SystemException.handleMessageException("未找到该会员");
		}
		result.put("user", user);
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userId", id);
		String hql = "from CustomeWidget where createdBy=:userId ";
		if (StringUtils.isNotEmpty(layoutfilter) && !layoutfilter.equals("-1")) {
			try {
				params.put("layout", Integer.parseInt(layoutfilter));
				hql += " and layout=:layout";
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			layoutfilter = "-1";
		}
		if (StringUtils.isNotEmpty(cidfilter) && !cidfilter.equals("0")) {
			params.put("cid", cidfilter);
			hql += " and cat.cid=:cid";
		} else {
			cidfilter = "0";
		}
		String q = request.getParameter("q");
		if (StringUtils.isNotEmpty(q)) {
			try {
				q = new String(q.getBytes("ISO-8859-1"), "UTF-8");
			} catch (UnsupportedEncodingException e) {
				q = "";
			}
		}
		if (StringUtils.isNotEmpty(q)) {
			hql += " and name like :q";
			params.put("q", "%" + q + "%");
		}
		result.put("q", q);
		hql += " order by " + sortOrderStr;
		List<CustomeWidget> widgets = memberService
				.findByHql(page, hql, params);
		if (widgets.size() > 0) {
			Map<String, Object> maps = new HashMap<String, Object>();
			maps.put("pid", EnvManager.getUser().getPid());
			maps.put("spid", EnvManager.getUser().getPid()
					.replaceAll("mm_", "").replaceAll("_0_0", ""));
			maps.put("siteurl", "");
			for (CustomeWidget widget : widgets) {
				widget.setContent(WidgetUtil.convertContent(widget, fcg, maps));
			}
		}
		result.put("myFavorited", memberService.getMyFavoriteIds(EnvManager
				.getUser().getUser_id()));
		result.put("favCount", memberService
				.countFavoriteWidgetByUserId(EnvManager.getUser().getUser_id()));// 收藏数
		result.put("allCount", memberService.countCustomeWidget());// 全部
		result.put("sysCount", memberService.countWidget());// 系统
		result.put("myCount", memberService
				.countCustomeWidgetByUserId(EnvManager.getUser().getUser_id()));// 我的
		result.put("allFavorite",
				memberService.countAllFavoriteWidgetByUserId(id));// 指定会员的组件被收藏总数
		result.put("allUsed", memberService.countAllUsedWidgetByUserId(id));// 指定会员的组件被使用总数
		result.put("allWidgets", memberService.countCustomeWidgetByUserId(id));// 指定会员的组件被使用总数
		result.put("widgets", widgets);// 设计师
		result.put("page", page);
		result.put("layoutfilter", layoutfilter);
		result.put("cidfilter", cidfilter);

		result.put("cats", EnvManager.getRootCats());
		return new ModelAndView("site/member/widget/designerDetail", result);
	}

	/**
	 * 新增收藏组件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/widget/favorite/add/{cwid}", method = RequestMethod.GET)
	@ResponseBody
	public String addFavoriteWidget(@PathVariable String cwid,
			HttpServletRequest request, HttpServletResponse response) {
		FavoriteWidget fw = memberService.findByCriterion(FavoriteWidget.class,
				R.eq("user_id", EnvManager.getUser().getUser_id()),
				R.eq("widget.id", cwid));
		if (fw != null) {
			return "{\"code\":\"0\"}";// 已经收藏
		}
		memberService.addMyFavoriteWidget(cwid);
		return "{\"code\":\"1\"}";
	}

	/**
	 * 删除收藏组件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/widget/favorite/delete/{cwid}", method = RequestMethod.GET)
	@ResponseBody
	public String deleteFavoriteWidget(@PathVariable String cwid,
			HttpServletRequest request, HttpServletResponse response) {
		memberService.deleteMyFavoriteWidget(cwid);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 我的收藏组件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/widget/favorite", method = RequestMethod.GET)
	public ModelAndView myFavoriteWidget(HttpServletRequest request,
			HttpServletResponse response) {
		String pageNoStr = request.getParameter("pageNo");
		String pageSizeStr = request.getParameter("pageSize");
		String layoutfilter = request.getParameter("layout");
		String cidfilter = request.getParameter("cid");
		String sortOrderStr = request.getParameter("sortOrder");
		String typefilter = request.getParameter("type");
		Map<String, Object> result = new HashMap<String, Object>();
		if (StringUtils.isNotEmpty(sortOrderStr)) {
			result.put("sortOrder", sortOrderStr);
			sortOrderStr = sortOrderStr.replace("_desc", " desc").replace(
					"_asc", " asc");
		} else {
			sortOrderStr = "widgetUpdated desc";
			result.put("sortOrder", "widgetUpdated_desc");
		}
		Integer pageNo = 1, pageSize = 5;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		if (StringUtils.isNotEmpty(pageSizeStr)) {
			try {
				pageSize = Integer.parseInt(pageSizeStr);
			} catch (Exception e) {
				pageSize = 5;
			}
		}
		Page<CustomeWidget> page = new Page<CustomeWidget>(pageNo, pageSize);
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userId", EnvManager.getUser().getUser_id());
		String hql = "select t.widget from FavoriteWidget t where t.user_id=:userId ";
		if (StringUtils.isNotEmpty(layoutfilter) && !layoutfilter.equals("-1")) {
			try {
				params.put("layout", Integer.parseInt(layoutfilter));
				hql += " and t.widget.layout=:layout";
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			layoutfilter = "-1";
		}
		if (StringUtils.isNotEmpty(typefilter) && !typefilter.equals("-1")) {
			try {
				params.put("type", typefilter);
				hql += " and t.widget.widget.type.name=:type";
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			typefilter = "-1";
		}
		if (StringUtils.isNotEmpty(cidfilter) && !cidfilter.equals("0")) {
			params.put("cid", cidfilter);
			hql += " and t.widget.cat.cid=:cid";
		} else {
			cidfilter = "0";
		}
		String q = request.getParameter("q");
		if (StringUtils.isNotEmpty(q)) {
			try {
				q = new String(q.getBytes("ISO-8859-1"), "UTF-8");
			} catch (UnsupportedEncodingException e) {
				q = "";
			}
		}
		if (StringUtils.isNotEmpty(q)) {
			hql += " and t.widget.name like :q";
			params.put("q", "%" + q + "%");
		}
		result.put("q", q);
		hql += " order by t.widget." + sortOrderStr;
		List<CustomeWidget> widgets = memberService
				.findByHql(page, hql, params);
		if (widgets.size() > 0) {
			Map<String, Object> maps = new HashMap<String, Object>();
			maps.put("pid", EnvManager.getUser().getPid());
			maps.put("spid", EnvManager.getUser().getPid()
					.replaceAll("mm_", "").replaceAll("_0_0", ""));
			maps.put("siteurl", "");
			for (CustomeWidget widget : widgets) {
				widget.setContent(WidgetUtil.convertContent(widget, fcg, maps));
			}
		}
		result.put("myCount", memberService
				.countCustomeWidgetByUserId(EnvManager.getUser().getUser_id()));
		result.put("allCount", memberService.countCustomeWidget());
		result.put("sysCount", memberService.countWidget());
		result.put("widgets", widgets);
		result.put("page", page);
		result.put("layoutfilter", layoutfilter);
		result.put("typefilter", typefilter);
		result.put("cidfilter", cidfilter);

		result.put("cats", EnvManager.getRootCats());
		return new ModelAndView("site/member/widget/myFavoriteWidgets", result);
	}

	/**
	 * 组件超市
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/widget/market", method = RequestMethod.GET)
	public ModelAndView widgetMarket(HttpServletRequest request,
			HttpServletResponse response) {
		String pageNoStr = request.getParameter("pageNo");
		String pageSizeStr = request.getParameter("pageSize");
		String layoutfilter = request.getParameter("layout");
		String cidfilter = request.getParameter("cid");
		String sortOrderStr = request.getParameter("sortOrder");
		String typefilter = request.getParameter("type");
		Map<String, Object> result = new HashMap<String, Object>();
		if (StringUtils.isNotEmpty(sortOrderStr)) {
			result.put("sortOrder", sortOrderStr);
			sortOrderStr = sortOrderStr.replace("_desc", " desc").replace(
					"_asc", " asc");
		} else {
			sortOrderStr = "widgetUpdated desc";
			result.put("sortOrder", "widgetUpdated_desc");
		}
		Integer pageNo = 1, pageSize = 5;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		if (StringUtils.isNotEmpty(pageSizeStr)) {
			try {
				pageSize = Integer.parseInt(pageSizeStr);
			} catch (Exception e) {
				pageSize = 5;
			}
		}
		Page<CustomeWidget> page = new Page<CustomeWidget>(pageNo, pageSize);
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userId", EnvManager.getUser().getUser_id());
		String hql = "from CustomeWidget where friend=0";
		if (StringUtils.isNotEmpty(layoutfilter) && !layoutfilter.equals("-1")) {
			try {
				params.put("layout", Integer.parseInt(layoutfilter));
				hql += " and layout=:layout";
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			layoutfilter = "-1";
		}
		if (StringUtils.isNotEmpty(typefilter) && !typefilter.equals("-1")) {
			try {
				params.put("type", typefilter);
				hql += " and widget.type.name=:type";
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			typefilter = "-1";
		}
		if (StringUtils.isNotEmpty(cidfilter) && !cidfilter.equals("0")) {
			params.put("cid", cidfilter);
			hql += " and cat.cid=:cid";
		} else {
			cidfilter = "0";
		}
		String q = request.getParameter("q");
		if (StringUtils.isNotEmpty(q)) {
			try {
				q = new String(q.getBytes("ISO-8859-1"), "UTF-8");
			} catch (UnsupportedEncodingException e) {
				q = "";
			}
		}
		if (StringUtils.isNotEmpty(q)) {
			hql += " and name like :q";
			params.put("q", "%" + q + "%");
		}
		result.put("q", q);
		hql += " order by " + sortOrderStr;
		List<CustomeWidget> widgets = memberService
				.findByHql(page, hql, params);
		if (widgets.size() > 0) {
			Map<String, Object> maps = new HashMap<String, Object>();
			maps.put("pid", EnvManager.getUser().getPid());
			maps.put("spid", EnvManager.getUser().getPid()
					.replaceAll("mm_", "").replaceAll("_0_0", ""));
			maps.put("siteurl", "");
			for (CustomeWidget widget : widgets) {
				widget.setContent(WidgetUtil.convertContent(widget, fcg, maps));
			}
		}
		result.put("myFavorited", memberService.getMyFavoriteIds(EnvManager
				.getUser().getUser_id()));
		result.put("myCount", memberService
				.countCustomeWidgetByUserId(EnvManager.getUser().getUser_id()));
		result.put("favCount", memberService
				.countFavoriteWidgetByUserId(EnvManager.getUser().getUser_id()));
		result.put("sysCount", memberService.countWidget());
		result.put("widgets", widgets);
		result.put("page", page);
		result.put("layoutfilter", layoutfilter);
		result.put("typefilter", typefilter);
		result.put("cidfilter", cidfilter);

		result.put("cats", EnvManager.getRootCats());
		return new ModelAndView("site/member/widget/widgetMarket", result);
	}

	/**
	 * 组件模板
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/widget/sys", method = RequestMethod.GET)
	public ModelAndView widgetSys(HttpServletRequest request,
			HttpServletResponse response) {
		String pageNoStr = request.getParameter("pageNo");
		String pageSizeStr = request.getParameter("pageSize");
		String layoutfilter = request.getParameter("layout");
		String typefilter = request.getParameter("type");
		Integer pageNo = 1, pageSize = 5;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		if (StringUtils.isNotEmpty(pageSizeStr)) {
			try {
				pageSize = Integer.parseInt(pageSizeStr);
			} catch (Exception e) {
				pageSize = 5;
			}
		}
		Page<Widget> page = new Page<Widget>(pageNo, pageSize);
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> params = new HashMap<String, Object>();
		String hql = "from Widget where 1=1 ";
		if (StringUtils.isNotEmpty(layoutfilter) && !layoutfilter.equals("-1")) {
			try {
				params.put("layout", Integer.parseInt(layoutfilter));
				hql += " and layout=:layout";
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			layoutfilter = "-1";
		}
		if (StringUtils.isNotEmpty(typefilter) && !typefilter.equals("-1")) {
			try {
				params.put("type", typefilter);
				hql += " and type.name=:type";
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			typefilter = "-1";
		}
		hql += " order by created desc";
		List<Widget> widgets = memberService.findByHql(page, hql, params);
		if (widgets.size() > 0) {
			for (Widget widget : widgets) {
				try {
					Map<String, Object> maps = new HashMap<String, Object>();
					maps.put("dateline", dateline);
					DesignerRest.storeEditorMap(maps, widget);
					Template template = fcg.getConfiguration().getTemplate(
							"site/admin/widgets/" + widget.getName() + ".ftl");
					widget.setContent(FreeMarkerTemplateUtils
							.processTemplateIntoString(template, maps));
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		result.put("favCount", memberService
				.countFavoriteWidgetByUserId(EnvManager.getUser().getUser_id()));
		result.put("allCount", memberService.countCustomeWidget());
		result.put("myCount", memberService
				.countCustomeWidgetByUserId(EnvManager.getUser().getUser_id()));
		result.put("widgets", widgets);
		result.put("page", page);
		result.put("layoutfilter", layoutfilter);
		result.put("typefilter", typefilter);
		return new ModelAndView("site/member/widget/sysWidgets", result);
	}

	/**
	 * 获取实时收入报表
	 * 
	 * @return
	 */
	@RequestMapping(value = "/intervalreport", method = RequestMethod.GET)
	@ResponseBody
	public String getIntervalReport() {
		// TaobaokeIntervalReportGetRequest request = new
		// TaobaokeIntervalReportGetRequest();
		// Calendar start = Calendar.getInstance();
		// start.set(Calendar.HOUR_OF_DAY, 14);
		// start.set(Calendar.MINUTE, 48);
		// Calendar end = Calendar.getInstance();
		// end.set(Calendar.HOUR_OF_DAY, 14);
		// end.set(Calendar.MINUTE, 55);
		// request.setStartDate(start.getTime());
		// request.setEndDate(end.getTime());
		// TaobaokeIntervalReportGetResponse response = TaobaoFetchUtil
		// .getIntervalReport(request);
		return "";
	}

	/**
	 * 设置当前用户首页
	 * 
	 * @return
	 */
	@RequestMapping(value = "/pages/index/{tid}", method = RequestMethod.GET)
	@ResponseBody
	public String setPageIndex(@PathVariable String tid,
			HttpServletRequest request) {
		memberService.setSiteIndex(tid, fcg, deployZone, widgetCustomer);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 获取当前用户所有页面
	 * 
	 * @return
	 */
	@RequestMapping(value = "/pages", method = RequestMethod.GET)
	@ResponseBody
	public String getPages(HttpServletRequest request) {
		// List<Map<String, Object>> pages = memberService
		// .findUserTemplates(EnvManager.getUser().getUser_id());
		List<Map<String, Object>> pages = new ArrayList<Map<String, Object>>();
		if (pages.size() > 0) {
			for (Map<String, Object> map : pages) {
				Date created = (Date) map.get("created");
				map.put("created", created.getTime());
			}
			return new Gson().toJson(pages,
					new TypeToken<List<Map<String, Object>>>() {
					}.getType()).toString();
		}
		return "[]";
	}

	/**
	 * 上传酷站缩略图
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/coolsite/pic/{id}", method = RequestMethod.POST)
	public void uploadCoolSitePic(@PathVariable String id,
			HttpServletRequest request, HttpServletResponse response) {
		if (StringUtils.isEmpty(EnvManager.getRealPath()))
			EnvManager.setRealPath(request.getSession().getServletContext()
					.getRealPath("/"));
		if (EnvManager.getUser().getSites().get(0).getStatus() == 0) {// 未发布站点
			SystemException.handleMessageException("您尚未设计和发布站点。暂时不能提交酷站缩略图！");
		}
		try {
			// 转型为MultipartHttpRequest：
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			// 获得文件：
			Map<String, MultipartFile> files = multipartRequest.getFileMap();
			if (files.size() > 0) {
				for (String fileName : files.keySet()) {
					String name = fileName + ".png";
					// 获得输入流：
					InputStream input = files.get(fileName).getInputStream();
					if (input != null) {
						byte[] bytes = IOUtils.toByteArray(input);
						if (bytes.length == 0) {
							continue;
						}
						File snaprFile = new File(EnvManager.getUserPath("shop"
								+ EnvManager.getUser().getUser_id())
								+ name);
						File parent = new File(snaprFile.getParent());
						if (!parent.exists()) {
							parent.mkdirs();
						}
						FileUtils.writeByteArrayToFile(snaprFile, bytes);
					}
				}
				memberService.updateCoolSite(id);
				response.sendRedirect("http://" + WindSiteRestUtil.DOMAIN
						+ "/router/member/sitemanager/coolsite");
			}
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}

	}

	/**
	 * 访问兑换中心
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/credits", method = RequestMethod.GET)
	public ModelAndView getCredits(HttpServletRequest request) {
		Integer uid = EnvManager.getUser().getUc_id();
		if (null == uid || 0 == uid) {
			SystemException
					.handleMessageException("您尚未开通新淘家园和新淘论坛,点击新淘首页中的新淘家园后，将直接开通");
		}
		UCSpace space = ucService.get(UCSpace.class, uid);
		if (space == null) {
			SystemException.handleMessageException("系统错误，请联系管理员！");
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("space", space);
		DiscuzMembers member = discuzService.get(DiscuzMembers.class, uid);
		result.put("member", member);
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userId", EnvManager.getUser().getUser_id());
		List<CreditsLog> creditsHistory = (List<CreditsLog>) memberService
				.findByHql(
						"from CreditsLog where createdBy=:userId order by created desc",
						params);
		result.put("creditsHistory", creditsHistory);
		return new ModelAndView("site/member/credits", result);
	}

	/**
	 * 兑换积分
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/credits/group", method = RequestMethod.POST)
	@ResponseBody
	public String updateCredits(HttpServletRequest request) {
		String c_numStr = request.getParameter("c_num");
		String c_creditsStr = request.getParameter("c_credits");
		String c_type = request.getParameter("c_type");
		if (StringUtils.isEmpty(c_numStr)) {
			SystemException.handleMessageException("兑换数量不能为空");
		}
		if (StringUtils.isEmpty(c_creditsStr)) {
			SystemException.handleMessageException("消耗积分不能为空");
		}
		Integer c_num = Integer.parseInt(c_numStr);
		Integer c_credits = Integer.parseInt(c_creditsStr);
		Integer uid = EnvManager.getUser().getUc_id();
		if (null == uid || 0 == uid) {
			SystemException
					.handleMessageException("您尚未开通新淘家园和新淘论坛,点击新淘首页中的新淘家园后，将直接开通");
		}
		DiscuzMembers member = null;
		UCSpace space = null;
		if ("0".equals(c_type)) {// 论坛
			member = discuzService.get(DiscuzMembers.class, uid);
			if (member == null) {
				SystemException.handleMessageException("系统错误，请联系管理员！");
			}
			Integer c = member.getCredit() - c_credits;
			if (c < 0) {
				SystemException.handleMessageException("您的论坛积分不够了");
			}
			member.setCredit(c);
		} else {// 家园
			space = ucService.get(UCSpace.class, uid);
			if (space == null) {
				SystemException.handleMessageException("系统错误，请联系管理员！");
			}
			Integer c = space.getCredit() - c_credits;
			if (c < 0) {
				SystemException.handleMessageException("您的家园积分不够了");
			}
			space.setCredit(space.getCredit() - c_credits);
		}
		CreditsLog log = new CreditsLog();
		log.setType("credits_group_" + c_type);
		log.setC_credits(c_credits);
		log.setC_num(c_num);
		log.setC_type(c_type);
		log.setIsSuccess(false);
		log.setNick(EnvManager.getUser().getNick());
		memberService.save(log);
		if (member != null) {// 更新论坛积分
			discuzService.update(member);
		} else if (space != null) {// 更新家园积分
			ucService.update(space);
		}
		Limit limit = memberService.get(Limit.class, EnvManager.getUser()
				.getLimit().getId());
		if (limit != null) {// 更新限额
			limit.setGroups(limit.getGroups() + c_num);
		}
		memberService.update(limit);
		EnvManager.getUser().setLimit(limit);
		log.setIsSuccess(true);
		memberService.update(log);// 更新日志
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 修改已使用组件的自动更新
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/usedWidget/autoUpdate/{id}")
	@ResponseBody
	public String updateUsedWidgetAutoUpdate(@PathVariable String id,
			HttpServletRequest request) {
		String autoUpdate = request.getParameter("autoUpdate");
		UsedCustomeWidget widget = memberService.get(UsedCustomeWidget.class,
				id);
		if (widget == null) {
			SystemException.handleMessageException("未找到此组件的使用记录");
		}
		widget.setAutoUpdate("false".equals(autoUpdate) ? false : true);
		memberService.update(widget);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 获取模板基本信息
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/template/get/{id}")
	public ModelAndView getTemplate(@PathVariable String id,
			HttpServletRequest request) {
		UserTemplate template = memberService.get(UserTemplate.class, id);
		List<UsedCustomeWidget> widgets = memberService.findAllByCriterion(
				UsedCustomeWidget.class, R.eq("template.id", id),
				R.eq("user_id", EnvManager.getUser().getUser_id()));
		if (template == null) {
			SystemException.handleMessageException("未找到此模板");
		}
		List<UserTemplate> templates = memberService.findAllByCriterion(
				UserTemplate.class,
				R.eq("user_id", EnvManager.getUser().getUser_id()));
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("templates", templates);
		result.put("template", template);
		result.put("usedWidgets", widgets);
		result.put("cats", EnvManager.getRootCats());
		return new ModelAndView("site/member/templateDetail", result);
	}

	/**
	 * 修改页面设计
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/template/modify/{id}", method = RequestMethod.POST)
	@ResponseBody
	public String modifyTemplate(@PathVariable String id,
			HttpServletRequest request) {
		UserTemplate template = memberService.get(UserTemplate.class, id);
		if (template == null) {
			SystemException.handleMessageException("未找到指定模板");
		}
		String name = request.getParameter("name");
		String desc = request.getParameter("desc");
		String metadata = request.getParameter("metadata");
		String cid = request.getParameter("cid");
		if (!name.equals(template.getName())) {
			UserTemplate ut = memberService.findByCriterion(UserTemplate.class,
					R.eq("name", name),
					R.eq("user_id", EnvManager.getUser().getUser_id()));
			if (ut != null) {
				SystemException.handleMessageException("您的模板标题重复，请重新修改后添加");
			}
		}
		if (!cid.equals(template.getCid())) {// 如果修改了分类，并且已有投放计划，则修改投放计划表的分类
			ADUserTemplate ad = memberService.get(ADUserTemplate.class, id);
			if (ad != null) {
				ad.setCid(cid);
				memberService.update(ad);
			}
		}
		template.setCid(cid);
		template.setName(name);
		if (StringUtils.isNotEmpty(desc))
			template.setDescription(desc);
		if (StringUtils.isNotEmpty(metadata))
			template.setMetadata(metadata);
		memberService.update(template);
		if (template.getStatus() != null && template.getStatus() == 1) {// 如果已发布
			if (!CommandExecutor.getUpdatecommands().containsKey(
					"t-" + template.getId())) {// 如果没有包含修改命令
				UpdateUserTemplateByTemplateCommand command = new UpdateUserTemplateByTemplateCommand();
				command.setFcg(fcg);
				command.setDeployZone(deployZone);
				command.setTemplate(template);
				command.setWidgetCustomer(widgetCustomer);
				CommandExecutor.getUpdatecommands().putIfAbsent(
						"t" + template.getId(), command);
			}
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 添加新的页面设计
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/template/add/view", method = RequestMethod.GET)
	public ModelAndView addTemplateView(HttpServletRequest request) {
		return new ModelAndView("site/member/addTemplate", "cats",
				EnvManager.getRootCats());
	}

	/**
	 * 添加新的页面设计
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/template/add", method = RequestMethod.POST)
	@ResponseBody
	public String addTemplate(HttpServletRequest request) {
		String name = request.getParameter("name");
		String desc = request.getParameter("desc");
		String metadata = request.getParameter("metadata");
		String parenttid = request.getParameter("parenttid");
		String siteId = request.getParameter("siteId");
		String cid = request.getParameter("cid");
		UserTemplate ut = memberService.findByCriterion(UserTemplate.class,
				R.eq("name", name),
				R.eq("user_id", EnvManager.getUser().getUser_id()));
		if (ut != null) {
			SystemException.handleMessageException("您的模板标题重复，请重新修改后添加");
		}
		ut = new UserTemplate();
		ut.setName(name);
		ut.setCid(cid);
		ut.setUser_id(EnvManager.getUser().getUser_id());
		if (StringUtils.isNotEmpty(desc))
			ut.setDescription(desc);
		if (StringUtils.isNotEmpty(metadata))
			ut.setMetadata(metadata);
		if (StringUtils.isNotEmpty(parenttid)) {
			ut.setParent(parenttid);
		}
		Site site = memberService.get(Site.class, siteId);
		ut.setSite(site);
		memberService.addTemplate(ut);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 修改用户向导
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/user/isNew/{isNew}", method = RequestMethod.GET)
	@ResponseBody
	public String sendInvite(@PathVariable String isNew,
			HttpServletRequest request) {
		EnvManager.getUser().setIsNew("true".equals(isNew) ? true : false);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 生成推广组
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/itemgroup/create", method = RequestMethod.POST)
	@ResponseBody
	public String createItemGroup(HttpServletRequest request,
			HttpServletResponse response) {
		String name = request.getParameter("name");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("name", name);
		map.put("user_id", EnvManager.getUser().getUser_id());
		ItemGroup oldGroup = memberService.findByCriterion(ItemGroup.class,
				R.eq("name", name),
				R.eq("user_id", EnvManager.getUser().getUser_id()));
		if (oldGroup != null) {
			SystemException.handleMessageException("推广组名称[" + name
					+ "]重复,请重新命名");
		}
		ItemGroup group = new ItemGroup();
		group.setName(name);
		group.setUser_id(EnvManager.getUser().getUser_id());
		memberService.save(group);
		return ItemGroupConvert.convertItemGroup2Json(group).toString();
	}

	/**
	 * 删除推广组
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/itemgroup/delete/{id}", method = RequestMethod.GET)
	@ResponseBody
	public String deleteItemGroup(@PathVariable String id,
			HttpServletRequest request) {
		if (id == null) {
			SystemException.handleMessageException("未指定推广组");
		}
		memberService.deleteItemGroup(id);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 删除所有无效商品推广组
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/itemgroup/delete/invalid/{id}", method = RequestMethod.GET)
	@ResponseBody
	public String deleteInvalidItems(@PathVariable String id,
			HttpServletRequest request) {
		if (id == null) {
			SystemException.handleMessageException("未指定推广组");
		}
		memberService.deleteInvalidItemsByItemGroup(id);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 重命名推广组
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/itemgroup/rename/{id}", method = RequestMethod.POST)
	@ResponseBody
	public String renameItemGroup(@PathVariable String id,
			HttpServletRequest request) {
		memberService.renameItemGroup(id, request.getParameter("name"));
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 移动当前推广组商品至另一个推广组
	 * 
	 * @param fromId
	 * @param toId
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/itemgroup/move/{gId}", method = RequestMethod.POST)
	@ResponseBody
	public String moveItemGroup(@PathVariable String gId,
			HttpServletRequest request) {
		if (gId == null) {
			SystemException.handleMessageException("尚未指定推广组");
		}
		ItemGroup group = memberService.get(ItemGroup.class, gId);
		if (group == null) {
			SystemException.handleMessageException("推广组[" + gId + "]不存在");
		}
		// 修改目标推广组商品集合
		String itemIds = request.getParameter("checkedData");
		if (StringUtils.isNotEmpty(itemIds)) {
			memberService.moveItemGroup(gId, itemIds);
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 查看指定推广组
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/itemgroup/{id}", method = RequestMethod.GET)
	public ModelAndView getItemGroup(@PathVariable String id,
			HttpServletRequest request) {
		ItemGroup group = memberService.get(ItemGroup.class, id);
		if (group == null) {
			SystemException.handleMessageException("当前指定推广组[" + id + "]不存在");
		}
		String sortby = request.getParameter("sortBy");
		if (StringUtils.isNotEmpty(sortby)) {
			sortby = sortby.replace("_asc", " asc").replace("_desc", " desc");
		} else {
			sortby = null;
		}
		List<ItemGroup> groups = memberService.findAllByCriterion(
				ItemGroup.class, R.eq("user_id", group.getUser_id()));
		for (ItemGroup g : groups) {
			g.setCount(memberService.countItemsByGid(g.getId()));
		}
		List<T_TaobaokeItem> items = (List<T_TaobaokeItem>) memberService
				.getItems(id, sortby);// 查询指定推广组的商品(排序)
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("group", group);
		map.put("items", items);
		map.put("groups", groups);
		map.put("sortBy",
				sortby == null ? "sortOrder_asc" : sortby.replace(" ", "_"));
		return new ModelAndView("site/member/itemgroup", map);
	}

	/**
	 * 推广组进入商品页
	 * 
	 * @param id
	 * @param name
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/itemgroup/searchitems/{id}", method = RequestMethod.GET)
	public ModelAndView searchItemsFromItemsGroup(@PathVariable String id,
			HttpServletRequest request) {
		ItemGroup group = memberService.get(ItemGroup.class, id);
		if (group == null) {
			SystemException.handleMessageException("当前指定推广组[" + id + "]不存在");
		}
		group.setCount(memberService.countItemsByGid(id));
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("group", group);
		return new ModelAndView("site/member/itemgroupitems", map);
	}

	/**
	 * 新增淘宝客商品以及关联推广组
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/itemgroup/additems/{id}", method = RequestMethod.POST)
	@ResponseBody
	public String addItems2ItemsGroup(@PathVariable String id,
			HttpServletRequest request) {
		String json = request.getParameter("items");
		if (StringUtils.isNotEmpty(json)) {
			// logger.info("JSON:\n" + json);
			ItemGroup group = memberService.get(ItemGroup.class, id);
			if (group == null) {
				SystemException.handleMessageException("推广组[" + id + "]不存在！");
			}
			Set<T_TaobaokeItem> items = new HashSet<T_TaobaokeItem>();
			items = new Gson().fromJson(json,
					new TypeToken<Set<T_TaobaokeItem>>() {
					}.getType());
			// 此次加入商品集合
			int i = 0;
			for (T_TaobaokeItem item : items) {
				item.setSortOrder(i++);// 排序字段
				item.setGid(id);// 设置当前推广组ID
			}
			memberService.saveTaobaokeItems(items);
		} else {
			SystemException.handleMessageException("商品列表不能为空！");
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 新增单个淘宝客商品以及关联推广组
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/itemgroup/additem/{id}", method = RequestMethod.POST)
	@ResponseBody
	public String addItem2ItemsGroup(@PathVariable String id,
			HttpServletRequest request) {
		String num_iids = request.getParameter("num_iids");
		if (StringUtils.isNotEmpty(num_iids)) {
			ItemGroup group = memberService.get(ItemGroup.class, id);
			if (group == null) {
				SystemException.handleMessageException("推广组[" + id + "]不存在！");
			}
			memberService.addItem2ItemGroup(num_iids, id);
		} else {
			SystemException.handleMessageException("商品不能为空！");
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 删除指定推广组的指定商品
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/itemgroup/deleteitems/{id}", method = RequestMethod.POST)
	@ResponseBody
	public String deleteItemsFromItemsGroup(@PathVariable String id,
			HttpServletRequest request) {
		String checkedData = request.getParameter("checkedData");
		if (StringUtils.isNotEmpty(checkedData)) {
			memberService.deleteItemsFromItemGroup(checkedData);
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 保存推广组的商品顺序
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/itemgroup/sort", method = RequestMethod.GET)
	@ResponseBody
	public String updateItemsSorts(HttpServletRequest request) {
		String[] items = request.getParameterValues("item[]");
		if (items != null && items.length > 0) {
			memberService.updateItemsSorts(items);
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 新增店铺
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/shops/add", method = RequestMethod.POST)
	@ResponseBody
	public String addShop(HttpServletRequest request) {
		String nick = request.getParameter("nick");
		if (StringUtils.isNotEmpty(nick)) {
			memberService.addShop(nick);
		} else {
			SystemException.handleMessageException("卖家昵称不能为空！");
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 新增店铺收藏
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/shops/favorite/add/{id}", method = RequestMethod.POST)
	@ResponseBody
	public String addShopFav(@PathVariable Long id, HttpServletRequest request) {
		String ids = request.getParameter("ids");
		if (StringUtils.isNotEmpty(ids)) {
			ShopGroup sg = memberService.get(ShopGroup.class, id);
			if (sg == null) {
				SystemException.handleMessageException("指定的店铺分组不存在");
			}
			if (!sg.getUser_id().equals(EnvManager.getUser().getUser_id())) {
				SystemException.handleMessageException("您无权操作此店铺分组");
			}
			String[] idArray = ids.split(",");
			Integer count = memberService.countFavShops(id);
			if ((count + idArray.length) > 30) {
				System.out.println("您当前店铺分组限额不足，请减少要添加的店铺数量");
			}
			memberService.addShopFav(id, idArray);
		} else {
			SystemException.handleMessageException("店铺列表不能为空！");
		}

		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 删除店铺收藏
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/shops/favorite/delete/{id}", method = RequestMethod.POST)
	@ResponseBody
	public String deleteShopFav(@PathVariable Long id,
			HttpServletRequest request) {
		String ids = request.getParameter("ids");
		if (StringUtils.isNotEmpty(ids)) {
			memberService.deleteShopFav(id, ids);
		} else {
			SystemException.handleMessageException("店铺列表不能为空！");
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 查询我收藏的淘宝店铺
	 * 
	 * @param id
	 * @param name
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/designer/favshops", method = RequestMethod.GET)
	public ModelAndView getDesignerMyShopsFavorite(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		return new ModelAndView("designer/assets/toolbar/shops/customeshops",
				result);
	}

	/**
	 * 查询系统默认属性
	 * 
	 * @param id
	 * @param name
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/designer/widgetattribute/{sid}", method = RequestMethod.GET)
	@ResponseBody
	public String getWidgetAttribute(@PathVariable String sid,
			HttpServletRequest request) {
		WidgetAttribute attr = memberService.get(WidgetAttribute.class, sid);
		if (attr == null) {
			SystemException.handleMessageException("未发现系统默认值");
		}
		return WidgetAttributeConvert.convertWidgetAttribute2Json(attr)
				.toString();
	}

	/**
	 * 查询类目
	 * 
	 * @param id
	 * @param name
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/designer/custome/cats/{pcid}", method = RequestMethod.GET)
	@ResponseBody
	public String getCats(@PathVariable String pcid, HttpServletRequest request) {
		List<T_ItemCat> cats = new ArrayList<T_ItemCat>();
		for (T_ItemCat cat : EnvManager.getCats()) {
			if (cat.getParentCid().equals(pcid)) {
				cats.add(cat);
			}
		}
		return new Gson().toJson(cats);
	}

	/**
	 * 进入淘宝店铺选择类目
	 * 
	 * @param id
	 * @param name
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/shops/cats", method = RequestMethod.GET)
	public ModelAndView getShopsCats(HttpServletRequest request) {
		return new ModelAndView("site/member/shopCats");
	}

	/**
	 * 搜索淘宝店铺
	 * 
	 * @param id
	 * @param name
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/shops/search", method = RequestMethod.POST)
	public ModelAndView getSearchShops(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		return new ModelAndView("site/member/shopResult", result);
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
		User user = memberService.findByCriterion(User.class,
				R.eq("user_id", id));
		T_SpaceUser sUser = memberService.findByCriterion(T_SpaceUser.class,
				R.eq("uid", id));
		Map<String, Object> map = new HashMap<String, Object>();
		if (user.getSid() != null && !user.getSid().equals("0")) {
			map.put("shop",
					memberService.get(T_TaobaokeShop.class,
							Long.valueOf(user.getUser_id())));
		}

		map.put("user", user);
		map.put("sUser", sUser);
		if (user == null) {
			SystemException.handleMessageException("用户[" + id + "]不存在");
		}
		return new ModelAndView("site/member/details", map);
	}

	/**
	 * 查询我的站点
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/site", method = RequestMethod.GET)
	public ModelAndView getMySites(HttpServletRequest request) {
		List<Site> list = (List<Site>) memberService.findAllByCriterion(
				Site.class, R.eq("user_id", EnvManager.getUser().getUser_id()));
		CoolSite coolSite = memberService.findByCriterion(CoolSite.class,
				R.eq("user_id", EnvManager.getUser().getUser_id()));
		UserTemplate ut = memberService.findByCriterion(UserTemplate.class,
				R.eq("user_id", EnvManager.getUser().getUser_id()),
				R.isNull("parent"));
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("sites", list);
		result.put("coolSite", coolSite);
		if (list != null && list.size() > 0) {
			String cid = list.get(0).getCid();
			if (StringUtils.isNotEmpty(cid)) {
				T_ItemCat cat = memberService.findByCriterion(T_ItemCat.class,
						R.eq("cid", cid));
				if (cat != null) {
					result.put("cat", cat);
				}
			}
		}

		// result.put("templates", memberService.findUserTemplates(EnvManager
		// .getUser().getUser_id()));
		result.put("cats", EnvManager.getRootCats());
		if (ut != null) {
			result.put("parenttid", ut.getId());
			result.put("indexTemplate", ut);
		}
		if (EnvManager.getUser().getLimit() == null) {
			EnvManager.getUser()
					.setLimit(
							memberService.findByCriterion(Limit.class, R.eq(
									"user_id", EnvManager.getUser()
											.getUser_id())));
		}
		return new ModelAndView("site/member/site", result);
	}

	/**
	 * 查询我所有的推广组
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/myitemgroups", method = RequestMethod.GET)
	public ModelAndView getMyItemGroup(HttpServletRequest request) {
		List<ItemGroup> list = (List<ItemGroup>) memberService
				.findAllByCriterion(ItemGroup.class,
						R.eq("user_id", EnvManager.getUser().getUser_id()));
		for (ItemGroup group : list) {
			group.setCount(memberService.countItemsByGid(group.getId()));
		}
		return new ModelAndView("site/member/itemgroups", "groups", list);
	}

	/**
	 * 查询我所有的推广组（dialog）
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/itemgroupsdialog", method = RequestMethod.GET)
	public ModelAndView getMyItemGroupForDialog(HttpServletRequest request) {
		List<ItemGroup> list = (List<ItemGroup>) memberService
				.findAllByCriterion(ItemGroup.class,
						R.eq("user_id", EnvManager.getUser().getUser_id()));
		for (ItemGroup group : list) {
			group.setCount(memberService.countItemsByGid(group.getId()));
		}
		String length = request.getParameter("length");
		if (StringUtils.isEmpty(length)) {
			length = "1";
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("groups", list);
		result.put("length", Integer.parseInt(length));
		return new ModelAndView("site/member/itemgroupsdialog", result);
	}

	/**
	 * 更新站点
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/site/update/{id}", method = RequestMethod.POST)
	@ResponseBody
	public String updateSite(@PathVariable String id, HttpServletRequest request) {
		String title = request.getParameter("title");
		String desc = request.getParameter("description");
		String metadata = request.getParameter("metadata");
		String cid = request.getParameter("cid");
		String pSiteId = request.getParameter("pSiteId");
		String pAdId = request.getParameter("pAdId");
		String appKey = request.getParameter("appKey");
		String appSecret = request.getParameter("appSecret");
		String pid = request.getParameter("pid");

		ShopcatsListGetRequest getRequest = new ShopcatsListGetRequest();
		getRequest.setFields("cid");
		if (StringUtils.isNotEmpty(appKey) && StringUtils.isNotEmpty(appSecret)) {

			try {
				TaobaoFetchUtil.shopCatsGet(appKey, appSecret, getRequest);
			} catch (Exception e) {
				SystemException.handleMessageException("非法的AppKey,AppSecret");
			}
		}

		Site site = memberService.get(Site.class, id);
		if (site == null) {
			SystemException.handleMessageException("指定的站点不存在！");
		}
		if (!site.getTitle().equals(title)) {
			Site oldSite = memberService.findByCriterion(Site.class,
					R.eq("title", title));
			if (oldSite != null) {
				SystemException.handleMessageException("站点名称重复[" + title
						+ "]重复,请重新命名");
			}
			site.setTitle(title);
		}

		if (StringUtils.isNotEmpty(desc)) {
			site.setDescription(desc);
		}
		if (StringUtils.isNotEmpty(metadata)) {
			site.setMetadata(metadata);
		}
		if (!cid.equals(site.getCid())) {
			ADBlogStatus blog = memberService.get(ADBlogStatus.class,
					site.getId());
			if (blog != null) {
				blog.setCid(cid);
				memberService.update(blog);
			}
		}
		site.setCid(cid);
		memberService.update(site);

		if (site.getStatus() != null && 1 == site.getStatus()) {// 如果状态已发布
			if (!CommandExecutor.getUpdatecommands().containsKey(// 如果没有包含修改命令
					"u-" + EnvManager.getUser().getUser_id())) {
				UpdateUserTemplateByUserIdCommand command = new UpdateUserTemplateByUserIdCommand();
				command.setDeployZone(deployZone);
				command.setFcg(fcg);
				command.setType("站点基本信息");
				command.setUser(EnvManager.getUser());
				command.setPageService(pageService);
				command.setModuleMethod(moduleMethod);
				command.setWidgetCustomer(widgetCustomer);
				CommandExecutor.getUpdatecommands().putIfAbsent(
						"u-" + EnvManager.getUser().getUser_id(), command);
			}
		}
		String userId = EnvManager.getUser().getUser_id();
		if (!CommandExecutor.getCachecommands().containsKey(
				"usershop-" + userId)) {// 如果不在队列中
			UserShopDetailCommand command = new UserShopDetailCommand();
			command.setFcg(fcg);
			command.setPageService(pageService);
			command.setUserId(userId);
			CommandExecutor.getCachecommands().put("usershop-" + userId,
					command);
		}
		if (!CommandExecutor.getCachecommands().containsKey("user-" + userId)) {// 如果不在队列中
			UserItemDetailCommand command = new UserItemDetailCommand();
			command.setFcg(fcg);
			command.setPageService(pageService);
			command.setUserId(userId);
			CommandExecutor.getCachecommands().put("user-" + userId, command);
		}
		List<Site> sites = new ArrayList<Site>();
		sites.add(site);
		EnvManager.getUser().setSites(sites);
		User user = memberService.get(User.class, EnvManager.getUser().getId());
		if (user != null) {
			if (StringUtils.isNotEmpty(appKey)
					&& StringUtils.isNotEmpty(appSecret)) {
				user.setAppKey(appKey);
				user.setAppSecret(appSecret);
			}
			if (StringUtils.isNotEmpty(pid)) {
				user.setPid(pid);
			} else {
				user.setPid(user.getnPid());
			}
			if (StringUtils.isNotEmpty(pSiteId)
					&& StringUtils.isNotEmpty(pAdId)) {// 更新网站ID,广告位ID
				try {
					Long _pSiteId = Long.parseLong(pSiteId);
					Long _pAdId = Long.parseLong(pAdId);
					user.setpSiteId(_pSiteId);
					user.setpAdId(_pAdId);
				} catch (Exception e) {
					e.printStackTrace();
				}

			}
			memberService.update(user);
			user.setSites(sites);
			EnvManager.setUser(user);
		}
		// 更新缓存中的站点信息
		SiteImpl siteImpl = EnvManager.getSites().get(site.getUser_id());
		if (siteImpl != null) {
			siteImpl = siteService.getSiteImplByUserId(site.getUser_id());
			if (siteImpl != null) {
				EnvManager.getSites().put(siteImpl.getUser_id(), siteImpl);
			}
		}
		return WindSiteRestUtil.SUCCESS;
	}

	@Autowired
	private ModuleMethod moduleMethod;
	@Autowired
	private IPageService pageService;

	/**
	 * 同步PID信息
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/pid/syn", method = RequestMethod.GET)
	@ResponseBody
	public String synPID(HttpServletRequest request) {
		memberService.synPID(EnvManager.getUser().getId());
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 同步淘宝信息
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/tuser/syn", method = RequestMethod.GET)
	@ResponseBody
	public String synTUser(HttpServletRequest request) {
		User user = memberService.synUser(EnvManager.getUser().getUser_id(),
				EnvManager.getUser().getNick());
		if (user == null) {
			SystemException.handleMessageException("同步失败");
		}

		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 查询要检测的推广组及商品列表
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/doctor", method = RequestMethod.GET)
	public ModelAndView doctor(HttpServletRequest request) {
		Boolean itemsProcessing = memberService
				.isProcessingItemGroupDoctor(EnvManager.getUser().getUser_id());
		return new ModelAndView("site/member/doctor/doctor", "itemsProcessing",
				itemsProcessing);
	}

	/**
	 * 查询要检测的推广组及商品列表(后台异步实现)
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/doctor/items", method = RequestMethod.GET)
	public ModelAndView getDoctorItemGroups(HttpServletRequest request) {
		List<ItemGroupDoctor> doctors = null;// 检测结果
		Boolean isNew = false;// 是否是新建检测
		String isNewStr = request.getParameter("isNew");
		if (memberService.isProcessingItemGroupDoctor(EnvManager.getUser()
				.getUser_id()) || "false".equals(isNewStr)) {// 如果正在检测中,则直接返回检测结果列表
			doctors = memberService.getItemGroupDoctors(EnvManager.getUser()
					.getUser_id());
			isNew = false;
		} else {// 如果已经检测完成,重新开始检测
			doctors = memberService.itemGroupDoctor(EnvManager.getUser()
					.getUser_id());
			if (doctors.size() > 0) {
				// 生成商品检测命令
				for (ItemGroupDoctor doctor : doctors) {
					ItemGroupDoctorCommand command = new ItemGroupDoctorCommand();
					command.setNick(EnvManager.getUser().getNick());
					command.setDoctor(doctor);
					CommandExecutor.getCommands().add(command);// 加入执行队列
				}
			}
			isNew = true;
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("doctors", doctors);
		map.put("isNew", isNew);
		return new ModelAndView("site/member/doctor/itemsdoctor", map);
	}
}
