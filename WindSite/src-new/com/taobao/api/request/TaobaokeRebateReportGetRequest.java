package com.taobao.api.request;

import java.util.Date;
import com.taobao.api.internal.util.RequestCheckUtils;
import java.util.Map;

import com.taobao.api.TaobaoRequest;
import com.taobao.api.internal.util.TaobaoHashMap;
import com.taobao.api.response.TaobaokeRebateReportGetResponse;
import com.taobao.api.ApiRuleException;
/**
 * TOP API: taobao.taobaoke.rebate.report.get request
 * 
 * @author auto create
 * @since 1.0, 2013-08-24 12:39:16
 */
public class TaobaokeRebateReportGetRequest implements TaobaoRequest<TaobaokeRebateReportGetResponse> {

	private Map<String, String> headerMap = new TaobaoHashMap();
	private TaobaoHashMap udfParams; // add user-defined text parameters
	private Long timestamp;

	/** 
	* 需返回的字段列表.可选值:TaobaokePayment淘宝客订单构体中的所有字段;字段之间用","分隔.
	 */
	private String fields;

	/** 
	* 当前页数
	 */
	private Long pageNo;

	/** 
	* 每页返回结果数，最小每页40条，默认每页40条，最大每页100条
	 */
	private Long pageSize;

	/** 
	* 查询报表的时间跨度，单位秒。
以用户输入的start_time时间为起始时间，start_time+span为结束时间，查询该时间段内的订单。span最小值为60秒，最大值为600秒，默认值为60秒
	 */
	private Long span;

	/** 
	* 需要查询报表的开始日期，有效的日期为从当前日期开始起90天以内的订单
	 */
	private Date startTime;

	public void setFields(String fields) {
		this.fields = fields;
	}
	public String getFields() {
		return this.fields;
	}

	public void setPageNo(Long pageNo) {
		this.pageNo = pageNo;
	}
	public Long getPageNo() {
		return this.pageNo;
	}

	public void setPageSize(Long pageSize) {
		this.pageSize = pageSize;
	}
	public Long getPageSize() {
		return this.pageSize;
	}

	public void setSpan(Long span) {
		this.span = span;
	}
	public Long getSpan() {
		return this.span;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getStartTime() {
		return this.startTime;
	}

	public Long getTimestamp() {
		return this.timestamp;
	}

	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}

	public String getApiMethodName() {
		return "taobao.taobaoke.rebate.report.get";
	}

	public Map<String, String> getTextParams() {		
		TaobaoHashMap txtParams = new TaobaoHashMap();
		txtParams.put("fields", this.fields);
		txtParams.put("page_no", this.pageNo);
		txtParams.put("page_size", this.pageSize);
		txtParams.put("span", this.span);
		txtParams.put("start_time", this.startTime);
		if(this.udfParams != null) {
			txtParams.putAll(this.udfParams);
		}
		return txtParams;
	}

	public void putOtherTextParam(String key, String value) {
		if(this.udfParams == null) {
			this.udfParams = new TaobaoHashMap();
		}
		this.udfParams.put(key, value);
	}

	public Class<TaobaokeRebateReportGetResponse> getResponseClass() {
		return TaobaokeRebateReportGetResponse.class;
	}

	public void check() throws ApiRuleException {
		RequestCheckUtils.checkNotEmpty(fields,"fields");
		RequestCheckUtils.checkMaxValue(pageNo,100L,"pageNo");
		RequestCheckUtils.checkMinValue(pageNo,1L,"pageNo");
		RequestCheckUtils.checkMaxValue(pageSize,100L,"pageSize");
		RequestCheckUtils.checkNotEmpty(span,"span");
		RequestCheckUtils.checkMaxValue(span,600L,"span");
		RequestCheckUtils.checkMinValue(span,60L,"span");
		RequestCheckUtils.checkNotEmpty(startTime,"startTime");
	}

	public Map<String, String> getHeaderMap() {
		return headerMap;
	}
}
