package com.wind.site.model;

import java.util.List;

public class HuabaoData {
	private List<String> pmId;

	private String picAddUrl;

	private String aucAddUrl;
	private Integer picIdOnInit;
	private Integer posterId;
	private Boolean isGuidingPoster;
	private String version;
	private Boolean isLoadingP4P;
	private String P4PHost;

	private String P4PArgs;

	private String picShareUrl;

	private List<Huabao> posterInfo;

	@Override
	public String toString() {
		String result = "{";
		if (pmId != null) {
			result += "pmId:[";
			boolean isFirst = true;
			for (String p : pmId) {
				if (isFirst) {
					isFirst = false;
				} else {
					result += ",";
				}
				result += "'" + p + "'";
			}
			result += "],";
		} else {
			result += "pmId=[],";
		}
		result += "picAddUrl:'" + picAddUrl + "',";
		result += "aucAddUrl:'" + aucAddUrl + "',";
		result += "picIdOnInit:" + picIdOnInit + ",";
		result += "posterId:" + posterId + ",";
		result += "isGuidingPoster:" + isGuidingPoster + ",";
		result += "version:'" + version + "',";
		result += "isLoadingP4P:" + isLoadingP4P + ",";
		result += "P4PHost:'" + P4PHost + "',";
		result += "P4PArgs:'" + P4PArgs + "',";
		result += "picShareUrl:'" + picShareUrl + "',";
		if (posterInfo != null) {
			boolean isFirst = true;
			result += "posterInfo:[";
			for (Huabao hb : posterInfo) {
				if (isFirst) {
					isFirst = false;
				} else {
					result += ",";
				}
				result += hb.toString();
			}
			result += "]";
		} else {
			result += "posterInfo:[]";
		}
		result += "}";
		return result;
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
	 * @return the picIdOnInit
	 */
	public Integer getPicIdOnInit() {
		return picIdOnInit;
	}

	/**
	 * @param picIdOnInit
	 *            the picIdOnInit to set
	 */
	public void setPicIdOnInit(Integer picIdOnInit) {
		this.picIdOnInit = picIdOnInit;
	}

	/**
	 * @return the posterId
	 */
	public Integer getPosterId() {
		return posterId;
	}

	/**
	 * @param posterId
	 *            the posterId to set
	 */
	public void setPosterId(Integer posterId) {
		this.posterId = posterId;
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
	 * @return the version
	 */
	public String getVersion() {
		return version;
	}

	/**
	 * @param version
	 *            the version to set
	 */
	public void setVersion(String version) {
		this.version = version;
	}

	/**
	 * @return the isLoadingP4P
	 */
	public Boolean getIsLoadingP4P() {
		return isLoadingP4P;
	}

	/**
	 * @param isLoadingP4P
	 *            the isLoadingP4P to set
	 */
	public void setIsLoadingP4P(Boolean isLoadingP4P) {
		this.isLoadingP4P = isLoadingP4P;
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
	 * @return the posterInfo
	 */
	public List<Huabao> getPosterInfo() {
		return posterInfo;
	}

	/**
	 * @param posterInfo
	 *            the posterInfo to set
	 */
	public void setPosterInfo(List<Huabao> posterInfo) {
		this.posterInfo = posterInfo;
	}

}
