package com.wind.site.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

/**
 * B2C 商城
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_mall")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.CHAR)
@DiscriminatorValue("B")
public class B2CMall implements Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * 新淘网标识
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	/**
	 * 商城外部标识
	 */
	private String b2cId;
	/**
	 * 商城名称
	 */
	private String title;
	/**
	 * 分类标识（新淘网）
	 */
	private Long cid;
	/**
	 * 商城LOGO
	 */
	private String logo;
	/**
	 * 商城地址
	 */
	private String url;

	/**
	 * 是否支持返利
	 */
	private Boolean isFanLi;
	/**
	 * 排序方式
	 */
	private Integer sortOrder;
	/**
	 * 佣金比率
	 */
	private String commissionRate;
	/**
	 * 最高比率
	 */
	private String topRate;
	/**
	 * 所属广告联盟
	 */
	@Column(insertable = false, updatable = false)
	private String type;
	/**
	 * 广告类型（CPS，CPA，CPC）
	 */
	private String adType;
	/**
	 * 开始时间
	 */
	private Date startDate;
	/**
	 * 结束时间
	 */
	private Date endDate;
	/**
	 * 审核方式（auto，manual，neddless）
	 */
	private String audit;
	/**
	 * 是否有效
	 */
	private Boolean isValid = true;

	public void setAudit(String audit) {
		this.audit = audit;
	}

	public String getAudit() {
		return audit;
	}

	/**
	 * @return the startDate
	 */
	public Date getStartDate() {
		return startDate;
	}

	/**
	 * @param startDate
	 *            the startDate to set
	 */
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	/**
	 * @return the endDate
	 */
	public Date getEndDate() {
		return endDate;
	}

	/**
	 * @param endDate
	 *            the endDate to set
	 */
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
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
	 * @return the b2cId
	 */
	public String getB2cId() {
		return b2cId;
	}

	/**
	 * @param b2cId
	 *            the b2cId to set
	 */
	public void setB2cId(String b2cId) {
		this.b2cId = b2cId;
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
	 * @return the cid
	 */
	public Long getCid() {
		return cid;
	}

	/**
	 * @param cid
	 *            the cid to set
	 */
	public void setCid(Long cid) {
		this.cid = cid;
	}

	/**
	 * @return the logo
	 */
	public String getLogo() {
		return logo;
	}

	/**
	 * @param logo
	 *            the logo to set
	 */
	public void setLogo(String logo) {
		this.logo = logo;
	}

	/**
	 * @return the commissionRate
	 */
	public String getCommissionRate() {
		return commissionRate;
	}

	/**
	 * @param commissionRate
	 *            the commissionRate to set
	 */
	public void setCommissionRate(String commissionRate) {
		this.commissionRate = commissionRate;
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

	public void setAdType(String adType) {
		this.adType = adType;
	}

	public String getAdType() {
		return adType;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUrl() {
		return url;
	}

	public void setIsFanLi(Boolean isFanLi) {
		this.isFanLi = isFanLi;
	}

	public Boolean getIsFanLi() {
		return isFanLi;
	}

	public void setSortOrder(Integer sortOrder) {
		this.sortOrder = sortOrder;
	}

	public Integer getSortOrder() {
		return sortOrder;
	}

	public void setTopRate(String topRate) {
		this.topRate = topRate;
	}

	public String getTopRate() {
		return topRate;
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

}
