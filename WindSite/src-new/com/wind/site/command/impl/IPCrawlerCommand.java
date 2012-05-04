package com.wind.site.command.impl;

import java.util.Date;

import org.apache.commons.lang.StringUtils;

import com.wind.site.command.ICommand;
import com.wind.site.model.IPCrawler;
import com.wind.site.service.ICommandService;

public class IPCrawlerCommand implements ICommand {

	private String ip;

	@Override
	public void execute(ICommandService service) {
		if (StringUtils.isNotEmpty(ip)) {
			IPCrawler crawler = service.get(IPCrawler.class, ip);
			if (crawler != null) {
				crawler.setHits(crawler.getHits() + 1);
				crawler.setUpdated(new Date());
				service.update(crawler);
			} else {
				crawler = new IPCrawler();
				crawler.setHits(1L);
				crawler.setIp(ip);
				crawler.setUpdated(new Date());
				service.save(crawler);
			}
		}
	}

	/**
	 * @return the ip
	 */
	public String getIp() {
		return ip;
	}

	/**
	 * @param ip
	 *            the ip to set
	 */
	public void setIp(String ip) {
		this.ip = ip;
	}

}
