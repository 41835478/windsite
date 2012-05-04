package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * 版块收藏
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_forum_favorite")
public class FavoriteForum extends OrderTimestampModel {
	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "forum_id")
	private Forum forum;

	private String user_id;

	private String nick;
	/**
	 * 收藏站点类型
	 */
	private String type;
	/**
	 * 推广记录数
	 */
	private Integer threads;

	/**
	 * @return the forum
	 */
	public Forum getForum() {
		return forum;
	}

	/**
	 * @param forum
	 *            the forum to set
	 */
	public void setForum(Forum forum) {
		this.forum = forum;
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

	public void setType(String type) {
		this.type = type;
	}

	public String getType() {
		return type;
	}

	public void setThreads(Integer threads) {
		this.threads = threads;
	}

	public Integer getThreads() {
		return threads;
	}
}
