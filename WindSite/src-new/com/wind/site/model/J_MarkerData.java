package com.wind.site.model;

import java.io.Serializable;
import java.util.List;

public class J_MarkerData implements Serializable {
	private static final long serialVersionUID = 1L;

	private String picId;
	private List<J_Marker> markers;

	/**
	 * @return the picId
	 */
	public String getPicId() {
		return picId;
	}

	/**
	 * @param picId
	 *            the picId to set
	 */
	public void setPicId(String picId) {
		this.picId = picId;
	}

	/**
	 * @return the markers
	 */
	public List<J_Marker> getMarkers() {
		return markers;
	}

	/**
	 * @param markers
	 *            the markers to set
	 */
	public void setMarkers(List<J_Marker> markers) {
		this.markers = markers;
	}

}
