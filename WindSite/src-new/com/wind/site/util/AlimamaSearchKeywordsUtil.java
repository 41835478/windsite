package com.wind.site.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.io.IOUtils;
import org.hibernate.criterion.R;
import org.htmlparser.Node;
import org.htmlparser.Parser;
import org.htmlparser.filters.HasAttributeFilter;
import org.htmlparser.filters.TagNameFilter;
import org.htmlparser.nodes.TagNode;
import org.htmlparser.util.NodeList;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.google.gson.reflect.TypeToken;
import com.wind.core.service.IBaseService;
import com.wind.site.model.TaobaoKeyword;
import com.wind.site.model.TaobaoKeywordCategory;

public class AlimamaSearchKeywordsUtil {
	private static HttpClient httpClient = new HttpClient();

	public static void getCats(IBaseService service) {
		try {
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
					TaobaoKeywordCategory parent = service.findByCriterion(
							TaobaoKeywordCategory.class, R.eq("name", catName));
					if (parent == null) {
						parent = new TaobaoKeywordCategory();
						parent.setName(catName);
						parent.setParent(null);
						parent.setCid(null);
						service.save(parent);
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
								TaobaoKeywordCategory cat = service.get(
										TaobaoKeywordCategory.class, cid);
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
									service.save(cat);
								}
							}
						}
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void getKeywords() throws HttpException, IOException {
		httpClient.getHostConfiguration().setHost("taoke.alimama.com", 80,
				"http");

		HttpMethod post = new PostMethod("/spreader/searchKeywordsFromTop.do");
		NameValuePair type = new NameValuePair("type", "query");
		NameValuePair up = new NameValuePair("up", "true");
		NameValuePair page = new NameValuePair("p", "1");
		NameValuePair date = new NameValuePair("date", "20110222");
		NameValuePair cat = new NameValuePair("cat", "TR_MRHF");
		post.setQueryString(new NameValuePair[] { type, up, page, date, cat });
		httpClient.executeMethod(post);
		System.out.println(post.getStatusLine());
		BufferedReader reader = new BufferedReader(new InputStreamReader(post
				.getResponseBodyAsStream(), "GBK"));
		// Gson gson = new GsonBuilder().registerTypeAdapter(
		// new TypeToken<TaobaoKeywordResult>() {
		// }.getType(), new TaobaoKeywordResultDeserializer()).create();
		String str = IOUtils.toString(reader);
		System.out.println(str);

		post.releaseConnection();
	}

	public static void main(String[] args) throws HttpException, IOException {
		getKeywords();
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
