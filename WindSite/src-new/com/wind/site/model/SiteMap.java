package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 自定义站点地图
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_sitemap")
public class SiteMap implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	private Long id;
	/**
	 * 所属分类
	 */
	private Long cid;
	/**
	 * 标题
	 */
	private String title;
	/**
	 * 地址
	 */
	private String url;
	/**
	 * 描述
	 */
	private String description;

	/**
	 * 排序
	 */
	private Integer sortOrder;

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
	 * @return the sortOrder
	 */
	public Integer getSortOrder() {
		return sortOrder;
	}

	/**
	 * @param sortOrder
	 *            the sortOrder to set
	 */
	public void setSortOrder(Integer sortOrder) {
		this.sortOrder = sortOrder;
	}

	public void setCid(Long cid) {
		this.cid = cid;
	}

	public Long getCid() {
		return cid;
	}

}
