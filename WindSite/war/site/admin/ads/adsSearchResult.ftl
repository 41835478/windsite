<#if (plans?size>0)>
<tr><td colspan=6><div style="float:right;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount></@ws.pager></div></td></tr>
		<#list plans as p>
			<TR class="plan <#if p_index%2==0>odd<#else>even</#if>" pid="${p.id}">
				<TD align=left><a href="#" class="plan-view" pid="${p.id}" style="color:#00E;font-weight:bold">${p.name}</a></TD>
				<TD><#if p.isDefault>是<#else>否</#if></TD>
				<TD><a class="plan-ads" style="color:#00E;font-weight:bold" pid="${p.id}">${p.used}个</a></TD>
				<TD><#if p.isValid>有效<#else>无效</#if></TD>
				<TD>${p.created?datetime}</TD>
				<TD>${p.type}&nbsp;&nbsp;&nbsp;&nbsp;<#if p.isValid&&p.isDefault><a class="refreshAds" pid="${p.id}">重新投放</a></#if></TD>
			</TR>
		</#list>
	<#else>
		<tr><td colspan=4 align="center"><h3>抱歉，未找到符合条件的推广计划</h3></td>
		</tr>
	</#if>