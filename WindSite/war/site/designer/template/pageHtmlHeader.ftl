<#if site_ico??&&''!=site_ico>
<link rel="shortcut icon" type="image/ico" href="${site_ico}">
</#if>
<link href="http://static.xintaonet.com/assets/min/stylesheets/xintao.min.css?v=${dateVersion}" rel="stylesheet"/>
<#if site_skin??&&''!=site_skin>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/${site_skin}.css" rel="stylesheet"/>
<#else>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/yellow.css" rel="stylesheet"/>
</#if>
<#if site_theme??&&''!=site_theme>
<link href="http://static.xintaonet.com/assets/min/stylesheets/theme/${site_theme}.css" rel="stylesheet"/>
</#if>
<#if site_skin??&&''!=site_skin>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/${site_skin}_fixed.css?v=${dateVersion}" rel="stylesheet"/>
<#else>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/yellow_fixed.css?v=${dateVersion}" rel="stylesheet"/>
</#if>
<#if qq_appkey??&&www??>
<script type="text/javascript" src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="${qq_appkey}" data-redirecturi="http://${www}/zone/qc_callback.html" charset="utf-8" ></script>
</#if>
<#if taobao_appkey??&&www??>
<!--<script src="http://a.tbcdn.cn/apps/top/x/sdk.js?appkey=${taobao_appkey}"></script>-->
</#if>
<script src="/assets/min/js/page/page.min.js?v=${dateVersion}"></script>
</head>
<body>
<div id="site-nav"><div id="site-nav-bd"></div></div>
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
				<!--#include virtual="/zone/${filePath}/${user_id}/header.html"-->
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