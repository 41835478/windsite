<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>组件类淘客-淘客管理-我是卖家-新淘网</title>
</@ws.header>
<script language="javascript" type="text/javascript" src="/assets/min/js/seller.min.js?v=${dateVersion()}"></script>
<script>
$(function(){
	createSellerWidgetMembers();
	$('#allFilter').click(function(){
		createSellerWidgetMembers();
		return false;
	});
	<#if "admin"==USER.role>
	$('#adminSelect').click(function(){
		createSellerWidgetMembers();
	});
	</#if>
});
</script>
<style>
#tableProfile td{line-height:20px;text-align:center}
</style>
<@xt.sellertemplate navselected='seller' bdselected='seller-widgets'>
<table class="wTable" style="width:750px;">
<THEAD>
<TR><TH align=left>使用了您制作的自定义推广组件的新淘网会员统计数据：<#if "admin"==USER.role><input type="text" id="user_id" value="${user_id}"><input type="button" id="adminSelect" value="查询"><#else><input type="hidden" id="user_id" value="${user_id!USER.user_id}"></#if></TH></TR>
<TR><TH align=left id="filterTr" style="display:none"><a href="#" id="allFilter">全部</a><span id="filterNum-title"></span></TH></TR>
</THEAD>
</table>	
<table id="tableProfile" class="wTable" style="width:750px;">
<THEAD>
	<TR>
		<TH width=200px>组件名称</TH>
		<TH width=150px>会员名</TH>
		<TH width=250px>所在页面</TH>
		<TH>家园好友</TH>
	</TR>
</THEAD>
<tbody id="profileBody">
</tbody>
</table>
</@xt.sellertemplate>
