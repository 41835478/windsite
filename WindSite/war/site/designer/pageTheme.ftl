<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<head>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站">
<meta name="description" content="新淘网 - 新淘网实现了多种酷炫图片组件封装，向广大普通互联网用户提供一站式的建站方案，大幅度降低建站门槛，会用鼠标就可以拖拽生成独立而漂亮的淘宝推广网站，让更多的普通互联网用户成为专业淘客、推广淘宝、赚取佣金">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>淘站装修市场-新淘网</title>
<link href="/assets/css/ui/jquery-ui.css" rel="stylesheet"/>
<link href="/assets/stylesheets/common.css" rel="stylesheet"/>
<link href="/assets/stylesheets/xintao.css" rel="stylesheet"/>
<link href="/assets/stylesheets/designer.css" rel="stylesheet"/>
<link href="/assets/stylesheets/theme.css" rel="stylesheet"/>
<!--[if IE 6]><style>html {background: url(null) fixed;}#ds-toolbar {top: expression(documentElement.scrollTop);}</style><![endif]-->
<style>
.apple_overlay {display:none;background-image:url(/assets/min/stylesheets/images/white.png);width:300px;padding:35px;font-size:11px;}.apple_overlay .close {background-image:url(/assets/min/stylesheets/images/close.png);position:absolute; right:5px; top:5px;cursor:pointer;height:35px;width:35px;}.apple_overlay .field {padding-top: 12px;zoom: 1;}.apple_overlay .field label {display: inline-block;padding-right: 10px;text-align: right;width: 66px;}.apple_overlay .login-text {border: 1px solid #C8C8C8;height: 18px;line-height: 18px;margin-right: 3px;padding: 3px;vertical-align: middle;width: 180px;}
<!--[if lt IE 7]><style>div.apple_overlay {background-image:url(http://static.flowplayer.org/tools/img/overlay/overlay_IE6.gif);color:#fff;}div.apple_overlay div.close {background-image:url(http://static.flowplayer.org/tools/img/overlay/overlay_close_IE6.gif);}</style><![endif]-->
</style>
</head>
<body>
<#assign site=USER.sites[0] VN=1>
<#if USER.usb.versionNo??&&''!=USER.usb.versionNo><#assign VN=USER.usb.versionNo></#if>
<#assign www=site.domainName+'.xintaonet.com'>
<#if site.www??&&''!=site.www><#assign www=site.www><#if VN==1.5><#assign VN=1.55></#if></#if>
<div id="page" style="padding-top:35px;">
<div style="background-color: #E8E8E8;padding: 5px 0px;text-align: center;">新淘网淘站装修教程集锦<a href="http://forum.xintaonet.com/forumdisplay.php?fid=18" target="_blank"> 翻阅教程</a></div>
<form id="page_preview" action="/router/member/page/preview/${page.id}" target="_blank">
<input type="hidden" name="theme" id="page_theme" value="">
</form>
	<@p.pageBar page=page pages=pages></@p.pageBar>
    <div id="content" class="tb-shop">
    	<#if page??><h1 style="text-align:center;color:red;font-size:16px;font-weight:700;">当前位置---<#if page.isIndex>修改全站默认主题<#else>修改页面【${page.title}】主题</#if></h1></#if>
    	<!--page content-->
    	<div id="bd">
    		<div class="layout grid-s5m0 ks-clear">
    			<div class="col-main">
    				<div class="main-wrap J_TRegion">
    					<div class="mk-list" id="J_img-zoom">
    						<div class="ks-clear" style="margin:15px 0px;"><h2>符合<span class="keywords"></span>条件的主题</h2><@ws.pager pageNo=(pager.pageNo?number) pageSize=pager.pageSize?number pageCount=pager.totalPageCount url="/router/member/page/theme/manager?id=${page.id}&version="+version+"&industry="+industry+"&color="+color+"&skin="+skin></@ws.pager></div>
	    					<ul class="temp-thumb-ul ks-clear">
		    					<#if themes??&&themes?size!=0>
		    						<#list themes as t>
		    							<#assign versionDesc='分成版以上'>
		    							<#if t_index%2==0><li></#if>
		    							<dl>
		                                    <dt class="temp-thumb"><a title="${t.title}" href="javascript:;"><img src="${t.pic}"></a></dt>
		                                    <dt class="temp-info">
		                                       <div class="temp-title"><a title="${t.title}" href="javascript:;">${t.title}</a></div>
		                                       <div class="temp-site">适用版本:<span title="${versionDesc}">${versionDesc}&nbsp;</span></div>
											   <div class="temp-label">标签：<span>${t.tags}</span></div>
											   <div><span class="btn btn-ok btn-apply" theme="${t.id}"><input type="button" value="应用"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="btn btn-ok btn-preview" theme="${t.id}"><input type="button" value="预览"></span></div>
		                                    </dt>
		                                </dl>
		    							<#if t_index%2==1||!t_has_next></li></#if>
		    						</#list>
		    					</#if>
	    					</ul>
    				    </div>
    			     </div>
    			</div>
    			<div class="col-sub J_TRegion">
    			<div class="mk-sidebar-lt">
					<h2>筛选主题</h2>
						<ul class="cats">
						<!--<li>
							<h3><#if version??&&''!=version><a href="/router/member/page/theme/manager?id=${page.id}&industry=${industry}&color=${color}&skin=${skin}">所有版本</a><#else>所有版本</#if></h3>
							<ul class="col2 ks-clear">
								<li><a href="/router/member/page/theme/manager?id=${page.id}&version=1&industry=${industry}&color=${color}&skin=${skin}">普及版</a></li>
								<li><a href="/router/member/page/theme/manager?id=${page.id}&version=2&industry=${industry}&color=${color}&skin=${skin}">返利版，卖家版</a></li>
							</ul>
						</li>-->
						<li>
							<h3><#if industry??&&''!=industry><a href="/router/member/page/theme/manager?id=${page.id}&version=${version}&color=${color}&skin=${skin}">所有行业</a><#else>所有行业</#if></h3>
							<ul class="col2 ks-clear">
								<li><a <#if industry??&&'1'==industry>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&color=${color}&skin=${skin}&industry=1">通用</a></li>
								<li><a <#if industry??&&'2'==industry>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&color=${color}&skin=${skin}&industry=2">潮流服饰</a></li>
								<li><a <#if industry??&&'3'==industry>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&color=${color}&skin=${skin}&industry=3">精品鞋包</a></li>
								<li><a <#if industry??&&'4'==industry>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&color=${color}&skin=${skin}&industry=4">美容护肤</a></li>
								<li><a <#if industry??&&'5'==industry>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&color=${color}&skin=${skin}&industry=5">珠宝饰品</a></li>
								<li><a <#if industry??&&'6'==industry>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&color=${color}&skin=${skin}&industry=6">运动户外</a></li>
								<li><a <#if industry??&&'7'==industry>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&color=${color}&skin=${skin}&industry=7">手机数码</a></li>
								<li><a <#if industry??&&'8'==industry>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&color=${color}&skin=${skin}&industry=8">居家生活</a></li>
								<li><a <#if industry??&&'9'==industry>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&color=${color}&skin=${skin}&industry=9">家电家装</a></li>
								<li><a <#if industry??&&'10'==industry>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&color=${color}&skin=${skin}&industry=10">母婴用品</a></li>
								<li><a <#if industry??&&'11'==industry>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&color=${color}&skin=${skin}&industry=11">食品保健</a></li>
								<li><a <#if industry??&&'12'==industry>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&color=${color}&skin=${skin}&industry=12">图书音像</a></li>
								<li><a <#if industry??&&'13'==industry>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&color=${color}&skin=${skin}&industry=13">虚拟充值</a></li>
							</ul>
						</li>
						<li>
							<h3><#if skin??&&''!=skin><a href="/router/member/page/theme/manager?id=${page.id}&version=${version}&industry=${industry}&color=${color}">所有主题</a><#else>所有主题</#if></h3>
							<ul class="col2 ks-clear">
								<li><a <#if skin??&&'1'==skin>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&industry=${industry}&color=${color}&skin=1">时尚</a></li>
								<li><a <#if skin??&&'2'==skin>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&industry=${industry}&color=${color}&skin=2">简约</a></li>
								<li><a <#if skin??&&'3'==skin>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&industry=${industry}&color=${color}&skin=3">古典</a></li>
								<li><a <#if skin??&&'4'==skin>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&industry=${industry}&color=${color}&skin=4">非主流</a></li>
								<li><a <#if skin??&&'5'==skin>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&industry=${industry}&color=${color}&skin=5">酷炫</a></li>
								<li><a <#if skin??&&'6'==skin>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&industry=${industry}&color=${color}&skin=6">可爱</a></li>
								<li><a <#if skin??&&'7'==skin>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&industry=${industry}&color=${color}&skin=7">节日庆典</a></li>
							</ul>
						</li>
						<li>
							<h3><#if color??&&''!=color><a href="/router/member/page/theme/manager?id=${page.id}&version=${version}&industry=${industry}&skin=${skin}">所有色系</a><#else>所有色系</#if></h3>
							<ul class="col2 ks-clear">
								<li><a <#if color??&&'1'==color>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&industry=${industry}&skin=${skin}&color=1">黑色</a></li>
								<li><a <#if color??&&'2'==color>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&industry=${industry}&skin=${skin}&color=2">红色</a></li>
								<li><a <#if color??&&'3'==color>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&industry=${industry}&skin=${skin}&color=3">蓝色</a></li>
								<li><a <#if color??&&'4'==color>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&industry=${industry}&skin=${skin}&color=4">绿色</a></li>
								<li><a <#if color??&&'5'==color>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&industry=${industry}&skin=${skin}&color=5">橙色</a></li>
								<li><a <#if color??&&'6'==color>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&industry=${industry}&skin=${skin}&color=6">粉色</a></li>
								<li><a <#if color??&&'7'==color>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&industry=${industry}&skin=${skin}&color=7">黑白</a></li>
								<li><a <#if color??&&'8'==color>class="filter"</#if> href="/router/member/page/theme/manager?id=${page.id}&version=${version}&industry=${industry}&skin=${skin}&color=8">炫彩</a></li>
							</ul>
						</li>
					</ul>
    			</div>
    		</div>
    	</div>
    </div>
    <!--page footer-->
    <div id="footer"></div>
</div>
<div id="upgrade-info" title="升级提示" style="display:none;position:relative;">
<@ws.help>
	<h3>选择升级或订购下列任意一个版本，即可使用个性化模版【<a href="http://forum.xintaonet.com/viewthread.php?tid=707&extra=page%3D1" style="color:red;font-weight:bold;" target="_blank">升级帮助</a>】</h3>
	<p><ul>
		<li>升级淘客返利版（月租型）[<a target="_blank" href="http://pay.taobao.com/mysub/subdeal/upgrade_order_sub_deal.htm?servId=22000691&appstore=myapp2upgrade" style="color:red;font-weight:700;">升级</a>]</li>
		<li>升级卖家版[<a target="_blank" href="http://pay.taobao.com/mysub/subdeal/upgrade_order_sub_deal.htm?servId=22000691&appstore=myapp2upgrade" style="color:red;font-weight:700;">升级</a>]</li>
	</ul></p>
	<h3>提示：升级或订购后，需退出重新登录才可以生效</h3>
</@ws.help>
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
var DEBUG=true,MODE='${mode}',ISDESIGNER=true,APP=${USER.appType},PAGEID='${page.id}',USERID='${USER.user_id}',USERNICK='${USER.nick}',PID='${USER.pid}',VERSIONNO=${VN},LIMIT_LAYOUTS=${USER.limit.layouts},LIMIT_MODULES=${USER.limit.modules},LIMIT_HEARDS=${USER.limit.headers};
$(function(){
	//$('#page').page();
});
</script>
</body>
</html>
