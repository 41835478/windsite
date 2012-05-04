<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>最近访客-推广统计-我是淘客-新淘网</title>
<!--[if IE]><script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/excanvas.min.js"></script><![endif]-->
</@ws.header>
<script language="javascript" type="text/javascript" src="/assets/min/js/analytics.min.js?v=${dateVersion()}"></script> 
<script>
$(function(){
createLastVisitProfile('profileBody','${USER.pid}');
});
</script>
<style>
#tableProfile td{line-height:20px;text-align:center}
</style>
<@xt.taoketemplate navselected='taoke' bdselected='analytics-last' group=4>
<table class="wTable" style="width:750px;">
<THEAD><TR><TH align=left>最近50条访客记录：</TH></TR></THEAD>
</table>	
<table id="tableProfile" class="wTable" style="width:750px;">
<THEAD>
	<TR>
		<TH width=100px>时间(小时)</TH>
		<TH width=80px>类型</TH>
		<TH width=300px>推广标题</TH>
		<TH width=150px>来源</TH>
		<TH width=70px>城市</TH>
	</TR>
</THEAD>
<tbody id="profileBody">
</tbody>
</table>
</@xt.taoketemplate>
