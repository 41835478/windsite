package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 版块分类
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_forum_type")
public class ForumType extends OrderTimestampModel {

	private static final long serialVersionUID = 1L;

	private String title;

	private String url;

	private String parent;

	private Boolean isSuccess = false;

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

	public void setParent(String parent) {
		this.parent = parent;
	}

	public String getParent() {
		return parent;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUrl() {
		return url;
	}

	public void setIsSuccess(Boolean isSuccess) {
		this.isSuccess = isSuccess;
	}

	public Boolean getIsSuccess() {
		return isSuccess;
	}

}
