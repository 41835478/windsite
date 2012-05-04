package com.wind.site.model;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * 自定义组件
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_widget_custome")
public class CustomeWidget extends OrderTimestampModel {

	private static final long serialVersionUID = 1L;
	/**
	 * 名称
	 */
	private String name;
	/**
	 * 描述
	 */
	private String description;
	/**
	 * 关联组件
	 */
	@ManyToOne
	@JoinColumn(name = "w_id")
	private Widget widget;
	/**
	 * 创建人昵称
	 */
	private String nick;
	/**
	 * 权限 0：公开 1：全好友可见 2：仅指定好友可见 3：仅自己可见 4：密码可见
	 */
	private Integer friend;
	/**
	 * 密码
	 */
	private String password;
	/**
	 * 组件更新时间
	 */
	private Date widgetUpdated;
	/**
	 * 组件类型
	 */
	@ManyToOne
	@JoinColumn(name = "cid")
	private T_ItemCat cat;
	/**
	 * 组件所属布局 0：单栏 1：两栏（1-3）右 2：三栏（1-3-1）中 3：两栏（1-1）左/右 4：三栏（1-1-1）左/中/右
	 * 5：两栏（1-3）左 6：三栏（1-3-1）左/右
	 */
	private Integer layout;
	/**
	 * 收藏数量
	 */
	private Integer favorite = 0;
	/**
	 * 使用数量
	 */
	private Integer used = 0;
	/**
	 * 颜色 0：白 1：红 2：黑 3：黄 4：绿 5：蓝 6：橙 7：紫 8：灰 9：棕 10：多彩 11：青
	 */
	private Integer color;
	/**
	 * 是否收费
	 */
	private Boolean isCharge = false;

	/**
	 * 是否可编辑
	 */
	private Boolean isEdit = true;
	/**
	 * 模板内容
	 */
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private String content;
	/**
	 * 淘宝模板内容
	 */
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private String tbContent;
	/**
	 * 状态:0-未发布，1-已发布
	 */
	private Integer status = 0;
	/**
	 * 软文组件关联家园日志分类
	 */
	private String classid;
	/**
	 * 软文组件显示长度
	 */
	private String bloglength;

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description
	 *            the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return the widget
	 */
	public Widget getWidget() {
		return widget;
	}

	/**
	 * @param widget
	 *            the widget to set
	 */
	public void setWidget(Widget widget) {
		this.widget = widget;
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

	/**
	 * @return the friend
	 */
	public Integer getFriend() {
		return friend;
	}

	/**
	 * @param friend
	 *            the friend to set
	 */
	public void setFriend(Integer friend) {
		this.friend = friend;
	}

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password
	 *            the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @return the layout
	 */
	public Integer getLayout() {
		return layout;
	}

	/**
	 * @param layout
	 *            the layout to set
	 */
	public void setLayout(Integer layout) {
		this.layout = layout;
	}

	/**
	 * @return the favorite
	 */
	public Integer getFavorite() {
		return favorite;
	}

	/**
	 * @param favorite
	 *            the favorite to set
	 */
	public void setFavorite(Integer favorite) {
		this.favorite = favorite;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getContent() {
		return content;
	}

	public void setColor(Integer color) {
		this.color = color;
	}

	public Integer getColor() {
		return color;
	}

	public void setIsCharge(Boolean isCharge) {
		this.isCharge = isCharge;
	}

	public Boolean getIsCharge() {
		return isCharge;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getStatus() {
		return status;
	}

	public void setCat(T_ItemCat cat) {
		this.cat = cat;
	}

	public T_ItemCat getCat() {
		return cat;
	}

	public void setIsEdit(Boolean isEdit) {
		this.isEdit = isEdit;
	}

	public Boolean getIsEdit() {
		return isEdit;
	}

	public void setUsed(Integer used) {
		this.used = used;
	}

	public Integer getUsed() {
		return used;
	}

	public void setWidgetUpdated(Date widgetUpdated) {
		this.widgetUpdated = widgetUpdated;
	}

	public Date getWidgetUpdated() {
		return widgetUpdated;
	}

	public void setBloglength(String bloglength) {
		this.bloglength = bloglength;
	}

	public String getBloglength() {
		return bloglength;
	}

	public void setClassid(String classid) {
		this.classid = classid;
	}

	public String getClassid() {
		return classid;
	}

	public void setTbContent(String tbContent) {
		this.tbContent = tbContent;
	}

	public String getTbContent() {
		return tbContent;
	}

}
