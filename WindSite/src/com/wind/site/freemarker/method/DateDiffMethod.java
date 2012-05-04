package com.wind.site.freemarker.method;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import com.wind.core.util.DateUtils;

import freemarker.template.TemplateMethodModel;
import freemarker.template.TemplateModelException;

/**
 * 时间差转换
 * 
 * @author fxy
 * 
 */
public class DateDiffMethod implements TemplateMethodModel {

	@SuppressWarnings("unchecked")
	@Override
	public Object exec(List args) throws TemplateModelException {
		if (args.size() != 1) {
			throw new TemplateModelException("时间格式转换参数错误");
		}
		Object obj = args.get(0);
		if (obj != null) {
			try {
				Date start = DateUtils.parseDate((String) obj,
						new String[] { DateUtils.yyyy_MM_DD_HH_MM_SS });
				Date end = new Date();
				long between = (end.getTime() - start.getTime()) / 1000;// 除以1000是为了转换成秒
				long day = between / (24 * 3600);
				long hour = between % (24 * 3600) / 3600;
				long minute = between % 3600 / 60;
				long second = between % 60 / 60;
				if (day > 0) {
					return day + "天前";
				} else if (hour > 0) {
					return hour + "小时前";
				} else if (minute > 0) {
					return minute + "分钟前";
				} else {
					return second + "秒前";
				}
			} catch (ParseException e) {
				e.printStackTrace();
				return null;
			}
		}

		return null;
	}

}
