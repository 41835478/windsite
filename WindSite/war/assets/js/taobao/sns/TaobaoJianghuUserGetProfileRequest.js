/**
 * taobao.jianghu.user.getProfile(取得淘江湖用户基本信息)
 * 
 * @author fxy
 * @class
 */
function TaobaoJianghuUserGetProfileRequest() {
	/**
	 * API taobao.jianghu.user.getProfile
	 * 
	 * @type String
	 */
	this.method = "taobao.jianghu.user.getProfile";
	/**
	 * 如果query_uid不为空,查询query_uid的用户信息,如果query_uid为空,则查询当前登录用户信息(须数字)
	 * 
	 * @type String
	 */
	this.query_uid = "";
}
TaobaoJianghuUserGetProfileRequest.prototype = new TaobaoRequest();
/**
 * 业务参数校验
 * 
 * @function
 */
TaobaoJianghuUserGetProfileRequest.prototype.validate = function() {
	// TODO 业务参数校验
}