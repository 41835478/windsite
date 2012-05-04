<#if members??&&(members?size>0)>
	<TR><td colspan=6 style="line-height:14px;height:20px;"><div style="float:right;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount></@ws.pager></div></td></TR>
		<#list members as m>
			<TR class="<#if m_index%2==0>odd<#else>even</#if>" mid="${m.id}">
				<TD>${m.id}</TD><TD style="text-align:left;"><a class="detail-view" mid="${m.id}">${m.info.username}</a></TD><TD>${m.created?datetime}</TD><TD>${m.lastVisit?datetime}</TD><TD>${m.visits}</TD><TD><a class="detail-view" mid="${m.id}">会员详情</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/router/member/fl/report?q=${m.info.username}&rel=member" mid="${m.id}">交易详情</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/router/member/fl/trade?q=${m.info.username}&rel=member" mid="${m.id}">返利详情</a></TD>
			</TR>
		</#list>
	<#else>
		<tr><td colspan=6 align="center"><h3>抱歉，您的站点还没有会员注册</h3></td>
		</tr>
	</#if>