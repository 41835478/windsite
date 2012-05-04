package com.wind.weibo.model;

import java.io.Serializable;

import javax.persistence.Id;

//@Entity
//@Table(name = "xwb_user_token")
public class UserToken implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	private Integer id;

	private Integer sina_uid;

	private String app_key;

	private String nickname;

	private String access_token;

	private String token_secret;

	private Integer uid;

	/**
	 * @return the id
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * @return the sina_uid
	 */
	public Integer getSina_uid() {
		return sina_uid;
	}

	/**
	 * @param sinaUid
	 *            the sina_uid to set
	 */
	public void setSina_uid(Integer sinaUid) {
		sina_uid = sinaUid;
	}

	/**
	 * @return the app_key
	 */
	public String getApp_key() {
		return app_key;
	}

	/**
	 * @param appKey
	 *            the app_key to set
	 */
	public void setApp_key(String appKey) {
		app_key = appKey;
	}

	/**
	 * @return the nickname
	 */
	public String getNickname() {
		return nickname;
	}

	/**
	 * @param nickname
	 *            the nickname to set
	 */
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	/**
	 * @return the access_token
	 */
	public String getAccess_token() {
		return access_token;
	}

	/**
	 * @param accessToken
	 *            the access_token to set
	 */
	public void setAccess_token(String accessToken) {
		access_token = accessToken;
	}

	/**
	 * @return the token_secret
	 */
	public String getToken_secret() {
		return token_secret;
	}

	/**
	 * @param tokenSecret
	 *            the token_secret to set
	 */
	public void setToken_secret(String tokenSecret) {
		token_secret = tokenSecret;
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

}
