<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'> 
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚">
<meta name="description" content="我的设计,我的收藏,所有组件,组件模型">
<title>我收藏的组件设计-新淘网</title>

<#include "/site/template/import.ftl">
<script src="/assets/js/site/sitewidgets.js?v=${dateVersion()}" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="http://static.xintaonet.com/assets/min/css/widgets.css?v=${dateVersion()}">
<script>
$(function(){
	<#if layoutfilter??&&layoutfilter!="-1">
		$('#mysizes').val('${layoutfilter}');
	</#if>
	<#if typefilter??&&typefilter!="-1">
		$('#mytypes').val('${typefilter}');
	</#if>
	<#if cidfilter??&&cidfilter!="0">
		$('#mycats').val('${cidfilter}');
	</#if>
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
			<div class="wm_content" align=center>
			<table width=100%><tr><td align=left valign=top>
			<div><a href="/"><img src="http://static.xintaonet.com/assets/images/logo.png"></a></div></td><td valign=bottom>
			  <div class="wm_mac_nav" align=center>
			     <ul style="width:500px">
			      <li class="first"><a href="/">新淘首页</a></li>
			      <li><a href="/router/member/widget/my">我的设计<small>(${myCount})</small></a></li>
			      <li><a href="/router/member/widget/favorite" class="current">我的收藏<small>(${page.totalCount})</small></a></li>
			      <li><a href="/router/member/widget/market">组件超市<small>(${allCount})</small></a></li>
			      <li class="last"><a href="/router/member/widget/sys">组件模板<small>(${sysCount})</small></a></li>
			    </ul>
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
	您已收藏 <strong style='color:#D02200;font-weight:bold;'>${page.totalCount}</strong> 个组件！<a href="/router/site/view/support?type=help-customewidget" target="_blank"><strong>相关帮助</strong></a>&nbsp;&nbsp;&nbsp;<a href="/help/demo/widget/widget.html" target="_blank"><strong>观看演示视频</strong></a>
	</span>
	<br/><br/>
	<span style="color:red;">软文类型组件</span>:根据会员家园日志分类按时间顺序列出指定数量的家园日志。在家园新增，编辑，删除日志时，会自动更新该组件以及使用了该组件的站点，无需手动编辑组件内的文章列表。
</@ws.info>			
<input type="hidden" id="pageNoHidden" value="${page.pageNo}">
<input type="hidden" id="sortOrderHidden" value="${sortOrder}">
	<div class="search_sort_div">
      <ul class="search_sort_ul">
        <li	<#if sortOrder=="widgetUpdated_desc">class="current"</#if>><a href="/router/member/widget/favorite?q=${q}&pageNo=${page.pageNo}&layout=${layoutfilter}&type=${typefilter}&cid=${cidfilter}&sortOrder=widgetUpdated_desc">更新时间排行</a></li>
        <li	<#if sortOrder=="favorite_desc">class="current"</#if>><a href="/router/member/widget/favorite?q=${q}&pageNo=${page.pageNo}&layout=${layoutfilter}&type=${typefilter}&cid=${cidfilter}&sortOrder=favorite_desc"><i class="ssu_pj_i"></i>收藏排行</a></li>
        <li	<#if sortOrder=="used_desc">class="current"</#if>><a href="/router/member/widget/favorite?q=${q}&pageNo=${page.pageNo}&layout=${layoutfilter}&type=${typefilter}&cid=${cidfilter}&sortOrder=used_desc"><i class="ssu_rq_i"></i>使用排行</a></li>
      </ul>
      <div class="wm_search">
		<input type="text" id="wm_search_input" class="wm_search_input" size="50" onfocus="if(this.value=='输入组件名称')this.value='';" value="<#if q??&&q!="">${q}<#else>输入组件名称</#if>" onblur="if(this.value=='')this.value='输入组件名称';">
		<a class="wm_search_but" id="wm_search_but"></a>
      </div>
      <div class="clearing"></div>	
			<div class="wm_wrap_filters">
			<span class="ssd_left"></span>
			<span class="ssd_right"></span>
			<div class="ssd_number">数量：${page.totalCount}个</div>
			<div class="sort_pagina">
		    	<a href="<#if (page.pageNo<page.totalPageCount)>/router/member/widget/favorite?q=${q}&pageNo=${page.pageNo+1}&layout=${layoutfilter}&type=${typefilter}&cid=${cidfilter}&sortOrder=${sortOrder}<#else>#</#if>" class="page_next <#if (page.pageNo>=page.totalPageCount)>page_next_no</#if>"></a>
    			<span class="pagina_span">${page.pageNo}/${page.totalPageCount}</span>
				<a href="<#if (page.pageNo>1)>/router/member/widget/favorite?q=${q}&pageNo=${page.pageNo-1}&layout=${layoutfilter}&type=${typefilter}&cid=${cidfilter}&sortOrder=${sortOrder}<#else>#</#if>" class="page_pre <#if !(page.pageNo>1)>page_pre_no</#if>"></a>
        	</div>
        	<div class="sort_other">按组件类型筛选:<select name="widgetTypes" id="mytypes">
        	<option value="-1" selected="selected">全部类型</option>
        	<option value="complex" title="组件内容涵盖了多种推广方式，如商品，店铺，频道，活动，关键词...等等，但只能在新淘网使用">混合类型</option>
        	<option value="blog" title="组件内容由家园日志组成，可根据家园日志的变化自动更新组件和推广站点">软文类型</option>
        	<option value="html" title="组件内容涵盖了多种推广方式，如商品，店铺，频道，活动，关键词...等等，可以在任何支持html代码的地方使用">标准类型</option>
        	</select>&nbsp;按布局尺寸筛选:<select name="mysizes" id="mysizes">
					<option value="-1" selected="selected">全部尺寸</option>
					<option value="0" >单栏</option>
					<option value="1" >两栏(1-3)右 </option>
					<option value="2" >三栏(1-3-1)中</option>
					<option value="3" >两栏(1-1)左/右</option>
					<option value="4" >三栏(1-1-1)左/中/右</option>
					<option value="5" >两栏(1-3)左 </option>
					<option value="6" >三栏(1-3-1)左/右</option>
					</select>&nbsp;按商品类目分类:<select id="mycats">
					<option value="0" selected="selected">所有分类</option>
					<#list cats as c>
					<option value="${c.cid}">${c.name}</option>
					</#list>
					</select>
        	</div>
			</div>
			</div>
			<#if widgets??&&widgets?size!=0>
				<ul class="wm_list">
				<#list widgets as w>
				 <li class="wm_list_li">
				 <div class="editor-bar" align=center>
				 	<ul class="wm_list_tools">
				 	<#if w.widget.type.name=='html'><li><a class="w-getcode" title="只有标准组件支持代码拷贝" onClick="openCodeAdsDialog('${w.id}');return false;"></a></li></#if>
				 	<li><a class="w-commission w-viewcommission" title="只有店铺和商品可以查看到佣金" href="#" cwid="${w.id}"></a></li>
				 	<li> <a class="w-deletefav" href="#" cwid="${w.id}"></a></li>
				 	<li>被使用数量:<span class="k">${w.used!'0'}</span></li>
				 	<li>被收藏数量:<span class="k">${w.favorite!'0'}</span></li>
				 	<li>更新时间:<span class="k" title="${w.widgetUpdated!w.created}">${dateDiff(w.widgetUpdated!w.created)}</span></li>
				 	<li><a href="/router/member/widget/detail/${w.id}" class="widget_detail"><span class="k">作品详情</span></a></li>
				 	</ul>
				 	<p style="line-height: 18px;text-align: center;display:block;margin-bottom:10px;">
				 	组件名称：<span class="k">${w.name}</span>　  　 　  　 
            适合投放：<#if w.cat??><a href="/router/member/widget/favorite?cid=${w.cat.cid}"><span class="k">${w.cat.name}</span></a></#if>　  　 
            布局:<a href="/router/member/widget/favorite?layout=${w.layout}"><span class="k"><@ws.layout w.layout></@ws.layout></span></a>　  
            作者：<a href="/router/member/widget/designers/${w.createdBy}">${w.nick}</a>
					</p>
				 </div>
				 <div class="widget-customer" cwid="${w.id}" style="display:block;" align="center">${w.content}</div>
				 </li>
				 </#list>
				</ul>
				<#else>
				<div style="padding:20px; font-size:14px;text-align:center;">
				你目前没有收藏过任何组件，到<a href="/router/member/widget/market" style="font-size:14px;">组件超市</a>去挑一个收藏吧。
			</div>
			</#if>
			<#assign url='/router/member/widget/favorite?q='+q+'&layout='+layoutfilter+'&cid='+cidfilter+'&sortOrder='+sortOrder+'&type='+typefilter>
			<@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount?number url=url></@ws.pager>
<#include "/site/template/footer.ftl">			