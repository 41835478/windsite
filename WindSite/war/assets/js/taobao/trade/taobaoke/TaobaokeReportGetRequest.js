/**
 * taobao.taobaoke.report.get (淘宝客报表查询)
 * 
 * @author fxy
 * @class
 */
function TaobaokeReportGetRequest() {
	/**
	 * API taobao.taobaoke.report.get
	 * 
	 * @type String
	 */
	this.method = "taobao.taobaoke.report.get";
	/**
	 * 需返回的字段列表.可选值:TaobaokeReportMember淘宝客报表成员结构体中的所有字段;字段之间用","分隔.
	 * 
	 * @type String
	 */
	this.fields = "app_key,outer_code,trade_id,pay_time,pay_price,num_iid,item_title,item_num,category_id,category_name,shop_title,commission_rate,commission";
	/**
	 * 需要查询报表的日期，有效的日期为最近3个月内的某一天，格式为:yyyyMMdd,如20090520.
	 * 
	 * @type String
	 */
	this.date = "";
}
TaobaokeReportGetRequest.prototype = new TaobaoRequest();
/**
 * 业务参数校验
 * 
 * @function
 */
TaobaokeReportGetRequest.prototype.validate = function() {
	// TODO 业务参数校验
}