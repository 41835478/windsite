<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>卖家信息-推广统计-我是卖家-新淘网</title>
<!--[if IE]><script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/excanvas.min.js"></script><![endif]-->
</@ws.header>
<link rel="stylesheet" type="text/css" href="/assets/js/jquery/jqplot/jquery.jqplot.min.css" /> 
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/jquery.jqplot.min.js"></script> 
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/plugins/jqplot.dateAxisRenderer.min.js"></script>
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/plugins/jqplot.highlighter.min.js"></script> 
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/plugins/jqplot.cursor.min.js"></script>
<script language="javascript" type="text/javascript" src="/assets/min/js/selleranalytics.min.js?v=${dateVersion()}"></script>
<script language="javascript" type="text/javascript" src="/assets/min/js/seller.min.js?v=${dateVersion()}"></script>
<style>
#tableProfile th,#tableProfile td{text-align:center}
.xintao-seller-header{background: white url(/assets/images/myxintao_v3_bg.gif) repeat-x scroll 50% -299px;border-top: 1px solid #C4D5E0;height: 22px;}
</style> 
<script>
var isSyn=false;
$(function(){
	createSellerProfile('chartProfile','${shop.sid}','${USER.nick}');
	$('#synShop').click(function(){
		if(!isSyn){
			isSyn=true;
			synShop();
		}
	});
});
</script>
<@xt.sellertemplate navselected='seller' bdselected=''>
<#if shop??>
<table width=750px>
<tr><td><@ws.info><span style="color: #F60;">重要公告:</span>&nbsp;&nbsp;<a target="_blank" href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=40004"><strong style="color:red;font-weight:bold;font-size:16px;">2012-04-27：新淘网搬迁服务器至香港，不再要求域名备案</strong></a></@ws.info><br/></td></tr>
<tr><td class="xintao-seller-header" width=750px><strong class="nick">淘宝店铺公开信息<strong></td></tr>
<tr><td>
<table style="padding:15px;line-height:20px;">
	<tr><td><span class="key">店铺名称：</span>${shop.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a style="color:#F60;" id="synShop" target="_blank">同步店铺推广信息</a></td></tr>
	<tr><td><span class="key">佣金比例：</span><#if shop.commissionRate??>${shop.commissionRate}%<#else>您尚未加入推广</#if></td></tr>
	<tr><td><span class="key">店铺等级：</span>:<img src="/assets/min/stylesheets/images/${shop.sellerCredit}.gif"/></td></tr>	
</table>
</td></tr>
</table>
</#if>
<#include "site/member/ads/weigou.ftl">
<div id="chartProfile" style="width:750px; height:300px;"></div>
<table id="tableProfile" cellspacing="0" class="wTable" style="width:750px;margin-top:20px;">
<THEAD>
	<TR>
		<TH width=50px></TH>
		<TH width=200px>推广点击次数</TH>
		<TH width=200px>唯一点击次数</TH>
	</TR>
</THEAD>
<tbody id="profileBody">
</tbody>
</table>
</@xt.sellertemplate>
