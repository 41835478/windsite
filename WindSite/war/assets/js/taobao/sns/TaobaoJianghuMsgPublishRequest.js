/**
 * taobao.jianghu.msg.publish(发送消息)
 * 
 * @author fxy
 * @class
 */
function TaobaoJianghuMsgPublishRequest() {
	/**
	 * API taobao.jianghu.msg.publish
	 * 
	 * @type String
	 */
	this.method = "taobao.jianghu.msg.publish";
	/**
	 * 消息类型（ISV自定义，统计需要）必须是数字取值范围[0,127]
	 * 
	 * @type String
	 */
	this.type = "";
	/**
	 * 消息内容（最长500个字符，一个汉字或者一个英文字母或者一个标点符号都算作一个字符)
	 * 
	 * @type String
	 */
	this.content = "";
	/**
	 * 消息接受者(须数字)
	 * 
	 * @type String
	 */
	this.to_uid = "";
}
TaobaoJianghuMsgPublishRequest.prototype = new TaobaoRequest();
/**
 * 业务参数校验
 * 
 * @function
 */
TaobaoJianghuMsgPublishRequest.prototype.validate = function() {
	// TODO 业务参数校验
}