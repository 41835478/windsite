package com.wind.site.mail;

/**
 * 邮件发送接口
 * 
 * @author fxy
 * 
 */
public interface IWindMailSender {
	/**
	 * 发送邮件正文
	 * 
	 * @param msg
	 */
	void send() throws Exception;
}
