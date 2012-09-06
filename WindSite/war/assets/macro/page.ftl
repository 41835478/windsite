<!--页面设计宏定义文件-->
<#macro pageBar page='' pages=[] mode='user'>
<#if (page??&&''!=page)||'detail'==mode||'search'==mode>
<div id="release-dialog" title="发布" style="display:none;position:relative;">
<@ws.help>
	<h3>1.大功告成！马上让买家看到你的最新淘站杰作吧！</h3>
</@ws.help>
<div class="fm-item ks-clear" style="padding-left:100px;"><span class="btn btn-ok" id="J_ConfirmRelease" <#if page??&&''!=page>pageid="${page.id}"</#if> isHeader="false"><input type="button" value="确认发布"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id="J_CancelRelease" href="javascript:;" style="color:#f30;">取消</a></div>
</div>
<div id="fixed-dialog" title="页面修复" style="display:none;position:relative;">
<@ws.help>
	<h3>1.修复后需发布才生效，页头区域修复需进入首页发布生效</h3>
</@ws.help>
<div class="fm-item ks-clear" style="padding-left:100px;"><span class="btn btn-ok" id="J_ConfirmFixed" <#if page??&&''!=page>pageid="${page.id}"</#if>><input type="button" value="确认修复"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id="J_CancelFixed" href="javascript:;" style="color:#f30;">取消</a></div>
</div>
</#if>
<!--设计器工具条-->
<div id="ds-toolbar">
	<div class="clear">
		<!--<div class="ds-logo menu-select"><a href="#"><span>新淘网淘站装修</span></a></div>-->
		<ul class="ds-nav">
			<li style="border-left:0px;"><a href="/router/member/sitemanager">返回站点管理</a></li>
			<#if pages??&&pages?size!=0><li class="edit menu-select" style="border-left: 1px solid #666;">
				<a href="/router/member/page/designer">编辑<i></i></a>
				<div class="menu-select-popup">
					<div class="wrap clear">
                        <div class="custom">
							<strong>自定义页面</strong>
                            <ul><#list pages as p><li <#if page??&&''!=page&&p.id==page.id>class="selected"</#if>><a href="/router/member/page/<#if 'sys'==mode>sys</#if>designer?page=${p.id}"><#if p.isIndex??&&p.isIndex><span style="color:red;">[首页]</span></#if>${p.title}</a></li></#list></ul>
                         </div>
                          <div class="system">
							<strong>系统页面</strong>
                            <ul><li <#if 'detail'==mode>class="selected"</#if>><a href="/router/member/page/designer/detail">宝贝详情页</a></li><li <#if 'search'==mode>class="selected"</#if>><a href="/router/member/page/designer/search">搜索列表页</a></li></ul>
                         </div>
						<p><a href="/router/member/page/manager">管理所有页面 »</a></p>
                    </div>
				</div>
			</li>
			<li><a href="/router/member/page/manager">页面</a></li></#if>
			<#if page??&&''!=page&&'user'==mode>
			<li><a href="/router/member/page/theme?id=${page.id}">主题</a></li>
			<li><a href="/router/member/page/templates?page=${page.id}">模板</a></li></#if>
			<li><a href="/router/member/versions" target="_blank">版本说明</a></li>
		</ul>
		<ul class="ds-confirm">
			<li class="nick">${USER.nick}, <a href="/router/site/logout">退出</a></li>
			<#if (page??&&''!=page)&&(USER.nick=='fxy060608'||USER.nick=='fxy_0404')><li class="release"><a href="javascript:;" id="J_TCreateTemplate">生成模板</a></li></#if>
			<#if (page??&&''!=page)||'detail'==mode||'search'==mode>
			<li class="release" style="position:relative;"><a onclick="$('#fixed-dialog').dialog('open');" title="修复页面">修复</a></li>
			<li class="release" style="position:relative;"><a href="javascript:;" id="J_TRelease">发布</a>
			<div id="J_PageNotDeploy" style="position: absolute;z-index:99999;left:-50px; top:0;width:200px;margin-top: 26px; text-align:left;text-indent:0;overflow:visible;height:auto;padding:5px 24px 5px 5px;background:#ffffce;border:#f0e5ba 1px solid;color:#666;-moz-border-radius: 6px;-moz-box-shadow: 2px 2px 2px #f0e5ba;-webkit-border-radius: 6px;-webkit-box-shadow: 2px 2px 2px #f0e5ba;">
			<div style="position:absolute;width:15px;height:8px;left:0;top:0;margin:-8px 0 0 60px;font-size:1px;line-height:1px;background:url(http://static.xintaonet.com/assets/images/wblogin_bt_v2.png) 0 -30px no-repeat;celar:both;zoom:1;"><div style="font-size:1px;line-height:1px;"></div></div>
			<div style="position:absolute;top:0;right:0;width:15px;height:15px;margin:4px;background:url(http://static.xintaonet.com/assets/images/wblogin_bt_v3.png) 0 -45px no-repeat;font-size:1px;line-height:1px;cursor:pointer;"><a onclick="$('#J_PageNotDeploy').fadeOut();" style="background-color: transparent;"><span style="display:none;">关闭</span></a></div>
			<div>
				<div>
					<span style="color:#666;">设计完成后，记得点击发布按钮喔！</span>
				</div>
			</div>
			</div>
			</li>
			</#if>
			<#if page??&&''!=page&&'user'==mode><li class="preview"><a href="/router/member/page/preview/${page.id}" target="_blank">预览</a></li></#if>
			<#assign siteWWW = USER.sites[0]>
			<li class="myshop"><a href="http://<#if siteWWW.www??&&''!=siteWWW.www>${siteWWW.www}<#else>${siteWWW.domainName}.xintaonet.com</#if>" target="_blank" title="查看我的淘站"><i></i></a></li>
			<li class="help"><a href="http://forum.xintaonet.com/forumdisplay.php?fid=18" target="_blank" title="帮助"><i></i></a></li>
			<#if page??&&''!=page&&'user'==mode><li class="layoutmgr"><a id="J_TLayoutMgr" href="/router/member/page/layout/manager/${page.id}"><i></i>布局管理</a></li></#if>
		</ul>
	</div>
	<div class="ds-msgs">
		<span id="J_DSMsg" class="txt" style="margin-top:0px;"></span>
	</div>
</div>
</#macro>

<#macro moduleEditor>
<!--模块编辑器-->
<div id="page-module-editor" title="模块编辑器" style="display:none;position:relative;">
<div class="module-steps">
	<ol class="steps steps-three"><li class="current"><span>1.选择模块</span></li><li><span>2.编辑模块标题</span></li><li class="last"><span>3.编辑模块内容</span></li></ol>
	<div class="items">
		<div class="step firstStep">
	        <div class="dialog-nav">
	            <ul>
	            	<li class="selected" t="0"><a href="javascript:;">基础模块</a></li>
	            	<li t="2" style="position:relative;"><a href="javascript:;">画报模块</a></li>
	                <li t="1" style="position:relative;"><a href="javascript:;">广告联盟</a></li>
	                <li t="3" style="position:relative;"><a href="javascript:;">淘店铺模块</a></li>
	                <li t="4" style="position:relative;"><a href="javascript:;">淘宝商城</a><img style="position:absolute;right:10px;top:0px;" src="/designer/assets/images/new.gif"/></li>
	                <li t="5" style="position:relative;"><a href="javascript:;">母婴频道</a><img style="position:absolute;right:10px;top:0px;" src="/designer/assets/images/new.gif"/></li>
	                <li t="6" style="position:relative;"><a href="javascript:;">返现商城</a><img style="position:absolute;right:10px;top:0px;" src="/designer/assets/images/new.gif"/></li>
				</ul>
	        </div>
	        <div class="dialog-panel" id="module-editor-panel">
	        	<p id="module-verion-tips"></p>
	        	<div id="module-editor-content" style="width:100%;">
		        	<div class="fllbJs">
						<div class="ks-clear">
							<dl class="fllbJsDl ks-clear" style="display:block;">
	    						<dd>
	    							<span id="module-ad-type" style="display:block;">
	    								<a class="selected" t="">全部</a> |
	    								<a t="item">商品</a> |
	    								<a t="shop">店铺</a> |
	    								<a t="cat">分类</a> |
	    								<a t="blog">文章</a> |
	    								<a t="page">页面</a> |
	    								<a t="other">其他</a>
	    							</span>
	    							<span id="union-ad-type" style="display:none;">
	    								<a class="selected" t="">全部</a> |
	    								<a t="baidu">百度</a> |
	    								<a t="google">Google</a> |
	    								<a t="alimama">淘宝联盟</a>
	    							</span>
	    						</dd>
							</dl>
						</div>
						<div class="ks-clear"></div>
					</div>
					<div id="modules" style="height:350px;"></div>
				</div>
	        </div>
		</div> 
		<div class="step secondStep">
			<form style="width:630px;margin:0px auto;" class="ks-clear">
				<div class="rowElem ks-clear"><label class="module-key"><span class="required">*</span>模块标题:</label><input type="text" id="module-title" size="30"/></div>
				<div class="rowElem ks-clear"><label class="module-key">是否显示标题:</label><input type="checkbox" id="module-ishd"/></div>
			</form>
			<div class="fm-item ks-clear" style="padding-left:270px;"><span class="btn btn-ok"><input type="button" value="下一步"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a class="prev" href="javascript:;" style="color:#f30;">上一步</a></div>
		</div>
		<div class="step thirdStep">
			<div id="module-content" class="setting" style="width:100%"></div>
			<div class="fm-item ks-clear" style="padding-left:270px;"><span class="btn btn-ok"><input type="button" value="完成"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a class="prev" href="javascript:;" style="color:#f30;">上一步</a></div>
		</div> 
	</div>
	<div class="ks-clear"></div> 
</div> 
</div>
</#macro>
<#macro pageAnalytics>
<#if (versionNo??&&(versionNo>=2))&&www??&&www!=''&&baiduTongJi??&&''!=baiduTongJi>
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
</#macro>
<#macro pageHeader>
<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<#nested>
<#if site_ico??&&''!=site_ico>
<link rel="shortcut icon" type="image/ico" href="${site_ico}">
</#if>
<link href="http://static.xintaonet.com/assets/min/stylesheets/xintao.min.css?v=${dateVersion()}" rel="stylesheet"/>
<#if site_skin??&&''!=site_skin>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/${site_skin}.css" rel="stylesheet"/>
<#else>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/yellow.css" rel="stylesheet"/>
</#if>
<#if site_theme??&&''!=site_theme>
<link href="http://static.xintaonet.com/assets/min/stylesheets/theme/${site_theme}.css" rel="stylesheet"/>
</#if>
<#if site_skin??&&''!=site_skin>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/${site_skin}_fixed.css?v=${dateVersion()}" rel="stylesheet"/>
<#else>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/yellow_fixed.css?v=${dateVersion()}" rel="stylesheet"/>
</#if>
<#if qq_appkey??&&www??>
<script type="text/javascript" src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="${qq_appkey}" data-redirecturi="http://${www}/zone/qc_callback.html" charset="utf-8" ></script>
</#if>
<#if taobao_appkey??&&www??>
<!--<script src="http://a.tbcdn.cn/apps/top/x/sdk.js?appkey=${taobao_appkey}"></script>-->
</#if>
<script src="/assets/min/js/page/page.min.js?v=${dateVersion()}"></script>
</head>
<body>
<div id="site-nav"><div id="site-nav-bd"><#include "site/designer/include/pageHeader.ftl"></div></div>
<div id="content" class="tb-shop eshop">
	<!--page header-->
	<div id="hd">
		<div class="layout grid-m ks-clear">
			<div class="col-main">
				<div class="main-wrap J_TRegion">
				<#if user_id??&&''!=user_id>
				<#assign objectConstructor = "freemarker.template.utility.ObjectConstructor"?new()>
				<#assign filePath = user_id?substring(user_id?length-2,user_id?length)>
				<#assign file = objectConstructor("java.io.File", htmlPath+"/htdocs/zone/"+filePath+"/"+user_id+"/header.html")> 
				<#if file.exists()>
				<#include  "//"+filePath+"/"+user_id+"/header.html" parse=false encoding="utf8">
				<#else>
				<div name="shopHeader" class="box J_TBox ks-clear">
					<div class="shop-header" t="" image="" image_url="" flash="">
						<div class="bd">
							<div class="header-bd" style="height: 90px; "></div>
							<div class="nav ">
								<ul>
									<li title="首页" t="custome"><a href="/" title="首页"><em>首页</em></a></li>
									<li t="channel" v="channelcode" title="综合频道"><a target="_blank" href="/channel/channelcode.html"><em>综合频道</em></a></li>
									<li t="channel" v="onsale" title="特卖频道"><a target="_blank" href="/channel/onsale.html" title="特卖频道"><em>特卖频道</em></a></li>
									<li t="channel" v="channelmall" title="商城频道"><a target="_blank" href="/channel/channelmall.html" title="商城频道"><em>商城频道</em></a></li>
									<li t="channel" v="lady" title="女人频道"><a target="_blank" href="/channel/lady.html" title="女人频道"><em>女人频道</em></a></li>
									<li t="channel" v="man" title="男人频道"><a target="_blank" href="/channel/man.html" title="男人频道"><em>男人频道</em></a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				</#if>
				</#if>
				</div>
			</div>
		</div>
	</div>
	<!--page content-->
	<div id="bd">
</#macro>
<#macro pageMemberSideMenu>
<div name="shopCategory" class="box J_TBox ks-clear">
	<div class="shop-category">
		<div class="hd"><h3><span>账户管理</span></h3></div>
		<div class="bd">
			<ul id="J_Cats" class="cats J_TWidget">
				<li class="cat expand"><ul class="cat-bd"><li><a href="/router/fanlimember">我的会员中心</a></li></ul></li>
				<li class="cat expand"><ul class="cat-bd"><li><a href="/router/fanlimember/info">编辑账户信息</a></li></ul></li>
			</ul>
		</div>
	</div>
</div>
<div name="shopCategory" class="box J_TBox ks-clear">
	<div class="shop-category">
		<div class="hd"><h3><span>交易管理</span></h3></div>
		<div class="bd">
			<ul id="J_Cats" class="cats J_TWidget">
				<li class="cat expand"><ul class="cat-bd"><li><a href="/router/fanlimember/report/tao">我的淘宝交易</a></li></ul></li>
				<li class="cat expand"><ul class="cat-bd"><li><a href="/router/fanlimember/report/mall">我的商城交易</a></li></ul></li>
			</ul>
		</div>
	</div>
</div>
<div name="shopCategory" class="box J_TBox ks-clear">
	<div class="shop-category">
		<div class="hd"><h3><span>返利管理</span></h3></div>
		<div class="bd">
			<ul id="J_Cats" class="cats J_TWidget">
				<li class="cat expand"><ul class="cat-bd"><li><a href="/router/fanlimember/trade">我的返利记录</a></li></ul></li>
			</ul>
		</div>
	</div>
</div>
<div name="shopCategory" class="box J_TBox ks-clear">
	<div class="shop-category">
		<div class="hd"><h3><span>找回订单</span></h3></div>
		<div class="bd">
			<ul id="J_Cats" class="cats J_TWidget">
				<li class="cat expand"><ul class="cat-bd"><li><a href="/router/fanlimember/order/tao">找回淘宝订单</a></li></ul></li>
				<li class="cat expand"><ul class="cat-bd"><li><a href="/router/fanlimember/order/mall">找回商城订单</a></li></ul></li>
			</ul>
		</div>
	</div>
</div>
<div name="shopCategory" class="box J_TBox ks-clear">
	<div class="shop-category">
		<div class="hd"><h3><span>我的推广</span></h3></div>
		<div class="bd">
			<ul id="J_Cats" class="cats J_TWidget">
				<li class="cat expand"><ul class="cat-bd"><li><a href="/router/fanlimember/ads">我的推广会员</a></li></ul></li>
				<li class="cat expand"><ul class="cat-bd"><li><a href="/router/fanlimember/ads/report/tao">淘宝推广记录</a></li></ul></li>
				<li class="cat expand"><ul class="cat-bd"><li><a href="/router/fanlimember/ads/report/mall">商城推广记录</a></li></ul></li>
			</ul>
		</div>
	</div>
</div>
</#macro>
<#macro pageMemberHeader>
<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<#nested>
<#if site_ico??&&''!=site_ico>
<link rel="shortcut icon" type="image/ico" href="${site_ico}">
</#if>
<link href="http://static.xintaonet.com/assets/min/stylesheets/xintao.min.css?v=${dateVersion()}" rel="stylesheet"/>
<#if site_skin??&&''!=site_skin>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/${site_skin}.css" rel="stylesheet"/>
<#else>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/yellow.css" rel="stylesheet"/>
</#if>
<#if site_skin??&&''!=site_skin>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/${site_skin}_fixed.css?v=${dateVersion()}" rel="stylesheet"/>
<#else>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/yellow_fixed.css?v=${dateVersion()}" rel="stylesheet"/>
</#if>
<#if qq_appkey??&&www??>
<script type="text/javascript" src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="${qq_appkey}" data-redirecturi="http://${www}/zone/qc_callback.html" charset="utf-8" ></script>
</#if>
<#if taobao_appkey??&&www??>
<!--<script src="http://a.tbcdn.cn/apps/top/x/sdk.js?appkey=${taobao_appkey}"></script>-->
</#if>
<script src="/assets/min/js/page/page.min.js?v=${dateVersion()}"></script>
<script src="/assets/js/jquery/ui/jquery-ui.min.js"></script>
<script src="/assets/js/jquery/tools/dateinput.min.js" type="text/javascript"></script>
<script src="/assets/min/js/page/member.min.js?v=${dateVersion()}" type="text/javascript"></script>
<link href="http://static.xintaonet.com/assets/css/ui/jquery-ui.css" rel="stylesheet"/>
<link rel="stylesheet" href="http://static.xintaonet.com/assets/min/stylesheets/fanlifront.css?v=${dateVersion()}" type="text/css"/>
</head>
<body>
<div id="site-nav"><div id="site-nav-bd"><#include "site/designer/include/pageHeader.ftl"></div></div>
<div id="content" class="tb-shop eshop">
	<!--page header-->
	<div id="hd">
		<div class="layout grid-m ks-clear">
			<div class="col-main">
				<div class="main-wrap J_TRegion">
				<#if user_id??&&''!=user_id>
				<#assign objectConstructor = "freemarker.template.utility.ObjectConstructor"?new()>
				<#assign filePath = user_id?substring(user_id?length-2,user_id?length)>
				<#assign file = objectConstructor("java.io.File", htmlPath+"/htdocs/zone/"+filePath+"/"+user_id+"/header.html")> 
				<#if file.exists()>
				<#include  "//"+filePath+"/"+user_id+"/header.html" parse=false encoding="utf8">
				<#else>
				<div name="shopHeader" class="box J_TBox ks-clear">
					<div class="shop-header" t="" image="" image_url="" flash="">
						<div class="bd">
							<div class="header-bd" style="height: 90px; "></div>
							<div class="nav ">
								<ul>
									<li title="首页" t="custome"><a href="/" title="首页"><em>首页</em></a></li>
									<li t="channel" v="channelcode" title="综合频道"><a target="_blank" href="/channel/channelcode.html"><em>综合频道</em></a></li>
									<li t="channel" v="onsale" title="特卖频道"><a target="_blank" href="/channel/onsale.html" title="特卖频道"><em>特卖频道</em></a></li>
									<li t="channel" v="channelmall" title="商城频道"><a target="_blank" href="/channel/channelmall.html" title="商城频道"><em>商城频道</em></a></li>
									<li t="channel" v="lady" title="女人频道"><a target="_blank" href="/channel/lady.html" title="女人频道"><em>女人频道</em></a></li>
									<li t="channel" v="man" title="男人频道"><a target="_blank" href="/channel/man.html" title="男人频道"><em>男人频道</em></a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				</#if>
				</#if>
				</div>
			</div>
		</div>
	</div>
	<!--page content-->
	<div id="bd">
</#macro>
<#macro pageFooter>
</div>
<#if user_id??&&''!=user_id>
<#assign objectConstructor = "freemarker.template.utility.ObjectConstructor"?new()>
<#assign filePath = user_id?substring(user_id?length-2,user_id?length)>
<#assign file = objectConstructor("java.io.File", htmlPath+"/htdocs/zone/"+filePath+"/"+user_id+"/footer.html")> 
<#if file.exists()>
	<#include  "//"+filePath+"/"+user_id+"/footer.html" parse=false encoding="utf8">
<#else>
<#include "/site/designer/include/pageFooterTemplate.ftl">
</#if>
<#else>
<#include "/site/designer/include/pageFooterTemplate.ftl">
</#if>
<script type="text/javascript">
	var DEBUG=false,ISDESIGNER=false,PID='${pid}',<#if versionNo??>VERSIONNO=${versionNo},<#else>VERSIONNO=1,</#if>WWW='${www}';
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
	<#if (versionNo??&&(versionNo>=2))&&www??&&www!=''>
	<#if MEMBER??>
		<#if MEMBER.commissionRate??&&''!=MEMBER.commissionRate>$(function(){PageModuleUtils.addFanliCommission(parseFloat(${MEMBER.commissionRate}/100));});</#if>
	<#else>
		<#if commissionRate??&&''!=commissionRate>$(function(){PageModuleUtils.addFanliCommission(parseFloat(${commissionRate}/100));});</#if>
	</#if>
	</#if>
</script>
</body>
</html>
</#macro>
<#macro huabaoHeader hType="index">
<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<#nested>
<#if site_ico??&&''!=site_ico>
<link rel="shortcut icon" type="image/ico" href="${site_ico}">
</#if>
<link href="http://static.xintaonet.com/assets/min/stylesheets/xintao.min.css?v=${dateVersion()}" rel="stylesheet"/>
<#if site_skin??&&''!=site_skin>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/${site_skin}.css" rel="stylesheet"/>
<#else>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/yellow.css" rel="stylesheet"/>
</#if>
<#if site_theme??&&''!=site_theme>
<link href="http://static.xintaonet.com/assets/min/stylesheets/theme/${site_theme}.css" rel="stylesheet"/>
</#if>
<script src="/assets/min/js/page/page.min.js?v=${dateVersion()}"></script>
</head>
<body>
<div id="site-nav"><div id="site-nav-bd"><#include "site/designer/include/pageHeader.ftl"></div></div>
<div id="content" class="tb-shop eshop">
	<!--page header-->
	<div id="hd">
		<div class="layout grid-m ks-clear">
			<div class="col-main">
				<div class="main-wrap J_TRegion">
					<div name="shopHeader" class="box J_TBox ks-clear">
						<div class="shop-header" t="image" image="" image_url="" flash="">
							<div class="bd">
								<div class="header-bd" style="height: 193px; "><img src="http://img01.taobaocdn.com/imgextra/i1/382957203/T2X8dyXjVMXXXXXXXX_!!382957203.jpg" width="950px" height="193px"></div>
								<div class="nav">
									<ul>
										<li<#if "index"==hType> class="current"</#if>><a href="/huabao/index.html"><em>首页</em></a></li>
										<li<#if "lady"==hType> class="current"</#if>><a href="/huabao/lady.html"><em>女人画报</em></a></li>
										<li<#if "man"==hType> class="current"</#if>><a href="/huabao/man.html"><em>男人画报</em></a></li>
										<li<#if "fashion"==hType> class="current"</#if>><a href="/huabao/fashion.html"><em>服饰画报</em></a></li>
										<li<#if "life"==hType> class="current"</#if>><a href="/huabao/life.html"><em>居家画报</em></a></li>
										<li<#if "baby"==hType> class="current"</#if>><a href="/huabao/baby.html"><em>亲子画报</em></a></li>
										<li<#if "star"==hType> class="current"</#if>><a href="/huabao/star.html"><em>明星画报</em></a></li>
										<li<#if "tour"==hType> class="current"</#if>><a href="/huabao/tour.html"><em>旅游画报</em></a></li>
										<li<#if "idea"==hType> class="current"</#if>><a href="/huabao/idea.html"><em>创意站画报</em></a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--page content-->
	<div id="bd">
</#macro>