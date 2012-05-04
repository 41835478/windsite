package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * 组件数据模型类型
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_widget_datatype")
public class WidgetDataType extends OrderTimestampModel {

	private static final long serialVersionUID = 1L;
	/**
	 * 类型英文名
	 */
	private String name;
	/**
	 * 类型名称
	 */
	private String title;
	/**
	 * 是否默认
	 */
	private Boolean isDefault = true;
	/**
	 * 组件类型
	 */
	@ManyToOne
	@JoinColumn(name = "w_t_id")
	private WidgetType type;

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTitle() {
		return title;
	}

	public void setType(WidgetType type) {
		this.type = type;
	}

	public WidgetType getType() {
		return type;
	}

	public void setIsDefault(Boolean isDefault) {
		this.isDefault = isDefault;
	}

	public Boolean getIsDefault() {
		return isDefault;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}
}
