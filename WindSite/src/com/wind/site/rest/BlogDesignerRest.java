package com.wind.site.rest;

import java.io.Writer;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
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

import com.wind.core.exception.SystemException;
import com.wind.site.command.CommandExecutor;
import com.wind.site.command.impl.UpdateUserTemplateCommand;
import com.wind.site.env.EnvManager;
import com.wind.site.freemarker.IDeployZone;
import com.wind.site.freemarker.method.DatelineMethod;
import com.wind.site.freemarker.method.WidgetCustomerMethod;
import com.wind.site.model.CustomeWidget;
import com.wind.site.model.T_ItemCat;
import com.wind.site.model.Widget;
import com.wind.site.service.IDesignerService;
import com.wind.site.service.IMemberService;
import com.wind.uc.model.UCClass;
import com.wind.uc.service.IUCService;

import freemarker.template.Template;

@Controller
@RequestMapping("/member/designer/blogdesigner")
public class BlogDesignerRest {
	@Autowired
	private IDesignerService designerService;
	@Autowired
	private IMemberService memberService;
	@Autowired
	private FreeMarkerConfigurer fcg;
	@Autowired
	private IUCService ucService;
	@Autowired
	private DatelineMethod dateline;
	@Autowired
	private IDeployZone deployZone;
	@Autowired
	private WidgetCustomerMethod widgetCustomer;

	@RequestMapping(value = "/create/{id}")
	public ModelAndView createBlogWidgetDesigner(@PathVariable String id,
			HttpServletRequest request, HttpServletResponse response) {
		Widget widget = designerService.get(Widget.class, id);
		if (widget == null) {
			SystemException.handleMessageException("当前组件模板不存在");
		}
		if (!"blog".equals(widget.getType().getName())) {
			SystemException.handleMessageException("当前组件模板非软文型组件");
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("widget", widget);

		if (EnvManager.getUser().getUc_id() == null) {
			SystemException.handleMessageException("您尚未激活新淘家园，无法制作软文类型组件");
		}
		result.put("classes", ucService.findAllByCriterion(UCClass.class, R.eq(
				"uid", EnvManager.getUser().getUc_id())));
		result.put("cats", EnvManager.getRootCats());
		result.put("designer", "create");
		return new ModelAndView("designer/blogdesigner", result);
	}

	@RequestMapping(value = "/update/{cwid}")
	public ModelAndView updateBlogWidgetDesigner(@PathVariable String cwid,
			HttpServletRequest request, HttpServletResponse response) {
		CustomeWidget widget = designerService.get(CustomeWidget.class, cwid);
		if (widget == null) {
			SystemException.handleMessageException("当前自定义组件不存在");
		}
		if (!"blog".equals(widget.getWidget().getType().getName())) {
			SystemException.handleMessageException("当前组件非软文型组件");
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("cwidget", widget);
		result.put("widget", widget.getWidget());
		if (EnvManager.getUser().getUc_id() == null) {
			SystemException.handleMessageException("您尚未激活新淘家园，无法制作软文类型组件");
		}
		result.put("classes", ucService.findAllByCriterion(UCClass.class, R.eq(
				"uid", EnvManager.getUser().getUc_id())));
		result.put("cats", EnvManager.getRootCats());
		result.put("designer", "update");
		return new ModelAndView("designer/blogdesigner", result);
	}

	@RequestMapping(value = "/widget/{wid}", method = RequestMethod.GET)
	public void getWidgetHtml(@PathVariable String wid,
			HttpServletRequest request, HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		Widget widget = designerService.get(Widget.class, wid);
		String classid = request.getParameter("classid");
		String bloglength = request.getParameter("bloglength");
		if (widget == null) {
			SystemException.handleMessageException("当前组件模板不存在");
		}
		try {
			Map<String, Object> maps = new HashMap<String, Object>();
			maps.put("dateline", dateline);
			maps.put("uc_id", EnvManager.getUser().getUc_id());
			Template template = ucService.convertBlogWidget(fcg, maps, widget,
					classid, bloglength);
			Writer out = response.getWriter();
			template.process(maps, out);
			out.flush();
			out.close();
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}
	}

	/**
	 * 新增会员软文组件
	 * 
	 * @return
	 */
	@RequestMapping(value = "/widget/create/{wid}", method = RequestMethod.POST)
	@ResponseBody
	public String createWidget(@PathVariable String wid,
			HttpServletRequest request) {
		Widget widget = designerService.get(Widget.class, wid);
		if (widget == null) {
			SystemException.handleMessageException("您当前选择的组件模板不存在！");
		}
		if (!"blog".equals(widget.getType().getName())) {
			SystemException.handleMessageException("当前组件模板非软文型组件");
		}
		String title = request.getParameter("title");
		String cid = request.getParameter("cid");
		String friend = request.getParameter("friend");
		String color = request.getParameter("color");
		String description = request.getParameter("desc");
		String classid = request.getParameter("classid");
		String bloglength = request.getParameter("bloglength");
		CustomeWidget cw = new CustomeWidget();
		T_ItemCat cat = designerService.findByCriterion(T_ItemCat.class, R.eq(
				"cid", cid));
		if (cat != null) {
			cw.setCat(cat);
		}
		if (StringUtils.isNotEmpty(description)) {
			cw.setDescription(description);
		}
		Map<String, Object> maps = new HashMap<String, Object>();
		maps.put("dateline", dateline);
		maps.put("uc_id", EnvManager.getUser().getUc_id());
		Template template = ucService.convertBlogWidget(fcg, maps, widget,
				classid, bloglength);
		try {
			cw.setContent(FreeMarkerTemplateUtils.processTemplateIntoString(
					template, maps));
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}// 转换组件内容
		cw.setClassid(classid);
		cw.setBloglength(bloglength);
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
	 * 更新会员软文组件
	 * 
	 * @return
	 */
	@RequestMapping(value = "/widget/update/{cwid}", method = RequestMethod.POST)
	@ResponseBody
	public String updateWidget(@PathVariable String cwid,
			HttpServletRequest request) {
		CustomeWidget cw = designerService.get(CustomeWidget.class, cwid);
		if (cw == null) {
			SystemException.handleMessageException("您当前选择的自定义组件不存在！");
		}
		if (!cw.getCreatedBy().equals(EnvManager.getUser().getUser_id())) {
			SystemException.handleMessageException("您没有权限修改他人的自定义组件！");
		}
		if (!"blog".equals(cw.getWidget().getType().getName())) {
			SystemException.handleMessageException("当前组件非软文型组件");
		}
		String title = request.getParameter("title");
		String cid = request.getParameter("cid");
		String friend = request.getParameter("friend");
		String color = request.getParameter("color");
		String description = request.getParameter("desc");
		String classid = request.getParameter("classid");
		String bloglength = request.getParameter("bloglength");
		T_ItemCat cat = designerService.findByCriterion(T_ItemCat.class, R.eq(
				"cid", cid));
		if (cat != null) {
			cw.setCat(cat);
		}
		if (StringUtils.isNotEmpty(description)) {
			cw.setDescription(description);
		}
		Map<String, Object> maps = new HashMap<String, Object>();
		maps.put("dateline", dateline);
		maps.put("uc_id", EnvManager.getUser().getUc_id());
		Template template = ucService.convertBlogWidget(fcg, maps, cw
				.getWidget(), classid, bloglength);
		try {
			cw.setContent(FreeMarkerTemplateUtils.processTemplateIntoString(
					template, maps));
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}// 转换组件内容
		cw.setFriend(Integer.parseInt(friend));
		cw.setColor(Integer.parseInt(color));
		cw.setName(title);
		cw.setClassid(classid);
		cw.setBloglength(bloglength);
		//cw.setWidgetUpdated(new Date());不处理软文组件的更新时间（避免超市中经常显示软文）
		designerService.update(cw);
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
}
