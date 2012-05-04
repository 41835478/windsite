<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'> 
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚">
<meta name="description" content="我的阵地,推广阵地大全">
<title>推广阵地大全-新淘网</title>

<#include "/site/template/import.ftl">
<link rel="stylesheet" type="text/css" href="/assets/min/css/widgets.css?v=${dateVersion()}">
<script>
$(function(){
	$('.favoriteForumDelete').click(function(){
		var self=$(this);
		confirm('您确定要删除该阵地吗？删除阵地同时将删除该阵地下的帐号及文章！',function(r){
			if(r){
			deleteMyFavoriteForum(self.attr('fid'));
			}
		});
		return false;
	});
});
</script>
<link rel="stylesheet" type="text/css" href="/assets/css/siteforums.css?v=${dateVersion()}">
</head>
<body>
<div id="wrap" style="background-color: #FEFEFF;">
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
			<div><a href="/"><img src="/assets/images/logo.png"></a></div></td><td valign=bottom>
			  <div class="wm_mac_nav" align=center>
			     <ul style="width:500px">
			      <li class="first"><a href="/">新淘首页</a></li>
			      <li><a href="/router/member/forums" class="current">我的推广阵地<small>(${myFavoritedCount})</small></a></li>
			      <li class="last"><a href="/router/member/forums/market">推广阵地大全</a></li>
			    </ul>
			  </div>
			  </td></tr></table>
			</div>
<@ws.info>
	<span>
	您可以收藏的阵地最高限额为
	<strong style='color:#D02200;font-weight:bold;'>${USER.limit.favForums}</strong> 个,
	您已收藏 <strong style='color:#D02200;font-weight:bold;'>${myFavoritedCount}</strong> 个阵地！
	</span>
</@ws.info>			
<table><tr>
<td width=250px valign=top>
<dl class="categorys">
    <dd> <a id="forum" href="/router/member/forums?tid=1" <#if "1"==tid>class="selected"</#if>>论坛阵地</a><a id="blog" href="/router/member/forums?tid=3" <#if "3"==tid>class="selected"</#if>>博客阵地</a><a id="microblog" href="/router/member/forums?tid=4" <#if "4"==tid>class="selected"</#if>>微博阵地</a>
</dd>
</dl>
<td>
<td width=20px>
</td>
<td style="border-left:1px solid #DDD;width:670px;" valign=top>
<table class="wTable" id="forum-list" width=100%>
	<THEAD>
		<TR bgcolor="#E0E0E0">
			<TH width=260px>中文名称</TH>
			<TH align=left width=160px>网站</TH>
			<TH align=left width=80px>类别</TH>
			<TH>盟友</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#if forums??&&forums?size!=0>
		<#list forums as f><TR class="<#if f_index%2==0>odd<#else>even</#if>"><TD><table width=100%><tr><td width=150px><a href="${f.realUrl!f.url}" target="_blank" style="color:#00e">${f.title}</a></td><td align=right><a href="/router/member/forums/favorite/detail/${f.id}">管理</a></td><td align=right><a class="favoriteForumDelete" fid="${f.id}" href="#">删除</a></td></tr></table></TD><TD align=center>${f.siteTitle}</TD><TD align=center>${f.typeTitle}</TD><TD align=center><a class="viewPartner" href="/router/member/forums/favorite/partners/${f.forumId}">盟友(${f.favorite})</a></TD></TR></#list>
	<#else>
	<TR><TD COLSPAN=5><div style="padding:20px; font-size:14px;text-align:center;">你目前没有收藏过<#if "1"==tid>论坛<#elseif "3"==tid>博客<#elseif "4"==tid>微博</#if>推广阵地，到<a href="/router/member/<#if "1"==tid>forums<#elseif "3"==tid>blogforums<#elseif "4"==tid>microblogforums<#else>forums</#if>/market" style="font-size:14px;">推广大全</a>去挑一个收藏吧。</div></TD></TR></#if>	
	</TBODY>
	</TABLE>
</td>
</tr></table>
<#include "/site/template/footer.ftl">			