<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'> 
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚">
<meta name="description" content="新淘网 - 新淘网实现了多种酷炫图片组件封装，向广大普通互联网用户提供一站式的建站方案，大幅度降低建站门槛，会用鼠标就可以拖拽生成独立而漂亮的淘宝推广网站，让更多的普通互联网用户成为专业淘客、推广淘宝、赚取佣金">
<title>新淘网</title>

<#include "/site/template/import.ftl">
<script>
$(function(){
	var href= document.location.href;
	if(href.indexOf('/router/member/view/personal')!=-1){//个人
		$('#myXintao').toggleClass("selected").siblings().removeClass(
							"selected");
		document.title = "我的新淘网 - 新淘网";
	}else if(href.indexOf('router/site/coolsites')!=-1){
		$('#coolSitesMenu').toggleClass("selected").siblings().removeClass(
							"selected");
		document.title = "酷站演示 - 新淘网";
	}else if(href.indexOf('/router/site/view/about')!=-1){
		$('#aboutMenu').toggleClass("selected").siblings().removeClass(
							"selected");
		document.title = "新淘网介绍 - 新淘网";					
	}else if(href.indexOf('/router/site/view/support')!=-1){
		$('#supportMenu').toggleClass("selected").siblings().removeClass(
							"selected");
		document.title = "帮助与支持 - 新淘网";					
	}
	$('body').supersleight({shim: '/assets/min/images/blank.gif'});
	$('#functionsGuide').dialog({
		bgiframe : true,
		height : 200,
		autoOpen:false,
		width : 400,
		zIndex : 100000,
		resizable:false,
		modal : true
	});
	$('#functionsButton').click(function(){
		$('#functionsGuide').dialog('open');
	});
});
</script>
<!--<script type='text/javascript' src='http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js'></script>-->
</head>
<body>
<#if USER??&&USER.isNew==true>
<style>
.ui-dialog-titlebar{background:url(/assets/images/bg_box_title.png);}
</style>
<script>
$(function() {
	$('#guide').dialog({
		bgiframe : true,
		height : 250,
		width : 400,
		zIndex : 100000,
		resizable:false,
		modal : false
	});
	$('#guide').dialog('open');
	$('#updateIsNew').button().unbind('click').click(function(){
		var sender = new WindSender("/router/member/user/isNew/false");
	sender.load('GET', {}, function(response) {
				$('#guide').dialog('close');
			});
	});
});

</script>
<div id="guide" style="display:none;" align="center">
	<div align="center">
		<span style="font-size:11pt;font-weight:bold;color:#E65802;">您是第一次登录新淘网！</span><br/>
		<span>新淘网已经为您创建了一个新淘站，接下来您可以选择：</span>
	</div>
	<br/>
	<ul style="list-style:none;padding-left:30px;" align="left">
		<li style="margin-bottom:3px;">1.<a href="/router/member/view/personal?goto=person" style="color:#0073EA;" title="新淘网只会同步您在淘宝的公开信息">同步淘宝公开信息</a></li>
		<li style="margin-bottom:3px;">2.<a href="/router/member/view/personal?goto=sites&isUpdate=true" style="color:#0073EA;" title="淘站信息修改及站点编辑">修改新淘站基本信息</a></li>
		<li style="margin-bottom:3px;">3.<a href="/router/member/view/personal?goto=itemGroups" style="color:#0073EA;" title="打造自己的推广商品库">创建专属的推广组商品列表</a></li>
		<li style="margin-bottom:3px;">4.<a target="_blank" href="/help/demo/video.html" style="color:#0073EA;" title="学习如何建立自己的淘客推广站">查看建站演示视频</a></li>
	</ul>
	<button id="updateIsNew">不再显示向导</button>
</div>
</#if>
<#if USER??>
<div id="functionsGuide" title="功能导航" style="display:none;">
	<ul style="list-style:disc;padding-left:30px;" align="left">
		<li style="margin-bottom:3px;"><a href="/router/member/view/personal?goto=person" style="color:#0073EA;" title="新淘网只会同步您在淘宝的公开信息">同步淘宝公开信息</a></li>
		<li style="margin-bottom:3px;"><a href="/router/member/view/personal?goto=sites&isUpdate=true" style="color:#0073EA;" title="淘站信息修改及站点编辑">修改新淘站基本信息</a></li>
		<li style="margin-bottom:3px;"><a href="/router/member/view/personal?goto=itemGroups" style="color:#0073EA;" title="打造自己的推广商品库">创建专属的推广组商品列表</a></li>
		<li style="margin-bottom:3px;"><a target="_blank" href="/help/demo/video.html" style="color:#0073EA;" title="学习如何建立自己的淘客推广站">查看建站演示视频</a></li>
		<#list USER.sites as s>
			<li style="margin-bottom:3px;"><a href="/router/member/designer?siteId=${s.id}" style="color:#0073EA;" target="_blank">设计站点【${s.title}】</a></li>
		</#list>
		<div class="help-guest" align="center"><a href="" class="t_button"><span>一键建站</span></a><a href="" class="t_button"><span>论坛交流</span></a><a href="" class="t_button"><span>新淘家园</span></a></div>
	</ul>
</div>
</#if>
<div id="wrap">
	<div id="site-nav-bg">
		<div id="site-nav">
			<table width="100%" height="25px" style="font-size: 9pt;">
				<tr>
					<td align="left">
					<#if USER??>
					您好,${USER.nick}！<a href="/router/site/logout">[退出]</a>&nbsp;
					<!--|&nbsp;<a href="/router/member/view/personal">个人首页</a>-->
					<#list USER.sites as s>
						|&nbsp;<a href="/router/member/designer?siteId=${s.id}" target="_blank">设计站点【${s.title}】</a>&nbsp;
					</#list>
					<!--|&nbsp;<a href="/router/member/view/personal?goto=doctor">淘站卫士</a>&nbsp;
					|&nbsp;<a href="/router/member/view/personal?goto=friends">我的好友</a>&nbsp;
					|&nbsp;<a href="/router/member/view/personal?goto=report">收入报表</a>&nbsp;
					|&nbsp;<a href="/router/member/view/personal?goto=itemGroups">我的推广组</a>&nbsp;
					-->
					<#if USER.role=="admin">&nbsp;|&nbsp;<a href="/router/member/admin">管理员控制台</a></#if>
					<#else>
					您好,欢迎来新淘网！
					<a href="${taobaoEnv.container}&a=b">[请登录]</a>
					</#if>
					<!--|&nbsp;<a href="/router/site/onlinemembers">在线会员</a>&nbsp;
					|&nbsp;<a href="/router/site/search" target="_blank">搜索</a>-->
					</td>
					<td align="right"><img src="/assets/images/help.png"/><a href="http://www.xintaonet.com/help/index.html" target="_blank">帮助文档</a></td>
				</tr>
			</table>
		</div>
	</div>
	<div id="main" class="clearfix">
		<div id="header" align="left" style="position:relative;">
			<div style="float: left;"><a href="/"><img src="/assets/images/logo.png" style="margin-top:13px;"/></a></div>
			<ul class="index-menu ui-corner-top" style="position:absolute; right: 0px; width:795px;height:37px;margin:0px;padding:0px;padding-left:10px;top:20px;background:url(/assets/images/indexmenu.gif);background-position: 0px 0px;background-repeat: repeat-x;">
				<li class="selected"><a href="/router/site/login"><span>首页</span></a></li>
				<#if USER??>
				<li id="myXintao"><a href="/router/member/view/personal"><span>我的新淘网</span></a></li>
				</#if>
				<li id="coolSitesMenu"><a href="/router/site/coolsites"><span>酷站展示</span></a></li>
				<li id="aboutMenu"><a href="/router/site/view/about"><span>新淘网介绍</span></a></li>
				<li><a href="http://forum.xintaonet.com" target="_blank"><span>论坛交流</span></a></li>
				<li id="supportMenu"><a href="/router/site/view/support"><span>帮助与支持</span></a></li>
				<#if USER??>
				<li><a  id="functionsButton"><span>功能导航</span></a></li>
				</#if>
			</ul>
		</div>
	   	<div id="wholeBodyLay">
	   		