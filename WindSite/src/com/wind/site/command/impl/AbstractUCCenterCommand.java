package com.wind.site.command.impl;

import com.fivestars.interfaces.bbs.client.Client;
import com.wind.site.command.ICommand;

/**
 * UCCenter 命令
 * 
 * @author fxy
 * 
 */
public abstract class AbstractUCCenterCommand implements ICommand {

	protected Client client;

	public AbstractUCCenterCommand() {
		client = new Client();
	}

}
