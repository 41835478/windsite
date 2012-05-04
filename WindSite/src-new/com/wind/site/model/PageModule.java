package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

/**
 * 模块类
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_page_module")
public class PageModule implements Serializable {

	/**
	 * 店标模块
	 */
	public static final String M_SHOPHEADER = "shopHeader";
	/**
	 * 搜索模块
	 */
	public static final String M_ITEMSEARCH = "itemSearch";
	/**
	 * flash广告牌
	 */
	public static final String M_SHOPFLASHSHOW = "shopFlashShow";
	/**
	 * 宝贝显示
	 */
	public static final String M_SHOPDISPLAY = "shopDisplay";
	/**
	 * 自定义
	 */
	public static final String M_SHOPCUSTOM = "shopCustom";
	/**
	 * 简易搜索框
	 */
	public static final String M_SHOPSEARCH = "shopSearch";
	/**
	 * 分类
	 */
	public static final String M_SHOPCATEGORY = "shopCategory";
	/**
	 * 友情链接
	 */
	public static final String M_SHOPLINKS = "shopLinks";

	private static final long serialVersionUID = 1L;
	/**
	 * 模块标识
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	/**
	 * 父模块标识（链式存储模块指针）
	 */
	private Long parent;
	/**
	 * 所属Region
	 */
	private Long region;
	/**
	 * 所属页面
	 */
	private String page;
	/**
	 * 自定义模块所在ftl
	 */
	private String userModule;

	/**
	 * 模块英文名
	 */
	private String name;
	/**
	 * 模块标题
	 */
	private String title;

	/**
	 * 模块元数据
	 */
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private String metadata;
	/**
	 * 所属会员
	 */
	private String user_id;
	/**
	 * 所属站点
	 */
	private String site_id;
	/**
	 * 所属会员昵称
	 */
	private String nick;

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
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
	 * @return the site_id
	 */
	public String getSite_id() {
		return site_id;
	}

	/**
	 * @param siteId
	 *            the site_id to set
	 */
	public void setSite_id(String siteId) {
		site_id = siteId;
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

	public void setId(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setParent(Long parent) {
		this.parent = parent;
	}

	public Long getParent() {
		return parent;
	}

	public void setRegion(Long region) {
		this.region = region;
	}

	public Long getRegion() {
		return region;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getPage() {
		return page;
	}

	public void setUserModule(String userModule) {
		this.userModule = userModule;
	}

	public String getUserModule() {
		return userModule;
	}

}
