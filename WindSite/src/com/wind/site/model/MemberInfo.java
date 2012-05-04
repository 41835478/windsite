package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 返利会员信息
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_fanli_member_info")
public class MemberInfo implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long Id;
	/**
	 * 用户名
	 */
	private String username;
	/**
	 * 密码
	 */
	private String pwd;

	private String sina_uid;

	private String sina_nick;

	private String sina_token;

	private String sina_secret;

	private String qq_uid;

	private String qq_nick;

	private String qq_token;

	private String qq_secret;

	private String taobao_uid;

	private String taobao_nick;

	private String taobao_token;

	private String taobao_secret;

	/**
	 * 邮箱
	 */
	private String email;

	/**
	 * QQ号
	 */
	private String qq;
	/**
	 * MSN
	 */
	private String msn;
	/**
	 * 旺旺
	 */
	private String wangwang;
	/**
	 * 手机号
	 */
	private String mobile;
	/**
	 * 支付宝
	 */
	private String alipay;
	/**
	 * 支付名称
	 */
	private String alipayName;
	/**
	 * 返利社区标识
	 */
	private Integer uc_id;

	/**
	 * @return the id
	 */
	public Long getId() {
		return Id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(Long id) {
		Id = id;
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
	 * @return the pwd
	 */
	public String getPwd() {
		return pwd;
	}

	/**
	 * @param pwd
	 *            the pwd to set
	 */
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * @param email
	 *            the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * @return the qq
	 */
	public String getQq() {
		return qq;
	}

	/**
	 * @param qq
	 *            the qq to set
	 */
	public void setQq(String qq) {
		this.qq = qq;
	}

	/**
	 * @return the msn
	 */
	public String getMsn() {
		return msn;
	}

	/**
	 * @param msn
	 *            the msn to set
	 */
	public void setMsn(String msn) {
		this.msn = msn;
	}

	/**
	 * @return the wangwang
	 */
	public String getWangwang() {
		return wangwang;
	}

	/**
	 * @param wangwang
	 *            the wangwang to set
	 */
	public void setWangwang(String wangwang) {
		this.wangwang = wangwang;
	}

	/**
	 * @return the alipay
	 */
	public String getAlipay() {
		return alipay;
	}

	/**
	 * @param alipay
	 *            the alipay to set
	 */
	public void setAlipay(String alipay) {
		this.alipay = alipay;
	}

	/**
	 * @return the uc_id
	 */
	public Integer getUc_id() {
		return uc_id;
	}

	/**
	 * @param ucId
	 *            the uc_id to set
	 */
	public void setUc_id(Integer ucId) {
		uc_id = ucId;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getMobile() {
		return mobile;
	}

	/**
	 * @return the sina_uid
	 */
	public String getSina_uid() {
		return sina_uid;
	}

	/**
	 * @param sinaUid
	 *            the sina_uid to set
	 */
	public void setSina_uid(String sinaUid) {
		sina_uid = sinaUid;
	}

	/**
	 * @return the sina_nick
	 */
	public String getSina_nick() {
		return sina_nick;
	}

	/**
	 * @param sinaNick
	 *            the sina_nick to set
	 */
	public void setSina_nick(String sinaNick) {
		sina_nick = sinaNick;
	}

	/**
	 * @return the sina_token
	 */
	public String getSina_token() {
		return sina_token;
	}

	/**
	 * @param sinaToken
	 *            the sina_token to set
	 */
	public void setSina_token(String sinaToken) {
		sina_token = sinaToken;
	}

	/**
	 * @return the sina_secret
	 */
	public String getSina_secret() {
		return sina_secret;
	}

	/**
	 * @param sinaSecret
	 *            the sina_secret to set
	 */
	public void setSina_secret(String sinaSecret) {
		sina_secret = sinaSecret;
	}

	/**
	 * @return the qq_uid
	 */
	public String getQq_uid() {
		return qq_uid;
	}

	/**
	 * @param qqUid
	 *            the qq_uid to set
	 */
	public void setQq_uid(String qqUid) {
		qq_uid = qqUid;
	}

	/**
	 * @return the qq_nick
	 */
	public String getQq_nick() {
		return qq_nick;
	}

	/**
	 * @param qqNick
	 *            the qq_nick to set
	 */
	public void setQq_nick(String qqNick) {
		qq_nick = qqNick;
	}

	/**
	 * @return the qq_token
	 */
	public String getQq_token() {
		return qq_token;
	}

	/**
	 * @param qqToken
	 *            the qq_token to set
	 */
	public void setQq_token(String qqToken) {
		qq_token = qqToken;
	}

	/**
	 * @return the qq_secret
	 */
	public String getQq_secret() {
		return qq_secret;
	}

	/**
	 * @param qqSecret
	 *            the qq_secret to set
	 */
	public void setQq_secret(String qqSecret) {
		qq_secret = qqSecret;
	}

	/**
	 * @return the taobao_uid
	 */
	public String getTaobao_uid() {
		return taobao_uid;
	}

	/**
	 * @param taobaoUid
	 *            the taobao_uid to set
	 */
	public void setTaobao_uid(String taobaoUid) {
		taobao_uid = taobaoUid;
	}

	/**
	 * @return the taobao_nick
	 */
	public String getTaobao_nick() {
		return taobao_nick;
	}

	/**
	 * @param taobaoNick
	 *            the taobao_nick to set
	 */
	public void setTaobao_nick(String taobaoNick) {
		taobao_nick = taobaoNick;
	}

	/**
	 * @return the taobao_token
	 */
	public String getTaobao_token() {
		return taobao_token;
	}

	/**
	 * @param taobaoToken
	 *            the taobao_token to set
	 */
	public void setTaobao_token(String taobaoToken) {
		taobao_token = taobaoToken;
	}

	/**
	 * @return the taobao_secret
	 */
	public String getTaobao_secret() {
		return taobao_secret;
	}

	/**
	 * @param taobaoSecret
	 *            the taobao_secret to set
	 */
	public void setTaobao_secret(String taobaoSecret) {
		taobao_secret = taobaoSecret;
	}

	public void setAlipayName(String alipayName) {
		this.alipayName = alipayName;
	}

	public String getAlipayName() {
		return alipayName;
	}

}
