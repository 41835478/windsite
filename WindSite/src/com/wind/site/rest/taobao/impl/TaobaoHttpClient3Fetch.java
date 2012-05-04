package com.wind.site.rest.taobao.impl;

import java.io.Writer;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.MultiThreadedHttpConnectionManager;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.RequestEntity;
import org.apache.commons.httpclient.methods.StringRequestEntity;
import org.apache.commons.httpclient.params.HttpConnectionManagerParams;

/**
 * 淘宝数据获取器
 * 
 * @author fxy
 * 
 */
public class TaobaoHttpClient3Fetch extends AbstractFetch {
	
	private boolean keepAlive = false;

	// 执行postMethod
	private HttpClient httpClient;

	public TaobaoHttpClient3Fetch() {
		initHttpClient();
	}

	private void initHttpClient() {
		MultiThreadedHttpConnectionManager connectionManger = new MultiThreadedHttpConnectionManager();
		HttpConnectionManagerParams params = new HttpConnectionManagerParams();
		params.setMaxTotalConnections(DEFAULT_MAX_TOTAL_CONNECTIONS);
		params
				.setDefaultMaxConnectionsPerHost(DEFAULT_MAX_CONNECTIONS_PER_HOST);
		params.setConnectionTimeout(DEFAULT_CONNECT_TIMEOUT);
		params.setSoTimeout(DEFAULT_READ_TIMEOUT);
		params.setStaleCheckingEnabled(DEFAULT_STALE_CHECKING_ENABLED);
		connectionManger.setParams(params);
		httpClient = new HttpClient(connectionManger);
	}

	@Override
	public void fetch(String url, Map<String, CharSequence> payload,
			HttpServletResponse response) {
		PostMethod postMethod = null;
		try {
			RequestEntity rp = null;
			postMethod = new PostMethod(url);
			rp = new StringRequestEntity(paramsToBuffer(payload.entrySet(),
					"&", "="), "application/x-www-form-urlencoded", null);
			if (keepAlive) {
				postMethod.setRequestHeader("Connection", "Keep-Alive");
			}
			postMethod.setRequestEntity(rp);
			httpClient.executeMethod(postMethod);

			Writer out = response.getWriter();
			out
					.write(inputStreamToString(postMethod
							.getResponseBodyAsStream()));
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// always release the connection after we're done
			postMethod.releaseConnection();
		}
	}

	public void setKeepAlive(boolean keepAlive) {
		this.keepAlive = keepAlive;
	}

	public void setStaleCheckingEnabled(boolean value) {
		this.httpClient.getHttpConnectionManager().getParams()
				.setStaleCheckingEnabled(value);
	}

	public void setMaxConnectionsPerHost(int maxHostConnections) {
		this.httpClient.getHttpConnectionManager().getParams()
				.setDefaultMaxConnectionsPerHost(maxHostConnections);
	}

	public void setMaxTotalConnections(int maxTotalConnections) {
		this.httpClient.getHttpConnectionManager().getParams()
				.setMaxTotalConnections(maxTotalConnections);

	}

	public void setConnectTimeout(int milliSecond) {
		this.httpClient.getHttpConnectionManager().getParams()
				.setConnectionTimeout(milliSecond);
	}

	public void setReadTimeout(int milliSecond) {
		this.httpClient.getParams().setSoTimeout(milliSecond);
	}

}
