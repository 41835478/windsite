package com.wind.site.model;

import java.io.Serializable;

/**
 * 主动通知返回数据结构
 * 
 * @author fxy
 * 
 */
public class ReceiveMsg implements Serializable {

	private static final long serialVersionUID = 1L;

	private T_NotifyTrade notify_trade;

	private T_NotifyItem notify_item;

	/**
	 * @return the notify_trade
	 */
	public T_NotifyTrade getNotify_trade() {
		return notify_trade;
	}

	/**
	 * @param notifyTrade
	 *            the notify_trade to set
	 */
	public void setNotify_trade(T_NotifyTrade notifyTrade) {
		notify_trade = notifyTrade;
	}

	/**
	 * @return the notify_item
	 */
	public T_NotifyItem getNotify_item() {
		return notify_item;
	}

	/**
	 * @param notifyItem
	 *            the notify_item to set
	 */
	public void setNotify_item(T_NotifyItem notifyItem) {
		notify_item = notifyItem;
	}

}
