package com.taobao.api.request;

import java.util.Map;

import com.taobao.api.TaobaoRequest;
import com.taobao.api.internal.util.TaobaoHashMap;
import com.taobao.api.response.TaobaokeRebateAuthorizeGetResponse;
import com.taobao.api.ApiRuleException;
/**
 * TOP API: taobao.taobaoke.rebate.authorize.get request
 * 
 * @author auto create
 * @since 1.0, 2013-08-24 12:39:16
 */
public class TaobaokeRebateAuthorizeGetRequest implements TaobaoRequest<TaobaokeRebateAuthorizeGetResponse> {

	private Map<String, String> headerMap = new TaobaoHashMap();
	private TaobaoHashMap udfParams; // add user-defined text parameters
	private Long timestamp;

	/** 
	* 卖家淘宝会员昵称.注：指的是淘宝的会员登录名
	 */
	private String nick;

	/** 
	* 商品数字ID
	 */
	private Long numIid;

	/** 
	* 卖家淘宝会员数字ID.
	 */
	private Long sellerId;

	public void setNick(String nick) {
		this.nick = nick;
	}
	public String getNick() {
		return this.nick;
	}

	public void setNumIid(Long numIid) {
		this.numIid = numIid;
	}
	public Long getNumIid() {
		return this.numIid;
	}

	public void setSellerId(Long sellerId) {
		this.sellerId = sellerId;
	}
	public Long getSellerId() {
		return this.sellerId;
	}

	public Long getTimestamp() {
		return this.timestamp;
	}

	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}

	public String getApiMethodName() {
		return "taobao.taobaoke.rebate.authorize.get";
	}

	public Map<String, String> getTextParams() {		
		TaobaoHashMap txtParams = new TaobaoHashMap();
		txtParams.put("nick", this.nick);
		txtParams.put("num_iid", this.numIid);
		txtParams.put("seller_id", this.sellerId);
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

	public Class<TaobaokeRebateAuthorizeGetResponse> getResponseClass() {
		return TaobaokeRebateAuthorizeGetResponse.class;
	}

	public void check() throws ApiRuleException {
	}

	public Map<String, String> getHeaderMap() {
		return headerMap;
	}
}
