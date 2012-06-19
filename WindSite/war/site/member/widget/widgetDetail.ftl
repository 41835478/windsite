<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'> 
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚">
<meta name="description" content="我的设计,我的收藏,所有组件,组件模型">
<title>${widget.name}-新淘网</title>

<#include "/site/template/import.ftl">
<script src="/assets/js/site/sitewidgets.js?v=${dateVersion()}" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="http://static.xintaonet.com/assets/min/css/widgets.css?v=${dateVersion()}">
<link rel="stylesheet" type="text/css" href="http://static.xintaonet.com/assets/css/sitewidgets.css?v=${dateVersion()}">
<script>
$(function(){
	$('#hot_history').tabs();
	getUsedHistoryListImpl(1);
	getFavoriteHistoryListImpl(1);
});
function getUsedHistoryListImpl(pageNo){
getUsedHistoryList('${widget.id}',pageNo);
}
function getFavoriteHistoryListImpl(pageNo){
getFavoriteHistoryList('${widget.id}',pageNo);
}
</script>
<script src="/designer/assets/js/searchWidget.js?v=${dateVersion()}" type="text/javascript"></script>
</head>
<body>
<div id="wrap" style="background-color: #F5F6F7;">
	<div id="site-nav-bg">
		<div id="site-nav">
			<table width="100%" height="25px" style="font-size: 9pt;">
				<tr>
					<td align="left">
					<#if USER??>
					您好,${USER.nick}！<a href="/router/site/logout">[退出]</a>&nbsp;
					<#list USER.sites as s>
						|&nbsp;<a href="/router/member/designer?siteId=${s.id}" target="_blank">设计站点【${s.title}】</a>&nbsp;
					</#list>
					<#if USER.role=="admin">&nbsp;|&nbsp;<a href="/router/member/admin">管理员控制台</a></#if>
					<#else>
					您好,欢迎来新淘网！
					<a href="${taobaoEnv.container}">[请登录]</a>
					</#if>
					</td>
					<td align="right">
					<a href="/router/site/loginuc?redirect=http://home.xintaonet.com" target="_blank"><span>新淘家园</span></a>&nbsp&nbsp|
					<a href="/router/site/loginuc?redirect=http://forum.xintaonet.com" target="_blank"><span>论坛交流</span></a>&nbsp&nbsp|
					<a href="/router/site/view/support">帮助中心</a>&nbsp;&nbsp;&nbsp;官方QQ群:119459960</td>
					
				</tr>
			</table>
		</div>
	</div>
	<div id="main" class="clearfix">
	   	<div id="wholeBodyLay">
			<div class="wm_content" align=center>
			<table width=100%><tr><td align=left valign=top>
			<div><a href="/"><img src="http://static.xintaonet.com/assets/images/logo.png"></a></div></td><td valign=bottom>
			  <div class="wm_mac_nav" align=center>
			    <ul style="width:500px">
			      <li class="first"><a href="/">新淘首页</a></li>
			      <li><a href="/router/member/widget/my">我的设计<small>(${myCount})</small></a></li>
			      <li><a href="/router/member/widget/favorite">我的收藏<small>(${favCount})</small></a></li>
			      <li><a href="/router/member/widget/market">组件超市<small>(${allCount})</small></a></li>
			      <li class="last"><a href="/router/member/widget/sys">组件模板<small>(${sysCount})</small></a></li>
			    </ul>
			  </div>
			   </td></tr></table>
			</div>
			<div class="clearing"></div>
<@ws.info>
	<span>
	您可以设计的组件最高限额为
	<strong style='color:#D02200;font-weight:bold;'>${USER.limit.widgets}</strong> 件,
	您已设计 <strong style='color:#D02200;font-weight:bold;'>${myCount}</strong> 个组件！
	</span>
	<span>
	您可以收藏的组件最高限额为
	<strong style='color:#D02200;font-weight:bold;'>${USER.limit.favWidgets}</strong> 件,
	您已收藏 <strong style='color:#D02200;font-weight:bold;'>${favCount}</strong> 个组件！
	</span>
</@ws.info>
<div class="site_map" style="margin: 10px auto;width: 950px;">
<a href="/router/member/widget/designers/${widget.createdBy}">${widget.nick}</a> &gt; ${widget.name}
</div>
		<div class="editor-bar" align=center>
		 	<ul class="wm_list_tools" style="width:650px;">
			 	<li><a class="w-commission w-viewcommission" title="只有店铺和商品可以查看到佣金"  href="#" cwid="${widget.id}"></a></li>
			 	<li><#if widget.createdBy==USER.user_id>
				 		<a href="/router/member/designer/<#if widget.widget.type.name=='blog'>blogdesigner<#elseif widget.widget.type.name='html'>htmldesigner<#elseif widget.widget.type.name='search'>searchdesigner<#else>widgetdesigner</#if>/update/${widget.id}" target="_blank" class="w-modifywidget"></a>
				 	<#else>
					 	<#if myFavorited??&&(myFavorited?contains(widget.id))>
					 		已收藏
					 	<#else>
					 		<#if (favCount>=USER.limit.favWidgets)>
					 			限额不足，无法收藏
					 		<#else>
					 			<a class="w-addfav" href="#" cwid="${w.id}"></a>
					 		</#if>
					 	</#if>
				 	</#if></li>
			 	<li>被使用数量:<span class="k">${widget.used!'0'}</span></li>
			 	<li>被收藏数量:<span class="k">${widget.favorite!'0'}</span></li>
			 	<li>更新时间:<span class="k" title="${widget.widgetUpdated!widget.created}">${dateDiff(widget.widgetUpdated!widget.created)}</span></li>
		 	</ul>
			<p style="line-height: 18px;text-align: center;display:block;margin-bottom:10px;">
			 	组件名称：<span class="k">${widget.name}</span>　  　 　  　 
			            适合投放：<#if widget.cat??><span class="k">${widget.cat.name}</span></#if>　  　 
			            布局:<span class="k"><@ws.layout widget.layout></@ws.layout></span>　  　 
			            作者：<a href="/router/member/widget/designers/${widget.createdBy}">${widget.nick}</a>
			</p>
		</div>
		<div class="widget-customer" cwid="${widget.id}"  style="display:block;" align="center">${widget.content}</div>
		<div id="hot_history" style="width:100%">
			<ul><li><a href="#usedHistory">最新使用记录</a></li><li><a href="#favoriteHistory">最新收藏记录</a></li></ul>
	<TABLE id="usedHistory"  width="100%" border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=150px align="left">会员昵称</TH>
			<TH width=150px align="center">使用时间</TH>
			<TH width=150px align="center">是否接受自动更新</TH>
			<TH width=300px align="left">所在页面</TH>
		</TR>
	</THEAD>
	<TBODY id="usedHistoryList">
	</TBODY>
	</TABLE>
	<TABLE id="favoriteHistory"  width="100%" border="0" cellspacing="1" cellpadding="1">
	<THEAD>
	<TR>
		<TH width=150px align="left">会员昵称</TH>
		<TH width=750px align="center">收藏时间</TH>
	</TR>		
	</THEAD>
	<TBODY id="favoriteHistoryList">
	</TBODY>
	</TABLE>
		</div>
<#include "/site/template/footer.ftl">			