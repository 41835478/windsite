package com.wind.site.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 报表结构
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "t_fanli_report")
public class T_TaobaokeReportMember implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	/**
	 * 淘宝交易号
	 **/
	private Long trade_id;
	private Long mini_trade_id;
	/**
	 * 应用授权码
	 **/
	private String app_key;
	/**
	 * 所购买商品的类目ID
	 **/
	private Long category_id;
	/**
	 * 所购买商品的类目名称
	 **/
	private String category_name;
	/**
	 * 用户获得的佣金
	 **/
	private String commission;
	/**
	 * 佣金比例
	 **/
	private String commission_rate;
	/**
	 * 商品成交数量
	 **/
	private Long item_num;
	/**
	 * 商品标题
	 **/
	private String item_title;
	/**
	 * 商品ID
	 **/
	private Long num_iid;
	/**
	 * 推广渠道
	 **/
	private String outer_code;
	/**
	 * 成交价格
	 **/
	private String pay_price;
	/**
	 * 成交时间
	 **/
	private Date pay_time;
	/**
	 * 卖家昵称
	 **/
	private String seller_nick;
	/**
	 * 店铺名称
	 **/
	private String shop_title;
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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the trade_id
	 */
	public Long getTrade_id() {
		return trade_id;
	}

	/**
	 * @param tradeId
	 *            the trade_id to set
	 */
	public void setTrade_id(Long tradeId) {
		trade_id = tradeId;
	}

	public Long getMini_trade_id() {
		return mini_trade_id;
	}

	public void setMini_trade_id(Long mini_trade_id) {
		this.mini_trade_id = mini_trade_id;
	}

	/**
	 * @return the app_key
	 */
	public String getApp_key() {
		return app_key;
	}

	/**
	 * @param appKey
	 *            the app_key to set
	 */
	public void setApp_key(String appKey) {
		app_key = appKey;
	}

	/**
	 * @return the category_id
	 */
	public Long getCategory_id() {
		return category_id;
	}

	/**
	 * @param categoryId
	 *            the category_id to set
	 */
	public void setCategory_id(Long categoryId) {
		category_id = categoryId;
	}

	/**
	 * @return the category_name
	 */
	public String getCategory_name() {
		return category_name;
	}

	/**
	 * @param categoryName
	 *            the category_name to set
	 */
	public void setCategory_name(String categoryName) {
		category_name = categoryName;
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
	 * @return the commission_rate
	 */
	public String getCommission_rate() {
		return commission_rate;
	}

	/**
	 * @param commissionRate
	 *            the commission_rate to set
	 */
	public void setCommission_rate(String commissionRate) {
		commission_rate = commissionRate;
	}

	/**
	 * @return the item_num
	 */
	public Long getItem_num() {
		return item_num;
	}

	/**
	 * @param itemNum
	 *            the item_num to set
	 */
	public void setItem_num(Long itemNum) {
		item_num = itemNum;
	}

	/**
	 * @return the item_title
	 */
	public String getItem_title() {
		return item_title;
	}

	/**
	 * @param itemTitle
	 *            the item_title to set
	 */
	public void setItem_title(String itemTitle) {
		item_title = itemTitle;
	}

	/**
	 * @return the num_iid
	 */
	public Long getNum_iid() {
		return num_iid;
	}

	/**
	 * @param numIid
	 *            the num_iid to set
	 */
	public void setNum_iid(Long numIid) {
		num_iid = numIid;
	}

	/**
	 * @return the outer_code
	 */
	public String getOuter_code() {
		return outer_code;
	}

	/**
	 * @param outerCode
	 *            the outer_code to set
	 */
	public void setOuter_code(String outerCode) {
		outer_code = outerCode;
	}

	/**
	 * @return the pay_price
	 */
	public String getPay_price() {
		return pay_price;
	}

	/**
	 * @param payPrice
	 *            the pay_price to set
	 */
	public void setPay_price(String payPrice) {
		pay_price = payPrice;
	}

	/**
	 * @return the pay_time
	 */
	public Date getPay_time() {
		return pay_time;
	}

	/**
	 * @param payTime
	 *            the pay_time to set
	 */
	public void setPay_time(Date payTime) {
		pay_time = payTime;
	}

	/**
	 * @return the seller_nick
	 */
	public String getSeller_nick() {
		return seller_nick;
	}

	/**
	 * @param sellerNick
	 *            the seller_nick to set
	 */
	public void setSeller_nick(String sellerNick) {
		seller_nick = sellerNick;
	}

	/**
	 * @return the shop_title
	 */
	public String getShop_title() {
		return shop_title;
	}

	/**
	 * @param shopTitle
	 *            the shop_title to set
	 */
	public void setShop_title(String shopTitle) {
		shop_title = shopTitle;
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

	public void setBuyCommission(String buyCommission) {
		this.buyCommission = buyCommission;
	}

	public String getBuyCommission() {
		return buyCommission;
	}

	public void setAdsCommission(String adsCommission) {
		this.adsCommission = adsCommission;
	}

	public String getAdsCommission() {
		return adsCommission;
	}

}
