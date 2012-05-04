package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 微博域名审核
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_weibo_domain")
public class WeiboDomainHistory implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * 站点标识
	 */
	@Id
	private String site_id;
	/**
	 * 域名
	 */
	private String tdomain;
	/**
	 * 备案号
	 */
	private String icp;
	/**
	 * 会员ID
	 */
	private String user_id;

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
	 * @return the tdomain
	 */
	public String getTdomain() {
		return tdomain;
	}

	/**
	 * @param tdomain
	 *            the tdomain to set
	 */
	public void setTdomain(String tdomain) {
		this.tdomain = tdomain;
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
	 * @return the site_id
	 */
	public String getSite_id() {
		return site_id;
	}

	/**
	 * @param siteId
	 *            the site_id to set
	 */
	public void setSite_id(String siteId) {
		site_id = siteId;
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

}
