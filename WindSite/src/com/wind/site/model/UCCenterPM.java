package com.wind.site.model;

/**
 * UCCenter 短消息数据模型
 * 
 * @author fxy
 * 
 */
public class UCCenterPM {
	private Integer fromuid;
	private String msgto;
	private String subject;
	private String message;
	private Boolean instantly = true;
	private Integer replypid;
	private Boolean isusername = false;

	/**
	 * @return the fromuid
	 */
	public Integer getFromuid() {
		return fromuid;
	}

	/**
	 * @param fromuid
	 *            the fromuid to set
	 */
	public void setFromuid(Integer fromuid) {
		this.fromuid = fromuid;
	}

	/**
	 * @return the msgto
	 */
	public String getMsgto() {
		return msgto;
	}

	/**
	 * @param msgto
	 *            the msgto to set
	 */
	public void setMsgto(String msgto) {
		this.msgto = msgto;
	}

	/**
	 * @return the subject
	 */
	public String getSubject() {
		return subject;
	}

	/**
	 * @param subject
	 *            the subject to set
	 */
	public void setSubject(String subject) {
		this.subject = subject;
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
	 * @return the instantly
	 */
	public Boolean getInstantly() {
		return instantly;
	}

	/**
	 * @param instantly
	 *            the instantly to set
	 */
	public void setInstantly(Boolean instantly) {
		this.instantly = instantly;
	}

	/**
	 * @return the replypid
	 */
	public Integer getReplypid() {
		return replypid;
	}

	/**
	 * @param replypid
	 *            the replypid to set
	 */
	public void setReplypid(Integer replypid) {
		this.replypid = replypid;
	}

	/**
	 * @return the isusername
	 */
	public Boolean getIsusername() {
		return isusername;
	}

	/**
	 * @param isusername
	 *            the isusername to set
	 */
	public void setIsusername(Boolean isusername) {
		this.isusername = isusername;
	}

}
