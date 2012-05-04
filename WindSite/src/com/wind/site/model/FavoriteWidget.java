package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "w_widget_favorite")
public class FavoriteWidget extends OrderTimestampModel {

	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "w_c_id")
	private CustomeWidget widget;

	private String user_id;

	private String nick;

	/**
	 * @return the widget
	 */
	public CustomeWidget getWidget() {
		return widget;
	}

	/**
	 * @param widget
	 *            the widget to set
	 */
	public void setWidget(CustomeWidget widget) {
		this.widget = widget;
	}

	/**
	 * @return the user_id
	 */
	public String getUser_id() {
		return user_id;
	}

	/**
	 * @param userId
	 *            the user_id to set
	 */
	public void setUser_id(String userId) {
		user_id = userId;
	}

	public void setNick(String nick) {
		this.nick = nick;
	}

	public String getNick() {
		return nick;
	}

}
