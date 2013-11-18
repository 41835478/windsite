<#if reports??&&(reports?size>0)>
<TR><td>共<strong style="color:red">${page.totalCount}</strong>条交易记录</td><td colspan=5 style="line-height:14px;height:20px;"><div style="float:right;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount></@ws.pager></div></td></TR>
	<#list reports as r>
		<#assign tradeNum=r.trade_id?string>
		<TR class="<#if r_index%2==0>odd<#else>even</#if>"><TD>${tradeNum[0]+'************'+tradeNum[tradeNum?length-1]}</TD><TD style="text-align:left;"><a href="/titem/${r.num_iid}.html" target="_blank" style="color:#0166FF;">${r.item_title}</a></TD><TD>${r.pay_price}</TD><TD>${r.item_num}</TD><TD>${r.pay_time?datetime}</TD><TD><a class="getOrder" href="javascript:;" tid="${r.id}">找回订单</a></TD></TR>
	</#list>
<#else>
	<tr><td colspan=6 align="center"><h3>未找到符合的交易记录</h3></td></tr>
</#if>