package com.wind.site.util.taobao;

import java.util.List;
import java.util.Map;

public class TdjResultData {
	private Map<String, String> style;
	private List<TdjItem> items;

	public Map<String, String> getStyle() {
		return style;
	}

	public void setStyle(Map<String, String> style) {
		this.style = style;
	}

	public List<TdjItem> getItems() {
		return items;
	}

	public void setItems(List<TdjItem> items) {
		this.items = items;
	}

}