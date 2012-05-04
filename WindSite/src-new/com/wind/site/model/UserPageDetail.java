package com.wind.site.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("D")
public class UserPageDetail extends Page {
	private static final long serialVersionUID = 1L;

	/**
	 * 模板所属用户
	 */
	private String user_id;
	/**
	 * 所属站点
	 */
	private String site_id;

	private String nick;

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

}
