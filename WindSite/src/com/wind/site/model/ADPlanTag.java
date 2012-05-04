package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "w_ad_plantag")
public class ADPlanTag extends TimestampModel {
	private static final long serialVersionUID = 1L;

	private String name;
	private Integer nums;

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the nums
	 */
	public Integer getNums() {
		return nums;
	}

	/**
	 * @param nums
	 *            the nums to set
	 */
	public void setNums(Integer nums) {
		this.nums = nums;
	}

	@Override
	public boolean equals(Object obj) {
		ADPlanTag tag = (ADPlanTag) obj;
		return tag.getName().equals(this.getName());
	}

	@Override
	public int hashCode() {
		return this.getName().hashCode();
	}
}
