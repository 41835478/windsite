package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 系统模板类型
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_template_sys_type")
public class SystemTemplateType extends OrderTimestampModel {

	private static final long serialVersionUID = 1L;

	private String name;

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

}
