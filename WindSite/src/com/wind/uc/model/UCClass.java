package com.wind.uc.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * UCHome日志分类
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "uchome_class")
public class UCClass implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	private Integer classid;
	private String classname;
	private Integer uid;
	private Integer dateline;

	/**
	 * @return the classid
	 */
	public Integer getClassid() {
		return classid;
	}

	/**
	 * @param classid
	 *            the classid to set
	 */
	public void setClassid(Integer classid) {
		this.classid = classid;
	}

	/**
	 * @return the classname
	 */
	public String getClassname() {
		return classname;
	}

	/**
	 * @param classname
	 *            the classname to set
	 */
	public void setClassname(String classname) {
		this.classname = classname;
	}

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
	 * @return the dateline
	 */
	public Integer getDateline() {
		return dateline;
	}

	/**
	 * @param dateline
	 *            the dateline to set
	 */
	public void setDateline(Integer dateline) {
		this.dateline = dateline;
	}

}
