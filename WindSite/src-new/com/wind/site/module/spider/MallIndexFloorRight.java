package com.wind.site.module.spider;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class MallIndexFloorRight implements Serializable {

	private static final long serialVersionUID = 1L;

	private List<Map<String, String>> grids;

	private List<Map<String, String>> boxs;

	private List<Map<String, String>> links;

	/**
	 * @return the grids
	 */
	public List<Map<String, String>> getGrids() {
		return grids;
	}

	/**
	 * @param grids
	 *            the grids to set
	 */
	public void setGrids(List<Map<String, String>> grids) {
		this.grids = grids;
	}

	/**
	 * @return the boxs
	 */
	public List<Map<String, String>> getBoxs() {
		return boxs;
	}

	/**
	 * @param boxs
	 *            the boxs to set
	 */
	public void setBoxs(List<Map<String, String>> boxs) {
		this.boxs = boxs;
	}

	/**
	 * @return the links
	 */
	public List<Map<String, String>> getLinks() {
		return links;
	}

	/**
	 * @param links
	 *            the links to set
	 */
	public void setLinks(List<Map<String, String>> links) {
		this.links = links;
	}

}
