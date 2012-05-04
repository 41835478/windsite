package com.wind.weibo.config.impl;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.site.env.EnvManager;
import com.wind.site.model.Site;
import com.wind.site.model.WeiboSysConfig;
import com.wind.weibo.config.IWeiboConfig;

import freemarker.template.Template;

public class WeiboConfigImpl implements IWeiboConfig {

	public static void deployWeiboSysConfig(FreeMarkerConfigurer fcg,
			WeiboSysConfig config, Site site) {
		try {
			Template template = fcg.getConfiguration().getTemplate(
					"site/member/weibo/weiboSysConfig.ftl");
			File htmlFile = new File(EnvManager.getApachePath()
					+ File.separator + "htdocs" + File.separator + "weibo"
					+ File.separator + "var" + File.separator + "config"
					+ File.separator + site.getWww() + ".php");
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			template.setEncoding("UTF-8");
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("config", config);
			template.process(params, out);
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
