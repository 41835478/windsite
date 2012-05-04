package com.wind.site.model;

import java.io.Serializable;

/**
 * 模块小模型
 * 
 * @author fxy
 * 
 */
public class ModuleModel implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;

	public void setId(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}
}
