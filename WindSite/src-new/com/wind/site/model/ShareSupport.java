package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 分享与收藏
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_share")
public class ShareSupport implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	private Long userId;

	private String nick;
	@Column(length = 2000)
	private String share;

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
	 * @return the share
	 */
	public String getShare() {
		return share;
	}

	/**
	 * @param share
	 *            the share to set
	 */
	public void setShare(String share) {
		this.share = share;
	}

}
