package com.wind.site.listener;

import java.util.logging.Logger;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import com.wind.site.env.EnvManager;

/**
 * Session监听
 * 
 * @author fxy
 * 
 */
public class SessionListener implements HttpSessionListener {

	@SuppressWarnings("unused")
	private static final Logger logger = Logger.getLogger(SessionListener.class
			.getName());

	@Override
	public void sessionCreated(HttpSessionEvent event) {
		// logger.info("session[" + event.getSession().getId() + "] create ");
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent event) {
		// logger.info("remove a session");
		EnvManager.clearSession(event.getSession());
	}
}
