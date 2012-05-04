package com.wind.site.model;

import java.io.Serializable;
import java.util.List;

public class J_PosterData implements Serializable {

	private static final long serialVersionUID = 1L;

	private String asyncStatus;
	private String asyncMsg;
	private String posterId;
	private String prevPosterId;
	private String nextPosterId;
	private Long picIdOnInit;
	private String totalImage;
	private List<String> pmId;
	private String picAddUrl;
	private String P4PHost;
	private String P4PArgs;
	private String aucAddUrl;
	private String picShareUrl;
	private Boolean isGuidingPoster;
	private String isLoadingP4P;
	private Boolean isLogin;
	private Boolean isPreview;
	private String coverPicPath;
	private Boolean showImagine;

	/**
	 * @return the asyncStatus
	 */
	public String getAsyncStatus() {
		return asyncStatus;
	}

	/**
	 * @param asyncStatus
	 *            the asyncStatus to set
	 */
	public void setAsyncStatus(String asyncStatus) {
		this.asyncStatus = asyncStatus;
	}

	/**
	 * @return the asyncMsg
	 */
	public String getAsyncMsg() {
		return asyncMsg;
	}

	/**
	 * @param asyncMsg
	 *            the asyncMsg to set
	 */
	public void setAsyncMsg(String asyncMsg) {
		this.asyncMsg = asyncMsg;
	}

	/**
	 * @return the posterId
	 */
	public String getPosterId() {
		return posterId;
	}

	/**
	 * @param posterId
	 *            the posterId to set
	 */
	public void setPosterId(String posterId) {
		this.posterId = posterId;
	}

	/**
	 * @return the prevPosterId
	 */
	public String getPrevPosterId() {
		return prevPosterId;
	}

	/**
	 * @param prevPosterId
	 *            the prevPosterId to set
	 */
	public void setPrevPosterId(String prevPosterId) {
		this.prevPosterId = prevPosterId;
	}

	/**
	 * @return the nextPosterId
	 */
	public String getNextPosterId() {
		return nextPosterId;
	}

	/**
	 * @param nextPosterId
	 *            the nextPosterId to set
	 */
	public void setNextPosterId(String nextPosterId) {
		this.nextPosterId = nextPosterId;
	}

	/**
	 * @return the picIdOnInit
	 */
	public Long getPicIdOnInit() {
		return picIdOnInit;
	}

	/**
	 * @param picIdOnInit
	 *            the picIdOnInit to set
	 */
	public void setPicIdOnInit(Long picIdOnInit) {
		this.picIdOnInit = picIdOnInit;
	}

	/**
	 * @return the totalImage
	 */
	public String getTotalImage() {
		return totalImage;
	}

	/**
	 * @param totalImage
	 *            the totalImage to set
	 */
	public void setTotalImage(String totalImage) {
		this.totalImage = totalImage;
	}

	/**
	 * @return the pmId
	 */
	public List<String> getPmId() {
		return pmId;
	}

	/**
	 * @param pmId
	 *            the pmId to set
	 */
	public void setPmId(List<String> pmId) {
		this.pmId = pmId;
	}

	/**
	 * @return the picAddUrl
	 */
	public String getPicAddUrl() {
		return picAddUrl;
	}

	/**
	 * @param picAddUrl
	 *            the picAddUrl to set
	 */
	public void setPicAddUrl(String picAddUrl) {
		this.picAddUrl = picAddUrl;
	}

	/**
	 * @return the p4PHost
	 */
	public String getP4PHost() {
		return P4PHost;
	}

	/**
	 * @param p4pHost
	 *            the p4PHost to set
	 */
	public void setP4PHost(String p4pHost) {
		P4PHost = p4pHost;
	}

	/**
	 * @return the p4PArgs
	 */
	public String getP4PArgs() {
		return P4PArgs;
	}

	/**
	 * @param p4pArgs
	 *            the p4PArgs to set
	 */
	public void setP4PArgs(String p4pArgs) {
		P4PArgs = p4pArgs;
	}

	/**
	 * @return the aucAddUrl
	 */
	public String getAucAddUrl() {
		return aucAddUrl;
	}

	/**
	 * @param aucAddUrl
	 *            the aucAddUrl to set
	 */
	public void setAucAddUrl(String aucAddUrl) {
		this.aucAddUrl = aucAddUrl;
	}

	/**
	 * @return the picShareUrl
	 */
	public String getPicShareUrl() {
		return picShareUrl;
	}

	/**
	 * @param picShareUrl
	 *            the picShareUrl to set
	 */
	public void setPicShareUrl(String picShareUrl) {
		this.picShareUrl = picShareUrl;
	}

	/**
	 * @return the isGuidingPoster
	 */
	public Boolean getIsGuidingPoster() {
		return isGuidingPoster;
	}

	/**
	 * @param isGuidingPoster
	 *            the isGuidingPoster to set
	 */
	public void setIsGuidingPoster(Boolean isGuidingPoster) {
		this.isGuidingPoster = isGuidingPoster;
	}

	/**
	 * @return the isLoadingP4P
	 */
	public String getIsLoadingP4P() {
		return isLoadingP4P;
	}

	/**
	 * @param isLoadingP4P
	 *            the isLoadingP4P to set
	 */
	public void setIsLoadingP4P(String isLoadingP4P) {
		this.isLoadingP4P = isLoadingP4P;
	}

	/**
	 * @return the isLogin
	 */
	public Boolean getIsLogin() {
		return isLogin;
	}

	/**
	 * @param isLogin
	 *            the isLogin to set
	 */
	public void setIsLogin(Boolean isLogin) {
		this.isLogin = isLogin;
	}

	/**
	 * @return the isPreview
	 */
	public Boolean getIsPreview() {
		return isPreview;
	}

	/**
	 * @param isPreview
	 *            the isPreview to set
	 */
	public void setIsPreview(Boolean isPreview) {
		this.isPreview = isPreview;
	}

	/**
	 * @return the coverPicPath
	 */
	public String getCoverPicPath() {
		return coverPicPath;
	}

	/**
	 * @param coverPicPath
	 *            the coverPicPath to set
	 */
	public void setCoverPicPath(String coverPicPath) {
		this.coverPicPath = coverPicPath;
	}

	/**
	 * @return the showImagine
	 */
	public Boolean getShowImagine() {
		return showImagine;
	}

	/**
	 * @param showImagine
	 *            the showImagine to set
	 */
	public void setShowImagine(Boolean showImagine) {
		this.showImagine = showImagine;
	}

}
