package com.wind.site.model.convert;

import java.util.List;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.wind.core.util.DateUtils;
import com.wind.site.model.ItemGroup;

/**
 * ItemGroup Convert
 * 
 * @author fxy
 * 
 */
public class ItemGroupConvert {
	public static JsonArray convertItemGroups2Json(List<ItemGroup> list) {
		JsonArray array = new JsonArray();
		if (list != null && list.size() > 0) {
			for (ItemGroup itemGroup : list) {
				array.add(convertItemGroup2Json(itemGroup));
			}
		}
		return array;
	}

	public static JsonObject convertItemGroup2Json(ItemGroup itemGroup) {
		JsonObject obj = new JsonObject();
		obj.addProperty("id", itemGroup.getId());
		obj.addProperty("name", itemGroup.getName());
		obj.addProperty("user_id", itemGroup.getUser_id());
		obj.addProperty("created", DateUtils.format(itemGroup.getCreated(),
				DateUtils.yyyy_MM_DD_HH_MM_SS));
		return obj;
	}
}
