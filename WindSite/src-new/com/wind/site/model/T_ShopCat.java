package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 店铺前台类目
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "t_shop_cat")
public class T_ShopCat implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	private Long cid;// Number 否 12345678 类目编号
	private Long parentCid;// parent_cid Number 否 123456
	// 父类目编号，注：此类目指前台类目，值等于0：表示此类目为一级类目，值不等于0：表示此类目有父类目
	private String name;// String 否 名称 类目名称
	private Boolean isParent;// Boolean 否 true 该类目是否为父类目。即：该类目是否还有子类目
	/**
	 * 是否完成
	 */
	private Boolean isSuccess;

	/**
	 * @return the cid
	 */
	public Long getCid() {
		return cid;
	}

	/**
	 * @param cid
	 *            the cid to set
	 */
	public void setCid(Long cid) {
		this.cid = cid;
	}

	/**
	 * @return the parentCid
	 */
	public Long getParentCid() {
		return parentCid;
	}

	/**
	 * @param parentCid
	 *            the parentCid to set
	 */
	public void setParentCid(Long parentCid) {
		this.parentCid = parentCid;
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
	 * @return the isParent
	 */
	public Boolean getIsParent() {
		return isParent;
	}

	/**
	 * @param isParent
	 *            the isParent to set
	 */
	public void setIsParent(Boolean isParent) {
		this.isParent = isParent;
	}

	public void setIsSuccess(Boolean isSuccess) {
		this.isSuccess = isSuccess;
	}

	public Boolean getIsSuccess() {
		return isSuccess;
	}

}
