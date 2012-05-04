package com.wind.site.model;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import org.apache.lucene.analysis.cn.ChineseAnalyzer;
import org.hibernate.search.annotations.Analyzer;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Index;
import org.hibernate.search.annotations.Store;

/**
 * 淘宝商品基础数据结构
 * 
 * @author fxy
 * 
 */
@MappedSuperclass
public class T_TaobaoItem extends OrderTimestampModel {

	private static final long serialVersionUID = 1L;

	private String iid;// N 淘宝客商品id
	@Field(name = "title", store = Store.NO, index = Index.TOKENIZED, analyzer = @Analyzer(impl = ChineseAnalyzer.class))
	private String title;// N 商品title 宝贝名称
	@Field(name = "nick", store = Store.NO, index = Index.TOKENIZED, analyzer = @Analyzer(impl = ChineseAnalyzer.class))
	private String nick;// N 卖家昵称

	private String pic_url;// N 图片url
	@Field(name = "price", store = Store.NO, index = Index.UN_TOKENIZED)
	private Float price;// N 商品价格
	@Column(length = 500)
	private String click_url;// N 推广点击url

	private Float commission;// N 淘宝客佣金

	private Float commission_rate;// N 淘宝客佣金比率

	private Integer commission_num;// N 累计成交量.注：返回的数据是30天内累计推广量

	private Float commission_volume;// N 累计总支出佣金量
	// 2010-5-22新增
	private Long num_iid;// N 淘宝客商品数字id

	private String shop_click_url; // String N 商品所在店铺的推广点击url
	@Field(name = "seller_credit_score", store = Store.NO, index = Index.UN_TOKENIZED)
	private Long seller_credit_score;// Long N 卖家信用等级
	@Field(name = "item_location", store = Store.NO, index = Index.TOKENIZED, analyzer = @Analyzer(impl = ChineseAnalyzer.class))
	private String item_location;// String N 商品所在地

	private Long volume;// Long N 商品30天交易量

	// 新淘内部结构
	@Field(name = "isValid", store = Store.NO, index = Index.UN_TOKENIZED)
	private Boolean isValid = true;// 是否有效

	/**
	 * @return the iid
	 */
	public String getIid() {
		return iid;
	}

	/**
	 * @param iid
	 *            the iid to set
	 */
	public void setIid(String iid) {
		this.iid = iid;
	}

	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @param title
	 *            the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
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
	 * @return the pic_url
	 */
	public String getPic_url() {
		return pic_url;
	}

	/**
	 * @param picUrl
	 *            the pic_url to set
	 */
	public void setPic_url(String picUrl) {
		pic_url = picUrl;
	}

	/**
	 * @return the price
	 */
	public Float getPrice() {
		return price;
	}

	/**
	 * @param price
	 *            the price to set
	 */
	public void setPrice(Float price) {
		this.price = price;
	}

	/**
	 * @return the click_url
	 */
	public String getClick_url() {
		return click_url;
	}

	/**
	 * @param clickUrl
	 *            the click_url to set
	 */
	public void setClick_url(String clickUrl) {
		click_url = clickUrl;
	}

	/**
	 * @return the commission
	 */
	public Float getCommission() {
		return commission;
	}

	/**
	 * @param commission
	 *            the commission to set
	 */
	public void setCommission(Float commission) {
		this.commission = commission;
	}

	/**
	 * @return the commission_rate
	 */
	public Float getCommission_rate() {
		return commission_rate;
	}

	/**
	 * @param commissionRate
	 *            the commission_rate to set
	 */
	public void setCommission_rate(Float commissionRate) {
		commission_rate = commissionRate;
	}

	/**
	 * @return the commission_num
	 */
	public Integer getCommission_num() {
		return commission_num;
	}

	/**
	 * @param commissionNum
	 *            the commission_num to set
	 */
	public void setCommission_num(Integer commissionNum) {
		commission_num = commissionNum;
	}

	/**
	 * @return the commission_volume
	 */
	public Float getCommission_volume() {
		return commission_volume;
	}

	/**
	 * @param commissionVolume
	 *            the commission_volume to set
	 */
	public void setCommission_volume(Float commissionVolume) {
		commission_volume = commissionVolume;
	}

	/**
	 * @return the isValid
	 */
	public Boolean getIsValid() {
		return isValid;
	}

	/**
	 * @param isValid
	 *            the isValid to set
	 */
	public void setIsValid(Boolean isValid) {
		this.isValid = isValid;
	}

	public void setNum_iid(Long num_iid) {
		this.num_iid = num_iid;
	}

	public Long getNum_iid() {
		return num_iid;
	}

	/**
	 * @return the shop_click_url
	 */
	public String getShop_click_url() {
		return shop_click_url;
	}

	/**
	 * @param shopClickUrl
	 *            the shop_click_url to set
	 */
	public void setShop_click_url(String shopClickUrl) {
		shop_click_url = shopClickUrl;
	}

	/**
	 * @return the seller_credit_score
	 */
	public Long getSeller_credit_score() {
		return seller_credit_score;
	}

	/**
	 * @param sellerCreditScore
	 *            the seller_credit_score to set
	 */
	public void setSeller_credit_score(Long sellerCreditScore) {
		seller_credit_score = sellerCreditScore;
	}

	/**
	 * @return the item_location
	 */
	public String getItem_location() {
		return item_location;
	}

	/**
	 * @param itemLocation
	 *            the item_location to set
	 */
	public void setItem_location(String itemLocation) {
		item_location = itemLocation;
	}

	/**
	 * @return the volume
	 */
	public Long getVolume() {
		return volume;
	}

	/**
	 * @param volume
	 *            the volume to set
	 */
	public void setVolume(Long volume) {
		this.volume = volume;
	}

}
