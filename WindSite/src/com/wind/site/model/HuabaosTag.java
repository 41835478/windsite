package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 中建表
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "t_huabaos_tags")
public class HuabaosTag extends IDModel {

	private static final long serialVersionUID = 1L;

	/**
	 * 标签ID
	 */
	private String tid;
	/**
	 * 专辑ID
	 */
	private Integer hid;

	/**
	 * @return the tid
	 */
	public String getTid() {
		return tid;
	}

	/**
	 * @param tid
	 *            the tid to set
	 */
	public void setTid(String tid) {
		this.tid = tid;
	}

	/**
	 * @return the hid
	 */
	public Integer getHid() {
		return hid;
	}

	/**
	 * @param hid
	 *            the hid to set
	 */
	public void setHid(Integer hid) {
		this.hid = hid;
	}

}
