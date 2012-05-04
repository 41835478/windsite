package com.wind.site.module.spider.domain;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class MallIndexNewFloorMiddleCell implements Serializable {

	private static final long serialVersionUID = 1L;
	private Map<String, String> top;
	private List<Map<String, String>> middle;
	private String bottom;

	/**
	 * @return the top
	 */
	public Map<String, String> getTop() {
		return top;
	}

	/**
	 * @param top
	 *            the top to set
	 */
	public void setTop(Map<String, String> top) {
		this.top = top;
	}

	/**
	 * @return the middle
	 */
	public List<Map<String, String>> getMiddle() {
		return middle;
	}

	/**
	 * @param middle
	 *            the middle to set
	 */
	public void setMiddle(List<Map<String, String>> middle) {
		this.middle = middle;
	}

	/**
	 * @return the bottom
	 */
	public String getBottom() {
		return bottom;
	}

	/**
	 * @param bottom
	 *            the bottom to set
	 */
	public void setBottom(String bottom) {
		this.bottom = bottom;
	}

}
