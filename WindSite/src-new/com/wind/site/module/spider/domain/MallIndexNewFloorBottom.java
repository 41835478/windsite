package com.wind.site.module.spider.domain;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class MallIndexNewFloorBottom implements Serializable {

	private static final long serialVersionUID = 1L;
	private String style;
	private List<Map<String, String>> logos;

	public void setLogos(List<Map<String, String>> logos) {
		this.logos = logos;
	}

	public List<Map<String, String>> getLogos() {
		return logos;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public String getStyle() {
		return style;
	}
}
