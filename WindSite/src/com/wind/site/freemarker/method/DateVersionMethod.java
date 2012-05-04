package com.wind.site.freemarker.method;

import java.util.Date;
import java.util.List;

import com.wind.core.util.DateUtils;

import freemarker.template.TemplateMethodModel;
import freemarker.template.TemplateModelException;

/**
 * 日期版本
 * 
 * @author fxy
 * 
 */
public class DateVersionMethod implements TemplateMethodModel {

	private String format;

	@SuppressWarnings("unchecked")
	@Override
	public Object exec(List args) throws TemplateModelException {
		return DateUtils.format(new Date(), format);
	}

	public void setFormat(String format) {
		this.format = format;
	}

	public String getFormat() {
		return format;
	}

}
