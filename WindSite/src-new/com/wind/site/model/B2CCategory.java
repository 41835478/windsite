package com.wind.site.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 商城返利分类
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_mall_category")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.CHAR)
@DiscriminatorValue("B")
public class B2CCategory implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * 新淘网标识
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	/**
	 * 外部标识
	 */
	private String b2cId;
	/**
	 * 商城数量
	 */
	private Integer nums;
	/**
	 * 分类名称
	 */
	private String title;
	@Column(insertable = false, updatable = false)
	private String type;
	@Transient
	private List<? extends B2CMall> malls;

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
	 * @return the b2cId
	 */
	public String getB2cId() {
		return b2cId;
	}

	/**
	 * @param b2cId
	 *            the b2cId to set
	 */
	public void setB2cId(String b2cId) {
		this.b2cId = b2cId;
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

	public void setNums(Integer nums) {
		this.nums = nums;
	}

	public Integer getNums() {
		return nums;
	}

	/**
	 * @return the malls
	 */
	public List<? extends B2CMall> getMalls() {
		return malls;
	}

	/**
	 * @param malls
	 *            the malls to set
	 */
	public void setMalls(List<? extends B2CMall> malls) {
		this.malls = malls;
	}

}
