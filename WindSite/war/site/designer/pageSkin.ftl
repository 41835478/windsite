<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<head>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站">
<meta name="description" content="新淘网 - 新淘网实现了多种酷炫图片组件封装，向广大普通互联网用户提供一站式的建站方案，大幅度降低建站门槛，会用鼠标就可以拖拽生成独立而漂亮的淘宝推广网站，让更多的普通互联网用户成为专业淘客、推广淘宝、赚取佣金">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>淘站主题-新淘网</title>
<link href="/assets/css/ui/jquery-ui.css" rel="stylesheet"/>
<link href="/assets/stylesheets/common.css" rel="stylesheet"/>
<link href="/assets/stylesheets/xintao.css" rel="stylesheet"/>
<link href="/assets/stylesheets/designer.css" rel="stylesheet"/>
<link href="/assets/stylesheets/pagemanager.css" rel="stylesheet"/>
<!--[if IE 6]><style>html {background: url(null) fixed;}#ds-toolbar {top: expression(documentElement.scrollTop);}</style><![endif]-->
</head>
<body>
<#assign isTheme=(USER.usb.versionNo>1&&siteTheme??&&theme??)>
<#assign site=USER.sites[0] VN=1>
<#if USER.usb.versionNo??&&''!=USER.usb.versionNo><#assign VN=USER.usb.versionNo></#if>
<#assign www=site.domainName+'.xintaonet.com'>
<#if site.www??&&''!=site.www><#assign www=site.www><#if VN==1.5><#assign VN=1.55></#if></#if>
<div id="page" style="padding-top:35px;">
<div style="background-color: #E8E8E8;padding: 5px 0px;text-align: center;">新淘网淘站装修教程集锦<a href="http://forum.xintaonet.com/forumdisplay.php?fid=18" target="_blank"> 翻阅教程</a></div>
<form id="page_preview" action="/router/member/page/preview/${page.id}" target="_blank">
<input type="hidden" name="theme" id="page_theme" value="">
<input type="hidden" name="skin" id="page_skin" value="">
</form>
	<@p.pageBar page=page pages=pages></@p.pageBar>
    <div id="content" class="tb-shop">
    	<#if page??><h1 style="text-align:center;color:red;font-size:16px;font-weight:700;">当前位置---<#if page.isIndex>修改全站默认皮肤<#else>修改页面【${page.title}】皮肤</#if></h1></#if>
    	<!--page content-->
		<div id="ds-sub-title"><h2>模板管理</h2><p class="market"><!--<a href="" style="background: none; color: #3366CC">使用帮助</a>--> 挑选众多精品模板，即刻前往<a href="/router/member/page/theme/manager?id=${page.id}" id="ds-dm">装修市场</a></p></div>
		<div id="tm">
			<div class="tm-skin layout">
				<h2>当前使用的模板<#if (USER.usb.versionNo>1)&&theme??>[${theme.title}]</#if></h2>
				<#if (USER.usb.versionNo>1)&&theme??>
					<div id="tm-preview"><img src="${theme.pic}" width="160" height="160"><p><a target="_blank" theme="${theme.id}" href="javascript:;" class="preview">预览</a></p></div>
				<#elseif siteTheme??>
					<div id="tm-preview"><img src="http://img01.taobaocdn.com/tps/i1/T1qyJpXfXqXXXXXXXX-160-160.jpg" skin="${siteTheme.skin}" width="160" height="160"><p><a target="_blank" href="javascript:;" class="preview">预览</a></p></div>
				<#elseif page.skin??&&''!=page.skin>
					<div id="tm-preview"><img src="http://img01.taobaocdn.com/tps/i1/T1qyJpXfXqXXXXXXXX-160-160.jpg" skin="${page.skin}" width="160" height="160"><p><a target="_blank" href="javascript:;" class="preview">预览</a></p></div>
				<#else>
					<div id="tm-preview"><img src="http://img01.taobaocdn.com/tps/i1/T1qyJpXfXqXXXXXXXX-160-160.jpg" skin="yellow" width="160" height="160"><p><a target="_blank" href="javascript:;" class="preview">预览</a></p></div>
				</#if>
				<div class="tm-color-io-group">
					<div id="tm-color">
						<h3>更换模板颜色[<#if (USER.usb.versionNo>1)&&theme??>返利版，卖家版装修个性主题后，可通过选择下列颜色来调整返利金额区域的显示</#if>]：</h3>
						<div class="tm-color-panel" id="J_TMColorPanel">
							<a href="" title="灰色" style="background: #6D6D6D" skin="gray" data-imgsrc="http://img02.taobaocdn.com/tps/i2/T17OFpXnJqXXXXXXXX-160-160.jpg">灰色</a>
							<a href="" title="浅粉红色" style="background: #F898A6" skin="pink2" data-imgsrc="http://img03.taobaocdn.com/tps/i3/T1biFpXbRqXXXXXXXX-160-160.jpg">浅粉红色</a>
							<a href="" title="浅蓝色" style="background: #C4E4FD" skin="blue2" data-imgsrc="http://img01.taobaocdn.com/tps/i1/T1QOFpXdtrXXXXXXXX-160-160.jpg">浅蓝色</a>
							<a href="" title="金属" style="background: #C2C2C2" skin="metal" data-imgsrc="http://img06.taobaocdn.com/tps/i6/T1myJpXgRqXXXXXXXX-160-160.jpg">金属</a>
							<a href="" title="树" style="background: #F5B963" skin="tree" data-imgsrc="http://img04.taobaocdn.com/tps/i4/T1ZiJpXgVpXXXXXXXX-160-160.jpg">树</a>
							<a href="" title="草地" style="background: #72A42B" skin="lawn" data-imgsrc="http://img08.taobaocdn.com/tps/i8/T1i5JpXilqXXXXXXXX-160-160.jpg">草地</a>
							<a href="" title="天蓝色" style="background: #26B2C9" skin="sky" data-imgsrc="http://img05.taobaocdn.com/tps/i5/T1SOJpXjBpXXXXXXXX-160-160.jpg">天蓝色</a>
							<a href="" title="棕色" style="background: #D18B45" skin="brown" data-imgsrc="http://img05.taobaocdn.com/tps/i5/T1WyFpXbFrXXXXXXXX-160-160.jpg">棕色</a>
							<a href="" title="黄色" style="background: yellow" skin="yellow" data-imgsrc="http://img07.taobaocdn.com/tps/i7/T1FyNpXftoXXXXXXXX-160-160.jpg">黄色</a>
							<a href="" title="红色" style="background: #D0243A" skin="red" data-imgsrc="http://img08.taobaocdn.com/tps/i8/T1MOJpXmFpXXXXXXXX-160-160.jpg">红色</a>
							<a href="" title="紫色" style="background: #96539A" skin="purple" data-imgsrc="http://img07.taobaocdn.com/tps/i7/T1DiJpXaJqXXXXXXXX-160-160.jpg">紫色</a>
							<a href="" title="粉红色" style="background: #FE98A6" skin="pink" data-imgsrc="http://img03.taobaocdn.com/tps/i3/T1tyJpXd4qXXXXXXXX-160-160.jpg">粉红色</a>
							<a href="" title="绿色" style="background: #8BBB4D" skin="green" data-imgsrc="http://img02.taobaocdn.com/tps/i2/T1b5JpXk0qXXXXXXXX-160-160.jpg">绿色</a>
							<a href="" title="青色" style="background: #EDEDED" skin="cyan" data-imgsrc="http://img06.taobaocdn.com/tps/i6/T12yFpXXVrXXXXXXXX-160-160.jpg">青色</a>
							<a href="" title="蓝色" style="background: #5390D3" skin="blue" data-imgsrc="http://img03.taobaocdn.com/tps/i3/T1KiFpXf8rXXXXXXXX-160-160.jpg">蓝色</a>
							<a href="" title="黑色" style="background: black" skin="black" data-imgsrc="http://img04.taobaocdn.com/tps/i4/T1z5FpXkBrXXXXXXXX-160-160.jpg">黑色</a>
							<a href="" class="selected" title="橙黄色" skin="orange" style="background: orange" data-imgsrc="http://img01.taobaocdn.com/tps/i1/T1qyJpXfXqXXXXXXXX-160-160.jpg">橙黄色</a>
						</div>
					</div>
					<div id="tm-io"></div>
				</div>
			</div>
		</div>
    <!--page footer-->
    <div id="footer"></div>
</div>
<!--Jquery-->
<script src="/assets/js/jquery/jquery-1.4.2.min.js"></script>
<script src="/assets/js/jquery/ui/jquery-ui.min.js"></script>
<script src="/assets/js/jquery/log/jquery.log.1.0.1.js"></script>

<!--xintao-->
<script src="/assets/js/taobao/core/TaobaoConstants.js"></script>
<script src="/assets/js/site/core/WindSender.js"></script>
<script src="/assets/js/site/core/WindResponse.js"></script>
<script src="/assets/js/page/PageUtils.js"></script>
<script src="/assets/js/page/theme.js"></script>
<script src="/assets/js/page/PageBar.js"></script>
<!--Designer-->
<script type="text/javascript">
var DEBUG=true,MODE='${mode}',ISDESIGNER=true,PAGEID='${page.id}',USERID='${USER.user_id}',USERNICK='${USER.nick}',PID='${USER.pid}',VERSIONNO=${VN},LIMIT_LAYOUTS=${USER.limit.layouts},LIMIT_MODULES=${USER.limit.modules},LIMIT_HEARDS=${USER.limit.headers};
$(function(){
	//$('#page').page();
	<#if (USER.usb.versionNo>1)&&siteTheme??&&theme??>
	<#elseif siteTheme??>
	$('#J_TMColorPanel a[skin="${siteTheme.skin}"]').mouseenter();
	<#else>
	</#if>
	
});
</script>
</body>
</html>
