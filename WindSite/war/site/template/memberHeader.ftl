<#if ((versionNo??&&(versionNo>=2)))&&www??&&www!=''>
<script>function SetHome(a){var b=window.location.href;try{a.style.behavior="url(#default#homepage)";a.setHomePage(b)}catch(c){if(window.netscape){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")}catch(d){alert("\u6b64\u64cd\u4f5c\u88ab\u6d4f\u89c8\u5668\u62d2\u7edd\uff01\n\u8bf7\u5728\u6d4f\u89c8\u5668\u5730\u5740\u680f\u8f93\u5165\u201cabout:config\u201d\u5e76\u56de\u8f66\n\u7136\u540e\u5c06 [signed.applets.codebase_principal_support]\u7684\u503c\u8bbe\u7f6e\u4e3a'true',\u53cc\u51fb\u5373\u53ef\u3002")}Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch).setCharPref("browser.startup.homepage",
b)}}}function AddFavorite(a){var b=window.location.href;try{window.external.addFavorite(b,a)}catch(c){try{window.sidebar.addPanel(a,b,"")}catch(d){alert("\u52a0\u5165\u6536\u85cf\u5931\u8d25\uff0c\u8bf7\u4f7f\u7528Ctrl+D\u8fdb\u884c\u6dfb\u52a0")}}};</script>
<style>#site-nav a {color: #444;text-decoration: none;}#site-nav a:hover {color: #f60;text-decoration: underline;}</style>
<div id="site-nav-bg" style=""><div id="site-nav">
<table width="100%" height="25px" style="font-size: 9pt;">
	<tr>
		<td align="left">
		<#if MEMBER??>
		您好,${MEMBER.info.username}！<a href="/router/fanli/logout">[退出]</a>&nbsp;&nbsp;|
		<a href="http://${www}/router/fanlimember"><span>会员中心</span></a>
		<#else>
		您好,游客！
		<a href="http://${www}/router/fanli/login">[请登录]</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://${www}/router/fanli/registe">注册</a>&nbsp;&nbsp;
		</#if>
		</td>
		<td align="right"><#if topLinks??><#list topLinks as t><a href="<#if t.url?starts_with('/')>http://${www}${t.url}<#else>${t.url}</#if>" target="_blank">${t.title}</a>&nbsp;&nbsp;|&nbsp;&nbsp;</#list></#if><a href="http://${www}">购物首页</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a onclick="AddFavorite('${sitetitle}')">加入收藏</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www.jiathis.com/share/" class="jiathis" target="_blank">分享</a>
<script type="text/javascript" src="http://v2.jiathis.com/code/jia.js" charset="utf-8"></script>&nbsp;&nbsp;|&nbsp;&nbsp;<#if weibo??&&''!=weibo><a href="http://${www}/router/fanli/loginuc?redirect=http://${weibo}" target="_blank">微博广场</a>&nbsp;&nbsp;|&nbsp;&nbsp;</#if><a href="http://${www}/huabao/index.html" target="_blank">画报返利</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://${www}/tblogs/584.html" target="_blank">帮助</a></td>
	</tr>
</table></div></div>
<#else>
<script>function SetHome(a){var b=window.location.href;try{a.style.behavior="url(#default#homepage)";a.setHomePage(b)}catch(c){if(window.netscape){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")}catch(d){alert("\u6b64\u64cd\u4f5c\u88ab\u6d4f\u89c8\u5668\u62d2\u7edd\uff01\n\u8bf7\u5728\u6d4f\u89c8\u5668\u5730\u5740\u680f\u8f93\u5165\u201cabout:config\u201d\u5e76\u56de\u8f66\n\u7136\u540e\u5c06 [signed.applets.codebase_principal_support]\u7684\u503c\u8bbe\u7f6e\u4e3a'true',\u53cc\u51fb\u5373\u53ef\u3002")}Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch).setCharPref("browser.startup.homepage",
b)}}}function AddFavorite(a){var b=window.location.href;try{window.external.addFavorite(b,a)}catch(c){try{window.sidebar.addPanel(a,b,"")}catch(d){alert("\u52a0\u5165\u6536\u85cf\u5931\u8d25\uff0c\u8bf7\u4f7f\u7528Ctrl+D\u8fdb\u884c\u6dfb\u52a0")}}};</script>
<style>#site-nav a {color: #444;text-decoration: none;}#site-nav a:hover {color: #f60;text-decoration: underline;}</style>
<div id="site-nav-bg" style=""><div id="site-nav">
<table width="100%" height="25px" style="font-size: 9pt;">
	<tr>
		<td align="left">
		您好,欢迎访问！
		</td>
		<td align="right"><a href="/">购物首页</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a onclick="AddFavorite('${sitetitle}')">加入收藏</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www.jiathis.com/share/" class="jiathis" target="_blank">分享</a>
<script type="text/javascript" src="http://v2.jiathis.com/code/jia.js" charset="utf-8"></script></td>
	</tr>
</table></div></div>
</#if>
		