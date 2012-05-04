package com.wind.site.module.spider.domain;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class MallIndexNewFloorRight implements Serializable {

	private static final long serialVersionUID = 1L;
	private List<Map<String, String>> boxs;
	private List<Map<String, String>> grids;

	public void setBoxs(List<Map<String, String>> boxs) {
		this.boxs = boxs;
	}

	public List<Map<String, String>> getBoxs() {
		return boxs;
	}

	public void setGrids(List<Map<String, String>> grids) {
		this.grids = grids;
	}

	public List<Map<String, String>> getGrids() {
		return grids;
	}
}
