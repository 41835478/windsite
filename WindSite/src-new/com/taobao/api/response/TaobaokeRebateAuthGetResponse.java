package com.taobao.api.response;

import java.util.List;
import com.taobao.api.internal.mapping.ApiField;
import com.taobao.api.internal.mapping.ApiListField;
import com.taobao.api.domain.TaobaokeAuthorize;

import com.taobao.api.TaobaoResponse;

/**
 * TOP API: taobao.taobaoke.rebate.auth.get response.
 * 
 * @author auto create
 * @since 1.0, null
 */
public class TaobaokeRebateAuthGetResponse extends TaobaoResponse {

	private static final long serialVersionUID = 2656638364328939837L;

	/** 
	 * 返利授权查询结果
	 */
	@ApiListField("results")
	@ApiField("taobaoke_authorize")
	private List<TaobaokeAuthorize> results;

	public void setResults(List<TaobaokeAuthorize> results) {
		this.results = results;
	}
	public List<TaobaokeAuthorize> getResults( ) {
		return this.results;
	}

}
