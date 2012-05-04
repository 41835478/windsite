package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * 阵地账户
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_forum_account")
public class ForumAccount extends OrderTimestampModel {

	private static final long serialVersionUID = 1L;
	/**
	 * 昵称
	 */
	private String nick;
	/**
	 * 账户名
	 */
	private String account;
	/**
	 * 密码
	 */
	private String pwd;
	/**
	 * 描述
	 */
	private String description;
	@ManyToOne
	@JoinColumn(name = "fav_id")
	private FavoriteForum fav;

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
	 * @return the account
	 */
	public String getAccount() {
		return account;
	}

	/**
	 * @param account
	 *            the account to set
	 */
	public void setAccount(String account) {
		this.account = account;
	}

	/**
	 * @return the pwd
	 */
	public String getPwd() {
		return pwd;
	}

	/**
	 * @param pwd
	 *            the pwd to set
	 */
	public void setPwd(String pwd) {
		this.pwd = pwd;
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

	/**
	 * @return the fav
	 */
	public FavoriteForum getFav() {
		return fav;
	}

	/**
	 * @param fav
	 *            the fav to set
	 */
	public void setFav(FavoriteForum fav) {
		this.fav = fav;
	}

}
