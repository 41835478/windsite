package com.wind.site.util;

import java.io.StringReader;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.core.exception.SystemException;
import com.wind.site.env.EnvManager;
import com.wind.site.model.CustomeWidget;
import com.wind.site.model.Site;

import freemarker.template.Template;

public class WidgetUtil {
	/**
	 * 外部转换(获取推广代码)
	 * 
	 * @param widget
	 * @param fcg
	 * @return
	 */
	public static String convertContentOuter(CustomeWidget widget,
			FreeMarkerConfigurer fcg) {
		Map<String, Object> maps = new HashMap<String, Object>();
		maps.put("pid", EnvManager.getUser().getPid());
		maps.put("spid", EnvManager.getUser().getPid().replaceAll("mm_", "")
				.replaceAll("_0_0", ""));
		Site site = EnvManager.getUser().getSites().get(0);
		String siteurl = StringUtils.isNotEmpty(site.getWww()) ? ("http://" + site
				.getWww())
				: ("http://" + site.getDomainName() + ".xintaonet.com");
		maps.put("siteurl", siteurl);
		return convertContent(widget, fcg, maps);
	}

	/**
	 * 内部转换
	 * 
	 * @param widget
	 * @param fcg
	 * @return
	 */
	public static String convertContentInner(CustomeWidget widget,
			FreeMarkerConfigurer fcg) {
		Map<String, Object> maps = new HashMap<String, Object>();
		maps.put("pid", EnvManager.getUser().getPid());
		maps.put("spid", EnvManager.getUser().getPid().replaceAll("mm_", "")
				.replaceAll("_0_0", ""));
		maps.put("siteurl", "");
		return convertContent(widget, fcg, maps);
	}

	/**
	 * 转换自定义组件内容
	 * 
	 * @param widget
	 * @param fcg
	 * @return
	 */
	public static String convertContent(CustomeWidget widget,
			FreeMarkerConfigurer fcg, Map<String, Object> maps) {
		String content = "";
		Template template = null;
		try {
			template = new Template(widget.getId(), new StringReader(widget
					.getContent()), fcg.getConfiguration());

			template.setEncoding("UTF-8");
			content = FreeMarkerTemplateUtils.processTemplateIntoString(
					template, maps);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return content;
	}

	/**
	 * 输出自定义组件内容
	 * 
	 * @param widget
	 * @param fcg
	 * @return
	 */
	public static void outContent(CustomeWidget widget,
			FreeMarkerConfigurer fcg, Writer out) {
		Map<String, Object> maps = new HashMap<String, Object>();
		maps.put("pid", EnvManager.getUser().getPid());
		maps.put("spid", EnvManager.getUser().getPid().replaceAll("mm_", "")
				.replaceAll("_0_0", ""));
		maps.put("siteurl", "");
		try {
			Template template = new Template(widget.getId(), new StringReader(
					widget.getContent()), fcg.getConfiguration());
			template.setEncoding("UTF-8");
			template.process(maps, out);
			out.flush();
			out.close();
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}
	}

	/**
	 * 输出自定义组件内容
	 * 
	 * @param widget
	 * @param fcg
	 * @return
	 */
	public static String outCodeContent(CustomeWidget widget,
			FreeMarkerConfigurer fcg) {
		String tbContent = "";
		Map<String, Object> maps = new HashMap<String, Object>();
		maps.put("pid", EnvManager.getUser().getPid());
		maps.put("spid", EnvManager.getUser().getPid().replaceAll("mm_", "")
				.replaceAll("_0_0", ""));
		maps.put("siteurl", "");
		try {
			Template template = new Template(widget.getId(), new StringReader(
					widget.getTbContent()), fcg.getConfiguration());
			template.setEncoding("UTF-8");
			tbContent = FreeMarkerTemplateUtils.processTemplateIntoString(
					template, maps);
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}
		return tbContent;
	}
}
