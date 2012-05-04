package com.wind.site.module.spider;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class MallIndexFloorMiddle implements Serializable {

	private static final long serialVersionUID = 1L;

	private Boolean isSlide;

	private List<Map<String, String>> images;

	/**
	 * @return the isSlide
	 */
	public Boolean getIsSlide() {
		return isSlide;
	}

	/**
	 * @param isSlide
	 *            the isSlide to set
	 */
	public void setIsSlide(Boolean isSlide) {
		this.isSlide = isSlide;
	}

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

}
