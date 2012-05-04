package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 淘宝类目表
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "t_itemcat")
public class T_ItemCat extends OrderTimestampModel {
	private static final long serialVersionUID = 1L;
	private String cid;
	private String parentCid;
	private String name;
	private Boolean isParent;
	private String status;
	private Boolean isSuccess = true;
	private String clickUrl;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	public String getParentCid() {
		return parentCid;
	}

	public void setParentCid(String parentCid) {
		this.parentCid = parentCid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getIsParent() {
		return isParent;
	}

	public void setIsParent(Boolean isParent) {
		this.isParent = isParent;
	}

	public void setIsSuccess(Boolean isSuccess) {
		this.isSuccess = isSuccess;
	}

	public Boolean getIsSuccess() {
		return isSuccess;
	}

	public void setClickUrl(String clickUrl) {
		this.clickUrl = clickUrl;
	}

	public String getClickUrl() {
		return clickUrl;
	}
}
