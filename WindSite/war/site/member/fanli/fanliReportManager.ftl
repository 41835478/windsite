<@ws.fanliheader navselected='H02'>
<meta name="keywords" content="${sitetitle},会员管理">
<meta name="description" content="会员管理 - ${sitetitle}">
<title>交易记录-${sitetitle}</title>
</@ws.fanliheader>
<script src="/assets/js/jquery/tools/dateinput.min.js" type="text/javascript"></script>
<script src="/assets/min/js/fanlisite.min.js?v=${dateVersion()}" type="text/javascript"></script>
<script>
$(function(){
	initFanliSiteReport('${tradeId}','${startDate}','${endDate}');
});
</script>
<link rel="stylesheet" href="/assets/min/css/fanli.css?v=${dateVersion()}" type="text/css"/>
<link rel="stylesheet" href="/assets/min/css/huabaosearch.css?v=${dateVersion()}" type="text/css"/>
<style>.wTable td{text-align:center;line-height:17px;}.links-head {cursor:pointer;background: #5DAE40;border:1px solid #8AB78A;height: 20px;padding: 4px 14px 4px 9px;}.links-head .title {color:white;float: left;height: 20px;margin-right: 5px;overflow: hidden;font-size: 14px;font-weight: bold;}.links-head span{float:left;}.links-head .title a{color:red;}.links-head .title a:hover{color:#333;}
.shortcut-rows{background-color: white;border-bottom: 1px dotted #CCC;clear: both;float: left;margin: 0px 0px 5px;overflow: hidden;position: relative;width: 590px;}
.shortcut-rows h4 {padding: 5px 8px;height:100px;background: url(/assets/images/cat.png) repeat-y 0px 0px;background-color: #F3F7F9;background-position: 0% 50%;background-repeat: repeat-y;border: 1px solid #CCE3F1;clear: left;float: left;font-size: 14px;margin: 0px 8px 0px 0px;overflow: hidden;width: 12px;}
.shortcut-rows ul {height:100px;float: left;margin: 0px;overflow: hidden;padding-top: 5px;width: 540px;}.shortcut-rows ul li{float: left;line-height: 18px;margin-right: 20px;overflow: hidden;padding: 5px 0px 0px;white-space: nowrap;display:inline;}.shortcut-rows li a{color: #04D;font-size: 12px;}
#operate-overlay{display:none;width:400px;border:6px solid #666;border:6px solid rgba(82, 82, 82, 0.698);-moz-border-radius:8px;-webkit-border-radius:8px;}#operate-overlay h2 {color:#fff;background-color:#6D84B4;padding:5px 10px;border:1px solid #3B5998;font-size:20px;}
.wTable td, .wTable th {height: 30px;line-height: 14px;}.search-form{margin-left:80px;}
.step {width: 100%;margin-bottom: 20px;overflow: hidden;}.step li,.step li span {background-image: url('/assets/min/images/bg-step.png');background-repeat: no-repeat;text-align: center;}.step li {width: 207px;height: 29px;line-height: 29px;padding-left: 20px;float: left;overflow: hidden;text-align: center;position: relative;background-position: right -108px;border: none;color: #605F5F;}.step li span {width: 100%;font-size: 14px;line-height: 27px;line-height: 29px;display: block;position: absolute;left: -17px;background-position: 0 -108px;text-indent: 17px;}.step li.finished {background-position: -4px -108px;}.step li.finished span {left: 0;background-position: 0 -108px;}.step li.current {height: 29px;background-position: right -51px;border: none;}.step li.current span {background-position: 17px -51px;font-weight: bold;color: #AB4400;}.step li.last {border-right: 1px #DBDBDB solid;background-position: right -406px;}.step li.last span {background: none;left: 0;}.step li.last-current {height: 29px;background-position: right -166px;border: none;border-right: 1px solid #ffab0a;}.step li.last-current span {background-position: 15px -166px;font-weight: bold;color: #AB4400;left: -15px;}
.step-four li{width:215px;}.date {border:1px solid #ccc;font-size:18px;padding:2px;text-align:center;width:194px;-moz-box-shadow:0 0 10px #eee inset;}#calroot {z-Index:1000;margin-top:-1px;width:198px;padding:2px;background-color:#fff;font-size:11px;border:1px solid #ccc;-moz-border-radius:5px;-webkit-border-radius:5px;-moz-box-shadow: 0 0 15px #666;-webkit-box-shadow: 0 0 15px #666;}#calhead {	padding:2px 0;height:22px;} #caltitle {font-size:14px;color:#0150D1;	float:left;text-align:center;width:155px;line-height:20px;text-shadow:0 1px 0 #ddd;}
#calnext, #calprev {display:block;width:20px;height:20px;background:transparent url(/assets/css/ui/images/prev.gif) no-repeat scroll center center;float:left;cursor:pointer;}#calnext {background-image:url(/assets/css/ui/images/next.gif);float:right;}#calprev.caldisabled, #calnext.caldisabled {visibility:hidden;}#caltitle select {font-size:10px;	}#caldays {height:14px;border-bottom:1px solid #ddd;}#caldays span {display:block;float:left;width:28px;text-align:center;}#calweeks {background-color:#fff;margin-top:4px;}.calweek {clear:left;height:22px;}.calweek a {display:block;float:left;width:27px;height:20px;text-decoration:none;font-size:11px;margin-left:1px;text-align:center;line-height:20px;color:#666;-moz-border-radius:3px;-webkit-border-radius:3px;} .calweek a:hover, .calfocus {background-color:#ddd;}a.calsun {color:red;}a.caloff {color:#ccc;}a.caloff:hover {background-color:rgb(245, 245, 250);}a.caldisabled {background-color:#efefef !important;color:#ccc	!important;cursor:default;}#calcurrent {background-color:#498CE2;color:#fff;}
#caltoday {background-color:#333;color:#fff;}
</style>
<@xt.fanlitemplate>
<ol class="step step-four"><li><span>1.登录返利网站</span></li><li><span>2.淘宝网交易</span></li><li class="current"><span>3.确认收货</span></li><li class="last"><span>返利</span></li></ol>
<table>
	<tr>
	<td>查询时间：</td><td><input type="text" name="startDate" id="startDate" value="${startDate}" />&nbsp;&nbsp;至&nbsp;&nbsp;<input type="text" name="endDate" id="endDate" value="${endDate}"/></td>
	<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="btn btn-ok" id="searchReportButton"><input type="button" value="查询"></span></td>
	</tr>
</table>
<TABLE class="wTable" border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=120px>淘宝订单编号</TH>
			<TH width=300px>商品名称</TH>
			<TH width=80px>单价</TH>
			<TH width=80px>数量</TH>
			<TH width=80px>返利金额</TH>
			<TH width=150px>交易时间</TH>
			<TH>会员</TH>
		</TR>
	</THEAD>
	<TBODY id="reportSearchResult">
	</TBODY>
</TABLE>
<@ws.help>
<h3>1.什么情况下会产生交易记录？</h3>
<p>当您以正常的返利流程完成购物，并且确认收货后，将同时产生交易记录和对应的返利记录。如果您发现交易记录和返利记录出现问题，您可以联系我们的客服</p>
</@ws.help>
</@xt.fanlitemplate>