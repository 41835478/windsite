package com.wind.site.command.impl;

import com.taobao.api.TaobaoClient;

/**
 * 淘宝客异步命令基类
 * 
 * @author fxy
 * 
 */
public abstract class AbstractTaobaokeCommand extends AbstractTaobaoCommand {

	protected TaobaoClient client;

	public AbstractTaobaokeCommand() {
//		client = new DefaultTaobaoClient(EnvManager.getUrl(), EnvManager
//				.getAppKey(), EnvManager.getSecret());
	}

}
