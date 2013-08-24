package com.taobao.api.request;

import com.taobao.api.internal.util.RequestCheckUtils;
import java.util.Map;

import com.taobao.api.TaobaoRequest;
import com.taobao.api.internal.util.TaobaoHashMap;
import com.taobao.api.response.TaobaokeRebateAuthGetResponse;
import com.taobao.api.ApiRuleException;
/**
 * TOP API: taobao.taobaoke.rebate.auth.get request
 * 
 * @author auto create
 * @since 1.0, 2013-08-24 12:39:16
 */
public class TaobaokeRebateAuthGetRequest implements TaobaoRequest<TaobaokeRebateAuthGetResponse> {

	private Map<String, String> headerMap = new TaobaoHashMap();
	private TaobaoHashMap udfParams; // add user-defined text parameters
	private Long timestamp;

	/** 
	* nick或seller_id或num_iid，最大输入40个.格式如:"value1,value2,value3" 用","号分隔
	 */
	private String params;

	/** 
	* 类型：1-按nick查询，2-按seller_id查询，3-按num_iid查询
	 */
	private Long type;

	public void setParams(String params) {
		this.params = params;
	}
	public String getParams() {
		return this.params;
	}

	public void setType(Long type) {
		this.type = type;
	}
	public Long getType() {
		return this.type;
	}

	public Long getTimestamp() {
		return this.timestamp;
	}

	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}

	public String getApiMethodName() {
		return "taobao.taobaoke.rebate.auth.get";
	}

	public Map<String, String> getTextParams() {		
		TaobaoHashMap txtParams = new TaobaoHashMap();
		txtParams.put("params", this.params);
		txtParams.put("type", this.type);
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

	public Class<TaobaokeRebateAuthGetResponse> getResponseClass() {
		return TaobaokeRebateAuthGetResponse.class;
	}

	public void check() throws ApiRuleException {
		RequestCheckUtils.checkNotEmpty(params,"params");
		RequestCheckUtils.checkMaxListSize(params,40,"params");
		RequestCheckUtils.checkNotEmpty(type,"type");
	}

	public Map<String, String> getHeaderMap() {
		return headerMap;
	}
}
