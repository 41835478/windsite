package com.wind.discuz.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "cdb_members")
public class DiscuzMembers implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	private Integer uid;
	@Column(name = "credits")
	private Integer credit;

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
	 * @return the credit
	 */
	public Integer getCredit() {
		return credit;
	}

	/**
	 * @param credit
	 *            the credit to set
	 */
	public void setCredit(Integer credit) {
		this.credit = credit;
	}

}
