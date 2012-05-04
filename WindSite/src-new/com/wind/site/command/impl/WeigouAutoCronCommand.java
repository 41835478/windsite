package com.wind.site.command.impl;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import org.apache.commons.lang.StringUtils;

import com.wind.site.command.ICommand;
import com.wind.site.rest.taobao.TaobaoFetch;
import com.wind.site.service.ICommandService;

/**
 * 微购自动营销命令
 * 
 * @author fxy
 * 
 */
public class WeigouAutoCronCommand implements ICommand {
	@SuppressWarnings("unused")
	private static final Logger logger = Logger
			.getLogger(WeigouAutoCronCommand.class.getName());
	protected String key;
	protected TaobaoFetch fetch;

	@Override
	public void execute(ICommandService service) {
		try {
			if (fetch == null) {
				fetch = new TaobaoFetch();
			}
			if (fetch != null && StringUtils.isNotEmpty(key)) {
				try {
					Long userId = Long.valueOf(key.replaceAll(
							"weigou_([0-9]+)_([0-9]+)", "$1"));
					Integer index = Integer.valueOf(key.replaceAll(
							"weigou_([0-9]+)_([0-9]+)", "$2"));
					if (userId != null && userId > 0) {
						Map<String, Object> payload = new HashMap<String, Object>();
						fetch.fetch(
								"http://t" + userId
										+ ".xintaowang.com/map.autoCron/index-"
										+ index, payload);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * @return the fetch
	 */
	public TaobaoFetch getFetch() {
		return fetch;
	}

	/**
	 * @param fetch
	 *            the fetch to set
	 */
	public void setFetch(TaobaoFetch fetch) {
		this.fetch = fetch;
	}

	/**
	 * @return the key
	 */
	public String getKey() {
		return key;
	}

	/**
	 * @param key
	 *            the key to set
	 */
	public void setKey(String key) {
		this.key = key;
	}

}
