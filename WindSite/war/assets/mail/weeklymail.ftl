<table style="border: 2px dashed #A1E7EF;margin: 20px;padding:20px;width: 612px;">
<tr><td>
<h3>您好:<strong style="color:#E61477">${user.nick}</strong></h3>
<p style="text-indent: 2em;">您上次登录新淘网的时间是:<strong style="color:#E61477">${user.last_visit}</strong>,截至今日您一共登录新淘网<strong style="color:#E61477">${user.visits}</strong>次</p>
<#if user.sites??&&user.sites?size==1>
	<p style="text-indent: 2em;"><#if 0==user.sites[0].status>您还尚未发布您的新淘网购物站点,建议您立即登录<a href="http://www.xintaonet.com" target="_blank"><strong style="color:#E61477">新淘网</strong></a>,并设计您的推广站点。<#else>您的新淘网推广站点是:<a href="http://shop${user.user_id}.xintaonet.com" target="_blank"><strong style="color:#E61477">${user.sites[0].title}</strong></a></#if></p>
</#if>
<#if !user.uc_id??>
<p style="text-indent: 2em;">您还尚未激活新淘家园,点击<a href="http://container.open.taobao.com/container?appkey=12034285&redirect=http://www.xintaonet.com/router/site/loginuc?redirect=http://home.xintaonet.com" target="_blank"><strong style="color:#E61477">现在激活</strong></a></p>
<#else>
<p style="text-indent: 2em;">
<a href="http://www.xintaonet.com" target="_blank"><strong style="color:#E61477">我的新淘网</strong></a>&nbsp;&nbsp;&nbsp;
<a href="http://home.xintaonet.com/?${user.uc_id}" target="_blank"><strong style="color:#E61477">访问您的新淘家园</strong></a>&nbsp;&nbsp;&nbsp;<a href="http://forum.xintaonet.com" target="_blank"><strong style="color:#E61477">访问新淘网官方论坛</strong></a></p>
</#if>
<p style="text-indent: 2em;"><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=4160" target="_blank"><strong style="color:#E61477">新淘网淘客返利版横空出世</a>&nbsp;&nbsp;&nbsp;<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=3917" target="_blank"><strong style="color:#E61477">新淘网卖家版</a></p>
</td>
</tr>
<tr>
<td>
<table width=90% style="margin-top:20px;border-top: 2px dashed #C2DA8E;">
<tr>
<td><a href="http://www.xintaonet.com" target="_blank"><h4 style="color:#6D823F;">最新的返利版网站示例</h4></a></td>
<td align=right></td>
</tr>
<tr>
<td colspan=2>
<TABLE style="padding-left:2px;padding-right:2px;font-size:12px;" width=100% border="0" cellspacing="1" cellpadding="1">
<THEAD>
<TR>
	<TH><a href="http://www.lovezippo.com/huabao/index.html" target="_blank" style="color:#E61477">导购画报返利示例</a></TH>
</TR>
</THEAD>
	<tbody>
	<#if fanliSites??&&fanliSites?size!=0>
	<#list fanliSites as s>
	<tr><td style="border-bottom: 1px solid #EEE;padding: 8px 4px;">
	<a href="http://${s.www}" target="_blank" style="color:#0063DC">${s.title}</a>
	<br/>
	站长：${s.nick}
	</td></tr>
	</#list>
	</#if>
	</tbody>
</table>
</td></tr>
</table>
</td>
</tr>
<tr>
<td>
<table width=90% style="margin-top:20px;border-top: 2px dashed #A1E7EF;">
<tr>
<td><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&classid=15&view=me" target="_blank"><h4 style="color:#96709F;">新淘网更新日志</h4></a></td>
<td align=right><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&classid=15&view=me" target="_blank"><h4 style="color:#96709F;">更多</h4></a></td>
</tr>
<#if blogs??&&blogs?size!=0>
<#list blogs as b>
<tr><td colspan=2>
<h3><a href="http://home.xintaonet.com/space.php?uid=${b.uid}&do=blog&id=${b.bid}" target="_blank" style="color: #2C629E;font-size:12px;">${b.subject}</a></h3> 
<table style="background: #FCFAFF;margin: 10px 0px;border-spacing: 2px 2px;border-color: gray;border-collapse: separate;display: table;"><tr><td valign="top">
<a href="http://home.xintaonet.com/space.php?uid=${b.uid}" title="${b.username}" target="_blank"><img style="border:0px"  src="http://www.xintaonet.com/discuz72/uc_server/avatar.php?uid=${b.uid}" style="width:48px;height:48px;" onerror="this.onerror=null;this.src='http://www.xintaonet.com/discuz72/uc_server/images/noavatar_small.gif'"></a>
</td>
<td>
<p style="color: #666;font-size:12px;text-indent: 2em;">${b.message}</p> 
<table width="100%"><tr><td style="color: #AAA;font-size:12px;"><a href="http://home.xintaonet.com/space.php?uid=${b.uid}" target="_blank">${b.username}</a>&nbsp;&nbsp;&nbsp;&nbsp;发表于 ${b.dateline}</td></tr></table>
</td></tr></table>
</td></tr>
</#list>
</#if>
</table>
</td></tr>
</table>
