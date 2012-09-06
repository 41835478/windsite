package com.wind.site.rest;

import java.io.IOException;
import java.io.StringReader;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
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
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;
import org.springframework.web.util.HtmlUtils;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import com.taobao.api.domain.TaobaokeItem;
import com.taobao.api.domain.TaobaokeItemDetail;
import com.taobao.api.request.TaobaokeItemsDetailGetRequest;
import com.taobao.api.request.TaobaokeItemsGetRequest;
import com.taobao.api.response.TaobaokeItemsDetailGetResponse;
import com.taobao.api.response.TaobaokeItemsGetResponse;
import com.wind.core.exception.SystemException;
import com.wind.site.command.CommandExecutor;
import com.wind.site.command.impl.UpdateUserTemplateByTemplateCommand;
import com.wind.site.command.impl.UserItemDetailCommand;
import com.wind.site.delay.WindSiteDelay;
import com.wind.site.env.EnvManager;
import com.wind.site.freemarker.method.ModuleMethod;
import com.wind.site.model.DianPuCategory;
import com.wind.site.model.ItemGroup;
import com.wind.site.model.Layout;
import com.wind.site.model.Limit;
import com.wind.site.model.Page;
import com.wind.site.model.PageDetailLayout;
import com.wind.site.model.PageLayout;
import com.wind.site.model.PageMeta;
import com.wind.site.model.PageModel;
import com.wind.site.model.PageModule;
import com.wind.site.model.PageRegion;
import com.wind.site.model.PageSearchLayout;
import com.wind.site.model.PageTemplate;
import com.wind.site.model.PageTheme;
import com.wind.site.model.ShopGroup;
import com.wind.site.model.Site;
import com.wind.site.model.SiteCommission;
import com.wind.site.model.SiteImpl;
import com.wind.site.model.SiteTheme;
import com.wind.site.model.T_ItemCat;
import com.wind.site.model.T_MallBrand;
import com.wind.site.model.T_PosterChannel;
import com.wind.site.model.T_UserSubscribe;
import com.wind.site.model.User;
import com.wind.site.model.UserPage;
import com.wind.site.model.UserPageDetail;
import com.wind.site.model.UserPageSearch;
import com.wind.site.service.IPageService;
import com.wind.site.service.ISiteService;
import com.wind.site.util.PageUtils;
import com.wind.site.util.TaobaoFetchUtil;
import com.wind.site.util.WindSiteRestUtil;
import com.wind.uc.model.UCClass;
import com.wind.uc.service.IUCService;

import freemarker.template.Template;

/**
 * 页面设计器
 * 
 * @author fxy
 * 
 */
@Controller
@RequestMapping("/member/page")
public class PageDesignerRest {
	@Autowired
	private ISiteService siteService;
	@Autowired
	private IPageService pageService;
	@Autowired
	private IUCService ucService;
	@Autowired
	private FreeMarkerConfigurer fcg;
	@Autowired
	private ModuleMethod moduleMethod;

	/**
	 * 修复页面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/fixed/{id}")
	@ResponseBody
	public String pageFixed(@PathVariable String id,
			HttpServletRequest request, HttpServletResponse response) {
		Page page = pageService.get(Page.class, id);
		if (page == null) {
			SystemException.handleMessageException("要修复的页面不存在");
		}
		String siteId = null, userId = null;
		if (page instanceof UserPage) {// 自定义页面
			siteId = ((UserPage) page).getSite_id();
			userId = ((UserPage) page).getUser_id();
		} else if (page instanceof UserPageDetail) {// 详情页
			siteId = ((UserPageDetail) page).getSite_id();
			userId = ((UserPageDetail) page).getUser_id();
		} else if (page instanceof UserPageSearch) {// 搜索页
			siteId = ((UserPageSearch) page).getSite_id();
			userId = ((UserPageSearch) page).getUser_id();
		}
		if (StringUtils.isNotEmpty(siteId) && StringUtils.isNotEmpty(userId)) {
			if (!userId.equals(EnvManager.getUser().getUser_id())
					&& !"admin".equals(EnvManager.getUser().getRole())) {
				SystemException.handleMessageException("您无权修复此页面");
			}
			pageService.fixedPageHeader(siteId);// 修复页头
			pageService.fixedPage(siteId, page);// 修复内容区
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 选择模板页面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/templates")
	public ModelAndView pageTemplates(HttpServletRequest request,
			HttpServletResponse response) {
		String pageId = request.getParameter("page");
		String isIndex = request.getParameter("isIndex");
		Map<String, Object> result = new HashMap<String, Object>();
		List<UserPage> indexPages = pageService
				.findAllByCriterion(
						UserPage.class,
						R.eq("isIndex", true),
						R.eq("site_id", EnvManager.getUser().getSites().get(0)
								.getId()));
		if ("true".equals(isIndex)) {// 如果是创建首页
			if (indexPages != null && indexPages.size() > 0) {
				SystemException.handleMessageException("您已经创建了站点首页");
			}
		} else {// 如果不是首页的话，判断是否已创建首页，没有的话，定向至步骤页面
			if (indexPages == null || indexPages.size() == 0) {
				result.put("site", EnvManager.getUser().getSites().get(0));
				result.put("cats", EnvManager.getRootCats());
				return new ModelAndView("site/step/step1", result);
			}
		}
		if (StringUtils.isNotEmpty(pageId)) {
			UserPage page = pageService.get(UserPage.class, pageId);
			if (page == null) {
				SystemException.handleMessageException("指定的页面不存在");
			}
			result.put("page", page);
		} else {
			Limit limit = EnvManager.getUser().getLimit();
			Integer count = pageService.countPages(EnvManager.getUser()
					.getSites().get(0).getId());
			if (count >= limit.getPages()) {
				SystemException.handleMessageException("您的页面限额已使用完毕，无法添加新页面");
			}
		}
		List<UserPage> pages = pageService.findAllByCriterion(
				new com.wind.core.dao.Page<UserPage>(1, 10), UserPage.class,
				R.eq("user_id", EnvManager.getUser().getUser_id()));

		result.put("templates", pageService.findAllByCriterionAndOrder(
				PageTemplate.class, Order.asc("sortOrder")));
		result.put("cats", EnvManager.getRootCats());
		result.put("pages", pages);
		result.put("mode", "user");
		result.put("isIndex", isIndex);
		return new ModelAndView("site/designer/pageTemplates", result);
	}

	/**
	 * 保存页面系统模板
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/template/{id}")
	@ResponseBody
	public String template(@PathVariable String id, HttpServletRequest request,
			HttpServletResponse response) {
		if (!"admin".equals(EnvManager.getUser().getRole())) {
			SystemException.handleMessageException("您无权生成模板");
		}
		UserPage page = pageService.get(UserPage.class, id);
		PageTemplate template = pageService.get(PageTemplate.class, id);
		if (page == null) {
			SystemException.handleMessageException("当前指定页面不存在");
		}
		if (template == null) {
			template = new PageTemplate();
			template.setId(id);
			template.setTitle(page.getTitle());
			template.setDescription(page.getDescription());
			template.setVersionNo(String.valueOf(EnvManager.getUser().getUsb()
					.getVersionNo()));
			Site site = EnvManager.getUser().getSites().get(0);
			String url = "http://" + site.getDomainName() + ".xintaonet.com";
			if (StringUtils.isNotEmpty(site.getWww())) {
				url = "http://" + site.getWww();
			}
			if (page.getIsIndex()) {
				template.setUrl(url);
			} else {
				template.setUrl(url + "/pages/" + page.getPageid() + ".html");
			}
			pageService.save(template);
		} else {
			template.setTitle(page.getTitle());
			template.setDescription(page.getDescription());
			Site site = EnvManager.getUser().getSites().get(0);
			String url = "http://" + site.getDomainName() + ".xintaonet.com";
			if (StringUtils.isNotEmpty(site.getWww())) {
				url = "http://" + site.getWww();
			}
			if (page.getIsIndex()) {
				template.setUrl(url);
			} else {
				template.setUrl(url + "/pages/" + page.getPageid() + ".html");
			}
			pageService.update(template);
		}
		PageMeta meta = pageService.get(PageMeta.class, id);
		PageModel model = PageUtils.convertPageModel(meta.getMetadata());
		EnvManager.getTemplates().put(id, model.getBd());
		List<PageModule> modules = pageService.findAllByCriterion(
				PageModule.class, R.eq("page", id));
		if (modules != null && modules.size() > 0) {
			for (PageModule module : modules) {
				EnvManager.getModules().put(module.getId(), module);
			}
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 预览模板
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/preview/template/{id}")
	public void previewTemplate(@PathVariable String id,
			HttpServletRequest request, HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		PageTemplate t = pageService.get(PageTemplate.class, id);
		if (t == null) {
			SystemException.handleMessageException("指定的页面模板不存在");
		}
		UserPage page = pageService.get(UserPage.class, id);
		if (page == null) {
			SystemException.handleMessageException("指定的页面不存在");
		}
		Template template = PageUtils.getUserTemplate(page, EnvManager
				.getUser().getUser_id(), t.getTheme(), t.getSkin(),
				pageService, fcg, true);
		if (template == null) {
			SystemException.handleMessageException("模板生成错误");
		}
		try {
			Writer out = response.getWriter();
			Map<String, Object> maps = new HashMap<String, Object>();
			maps.put("module", moduleMethod);
			template.process(maps, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 发布指定页面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/deploy/{id}")
	@ResponseBody
	public String deploy(@PathVariable String id, HttpServletRequest request,
			HttpServletResponse response) {
		if (StringUtils.isEmpty(EnvManager.getRealPath()))// 基本无用
			EnvManager.setRealPath(request.getSession().getServletContext()
					.getRealPath("/"));
		pageService.deployPage(fcg, EnvManager.getUser().getUser_id(), id,
				moduleMethod, false);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 发布详情页
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/deployDetail")
	@ResponseBody
	public String deployDetail(HttpServletRequest request,
			HttpServletResponse response) {
		if (StringUtils.isEmpty(EnvManager.getRealPath()))// 基本无用
			EnvManager.setRealPath(request.getSession().getServletContext()
					.getRealPath("/"));
		pageService.deployDetail(fcg, EnvManager.getUser(), moduleMethod);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 发布搜索页
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/deploySearch")
	@ResponseBody
	public String deploySearch(HttpServletRequest request,
			HttpServletResponse response) {
		if (StringUtils.isEmpty(EnvManager.getRealPath()))// 基本无用
			EnvManager.setRealPath(request.getSession().getServletContext()
					.getRealPath("/"));
		pageService.deploySearch(fcg, EnvManager.getUser(), moduleMethod);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 预览
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/preview/{id}")
	public void preview(@PathVariable String id, HttpServletRequest request,
			HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		String theme = request.getParameter("theme");
		String skin = request.getParameter("skin");
		UserPage page = pageService.get(UserPage.class, id);
		if (page == null) {
			SystemException.handleMessageException("指定的页面不存在");
		}
		if (!EnvManager.getUser().getRole().equals("admin")
				&& !((UserPage) page).getUser_id().equals(
						EnvManager.getUser().getUser_id())) {// 非系统管理员不允许预览其他人页面
			SystemException.handleMessageException("您无权预览此页面");
		}
		Template template = PageUtils.getUserTemplate(page, null, theme, skin,
				pageService, fcg, true);
		if (template == null) {
			SystemException.handleMessageException("模板生成错误");
		}
		try {
			Writer out = response.getWriter();
			Map<String, Object> maps = new HashMap<String, Object>();
			maps.put("module", moduleMethod);
			template.process(maps, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 根据模板重新生成页面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/update/template/{id}")
	@ResponseBody
	public String pageAdd(@PathVariable String id, HttpServletRequest request,
			HttpServletResponse response) {
		String template = request.getParameter("page_template");
		if (StringUtils.isEmpty(template)) {
			SystemException.handleMessageException("未指定页面模板");
		}
		UserPage page = pageService.get(UserPage.class, id);
		if (page == null) {
			SystemException.handleMessageException("指定的页面不存在");
		}
		if (!page.getUser_id().equals(EnvManager.getUser().getUser_id())
				&& !"admin".equals(EnvManager.getUser().getRole())) {
			SystemException.handleMessageException("您无权操作此页面");
		}
		PageTemplate t = pageService.get(PageTemplate.class, template);
		if (t == null) {
			SystemException.handleMessageException("指定的页面模板不存在");
		}
		if (EnvManager.getUser().getUsb() != null) {
			Float f = Float.valueOf(t.getVersionNo());
			Float vn = EnvManager.getUser().getUsb().getVersionNo();
			if (vn == 1.5f) {
				String www = EnvManager.getUser().getSites().get(0).getWww();
				if (StringUtils.isNotEmpty(www)) {
					vn = 1.55f;
				}
			}
			if (f > vn) {
				SystemException.handleMessageException("您需要升级版本才可以使用该页面模板");
			}
		}
		page.setCss(t.getTheme());
		page.setSkin(t.getSkin());
		// 删除页面旧的布局，区域，模块并根据新的模板重新生成新的布局，区域，模块
		pageService.reCopyUserPage(page, page.getUser_id(), page.getNick(),
				EnvManager.getUser().getPid(), page.getSite_id(), template);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 新增页面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/add")
	@ResponseBody
	public String pageAdd(HttpServletRequest request,
			HttpServletResponse response) {
		String desc = request.getParameter("page_desc");
		String keywords = request.getParameter("page_keywords");
		String title = request.getParameter("page_title");
		String cid = request.getParameter("page_cid");
		String layout = request.getParameter("page_layout");
		String template = request.getParameter("page_template");
		String isIndex = request.getParameter("isIndex");
		if (StringUtils.isEmpty(title)) {
			SystemException.handleMessageException("页面标题不能为空");
		}
		if (StringUtils.isEmpty(layout) && StringUtils.isEmpty(template)) {
			SystemException.handleMessageException("未指定页面模板或者布局");
		}
		List<UserPage> indexPages = pageService
				.findAllByCriterion(
						UserPage.class,
						R.eq("isIndex", true),
						R.eq("site_id", EnvManager.getUser().getSites().get(0)
								.getId()));
		if ("true".equals(isIndex)) {// 如果创建的是首页
			if (indexPages == null || indexPages.size() > 0) {
				SystemException.handleMessageException("您已经创建站点首页");
			}
		} else {// 如果创建的是二级页面
			if (indexPages == null || indexPages.size() == 0) {
				SystemException.handleMessageException("您尚未创建站点首页");
			}
		}
		UserPage page = new UserPage();
		page.setIsIndex("true".equals(isIndex) ? true : false);
		page.setCid(cid);
		page.setNick(EnvManager.getUser().getNick());
		page.setSite_id(EnvManager.getUser().getSites().get(0).getId());
		page.setUser_id(EnvManager.getUser().getUser_id());
		page.setTitle(title);
		if (StringUtils.isNotEmpty(desc))
			page.setDescription(desc);
		if (StringUtils.isNotEmpty(keywords))
			page.setKeywords(keywords);
		page.setStatus(false);
		if (StringUtils.isNotEmpty(template)) {// 根据模板
			PageTemplate t = pageService.get(PageTemplate.class, template);
			if (t == null) {
				SystemException.handleMessageException("指定的页面模板不存在");
			}
			if (EnvManager.getUser().getUsb() != null) {
				Float f = Float.valueOf(t.getVersionNo());
				Float vn = EnvManager.getUser().getUsb().getVersionNo();
				if (vn == 1.5f) {
					String www = EnvManager.getUser().getSites().get(0)
							.getWww();
					if (StringUtils.isNotEmpty(www)) {
						vn = 1.55f;
					}
				}
				if (f > vn) {
					SystemException.handleMessageException("您需要升级版本才可以使用该页面模板");
				}
			}
			page.setCss(t.getTheme());
			page.setSkin(t.getSkin());
			pageService.copyUserPage(page, page.getUser_id(), page.getNick(),
					EnvManager.getUser().getPid(), page.getSite_id(), template);
		} else if (StringUtils.isNotEmpty(layout)) {// 根据布局
			pageService.addPage(page, layout);
		}
		// 处理pageid
		page = pageService.get(UserPage.class, page.getId());
		page.setPageid(Math.abs(page.getCreated().getTime()) + "");
		pageService.update(page);
		JsonObject obj = new JsonObject();
		obj.addProperty("id", page.getId());
		return new Gson().toJson(obj);
	}

	/**
	 * 主题/皮肤设置
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/theme/set")
	@ResponseBody
	public String themeSet(HttpServletRequest request,
			HttpServletResponse response) {
		String theme = request.getParameter("theme");
		String skin = request.getParameter("skin");
		String pageId = request.getParameter("page");
		UserPage page = null;
		if (StringUtils.isNotEmpty(pageId)) {
			page = pageService.get(UserPage.class, pageId);
		} else {
			page = pageService.findByCriterion(
					UserPage.class,
					R.eq("site_id", EnvManager.getUser().getSites().get(0)
							.getId()), R.eq("isIndex", true));
		}
		if (page == null) {
			SystemException.handleMessageException("页面不存在");
		}
		if (StringUtils.isEmpty(theme) && StringUtils.isEmpty(skin)) {
			SystemException.handleMessageException("您尚未指定模板主题或者颜色");
		}
		PageTheme pageTheme = null;
		if (StringUtils.isNotEmpty(theme)) {
			pageTheme = pageService.get(PageTheme.class, Long.valueOf(theme));
			if (pageTheme == null) {
				SystemException.handleMessageException("您指定的模板主题不存在");
			}
		}
		if (!page.getUser_id().equals(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("您无权操作此页面");
		}
		SiteTheme st = pageService.get(SiteTheme.class, page.getSite_id());
		if (page.getIsIndex()) {// 如果是首页，则设置全站皮肤/主题
			if (st == null) {
				st = new SiteTheme();
				st.setId(((UserPage) page).getSite_id());
				st.setNick(((UserPage) page).getNick());
				st.setUser_id(((UserPage) page).getUser_id());
				if (pageTheme != null) {
					T_UserSubscribe usb = pageService.get(
							T_UserSubscribe.class,
							((UserPage) page).getUser_id());// 查询当前会员的订购
					if (usb.getVersionNo() == 1) {
						SystemException
								.handleMessageException("您使用的是新淘网淘客普及版，无法使用个性化装修模板，请升级为返利版(月租型)，返利版(分成型)或者卖家版");
					}
					st.setTheme(pageTheme.getId());
					st.setSkin(pageTheme.getSkin());
				} else {
					st.setSkin(skin);
				}
				pageService.save(st);
			} else {
				if (pageTheme != null) {
					T_UserSubscribe usb = pageService.get(
							T_UserSubscribe.class,
							((UserPage) page).getUser_id());// 查询当前会员的订购
					if (usb.getVersionNo() == 1) {
						SystemException
								.handleMessageException("您使用的是新淘网淘客普及版，无法使用个性化装修模板，请升级为返利版(月租型)，返利版(分成型)或者卖家版");
					}
					if (st.getTheme() != null
							&& st.getTheme() == pageTheme.getId()) {
						SystemException.handleMessageException("您当前已使用此模板");
					}
					st.setTheme(pageTheme.getId());
					st.setSkin(pageTheme.getSkin());
				} else {
					st.setSkin(skin);
				}
				pageService.update(st);
			}
			SiteImpl siteImpl = EnvManager.getSites().get(
					EnvManager.getUser().getUser_id());
			if (siteImpl != null) {// 设置缓存中的皮肤，主题
				siteImpl.setSite_skin(st.getSkin());
				siteImpl.setSite_theme(st.getTheme() != null ? String
						.valueOf(st.getTheme()) : null);
				EnvManager.getSites().put(EnvManager.getUser().getUser_id(),
						siteImpl);
			}
		} else {// 二级页面皮肤/主题
			if (pageTheme != null) {
				page.setCss(String.valueOf(pageTheme.getId()));
				page.setSkin(pageTheme.getSkin());
			} else {
				page.setSkin(skin);
			}
			pageService.update(page);
		}
		if (page.getStatus() != null && page.getStatus()) {// 如果状态已发布
			if (!CommandExecutor.getUpdatecommands().containsKey(
					"p-" + page.getId())) {// 如果没有包含修改命令
				UpdateUserTemplateByTemplateCommand command = new UpdateUserTemplateByTemplateCommand();
				command.setFcg(fcg);
				command.setPage(page);
				command.setModuleMethod(moduleMethod);
				command.setPageService(pageService);
				CommandExecutor.getUpdatecommands().putIfAbsent(
						"p" + page.getId(), command);
			}
		}
		String userId = EnvManager.getUser().getUser_id();
		if (!CommandExecutor.getCachecommands().containsKey("user-" + userId)) {// 如果不在队列中
			UserItemDetailCommand command = new UserItemDetailCommand();
			command.setFcg(fcg);
			command.setPageService(pageService);
			command.setUserId(userId);
			CommandExecutor.getCachecommands().put("user-" + userId, command);
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 更换首页设置
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/index/set")
	@ResponseBody
	public String indexSet(HttpServletRequest request,
			HttpServletResponse response) {
		String id = request.getParameter("page");
		UserPage oldIndex = pageService.findByCriterion(UserPage.class,
				R.eq("user_id", EnvManager.getUser().getUser_id()),
				R.eq("isIndex", true));
		if (oldIndex == null) {
			pageService.indexNewSet(id);// 当首页为空时，设置新的
		} else {// 切换
			pageService.indexSet(id);
		}
		UserPage newIndex = pageService.findByCriterion(UserPage.class,
				R.eq("user_id", EnvManager.getUser().getUser_id()),
				R.eq("isIndex", true));
		if (newIndex == null) {
			SystemException.handleMessageException("首页 设置失败");
		}
		if (newIndex.getStatus()) {// 新首页重新发布
			if (!CommandExecutor.getUpdatecommands().containsKey(
					"p-" + newIndex.getId())) {// 如果没有包含修改命令
				UpdateUserTemplateByTemplateCommand command = new UpdateUserTemplateByTemplateCommand();
				command.setFcg(fcg);
				command.setPage(newIndex);
				command.setModuleMethod(moduleMethod);
				command.setPageService(pageService);
				CommandExecutor.getUpdatecommands().putIfAbsent(
						"p" + newIndex.getId(), command);
			}
		}
		if (!newIndex.getId().equals(oldIndex.getId()) && oldIndex.getStatus()) {// 旧首页重新发布
			if (!CommandExecutor.getUpdatecommands().containsKey(
					"p-" + oldIndex.getId())) {// 如果没有包含修改命令
				UpdateUserTemplateByTemplateCommand command = new UpdateUserTemplateByTemplateCommand();
				command.setFcg(fcg);
				command.setPage(oldIndex);
				command.setModuleMethod(moduleMethod);
				command.setPageService(pageService);
				CommandExecutor.getUpdatecommands().putIfAbsent(
						"p" + oldIndex.getId(), command);
			}
		}
		String userId = EnvManager.getUser().getUser_id();
		if (!CommandExecutor.getCachecommands().containsKey("user-" + userId)) {// 如果不在队列中
			UserItemDetailCommand command = new UserItemDetailCommand();
			command.setFcg(fcg);
			command.setPageService(pageService);
			command.setUserId(userId);
			CommandExecutor.getCachecommands().put("user-" + userId, command);
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 进入模板颜色
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/theme")
	public ModelAndView pageTheme(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String id = request.getParameter("id");
		UserPage page = null;
		if (StringUtils.isNotEmpty(id)) {
			page = pageService.get(UserPage.class, id);
		} else {
			page = pageService.findByCriterion(UserPage.class,
					R.eq("user_id", EnvManager.getUser().getUser_id()),
					R.eq("isIndex", true));
		}
		if (page == null) {
			SystemException.handleMessageException("页面不存在");
		}

		if (!page.getUser_id().equals(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("您无权操作此页面");
		}
		if (page.getIsIndex()) {
			SiteTheme theme = pageService.get(SiteTheme.class,
					page.getSite_id());
			if (theme != null && theme.getTheme() != null) {
				PageTheme pt = pageService.get(PageTheme.class,
						theme.getTheme());
				result.put("theme", pt);
			}
			result.put("siteTheme", theme);
		} else {
			if (StringUtils.isNotEmpty(page.getCss())) {
				PageTheme pt = pageService.get(PageTheme.class,
						Long.valueOf(page.getCss()));
				result.put("theme", pt);
			}
		}
		result.put("pages",
				pageService.findAllByCriterion(
						new com.wind.core.dao.Page<UserPage>(1, 10),
						UserPage.class,
						R.eq("user_id", ((UserPage) page).getUser_id()),
						R.eq("site_id", EnvManager.getUser().getSites().get(0)
								.getId())));
		result.put("mode", "user");
		result.put("page", page);
		return new ModelAndView("site/designer/pageSkin", result);
	}

	/**
	 * 进入模板装修
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/theme/manager")
	public ModelAndView pageThemeManager(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String id = request.getParameter("id");
		UserPage page = null;
		if (StringUtils.isNotEmpty(id)) {
			page = pageService.get(UserPage.class, id);
		} else {
			page = pageService.findByCriterion(UserPage.class,
					R.eq("user_id", EnvManager.getUser().getUser_id()),
					R.eq("isIndex", true));
		}
		if (page == null) {
			SystemException.handleMessageException("页面不存在");
		}
		if (!page.getUser_id().equals(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("您无权操作此页面");
		}
		if (page.getIsIndex()) {
			SiteTheme theme = pageService.get(SiteTheme.class,
					page.getSite_id());
			if (theme != null && theme.getTheme() != null) {
				PageTheme pt = pageService.get(PageTheme.class,
						theme.getTheme());
				result.put("theme", pt);
			}
		} else {
			if (StringUtils.isNotEmpty(page.getCss())) {
				PageTheme pt = pageService.get(PageTheme.class,
						Long.valueOf(page.getCss()));
				result.put("theme", pt);
			}
		}
		result.put("pages",
				pageService.findAllByCriterion(
						new com.wind.core.dao.Page<UserPage>(1, 10),
						UserPage.class,
						R.eq("user_id", ((UserPage) page).getUser_id()),
						R.eq("site_id", EnvManager.getUser().getSites().get(0)
								.getId())));
		result.put("mode", "user");
		String pageNoStr = request.getParameter("pageNo");
		Integer pageNo = 1;
		try {
			pageNo = Integer.parseInt(pageNoStr);
		} catch (Exception e) {
			pageNo = 1;
		}
		Map<String, Object> params = new HashMap<String, Object>();
		String version = request.getParameter("version");
		String industry = request.getParameter("industry");
		String color = request.getParameter("color");
		String skin = request.getParameter("skin");
		String hql = "select t from PageTheme t ";
		String where = " where t.isValid=:isValid and t.skin is not null ";
		params.put("isValid", true);
		if (StringUtils.isNotEmpty(industry)) {
			params.put("industry", Long.valueOf(industry));
			hql += ",PageThemeIndustry i ";
			where += " and i.industry=:industry and t.id= i.theme ";
		}
		if (StringUtils.isNotEmpty(color)) {
			params.put("color", Long.valueOf(color));
			hql += ",PageThemeColor c ";
			where += " and c.color=:color and t.id= c.theme ";
		}
		if (StringUtils.isNotEmpty(skin)) {
			params.put("skin", Long.valueOf(skin));
			hql += ",PageThemeSkin s ";
			where += " and s.skin=:skin and t.id= s.theme ";
		}
		if (StringUtils.isNotEmpty(version)) {
			params.put("version", version);
			where += " and t.version=:version ";
		}
		where += " order by t.id desc";
		com.wind.core.dao.Page<PageTheme> pager = new com.wind.core.dao.Page<PageTheme>(
				pageNo, 8);
		result.put("themes", pageService.findByHql(pager, hql + where, params));
		result.put("pager", pager);
		result.put("version", version);
		result.put("skin", skin);
		result.put("color", color);
		result.put("industry", industry);
		result.put("page", page);
		return new ModelAndView("site/designer/pageTheme", result);
	}

	/**
	 * 进入页面管理
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/manager")
	public ModelAndView pageManager(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		Site site = EnvManager.getUser().getSites().get(0);
		List<UserPage> indexPages = pageService.findAllByCriterion(
				UserPage.class, R.eq("isIndex", true),
				R.eq("site_id", site.getId()));
		if (indexPages == null || indexPages.size() == 0) {// 如果不存在首页，则定向至想到页面
			if (pageService.countPages(site.getId()) == 0) {
				result.put("site", site);
				result.put("cats", EnvManager.getRootCats());
				return new ModelAndView("site/step/step1", result);
			}
		} else if (indexPages.size() > 1) {
			for (int i = 1; i < indexPages.size(); i++) {
				UserPage oldPage = indexPages.get(i);
				oldPage.setIsIndex(false);
				pageService.update(oldPage);
			}
		}

		String pageNoStr = request.getParameter("pageNo");
		Integer pageNo = 1;
		if (StringUtils.isNotEmpty(pageNoStr)) {
			try {
				pageNo = Integer.parseInt(pageNoStr);
			} catch (Exception e) {
				pageNo = 1;
			}
		}
		com.wind.core.dao.Page<UserPage> daoPage = new com.wind.core.dao.Page<UserPage>(
				pageNo, 15);
		List<UserPage> pages = pageService
				.findAllByCriterion(
						daoPage,
						UserPage.class,
						R.eq("user_id", EnvManager.getUser().getUser_id()),
						R.eq("site_id", EnvManager.getUser().getSites().get(0)
								.getId()));
		Map<String, Date> cache = WindSiteDelay.getCacheObjMap();
		if (pages != null && pages.size() > 0 && cache != null
				&& cache.size() > 0) {
			for (UserPage p : pages) {
				if (p.getStatus()) {
					Date nextDeploy = cache.get(p.getId());
					if (nextDeploy == null) {
						Float v = 1.0f;
						T_UserSubscribe usb = EnvManager.getUser().getUsb();
						if (usb != null) {
							v = usb.getVersionNo();
						}
						WindSiteDelay.addPageQueue(p.getId(),
								p.getDeployDate(), WindSiteDelay.getDays(v),
								TimeUnit.SECONDS);// 加入超时队列(加入3小时的随机)
						p.setNextDeploy(cache.get(p.getId()));
					} else {
						p.setNextDeploy(nextDeploy);
					}
				}
			}
		}
		result.put("pages", pages);
		result.put("daoPage", daoPage);
		result.put("cats", EnvManager.getRootCats());
		return new ModelAndView("site/designer/pageManager", result);
	}

	/**
	 * 进入宝贝详情页面管理
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/manager/detail")
	public ModelAndView pageManagerDetail(HttpServletRequest request,
			HttpServletResponse response) {
		T_UserSubscribe usb = EnvManager.getUser().getUsb();
		if ((usb != null && usb.getVersionNo() > 1)) {
			Map<String, Object> result = new HashMap<String, Object>();
			Site site = EnvManager.getUser().getSites().get(0);
			UserPageDetail page = pageService.findByCriterion(
					UserPageDetail.class, R.eq("site_id", site.getId()));
			if (page == null) {
				page = pageService.createPageDetail(EnvManager.getUser());// 创建宝贝详情页
			}
			result.put("pages", pageService.findAllByCriterion(
					UserPage.class,
					R.eq("user_id", EnvManager.getUser().getUser_id()),
					R.eq("site_id", EnvManager.getUser().getSites().get(0)
							.getId())));
			result.put(
					"layout",
					pageService.findByCriterion(PageDetailLayout.class,
							R.eq("site_id", site.getId())));
			return new ModelAndView("site/designer/pageDetailManager", result);
		} else {
			SystemException.handleException("102", "您需要升级版本才可以设计宝贝详情页");
		}
		return null;
	}

	/**
	 * 进入搜索列表页面管理
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/manager/search")
	public ModelAndView pageManagerSearch(HttpServletRequest request,
			HttpServletResponse response) {
		T_UserSubscribe usb = EnvManager.getUser().getUsb();
		if ((usb != null && usb.getVersionNo() > 1)) {
			Map<String, Object> result = new HashMap<String, Object>();
			Site site = EnvManager.getUser().getSites().get(0);
			UserPageSearch page = pageService.findByCriterion(
					UserPageSearch.class, R.eq("site_id", site.getId()));
			if (page == null) {
				page = pageService.createPageSearch(EnvManager.getUser());// 创建搜索列表页
			}
			result.put("pages", pageService.findAllByCriterion(
					UserPage.class,
					R.eq("user_id", EnvManager.getUser().getUser_id()),
					R.eq("site_id", EnvManager.getUser().getSites().get(0)
							.getId())));
			result.put("siteCommission",
					pageService.load(SiteCommission.class, site.getId()));
			result.put(
					"layout",
					pageService.findByCriterion(PageSearchLayout.class,
							R.eq("site_id", site.getId())));
			return new ModelAndView("site/designer/pageSearchManager", result);
		} else {
			SystemException.handleException("102", "您需要升级版本才可以设计搜索列表页");
		}
		return null;
	}

	/**
	 * 调整详情页，搜索页的布局
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/manager/layout/change")
	@ResponseBody
	public String pageManagerLayoutChange(HttpServletRequest request,
			HttpServletResponse response) {
		String layoutStr = request.getParameter("layout");
		String type = request.getParameter("type");
		if (StringUtils.isEmpty(layoutStr) || StringUtils.isEmpty(type)) {//
			SystemException.handleMessageException("未指定调整布局的类型");
		}
		if (!layoutStr.equals(Layout.S5M0) && !layoutStr.equals(Layout.M0S5)) {
			SystemException.handleMessageException("要更换的布局类型不支持");
		}
		T_UserSubscribe usb = EnvManager.getUser().getUsb();
		if ((usb != null && usb.getVersionNo() > 1)) {
			Site site = EnvManager.getUser().getSites().get(0);
			Layout layout = null;
			if ("detail".equals(type)) {
				layout = pageService.findByCriterion(PageDetailLayout.class,
						R.eq("site_id", site.getId()));
				if (layout == null) {
					SystemException.handleMessageException("您尚未创建宝贝详情页设计");
				}
				layout.setLayout(layoutStr);
				pageService.update(layout);
				SiteImpl impl = EnvManager.getSites().get(
						EnvManager.getUser().getUser_id());
				if (impl != null
						&& !layoutStr.equals(impl.getSite_detailLayout())) {
					impl.setSite_detailLayout(layoutStr);
					EnvManager.getSites().put(
							EnvManager.getUser().getUser_id(), impl);
				}
			} else if ("search".equals(type)) {
				layout = pageService.findByCriterion(PageSearchLayout.class,
						R.eq("site_id", site.getId()));
				if (layout == null) {
					SystemException.handleMessageException("您尚未创建搜索列表页设计");
				}
				layout.setLayout(layoutStr);
				pageService.update(layout);
				SiteImpl impl = EnvManager.getSites().get(
						EnvManager.getUser().getUser_id());
				if (impl != null
						&& !layoutStr.equals(impl.getSite_searchLayout())) {
					impl.setSite_searchLayout(layoutStr);
					EnvManager.getSites().put(
							EnvManager.getUser().getUser_id(), impl);
				}
			}
		} else {
			SystemException.handleException("102", "您需要升级版本才可以设计搜索列表页");
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 调整搜索页的搜索默认视图
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/manager/search/view")
	@ResponseBody
	public String pageManagerSearchView(HttpServletRequest request,
			HttpServletResponse response) {
		String view = request.getParameter("view");
		String isSearchBox = request.getParameter("isSearchBox");
		if (StringUtils.isEmpty(view)) {//
			SystemException.handleMessageException("未指定要默认显示的视图");
		}
		if (!"list".equals(view) && !"grid".equals(view)) {
			SystemException.handleMessageException("指定要默认显示的视图格式错误");
		}
		T_UserSubscribe usb = EnvManager.getUser().getUsb();
		if ((usb != null && usb.getVersionNo() > 1)) {
			SiteCommission sc = pageService.get(SiteCommission.class,
					EnvManager.getUser().getSites().get(0).getId());
			if (sc == null) {
				SystemException.handleException("用户数据发生错误，请重新登录新淘网");
			}
			sc.setSearchView(view);
			sc.setSearchBox("true".equals(isSearchBox) ? true : false);
			pageService.update(sc);
			SiteImpl impl = EnvManager.getSites().get(
					EnvManager.getUser().getUser_id());
			if (impl != null) {
				impl.setSite_searchView(view);
				impl.setSite_searchBox(isSearchBox);
				EnvManager.getSites().put(EnvManager.getUser().getUser_id(),
						impl);
			}
		} else {
			SystemException.handleException("102", "您需要升级版本才可以调整搜索页默认视图");
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 进入页面布局管理
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/layout/manager/{id}")
	public ModelAndView pageLayoutManager(@PathVariable String id,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		UserPage page = pageService.get(UserPage.class, id);
		if (page == null) {
			SystemException.handleMessageException("页面不存在");
		}
		if (!page.getUser_id().equals(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("您无权操作此页面");
		}
		result.put(
				"pages",
				pageService.findAllByCriterion(
						UserPage.class,
						R.eq("user_id", EnvManager.getUser().getUser_id()),
						R.eq("site_id", EnvManager.getUser().getSites().get(0)
								.getId())));
		result.put("mode", "user");
		PageMeta meta = pageService.get(PageMeta.class, id);
		PageModel model = PageUtils.convertPageModel(meta.getMetadata());
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("page", id);
		String hql = "select new map(id as id,name as name,title as title) from PageModule where page=:page";
		List<Map<String, Object>> modules = (List<Map<String, Object>>) pageService
				.findByHql(hql, params);
		Map<String, Map<String, Object>> mMap = new HashMap<String, Map<String, Object>>();
		if (modules != null && modules.size() > 0) {
			for (Map<String, Object> map : modules) {
				mMap.put("" + map.get("id"), map);
			}
		}
		result.put("modules", mMap);
		result.put("model", model);
		result.put("page", page);
		SiteTheme theme = pageService.get(SiteTheme.class, page.getSite_id());
		result.put("theme", theme);
		return new ModelAndView("site/designer/pageLayout", result);
	}

	/**
	 * 进入页面设计器
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/designer")
	public ModelAndView pageDesigner(HttpServletRequest request,
			HttpServletResponse response) {
		String pageId = request.getParameter("page");
		Map<String, Object> result = new HashMap<String, Object>();
		Site site = EnvManager.getUser().getSites().get(0);
		UserPage page = null;
		if (StringUtils.isNotEmpty(pageId)) {
			try {
				page = pageService.get(UserPage.class, pageId);
				if (page == null) {
					SystemException.handleMessageException("页面不存在");
				}
				if (!page.getUser_id().equals(site.getUser_id())) {
					if (!EnvManager.getUser().getRole().equals("admin")) {// 如果非管理员
						SystemException.handleMessageException("您无权访问此页面");
					} else {// 如果是管理员
						User user = pageService.findByCriterion(User.class,
								R.eq("user_id", page.getUser_id()));
						user.setSites(pageService.findAllByCriterion(
								Site.class, R.eq("user_id", page.getUser_id())));// 手动设置站点
						T_UserSubscribe tus = pageService.get(
								T_UserSubscribe.class, user.getUser_id());
						user.setUsb(tus);
						Limit limit = pageService.findByCriterion(Limit.class,
								R.eq("user_id", user.getUser_id()));
						user.setLimit(limit);
						result.put("USER", user);// 管理员查看非自己的指定页面，需设置当前页面所属站长的用户环境
					}
				}
			} catch (Exception e) {
				SystemException.handleMessageException("访问指定页面出错");
			}
		} else {
			List<UserPage> indexPages = pageService.findAllByCriterion(
					UserPage.class, R.eq("isIndex", true),
					R.eq("site_id", site.getId()));
			if (indexPages != null && indexPages.size() > 0) {
				if (indexPages.size() == 1) {
					page = indexPages.get(0);
				} else if (indexPages.size() > 1) {
					for (int i = 1; i < indexPages.size(); i++) {// 删除所有多余的首页及相关布局，容器，模块
						UserPage delPage = indexPages.get(i);
						pageService.deleteAll(PageModule.class,
								R.eq("page", delPage.getId()));
						pageService.deleteAll(PageRegion.class,
								R.eq("page", delPage.getId()));
						pageService.deleteAll(PageLayout.class,
								R.eq("page", delPage.getId()));
						pageService.delete(UserPage.class, delPage.getId());
					}
				}
			}
		}
		if (page == null) {// 如果不存在首页，则创建一个
			if (pageService.countPages(site.getId()) > 0) {
				SystemException
						.handleMessageException("您尚未设置自己页面为首页，请进入页面管理功能，将其中一个自定义页面设置为站点首页");
			}
			page = new UserPage();
			page.setCid(site.getCid());
			page.setNick(EnvManager.getUser().getNick());
			page.setSite_id(site.getId());
			page.setUser_id(EnvManager.getUser().getUser_id());
			page.setTitle(site.getTitle());
			page.setDescription(site.getDescription());
			page.setKeywords(site.getMetadata());
			page.setStatus(false);
			page.setIsIndex(true);
			pageService.addPage(page);
			// 处理pageid
			page = pageService.get(UserPage.class, page.getId());
			page.setPageid(Math.abs(page.getCreated().getTime()) + "");
			pageService.update(page);
		}
		result.put("channels", EnvManager.getChannels());// 频道
		result.put("cats", EnvManager.getRootCats());// 跟分类
		result.put("page", page);
		result.put("pages", pageService.findAllByCriterion(
				new com.wind.core.dao.Page<UserPage>(1, 10), UserPage.class,
				R.eq("user_id", page.getUser_id())));
		result.put("mode", "user");// 用户
		SiteTheme theme = pageService.get(SiteTheme.class, page.getSite_id());
		result.put("theme", theme);
		return new ModelAndView("site/designer/designer", result);
	}

	/**
	 * 进入页面详情设计器
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/designer/detail")
	public ModelAndView pageDesignerDetail(HttpServletRequest request,
			HttpServletResponse response) {
		T_UserSubscribe usb = EnvManager.getUser().getUsb();
		if ((usb != null && usb.getVersionNo() > 1)) {
			Map<String, Object> result = new HashMap<String, Object>();
			Site site = EnvManager.getUser().getSites().get(0);
			UserPageDetail page = pageService.findByCriterion(
					UserPageDetail.class, R.eq("site_id", site.getId()));
			if (page == null) {
				page = pageService.createPageDetail(EnvManager.getUser());// 创建宝贝详情页
			}
			TaobaokeItemDetail item = getItemDetailModel();
			if (item == null) {
				SystemException.handleMessageException("未找到淘宝推广商品，请刷新页面重试");
			}
			result.put("item", item.getItem());
			result.put("detail", item);
			SiteTheme theme = pageService.get(SiteTheme.class, site.getId());
			result.put("channels", EnvManager.getChannels());// 频道
			result.put("cats", EnvManager.getRootCats());// 跟分类
			result.put("pages", pageService.findAllByCriterion(
					new com.wind.core.dao.Page<UserPage>(1, 10),
					UserPage.class,
					R.eq("user_id", EnvManager.getUser().getUser_id())));
			result.put("mode", "detail");// 用户
			result.put("theme", theme);
			result.put("page", page);
			return new ModelAndView("site/designer/designer", result);
		} else {
			SystemException.handleException("102", "您需要升级版本才可以设计搜索列表页");
		}
		return null;
	}

	private TaobaokeItemDetail getItemDetailModel() {
		TaobaokeItemsGetRequest getRequest = new TaobaokeItemsGetRequest();
		getRequest.setFields("num_iid");// 支取NUM_IID
		getRequest.setCid(16L);// 女装
		getRequest.setPageNo(1L);
		getRequest.setPageSize(1L);
		getRequest.setSort("commissionNum_desc");
		getRequest.setNick(EnvManager.getUser().getNick());
		TaobaokeItemsGetResponse getResponse = TaobaoFetchUtil.searchItems(
				EnvManager.getUser().getAppKey(), EnvManager.getUser()
						.getAppSecret(), EnvManager.getUser().getAppType(),
				getRequest, EnvManager.getUser().getPid());
		if (getResponse != null) {// 查询女装下第一个商品
			List<TaobaokeItem> items = getResponse.getTaobaokeItems();
			if (items != null && items.size() == 1) {
				TaobaokeItemsDetailGetRequest getDetailRequest = new TaobaokeItemsDetailGetRequest();
				getDetailRequest.setNick(EnvManager.getUser().getNick());// 昵称
				getDetailRequest.setNumIids(items.get(0).getNumIid() + "");
				getDetailRequest.setFields(TaobaoFetchUtil.DETAIL_FIELDS);
				getDetailRequest.setOuterCode(EnvManager.getItemsOuterCode());
				TaobaokeItemsDetailGetResponse getDetailResponse = TaobaoFetchUtil
						.getItemsDetail(EnvManager.getUser().getAppKey(),
								EnvManager.getUser().getAppSecret(), EnvManager
										.getUser().getAppType(),
								getDetailRequest, EnvManager.getUser().getPid());// 转换女装下第一个商品
				if (getDetailResponse == null) {
					SystemException.handleMessageException("该商品已移除或者被卖家下架");
				}
				List<TaobaokeItemDetail> itemList = getDetailResponse
						.getTaobaokeItemDetails();
				if (itemList == null || itemList.size() != 1) {
					SystemException.handleMessageException("该商品已移除或者被卖家下架");
				}
				return itemList.get(0);
			} else {
				SystemException.handleMessageException("未找到淘宝推广商品，请刷新页面重试");
			}
		} else {
			SystemException.handleMessageException("淘宝请求失败，请刷新页面重试");
		}
		return null;

	}

	/**
	 * 进入搜索列表页面设计器
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/designer/search")
	public ModelAndView pageDesignerSearch(HttpServletRequest request,
			HttpServletResponse response) {
		T_UserSubscribe usb = EnvManager.getUser().getUsb();
		if ((usb != null && usb.getVersionNo() > 1)) {
			Map<String, Object> result = new HashMap<String, Object>();
			Site site = EnvManager.getUser().getSites().get(0);
			UserPageSearch page = pageService.findByCriterion(
					UserPageSearch.class, R.eq("site_id", site.getId()));
			if (page == null) {
				page = pageService.createPageSearch(EnvManager.getUser());// 创建搜索列表页
			}
			SiteTheme theme = pageService.get(SiteTheme.class, site.getId());
			result.put("channels", EnvManager.getChannels());// 频道
			result.put("cats", EnvManager.getRootCats());// 跟分类
			result.put("pages", pageService.findAllByCriterion(
					new com.wind.core.dao.Page<UserPage>(1, 10),
					UserPage.class,
					R.eq("user_id", EnvManager.getUser().getUser_id())));
			result.put("mode", "search");// 用户
			result.put("theme", theme);
			result.put("page", page);
			return new ModelAndView("site/designer/designer", result);
		} else {
			SystemException.handleException("102", "您需要升级版本才可以设计搜索列表页");
		}
		return null;
	}

	/**
	 * 新增Layout
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/layout/add")
	@ResponseBody
	public String addLayout(HttpServletRequest request,
			HttpServletResponse response) {
		PageLayout pageLayout = new PageLayout();
		String content = "";
		try {
			String layout = request.getParameter("layout");
			String pageId = request.getParameter("page");
			if (StringUtils.isEmpty(pageId)) {
				SystemException.handleMessageException("未指定要添加布局的页面");
			}
			Page page = pageService.get(Page.class, pageId);
			if (page == null) {
				SystemException.handleMessageException("指定的页面不存在");
			}
			Integer count = pageService.countPageLayouts(pageId);
			Limit limit = EnvManager.getUser().getLimit();
			if (count >= limit.getLayouts()) {// 如果已设计的布局大于等于限额，则异常
				SystemException
						.handleMessageException("您当前页面布局限额为"
								+ limit.getLayouts() + ",已经添加了" + count
								+ "个布局,无法再新增布局");
			}
			pageLayout.setLayout(layout);
			pageLayout.setPage(pageId);
			pageLayout.setNick(EnvManager.getUser().getNick());
			pageLayout.setSite_id(EnvManager.getUser().getSites().get(0)
					.getId());
			pageLayout.setUser_id(EnvManager.getUser().getUser_id());
			pageService.addLayout(pageLayout);
			Template template = fcg.getConfiguration().getTemplate(
					"site/designer/addLayoutTemplate.ftl");
			template.setEncoding("UTF-8");
			List<PageLayout> layouts = new ArrayList<PageLayout>();
			layouts.add(pageLayout);
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("layouts", layouts);
			content = FreeMarkerTemplateUtils.processTemplateIntoString(
					template, params);
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}
		JsonObject obj = new JsonObject();
		obj.addProperty("id", pageLayout.getId() + "");
		obj.addProperty("content", HtmlUtils.htmlEscape(content));
		return obj.toString();// 转义内容结果
	}

	/**
	 * 删除Layout
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/layout/delete/{id}")
	@ResponseBody
	public String deleteLayout(@PathVariable Long id,
			HttpServletRequest request, HttpServletResponse response) {
		String meta = request.getParameter("meta");
		String page = request.getParameter("page");
		if (StringUtils.isEmpty(page) || StringUtils.isEmpty(meta)) {
			SystemException.handleMessageException("未指定页面或页面元信息");
		}
		pageService.deleteLayout(id, page, meta);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 新增Module
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/module/add")
	@ResponseBody
	public String addModule(HttpServletRequest request,
			HttpServletResponse response) {
		String content = "";
		PageModule pageModule = new PageModule();
		try {
			String name = request.getParameter("name");
			String region = request.getParameter("region");
			String metadata = request.getParameter("metadata");
			String userModule = request.getParameter("userModule");
			String type = request.getParameter("type");
			String page = request.getParameter("page");
			if (StringUtils.isEmpty(region)) {
				SystemException.handleMessageException("未指定要添加模块的容器");
			}
			PageRegion pageRegion = pageService.get(PageRegion.class,
					Long.valueOf(region));
			if (pageRegion == null) {
				SystemException.handleMessageException("指定的容器不存在");
			}

			if (StringUtils.isNotEmpty(page)) {// 如果是存在页面的，则判断可新增模块
				Integer count = pageService.countPageModules(page);
				Limit limit = EnvManager.getUser().getLimit();
				if (count >= limit.getModules()) {// 如果已设计的布局大于等于限额，则异常
					SystemException.handleMessageException("您当前页面模块限额为"
							+ limit.getModules() + ",已经添加了" + count
							+ "个模块,无法再新增模块");
				}
			} else {
				SystemException.handleMessageException("未指定页面");
			}
			if (StringUtils.isNotEmpty(userModule)) {
				pageModule.setUserModule(userModule);// 自定义模块需要设置所在ftl
			}
			pageModule.setPage(pageRegion.getPage());
			pageModule.setRegion(pageRegion.getId());
			pageModule.setMetadata(metadata);// 已经转义过得参数
			pageModule.setName(name);// 模块名称
			pageModule.setNick(EnvManager.getUser().getNick());
			pageModule.setSite_id(EnvManager.getUser().getSites().get(0)
					.getId());
			pageModule.setUser_id(EnvManager.getUser().getUser_id());
			pageModule.setTitle(request.getParameter("title"));// 标题
			if ("layout".equals(type)) {// 如果是布局页面新增模块则不返回内容
				pageService.addModule(pageModule);
				JsonObject obj = new JsonObject();
				obj.addProperty("id", pageModule.getId() + "");
				return obj.toString();
			} else {
				content = pageService.addModule(page, pageModule, moduleMethod,
						fcg);
			}
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}
		JsonObject obj = new JsonObject();
		obj.addProperty("id", pageModule.getId() + "");
		obj.addProperty("content", HtmlUtils.htmlEscape(content));
		return obj.toString();// 转义内容结果
	}

	/**
	 * 更新Module
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/module/update/{id}")
	@ResponseBody
	public String updateModule(@PathVariable Long id,
			HttpServletRequest request, HttpServletResponse response) {
		String content = "";
		PageModule pageModule = null;
		try {
			String metadata = request.getParameter("metadata");
			String type = request.getParameter("type");
			pageModule = pageService.get(PageModule.class, id);
			if (pageModule == null) {
				SystemException.handleMessageException("指定模块不存在");
			}
			pageModule.setTitle(request.getParameter("title"));
			pageModule.setMetadata(metadata);
			if ("layout".equals(type)) {// 如果是布局页面更新模块则不返回内容
				pageService.update(pageModule);
				JsonObject obj = new JsonObject();
				obj.addProperty("id", pageModule.getId() + "");
				return obj.toString();
			} else {
				content = pageService.updateModule(pageModule, moduleMethod,
						fcg);
			}
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}
		JsonObject obj = new JsonObject();
		obj.addProperty("id", pageModule.getId() + "");
		obj.addProperty("content", HtmlUtils.htmlEscape(content));
		return obj.toString();// 转义内容结果
	}

	/**
	 * 更新页面元信息
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/meta/update")
	@ResponseBody
	public String updatePageMeta(HttpServletRequest request,
			HttpServletResponse response) {
		String page = request.getParameter("page");
		String meta = request.getParameter("meta");
		if (StringUtils.isNotEmpty(page) && StringUtils.isNotEmpty(meta)) {
			pageService.updateModuleSort(page, meta);
		} else {
			SystemException.handleMessageException("未指定页面");
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 删除Module
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/module/delete/{id}")
	@ResponseBody
	public String deleteModule(@PathVariable Long id,
			HttpServletRequest request, HttpServletResponse response) {
		String meta = request.getParameter("meta");
		String page = request.getParameter("page");
		if (StringUtils.isEmpty(page) || StringUtils.isEmpty(meta)) {
			SystemException.handleMessageException("未指定页面或页面元信息");
		}
		pageService.deleteModule(id, page, meta);
		return WindSiteRestUtil.SUCCESS;
	}

	public static void main(String[] args) {
		System.out.println(HtmlUtils
				.htmlEscape("{\"name\":\"itemSearch\",\"bd\":\"\"}"));
	}

	/**
	 * 获取页面内容
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/content/{id}")
	@ResponseBody
	public String page(@PathVariable String id, HttpServletRequest request,
			HttpServletResponse response) {
		Page page = siteService.get(Page.class, id);
		if (page == null) {
			SystemException.handleMessageException("未找到自定义页面");
		}
		String user_id = "";
		Integer t = 0;
		if (page instanceof UserPage) {
			user_id = ((UserPage) page).getUser_id();
			t = 0;
		} else if (page instanceof UserPageDetail) {
			user_id = ((UserPageDetail) page).getUser_id();
			t = 1;
		} else if (page instanceof UserPageSearch) {
			user_id = ((UserPageSearch) page).getUser_id();
			t = 2;
		} else {
			SystemException.handleMessageException("当前页面类型不支持自定义");
		}
		if (!user_id.equals(EnvManager.getUser().getUser_id())
				&& !"admin".equals(EnvManager.getUser().getRole())) {
			SystemException.handleMessageException("您无权操作此页面");
		}
		PageMeta meta = siteService.get(PageMeta.class, id);
		if (meta == null) {
			meta = PageUtils.convertSort(siteService, user_id, page);
			if (meta != null) {
				meta.setUser_id(user_id);
				siteService.save(meta);
			}
		}
		if (meta == null) {
			SystemException.handleMessageException("未找到页面元信息");
		}
		String content = "";
		switch (t) {
		case 0:// 自定义页面内容
			content = PageUtils.createPageFtl(siteService, meta,
					request.getParameter("user_id"),
					request.getParameter("nick"), request.getParameter("pid"),
					true);
			break;
		case 1:// 详情页
			content = PageUtils.createUserPageDetailFtl(siteService, meta,
					request.getParameter("user_id"),
					request.getParameter("nick"), request.getParameter("pid"),
					true);
			break;
		case 2:// 搜索列表页
			content = PageUtils.createUserPageSearchFtl(siteService, meta,
					request.getParameter("user_id"),
					request.getParameter("nick"), request.getParameter("pid"),
					true);
			break;
		}
		Template template = null;
		try {
			template = new Template("page_meta_" + meta.getId(),
					new StringReader(content), fcg.getConfiguration());
		} catch (IOException e) {
			e.printStackTrace();
			return "";
		}
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("module", moduleMethod);
		params.put("pid", EnvManager.getUser().getPid());
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
	 * 获取布局容器内容
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/region/{id}")
	@ResponseBody
	public String pageRegion(@PathVariable Long id, HttpServletRequest request,
			HttpServletResponse response) {
		PageRegion pageRegion = siteService.get(PageRegion.class, id);
		if (pageRegion == null) {
			SystemException.handleMessageException("指定布局内容器不存在");
		}
		Template template = null;
		List<PageModule> modules = siteService.findAllByCriterion(
				PageModule.class, R.eq("region", id));
		try {
			template = new Template("region_" + pageRegion.getId(),
					new StringReader(PageUtils.createPageRegionContent(modules,
							EnvManager.getUser().getNick(), EnvManager
									.getUser().getPid(), true)),
					fcg.getConfiguration());
		} catch (IOException e) {
			e.printStackTrace();
			return "";
		}
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("module", moduleMethod);
		params.put("pid", EnvManager.getUser().getPid());
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
	 * 获取商品推广的配置文件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/config/item")
	public ModelAndView pageModuleCommonItem(HttpServletRequest request,
			HttpServletResponse response) {
		String cid = request.getParameter("cid");
		Map<String, Object> result = new HashMap<String, Object>();
		result.put(
				"groups",
				pageService.findAllByCriterion(ItemGroup.class,
						R.eq("user_id", EnvManager.getUser().getUser_id())));
		if (StringUtils.isNotEmpty(cid)) {// 获取指定分类信息
			T_ItemCat cat = pageService.findByCriterion(T_ItemCat.class,
					R.eq("cid", cid));
			if (cat != null) {
				result.put("cat", cat);
			}
		}
		result.put("cats", EnvManager.getRootCats());
		result.put("layout", request.getParameter("layout"));
		result.put("module", request.getParameter("module"));
		return new ModelAndView("assets/js/page/module/CommonItemConfig",
				result);
	}

	/**
	 * 获取类目推广的配置文件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/config/category")
	public ModelAndView pageModuleCommonCategory(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("cats", EnvManager.getRootCats());
		result.put("layout", request.getParameter("layout"));
		result.put("isParent", request.getParameter("isParent"));
		return new ModelAndView("assets/js/page/module/ShopCategoryConfig",
				result);
	}

	/**
	 * 获取类目推广的配置文件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/config/complexA")
	public ModelAndView pageModuleCommonComplexA(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put(
				"itemGroups",
				pageService.findAllByCriterion(ItemGroup.class,
						R.eq("user_id", EnvManager.getUser().getUser_id())));
		result.put(
				"shopGroups",
				pageService.findAllByCriterion(ShopGroup.class,
						R.eq("user_id", EnvManager.getUser().getUser_id())));
		result.put("cats", EnvManager.getShopCats());
		return new ModelAndView("assets/js/page/module/CommonComplexAConfig",
				result);
	}

	/**
	 * 查询指定父类目的所有子类目
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/cats/{cid}", method = RequestMethod.GET)
	@ResponseBody
	public String getCatsByParentCid(@PathVariable String cid,
			HttpServletRequest request, HttpServletResponse response) {
		List<T_ItemCat> cats = new ArrayList<T_ItemCat>();
		for (T_ItemCat cat : EnvManager.getCats()) {
			if (cat.getParentCid().equals(cid)) {
				cats.add(cat);
			}
		}
		return new Gson().toJson(cats, new TypeToken<List<T_ItemCat>>() {
		}.getType());
	}

	/**
	 * 获取频道推广配置文件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/config/channel")
	public ModelAndView pageModuleConfigShopChannel(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("channels", EnvManager.getChannels());
		return new ModelAndView("assets/js/page/module/ShopChannelConfig",
				result);
	}

	/**
	 * 获取商城分类推广配置文件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/config/mallCats")
	public ModelAndView pageModuleConfigShopYiqifaMallCats(
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("cats", EnvManager.getYiqifaCats());
		return new ModelAndView("assets/js/page/module/ShopMallTabNavConfig",
				result);
	}

	/**
	 * 获取商城分类推广配置文件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/config/b2cMall")
	public ModelAndView pageModuleConfigShopB2CMall(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("cats", EnvManager.getYiqifaCats());
		return new ModelAndView("assets/js/page/module/CommonB2CMallConfig",
				result);
	}

	/**
	 * 获取商城分类推广配置文件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/config/b2cMallList")
	public ModelAndView pageModuleConfigShopB2CMallList(
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("cats", EnvManager.getYiqifaCats());
		return new ModelAndView(
				"assets/js/page/module/CommonB2CMallListConfig", result);
	}

	/**
	 * 获取品牌库推广配置文件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/config/brand")
	public ModelAndView pageModuleConfigShopBrand(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("cats", EnvManager.getBrandCats());
		result.put("layout", request.getParameter("layout"));
		result.put("module", request.getParameter("module"));
		String bids = request.getParameter("bids");
		if (StringUtils.isNotEmpty(bids)) {
			String[] array = bids.split(",");
			Boolean isFirst = true;
			String in = "";
			for (String p : array) {
				if (isFirst) {
					isFirst = false;
				} else {
					in += ",";
				}
				in += "'" + p + "'";
			}
			String hql = "from T_MallBrand where sid in (" + in + ")";
			List<T_MallBrand> brands = (List<T_MallBrand>) pageService
					.findByHql(hql, new HashMap<String, Object>());
			result.put("brands", brands);
		}
		return new ModelAndView("assets/js/page/module/CommonBrandConfig",
				result);
	}

	/**
	 * 获取品牌库推广配置文件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/config/poster")
	public ModelAndView pageModuleConfigShopPoster(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("module", request.getParameter("module"));
		result.put("channels", pageService.loadAll(T_PosterChannel.class));
		return new ModelAndView("assets/js/page/module/CommonPosterConfig",
				result);
	}

	/**
	 * 获取指定品牌分类的品牌商城
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/config/brand/{id}")
	public ModelAndView pageModuleConfigShopBrandByBid(@PathVariable Long id,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put(
				"brands",
				pageService.findAllByCriterionAndOrder(T_MallBrand.class,
						Order.asc("sortOrder"), R.eq("cid", id)));
		return new ModelAndView("assets/js/page/module/CommonBrandConfigExtra",
				result);
	}

	/**
	 * 获取文章分类推广配置文件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/config/class")
	public ModelAndView pageModuleConfigShopClass(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put(
				"classes",
				ucService.findAllByCriterion(UCClass.class,
						R.eq("uid", EnvManager.getUser().getUc_id())));
		return new ModelAndView("assets/js/page/module/ShopClassConfig", result);
	}

	/**
	 * 获取文章分类推广配置文件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/config/blog")
	public ModelAndView pageModuleConfigShopBlog(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put(
				"classes",
				ucService.findAllByCriterion(UCClass.class,
						R.eq("uid", EnvManager.getUser().getUc_id())));
		return new ModelAndView("assets/js/page/module/ShopBlogConfig", result);
	}

	/**
	 * 获取频道推广配置文件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/config/page")
	public ModelAndView pageModuleConfigCommonChannel(
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("pages", EnvManager.getChannels());
		return new ModelAndView("assets/js/page/module/CommonPageConfig",
				result);
	}

	/**
	 * 获取店铺推广配置文件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/config/shop")
	public ModelAndView pageModuleConfigCommonShop(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put(
				"groups",
				pageService.findAllByCriterion(ShopGroup.class,
						R.eq("user_id", EnvManager.getUser().getUser_id())));
		result.put("cats", EnvManager.getShopCats());
		result.put("layout", request.getParameter("layout"));
		result.put("module", request.getParameter("module"));
		return new ModelAndView("assets/js/page/module/CommonShopConfig",
				result);
	}

	/**
	 * 获取关键词推广配置文件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/config/keyword")
	public ModelAndView pageModuleConfigKeyword(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("cats", EnvManager.getKeywordCats());
		result.put("layout", request.getParameter("layout"));
		return new ModelAndView("assets/js/page/module/ShopKeywordConfig",
				result);
	}

	/**
	 * 获取店铺分类推广配置文件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/config/dianpu")
	public ModelAndView pageModuleConfigDianPu(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String module = request.getParameter("module");
		if ("shopDianPu".equals(module)) {
			result.put("dianpuCats", new Gson().toJson(
					EnvManager.getDianpuCats(),
					new TypeToken<Map<String, List<DianPuCategory>>>() {
					}.getType()));
			return new ModelAndView("assets/js/page/module/CommonDianPuConfig",
					result);
		} else {
			result.put(
					"rootCats",
					pageService.findAllByCriterion(DianPuCategory.class,
							R.isNull("parent")));
			result.put("dianpuCats", EnvManager.getDianpuCats());
			return new ModelAndView(
					"assets/js/page/module/CommonDianPuListConfig", result);
		}
	}

	/**
	 * 获取广告联盟推广配置文件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/config/union")
	public ModelAndView pageModuleConfigUnion(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String union_type = request.getParameter("union_type");
		if (StringUtils.isEmpty(union_type)) {
			SystemException.handleMessageException("未指定广告联盟类型");
		}
		if ("google".equals(union_type)) {
			String client = request.getParameter("client");
			String slot = request.getParameter("slot");
			String width = request.getParameter("width");
			String height = request.getParameter("height");
			if (StringUtils.isNotEmpty(client) && StringUtils.isNotEmpty(slot)
					&& StringUtils.isNotEmpty(width)
					&& StringUtils.isNotEmpty(height)) {
				result.put("client", client);
				result.put("slot", slot);
				result.put("width", width);
				result.put("height", height);
			}
		} else if ("baidu".equals(union_type)) {
			result.put("cpro_id", request.getParameter("cpro_id"));
		} else if ("alimama".equals(union_type)) {
			String pid = request.getParameter("pid");
			String titlecolor = request.getParameter("titlecolor");
			String descolor = request.getParameter("descolor");
			String bgcolor = request.getParameter("bgcolor");
			String bordercolor = request.getParameter("bordercolor");
			String linkcolor = request.getParameter("linkcolor");
			String bottomcolor = request.getParameter("bottomcolor");
			String anglesize = request.getParameter("anglesize");
			String bgpic = request.getParameter("bgpic");
			String icon = request.getParameter("icon");
			String sizecode = request.getParameter("sizecode");
			String width = request.getParameter("width");
			String height = request.getParameter("height");
			String type = request.getParameter("type");
			if (StringUtils.isNotEmpty(pid)) {
				result.put("pid", pid);
				result.put("titlecolor", titlecolor);
				result.put("descolor", descolor);
				result.put("bgcolor", bgcolor);
				result.put("bordercolor", bordercolor);
				result.put("linkcolor", linkcolor);
				result.put("bottomcolor", bottomcolor);
				result.put("anglesize", anglesize);
				result.put("bgpic", bgpic);
				result.put("icon", icon);
				result.put("sizecode", sizecode);
				result.put("width", width);
				result.put("height", height);
				result.put("type", type);
			}
		}
		result.put("union_type", union_type);
		return new ModelAndView("assets/js/page/module/CommonUnionConfig",
				result);
	}

	/**
	 * 获取配置文件
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/config/common/{module}")
	public ModelAndView pageModuleConfigFlashShow(@PathVariable String module,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("layout", request.getParameter("layout"));
		return new ModelAndView("assets/js/page/module/" + module + "Config",
				result);
	}

	/**
	 * 获取页面基本信息
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/info/{id}")
	public ModelAndView pageInfo(@PathVariable String id,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("page", pageService.get(Page.class, id));
		result.put("cats", EnvManager.getRootCats());
		return new ModelAndView("site/designer/pageUpdate", result);
	}

	/**
	 * 更新页面基本信息
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/update/{id}")
	@ResponseBody
	public String pageUpdate(@PathVariable String id,
			HttpServletRequest request, HttpServletResponse response) {
		String desc = request.getParameter("page_desc");
		String keywords = request.getParameter("page_keywords");
		String title = request.getParameter("page_title");
		String cid = request.getParameter("page_cid");
		if (StringUtils.isEmpty(title)) {
			SystemException.handleMessageException("页面标题不能为空");
		}
		UserPage page = pageService.get(UserPage.class, id);
		if (page == null) {
			SystemException.handleMessageException("指定的页面不存在");
		}
		page.setTitle(title);
		if (StringUtils.isNotEmpty(desc)) {
			page.setDescription(desc);
		}
		if (StringUtils.isNotEmpty(keywords)) {
			page.setKeywords(keywords);
		}
		page.setCid(cid);
		if (StringUtils.isEmpty(page.getPageid()))
			page.setPageid(Math.abs(page.getCreated().getTime()) + "");
		pageService.updatePage(page);
		if (page.getStatus()) {// 如果已发布
			if (!CommandExecutor.getUpdatecommands().containsKey(
					"p-" + page.getId())) {// 如果没有包含修改命令
				UpdateUserTemplateByTemplateCommand command = new UpdateUserTemplateByTemplateCommand();
				command.setFcg(fcg);
				command.setPage(page);
				command.setModuleMethod(moduleMethod);
				command.setPageService(pageService);
				CommandExecutor.getUpdatecommands().putIfAbsent(
						"p" + page.getId(), command);
			}
		}
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 打开分类选择器
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/cids")
	public ModelAndView pageCids(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		String cid = request.getParameter("cid");
		List<Map<String, List<T_ItemCat>>> cats = new ArrayList<Map<String, List<T_ItemCat>>>();
		if (StringUtils.isNotEmpty(cid)) {
			getCats(cats, cid);
		} else {
			Map<String, List<T_ItemCat>> root = new HashMap<String, List<T_ItemCat>>();
			root.put("0", EnvManager.getRootCats());
			cats.add(root);
		}
		result.put("cats", cats);
		return new ModelAndView("assets/js/page/pageCidsEditor", result);
	}

	private void getCats(List<Map<String, List<T_ItemCat>>> cats, String cid) {
		T_ItemCat cat = pageService.findByCriterion(T_ItemCat.class,
				R.eq("cid", cid));
		if (cat != null) {
			if (StringUtils.isNotEmpty(cat.getParentCid())
					&& !"0".equals(cat.getParentCid())) {// 如果有父节点
				List<T_ItemCat> parent = pageService.findAllByCriterion(
						T_ItemCat.class, R.eq("parentCid", cat.getParentCid()));
				Map<String, List<T_ItemCat>> parentMap = new HashMap<String, List<T_ItemCat>>();
				parentMap.put(cid, parent);
				cats.add(parentMap);
				getCats(cats, cat.getParentCid());
			} else {// 根节点
				Map<String, List<T_ItemCat>> root = new HashMap<String, List<T_ItemCat>>();
				root.put(cid, EnvManager.getRootCats());
				cats.add(root);
				Collections.reverse(cats);// 反转当前LIST
			}
		} else {// 如果其中cid不存在，则清空所有以获取的分类，只提供根分类
			cats.clear();
			Map<String, List<T_ItemCat>> root = new HashMap<String, List<T_ItemCat>>();
			root.put(cid, EnvManager.getRootCats());
			cats.add(root);
		}
	}
}
