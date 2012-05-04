package com.wind.site.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.taobao.api.domain.ItemProp;
import com.taobao.api.request.ItempropsGetRequest;
import com.wind.core.exception.SystemException;
import com.wind.site.env.EnvManager;
import com.wind.site.model.CustomeWidget;
import com.wind.site.model.T_ItemCat;
import com.wind.site.model.Widget;
import com.wind.site.service.IDesignerService;
import com.wind.site.util.TaobaoFetchUtil;

@Controller
@RequestMapping("/member/designer/searchdesigner")
public class SearchDesignerRest {
	@Autowired
	private IDesignerService designerService;

	@RequestMapping(value = "/create/{id}")
	public ModelAndView createBlogWidgetDesigner(@PathVariable String id,
			HttpServletRequest request, HttpServletResponse response) {
		Widget widget = designerService.get(Widget.class, id);
		if (widget == null) {
			SystemException.handleMessageException("当前组件模板不存在");
		}
		if (!"search".equals(widget.getType().getName())) {
			SystemException.handleMessageException("当前组件模板非搜索型组件");
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("widget", widget);
		result.put("cats", EnvManager.getRootCats());
		result.put("designer", "create");
		return new ModelAndView("designer/searchdesigner", result);
	}

	@RequestMapping(value = "/update/{cwid}")
	public ModelAndView updateSearchWidgetDesigner(@PathVariable String cwid,
			HttpServletRequest request, HttpServletResponse response) {
		CustomeWidget widget = designerService.get(CustomeWidget.class, cwid);
		if (widget == null) {
			SystemException.handleMessageException("当前自定义组件不存在");
		}
		if (!"search".equals(widget.getWidget().getType().getName())) {
			SystemException.handleMessageException("当前组件非搜索型组件");
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("cwidget", widget);
		result.put("widget", widget.getWidget());
		result.put("cats", EnvManager.getRootCats());
		result.put("designer", "update");
		return new ModelAndView("designer/searchdesigner", result);
	}

	@RequestMapping(value = "/cat/{cid}")
	public ModelAndView cat(@PathVariable String cid,
			HttpServletRequest request, HttpServletResponse response) {
		String template = request.getParameter("template");
		if (StringUtils.isEmpty(template)) {
			SystemException.handleMessageException("未指定搜索组件系统模板");
		}
		T_ItemCat cat = designerService.findByCriterion(T_ItemCat.class, R.eq(
				"cid", cid));

		if (cat == null) {
			SystemException.handleMessageException("指定分类不存在");
		}
		Map<String, Object> result = new HashMap<String, Object>();
		ItempropsGetRequest propsRequest = new ItempropsGetRequest();
		propsRequest.setFields(TaobaoFetchUtil.TAOBAOITEMCATITEMPROP_FIELDS);
		propsRequest.setCid(Long.parseLong(cid));
		List<ItemProp> propsList = TaobaoFetchUtil.getItemProps(EnvManager
				.getUser().getAppType(), propsRequest);
		if (propsList != null && propsList.size() > 0) {
			result.put("itemProps", propsList);
		}
		result.put("cat", cat);
		return new ModelAndView("site/admin/widgets/" + template, result);
	}

}
