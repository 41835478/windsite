package com.taobao.api.response;

import com.taobao.api.internal.mapping.ApiField;

import com.taobao.api.TaobaoResponse;

/**
 * TOP API: taobao.taobaoke.rebate.authorize.get response.
 * 
 * @author auto create
 * @since 1.0, null
 */
public class TaobaokeRebateAuthorizeGetResponse extends TaobaoResponse {

	private static final long serialVersionUID = 4654354683758583566L;

	/** 
	 * 卖家是否同意返利.true:同意返利,false:拒绝返利
	 */
	@ApiField("rebate")
	private Boolean rebate;

	public void setRebate(Boolean rebate) {
		this.rebate = rebate;
	}
	public Boolean getRebate( ) {
		return this.rebate;
	}

}
