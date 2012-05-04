package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 商城详情
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_mall_detail")
public class MallDetail implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	private Long id;
	/**
	 * 商城介绍
	 */
	@Column(length = 3000)
	private String description;

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

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

}
