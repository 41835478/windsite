<#if reports??&&(reports?size>0)>
<#assign map={'R':'未确认','A':'成功订单','F':'无效订单'}>
<TR><td>共<strong style="color:red">${page.totalCount}</strong>条交易记录</td><td colspan=9 style="line-height:14px;height:20px;"><div style="float:right;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount></@ws.pager></div></td></TR>
	<#list reports as r>
		<TR class="report-row <#if r_index%2==0>odd<#else>even</#if>" tid="${r.id}">
			<#assign buyCommission=0 adsCommission=0>
			<#if ''!=r.buyCommission><#assign buyCommission=r.buyCommission?number></#if>
			<#if ''!=r.adsCommission><#assign adsCommission=r.adsCommission?number></#if>
			<TD><#if malls[r.actionId]??><a class="action-search" action="${r.actionId}">${malls[r.actionId].title}</a><#else>未知</#if></TD><TD>${r.orderNo}</TD><TD>${r.itemId}</TD><TD>${r.itemPrice}</TD><TD>${r.itemNums}</TD><TD>${r.commission?number}</TD><TD><a class="trade-view" tid="${r.id}">${buyCommission+adsCommission}</a></TD><TD>${r.orderTime?datetime}</TD><TD>${map[r.orderStatus+'']}</TD><TD><a class="username-search">${r.nick}</a></TD>
		</TR>
	</#list>
<#else>
	<tr><td colspan=9 align="center"><h3>未找到符合的返利交易记录</h3></td>
	</tr>
</#if>