package com.wind.uc.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * UCHome好友
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "uchome_friend")
public class UCFriend implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	private UCFriendPK id;

	private String fusername;

	private Boolean status;

	private Integer gid;

	private Integer num;

	private Integer dateline;

	/**
	 * @return the id
	 */
	public UCFriendPK getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(UCFriendPK id) {
		this.id = id;
	}

	/**
	 * @return the fusername
	 */
	public String getFusername() {
		return fusername;
	}

	/**
	 * @param fusername
	 *            the fusername to set
	 */
	public void setFusername(String fusername) {
		this.fusername = fusername;
	}

	/**
	 * @return the status
	 */
	public Boolean getStatus() {
		return status;
	}

	/**
	 * @param status
	 *            the status to set
	 */
	public void setStatus(Boolean status) {
		this.status = status;
	}

	/**
	 * @return the gid
	 */
	public Integer getGid() {
		return gid;
	}

	/**
	 * @param gid
	 *            the gid to set
	 */
	public void setGid(Integer gid) {
		this.gid = gid;
	}

	/**
	 * @return the num
	 */
	public Integer getNum() {
		return num;
	}

	/**
	 * @param num
	 *            the num to set
	 */
	public void setNum(Integer num) {
		this.num = num;
	}

	/**
	 * @return the dateline
	 */
	public Integer getDateline() {
		return dateline;
	}

	/**
	 * @param dateline
	 *            the dateline to set
	 */
	public void setDateline(Integer dateline) {
		this.dateline = dateline;
	}

}
