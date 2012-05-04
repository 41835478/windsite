package com.wind.site.model.convert;

import java.util.List;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.wind.site.model.WidgetAttribute;

/**
 * 组件属性转换器
 * 
 * @author fxy
 * 
 */
public class WidgetAttributeConvert {
	public static JsonArray convertWidgetAttributes2Json(
			List<WidgetAttribute> list) {
		JsonArray array = new JsonArray();
		if (list != null && list.size() > 0) {
			for (WidgetAttribute itemGroup : list) {
				array.add(convertWidgetAttribute2Json(itemGroup));
			}
		}
		return array;
	}

	public static JsonObject convertWidgetAttribute2Json(WidgetAttribute attr) {
		JsonObject obj = new JsonObject();
		obj.addProperty("type", attr.getType());
		obj.addProperty("title", attr.getTitle());
		obj.addProperty("clickUrl", attr.getClickUrl());
		obj.addProperty("picUrl", attr.getPicUrl());
		obj.addProperty("price", attr.getPrice());
		obj.addProperty("desc", attr.getDescription());
		return obj;
	}
}
