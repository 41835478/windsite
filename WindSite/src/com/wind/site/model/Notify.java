package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 淘宝箱订阅通知模型
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "t_notify")
public class Notify extends TimestampModel {
	private static final long serialVersionUID = -8806537882434054485L;
	private String tenantId;
	private String userId;
	private String nick;
	private String leaseId;
	private String leaseType;
	private String subscId;
	private String validateDate;
	private String invalidateDate;
	private String totalAmount;
	private String rentAmount;
	private String resourceAmount;
	private String isvOrderId;
	private String subscType;
	private String pricePolicy;

	/**
	 * @return the tenantId
	 */
	public String getTenantId() {
		return tenantId;
	}

	/**
	 * @param tenantId
	 *            the tenantId to set
	 */
	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}

	/**
	 * @return the userId
	 */
	public String getUserId() {
		return userId;
	}

	/**
	 * @param userId
	 *            the userId to set
	 */
	public void setUserId(String userId) {
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
	 * @return the leaseId
	 */
	public String getLeaseId() {
		return leaseId;
	}

	/**
	 * @param leaseId
	 *            the leaseId to set
	 */
	public void setLeaseId(String leaseId) {
		this.leaseId = leaseId;
	}

	/**
	 * @return the leaseType
	 */
	public String getLeaseType() {
		return leaseType;
	}

	/**
	 * @param leaseType
	 *            the leaseType to set
	 */
	public void setLeaseType(String leaseType) {
		this.leaseType = leaseType;
	}

	/**
	 * @return the subscId
	 */
	public String getSubscId() {
		return subscId;
	}

	/**
	 * @param subscId
	 *            the subscId to set
	 */
	public void setSubscId(String subscId) {
		this.subscId = subscId;
	}

	/**
	 * @return the validateDate
	 */
	public String getValidateDate() {
		return validateDate;
	}

	/**
	 * @param validateDate
	 *            the validateDate to set
	 */
	public void setValidateDate(String validateDate) {
		this.validateDate = validateDate;
	}

	/**
	 * @return the invalidateDate
	 */
	public String getInvalidateDate() {
		return invalidateDate;
	}

	/**
	 * @param invalidateDate
	 *            the invalidateDate to set
	 */
	public void setInvalidateDate(String invalidateDate) {
		this.invalidateDate = invalidateDate;
	}

	/**
	 * @return the totalAmount
	 */
	public String getTotalAmount() {
		return totalAmount;
	}

	/**
	 * @param totalAmount
	 *            the totalAmount to set
	 */
	public void setTotalAmount(String totalAmount) {
		this.totalAmount = totalAmount;
	}

	/**
	 * @return the rentAmount
	 */
	public String getRentAmount() {
		return rentAmount;
	}

	/**
	 * @param rentAmount
	 *            the rentAmount to set
	 */
	public void setRentAmount(String rentAmount) {
		this.rentAmount = rentAmount;
	}

	/**
	 * @return the resourceAmount
	 */
	public String getResourceAmount() {
		return resourceAmount;
	}

	/**
	 * @param resourceAmount
	 *            the resourceAmount to set
	 */
	public void setResourceAmount(String resourceAmount) {
		this.resourceAmount = resourceAmount;
	}

	/**
	 * @return the isvOrderId
	 */
	public String getIsvOrderId() {
		return isvOrderId;
	}

	/**
	 * @param isvOrderId
	 *            the isvOrderId to set
	 */
	public void setIsvOrderId(String isvOrderId) {
		this.isvOrderId = isvOrderId;
	}

	/**
	 * @return the subscType
	 */
	public String getSubscType() {
		return subscType;
	}

	/**
	 * @param subscType
	 *            the subscType to set
	 */
	public void setSubscType(String subscType) {
		this.subscType = subscType;
	}

	/**
	 * @return the pricePolicy
	 */
	public String getPricePolicy() {
		return pricePolicy;
	}

	/**
	 * @param pricePolicy
	 *            the pricePolicy to set
	 */
	public void setPricePolicy(String pricePolicy) {
		this.pricePolicy = pricePolicy;
	}
}
