package com.wind.site.model;

import java.util.Date;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Transient;

/**
 * 用户页面
 * 
 * @author fxy
 * 
 */
@Entity
@DiscriminatorValue("U")
public class UserPage extends Page {

	private static final long serialVersionUID = 1L;
	@Transient
	private Date nextDeploy;
	/**
	 * 模板所属用户
	 */
	private String user_id;
	/**
	 * 所属站点
	 */
	private String site_id;

	private String nick;
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

	@Transient
	private String path;

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
	 * @return the cid
	 */
	public String getCid() {
		return cid;
	}

	/**
	 * @param cid
	 *            the cid to set
	 */
	public void setCid(String cid) {
		this.cid = cid;
	}

	/**
	 * @return the pageid
	 */
	public String getPageid() {
		return pageid;
	}

	/**
	 * @param pageid
	 *            the pageid to set
	 */
	public void setPageid(String pageid) {
		this.pageid = pageid;
	}

	/**
	 * @return the uv
	 */
	public Long getUv() {
		return uv;
	}

	/**
	 * @param uv
	 *            the uv to set
	 */
	public void setUv(Long uv) {
		this.uv = uv;
	}

	/**
	 * @return the path
	 */
	public String getPath() {
		if (!this.getIsIndex()) {
			path = Math.abs(getCreated().getTime()) + ".html";
		}
		return path;
	}

	/**
	 * @param path
	 *            the path to set
	 */
	public void setPath(String path) {
		this.path = path;
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

	public void setNextDeploy(Date nextDeploy) {
		this.nextDeploy = nextDeploy;
	}

	public Date getNextDeploy() {
		return nextDeploy;
	}

}
