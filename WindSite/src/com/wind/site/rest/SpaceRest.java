package com.wind.site.rest;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.wind.site.env.EnvManager;

/**
 * 淘站空间RESTFUL服务
 * 
 * @author fxy
 * 
 */
@Controller
@RequestMapping("/space")
public class SpaceRest {
	@RequestMapping(value = "/taoke/{domainName}", method = RequestMethod.GET)
	public ModelAndView space(@PathVariable String domainName,
			HttpServletRequest request, HttpServletResponse response) {
		if (EnvManager.getSites().containsKey(domainName)) {
			return new ModelAndView("zone/taoke");
		}
		try {
			response.sendError(404);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new ModelAndView("site/error", "msg", "当前访问地址无效");
	}

}
