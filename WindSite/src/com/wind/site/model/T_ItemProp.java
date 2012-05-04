package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "t_itemprop")
public class T_ItemProp extends OrderTimestampModel {
	private static final long serialVersionUID = 1L;
	private String pid;// Number 否 20000 属性 ID 例：品牌的PID=20000
	private String parent_pid;// Number 否 10000 上级属性ID
	private String parent_vid;// Number 否 24455 上级属性值ID
	private String name;// String 否 颜色 属性名
	private Boolean is_key_prop;// Boolean 否 true 是否关键属性。可选值:true(是),false(否)
	private Boolean is_sale_prop;// Boolean 否 true 是否销售属性。可选值:true(是),false(否)
	private Boolean is_color_prop;// Boolean 否 true 是否颜色属性。可选值:true(是),false(否)
	private Boolean is_enum_prop;// Boolean 否 true 是否是可枚举属性。可选值:true(是),false(否)
	private Boolean is_input_prop;// Boolean 否 true
	// 是否是卖家可以自行输入的属性。可选值:true(是),false(否)
	private Boolean is_item_prop;// Boolean 否 true 是否商品属性。可选值:true(是),false(否)
	private Boolean must;// Boolean 否 true 发布产品或商品时是否为必选属性。可选值:true(是),false(否)
	private Boolean multi;// Boolean 否 true 发布产品或商品时是否可以多选。可选值:true(是),false(否)

	private String status;// String 否 normal 状态。可选值:normal(正常),deleted(删除)
	private String child_template;// String 否 SomeTemplate 子属性的模板（卖家自行输入属性时需要用到）
	private Boolean is_allow_alias;// Boolean 否 true 是否允许别名。可选值：true（是），false（否）

	/**
	 * @return the pid
	 */
	public String getPid() {
		return pid;
	}

	/**
	 * @param pid
	 *            the pid to set
	 */
	public void setPid(String pid) {
		this.pid = pid;
	}

	/**
	 * @return the parent_pid
	 */
	public String getParent_pid() {
		return parent_pid;
	}

	/**
	 * @param parentPid
	 *            the parent_pid to set
	 */
	public void setParent_pid(String parentPid) {
		parent_pid = parentPid;
	}

	/**
	 * @return the parent_vid
	 */
	public String getParent_vid() {
		return parent_vid;
	}

	/**
	 * @param parentVid
	 *            the parent_vid to set
	 */
	public void setParent_vid(String parentVid) {
		parent_vid = parentVid;
	}

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
	 * @return the is_key_prop
	 */
	public Boolean getIs_key_prop() {
		return is_key_prop;
	}

	/**
	 * @param isKeyProp
	 *            the is_key_prop to set
	 */
	public void setIs_key_prop(Boolean isKeyProp) {
		is_key_prop = isKeyProp;
	}

	/**
	 * @return the is_sale_prop
	 */
	public Boolean getIs_sale_prop() {
		return is_sale_prop;
	}

	/**
	 * @param isSaleProp
	 *            the is_sale_prop to set
	 */
	public void setIs_sale_prop(Boolean isSaleProp) {
		is_sale_prop = isSaleProp;
	}

	/**
	 * @return the is_color_prop
	 */
	public Boolean getIs_color_prop() {
		return is_color_prop;
	}

	/**
	 * @param isColorProp
	 *            the is_color_prop to set
	 */
	public void setIs_color_prop(Boolean isColorProp) {
		is_color_prop = isColorProp;
	}

	/**
	 * @return the is_enum_prop
	 */
	public Boolean getIs_enum_prop() {
		return is_enum_prop;
	}

	/**
	 * @param isEnumProp
	 *            the is_enum_prop to set
	 */
	public void setIs_enum_prop(Boolean isEnumProp) {
		is_enum_prop = isEnumProp;
	}

	/**
	 * @return the is_input_prop
	 */
	public Boolean getIs_input_prop() {
		return is_input_prop;
	}

	/**
	 * @param isInputProp
	 *            the is_input_prop to set
	 */
	public void setIs_input_prop(Boolean isInputProp) {
		is_input_prop = isInputProp;
	}

	/**
	 * @return the is_item_prop
	 */
	public Boolean getIs_item_prop() {
		return is_item_prop;
	}

	/**
	 * @param isItemProp
	 *            the is_item_prop to set
	 */
	public void setIs_item_prop(Boolean isItemProp) {
		is_item_prop = isItemProp;
	}

	/**
	 * @return the must
	 */
	public Boolean getMust() {
		return must;
	}

	/**
	 * @param must
	 *            the must to set
	 */
	public void setMust(Boolean must) {
		this.must = must;
	}

	/**
	 * @return the multi
	 */
	public Boolean getMulti() {
		return multi;
	}

	/**
	 * @param multi
	 *            the multi to set
	 */
	public void setMulti(Boolean multi) {
		this.multi = multi;
	}

	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * @param status
	 *            the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * @return the child_template
	 */
	public String getChild_template() {
		return child_template;
	}

	/**
	 * @param childTemplate
	 *            the child_template to set
	 */
	public void setChild_template(String childTemplate) {
		child_template = childTemplate;
	}

	/**
	 * @return the is_allow_alias
	 */
	public Boolean getIs_allow_alias() {
		return is_allow_alias;
	}

	/**
	 * @param isAllowAlias
	 *            the is_allow_alias to set
	 */
	public void setIs_allow_alias(Boolean isAllowAlias) {
		is_allow_alias = isAllowAlias;
	}

}
