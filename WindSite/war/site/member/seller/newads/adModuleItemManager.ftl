<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>淘客商品推广-推广统计-我是卖家-新淘网</title>
</@ws.header>
<script language="javascript" type="text/javascript" src="/assets/min/js/seller.min.js?v=${dateVersion()}"></script>
<script>
$(function(){
getADModuleItemReportSearchHtml(1);
<#if "admin"==USER.role>$('#adminSelect').click(function(){getADModuleItemReportSearchHtml(1)});</#if>
});
function getADModuleItemReportSearchHtml(pageNo) {
	$("#profileBody").empty();
	$("#profileBody")
			.append("<tr><td colspan=4>正在加载数据,请稍候...</td></tr>");
	$.ajax({
				url : '/router/member/sellerads/admodule/search?v='
						+ Math.random(),
				type : 'POST',
				data : {sellerNick:$('#nick').val(),pageNo:pageNo},
				dataType : 'html',
				beforeSend : function(xhr) {
					xhr.setRequestHeader("WindType", "AJAX");// 请求方式
					xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
				},
				error : function(request, textStatus, errorThrown) {
					$('#profileBody').empty();
					alert(textStatus);
				},
				success : function(data) {
					$('#profileBody').empty().append(data);
					$('.page-number').click(function() {
						getADModuleItemReportSearchHtml($('a', $(this)).text());
						return false;
					});
					$('.pgNext').click(function() {
						if (!$(this).hasClass('pgEmpty')) {
							getADModuleItemReportSearchHtml($(this).attr('page'));
						}
						return false;
					});
				}
			});
}
</script>
<style>
#tableProfile td{line-height:17px;text-align:center}a.filterMember{color:#00E;}#tableProfile td.item-a{text-align:left}.wTable .item-a a{color:#347ABA}
</style>
<@xt.sellertemplate navselected='seller' bdselected='admodule-item'>
<table class="wTable" style="width:750px;">
<THEAD>
<TR><TH align=left>站点中添加了您的店铺推广商品的统计数据：<#if "admin"==USER.role><input type="text" id="nick" value="${sellerNick}"><input type="button" id="adminSelect" value="查询"><#else><input type="hidden" id="nick" value="${sellerNick}"></#if></TH></TR>
</THEAD>
</table>	
<table id="tableProfile" class="wTable" style="width:750px;">
<THEAD>
	<TR>
		<TH width=400px>商品名称</TH>
		<TH width=120px>站长</TH>
		<TH width=120px>投放时间</TH>
		<TH>投放位置</TH>
	</TR>
</THEAD>
<tbody id="profileBody">
</tbody>
</table>
</@xt.sellertemplate>
