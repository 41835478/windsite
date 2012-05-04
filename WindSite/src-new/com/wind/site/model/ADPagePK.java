package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * 首页投放主键
 * 
 * @author fxy
 * 
 */
@Embeddable
public class ADPagePK implements Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * 页面ID
	 */
	@Column(length = 32)
	private String pid;
	/**
	 * 广告ID
	 */
	@Column(length = 32)
	private String aid;

	/**
	 * @return the pid
	 */
	public String getPid() {
		return pid;
	}

	/**
	 * @param pid
	 *            the pid to set
	 */
	public void setPid(String pid) {
		this.pid = pid;
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
		if (obj instanceof ADPagePK) {
			ADPagePK pk = (ADPagePK) obj;
			if (this.pid.equals(pk.getPid()) && this.aid.equals(pk.getAid())) {
				return true;
			}
		}
		return false;
	}

	@Override
	public int hashCode() {
		return this.pid.hashCode() + this.aid.hashCode();
	}

}
