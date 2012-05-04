package com.wind.site.model;

import java.io.Serializable;
import java.util.List;

public class J_PosterMarkerData implements Serializable {
	private static final long serialVersionUID = 1L;

	private String asyncStatus;
	private String asyncMsg;
	private String posterId;
	private List<J_MarkerData> markerData;

	/**
	 * @return the asyncStatus
	 */
	public String getAsyncStatus() {
		return asyncStatus;
	}

	/**
	 * @param asyncStatus
	 *            the asyncStatus to set
	 */
	public void setAsyncStatus(String asyncStatus) {
		this.asyncStatus = asyncStatus;
	}

	/**
	 * @return the asyncMsg
	 */
	public String getAsyncMsg() {
		return asyncMsg;
	}

	/**
	 * @param asyncMsg
	 *            the asyncMsg to set
	 */
	public void setAsyncMsg(String asyncMsg) {
		this.asyncMsg = asyncMsg;
	}

	/**
	 * @return the posterId
	 */
	public String getPosterId() {
		return posterId;
	}

	/**
	 * @param posterId
	 *            the posterId to set
	 */
	public void setPosterId(String posterId) {
		this.posterId = posterId;
	}

	/**
	 * @return the markerData
	 */
	public List<J_MarkerData> getMarkerData() {
		return markerData;
	}

	/**
	 * @param markerData
	 *            the markerData to set
	 */
	public void setMarkerData(List<J_MarkerData> markerData) {
		this.markerData = markerData;
	}

}
