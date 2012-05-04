package com.wind.site.model;

import java.io.Serializable;

/**
 * 商品通知消息
 * 
 * @author fxy
 * 
 */
public class T_NotifyItem implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long sku_id;
	private Long sku_num;
	private Long num_iid;
	private String title;
	private String nick;
	private Long num;
	private String status;
	private String changed_fields;
	private String price;
	private String modified;
	private Long user_id;

	/**
	 * @return the sku_id
	 */
	public Long getSku_id() {
		return sku_id;
	}

	/**
	 * @param skuId
	 *            the sku_id to set
	 */
	public void setSku_id(Long skuId) {
		sku_id = skuId;
	}

	/**
	 * @return the sku_num
	 */
	public Long getSku_num() {
		return sku_num;
	}

	/**
	 * @param skuNum
	 *            the sku_num to set
	 */
	public void setSku_num(Long skuNum) {
		sku_num = skuNum;
	}

	/**
	 * @return the num_iid
	 */
	public Long getNum_iid() {
		return num_iid;
	}

	/**
	 * @param numIid
	 *            the num_iid to set
	 */
	public void setNum_iid(Long numIid) {
		num_iid = numIid;
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
	 * @return the num
	 */
	public Long getNum() {
		return num;
	}

	/**
	 * @param num
	 *            the num to set
	 */
	public void setNum(Long num) {
		this.num = num;
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
	 * @return the changed_fields
	 */
	public String getChanged_fields() {
		return changed_fields;
	}

	/**
	 * @param changedFields
	 *            the changed_fields to set
	 */
	public void setChanged_fields(String changedFields) {
		changed_fields = changedFields;
	}

	/**
	 * @return the price
	 */
	public String getPrice() {
		return price;
	}

	/**
	 * @param price
	 *            the price to set
	 */
	public void setPrice(String price) {
		this.price = price;
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
