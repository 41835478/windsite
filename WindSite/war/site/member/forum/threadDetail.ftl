<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'> 
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚">
<meta name="description" content="我的阵地,推广阵地大全">
<title>${favforum.forum.title}-新淘网</title>

<#include "/site/template/import.ftl">
<link rel="stylesheet" type="text/css" href="/assets/min/css/widgets.css?v=${dateVersion()}">
<script src="/assets/js/jquery/tools/dateinput.min.js" type="text/javascript"></script>
<script>
$(function(){
	//$('#detail-content').tabs().show();
	$('#addThread').button().click(function(){
		
			addDialogThread('${favforum.id}','add','新增【${favforum.forum.title}】下的推广记录');
		
	});
	$('.modifyThread-a').click(function(){
		addDialogThread($(this).attr('tid'),'update','编辑【'+$(this).attr('ttitle')+'】推广记录');
		return false;
	});
	$('.deleteThread-a').click(function(){
	var self=$(this);
		confirm('您确认要删除该条推广记录吗？',function(r){
			if(r){
				deleteThread(self.attr('tid'));
			}
		});
		return false;
	});
	$.tools.dateinput.localize("zh-CN",  {
	 	months: 		 '1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月', 
		shortMonths: '1,2,3,4,5,6,7,8,9,10,11,12',  
		days: 		 '星期日,星期一,星期二,星期三,星期四,星期五,星期六', 
		shortDays: 	 '日,一,二,三,四,五,六'	  
	});
	$('#date').dateinput({lang: 'zh-CN', format: 'yyyy-mm-dd'}).val('${date}');
	$('#select').button().click(function(){
		var date = $('#date').val(); 
		if(!date||date.length==0){
			alert('未选择要查询的日期');return;
		}
		document.location.href="/router/member/forums/favorite/detail/${favforum.id}?date="+date;
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
			      <li><a href="/router/member/forums">我的推广阵地</a></li>
			      <li class="last"><a href="/router/member/forums/market">推广阵地大全<small></small></a></li>
			    </ul>
			  </div>
			  </td></tr></table>
			</div>			
<table>
<tr><td><a href="<#if USER.user_id==favforum.createdBy>/router/member/forums?tid=${favforum.type}<#else>/router/member/forums/favorite/partners/${favforum.forum.id}</#if>"><strong style="font-size:14px;color:#F60;">返回</strong></a> > <strong style="font-size:14px;">${favforum.nick}</strong></td></tr>
<tr>
<td style="border-left:1px solid #DDD;width:950px;" valign=top>
<table width=100% class="category-list">
<tr height="30px"><td colspan=2><strong style="font-size:14px;color:#F60;">${favforum.nick}-${favforum.forum.title}推广详情</strong></td></tr>
<tr><td width=60px valign=top><strong>论坛阵地</strong></td><td align=left><ul><#list forums as p><li><a href="/router/member/forums/favorite/detail/${p.id}" title="所属网站:${p.siteTitle}" <#if p.id==favforum.id>style="color:red;"</#if>>${p.title}(${p.threads!'0'})</a></li></#list></td></tr>
<tr><td width=60px valign=top><strong>博客阵地</strong></td><td align=left><ul><#list blogs as p><li><a href="/router/member/forums/favorite/detail/${p.id}" title="所属网站:${p.siteTitle}" <#if p.id==favforum.id>style="color:red;"</#if> >${p.title}(${p.threads!'0'})</a></li></#list></td></tr>
<tr><td width=60px valign=top><strong>微博阵地</strong></td><td align=left><ul><#list microblogs as p><li><a href="/router/member/forums/favorite/detail/${p.id}" title="所属网站:${p.siteTitle}" <#if p.id==favforum.id>style="color:red;"</#if>>${p.title}(${p.threads!'0'})</a></li></#list></td></tr>
</table>
<table width=100% class="table-normal"><tr><TH align=left><#if USER.user_id==favforum.createdBy><button id="addThread">新增推广记录</button></#if></TH>
			<TH align=left width=350px>日期：<input type="text" id="date"><button id="select">&nbsp;&nbsp;查询</button></TH>
			<TH align=right><#assign url='/router/member/forums/favorite/detail/'+favforum.id>
			<@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount?number url=url></@ws.pager>
</TH></tr>
</table>
<table id="threadDetail" class="wTable" width=100% border="0" cellspacing="1" cellpadding="4">
	<THEAD>
		<TR bgcolor="#E0E0E0">
			<TH width=370px>标题</TH>
			<TH width=150px>发表人</TH>
			<TH width=150px>所属网站</TH>
			<TH width=80px>类型</TH>
			<TH>发表日期</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#if threads??&&threads?size!=0>
		<#list threads as t><TR class="<#if t_index%2==0>odd<#else>even</#if>"><TD><table width=100%><tr><td width=300px><a href="${t.url}" class="normal" target="_blank">${t.title}</a></td><#if USER.user_id==t.user_id><td align=right><a tid="${t.id}" ttitle="${t.title}" class="modifyThread-a" href="#">编辑</a></td><td align=right><a tid="${t.id}" class="deleteThread-a" href="#">删除</a></td></#if></tr></table></TD><TD align=center>${t.account}</TD><TD align=center>${t.forum}</TD><TD align=center><#if '1'==t.type>论坛推广<#elseif '3'==t.type>博客推广<#elseif '4'==t.type>微博推广</#if></TD><TD align=center>${t.createdDate}</TD></TR></#list>
	<#else>
	<TR><TD COLSPAN=5><div style="padding:20px; font-size:14px;text-align:center;">没有找到任何推广记录</div></TD></TR></#if>	
	</TBODY>
</TABLE>
</td>
</tr>
<tr><td>
<@ws.help>
		<h3>1.什么是推广记录？</h3>
		<p>推广记录是指您在各个论坛，博客，社区做淘宝客推广时发布的日志/帖子，回复/评论，您可以在新淘网中记录这些推广。</P>
		<h3>2.记录推广记录有什么用？</h3>
		<p>通过记录推广，您以后可以方便的查找自己做的推广，并且在您新增记录的同时会在新淘家园发布一条推广动态，让更多的家园好友来关注您的推广。</P>
		</@ws.help>
</td></tr>
</table>
<#include "/site/template/footer.ftl">