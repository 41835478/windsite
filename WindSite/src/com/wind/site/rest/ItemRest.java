package com.wind.site.rest;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.wind.site.model.T_TaobaokeItem;
import com.wind.site.service.IItemService;

@Controller
@RequestMapping("/item")
public class ItemRest {
	@Autowired
	private IItemService itemService;

	/**
	 * 会员普通功能通用视图访问
	 * 
	 * @param view
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/detail/{type}/{id}", method = RequestMethod.GET)
	public ModelAndView memberView(@PathVariable String id,
			@PathVariable String type, HttpServletRequest request,
			HttpServletResponse response) {
		T_TaobaokeItem item = itemService.get(T_TaobaokeItem.class, id);
		Map<String, Object> result = new HashMap<String, Object>();
		List<T_TaobaokeItem> items = new ArrayList<T_TaobaokeItem>();
		if (item == null) {// 如果商品不存在
			// items = itemService.findAllByCriterion(T_TaobaokeItem.class,
			// R.eq(
			// "gid", item.getGid()), R.eq("isValid", true));
			// if (items.size() > 0) {
			// result.put("item", items.get(0));
			// }
			// result.put("items", items);
		} else {
			items = itemService.findAllByCriterion(T_TaobaokeItem.class, R.eq(
					"gid", item.getGid()), R.eq("isValid", true));
			result.put("item", item);
			result.put("items", items);
		}
		if (StringUtils.isEmpty(type)) {
			type = "default";
		}
		return new ModelAndView("item/" + type + "/item", result);
	}

	/**
	 * @return the itemService
	 */
	public IItemService getItemService() {
		return itemService;
	}

	/**
	 * @param itemService
	 *            the itemService to set
	 */
	public void setItemService(IItemService itemService) {
		this.itemService = itemService;
	}

}
