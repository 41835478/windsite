package com.wind.site.rest.taobao.impl;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

public class TaobaoJdkUrlFetch extends AbstractFetch {

	private int connectTimeOut = DEFAULT_CONNECT_TIMEOUT;

	private int readTimeOut = DEFAULT_READ_TIMEOUT;

	@Override
	public void fetch(String url, Map<String, CharSequence> payload,
			HttpServletResponse response) {
		HttpURLConnection connection = null;
		try {
			connection = getHttpUrlConnection(new URL(url));
			String buffer = "";
			if (payload != null)
				buffer = paramsToBuffer(payload.entrySet(), "&", "=");
			connection.setRequestMethod("POST");
			connection.addRequestProperty("Content-Type",
					"application/x-www-form-urlencoded");
			if (buffer == null) {
				buffer = "";
			}
			connection.getOutputStream().write(buffer.getBytes());
			BufferedInputStream bis = new BufferedInputStream(connection
					.getInputStream());
			BufferedOutputStream bos = new BufferedOutputStream(response
					.getOutputStream());
			byte data[] = new byte[4096];// 缓冲字节数
			int size = 0;
			size = bis.read(data);
			while (size != -1) {
				bos.write(data, 0, size);
				size = bis.read(data);
			}
			bis.close();
			bos.flush();// 清空输出缓冲流
			bos.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				releaseUrlConnection(connection);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}

	/**
	 * 获得HttpUrlConnection链接
	 * 
	 * @return
	 * @throws IOException
	 */
	private HttpURLConnection getHttpUrlConnection(URL url) throws IOException {
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setDoInput(true);
		con.setDoOutput(true);
		con.setReadTimeout(readTimeOut);
		con.setConnectTimeout(connectTimeOut);
		return con;
	}

	/**
	 * 释放HttpUrlConnection链接
	 * 
	 * @param connection
	 * @throws IOException
	 */
	private void releaseUrlConnection(HttpURLConnection connection)
			throws IOException {
		connection.getInputStream().close();
		// XXX 断开http连接,没什么用处
		connection.disconnect();
		connection = null;
	}

	public void setConnectTimeout(int milliSecond) {
		this.connectTimeOut = milliSecond;
	}

	public void setReadTimeout(int milliSecond) {
		this.readTimeOut = milliSecond;
	}

	public void setKeepAlive(boolean keepAlive) {
		throw new UnsupportedOperationException();
	}

	public void setMaxConnectionsPerHost(int maxHostConnections) {
		throw new UnsupportedOperationException();
	}

	public void setMaxTotalConnections(int maxTotalConnections) {
		throw new UnsupportedOperationException();
	}

	public void setStaleCheckingEnabled(boolean value) {
		throw new UnsupportedOperationException();
	}
}
