package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 画报类型 （如男人，女人）
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "t_huabaos_type")
public class HuabaoType extends OrderTimestampModel {

	private static final long serialVersionUID = 1L;
	/**
	 * 英文名称
	 */
	private String name;
	/**
	 * 中文名称
	 */
	private String title;
	/**
	 * 画报总数
	 */
	private Integer nums;
	/**
	 * 画报描述
	 */
	private String description;
	/**
	 * 画报频道
	 */
	private String cid;

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description
	 *            the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return the cid
	 */
	public String getCid() {
		return cid;
	}

	/**
	 * @param cid
	 *            the cid to set
	 */
	public void setCid(String cid) {
		this.cid = cid;
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
	 * @return the nums
	 */
	public Integer getNums() {
		return nums;
	}

	/**
	 * @param nums
	 *            the nums to set
	 */
	public void setNums(Integer nums) {
		this.nums = nums;
	}

	/**
	 * @return the serialversionuid
	 */
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
