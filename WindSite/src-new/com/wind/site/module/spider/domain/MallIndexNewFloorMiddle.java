package com.wind.site.module.spider.domain;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class MallIndexNewFloorMiddle implements Serializable {

	private static final long serialVersionUID = 1L;
	private List<Map<String, String>> images;

	private List<MallIndexNewFloorMiddleCell> cells;

	/**
	 * @return the images
	 */
	public List<Map<String, String>> getImages() {
		return images;
	}

	/**
	 * @param images
	 *            the images to set
	 */
	public void setImages(List<Map<String, String>> images) {
		this.images = images;
	}

	/**
	 * @return the cells
	 */
	public List<MallIndexNewFloorMiddleCell> getCells() {
		return cells;
	}

	/**
	 * @param cells
	 *            the cells to set
	 */
	public void setCells(List<MallIndexNewFloorMiddleCell> cells) {
		this.cells = cells;
	}

}
