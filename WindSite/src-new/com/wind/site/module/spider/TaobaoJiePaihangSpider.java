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

import org.htmlparser.Parser;
import org.htmlparser.filters.HasAttributeFilter;
import org.htmlparser.filters.TagNameFilter;
import org.htmlparser.tags.ImageTag;
import org.htmlparser.tags.LinkTag;
import org.htmlparser.util.NodeList;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.taobao.api.domain.TaobaokeShop;
import com.wind.core.dao.Page;
import com.wind.core.service.IBaseService;
import com.wind.site.env.EnvManager;
import com.wind.site.model.T_TaobaokeShop;
import com.wind.site.module.IModuleSpider;
import com.wind.site.util.TaobaoFetchUtil;

import freemarker.template.Template;

public class TaobaoJiePaihangSpider implements IModuleSpider {

	private static final List<Long> cids = new ArrayList<Long>();
	static {
		cids.add(14L);
		cids.add(37L);
		cids.add(1055L);
		cids.add(1056L);
		cids.add(1154L);
		cids.add(15L);
		cids.add(31L);
		cids.add(29L);
		cids.add(1020L);
		cids.add(24L);
		cids.add(18L);
		cids.add(1082L);
		cids.add(1106L);
		cids.add(1054L);
		cids.add(23L);
		cids.add(1044L);
		cids.add(24L);
		cids.add(1046L);
		cids.add(1048L);
		cids.add(30L);
		cids.add(22L);
		cids.add(20L);
		cids.add(1053L);
	}

	@Override
	public void crawl(IBaseService service, FreeMarkerConfigurer fcg) {
		Parser parser;
		try {

			parser = new Parser("http://jie.taobao.com/");
			NodeList list = parser
					.extractAllNodesThatMatch(new HasAttributeFilter("class",
							"list"));
			if (list != null && list.size() == 24) {
				for (int i = 0; i < 24; i++) {
					NodeList child = list.elementAt(i).getChildren();
					if (child == null || child.size() == 0)
						continue;
					NodeList spans = child.extractAllNodesThatMatch(
							new TagNameFilter("span"), true);
					String title = spans.elementAt(0).toPlainTextString();
					NodeList lis = child.extractAllNodesThatMatch(
							new TagNameFilter("li"), true);
					if (lis != null && lis.size() == 10) {
						List<Map<String, Object>> shops = new ArrayList<Map<String, Object>>();
						Map<String, Object> shop = null;
						for (int j = 0; j < 10; j++) {
							shop = new HashMap<String, Object>();
							LinkTag a = (LinkTag) lis.elementAt(j)
									.getChildren().extractAllNodesThatMatch(
											new TagNameFilter("a"), true)
									.elementAt(0);
							String shopTitle = a.getAttribute("title");
							String sid = a.getLink().split("=")[1];
							String img = "", error = "";
							if (j == 0) {
								ImageTag tag = (ImageTag) a.getChildren()
										.extractAllNodesThatMatch(
												new TagNameFilter("img"), true)
										.elementAt(0);
								error = tag.getAttribute("data-src");
								img = tag.getAttribute("src");

							}
							try {
								List<TaobaokeShop> _shops = TaobaoFetchUtil
										.convertTaobaoShop(null, "fxy060608",
												sid);
								if (_shops == null || _shops.size() == 0) {
									continue;// 跳出继续下一个
								}
							} catch (Exception e) {
								e.printStackTrace();
							}
							shop.put("sid", sid);
							shop.put("title", shopTitle);
							shop.put("picUrl", img);
							shop.put("errorUrl", error);
							shops.add(shop);

						}
						if (shops.size() < 10) {
							Map<String, Object> params = new HashMap<String, Object>();
							params.put("cid", cids.get(i));
							//TODO 需过滤已有店铺sid
							String hql = "from T_TaobaokeShop where sid is not null and cid=:cid order by sellerCredit*1 desc";
							List<T_TaobaokeShop> _shops = service.findByHql(
									new Page<T_TaobaokeShop>(1, 10 - shops
											.size()), hql, params);
							if (_shops != null && _shops.size() > 0) {
								for (T_TaobaokeShop _shop : _shops) {
									shop = new HashMap<String, Object>();
									shop.put("sid", _shop.getSid());
									shop.put("title", _shop.getTitle());
									shop.put("picUrl",
											"http://logo.taobao.com/shop-logo"
													+ _shop.getPicPath());
									shop
											.put("errorUrl",
													"http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png");
									shops.add(shop);
								}
							}
						}
						writeFtl(fcg, i, title, shops);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void writeFtl(FreeMarkerConfigurer fcg, Integer index,
			String title, List<Map<String, Object>> shops) {
		try {
			// 整体
			File htmlFile = new File(EnvManager.getZonePath() + File.separator
					+ "module" + File.separator + "dianpuPaiHang_" + index
					+ ".html");
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
							"assets/js/page/module/template/shopDianpuPaiHangTemplate.ftl");
			Writer out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(htmlFile), "UTF-8"));
			template.setEncoding("UTF-8");
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("title", title);
			params.put("shops", shops);
			template.process(params, out);// 生成具体模块内容并输出
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
