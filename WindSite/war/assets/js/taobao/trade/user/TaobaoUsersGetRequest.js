/**
 * taobao.users.get(得到单个用户信息)<br>
 * 传入多个淘宝会员帐号返回多个用户公开信息<br>
 * 
 * @author fxy
 * @class
 */
function TaobaoUsersGetRequest() {
	/**
	 * API
	 * 
	 * @type String
	 */
	this.method = "taobao.users.get";
	/**
	 * 需返回的字段列表。可选值：User结构体中的所有字段<br>
	 * 以半角逗号(,)分隔。不支持:location.address,real_name,id_card,phone,mobile,email<br>
	 * user_id,nick,sex,buyer_credit.level,buyer_credit.score,buyer_credit.total_num,buyer_credit.good_num,seller_credit.level,seller_credit.score,seller_credit.total_num,seller_credit.good_num,location.zip,location.city,location.state,location.country,location.district,created,last_visit
	 * 
	 * @type String
	 */
	this.fields = "user_id,nick,sex,buyer_credit.level,buyer_credit.score,buyer_credit.total_num,buyer_credit.good_num,seller_credit.level,seller_credit.score,seller_credit.total_num,seller_credit.good_num,location.zip,location.city,location.state,location.country,location.district,created,last_visit";
	/**
	 * 用户昵称组
	 * 
	 * @type String
	 */
	this.nicks = "";
}
TaobaoUsersGetRequest.prototype = new TaobaoRequest();
/**
 * 业务参数校验
 * 
 * @function
 */
TaobaoUsersGetRequest.prototype.validate = function() {
	// TODO 业务参数校验
}