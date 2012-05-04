package com.wind.site.command;

import java.util.TimerTask;

import com.wind.site.service.ICommandService;

/**
 * RSS订阅生成任务
 * 
 * @author fxy
 * 
 */
public class RssTaskCommand extends TimerTask {
	private ICommandService service;

	@Override
	public void run() {
		//service.findAllByCriterion(User.class, R.l("updated", value));
	}

	public void setService(ICommandService service) {
		this.service = service;
	}

	public ICommandService getService() {
		return service;
	}

}
