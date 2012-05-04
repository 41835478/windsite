package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * 站点版款
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_forum")
public class Forum extends OrderTimestampModel {

	private static final long serialVersionUID = 1L;
	/**
	 * 标题
	 */
	private String title;
	/**
	 * 大旗地址
	 */
	private String url;
	/**
	 * 真实地址
	 */
	private String realUrl;
	/**
	 * 收藏人数
	 */
	private Integer favorite;

	/**
	 * 推广记录数
	 */
	private Integer threads;

	/**
	 * 描述
	 */
	private String description;
	/**
	 * 所属网站
	 */
	@ManyToOne
	@JoinColumn(name = "popularsite_id")
	private PopularSite site;
	/**
	 * 所属分类
	 */
	@ManyToOne
	@JoinColumn(name = "type_id")
	private ForumType type;

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
	 * @return the favorite
	 */
	public Integer getFavorite() {
		return favorite;
	}

	/**
	 * @param favorite
	 *            the favorite to set
	 */
	public void setFavorite(Integer favorite) {
		this.favorite = favorite;
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

	public void setSite(PopularSite site) {
		this.site = site;
	}

	public PopularSite getSite() {
		return site;
	}

	public void setType(ForumType type) {
		this.type = type;
	}

	public ForumType getType() {
		return type;
	}

	public void setRealUrl(String realUrl) {
		this.realUrl = realUrl;
	}

	public String getRealUrl() {
		return realUrl;
	}

	public void setThreads(Integer threads) {
		this.threads = threads;
	}

	public Integer getThreads() {
		return threads;
	}

}
