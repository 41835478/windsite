<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'> 
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚">
<meta name="description" content="我的设计,我的收藏,所有组件,组件模型">
<title>新淘组件设计大侠排行-新淘网</title>

<#include "/site/template/import.ftl">
<link rel="stylesheet" type="text/css" href="http://static.xintaonet.com/assets/min/css/widgets.css">
<link rel="stylesheet" type="text/css" href="http://static.xintaonet.com/assets/css/sitewidgets.css">
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
			<table width=100%>
			<tr>
			<td align=left valign=top>
			<div><a href="/"><img src="http://static.xintaonet.com/assets/images/logo.png"></a></div></td><td valign=bottom>
			  <div class="wm_mac_nav" align=center>
			    <ul style="width:400px">
			      <li class="first"><a href="/router/member/widget/hotdesigners" class="current">组件大师排行</a></li>
			      <li><a href="/router/member/widget/designers">组件设计师名录</a></li>
			    </ul>
			  </div>
			</td>
			</tr></table>
			</div>
			<div class="clearing"></div>
			<div class="wm_wrap">
				<#if designers??>
				<ul class="designer_list">
				<#list designers as d>
				<li>
					<a class="designer_img" href="/router/member/widget/designers/${d.user_id}" title="${d.nick}">
						<img src="http://www.xintaonet.com/discuz72/uc_server/avatar.php?uid=${d.uc_id}">
					</a>
			<a href="/router/member/widget/designers/${d.user_id}">${d.nick}</a><br>
			作品：${d.widgets}个 <br>
			使用人气：${d.used}<br>
			收藏人气：${d.favorite}<br>
			</li>
				</#list>
				</ul>
				</#if>
			</div>
			
<#include "/site/template/footer.ftl">			