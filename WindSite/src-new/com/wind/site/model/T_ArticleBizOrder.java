package com.wind.site.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "t_article_biz_order")
public class T_ArticleBizOrder implements Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * Number 否 12345 订单号
	 */
	private Long biz_order_id;
	/**
	 * Number 否 7000011 子订单号
	 */
	@Id
	private Long order_id;
	/**
	 * String 否 hz0799 淘宝会员名
	 */
	private String nick;
	/**
	 * String 否 网店版 应用名称
	 */
	private String article_name;
	/**
	 * String否ts-123应用收费代码，从合作伙伴后台（my.open.taobao.com）-收费管理-收费项目列表能够获得该应用的收费代码
	 */
	private String article_code;
	/**
	 * String 否 批量推荐 收费项目名称
	 */
	private String item_name;
	/**
	 * String否ts-123-1收费项目代码，从合作伙伴后台（my.open.taobao.com）-收费管理-收费项目列表能够获得收费项目代码
	 */
	private String item_code;
	/**
	 * Date 否 2000-01-01 00:00:00 订单创建时间（订购时间）
	 */
	private Date created;
	/**
	 * String 否 1 订购周期
	 */
	private String order_cycle;
	/**
	 * Date 否 2000-01-01 00:00:00 订购周期开始时间
	 */
	private Date order_cycle_start;
	/**
	 * Date 否 2000-01-01 00:00:00 订购周期结束时间
	 */
	private Date order_cycle_end;
	/**
	 * Number 否 1 订单类型，1=新订 2=续订3=升级4=后台赠送5=后台自动续订6=订单审核后生成订购关系（暂时用不到）
	 */
	private Integer biz_type;
	/**
	 * String 否 10 原价
	 */
	private String fee;
	/**
	 * String 否 5 优惠
	 */
	private String prom_fee;
	/**
	 * String 否 0 退款（升级时，系统会将升级前老版本按照剩余订购天数退还剩余金额）
	 */
	private String refund_fee;
	/**
	 * String 否 5 实付
	 */
	private String total_pay_fee;

	/**
	 * @return the biz_order_id
	 */
	public Long getBiz_order_id() {
		return biz_order_id;
	}

	/**
	 * @param bizOrderId
	 *            the biz_order_id to set
	 */
	public void setBiz_order_id(Long bizOrderId) {
		biz_order_id = bizOrderId;
	}

	/**
	 * @return the order_id
	 */
	public Long getOrder_id() {
		return order_id;
	}

	/**
	 * @param orderId
	 *            the order_id to set
	 */
	public void setOrder_id(Long orderId) {
		order_id = orderId;
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
	 * @return the article_name
	 */
	public String getArticle_name() {
		return article_name;
	}

	/**
	 * @param articleName
	 *            the article_name to set
	 */
	public void setArticle_name(String articleName) {
		article_name = articleName;
	}

	/**
	 * @return the article_code
	 */
	public String getArticle_code() {
		return article_code;
	}

	/**
	 * @param articleCode
	 *            the article_code to set
	 */
	public void setArticle_code(String articleCode) {
		article_code = articleCode;
	}

	/**
	 * @return the item_name
	 */
	public String getItem_name() {
		return item_name;
	}

	/**
	 * @param itemName
	 *            the item_name to set
	 */
	public void setItem_name(String itemName) {
		item_name = itemName;
	}

	/**
	 * @return the item_code
	 */
	public String getItem_code() {
		return item_code;
	}

	/**
	 * @param itemCode
	 *            the item_code to set
	 */
	public void setItem_code(String itemCode) {
		item_code = itemCode;
	}

	/**
	 * @return the created
	 */
	public Date getCreated() {
		return created;
	}

	/**
	 * @param created
	 *            the created to set
	 */
	public void setCreated(Date created) {
		this.created = created;
	}

	/**
	 * @return the order_cycle
	 */
	public String getOrder_cycle() {
		return order_cycle;
	}

	/**
	 * @param orderCycle
	 *            the order_cycle to set
	 */
	public void setOrder_cycle(String orderCycle) {
		order_cycle = orderCycle;
	}

	/**
	 * @return the order_cycle_start
	 */
	public Date getOrder_cycle_start() {
		return order_cycle_start;
	}

	/**
	 * @param orderCycleStart
	 *            the order_cycle_start to set
	 */
	public void setOrder_cycle_start(Date orderCycleStart) {
		order_cycle_start = orderCycleStart;
	}

	/**
	 * @return the order_cycle_end
	 */
	public Date getOrder_cycle_end() {
		return order_cycle_end;
	}

	/**
	 * @param orderCycleEnd
	 *            the order_cycle_end to set
	 */
	public void setOrder_cycle_end(Date orderCycleEnd) {
		order_cycle_end = orderCycleEnd;
	}

	/**
	 * @return the biz_type
	 */
	public Integer getBiz_type() {
		return biz_type;
	}

	/**
	 * @param bizType
	 *            the biz_type to set
	 */
	public void setBiz_type(Integer bizType) {
		biz_type = bizType;
	}

	/**
	 * @return the fee
	 */
	public String getFee() {
		return fee;
	}

	/**
	 * @param fee
	 *            the fee to set
	 */
	public void setFee(String fee) {
		this.fee = fee;
	}

	/**
	 * @return the prom_fee
	 */
	public String getProm_fee() {
		return prom_fee;
	}

	/**
	 * @param promFee
	 *            the prom_fee to set
	 */
	public void setProm_fee(String promFee) {
		prom_fee = promFee;
	}

	/**
	 * @return the refund_fee
	 */
	public String getRefund_fee() {
		return refund_fee;
	}

	/**
	 * @param refundFee
	 *            the refund_fee to set
	 */
	public void setRefund_fee(String refundFee) {
		refund_fee = refundFee;
	}

	/**
	 * @return the total_pay_fee
	 */
	public String getTotal_pay_fee() {
		return total_pay_fee;
	}

	/**
	 * @param totalPayFee
	 *            the total_pay_fee to set
	 */
	public void setTotal_pay_fee(String totalPayFee) {
		total_pay_fee = totalPayFee;
	}

}
