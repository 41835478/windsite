package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 积分兑换历史记录
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_credits_log")
public class CreditsLog extends Log {

	private static final long serialVersionUID = 1L;

	private Integer c_num;
	private Integer c_credits;
	private String c_type;
	private Boolean isSuccess;

	/**
	 * @return the c_type
	 */
	public String getC_type() {
		return c_type;
	}

	/**
	 * @param cType
	 *            the c_type to set
	 */
	public void setC_type(String cType) {
		c_type = cType;
	}

	/**
	 * @return the c_num
	 */
	public Integer getC_num() {
		return c_num;
	}

	/**
	 * @param cNum
	 *            the c_num to set
	 */
	public void setC_num(Integer cNum) {
		c_num = cNum;
	}

	/**
	 * @return the c_credits
	 */
	public Integer getC_credits() {
		return c_credits;
	}

	/**
	 * @param cCredits
	 *            the c_credits to set
	 */
	public void setC_credits(Integer cCredits) {
		c_credits = cCredits;
	}

	public void setIsSuccess(Boolean isSuccess) {
		this.isSuccess = isSuccess;
	}

	public Boolean getIsSuccess() {
		return isSuccess;
	}

}
