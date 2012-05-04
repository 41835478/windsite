package com.wind.site.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 自定义站点地图（用户前台浏览）
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_sitemap_cat")
public class SiteMapCategory implements Serializable {

	private static final long serialVersionUID = 1L;

	public static final String XINTAO = "X";
	public static final String PAGE = "P";
	public static final String SHOP = "S";
	public static final String TAOBAO = "T";
	public static final String CUSTOM = "C";
	@Id
	private Long id;
	/**
	 * 标题
	 */
	private String title;

	/**
	 * 描述
	 */
	private String description;
	/**
	 * 类别（P=自定义页面,X=新淘网频道,T=淘宝频道,S=合作商家,C=自定义）
	 */
	private String type;
	/**
	 * 排序
	 */
	private Integer sortOrder;

	private String user_id;
	private String nick;
	@Transient
	private List<SiteMap> sites;

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
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	public void setSortOrder(Integer sortOrder) {
		this.sortOrder = sortOrder;
	}

	public Integer getSortOrder() {
		return sortOrder;
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

	public void setNick(String nick) {
		this.nick = nick;
	}

	public String getNick() {
		return nick;
	}

	public void setSites(List<SiteMap> sites) {
		this.sites = sites;
	}

	public List<SiteMap> getSites() {
		return sites;
	}

}
