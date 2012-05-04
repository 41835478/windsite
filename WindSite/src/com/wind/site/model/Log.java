package com.wind.site.model;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

/**
 * 日志模型
 * 
 * @author fxy
 * 
 */
@MappedSuperclass
public class Log extends TimestampModel {

	private static final long serialVersionUID = 1L;
	/**
	 * 日志类型
	 */
	private String type;
	/**
	 * 日志内容
	 */
	@Column(length = 2000)
	private String content;
	/**
	 * 用户名
	 */
	private String nick;

	public void setType(String type) {
		this.type = type;
	}

	public String getType() {
		return type;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getContent() {
		return content;
	}

	public void setNick(String nick) {
		this.nick = nick;
	}

	public String getNick() {
		return nick;
	}

}
