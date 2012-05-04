package com.wind.site.module.impl;

import java.util.Comparator;

import com.taobao.api.domain.TaobaokeItem;

public class ItemPriceDescComparator implements Comparator<TaobaokeItem> {
	@Override
	public int compare(TaobaokeItem o1, TaobaokeItem o2) {
		Double p1 = Double.parseDouble(o1.getPrice());
		Double p2 = Double.parseDouble(o2.getPrice());
		return p2.compareTo(p1);
	}
}
