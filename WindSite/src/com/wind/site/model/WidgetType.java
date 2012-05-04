package com.wind.site.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

/**
 * 组件类型
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_widget_type")
public class WidgetType extends OrderTimestampModel {
	private static final long serialVersionUID = -159117794155792749L;
	/**
	 * 类型英文名
	 */
	private String name;
	/**
	 * 类型中文名
	 */
	private String title;
	/**
	 * 描述
	 */
	private String description;
	/**
	 * 组件集合
	 */
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "w_t_id")
	@OrderBy("sortOrder")
	private List<Widget> widgets;
	/**
	 * 组件数据类型集合
	 */
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "w_t_id")
	@OrderBy("sortOrder")
	private List<WidgetDataType> dataTypes;

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @param title
	 *            the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * @return the widgets
	 */
	public List<Widget> getWidgets() {
		return widgets;
	}

	/**
	 * @param widgets
	 *            the widgets to set
	 */
	public void setWidgets(List<Widget> widgets) {
		this.widgets = widgets;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public void setDataTypes(List<WidgetDataType> dataTypes) {
		this.dataTypes = dataTypes;
	}

	public List<WidgetDataType> getDataTypes() {
		return dataTypes;
	}

}
