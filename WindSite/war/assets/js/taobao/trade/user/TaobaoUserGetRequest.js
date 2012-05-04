/**
 * taobao.user.get(得到单个用户信息)<br>
 * 传入淘宝会员帐号获取用户详细信息<br>
 * 用户登陆才能获取隐私信息(不支持:location.address,real_name,id_card,phone,mobile,email)
 * 
 * @author fxy
 * @class
 */
function TaobaoUserGetRequest() {
	/**
	 * API
	 * 
	 * @type String
	 */
	this.method = "taobao.user.get";
	/**
	 * 需返回的字段列表。可选值：User结构体中的所有字段<br>
	 * 以半角逗号(,)分隔。不支持:location.address,real_name,id_card,phone,mobile,email<br>
	 * user_id,nick,sex,buyer_credit.level,buyer_credit.score,buyer_credit.total_num,buyer_credit.good_num,seller_credit.level,seller_credit.score,seller_credit.total_num,seller_credit.good_num,location.zip,location.city,location.state,location.country,location.district,created,last_visit,birthday,type,has_more_pic,item_img_num,item_img_size,prop_img_num,prop_img_size,auto_repost,promoted_type,status,alipay_bind,consumer_protection,alipay_account,alipay_no
	 * 
	 * @type String
	 */
	this.fields = "user_id,nick,sex,buyer_credit.level,buyer_credit.score,buyer_credit.total_num,buyer_credit.good_num,seller_credit.level,seller_credit.score,seller_credit.total_num,seller_credit.good_num,location.zip,location.city,location.state,location.country,location.district,created,last_visit";
	/**
	 * 用户昵称
	 * 
	 * @type String
	 */
	this.nick = "";
	/**
	 * 支付宝账号,用支付宝账号查询用户对象只能查询公开信息。
	 * 
	 * @type String
	 */
	this.alipay_no = "";
}
TaobaoUserGetRequest.prototype = new TaobaoRequest();
/**
 * 业务参数校验
 * 
 * @function
 */
TaobaoUserGetRequest.prototype.validate = function() {
	// TODO 业务参数校验
}