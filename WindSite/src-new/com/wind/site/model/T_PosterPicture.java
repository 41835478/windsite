package com.wind.site.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "t_poster_picture")
public class T_PosterPicture implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	private Long id;// String 否 123456 图片ID。
	private Long poster_id;// 画报ID
	private Date created;// Date 否 2000-01-01 00:00:00 创建时间。
	private Date modified;// Date 否 2000-01-01 00:00:00 修改时间。
	private String url;// String 否 http://www.taobao.com/XXXXXX 图片地址。
	@Column(length = 500)
	private String description;// String 否 说明 相关说明。

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the poster_id
	 */
	public Long getPoster_id() {
		return poster_id;
	}

	/**
	 * @param posterId
	 *            the poster_id to set
	 */
	public void setPoster_id(Long posterId) {
		poster_id = posterId;
	}

	/**
	 * @return the created
	 */
	public Date getCreated() {
		return created;
	}

	/**
	 * @param created
	 *            the created to set
	 */
	public void setCreated(Date created) {
		this.created = created;
	}

	/**
	 * @return the modified
	 */
	public Date getModified() {
		return modified;
	}

	/**
	 * @param modified
	 *            the modified to set
	 */
	public void setModified(Date modified) {
		this.modified = modified;
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

}
