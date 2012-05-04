package com.wind.site.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 推广组检测模型
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_itemgroupdoctor")
public class ItemGroupDoctor extends TimestampModel {
	@Transient
	public static final String STATE_WAIT = "0";
	@Transient
	public static final String STATE_SUCCESS = "1";
	@Transient
	public static final String STATE_ERROR = "2";
	@Transient
	private static final long serialVersionUID = 7861971320519196511L;
	@OneToOne(cascade = CascadeType.REFRESH)
	@JoinColumn(name = "gid")
	private ItemGroup group;
	/**
	 * 用户ID
	 */
	private String user_id;
	/**
	 * 当前检测状态,0--等待检测,1--检测完成,2--检测失败
	 */
	private String state;
	/**
	 * 当前检测信息
	 */
	private String msg;

	public void setGroup(ItemGroup group) {
		this.group = group;
	}

	public ItemGroup getGroup() {
		return group;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getState() {
		return state;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getMsg() {
		return msg;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getUser_id() {
		return user_id;
	}
}
