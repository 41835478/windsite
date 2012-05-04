<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>返利记录-返利管理-我是淘客-新淘网</title>
<style>
</style>
</@ws.header>
<script src="/assets/min/js/fanli.min.js?v=${dateVersion()}" type="text/javascript"></script>
<script>
$(function(){
	initFanliTrade('${q}','${rel}','${type}','${status}');
});
</script>
<link rel="stylesheet" href="/assets/min/css/fanli.css?v=${dateVersion()}" type="text/css"/>
<link rel="stylesheet" href="/assets/min/css/huabaosearch.css?v=${dateVersion()}" type="text/css"/>
<style>.wTable td{text-align:center;line-height:17px;}.links-head {cursor:pointer;background: #5DAE40;border:1px solid #8AB78A;height: 20px;padding: 4px 14px 4px 9px;}.links-head .title {color:white;float: left;height: 20px;margin-right: 5px;overflow: hidden;font-size: 14px;font-weight: bold;}.links-head span{float:left;}.links-head .title a{color:red;}.links-head .title a:hover{color:#333;}
.shortcut-rows{background-color: white;border-bottom: 1px dotted #CCC;clear: both;float: left;margin: 0px 0px 5px;overflow: hidden;position: relative;width: 590px;}
.shortcut-rows h4 {padding: 5px 8px;height:100px;background: url(/assets/images/cat.png) repeat-y 0px 0px;background-color: #F3F7F9;background-position: 0% 50%;background-repeat: repeat-y;border: 1px solid #CCE3F1;clear: left;float: left;font-size: 14px;margin: 0px 8px 0px 0px;overflow: hidden;width: 12px;}
.shortcut-rows ul {height:100px;float: left;margin: 0px;overflow: hidden;padding-top: 5px;width: 540px;}.shortcut-rows ul li{float: left;line-height: 18px;margin-right: 20px;overflow: hidden;padding: 5px 0px 0px;white-space: nowrap;display:inline;}.shortcut-rows li a{color: #04D;font-size: 12px;}
#operate-overlay{display:none;width:400px;border:6px solid #666;border:6px solid rgba(82, 82, 82, 0.698);-moz-border-radius:8px;-webkit-border-radius:8px;}#operate-overlay h2 {color:#fff;background-color:#6D84B4;padding:5px 10px;border:1px solid #3B5998;font-size:20px;}
.wTable td, .wTable th {height: 30px;line-height: 14px;}.search-form{margin-left:80px;}#fanli-filter a.selected{color:red;font-weight:700;}
.step li span{display: -moz-inline-box;display: inline-block; *zoom: 1; *display: inline;vertical-align: middle;line-height: 100%;text-align: left;font-size: 12px;}
.step {width: 100%;margin-bottom: 20px;overflow: hidden;}.step li,.step li span {background-image: url('/assets/min/images/bg-step.png');background-repeat: no-repeat;text-align: center;}.step li {width: 207px;height: 29px;line-height: 29px;padding-left: 20px;float: left;overflow: hidden;text-align: center;position: relative;background-position: right -108px;border: none;color: #605F5F;}.step li span {width: 100%;font-size: 14px;line-height: 27px;line-height: 29px;display: block;position: absolute;left: -17px;background-position: 0 -108px;text-indent: 17px;}.step li.finished {background-position: -4px -108px;}.step li.finished span {left: 0;background-position: 0 -108px;}.step li.current {height: 29px;background-position: right -51px;border: none;}.step li.current span {background-position: 17px -51px;font-weight: bold;color: #AB4400;}.step li.last {border-right: 1px #DBDBDB solid;background-position: right -406px;}.step li.last span {background: none;left: 0;}.step li.last-current {height: 29px;background-position: right -166px;border: none;border-right: 1px solid #ffab0a;}.step li.last-current span {background-position: 15px -166px;font-weight: bold;color: #AB4400;left: -15px;}
.step-three li{width:230px;}.span-status-0{color:#AB4400;}.span-status-1{color:#090;}.span-status-2{color:#444;}
</style>
<@xt.taoketemplate navselected='taoke' bdselected='fanli-trade' group=2>
<ol class="step step-three"><li><span>1.站长支付返利</span></li><li><span>2.会员确认收款</span></li><li class="last"><span>完成</span></li></ol>
<div class="search-form">
	<fieldset>
		<legend>搜索</legend>
			<#if 'member'!=rel&&'trade'!=rel><#assign rel='member'></#if>
			<ul class="search-tab" id="J_SearchTab" redirect="true">
				<li class="<#if rel=="member">selected </#if>first" rel="member"><s class="l"></s><s class="r"></s><a>会员</a></li>
				<li <#if rel=="trade">class="selected"</#if> rel="trade"><s class="l"></s><s class="r"></s><a>淘宝交易号</a></li>
			</ul>
			<div class="search-auto">
				<s class="l"></s><s class="r"></s>
				<div class="input allWidth"><s class="l"></s><s class="r"></s><input onkeydown="if(event.keyCode==13) {searchFanliTrade();}" name="q" maxlength="60" value="${q!''}" id="q">
				</div>
				<button id="searchTrade">搜索</button>
			</div>
			<table id="fanli-filter"><tr><td height=25px>返利类型：</td><td id="fanli-type-a"><a class="fanli-type<#if !type??||''==type||'-1'==type> selected</#if>" t="-1">全部</a>&nbsp;&nbsp;&nbsp;<a class="fanli-type<#if 'BUY'==type> selected</#if>" t="BUY">购买返利</a>&nbsp;&nbsp;&nbsp;<a class="fanli-type<#if 'ADS'==type> selected</#if>" t="ADS">推广返利</a></td></tr>
			<tr><td height=25px>返利状态：</td><td id="fanli-status-a"><a class="fanli-status<#if !status??||''==status||'-1'==status> selected</#if>" t="-1">全部</a>&nbsp;&nbsp;&nbsp;<a class="fanli-status<#if '0'==status> selected</#if>" t="0">等待站长支付返利</a>&nbsp;&nbsp;&nbsp;<a class="fanli-status<#if '1'==status> selected</#if>" t="1">等待会员确认收款</a>&nbsp;&nbsp;&nbsp;<a class="fanli-status<#if '2'==status> selected</#if>" t="2">已完成返利支付</a></td></tr></table>
	</fieldset>
</div>
<TABLE class="wTable" width=100% height=100% border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=120px>会员</TH>
			<TH width=100px>返利金额</TH>
			<TH width=120px>返利类型</TH>
			<TH width=150px>状态</TH>
			<TH width=150px>时间</TH>
			<TH>操作</TH>
		</TR>
	</THEAD>
	<TBODY id="tradeSearchResult">
	</TBODY>
</TABLE>
<@ws.help>
<h3>1.返利状态----等待站长支付返利？</h3>
<p>是指当前淘宝交易已经完成（即买家会员已经在淘宝确认收货），并且站长已经收到了淘宝网支付的佣金收入。</p>
<h3>1.返利状态----等待会员确认收款？</h3>
<p>是指站长已经将返利金额转账至会员的支付宝帐号，此时需要等待当前买家会员确认支付宝帐号已经收到了站长的返利转账。</p>
<h3>1.返利状态----已完成返利支付？</h3>
<p>是指站长已经将返利金额转账至会员的支付宝帐号，并且当前买家会员也已经确认了支付宝帐号已经收到了返利转账。此时整个购物返利流程完成</p>
</@ws.help>
</@xt.taoketemplate>
