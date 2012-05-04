package com.wind.site.rest.taobao.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Set;
import java.util.Map.Entry;

import com.wind.site.rest.taobao.IFetch;

/**
 * Fetch 基类
 * 
 * @author fxy
 * 
 */
public abstract class AbstractFetch implements IFetch {
	protected static final int DEFAULT_CONNECT_TIMEOUT = 8000;

	protected static final int DEFAULT_READ_TIMEOUT = 8000;

	protected static final int DEFAULT_MAX_TOTAL_CONNECTIONS = 1000;

	protected static final int DEFAULT_MAX_CONNECTIONS_PER_HOST = 2;

	protected static final boolean DEFAULT_STALE_CHECKING_ENABLED = true;

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
	public static String paramsToBuffer(
			Set<Entry<String, CharSequence>> entries, String delimiter,
			String equals) {
		if (entries == null || entries.isEmpty()) {
			return null;
		}
		StringBuilder buffer = new StringBuilder();
		boolean notFirst = false;
		for (Entry<String, CharSequence> entry : entries) {
			if (notFirst) {
				buffer.append(delimiter);
			} else {
				notFirst = true;
			}
			CharSequence value = entry.getValue();
			try {

				buffer.append(entry.getKey()).append(equals).append(
						URLEncoder.encode(value.toString(), "utf-8"));
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}
		return new String(buffer);
	}

}
