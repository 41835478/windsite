<#if reports??&&(reports?size>0)>
	<TR><td>共<strong style="color:red">${page.totalCount}</strong>条交易记录</td><td colspan=7 style="line-height:14px;height:20px;"><div style="float:right;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount></@ws.pager></div></td></TR>
		<#list reports as r>
			<TR class="report-row <#if r_index%2==0>odd<#else>even</#if>" tid="${r.trade_id}">
				<#assign buyCommission=0 adsCommission=0>
				<#if ''!=r.buyCommission><#assign buyCommission=r.buyCommission?number></#if>
				<#if ''!=r.adsCommission><#assign adsCommission=r.adsCommission?number></#if>
				<TD>${r.trade_id}</TD><TD style="text-align:left;"><a href="/titem/${r.num_iid}.html" target="_blank" style="color:#0166FF;">${r.item_title}</a></TD><TD>${r.pay_price}</TD><TD>${r.item_num}</TD><TD>${r.commission?number}</TD><TD><a class="trade-view" tid="${r.trade_id}">${buyCommission+adsCommission}</a></TD><TD>${r.pay_time?datetime}</TD><TD><a class="username-search">${r.nick}</a></TD>
			</TR>
		</#list>
	<#else>
		<tr><td colspan=8 align="center"><h3>未找到符合的返利交易记录</h3></td>
		</tr>
	</#if>