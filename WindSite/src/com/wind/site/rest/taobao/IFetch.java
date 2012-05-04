package com.wind.site.rest.taobao;

import java.util.Map;

import javax.servlet.http.HttpServletResponse;

/**
 * 淘宝数据获取接口
 * 
 * @author fxy
 * 
 */
public interface IFetch {

	void fetch(String url, Map<String, CharSequence> payload,
			HttpServletResponse response);

	void setKeepAlive(boolean keepAlive);

	void setStaleCheckingEnabled(boolean value);

	void setMaxConnectionsPerHost(int maxHostConnections);

	void setMaxTotalConnections(int maxTotalConnections);

	void setConnectTimeout(int milliSecond);

	void setReadTimeout(int milliSecond);

}
