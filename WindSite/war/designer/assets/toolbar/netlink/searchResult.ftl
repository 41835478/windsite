<table width=100% height=100% class="wTable" style="border:0px;" cellspacing="0" cellpadding="0">
	<#if users??>
		<#if (users?size>0)>
			<#list users as u>
			<tr style="border-bottom:1px solid #DDD;">
				<td align="left" width=50px height=50px>
					<input style="margin-left:10px;" uid="${u.user_id}" type="checkbox" name="netLinkCheckbox">
				</td>
				<td width=200px>
					<a href="/router/site/details/${u.user_id}" target="_blank" style="color:#2C629E;font-weight:bold;font-size:11pt;">${u.nick}</a>
				</td>
				<td align="center">
					<span style="color:#999;">TA的淘站:</span><br/>
					<#if (u.sites?size>0)>
						<ul style="list-style-type:none">
						<#list u.sites as s>
						<li><a id="${u.user_id}" class=".site-link" stitle="${s.title}" href="http://${s.domainName}.xintaonet.com" target="_blank" style="color:#2C629E;font-weight:bold">${s.title}</a></li>
						</#list>
						</ul>
					</#if>
				</td>
			</tr>
			</#list>
		<#else>
		<tr>
			<td width=100%>
				<div style="width:100%;">
					<div style="float:left;width:60px;"><img src="http://static.xintaonet.com/assets/images/searchNoResult.gif"/></div>
					<div style="float:left;color:#999;">对不起,查询不到符合条件的会员<br/>你可以改变一下搜索条件,再次搜索试试...</div>
				</div>	
			</td>
		</tr>
		</#if>
	</#if>
</table>