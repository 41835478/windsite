package com.wind.site.command.impl;

import java.util.Set;

import com.wind.site.command.ICommand;
import com.wind.site.model.ADModuleItem;
import com.wind.site.model.UserPage;
import com.wind.site.service.ICommandService;

/**
 * 保存模块商品推广记录
 * 
 * @author fxy
 * 
 */
public class ADModuleItemCommand implements ICommand {
	/**
	 * 推广集合
	 */
	private Set<ADModuleItem> items;
	/**
	 * 所在页面
	 */
	private String page;
	/**
	 * 模块ID
	 */
	private Long moduleId;
	/**
	 * 域名
	 */
	private String www;

	@Override
	public void execute(ICommandService service) {
		if (items == null || items.size() == 1) {
			return;
		}
		UserPage uPage = service.get(UserPage.class, page);
		if (uPage != null) {// 如果是自定义页面
			String url = "http://" + www;
			if (uPage.getIsIndex()) {
				url += "#M" + moduleId;
			} else {
				url += "/pages/" + uPage.getPageid() + ".html#M" + moduleId;
			}
			for (ADModuleItem item : items) {
				item.setUrl(url);// 填充地址
			}
			service.synADModuleItem(moduleId, items);
			// 清理数据
			items.clear();
			items = null;
		}
	}

	/**
	 * @return the items
	 */
	public Set<ADModuleItem> getItems() {
		return items;
	}

	/**
	 * @param items
	 *            the items to set
	 */
	public void setItems(Set<ADModuleItem> items) {
		this.items = items;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getPage() {
		return page;
	}

	public void setModuleId(Long moduleId) {
		this.moduleId = moduleId;
	}

	public Long getModuleId() {
		return moduleId;
	}

	public void setWww(String www) {
		this.www = www;
	}

	public String getWww() {
		return www;
	}

}
