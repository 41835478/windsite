<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>时段分析-推广统计-我是淘客-新淘网</title>
<!--[if IE]><script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/excanvas.min.js"></script><![endif]-->
</@ws.header>
<link rel="stylesheet" type="text/css" href="/assets/js/jquery/jqplot/jquery.jqplot.min.css" /> 
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/jquery.jqplot.min.js"></script> 
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/plugins/jqplot.dateAxisRenderer.min.js"></script>
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/plugins/jqplot.highlighter.min.js"></script> 
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/plugins/jqplot.cursor.min.js"></script>
<script language="javascript" type="text/javascript" src="/assets/min/js/analytics.min.js?v=${dateVersion()}"></script>
<script src="/assets/js/jquery/tools/dateinput.min.js" type="text/javascript"></script>
<style>
#tableProfile th,#tableProfile td{text-align:center}
.date {border:1px solid #ccc;font-size:14px;padding:4px;text-align:center;width:150px;-moz-box-shadow:0 0 10px #eee inset;}#calroot {z-Index:1000;margin-top:-1px;width:198px;padding:2px;background-color:#fff;font-size:11px;border:1px solid #ccc;-moz-border-radius:5px;-webkit-border-radius:5px;-moz-box-shadow: 0 0 15px #666;-webkit-box-shadow: 0 0 15px #666;}#calhead {	padding:2px 0;height:22px;} #caltitle {font-size:14px;color:#0150D1;	float:left;text-align:center;width:155px;line-height:20px;text-shadow:0 1px 0 #ddd;}
#calnext, #calprev {display:block;width:20px;height:20px;background:transparent url(/assets/css/ui/images/prev.gif) no-repeat scroll center center;float:left;cursor:pointer;}#calnext {background-image:url(/assets/css/ui/images/next.gif);float:right;}#calprev.caldisabled, #calnext.caldisabled {visibility:hidden;}#caltitle select {font-size:10px;	}#caldays {height:14px;border-bottom:1px solid #ddd;}#caldays span {display:block;float:left;width:28px;text-align:center;}#calweeks {background-color:#fff;margin-top:4px;}.calweek {clear:left;height:22px;}.calweek a {display:block;float:left;width:27px;height:20px;text-decoration:none;font-size:11px;margin-left:1px;text-align:center;line-height:20px;color:#666;-moz-border-radius:3px;-webkit-border-radius:3px;} .calweek a:hover, .calfocus {background-color:#ddd;}a.calsun {color:red;}a.caloff {color:#ccc;}a.caloff:hover {background-color:rgb(245, 245, 250);}a.caldisabled {background-color:#efefef !important;color:#ccc	!important;cursor:default;}#calcurrent {background-color:#498CE2;color:#fff;}
#caltoday {background-color:#333;color:#fff;}
</style> 
<script>
$(function(){
	$.tools.dateinput.localize("zh-CN",  {
	 	months: 		 '1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月', 
		shortMonths: '1,2,3,4,5,6,7,8,9,10,11,12',  
		days: 		 '星期日,星期一,星期二,星期三,星期四,星期五,星期六', 
		shortDays: 	 '日,一,二,三,四,五,六'	  
	});
	$('#date').dateinput({lang: 'zh-CN', format: 'yyyy-mm-dd',max:'0 d',change: function() {
		var isoDate = this.getValue('yyyy-mm-dd');
		createHourProfile('chartProfile','${USER.pid}',isoDate);
	}});
	createHourProfile('chartProfile','${USER.pid}','${today}');
	$('input[type="radio"][name="date"]').change(function(){
		createHourProfile('chartProfile','${USER.pid}',$(this).val());
	});
});
</script>
<@xt.taoketemplate navselected='taoke' bdselected='analytics-hour' group=4>
<table class="wTable" style="width:750px;">
<THEAD><TR><TH align=left width=80px>选择时段:</TH>
<TH width=60px><input type="radio" name="date" checked value="${today}">今天</TH>
<TH width=60px><input type="radio" name="date" value="${yesterday}">昨天</TH>
<TH width=60px><input type="radio" name="date" value="${todaybeforeyesterday}">前天</TH>
<TH align=left>选择日期:<input type="text" id="date"></TH></TR></THEAD>
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
</@xt.taoketemplate>
