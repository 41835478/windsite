package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 系统级模板
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_template_sys")
public class SystemTemplate extends Template {
	private static final long serialVersionUID = 1L;
	/**
	 * 颜色
	 */
	private String color;
	/**
	 * 模板类型ID
	 */
	private String type_id;

	public void setColor(String color) {
		this.color = color;
	}

	public String getColor() {
		return color;
	}

	public void setType_id(String type_id) {
		this.type_id = type_id;
	}

	public String getType_id() {
		return type_id;
	}
}
