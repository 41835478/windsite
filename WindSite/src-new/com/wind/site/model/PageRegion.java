package com.wind.site.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 页面容器
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_page_region")
public class PageRegion implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * 主内容区
	 */
	public static final String MAIN_WRAP = "main-wrap";
	/**
	 * 子内容区
	 */
	public static final String COL_SUB = "col-sub";
	/**
	 * 扩展内容区
	 */
	public static final String COL_EXTRA = "col-extra";
	/**
	 * 容器标识
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	/**
	 * 容器类型
	 */
	private String region;
	/**
	 * 是否可编辑
	 */
	private Boolean isEdit;
	/**
	 * 所属布局
	 */
	private Long layout;
	/**
	 * 所属页面
	 */
	private String page;

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
	 * 排序是否正常
	 */
	private Boolean isSort;
	/**
	 * 所含模块
	 */
	@Transient
	private List<PageModule> modules;

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

	public void setRegion(String region) {
		this.region = region;
	}

	public String getRegion() {
		return region;
	}

	public void setLayout(Long layout) {
		this.layout = layout;
	}

	public Long getLayout() {
		return layout;
	}

	public void setModules(List<PageModule> modules) {
		this.modules = modules;
	}

	public List<PageModule> getModules() {
		return modules;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getPage() {
		return page;
	}

	public void setIsSort(Boolean isSort) {
		this.isSort = isSort;
	}

	public Boolean getIsSort() {
		return isSort;
	}

	public void setIsEdit(Boolean isEdit) {
		this.isEdit = isEdit;
	}

	public Boolean getIsEdit() {
		return isEdit;
	}

}
