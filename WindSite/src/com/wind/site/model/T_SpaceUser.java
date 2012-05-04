package com.wind.site.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * 淘江湖用户信息
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "t_spaceuser")
public class T_SpaceUser extends TimestampModel {

	private static final long serialVersionUID = -3774446677930644860L;
	
	private String uid;

	private String nick;

	private String realName;

	private String sex;

	private String constellation;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "favorite_id")
	private T_Favorite favorite;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "icon_id")
	private T_Icon icon;

	/**
	 * @return the uid
	 */
	public String getUid() {
		return uid;
	}

	/**
	 * @param uid
	 *            the uid to set
	 */
	public void setUid(String uid) {
		this.uid = uid;
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
	 * @return the realName
	 */
	public String getRealName() {
		return realName;
	}

	/**
	 * @param realName
	 *            the realName to set
	 */
	public void setRealName(String realName) {
		this.realName = realName;
	}

	/**
	 * @return the sex
	 */
	public String getSex() {
		return sex;
	}

	/**
	 * @param sex
	 *            the sex to set
	 */
	public void setSex(String sex) {
		this.sex = sex;
	}

	/**
	 * @return the constellation
	 */
	public String getConstellation() {
		return constellation;
	}

	/**
	 * @param constellation
	 *            the constellation to set
	 */
	public void setConstellation(String constellation) {
		this.constellation = constellation;
	}

	/**
	 * @return the favorite
	 */
	public T_Favorite getFavorite() {
		return favorite;
	}

	/**
	 * @param favorite
	 *            the favorite to set
	 */
	public void setFavorite(T_Favorite favorite) {
		this.favorite = favorite;
	}

	/**
	 * @return the icon
	 */
	public T_Icon getIcon() {
		return icon;
	}

	/**
	 * @param icon
	 *            the icon to set
	 */
	public void setIcon(T_Icon icon) {
		this.icon = icon;
	}

}
