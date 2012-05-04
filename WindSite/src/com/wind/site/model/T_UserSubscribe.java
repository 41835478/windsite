package com.wind.site.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "t_usersubscribe")
public class T_UserSubscribe implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	private String user_id;

	private String nick;

	/**
	 * 订购结束时间。格式:yyyy-MM-dd HH:mm:ss
	 **/

	private Date endDate;

	/**
	 * 普及版（未付费） 1 最基础的功能 <br/>
	 * 分成版（未绑定域名） 1.4 不能推广系统频道，淘宝类模块（淘店铺，画报等...）<br/>
	 * 分成版（绑定域名） 1.5 可以推广系统频道，不可以推广淘宝类模块 <br/>
	 * 普及版（付费） 1.6 除返利功能以外 <br/>
	 * 返利版 2 包含返利功能<br/>
	 * 卖家版 3 包含卖家功能
	 **/

	private Float versionNo;

	/**
	 * @return the user_id
	 */
	public String getUser_id() {
		return user_id;
	}

	/**
	 * @param userId
	 *            the user_id to set
	 */
	public void setUser_id(String userId) {
		user_id = userId;
	}

	/**
	 * @return the endDate
	 */
	public Date getEndDate() {
		return endDate;
	}

	/**
	 * @param endDate
	 *            the endDate to set
	 */
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	/**
	 * @return the versionNo
	 */
	public Float getVersionNo() {
		return versionNo;
	}

	/**
	 * @param versionNo
	 *            the versionNo to set
	 */
	public void setVersionNo(Float versionNo) {
		this.versionNo = versionNo;
	}

	public void setNick(String nick) {
		this.nick = nick;
	}

	public String getNick() {
		return nick;
	}

}
