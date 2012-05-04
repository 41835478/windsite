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
import com.wind.site.module.spider.domain.MallIndexNewFloor;
import com.wind.site.module.spider.domain.MallIndexNewFloorBottom;
import com.wind.site.module.spider.domain.MallIndexNewFloorLeft;
import com.wind.site.module.spider.domain.MallIndexNewFloorMiddle;
import com.wind.site.module.spider.domain.MallIndexNewFloorMiddleCell;
import com.wind.site.module.spider.domain.MallIndexNewFloorRight;

import freemarker.template.Template;

public class TMallIndexNewFloorSpider implements IModuleSpider {
	private static final Logger logger = Logger
			.getLogger(TMallIndexNewFloorSpider.class.getName());
	public static final String url = "http://www.tmall.com";

	public static void main(String[] args) {
		new TMallIndexNewFloorSpider().crawl(null, null);
	}

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
				if (list != null && list.size() >= 7) {
					for (int i = 0; i < 6; i++) {// 7楼
						MallIndexNewFloor floor = new MallIndexNewFloor();
						MallIndexNewFloorLeft left = new MallIndexNewFloorLeft();
						MallIndexNewFloorMiddle middle = new MallIndexNewFloorMiddle();
						MallIndexNewFloorRight right = new MallIndexNewFloorRight();
						MallIndexNewFloorBottom bottom = new MallIndexNewFloorBottom();
						List<Map<String, String>> brands = new ArrayList<Map<String, String>>();
						NodeList floorDiv = list.elementAt(i).getChildren();
						TagNode titleNode = (TagNode) floorDiv
								.extractAllNodesThatMatch(
										new HasAttributeFilter("class",
												"floorHd"), true).elementAt(0);
						floor.setTitle(titleNode.toPlainTextString());// 楼层标题
						floor.setSortOrder(i + 1);// 楼层序号
						// 顶部右侧
						NodeList wordsDiv = floorDiv.extractAllNodesThatMatch(
								new HasAttributeFilter("class", "floorTop"),
								true);
						if (wordsDiv != null && wordsDiv.size() == 1) {
							Map<String, String> brand = null;
							NodeList as = wordsDiv.elementAt(0).getChildren()
									.extractAllNodesThatMatch(
											new TagNameFilter("a"), true);
							if (as != null && as.size() > 0) {
								for (int k = 0; k < as.size(); k++) {
									brand = new HashMap<String, String>();
									LinkTag a = (LinkTag) as.elementAt(k);
									brand.put("title", a.getLinkText().trim());
									brand.put("url", a.getLink());
									brands.add(brand);
								}
							}
						}
						floor.setBrands(brands);
						TagNode logoUl = (TagNode) floorDiv
								.extractAllNodesThatMatch(
										new HasAttributeFilter("class",
												"j_fSlideCon f-slideCon"), true)
								.elementAt(0);
						NodeList logoList = logoUl.getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("a"), true);
						// 左侧
						if (logoList != null && logoList.size() > 0) {
							List<Map<String, String>> images = new ArrayList<Map<String, String>>();
							Map<String, String> image = null;
							for (int j = 0; j < logoList.size(); j++) {
								LinkTag a = ((LinkTag) logoList.elementAt(j));
								if (a != null) {
									ImageTag img = (ImageTag) a.getChildren()
											.extractAllNodesThatMatch(
													new TagNameFilter("img"),
													true).elementAt(0);
									if (img != null) {
										image = new HashMap<String, String>();
										image.put("title", a
												.getAttribute("title"));
										image.put("url", a.getLink());
										image.put("image", img.getImageURL());
										images.add(image);
									}
								}
							}
							left.setImages(images);
						} else {
							continue;
						}
						floor.setFloorLeft(left);
						// 中间
						NodeList mainDiv = floorDiv.extractAllNodesThatMatch(
								new HasAttributeFilter("class",
										"floorMain module"), true).elementAt(0)
								.getChildren();
						NodeList mainCon = mainDiv.extractAllNodesThatMatch(
								new HasAttributeFilter("class", "mainCon"),
								true);// grid
						if (mainCon != null && mainCon.size() == 1) {
							NodeList conLis = mainCon.extractAllNodesThatMatch(
									new TagNameFilter("a"), true);
							if (conLis == null || conLis.size() != 6) {
								continue;
							}
							List<Map<String, String>> images = new ArrayList<Map<String, String>>();
							Map<String, String> image = null;
							for (int k = 0; k < 6; k++) {
								image = new HashMap<String, String>();
								LinkTag a = (LinkTag) conLis.elementAt(k);
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
						} else {
							NodeList boxs = mainDiv
									.extractAllNodesThatMatch(new TagNameFilter(
											"div"));// cell
							if (boxs == null || boxs.size() != 3) {
								continue;
							}
							List<MallIndexNewFloorMiddleCell> cells = new ArrayList<MallIndexNewFloorMiddleCell>();
							for (int k = 0; k < 3; k++) {
								MallIndexNewFloorMiddleCell cell = new MallIndexNewFloorMiddleCell();
								NodeList mainBox = boxs.elementAt(k)
										.getChildren();
								LinkTag a = (LinkTag) mainBox
										.extractAllNodesThatMatch(
												new HasAttributeFilter("class",
														"itemPic"), true)
										.elementAt(0).getChildren()
										.extractAllNodesThatMatch(
												new TagNameFilter("a"), true)
										.elementAt(0);
								Map<String, String> image = null;
								if (a != null) {
									ImageTag img = (ImageTag) a.getChildren()
											.extractAllNodesThatMatch(
													new TagNameFilter("img"),
													true).elementAt(0);
									if (img != null) {
										image = new HashMap<String, String>();
										image.put("title", a
												.getAttribute("title"));
										image.put("url", a.getLink());
										image.put("image", img.getImageURL());
										cell.setTop(image);
									}
								} else {
									continue;
								}
								NodeList as = mainBox.extractAllNodesThatMatch(
										new HasAttributeFilter("class",
												"newsList"), true).elementAt(0)
										.getChildren()
										.extractAllNodesThatMatch(
												new TagNameFilter("a"), true);
								if (as != null && as.size() == 4) {
									List<Map<String, String>> amaps = new ArrayList<Map<String, String>>();
									LinkTag at = null;
									Map<String, String> amap = null;
									for (int m = 0; m < 3; m++) {
										amap = new HashMap<String, String>();
										at = (LinkTag) as.elementAt(m);
										amap.put("title", at.getLinkText());
										amap.put("url", at.getLink());
										amaps.add(amap);
									}
									cell.setMiddle(amaps);
									at = (LinkTag) as.elementAt(3);
									cell.setBottom(at.getLink());

								} else {
									continue;
								}
								cells.add(cell);
							}
							middle.setCells(cells);
						}
						floor.setFloorMiddle(middle);
						// 右侧
						NodeList rightDiv = floorDiv.extractAllNodesThatMatch(
								new HasAttributeFilter("class",
										"floorRight module"), true)
								.elementAt(0).getChildren();
						NodeList subBoxs = rightDiv
								.extractAllNodesThatMatch(
										new HasAttributeFilter("class",
												"subBox"), true);
						if (subBoxs != null && subBoxs.size() == 3) {
							List<Map<String, String>> images = new ArrayList<Map<String, String>>();
							Map<String, String> image = null;
							for (int m = 0; m < 3; m++) {
								LinkTag a = (LinkTag) subBoxs.elementAt(m)
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
										image = new HashMap<String, String>();
										image.put("title", img
												.getAttribute("alt"));
										image.put("url", a.getLink());
										image.put("image", img.getImageURL());
										images.add(image);
									}
								}
							}
							right.setBoxs(images);
						} else {
							NodeList as = rightDiv.extractAllNodesThatMatch(
									new TagNameFilter("a"), true);
							if (as != null && as.size() == 12) {
								List<Map<String, String>> asmaps = new ArrayList<Map<String, String>>();
								Map<String, String> asmap = null;
								for (int m = 0; m < 12; m++) {
									asmap = new HashMap<String, String>();
									LinkTag a = (LinkTag) as.elementAt(m);
									asmap.put("title", a.getLinkText());
									asmap.put("url", a.getLink());
									asmaps.add(asmap);
								}
								right.setGrids(asmaps);
							} else {
								continue;
							}
						}
						floor.setFloorRight(right);
						// 底部
						TagNode bottomBrand = (TagNode) floorDiv
								.extractAllNodesThatMatch(
										new HasAttributeFilter("class",
												"floorBt"), true).elementAt(0)
								.getChildren().extractAllNodesThatMatch(
										new HasAttributeFilter("class",
												"brandList clearfix"), true)
								.elementAt(0);
						if (bottomBrand != null) {
							bottom.setStyle(bottomBrand.getAttribute("style"));
							NodeList lis = bottomBrand.getChildren()
									.extractAllNodesThatMatch(
											new TagNameFilter("a"), true);
							if (lis != null && lis.size() > 0) {
								List<Map<String, String>> asmaps = new ArrayList<Map<String, String>>();
								Map<String, String> asmap = null;
								for (int m = 0; m < lis.size(); m++) {
									asmap = new HashMap<String, String>();
									LinkTag a = (LinkTag) lis.elementAt(m);
									asmap.put("title", a.getLinkText());
									asmap.put("url", a.getLink());
									asmaps.add(asmap);
								}
								bottom.setLogos(asmaps);
							}
						} else {
							continue;
						}
						floor.setFloorBottom(bottom);
						if (StringUtils.isEmpty(floor.getTitle())) {
							msg = "floor title is null";
						} else {
							if (left.getImages() == null
									|| left.getImages().size() == 0) {
								msg = "floor left style is null";
							} else {
								writeFtl(fcg, floor);
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

	private void writeFtl(FreeMarkerConfigurer fcg, MallIndexNewFloor floor) {
		try {
			// 整体
			File htmlFile = new File(EnvManager.getRealPath() + "assets"
					+ File.separator + "js" + File.separator + "page"
					+ File.separator + "module" + File.separator + "extra"
					+ File.separator + "new_floor_" + floor.getSortOrder()
					+ ".ftl");
			File parent = new File(htmlFile.getParent());
			if (!parent.exists()) {
				parent.mkdirs();
			}
			if (!htmlFile.exists()) {// 如果不存在则是第一次发布
				htmlFile.createNewFile();
			}
			Template template = fcg
					.getConfiguration()
					.getTemplate(
							"assets/js/page/module/template/shopMallNewFloorTemplate.ftl");
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			template.setEncoding("UTF-8");
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("floor", floor);
			template.process(params, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
