package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "w_dianpu")
public class DianPu implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	/**
	 * 二级分类
	 */
	private Long secCat;
	/**
	 * 根分类
	 */
	private Long rootCat;
	/**
	 * 短名称
	 */
	private String shortTitle;
	/**
	 * 店铺名称
	 */
	private String title;
	/**
	 * 店铺地址
	 */
	private String url;
	/**
	 * 主营
	 */
	private String zhuying;

	/**
	 * 卖家用户标识
	 */
	private Long userId;
	/**
	 * 卖家昵称
	 */
	private String nick;
	/**
	 * 城市
	 */
	private String city;
	/**
	 * 信用
	 */
	private String sellerCredit;
	/**
	 * 佣金比率
	 */
	private String commissionRate;
	/**
	 * 好评
	 */
	private String haoping;
	private Long sid;// N 店铺编号。
	private Long cid;// Number N 店铺所属的类目编号。
	private String picPath;// String N 店标

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
	 * @return the shortTitle
	 */
	public String getShortTitle() {
		return shortTitle;
	}

	/**
	 * @param shortTitle
	 *            the shortTitle to set
	 */
	public void setShortTitle(String shortTitle) {
		this.shortTitle = shortTitle;
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
	 * @return the zhuying
	 */
	public String getZhuying() {
		return zhuying;
	}

	/**
	 * @param zhuying
	 *            the zhuying to set
	 */
	public void setZhuying(String zhuying) {
		this.zhuying = zhuying;
	}

	/**
	 * @return the userId
	 */
	public Long getUserId() {
		return userId;
	}

	/**
	 * @param userId
	 *            the userId to set
	 */
	public void setUserId(Long userId) {
		this.userId = userId;
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
	 * @return the sellerCredit
	 */
	public String getSellerCredit() {
		return sellerCredit;
	}

	/**
	 * @param sellerCredit
	 *            the sellerCredit to set
	 */
	public void setSellerCredit(String sellerCredit) {
		this.sellerCredit = sellerCredit;
	}

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
	 * @return the cid
	 */
	public Long getCid() {
		return cid;
	}

	/**
	 * @param cid
	 *            the cid to set
	 */
	public void setCid(Long cid) {
		this.cid = cid;
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

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUrl() {
		return url;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCity() {
		return city;
	}

	public void setHaoping(String haoping) {
		this.haoping = haoping;
	}

	public String getHaoping() {
		return haoping;
	}

	public void setCommissionRate(String commissionRate) {
		this.commissionRate = commissionRate;
	}

	public String getCommissionRate() {
		return commissionRate;
	}

	public void setSecCat(Long secCat) {
		this.secCat = secCat;
	}

	public Long getSecCat() {
		return secCat;
	}

	public void setRootCat(Long rootCat) {
		this.rootCat = rootCat;
	}

	public Long getRootCat() {
		return rootCat;
	}

}
