package com.wind.site.rest.taobao;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

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
public class TaobaoFetch {
	protected static final int DEFAULT_CONNECT_TIMEOUT = 5000;

	protected static final int DEFAULT_READ_TIMEOUT = 5000;

	protected static final int DEFAULT_MAX_TOTAL_CONNECTIONS = 1000;

	protected static final int DEFAULT_MAX_CONNECTIONS_PER_HOST = 2;

	protected static final boolean DEFAULT_STALE_CHECKING_ENABLED = true;
	private boolean keepAlive = false;

	// 执行postMethod
	private HttpClient httpClient;

	public TaobaoFetch() {
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

	public String fetch(String url, Map<String, Object> payload) {
		PostMethod postMethod = null;
		try {
			RequestEntity rp = null;
			postMethod = new PostMethod(url);
			if (payload != null && payload.size() > 0)
				rp = new StringRequestEntity(paramsToBuffer(payload.entrySet(),
						"&", "="), "application/x-www-form-urlencoded", null);
			if (keepAlive) {
				postMethod.setRequestHeader("Connection", "Keep-Alive");
			}
			postMethod.setRequestEntity(rp);
			httpClient.executeMethod(postMethod);
			postMethod.getResponseBody();
			return inputStreamToString(postMethod.getResponseBodyAsStream());
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// always release the connection after we're done
			postMethod.releaseConnection();
		}
		return null;
	}

	public static String inputStreamToString(InputStream input)
			throws IOException {
		BufferedReader in = new BufferedReader(new InputStreamReader(input,
				"utf-8"));
		StringBuffer buffer = new StringBuffer();
		String line = "";
		while ((line = in.readLine()) != null) {
			buffer.append(line);
		}
		return buffer.toString();
	}

	/**
	 * url访问时没有上传文件时的辅助类，将map类型的params转换到url上
	 * 
	 * @param entries
	 * @param delimiter
	 * @param equals
	 * @return
	 */
	private String paramsToBuffer(Set<Entry<String, Object>> entries,
			String delimiter, String equals) {
		if (entries == null || entries.isEmpty()) {
			return null;
		}
		StringBuilder buffer = new StringBuilder();
		boolean notFirst = false;
		for (Entry<String, Object> entry : entries) {
			if (notFirst) {
				buffer.append(delimiter);
			} else {
				notFirst = true;
			}
			Object value = entry.getValue();
			try {
				String v = "";
				if (value != null)
					if (value instanceof String[]) {
						v = ((String[]) value)[0];
					} else {
						v = value.toString();
					}
				buffer.append(entry.getKey()).append(equals).append(
						URLEncoder.encode(v, "utf-8"));
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}
		return new String(buffer);
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
