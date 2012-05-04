package com.wind.site.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 新版本页面抽象数据结构
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_page")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("P")
public class Page extends TimestampModel {

	private static final long serialVersionUID = 1L;

	/**
	 * 模板名称
	 */
	private String title;
	/**
	 * 模板关键词
	 */
	@Column(length = 500)
	private String keywords;
	/**
	 * 模板描述
	 */
	private String description;
	/**
	 * 皮肤CSS
	 */
	private String skin;
	/**
	 * 模板CSS
	 */
	private String css;
	/**
	 * 模板JS
	 */
	private String js;

	/**
	 * 是否为首页
	 */
	private Boolean isIndex = false;

	/**
	 * 模板发布状态<br/>
	 */
	private Boolean status = false;
	/**
	 * 最新发布时间
	 */
	private Date deployDate;
	/**
	 * 页头
	 */
	@Transient
	private PageHeaderLayout header;

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
	 * @return the keywords
	 */
	public String getKeywords() {
		return keywords;
	}

	/**
	 * @param keywords
	 *            the keywords to set
	 */
	public void setKeywords(String keywords) {
		this.keywords = keywords;
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
	 * @return the css
	 */
	public String getCss() {
		return css;
	}

	/**
	 * @param css
	 *            the css to set
	 */
	public void setCss(String css) {
		this.css = css;
	}

	/**
	 * @return the js
	 */
	public String getJs() {
		return js;
	}

	/**
	 * @param js
	 *            the js to set
	 */
	public void setJs(String js) {
		this.js = js;
	}

	/**
	 * @return the isIndex
	 */
	public Boolean getIsIndex() {
		return isIndex;
	}

	/**
	 * @param isIndex
	 *            the isIndex to set
	 */
	public void setIsIndex(Boolean isIndex) {
		this.isIndex = isIndex;
	}

	/**
	 * @return the status
	 */
	public Boolean getStatus() {
		return status;
	}

	/**
	 * @param status
	 *            the status to set
	 */
	public void setStatus(Boolean status) {
		this.status = status;
	}

	public void setHeader(PageHeaderLayout header) {
		this.header = header;
	}

	public PageHeaderLayout getHeader() {
		return header;
	}

	public void setDeployDate(Date deployDate) {
		this.deployDate = deployDate;
	}

	public Date getDeployDate() {
		return deployDate;
	}
}
