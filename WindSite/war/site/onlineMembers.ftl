<@ws.header>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客">
<meta name="description" content="当前在线会员-新淘网">
<title>在线会员- 新淘网</title>
</@ws.header>
<table width=100%  id="m_table" class="wTable" cellspacing="0" cellpadding="0">
<#if (onlineMembers?size>0)>
<#list onlineMembers as m>
<tr>
	<td width=200px>
		<a href="/router/site/details/${m.user_id}" target="_blank" style="color:#2C629E;font-weight:bold;font-size:11pt;">${m.nick}</a>
	</td>
	<td align="center">
		<span style="color:#999;">TA的淘站:</span><br/>
		<#if (m.sites?size>0)>
			<ul style="list-style-type:none">
			<#list m.sites as s>
			<li><a href="http://${s.domainName}.xintaonet.com" target="_blank" style="color:#2C629E;font-weight:bold">${s.title}</a></li>
			</#list>
			</ul>
		</#if>
	</td>
</tr>
</#list>
<#else>
<tr><td>哎呀！现在没有会员在线</td></tr>
</#if>
</table>
<#include "/site/template/footer.ftl">