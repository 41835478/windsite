package com.wind.site.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
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
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * 返利记录
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_fanli_trade")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("T")
public class FanliTrade implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	/**
	 * 淘宝详细报表
	 */
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "trade_id", referencedColumnName = "id")
	private T_TaobaokeReportMember report;
	/**
	 * 亿起发详细报表
	 */
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "yiqifa_id")
	private YiqifaReport yiqifa;
	/**
	 * 返利人
	 */
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "member_id")
	private Member flMember;
	/**
	 * 返利金额
	 */
	private String commission;
	/**
	 * 状态:0-等待站长支付返利，1-等待会员确认收款，2-已完成支付返利
	 */
	private Integer status;
	/**
	 * 状态改变时间
	 */
	private Date statusDate;
	/**
	 * 返利类型：BUY-购买返利，ADS-推广返利
	 */
	@Column(insertable = false, updatable = false)
	private String type;
	/**
	 * 站点ID
	 */
	private String site_id;
	/**
	 * 站长ID
	 */
	private String user_id;

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
	 * @return the report
	 */
	public T_TaobaokeReportMember getReport() {
		return report;
	}

	/**
	 * @param report
	 *            the report to set
	 */
	public void setReport(T_TaobaokeReportMember report) {
		this.report = report;
	}

	/**
	 * @return the flMember
	 */
	public Member getFlMember() {
		return flMember;
	}

	/**
	 * @param flMember
	 *            the flMember to set
	 */
	public void setFlMember(Member flMember) {
		this.flMember = flMember;
	}

	/**
	 * @return the status
	 */
	public Integer getStatus() {
		return status;
	}

	/**
	 * @param status
	 *            the status to set
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}

	/**
	 * @return the statusDate
	 */
	public Date getStatusDate() {
		return statusDate;
	}

	/**
	 * @param statusDate
	 *            the statusDate to set
	 */
	public void setStatusDate(Date statusDate) {
		this.statusDate = statusDate;
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

	public void setCommission(String commission) {
		this.commission = commission;
	}

	public String getCommission() {
		return commission;
	}

	public void setYiqifa(YiqifaReport yiqifa) {
		this.yiqifa = yiqifa;
	}

	public YiqifaReport getYiqifa() {
		return yiqifa;
	}

}
