package com.wind.site.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * 会员(买家)
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_fanli_member")
public class Member implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long Id;

	/**
	 * 基本信息
	 */
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "info_id")
	private MemberInfo info;
	/**
	 * 推荐人ID
	 */
	private Long parentId;
	/**
	 * 推荐人用户名
	 */
	private String parentUserName;
	/**
	 * 推荐人数
	 */
	private Integer nums;

	/**
	 * 注册时间
	 */
	private Date created;
	/**
	 * 上次登录时间
	 */
	private Date lastVisit;
	/**
	 * 登录次数
	 */
	private Integer visits;

	/**
	 * 0：自助注册
	 */
	private Integer type;
	/**
	 * 所属站点
	 */
	private String site_id;
	/**
	 * 所属站长ID
	 */
	private String user_id;
	/**
	 * 所属站长昵称
	 */
	private String nick;
	/**
	 * 返利比例
	 */
	private Integer commissionRate;
	/**
	 * 推广比例
	 */
	private Integer adCommissionRate;
	/**
	 * 是否在线
	 */
	private Boolean isOnline;
	/**
	 * 帐号已结算金额
	 */
	private String money;

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
	 * @return the commissionRate
	 */
	public Integer getCommissionRate() {
		return commissionRate;
	}

	/**
	 * @param commissionRate
	 *            the commissionRate to set
	 */
	public void setCommissionRate(Integer commissionRate) {
		this.commissionRate = commissionRate;
	}

	/**
	 * @return the adCommissionRate
	 */
	public Integer getAdCommissionRate() {
		return adCommissionRate;
	}

	/**
	 * @param adCommissionRate
	 *            the adCommissionRate to set
	 */
	public void setAdCommissionRate(Integer adCommissionRate) {
		this.adCommissionRate = adCommissionRate;
	}

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
	 * @return the parentId
	 */
	public Long getParentId() {
		return parentId;
	}

	/**
	 * @param parentId
	 *            the parentId to set
	 */
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	/**
	 * @return the parentUserName
	 */
	public String getParentUserName() {
		return parentUserName;
	}

	/**
	 * @param parentUserName
	 *            the parentUserName to set
	 */
	public void setParentUserName(String parentUserName) {
		this.parentUserName = parentUserName;
	}

	/**
	 * @return the created
	 */
	public Date getCreated() {
		return created;
	}

	/**
	 * @param created
	 *            the created to set
	 */
	public void setCreated(Date created) {
		this.created = created;
	}

	/**
	 * @return the lastVisit
	 */
	public Date getLastVisit() {
		return lastVisit;
	}

	/**
	 * @param lastVisit
	 *            the lastVisit to set
	 */
	public void setLastVisit(Date lastVisit) {
		this.lastVisit = lastVisit;
	}

	/**
	 * @return the visits
	 */
	public Integer getVisits() {
		return visits;
	}

	/**
	 * @param visits
	 *            the visits to set
	 */
	public void setVisits(Integer visits) {
		this.visits = visits;
	}

	/**
	 * @return the type
	 */
	public Integer getType() {
		return type;
	}

	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(Integer type) {
		this.type = type;
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
	 * @return the nick
	 */
	public String getNick() {
		return nick;
	}

	/**
	 * @param nick
	 *            the nick to set
	 */
	public void setNick(String nick) {
		this.nick = nick;
	}

	public void setNums(Integer nums) {
		this.nums = nums;
	}

	public Integer getNums() {
		return nums;
	}

	public void setIsOnline(Boolean isOnline) {
		this.isOnline = isOnline;
	}

	public Boolean getIsOnline() {
		return isOnline;
	}

	public void setMoney(String money) {
		this.money = money;
	}

	public String getMoney() {
		return money;
	}

	public void setInfo(MemberInfo info) {
		this.info = info;
	}

	public MemberInfo getInfo() {
		return info;
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

}
