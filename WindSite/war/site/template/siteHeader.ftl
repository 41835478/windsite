<table width="945px" height="25px" valign="middle" style="font-size: 9pt;">
<#if ((versionNo??&&(versionNo>=2)))&&www??&&www!=''>
<script>function SetHome(a){var b=window.location.href;try{a.style.behavior="url(#default#homepage)";a.setHomePage(b)}catch(c){if(window.netscape){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")}catch(d){alert("\u6b64\u64cd\u4f5c\u88ab\u6d4f\u89c8\u5668\u62d2\u7edd\uff01\n\u8bf7\u5728\u6d4f\u89c8\u5668\u5730\u5740\u680f\u8f93\u5165\u201cabout:config\u201d\u5e76\u56de\u8f66\n\u7136\u540e\u5c06 [signed.applets.codebase_principal_support]\u7684\u503c\u8bbe\u7f6e\u4e3a'true',\u53cc\u51fb\u5373\u53ef\u3002")}Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch).setCharPref("browser.startup.homepage",
b)}}}function AddFavorite(a){var b=window.location.href;try{window.external.addFavorite(b,a)}catch(c){try{window.sidebar.addPanel(a,b,"")}catch(d){alert("\u52a0\u5165\u6536\u85cf\u5931\u8d25\uff0c\u8bf7\u4f7f\u7528Ctrl+D\u8fdb\u884c\u6dfb\u52a0")}}};</script>
<tr><td align="left">
		<#if MEMBER??>
		您好,${MEMBER.info.username}！<a href="/router/fanli/logout">[退出]</a>&nbsp;&nbsp;|
		<a href="http://${www}/router/fanlimember"><span>会员中心</span></a>
		<#else>
		您好,游客！
		<a href="http://${www}/router/fanli/login">[请登录]</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://${www}/router/fanli/registe">注册</a>&nbsp;&nbsp;
		</#if>
		</td>
		<td align="right"><#if topLinks??><#list topLinks as t><a href="<#if t.url?starts_with('/')>http://${www}${t.url}<#else>${t.url}</#if>" target="_blank">${t.title}</a>&nbsp;&nbsp;|&nbsp;&nbsp;</#list></#if><a href="http://${www}">购物首页</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#" onclick="AddFavorite('${sitetitle}')">加入收藏</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://${www}/huabao/index.html" target="_blank">画报返利</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://${www}/tblogs/584.html" target="_blank">帮助</a></td>
</tr>
<#else>
	<tr><td align="left">您好，欢迎来购物！</td><td align="right" width="50px"><a href="/router/site/shops/14?pid=${pid}" target="_blank">店铺街</a></td><td align="right" width="50px"><a href="/tblogs.html" target="_blank">资讯</a></td><td align="right" width="100px"><span id="rss" style="cursor:pointer;">订阅本店铺</span><div id="rssDialog"  style=""></div></td><td width="150px" align="right">&nbsp;&nbsp;<a href="http://www.jiathis.com/share.html" class="jiathis"><img src="http://www.jiathis.com/code/images/jiathis3.gif" width="125" height="21" border="0" id="jiathis_a"/></a></td></tr>
</#if>
</table>