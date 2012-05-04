package com.wind.site.module.spider;

import java.io.Serializable;
import java.util.List;

public class MallIndexFloorLeft implements Serializable {

	private static final long serialVersionUID = 1L;

	private String style;

	private List<String> logos;

	/**
	 * @return the style
	 */
	public String getStyle() {
		return style;
	}

	/**
	 * @param style
	 *            the style to set
	 */
	public void setStyle(String style) {
		this.style = style;
	}

	/**
	 * @return the logos
	 */
	public List<String> getLogos() {
		return logos;
	}

	/**
	 * @param logos
	 *            the logos to set
	 */
	public void setLogos(List<String> logos) {
		this.logos = logos;
	}

}
