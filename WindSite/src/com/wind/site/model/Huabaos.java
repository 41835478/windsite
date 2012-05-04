package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "t_huabaos")
public class Huabaos implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;
	/**
	 * 画报专辑名称
	 */
	private String name;
	/**
	 * 画报专辑简称
	 */
	private String shortName;
	/**
	 * 画报专辑类型
	 */
	private String type;
	/**
	 * 画报封面
	 */
	private String cover;

	/**
	 * 画报专辑中画报数量
	 */
	private Integer nums;
	/**
	 * 热度
	 */
	private Integer hots;
	/**
	 * 是否抓取完成
	 */
	private Boolean isSuccess;

	/**
	 * @return the id
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
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
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * @return the cover
	 */
	public String getCover() {
		return cover;
	}

	/**
	 * @param cover
	 *            the cover to set
	 */
	public void setCover(String cover) {
		this.cover = cover;
	}

	public void setNums(Integer nums) {
		this.nums = nums;
	}

	public Integer getNums() {
		return nums;
	}

	public void setShortName(String shortName) {
		this.shortName = shortName;
	}

	public String getShortName() {
		return shortName;
	}

	public void setIsSuccess(Boolean isSuccess) {
		this.isSuccess = isSuccess;
	}

	public Boolean getIsSuccess() {
		return isSuccess;
	}

	public void setHots(Integer hots) {
		this.hots = hots;
	}

	public Integer getHots() {
		return hots;
	}

}
