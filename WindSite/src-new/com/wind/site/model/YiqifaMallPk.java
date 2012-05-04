package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Embeddable;

@Embeddable
public class YiqifaMallPk implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long user_id;
	private Long mall_id;
	/**
	 * 站长的推广地址
	 */
	private String clickUrl;

	/**
	 * @return the user_id
	 */
	public Long getUser_id() {
		return user_id;
	}

	/**
	 * @param userId
	 *            the user_id to set
	 */
	public void setUser_id(Long userId) {
		user_id = userId;
	}

	/**
	 * @return the mall_id
	 */
	public Long getMall_id() {
		return mall_id;
	}

	/**
	 * @param mallId
	 *            the mall_id to set
	 */
	public void setMall_id(Long mallId) {
		mall_id = mallId;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj instanceof YiqifaMallPk) {
			YiqifaMallPk pk = (YiqifaMallPk) obj;
			if (this.user_id.equals(pk.getUser_id())
					&& this.mall_id.equals(pk.getMall_id())
					&& this.clickUrl.equals(pk.getClickUrl())) {
				return true;
			}
		}
		return false;
	}

	@Override
	public int hashCode() {
		return this.user_id.hashCode() + this.mall_id.hashCode()
				+ this.clickUrl.hashCode();
	}

	public void setClickUrl(String clickUrl) {
		this.clickUrl = clickUrl;
	}

	public String getClickUrl() {
		return clickUrl;
	}
}
