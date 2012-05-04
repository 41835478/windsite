package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 淘分享
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "t_share")
public class T_TaobaoShare implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	private Long id;
	/**
	 * 头像
	 */
	private String avatar;
	/**
	 * 分享会员
	 */
	private String shareNick;
	/**
	 * 分享会员信用
	 */
	private String shareCredit;
	/**
	 * 分享时间
	 */
	private String shareTime;
	/**
	 * 分享内容
	 */
	private String shareComment;
	/**
	 * 买家秀
	 */
	private String shareShow;
	/**
	 * 商品标识
	 */
	private Long numIid;

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
	 * @return the avatar
	 */
	public String getAvatar() {
		return avatar;
	}

	/**
	 * @param avatar
	 *            the avatar to set
	 */
	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	/**
	 * @return the shareNick
	 */
	public String getShareNick() {
		return shareNick;
	}

	/**
	 * @param shareNick
	 *            the shareNick to set
	 */
	public void setShareNick(String shareNick) {
		this.shareNick = shareNick;
	}

	/**
	 * @return the shareCredit
	 */
	public String getShareCredit() {
		return shareCredit;
	}

	/**
	 * @param shareCredit
	 *            the shareCredit to set
	 */
	public void setShareCredit(String shareCredit) {
		this.shareCredit = shareCredit;
	}

	/**
	 * @return the shareTime
	 */
	public String getShareTime() {
		return shareTime;
	}

	/**
	 * @param shareTime
	 *            the shareTime to set
	 */
	public void setShareTime(String shareTime) {
		this.shareTime = shareTime;
	}

	/**
	 * @return the shareComment
	 */
	public String getShareComment() {
		return shareComment;
	}

	/**
	 * @param shareComment
	 *            the shareComment to set
	 */
	public void setShareComment(String shareComment) {
		this.shareComment = shareComment;
	}

	/**
	 * @return the shareShow
	 */
	public String getShareShow() {
		return shareShow;
	}

	/**
	 * @param shareShow
	 *            the shareShow to set
	 */
	public void setShareShow(String shareShow) {
		this.shareShow = shareShow;
	}

	/**
	 * @return the numIid
	 */
	public Long getNumIid() {
		return numIid;
	}

	/**
	 * @param numIid
	 *            the numIid to set
	 */
	public void setNumIid(Long numIid) {
		this.numIid = numIid;
	}

}
