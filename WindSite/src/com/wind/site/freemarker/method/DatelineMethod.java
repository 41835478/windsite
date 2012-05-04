package com.wind.site.freemarker.method;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.wind.core.util.DateUtils;

import freemarker.template.TemplateMethodModel;
import freemarker.template.TemplateModelException;

/**
 * 时间转换
 * 
 * @author fxy
 * 
 */
public class DatelineMethod implements TemplateMethodModel {

	@SuppressWarnings("unchecked")
	@Override
	public Object exec(List args) throws TemplateModelException {
		String format = DateUtils.yyyy_MM_DD_HH_MM_SS;
		if (args.size() == 2) {
			format = (String) args.get(1);
		}
		return DateUtils.format(new Date(
				Long.parseLong((String) args.get(0)) * 1000), format);
	}

	public static void main(String[] args) {
		List<String> list = new ArrayList<String>();
		Calendar calendar = Calendar.getInstance();
		calendar.set(2010, 6, 4, 12, 51, 48);
		System.out.println("测试：" + calendar.getTime().getTime() / 1000);
		list.add("1278219108");
		try {
			System.out.println(new DatelineMethod().exec(list));
		} catch (TemplateModelException e) {
			e.printStackTrace();
		}
	}
}
