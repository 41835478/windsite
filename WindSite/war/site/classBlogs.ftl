<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'> 
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="keywords" content="导购,${class.classname},${sitetitle}">
<meta name="description" content="${class.classname},${sitetitle}">
<title>${class.classname}- ${sitetitle}</title>

<#include "/site/template/import.ftl">
<style>
.nick,.title{color:#36C;cursor:pointer;font-size:11pt;}.nick:hover,.title:hover{color: #F60}
.rc-tp,.bd{background: url(/assets/min/images/shops_header_bg.png) no-repeat -999em 0px;}
.rc-bt{background-position: -96px -424px;display: block;height: 4px;margin-top: -4px;position: relative;}
.bd{background-position: 0px -459px;background-repeat: repeat-x;border-bottom: none;border: 1px #F69968;height: 33px;}
.trade{float: left;font-size: 14px;line-height: 33px;margin-top: 3px;overflow: hidden;padding-left: 5px;position: relative;}
.tabs{width:950px;background: url(/assets/images/titleBg.png) repeat-x 0px -121px;border:1px solid #DFDFDF;color: #C9C9C9;height: 29px;line-height: 29px;}
.tabs a{border:1px solid #C9C9C9;float: left;font-size: 14px;height: 29px;margin-left: -1px;padding: 0px 20px;}
.tabs a:hover{color: #4C7E07;font-weight: bold;}
.tabs-selected,.tabs-selected:hover{background: white;color: #4C7E07;font-weight: bold;height: 30px;margin-bottom: -1px;position: relative;text-decoration: none;}
#blogs dt{border-bottom: 1px dotted #CCC;font-size: 14px;padding: 5px 5px 5px 20px;padding-left: 20px;padding-left: 20px;text-align: left;width: 900px;position:relative;}
#blogs dt .dateline{position:absolute;right:0px;}#blogs dt a{color: #04D;font-size:11pt;font-weight:bold;}#blogs dt a:hover{color:#F60;}
#blogs dt .nick{position:absolute;right:200px;font-weight:normal;font-size:10pt;}
#blogs dd{background: white;border: 1px solid #CCC;color: #6C6C6C;margin-bottom: 10px;margin-top: 10px;padding: 25px 35px;position: relative;text-align: left;width: 830px;zoom: 1;}
.bzArrow{background: url(/assets/images/bzBg.png) no-repeat -240px -87px;display: block;height: 8px;left: 30px;position: absolute;top: -8px;width: 15px;}
.page-info{float: left;height: 20px;line-height: 20px;margin: 0px 3px 0px 0px;overflow: hidden;min-width: 8px;padding: 0px 6px;width: auto;}
.page a{text-decoration: none;color: #555;display:block;float:left;margin: 0px 3px 0px 0px;background: transparent url(/assets/min/images/shops.png) no-repeat scroll 500px 500px;height: 20px;line-height: 20px;overflow: hidden;padding: 0px;text-align: center;vertical-align: middle;white-space: nowrap;border: 1px solid #CCC;}
a.next-page{background-position: -52px -5px;padding: 0px 16px 0px 5px;}
a.end-page{background-position: -52px -21px;}
a.start-page{background-position: 6px -21px;padding: 0px;width:20px;}
a.prev-page{width:20px;background-position: 6px -5px;padding: 0px;}
a.prev-page span,a.start-page span{display: none;}
a.prev-page:hover,a.prev-page:active,a.next-page:hover,a.next-page:active{border-color: #FD6D01;}
.page-bar{background-color: #F9F9F9;border-bottom: 1px solid #F07002;color: #565656;height: 31px;}
</style>
<script>
$(function(){
})
</script>
</head>
<body>
<div id="wrap">
	<div id="site-nav-bg" style="display:none">
		<div id="site-nav">
			<#include "/site/template/memberHeader.ftl">
		</div>
	</div>
	<div id="main" class="clearfix">
		<div id="header" align="left" style="position:relative;">
		<#include "/site/template/channels.ftl">
		</div>
   		<div id="wholeBodyLay">
			<div align="center" style="padding-top:10px;">
			<script type='text/javascript'>
			alimama_pid='${pid}';
			alimama_type='g';
			alimama_tks={};
			alimama_tks.style_i=1;
			alimama_tks.lg_i=1;
			alimama_tks.w_i=772;
			alimama_tks.h_i=69;
			alimama_tks.btn_i=1;
			alimama_tks.txt_s='';
			alimama_tks.hot_i=1;
			alimama_tks.hc_c='#999999';
			alimama_tks.c_i=1;
			alimama_tks.cid_i=0;
			</script>
			<script type='text/javascript' src='http://a.alimama.cn/inf.js'></script>
			</div>
		<div id="blogsContainer">
		<table><tr><td>
		<div class="tabs">
			<a href="#">${class.classname}</a>
		</div>
		</td></tr><tr><td>
		<div id="blogs">
		<table width=100% class="page-bar"><tr><td align="right" style="position:">
<#assign url='/class/'+class.classid+'.html'>
<@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount?number url=url></@ws.pager>
</td></tr></table>
		<dl>
			<#if blogs??&&blogs?size!=0>
			<#list blogs as b>
			<dt><a href="/blog/${b.uid}/${b.blogid}.html?pid=${pid}" target="_blank">${b.subject}</a><a class="nick" href="http://home.xintaonet.com/?${b.uid}" target="_blank">${b.username}</a><span class="dateline">${dateline(b.dateline)}</span></dt>
			</#list> 
			<#else>
			<dt>糟糕！未找到符合的日志！访问<a href="http://home.xintaonet.com">新淘家园</a>阅读更多信息</dt>
			</#if>
		</dl>
		</div>
		</td></tr></table>
		</div>
		<#if analyticsType??&&""!=analyticsType>
			<#if "analytics_google"==analyticsType>
			<script type="text/javascript">var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));</script><script type="text/javascript">try {var pageTracker = _gat._getTracker("${gid}");pageTracker._trackPageview();} catch(err) {}</script>
			<#elseif "analytics_linezing"==analyticsType>
			<script type="text/javascript" src="http://js.tongji.linezing.com/${lid}/tongji.js"></script><noscript><a href="http://www.linezing.com"><img src="http://img.tongji.linezing.com/${lid}/tongji.gif"/></a></noscript>
			<#elseif "analytics_51la"==analyticsType>
			<script language="javascript" type="text/javascript" src="http://js.users.51.la/${laid}.js"></script><noscript><a href="http://www.51.la/?${laid}" target="_blank"><img alt="&#x6211;&#x8981;&#x5566;&#x514D;&#x8D39;&#x7EDF;&#x8BA1;" src="http://img.users.51.la/${laid}.asp" style="border:none" /></a></noscript>
			</#if>
		</#if>
		<#include "/site/template/footer.ftl">