package com.wind.site.model;

import java.io.Serializable;
import java.util.List;

/**
 * 区域小模型
 * 
 * @author fxy
 * 
 */
public class RegionModel implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	/**
	 * 是否可编辑
	 */
	private Boolean isEdit;

	private List<ModuleModel> modules;

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
	 * @return the modules
	 */
	public List<ModuleModel> getModules() {
		return modules;
	}

	/**
	 * @param modules
	 *            the modules to set
	 */
	public void setModules(List<ModuleModel> modules) {
		this.modules = modules;
	}

	public void setIsEdit(Boolean isEdit) {
		this.isEdit = isEdit;
	}

	public Boolean getIsEdit() {
		return isEdit;
	}

}
