package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 独立域名绑定历史
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_domain")
public class DomainHistory extends OrderTimestampModel {

	private static final long serialVersionUID = 1L;
	/**
	 * 域名
	 */
	private String www;
	/**
	 * 备案号
	 */
	private String icp;
	/**
	 * 会员ID
	 */
	private String user_id;
	/**
	 * 站点标识
	 */
	private String site_id;
	/**
	 * 会员昵称
	 */
	private String nick;
	/**
	 * 状态:0:未审核,1:审核已通过,2:审核未通过
	 */
	private Integer status;
	/**
	 * 描述
	 */
	private String description;

	/**
	 * @return the www
	 */
	public String getWww() {
		return www;
	}

	/**
	 * @param www
	 *            the www to set
	 */
	public void setWww(String www) {
		this.www = www;
	}

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
	 * @return the nick
	 */
	public String getNick() {
		return nick;
	}

	/**
	 * @param nick
	 *            the nick to set
	 */
	public void setNick(String nick) {
		this.nick = nick;
	}

	/**
	 * @return the status
	 */
	public Integer getStatus() {
		return status;
	}

	/**
	 * @param status
	 *            the status to set
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description
	 *            the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	public void setSite_id(String site_id) {
		this.site_id = site_id;
	}

	public String getSite_id() {
		return site_id;
	}

	/**
	 * @return the icp
	 */
	public String getIcp() {
		return icp;
	}

	/**
	 * @param icp
	 *            the icp to set
	 */
	public void setIcp(String icp) {
		this.icp = icp;
	}

}
