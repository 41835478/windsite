package com.wind.site.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.site.service.ISiteService;

/**
 * 页面REST(无需登录)
 * 
 * @author fxy
 * 
 */
@Controller
@RequestMapping("/page/header")
public class PageRest {
	@SuppressWarnings("unused")
	@Autowired
	private ISiteService siteService;
	@SuppressWarnings("unused")
	@Autowired
	private FreeMarkerConfigurer fcg;

}
