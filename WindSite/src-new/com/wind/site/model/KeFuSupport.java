package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 客服系统
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_kefu")
public class KeFuSupport implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	private Long userId;

	private String nick;
	@Column(length = 2000)
	private String kefu;

	/**
	 * @return the userId
	 */
	public Long getUserId() {
		return userId;
	}

	/**
	 * @param userId
	 *            the userId to set
	 */
	public void setUserId(Long userId) {
		this.userId = userId;
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
	 * @return the kefu
	 */
	public String getKefu() {
		return kefu;
	}

	/**
	 * @param kefu
	 *            the kefu to set
	 */
	public void setKefu(String kefu) {
		this.kefu = kefu;
	}

}
