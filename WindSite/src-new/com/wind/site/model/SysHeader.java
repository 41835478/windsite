package com.wind.site.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * 页面模板对应页头
 * 
 * @author fxy
 * 
 */
@Entity
@DiscriminatorValue("S")
public class SysHeader extends Header {
	private static final long serialVersionUID = 1L;
	/**
	 * 页面模板标识
	 */
	private String page_id;

	public void setPage_id(String page_id) {
		this.page_id = page_id;
	}

	public String getPage_id() {
		return page_id;
	}

}
