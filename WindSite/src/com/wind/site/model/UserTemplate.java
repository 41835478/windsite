package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.apache.commons.lang.StringUtils;

/**
 * 用户级模板
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_template_user")
public class UserTemplate extends Template {

	private static final long serialVersionUID = 1L;
	/**
	 * 模板所属用户
	 */
	private String user_id;
	/**
	 * 页面类目
	 */
	private String cid;
	/**
	 * 页面PageID（创建时间getTime()）
	 */
	private String pageid;
	/**
	 * 当前页面UV
	 */
	private Long uv;

	@ManyToOne
	private Site site;
	@Transient
	private String path;
	/**
	 * 可见程度:0:public(对所有人开放),1:protected(对好友开放),2:private(私有,自己可见)默认为私有
	 */
	private Integer visibleType = 2;

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
	 * @return the visibleType
	 */
	public Integer getVisibleType() {
		return visibleType;
	}

	/**
	 * @param visibleType
	 *            the visibleType to set
	 */
	public void setVisibleType(Integer visibleType) {
		this.visibleType = visibleType;
	}

	public void setSite(Site site) {
		this.site = site;
	}

	public Site getSite() {
		return site;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getPath() {
		if (StringUtils.isNotEmpty(getParent())) {
			path = getName().hashCode() + ".html";
		}
		return path;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	public String getCid() {
		return cid;
	}

	public void setPageid(String pageid) {
		this.pageid = pageid;
	}

	public String getPageid() {
		return pageid;
	}

	public void setUv(Long uv) {
		this.uv = uv;
	}

	public Long getUv() {
		return uv;
	}

}
