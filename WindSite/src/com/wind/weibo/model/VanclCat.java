package com.wind.weibo.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "xwb_xt_vancl_cat")
public class VanclCat implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	private String name;

	private Integer parentCid;

	private Long nums;

	private Integer level;

	private String path;

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
	 * @return the parentCid
	 */
	public Integer getParentCid() {
		return parentCid;
	}

	/**
	 * @param parentCid
	 *            the parentCid to set
	 */
	public void setParentCid(Integer parentCid) {
		this.parentCid = parentCid;
	}

	public void setNums(Long nums) {
		this.nums = nums;
	}

	public Long getNums() {
		return nums;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public Integer getLevel() {
		return level;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getPath() {
		return path;
	}

}
