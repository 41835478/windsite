<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>综合报告-推广统计-我是淘客-新淘网</title>
<!--[if IE]><script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/excanvas.min.js"></script><![endif]-->
</@ws.header>
<link rel="stylesheet" type="text/css" href="/assets/js/jquery/jqplot/jquery.jqplot.min.css" /> 
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/jquery.jqplot.min.js"></script> 
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/plugins/jqplot.dateAxisRenderer.min.js"></script>
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/plugins/jqplot.highlighter.min.js"></script> 
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/plugins/jqplot.cursor.min.js"></script>
<script language="javascript" type="text/javascript" src="/assets/min/js/analytics.min.js?v=${dateVersion()}"></script>
<style>
#tableProfile th,#tableProfile td{text-align:center}
</style> 
<script>
$(function(){
createSiteProfile('chartProfile','${USER.pid}');
});
</script>
<@xt.taoketemplate navselected='taoke' bdselected='analytics-profile' group=4>
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
</@xt.taoketemplate>
