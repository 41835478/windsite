package com.wind.site.command;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.site.module.IModuleSpider;
import com.wind.site.service.IAdminService;

/**
 * 自更新Spider
 * 
 * @author fxy
 * 
 */
public class SpiderCommand {

	private List<IModuleSpider> spiders = new ArrayList<IModuleSpider>();

	private IAdminService adminService;
	private FreeMarkerConfigurer fcg;

	public void synSpiders() {
		// TODO 清空当天的用户主动通知限制
		TopCometStreamCommand.userLimits.clear();
		if (spiders != null && spiders.size() > 0) {
			for (IModuleSpider spider : spiders) {
				spider.crawl(adminService, fcg);
			}
		}
	}

	public void setSpiders(List<IModuleSpider> spiders) {
		this.spiders = spiders;
	}

	public List<IModuleSpider> getSpiders() {
		return spiders;
	}

	public void setAdminService(IAdminService adminService) {
		this.adminService = adminService;
	}

	public IAdminService getAdminService() {
		return adminService;
	}

	/**
	 * @return the fcg
	 */
	public FreeMarkerConfigurer getFcg() {
		return fcg;
	}

	/**
	 * @param fcg
	 *            the fcg to set
	 */
	public void setFcg(FreeMarkerConfigurer fcg) {
		this.fcg = fcg;
	}
}
