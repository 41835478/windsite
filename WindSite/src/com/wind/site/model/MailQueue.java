package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 邮件队列
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_mailqueue")
public class MailQueue extends TimestampModel {
	private static final long serialVersionUID = 1L;
	/**
	 * 类型
	 */
	private String type;
	/**
	 * 接收人ID
	 */
	private String user_id;
	/**
	 * 接收人
	 */
	private String toEmail;
	/**
	 * 发送人
	 */
	private String fromEmail;
	/**
	 * 是否成功
	 */
	private Boolean isSuccess;

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
	 * @return the toEmail
	 */
	public String getToEmail() {
		return toEmail;
	}

	/**
	 * @param toEmail
	 *            the toEmail to set
	 */
	public void setToEmail(String toEmail) {
		this.toEmail = toEmail;
	}

	/**
	 * @return the fromEmail
	 */
	public String getFromEmail() {
		return fromEmail;
	}

	/**
	 * @param fromEmail
	 *            the fromEmail to set
	 */
	public void setFromEmail(String fromEmail) {
		this.fromEmail = fromEmail;
	}

	/**
	 * @return the isSuccess
	 */
	public Boolean getIsSuccess() {
		return isSuccess;
	}

	/**
	 * @param isSuccess
	 *            the isSuccess to set
	 */
	public void setIsSuccess(Boolean isSuccess) {
		this.isSuccess = isSuccess;
	}

}
