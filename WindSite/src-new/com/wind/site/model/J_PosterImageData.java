package com.wind.site.model;

import java.io.Serializable;
import java.util.List;

public class J_PosterImageData implements Serializable {

	private static final long serialVersionUID = 1L;

	private String asyncStatus;
	private String asyncMsg;
	private String posterId;
	private List<J_ImageData> imageData;

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
	 * @return the imageData
	 */
	public List<J_ImageData> getImageData() {
		return imageData;
	}

	/**
	 * @param imageData
	 *            the imageData to set
	 */
	public void setImageData(List<J_ImageData> imageData) {
		this.imageData = imageData;
	}

}
