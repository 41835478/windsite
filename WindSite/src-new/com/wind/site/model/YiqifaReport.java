package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * 亿起发报表
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_yiqifa_report")
public class YiqifaReport implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@Column(length = 32)
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	private String id;
	/**
	 * 亿起发(唯一编号)
	 */
	private String yiqifaId;
	/**
	 * 联盟活动编号
	 */
	private String actionId;
	/**
	 * 活动名称
	 */
	private String actionName;
	/**
	 * 网营商id
	 */
	private String sid;
	/**
	 * 网站编号
	 */
	private String wid;
	/**
	 * 下单时间
	 */
	private String orderTime;
	/**
	 * 订单编号
	 */
	private String orderNo;
	/**
	 * 佣金类型
	 */
	private String commissionType;
	/**
	 * 商品编号
	 */
	private String itemId;
	/**
	 * 商品标题
	 */
	private String itemTitle;
	/**
	 * 订单商品件数
	 */
	private String itemNums;
	/**
	 * 订单商品价格
	 */
	private String itemPrice;
	/**
	 * 反馈标签
	 */
	private String outerCode;
	/**
	 * 订单状态
	 */
	private String orderStatus;
	/**
	 * 网站主佣金
	 */
	private String commission;
	/**
	 * 商品分类
	 */
	private String cid;
	/**
	 * 分类名称
	 */
	private String cname;
	// 新淘网参数
	/**
	 * 购买返利
	 */
	private String buyCommission;
	/**
	 * 推广返利
	 */
	private String adsCommission;
	/**
	 * 购买人昵称
	 */
	private String nick;
	/**
	 * 推广人昵称
	 */
	private String adNick;
	/**
	 * 站点ID
	 */
	private String site_id;
	/**
	 * 站长ID
	 */
	private String user_id;
	/**
	 * 站长昵称
	 */
	private String user_name;

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the yiqifaId
	 */
	public String getYiqifaId() {
		return yiqifaId;
	}

	/**
	 * @param yiqifaId
	 *            the yiqifaId to set
	 */
	public void setYiqifaId(String yiqifaId) {
		this.yiqifaId = yiqifaId;
	}

	/**
	 * @return the actionId
	 */
	public String getActionId() {
		return actionId;
	}

	/**
	 * @param actionId
	 *            the actionId to set
	 */
	public void setActionId(String actionId) {
		this.actionId = actionId;
	}

	/**
	 * @return the sid
	 */
	public String getSid() {
		return sid;
	}

	/**
	 * @param sid
	 *            the sid to set
	 */
	public void setSid(String sid) {
		this.sid = sid;
	}

	/**
	 * @return the wid
	 */
	public String getWid() {
		return wid;
	}

	/**
	 * @param wid
	 *            the wid to set
	 */
	public void setWid(String wid) {
		this.wid = wid;
	}

	/**
	 * @return the orderTime
	 */
	public String getOrderTime() {
		return orderTime;
	}

	/**
	 * @param orderTime
	 *            the orderTime to set
	 */
	public void setOrderTime(String orderTime) {
		this.orderTime = orderTime;
	}

	/**
	 * @return the orderNo
	 */
	public String getOrderNo() {
		return orderNo;
	}

	/**
	 * @param orderNo
	 *            the orderNo to set
	 */
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	/**
	 * @return the commissionType
	 */
	public String getCommissionType() {
		return commissionType;
	}

	/**
	 * @param commissionType
	 *            the commissionType to set
	 */
	public void setCommissionType(String commissionType) {
		this.commissionType = commissionType;
	}

	/**
	 * @return the itemId
	 */
	public String getItemId() {
		return itemId;
	}

	/**
	 * @param itemId
	 *            the itemId to set
	 */
	public void setItemId(String itemId) {
		this.itemId = itemId;
	}

	/**
	 * @return the itemNums
	 */
	public String getItemNums() {
		return itemNums;
	}

	/**
	 * @param itemNums
	 *            the itemNums to set
	 */
	public void setItemNums(String itemNums) {
		this.itemNums = itemNums;
	}

	/**
	 * @return the itemPrice
	 */
	public String getItemPrice() {
		return itemPrice;
	}

	/**
	 * @param itemPrice
	 *            the itemPrice to set
	 */
	public void setItemPrice(String itemPrice) {
		this.itemPrice = itemPrice;
	}

	/**
	 * @return the outerCode
	 */
	public String getOuterCode() {
		return outerCode;
	}

	/**
	 * @param outerCode
	 *            the outerCode to set
	 */
	public void setOuterCode(String outerCode) {
		this.outerCode = outerCode;
	}

	/**
	 * @return the orderStatus
	 */
	public String getOrderStatus() {
		return orderStatus;
	}

	/**
	 * @param orderStatus
	 *            the orderStatus to set
	 */
	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	/**
	 * @return the commission
	 */
	public String getCommission() {
		return commission;
	}

	/**
	 * @param commission
	 *            the commission to set
	 */
	public void setCommission(String commission) {
		this.commission = commission;
	}

	/**
	 * @return the cid
	 */
	public String getCid() {
		return cid;
	}

	/**
	 * @param cid
	 *            the cid to set
	 */
	public void setCid(String cid) {
		this.cid = cid;
	}

	/**
	 * @return the cname
	 */
	public String getCname() {
		return cname;
	}

	/**
	 * @param cname
	 *            the cname to set
	 */
	public void setCname(String cname) {
		this.cname = cname;
	}

	/**
	 * @return the buyCommission
	 */
	public String getBuyCommission() {
		return buyCommission;
	}

	/**
	 * @param buyCommission
	 *            the buyCommission to set
	 */
	public void setBuyCommission(String buyCommission) {
		this.buyCommission = buyCommission;
	}

	/**
	 * @return the adsCommission
	 */
	public String getAdsCommission() {
		return adsCommission;
	}

	/**
	 * @param adsCommission
	 *            the adsCommission to set
	 */
	public void setAdsCommission(String adsCommission) {
		this.adsCommission = adsCommission;
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
	 * @return the adNick
	 */
	public String getAdNick() {
		return adNick;
	}

	/**
	 * @param adNick
	 *            the adNick to set
	 */
	public void setAdNick(String adNick) {
		this.adNick = adNick;
	}

	/**
	 * @return the site_id
	 */
	public String getSite_id() {
		return site_id;
	}

	/**
	 * @param siteId
	 *            the site_id to set
	 */
	public void setSite_id(String siteId) {
		site_id = siteId;
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
	 * @return the user_name
	 */
	public String getUser_name() {
		return user_name;
	}

	/**
	 * @param userName
	 *            the user_name to set
	 */
	public void setUser_name(String userName) {
		user_name = userName;
	}

	/**
	 * @return the actionName
	 */
	public String getActionName() {
		return actionName;
	}

	/**
	 * @param actionName
	 *            the actionName to set
	 */
	public void setActionName(String actionName) {
		this.actionName = actionName;
	}

	public void setItemTitle(String itemTitle) {
		this.itemTitle = itemTitle;
	}

	public String getItemTitle() {
		return itemTitle;
	}

}
