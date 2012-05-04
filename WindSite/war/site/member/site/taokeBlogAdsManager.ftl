<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>文章广告-站点管理-淘客建站-我是淘客-新淘网</title>
<script language="javascript" type="text/javascript" src="/assets/js/site/taokeindexads.js?v=${dateVersion()}"></script>
</@ws.header>
<script language="javascript" type="text/javascript" src="/designer/assets/js/adPlansEditor.js?v=${dateVersion()}"></script>
<script>
$(function(){
	initTaokeAdsPlan('blog','${template.sid}');
});
</script>
<style>
.wTable td{text-align:center;line-height:20px;}.bb-info{width:350px;height:85px;}.bb-selectbox{margin:30px 0px 30px 0px;float:left;width:20px;}.bb-pic{float:left;width:90px;}.bb-disc{float:left;width:230px;line-height:14px;text-align:left}.bb-disc a{color:#0063DC;}.bb-disc a:hover{color:#F60;}
#operate-overlay{display:none;width:400px;border:6px solid #666;border:6px solid rgba(82, 82, 82, 0.698);-moz-border-radius:8px;-webkit-border-radius:8px;}#operate-overlay h2 {color:#fff;background-color:#6D84B4;padding:5px 10px;border:1px solid #3B5998;font-size:20px;}
</style>
<@xt.taoketemplate navselected='taoke' bdselected='site-blogAds'>
<@ws.info>每个站点的文章广告位可以放置10个卖家广告计划，其中5个为淘客选择投放，剩余5个为系统自动推荐</@ws.info>
<div id="operate-overlay"><h2>正在操作中,请稍候...</h2></div>
<#include "/site/template/adPlansTemplate.ftl">
<TABLE id="plan-wTable" class="wTable" width=100% height=100% border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=80px>类型</TH>
			<TH width=200px>广告计划名称</TH>
			<TH width=80px>是否主推</TH>
			<TH width=80px>被投放站点</TH>
			<TH width=150px>创建时间</TH>
			<TH>操作</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#if plans??&&(plans?size>0)>
		<#assign taokeCount=0>
		<#list plans as p>
			<#assign isTaoke = template.cads??&&(template.cads?string?contains(p.id))>
			<TR class="plan <#if p_index%2==0>odd<#else>even</#if>" pid="${p.id}">
				<TD><#if isTaoke><#assign taokeCount=taokeCount+1>淘客投放<#else>系统投放</#if></TD>
				<TD align=left><a href="#" class="plan-view" pid="${p.id}" style="color:#00E;font-weight:bold">${p.name}</a></TD>
				<TD><#if p.isDefault>是<#else>否</#if></TD>
				<TD>${p.used}个</TD>
				<TD>${p.created?datetime}</TD>
				<TD><#if isTaoke><a href="#" class="plan-delete" tid="${template.sid}" pid="${p.id}">删除该广告</a></#if></TD>
			</TR>
		</#list>
		<tr class="plan"><td colspan=6><#if taokeCount<5>您还可以挑选并添加<strong id="validNums" style="color:red;">${5-taokeCount}</strong>个卖家广告计划，点击<a onClick="openTaokeAdPlansDialog('blog');return false;"><strong>添加</strong></a><#else>当前页面的广告计划位已经满额，删除后，才可以添加新的卖家广告计划</#if></td></tr>
	<#else>
		<tr><td colspan=6 align="center"><h3>您还可以挑选并添加<strong id="validNums" style="color:red;">5</strong>个卖家广告计划，点击<a onClick="openTaokeAdPlansDialog('blog');return false;"><strong>添加</strong></a></h3></td>
		</tr>
	</#if>
	</TBODY>
</TABLE>
<@ws.help>
<h3>为什么我不可以添加文章广告？</h3>
<p>只有发布后的站点才可以添加广告。每个页面可以自己挑选5个广告计划，当达到5个后，只有删除其中一个之后，才可以继续添加</p>
</@ws.help>	
</@xt.taoketemplate>