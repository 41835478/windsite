package com.wind.site.freemarker.method;

import java.util.List;

import freemarker.template.TemplateMethodModel;
import freemarker.template.TemplateModelException;

public class HtmlMethod implements TemplateMethodModel {

	@SuppressWarnings("unchecked")
	@Override
	public Object exec(List arguments) throws TemplateModelException {
		if (arguments != null && arguments.size() == 2) {
			Integer type = Integer.valueOf(String.valueOf(arguments.get(0)));
			switch (type) {
			case 1:
				break;
			case 2:
				break;
			}
		}
		return null;
	}

}
