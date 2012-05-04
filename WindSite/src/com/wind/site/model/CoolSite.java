package com.wind.site.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * 酷站
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_coolsite")
public class CoolSite extends OrderTimestampModel {
	private static final long serialVersionUID = 1L;
	/**
	 * 关联站点
	 */
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "site_id")
	private Site site;
	/**
	 * 用户ID
	 */
	private String user_id;
	/**
	 * 是否有效
	 */
	private Boolean isValid = false;
	/**
	 * 审核意见
	 */
	private String remark;

	public void setSite(Site site) {
		this.site = site;
	}

	public Site getSite() {
		return site;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setIsValid(Boolean isValid) {
		this.isValid = isValid;
	}

	public Boolean getIsValid() {
		return isValid;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getRemark() {
		return remark;
	}
}
