package com.wind.site.module.spider.domain;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class MallIndexNewFloorLeft implements Serializable {

	private static final long serialVersionUID = 1L;
	private List<Map<String, String>> images;

	public void setImages(List<Map<String, String>> images) {
		this.images = images;
	}

	public List<Map<String, String>> getImages() {
		return images;
	}

}
