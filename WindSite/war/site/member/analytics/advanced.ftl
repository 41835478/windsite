<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>高级统计-推广统计-我是淘客-新淘网</title>
 <!--[if IE]><script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/excanvas.min.js"></script><![endif]-->
</@ws.header>
<link rel="stylesheet" type="text/css" href="/assets/js/jquery/jqplot/jquery.jqplot.min.css" /> 
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/jquery.jqplot.min.js"></script> 
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/plugins/jqplot.dateAxisRenderer.min.js"></script>
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/plugins/jqplot.highlighter.min.js"></script> 
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/plugins/jqplot.cursor.min.js"></script>
<script language="javascript" type="text/javascript" src="/assets/min/js/analytics.min.js?v=${dateVersion()}"></script>
<script language="javascript" type="text/javascript" src="/assets/js/jquery/tools/dateinput.min.js"></script>
<style>
#tableProfile th,#tableProfile td{line-height:20px;text-align:center}
.date {border:1px solid #ccc;font-size:14px;padding:4px;text-align:center;width:150px;-moz-box-shadow:0 0 10px #eee inset;}#calroot {z-Index:1000;margin-top:-1px;width:198px;padding:2px;background-color:#fff;font-size:11px;border:1px solid #ccc;-moz-border-radius:5px;-webkit-border-radius:5px;-moz-box-shadow: 0 0 15px #666;-webkit-box-shadow: 0 0 15px #666;}#calhead {	padding:2px 0;height:22px;} #caltitle {font-size:14px;color:#0150D1;	float:left;text-align:center;width:155px;line-height:20px;text-shadow:0 1px 0 #ddd;}
#calnext, #calprev {display:block;width:20px;height:20px;background:transparent url(http://static.xintaonet.com/assets/css/ui/images/prev.gif) no-repeat scroll center center;float:left;cursor:pointer;}#calnext {background-image:url(http://static.xintaonet.com/assets/css/ui/images/next.gif);float:right;}#calprev.caldisabled, #calnext.caldisabled {visibility:hidden;}#caltitle select {font-size:10px;	}#caldays {height:14px;border-bottom:1px solid #ddd;}#caldays span {display:block;float:left;width:28px;text-align:center;}#calweeks {background-color:#fff;margin-top:4px;}.calweek {clear:left;height:22px;}.calweek a {display:block;float:left;width:27px;height:20px;text-decoration:none;font-size:11px;margin-left:1px;text-align:center;line-height:20px;color:#666;-moz-border-radius:3px;-webkit-border-radius:3px;} .calweek a:hover, .calfocus {background-color:#ddd;}a.calsun {color:red;}a.caloff {color:#ccc;}a.caloff:hover {background-color:rgb(245, 245, 250);}a.caldisabled {background-color:#efefef !important;color:#ccc	!important;cursor:default;}#calcurrent {background-color:#498CE2;color:#fff;}
#caltoday {background-color:#333;color:#fff;}ul.pages{margin:0px;padding:0px;}
</style> 
<script>
var PID='${USER.pid}';
$(function(){
	initAdvanced();
	<#if categoryFilter??&&categoryFilter?contains(':')>
		<#assign fs=categoryFilter?split(':')>
		$('#customeAnalytics').show();
		$('#categoryFilterSelect').val('${fs[0]}');
		$('#category-${fs[0]}s').val('${fs[1]}').show();
		advancedAnalytics('${USER.pid}',1,'-ga:date','${fs[1]}');
		<#else>
		advancedAnalytics('${USER.pid}');
	</#if>
	$('#analyticsButton').click(function(){
		advancedAnalytics('${USER.pid}');
	});
});
</script>
<@xt.taoketemplate navselected='taoke' bdselected='analytics-advanced' group=4>
<table class="wTable" style="width:750px;">
<THEAD>
<TR><TH align=left width=80px rowspan=2>常用分析:</TH>
<TH width=130px><a class="analytics" name="item" href="#">商品推广统计</a></TH>
<TH width=130px><a class="analytics" name="shop" href="#">店铺推广统计</a></TH>
<TH width=130px><a class="analytics" name="channel" href="#">频道推广统计</a></TH>
<TH width=130px><a class="analytics" name="key" href="#">关键词推广统计</a></TH>
<TH width=130px><a class="analytics" name="blog" href="#">软文推广统计</a></TH>
</TR>
<TH width=130px><a class="analytics" name="activity" href="#">活动推广统计</a></TH>
<TH width=130px><a class="analytics" name="source" href="#">来源统计</a></TH>
<TH width=130px><a class="analytics" name="city" href="#">城市统计</a></TH>
<TH width=130px><a href="#" onClick="if($('#customeAnalytics').is(':hidden')){$('#customeAnalytics').show();}else{$('#customeAnalytics').hide();}return false;">自定义统计</a></TH>
<TH></TH>
</TR>
</THEAD>
</table>
<table id="customeAnalytics" class="wTable" style="width:750px;display:none;">
<THEAD>
<TR><TH align=left width=80px>查询项目:</TH>
<TH width=100px><input type="checkbox" name="dimensions" <#if dimensions??&&dimensions?contains('date')>checked</#if> value="date">时间</TH>
<TH width=120px><input type="checkbox" name="dimensions" <#if dimensions??&&dimensions?contains('category')>checked</#if> value="category">推广类型</TH>
<TH width=120px><input type="checkbox" name="dimensions" <#if dimensions??&&dimensions?contains('label')>checked</#if> value="label">推广标题</TH>
<TH width=120px><input type="checkbox" name="dimensions" <#if dimensions??&&dimensions?contains('source')>checked</#if> value="source">来源</TH>
<TH><input type="checkbox" name="dimensions" <#if dimensions??&&dimensions?contains('city')>checked</#if> value="city">城市</TH>
</TR>
<TR id="categoryFilterTr">
	<TH align=left width=80px>推广过滤:</TH>
	<TH width=100px align=left>
	<select id="categoryFilterSelect">
		<option value="0">全部</option>
		<option value="item">商品推广</option>
		<option value="shop">店铺推广</option>
		<option value="channel">频道推广</option>
		<option value="key">关键词推广</option>
		<option value="blog">软文推广</option>
		<option value="activity">活动推广</option>
	</select>
	</TH>
	<TH align=left colspan=4>
	<select id="category-items" style="display:none">
		<option value="0">全部</option>
		<#if items??&&items?size!=0>
		<#list items as i><option value="${i.num_iid}">${i.title}</option></#list>
		</#if>
	</select>
	<select id="category-shops" style="display:none">
		<option value="0">全部</option>
		<#if shops??&&shops?size!=0>
		<#list shops as s><option value="${s.sid}">${s.title}</option></#list>
		</#if>
	</select>
	<select id="category-channels" style="display:none">
		<option value="0" selected>全部</option>
		<option value="channelcode">综合频道</option>
		<option value="shop_street">店铺街</option>
		<option value="brand_lib">品牌库</option>
		<option value="channelmall">商城频道</option>
		<option value="electric">电器城频道</option>
		<option value="man">男人频道</option>
		<option value="lady">女人频道</option>
		<option value="digital">数码频道</option>
		<option value="baby">居家玩具</option>
		<option value="beauty">美容频道</option>
		<option value="jewelry">饰品鞋包</option>
		<option value="food">食品频道</option>
		<option value="mallhouse">家装频道</option>
		<option value="taiwan">台湾馆频道</option>
		<option value="channelfy">淘宝风云榜</option>
	</select>
	<select id="category-blogs" style="display:none">
		<option value="0">全部</option>
		<#if blogs??&&blogs?size!=0>
		<#list blogs as b><option value="${b.blogid}">${b.subject}</option></#list>
		</#if>
	</select>
	<select id="category-activitys" style="display:none">
		<option value="0">全部</option>
		<#if activities??&&activities?size!=0>
		<#list activities as a><option value="${a.eventId}">${a.title}</option></#list>
		</#if>
	</select>
	</TH>
</TR>
</THEAD>
</table>

<table class="wTable" style="width:750px;">
<THEAD>
<TR>
<TH width=30%>开始时间:<input id="startDate" value="${startDate}"></TH>
<TH width=30%>结束时间:<input id="endDate" value="${endDate}"></TH>
<TH align=left><input type="button" id="analyticsButton" value="开始查询"></TH>
</TR>
</THEAD>
</table>
<table id="tableProfile" class="wTable" style="width:750px;margin-top:5px;">
</table>
</@xt.taoketemplate>
