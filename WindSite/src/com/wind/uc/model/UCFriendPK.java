package com.wind.uc.model;

import java.io.Serializable;

import javax.persistence.Embeddable;

@Embeddable
public class UCFriendPK implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer uid;

	private Integer fuid;

	/**
	 * @return the uid
	 */
	public Integer getUid() {
		return uid;
	}

	/**
	 * @param uid
	 *            the uid to set
	 */
	public void setUid(Integer uid) {
		this.uid = uid;
	}

	/**
	 * @return the fuid
	 */
	public Integer getFuid() {
		return fuid;
	}

	/**
	 * @param fuid
	 *            the fuid to set
	 */
	public void setFuid(Integer fuid) {
		this.fuid = fuid;
	}

	@Override
	public boolean equals(Object obj) {
		UCFriendPK pk = (UCFriendPK) obj;
		if (pk.getUid() == this.getUid() && pk.getFuid() == this.getFuid()) {
			return true;
		}
		return false;
	}

	@Override
	public int hashCode() {
		return (uid.hashCode() + "" + fuid.hashCode()).hashCode();
	}

}
