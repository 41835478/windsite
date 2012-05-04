package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 淘宝商城品牌
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "t_mallbrand")
public class T_MallBrand implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	private Long sid;

	private Long cid;

	private String nick;

	private String title;

	private String picPath;

	private String url;

	private Integer sortOrder;
	/**
	 * 是否有效
	 */
	private Boolean isValid = false;

	/**
	 * @return the sid
	 */
	public Long getSid() {
		return sid;
	}

	/**
	 * @param sid
	 *            the sid to set
	 */
	public void setSid(Long sid) {
		this.sid = sid;
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
	 * @return the picPath
	 */
	public String getPicPath() {
		return picPath;
	}

	/**
	 * @param picPath
	 *            the picPath to set
	 */
	public void setPicPath(String picPath) {
		this.picPath = picPath;
	}

	public void setCid(Long cid) {
		this.cid = cid;
	}

	public Long getCid() {
		return cid;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUrl() {
		return url;
	}

	public void setSortOrder(Integer sortOrder) {
		this.sortOrder = sortOrder;
	}

	public Integer getSortOrder() {
		return sortOrder;
	}

	public void setIsValid(Boolean isValid) {
		this.isValid = isValid;
	}

	public Boolean getIsValid() {
		return isValid;
	}

}
