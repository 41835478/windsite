package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 淘宝客店铺
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "t_taokeshop")
public class T_TaobaokeShop implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	private Long userId;// Number 否 1212 店铺用户id

	// 通过抓取获得
	private String nick;// N 卖家昵称。
	// 通过taobao.taobaoke.shops.get获得
	private String title;// 店铺标题
	@Column(length = 5)
	private String sellerCredit;// 信用等级
	private String commissionRate;// 佣金比率
	// 通过taobao.shop.get获得
	private Long sid;// N 店铺编号。
	private Long cid;// Number N 店铺所属的类目编号。
	private String picPath;// String N 店标
	@Column(length = 5)
	private String itemScore;// 商品描述评分
	@Column(length = 5)
	private String serviceScore;// 服务态度评分
	@Column(length = 5)
	private String deliveryScore;// 发货速度评分

	private Boolean isValid;// 是否有效

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
	 * @return the itemScore
	 */
	public String getItemScore() {
		return itemScore;
	}

	/**
	 * @param itemScore
	 *            the itemScore to set
	 */
	public void setItemScore(String itemScore) {
		this.itemScore = itemScore;
	}

	/**
	 * @return the serviceScore
	 */
	public String getServiceScore() {
		return serviceScore;
	}

	/**
	 * @param serviceScore
	 *            the serviceScore to set
	 */
	public void setServiceScore(String serviceScore) {
		this.serviceScore = serviceScore;
	}

	/**
	 * @return the deliveryScore
	 */
	public String getDeliveryScore() {
		return deliveryScore;
	}

	/**
	 * @param deliveryScore
	 *            the deliveryScore to set
	 */
	public void setDeliveryScore(String deliveryScore) {
		this.deliveryScore = deliveryScore;
	}

	public void setCommissionRate(String commissionRate) {
		this.commissionRate = commissionRate;
	}

	public String getCommissionRate() {
		return commissionRate;
	}

	public void setIsValid(Boolean isValid) {
		this.isValid = isValid;
	}

	public Boolean getIsValid() {
		return isValid;
	}

	@Override
	public int hashCode() {
		return userId.hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (obj instanceof T_TaobaokeShop) {
			return ((T_TaobaokeShop) obj).getUserId().equals(this.getUserId());
		}
		return false;
	}

}
