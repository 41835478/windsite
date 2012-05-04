/**
 * 淘宝请求基类
 * 
 * @author fxy
 * @class
 */
function TaobaoRequest() {

	/**
	 * APP_KEY
	 * 
	 * @type String
	 */
	this.app_key = TaobaoConstants.API_KEY;
	/**
	 * 方法名
	 * 
	 * @type String
	 */
	this.method = "";

	/**
	 * 时间戳
	 * 
	 * @type String
	 */
	this.timestamp = "";
	/**
	 * 版本号
	 * 
	 * @type String
	 */

	this.v = "2.0";
	/**
	 * 返回格式
	 * 
	 * @type
	 */
	this.format = "json";
	/**
	 * 签名
	 * 
	 * @type String
	 */
	this.sign = "";
	/**
	 * 会话
	 * 
	 * @type String
	 */

	this.session = "";
	/**
	 * 密钥
	 * 
	 * @type String
	 */

	this.sign_method = "md5";
	/**
	 * 是否是沙箱请求
	 * 
	 * @type Boolean
	 */

	this.isSandbox = false;
	/**
	 * 参数校验
	 * 
	 * @function
	 */
	this.validate = function() {
		// 参数校验
	}
	/**
	 * 获取带有Sign的有效参数
	 * 
	 * @return Object
	 */
	this.getSignParameters = function() {
		var result = new Object();
		this.timestamp = new Date().format("yyyy-mm-dd hh:mm:ss");
		var keys = [];// 参数名集合
		var i = 0;
		for (var key in this) {
			if (!(this[key] instanceof Function) && this[key] != undefined
					&& this[key] != null && this[key] != "") {
				result[key] = this[key];
				keys[i] = key;
				i++;
			}
		}
		keys.sort();// 排序
		result.sign = TaobaoUtils.signature(keys, result,
				TaobaoConstants.SECRET);
		return result;
	}
	/**
	 * 返回没有Sign的有效参数集合
	 * 
	 * @return {}
	 */
	this.getParameters = function() {
		var result = new Object();
		this.timestamp = new Date().format("yyyy-mm-dd hh:mm:ss");
		for (var key in this) {
			if (!(this[key] instanceof Function) && this[key] != undefined
					&& this[key] != null && this[key] != "") {
				result[key] = this[key];
			}
		}
		return result;
	}
}