package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Index;
import org.hibernate.search.annotations.Indexed;
import org.hibernate.search.annotations.Store;

/**
 * 新淘推荐商品结构
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_ad_item")
@Indexed(index = "w_ad_item")
public class ADTaobaokeItem extends T_TaobaoItem {

	private static final long serialVersionUID = 1L;
	@Field(name = "cid", store = Store.NO, index = Index.UN_TOKENIZED)
	private String cid;// Number N 商品所属的类目编号。
	/**
	 * 广告计划ID
	 */
	private String planid;

	public void setCid(String cid) {
		this.cid = cid;
	}

	public String getCid() {
		return cid;
	}

	public void setPlanid(String planid) {
		this.planid = planid;
	}

	public String getPlanid() {
		return planid;
	}
}
