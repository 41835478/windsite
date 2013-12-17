<#ftl strip_whitespace=true>
<#function widgetLayout layout>
	<#switch layout>
	<#case 0>
	<#return "单栏">
	<#case 1>
	<#return "两栏(1-3)右">
	<#case 2>
	<#return "三栏(1-3-1)中">
	<#case 3>
	<#return "两栏(1-1)左/右">
	<#case 4>
	<#return "三栏(1-1-1)左/中/右">
	<#case 5>
	<#return "两栏(1-3)左 ">
	<#case 6>
	<#return "三栏(1-3-1)左/右 ">
</#switch>
</#function>
<#function taobaoCredit level>
	<#switch level>
	<#case 1>
	<#return "s_red_1">
	<#case 2>
	<#return "s_red_2">
	<#case 3>
	<#return "s_red_3">
	<#case 4>
	<#return "s_red_4">
	<#case 5>
	<#return "s_red_5">
	<#case 6>
	<#return "s_blue_1">
	<#case 7>
	<#return "s_blue_2">
	<#case 8>
	<#return "s_blue_3">
	<#case 9>
	<#return "s_blue_4">
	<#case 10>
	<#return "s_blue_5">
	<#case 11>
	<#return "s_cap_1">
	<#case 12>
	<#return "s_cap_2">
	<#case 13>
	<#return "s_cap_3">
	<#case 14>
	<#return "s_cap_4">
	<#case 15>
	<#return "s_cap_5">
	<#case 16>
	<#return "s_crown_1">
	<#case 17>
	<#return "s_crown_2">
	<#case 18>
	<#return "s_crown_3">
	<#case 19>
	<#return "s_crown_4">
	<#case 20>
	<#return "s_crown_5">
	<#default>
	<#return "s_red_1">
	</#switch>
</#function>
<#macro rate RATE commission=0>
<#if www??&&''!=www&&((versionNo??&&versionNo>=2))>
<#if 0==RATE><a class="fanli-login" onClick="openLoginFanliDialog();return false;" target="_blank">需登录</a><#else><span class="fanli">${commission*RATE*100}集分宝</span></#if>
</#if>
</#macro>
<#macro convertLink href=''>
<#assign href=href?replace('mm_[0-9]+_0_0',pid,'r')>
<#if www??&&''!=www&&((versionNo??&&versionNo>=2))&&MEMBER??>${href?replace('xintao00[0-9]','xtfl'+MEMBER.id,'r')}<#else>${href}</#if>
</#macro>
<#macro layout layout=0>
${widgetLayout(layout)}
</#macro>
<#macro credit level=1>
${taobaoCredit(level)}
</#macro>
<#macro pager per=10 pageNo=1 pageSize=10 pageCount=1 url="" pageNoStr="pageNo" pageSizeStr="pageSize">
<#assign startPoint=1 endPoint=per pd=per/2>
<ul class="pages">
<li class="pgNext<#if pageNo<=1> pgEmpty</#if>" page="1"><a href="<#if !(pageNo<=1)><#if url??&&url!=""><#if url?contains('?')>${url+'&'+pageNoStr+'=1&'+pageSizeStr+'='+pageSize}<#else>${url+'?'+pageNoStr+'=1&'+pageSizeStr+'='+pageSize}</#if><#else>#</#if><#else>javascript:void(0);</#if>">首页</a></li>
<li class="pgNext<#if pageNo<=1> pgEmpty</#if>" page="${pageNo-1}"><a href="<#if !(pageNo<=1)><#if url??&&url!=""><#if url?contains('?')>${url+'&'+pageNoStr+'='+(pageNo-1)+'&'+pageSizeStr+'='+pageSize}<#else>${url+'?'+pageNoStr+'='+(pageNo-1)+'&'+pageSizeStr+'='+pageSize}</#if><#else>#</#if><#else>javascript:void(0);</#if>">上一页</a></li>
<#if (pageNo>pd)>
	<#if per%2==0>
		<#assign startPoint=pageNo-pd endPoint=pageNo+pd>
	<#else>
		<#assign startPoint=pageNo-pd+1  endPoint=pageNo+pd>	
	</#if>
</#if>	
<#if (endPoint>pageCount)>
	<#assign startPoint=pageCount-per+1  endPoint=pageCount>	
</#if>
<#if (startPoint<1)>
	<#assign startPoint=1>
</#if>
<#if (endPoint<1)>
	<#assign endPoint=1>
</#if>
<#list startPoint..endPoint as p>
	<li class="page-number<#if pageNo==p> pgCurrent</#if>"><a href="<#if url??&&url!=""><#if url?contains('?')>${url+'&'+pageNoStr+'='+p+'&'+pageSizeStr+'='+pageSize}<#else>${url+'?'+pageNoStr+'='+p+'&'+pageSizeStr+'='+pageSize}</#if><#else>javascript:void(0);</#if>">${p}</a></li>
</#list>
<li class="pgNext<#if (pageNo>=pageCount)> pgEmpty</#if>" page="${pageNo+1}"><a href="<#if !(pageNo>=pageCount)><#if url??&&url!=""><#if url?contains('?')>${url+'&'+pageNoStr+'='+(pageNo+1)+'&'+pageSizeStr+'='+pageSize}<#else>${url+'?'+pageNoStr+'='+(pageNo+1)+'&'+pageSizeStr+'='+pageSize}</#if><#else>#</#if><#else>javascript:void(0);</#if>">下一页</a></li>
<li class="pgNext<#if (pageNo>=pageCount)> pgEmpty</#if>" page="${pageCount}"><a href="<#if !(pageNo>=pageCount)><#if url??&&url!=""><#if url?contains('?')>${url+'&'+pageNoStr+'='+pageCount+'&'+pageSizeStr+'='+pageSize}<#else>${url+'?'+pageNoStr+'='+pageCount+'&'+pageSizeStr+'='+pageSize}</#if><#else>#</#if><#else>javascript:void(0);</#if>">末页</a></li>
</ul>
</#macro>
<#macro info>
<div id="macro_info" class="info" align="left" style="position:relative;">
	<#nested>
	<img style="position:absolute;cursor:pointer;float:right;top:-14px;right:0px;" src="http://static.xintaonet.com/assets/images/delete.gif" onclick="$(this).parent().hide();"/>
</div>
</#macro>
<#macro help>
<div class="help_info" align="left" style="position:relative;">
	<#nested>
</div>
</#macro>
<#macro header>
<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'> 
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<#nested>
<#include "/site/template/import.ftl">
<script>
$(function() {
	$('#site-login-dialog').dialog({
		bgiframe : true,
		autoOpen:false,
		height : 200,
		width : 400,
		zIndex : 1000,
		modal : false
	});
});
</script>
</head>
<body>
<#if USER??&&(!USER.uc_id??)>
<style>
.ui-dialog-titlebar{background:url(http://static.xintaonet.com/assets/images/bg_box_title.png);}
</style>
<script>
$(function() {
	$('#homeGuide').dialog({
		bgiframe : true,
		height : 150,
		width : 400,
		zIndex : 1000,
		resizable:false,
		modal : false
	});
	$('#homeGuide').dialog('open');
});
</script>
<div id="homeGuide" style="display:none;" align="center">
	<div align="center">
		<table><tr><td><span style="font-size:11pt;font-weight:bold;color:#E65802;">您尚未激活新淘家园！</span></td></tr>
		<tr><td><a href="/router/site/loginuc?redirect=http://home.xintaonet.com" class="t_button"  target="_blank"><span>激活家园</span></a></td></tr></table>
	</div>
</div>
</#if>
<div id="site-login-dialog" style="display:none;position:relative;" title="请选择要登录的应用" align=center>
<style>
.btn-web-account {background:url(http://static.xintaonet.com/assets/images/btn_bg.png) no-repeat;outline:none;}.btn-web-account{text-align:left;color:#000;display:inline-block;font-size:14px;height:32px;line-height:32px;margin:10px 0;padding:0 5px 0 40px;width:163px;outline:none;}.btn-web-account{background-position:0 0;}.btn-web-account:hover {background-position:-228px 0;}

</style>
<div class="fm-item"><a class="btn-web-account" href="${taobaoEnv.container}" title="适合普及版，返利版(月租型)，卖家版">登录淘客卖家联盟</a><br/><span>适合普及版，返利版(月租型)，卖家版</span></div>
<div class="fm-item"><a class="btn-web-account" href="javascript:openLoginXTDialog();" title="适合返利版(分成型)">登录淘客分成版</a><br/><span>适合分成型</span></div>
</div>
<div id="wrap">
	<div id="site-nav-bg">
		<div id="site-nav">
			<table width="100%" height="25px" style="font-size: 9pt;">
				<tr>
					<td align="left">
					<#if USER??>
					您好,${USER.nick}！<a href="/router/site/logout">[退出]</a>&nbsp;
					<#if USER.role=="admin">&nbsp;|&nbsp;<a href="/router/member/admin">管理员控制台</a></#if>
					<#else>
					您好,欢迎来新淘网！
					<a href="javascript:;" onClick="$('#site-login-dialog').dialog('open');">[请登录]</a>
					</#if>
					</td>
					<td align="right">
					<!--<a href="/router/site/loginuc?redirect=http://home.xintaonet.com" target="_blank"><span>新淘家园</span></a>&nbsp&nbsp|
					<a href="/router/site/loginuc?redirect=http://forum.xintaonet.com" target="_blank"><span>论坛交流</span></a>&nbsp&nbsp|-->
					<a href="/router/site/view/support">帮助中心</a>&nbsp;&nbsp;&nbsp;官方QQ群:123845835</td>
					
				</tr>
			</table>
		</div>
	</div>
	<div id="main" class="clearfix">
		<div id="header" align="left" style="position:relative;">
			<div style="float: left;"><a href="/"><img src="http://static.xintaonet.com/assets/images/logo.png" style="margin-top:13px;"/></a></div>
			<ul class="index-menu ui-corner-top" style="position:absolute; right: 0px; width:795px;height:37px;margin:0px;padding:0px;padding-left:10px;top:20px;background:url(http://static.xintaonet.com/assets/images/headernavbg.jpg);background-position: 0px 0px;background-repeat: repeat-x;">
				<li id="myIndex"><a href="/router/site"><span>首页</span></a></li>
				<#if USER??>
				<li id="myXintao"><a href="/router/member/sitemanager"><span>我的新淘网</span></a></li>
				<li style="position:relative;"><a href="/router/member/page/manager"><span>淘站装修</span></a></li>
				<!--<li id="myWidget" style="position:relative;"><a href="/router/member/widget/my"><span>我的组件库</span></a></li>
				<li id="myForums" style="position:relative;"><a href="/router/member/forums"><span>我的推广阵地</span></a></li>-->
				</#if>
				<#if !USER??>
				<li id="aboutMenu"><a href="/router/site/view/about"><span>新淘介绍</span></a></li>
				</#if>
				<!--<li><a href="http://forum.xintaonet.com" target="_blank"><span>论坛交流</span></a></li>-->
				<!--<li id="supportMenu"><a href="/router/site/view/support"><span>帮助中心</span></a></li>-->
				<li id="adsMenu"><a href="/router/site/ads"><span>商家合作</span></a></li>
				<!--<li id="activity" style="position:relative;"><a href="/router/site/activity/jklp"><span>推广大赛</span></a><img style="position:absolute;right:0px;top:-8px;" src="/designer/assets/images/new.gif"/></li>-->
				<li><a href="http://club.alimama.com/" target="_blank"><span>联盟大学</span></a></li>
				<!--<#if USER??>
				<li><a  id="functionsButton"><span>功能导航</span></a></li>
				</#if>-->
			</ul>
		</div>
	   	<div id="wholeBodyLay">
</#macro>
<#macro haibaoheader>
<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'> 
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<#nested>
<link rel="stylesheet" href="http://static.xintaonet.com/assets/min/css/haibao/haibao.css?v=${dateVersion()}" type="text/css"/>
<link rel="stylesheet" href="http://static.xintaonet.com/assets/min/css/haibao/skin/${tSkin}.css?v=${dateVersion()}" type="text/css"/>
<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push( [ '_setAccount', 'UA-10891782-8' ]);
	_gaq.push( [ '_trackPageview' ]);
	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl'
				: 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
</script>
</head>
<body>
<div id="wrap">
	<div id="main" class="clearfix">
		<div id="header" align="left" style="position:relative;">
			 <#include "/site/template/channels.ftl">
			<embed src="http://a.alimama.cn/widget/yr1/yr1fixed_950_90.swf" flashvars="catid=&count=20&sz=15&type=2&i=${pid}" width="950" height="90" quality="high" wmode="transparent" bgcolor="#ffffff" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />
			<div id="container2" class="sk_ul" style="margin-top:15px;">
	        <ul id="containerUl2">
	            <li><a href="http://s.click.taobao.com/t_9?p=${pid}&amp;u=${taobaoEnv.appKey}&amp;l=http%3A%2F%2Fmall.taobao.com%2F" target="_blank"><img border="0" src="http://img.alimama.cn/cms/images/1269407736835.png"></a></li>
	            <li id="txt_mall2">
				<form name="tbk_b2c_search_form" action="/keywords" target="_blank"><input id="searchtext2" name="words" type="text" class="keyword" value=""></form>
	            </li>
	            <li id="search_btn"><button onclick="document.tbk_b2c_search_form.submit()"></button></li>
	        </ul>
			</div>
		</div>
		
	   	<div id="wholeBodyLay">
</#macro>
<#macro fanliheader navselected='H01'>
<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'> 
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<#nested>
<#include "/site/template/import.ftl">
<script src="/assets/min/js/fanlisite.min.js?v=${dateVersion()}" type="text/javascript"></script>
<link rel="stylesheet" href="http://static.xintaonet.com/assets/min/css/fanli.css?v=${dateVersion()}" type="text/css"/>
<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push( [ '_setAccount', 'UA-10891782-8' ]);
	_gaq.push( [ '_trackPageview' ]);
	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl'
				: 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
</script>
</head>
<body>
<div id="wrap">
<#include "/site/template/memberHeader.ftl">
	<div id="navigation" style="margin-top:50px;">
		<div class="lc"></div>
		<div class="mc">
			<ul id="firstMenu">
				<li <#if navselected=='H01'> class="current"</#if>><a href="/router/fanlimember"><span>会员中心</span></a></li>
				<li <#if navselected=='H06'> class="current"</#if>><a href="/router/fanlimember/order"><span>找回订单</span></a></li>
				<li <#if navselected=='H02'> class="current"</#if>><a href="/router/fanlimember/report"><span>交易记录</span></a></li>
				<li <#if navselected=='H03'> class="current"</#if>><a href="/router/fanlimember/trade"><span>返利记录</span></a></li>
				<li <#if navselected=='H04'> class="current"</#if>><a href="/router/fanlimember/ads"><span>我的推广</span></a></li>
				<li <#if navselected=='H05'> class="current"</#if>><a href="/router/fanlimember/info"><span>用户信息</span></a></li>
			</ul>
		</div>
		<div class="rc"></div>
	</div>
	<div id="main" class="clearfix">
		<div id="header" align="left" style="position:relative;background:none;height:0px;">
		</div>
	   	<div id="wholeBodyLay">
	   	<#if bulletin??&&''!=bulletin><div class="bulletin" style="margin-bottom:10px;border:2px solid #f60;padding:5px;">${bulletin}</div></#if>
</#macro>
<#macro fanliheader2>
<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'> 
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<#nested>
<#include "/site/template/import.ftl">
<script src="/assets/min/js/fanli.min.js?v=${dateVersion()}" type="text/javascript"></script>
<link rel="stylesheet" href="http://static.xintaonet.com/assets/min/css/fanli.css?v=${dateVersion()}" type="text/css"/>
<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push( [ '_setAccount', 'UA-10891782-8' ]);
	_gaq.push( [ '_trackPageview' ]);
	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl'
				: 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
</script>
</head>
<body>
<div id="wrap">
	<#include "/site/template/memberHeader.ftl">
	<div id="main" class="clearfix">
		<div id="header" align="left" style="position:relative;background:none;height:0px;">
		</div>
	   	<div id="wholeBodyLay">
</#macro>
<#macro siteHeader isSearch=true isChannels=true>
<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'> 
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<#nested>
<#include "/site/template/import.ftl">
<#if isSearch>
<style>
.search-form {margin: 5px 0px 0px 156px;padding-top: 0px;position: relative;width: 670px;}.search-form fieldset{border:0px;}.search-form legend {display: none;}
.search-auto,.search-form .input, .search-form .l, .search-form button, .search-form .r {background: url(http://static.xintaonet.com/assets/min/images/T1.udLXn4aXXXXXXXX.png) repeat-x;}
.search-auto {background-position: 0px -126px;height: 32px;padding: 5px;position: relative;width: 594px;}.search-auto .l, .search-auto .r {height: 42px;position: absolute;top: 0px;width: 5px;}.search-auto .l {background-position: -142px -26px;left: 0px;}.search-auto .r {background-position: -146px -26px;right: 0px;}
.search-form .input {background-color: white;background-position: 0px -68px;float: left;height: 32px;position: relative;width: 463px;}.search-form .input .l, .search-form .input .r {height: 32px;position: absolute;top: 0px;width: 3px;}
.search-form .input .l {background-position: -136px -36px;left: 0px;}.search-form .input .r {background-position: -139px -36px;right: 0px;z-index: 1;}
.search-form .input input {background: transparent;border: none;font: normal normal normal 14px/18px verdana, tahoma, arial, 宋体, sans-serif;height: 18px;left: 0px;padding: 7px 6px;position: absolute;top: 0px;width: 290px;}
.search-form .allWidth input {width: 451px;}.search-form button {cursor:pointer;background-position: 0px -36px;border: none;float: left;height: 32px;text-indent: -9999px;width: 131px;}
.search-form label {float:left;width:60px;background: url(http://img.alimama.cn/images/cps/tb_logo1.gif) no-repeat 0px 2px;display: block;height: 46px;}
</style>
</#if>
</head>
<body>
<div id="wrap">
	<#include "/site/template/memberHeader.ftl">
	<div id="main" class="clearfix">
		<#if isChannels>
		<div id="header" align="left" style="position:relative;height:30px;"><#include "/site/template/channels.ftl">
		<!--<a style="clear:both;" href="http://taoke.alimama.com/tms/channel/jipiao.htm?pid=${pid}" target="_blank"><img src="http://www.xintaonet.com/assets/min/images/ads/jipiao_950X90.jpg" style="border:0px;"></a>-->
		</div>
		<#else>
		<div id="header" align="left" style="position:relative;height:0px;">
		<!--<a style="clear:both;" href="http://taoke.alimama.com/tms/channel/jipiao.htm?pid=${pid}" target="_blank"><img src="http://www.xintaonet.com/assets/min/images/ads/jipiao_950X90.jpg" style="border:0px;"></a>-->
		</div>
		</#if>
	   	<div id="wholeBodyLay">
	   	<#if isSearch>
	   	<div class="search-form">
   			<label for="q"></label>
				<fieldset>
					<legend>搜索</legend>
						<form name="tbk_b2c_search_form" action="/search" target="_blank">
						<div class="search-auto">
							<s class="l"></s><s class="r"></s>
							<div class="input allWidth"><s class="l"></s><s class="r"></s>
							<input name="q" maxlength="60" value="" id="q" autocomplete="off">
							<input type="hidden" name="cid" value="">
							</div>
							<button id="searchHuabao" onclick="document.tbk_b2c_search_form.submit()">搜索</button>
						</div>
					</form>	
				</fieldset>
		</div>
		<div style="clear:both;"></div>
		</#if>
</#macro>
<#macro siteFooter>
			</div>
			</div>
		</div>
		<div id="footer" class="layfoot" align="center" style="margin:0px auto;border-top:1px #d1d7dc solid;padding-top:10px;text-align:center;line-height:24px;clear:both">
			<#if ((versionNo??&&versionNo>=2))&&www??&&www!=''&&friendLinks??&&friendLinks?size!=0><#list friendLinks as t><a target="_blank" href="<#if t.url?starts_with('/')>http://${www}${t.url}<#else>${t.url}</#if>">${t.title}</a>&nbsp;&nbsp;&nbsp;<#if t_index==9><br/></#if></#list>
			<#else>
			 Copyright 2009-2010 版权所有  <a href="http://www.xintaonet.com" style="color:#888">新淘网(www.xintaonet.com)</a>（<a  style="color:#888" href="http://www.miibeian.gov.cn/" target="_blank">京ICP备10035914号</a>）
			</#if>
		</div>
<#if ((versionNo??&&versionNo>=2))&&www??&&www!=''&&baiduTongJi??&&''!=baiduTongJi>
	<script type="text/javascript">
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F${baiduTongJi}' type='text/javascript'%3E%3C/script%3E"));
</script>
</#if>		
<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push( [ '_setAccount', 'UA-10891782-8' ]);
	_gaq.push( [ '_trackPageview' ]);
	<#nested>
	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl'
				: 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
</script>
<#if analyticsType??&&""!=analyticsType>
	<#if "analytics_google"==analyticsType>
	<script type="text/javascript">var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));</script><script type="text/javascript">try {var pageTracker = _gat._getTracker("${gid}");pageTracker._trackPageview();} catch(err) {}</script>
	<#elseif "analytics_linezing"==analyticsType>
	<script type="text/javascript" src="http://js.tongji.linezing.com/${lid}/tongji.js"></script><noscript><a href="http://www.linezing.com"><img src="http://img.tongji.linezing.com/${lid}/tongji.gif"/></a></noscript>
	<#elseif "analytics_51la"==analyticsType>
	<script language="javascript" type="text/javascript" src="http://js.users.51.la/${laid}.js"></script><noscript><a href="http://www.51.la/?${laid}" target="_blank"><img alt="&#x6211;&#x8981;&#x5566;&#x514D;&#x8D39;&#x7EDF;&#x8BA1;" src="http://img.users.51.la/${laid}.asp" style="border:none" /></a></noscript>
	</#if>
</#if>		
</body>
</html>
</#macro>