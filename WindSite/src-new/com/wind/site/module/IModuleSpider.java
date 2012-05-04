package com.wind.site.module;

import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.core.service.IBaseService;

/**
 * 模块爬虫
 * 
 * @author fxy
 * 
 */
public interface IModuleSpider {
	/**
	 * 抓取模块接口
	 * 
	 * @param service
	 */
	void crawl(IBaseService service, FreeMarkerConfigurer fcg);
}
