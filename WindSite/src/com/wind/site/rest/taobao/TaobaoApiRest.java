package com.wind.site.rest.taobao;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wind.core.exception.SystemException;
import com.wind.site.env.EnvManager;
import com.wind.site.util.EncryptUtil;

/**
 * AS3 后台代理程序<br>
 * 本程序只是负责转发请求,并没有生成Sign.另外暂时尚未支持附带文件(一般为图片)<br>
 * 规则: <br>
 * 1.JS端完成参数设置及Sign签名, 分正式环境和沙箱环境)<br>
 * 
 * @author fxy
 * 
 */

@Controller
public class TaobaoApiRest {

	public static final List<String> SYSTEM_PARAMS = new ArrayList<String>();
	static {
		SYSTEM_PARAMS.add("app_key");
		SYSTEM_PARAMS.add("method");
		SYSTEM_PARAMS.add("v");
		SYSTEM_PARAMS.add("timestamp");
		SYSTEM_PARAMS.add("app_key");
		SYSTEM_PARAMS.add("format");
		SYSTEM_PARAMS.add("sign");
	}
	@Autowired
	private IFetch fetch;

	@RequestMapping(value = "/taobao", method = RequestMethod.GET)
	@ResponseBody
	public void restGet(HttpServletRequest request, HttpServletResponse response) {
		rest(request, response, false);
	}

	@RequestMapping(value = "/taobao", method = RequestMethod.POST)
	@ResponseBody
	public void restPost(HttpServletRequest request,
			HttpServletResponse response) {
		rest(request, response, false);
	}

	@RequestMapping(value = "/sandbox", method = RequestMethod.GET)
	@ResponseBody
	public void restSandboxGet(HttpServletRequest request,
			HttpServletResponse response) {
		rest(request, response, true);

	}

	@RequestMapping(value = "/sandbox", method = RequestMethod.POST)
	@ResponseBody
	public void restSandboxPost(HttpServletRequest request,
			HttpServletResponse response) {
		rest(request, response, true);

	}

	@SuppressWarnings("unchecked")
	public void rest(HttpServletRequest request, HttpServletResponse response,
			Boolean isSandbox) {
		response.setCharacterEncoding("UTF-8");
		Map<String, CharSequence> map = new HashMap<String, CharSequence>();
		Enumeration<String> names = request.getParameterNames();
		while (names.hasMoreElements()) {
			String name = names.nextElement();
			map.put(name, request.getParameter(name));
		}
		map.put("app_key", EnvManager.getAppKey(EnvManager.getAppType()));
		String method = request.getParameter("method");
		if (EnvManager.getAPI().containsKey(method)) {
			if (EnvManager.getAPI().get(method) == 0) {
				// 无需登录
			} else if (EnvManager.getAPI().get(method) == 1) {// 如果需登录
				if (StringUtils.isNotEmpty(EnvManager.getTaobaoSession())) {// 存在Session
					map.put("session", EnvManager.getTaobaoSession());
				} else {
					SystemException.handleMessageException("用户尚未登录");
				}
			} else if (EnvManager.getAPI().get(method) == 2) {// 如果可选登录
				if (StringUtils.isNotEmpty(EnvManager.getTaobaoSession())) {// 存在Session
					map.put("session", EnvManager.getTaobaoSession());
				}
			}
		} else {
			SystemException
					.handleMessageException("暂未开放[" + method + "]的淘宝访问权");
		}
		map.put("sign", EncryptUtil.md5Signature(map, EnvManager
				.getSecret(EnvManager.getAppType()), "sign"));// 设置签名
		response.setContentType(request.getContentType());// 设置类型
		fetch.fetch(EnvManager.getUrl(), map, response);
	}

}
