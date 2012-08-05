package com.wind.site.model;

import java.io.Serializable;
import java.util.List;

public class J_ImageData implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long picId;
	private List<String> picSize;
	private String picDesc;
	private String picSrc;
	private String relatedGoodsLink;

	/**
	 * @return the picId
	 */
	public Long getPicId() {
		return picId;
	}

	/**
	 * @param picId
	 *            the picId to set
	 */
	public void setPicId(Long picId) {
		this.picId = picId;
	}

	/**
	 * @return the picSize
	 */
	public List<String> getPicSize() {
		return picSize;
	}

	/**
	 * @param picSize
	 *            the picSize to set
	 */
	public void setPicSize(List<String> picSize) {
		this.picSize = picSize;
	}

	/**
	 * @return the relatedGoodsLink
	 */
	public String getRelatedGoodsLink() {
		return relatedGoodsLink;
	}

	/**
	 * @param relatedGoodsLink
	 *            the relatedGoodsLink to set
	 */
	public void setRelatedGoodsLink(String relatedGoodsLink) {
		this.relatedGoodsLink = relatedGoodsLink;
	}

	public void setPicDesc(String picDesc) {
		this.picDesc = picDesc;
	}

	public String getPicDesc() {
		return picDesc;
	}

	public void setPicSrc(String picSrc) {
		this.picSrc = picSrc;
	}

	public String getPicSrc() {
		return picSrc;
	}

}
