package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 站点主题
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_site_theme")
public class SiteTheme implements Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * 站点ID
	 */
	@Id
	private String id;
	/**
	 * 主题ID
	 */
	private Long theme;
	/**
	 * 默认皮肤
	 */
	private String skin;
	/**
	 * 用户ID
	 */
	private String user_id;
	/**
	 * 用户昵称
	 */
	private String nick;

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the theme
	 */
	public Long getTheme() {
		return theme;
	}

	/**
	 * @param theme
	 *            the theme to set
	 */
	public void setTheme(Long theme) {
		this.theme = theme;
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

	public void setSkin(String skin) {
		this.skin = skin;
	}

	public String getSkin() {
		return skin;
	}

}
