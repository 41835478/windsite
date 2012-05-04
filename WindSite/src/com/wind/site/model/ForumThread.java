package com.wind.site.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * 阵地推广帖子
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_forum_thread")
public class ForumThread extends OrderTimestampModel {

	private static final long serialVersionUID = 1L;
	/**
	 * 标题
	 */
	private String title;
	/**
	 * 0-帖子/日志 1-回复/评论
	 */
	private Integer type;
	/**
	 * 地址
	 */
	private String url;
	/**
	 * 描述
	 */
	private String description;
	/**
	 * 发表人
	 */
	private String account;
	/**
	 * 日期
	 */
	private Date createdDate;
	@ManyToOne
	@JoinColumn(name = "fav_id")
	private FavoriteForum fav;

	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @param title
	 *            the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * @return the type
	 */
	public Integer getType() {
		return type;
	}

	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(Integer type) {
		this.type = type;
	}

	/**
	 * @return the url
	 */
	public String getUrl() {
		return url;
	}

	/**
	 * @param url
	 *            the url to set
	 */
	public void setUrl(String url) {
		this.url = url;
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
	 * @return the createdDate
	 */
	public Date getCreatedDate() {
		return createdDate;
	}

	/**
	 * @param createdDate
	 *            the createdDate to set
	 */
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public void setFav(FavoriteForum fav) {
		this.fav = fav;
	}

	public FavoriteForum getFav() {
		return fav;
	}

}
