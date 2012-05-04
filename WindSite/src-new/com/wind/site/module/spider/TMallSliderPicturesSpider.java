package com.wind.site.module.spider;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.htmlparser.Parser;
import org.htmlparser.filters.HasAttributeFilter;
import org.htmlparser.filters.TagNameFilter;
import org.htmlparser.tags.ImageTag;
import org.htmlparser.tags.LinkTag;
import org.htmlparser.util.NodeList;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.core.service.IBaseService;
import com.wind.site.env.EnvManager;
import com.wind.site.module.IModuleSpider;

import freemarker.template.Template;

public class TMallSliderPicturesSpider implements IModuleSpider {
	private static final Logger logger = Logger
			.getLogger(TMallSliderPicturesSpider.class.getName());

	@Override
	public void crawl(IBaseService service, FreeMarkerConfigurer fcg) {
		logger.info("mall slider pictures is starting......");
		Parser parser;
		// 商城首页轮换图
		Map<String, Object> params = new HashMap<String, Object>();
		List<Map<String, String>> pics = new ArrayList<Map<String, String>>();
		try {
			parser = new Parser("http://www.tmall.com");
			NodeList list = parser.extractAllNodesThatMatch(
					new HasAttributeFilter("id", "J_ComboSlide"))
					.extractAllNodesThatMatch(new TagNameFilter("ul"), true)
					.elementAt(0).getChildren().extractAllNodesThatMatch(
							new TagNameFilter("li"), true);
			if (list != null && list.size() != 0) {
				Map<String, String> map = null;
				for (int i = 0; i < list.size(); i++) {// 
					LinkTag a = (LinkTag) list.elementAt(i).getChildren()
							.extractAllNodesThatMatch(new TagNameFilter("a"),
									true).elementAt(0);
					if (a != null) {
						NodeList as = a.getChildren();
						if (as != null) {
							ImageTag img = (ImageTag) as
									.extractAllNodesThatMatch(
											new TagNameFilter("img"), true)
									.elementAt(0);
							if (img != null) {
								if (a.getLink().indexOf("tmall.com") != -1) {
									map = new HashMap<String, String>();
									map.put("href", a.getLink());
									map.put("title", a.getAttribute("title"));
									map.put("pic", img.getImageURL());
									pics.add(map);
								}
							}
						}
					}
				}
				if (pics != null && pics.size() > 0) {
					params.put("width", 540);
					params.put("height", 290);
					params.put("pics", pics);
					params.put("isMall", true);
					writeFtl("mall_shopSliderTemplate", params, fcg);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		pics.clear();
		params.clear();
		try {
			parser = new Parser("http://3c.tmall.com");
			NodeList list = parser.extractAllNodesThatMatch(
					new HasAttributeFilter("id", "slide"))
					.extractAllNodesThatMatch(new TagNameFilter("ul"), true)
					.elementAt(0).getChildren().extractAllNodesThatMatch(
							new TagNameFilter("li"), true);
			if (list != null && list.size() != 0) {
				Map<String, String> map = null;
				for (int i = 0; i < list.size(); i++) {// 
					LinkTag a = (LinkTag) list.elementAt(i).getChildren()
							.extractAllNodesThatMatch(new TagNameFilter("a"),
									true).elementAt(0);
					if (a != null) {
						NodeList as = a.getChildren();
						if (as != null) {
							ImageTag img = (ImageTag) as
									.extractAllNodesThatMatch(
											new TagNameFilter("img"), true)
									.elementAt(0);
							if (img != null) {
								if (a.getLink().indexOf("tmall.com") != -1) {
									map = new HashMap<String, String>();
									map.put("href", a.getLink());
									map.put("title", img.getAttribute("title"));
									map.put("pic", img.getImageURL());
									pics.add(map);
								}
							}
						}
					}
				}
				if (pics != null && pics.size() > 0) {
					params.put("height", 205);
					params.put("width", 550);
					params.put("pics", pics);
					params.put("isMall", true);
					writeFtl("3c_shopSliderTemplate", params, fcg);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		pics.clear();
		params.clear();
		try {
			parser = new Parser("http://xie.tmall.com");
			NodeList list = parser.extractAllNodesThatMatch(
					new HasAttributeFilter("id", "J_Slide"))
					.extractAllNodesThatMatch(new TagNameFilter("ul"), true)
					.elementAt(0).getChildren().extractAllNodesThatMatch(
							new TagNameFilter("li"), true);
			if (list != null && list.size() != 0) {
				Map<String, String> map = null;
				for (int i = 0; i < list.size(); i++) {// 
					LinkTag a = (LinkTag) list.elementAt(i).getChildren()
							.extractAllNodesThatMatch(new TagNameFilter("a"),
									true).elementAt(0);
					if (a != null) {
						NodeList as = a.getChildren();
						if (as != null) {
							ImageTag img = (ImageTag) as
									.extractAllNodesThatMatch(
											new TagNameFilter("img"), true)
									.elementAt(0);
							if (img != null) {
								if (a.getLink().indexOf("tmall.com") != -1) {
									map = new HashMap<String, String>();
									map.put("href", a.getLink());
									map.put("title", img.getAttribute("alt"));
									map.put("pic", img.getImageURL());
									pics.add(map);
								}
							}
						}
					}
				}
				if (pics != null && pics.size() > 0) {
					params.put("height", 333);
					params.put("width", 950);
					params.put("pics", pics);
					params.put("isMall", true);
					writeFtl("xie_shopSliderTemplate", params, fcg);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		pics.clear();
		params.clear();
		try {
			// 母婴频道
			parser = new Parser(
					"http://www.taobao.com/go/chn/tbk_channel/child.php");
			NodeList list = parser.extractAllNodesThatMatch(
					new HasAttributeFilter("id", "promotion_banners"))
					.elementAt(0).getChildren().extractAllNodesThatMatch(
							new TagNameFilter("li"), true);
			if (list != null && list.size() != 0) {
				Map<String, String> map = null;
				for (int i = 0; i < list.size(); i++) {// 
					LinkTag a = (LinkTag) list.elementAt(i).getChildren()
							.extractAllNodesThatMatch(new TagNameFilter("a"),
									true).elementAt(0);
					if (a != null) {
						NodeList as = a.getChildren();
						if (as != null) {
							ImageTag img = (ImageTag) as
									.extractAllNodesThatMatch(
											new TagNameFilter("img"), true)
									.elementAt(0);
							if (img != null) {
								map = new HashMap<String, String>();
								map.put("href", a.getLink().replace(
										"mm_10011550_0_0", "${pid}"));
								map.put("title", img.getAttribute("alt"));
								map.put("pic", img.getImageURL());
								pics.add(map);
							}
						}
					}
				}
				if (pics != null && pics.size() > 0) {
					params.put("height", 208);
					params.put("width", 548);
					params.put("pics", pics);
					params.put("isMall", false);
					writeFtl("child_shopSliderTemplate", params, fcg);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		logger.info("mall slider pictures is ended......");
	}

	private void writeFtl(String file, Map<String, Object> params,
			FreeMarkerConfigurer fcg) {
		try {
			// 轮播
			File htmlFile = new File(EnvManager.getRealPath() + "assets"
					+ File.separator + "js" + File.separator + "page"
					+ File.separator + "module" + File.separator + "extra"
					+ File.separator + file + ".ftl");
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Template template = fcg.getConfiguration().getTemplate(
					"assets/js/page/module/extra/slider_template.ftl");
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			template.setEncoding("UTF-8");
			template.process(params, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
