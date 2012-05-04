package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 淘宝信用
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "t_usercredit")
public class T_UserCredit extends TimestampModel {
	private static final long serialVersionUID = 1L;
	/**
	 * 信用等级（是根据score生成的，详见：信用等级）
	 */
	private Integer level;
	/**
	 * 信用总分（“好评”加一分，“中评”不加分，“差评”扣一分。分越高，等级越高）
	 */
	private Integer score;
	/**
	 * 收到的评价总条数。取值范围:大于零的整数
	 */
	private Integer totalNum;
	/**
	 * 收到的好评总条数。取值范围:大于零的整数
	 */
	private Integer goodNum;

	/**
	 * @return the level
	 */
	public Integer getLevel() {
		return level;
	}

	/**
	 * @param level
	 *            the level to set
	 */
	public void setLevel(Integer level) {
		this.level = level;
	}

	/**
	 * @return the score
	 */
	public Integer getScore() {
		return score;
	}

	/**
	 * @param score
	 *            the score to set
	 */
	public void setScore(Integer score) {
		this.score = score;
	}

	/**
	 * @return the totalNum
	 */
	public Integer getTotalNum() {
		return totalNum;
	}

	/**
	 * @param totalNum
	 *            the totalNum to set
	 */
	public void setTotalNum(Integer totalNum) {
		this.totalNum = totalNum;
	}

	/**
	 * @return the goodNum
	 */
	public Integer getGoodNum() {
		return goodNum;
	}

	/**
	 * @param goodNum
	 *            the goodNum to set
	 */
	public void setGoodNum(Integer goodNum) {
		this.goodNum = goodNum;
	}
}
