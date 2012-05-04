/**
 * Wind 返回
 */
function WindResponse(jsonRsp) {

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

function convertError(errorCode, msg) {
	switch (errorCode) {
		case 3 :
			return '图片上传失败';
			break;
		case 4 :
			return '用户调用次数超限';
			break;
		case 5 :
			return '会话调用次数超限';
			break;
		case 6 :
			return '合作伙伴调用次数超限';
			break;
		case 7 :
			return '应用调用次数超限';
			break;
		case 8 :
			return '应用调用频率超限';
			break;
		case 9 :
			return 'HTTP方法被禁止（请用大写的POST或GET）';
			break;
		case 10 :
			return '服务不可用';
			break;
		case 11 :
			return '开发者权限不足';
			break;
		case 12 :
			return '用户权限不足';
			break;
		case 13 :
			return '合作伙伴权限不足';
			break;
		case 15 :
			return '淘宝远程服务出错,请重试';
			break;
		case 21 :
			return '缺少方法名参数';
			break;
		case 22 :
			return '不存在的方法名';
			break;
		case 23 :
			return '非法数据格式';
			break;
		case 24 :
			return '缺少签名参数';
			break;
		case 25 :
			return '非法签名';
			break;
		case 26 :
			return '缺少SessionKey参数';
			break;
		case 27 :
			return '无效的SessionKey参数';
			break;
		case 28 :
			return '缺少AppKey参数';
			break;
		case 29 :
			return '非法的AppKe参数';
			break;
		case 30 :
			return '缺少时间戳参数';
			break;
		case 31 :
			return '非法的时间戳参数';
			break;
		case 32 :
			return '缺少版本参数';
			break;
		case 33 :
			return '非法的版本参数';
			break;
		case 34 :
			return '不支持的版本号';
			break;
		case 40 :
			return '缺少必选参数';
			break;
		case 41 :
			return '非法的参数';
			break;
		case 42 :
			return '请求被禁止';
			break;
		case 43 :
			return '参数错误';
			break;
	}
	return msg;
}