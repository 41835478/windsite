<TABLE class="wTable" width=100% height=100% border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=120px>会员</TH>
			<TH width=100px>返利金额</TH>
			<TH width=120px>返利类型</TH>
			<TH width=150px>状态</TH>
			<TH>时间</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#if trades??&&(trades?size>0)>
		<#list trades as t>
			<TR>
				<TD>${t.flMember.info.username}</TD><TD style="color:red;font-weight:700;">${t.commission}</TD><TD><#if 'BUY'==t.type>购买返利<#else>推广返利</#if></TD><TD style="color:#090;"><#if t.status=0>等待站长支付返利<#elseif t.status=1>等待会员确认收款<#elseif t.status=2>已完成返利支付</#if></TD><TD>${t.statusDate?datetime}</TD>
			</TR>
		</#list>
	<#else>
		<tr><td colspan=5 align="center"><h3>未找到符合的返利记录</h3></td>
		</tr>
	</#if>
	</TBODY>
</TABLE>