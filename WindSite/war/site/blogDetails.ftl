<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'> 
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="keywords" content="${blog.subject}">
<meta name="description" content="${blog.subject}">
<title>${blog.subject}- ${sitetitle}</title>

<#include "/site/template/import.ftl">
<style>
.rc-tp,.bd{background: url(/assets/min/images/shops_header_bg.png) no-repeat -999em 0px;}
.rc-bt{background-position: -96px -424px;display: block;height: 4px;margin-top: -4px;position: relative;}
.bd{background-position: 0px -459px;background-repeat: repeat-x;border-bottom: none;border: 1px #F69968;height: 33px;}
.trade{float: left;font-size: 14px;line-height: 33px;margin-top: 3px;overflow: hidden;padding-left: 5px;position: relative;}
.tabs{width:950px;background: url(http://static.xintaonet.com/assets/images/titleBg.png) repeat-x 0px -121px;border:1px solid #DFDFDF;color: #C9C9C9;height: 29px;line-height: 29px;}
.tabs a{border:1px solid #C9C9C9;float: left;font-size: 14px;height: 29px;margin-left: -1px;padding: 0px 20px;}
.tabs a:hover{color: #4C7E07;font-weight: bold;}
.tabs-selected,.tabs-selected:hover{background: white;color: #4C7E07;font-weight: bold;height: 30px;margin-bottom: -1px;position: relative;text-decoration: none;}
#blog-div{clear: none;color: #444;display: block;font-family: Verdana, 'Lucida Grande', Arial, Helvetica, sans-serif;font-size: 14px;font-style: normal;font-variant: normal;font-weight: normal;line-height: 25px;overflow-x: visible;overflow-y: visible;padding-bottom: 0px;padding-left: 0px;padding-right: 0px;padding-top: 0px;word-break: break-all;word-wrap: break-word;}
.search-form {margin: 5px 0px 0px 156px;padding-top: 26px;position: relative;width: 670px;}.search-form fieldset{border:0px;}.search-form legend {display: none;}.search-tab {left: 0px;position: absolute;top: 0px;z-index: 2;}.search-tab li {float: left;height: 26px;line-height: 26px;padding: 0px 15px;position: relative;text-align: center;top: 1px;z-index: 1;}
.search-auto,.search-form .input, .search-tab li.selected, .search-tab li.selected .l, .search-tab li.selected .r, .search-form .l, .search-form button, .search-form .r {background: url(/assets/min/images/T1.udLXn4aXXXXXXXX.png) repeat-x;}
.search-tab li.selected {background-position: 0px -100px;}.search-tab li.selected .l, .search-tab li.selected .r {height: 26px;position: absolute;top: 0px;width: 4px;}.search-tab li.selected .l {background-position: -142px 0px;left: 0px;}.search-tab li.first .l {background-position: -131px -40px;height: 28px;}
.search-tab li.selected .r {background-position: -146px 0px;right: 0px;}.search-tab li a {display: block;outline: none;white-space: nowrap;}.search-tab li.selected a {border: none;color: #333;font-weight: bold;}
.search-auto {background-position: 0px -126px;height: 32px;padding: 5px;position: relative;width: 594px;}.search-auto .l, .search-auto .r {height: 42px;position: absolute;top: 0px;width: 5px;}.search-auto .l {background-position: -142px -26px;left: 0px;}.search-auto .r {background-position: -146px -26px;right: 0px;}
.search-form .input {background-color: white;background-position: 0px -68px;float: left;height: 32px;position: relative;width: 463px;}.search-form .input .l, .search-form .input .r {height: 32px;position: absolute;top: 0px;width: 3px;}
.search-form .input .l {background-position: -136px -36px;left: 0px;}.search-form .input .r {background-position: -139px -36px;right: 0px;z-index: 1;}
.search-form .input input {background: transparent;border: none;font: normal normal normal 14px/18px verdana, tahoma, arial, 宋体, sans-serif;height: 18px;left: 0px;padding: 7px 6px;position: absolute;top: 0px;width: 290px;}
.search-form .allWidth input {width: 451px;}.search-form button {cursor:pointer;background-position: 0px -36px;border: none;float: left;height: 32px;text-indent: -9999px;width: 131px;}
.search-form label {float:left;width:60px;background: url(http://img.alimama.cn/images/cps/tb_logo1.gif) no-repeat 0px 2px;display: block;height: 46px;}

.widget-itemsscrollableview-items {display: none;padding: 0px;overflow: hidden;width: 100%;}.widget-itemsscrollableview-items {position: relative;overflow: hidden;height: 200px;width: 100%;}.widget-itemsscrollableview-items .items {width: 20000em;left: 0px;position: absolute;clear: both;}.widget-itemsscrollableview-items .items div.item {float: left;width: 100%;}.widget-itemsscrollableview-items .d-a-i {float: left;margin: 10px 4px 15px 4px;_margin: 10px 3px 15px 3px;background-color: #fff;padding: 2px;_padding: 1px;-moz-border-radius: 4px;-webkit-border-radius: 4px;vertical-align: middle;width: 160px;height: 160px;float: left;vertical-align: middle;border: 1px solid #ccc;}.widget-itemsscrollableview-items .d-a-i a {background-color: #F7F7F7;width: 160px;height: 160px; *font-size: 140px;}.widget-itemsscrollableview-items .d-a-i img {vertical-align: middle;border: 0px; #margin-top: -2px; /*IE7*/}
.navi {position: absolute;right: 70px;top: 7px;}.navi a {width: 8px;height: 8px;float: left;margin: 3px;background: url(http://static.xintaonet.com/assets/images/navigator.png) 0 0 no-repeat;display: block;font-size: 1px;}.navi a:hover {background-position: 0 -8px;}.navi a.active {background-position: 0 -16px;}
.ui-designer-widget{background-color: #F6F6F6;border: 1px solid #CCC;}b.widget-title {color: #F50;font-size: 14px;font-weight: bold;line-height: 18px;padding-left: 20px;}
.ui-designer-widget-header{position:relative;height:25px;line-height:25px;border-bottom: 1px solid #CCC;}.ui-designer-widget-more{position:absolute;right:0px;}
</style>
<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push( [ '_setAccount', 'UA-10891782-8' ]);
	_gaq.push( [ '_trackPageview' ]);
<#if pid??&&pid!=''>_gaq.push(['_trackEvent', 'xt-${pid}', 'blog-${blog.blogid}', '${blog.subject}']);</#if>
	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl'
				: 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
	$(function(){adBlog('${sid}','bottom');});
var WidgetUtils={itemsScrollableView_init:function(b){var a=b.parent();$(".navi",a).length==0&&$(".ui-designer-widget-header",a).append('<div class="navi"></div>');b.show();a=b.width(b.width()-2).height(200);if($(".item",a).width(b.width()-2).length>0){a.scrollable({circular:true});a.navigator({navi:b.parent().find(".navi").empty()});a.autoscroll({interval:5E3})}}};
function adBlog(b,a){!b||!a||b==""||a==""||$.ajax({url:"/router/ad/blog?sid="+b+"&type="+a,type:"GET",data:{},dataType:"html",beforeSend:function(c){c.setRequestHeader("WindType","AJAX");c.setRequestHeader("WindDataType","HTML")},error:function(c,d,e){},success:function(c){$("#"+a+"Ads").append(c)}})};
</script>
</head>
<body>
<#function blog_flash $swf_url=''  $type=''>
<#assign $width='520' $height='390'>
<#if $type=='media'>
	<#return '<object classid="clsid:6bf52a52-394a-11d3-b153-00c04f79faa6" width="'+$width+'" height="'+$height+'"><param name="autostart" value="0"><param name="url" value="'+$swf_url+'"><embed autostart="false" src="'+$swf_url+'" type="video/x-ms-wmv" width="'+$width+'" height="'+$height+'" controls="imagewindow" console="cons"></embed></object>'>
	<#elseif $type=='real'>
	<#return '<object classid="clsid:cfcdaa03-8be4-11cf-b84b-0020afbbccfa" width="'+$width+'" height="'+$height+'"><param name="autostart" value="0"><param name="src" value="'+$swf_url+'"><param name="controls" value="Imagewindow,controlpanel"><param name="console" value="cons"><embed autostart="false" src="'+$swf_url+'" type="audio/x-pn-realaudio-plugin" width="'+$width+'" height="'+$height+'" controls="controlpanel" console="cons"></embed></object>'>
	<#else>
	<#return '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="'+$width+'" height="'+$height+'"><param name="movie" value="'+$swf_url+'"><param name="allowscriptaccess" value="always"><embed src="'+$swf_url+'" type="application/x-shockwave-flash" width="'+$width+'" height="'+$height+'" allowfullscreen="true" allowscriptaccess="always"></embed></object>'>
</#if>
</#function>
<div id="wrap">
	<div id="site-nav-bg" style="display:none">
		<div id="site-nav">
			<#include "/site/template/memberHeader.ftl">
		</div>
	</div>
	<div id="main" class="clearfix">
		<div id="header" align="left" style="position:relative;height:40px;">
		<#include "/site/template/channels.ftl">
		</div>
   		<div id="wholeBodyLay">
   			<div class="search-form">
   			<label for="q"></label>
				<fieldset>
					<legend>搜索</legend>
						<form name="tbk_b2c_search_form" action="/search" target="_blank">
						<div class="search-auto">
							<s class="l"></s><s class="r"></s>
							<div class="input allWidth"><s class="l"></s><s class="r"></s>
							<input name="q" maxlength="60" value="" id="q">
							<input type="hidden" name="cid" value="">
							</div>
							<button id="searchHuabao" onclick="document.tbk_b2c_search_form.submit()">搜索</button>
						</div>
					</form>	
				</fieldset>
		</div>
		<div id="blogsContainer" style="clear:both;">
		<table width=100%><tr><td>
		<!--<div class="tabs">
			<a href="/blogs/me/${uid}.html?pid=${pid}" <#if type??&&0==type>class="tabs-selected"</#if>>站长日志</a>
			<a href="/blogs/friends/${uid}.html?pid=${pid}" <#if type??&&1==type>class="tabs-selected"</#if>>站长好友日志</a>
			<a href="/blogs/${uid}.html?pid=${pid}" <#if type??&&2==type>class="tabs-selected"</#if>>大家的日志</a>
		</div>-->
		</td></tr><tr><td>
		<table id="blogs" width="100%">
			<tr><td align="center">
			<h1 style="font-size:16px;"><#if class??><a href="/class/${blog.classid}.html" style="font-size:16px;">${class.classname}</a>-</#if>${blog.subject}</h1>
			</td><tr>
			<tr><td align="right">${blog.username}&nbsp;&nbsp;&nbsp;&nbsp;${dateline(blog.dateline)}</td></tr>
			<tr><td>
				<div id="blog-div">
				${blog.message?replace('http://home.xintaonet.com/attachment/','attachment/')?replace('attachment/','http://home.xintaonet.com/attachment/')?replace('mm_[0-9]+_0_0',pid,'r')?replace('\\[flash=?(media|real)*\\](.+)\\[\\/flash\\]', blog_flash('$2', '$1'),'r')}
				</div>
			</td></tr>
			<tr><td>
					<ul>
					<#if prevBlog??><li>上一篇文章：<a href="/blog/${blog.uid}/${prevBlog.blogid}.html">${prevBlog.subject}</a></li></#if>
					<#if nextBlog??><li>下一篇文章：<a href="/blog/${blog.uid}/${nextBlog.blogid}.html">${nextBlog.subject}</a></li></#if>
					</ul>
			</td></tr>
		</table>
		</td></tr>
		<tr><td id="bottomAds"></td></tr>
		</table>
		<#if analyticsType??&&""!=analyticsType>
			<#if "analytics_google"==analyticsType>
			<script type="text/javascript">var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));</script><script type="text/javascript">try {var pageTracker = _gat._getTracker("${gid}");pageTracker._trackPageview();} catch(err) {}</script>
			<#elseif "analytics_linezing"==analyticsType>
			<script type="text/javascript" src="http://js.tongji.linezing.com/${lid}/tongji.js"></script><noscript><a href="http://www.linezing.com"><img src="http://img.tongji.linezing.com/${lid}/tongji.gif"/></a></noscript>
			<#elseif "analytics_51la"==analyticsType>
			<script language="javascript" type="text/javascript" src="http://js.users.51.la/${laid}.js"></script><noscript><a href="http://www.51.la/?${laid}" target="_blank"><img alt="&#x6211;&#x8981;&#x5566;&#x514D;&#x8D39;&#x7EDF;&#x8BA1;" src="http://img.users.51.la/${laid}.asp" style="border:none" /></a></noscript>
			</#if>
		</#if>
</div>
			</div>
		</div>
		<div id="footer" class="layfoot" align="center">
			<table>
				<tr><td>Copyright 2009-2010 版权所有  <a href="http://www.xintaonet.com" style="color:#888">新淘网(www.xintaonet.com)</a>（<a  style="color:#888" href="http://www.miibeian.gov.cn/" target="_blank">京ICP备10035914号</a>）</td></tr>
				<tr><td align="center">合作伙伴:<a target="_blank" href="http://www.alimama.com/"> 
		<img src="/assets/min/images/alimama.gif" width="82" height="20" alt="淘宝联盟" /></a></td></tr>
			</table>
		</div>
</body>
</html>
					