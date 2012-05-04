/**
 * taobao.taobaoke.interval.report.get (淘宝客实时报表查询)
 * 
 * @author fxy
 * @class
 */
function TaobaokeIntervalReportGetRequest() {
	/**
	 * API taobao.taobaoke.report.get
	 * 
	 * @type String
	 */
	this.method = "taobao.taobaoke.interval.report.get";
	/**
	 * 查询起始时间，格式为yyyy-MM-dd HH:mm:ss
	 * 
	 * @type String
	 */
	this.start_date = "";
	/**
	 * 查询结束时间，格式为yyyy-MM-dd HH:mm:ss.
	 * 
	 * @type String
	 */
	this.end_date = "";
}
TaobaokeIntervalReportGetRequest.prototype = new TaobaoRequest();
/**
 * 业务参数校验
 * 
 * @function
 */
TaobaokeIntervalReportGetRequest.prototype.validate = function() {
	// TODO 业务参数校验
}