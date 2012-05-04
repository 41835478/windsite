package com.wind.site.model.convert;

import java.util.List;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.wind.core.util.DateUtils;
import com.wind.site.model.Site;

/**
 * Site Convert
 * 
 * @author fxy
 * 
 */
public class SiteConvert {
	public static JsonArray convertSites2Json(List<Site> list) {
		JsonArray array = new JsonArray();
		if (list != null && list.size() > 0) {
			for (Site site : list) {
				array.add(convertSite2Json(site));
			}
		}
		return array;
	}

	public static JsonObject convertSite2Json(Site site) {
		JsonObject obj = new JsonObject();
		obj.addProperty("id", site.getId());
		obj.addProperty("title", site.getTitle());
		obj.addProperty("domainName", site.getDomainName());
		obj.addProperty("user_id", site.getUser_id());
		obj.addProperty("gid", site.getGid());
		obj.addProperty("created", DateUtils.format(site.getCreated(),
				DateUtils.yyyy_MM_DD_HH_MM_SS));
		return obj;
	}
}
