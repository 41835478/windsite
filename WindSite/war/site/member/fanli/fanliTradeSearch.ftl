<#if trades??&&(trades?size>0)>
	<TR><td>共<strong style="color:red">${page.totalCount}</strong>条返利记录</td><td colspan=5 style="line-height:14px;height:20px;"><div style="float:right;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount></@ws.pager></div></td></TR>
		<#list trades as t>
			<#if t.report??>
			<TR class="<#if t_index%2==0>odd<#else>even</#if>">
				<td><a href="/titem/${t.report.num_iid}.html" target="_blank" style="color:#0166FF;">${t.report.item_title}</a></td><TD style="color:red;font-weight:700;">${t.commission}</TD><TD><#if 'BUY'==t.type>购买返利<#else>推广返利</#if></TD><TD style="color:#090;" id="status-${t.id}"><#if t.status=0><span class="span-status-0">等待站长支付返利</span><#elseif t.status=1><span class="span-status-1">等待会员确认收款</span><#elseif t.status=2><span class="span-status-2">已完成返利支付</span></#if></TD><TD>${t.statusDate?datetime}</TD>
				<TD><#if t.status=1><a class="fanli-status-2" tid="${t.id}">确认已收款</a></#if></TD>
			</TR>
			<#elseif t.yiqifa??>
			<#assign r=t.yiqifa>
			<TR class="<#if t_index%2==0>odd<#else>even</#if>">
				<td><#if malls[r.actionId]??><a href="/ymall-${r.actionId}.html" target="_blank">${malls[r.actionId].title}</a><#else>未知</#if></td><TD style="color:red;font-weight:700;">${t.commission}</TD><TD><#if 'BUY'==t.type>购买返利<#else>推广返利</#if></TD><TD style="color:#090;" id="status-${t.id}"><#if t.status=0><span class="span-status-0">等待站长支付返利</span><#elseif t.status=1><span class="span-status-1">等待会员确认收款</span><#elseif t.status=2><span class="span-status-2">已完成返利支付</span></#if></TD><TD>${t.statusDate?datetime}</TD>
				<TD><#if t.status=1><a class="fanli-status-2" tid="${t.id}">确认已收款</a></#if></TD>
			</TR>
			</#if>
		</#list>
	<#else>
		<tr><td colspan=6 align="center"><h3>未找到符合的返利记录</h3></td>
		</tr>
	</#if>