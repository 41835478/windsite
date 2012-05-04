<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>链接管理-返利管理-我是淘客-新淘网</title>
<style>
</style>
</@ws.header>
<script src="/assets/min/js/fanli.min.js?v=${dateVersion()}" type="text/javascript"></script>
<script>
$(function(){
	initLinks();
});
</script>
<link rel="stylesheet" href="/assets/min/css/fanli.css?v=${dateVersion()}" type="text/css"/>
<style>.nBox {margin-bottom: 15px;}.nBox .links-head {cursor:pointer;background: #5DAE40;border:1px solid #8AB78A;height: 20px;padding: 4px 14px 4px 9px;}.nBox .links-head .title {color:white;float: left;height: 20px;margin-right: 5px;overflow: hidden;font-size: 14px;font-weight: bold;}.nBox .links-head span{float:left;}
.nBox .links-head .title a{color:red;}.nBox .links-head .title a:hover{color:#333;}
.shortcut-rows{background-color: white;border-bottom: 1px dotted #CCC;clear: both;float: left;margin: 0px 0px 5px;overflow: hidden;position: relative;width: 746px;}
.shortcut-rows h4 {padding: 5px 8px;height:80px;background: url(/assets/images/cat.png) repeat-y 0px 0px;background-color: #F3F7F9;background-position: 0% 50%;background-repeat: repeat-y;border: 1px solid #CCE3F1;clear: left;float: left;font-size: 14px;margin: 0px 8px 0px 0px;overflow: hidden;width: 12px;}
.shortcut-rows ul {height:80px;float: left;margin: 0px;overflow: hidden;padding-top: 5px;width: 708px;}.shortcut-rows ul li{float: left;line-height: 18px;margin-right: 20px;overflow: hidden;padding: 5px 0px 0px;white-space: nowrap;display:inline;}.shortcut-rows li a{color: #04D;font-size: 12px;}
#operate-overlay{display:none;width:400px;border:6px solid #666;border:6px solid rgba(82, 82, 82, 0.698);-moz-border-radius:8px;-webkit-border-radius:8px;}#operate-overlay h2 {color:#fff;background-color:#6D84B4;padding:5px 10px;border:1px solid #3B5998;font-size:20px;}
.wTable td, .wTable th {height: 30px;line-height: 14px;}
</style>
<@xt.taoketemplate navselected='taoke' bdselected='site-links' group=1>
<div id="operate-overlay"><h2>正在操作中,请稍候...</h2></div>
<#assign site = USER.sites[0]>
<div id="links">
<div class="nBox">
	<div class="links-head"><span class="ui-state-default ui-icon ui-icon-minusthick"></span><h3 class="title">全站友情链接<#if friends??&&friends?size<20>&nbsp;&nbsp;[&nbsp;<a class="createLink" t="F">新增友情链接</a>&nbsp;]&nbsp;</#if></h3></div>
	<div class="links-body"><table class="wTable" width=100%>
	<#if friends??&&friends?size!=0><#list friends as l><#assign url=''><#if l.url?starts_with('/')><#assign url='http://'+site.www+l.url><#else><#assign url=l.url></#if><tr class="<#if l_index%2==0>odd<#else>even</#if>"><td width=50px>${l.sortOrder}</td><td width=200px><a href="${url}" style="color:#347ABA" target="_blank">${l.title}</a></td><td width=400px>${url}</td><td><a class="modify-link" lid="${l.id}" t="${l.type}">编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="delete-link" lid="${l.id}" t="${l.type}">删除</a></td></tr></#list><#else><tr><td colspan=4 align=center>您尚未配置全站友情链接</td></tr></#if></table></div>
	<@ws.help><h3>1.什么是全站友情链接？</h3><p>全站友情链接位于您站点任何一个页面的底部，方便您与其他站点交换链接。目前友情链接限额为20个，如果您没有配置自己的友情链接，底部将显示新淘网链接及版权说明</P></@ws.help>
</div>
<!--<div class="nBox">
	<div class="links-head"><span class="ui-state-default ui-icon ui-icon-minusthick"></span><h3 class="title">全站购物导航<#if navs??&&navs?size<10>&nbsp;&nbsp;[&nbsp;<a class="createLink" t="N">新增购物导航</a>&nbsp;]&nbsp;</#if></h3></div>
	<div class="links-body"><table class="wTable" width=100%>
	<#if navs??&&navs?size!=0><#list navs as l><#assign url=''><#if l.url?starts_with('/')><#assign url='http://'+site.www+l.url><#else><#assign url=l.url></#if><tr class="<#if l_index%2==0>odd<#else>even</#if>"><td width=50px>${l.sortOrder}</td><td width=200px><a href="${url}" style="color:#347ABA" target="_blank">${l.title}</a></td><td width=400px>${url}</td><td><a class="modify-link" lid="${l.id}" t="${l.type}">编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="delete-link" lid="${l.id}" t="${l.type}">删除</a></td></tr></#list><#else><tr><td colspan=4 align=center>您尚未配置会员中心导航</td></tr></#if></table></div>
	<@ws.help><h3>1.什么是全站购物导航？</h3><p>全站购物导航位于您站点任何一个页面的顶部菜单，方便买家导航至其他购物页面。目前购物导航限额为10个，如果您没有配置自己的购物导航，将显示淘宝网各个频道导航</P></@ws.help>
</div>
<div class="nBox">
	<div class="links-head"><span class="ui-state-default ui-icon ui-icon-minusthick"></span><h3 class="title">站点顶部工具条<#if tops??&&tops?size<5>&nbsp;&nbsp;[&nbsp;<a class="createLink" t="T">新增工具条</a>&nbsp;]&nbsp;</#if></h3></div>
	<div class="links-body"><table class="wTable" width=100%>
	<#if tops??&&tops?size!=0><#list tops as l><#assign url=''><#if l.url?starts_with('/')><#assign url='http://'+site.www+l.url><#else><#assign url=l.url></#if><tr class="<#if l_index%2==0>odd<#else>even</#if>"><td width=50px>${l.sortOrder}</td><td width=200px><a href="${url}" style="color:#347ABA" target="_blank">${l.title}</a></td><td width=400px>${url}</td><td><a class="modify-link" lid="${l.id}" t="${l.type}">编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="delete-link" lid="${l.id}" t="${l.type}">删除</a></td></tr></#list><#else><tr><td colspan=4 align=center>您尚未配置站点顶部导航</td></tr></#if></table></div>
	<@ws.help><h3>1.什么是站点顶部工具条？</h3><p>站点顶部工具条位于您站点任何一个页面的顶部右侧，目前工具条限额为5个，如果您没有配置自己的工具条，将默认显示购物首页及帮助链接</P></@ws.help>
</div>-->
</div>
</@xt.taoketemplate>
