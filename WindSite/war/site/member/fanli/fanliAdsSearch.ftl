<#if members??&&(members?size>0)>
	<TR><td colspan=2>共<strong style="color:red">${page.totalCount}</strong>个推广会员</td><td colspan=4 style="line-height:14px;height:20px;"><div style="float:right;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount></@ws.pager></div></td></TR>
		<#list members as m>
			<TR class="<#if m_index%2==0>odd<#else>even</#if>" mid="${m.id}">
				<TD>${m.id}</TD><TD style="text-align:left;"><a class="report-view" mid="${m.id}">${m.info.username}</a></TD><TD>${m.created?datetime}</TD><TD>${m.lastVisit?datetime}</TD><TD>${m.visits}</TD><TD><a class="report-view" mid="${m.id}">交易详情</a></TD>
			</TR>
		</#list>
	<#else>
		<tr><td colspan=6 align="center"><h3>抱歉，您还没有推广会员</h3></td>
		</tr>
	</#if>