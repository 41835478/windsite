package com.wind.uc.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * UCHome 日志模型
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "uchome_blog")
public class UCBlog implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	private Integer blogid;
	private Integer topicid;
	private Integer uid;
	private String username;
	private String subject;
	private Integer classid;
	private Integer viewnum;
	private Integer replynum;
	private Integer hot;
	private Integer dateline;
	private String pic;
	private Boolean picflag;
	private Integer friend;
	private Boolean noreply;
	private String password;
	private Integer click_1;
	private Integer click_2;
	private Integer click_3;
	private Integer click_4;
	private Integer click_5;

	/**
	 * @return the blogid
	 */
	public Integer getBlogid() {
		return blogid;
	}

	/**
	 * @param blogid
	 *            the blogid to set
	 */
	public void setBlogid(Integer blogid) {
		this.blogid = blogid;
	}

	/**
	 * @return the topicid
	 */
	public Integer getTopicid() {
		return topicid;
	}

	/**
	 * @param topicid
	 *            the topicid to set
	 */
	public void setTopicid(Integer topicid) {
		this.topicid = topicid;
	}

	/**
	 * @return the uid
	 */
	public Integer getUid() {
		return uid;
	}

	/**
	 * @param uid
	 *            the uid to set
	 */
	public void setUid(Integer uid) {
		this.uid = uid;
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
	 * @return the subject
	 */
	public String getSubject() {
		return subject;
	}

	/**
	 * @param subject
	 *            the subject to set
	 */
	public void setSubject(String subject) {
		this.subject = subject;
	}

	/**
	 * @return the classid
	 */
	public Integer getClassid() {
		return classid;
	}

	/**
	 * @param classid
	 *            the classid to set
	 */
	public void setClassid(Integer classid) {
		this.classid = classid;
	}

	/**
	 * @return the viewnum
	 */
	public Integer getViewnum() {
		return viewnum;
	}

	/**
	 * @param viewnum
	 *            the viewnum to set
	 */
	public void setViewnum(Integer viewnum) {
		this.viewnum = viewnum;
	}

	/**
	 * @return the replynum
	 */
	public Integer getReplynum() {
		return replynum;
	}

	/**
	 * @param replynum
	 *            the replynum to set
	 */
	public void setReplynum(Integer replynum) {
		this.replynum = replynum;
	}

	/**
	 * @return the hot
	 */
	public Integer getHot() {
		return hot;
	}

	/**
	 * @param hot
	 *            the hot to set
	 */
	public void setHot(Integer hot) {
		this.hot = hot;
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

	/**
	 * @return the pic
	 */
	public String getPic() {
		return pic;
	}

	/**
	 * @param pic
	 *            the pic to set
	 */
	public void setPic(String pic) {
		this.pic = pic;
	}

	/**
	 * @return the picflag
	 */
	public Boolean getPicflag() {
		return picflag;
	}

	/**
	 * @param picflag
	 *            the picflag to set
	 */
	public void setPicflag(Boolean picflag) {
		this.picflag = picflag;
	}

	/**
	 * @return the friend
	 */
	public Integer getFriend() {
		return friend;
	}

	/**
	 * @param friend
	 *            the friend to set
	 */
	public void setFriend(Integer friend) {
		this.friend = friend;
	}

	/**
	 * @return the noreply
	 */
	public Boolean getNoreply() {
		return noreply;
	}

	/**
	 * @param noreply
	 *            the noreply to set
	 */
	public void setNoreply(Boolean noreply) {
		this.noreply = noreply;
	}

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password
	 *            the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @return the click_1
	 */
	public Integer getClick_1() {
		return click_1;
	}

	/**
	 * @param click_1
	 *            the click_1 to set
	 */
	public void setClick_1(Integer click_1) {
		this.click_1 = click_1;
	}

	/**
	 * @return the click_2
	 */
	public Integer getClick_2() {
		return click_2;
	}

	/**
	 * @param click_2
	 *            the click_2 to set
	 */
	public void setClick_2(Integer click_2) {
		this.click_2 = click_2;
	}

	/**
	 * @return the click_3
	 */
	public Integer getClick_3() {
		return click_3;
	}

	/**
	 * @param click_3
	 *            the click_3 to set
	 */
	public void setClick_3(Integer click_3) {
		this.click_3 = click_3;
	}

	/**
	 * @return the click_4
	 */
	public Integer getClick_4() {
		return click_4;
	}

	/**
	 * @param click_4
	 *            the click_4 to set
	 */
	public void setClick_4(Integer click_4) {
		this.click_4 = click_4;
	}

	/**
	 * @return the click_5
	 */
	public Integer getClick_5() {
		return click_5;
	}

	/**
	 * @param click_5
	 *            the click_5 to set
	 */
	public void setClick_5(Integer click_5) {
		this.click_5 = click_5;
	}
}
