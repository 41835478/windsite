package com.wind.site.yiqifa;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wind.core.exception.SystemException;

/**
 * 亿起发接口2请求
 * 
 * @author fxy
 * 
 */
public class YiqifaRequest {
	private String st;// ： 开始日期参数，格式YYYY-MM-DD； (下单日期)
	private String ed;// ： 结束日期参数，格式YYYY-MM-DD； (下单日期)
	private String action_id;// ： 活动编号；(该值在亿起发平台里查看,或联系商务人员咨询)
	private String order_no;// ： 订单编号；
	private String sid;// ： 网站主id；
	private String wid;// ： 网站主的网站编号；
	private String status;// ： 订单状态（R=未确认；A=成功订单；F=无效订单）；
	private String username;// 用户名 (该值为登陆亿起发平台用户名,如不清楚联系商务人员咨询)
	private String privatekey;// 站长注册同步数据接口注册时填的私有密钥
	/**
	 * 新淘网用户ID
	 */
	private String user_id;
	/**
	 * 新淘网用户昵称
	 */
	private String user_name;
	/**
	 * 新淘网站点ID
	 */
	private String site_id;

	/**
	 * @return the st
	 */
	public String getSt() {
		return st;
	}

	/**
	 * @param st
	 *            the st to set
	 */
	public void setSt(String st) {
		this.st = st;
	}

	/**
	 * @return the ed
	 */
	public String getEd() {
		return ed;
	}

	/**
	 * @param ed
	 *            the ed to set
	 */
	public void setEd(String ed) {
		this.ed = ed;
	}

	/**
	 * @return the action_id
	 */
	public String getAction_id() {
		return action_id;
	}

	/**
	 * @param actionId
	 *            the action_id to set
	 */
	public void setAction_id(String actionId) {
		action_id = actionId;
	}

	/**
	 * @return the order_no
	 */
	public String getOrder_no() {
		return order_no;
	}

	/**
	 * @param orderNo
	 *            the order_no to set
	 */
	public void setOrder_no(String orderNo) {
		order_no = orderNo;
	}

	/**
	 * @return the sid
	 */
	public String getSid() {
		return sid;
	}

	/**
	 * @param sid
	 *            the sid to set
	 */
	public void setSid(String sid) {
		this.sid = sid;
	}

	/**
	 * @return the wid
	 */
	public String getWid() {
		return wid;
	}

	/**
	 * @param wid
	 *            the wid to set
	 */
	public void setWid(String wid) {
		this.wid = wid;
	}

	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * @param status
	 *            the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * @param username
	 *            the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * @return the privatekey
	 */
	public String getPrivatekey() {
		return privatekey;
	}

	/**
	 * @param privatekey
	 *            the privatekey to set
	 */
	public void setPrivatekey(String privatekey) {
		this.privatekey = privatekey;
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
	 * @return the user_name
	 */
	public String getUser_name() {
		return user_name;
	}

	/**
	 * @param userName
	 *            the user_name to set
	 */
	public void setUser_name(String userName) {
		user_name = userName;
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

	public String toUrlParams() {
		String params = "";
		if (StringUtils.isEmpty(user_id) || StringUtils.isEmpty(site_id)) {
			SystemException
					.handleMessageException("user_id,site_id can't be null");
		}
		if (StringUtils.isEmpty(username) || StringUtils.isEmpty(wid)
				|| StringUtils.isEmpty(privatekey)) {
			SystemException
					.handleMessageException("username,wid,privatekey can't be null");
		}
		params = "username=" + username + "&wid=" + wid + "&privatekey="
				+ privatekey;
		if (StringUtils.isNotEmpty(st)) {
			params += "&st=" + st;
		}
		if (StringUtils.isNotEmpty(ed)) {
			params += "&ed=" + ed;
		}
		if (StringUtils.isNotEmpty(action_id)) {
			params += "&action_id=" + action_id;
		}
		if (StringUtils.isNotEmpty(order_no)) {
			params += "&order_no=" + order_no;
		}
		if (StringUtils.isNotEmpty(sid)) {
			params += "&sid=" + sid;
		}
		if (StringUtils.isNotEmpty(status)) {
			params += "&status=" + status;
		}
		return params;
	}

	@Override
	public String toString() {
		return new Gson().toJson(this, new TypeToken<YiqifaRequest>() {
		}.getType());
	}

}
