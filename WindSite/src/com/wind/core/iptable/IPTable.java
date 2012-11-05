package com.wind.core.iptable;

import java.util.concurrent.CopyOnWriteArrayList;

/**
 * IPTable 安全防火墙
 * 
 * @author
 * 
 */
public class IPTable {
	/**
	 * IP黑名单(如需要屏蔽IP段,则直接使用服务器IPTABLES拒绝)
	 */
	private CopyOnWriteArrayList<String> IP_BLACK = new CopyOnWriteArrayList<String>();

	/**
	 * IP白名单(因白名单一般情况下较短且需判断IP段,所以字符串匹配)
	 */
	private String IP_WHITE = "175.41.19,203.208.60,123.125.71,124.115.0,124.115.1,182.84.210";
	/**
	 * 是否启用过滤
	 */
	private Boolean isFilter = true;
	/**
	 * 默认访问量控制
	 */
	private Long LIMIT = 600L;

	/**
	 * 是否在白名单
	 * 
	 * @return
	 */
	public Boolean isWhite(String ip) {
		return IP_WHITE.indexOf(ip) != -1;// 如果存在则true,否则false
	}

	public Boolean isBlack(String ip) {
		return IP_BLACK.contains(ip);// 如果在黑名单则true,否则false
	}

	/**
	 * 加入黑名单
	 * 
	 * @param ip
	 * @return
	 */
	public CopyOnWriteArrayList<String> addBlack(String ip) {
		IP_BLACK.add(ip);
		return IP_BLACK;
	}

	/**
	 * 加入白名单
	 * 
	 * @param ip
	 * @return
	 */
	public String addWhite(String ip) {
		IP_WHITE += ip + "|";
		return IP_WHITE;
	}

	/**
	 * @return the iP_BLACK
	 */
	public CopyOnWriteArrayList<String> getIP_BLACK() {
		return IP_BLACK;
	}

	/**
	 * @param iPBLACK
	 *            the iP_BLACK to set
	 */
	public void setIP_BLACK(CopyOnWriteArrayList<String> iPBLACK) {
		IP_BLACK = iPBLACK;
	}

	/**
	 * @return the iP_WHITE
	 */
	public String getIP_WHITE() {
		return IP_WHITE;
	}

	/**
	 * @param iPWHITE
	 *            the iP_WHITE to set
	 */
	public void setIP_WHITE(String iPWHITE) {
		IP_WHITE = iPWHITE;
	}

	public void setIsFilter(Boolean isFilter) {
		this.isFilter = isFilter;
	}

	public Boolean getIsFilter() {
		return isFilter;
	}

	public void setLIMIT(Long lIMIT) {
		LIMIT = lIMIT;
	}

	public Long getLIMIT() {
		return LIMIT;
	}

}
