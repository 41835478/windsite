/* Copyright (c) 2008 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.wind.site.ga;

import java.net.URL;

import org.apache.commons.lang.StringUtils;

import com.google.gdata.client.analytics.AnalyticsService;
import com.google.gdata.client.analytics.DataQuery;
import com.google.gdata.data.analytics.DataFeed;
import com.wind.core.exception.SystemException;

/**
 * GA 查询客户端
 * 
 * @author fxy
 * 
 */
public class AnalyticsClient {
	public static final String ACCOUNTS_URL = "https://www.google.com/analytics/feeds/accounts/default";

	public static final String DATA_URL = "https://www.google.com/analytics/feeds/data";

	/**
	 * 账户
	 */
	public static String username;
	/**
	 * 密码
	 */
	public static String password;
	/**
	 * GA
	 */
	public static String tableId;

	public static String applicaitonName;

	/**
	 * 根据指定Query查询Feed
	 * 
	 * @param query
	 * @return
	 */
	public static DataFeed getDataFeed(String dimensions, String metrics,
			String filters, String sort, String startDate, String endDate,
			Integer startIndex, Integer maxResults) {
		if (StringUtils.isEmpty(startDate)) {
			SystemException.handleMessageException("开始时间不能为空");
		}
		if (StringUtils.isEmpty(endDate)) {
			SystemException.handleMessageException("结束时间不能为空");
		}
		if (StringUtils.isEmpty(metrics)) {
			SystemException.handleMessageException("metrics不能为空");
		}
		try {
			DataQuery query = new DataQuery(new URL(DATA_URL));
			query.setIds(tableId);
			if (StringUtils.isNotEmpty(dimensions))
				query.setDimensions(dimensions);
			query.setMetrics(metrics);
			if (StringUtils.isNotEmpty(filters))
				query.setFilters(filters);
			if (StringUtils.isNotEmpty(sort))
				query.setSort(sort);
			query.setStartDate(startDate);
			query.setEndDate(endDate);
			if (startIndex != null)
				query.setStartIndex(startIndex);
			if (maxResults != null)
				query.setMaxResults(maxResults);
			AnalyticsService service = new AnalyticsService(applicaitonName);
			service.setUserCredentials(username, password);
			return service.getFeed(query, DataFeed.class);
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}
		return null;
	}

	/**
	 * @return the username
	 */
	public static String getUsername() {
		return username;
	}

	/**
	 * @param username
	 *            the username to set
	 */
	public void setUsername(String username) {
		AnalyticsClient.username = username;
	}

	/**
	 * @return the password
	 */
	public static String getPassword() {
		return password;
	}

	/**
	 * @param password
	 *            the password to set
	 */
	public void setPassword(String password) {
		AnalyticsClient.password = password;
	}

	/**
	 * @return the tableId
	 */
	public static String getTableId() {
		return tableId;
	}

	/**
	 * @param tableId
	 *            the tableId to set
	 */
	public void setTableId(String tableId) {
		AnalyticsClient.tableId = tableId;
	}

	/**
	 * @return the applicaitonName
	 */
	public static String getApplicaitonName() {
		return applicaitonName;
	}

	/**
	 * @param applicaitonName
	 *            the applicaitonName to set
	 */
	public void setApplicaitonName(String applicaitonName) {
		AnalyticsClient.applicaitonName = applicaitonName;
	}

}
