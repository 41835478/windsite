package com.wind.uc.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * UCHome日志详情
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "uchome_blogfield")
public class UCBlogField implements Serializable {
	private static final long serialVersionUID = -8544494923013298378L;
	@Id
	private Integer blogid;
	private Integer uid;
	private String tag;
	private String message;
	private String postip;
	private String related;
	private Integer relatedtime;
	private String target_ids;
	private String hotuser;
	private Integer magiccolor;
	private Integer magicpaper;
	private Integer magiccall;

	/**
	 * @return the blogid
	 */
	public Integer getBlogid() {
		return blogid;
	}

	/**
	 * @param blogid
	 *            the blogid to set
	 */
	public void setBlogid(Integer blogid) {
		this.blogid = blogid;
	}

	/**
	 * @return the uid
	 */
	public Integer getUid() {
		return uid;
	}

	/**
	 * @param uid
	 *            the uid to set
	 */
	public void setUid(Integer uid) {
		this.uid = uid;
	}

	/**
	 * @return the tag
	 */
	public String getTag() {
		return tag;
	}

	/**
	 * @param tag
	 *            the tag to set
	 */
	public void setTag(String tag) {
		this.tag = tag;
	}

	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * @param message
	 *            the message to set
	 */
	public void setMessage(String message) {
		this.message = message;
	}

	/**
	 * @return the postip
	 */
	public String getPostip() {
		return postip;
	}

	/**
	 * @param postip
	 *            the postip to set
	 */
	public void setPostip(String postip) {
		this.postip = postip;
	}

	/**
	 * @return the related
	 */
	public String getRelated() {
		return related;
	}

	/**
	 * @param related
	 *            the related to set
	 */
	public void setRelated(String related) {
		this.related = related;
	}

	/**
	 * @return the relatedtime
	 */
	public Integer getRelatedtime() {
		return relatedtime;
	}

	/**
	 * @param relatedtime
	 *            the relatedtime to set
	 */
	public void setRelatedtime(Integer relatedtime) {
		this.relatedtime = relatedtime;
	}

	/**
	 * @return the target_ids
	 */
	public String getTarget_ids() {
		return target_ids;
	}

	/**
	 * @param targetIds
	 *            the target_ids to set
	 */
	public void setTarget_ids(String targetIds) {
		target_ids = targetIds;
	}

	/**
	 * @return the hotuser
	 */
	public String getHotuser() {
		return hotuser;
	}

	/**
	 * @param hotuser
	 *            the hotuser to set
	 */
	public void setHotuser(String hotuser) {
		this.hotuser = hotuser;
	}

	/**
	 * @return the magiccolor
	 */
	public Integer getMagiccolor() {
		return magiccolor;
	}

	/**
	 * @param magiccolor
	 *            the magiccolor to set
	 */
	public void setMagiccolor(Integer magiccolor) {
		this.magiccolor = magiccolor;
	}

	/**
	 * @return the magicpaper
	 */
	public Integer getMagicpaper() {
		return magicpaper;
	}

	/**
	 * @param magicpaper
	 *            the magicpaper to set
	 */
	public void setMagicpaper(Integer magicpaper) {
		this.magicpaper = magicpaper;
	}

	/**
	 * @return the magiccall
	 */
	public Integer getMagiccall() {
		return magiccall;
	}

	/**
	 * @param magiccall
	 *            the magiccall to set
	 */
	public void setMagiccall(Integer magiccall) {
		this.magiccall = magiccall;
	}

}
