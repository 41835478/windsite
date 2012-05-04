package com.wind.site.command;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Calendar;
import java.util.List;
import java.util.logging.Logger;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;
import org.htmlparser.Node;
import org.htmlparser.Parser;
import org.htmlparser.filters.HasAttributeFilter;
import org.htmlparser.filters.TagNameFilter;
import org.htmlparser.nodes.TagNode;
import org.htmlparser.util.NodeList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.google.gson.reflect.TypeToken;
import com.wind.core.util.DateUtils;
import com.wind.site.env.EnvManager;
import com.wind.site.model.TaobaoKeyword;
import com.wind.site.model.TaobaoKeywordCategory;
import com.wind.site.service.IAdminService;
import com.wind.site.util.TaobaoKeywordResult;

/**
 * 更新淘宝关键词
 * 
 * @author fxy
 * 
 */
public class TaobaoKeywordCommand {
	private static final Logger logger = Logger
			.getLogger(TaobaoKeywordCommand.class.getName());
	private IAdminService adminService;

	public void synKeywords() {
		getCats();// 同步分类
		getKeywords();// 同步关键词
	}

	public void getCats() {
		try {
			logger.info("taobao keyword cats starting...");
			Parser parser = new Parser(
					"http://taoke.alimama.com/spreader/searchKeywords.htm");
			NodeList as1 = parser.extractAllNodesThatMatch(
					new HasAttributeFilter("class", "keywords-list hidden"))
					.elementAt(0).getChildren().extractAllNodesThatMatch(
							new TagNameFilter("ul")).elementAt(0).getChildren()
					.extractAllNodesThatMatch(new TagNameFilter("li"));
			if (as1 != null && as1.size() > 0) {
				for (int i = 0; i < as1.size(); i++) {
					Node node = as1.elementAt(i);
					String catName = node
							.getChildren()
							.extractAllNodesThatMatch(new TagNameFilter("span"))
							.elementAt(0).toPlainTextString();
					TaobaoKeywordCategory parent = adminService
							.findByCriterion(TaobaoKeywordCategory.class, R.eq(
									"name", catName));
					if (parent == null) {
						parent = new TaobaoKeywordCategory();
						parent.setName(catName);
						parent.setParent(null);
						parent.setCid(null);
						adminService.save(parent);
					}
					NodeList subUl = node.getChildren()
							.extractAllNodesThatMatch(new TagNameFilter("ul"),
									true);
					if (subUl != null && subUl.size() == 1) {
						NodeList lis = subUl.elementAt(0).getChildren()
								.extractAllNodesThatMatch(
										new TagNameFilter("li"), true);
						if (lis != null && lis.size() > 0) {
							for (int j = 0; j < lis.size(); j++) {
								TagNode li = (TagNode) lis.elementAt(j);
								String cid = li.getAttribute("catid");
								TaobaoKeywordCategory cat = adminService
										.findByCriterion(
												TaobaoKeywordCategory.class, R
														.eq("cid", cid));
								if (cat == null) {
									Node span = li.getChildren()
											.extractAllNodesThatMatch(
													new TagNameFilter("span"))
											.elementAt(0);
									String name = span.toPlainTextString();
									cat = new TaobaoKeywordCategory();
									cat.setCid(cid);
									cat.setName(name);
									cat.setParent(parent.getId());
									adminService.save(cat);
								}
							}
						}
					}
				}
			}
			EnvManager.getKeywordCats().clear();
			// 初始化所有关键词分类
			List<TaobaoKeywordCategory> cats = adminService.findAllByCriterion(
					TaobaoKeywordCategory.class, R.isNull("parent"));
			if (cats != null && cats.size() > 0) {
				for (TaobaoKeywordCategory cat : cats) {
					cat.setCats(adminService.findAllByCriterion(
							TaobaoKeywordCategory.class, R.eq("parent", cat
									.getId())));
				}
			}
			EnvManager.setKeywordCats(cats);// 重新设置关键词分类
			logger.info("taobao keyword cats ended...");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void getKeywordsByCatid(HttpClient httpClient, HttpMethod post,
			NameValuePair type, NameValuePair up, NameValuePair date,
			String catid, Long cid, Integer pageNo) {
		try {
			NameValuePair page = new NameValuePair("p", pageNo + "");
			NameValuePair cat = new NameValuePair("cat", catid);
			post
					.setQueryString(new NameValuePair[] { type, up, date, page,
							cat });
			httpClient.executeMethod(post);
			logger.info(post.getStatusLine().toString());
			BufferedReader reader;
			reader = new BufferedReader(new InputStreamReader(post
					.getResponseBodyAsStream(), "GBK"));
			Gson gson = new GsonBuilder().registerTypeAdapter(
					new TypeToken<TaobaoKeywordResult>() {
					}.getType(), new TaobaoKeywordResultDeserializer())
					.create();
			TaobaoKeywordResult result = gson.fromJson(reader,
					TaobaoKeywordResult.class);
			if (result != null) {
				List<TaobaoKeyword> words = result.getWords();
				if (words != null && words.size() > 0) {
					for (TaobaoKeyword word : words) {
						word.setCid(cid);
						try {
							TaobaoKeyword old = adminService.findByCriterion(
									TaobaoKeyword.class, R.eq("id", word
											.getId()), R.eq("cid", word
											.getCid()));
							if (old != null) {
								old.setAddedQuantity(word.getAddedQuantity());
								old.setAlipayTradeNumMonth(word
										.getAlipayTradeNumMonth());
								old.setIdx(word.getIdx());
								old.setIdxChg(word.getIdxChg());
								old.setIdxChgRate(word.getIdxChgRate());
								old.setIdxDownRank(word.getIdxDownRank());
								old.setIdxDownRateRank(word
										.getIdxDownRateRank());
								old.setIdxLast(word.getIdxLast());
								old.setIdxRank(word.getIdxRank());
								old.setIdxRankChg(word.getIdxRankChg());
								old.setIdxRankLast(word.getIdxRankLast());
								old.setIdxUpRank(word.getIdxUpRank());
								old.setIdxUpRateRank(word.getIdxUpRateRank());
								old.setObjectName(word.getObjectName());
								old.setObjectTitle(word.getObjectTitle());
								old.setProductSellerNum(word
										.getProductSellerNum());
								old.setThedate(word.getThedate());
								old.setTitle(word.getTitle());
								old.setType(word.getType());
								adminService.update(old);
							} else {
								adminService.save(word);
							}
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
				post.releaseConnection();// 释放TODO 暂时不抓取所有关键词
				// if (result.getPages() > result.getPage() && pageNo <= 2) {
				// Thread.sleep(1000);// 休息1秒
				// getKeywordsByCatid(httpClient, post, type, up, date, catid,
				// cid, pageNo + 1);
				// }
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void getKeywords() {
		HttpClient httpClient = new HttpClient();
		httpClient.getHostConfiguration().setHost("taoke.alimama.com", 80,
				"http");
		HttpMethod post = new PostMethod("/spreader/searchKeywordsFromTop.do");
		List<TaobaoKeywordCategory> cats = adminService
				.loadAll(TaobaoKeywordCategory.class);
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DATE, -1);
		NameValuePair type = new NameValuePair("type", "query");// 类型
		NameValuePair up = new NameValuePair("up", "true");// 排序
		NameValuePair date = new NameValuePair("date", DateUtils.format(
				calendar.getTime(), DateUtils.YYYYMMDD));// 日期
		if (cats != null && cats.size() > 0) {
			for (TaobaoKeywordCategory cat : cats) {
				adminService.deleteAll(TaobaoKeyword.class, R.eq("cid", cat
						.getId()));// 删除所有
				if ("所有关键词类目".equals(cat.getName())) {// 所有
					getKeywordsByCatid(httpClient, post, type, up, date, null,
							cat.getId(), 1);
				} else {
					if (StringUtils.isNotEmpty(cat.getCid())) {// 指定分类
						getKeywordsByCatid(httpClient, post, type, up, date,
								cat.getCid(), cat.getId(), 1);
					}
				}

			}
		}

	}

	/**
	 * @return the adminService
	 */
	public IAdminService getAdminService() {
		return adminService;
	}

	/**
	 * @param adminService
	 *            the adminService to set
	 */
	public void setAdminService(IAdminService adminService) {
		this.adminService = adminService;
	}
}

class TaobaoKeywordResultDeserializer implements
		JsonDeserializer<TaobaoKeywordResult> {

	@SuppressWarnings("unchecked")
	@Override
	public TaobaoKeywordResult deserialize(JsonElement json,
			java.lang.reflect.Type type, JsonDeserializationContext context)
			throws JsonParseException {
		if (json.isJsonObject()) {
			JsonObject o = (JsonObject) json;
			TaobaoKeywordResult result = new TaobaoKeywordResult();
			result.setBeginIndex(o.get("beginIndex").getAsLong());
			result.setEndIndex(o.get("endIndex").getAsLong());
			result.setFirstPage(o.get("firstPage").getAsLong());
			result.setItems(o.get("items").getAsLong());
			result.setItemsPerPage(o.get("itemsPerPage").getAsLong());
			result.setLastPage(o.get("lastPage").getAsLong());
			result.setLength(o.get("length").getAsLong());
			result.setOffset(o.get("offset").getAsLong());
			result.setPage(o.get("page").getAsLong());
			result.setPages(o.get("pages").getAsLong());
			result.setWords((List<TaobaoKeyword>) context.deserialize(o.get(
					"datas").getAsJsonArray(),
					new TypeToken<List<TaobaoKeyword>>() {
					}.getType()));
			return result;
		}
		return null;

	}
}
