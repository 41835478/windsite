package com.wind.site.freemarker.method;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.util.HtmlUtils;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import com.wind.site.model.PageModule;
import com.wind.site.module.IModuleLoad;
import com.wind.site.service.IPageService;
import com.wind.site.util.WindSiteRestUtil;

import freemarker.template.TemplateMethodModel;
import freemarker.template.TemplateModelException;

/**
 * 模块加载类
 * 
 * @author fxy
 * 
 */
public class ModuleMethod implements TemplateMethodModel {
	private IModuleLoad moduleLoad;

	private IPageService pageService;

	/**
	 * 加同步锁（观察是否可解决部分站点部分模块混乱的现象）
	 */
	@SuppressWarnings("unchecked")
	@Override
	public synchronized Object exec(List arguments)
			throws TemplateModelException {
		if (arguments.size() == 4) {
			Long id = Long.valueOf(String.valueOf(arguments.get(0)));
			String nick = String.valueOf(arguments.get(1));
			String pid = String.valueOf(arguments.get(2));
			Boolean isDesigner = "false".equals(String
					.valueOf(arguments.get(3))) ? false : true;
			PageModule module = pageService.get(PageModule.class, id);
			if (module == null) {
				return "<div class=\"box J_TBox ks-clear\">当前指定模块已被删除"
						+ (isDesigner ? ",点击<a class=\"J_PageFixed\" onclick=\"$('#fixed-dialog').dialog('open');\">修复</a>"
								: "") + "</div>";
			}
			String name = module.getName();
			String metadata = "";
			if (module != null) {
				metadata = module.getMetadata();
			}
			Map<String, Object> params = new HashMap<String, Object>();
			if (StringUtils.isNotEmpty(metadata)) {
				params = new Gson().fromJson(metadata,
						new TypeToken<Map<String, String>>() {
						}.getType());// 解析参数列表
			}
			params.put("MODULEID", module.getId());// 当前模块标识
			params.put("PAGEID", module.getPage());// 页面标识
			params.put("MODULE", name);// 当前模块名称
			params.put("nick", nick);// 淘宝昵称
			params.put("pid", pid);// 额外参数PID
			params.put("title", module.getTitle());// 额外参数TITLE
			params.put("isDesigner", isDesigner);// 额外参数是否设计模式
			params.put("SITEIMPL", WindSiteRestUtil.getSiteImpl(pageService,
					module.getUser_id()));// 用户参数
			if (params.containsKey("bd")) {// 解码HTML内容
				String bd = String.valueOf(params.get("bd"));
				if (StringUtils.isNotEmpty(bd))
					params.put("bd", HtmlUtils.htmlUnescape(bd));
			}
			String moduleContent = "";
			if ("shopUser".equalsIgnoreCase(name)) {// 自定义模块
				moduleContent = moduleLoad.getModule("user/"
						+ module.getUserModule(), params);
			} else {// 基础模块
				moduleContent = moduleLoad.getModule(name.substring(0, 1)
						.toUpperCase()
						+ name.substring(1), params);
			}
			// 动态执行模块加载方法
			if (isDesigner) {// 如果是设计器中使用，则设置标识和配置
				return "<div name=\"" + name
						+ "\" class=\"box J_TBox ks-clear\" data-id=\"" + id
						+ "\" metadata=\"" + convertMetadata(params) + "\">"
						+ moduleContent + "</div>";
			} else {// 如果是发布最终内容
				return "<div id=\"M"
						+ id
						+ "\" name=\""
						+ name
						+ "\" class=\"box J_TBox ks-clear\" data-id=\""
						+ id
						+ "\" "
						+ (StringUtils.isNotEmpty(moduleContent)
								&& moduleContent.startsWith("模块") ? (" data-error=\"true\" ")// 如果模块加载失败，则添加错误标识
								: "") + ">" + moduleContent + "</div>";
			}

		}
		return null;
	}

	public String convertMetadata(Map<String, Object> params) {
		params.remove("bd");// 删除内容属性
		params.remove("title");// 删除模块标题
		params.remove("pid");// 删除PID
		params.remove("nick");// 删除昵称
		params.remove("isDesigner");// 删除设计器标识
		params.remove("data");// 数据
		params.remove("moreUrl");// 更多URL
		params.remove("SITEIMPL");// 全局站点环境
		params.remove("MODULE");// 当前模块名称
		params.remove("MODULEID");// 当前模块标识
		params.remove("PAGEID");// 当前页面标识
		params.remove("extra");// 扩展字段
		return convertMap(params).toString().replaceAll("\"", "'");
	}

	@SuppressWarnings("unchecked")
	private static JsonObject convertMap(Map<String, Object> params) {
		JsonObject json = new JsonObject();
		for (Entry<String, Object> entry : params.entrySet()) {// 解析Map对象
			if (entry.getValue() instanceof Map) {
				json.addProperty(entry.getKey(), convertMap(
						(Map<String, Object>) entry.getValue()).toString());
			} else if (entry.getValue() instanceof List) {// 解析列表对象
				List<Object> list = (List<Object>) entry.getValue();
				if (list != null && list.size() > 0) {
					for (Object obj : list) {
						if (obj instanceof Map) {
							json.addProperty(entry.getKey(), convertMap(
									(Map<String, Object>) obj).toString());
						} else {
							json.addProperty(entry.getKey(), String
									.valueOf(entry.getValue()));
						}
					}
				}
			} else {// 其他
				json.addProperty(entry.getKey(), String.valueOf(entry
						.getValue()));
			}
		}
		return json;
	}

	/**
	 * @return the moduleLoad
	 */
	public IModuleLoad getModuleLoad() {
		return moduleLoad;
	}

	/**
	 * @param moduleLoad
	 *            the moduleLoad to set
	 */
	public void setModuleLoad(IModuleLoad moduleLoad) {
		this.moduleLoad = moduleLoad;
	}

	/**
	 * @return the pageService
	 */
	public IPageService getPageService() {
		return pageService;
	}

	/**
	 * @param pageService
	 *            the pageService to set
	 */
	public void setPageService(IPageService pageService) {
		this.pageService = pageService;
	}

}
