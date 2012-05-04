package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 页面模板
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_page_template")
public class PageTemplate implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	private String id;
	/**
	 * 模板标题
	 */
	private String title;
	/**
	 * 模板描述
	 */
	private String description;
	/**
	 * 皮肤
	 */
	private String skin;
	/**
	 * 主题
	 */
	private String theme;
	/**
	 * 小图
	 */
	private String smaillPic;
	/**
	 * 大图
	 */
	private String bigPic;
	/**
	 * 版本号
	 */
	private String versionNo;
	/**
	 * 演示地址
	 */
	private String url;
	/**
	 * 排序
	 */
	private Integer sortOrder;

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
	 * @return the skin
	 */
	public String getSkin() {
		return skin;
	}

	/**
	 * @param skin
	 *            the skin to set
	 */
	public void setSkin(String skin) {
		this.skin = skin;
	}

	/**
	 * @return the theme
	 */
	public String getTheme() {
		return theme;
	}

	/**
	 * @param theme
	 *            the theme to set
	 */
	public void setTheme(String theme) {
		this.theme = theme;
	}

	/**
	 * @return the smaillPic
	 */
	public String getSmaillPic() {
		return smaillPic;
	}

	/**
	 * @param smaillPic
	 *            the smaillPic to set
	 */
	public void setSmaillPic(String smaillPic) {
		this.smaillPic = smaillPic;
	}

	/**
	 * @return the bigPic
	 */
	public String getBigPic() {
		return bigPic;
	}

	/**
	 * @param bigPic
	 *            the bigPic to set
	 */
	public void setBigPic(String bigPic) {
		this.bigPic = bigPic;
	}

	/**
	 * @return the versionNo
	 */
	public String getVersionNo() {
		return versionNo;
	}

	/**
	 * @param versionNo
	 *            the versionNo to set
	 */
	public void setVersionNo(String versionNo) {
		this.versionNo = versionNo;
	}

	public void setSortOrder(Integer sortOrder) {
		this.sortOrder = sortOrder;
	}

	public Integer getSortOrder() {
		return sortOrder;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUrl() {
		return url;
	}

}
