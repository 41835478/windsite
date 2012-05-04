package com.wind.site.util;

import java.io.File;
import java.net.MalformedURLException;
import java.util.Date;
import java.util.LinkedList;
import java.util.Queue;
import java.util.TimeZone;

import org.apache.commons.lang.StringUtils;
import org.htmlparser.Parser;
import org.htmlparser.filters.NodeClassFilter;
import org.htmlparser.tags.LinkTag;
import org.htmlparser.util.NodeIterator;
import org.htmlparser.util.NodeList;
import org.htmlparser.util.ParserException;

import com.redfin.sitemapgenerator.ChangeFreq;
import com.redfin.sitemapgenerator.W3CDateFormat;
import com.redfin.sitemapgenerator.WebSitemapGenerator;
import com.redfin.sitemapgenerator.WebSitemapUrl;

public class HtmlCrawler {
	private static NodeClassFilter LINK_FILTER = new NodeClassFilter(
			LinkTag.class);
	private static Parser parser = new Parser();
	private static File dir = new File(
			"E:\\project\\wind\\aws\\Apache2.2\\htdocs\\zone\\42\\71614142");
	private static String BASE_PREFIX = "http://www.lovezippo.com";
	private static WebSitemapGenerator wsg = null;

	static {
		W3CDateFormat dateFormat = new W3CDateFormat(W3CDateFormat.Pattern.DAY);
		dateFormat.setTimeZone(TimeZone.getTimeZone("GMT+8"));
		try {
			wsg = WebSitemapGenerator.builder(BASE_PREFIX, dir).dateFormat(
					dateFormat).gzip(true).build();
		} catch (MalformedURLException e) {
			System.out.println("the start url [" + BASE_PREFIX
					+ "] is malformed");
		}
	}

	public static void main(String[] args) throws ParserException,
			MalformedURLException {

		ExtWebSiteMapUrl startUrl = new ExtWebSiteMapUrl(
				new WebSitemapUrl.Options("http://www.lovezippo.com").lastMod(
						new Date()).priority(0.9).changeFreq(ChangeFreq.WEEKLY));

		Queue<ExtWebSiteMapUrl> queue = new LinkedList<ExtWebSiteMapUrl>();
		queue.add(startUrl);
		for (int i = 0; i < 60000; i++)
			wsg.addUrl("http://www.lovezippo.com/doc" + i + ".html");
		crawl(queue, wsg);

		System.out.println("done");
	}

	/** */
	/**
	 * 检测是否为同一个域下的url
	 * 
	 * @param url
	 * @param basePrefix
	 * @return
	 */
	public static boolean check(String url, String basePrefix) {
		return StringUtils.isNotBlank(url) ? url.startsWith(basePrefix) : false;
	}

	/** */
	/**
	 * 使用队列循环抓取页面上的URL
	 * 
	 * @param queue
	 * @param wsg
	 */
	public static void crawl(Queue<ExtWebSiteMapUrl> queue,
			WebSitemapGenerator wsg) {
		if (queue.isEmpty()) {
			return;
		}
		Queue<ExtWebSiteMapUrl> crawled = new LinkedList<ExtWebSiteMapUrl>();
		do {
			ExtWebSiteMapUrl url = queue.poll();
			crawled.add(url);
			if (url != null && url.canCrawl()) {
				try {
					parser.setURL(url.getUrl().toExternalForm());
					NodeList list = parser.parse(LINK_FILTER);
					for (NodeIterator iter = list.elements(); iter
							.hasMoreNodes();) {
						String link = ((LinkTag) iter.nextNode()).getLink();
						ExtWebSiteMapUrl newUrl = null;
						try {
							newUrl = new ExtWebSiteMapUrl(
									new WebSitemapUrl.Options(link).lastMod(
											new Date()).priority(0.7)
											.changeFreq(ChangeFreq.WEEKLY));
						} catch (MalformedURLException e) {
							System.out.println("the url [" + link
									+ "] is malformed");
							continue;
						}
						if (check(link, BASE_PREFIX) && !queue.contains(newUrl)
								&& !crawled.contains(newUrl)) {
							// queue.add(newUrl);
							wsg.addUrl(newUrl);
						}
					}
				} catch (ParserException e) {
					System.out.println("can not parser the url : "
							+ url.getUrl());
				} finally {
					url.disable();
				}
			}
		} while (queue.size() > 0);

		wsg.write();
		wsg.writeSitemapsWithIndex();
	}
}