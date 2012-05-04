package com.wind.site.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.Lob;
import javax.persistence.MappedSuperclass;

/**
 * 模板类
 * 
 * @author fxy
 * 
 */
@MappedSuperclass
public class Template extends OrderTimestampModel {
	private static final long serialVersionUID = 1L;
	/**
	 * 模板名称
	 */
	private String name;
	/**
	 * 模板描述
	 */
	private String description;
	/**
	 * 模板关键词
	 */
	@Column(length = 500)
	private String metadata;
	/**
	 * 模板版本
	 */
	private String t_version;
	/**
	 * 模板皮肤
	 */
	private String skin = "default";
	/**
	 * 是否为默认
	 */
	private Boolean isDefault = false;

	/**
	 * 模板发布状态<br/>
	 * 0:未发布 1:已发布
	 */
	private Integer status = 0;
	/**
	 * 模板内容
	 */
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private String content;
	/**
	 * 模板Header
	 */
	@Column(length = 4000)
	private String header;
	/**
	 * 模板类型(0-首页,1-子页)
	 */
	private String parent;
	/**
	 * 推广组ID列表
	 */
	@Column(length = 500)
	private String gids;

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
	 * @return the isDefault
	 */
	public Boolean getIsDefault() {
		return isDefault;
	}

	/**
	 * @param isDefault
	 *            the isDefault to set
	 */
	public void setIsDefault(Boolean isDefault) {
		this.isDefault = isDefault;
	}

	/**
	 * @return the content
	 */
	public String getContent() {
		return content;
	}

	/**
	 * @param content
	 *            the content to set
	 */
	public void setContent(String content) {
		this.content = content;
	}

	public void setSkin(String skin) {
		this.skin = skin;
	}

	public String getSkin() {
		return skin;
	}

	public void setGids(String gids) {
		this.gids = gids;
	}

	public String getGids() {
		return gids;
	}

	public void setMetadata(String metadata) {
		this.metadata = metadata;
	}

	public String getMetadata() {
		return metadata;
	}

	public void setHeader(String header) {
		this.header = header;
	}

	public String getHeader() {
		return header;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}

	public String getParent() {
		return parent;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getStatus() {
		return status;
	}

	public void setT_version(String t_version) {
		this.t_version = t_version;
	}

	public String getT_version() {
		return t_version;
	}
}
