package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "t_propvalue")
public class T_PropValue extends OrderTimestampModel {

	private static final long serialVersionUID = 1L;
	private String cid;// Number 否 50010538 类目ID
	private String pid;// Number 否 1627207 属性 ID
	private String prop_name;// String 否 颜色 属性名
	private String vid;// Number 否 3232483 属性值ID
	private String name;// String 否 军绿色 属性值
	private String name_alias;// String 否 军绿色 属性值别名
	private Boolean is_parent;// Boolean 否 true 是否为父类目属性
	private String status;// String 否 normal 状态。可选值:normal(正常),deleted(删除)
	private String binds;

	/**
	 * @return the cid
	 */
	public String getCid() {
		return cid;
	}

	/**
	 * @param cid
	 *            the cid to set
	 */
	public void setCid(String cid) {
		this.cid = cid;
	}

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
	 * @return the prop_name
	 */
	public String getProp_name() {
		return prop_name;
	}

	/**
	 * @param propName
	 *            the prop_name to set
	 */
	public void setProp_name(String propName) {
		prop_name = propName;
	}

	/**
	 * @return the vid
	 */
	public String getVid() {
		return vid;
	}

	/**
	 * @param vid
	 *            the vid to set
	 */
	public void setVid(String vid) {
		this.vid = vid;
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
	 * @return the name_alias
	 */
	public String getName_alias() {
		return name_alias;
	}

	/**
	 * @param nameAlias
	 *            the name_alias to set
	 */
	public void setName_alias(String nameAlias) {
		name_alias = nameAlias;
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

	public void setBinds(String binds) {
		this.binds = binds;
	}

	public String getBinds() {
		return binds;
	}

	public void setIs_parent(Boolean is_parent) {
		this.is_parent = is_parent;
	}

	public Boolean getIs_parent() {
		return is_parent;
	}

}
