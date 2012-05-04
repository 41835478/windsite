package com.wind.site.command;

import com.wind.site.service.ICommandService;

/**
 * 命令接口
 * 
 * @author fxy
 * 
 */
public interface ICommand {
	/**
	 * 执行方法
	 */
	void execute(ICommandService service);
}
