package com.wind.site.rest;

import java.io.IOException;
import java.io.StringReader;
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
import com.wind.site.freemarker.method.WidgetCustomerMethod;
import com.wind.site.model.CustomeWidget;
import com.wind.site.model.T_ItemCat;
import com.wind.site.model.Widget;
import com.wind.site.service.IDesignerService;
import com.wind.site.service.IMemberService;
import com.wind.site.util.WidgetUtil;

import freemarker.template.Template;

@Controller
@RequestMapping("/member/designer/htmldesigner")
public class HtmlDesignerRest {
	@Autowired
	private IDesignerService designerService;
	@Autowired
	private IMemberService memberService;
	@Autowired
	private FreeMarkerConfigurer fcg;

	@Autowired
	private IDeployZone deployZone;
	@Autowired
	private WidgetCustomerMethod widgetCustomer;

	@RequestMapping(value = "/code/{id}")
	public ModelAndView getAdsWidgetHtml(@PathVariable String id,
			HttpServletRequest request, HttpServletResponse response) {
		CustomeWidget widget = designerService.get(CustomeWidget.class, id);
		if (widget == null) {
			SystemException.handleMessageException("当前自定义组件不存在");
		}
		if (!"html".equals(widget.getWidget().getType().getName())) {
			SystemException.handleMessageException("当前组件不支持代码输出");
		}
		String content = WidgetUtil.convertContentOuter(widget, fcg);
		widget.setContent(content.replaceAll(REGEX, "").replaceAll(REGEX1, ""));
		widget.setTbContent(WidgetUtil.outCodeContent(widget, fcg));
		return new ModelAndView("site/member/widget/htmlWidget", "widget",
				widget);
	}

	@RequestMapping(value = "/create/{id}")
	public ModelAndView createBlogWidgetDesigner(@PathVariable String id,
			HttpServletRequest request, HttpServletResponse response) {
		Widget widget = designerService.get(Widget.class, id);
		if (widget == null) {
			SystemException.handleMessageException("当前组件模板不存在");
		}
		if (!"html".equals(widget.getType().getName())) {
			SystemException.handleMessageException("当前组件模板非标准组件");
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("widget", widget);

		result.put("cats", EnvManager.getRootCats());
		result.put("totalWords", EnvManager.getTotalWords());
		result.put("designer", "create");
		result.put("activities", EnvManager.getActivities());
		result.put("channels", EnvManager.getChannels());
		return new ModelAndView("designer/htmldesigner", result);
	}

	@RequestMapping(value = "/update/{cwid}")
	public ModelAndView updateBlogWidgetDesigner(@PathVariable String cwid,
			HttpServletRequest request, HttpServletResponse response) {
		CustomeWidget widget = designerService.get(CustomeWidget.class, cwid);
		if (widget == null) {
			SystemException.handleMessageException("当前自定义组件不存在");
		}
		if (!"html".equals(widget.getWidget().getType().getName())) {
			SystemException.handleMessageException("当前组件非标准组件");
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("cwidget", widget);
		result.put("widget", widget.getWidget());
		try {
			Template template = new Template(EnvManager.getUser().getId() + "_"
					+ cwid, new StringReader(widget.getContent()), fcg
					.getConfiguration());
			Map<String, Object> maps = new HashMap<String, Object>();
			maps.put("pid", EnvManager.getUser().getPid());
			maps.put("spid", EnvManager.getUser().getPid()
					.replaceAll("mm_", "").replaceAll("_0_0", ""));
			maps.put("siteurl", "");
			widget.setContent(FreeMarkerTemplateUtils
					.processTemplateIntoString(template, maps));// 转换组件内容
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}
		result.put("cats", EnvManager.getRootCats());
		result.put("totalWords", EnvManager.getTotalWords());
		result.put("designer", "update");
		result.put("activities", EnvManager.getActivities());
		result.put("channels", EnvManager.getChannels());
		return new ModelAndView("designer/htmldesigner", result);
	}

	@RequestMapping(value = "/widget/{wid}", method = RequestMethod.GET)
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

	/**
	 * 新增HTML标准组件
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
		if (!"html".equals(widget.getType().getName())) {
			SystemException.handleMessageException("当前组件模板非标准组件");
		}
		String title = request.getParameter("title");
		String cid = request.getParameter("cid");
		String friend = request.getParameter("friend");
		String color = request.getParameter("color");
		String description = request.getParameter("desc");
		String content = request.getParameter("content");
		String tbContent = request.getParameter("tbContent");
		if (StringUtils.isEmpty(content) || StringUtils.isEmpty(tbContent)) {
			SystemException.handleMessageException("组件内容为空！");
		} else {
			content = content.replaceAll(EnvManager.getUser().getPid(),
					"\\${pid}").replaceAll(JQUERY_REGEX, "");
			tbContent = tbContent.replaceAll(EnvManager.getUser().getPid(),
					"\\${pid}").replaceAll(REGEX, "").replaceAll(REGEX1, "");
		}
		CustomeWidget cw = new CustomeWidget();
		T_ItemCat cat = designerService.findByCriterion(T_ItemCat.class, R.eq(
				"cid", cid));
		if (cat != null) {
			cw.setCat(cat);
		}
		if (StringUtils.isNotEmpty(description)) {
			cw.setDescription(description);
		}
		cw.setContent(content);
		cw.setTbContent(tbContent);
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
	 * 更新HTML标准组件
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
		if (!"html".equals(cw.getWidget().getType().getName())) {
			SystemException.handleMessageException("当前组件非标准组件");
		}
		String title = request.getParameter("title");
		String cid = request.getParameter("cid");
		String friend = request.getParameter("friend");
		String color = request.getParameter("color");
		String description = request.getParameter("desc");
		String content = request.getParameter("content");
		String tbContent = request.getParameter("tbContent");
		if (StringUtils.isEmpty(content) || StringUtils.isEmpty(tbContent)) {
			SystemException.handleMessageException("组件内容为空！");
		} else {
			content = content.replaceAll(EnvManager.getUser().getPid(),
					"\\${pid}").replaceAll(JQUERY_REGEX, "");
			tbContent = tbContent.replaceAll(EnvManager.getUser().getPid(),
					"\\${pid}").replaceAll(REGEX, "").replaceAll(REGEX1, "");
		}
		T_ItemCat cat = designerService.findByCriterion(T_ItemCat.class, R.eq(
				"cid", cid));
		if (cat != null) {
			cw.setCat(cat);
		}
		if (StringUtils.isNotEmpty(description)) {
			cw.setDescription(description);
		}

		cw.setContent(content);
		cw.setTbContent(tbContent);
		cw.setFriend(Integer.parseInt(friend));
		cw.setColor(Integer.parseInt(color));
		cw.setName(title);
		cw.setWidgetUpdated(new Date());
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

	public static final String REGEX = "\\s*(class|pw|ph|co|cr|nid|sid|nk|tbc|sizset|sizcache)=\"[^\"]*\"";
	public static final String REGEX1 = "\\s*(class|pw|ph|co|cr|nid|sid|nk|tbc|sizset|sizcache)=[^\\s]*";
	public static final String JQUERY_REGEX = "\\s*(sizset|sizcache)=\"[^\"]*\"";

	public static void main(String[] args) {
		String s = "<div style=\"width:310px;\" sizset=\"1\" sizcache=\"11\" class=price cr>"
				+ "<ul class=\"custome-edit ui-sortable\" style=\"margin:0px;padding:0px;list-style:none;\">"
				+ "<li style=\"margin:0px;padding:0px;\" class=\"l-d-a-i-p\" pw=\"80\" ph=\"80\" co=\"\" cr=\"10.06\" nid=\"\" sid=\"57301396\" nk=\"波若兰内衣旗舰店\">"
				+ "<table cellpadding=\"0\" cellspacing=\"0\" bgcolor=\"#FFFFFF\" style=\"width: 290px; border: 1px solid #E6E6E6;\">"
				+ "<tbody><tr>"
				+ "<td rowspan=\"2\" align=\"center\">"
				+ "<div style=\"width:80px;height:80px;\"><a href=\"http://s.click.taobao.com/t_8?e=7HZ5x%2BOzdZdDFWkkTXCPV3r%2Bvpv1crOBYtNku7E9eub8MGb%2ByRgPqpnUB1%2F0WWbEYg%3D%3D&amp;c=0b1a36b2053d9a34b48e7d508109b33d&amp;p=${pid}&amp;n=19&amp;u=12034285xintao003\" target=\"_blank\" title=\"波若兰内衣旗舰店\" tbc=\"\"><img src=\"http://s.yijia.com/taobao/i/no_shop.gif\" alt=\"波若兰内衣旗舰店\" width=\"80px\" height=\"80px\" title=\"波若兰内衣旗舰店\"></a></div>"
				+ "</td>"
				+ "<td colspan=\"2\"><a class=\"title\" style=\"height: 40px; width: 210px; margin: 5px; color: #0000FF;overflow: hidden;\" href=\"http://s.click.taobao.com/t_8?e=7HZ5x%2BOzdZdDFWkkTXCPV3r%2Bvpv1crOBYtNku7E9eub8MGb%2ByRgPqpnUB1%2F0WWbEYg%3D%3D&amp;c=0b1a36b2053d9a34b48e7d508109b33d&amp;p=${pid}&amp;n=19&amp;u=12034285xintao003\" target=\"_blank\" title=\"波若兰内衣旗舰店\" tbc=\"\"><span style=\"width: 210px;cursor: pointer;display: inline-block;font-size: 12px;text-align:left;overflow: hidden;white-space: normal;\">波若兰内衣旗舰店</span></a></td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td nowrap=\"nowrap\"><span class=\"price\" style=\"font-weight: 600; margin: 5px; line-height: 30px; color: #CC0000; cursor: pointer;display: inline-block;font-size: 12px;overflow: hidden;white-space: normal;text-align:left;\">10</span>元</td>"
				+ "<td nowrap=\"nowrap\" width=\"100px\"><a class=\"title\" target=\"_blank\" href=\"http://s.click.taobao.com/t_8?e=7HZ5x%2BOzdZdDFWkkTXCPV3r%2Bvpv1crOBYtNku7E9eub8MGb%2ByRgPqpnUB1%2F0WWbEYg%3D%3D&amp;c=0b1a36b2053d9a34b48e7d508109b33d&amp;p=${pid}&amp;n=19&amp;u=12034285xintao003\" title=\"波若兰内衣旗舰店\" tbc=\"\"><img src=\"http://www.xintaonet.com/assets/min/images/custome/fgetccode_btn.gif\"></a></td>"
				+ "</tr>"
				+ "</tbody></table>"
				+ "</li><li style=\"margin:0px;padding:0px;\" class=\"l-d-a-i-p\" pw=\"80\" ph=\"80\" co=\"\" cr=\"10.06\" nid=\"\" sid=\"57301396\" nk=\"波若兰内衣旗舰店\">"
				+ "<table cellpadding=\"0\" cellspacing=\"0\" bgcolor=\"#FFFFFF\" style=\"width: 290px; border: 1px solid #E6E6E6;\">"
				+ "<tbody><tr>"
				+ "<td rowspan=\"2\" align=\"center\">"
				+ "<div style=\"width:80px;height:80px;\"><a href=\"http://s.click.taobao.com/t_8?e=7HZ5x%2BOzdZdDFWkkTXCPV3r%2Bvpv1crOBYtNku7E9eub8MGb%2ByRgPqpnUB1%2F0WWbEYg%3D%3D&amp;c=0b1a36b2053d9a34b48e7d508109b33d&amp;p=${pid}&amp;n=19&amp;u=12034285xintao003\" target=\"_blank\" title=\"波若兰内衣旗舰店\" tbc=\"\"><img src=\"http://s.yijia.com/taobao/i/no_shop.gif\" alt=\"波若兰内衣旗舰店\" width=\"80px\" height=\"80px\" title=\"波若兰内衣旗舰店\"></a></div>"
				+ "</td>"
				+ "<td colspan=\"2\"><a class=\"title\" style=\"height: 40px; width: 210px; margin: 5px; color: #0000FF;overflow: hidden;\" href=\"http://s.click.taobao.com/t_8?e=7HZ5x%2BOzdZdDFWkkTXCPV3r%2Bvpv1crOBYtNku7E9eub8MGb%2ByRgPqpnUB1%2F0WWbEYg%3D%3D&amp;c=0b1a36b2053d9a34b48e7d508109b33d&amp;p=${pid}&amp;n=19&amp;u=12034285xintao003\" target=\"_blank\" title=\"波若兰内衣旗舰店\" tbc=\"\"><span style=\"width: 210px;cursor: pointer;display: inline-block;font-size: 12px;text-align:left;overflow: hidden;white-space: normal;\">波若兰内衣旗舰店</span></a></td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td nowrap=\"nowrap\"><span class=\"price\" style=\"font-weight: 600; margin: 5px; line-height: 30px; color: #CC0000; cursor: pointer;display: inline-block;font-size: 12px;overflow: hidden;white-space: normal;text-align:left;\">20</span>元</td>"
				+ "<td nowrap=\"nowrap\" width=\"100px\"><a class=\"title\" target=\"_blank\" href=\"http://s.click.taobao.com/t_8?e=7HZ5x%2BOzdZdDFWkkTXCPV3r%2Bvpv1crOBYtNku7E9eub8MGb%2ByRgPqpnUB1%2F0WWbEYg%3D%3D&amp;c=0b1a36b2053d9a34b48e7d508109b33d&amp;p=${pid}&amp;n=19&amp;u=12034285xintao003\" title=\"波若兰内衣旗舰店\" tbc=\"\"><img src=\"http://www.xintaonet.com/assets/min/images/custome/fgetccode_btn.gif\"></a></td>"
				+ "</tr>"
				+ "</tbody></table>"
				+ "</li><li style=\"margin:0px;padding:0px;\" class=\"l-d-a-i-p\" pw=\"80\" ph=\"80\" co=\"\" cr=\"10.83\" nid=\"\" sid=\"57299437\" nk=\"sevnjoen66旗舰店\">"
				+ "<table cellpadding=\"0\" cellspacing=\"0\" bgcolor=\"#FFFFFF\" style=\"width: 290px; border: 1px solid #E6E6E6;\">"
				+ "<tbody><tr>"
				+ "<td rowspan=\"2\" align=\"center\">"
				+ "<div style=\"width:80px;height:80px;\"><a href=\"http://s.click.taobao.com/t_8?e=7HZ5x%2BOzffaUQfaChv8H7zqVHtdWsi%2FYOx9lQVAcqJwnmqAsgGanzoIdTI9jHywT&amp;c=b34efac8d2c731a61b57be6f34d7b96a&amp;p=${pid}&amp;n=19&amp;u=12034285xintao003\" target=\"_blank\" title=\"sevnjoen旗舰店\" tbc=\"\"><img src=\"http://s.yijia.com/taobao/i/no_shop.gif\" alt=\"sevnjoen旗舰店\" width=\"80px\" height=\"80px\" title=\"sevnjoen旗舰店\"></a></div>"
				+ "</td>"
				+ "<td colspan=\"2\"><a class=\"title\" style=\"height: 40px; width: 210px; margin: 5px; color: #0000FF;overflow: hidden;\" href=\"http://s.click.taobao.com/t_8?e=7HZ5x%2BOzffaUQfaChv8H7zqVHtdWsi%2FYOx9lQVAcqJwnmqAsgGanzoIdTI9jHywT&amp;c=b34efac8d2c731a61b57be6f34d7b96a&amp;p=${pid}&amp;n=19&amp;u=12034285xintao003\" target=\"_blank\" title=\"sevnjoen旗舰店\" tbc=\"\"><span style=\"width: 210px;cursor: pointer;display: inline-block;font-size: 12px;text-align:left;overflow: hidden;white-space: normal;\">sevnjoen旗舰店</span></a></td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td nowrap=\"nowrap\"><span class=\"price\" style=\"font-weight: 600; margin: 5px; line-height: 30px; color: #CC0000; cursor: pointer;display: inline-block;font-size: 12px;overflow: hidden;white-space: normal;text-align:left;\">30</span>元</td>"
				+ "<td nowrap=\"nowrap\" width=\"100px\"><a class=\"title\" target=\"_blank\" href=\"http://s.click.taobao.com/t_8?e=7HZ5x%2BOzffaUQfaChv8H7zqVHtdWsi%2FYOx9lQVAcqJwnmqAsgGanzoIdTI9jHywT&amp;c=b34efac8d2c731a61b57be6f34d7b96a&amp;p=${pid}&amp;n=19&amp;u=12034285xintao003\" title=\"sevnjoen旗舰店\" tbc=\"\"><img src=\"http://www.xintaonet.com/assets/min/images/custome/fgetccode_btn.gif\"></a></td>"
				+ "</tr>"
				+ "</tbody></table>"
				+ "</li><li style=\"margin:0px;padding:0px;\" class=\"l-d-a-i-p\" pw=\"80\" ph=\"80\" co=\"\" cr=\"1.55\" nid=\"\" sid=\"57299665\" nk=\"子牧旗舰店\">"
				+ "<table cellpadding=\"0\" cellspacing=\"0\" bgcolor=\"#FFFFFF\" style=\"width: 290px; border: 1px solid #E6E6E6;\">"
				+ "<tbody><tr>"
				+ "<td rowspan=\"2\" align=\"center\">"
				+ "<div style=\"width:80px;height:80px;\"><a href=\"http://s.click.taobao.com/t_8?e=7HZ5x%2BOzffW8FLSpmsxHEf2qoB84I3WWViFY9J8kNoUsTLmPh5n0SL2TsoYOgOBp&amp;c=9a7816b5f4b698bff078619321adf6ab&amp;p=${pid}&amp;n=19&amp;u=12034285xintao003\" target=\"_blank\" title=\"子牧旗舰店\" tbc=\"\"><img src=\"http://logo.taobao.com/shop-logo/66/2d/T1CZFtXjBsXXb1upjX.jpg\" alt=\"子牧旗舰店\" width=\"80px\" height=\"80px\" title=\"子牧旗舰店\"></a></div>"
				+ "</td>"
				+ "<td colspan=\"2\"><a class=\"title\" style=\"height: 40px; width: 210px; margin: 5px; color: #0000FF;overflow: hidden;\" href=\"http://s.click.taobao.com/t_8?e=7HZ5x%2BOzffW8FLSpmsxHEf2qoB84I3WWViFY9J8kNoUsTLmPh5n0SL2TsoYOgOBp&amp;c=9a7816b5f4b698bff078619321adf6ab&amp;p=${pid}&amp;n=19&amp;u=12034285xintao003\" target=\"_blank\" title=\"子牧旗舰店\" tbc=\"\"><span style=\"width: 210px;cursor: pointer;display: inline-block;font-size: 12px;text-align:left;overflow: hidden;white-space: normal;\">子牧旗舰店</span></a></td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td nowrap=\"nowrap\"><span class=\"price\" style=\"font-weight: 600; margin: 5px; line-height: 30px; color: #CC0000; cursor: pointer;display: inline-block;font-size: 12px;overflow: hidden;white-space: normal;text-align:left;\">40</span>元</td>"
				+ "<td nowrap=\"nowrap\" width=\"100px\"><a class=\"title\" target=\"_blank\" href=\"http://s.click.taobao.com/t_8?e=7HZ5x%2BOzffW8FLSpmsxHEf2qoB84I3WWViFY9J8kNoUsTLmPh5n0SL2TsoYOgOBp&amp;c=9a7816b5f4b698bff078619321adf6ab&amp;p=${pid}&amp;n=19&amp;u=12034285xintao003\" title=\"子牧旗舰店\" tbc=\"\"><img src=\"http://www.xintaonet.com/assets/min/images/custome/fgetccode_btn.gif\"></a></td>"
				+ "</tr>"
				+ "</tbody></table>"
				+ "</li><li style=\"margin:0px;padding:0px;\" class=\"l-d-a-i-p\" pw=\"80\" ph=\"80\" co=\"\" cr=\"1.76\" nid=\"\" sid=\"57300596\" nk=\"jbonly旗舰店\">"
				+ "<table cellpadding=\"0\" cellspacing=\"0\" bgcolor=\"#FFFFFF\" style=\"width: 290px; border: 1px solid #E6E6E6;\">"
				+ "<tbody><tr>"
				+ "<td rowspan=\"2\" align=\"center\">"
				+ "<div style=\"width:80px;height:80px;\"><a href=\"http://s.click.taobao.com/t_8?e=7HZ5x%2BOzdZRBcTCn2kiZ64ESq5u3GYD1lMLsbFpblGgcYlmE5J3SBvBfPli2QQDNTg%3D%3D&amp;c=5747745f2f8d2d72a63c7858d22e40ae&amp;p=${pid}&amp;n=19&amp;u=12034285xintao003\" target=\"_blank\" title=\"jbonly旗舰店\" tbc=\"\"><img src=\"http://logo.taobao.com/shop-logo/d5/d7/T1dR0vXgNNXXartXjX.gif\" alt=\"jbonly旗舰店\" width=\"80px\" height=\"80px\" title=\"jbonly旗舰店\"></a></div>"
				+ "</td>"
				+ "<td colspan=\"2\"><a class=\"title\" style=\"height: 40px; width: 210px; margin: 5px; color: #0000FF;overflow: hidden;\" href=\"http://s.click.taobao.com/t_8?e=7HZ5x%2BOzdZRBcTCn2kiZ64ESq5u3GYD1lMLsbFpblGgcYlmE5J3SBvBfPli2QQDNTg%3D%3D&amp;c=5747745f2f8d2d72a63c7858d22e40ae&amp;p=${pid}&amp;n=19&amp;u=12034285xintao003\" target=\"_blank\" title=\"jbonly旗舰店\" tbc=\"\"><span style=\"width: 210px;cursor: pointer;display: inline-block;font-size: 12px;text-align:left;overflow: hidden;white-space: normal;\">jbonly旗舰店</span></a></td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td nowrap=\"nowrap\"><span class=\"price\" style=\"font-weight: 600; margin: 5px; line-height: 30px; color: #CC0000; cursor: pointer;display: inline-block;font-size: 12px;overflow: hidden;white-space: normal;text-align:left;\">50</span>元</td>"
				+ "<td nowrap=\"nowrap\" width=\"100px\"><a class=\"title\" target=\"_blank\" href=\"http://s.click.taobao.com/t_8?e=7HZ5x%2BOzdZRBcTCn2kiZ64ESq5u3GYD1lMLsbFpblGgcYlmE5J3SBvBfPli2QQDNTg%3D%3D&amp;c=5747745f2f8d2d72a63c7858d22e40ae&amp;p=${pid}&amp;n=19&amp;u=12034285xintao003\" title=\"jbonly旗舰店\" tbc=\"\"><img src=\"http://www.xintaonet.com/assets/min/images/custome/fgetccode_btn.gif\"></a></td>"
				+ "</tr>" + "</tbody></table>" + "</li>" + "</ul>" + "</div>";
		System.out.println(s.replaceAll(REGEX, "").replaceAll(REGEX1, ""));
	}
}
