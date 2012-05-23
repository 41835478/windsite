<#if reports??&&(reports?size>0)>
<TR><td>共<strong style="color:red">${page.totalCount}</strong>条交易记录</td><td colspan=5 style="line-height:14px;height:20px;"><div style="float:right;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount></@ws.pager></div></td></TR>
	<#list reports as r>
		<TR class="report-row <#if r_index%2==0>odd<#else>even</#if>"><TD></TD><TD>${r.itemPrice}</TD><TD>${r.itemNums}</TD><TD style="color:red;font-weight:700">${r.adsCommission}</TD><TD>${r.orderTime}</TD><TD>${r.nick}</TD></TR>
	</#list>
<#else>
	<tr><td colspan=6 align="center"><h3>未找到符合的返利交易记录</h3></td></tr>
</#if>
sdfadsfasdf