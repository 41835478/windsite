<script>
$(function(){
initTaokeAdsPlan('index','${template.tid}');
});
</script>
<div id="operate-overlay"><h2>正在操作中,请稍候...</h2></div>
<#include "/site/template/adPlansTemplate.ftl">
<div class="buttonBar" style="height:25px;" align="left">
<a href="/router/member/sitemanager/indexAds" >返回页面列表</a>
&nbsp;&nbsp;&nbsp;
<select id="plans" style="height:22px;z-Index:1000;">
	<#if (templates?size>0)>
		<#list templates as t>
			<#if t.id==template.tid>
				<option selected value="${t.id}">${t.name}</option>
			<#else>
				<option value="${t.id}">${t.name}</option>
			</#if>
		</#list>
	</#if>
</select>
</div>
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
				<TD><#if isTaoke><a href="#" class="plan-delete" tid="${template.tid}" pid="${p.id}">删除该广告</a></#if></TD>
			</TR>
		</#list>
		<tr class="plan"><td colspan=6><#if taokeCount<5>您还可以挑选并添加<strong id="validNums" style="color:red;">${5-taokeCount}</strong>个卖家广告计划，点击<a onClick="openTaokeAdPlansDialog('index');return false;"><strong>添加</strong></a><#else>当前页面的广告计划位已经满额，删除后，才可以添加新的卖家广告计划</#if></td></tr>
	<#else>
		<tr><td colspan=6 align="center"><h3>您还可以挑选并添加<strong id="validNums" style="color:red;">5</strong>个卖家广告计划，点击<a onClick="openTaokeAdPlansDialog('index');return false;"><strong>添加</strong></a></h3></td>
		</tr>
	</#if>
	</TBODY>
</TABLE>