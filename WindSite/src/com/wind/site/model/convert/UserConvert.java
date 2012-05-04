package com.wind.site.model.convert;

import java.util.List;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.wind.core.util.DateUtils;
import com.wind.site.model.User;

/**
 * User Convert
 * 
 * @author fxy
 * 
 */
public class UserConvert {
	public static JsonArray convertUsers2Json(List<User> list) {
		JsonArray array = new JsonArray();
		if (list != null && list.size() > 0) {
			for (User user : list) {
				array.add(convertUser2Json(user));
			}
		}
		return array;
	}

	public static JsonObject convertUser2Json(User user) {
		JsonObject obj = new JsonObject();
		obj.addProperty("id", user.getId());
		obj.addProperty("user_id", user.getUser_id());
		obj.addProperty("nick", user.getNick());
		obj.addProperty("email", user.getEmail());
		obj.addProperty("created", DateUtils.format(user.getCreated(),
				DateUtils.yyyy_MM_DD_HH_MM_SS));
		obj.addProperty("last_visit", DateUtils.format(user.getLast_visit(),
				DateUtils.yyyy_MM_DD_HH_MM_SS));
		obj.addProperty("visits", user.getVisits());
		return obj;
	}
}
