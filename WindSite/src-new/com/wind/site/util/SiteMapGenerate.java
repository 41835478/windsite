package com.wind.site.util;

import java.io.File;
import java.net.MalformedURLException;
import java.util.TimeZone;

import com.redfin.sitemapgenerator.W3CDateFormat;
import com.redfin.sitemapgenerator.WebSitemapGenerator;
import com.redfin.sitemapgenerator.W3CDateFormat.Pattern;

/**
 * SiteMap生成器
 * 
 * @author fxy
 * 
 */
public class SiteMapGenerate {

	public static void main(String[] args) throws MalformedURLException {
		try {
			W3CDateFormat dateFormat = new W3CDateFormat(Pattern.DAY);
			dateFormat.setTimeZone(TimeZone.getDefault());
			WebSitemapGenerator wsg = WebSitemapGenerator
					.builder(
							"http://www.lovezippo.com",
							new File(
									"E:\\project\\wind\\aws\\Apache2.2\\htdocs\\zone\\42\\71614142"))
					.dateFormat(dateFormat).build();
			wsg.addUrl("http://www.lovezippo.com");
			wsg.write();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
