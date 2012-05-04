package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 站长亿起发商城
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_mall_yiqifa")
public class MyYiqifaMall implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	private YiqifaMallPk pk;
	/**
	 * 标题
	 */
	private String title;
	private Integer sortOrder;
	/**
	 * 是否支持修改目标网站
	 */
	private Boolean isChange;

	/**
	 * @return the sortOrder
	 */
	public Integer getSortOrder() {
		return sortOrder;
	}

	/**
	 * @param sortOrder
	 *            the sortOrder to set
	 */
	public void setSortOrder(Integer sortOrder) {
		this.sortOrder = sortOrder;
	}

	public void setPk(YiqifaMallPk pk) {
		this.pk = pk;
	}

	public YiqifaMallPk getPk() {
		return pk;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj instanceof MyYiqifaMall) {
			MyYiqifaMall mall = (MyYiqifaMall) obj;
			if (mall.getPk().equals(this.getPk())) {
				return true;
			}
		}
		return false;
	}

	@Override
	public int hashCode() {
		return this.pk.hashCode();
	}

	@Override
	public String toString() {
		return "{user_id:" + this.getPk().getUser_id() + ",mall_id:"
				+ this.getPk().getMall_id() + ",clickUrl:\""
				+ this.getPk().getClickUrl() + "\",sortOrder:" + this.sortOrder
				+ "}";
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTitle() {
		return title;
	}

	public void setIsChange(Boolean isChange) {
		this.isChange = isChange;
	}

	public Boolean getIsChange() {
		return isChange;
	}

}
