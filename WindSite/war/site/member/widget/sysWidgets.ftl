<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'> 
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚">
<meta name="description" content="我的设计,我的收藏,所有组件,组件模型">
<title>系统组件模板-新淘网</title>

<#include "/site/template/import.ftl">
<link rel="stylesheet" type="text/css" href="http://static.xintaonet.com/assets/min/css/widgets.css?v=${dateVersion()}">
<script>
$(function(){
	$('.widget-customer a').removeAttr('href');
	<#if layoutfilter??&&layoutfilter!="-1">
		$('#mysizes').val('${layoutfilter}');
	</#if>
	<#if typefilter??&&typefilter!="-1">
		$('#mytypes').val('${typefilter}');
	</#if>
	$('#mysizes').change(function(){
		document.location.href="/router/member/widget/sys?layout="+$(this).val()+"&type="+$('#mytypes').val();
	});
	$('#mytypes').change(function(){
		document.location.href="/router/member/widget/sys?layout="+$('#mysizes').val()+"&type="+$(this).val();
	});
	$('.wm_list_li').hover(function() {
				$(this).toggleClass("ui-selecting").siblings()
						.removeClass("ui-selecting");
			}, function() {
				$(this).removeClass("ui-selecting");
			});
});
</script>
<script src="/designer/assets/js/searchWidget.js?v=${dateVersion()}" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="http://static.xintaonet.com/assets/css/sitewidgets.css?v=${dateVersion()}">
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
			<div class="wm_content">
			<table width=100%><tr><td align=left valign=top>
			<div><a href="/"><img src="http://static.xintaonet.com/assets/images/logo.png"></a></div></td><td valign=bottom>
			  <div class="wm_mac_nav">
			    <ul style="width:500px">
			      <li class="first"><a href="/">新淘首页</a></li>
			      <li><a href="/router/member/widget/my">我的设计<small>(${myCount})</small></a></li>
			      <li><a href="/router/member/widget/favorite">我的收藏<small>(${favCount})</small></a></li>
			      <li><a href="/router/member/widget/market">组件超市<small>(${allCount})</small></a></li>
			      <li class="last"><a href="/router/member/widget/sys" class="current">组件模板<small>(${page.totalCount})</small></a></li>
			    </ul>
			    <div class="clearing"></div>
			  </div>
			  </td></tr></table>
			</div>
<@ws.info>
	<span>
	您可以设计的组件最高限额为
	<strong style='color:#D02200;font-weight:bold;'>${USER.limit.widgets}</strong> 件,
	您已设计 <strong style='color:#D02200;font-weight:bold;'>${myCount}</strong> 个组件！
	</span>
	<span>
	您可以收藏的组件最高限额为
	<strong style='color:#D02200;font-weight:bold;'>${USER.limit.favWidgets}</strong> 件,
	您已收藏 <strong style='color:#D02200;font-weight:bold;'>${favCount}</strong> 个组件！<a href="/router/site/view/support?type=help-customewidget" target="_blank"><strong>相关帮助</strong></a>&nbsp;&nbsp;&nbsp;<a href="/help/demo/widget/widget.html" target="_blank"><strong>观看演示视频</strong></a>
	</span>
	<br/><br/>
	<span style="color:red;">软文类型组件</span>:根据会员家园日志分类按时间顺序列出指定数量的家园日志。在家园新增，编辑，删除日志时，会自动更新该组件以及使用了该组件的站点，无需手动编辑组件内的文章列表。
</@ws.info>
			<div class="wm_wrap_filters">
			<span class="ssd_left"></span>
			<span class="ssd_right"></span>
			<div class="ssd_number">数量：${page.totalCount}个</div>
			<div class="sort_pagina">
		    	<a href="<#if (page.pageNo<page.totalPageCount)>/router/member/widget/sys?pageNo=${page.pageNo+1}&layout=${layoutfilter}&type=${typefilter}<#else>#</#if>" class="page_next <#if (page.pageNo>=page.totalPageCount)>page_next_no</#if>"></a>
    			<span class="pagina_span">${page.pageNo}/${page.totalPageCount}</span>
				<a href="<#if (page.pageNo>1)>/router/member/widget/sys?pageNo=${page.pageNo-1}&layout=${layoutfilter}&type=${typefilter}<#else>#</#if>" class="page_pre <#if !(page.pageNo>1)>page_pre_no</#if>"></a>
        	</div>
        	<div class="sort_other">按组件类型筛选:<select name="widgetTypes" id="mytypes">
        	<option value="-1" selected="selected">全部类型</option>
        	<option value="complex">混合类型</option>
        	<option value="blog">软文类型</option>
        	<option value="html">标准类型</option>
        	</select>&nbsp;
        	按布局尺寸筛选：<select name="mysizes" id="mysizes">
					<option value="-1" selected="selected">全部尺寸</option>
					<option value="0" >单栏</option>
					<option value="1" >两栏(1-3)右 </option>
					<option value="2" >三栏(1-3-1)中</option>
					<option value="3" >两栏(1-1)左/右</option>
					<option value="4" >三栏(1-1-1)左/中/右</option>
					<option value="5" >两栏(1-3)左 </option>
					<option value="6" >三栏(1-3-1)左/右</option>
					</select>
        	</div>
			</div>
			<#if widgets??&&widgets?size!=0>
				<ul class="wm_list">
				<#list widgets as w>
				 <li class="wm_list_li">
				 <div class="editor-bar" align=center>
				 	<table>
				 		<tr><td width=200px>
				 		<#if (myCount>=USER.limit.widgets)>
				 			限额不足，无法制作
				 		<#else>
				 			<a href="/router/member/designer/<#if w.type.name=='blog'>blogdesigner<#elseif w.type.name=='html'>htmldesigner<#elseif w.type.name=='search'>searchdesigner<#else>widgetdesigner</#if>/create/${w.id}" target="_blank" class="opera"></a>
				 		</#if>
				 		</td><td width=160px>布局:<a href="/router/member/widget/sys?layout=${w.layout}"><span class="k"><@ws.layout w.layout></@ws.layout></span></a></td><td>时间:${w.created}</td></tr>
				 	</table>
				 </div>
				 <div class="widget-customer" style="display:block;" align="center">${w.content}</div>
				 </li>
				 </#list>
				</ul>
			</#if>
			<#assign url='/router/member/widget/sys?layout='+layoutfilter+'&type='+typefilter>
			<@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount?number url=url></@ws.pager>
<#include "/site/template/footer.ftl">			