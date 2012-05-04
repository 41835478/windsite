package com.wind.site.rest;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.StringReader;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.MatchMode;
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

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import com.taobao.api.domain.ItemProp;
import com.taobao.api.request.ItempropsGetRequest;
import com.wind.core.exception.SystemException;
import com.wind.core.util.DateUtils;
import com.wind.site.env.EnvManager;
import com.wind.site.freemarker.IDeployZone;
import com.wind.site.freemarker.method.WidgetCustomerMethod;
import com.wind.site.model.CustomeWidget;
import com.wind.site.model.DesignerErrorLog;
import com.wind.site.model.ItemGroup;
import com.wind.site.model.Site;
import com.wind.site.model.SiteImpl;
import com.wind.site.model.SystemTemplate;
import com.wind.site.model.T_ItemCat;
import com.wind.site.model.T_TaobaokeItem;
import com.wind.site.model.User;
import com.wind.site.model.UserTemplate;
import com.wind.site.model.Widget;
import com.wind.site.model.WidgetAttribute;
import com.wind.site.service.IDesignerService;
import com.wind.site.service.IPageService;
import com.wind.site.service.ISiteService;
import com.wind.site.service.impl.SiteServiceImpl;
import com.wind.site.util.TaobaoFetchUtil;
import com.wind.site.util.WidgetUtil;
import com.wind.site.util.WindSiteRestUtil;
import com.wind.uc.model.UCBlog;
import com.wind.uc.model.UCClass;

import freemarker.template.Template;
import freemarker.template.TemplateException;

/**
 * 设计器RESTFUL服务
 * 
 * @author fxy
 * 
 */
@Controller
@RequestMapping("/member/designer")
public class DesignerRest {
	@Autowired
	private IDesignerService designerService;
	@Autowired
	private ISiteService siteService;
	@Autowired
	private FreeMarkerConfigurer fcg;
	@Autowired
	private IDeployZone deployZone;
	@Autowired
	private WidgetCustomerMethod widgetCustomer;

	/**
	 * 查询指定父类目的所有子类目
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/cats/{cid}", method = RequestMethod.GET)
	public ModelAndView getCatsByParentCid(@PathVariable String cid,
			HttpServletRequest request, HttpServletResponse response) {
		List<T_ItemCat> cats = new ArrayList<T_ItemCat>();
		for (T_ItemCat cat : EnvManager.getCats()) {
			if (cat.getParentCid().equals(cid)) {
				cats.add(cat);
			}
		}
		return new ModelAndView("designer/assets/toolbar/category", "cats",
				cats);
	}

	/**
	 * 访问频道一键建站
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/channels", method = RequestMethod.GET)
	public ModelAndView channelTemplates(HttpServletRequest request,
			HttpServletResponse response) {
		if (1 == EnvManager.getUser().getSites().get(0).getStatus()) {
			SystemException.handleMessageException("您已经发布了站点,请直接访问设计器.");
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("channels", EnvManager.getChannels());
		return new ModelAndView("designer/channels", result);
	}

	/**
	 * 查询我的店铺收藏
	 * 
	 * @return
	 */
	@RequestMapping(value = "/shops", method = RequestMethod.GET)
	@ResponseBody
	public String designerShops(HttpServletRequest request,
			HttpServletResponse response) {
		return WindSiteRestUtil.SUCCESS;

	}

	/**
	 * 一键建站
	 * 
	 * @return
	 */
	@RequestMapping(value = "/channels/designer", method = RequestMethod.POST)
	@ResponseBody
	public String designerChannel(HttpServletRequest request,
			HttpServletResponse response) {
		String name = request.getParameter("name");
		String value = request.getParameter("value");
		String height = request.getParameter("height");
		String pic = request.getParameter("pic");
		if (StringUtils.isEmpty(value)) {
			SystemException.handleMessageException("未指定频道");
		}
		UserTemplate template = designerService
				.getDefaultUserTemplate(EnvManager.getUser().getSites().get(0)
						.getId());
		if (template == null) {
			SystemException.handleMessageException("尚未创建模板");
		}
		if (1 == EnvManager.getUser().getSites().get(0).getStatus()) {
			SystemException.handleMessageException("您的站点已经发布,请直接访问设计器");
		}
		template.setContent(channel_view.toString().replace("###channel###",
				convertChannelWidget(name, value, height, pic)));
		designerService.update(template);
		deployZone.deploy(fcg, EnvManager.getUser().getUser_id(), template
				.getId(), widgetCustomer);// 发布此模板
		return "{\"id\":\"" + template.getId() + "\"}";
	}

	public static void main(String[] args) {
		System.out.println(convertChannelWidget("综合频道", "channelcode", "2432",
				"channelcode.png"));
	}

	private static String convertChannelWidget(String name, String value,
			String height, String pic) {
		StringBuffer buffer = new StringBuffer(
				"<div class=\"ui-designer-widget\"  name=\"channelView\" style=\"display:block; width:948px;height:"
						+ height + "px;\"");
		buffer
				.append(" metadata='{disabled:false,align:\"center\",version:\"1.0\",name:\""
						+ name
						+ "\",value:\""
						+ value
						+ "\",pic:\""
						+ pic
						+ "\",height:"
						+ height
						+ ",resizable:\"false\",minWidth:\"900\",data_type:\"none\",handles:\"s\"}' align=\"center\">");
		return buffer.toString();
	}

	/**
	 * 记录设计器访问出错信息
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/error", method = RequestMethod.POST)
	@ResponseBody
	public String designerError(HttpServletRequest request) {
		String content = request.getParameter("content");
		DesignerErrorLog log = new DesignerErrorLog();
		log.setContent(content);
		log.setType("designer-error");
		log.setNick(EnvManager.getUser().getNick());
		designerService.save(log);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 访问设计器
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ModelAndView designer(HttpServletRequest request,
			HttpServletResponse response) {
		if (EnvManager.getUser() != null) {
			if (StringUtils.isEmpty(EnvManager.getUser().getPid())) {
				SiteServiceImpl.synPid(EnvManager.getUser());
			}
		}
		String tid = request.getParameter("tid");// 用户模板ID
		String stid = request.getParameter("stid");// 系统模板ID
		String siteId = request.getParameter("siteId");// 用户站点ID
		UserTemplate template = null;
		if (StringUtils.isNotEmpty(tid)) {
			template = designerService.getUserTemplate(tid);
			if (StringUtils.isNotEmpty(template.getParent())) {// 如果是子页面设计
				String header = designerService.getUserHeader(template
						.getParent());
				if (StringUtils.isEmpty(header)) {
					SystemException
							.handleMessageException("您需要重新保存一下您的站点首页设计。才可以设计新增的页面");
				}
			}
		} else {
			if (StringUtils.isNotEmpty(siteId)) {
				template = designerService.getDefaultUserTemplate(siteId);// 查询当前用户站点默认模板
			}
		}
		if (template == null) {
			SystemException.handleMessageException("当前模板不存在");
		}
		Map<String, Object> map = new HashMap<String, Object>();
		if (StringUtils.isEmpty(template.getContent())
				&& StringUtils.isEmpty(stid)) {// 如果用户模板尚未设计并且系统模板为空
			List<SystemTemplate> sys = (List<SystemTemplate>) designerService
					.findByHql("from SystemTemplate order by sortOrder", map);
			map.put("templates", sys);// 所有系统模板
			map.put("tid", tid);// 当前用户模板ID
			map.put("siteId", siteId);// 当前用户站点ID
			return new ModelAndView("designer/templates", map);
		}
		if (StringUtils.isNotEmpty(stid)) {// 如果系统模板不为空
			SystemTemplate st = designerService.getSysTemplate(stid);
			if (st == null) {
				SystemException.handleMessageException("指定的系统模板不存在");
			}
			map.put("stid", stid);// 设置系统模板ID
		}
		// List<ItemGroup> groups = designerService.findAllByCriterion(
		// ItemGroup.class, R.eq("user_id", EnvManager.getUser()
		// .getUser_id()));// 当前用户推广组
		// map.put("groups", groups);
		map.put("utemplate", template);
		map.put("site", template.getSite());
		map.put("channels", EnvManager.getChannels());
		return new ModelAndView("designer/designer", map);
	}

	/**
	 * 访问系统模板列表页
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/systemplates/{tid}", method = RequestMethod.GET)
	public ModelAndView designerSysTemplates(@PathVariable String tid,
			HttpServletRequest request, HttpServletResponse response) {
		UserTemplate ut = designerService.getUserTemplate(tid);
		if (ut == null) {
			SystemException.handleMessageException("当前用户模板不存在");
		}
		Map<String, Object> map = new HashMap<String, Object>();
		List<SystemTemplate> sys = (List<SystemTemplate>) designerService
				.findByHql("from SystemTemplate order by sortOrder", map);
		map.put("templates", sys);// 所有系统模板
		map.put("tid", tid);// 当前用户模板ID
		return new ModelAndView("designer/templates", map);
	}

	/**
	 * 访问系统模板设计器
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/system/{stid}", method = RequestMethod.GET)
	public ModelAndView designerSys(@PathVariable String stid,
			HttpServletRequest request, HttpServletResponse response) {
		SystemTemplate template = designerService.getSysTemplate(stid);
		if (template == null) {
			SystemException.handleMessageException("当前系统模板不存在");
		}
		Map<String, Object> map = new HashMap<String, Object>();
		// List<ItemGroup> groups = designerService.findAllByCriterion(
		// ItemGroup.class, R.eq("user_id", EnvManager.getUser()
		// .getUser_id()));// 当前用户推广组
		// map.put("groups", groups);
		map.put("utemplate", template);
		map.put("designerModel", "admin");
		map.put("channels", EnvManager.getChannels());
		return new ModelAndView("designer/designer", map);
	}

	/**
	 * 访问系统模板设计器
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 * @throws TemplateException
	 */
	@RequestMapping(value = "/template/system/{stid}", method = RequestMethod.GET)
	public void designerSysTemplate(@PathVariable String stid,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException, TemplateException {
		response.setCharacterEncoding("UTF-8");
		String utid = request.getParameter("utid");
		// 此处不应直接获取Writer.如果获取后。造成异常拦截器发布的中文错误信息乱码
		try {
			Template template = fcg.getConfiguration().getTemplate(
					"template/system/" + stid);
			Writer out = response.getWriter();
			Map<String, Object> params = new HashMap<String, Object>();
			Boolean isParent = false;
			UserTemplate ut = null;
			if (StringUtils.isNotEmpty(utid)) {// 如果是用户UTID
				ut = designerService.get(UserTemplate.class, utid);
				if (ut != null) {
					if (StringUtils.isNotEmpty(ut.getParent())) {// 如果父栏目不为空
						isParent = true;
					}
				}
			}
			if (isParent) {
				params.put("header", designerService.getUserHeader(ut
						.getParent()));
			} else {
				params.put("header", designerService.getSysHeader(stid));
			}
			params.put("widgetCustomer", widgetCustomer);
			template.process(params, out);
			out.flush();
			out.close();
		} catch (java.io.FileNotFoundException e) {// 如果模板为空
			defaultSysTemplate(response);// 访问系统默认模板
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}
	}

	/**
	 * 访问系统默认模板
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 * @throws IOException
	 * @throws TemplateException
	 * @throws IOException
	 * @throws TemplateException
	 */
	@Deprecated
	private void defaultSysTemplate(HttpServletResponse response)
			throws IOException, TemplateException {
		Template template = null;
		Writer out = response.getWriter();
		try {
			template = fcg.getConfiguration().getTemplate("template/default");
			template.process(new HashMap<String, Object>(), out);
		} catch (FileNotFoundException e) {
			out.write(default_buffer.toString());
		}
		out.flush();
		out.close();

	}

	/**
	 * 访问用户模板设计器
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 * @throws TemplateException
	 */
	@RequestMapping(value = "/template/user/{tid}", method = RequestMethod.GET)
	public void designerUserTemplate(@PathVariable String tid,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException, TemplateException {
		response.setCharacterEncoding("UTF-8");
		try {
			Template template = fcg.getConfiguration().getTemplate(
					"template/user/" + tid);
			defaultUserTemplate(template, tid, response);// 输出当前站点模板
		} catch (java.io.FileNotFoundException e) {// 如果模板为空
			defaultSysTemplate(response);// 访问系统默认模板
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}
	}

	/**
	 * 访问用户站点缺省模板
	 * 
	 * @param template
	 * @param tid
	 * @param out
	 * @throws IOException
	 * @throws TemplateException
	 */
	private void defaultUserTemplate(Template template, String tid,
			HttpServletResponse response) throws IOException, TemplateException {
		UserTemplate t = designerService.getUserTemplate(tid);
		// 查询推广组商品数据
		String gids = t.getGids();
		Map<String, Object> maps = new HashMap<String, Object>();
		if (StringUtils.isNotEmpty(gids)) {
			String[] gidArray = gids.split(",");
			for (String gid : gidArray) {
				maps.put("g_" + gid, designerService.getItems(gid, EnvManager
						.getUser().getUser_id()));

			}
		}
		// 获取自己的Header或者父Header
		String header = "";
		if (StringUtils.isEmpty(t.getParent())) {
			header = t.getHeader();
		} else {
			header = designerService.getUserHeader(t.getParent());
		}
		maps.put("header", header);
		maps.put("widgetCustomer", widgetCustomer);
		Writer out = response.getWriter();
		template.process(maps, out);
		out.flush();
		out.close();
	}

	/**
	 * 设计器访问系统模板
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/template/system", method = RequestMethod.GET)
	public ModelAndView sysTemplates(HttpServletRequest request,
			HttpServletResponse response) {
		if (!"admin".equalsIgnoreCase(EnvManager.getUser().getRole())) {
			SystemException.handleMessageException("您无权限执行此操作");
		}
		Map<String, Object> map = new HashMap<String, Object>();
		List<SystemTemplate> sys = (List<SystemTemplate>) designerService
				.findByHql("from SystemTemplate order by sortOrder", map);
		map.put("templates", sys);// 所有系统模板
		String type = request.getParameter("type");
		if (StringUtils.isNotEmpty(type)) {// 系统模板管理页
			map.put("type", type);
		} else {
			map.put("type", "designer");// 设计器模板列表页
		}
		return new ModelAndView("designer/assets/toolbar/templates", map);
	}

	/**
	 * 更新用户模板(更新)
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/template/update/user/{tid}", method = RequestMethod.POST)
	@ResponseBody
	public String updateUserTemplate(@PathVariable String tid,
			HttpServletRequest request, HttpServletResponse response) {
		UserTemplate template = designerService.get(UserTemplate.class, tid);
		if (template == null) {
			SystemException.handleMessageException("当前需要更新的模板不存在");
		}
		String name = request.getParameter("template_name");
		String desc = request.getParameter("template_desc");
		String isDefault = request.getParameter("template_isdefault");
		String skin = request.getParameter("template_skin");
		String gids = request.getParameter("template_gids");
		String content = request.getParameter("template_content");
		String header = request.getParameter("template_header");
		String visibleType = request.getParameter("template_visible");
		String customes = request.getParameter("template_customes");
		if (StringUtils.isNotEmpty(name) && !name.equals(template.getName())) {
			UserTemplate t = designerService.findByCriterion(
					UserTemplate.class, R.eq("user_id", EnvManager.getUser()
							.getUser_id()), R.eq("name", name));
			if (t != null) {
				SystemException.handleMessageException("模板名称[" + name
						+ "]重复,请重新命名");
			}
			template.setName(name);
		}
		if (StringUtils.isNotEmpty(desc)) {
			template.setDescription(desc);
		}
		if (StringUtils.isNotEmpty(isDefault)) {
			template.setIsDefault("true".equalsIgnoreCase(isDefault) ? true
					: false);
		}
		if (StringUtils.isNotEmpty(skin)) {
			template.setSkin(skin);
		}
		if (StringUtils.isNotEmpty(gids)) {
			template.setGids(gids);
		}
		if (StringUtils.isNotEmpty(content)) {
			template.setContent(content);
		}
		if (StringUtils.isNotEmpty(header)) {
			template.setHeader(header);
		}
		if (StringUtils.isNotEmpty(visibleType)) {
			try {
				template.setVisibleType(Integer.parseInt(visibleType));
			} catch (Exception e) {
				template.setVisibleType(2);
			}
		}
		designerService.updateTemplate(template, customes);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 更新系统模板(更新)
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/template/update/system/{stid}", method = RequestMethod.POST)
	@ResponseBody
	public String updateSystemTemplate(@PathVariable String stid,
			HttpServletRequest request, HttpServletResponse response) {
		SystemTemplate template = designerService.get(SystemTemplate.class,
				stid);
		if (template == null) {
			SystemException.handleMessageException("当前需要更新的系统模板不存在");
		}
		String name = request.getParameter("template_name");
		String desc = request.getParameter("template_desc");
		String isDefault = request.getParameter("template_isdefault");
		String skin = request.getParameter("template_skin");
		String gids = request.getParameter("template_gids");
		String content = request.getParameter("template_content");
		String header = request.getParameter("template_header");
		// String customes = request.getParameter("template_customes");
		if (StringUtils.isNotEmpty(name) && !name.equals(template.getName())) {
			SystemTemplate t = designerService.findByCriterion(
					SystemTemplate.class, R.eq("name", name));
			if (t != null) {
				SystemException.handleMessageException("系统模板名称[" + name
						+ "]重复,请重新命名");
			}
			template.setName(name);
		}
		if (StringUtils.isNotEmpty(desc)) {
			template.setDescription(desc);
		}
		if (StringUtils.isNotEmpty(isDefault)) {
			template.setIsDefault("true".equalsIgnoreCase(isDefault) ? true
					: false);
		}
		if (StringUtils.isNotEmpty(skin)) {
			template.setSkin(skin);
		}
		if (StringUtils.isNotEmpty(gids)) {
			template.setGids(gids);
		}
		if (StringUtils.isNotEmpty(header)) {
			template.setHeader(header);
		}
		if (StringUtils.isNotEmpty(content)) {
			template.setContent(content);
		}
		designerService.update(template);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 另存系统模板(更新)
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/template/save/system", method = RequestMethod.POST)
	@ResponseBody
	public String saveOtherSystemTemplate(HttpServletRequest request,
			HttpServletResponse response) {
		SystemTemplate template = new SystemTemplate();
		String name = request.getParameter("template_name");
		String desc = request.getParameter("template_desc");
		String skin = request.getParameter("template_skin");
		String gids = request.getParameter("template_gids");
		String content = request.getParameter("template_content");
		String header = request.getParameter("template_header");
		// String customes = request.getParameter("template_customes");
		if (StringUtils.isNotEmpty(name) && !name.equals(template.getName())) {
			SystemTemplate t = designerService.findByCriterion(
					SystemTemplate.class, R.eq("name", name));
			if (t != null) {
				SystemException.handleMessageException("系统模板名称[" + name
						+ "]重复,请重新命名");
			}
			template.setName(name);
		}
		if (StringUtils.isNotEmpty(desc)) {
			template.setDescription(desc);
		}
		if (StringUtils.isNotEmpty(skin)) {
			template.setSkin(skin);
		}
		if (StringUtils.isNotEmpty(header)) {
			template.setHeader(header);
		}
		if (StringUtils.isNotEmpty(gids)) {
			template.setGids(gids);
		}
		if (StringUtils.isNotEmpty(content)) {
			template.setContent(content);
		}
		designerService.save(template);
		return "{\"id\":\"" + template.getId() + "\"}";
	}

	/**
	 * 预览
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/preview", method = RequestMethod.POST)
	public void preview(HttpServletRequest request, HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		String source = request.getParameter("source");
		String header = request.getParameter("header");
		String gids = request.getParameter("gids");
		String skin = request.getParameter("skin");
		String title = request.getParameter("title");
		String desc = request.getParameter("description");
		String metadata = request.getParameter("metadata");
		String sid = request.getParameter("siteId");
		if (!StringUtils.isNotEmpty(source)) {
			SystemException.handleMessageException("模板内容为空");
		}
		Site site = null;
		if (StringUtils.isNotEmpty(sid)) {
			site = designerService.get(Site.class, sid);
		}
		Map<String, Object> maps = new HashMap<String, Object>();
		if (StringUtils.isNotEmpty(gids)) { // 推广组
			String[] gidArray = gids.split(",");
			for (String gid : gidArray) {
				maps.put("g_" + gid, designerService.getItems(gid, EnvManager
						.getUser().getUser_id()));
			}
		}
		maps.put("widgetCustomer", widgetCustomer);
		maps.put("skin", skin);// 皮肤
		maps.put("title", title);// 标题
		maps.put("header", header != null ? header.replaceAll("%7Bpid%7D",
				EnvManager.getUser().getPid()) : "");// Header
		maps.put("dateVersion", DateUtils.format(new Date(), "yyyyMMddHHmmss"));
		maps.put("alimamaSearchBox", "src='http://a.alimama.cn/inf.js'");// 阿里妈妈推广js
		maps.put("pid", EnvManager.getUser().getPid());// PID
		if (EnvManager.getUser().getUc_id() != null) {
			maps.put("uid", EnvManager.getUser().getUc_id());
			if (EnvManager.getValidHuabaoMembers().contains(
					EnvManager.getUser().getNick())) {
				maps.put("isHuabao", true);
			}
		}
		String _desc = title + "-专业的淘宝导购电子商务网站";
		String _metadata = "新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚";
		if (StringUtils.isNotEmpty(desc)) {// 当前模板描述
			_desc = desc;
		} else if (site != null
				&& StringUtils.isNotEmpty(site.getDescription())) {
			_desc = site.getDescription();
		}
		if (StringUtils.isNotEmpty(metadata)) {// 当前模板描述
			_metadata = metadata;
		} else if (site != null && StringUtils.isNotEmpty(site.getMetadata())) {
			_metadata = site.getMetadata();
		}
		maps.put("description", _desc);// 页面描述
		maps.put("metadata", _metadata);// 页面关键词
		try {
			String content = pre_buffer.toString() + source + "</body></html>";
			Template template = new Template(EnvManager.getUser().getId(),
					new StringReader(content.replaceAll("%7Bpid%7D", EnvManager
							.getUser().getPid())), fcg.getConfiguration());
			Writer out = response.getWriter();
			template.process(maps, out);
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 发布
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/deploy/{tid}", method = RequestMethod.GET)
	@ResponseBody
	public String deploy(@PathVariable String tid, HttpServletRequest request,
			HttpServletResponse response) {
		if (StringUtils.isEmpty(EnvManager.getRealPath()))
			EnvManager.setRealPath(request.getSession().getServletContext()
					.getRealPath("/"));
		deployZone.deploy(fcg, EnvManager.getUser().getUser_id(), tid,
				widgetCustomer);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 系统模板发布
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/deploy/sys/{stid}", method = RequestMethod.GET)
	@ResponseBody
	public String deploySys(@PathVariable String stid,
			HttpServletRequest request, HttpServletResponse response) {
		if (StringUtils.isEmpty(EnvManager.getRealPath()))
			EnvManager.setRealPath(request.getSession().getServletContext()
					.getRealPath("/"));
		deployZone.deploySysTemplate(fcg, stid, widgetCustomer);
		return WindSiteRestUtil.SUCCESS;
	}

	/**
	 * 获取指定推广组所有商品
	 * 
	 * @return
	 */
	@RequestMapping(value = "/itemgroup/{gid}", method = RequestMethod.GET)
	@ResponseBody
	public String getItemsByItemGroup(@PathVariable String gid,
			HttpServletRequest request) {
		List<T_TaobaokeItem> items = designerService.getItems(gid, EnvManager
				.getUser().getUser_id());
		return new Gson().toJson(items, new TypeToken<List<T_TaobaokeItem>>() {
		}.getType()).toString();
	}

	/**
	 * 获取当前用户所有推广组及所有商品
	 * 
	 * @return
	 */
	@RequestMapping(value = "/itemgroups", method = RequestMethod.GET)
	@ResponseBody
	public String getItemsByItemGroup(HttpServletRequest request) {
		List<ItemGroup> groups = designerService.findAllByCriterion(
				ItemGroup.class, R.eq("user_id", EnvManager.getUser()
						.getUser_id()));
		if (groups.size() > 0) {
			for (ItemGroup group : groups) {
				List<T_TaobaokeItem> items = designerService.getItems(group
						.getId(), null);
				group.setItems(items);
			}
			return new Gson().toJson(groups, new TypeToken<List<ItemGroup>>() {
			}.getType()).toString();
		}
		return "[]";
	}

	@Autowired
	private IPageService pageService;

	/**
	 * 更新用户站点统计信息
	 * 
	 * @return
	 */
	@RequestMapping(value = "/analytics", method = RequestMethod.POST)
	@ResponseBody
	public String analytics(HttpServletRequest request) {
		String sid = request.getParameter("sid");
		String gid = request.getParameter("gid");
		String lid = request.getParameter("lid");
		String laid = request.getParameter("laid");
		String type = request.getParameter("type");
		if (StringUtils.isEmpty(sid)) {
			SystemException.handleMessageException("未指定用户站点");
		}
		designerService.updateAnalytics(sid, gid, lid, laid, type);
		Site site = EnvManager.getUser().getSites().get(0);
		// 更新缓存中的站点信息
		SiteImpl siteImpl = EnvManager.getSites().get(site.getUser_id());
		if (siteImpl != null) {
			siteImpl = siteService.getSiteImplByUserId(site.getUser_id());
			if (siteImpl != null) {
				EnvManager.getSites().put(siteImpl.getUser_id(), siteImpl);
			}
		}
		// 发布页尾
		pageService.deployFooter(fcg, site.getUser_id());
		return WindSiteRestUtil.SUCCESS;
	}

	@RequestMapping(value = "/netlink/search", method = RequestMethod.POST)
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
			users = designerService.findAllByCriterion(User.class, R.like(
					"nick", keyword, MatchMode.ANYWHERE));
		} else {
			users = designerService.searchUserBySiteTitle(keyword);
		}
		return new ModelAndView("designer/assets/toolbar/netlink/searchResult",
				"users", users);
	}

	@RequestMapping(value = "/widgetdesigner/create/{id}", method = RequestMethod.GET)
	public ModelAndView createWidgetDesigner(@PathVariable String id,
			HttpServletRequest request, HttpServletResponse response) {
		Widget widget = designerService.get(Widget.class, id);
		if (widget == null) {
			SystemException.handleMessageException("当前组件模板不存在");
		}
		if (!"complex".equals(widget.getType().getName())) {
			SystemException.handleMessageException("当前组件模板非混合型组件");
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("widget", widget);

		result.put("cats", EnvManager.getRootCats());
		result.put("totalWords", EnvManager.getTotalWords());
		result.put("designer", "create");
		result.put("activities", EnvManager.getActivities());
		result.put("channels", EnvManager.getChannels());
		return new ModelAndView("designer/widgetdesigner", result);
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/customewidgets", method = RequestMethod.GET)
	@ResponseBody
	public String getCustomeWidgets(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userId", EnvManager.getUser().getUser_id());
		List<Map<String, Object>> my = (List<Map<String, Object>>) designerService
				.findByHql(
						"select new map(t.id as id,t.layout as layout,t.name as name) from CustomeWidget t where t.createdBy=:userId",
						params);
		List<Map<String, Object>> fav = (List<Map<String, Object>>) designerService
				.findByHql(
						"select new map(t.widget.id as id,t.widget.layout as layout,t.widget.name as name) from FavoriteWidget t where t.user_id=:userId",
						params);
		JsonObject obj = new JsonObject();
		JsonArray myArray = new JsonArray();
		JsonArray favArray = new JsonArray();
		if (my.size() > 0) {
			for (Map<String, Object> map : my) {
				JsonObject temp = new JsonObject();
				temp.addProperty("id", (String) map.get("id"));
				temp.addProperty("layout", map.get("layout").toString());
				temp.addProperty("name", (String) map.get("name"));
				myArray.add(temp);
			}
		}
		if (fav.size() > 0) {
			for (Map<String, Object> map : fav) {
				JsonObject temp = new JsonObject();
				temp.addProperty("id", (String) map.get("id"));
				temp.addProperty("layout", map.get("layout").toString());
				temp.addProperty("name", (String) map.get("name"));
				favArray.add(temp);
			}
		}
		obj.add("my", myArray);
		obj.add("fav", favArray);
		return obj.toString();
	}

	/**
	 * 查询可用自定义组件（包括我的设计，我的收藏，按照布局分类组合）
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/mycustomewidgets", method = RequestMethod.GET)
	@ResponseBody
	public String getMyCustomeWidgets(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userId", EnvManager.getUser().getUser_id());
		List<Map<String, Object>> my = (List<Map<String, Object>>) designerService
				.findByHql(
						"select new map(t.id as id,t.layout as layout,t.name as name,'m' as type) from CustomeWidget t where t.createdBy=:userId",
						params);
		List<Map<String, Object>> fav = (List<Map<String, Object>>) designerService
				.findByHql(
						"select new map(t.widget.id as id,t.widget.layout as layout,t.widget.name as name,'f' as type) from FavoriteWidget t where t.user_id=:userId",
						params);
		Map<String, List<Map<String, Object>>> result = new HashMap<String, List<Map<String, Object>>>();
		List<Map<String, Object>> layout0 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> layout1 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> layout2 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> layout3 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> layout4 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> layout5 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> layout6 = new ArrayList<Map<String, Object>>();
		if (my.size() > 0) {
			for (Map<String, Object> map : my) {
				addLayouts(map, layout0, layout1, layout2, layout3, layout4,
						layout5, layout6);
			}
		}
		if (fav.size() > 0) {
			for (Map<String, Object> map : fav) {
				addLayouts(map, layout0, layout1, layout2, layout3, layout4,
						layout5, layout6);
			}
		}
		result.put("0", layout0);
		result.put("1", layout1);
		result.put("2", layout2);
		result.put("3", layout3);
		result.put("4", layout4);
		result.put("5", layout5);
		result.put("6", layout6);
		return new Gson().toJson(result,
				new TypeToken<Map<String, List<Map<String, Object>>>>() {
				}.getType());
	}

	private void addLayouts(Map<String, Object> map,
			List<Map<String, Object>> layout0,
			List<Map<String, Object>> layout1,
			List<Map<String, Object>> layout2,
			List<Map<String, Object>> layout3,
			List<Map<String, Object>> layout4,
			List<Map<String, Object>> layout5, List<Map<String, Object>> layout6) {
		Integer layout = (Integer) map.get("layout");
		switch (layout) {
		case 0:
			layout0.add(map);
			break;
		case 1:
			layout1.add(map);
			break;
		case 2:
			layout2.add(map);
			break;
		case 3:
			layout3.add(map);
			break;
		case 4:
			layout4.add(map);
			break;
		case 5:
			layout5.add(map);
			break;
		case 6:
			layout6.add(map);
			break;
		}
	}

	@RequestMapping(value = "/customewidget/{wid}", method = RequestMethod.GET)
	public void getWidgetHtml(@PathVariable String wid,
			HttpServletRequest request, HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		CustomeWidget widget = designerService.get(CustomeWidget.class, wid);
		if (widget == null) {
			SystemException.handleMessageException("该组件已被删除，请更换其他组件");
		}
		try {
			WidgetUtil.outContent(widget, fcg, response.getWriter());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/widgetdesigner/update/{cwid}", method = RequestMethod.GET)
	public ModelAndView updateWidgetDesigner(@PathVariable String cwid,
			HttpServletRequest request, HttpServletResponse response) {
		CustomeWidget cwidget = designerService.get(CustomeWidget.class, cwid);
		if (cwidget == null) {
			SystemException.handleMessageException("当前自定义组件不存在");
		}
		if (!"complex".equals(cwidget.getWidget().getType().getName())
				&& !("search").equals(cwidget.getWidget().getType().getName())) {
			SystemException.handleMessageException("当前组件非混合型组件或者搜索型组件");
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("cwidget", cwidget);
		result.put("widget", cwidget.getWidget());

		try {
			Template template = new Template(EnvManager.getUser().getId() + "_"
					+ cwid, new StringReader(cwidget.getContent()), fcg
					.getConfiguration());
			Map<String, Object> maps = new HashMap<String, Object>();
			maps.put("pid", EnvManager.getUser().getPid());
			maps.put("spid", EnvManager.getUser().getPid()
					.replaceAll("mm_", "").replaceAll("_0_0", ""));
			cwidget.setContent(FreeMarkerTemplateUtils
					.processTemplateIntoString(template, maps));// 转换组件内容
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}

		result.put("cats", EnvManager.getRootCats());
		result.put("totalWords", EnvManager.getTotalWords());
		result.put("designer", "update");
		result.put("activities", EnvManager.getActivities());
		result.put("channels", EnvManager.getChannels());
		return new ModelAndView("designer/widgetdesigner", result);
	}

	@RequestMapping(value = "/widgetdesigner/widget/{id}", method = RequestMethod.GET)
	public void getWidgetDesigner(@PathVariable String id,
			HttpServletRequest request, HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		Widget widget = designerService.get(Widget.class, id);
		if (widget == null) {
			SystemException.handleMessageException("当前组件模板不存在");
		}
		try {
			Template template = fcg.getConfiguration().getTemplate(
					"site/admin/widgets/" + widget.getName() + ".ftl");
			Map<String, Object> maps = new HashMap<String, Object>();
			storeEditorMap(maps, widget);
			Writer out = response.getWriter();
			template.process(maps, out);
			out.flush();
			out.close();
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}
	}

	public static List<ItemProp> props = new ArrayList<ItemProp>();

	public static void storeEditorMap(Map<String, Object> result, Widget widget) {
		if ("blog".equals(widget.getType().getName())) {
			List<UCBlog> blogs = new ArrayList<UCBlog>();
			UCBlog blog = null;
			for (int i = 0; i < 5; i++) {
				blog = new UCBlog();
				blog.setBlogid(0);
				blog.setClassid(0);
				blog.setSubject("新淘家园日志标题");
				Long dateline = new Date().getTime() / 1000;
				blog.setDateline(dateline.intValue());
				blogs.add(blog);
			}
			result.put("blogs", blogs);
			UCClass clazz = new UCClass();
			clazz.setClassid(0);
			clazz.setClassname("新淘家园日志分类");
			result.put("class", clazz);
		} else if ("search".equals(widget.getType().getName())) {
			T_ItemCat cat = new T_ItemCat();
			cat.setCid("50005700");
			cat.setName("品牌手表/流行手表");
			ItempropsGetRequest propsRequest = new ItempropsGetRequest();
			propsRequest
					.setFields(TaobaoFetchUtil.TAOBAOITEMCATITEMPROP_FIELDS);
			propsRequest.setCid(50005700L);
			if (props == null || props.size() == 0) {
				props = TaobaoFetchUtil.getItemProps(EnvManager.getUser()
						.getAppType(), propsRequest);
			}
			if (props != null && props.size() > 0) {
				result.put("itemProps", props);
			}
			result.put("cat", cat);
		} else {
			List<WidgetAttribute> asaList = new ArrayList<WidgetAttribute>();
			createWidgetAttributeList(widget.getA_s(), asaList, "a-s");
			result.put("asa", asaList);

			List<WidgetAttribute> lasList = new ArrayList<WidgetAttribute>();
			createWidgetAttributeList(widget.getL_a_s(), lasList, "l-a-s");
			result.put("las", lasList);

			List<WidgetAttribute> laspList = new ArrayList<WidgetAttribute>();
			createWidgetAttributeList(widget.getL_a_s_p(), laspList, "l-a-s-p");
			result.put("lasp", laspList);

			List<WidgetAttribute> daiList = new ArrayList<WidgetAttribute>();
			createWidgetAttributeList(widget.getD_a_i(), daiList, "d-a-i");
			result.put("dai", daiList);

			List<WidgetAttribute> ldaiList = new ArrayList<WidgetAttribute>();
			createWidgetAttributeList(widget.getL_d_a_i(), ldaiList, "l-d-a-i");
			result.put("ldai", ldaiList);

			List<WidgetAttribute> ldaipList = new ArrayList<WidgetAttribute>();
			createWidgetAttributeList(widget.getL_d_a_i_p(), ldaipList,
					"l-d-a-i-p");
			result.put("ldaip", ldaipList);
		}
	}

	public static void createWidgetAttributeList(Integer count,
			List<WidgetAttribute> asaList, String type) {
		WidgetAttribute attr = null;
		if (count == null) {
			count = 0;
		}
		for (int i = 0; i < count; i++) {
			attr = new WidgetAttribute();
			attr.setDescription("描述");
			attr.setPicUrl("/assets/min/images/nopicture.gif");
			attr.setClickUrl("");
			attr.setPrice("0");
			attr.setTitle("标题");
			attr.setType(type);
			attr.setVolume("0");
			attr.setLevel("s_crown_1");
			attr.setSeller("卖家昵称");
			asaList.add(attr);
		}
	}

	/**
	 * 充值框组件
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/chongzhi")
	public ModelAndView chongzhi(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("pid", EnvManager.getUser().getPid());
		result.put("layout", request.getParameter("layout"));
		return new ModelAndView("site/admin/widgets/chongzhi", result);
	}

	public void setDesignerService(IDesignerService designerService) {
		this.designerService = designerService;
	}

	public IDesignerService getDesignerService() {
		return designerService;
	}

	/**
	 * @return the fcg
	 */
	public FreeMarkerConfigurer getFcg() {
		return fcg;
	}

	/**
	 * @param fcg
	 *            the fcg to set
	 */
	public void setFcg(FreeMarkerConfigurer fcg) {
		this.fcg = fcg;
	}

	/**
	 * @return the deployZone
	 */
	public IDeployZone getDeployZone() {
		return deployZone;
	}

	/**
	 * @param deployZone
	 *            the deployZone to set
	 */
	public void setDeployZone(IDeployZone deployZone) {
		this.deployZone = deployZone;
	}

	public void setWidgetCustomer(WidgetCustomerMethod widgetCustomer) {
		this.widgetCustomer = widgetCustomer;
	}

	public WidgetCustomerMethod getWidgetCustomer() {
		return widgetCustomer;
	}

	/**
	 * 预览
	 */
	public static final StringBuffer pre_buffer = new StringBuffer();
	{
		try {
			pre_buffer.append(IOUtils.toString(DesignerRest.class
					.getResourceAsStream("preview.ftl"), "UTF-8"));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static final StringBuffer channel_view = new StringBuffer();
	{
		try {
			channel_view.append(IOUtils.toString(DesignerRest.class
					.getResourceAsStream("channelView.ftl"), "UTF-8"));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 默认
	 */
	public static final StringBuffer default_buffer = new StringBuffer();
	{
		try {
			default_buffer.append(IOUtils.toString(DesignerRest.class
					.getResourceAsStream("default.html"), "UTF-8"));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
}
