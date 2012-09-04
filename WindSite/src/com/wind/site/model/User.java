package com.wind.site.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.apache.commons.lang.StringUtils;

/**
 * 用户数据结构
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_user")
public class User extends TimestampModel {

	private static final long serialVersionUID = -2345968680869866335L;
	/**
	 * 用户ID
	 */
	@Column(updatable = false)
	private String user_id;
	/**
	 * UC用户标识
	 */
	private Integer uc_id;
	/**
	 * 用户昵称
	 */
	private String nick;
	/**
	 * 应用类型(目前0：月租型，1：分成型)
	 */
	private String appType;
	/**
	 * 淘宝TOP对应的pid
	 */
	private String pid;

	private Long pSiteId;

	private Long pAdId;
	@Transient
	private String pPid;

	public String getpPid() {
		if (StringUtils.isNotEmpty(pid)) {
			if (pSiteId != null && pAdId != null) {
				return pid.replace("_0_0", "") + "_" + pSiteId + "_" + pAdId;
			}
			return pid;
		}
		return "";
	}

	public void setpPid(String pPid) {
		this.pPid = pPid;
	}

	/**
	 * 论坛密码
	 */
	private String password;
	/**
	 * 应用版本
	 */
	@Transient
	private T_UserSubscribe usb;
	@Transient
	private String app;
	@Transient
	private Date endDate;

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	/**
	 * 淘宝SESSION
	 */
	private String tSession;

	private Date expired;
	@Transient
	private Date expiredDate;
	/**
	 * 是否是组件设计师
	 */
	private Boolean isWidgetDesigner = false;
	/**
	 * 邮箱
	 */

	private String email;
	/**
	 * 上次访问时间
	 */
	private Date last_visit;
	/**
	 * 访问次数
	 */
	private Integer visits;
	/**
	 * 是否自动部署
	 */
	private Boolean isAutoDeploy = false;
	/**
	 * 是否是新用户
	 */
	@Transient
	private Boolean isNew = false;
	@Transient
	private Limit limit;
	/**
	 * 是否在线
	 */
	private Boolean isOnline = false;
	/**
	 * 用户角色
	 */
	private String role = "user";

	/**
	 * 站点集合
	 */
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", referencedColumnName = "user_id")
	private List<Site> sites;
	/**
	 * 淘江湖好友集合
	 */
	// @Transient
	// private List<com.taobao.api.jianghu.pojo.profile.SpaceUser> friends;
	/**
	 * 推广组集合
	 */
	@Transient
	private List<ItemGroup> groups;
	/**
	 * 店铺ID
	 */
	private String sid;

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
	 * @return the last_visit
	 */
	public Date getLast_visit() {
		return last_visit;
	}

	/**
	 * @param lastVisit
	 *            the last_visit to set
	 */
	public void setLast_visit(Date lastVisit) {
		last_visit = lastVisit;
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
	 * @return the sites
	 */
	public List<Site> getSites() {
		return sites;
	}

	/**
	 * @param sites
	 *            the sites to set
	 */
	public void setSites(List<Site> sites) {
		this.sites = sites;
	}

	/**
	 * @return the groups
	 */
	public List<ItemGroup> getGroups() {
		return groups;
	}

	/**
	 * @param groups
	 *            the groups to set
	 */
	public void setGroups(List<ItemGroup> groups) {
		this.groups = groups;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (this == obj)
			return true;
		if (!(obj instanceof User))
			return false;
		User user = (User) obj;
		return user.getUser_id().equals(this.getUser_id());
	}

	@Override
	public int hashCode() {
		if (StringUtils.isNotEmpty(this.getUser_id()))
			return this.getUser_id().hashCode();
		else
			return super.hashCode();
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getRole() {
		return role;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getPid() {
		return pid;
	}

	/**
	 * 性别可选值:m(男),f(女)
	 */
	private String sex;
	/**
	 * 所在城市
	 */
	private String city;
	/**
	 * 买家信用
	 */
	// @OneToOne(cascade = CascadeType.ALL)
	// @JoinColumn(name = "bc_id")
	@Transient
	private T_UserCredit buyer_credit;
	/**
	 * 卖家信用
	 */
	// @OneToOne(cascade = CascadeType.ALL)
	// @JoinColumn(name = "sc_id")
	@Transient
	private T_UserCredit seller_credit;
	/**
	 * N 用户注册时间。格式:yyyy-MM-dd HH:mm:ss
	 */
	private Date t_created;
	/**
	 * N 最近登陆时间。格式:yyyy-MM-dd HH:mm:ss
	 */
	private Date t_last_visit;
	/**
	 * Y 生日
	 */
	private Date birthday;
	/**
	 * Y 用户类型。可选值:B(B商家),C(C商家)
	 */
	private String t_type;
	/**
	 * Y 是否购买多图服务。可选值:true(是),false(否)
	 */
	private Boolean has_more_pic;
	/**
	 * Y 可上传商品图片数量
	 */
	private Integer item_img_num;
	/**
	 * Y 单张商品图片最大容量。单位:k
	 */
	private Integer item_img_size;
	/**
	 * Y 可上传属性图片数量
	 */
	private Integer prop_img_num;
	/**
	 * Y 单张销售属性图片最大容量。单位:k
	 */
	private Integer prop_img_size;
	/**
	 * Y 是否受限制。可选值:limited(受限制),unlimited(不受限)
	 */
	private String auto_repost;
	/**
	 * Y 有无实名认证。可选值:authentication(实名认证),not authentication(没有认证)
	 */
	private String promoted_type;
	/**
	 * Y 状态。可选值:normal(正常),inactive(未激活),delete(删除),reeze(冻结),supervise(监管)
	 */
	private String t_status;
	/**
	 * Y 有无绑定。可选值:bind(绑定),notbind(未绑定)
	 */
	private String alipay_bind;
	/**
	 * Y 是否参加消保
	 */
	private Boolean consumer_protection;
	/**
	 * Y 支付宝账户
	 */
	private String alipay_account;
	/**
	 * Y 支付宝ID
	 */
	private String alipay_no;

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getSex() {
		return sex;
	}

	public void setSeller_credit(T_UserCredit seller_credit) {
		this.seller_credit = seller_credit;
	}

	public T_UserCredit getSeller_credit() {
		return seller_credit;
	}

	public void setBuyer_credit(T_UserCredit buyer_credit) {
		this.buyer_credit = buyer_credit;
	}

	public T_UserCredit getBuyer_credit() {
		return buyer_credit;
	}

	/**
	 * @return the t_created
	 */
	public Date getT_created() {
		return t_created;
	}

	/**
	 * @param tCreated
	 *            the t_created to set
	 */
	public void setT_created(Date tCreated) {
		t_created = tCreated;
	}

	/**
	 * @return the t_last_visit
	 */
	public Date getT_last_visit() {
		return t_last_visit;
	}

	/**
	 * @param tLastVisit
	 *            the t_last_visit to set
	 */
	public void setT_last_visit(Date tLastVisit) {
		t_last_visit = tLastVisit;
	}

	/**
	 * @return the birthday
	 */
	public Date getBirthday() {
		return birthday;
	}

	/**
	 * @param birthday
	 *            the birthday to set
	 */
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	/**
	 * @return the t_type
	 */
	public String getT_type() {
		return t_type;
	}

	/**
	 * @param tType
	 *            the t_type to set
	 */
	public void setT_type(String tType) {
		t_type = tType;
	}

	/**
	 * @return the has_more_pic
	 */
	public Boolean getHas_more_pic() {
		return has_more_pic;
	}

	/**
	 * @param hasMorePic
	 *            the has_more_pic to set
	 */
	public void setHas_more_pic(Boolean hasMorePic) {
		has_more_pic = hasMorePic;
	}

	/**
	 * @return the item_img_num
	 */
	public Integer getItem_img_num() {
		return item_img_num;
	}

	/**
	 * @param itemImgNum
	 *            the item_img_num to set
	 */
	public void setItem_img_num(Integer itemImgNum) {
		item_img_num = itemImgNum;
	}

	/**
	 * @return the item_img_size
	 */
	public Integer getItem_img_size() {
		return item_img_size;
	}

	/**
	 * @param itemImgSize
	 *            the item_img_size to set
	 */
	public void setItem_img_size(Integer itemImgSize) {
		item_img_size = itemImgSize;
	}

	/**
	 * @return the prop_img_num
	 */
	public Integer getProp_img_num() {
		return prop_img_num;
	}

	/**
	 * @param propImgNum
	 *            the prop_img_num to set
	 */
	public void setProp_img_num(Integer propImgNum) {
		prop_img_num = propImgNum;
	}

	/**
	 * @return the prop_img_size
	 */
	public Integer getProp_img_size() {
		return prop_img_size;
	}

	/**
	 * @param propImgSize
	 *            the prop_img_size to set
	 */
	public void setProp_img_size(Integer propImgSize) {
		prop_img_size = propImgSize;
	}

	/**
	 * @return the auto_repost
	 */
	public String getAuto_repost() {
		return auto_repost;
	}

	/**
	 * @param autoRepost
	 *            the auto_repost to set
	 */
	public void setAuto_repost(String autoRepost) {
		auto_repost = autoRepost;
	}

	/**
	 * @return the promoted_type
	 */
	public String getPromoted_type() {
		return promoted_type;
	}

	/**
	 * @param promotedType
	 *            the promoted_type to set
	 */
	public void setPromoted_type(String promotedType) {
		promoted_type = promotedType;
	}

	/**
	 * @return the t_status
	 */
	public String getT_status() {
		return t_status;
	}

	/**
	 * @param tStatus
	 *            the t_status to set
	 */
	public void setT_status(String tStatus) {
		t_status = tStatus;
	}

	/**
	 * @return the alipay_bind
	 */
	public String getAlipay_bind() {
		return alipay_bind;
	}

	/**
	 * @param alipayBind
	 *            the alipay_bind to set
	 */
	public void setAlipay_bind(String alipayBind) {
		alipay_bind = alipayBind;
	}

	/**
	 * @return the consumer_protection
	 */
	public Boolean getConsumer_protection() {
		return consumer_protection;
	}

	/**
	 * @param consumerProtection
	 *            the consumer_protection to set
	 */
	public void setConsumer_protection(Boolean consumerProtection) {
		consumer_protection = consumerProtection;
	}

	/**
	 * @return the alipay_account
	 */
	public String getAlipay_account() {
		return alipay_account;
	}

	/**
	 * @param alipayAccount
	 *            the alipay_account to set
	 */
	public void setAlipay_account(String alipayAccount) {
		alipay_account = alipayAccount;
	}

	/**
	 * @return the alipay_no
	 */
	public String getAlipay_no() {
		return alipay_no;
	}

	/**
	 * @param alipayNo
	 *            the alipay_no to set
	 */
	public void setAlipay_no(String alipayNo) {
		alipay_no = alipayNo;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCity() {
		return city;
	}

	public void setIsNew(Boolean isNew) {
		this.isNew = isNew;
	}

	public Boolean getIsNew() {
		return isNew;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPassword() {
		return password;
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

	public void setIsOnline(Boolean isOnline) {
		this.isOnline = isOnline;
	}

	public Boolean getIsOnline() {
		return isOnline;
	}

	public void setLimit(Limit limit) {
		this.limit = limit;
	}

	public Limit getLimit() {
		return limit;
	}

	/**
	 * @return the isAutoDeploy
	 */
	public Boolean getIsAutoDeploy() {
		return isAutoDeploy;
	}

	/**
	 * @param isAutoDeploy
	 *            the isAutoDeploy to set
	 */
	public void setIsAutoDeploy(Boolean isAutoDeploy) {
		this.isAutoDeploy = isAutoDeploy;
	}

	public void setSid(String sid) {
		this.sid = sid;
	}

	public String getSid() {
		return sid;
	}

	public void setIsWidgetDesigner(Boolean isWidgetDesigner) {
		this.isWidgetDesigner = isWidgetDesigner;
	}

	public Boolean getIsWidgetDesigner() {
		return isWidgetDesigner;
	}

	public void setUsb(T_UserSubscribe usb) {
		this.usb = usb;
	}

	public T_UserSubscribe getUsb() {
		return usb;
	}

	public void settSession(String tSession) {
		this.tSession = tSession;
	}

	public String gettSession() {
		return tSession;
	}

	public void setAppType(String appType) {
		this.appType = appType;
	}

	public String getAppType() {
		return appType;
	}

	public void setApp(String app) {
		this.app = app;
	}

	public String getApp() {
		return app;
	}

	public void setExpired(Date expired) {
		this.expired = expired;
	}

	public Date getExpired() {
		return expired;
	}

	public void setExpiredDate(Date expiredDate) {
		this.expiredDate = expiredDate;
	}

	public Date getExpiredDate() {
		return expiredDate;
	}

	public Long getpSiteId() {
		return pSiteId;
	}

	public void setpSiteId(Long pSiteId) {
		this.pSiteId = pSiteId;
	}

	public Long getpAdId() {
		return pAdId;
	}

	public void setpAdId(Long pAdId) {
		this.pAdId = pAdId;
	}

}
