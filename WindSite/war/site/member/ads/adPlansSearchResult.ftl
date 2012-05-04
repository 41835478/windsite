<#if plans??&&(plans?size>0)>
		<tr><td colspan=5 style="line-height:14px;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount></@ws.pager></td></tr>
		<#list plans as p>
			<TR class="plan <#if p_index%2==0>odd<#else>even</#if>" pid="${p.id}">
				<TD><input type="checkbox" name="plans">&nbsp;&nbsp;<#if 'index'==p.type>首页<#elseif 'blog'==p.type>文章</#if></TD>
				<TD align=left><a href="#" class="plan-view" pid="${p.id}" style="color:#00E;font-weight:bold">${p.name}</a></TD>
				<TD>${p.nick}</TD>
				<TD>${p.used}个</TD>
				<TD>${p.created?datetime}</TD>
			</TR>
		</#list>
	<#else>
		<tr><td colspan=5 align="center"><h3>抱歉，没有符合当前条件的卖家广告计划</h3></td>
		</tr>
	</#if>