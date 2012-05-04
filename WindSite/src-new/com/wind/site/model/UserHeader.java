package com.wind.site.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * 用户站点页头
 * 
 * @author fxy
 * 
 */
@Entity
@DiscriminatorValue("U")
public class UserHeader extends Header {
	private static final long serialVersionUID = 1L;
	/**
	 * 用户标识
	 */
	private String user_id;
	/**
	 * 用户昵称
	 */
	private String nick;
	/**
	 * 站点标识
	 */
	private String site_id;

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

}
