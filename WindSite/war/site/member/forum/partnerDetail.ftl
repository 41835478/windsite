<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'> 
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚">
<meta name="description" content="我的阵地,推广阵地大全">
<title>${forum.title}盟友-新淘网</title>

<#include "/site/template/import.ftl">
<link rel="stylesheet" type="text/css" href="/assets/min/css/widgets.css?v=${dateVersion()}">
<link rel="stylesheet" type="text/css" href="/assets/css/siteforums.css?v=${dateVersion()}">
<script>
$(function(){
	$('.addHomeFriend').click(function(){
	var self=$(this);
		addHomeFriend($(this).attr('uid'),$(this).attr('fuid'),'',function(){
			self.parent().empty().append('等待好友验证');
		});
	});
	
});
</script>
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
			      <li><a href="/router/member/forums">我的推广阵地</a></li>
			      <li class="last"><a href="/router/member/forums/market">推广阵地大全<small></small></a></li>
			    </ul>
			  </div>
			  </td></tr></table>
			</div>			
<table>
<tr>
<td style="border-left:1px solid #DDD;width:950px;" valign=top>
<table width=100% class="category-list">
<tr height="30px"><td colspan=2><strong style="font-size:14px;color:#F60;">${forum.title}的盟友详情</strong></td></tr>
<tr><td width=60px valign=top><strong>论坛阵地</strong></td><td align=left><ul><#list forums as p><li><a href="/router/member/forums/favorite/partners/${p.id}" title="所属网站:${p.siteTitle}" <#if p.id==forum.id>style="color:red;"</#if>>${p.title}(${p.favorite})</a></li></#list></td></tr>
<tr><td width=60px valign=top><strong>博客阵地</strong></td><td align=left><ul><#list blogs as p><li><a href="/router/member/forums/favorite/partners/${p.id}" title="所属网站:${p.siteTitle}" <#if p.id==forum.id>style="color:red;"</#if> >${p.title}(${p.favorite})</a></li></#list></td></tr>
<tr><td width=60px valign=top><strong>微博阵地</strong></td><td align=left><ul><#list microblogs as p><li><a href="/router/member/forums/favorite/partners/${p.id}" title="所属网站:${p.siteTitle}" <#if p.id==forum.id>style="color:red;"</#if>>${p.title}(${p.favorite})</a></li></#list></td></tr>
</table>
<table id="partnerDetail" width=100% border="0" cellspacing="1" cellpadding="4">
	<THEAD>
		<TR height=35px>
		<TH colspan=3>
			<table width=100%><tr>
			<TH align=right><#assign url='/router/member/forums/favorite/partners/'+forum.id>
			<@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount?number url=url></@ws.pager>
			</TH></tr></table>
		</TH>
		</TR>
		<TR bgcolor="#E0E0E0">
			<TH width=370px>新淘网会员</TH>
			<TH width=150px>所属网站</TH>
			<TH>类型</TH>
			<TH>家园好友</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#if partners??&&partners?size!=0>
		<#list partners as t><TR class="<#if t_index%2==0>odd<#else>even</#if>"><TD><table width=100%><tr><td width=300px><a href="/router/member/forums/favorite/detail/${t.id}" class="normal" target="_blank">${t.nick}</a></td><td align=right><a style="color:#F60;" href="/router/member/forums/favorite/detail/${t.id}">详情</a></td></tr></table></TD><TD align=center>${t.forum}</TD><TD align=center><#if '1'==t.type>论坛推广<#elseif '3'==t.type>博客推广<#elseif '4'==t.type>微博推广</#if></TD><TD align=center><#if USER.uc_id??><#if t.uc_id??><#if USER.uc_id!=t.uc_id><#if friendIds??&&friendIds?contains('['+t.uc_id+']')>我的家园好友<#elseif unFriendIds??&&unFriendIds?contains('['+t.uc_id+']')>等待好友验证<#else><a href="#" uid="${USER.uc_id}" fuid="${t.uc_id}" class="addHomeFriend">加为家园好友</a></#if><#else>本人</#if><#else>此会员尚未激活家园</#if><#else>您尚未激活家园</#if></TD></TR></#list>
	<#else>
	<TR><TD COLSPAN=5><div style="padding:20px; font-size:14px;text-align:center;">没有找到任何盟友信息</div></TD></TR></#if>	
	</TBODY>
</TABLE>
</td>
</tr></table>
<#include "/site/template/footer.ftl">