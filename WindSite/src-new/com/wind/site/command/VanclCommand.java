package com.wind.site.command;

import java.io.File;
import java.util.HashMap;
import java.util.logging.Logger;

import org.dom4j.DocumentException;
import org.dom4j.io.SAXReader;
import org.htmlparser.Parser;
import org.htmlparser.filters.HasAttributeFilter;
import org.htmlparser.filters.TagNameFilter;
import org.htmlparser.nodes.TagNode;
import org.htmlparser.util.NodeList;

import com.wind.site.env.EnvManager;
import com.wind.weibo.model.VanclProduct;
import com.wind.weibo.service.IWeiboService;
import com.wind.weibo.util.VanclElementHandler;

/**
 * 同步凡客商品库
 * 
 * @author fxy
 * 
 */
public class VanclCommand {

	private static final Logger logger = Logger
			.getLogger(YiqifaReportsGetTimer.class.getName());
	private IWeiboService weiboService;

	public void synVancl() {
		logger.info("vancl products is starting");
		// 清空商品分类计数
		weiboService.executeNativeUpdateSql(
				"update xwb_xt_vancl_cat set nums=0",
				new HashMap<String, Object>());// 清空分类商品数量
		weiboService
				.executeNativeUpdateSql(
						"update xwb_xt_vancl_product set isValid=0,isNew=0,isSpecial=0,specialPrice=''",
						new HashMap<String, Object>());// 全部置为无效,旧的

		SAXReader reader = new SAXReader();
		reader.addHandler("/products/Product", new VanclElementHandler(
				weiboService));
		try {
			File file = new File(EnvManager.getApachePath() + File.separator
					+ "htdocs" + File.separator + "weibo21" + File.separator
					+ "xintao" + File.separator + "install" + File.separator
					+ "vancl" + File.separator + "vancl.xml");
			reader.read(file);
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		logger.info("vancl products is ended");
		synVanclSpecial();
		//TODO 清理PHP凡客缓存
	}

	public void synVanclSpecial() {
		logger.info("vancl special products is starting");
		weiboService
				.executeNativeUpdateSql(
						"update xwb_xt_vancl_product set isSpecial=0,specialPrice=null",
						new HashMap<String, Object>());// 全部置为非特惠
		Parser parser;
		int i = 1;
		boolean isContinue = true;
		while (isContinue) {
			try {
				parser = new Parser("http://s.vancl.com/search?p=" + i);
				NodeList list = parser.extractAllNodesThatMatch(
						new HasAttributeFilter("class", "sr_contation"))
						.elementAt(0).getChildren();
				TagNode pageNext = (TagNode) list
						.extractAllNodesThatMatch(
								new HasAttributeFilter("class",
										"jquery_pager_nextpage jquery_pager_margintop11"),
								true).elementAt(0);
				if (pageNext != null) {
					String href = pageNext.getAttribute("href");
					if (!href.startsWith("/search")) {
						break;
					}
					NodeList pics = list.extractAllNodesThatMatch(
							new HasAttributeFilter("class", "pic"), true);
					if (pics != null && pics.size() > 0) {
						for (int j = 0; j < pics.size(); j++) {

							NodeList nodes = pics.elementAt(j).getChildren();
							NodeList divs = nodes.extractAllNodesThatMatch(
									new TagNameFilter("div"), true);
							TagNode a = (TagNode) nodes
									.extractAllNodesThatMatch(
											new TagNameFilter("a"), true)
									.elementAt(0);
							if (a != null && divs != null && divs.size() > 0) {
								String id = a.getAttribute("href").replace(
										"http://item.vancl.com/", "").replace(
										".html", "");
								for (int n = 0; n < divs.size(); n++) {
									String value = divs.elementAt(n)
											.toPlainTextString();
									Integer tehui = 0;
									if (!"".equals(value)) {
										try {
											tehui = Integer.parseInt(value);
										} catch (Exception e) {
											tehui = 0;
										}
									}
									if (tehui > 0) {
										VanclProduct product = weiboService
												.get(VanclProduct.class, id);
										if (product != null) {
											product.setSpecialPrice(String
													.valueOf(tehui));
											weiboService.update(product);
										}
									}
								}
							}
						}
						logger.info("page[" + i + "] is ended");
						i++;
					} else {
						isContinue = false;
						break;
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		weiboService
				.executeNativeUpdateSql(
						"update xwb_xt_vancl_product set isSpecial=1 where specialPrice is not null;",
						new HashMap<String, Object>());// 修订特惠
		weiboService
				.executeNativeUpdateSql(
						"update xwb_xt_vancl_product set isSpecial=0 where specialPrice is null;",
						new HashMap<String, Object>());// 修订非特惠
		logger.info("vancl special products is ended");
		//TODO 清理PHP凡客缓存
	}

	/**
	 * @return the weiboService
	 */
	public IWeiboService getWeiboService() {
		return weiboService;
	}

	/**
	 * @param weiboService
	 *            the weiboService to set
	 */
	public void setWeiboService(IWeiboService weiboService) {
		this.weiboService = weiboService;
	}

}
