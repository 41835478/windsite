package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 阿里妈妈活动推广类型
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "m_activity_type")
public class ActivityType extends OrderTimestampModel {

	private static final long serialVersionUID = 1L;

	private String title;

	private String name;

	private Integer count;

	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @param title
	 *            the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}

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

	public void setCount(Integer count) {
		this.count = count;
	}

	public Integer getCount() {
		return count;
	}

}
