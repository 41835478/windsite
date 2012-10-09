<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>交易管理-返利管理-我是淘客-新淘网</title>
<style>
</style>
</@ws.header>
<script src="/assets/js/jquery/tools/dateinput.min.js" type="text/javascript"></script>
<script src="/assets/min/js/fanli.min.js?v=${dateVersion()}" type="text/javascript"></script>
<script>
$(function(){
	initFanliReport('${q}','${rel}');
});
</script>
<link rel="stylesheet" href="http://static.xintaonet.com/assets/min/css/fanli.css?v=${dateVersion()}" type="text/css"/>
<link rel="stylesheet" href="http://static.xintaonet.com/assets/min/css/huabaosearch.css?v=${dateVersion()}" type="text/css"/>
<style>.wTable td{text-align:center;line-height:17px;}.links-head {cursor:pointer;background: #5DAE40;border:1px solid #8AB78A;height: 20px;padding: 4px 14px 4px 9px;}.links-head .title {color:white;float: left;height: 20px;margin-right: 5px;overflow: hidden;font-size: 14px;font-weight: bold;}.links-head span{float:left;}.links-head .title a{color:red;}.links-head .title a:hover{color:#333;}
.shortcut-rows{background-color: white;border-bottom: 1px dotted #CCC;clear: both;float: left;margin: 0px 0px 5px;overflow: hidden;position: relative;width: 590px;}
.shortcut-rows h4 {padding: 5px 8px;height:100px;background: url(http://static.xintaonet.com/assets/images/cat.png) repeat-y 0px 0px;background-color: #F3F7F9;background-position: 0% 50%;background-repeat: repeat-y;border: 1px solid #CCE3F1;clear: left;float: left;font-size: 14px;margin: 0px 8px 0px 0px;overflow: hidden;width: 12px;}
.shortcut-rows ul {height:100px;float: left;margin: 0px;overflow: hidden;padding-top: 5px;width: 540px;}.shortcut-rows ul li{float: left;line-height: 18px;margin-right: 20px;overflow: hidden;padding: 5px 0px 0px;white-space: nowrap;display:inline;}.shortcut-rows li a{color: #04D;font-size: 12px;}
#operate-overlay{display:none;width:400px;border:6px solid #666;border:6px solid rgba(82, 82, 82, 0.698);-moz-border-radius:8px;-webkit-border-radius:8px;}#operate-overlay h2 {color:#fff;background-color:#6D84B4;padding:5px 10px;border:1px solid #3B5998;font-size:20px;}
.wTable td, .wTable th {height: 30px;line-height: 14px;}.search-form{margin-left:80px;}#fanli-filter a.selected{color:red;font-weight:700;}
.step {width: 100%;margin-bottom: 20px;overflow: hidden;}.step li,.step li span {background-image: url('/assets/min/images/bg-step.png');background-repeat: no-repeat;text-align: center;}.step li {width: 207px;height: 29px;line-height: 29px;padding-left: 20px;float: left;overflow: hidden;text-align: center;position: relative;background-position: right -108px;border: none;color: #605F5F;}.step li span {width: 100%;font-size: 14px;line-height: 27px;line-height: 29px;display: block;position: absolute;left: -17px;background-position: 0 -108px;text-indent: 17px;}.step li.finished {background-position: -4px -108px;}.step li.finished span {left: 0;background-position: 0 -108px;}.step li.current {height: 29px;background-position: right -51px;border: none;}.step li.current span {background-position: 17px -51px;font-weight: bold;color: #AB4400;}.step li.last {border-right: 1px #DBDBDB solid;background-position: right -406px;}.step li.last span {background: none;left: 0;}.step li.last-current {height: 29px;background-position: right -166px;border: none;border-right: 1px solid #ffab0a;}.step li.last-current span {background-position: 15px -166px;font-weight: bold;color: #AB4400;left: -15px;}
.step-four li{width:170px;}input.date {border:1px solid #ccc;font-size:18px;padding:2px;text-align:center;width:194px;-moz-box-shadow:0 0 10px #eee inset;}#calroot {z-Index:1000;margin-top:-1px;width:198px;padding:2px;background-color:#fff;font-size:11px;border:1px solid #ccc;-moz-border-radius:5px;-webkit-border-radius:5px;-moz-box-shadow: 0 0 15px #666;-webkit-box-shadow: 0 0 15px #666;}#calhead {	padding:2px 0;height:22px;} #caltitle {font-size:14px;color:#0150D1;	float:left;text-align:center;width:155px;line-height:20px;text-shadow:0 1px 0 #ddd;}
#calnext, #calprev {display:block;width:20px;height:20px;background:transparent url(http://static.xintaonet.com/assets/css/ui/images/prev.gif) no-repeat scroll center center;float:left;cursor:pointer;}#calnext {background-image:url(http://static.xintaonet.com/assets/css/ui/images/next.gif);float:right;}#calprev.caldisabled, #calnext.caldisabled {visibility:hidden;}#caltitle select {font-size:10px;	}#caldays {height:14px;border-bottom:1px solid #ddd;}#caldays span {display:block;float:left;width:28px;text-align:center;}#calweeks {background-color:#fff;margin-top:4px;}.calweek {clear:left;height:22px;}.calweek a {display:block;float:left;width:27px;height:20px;text-decoration:none;font-size:11px;margin-left:1px;text-align:center;line-height:20px;color:#666;-moz-border-radius:3px;-webkit-border-radius:3px;} .calweek a:hover, .calfocus {background-color:#ddd;}a.calsun {color:red;}a.caloff {color:#ccc;}a.caloff:hover {background-color:rgb(245, 245, 250);}a.caldisabled {background-color:#efefef !important;color:#ccc	!important;cursor:default;}#calcurrent {background-color:#498CE2;color:#fff;}
#caltoday {background-color:#333;color:#fff;}
</style>
<@xt.taoketemplate navselected='taoke' bdselected='fanli-report' group=2>
<div id="getReport-dialog" title="手动获取订单">
<@ws.info>
<span style="color: #F60;">提醒:</span>&nbsp;&nbsp;手动获取订单时间段最多只能选择30天。并且只能获取最近3个月内的交易记录，已经获取了的交易记录将自动忽略。
</@ws.info>
<table width=100%>
	<tr>
	<td width=80px align=right>时间段：</td><td align=left>&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="startDate" id="startDate" data-value="-7" value="" />&nbsp;&nbsp;至&nbsp;&nbsp;<input type="text" name="endDate" id="endDate" value="" data-value="Today"/></td></tr>
	<tr><td align=center colspan=2><span class="btn btn-ok" id="getReportButton"><input type="button" value="获取交易记录"></span><span class="fm-confirm"><span class="loading-text fn-hide">正在获取订单...</span></span></td></tr>
	<tr><td align=center colspan=2><span id="getReport-result" style="color:red;font-size:14px;font-weight:700;padding:2px;line-height:17px;"></span></td></tr>
</table>
</div>
<#if USER.nPid??&&USER.pid??&&USER.pid!=USER.nPid>
<#if USER.reportSession??>
如果发现订单不能同步,请<a href="http://container.open.taobao.com/container?appkey=12194773&xintao=bind">重新授权</a>.
<#else>
您自定义了PID,为保证可以获取交易记录,请使用当前PID所对应的淘宝账号授权:<a href="http://container.open.taobao.com/container?appkey=12194773&xintao=bind">点击授权</a>
</#if>
</#if>
<ol class="step step-four"><li><span>1.登录返利网站</span></li><li><span>2.淘宝网交易</span></li><li><span>3.确认收货</span></li><li class="last"><span>返利</span></li></ol>
<div class="search-form">
	<fieldset>
		<legend>搜索</legend>
			<#if 'member'!=rel&&'trade'!=rel><#assign rel='member'></#if>
			<ul class="search-tab" id="J_SearchTab" redirect="true">
				<li class="<#if rel=="member">selected </#if>first rel" rel="member"><s class="l"></s><s class="r"></s><a>会员</a></li>
				<li class="<#if rel=="trade">selected </#if>rel" rel="trade"><s class="l"></s><s class="r"></s><a>淘宝交易号</a></li>
				<li id="getReport"><s class="l"></s><s class="r"></s><a style="font-weight:800;color:red;">手动获取订单</a></li>
			</ul>
			<div class="search-auto">
				<s class="l"></s><s class="r"></s>
				<div class="input allWidth"><s class="l"></s><s class="r"></s><input onkeydown="if(event.keyCode==13) {searchFanliReport();}" name="q" maxlength="60" value="${q!''}" id="q">
				</div>
				<button id="searchReport">搜索</button>
			</div>
			<table id="fanli-filter"><tr><td height=25px>跟单状态：</td><td id="fanli-follow-a"><a class="fanli-follow selected" t="-1">全部</a>&nbsp;&nbsp;&nbsp;<a class="fanli-follow" t="true">已跟单</a>&nbsp;&nbsp;&nbsp;<a class="fanli-follow" t="false">未跟单</a></td></tr></table>
	</fieldset>
</div>
<TABLE class="wTable" width=100% height=100% border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=120px>淘宝交易号</TH>
			<TH width=200px>商品名称</TH>
			<TH width=50px>单价</TH>
			<TH width=50px>数量</TH>
			<TH width=50px>总佣金</TH>
			<TH width=80px>返利</TH>
			<TH width=120px>交易时间</TH>
			<TH>会员</TH>
		</TR>
	</THEAD>
	<TBODY id="reportSearchResult">
	</TBODY>
</TABLE>
<@ws.help>
<h3>1.什么情况下会产生交易记录？</h3>
<p>当您的返利网站会员以正常的返利流程完成购物，并且确认收货后，您的站点将同时产生交易记录和对应的返利记录。如果您发现交易记录和返利记录出现问题，您可以手动获取指定时间的交易记录</p>
</@ws.help>
</@xt.taoketemplate>
