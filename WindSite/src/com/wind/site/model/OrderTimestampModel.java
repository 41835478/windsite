package com.wind.site.model;

import javax.persistence.MappedSuperclass;

/**
 * 排序
 * 
 * @author fxy
 * 
 */
@MappedSuperclass
public class OrderTimestampModel extends TimestampModel {

	private static final long serialVersionUID = 6365032772229012930L;
	/**
	 * 排序字段
	 */
	private Integer sortOrder;

	public void setSortOrder(Integer sortOrder) {
		this.sortOrder = sortOrder;
	}

	public Integer getSortOrder() {
		return sortOrder;
	}
}
