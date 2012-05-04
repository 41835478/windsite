package com.wind.site.module.impl;

import java.util.List;
import java.util.Map;

import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.site.module.IModuleInterceptor;
import com.wind.site.module.IModuleLoad;
import com.wind.site.service.IPageService;

import freemarker.template.Template;

/**
 * 模块辅助类（根据参数加载各模块）
 * 
 * @author fxy
 * 
 */
public class DefaultModuleLoad implements IModuleLoad {

	private IPageService pageService;

	private FreeMarkerConfigurer fcg;
	/**
	 * 模块拦截器序列
	 */
	private List<IModuleInterceptor> interceptors;

	@Override
	public String getModule(String module, Map<String, Object> params) {
		try {
			for (IModuleInterceptor interceptor : interceptors) {
				if (interceptor.support(module))
					interceptor.before(pageService, params);
			}
			Template template = fcg.getConfiguration().getTemplate(
					"assets/js/page/module/" + module + ".ftl");
			template.setEncoding("UTF-8");
			String result = FreeMarkerTemplateUtils.processTemplateIntoString(
					template, params);
			for (IModuleInterceptor interceptor : interceptors) {
				if (interceptor.support(module))
					result = interceptor.after(pageService, params, result);
			}
			return result;
		} catch (Exception e) {
			Boolean isDesigner = (Boolean) params.get("isDesigner");
			if (isDesigner) {
				return "模块【" + params.get("title") + "】数据加载错误，请尝试重新刷新页面："
						+ e.getMessage();
			}
			return "";
		}
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
	 * @return the interceptors
	 */
	public List<IModuleInterceptor> getInterceptors() {
		return interceptors;
	}

	/**
	 * @param interceptors
	 *            the interceptors to set
	 */
	public void setInterceptors(List<IModuleInterceptor> interceptors) {
		this.interceptors = interceptors;
	}

}
