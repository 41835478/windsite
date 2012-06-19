<script src="/assets/js/jquery/tools/dateinput.min.js" type="text/javascript"></script>
<script type="text/javascript">
// Datepicker
$(function(){
	$.tools.dateinput.localize("zh-CN",  {
	 	months: 		 '1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月', 
		shortMonths: '1,2,3,4,5,6,7,8,9,10,11,12',  
		days: 		 '星期日,星期一,星期二,星期三,星期四,星期五,星期六', 
		shortDays: 	 '日,一,二,三,四,五,六'	  
	});
	var sDate = new Date();
	$('#startDate').dateinput({lang: 'zh-CN', format: 'yyyymmdd',value:sDate}).val(sDate.format("yyyymmdd"));
	getRep();
	$('#select').button().click(function(){getRep()});
});
function getRep(){
var startDate = $('#startDate').val();
getTaobaokeReport(startDate);
}
</script>
<style>
.date {border:1px solid #ccc;font-size:18px;padding:4px;text-align:center;width:194px;-moz-box-shadow:0 0 10px #eee inset;}#calroot {z-Index:1000;margin-top:-1px;width:198px;padding:2px;background-color:#fff;font-size:11px;border:1px solid #ccc;-moz-border-radius:5px;-webkit-border-radius:5px;-moz-box-shadow: 0 0 15px #666;-webkit-box-shadow: 0 0 15px #666;}#calhead {	padding:2px 0;height:22px;} #caltitle {font-size:14px;color:#0150D1;	float:left;text-align:center;width:155px;line-height:20px;text-shadow:0 1px 0 #ddd;}
#calnext, #calprev {display:block;width:20px;height:20px;background:transparent url(http://static.xintaonet.com/assets/css/ui/images/prev.gif) no-repeat scroll center center;float:left;cursor:pointer;}#calnext {background-image:url(http://static.xintaonet.com/assets/css/ui/images/next.gif);float:right;}#calprev.caldisabled, #calnext.caldisabled {visibility:hidden;}#caltitle select {font-size:10px;	}#caldays {height:14px;border-bottom:1px solid #ddd;}#caldays span {display:block;float:left;width:28px;text-align:center;}#calweeks {background-color:#fff;margin-top:4px;}.calweek {clear:left;height:22px;}.calweek a {display:block;float:left;width:27px;height:20px;text-decoration:none;font-size:11px;margin-left:1px;text-align:center;line-height:20px;color:#666;-moz-border-radius:3px;-webkit-border-radius:3px;} .calweek a:hover, .calfocus {background-color:#ddd;}a.calsun {color:red;}a.caloff {color:#ccc;}a.caloff:hover {background-color:rgb(245, 245, 250);}a.caldisabled {background-color:#efefef !important;color:#ccc	!important;cursor:default;}#calcurrent {background-color:#498CE2;color:#fff;}
#caltoday {background-color:#333;color:#fff;}
</style>
<!--<div class=" ui-widget-content" align="center">-->
<table><tr><td>
起始时间：<input type="text" id="startDate">
<button id="select">查询</button></td>
</tr><tr><td>
<TABLE class="wTable" width=100% border="0" cellspacing="1" cellpadding="4">
	<THEAD>
		<TR>
			<TH width=85px>推广渠道</TH>
			<TH width=85px>交易时间</TH>
			<TH width=150px>商品名称</TH>
			<TH width=150px>所属店铺</TH>
			<TH width=65px>单价(元)</TH>
			<TH width=65px>佣金(元)</TH>
			<TH width=65px>佣金比率</TH>
			<TH>成交数量</TH>
		</TR>
	</THEAD>
	<TBODY id="report">
	</TBODY>
</TABLE></td>
</tr><tr><td>
<@ws.help>
	<a href="http://www.xintaonet.com/router/site/view/support?type=help-myxintao&faq=10" target="_blank"><h3>1.为什么我在新淘网的PID与阿里妈妈的PID不一致？</h3></a>
	<a href="http://www.xintaonet.com/router/site/view/support?type=help-myxintao&faq=07" target="_blank"><h3>2.如何查询我的佣金收入？</h3></a>
	<h3>3.为什么我在新淘网查询的佣金收入比阿里妈妈查询的佣金收入少？</h3>
	<p>如果您查询的佣金收入属于商城推广。那么在阿里妈妈的查询中会自动加上商城补贴的。而新淘网查询的是原始佣金收入，最终的佣金金额以阿里妈妈查询为准</p>
</@ws.help></td>
</tr>
</table>