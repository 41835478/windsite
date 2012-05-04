package com.wind.site.mail;

import java.util.HashMap;
import java.util.Map;

import freemarker.template.Template;

/**
 * HTML邮件
 * 
 * @author fxy
 * 
 */
public abstract class AbstractHtmlWindMailSender extends AbstractWindMailSender {
	/**
	 * FreeMarker
	 */
	protected Template template;
	/**
	 * 参数列表
	 */
	protected Map<String, Object> params;

	/**
	 * @return the template
	 */
	public Template getTemplate() {
		return template;
	}

	/**
	 * @param template
	 *            the template to set
	 */
	public void setTemplate(Template template) {
		this.template = template;
	}

	public AbstractHtmlWindMailSender addParam(String key, Object value) {
		if (params == null) {
			params = new HashMap<String, Object>();
		}
		params.put(key, value);
		return this;
	}

	/**
	 * @return the params
	 */
	public Map<String, Object> getParams() {
		return params;
	}

	/**
	 * @param params
	 *            the params to set
	 */
	public void setParams(Map<String, Object> params) {
		this.params = params;
	}

}
