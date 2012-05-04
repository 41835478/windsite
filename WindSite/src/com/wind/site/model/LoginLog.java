package com.wind.site.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 登录日志
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_login_log")
public class LoginLog extends Log {
	private static final long serialVersionUID = 1L;
	/**
	 * 登录类型是否为过期系统退出
	 */
	private Boolean isTimeOut = true;
	/**
	 * 登录时间
	 */
	private Date login;
	/**
	 * 登出时间
	 */
	private Date loginout;

	/**
	 * @return the login
	 */
	public Date getLogin() {
		return login;
	}

	/**
	 * @param login
	 *            the login to set
	 */
	public void setLogin(Date login) {
		this.login = login;
	}

	/**
	 * @return the loginout
	 */
	public Date getLoginout() {
		return loginout;
	}

	/**
	 * @param loginout
	 *            the loginout to set
	 */
	public void setLoginout(Date loginout) {
		this.loginout = loginout;
	}

	public void setIsTimeOut(Boolean isTimeOut) {
		this.isTimeOut = isTimeOut;
	}

	public Boolean getIsTimeOut() {
		return isTimeOut;
	}

}
