package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 淘宝关键词
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "t_keyword")
public class TaobaoKeyword implements Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * 内部标识
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long kid;
	/**
	 * 淘宝关键词标识
	 */
	private Long id;// : 43519,

	private Long cid;// 所属分类
	/**
	 * 下降
	 */
	private Long idxDownRank;// 176059,
	/**
	 *上升
	 */
	private Long idxUpRateRank;// : 36817,
	private Long idxRankLast;// : 297,
	private Long idx;// : 7624,
	private Long productSellerNum;// : null,
	private String objectName;// : 亲子装,
	private Long idxUpRank;// : 167,
	private Long alipayTradeNumMonth;// : null,
	private Long addedQuantity;// : 1,
	private String type;// : ,

	/**
	 * 关注指数变化幅度
	 */
	private String idxChgRate;// : 0.03292,

	private Long idxRankChg;// : 47,
	private String title;// : ,
	private String thedate;// : 2011-02-17,
	private String objectTitle;// : ,
	/**
	 * 关注度
	 */
	private Long idxRank;// : 250,
	private Long idxLast;// : 7381,
	/**
	 * 
	 */
	private Long idxChg;// : 243,
	private Long idxDownRateRank;// : 139409

	/**
	 * @return the idxDownRank
	 */
	public Long getIdxDownRank() {
		return idxDownRank;
	}

	/**
	 * @param idxDownRank
	 *            the idxDownRank to set
	 */
	public void setIdxDownRank(Long idxDownRank) {
		this.idxDownRank = idxDownRank;
	}

	/**
	 * @return the idxUpRateRank
	 */
	public Long getIdxUpRateRank() {
		return idxUpRateRank;
	}

	/**
	 * @param idxUpRateRank
	 *            the idxUpRateRank to set
	 */
	public void setIdxUpRateRank(Long idxUpRateRank) {
		this.idxUpRateRank = idxUpRateRank;
	}

	/**
	 * @return the idxRankLast
	 */
	public Long getIdxRankLast() {
		return idxRankLast;
	}

	/**
	 * @param idxRankLast
	 *            the idxRankLast to set
	 */
	public void setIdxRankLast(Long idxRankLast) {
		this.idxRankLast = idxRankLast;
	}

	/**
	 * @return the idx
	 */
	public Long getIdx() {
		return idx;
	}

	/**
	 * @param idx
	 *            the idx to set
	 */
	public void setIdx(Long idx) {
		this.idx = idx;
	}

	/**
	 * @return the productSellerNum
	 */
	public Long getProductSellerNum() {
		return productSellerNum;
	}

	/**
	 * @param productSellerNum
	 *            the productSellerNum to set
	 */
	public void setProductSellerNum(Long productSellerNum) {
		this.productSellerNum = productSellerNum;
	}

	/**
	 * @return the objectName
	 */
	public String getObjectName() {
		return objectName;
	}

	/**
	 * @param objectName
	 *            the objectName to set
	 */
	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}

	/**
	 * @return the idxUpRank
	 */
	public Long getIdxUpRank() {
		return idxUpRank;
	}

	/**
	 * @param idxUpRank
	 *            the idxUpRank to set
	 */
	public void setIdxUpRank(Long idxUpRank) {
		this.idxUpRank = idxUpRank;
	}

	/**
	 * @return the alipayTradeNumMonth
	 */
	public Long getAlipayTradeNumMonth() {
		return alipayTradeNumMonth;
	}

	/**
	 * @param alipayTradeNumMonth
	 *            the alipayTradeNumMonth to set
	 */
	public void setAlipayTradeNumMonth(Long alipayTradeNumMonth) {
		this.alipayTradeNumMonth = alipayTradeNumMonth;
	}

	/**
	 * @return the addedQuantity
	 */
	public Long getAddedQuantity() {
		return addedQuantity;
	}

	/**
	 * @param addedQuantity
	 *            the addedQuantity to set
	 */
	public void setAddedQuantity(Long addedQuantity) {
		this.addedQuantity = addedQuantity;
	}

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * @return the idxChgRate
	 */
	public String getIdxChgRate() {
		return idxChgRate;
	}

	/**
	 * @param idxChgRate
	 *            the idxChgRate to set
	 */
	public void setIdxChgRate(String idxChgRate) {
		this.idxChgRate = idxChgRate;
	}

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the idxRankChg
	 */
	public Long getIdxRankChg() {
		return idxRankChg;
	}

	/**
	 * @param idxRankChg
	 *            the idxRankChg to set
	 */
	public void setIdxRankChg(Long idxRankChg) {
		this.idxRankChg = idxRankChg;
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
	 * @return the thedate
	 */
	public String getThedate() {
		return thedate;
	}

	/**
	 * @param thedate
	 *            the thedate to set
	 */
	public void setThedate(String thedate) {
		this.thedate = thedate;
	}

	/**
	 * @return the objectTitle
	 */
	public String getObjectTitle() {
		return objectTitle;
	}

	/**
	 * @param objectTitle
	 *            the objectTitle to set
	 */
	public void setObjectTitle(String objectTitle) {
		this.objectTitle = objectTitle;
	}

	/**
	 * @return the idxRank
	 */
	public Long getIdxRank() {
		return idxRank;
	}

	/**
	 * @param idxRank
	 *            the idxRank to set
	 */
	public void setIdxRank(Long idxRank) {
		this.idxRank = idxRank;
	}

	/**
	 * @return the idxLast
	 */
	public Long getIdxLast() {
		return idxLast;
	}

	/**
	 * @param idxLast
	 *            the idxLast to set
	 */
	public void setIdxLast(Long idxLast) {
		this.idxLast = idxLast;
	}

	/**
	 * @return the idxChg
	 */
	public Long getIdxChg() {
		return idxChg;
	}

	/**
	 * @param idxChg
	 *            the idxChg to set
	 */
	public void setIdxChg(Long idxChg) {
		this.idxChg = idxChg;
	}

	/**
	 * @return the idxDownRateRank
	 */
	public Long getIdxDownRateRank() {
		return idxDownRateRank;
	}

	/**
	 * @param idxDownRateRank
	 *            the idxDownRateRank to set
	 */
	public void setIdxDownRateRank(Long idxDownRateRank) {
		this.idxDownRateRank = idxDownRateRank;
	}

	public void setCid(Long cid) {
		this.cid = cid;
	}

	public Long getCid() {
		return cid;
	}

	public void setKid(Long kid) {
		this.kid = kid;
	}

	public Long getKid() {
		return kid;
	}

}
