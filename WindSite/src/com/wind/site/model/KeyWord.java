package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 关键词
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_keyword")
public class KeyWord extends OrderTimestampModel {

	private static final long serialVersionUID = -5489002042706874319L;
	/**
	 * 关键词
	 */
	private String name;
	/**
	 * 千次搜索产生的收益
	 */
	private String RPM;
	/**
	 * 0:综合 1:女 2:男
	 */
	private Integer type;

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the rPM
	 */
	public String getRPM() {
		return RPM;
	}

	/**
	 * @param rPM
	 *            the rPM to set
	 */
	public void setRPM(String rPM) {
		RPM = rPM;
	}

	/**
	 * @return the type
	 */
	public Integer getType() {
		return type;
	}

	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(Integer type) {
		this.type = type;
	}

}
