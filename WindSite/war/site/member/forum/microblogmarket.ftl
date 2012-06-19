<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'> 
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚">
<meta name="description" content="我的阵地,推广阵地大全">
<title>微博大全-新淘网</title>

<#include "/site/template/import.ftl">
<link rel="stylesheet" type="text/css" href="http://static.xintaonet.com/assets/min/css/widgets.css?v=${dateVersion()}">
<script>
$(function(){
	$('.favoriteForum').click(function(){
		var self = $(this);
		addMyFavoriteForum($(this).attr('fid'),'4',function(){
			self.parent().empty().append('已收藏');
		});
		return false;
	});
});
</script>
<link rel="stylesheet" type="text/css" href="http://static.xintaonet.com/assets/css/siteforums.css?v=${dateVersion()}">
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
			<div><a href="/"><img src="http://static.xintaonet.com/assets/images/logo.png"></a></div></td><td valign=bottom>
			  <div class="wm_mac_nav" align=center>
			     <ul style="width:500px">
			      <li class="first"><a href="/">新淘首页</a></li>
			      <li><a href="/router/member/forums">我的推广阵地<small>(${myFavoritedCount})</small></a></li>
			      <li class="last"><a href="/router/member/forums/market" class="current">推广阵地大全<small>(${forums1?size+forums2?size+forums3?size})</small></a></li>
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
    <dd> <a id="forum" href="/router/member/forums/market">论坛阵地</a><a id="blog" href="/router/member/blogforums/market">博客阵地</a><a id="microblog" href="/router/member/microblogforums/market" class="selected" >微博阵地</a>
</dd>
</dl>
<td>
<td width=20px>
</td>
<td style="border-left:1px solid #DDD;width:670px;" valign=top>
<table id="forum-list" width=100% border="0" cellspacing="1" cellpadding="4" style="background-color:#C5D5C5;">
	<TBODY>
	<tr><td bgcolor="F2FDE6" align="center" colspan=3><strong>门户微博</strong></td></tr>
	<#if forums1??&&forums1?size!=0>
		<#list forums1 as f>
		<#if f_index%3==0>
		<tr align="center" bgcolor="FBFCF1">
		</#if>
		<td align="center"><table width=100%><tr><td width=100px><a href="${f.realUrl!f.url}" target="_blank">${f.title}</a></td><td align=right><#if myFavorited??&&(myFavorited?contains(f.id))>已收藏<#else><a class="favoriteForum" href="#" fid="${f.id}">收藏</a></#if></td><td align=right><a class="viewPartner" href="/router/member/forums/favorite/partners/${f.id}">盟友(${f.favorite})</a></td></tr></table></td>
		<#if f_index%3==2>
		</tr>
		<#elseif !f_has_next><#list 1..(3-forums1?size%3) as i><td></td></#list></tr>
		</#if>
		</#list>
	</#if>
	<tr><td bgcolor="F2FDE6" align="center" colspan=3><strong>校园微博</strong></td></tr>
	<#if forums2??&&forums2?size!=0>
		<#list forums2 as f>
		<#if f_index%3==0>
		<tr align="center" bgcolor="FBFCF1">
		</#if>
		<td align="center"><table width=100%><tr><td width=100px><a href="${f.realUrl!f.url}" target="_blank">${f.title}</a></td><td align=right><#if myFavorited??&&(myFavorited?contains(f.id))>已收藏<#else><a class="favoriteForum" href="#" fid="${f.id}">收藏</a></#if></td><td align=right><a class="viewPartner" href="/router/member/forums/favorite/partners/${f.id}">盟友(${f.favorite})</a></td></tr></table></td>
		<#if f_index%3==2>
		</tr>
		<#elseif !f_has_next><#list 1..(3-forums2?size%3) as i><td></td></#list></tr>
		</#if>
		</#list>
	</#if>
	<tr><td bgcolor="F2FDE6" align="center" colspan=3><strong>购物微博</strong></td></tr>
	<#if forums3??&&forums3?size!=0>
		<#list forums3 as f>
		<#if f_index%3==0>
		<tr align="center" bgcolor="FBFCF1">
		</#if>
		<td align="center"><table width=100%><tr><td width=100px><a href="${f.realUrl!f.url}" target="_blank">${f.title}</a></td><td align=right><#if myFavorited??&&(myFavorited?contains(f.id))>已收藏<#else><a class="favoriteForum" href="#" fid="${f.id}">收藏</a></#if></td><td align=right><a class="viewPartner" href="/router/member/forums/favorite/partners/${f.id}">盟友(${f.favorite})</a></td></tr></table></td>
		<#if f_index%3==2>
		</tr>
		<#elseif !f_has_next><#list 1..(3-forums3?size%3) as i><td></td></#list></tr>
		</#if>
		</#list>
	</#if>
	<tr><td bgcolor="F2FDE6" align="center" colspan=3><strong>亲子微博</strong></td></tr>
	<#if forums4??&&forums4?size!=0>
		<#list forums4 as f>
		<#if f_index%3==0>
		<tr align="center" bgcolor="FBFCF1">
		</#if>
		<td align="center"><table width=100%><tr><td width=100px><a href="${f.realUrl!f.url}" target="_blank">${f.title}</a></td><td align=right><#if myFavorited??&&(myFavorited?contains(f.id))>已收藏<#else><a class="favoriteForum" href="#" fid="${f.id}">收藏</a></#if></td><td align=right><a class="viewPartner" href="/router/member/forums/favorite/partners/${f.id}">盟友(${f.favorite})</a></td></tr></table></td>
		<#if f_index%3==2>
		</tr>
		<#elseif !f_has_next><#list 1..(3-forums4?size%3) as i><td></td></#list></tr>
		</#if>
		</#list>
	</#if>
	</TBODY>
	<tr><td bgcolor="F2FDE6" align="center" colspan=3><strong>IT微博</strong></td></tr>
	<#if forums5??&&forums5?size!=0>
		<#list forums5 as f>
		<#if f_index%3==0>
		<tr align="center" bgcolor="FBFCF1">
		</#if>
		<td align="center"><table width=100%><tr><td width=100px><a href="${f.realUrl!f.url}" target="_blank">${f.title}</a></td><td align=right><#if myFavorited??&&(myFavorited?contains(f.id))>已收藏<#else><a class="favoriteForum" href="#" fid="${f.id}">收藏</a></#if></td><td align=right><a class="viewPartner" href="/router/member/forums/favorite/partners/${f.id}">盟友(${f.favorite})</a></td></tr></table></td>
		<#if f_index%3==2>
		</tr>
		<#elseif !f_has_next><#list 1..(3-forums5?size%3) as i><td></td></#list></tr>
		</#if>
		</#list>
	</#if>
	</TBODY>
	<tr><td bgcolor="F2FDE6" align="center" colspan=3><strong>旅游微博</strong></td></tr>
	<#if forums6??&&forums6?size!=0>
		<#list forums6 as f>
		<#if f_index%3==0>
		<tr align="center" bgcolor="FBFCF1">
		</#if>
		<td align="center"><table width=100%><tr><td width=100px><a href="${f.realUrl!f.url}" target="_blank">${f.title}</a></td><td align=right><#if myFavorited??&&(myFavorited?contains(f.id))>已收藏<#else><a class="favoriteForum" href="#" fid="${f.id}">收藏</a></#if></td><td align=right><a class="viewPartner" href="/router/member/forums/favorite/partners/${f.id}">盟友(${f.favorite})</a></td></tr></table></td>
		<#if f_index%3==2>
		</tr>
		<#elseif !f_has_next><#list 1..(3-forums6?size%3) as i><td></td></#list></tr>
		</#if>
		</#list>
	</#if>
	</TBODY>
	</TABLE>
</td>
</tr></table>
<#include "/site/template/footer.ftl">			