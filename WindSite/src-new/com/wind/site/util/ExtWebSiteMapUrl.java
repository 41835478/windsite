package com.wind.site.util;

import com.redfin.sitemapgenerator.WebSitemapUrl;

public class ExtWebSiteMapUrl extends WebSitemapUrl implements CrawlUrl {

	public ExtWebSiteMapUrl(Options options) {
		super(options);
	}

	private boolean canCrawl = true;

	@Override
	public boolean canCrawl() {
		return canCrawl;
	}

	@Override
	public void disable() {
		canCrawl = false;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (obj instanceof ExtWebSiteMapUrl) {
			ExtWebSiteMapUrl url = (ExtWebSiteMapUrl) obj;
			return url.getUrlStr().equals(getUrlStr());
		}
		return false;
	}

	@Override
	public int hashCode() {
		return super.getUrl().hashCode();
	}

	public String getUrlStr() {
		return super.getUrl().toExternalForm();
	}

}
