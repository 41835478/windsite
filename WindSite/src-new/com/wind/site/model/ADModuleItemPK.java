package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Embeddable;

@Embeddable
public class ADModuleItemPK implements Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * 商品ID
	 */
	private Long numIid;
	/**
	 * 模块ID
	 */
	private Long mId;

	/**
	 * @return the numIid
	 */
	public Long getNumIid() {
		return numIid;
	}

	/**
	 * @param numIid
	 *            the numIid to set
	 */
	public void setNumIid(Long numIid) {
		this.numIid = numIid;
	}

	/**
	 * @return the mId
	 */
	public Long getmId() {
		return mId;
	}

	/**
	 * @param mId
	 *            the mId to set
	 */
	public void setmId(Long mId) {
		this.mId = mId;
	}

	@Override
	public boolean equals(Object obj) {
		ADModuleItemPK pk = (ADModuleItemPK) obj;
		if (pk.getmId().equals(this.getmId())
				&& pk.getNumIid().equals(this.getNumIid())) {
			return true;
		}
		return false;
	}

	@Override
	public int hashCode() {
		return mId.hashCode() + numIid.hashCode();
	}
}
