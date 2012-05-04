package com.wind.site.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * URL重写
 * 
 * @author fxy
 * 
 */
public class UrlRewriterFilter implements Filter {

	@Override
	public void destroy() {

	}

	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {
		final HttpServletRequest request = (HttpServletRequest) arg0;
		final HttpServletResponse response = (HttpServletResponse) arg1;
		String url = request.getRequestURL().toString();
		String[] urlArray = url.split("/tzone/");
		boolean isRedirect = false;
		if (urlArray.length == 2) {
			String domainName = urlArray[1];
			isRedirect = true;
			response.sendRedirect("http://"
					+ request.getServerName()
					+ "/zone/"
					+ domainName.substring(domainName.length() - 2, domainName
							.length()) + "/"
					+ domainName.substring(4, domainName.length()) + domainName
					+ ".html");
		}
		if (!isRedirect) {
			arg2.doFilter(arg0, arg1);
		}
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

}
