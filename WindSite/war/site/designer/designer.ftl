<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<head>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站">
<meta name="description" content="新淘网 - 新淘网实现了多种酷炫图片组件封装，向广大普通互联网用户提供一站式的建站方案，大幅度降低建站门槛，会用鼠标就可以拖拽生成独立而漂亮的淘宝推广网站，让更多的普通互联网用户成为专业淘客、推广淘宝、赚取佣金">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title><#if 'user'==mode>${page.title}<#elseif 'detail'==mode>宝贝详情页<#elseif 'search'==mode>搜索列表页</#if>-页面设计器</title>
<link href="http://static.xintaonet.com/assets/min/stylesheets/xintao.min.css?v=${dateVersion()}" rel="stylesheet"/>
<link href="http://static.xintaonet.com/assets/css/ui/jquery-ui.css" rel="stylesheet"/>
<link href="http://static.xintaonet.com/assets/min/stylesheets/designer.css?v=${dateVersion()}" rel="stylesheet"/>
<link href="/assets/js/jquery/jqtransform/jqtransform.css" rel="stylesheet"/>
<#assign skin='' css=''>
<#if !page.isIndex>
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
<#if ''!=skin>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/${skin}.css" rel="stylesheet"/>
<#else>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/yellow.css" rel="stylesheet"/>
</#if>
<#if (USER.usb.versionNo>1)&&''!=css>
<link href="http://static.xintaonet.com/assets/min/stylesheets/theme/${css}.css" rel="stylesheet"/>
</#if>
<!--淘宝-->
<link href="http://a.tbcdn.cn/s/kissy/1.1.5/editor/theme/cool/editor-pkg-min-datauri.css" rel="stylesheet"/>
<!--[if IE 6]><style>html {background: url(null) fixed;}#ds-toolbar {top: expression(documentElement.scrollTop);}</style><![endif]-->
<#if ''!=skin>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/${skin}_fixed.css?v=${dateVersion()}" rel="stylesheet"/>
<#else>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/yellow_fixed.css?v=${dateVersion()}" rel="stylesheet"/>
</#if>
<style>a.J_PageFixed{font-size:16px;font-weight:bold;color:red;text-decoration: underline;}</style>
</head>
<body>
<#assign site=USER.sites[0] VN=1>
<#if USER.usb.versionNo??&&''!=USER.usb.versionNo><#assign VN=USER.usb.versionNo></#if>
<#assign www=site.domainName+'.xintaonet.com'>
<#if site.www??&&''!=site.www><#assign www=site.www><#if VN==1.5><#assign VN=1.55></#if></#if>
<div id="page" style="padding-top:35px;">
	<div style="background-color: #E8E8E8;padding: 5px 0px;text-align: center;">新淘网淘站装修教程集锦<a href="http://forum.xintaonet.com/forumdisplay.php?fid=18" target="_blank"> 翻阅教程</a>，<a style="color:red;font-weight:bold;font-size:16px;" href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=12108" target="_blank">2011-5-24，新淘网正式开放商城返利系统</a></div>
	<!--模式切换-->
	<a id="J_TSwitchMod" class="switch-mod" style="display:none" href="javascript:;"><s>佣金模式</s><b>正常模式</b></a>
	<div id="speed-tips" style="display:none;">
		<div class="wrap" id="J_SpeedTips" style="right: -60px;">
	        <b class="icon slow-a"></b>
	        <div class="text"><b></b><strong>本页浏览速度:</strong><em>飞快!</em>相信买家浏览很舒服！</div>
	    </div>
	</div>
	<@p.pageBar page=page pages=pages mode=mode></@p.pageBar>
    <div id="content" class="tb-shop eshop<#if page??&&page.isIndex> head-expand</#if>">
	    <div class="layout grid-m ks-clear">
	    	<div class="col-main">
	    		<div class="main-wrap J_TRegion">
	    			<div class="shop-custom no-border">
						<div class="bd">
							<div class="custom-area" style="line-height:400px;text-align:center;height:400px;" align=center>
								<div style="height:500px;position:relative;"><span style="position: absolute;top: 50%;line-height: 21px;left: 50%;text-align: center;margin: -25px 0 0 -63px;font: 12px/21px simsun!important;color: #939395!important;"><img src="http://static.xintaonet.com/assets/stylesheets/images/load.gif" alt="loading..."><br>页面加载中，请稍候...</span></div>
							</div>
						</div>
					</div>
	    		</div>
	    	</div>
	    </div>
    </div>
    <!--page footer-->
    <!--<div id="footer"></div>-->
</div>
<!--分类选择器-->
<div id="page-cids-editor" title="分类选择器" style="display:none;position:relative;">
</div>
<!--模块工具栏-->
<div id="module-bar" class="ui-corner-top" align=right>
	<div class="module-bar-bd"></div>
	<div class="module-bar-button ks-clear">
	<a id="module-bar-edit" title="编辑"><span>编辑</span></a>
	<a id="module-bar-del" title="移除此组件"><span>删除</span></a>
	<a id="module-bar-up" class="module-bar-up" title="上移"><span>上移</span></a>
	<a id="module-bar-down" class="module-bar-down" title="下移"><span>下移</span></a>
	</div>
</div>
<!--页头编辑器-->
<div id="page-header-editor" title="页头编辑器" style="display:none;position:relative;">
<div class="module-steps">
	<ol class="steps steps-three"><li class="current"><span>1.编辑背景</span></li><li><span>2.选择导航菜单</span></li><li class="last"><span>3.编辑导航菜单</span></li></ol>
	<div class="items">
		<div class="step firstStep">
			 <div class="dialog-nav">
	            <ul>
	            	<li class="selected" t="nobg"><a href="javascript:;">仅导航条</a></li>
	            	<li t="smart"><a href="javascript:;">智能广告牌</a></li>
	            	<li t="image"><a href="javascript:;">自定义图片</a></li>
	                <li t="flash"><a href="javascript:;">阿里妈妈广告牌</a></li>
				</ul>
	        </div>
	        <div class="dialog-panel">
	       		 <div class="panel">
					<@ws.help><h3>1.仅显示您配置的导航条，无店标背景</h3><h3>2.建议放置在LOGO搜索框下方使用。</h3></@ws.help>
					<div class="fm-item ks-clear"><span class="btn btn-ok" id="header-nobg-button"><input type="button" value="下一步"></span></div>
	        	</div>
	        	<div class="panel" style="display:none;">
					<@ws.help><h3>1.每次访问随机生成同类热卖商品广告牌</h3><h3>2.此广告牌中任意商品发生购买您均能得到佣金。</h3></@ws.help>
					<div class="fm-item ks-clear"><span class="btn btn-ok" id="header-smart-button"><input type="button" value="下一步"></span></div>
	        	</div>
	        	<div class="panel" style="display:none;">
	        		<form>
	        		<h3 style="color: #FF0084;">您可以在新淘家园中我的相册上传您的图片。然后复制图片地址。图片大小为:宽度950</h3>
	        		<div class="rowElem ks-clear"><label class="module-key"><span class="required">*</span>图片地址:</label><input type="text" id="header-image" size="40"/></div>
	        		<div class="rowElem ks-clear"><label class="module-key">图片链接地址:</label><input type="text" id="header-image-url" size="40"/></div>
	        		</form>
	        		<div class="fm-item ks-clear"><span class="btn btn-ok" id="header-image-button"><input type="button" value="下一步"></span></div>
	        		<@ws.help><h3>图片地址：指您的图片的URL地址</h3><h3>图片链接地址：指点击您的图片后，跳转到的页面URL地址，留空则不跳转</h3></@ws.help>
	        	</div>
	        	<div class="panel" style="display:none;">
	        		<form>
	        		<h3><a style="color: #FF0084;" href="http://banner.alimama.com/templets?channel_id=aboard&amp;measurement=950x150" target="_blank">去阿里妈妈制作广告牌</a></h3>
	        		<div class="rowElem ks-clear"><label class="module-key"><span class="required">*</span>广告牌地址:</label><input type="text" id="header-flash" size="40"/></div>
	        		</form>
	        		<div class="fm-item ks-clear"><span class="btn btn-ok" id="header-flash-button"><input type="button" value="下一步"></span></div>
	        		<@ws.help><h3>第一步：进入阿里妈妈Banner Marker,挑选合适店标</h3><h3>第二步：修改，保存，输出设计</h3><h3>第三步：复制Flash动画URL.</h3></@ws.help>
	        	</div>
	        </div>
		</div> 
		<div class="step secondStep">
			<form>
			<div class="fllbJs">
				<div class="ks-clear">
					<h3 style="color: #FF0084;">您最多可以选择下列8个导航菜单</h3>
					<#if USER.appType=='0'>
					<dl class="fllbJsDl ks-clear" style="display:block;">
						<dt>淘宝频道</dt>
						<dd><ul><#list channels as c><li><input name="header-nav" type="checkbox" value="${c.value}" t="channel" v="${c.value}" title="${c.name}"/><label>${c.name}</label></li></#list></ul><div class="ks-clear"></div></dd>
					</dl>
					</#if>
					<dl class="fllbJsDl ks-clear" style="display:block;">
						<dt>系统频道</dt>
						<dd><ul><li><input name="header-nav" type="checkbox" value="http://${www}" t="sys" v="index" title="首页"/><label>首页</label></li><#if ((USER.usb??&&USER.usb.versionNo>1.5))><li><input name="header-nav" type="checkbox" value="http://${www}/huabao/index.html"  t="sys" v="huabao" title="导购画报"/><label>导购画报</label></li><#if ((USER.usb.versionNo>=2))><li><input name="header-nav" type="checkbox" value="http://${www}/ymall.html"  t="sys" v="ymall" title="返利商城"/><label>返利商城</label></li></#if><#if site.weibo??&&''!=site.weibo><li><input name="header-nav" type="checkbox" value="http://${site.weibo}"  t="sys" v="weibo" title="微博广场"/><label>微博广场</label></li></#if></#if></ul></dd>
					</dl>
					<dl class="fllbJsDl ks-clear" style="display:block;">
						<dt>我的频道</dt>
						<dd><ul><#if pages??&&pages?size!=0><#list pages as p><#if !p.isIndex&&p.status><li style="width:200px;overflow:hidden;"><input name="header-nav" type="checkbox" value="http://${www}/pages/${p.pageid}.html" t="sys" v="${p.pageid}" title="${p.title}"/><label>${p.title}</label></li></#if></#list></#if></ul></dd>
					</dl>
					<dl class="fllbJsDl ks-clear" style="display:block;">
						<dt>自定义</dt>
						<dd><ul id="header-nav-custome"></ul></dd>
					</dl>
				</div>
				<div class="ks-clear"></div>
			</div>
			</form>
			<div class="fm-item ks-clear" style="padding-left:270px;"><span class="btn btn-ok"><input type="button" value="下一步"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a class="prev" href="javascript:;" style="color:#f30;">上一步</a></div>
		</div>
		<div class="step thirdStep">
			<form id="header-nav-edit"></form>
			<a id="add-header-nav-button" href="javascript:;" style="color:red;">新增自定义菜单</a>
			<div class="fm-item ks-clear" style="padding-left:170px;"><input type="radio" name="header-nav-layout" style="display:none;" class="header-nav-layout" value="nav-left" checked/><input type="radio" name="header-nav-layout" style="display:none;" class="header-nav-layout" value="nav-right"/><span class="btn btn-ok"><input type="button" value="完成"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a class="prev" href="javascript:;" style="color:#f30;">上一步</a></div>
			<strong style="color:red;font-size:14px;font-weight:700">设计器与预览状态所有导航链接默认新窗口打开，未选中新窗口打开发布后生效</strong>
		</div>
	</div>
	<div class="ks-clear"></div> 
</div> 
</div>
<@p.moduleEditor></@p.moduleEditor>
<!--designer-->
<script src="/assets/min/js/page/designer-utils.min.js?v=${dateVersion()}"></script>
<script src="/assets/min/js/page/designer.min.js?v=${dateVersion()}"></script>
<script src="/assets/min/js/page/modules.min.js?v=${dateVersion()}"></script>
<script src="/zone/ymall/yiqifa.js?v=${dateVersion()}"></script>
<!--淘宝-->
<script src="http://a.tbcdn.cn/s/kissy/1.1.5/kissy-min.js"></script>
<script src="http://a.tbcdn.cn/s/kissy/1.1.5/editor/editor-all-pkg-min.js"></script>
<!--Designer-->
<script type="text/javascript">
var DEBUG=true,MODE='${mode}',ISDESIGNER=true,APP=${USER.appType},SITEID='${site.id}',<#if page??>PAGEID='${page.id}',ISINDEX=<#if page.isIndex??&&page.isIndex>true<#else>false</#if>,</#if>USERID='${USER.user_id}',USERNICK='${USER.nick}',PID='${USER.pid}',VERSIONNO=${VN},LIMIT_LAYOUTS=${USER.limit.layouts},LIMIT_MODULES=${USER.limit.modules},LIMIT_HEARDS=${USER.limit.headers}<#if 'detail'==mode>,SELLERNICK='${item.nick}',CID='${item.cid}'<#else>,KEYWORD='',CID='16'</#if>;
var CUSTOMLINKS=['http://static.xintaonet.com/assets/min/stylesheets/xintao.min.css'<#if ''!=skin>,'http://static.xintaonet.com/assets/min/stylesheets/skin/${skin}.css'<#else>,'http://static.xintaonet.com/assets/min/stylesheets/skin/yellow.css'</#if><#if (USER.usb.versionNo>1)&&''!=css>,'http://static.xintaonet.com/assets/min/stylesheets/theme/${css}.css'</#if><#if ''!=skin>,'http://static.xintaonet.com/assets/min/stylesheets/skin/${skin}_fixed.css'<#else>,'http://static.xintaonet.com/assets/min/stylesheets/skin/yellow_fixed.css'</#if>];
$(function(){
	$('#page').page();
});
</script>
</body>
</html>
