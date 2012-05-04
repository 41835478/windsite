package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class ADBlogPK implements Serializable {
	private static final long serialVersionUID = 1L;
	/**
	 * 站点ID
	 */
	@Column(length = 32)
	private String sid;
	/**
	 * 广告ID
	 */
	@Column(length = 32)
	private String aid;

	/**
	 * @return the sid
	 */
	public String getSid() {
		return sid;
	}

	/**
	 * @param sid
	 *            the sid to set
	 */
	public void setSid(String sid) {
		this.sid = sid;
	}

	/**
	 * @return the aid
	 */
	public String getAid() {
		return aid;
	}

	/**
	 * @param aid
	 *            the aid to set
	 */
	public void setAid(String aid) {
		this.aid = aid;
	}

	@Override
	public boolean equals(Object obj) {
		ADBlogPK pk = (ADBlogPK) obj;
		if (pk.getSid().equals(this.getSid())
				&& pk.getAid().equals(this.getAid())) {
			return true;
		}
		return false;
	}

	@Override
	public int hashCode() {
		return sid.hashCode() + aid.hashCode();
	}
}
