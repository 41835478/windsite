<#assign map={'R':'未确认','A':'成功订单','F':'无效订单'}>
<#if reports??&&(reports?size>0)>
	<#list reports as r>
		<TR class="report-row <#if r_index%2==0>odd<#else>even</#if>"><TD>${r.orderNo}</TD><TD><#if malls[r.actionId]??><a href="/ymall-${r.actionId}.html" target="_blank">${malls[r.actionId].title}</a><#else>未知</#if></TD><TD>${r.itemId}</TD><TD>${r.itemPrice}</TD><TD>${r.itemNums}</TD><TD>${map[r.orderStatus]}</TD><TD>${r.orderTime}</TD></TR>
	</#list>
	<#if reports?size==5><tr><td colspan="7" align=left><a href="/router/fanlimember/report/mall">查看更多</a></td></tr></#if>
<#else>
	<tr><td colspan=7 align="center"><h3>未找到符合的返利交易记录</h3></td></tr>
</#if>