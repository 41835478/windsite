<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>独立站点推广-推广统计-我是卖家-新淘网</title>
</@ws.header>
<script language="javascript" type="text/javascript" src="/assets/min/js/seller.min.js?v=${dateVersion()}"></script>
<script>
$(function(){
getADSiteSearchHtml(1);
});
function getADSiteSearchHtml(pageNo) {
	$("#profileBody").empty();
	$("#profileBody")
			.append("<tr><td colspan=4>正在加载数据,请稍候...</td></tr>");
	$.ajax({
				url : '/router/member/sellerads/adsite/search?v='
						+ Math.random(),
				type : 'POST',
				data : {pageNo:pageNo},
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
						getADSiteSearchHtml($('a', $(this)).text());
						return false;
					});
					$('.pgNext').click(function() {
						if (!$(this).hasClass('pgEmpty')) {
							getADSiteSearchHtml($(this).attr('page'));
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
<@xt.sellertemplate navselected='seller' bdselected='admodule-site'>
<table class="wTable" style="width:750px;">
<THEAD>
<TR><TH align=left>正在推广您的店铺和商品的独立站点</TH></TR>
</THEAD>
</table>	
<table id="tableProfile" class="wTable" style="width:750px;">
<THEAD>
	<TR>
		<TH width=300px>站点名称</TH>
		<TH width=200px>站点地址</TH>
		<TH width=120px>店铺推广</TH>
		<TH>商品推广</TH>
	</TR>
</THEAD>
<tbody id="profileBody">
</tbody>
</table>
</@xt.sellertemplate>
