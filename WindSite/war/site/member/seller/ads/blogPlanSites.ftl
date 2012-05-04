<script>
$(function(){
	$('#plans').change(function(){
		getHtmlPlanAds($(this).val());
	});
	$('.page-number').click(function(){
			getHtmlPlanAds($('#plans').val(),$('#isTaoke').attr('checked'),$('a',$(this)).text());
			return false;
		});
	$('.pgNext').click(function(){
		if(!$(this).hasClass('pgEmpty')){
			getHtmlPlanAds($('#plans').val(),$('#isTaoke').attr('checked'),$(this).attr('page'));
		}
		return false;
	});
	$('#isTaoke').change(function(){
		getHtmlPlanAds($('#plans').val(),$(this).attr('checked'));
	});
})
</script>
<div class="buttonBar" style="height:25px;" align="left">
<a href="/router/member/selleradsmanager/plan/${plan.type}" >返回广告列表</a>
&nbsp;&nbsp;&nbsp;
<select id="plans" style="height:22px;z-Index:1000;">
	<#if (plans?size>0)>
		<#list plans as p>
			<#if p.id==plan.id>
				<option selected value="${p.id}">${p.name}</option>
			<#else>
				<option value="${p.id}">${p.name}</option>
			</#if>
		</#list>
	</#if>
</select>
<input type="checkbox" id="isTaoke" <#if isTaoke>checked</#if>>只显示淘客投放
</div>
<table class="items-pages" width="750px" height="20px">
	<TR>
		<td><div style="float:right;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount></@ws.pager></div></td>
	</TR>
</table>
<TABLE id="itemsTable" class="wTable" width="100%" border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=80px>类型</TH>
			<TH width=350px>站点名称</TH>
			<TH width=200px>会员</TH>
			<TH>操作</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#if ads??&&ads?size!=0>
		<#list ads as t>
			<TR style="font-weight: bold;" class="<#if t_index%2==0>odd<#else>even</#if>">
				<TD><#if "system"==t.type>系统投放<#else>淘客投放</#if></TD>
				<TD align=left><a href="http://<#if t.www??&&""!=t.www>${t.www}<#else>${t.domainName}.xintaonet.com</#if>/tblogs.html" target="_blank">${t.name}</a></TD>
				<TD>${t.nick}</TD>
				<TD></TD>
			</TR>
		</#list>
	<#else>
		<tr><td colspan=4 align="center"><h3>当前推广计划尚未投放在任何站点</h3></td>
		</tr>
	</#if>
	</TBODY>
</TABLE>
