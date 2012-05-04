package com.wind.site.model;

import java.io.Serializable;

/**
 * 交易通知消息
 * 
 * @author fxy
 * 
 */
public class T_NotifyTrade implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long oid;
	private Long tid;
	private String seller_nick;
	private String buyer_nick;
	private String payment;
	private String trade_mark;
	private String type;
	private String status;
	private String modified;
	private Long user_id;

	/**
	 * @return the oid
	 */
	public Long getOid() {
		return oid;
	}

	/**
	 * @param oid
	 *            the oid to set
	 */
	public void setOid(Long oid) {
		this.oid = oid;
	}

	/**
	 * @return the tid
	 */
	public Long getTid() {
		return tid;
	}

	/**
	 * @param tid
	 *            the tid to set
	 */
	public void setTid(Long tid) {
		this.tid = tid;
	}

	/**
	 * @return the seller_nick
	 */
	public String getSeller_nick() {
		return seller_nick;
	}

	/**
	 * @param sellerNick
	 *            the seller_nick to set
	 */
	public void setSeller_nick(String sellerNick) {
		seller_nick = sellerNick;
	}

	/**
	 * @return the buyer_nick
	 */
	public String getBuyer_nick() {
		return buyer_nick;
	}

	/**
	 * @param buyerNick
	 *            the buyer_nick to set
	 */
	public void setBuyer_nick(String buyerNick) {
		buyer_nick = buyerNick;
	}

	/**
	 * @return the payment
	 */
	public String getPayment() {
		return payment;
	}

	/**
	 * @param payment
	 *            the payment to set
	 */
	public void setPayment(String payment) {
		this.payment = payment;
	}

	/**
	 * @return the trade_mark
	 */
	public String getTrade_mark() {
		return trade_mark;
	}

	/**
	 * @param tradeMark
	 *            the trade_mark to set
	 */
	public void setTrade_mark(String tradeMark) {
		trade_mark = tradeMark;
	}

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * @param status
	 *            the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * @return the modified
	 */
	public String getModified() {
		return modified;
	}

	/**
	 * @param modified
	 *            the modified to set
	 */
	public void setModified(String modified) {
		this.modified = modified;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public Long getUser_id() {
		return user_id;
	}

}
