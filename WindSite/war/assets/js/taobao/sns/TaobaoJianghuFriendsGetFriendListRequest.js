/**
 * taobao.jianghu.friends.getFriendList 查找用户好友列表
 * 
 * @author fxy
 * @class
 */
function TaobaoJianghuFriendsGetFriendListRequest() {
	/**
	 * API taobao.jianghu.friends.getFriendList
	 * 
	 * @type String
	 */
	this.method = "taobao.jianghu.friends.getFriendList";
	/**
	 * 页码.传入值为1代表第一页,传入值为2代表第二页,依此类推.默认返回的数据是从第一页开始.
	 * 
	 * @type Number
	 */
	this.page_no = 1;
	/**
	 * 每页数量默认10条，最大1000条
	 * 
	 * @type Number
	 */
	this.page_size = 10;
}
TaobaoJianghuFriendsGetFriendListRequest.prototype = new TaobaoRequest();
/**
 * 业务参数校验
 * 
 * @function
 */
TaobaoJianghuFriendsGetFriendListRequest.prototype.validate = function() {
	// TODO 业务参数校验
}