package com.wind.site.freemarker.method;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import com.wind.core.util.DateUtils;

import freemarker.template.TemplateMethodModel;
import freemarker.template.TemplateModelException;

public class GetTimeMethod implements TemplateMethodModel {

	@SuppressWarnings("unchecked")
	@Override
	public Object exec(List args) throws TemplateModelException {
		if (args.size() != 1) {
			throw new TemplateModelException("时间格式转换参数错误");
		}
		Object obj = args.get(0);
		if (obj != null) {
			try {
				Date date = DateUtils.parseDate((String) obj,
						new String[] { DateUtils.yyyy_MM_DD_HH_MM_SS });
				return date.getTime();
			} catch (ParseException e) {
				e.printStackTrace();
				return null;
			}
		}
		return null;
	}

}
