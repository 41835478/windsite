/**
 * 淘宝返回基类
 * 
 * @author fxy
 * @class
 */
function TaobaoResponse(jsonRsp) {

	/**
	 * 错误代码
	 * 
	 * @type String
	 */
	this.errorCode = null;
	/**
	 * 错误信息
	 * 
	 * @type String
	 */
	this.msg = null;
	/**
	 * 子系统错误代码
	 * 
	 * @type
	 */
	this.subCode = null;
	/**
	 * 子系统错误信息
	 * 
	 * @type
	 */
	this.subMsg = null;
	/**
	 * 重定向URL
	 * 
	 * @type String
	 */
	this.redirectUrl = null;
	/**
	 * 返回信息
	 * 
	 * @type
	 */
	this.body = {};
	/**
	 * 判断是否调用API成功
	 * 
	 * @function
	 * @return Boolean
	 */
	this.isSuccess = function() {
		return null == this.errorCode;
	}
	/**
	 * 判断是否需要重定向
	 * 
	 * @function
	 * @return Boolean
	 */
	this.isRedirect = function() {
		return null != this.redirectUrl;
	}
	/**
	 * 得到绑定用户需要重定向的URL
	 * 
	 * @param {String}target
	 *            绑定用户成功后重定向的目标地址
	 * @return String
	 */
	this.getRedirectUrl = function(target) {
		return this.redirectUrl + "&sip_redirecturl=" + target;
	}
	/**
	 * 得到绑定用户需要重定向的URL，对绑定后重定向回isv的url做urlEncode编码
	 * 
	 * @param {String}target
	 *            绑定用户成功后重定向的目标地址
	 * @return String
	 */
	this.getEncodeRedirectUrl = function(target) {
		return this.redirectUrl + "&sip_redirecturl=" + encodeURI(target);
	}
	if (jsonRsp != null) {
		if (jsonRsp.hasOwnProperty(TaobaoConstants.ERROR_RSP)) {
			this.errorCode = jsonRsp[TaobaoConstants.ERROR_RSP][TaobaoConstants.ERROR_CODE];
			this.msg = jsonRsp[TaobaoConstants.ERROR_RSP][TaobaoConstants.ERROR_MSG];
			if (jsonRsp[TaobaoConstants.ERROR_RSP]
					.hasOwnProperty(TaobaoConstants.SUB_ERROR_CODE)) {
				this.subCode = jsonRsp[TaobaoConstants.ERROR_RSP][TaobaoConstants.SUB_ERROR_CODE];
				this.subMsg = jsonRsp[TaobaoConstants.ERROR_RSP][TaobaoConstants.SUB_ERROR_MSG];
			}

		}
		this.msg = convertError(parseInt(this.errorCode), this.msg);
		this.body = jsonRsp;
	}
	// this.redirectUrl = response.redirectUrl;
}