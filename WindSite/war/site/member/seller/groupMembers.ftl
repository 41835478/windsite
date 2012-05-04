<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>推广组类淘客-淘客管理-我是卖家-新淘网</title>
</@ws.header>
<script language="javascript" type="text/javascript" src="/assets/min/js/seller.min.js?v=${dateVersion()}"></script>
<script>
$(function(){
	createSellerGroupMembers();
	$('#allFilter').click(function(){
		createSellerGroupMembers();
		return false;
	});
	<#if "admin"==USER.role>
	$('#adminSelect').click(function(){
		createSellerGroupMembers();
	});
	</#if>
});
</script>
<style>
#tableProfile td{line-height:20px;text-align:center}a.filterMember{color:#00E;}
</style>
<@xt.sellertemplate navselected='seller' bdselected='seller-groups'>
<table class="wTable" style="width:750px;">
<THEAD>
<TR><TH align=left>推广组中添加了您的店铺推广商品的新淘网会员统计数据：<#if "admin"==USER.role><input type="text" id="nick" value="${nick}"><input type="button" id="adminSelect" value="查询"><#else><input type="hidden" id="nick" value="${nick!USER.nick}"></#if></TH></TR>
<TR><TH align=left id="filterTr" style="display:none"><a href="#" id="allFilter">全部</a><span id="filterNum-title"></span></TH></TR>
</THEAD>
</table>	
<table id="tableProfile" class="wTable" style="width:750px;">
<THEAD>
	<TR>
		<TH width=200px>商品名称</TH>
		<TH width=150px>会员名</TH>
		<TH width=250px>会员站点</TH>
		<TH>家园好友</TH>
	</TR>
</THEAD>
<tbody id="profileBody">
</tbody>
</table>
</@xt.sellertemplate>
