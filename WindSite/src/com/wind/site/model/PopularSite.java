package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 推广阵地
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_popularsite")
public class PopularSite extends OrderTimestampModel {

	private static final long serialVersionUID = 1L;

	/**
	 * 标题
	 */
	private String title;
	/**
	 * 地址
	 */
	private String url;
	/**
	 * 收藏人数
	 */
	private Integer favorite;

	/**
	 * 描述
	 */
	private String description;

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

	public void setFavorite(Integer favorite) {
		this.favorite = favorite;
	}

	public Integer getFavorite() {
		return favorite;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
