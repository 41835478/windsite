package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

/**
 * 页面元信息（布局，容器，模块）
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_page_meta")
public class PageMeta implements Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * 页面标识
	 */
	@Id
	private String id;
	/**
	 * 元信息
	 */
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private String metadata;
	/**
	 * 用户ID
	 */
	private String user_id;

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
	 * @return the metadata
	 */
	public String getMetadata() {
		return metadata;
	}

	/**
	 * @param metadata
	 *            the metadata to set
	 */
	public void setMetadata(String metadata) {
		this.metadata = metadata;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getUser_id() {
		return user_id;
	}

}
