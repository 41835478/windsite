package com.taobao.api.response;

import java.util.List;
import com.taobao.api.internal.mapping.ApiField;
import com.taobao.api.internal.mapping.ApiListField;
import com.taobao.api.domain.TaobaokePayment;

import com.taobao.api.TaobaoResponse;

/**
 * TOP API: taobao.taobaoke.rebate.report.get response.
 * 
 * @author auto create
 * @since 1.0, null
 */
public class TaobaokeRebateReportGetResponse extends TaobaoResponse {

	private static final long serialVersionUID = 8235683381143172187L;

	/** 
	 * 淘宝客订单
	 */
	@ApiListField("taobaoke_payments")
	@ApiField("taobaoke_payment")
	private List<TaobaokePayment> taobaokePayments;

	public void setTaobaokePayments(List<TaobaokePayment> taobaokePayments) {
		this.taobaokePayments = taobaokePayments;
	}
	public List<TaobaokePayment> getTaobaokePayments( ) {
		return this.taobaokePayments;
	}

}
