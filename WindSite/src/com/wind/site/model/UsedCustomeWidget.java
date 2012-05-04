package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * 自定义组件使用记录
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_widget_used")
public class UsedCustomeWidget extends TimestampModel {

	private static final long serialVersionUID = 1L;
	@ManyToOne
	@JoinColumn(name = "w_c_id")
	private CustomeWidget widget;
	/**
	 * 用户
	 */
	private String user_id;
	/**
	 * 用户昵称
	 */
	private String nick;

	/**
	 * 自动更新
	 */
	private Boolean autoUpdate = true;
	/**
	 * 所属模板
	 */
	@ManyToOne
	@JoinColumn(name = "tid")
	private UserTemplate template;

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

	/**
	 * @return the nick
	 */
	public String getNick() {
		return nick;
	}

	/**
	 * @param nick
	 *            the nick to set
	 */
	public void setNick(String nick) {
		this.nick = nick;
	}

	public void setTemplate(UserTemplate template) {
		this.template = template;
	}

	public UserTemplate getTemplate() {
		return template;
	}

	public void setAutoUpdate(Boolean autoUpdate) {
		this.autoUpdate = autoUpdate;
	}

	public Boolean getAutoUpdate() {
		return autoUpdate;
	}

}
