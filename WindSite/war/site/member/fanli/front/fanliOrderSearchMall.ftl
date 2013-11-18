<#assign map={'R':'未确认','A':'成功订单','F':'无效订单'}>
<#if reports??&&(reports?size>0)>
<TR><td>共<strong style="color:red">${page.totalCount}</strong>条交易记录</td><td colspan=6 style="line-height:14px;height:20px;"><div style="float:right;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount></@ws.pager></div></td></TR>
	<#list reports as r>
		<TR class="report-row <#if r_index%2==0>odd<#else>even</#if>"><TD><#if malls[r.actionId]??><a href="/ymall-${r.actionId}.html" target="_blank">${malls[r.actionId].title}</a><#else>未知</#if></TD><TD>${r.itemId}</TD><TD>${r.itemPrice}</TD><TD>${r.itemNums}</TD><TD>${map[r.orderStatus]}</TD><TD>${r.orderTime}</TD><TD><a class="getOrder" href="javascript:;" tid="${r.id}">找回订单</a></TD></TR>
	</#list>
<#else>
	<tr><td colspan=7 align="center"><h3>未找到符合的返利交易记录</h3></td></tr>
</#if>