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
import org.htmlparser.nodes.TagNode;
import org.htmlparser.tags.ImageTag;
import org.htmlparser.tags.LinkTag;
import org.htmlparser.util.NodeList;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.taobao.api.internal.util.StringUtils;
import com.wind.core.service.IBaseService;
import com.wind.site.env.EnvManager;
import com.wind.site.module.IModuleSpider;

import freemarker.template.Template;

/**
 * 抓取淘宝商城首页楼层模块
 * 
 * @author fxy
 * 
 */
public class TMallIndexFloorSpider implements IModuleSpider {
	private static final Logger logger = Logger
			.getLogger(TMallIndexFloorSpider.class.getName());
	public static final String url = "http://www.tmall.com";

	@Override
	public void crawl(IBaseService service, FreeMarkerConfigurer fcg) {
		logger.info("mall index floor is starting......");
		String msg = "";
		Parser parser;
		try {
			try {
				parser = new Parser(url);
				NodeList list = parser
						.extractAllNodesThatMatch(new HasAttributeFilter(
								"class", "floor-loading"));
				logger.info("mall index floor nums["
						+ (list != null ? list.size() : 0) + "]");
				if (list != null && list.size() >= 11) {
					for (int i = 0; i < 11; i++) {// 11楼
						MallIndexFloor floor = new MallIndexFloor();
						MallIndexFloorLeft left = new MallIndexFloorLeft();
						MallIndexFloorMiddle middle = new MallIndexFloorMiddle();
						MallIndexFloorRight right = new MallIndexFloorRight();
						NodeList floorDiv = list.elementAt(i).getChildren();
						TagNode titleNode = (TagNode) floorDiv
								.extractAllNodesThatMatch(
										new HasAttributeFilter("class", "f-hd"),
										true).elementAt(0);
						floor.setTitle(titleNode.toPlainTextString());// 楼层标题
						floor.setSortOrder(i + 1);// 楼层序号
						// 关键词
						NodeList wordsDiv = floorDiv.extractAllNodesThatMatch(
								new HasAttributeFilter("class", "f-ft"), true);
						if (wordsDiv != null && wordsDiv.size() == 1) {
							NodeList as = wordsDiv.elementAt(0).getChildren()
									.extractAllNodesThatMatch(
											new TagNameFilter("a"), true);
							if (as != null && as.size() > 0) {
								List<String> words = new ArrayList<String>();
								for (int k = 0; k < as.size(); k++) {
									LinkTag a = (LinkTag) as.elementAt(k);
									words.add(a.getLinkText());
								}
								floor.setWords(words);
							}
						}
						TagNode logoUl = (TagNode) floorDiv
								.extractAllNodesThatMatch(
										new HasAttributeFilter("class",
												"logo-list clearfix"), true)
								.elementAt(0);
						left.setStyle(logoUl.getAttribute("style"));// 左侧LOGO样式
						NodeList logoList = logoUl.getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("a"), true);

						// 左侧
						if (logoList != null && logoList.size() == 16) {
							List<String> logos = new ArrayList<String>();
							for (int j = 0; j < 16; j++) {
								LinkTag a = ((LinkTag) logoList.elementAt(j));
								logos.add(a.getAttribute("title"));
							}
							left.setLogos(logos);
						} else {
							continue;
						}
						floor.setFloorLeft(left);
						// 中间
						NodeList mainDiv = floorDiv.extractAllNodesThatMatch(
								new HasAttributeFilter("class", "main-wrap"),
								true).elementAt(0).getChildren();
						NodeList boxs = mainDiv.extractAllNodesThatMatch(
								new HasAttributeFilter("class",
										"m-box f-otitle"), true);// boxs
						if (boxs != null && boxs.size() == 3) {
							middle.setIsSlide(false);
							List<Map<String, String>> images = new ArrayList<Map<String, String>>();
							Map<String, String> image = null;
							for (int k = 0; k < 3; k++) {
								image = new HashMap<String, String>();
								LinkTag a = (LinkTag) boxs.elementAt(k)
										.getChildren()
										.extractAllNodesThatMatch(
												new TagNameFilter("a"), true)
										.elementAt(0);
								if (a != null) {
									ImageTag img = (ImageTag) a.getChildren()
											.extractAllNodesThatMatch(
													new TagNameFilter("img"),
													true).elementAt(0);
									if (img != null) {
										image.put("title", a
												.getAttribute("title"));
										image.put("url", a.getLink());
										image.put("image", img.getImageURL());
										images.add(image);
									}
								}
							}
							middle.setImages(images);
						}
						NodeList switchs = mainDiv
								.extractAllNodesThatMatch(
										new HasAttributeFilter("class",
												"f-switchable"), true);// boxs
						if (switchs != null && switchs.size() == 1) {
							NodeList as = switchs.elementAt(0).getChildren()
									.extractAllNodesThatMatch(
											new TagNameFilter("a"), true);
							if (as != null && as.size() == 3) {
								middle.setIsSlide(true);
								List<Map<String, String>> images = new ArrayList<Map<String, String>>();
								Map<String, String> image = null;
								for (int k = 0; k < 3; k++) {
									image = new HashMap<String, String>();
									LinkTag a = (LinkTag) as.elementAt(k);
									if (a != null) {
										ImageTag img = (ImageTag) a
												.getChildren()
												.extractAllNodesThatMatch(
														new TagNameFilter("img"),
														true).elementAt(0);
										if (img != null) {
											image.put("title", img
													.getAttribute("alt"));
											image.put("url", a.getLink());
											image.put("image", img
													.getImageURL());
											images.add(image);
										}
									}
								}
								middle.setImages(images);
							}
						}
						floor.setFloorMiddle(middle);
						// 右侧
						NodeList subDiv = floorDiv.extractAllNodesThatMatch(
								new HasAttributeFilter("class", "col-sub"),
								true).elementAt(0).getChildren();
						NodeList suls = subDiv.extractAllNodesThatMatch(
								new TagNameFilter("ul"), true);
						if (suls != null && suls.size() > 0) {
							for (int l = 0; l < suls.size(); l++) {
								TagNode ul = (TagNode) suls.elementAt(l);
								String classes = ul.getAttribute("class");
								if (StringUtils.areNotEmpty(classes)) {
									if (classes.indexOf("s-girds") != -1) {// GRID
										List<Map<String, String>> gridsList = new ArrayList<Map<String, String>>();
										Map<String, String> grid = null;
										NodeList gas = ul.getChildren()
												.extractAllNodesThatMatch(
														new TagNameFilter("a"),
														true);
										for (int k = 0; k < gas.size(); k++) {
											LinkTag a = ((LinkTag) gas
													.elementAt(k));
											ImageTag img = (ImageTag) a
													.getChildren()
													.extractAllNodesThatMatch(
															new TagNameFilter(
																	"img"),
															true).elementAt(0);
											grid = new HashMap<String, String>();
											if (img != null) {
												grid.put("title", a
														.getAttribute("title"));
												grid.put("url", a.getLink());
												grid.put("image", img
														.getImageURL());
												gridsList.add(grid);
											}
											right.setGrids(gridsList);
										}
									} else if (classes.indexOf("s-ul") != -1) {// UL
										List<Map<String, String>> linksList = new ArrayList<Map<String, String>>();
										Map<String, String> link = null;
										NodeList gas = ul.getChildren()
												.extractAllNodesThatMatch(
														new TagNameFilter("a"),
														true);
										for (int k = 0; k < gas.size(); k++) {
											LinkTag a = ((LinkTag) gas
													.elementAt(k));
											link = new HashMap<String, String>();
											link.put("title", a
													.getAttribute("title"));
											link.put("url", a.getLink());
											linksList.add(link);
										}
										right.setLinks(linksList);
									}
								}
							}
						}
						NodeList sboxs = subDiv.extractAllNodesThatMatch(
								new HasAttributeFilter("class", "s-box"), true);
						if (sboxs != null && sboxs.size() <= 3) {
							List<Map<String, String>> boxsList = new ArrayList<Map<String, String>>();
							Map<String, String> box = null;
							for (int k = 0; k < sboxs.size(); k++) {
								LinkTag a = (LinkTag) sboxs.elementAt(k)
										.getChildren()
										.extractAllNodesThatMatch(
												new TagNameFilter("a"), true)
										.elementAt(0);
								ImageTag img = (ImageTag) a.getChildren()
										.extractAllNodesThatMatch(
												new TagNameFilter("img"), true)
										.elementAt(0);
								box = new HashMap<String, String>();
								if (img != null) {
									box.put("title", a.getAttribute("title"));
									box.put("url", a.getLink());
									box.put("image", img.getImageURL());
									boxsList.add(box);
								}
								right.setBoxs(boxsList);
							}
						}
						floor.setFloorRight(right);
						if (StringUtils.isEmpty(floor.getTitle())) {
							msg = "floor title is null";
						} else {
							if (StringUtils.isEmpty(left.getStyle())) {
								msg = "floor left style is null";
							} else {
								if (left.getLogos() == null
										|| left.getLogos().size() != 16) {
									msg = "floor left logos is null";
								} else {
									if (middle.getImages() == null
											|| middle.getImages().size() != 3) {
										msg = "floor middle pictures is null";
									} else {
										if (right.getBoxs() == null
												&& right.getGrids() == null
												&& right.getLinks() == null) {
											msg = "floor right is null";
										} else {
											writeFtl(fcg, floor);
										}
									}
								}
							}
						}

					}
				} else {
					msg = "floor nums is wrong";
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		logger.info("mall index floor is ended......" + msg);
	}

	private void writeFtl(FreeMarkerConfigurer fcg, MallIndexFloor floor) {
		try {
			logger.info(EnvManager.getRealPath() + "assets" + File.separator
					+ "js" + File.separator + "page" + File.separator
					+ "module" + File.separator + "extra" + File.separator
					+ "floor_left_" + floor.getSortOrder() + ".ftl");
			// 左侧
			File htmlFile = new File(EnvManager.getRealPath() + "assets"
					+ File.separator + "js" + File.separator + "page"
					+ File.separator + "module" + File.separator + "extra"
					+ File.separator + "floor_left_" + floor.getSortOrder()
					+ ".ftl");
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Template template = fcg.getConfiguration().getTemplate(
					"assets/js/page/module/extra/floor_left.ftl");
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			template.setEncoding("UTF-8");
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("floor", floor);
			template.process(params, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
			// 整体
			htmlFile = new File(EnvManager.getRealPath() + "assets"
					+ File.separator + "js" + File.separator + "page"
					+ File.separator + "module" + File.separator + "extra"
					+ File.separator + "floor_" + floor.getSortOrder() + ".ftl");
			parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			template = fcg.getConfiguration().getTemplate(
					"assets/js/page/module/extra/floor_template.ftl");
			out = new BufferedWriter(new OutputStreamWriter(
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
