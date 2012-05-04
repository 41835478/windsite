package com.wind.site.command.impl;

import java.util.logging.Logger;

import com.wind.site.command.ICommand;
import com.wind.site.model.IPLog;
import com.wind.site.service.ICommandService;

/**
 * IP日志记录
 * 
 * @author fxy
 * 
 */
public class IPLogCommand implements ICommand {
	@SuppressWarnings("unused")
	private static final Logger logger = Logger.getLogger(IPLogCommand.class
			.getName());
	private IPLog log;

	@Override
	public void execute(ICommandService service) {
		if (log != null) {
			service.save(log);
			// CopyOnWriteArraySet<IPLog> ipLogs = CommandExecutor.getIPlogs();
			// ipLogs.add(log);// 加入缓存
			// if (ipLogs.size() >= 1000) {// 超过1000，刷新至数据库
			// logger.info("ipLogs[" + ipLogs.size() + "] is starting...");
			// service.saveAll(ipLogs);
			// ipLogs.clear();
			// logger.info("ipLogs[" + ipLogs.size() + "] is ended...");
			// }
		}
	}

	public void setLog(IPLog log) {
		this.log = log;
	}

	public IPLog getLog() {
		return log;
	}

}
