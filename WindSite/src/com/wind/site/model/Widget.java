package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 淘客商品展示组件模型
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_widget")
public class Widget extends OrderTimestampModel {

	private static final long serialVersionUID = 6144079324325226006L;
	/**
	 * 组件英文名
	 */
	private String name;
	/**
	 * 组件中文名
	 */
	private String title;

	/**
	 * 是否默认
	 */
	private Boolean isDefault = false;
	/**
	 * 组件类型
	 */
	@ManyToOne
	@JoinColumn(name = "w_t_id")
	private WidgetType type;

	/**
	 * 描述
	 */
	private String description;
	/**
	 * 是否收费
	 */
	private Boolean isCharge = false;
	/**
	 * 组件所属布局 0：单栏 1：两栏（1-3）右 2：三栏（1-3-1）中 3：两栏（1-1）左/右 4：三栏（1-1-1）左/中/右
	 * 5：两栏（1-3）左 6：三栏（1-3-1）左/右
	 */
	private Integer layout;
	/**
	 * 内容
	 */
	@Transient
	private String content;

	private Integer a_s = 0;
	private Integer l_a_s = 0;
	private Integer l_a_s_p = 0;
	private Integer d_a_i = 0;
	private Integer l_d_a_i = 0;
	private Integer l_d_a_i_p = 0;

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

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public void setIsCharge(Boolean isCharge) {
		this.isCharge = isCharge;
	}

	public Boolean getIsCharge() {
		return isCharge;
	}

	public void setIsDefault(Boolean isDefault) {
		this.isDefault = isDefault;
	}

	public Boolean getIsDefault() {
		return isDefault;
	}

	/**
	 * @return the a_s
	 */
	public Integer getA_s() {
		return a_s;
	}

	/**
	 * @param aS
	 *            the a_s to set
	 */
	public void setA_s(Integer aS) {
		a_s = aS;
	}

	/**
	 * @return the l_a_s
	 */
	public Integer getL_a_s() {
		return l_a_s;
	}

	/**
	 * @param lAS
	 *            the l_a_s to set
	 */
	public void setL_a_s(Integer lAS) {
		l_a_s = lAS;
	}

	/**
	 * @return the l_a_s_p
	 */
	public Integer getL_a_s_p() {
		return l_a_s_p;
	}

	/**
	 * @param lASP
	 *            the l_a_s_p to set
	 */
	public void setL_a_s_p(Integer lASP) {
		l_a_s_p = lASP;
	}

	/**
	 * @return the d_a_i
	 */
	public Integer getD_a_i() {
		return d_a_i;
	}

	/**
	 * @param dAI
	 *            the d_a_i to set
	 */
	public void setD_a_i(Integer dAI) {
		d_a_i = dAI;
	}

	/**
	 * @return the l_d_a_i
	 */
	public Integer getL_d_a_i() {
		return l_d_a_i;
	}

	/**
	 * @param lDAI
	 *            the l_d_a_i to set
	 */
	public void setL_d_a_i(Integer lDAI) {
		l_d_a_i = lDAI;
	}

	/**
	 * @return the l_d_a_i_p
	 */
	public Integer getL_d_a_i_p() {
		return l_d_a_i_p;
	}

	/**
	 * @param lDAIP
	 *            the l_d_a_i_p to set
	 */
	public void setL_d_a_i_p(Integer lDAIP) {
		l_d_a_i_p = lDAIP;
	}

	/**
	 * @return the layout
	 */
	public Integer getLayout() {
		return layout;
	}

	/**
	 * @param layout
	 *            the layout to set
	 */
	public void setLayout(Integer layout) {
		this.layout = layout;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getContent() {
		return content;
	}

	public void setType(WidgetType type) {
		this.type = type;
	}

	public WidgetType getType() {
		return type;
	}

}
