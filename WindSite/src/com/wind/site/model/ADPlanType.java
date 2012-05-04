package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Id;

/**
 * 广告计划所属分类
 * 
 * @author fxy
 * 
 */

public class ADPlanType implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	private Integer id;
	/**
	 * 类型名称（首页，日志，搜索。。。）
	 */
	private String name;

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

}
