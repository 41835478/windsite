<table align="center">
	<tr>
		<td align="center" width="100%">
		<#if versionNo??&&(versionNo>=2)&&www??&&www!=''&&friendLinks??&&friendLinks?size!=0><#list friendLinks as t><a target="_blank" href="<#if t.url?starts_with('/')>http://${www}${t.url}<#else>${t.url}</#if>">${t.title}</a>&nbsp;&nbsp;&nbsp;<#if t_index==9><br/></#if></#list>
			<#else>
			<a href="http://www.xintaonet.com">新淘网</a>&nbsp;&nbsp;&nbsp;
			<a href="http://www.xintaonet.com">广告服务</a>&nbsp;&nbsp;&nbsp;
			<a href="http://www.xintaonet.com/router/site/view/about">关于我们</a>&nbsp;&nbsp;&nbsp;
			<a href="http://www.xintaonet.com/router/site/view/support">联系我们</a>&nbsp;&nbsp;&nbsp;
			Powered by <a href="http://www.xintaonet.com" target="_blank">www.xintaonet.com</a>&nbsp;&nbsp;&nbsp;
		</#if>
		</td>
	</tr>
	<script>
	$(function() {
		var href = window.location.href;
		var check = href.match(/check=mm_\d{0,24}_\d{0,24}_\d{0,24}/i);
		if (check != null) {
			var reg = /mm_\d{0,24}_\d{0,24}_\d{0,24}/gi;
			if (check[0] && reg.test(check[0])) {//如果是检测PID
				checkPID(check[0].replace('check=', ''));
			}
		}
	});
</script>
</table>