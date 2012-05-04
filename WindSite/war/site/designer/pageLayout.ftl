<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<head>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站">
<meta name="description" content="新淘网 - 新淘网实现了多种酷炫图片组件封装，向广大普通互联网用户提供一站式的建站方案，大幅度降低建站门槛，会用鼠标就可以拖拽生成独立而漂亮的淘宝推广网站，让更多的普通互联网用户成为专业淘客、推广淘宝、赚取佣金">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>布局管理--站点设计器</title>
<link href="/assets/min/stylesheets/xintao.min.css" rel="stylesheet"/>
<link href="/assets/css/ui/jquery-ui.css" rel="stylesheet"/>
<link href="/assets/stylesheets/designer.css" rel="stylesheet"/>
<link href="/assets/stylesheets/layout.css" rel="stylesheet"/>
<link href="/assets/js/jquery/jqtransform/jqtransform.css" rel="stylesheet"/>
<!--淘宝-->
<!--[if lt IE 8]>
<link href="http://a.tbcdn.cn/s/kissy/1.1.5/editor/theme/cool/editor-pkg-min-mhtml.css" rel="stylesheet"/>
<![endif]-->
<!--[if gte IE 8]><!-->
<link href="http://a.tbcdn.cn/s/kissy/1.1.5/editor/theme/cool/editor-pkg-min-datauri.css" rel="stylesheet"/>
<!--<![endif]-->
<!--[if IE 6]><style>html {background: url(null) fixed;}#ds-toolbar {top: expression(documentElement.scrollTop);}</style><![endif]-->
<style>.main-wrap .add-layout-disabled{background-color:gray;}</style>
</head>
<body>
<#assign site=USER.sites[0] VN=1>
<#if USER.usb.versionNo??&&''!=USER.usb.versionNo><#assign VN=USER.usb.versionNo></#if>
<#assign www=site.domainName+'.xintaonet.com'>
<#if site.www??&&''!=site.www><#assign www=site.www><#if VN==1.5><#assign VN=1.55></#if></#if>
<div id="page" style="padding-top:35px;">
<div style="background-color: #E8E8E8;padding: 5px 0px;text-align: center;">新淘网淘站装修教程集锦<a href="http://forum.xintaonet.com/forumdisplay.php?fid=18" target="_blank"> 翻阅教程</a></div>
   <@p.pageBar page=page pages=pages></@p.pageBar>
    <div id="content">
    	<div id="ds-sub-title" style="width: 950px;margin: 0 auto;"><h2>布局模块管理</h2></div>
    	<div class="intro" style="width: 950px;margin: 0 auto;margin-bottom:20px;"><strong>当前装修页面：</strong> 	
		    <select id="J_changePage" style="padding:2px;"> 
		        <option selected value="${page.id}">${page.title}</option>
    	    		<optgroup label="自定义页面">自定义页面</optgroup>
    	    			<#if pages??&&pages?size!=0>
    	    				<#list pages as p>
    	    					<#if p.id!=page.id><option class="custome" value="${p.id}">└${p.title}</option></#if>
    	    				</#list>
    	    			</#if>
		    </select> 
		    <a href="/router/member/page/<#if 'sys'==mode>sys</#if>designer?page=${page.id}">返回页面装修</a> 
		</div>
		<div id="hd" style="display:none;">
			<#if model??&&model.hd??&&model.hd?size!=0>
			<#list model.hd as layout>
				<#if 'grid-m'==layout.layout>
					<div class="layout grid-m ks-clear" data-id="${layout.id}">
						<div class="clear ks-clear">
							<div class="col-main">
								<div class="main-wrap J_TRegion" data-id="${layout.main.id}">
									<#if layout.main.modules??&&layout.main.modules?size!=0>
									<#list layout.main.modules as m>
									<b class="J_TBox" data-id="${m.id}"></b>
									</#list>
									</#if>
								</div>
							</div>
						</div>
					</div>
				</#if>	
			</#list>
			</#if>
		</div>
    	<!--page content-->
    	<div id="bd" class="page-edit" style="width: 950px;margin: 0 auto;">
    		<#include "/site/designer/layoutManagerTemplate.ftl">
    		<div class="grid-m ks-clear add-layout-bar" style="width: 950px;margin: 0 auto;margin-bottom: 10px;">
    			<div class="col-main">
    				<div class="main-wrap">
    					<div class="add-layout">添加布局单元</div>
    				</div>
    			</div>
    		</div>
    	</div>
    </div>
    <!--page footer-->
    <div id="footer"></div>
</div>
<@p.moduleEditor></@p.moduleEditor>
<!--页头编辑器-->
<div id="page-layout-editor" title="添加布局" style="display:none;position:relative;">
<ul class="layout-list"><li><a class="l-grid-m" layout="grid-m"></a></li><li><a class="l-grid-s5m0" layout="grid-s5m0"></a><a class="l-grid-m0s5" layout="grid-m0s5"></a></li><li><a class="l-grid-s5m0e5" layout="grid-s5m0e5"></a><a class="l-grid-m0s5e5" layout="grid-m0s5e5"></a><a class="l-grid-s5e5m0" layout="grid-s5e5m0"></a><a style="background:none;" layout="grid-s310m0e310"><img src="/assets/stylesheets/images/layout310.jpg"/></a></li></ul>
</div>
<!--xintao-->
<script src="/assets/min/js/page/designer-utils.min.js"></script>
<script src="/assets/min/js/page/designer.min.js"></script>
<script src="/assets/min/js/page/modules.min.js"></script>
<!--布局-->
<script src="/assets/js/page/PageLayout.js"></script>
<!--淘宝-->
<script src="http://a.tbcdn.cn/s/kissy/1.1.5/kissy-min.js"></script>
<script src="http://a.tbcdn.cn/s/kissy/1.1.5/editor/editor-all-pkg-min.js"></script>
<#assign skin='' css=''>
<#if page??&&!page.isIndex>
	<#if page.skin??&&''!=page.skin><#assign skin=page.skin></#if>
	<#if page.css??&&''!=page.css><#assign css=page.css></#if>
	<#if ''==skin><#if theme??&&''!=theme.skin><#assign skin=theme.skin></#if></#if>
	<#if ''==css><#if theme??&&''!=theme.theme><#assign css=theme.theme></#if></#if>
<#else>
	<#if theme??>
	<#if ''!=theme.skin><#assign skin=theme.skin></#if>
	<#if ''!=theme.theme><#assign css=theme.theme></#if>
	</#if>
</#if>
<!--Designer-->
<script type="text/javascript">
var ISLAYOUT=true,DEBUG=true,MODE='${mode}',APP=${USER.appType},ISDESIGNER=true,PAGEID='${page.id}',USERID='${USER.user_id}',USERNICK='${USER.nick}',PID='${USER.pid}',VERSIONNO=${VN},LIMIT_LAYOUTS=${USER.limit.layouts},LIMIT_MODULES=${USER.limit.modules},LIMIT_HEARDS=${USER.limit.headers};
var CUSTOMLINKS=['http://www.xintaonet.com/assets/min/stylesheets/xintao.min.css'<#if ''!=skin>,'http://www.xintaonet.com/assets/min/stylesheets/skin/${skin}.css'<#else>,'http://www.xintaonet.com/assets/min/stylesheets/skin/yellow.css'</#if><#if (USER.usb.versionNo>1)&&''!=css>,'http://www.xintaonet.com/assets/min/stylesheets/theme/${css}.css'</#if><#if ''!=skin>,'http://www.xintaonet.com/assets/min/stylesheets/skin/${skin}_fixed.css'<#else>,'http://www.xintaonet.com/assets/min/stylesheets/skin/yellow_fixed.css'</#if>];
$(function(){
	$('#content .page-edit').pageLayoutManager();
});
</script>
</body>
</html>
