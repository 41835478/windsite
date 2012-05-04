<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>每日分析-推广统计-我是卖家-新淘网</title>
<!--[if IE]><script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/excanvas.min.js"></script><![endif]-->
</@ws.header>
<link rel="stylesheet" type="text/css" href="/assets/js/jquery/jqplot/jquery.jqplot.min.css" /> 
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/jquery.jqplot.min.js"></script> 
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/plugins/jqplot.dateAxisRenderer.min.js"></script>
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/plugins/jqplot.highlighter.min.js"></script> 
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/plugins/jqplot.cursor.min.js"></script>
<script language="javascript" type="text/javascript" src="/assets/min/js/selleranalytics.min.js?v=${dateVersion()}"></script>
<style>
#tableProfile th,#tableProfile td{text-align:center}
</style> 
<script>
$(function(){
	createDayProfile('chartProfile','${USER.sid}','${USER.nick}','${startThisWeekDate}','${endThisWeekDate}');
	$('input[type="radio"][name="date"]').change(function(){
		switch($(this).val()){
			case 'thisWeek':
			createDayProfile('chartProfile','${USER.sid}','${USER.nick}','${startThisWeekDate}','${endThisWeekDate}');
			break;
			case 'lastWeek':
			createDayProfile('chartProfile','${USER.sid}','${USER.nick}','${startLastWeekDate}','${endLastWeekDate}');
			break;
			case 'last30':
			createDayProfile('chartProfile','${USER.sid}','${USER.nick}','${startMonthDate}','${endMonthDate}');
			break;
		}
	});
	$('#subAnalytics').click(function(){
		createDayProfile('chartProfile','${USER.sid}','${USER.nick}','','',$('#dateYear').val(),$('#dateMonth').val());
	});
});
</script>
<@xt.sellertemplate navselected='seller' bdselected='analytics-day'>
<table class="wTable" style="width:750px;">
<THEAD><TR><TH align=left width=80px>选择时段:</TH>
<TH width=60px><input type="radio" name="date" checked value="thisWeek">本周</TH>
<TH width=60px><input type="radio" name="date" value="lastWeek">上周</TH>
<TH width=100px><input type="radio" name="date" value="last30">最近30天</TH>
<TH align=left>任意月:<select id="dateYear"><option value="2010">2010</option><option value="2011" selected>2011</option></select>
<select id="dateMonth"><option value="1" selected>01</option><option value="2">02</option><option value="3">03</option><option value="4">04</option><option value="5">05</option><option value="6">06</option><option value="7">07</option><option value="8">08</option><option value="9">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select>
<input type="button" id="subAnalytics" value="确认">
</TH></TR>
</THEAD>
</table>
 <div id="chartProfile" style="width:750px; height:300px;"></div>
<table id="tableProfile" cellspacing="0" class="wTable" style="width:750px;margin-top:20px;">
<THEAD>
	<TR>
		<TH width=30%>时间</TH>
		<TH width=30%>推广点击次数</TH>
		<TH width=30%>唯一点击次数</TH>
	</TR>
</THEAD>
<tbody id="profileBody">
</tbody>
</table>
</@xt.sellertemplate>
