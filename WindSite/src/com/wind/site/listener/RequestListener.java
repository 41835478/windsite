package com.wind.site.listener;

import java.util.logging.Logger;

import javax.servlet.ServletRequest;
import javax.servlet.ServletRequestEvent;
import javax.servlet.ServletRequestListener;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.wind.site.env.EnvManager;

/**
 * Request监听 <br>
 * TODO 目前因Google App Engine
 * 采用Jetty版本为6.1.x低于6.1.5.当前版本尚未修复在监听里创建Session的BUG。故代码中需捕捉异常并判断Session是否已创建
 * 暂时弃用,改为Spring Interceptor实现相同功能
 * 
 * @author fxy
 * 
 */
public class RequestListener implements ServletRequestListener {
	private static final Logger logger = Logger.getLogger(RequestListener.class
			.getName());

	public void requestDestroyed(ServletRequestEvent arg0) {
		EnvManager.clear();
	}

	public void requestInitialized(ServletRequestEvent arg0) {
		ServletRequest request = arg0.getServletRequest();
		try {
			HttpSession session = ((HttpServletRequest) request).getSession();
			if (session != null) {
				logger.info("Register Session[" + session.getId() + "]");
				EnvManager.registerSession(session);
			}
		} catch (IllegalStateException e) {

		}
	}
}
