<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>站点管理-我是淘客-新淘网</title>
 <!--[if IE]><script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/excanvas.min.js"></script><![endif]-->
</@ws.header>
<link rel="stylesheet" type="text/css" href="/assets/js/jquery/jqplot/jquery.jqplot.min.css" /> 
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/jquery.jqplot.min.js"></script> 
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/plugins/jqplot.dateAxisRenderer.min.js"></script>
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/plugins/jqplot.highlighter.min.js"></script> 
<script language="javascript" type="text/javascript" src="/assets/js/jquery/jqplot/plugins/jqplot.cursor.min.js"></script>
<script language="javascript" type="text/javascript" src="/assets/min/js/analytics.min.js?v=${dateVersion()}"></script>
<style>
#tableProfile th,#tableProfile td{text-align:center}.nick{font-size: 14px;height: 16px;line-height: 16px;}.key{color:#404040;line-height:14px;height:14px;font-size:12px;}
.member-info{background: #E0EAF0 url(http://static.xintaonet.com/assets/images/myxintao_v3_bg.gif) repeat-x scroll 50% -400px;border: none;padding: 10px;position: relative;}
.xintao-taoke-header{background: white url(http://static.xintaonet.com/assets/images/myxintao_v3_bg.gif) repeat-x scroll 50% -299px;border-top: 1px solid #C4D5E0;height: 22px;}
.xintao-taoke-button{background: url(http://a.tbcdn.cn/app/mytaobao/img/alipay_bg.png) no-repeat scroll 1000px 1000px;background-position: 0px 0px;float: left;height: 30px;line-height: 30px;margin: 0px 5px;text-align: center;width: 70px;}
.mytaobao-bd {background-color: transparent;}.mytaobao-bd .section {border: 1px solid #c4d5e0;margin-bottom: 10px;position: relative;padding: 0 0 10px; *zoom: 1;}
.mytaobao-bd .section h3 {border-bottom: 1px solid #c4d5e0;padding: 1px;margin-bottom: 10px;}.mytaobao-bd .section h3 span {display: block;font-size: 12px;font-weight: bold;height: 21px;line-height: 21px;padding-left: 10px;background: #ebf1f4 url(http://static.xintaonet.com/assets/images/myxintao_v3_bg.gif) scroll repeat-x center -300px;margin: 0;}
.mytaobao-list {margin-left: 12px;}.mytaobao-list li {margin: 2px 0;width:200px;overflow:hidden;margin-bottom:5px;}.mytaobao-list li a{overflow:hidden;width:200px;display:inline;white-space:nowrap}.mytaobao-list li a:hover{color:#f60;}
</style>
<script>
var isSyn=false;
$(function(){
 	getHtmlContent('site-bulletin', '/router/site/bulletin?v=' + Math.random(), 'GET', {}, function(data) {
				$('#site-bulletin').empty().append(data);
			});
 	//createSiteProfile('chartProfile','${USER.pid}');
 	<#if (USER.usb??&&USER.usb.versionNo>=2)>
 	getHtmlContent('fanli-trade-result', '/router/member/sitemanager/trade/count?v=' + Math.random(), 'GET', {}, function(data) {
				$('#fanli-trade-result').empty().append(data);
			});
	getHtmlContent('fanli-income-result', '/router/member/sitemanager/income?v=' + Math.random(), 'GET', {}, function(data) {
				$('#fanli-income-result').empty().append(data);
			});
	</#if>		
});
</script>
<style>fieldset{padding:5px;margin-bottom:10px;border:1px solid #EFEFEF;}fieldset legend{font-weight:700;font-size:14px;color:#014D7F}fieldset table td{height:25px;line-height:17px;} td.key{width:100px;text-align:right;}td.value{line-height:17px;padding-left:20px;}
td.fl-num{text-align:center;width:80px;}th strong{color:red} fieldset .wTable td.value{text-align:left;}a.a-num-un,a.a-num-wait,a.a-num-finish{font-weight:800;font-size:16px;text-decoration: underline;}a.a-num-un{color:red;}a.a-num-wait{color:#090;}a.a-num-finish{color:gray}
</style>
<@xt.taoketemplate navselected='taoke' bdselected='site-manager'>
<@ws.info><span style="color: #F60;">重要公告:</span>&nbsp;&nbsp;<a target="_blank" href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=46363"><strong style="color:red;font-weight:bold;font-size:16px;">2012-07-03:关于近期未开店淘客无法订购新淘网的问题!</strong></a></@ws.info><br/>
<table width=750px ><tr><td width=500px valign=top>
<table width=500px class="member-info" style="line-height:20px;">
<tr>
	<td width=180px valign=top align=center><img src="http://www.xintaonet.com/discuz72/uc_server/avatar.php?uid=${USER.uc_id}"></td>
	<td valign=top><table>
	<tr><td height="20px;"><strong class="nick">${USER.nick}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a style="color:#F60;" onClick="if(!isSyn){isSyn=true;synTaobao();}return false;" id="gtSynTaobao" target="_blank">同步淘宝公开信息</a></td></tr>
	<tr><td align-left><span class="key">阿里妈妈PID：<span style="color:#F60;">${USER.pid}</span></span></td></tr>
	<tr><td align=left><span class="key">上次登录：${USER.last_visit?datetime}</span></td></tr>
	<tr><td align=left><a href="/router/member/versions" style="font-size:14px;font-weight:700;color:red;">查看版本</a></td></tr>
	</table></td>
</tr>
</table>
<#if sites?size==1>
<#list sites as s>
<table width=500px style="margin-top:15px;">
<tr><td class="xintao-taoke-header" width=750px><strong class="nick">我的新淘站点<strong></td></tr>
<tr><td>
<table style="padding:15px;line-height:20px;">
	<tr><td><span class="key">淘站名称：</span>
		<#if s.status==1>
				<a class="site-link" href="<#if USER.sites[0]??&&''!=USER.sites[0].www>http://${USER.sites[0].www}<#else>http://${s.domainName}.xintaonet.com</#if>" target="_blank" style="color:#00E;font-weight:bold;" title="${s.title}">${s.title}</a>
			<#else>
				<span style="color:#00E;font-weight:bold;" title="${s.title}">${s.title}</span>
		</#if>
		<#if s.domainName?starts_with('shop')>&nbsp;&nbsp;&nbsp;<a style="color:#F60;" onClick="createDomainName('${s.id}');return false;">设置自定义二级域名</a></#if>
	</td></tr>
	<tr><td><span class="key">状态：</span><#if s.status==1>已发布<#else>未发布</#if></td></tr><tr><td><span class="key">创建时间：</span>${s.created?datetime}</td></tr>	
</table>
</td></tr>
</table>
</#list>
</#if>
</td><td width=250px valign=top>
<div class="mytaobao-bd" style="margin-left:15px;">
        <div class="section">
            <h3 class="mytaobao-bar-grey"><span>公告</span></h3>
			<ul id="site-bulletin" class="mytaobao-list">
			</ul>
        </div>
    </div>
</td></tr></table>
<#include "site/member/ads/weigou.ftl">
<#if (USER.usb??&&USER.usb.versionNo>=2)>
<fieldset><legend>返利记录</legend>
<div  id="fanli-trade-result" style="width:100%;height:100%;"></div>
</fieldset>
<fieldset><legend>收入信息</legend>
<div  id="fanli-income-result" style="width:100%;height:100%;"></div>
</fieldset>
</#if>
<!--<div id="chartProfile" style="width:750px; height:300px;"></div>
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
</table>-->
</@xt.taoketemplate>
