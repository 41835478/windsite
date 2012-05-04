package com.wind.site.freemarker;

import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;

import com.wind.site.model.SystemTemplate;
import com.wind.site.model.Template;
import com.wind.site.model.UserTemplate;
import com.wind.site.service.IDesignerService;

import freemarker.cache.TemplateLoader;

/**
 * DB Freemarker 模板加载器
 * 
 * @author fxy
 * 
 */
public class DBTemplateLoader implements TemplateLoader {

	private IDesignerService designerService;

	@Override
	public void closeTemplateSource(Object templateSource) throws IOException {

	}

	/**
	 * 四种情况: <br>
	 * 1.打开默认的系统模板 <br>
	 * 2.打开指定的系统模板 <br>
	 * 3.打开指定的用户模板 <br>
	 */
	@Override
	public Object findTemplateSource(String name) throws IOException {
		Template template = null;
		// System.out.println("模板名称：" + name);
		name = name.replace("_zh_CN", "").replace("_zh", "");// 替换掉Local标识
		if (name.startsWith("template/user")) {// 3.打开指定的用户模板
			template = designerService.get(UserTemplate.class,
					name.split("/")[2]);
		} else if (name.startsWith("template/system")) {// 2.打开指定系统模板
			template = designerService.get(SystemTemplate.class, name
					.split("/")[2]);
		} else if (name.startsWith("template/default")) {// 1.打开默认系统模板
			template = designerService.findByCriterion(SystemTemplate.class, R
					.eq("isDefault", true));
		}
		if (template != null) {// 如果模板不为null但内容为空
			if (StringUtils.isEmpty(template.getContent())) {
				return null;
			}
		}
		return template;
	}

	@Override
	public long getLastModified(Object templateSource) {
		Template template = (Template) templateSource;
		if (template.getUpdated() == null) {
			return -1;
		}
		System.out.println(template.getName() + ':'
				+ template.getUpdated().getTime());
		return template.getUpdated().getTime();// 返回模板修改时间
	}

	@Override
	public Reader getReader(Object templateSource, String encoding)
			throws IOException {
		Template template = (Template) templateSource;
		return new StringReader(template.getContent());
	}

	public void setDesignerService(IDesignerService designerService) {
		this.designerService = designerService;
	}

	public IDesignerService getDesignerService() {
		return designerService;
	}

}
