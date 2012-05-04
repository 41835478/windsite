<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>店铺类淘客-淘客管理-我是卖家-新淘网</title>
</@ws.header>
<script language="javascript" type="text/javascript" src="/assets/min/js/seller.min.js?v=${dateVersion()}"></script>
<script>
$(function(){
	createSellerShopMembers();
	<#if "admin"==USER.role>
	$('#adminSelect').click(function(){
		createSellerShopMembers();
	});
	</#if>
});
</script>
<style>
#tableProfile td{line-height:20px;text-align:center}
</style>
<@xt.sellertemplate navselected='seller' bdselected='seller-shops'>
<table class="wTable" style="width:750px;">
<THEAD>
<TR><TH align=left>收藏了您的店铺的新淘网会员统计数据：<#if "admin"==USER.role><input type="text" id="sid" value="${USER.user_id}"><input type="button" id="adminSelect" value="查询"><#else><input type="hidden" id="sid" value="${USER.user_id}"></#if></TH></TR>
</THEAD>
</table>	
<table id="tableProfile" class="wTable" style="width:750px;">
<THEAD>
	<TR>
		<TH width=150px>会员名</TH>
		<TH width=250px>会员站点</TH>
		<TH>家园好友</TH>
	</TR>
</THEAD>
<tbody id="profileBody">
</tbody>
</table>
</@xt.sellertemplate>
