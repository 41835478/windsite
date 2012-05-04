package com.wind.site.mail;

import javax.mail.internet.InternetAddress;

import org.springframework.mail.javamail.JavaMailSender;

/**
 * 邮件发送抽象
 * 
 * @author fxy
 * 
 */
public abstract class AbstractWindMailSender implements IWindMailSender {

	/**
	 * 发送人
	 */
	protected InternetAddress from;
	/**
	 * 接收人
	 */
	protected String to;
	/**
	 * 邮件标题
	 */
	protected String subject;
	/**
	 * 邮件发送类
	 */
	protected JavaMailSender sender;

	/**
	 * @return the from
	 */
	public InternetAddress getFrom() {
		return from;
	}

	/**
	 * @param from
	 *            the from to set
	 */
	public void setFrom(InternetAddress from) {
		this.from = from;
	}

	public void setSender(JavaMailSender sender) {
		this.sender = sender;
	}

	public JavaMailSender getSender() {
		return sender;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public String getTo() {
		return to;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getSubject() {
		return subject;
	}

}
