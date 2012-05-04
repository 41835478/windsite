<#assign isDate=(dimensions??&&dimensions?contains('date')) isCategory=(dimensions??&&dimensions?contains('category')) isLabel=(dimensions??&&dimensions?contains('label'))>
<#assign isSource=(dimensions??&&dimensions?contains('source')) isCity=(dimensions??&&dimensions?contains('city'))>
<THEAD id="profileHeader">
	<TR>
		<#if isDate><TH width=100px>时间</TH></#if>
		<#if isCategory><TH width=100px>推广类型</TH></#if>
		<#if isLabel><TH>推广标题</TH></#if>
		<#if isSource><TH width=150px>来源</TH></#if>
		<#if isCity><TH width=100px>城市</TH></#if>
		<TH width=50px>PV</TH>
		<TH width=50px>UV</TH>
	</TR>
</THEAD>
<tbody id="profileBody">
	<#if analytics??&&analytics?size!=0>
		<#list analytics as a>
			<tr  class="<#if a_index%2==0>odd<#else>even</#if>"><#if isDate><td>${a.date}</td></#if><#if isCategory><td>${a.action}</td></#if>
			<#if isLabel><td style="text-align:left;">${a.label}</td></#if><#if isSource><td>${a.source}</td></#if>
			<#if isCity><td>${a.city}</td></#if><td>${a.pv}</td><td>${a.uv}</td></tr>
		</#list>
	</#if>
	<TR>
	<TD colspan=${dimensions?split(',')?size+2}>
	<table><tr><td style="text-align:center;line-height:14px;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount?number></@ws.pager></td>
	<td style="text-align:center;line-height:14px;">共<span style="color:red;">${page.totalCount}</span>条记录</td></tr></table>
	</TD>
	</TR>
</tbody>
