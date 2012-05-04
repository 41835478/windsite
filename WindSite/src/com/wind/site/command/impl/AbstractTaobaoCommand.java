package com.wind.site.command.impl;

import com.wind.site.command.ICommand;

/**
 * 淘宝异步命令基类
 * 
 * @author fxy
 * 
 */
public abstract class AbstractTaobaoCommand implements ICommand {
	protected String session;

	protected String nick;

	public void setNick(String nick) {
		this.nick = nick;
	}

	public String getNick() {
		return nick;
	}

	public String getSession() {
		return session;
	}

	public void setSession(String session) {
		this.session = session;
	}

}
