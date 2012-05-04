package com.wind.site.module.impl;

import java.util.Comparator;

import com.taobao.api.domain.TaobaokeItem;

public class ItemVolumeDescComparator implements Comparator<TaobaokeItem> {
	@Override
	public int compare(TaobaokeItem o1, TaobaokeItem o2) {
		Long p1 = o1.getVolume();
		Long p2 = o2.getVolume();
		return p2.compareTo(p1);
	}
}
