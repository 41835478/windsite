package com.wind.site.exception;

import java.io.IOException;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.NoSuchRequestHandlingMethodException;

import com.google.gson.JsonObject;
import com.wind.core.exception.BaseException;
import com.wind.site.service.ISiteService;
import com.wind.site.util.WindSiteRestUtil;

/**
 * 异常解析
 * 
 * @author fxy
 * 
 */
public class WindRestExceotionResolver implements HandlerExceptionResolver {
	private ISiteService siteService;

	@Override
	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object obj, Exception exception) {
		Writer writer;
		try {
			response.setCharacterEncoding("UTF-8");
			if ("AJAX".equalsIgnoreCase(request.getHeader("WindType"))) {// 如果是异步请求,返回渲染后的异常信息
				writer = response.getWriter();
				if ("HTML".equalsIgnoreCase(request.getHeader("WindDataType"))) {// 如果请求返回内容为html
					writer.write(rendererHTMLError(request, exception));// 返回js脚本
				} else {
					writer.write(rendererError(exception));// 返回json对象
				}
				writer.close();
			} else {// 正常请求
				Map<String, Object> map = new HashMap<String, Object>();
				if (exception instanceof NoSuchRequestHandlingMethodException) {// 直接转发RESTFUL
					// Mapping错误
					response.sendError(404);
				} else if (exception instanceof BaseException) {// 如果是本系统级错误
					BaseException e = (BaseException) exception;
					if ("27".equals(e.getKey()) || ("100").equals(e.getKey())) {// 如果是淘宝Session超时或新淘未登录,定向至淘宝登录页面
						response.sendRedirect("http://"
								+ request.getServerName()
								+ "/router/site/redirect");
					} else if ("200".equals(e.getKey())) {// 返利会员转向
						String userId = request.getParameter("USER");
						Map<String, Object> result = new HashMap<String, Object>();
						WindSiteRestUtil.covertFanliPID(siteService, request,
								result, userId);
						if (WindSiteRestUtil.isFanli(result)) {// 如果支持返利
							response.sendRedirect("http://" + result.get("www")
									+ "/router/fanli/redirect");
						}
					} else {
						map.put("code", e.getKey());
					}
				}
				map.put("msg", exception.getMessage());
				map.put("cause", exception.toString());
				if (StringUtils.isNotEmpty(request.getParameter("USER"))) {
					WindSiteRestUtil.covertPID(siteService, map, request
							.getParameter("USER"));
					return new ModelAndView("site/siteError", map);
				}
				return new ModelAndView("site/error", map);
			}

		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 渲染异常
	 * 
	 * @param exception
	 * @return
	 */
	private String rendererError(Exception exception) {
		JsonObject json = new JsonObject();
		if (exception instanceof BaseException) {
			if (StringUtils.isNotEmpty(((BaseException) exception).getKey())) {
				json.addProperty("code", ((BaseException) exception).getKey());
			} else {
				json.addProperty("code", "0");
			}
		} else {
			json.addProperty("code", "0");
		}
		json.addProperty("msg", exception.getMessage());
		JsonObject result = new JsonObject();
		result.add("error_response", json);
		return result.toString();
	}

	/**
	 * 渲染HTML异常
	 * 
	 * @param exception
	 * @return
	 */
	private String rendererHTMLError(HttpServletRequest request,
			Exception exception) {
		String html = "<script type='text/javascript'>";
		if (exception instanceof BaseException) {
			String code = ((BaseException) exception).getKey();
			if (StringUtils.isNotEmpty(code)) {// 如果是未登录或授权超时错误
				if (("27".equals(code) || "100".equals(code))) {
					html += "window.confirm('尚未登录或登录超时,请重新登录',function(r){if(r){document.location.href='/router/site/redirect';}});";
				} else if ("200".equals(code)) {
					String userId = request.getParameter("USER");
					Map<String, Object> result = new HashMap<String, Object>();
					WindSiteRestUtil.covertFanliPID(siteService, request,
							result, userId);
					if (WindSiteRestUtil.isFanli(result)) {// 如果支持返利
						html += "window.confirm('尚未登录或登录超时,请重新登录',function(r){if(r){document.location.href='http://"
								+ result.get("www")
								+ "/router/fanli/login';}});";
					}
				} else {
					html += "alert(\"发生错误:" + exception.getMessage() + "\");";
				}
			} else {
				html += "alert(\"发生错误:" + exception.getMessage() + "\");";
			}
		} else {
			html += "alert(\"发生错误:" + exception.getMessage() + "\");";
		}
		html += "</script>";
		return html;
	}

	/**
	 * @return the siteService
	 */
	public ISiteService getSiteService() {
		return siteService;
	}

	/**
	 * @param siteService
	 *            the siteService to set
	 */
	public void setSiteService(ISiteService siteService) {
		this.siteService = siteService;
	}
}
