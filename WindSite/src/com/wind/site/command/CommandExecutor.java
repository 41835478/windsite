package com.wind.site.command;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

import com.wind.site.command.impl.AbstractUpdateTemplateCommand;
import com.wind.site.command.impl.TopCometReceiveMsgCommand;
import com.wind.site.model.IPLog;
import com.wind.site.model.ItemCacheLog;
import com.wind.site.service.ICommandService;

/**
 * 命令执行器
 * 
 * @author fxy
 * 
 */
public class CommandExecutor {
	private static final Logger logger = Logger.getLogger(CommandExecutor.class
			.getName());
	private static final LinkedBlockingQueue<ICommand> commands = new LinkedBlockingQueue<ICommand>();
	/**
	 * 模板更新命令
	 */
	private static final ConcurrentHashMap<String, AbstractUpdateTemplateCommand> updateCommands = new ConcurrentHashMap<String, AbstractUpdateTemplateCommand>();
	/**
	 * 微购微博命令
	 */
	private static final ConcurrentHashMap<String, ICommand> weigouCommands = new ConcurrentHashMap<String, ICommand>();

	private static final ConcurrentHashMap<String, ICommand> cacheCommands = new ConcurrentHashMap<String, ICommand>();
	/**
	 * 商品详情缓存
	 */
	private static final CopyOnWriteArraySet<ItemCacheLog> itemLogs = new CopyOnWriteArraySet<ItemCacheLog>();
	/**
	 * IPLOG详情缓存
	 */
	private static final CopyOnWriteArraySet<IPLog> ipLogs = new CopyOnWriteArraySet<IPLog>();

	/**
	 * 主动通知集合
	 */
	private static final LinkedBlockingQueue<TopCometReceiveMsgCommand> topComets = new LinkedBlockingQueue<TopCometReceiveMsgCommand>();

	private ICommandService service;

	/**
	 * 
	 */
	public void runCommand() {
		ScheduledExecutorService executor = Executors
				.newScheduledThreadPool(12);
		/**
		 * 执行常规任务完成后等待10秒继续执行1
		 */
		executor.scheduleWithFixedDelay(new Runnable() {
			public void run() {
				executeCommands();
			}

		}, 2, 2, TimeUnit.SECONDS);
		/**
		 * 执行常规任务完成后等待10秒继续执行2
		 */
		executor.scheduleWithFixedDelay(new Runnable() {
			public void run() {
				executeCommands();
			}

		}, 2, 2, TimeUnit.SECONDS);
		/**
		 * 执行缓存生成命令等待10秒继续执行
		 */
		executor.scheduleWithFixedDelay(new Runnable() {
			public void run() {
				executeCacheCommands();
			}

		}, 10, 10, TimeUnit.SECONDS);
		// 模板更新5分钟执行一轮
		executor.scheduleAtFixedRate(new Runnable() {
			public void run() {
				executeTemplateCommands();
			}
		}, 10, 10, TimeUnit.SECONDS);
		// 微购微博1
		executor.scheduleAtFixedRate(new Runnable() {
			public void run() {
				executeWeigouCommands();
			}
		}, 1, 1, TimeUnit.SECONDS);
		// 微购微博2
		executor.scheduleAtFixedRate(new Runnable() {
			public void run() {
				executeWeigouCommands();
			}
		}, 2, 1, TimeUnit.SECONDS);
		// 微购微博3
		executor.scheduleAtFixedRate(new Runnable() {
			public void run() {
				executeWeigouCommands();
			}
		}, 3, 1, TimeUnit.SECONDS);
		// executor.scheduleAtFixedRate(new Runnable() {
		// public void run() {
		// executeWeigouCommands();
		// }
		// }, 0, 1, TimeUnit.SECONDS);
		/**
		 * 执行常规任务完成后等待10秒继续执行
		 */
		executor.scheduleWithFixedDelay(new Runnable() {
			public void run() {
				executeTopCometCommands();
			}

		}, 10, 10, TimeUnit.SECONDS);
	}

	public void executeTopCometCommands() {
		if (topComets != null && topComets.size() > 0) {
			while (!topComets.isEmpty()) {
				ICommand command = topComets.remove();
				try {
					if (command != null)
						command.execute(null);
				} catch (Exception e) {
					e.printStackTrace();
					logger.info(e.toString());
				}
			}
		}
	}

	public void executeCacheCommands() {
		if (cacheCommands != null && cacheCommands.size() > 0) {
			for (String key : cacheCommands.keySet()) {
				ICommand command = cacheCommands.get(key);
				try {
					if (command != null) {
						command.execute(service);
						cacheCommands.remove(key);
					}
				} catch (Exception e) {
					e.printStackTrace();
					logger.info(e.toString());
				}
			}
		}
	}

	public void executeTemplateCommands() {
		if (updateCommands != null && updateCommands.size() > 0) {
			for (String key : updateCommands.keySet()) {
				AbstractUpdateTemplateCommand command = updateCommands.get(key);
				try {
					if (command != null) {
						command.execute(service);
						updateCommands.remove(key);
					}
				} catch (Exception e) {
					e.printStackTrace();
					logger.info(e.toString());
				}
			}
		}
	}

	public void executeWeigouCommands() {
		if (weigouCommands != null && weigouCommands.size() > 0) {
			for (String key : weigouCommands.keySet()) {
				ICommand command = weigouCommands.get(key);
				try {
					if (command != null) {
						weigouCommands.remove(key);
						command.execute(service);
					}
				} catch (Exception e) {
					e.printStackTrace();
					logger.info(e.toString());
				}
			}
		}
	}

	public void executeCommands() {
		if (commands != null && commands.size() > 0) {
			while (!commands.isEmpty()) {
				ICommand command = commands.remove();
				try {
					if (command != null)
						command.execute(service);
				} catch (Exception e) {
					e.printStackTrace();
					logger.info(e.toString());
				}
			}
		}
	}

	public static LinkedBlockingQueue<ICommand> getCommands() {
		return commands;
	}

	public static LinkedBlockingQueue<TopCometReceiveMsgCommand> getTopComets() {
		return topComets;
	}

	/**
	 * @return the updatecommands
	 */
	public static ConcurrentHashMap<String, AbstractUpdateTemplateCommand> getUpdatecommands() {
		return updateCommands;
	}

	/**
	 * @return the updatecommands
	 */
	public static ConcurrentHashMap<String, ICommand> getWeigoucommands() {
		return weigouCommands;
	}

	public static ConcurrentHashMap<String, ICommand> getCachecommands() {
		return cacheCommands;
	}

	/**
	 * @return the service
	 */
	public ICommandService getService() {
		return service;
	}

	/**
	 * @param service
	 *            the service to set
	 */
	public void setService(ICommandService service) {
		this.service = service;
	}

	public static CopyOnWriteArraySet<ItemCacheLog> getItemlogs() {
		return itemLogs;
	}

	public static CopyOnWriteArraySet<IPLog> getIPlogs() {
		return ipLogs;
	}
}
