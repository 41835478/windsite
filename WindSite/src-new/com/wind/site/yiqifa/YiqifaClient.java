package com.wind.site.yiqifa;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.GetMethod;

/**
 * 亿起发远程访问客户端
 * 
 * @author fxy
 * 
 */
public class YiqifaClient {
	private static final Logger logger = Logger.getLogger(YiqifaClient.class
			.getName());

	/**
	 * 主动获取订单（接口2）
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public static YiqifaResponse reportsGet(YiqifaRequest request) {
		if (request == null) {
			return null;
		}
		YiqifaResponse response = null;
		HttpClient httpClient = new HttpClient(); // 构造HttpClient的实例
		httpClient.setConnectionTimeout(5000);
		httpClient.setTimeout(5000);
		GetMethod getMethod = new GetMethod(
				"http://o.yiqifa.com/servlet/queryCpsMultiRow"); // 创建GET方法的实
		String queryString = request.toUrlParams();
		getMethod.setQueryString(queryString);
		logger.info("http://o.yiqifa.com/servlet/queryCpsMultiRow?"
				+ queryString);
		InputStream in = null;
		BufferedReader reader = null;
		try {
			int statusCode = httpClient.executeMethod(getMethod); // 执行getMethod
			if (statusCode == HttpStatus.SC_OK) {
				in = getMethod.getResponseBodyAsStream();
				reader = new BufferedReader(new InputStreamReader(in, "GBK"));
				List<String> body = new ArrayList<String>();
				String line = null;
				while ((line = reader.readLine()) != null) {
					body.add(line);
				}
				response = new YiqifaResponse(body, request);// 初始化结果
			} else {
				logger.info(getMethod.getURI() + " return http status:"
						+ statusCode);
			}
		} catch (HttpException e) {
			e.printStackTrace();// 发生致命的异常，可能是协议不对或者返回的内容有问题
		} catch (IOException e) { // 发生网络异常
			e.printStackTrace();
		} finally { // 释放连接
			try {
				if (in != null) {
					in.close();
				}
				if (reader != null) {
					reader.close();
				}
				getMethod.releaseConnection();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return response;
	}

}
