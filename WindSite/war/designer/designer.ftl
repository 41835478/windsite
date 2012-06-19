<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<head>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站">
<meta name="description" content="新淘网 - 新淘网实现了多种酷炫图片组件封装，向广大普通互联网用户提供一站式的建站方案，大幅度降低建站门槛，会用鼠标就可以拖拽生成独立而漂亮的淘宝推广网站，让更多的普通互联网用户成为专业淘客、推广淘宝、赚取佣金">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title><#if site??&&(!utemplate.parent??)>${site.title}<#else>${utemplate.name}</#if>-淘空间设计器</title>
<!--淘宝-->
<link href="http://a.tbcdn.cn/s/kissy/1.1.5/cssreset/reset-min.css" rel="stylesheet"/>
<!--[if lt IE 8]>
<link href="http://a.tbcdn.cn/s/kissy/1.1.5/editor/theme/cool/editor-pkg-min-mhtml.css" rel="stylesheet"/>
<![endif]-->
<!--[if gte IE 8]><!-->
<link href="http://a.tbcdn.cn/s/kissy/1.1.5/editor/theme/cool/editor-pkg-min-datauri.css" rel="stylesheet"/>
<!--<![endif]-->
<link rel="stylesheet" type="text/css" href="http://static.xintaonet.com/assets/min/css/designer-all.min.css?v=${dateVersion()}4">
<#if utemplate??&&utemplate.skin??&&'default'!=utemplate.skin>
<link title="siteStyle" rel="stylesheet" type="text/css" href="http://static.xintaonet.com/assets/min/css/${utemplate.skin}.css?v=${dateVersion()}">
<#else>
<link title="siteStyle" rel="stylesheet" type="text/css" href="http://static.xintaonet.com/assets/min/css/pink.css?v=${dateVersion()}">
</#if>
<link title="siteStyle" rel="stylesheet" type="text/css" href="http://static.xintaonet.com/assets/min/css/jquery.treeview.css?v=${dateVersion()}">
<#import "/assets/macro/widgets.ftl" as w>
<#import "/assets/macro/themeroller.ftl" as theme>
<#import "/assets/macro/templates.ftl" as template>
<#import "/assets/macro/widgeteditor.ftl" as widgeteditor>
<script type="text/javascript" src="/assets/min/js/designer-utils-all.min.js?v=${dateVersion()}"></script>
<script type="text/javascript" src="/assets/min/js/designer-all.min.js?v=${dateVersion()}4"></script>
<!--淘宝-->
<script src="http://a.tbcdn.cn/s/kissy/1.1.5/kissy-min.js?v=${dateVersion()}"></script>
<script src="http://a.tbcdn.cn/s/kissy/1.1.5/editor/editor-all-pkg-min.js?v=${dateVersion()}"></script>
<script src="http://a.tbcdn.cn/s/kissy/1.1.5/editor/biz/bangpai/editor-plugin-pkg-min.js?v=${dateVersion()}"></script>
<script type="text/javascript">
	var USERID='${USER.user_id}';
	var USERNICK='${USER.nick}';
	<#if utemplate??&&utemplate.skin??&&'default'!=utemplate.skin>var SKIN='${utemplate.skin}';<#else>var SKIN='pink';</#if>
	var ISINDEX=true;
	<#if USER.pid&&USER.pid!=''>
		PID='${USER.pid}';
	</#if>
	var desigerModel='${designerModel!'user'}';
	$(function() {
			<#if designerModel??&&'admin'==designerModel>
				DesignerUtils.initSysDesigner('${utemplate.id}');
				<#else>
				<#if stid??&&stid!="">
				ISINDEX=<#if utemplate.parent??>false<#else>true</#if>;
				DesignerUtils.initUserSysDesigner('${stid}','${utemplate.id}','${site.id}');
				<#else>
				ISINDEX=<#if utemplate.parent??>false<#else>true</#if>;
				DesignerUtils.initUserDesigner('${utemplate.id}','${site.id}');
				</#if>
			</#if>
	});
</script>
</head>
<body class="ui-designer-body">
<form id="itemsMore" name="itemsMore" action="" target="_blank" method="GET">
	<input type="hidden" id="itemsMorePid" name="pid">
	<input type="hidden" id="itemsMoreVersion" name="version">
</form>
<div id="tools">
<ul id="sysbar">
</ul>
<!--顶部工具栏-->
<div id="ui-designer-topbar" class="ui-designer-topbar" align="center">
 	<ul style="width:940px;padding-left:30px;margin:0px;background:url(http://static.xintaonet.com/assets/images/bgbar.png) repeat-x top;border:0px;">
		<li title="设计整个页面的布局"><a href="#view-contents">布局设计</a></li>
		<li title="选择不同系统皮肤或自定义皮肤"><a href="#themeRoller">风格/皮肤</a></li>
		<form id="checkoutMySiteForm" name="checkoutMySiteForm" target="_blank" method="get" action="http://<#if site??>${site.domainName}<#else>shop${USER.user_id}</#if>.xintaonet.com">
		<input id="checkoutMySiteVersion" type="hidden" name="version">
		</form>
		<li title="保存当前设计结果">
		<button id="designerSave">保存</button></li>
		<#if USER.role=="admin"&&designerModel??&&'admin'==designerModel>
		<li><a href="/designer/assets/toolbar/systemTemplateInfo.html">另存</a><li>
		</#if>
		<li title="预览当前设计"><button id="preview">预览</button></li>
		<li title="发布当前设计结果"><button id="designerDeploy">发布</button></li>
		<li title="查看最新设计结果"><button id="checkoutMySite">查看我的淘站</button></li>
		<li title="重新选择系统模板设计"><button id="backSystemTemplates">重新设计</button></li>
		<form id="designerForm" name="designerForm" target="_blank" method="post" action="/router/member/designer/preview">
			<input type="hidden" id="designerSource" name="source" value="">
			<input type="hidden" id="designerHeader" name="header" value="">
			<input type="hidden" id="designerGids" name="gids" value="">
			<input type="hidden" id="designerSkin" name="skin" value="">
			<input type="hidden" id="designerStatus" name="status" value="<#if site??>${site.status}</#if>">
			<input type="hidden" id="designerSiteId" name="siteId" value="<#if site??>${site.id}</#if>">
			<input type="hidden" id="designerSiteTitle" name="siteTitle" value="<#if site??>${site.title}</#if>">
			<input type="hidden" id="designerTitle" name="title" value="<#if site??&&(!utemplate.parent??)>${site.title}<#else>${utemplate.name}</#if>">
		</form>
		<!--<li title="在设计过程中当推广组商品发生变化时点击刷新获取最新商品信息"><button id="refreshGroups">刷新推广组</button></li>-->
		<li title="佣金查看模式可查看推广组类商品佣金"><button id="commissionView">佣金查看模式</button></li>
		<li style="position:relative;" title="当前为拖拽模式，您可以通过拖拽组件树上的组件来设计页面"><button id="changeDragWidget">切换为传统模式</button><img style="position:absolute;right:-10px;top:-8px;" src="/designer/assets/images/new.gif"/></li>
		<li>&nbsp;&nbsp;</li>
		<li title="返回我的新淘网"><button id="return">返回首页</button></li>
		<li title="切换为您的其他页面设计"><button id="changePageDesigner">切换其他页面</button></li>
		<li title="查看设计器帮助"><a href="#help-designer">帮助</a></li>
	</ul>
	<div id="help-designer" align="center">
	<ul style="list-style:none;margin:0px;padding:0px;text-align: left;width:300px;">
	<li><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=344" target="_blank"><h4>01.怎么在新淘网建立淘客独立推广网站?</h4></a></li>
	<li><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=8" target="_blank"><h4>02.如何切换设计模式来方便自己设计页面?</h4></a></li>
	<li><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=345" target="_blank"><h4>03.如何制作我自己的店标?</h4></a></li>
	<li><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=346" target="_blank"><h4>04.如何调整我的页面布局?</h4></a></li>
	<li><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=347" target="_blank"><h4>05.如何改变我的页面皮肤/主题?</h4></a></li>
	<li><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=348" target="_blank"><h4>06.如何使用推广组类组件?</h4></a></li>
	<li><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=349" target="_blank"><h4>07.如何使用阿里妈妈组件?</h4></a></li>
	<li><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=350" target="_blank"><h4>08.如何使用其他组件(友情链接)?</h4></a></li>
	<li><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=352" target="_blank"><h4>09.如何设计多个页面?</h4></a></li>
	<li><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=353" target="_blank"><h4>10.如何更换我的首页?</h4></a></li>
	</ul>
	</div>
	<div id="view-contents" style="width: 560px; background: #D5E7FF;margin:5px;">
		<span style="color:#FF0084;">拖拽下方模拟容器排序,双击单个模拟容器可定位至实际容器</span>
		<br/>
		<ul style="opacity: 1; filter:Alpha(Opacity=100);"></ul>
		<table width="100%">
		<tr>
			<td align="left" width="100px"><button id="view-contents-add">增加布局容器</button></td>
			<td id="content-layouts" style="display:none;">
			<button name="view-contents-add-layout" layout="1">单栏(1)</button>
			<button name="view-contents-add-layout" layout="1-3">两栏(1-3)</button>
			<button name="view-contents-add-layout" layout="1-1">两栏(1-1)</button>
			<button name="view-contents-add-layout" layout="1-3-1">三栏(1-3-1)</button>
			<button name="view-contents-add-layout" layout="1-1-1">三栏(1-1-1)</button>
			</td>
		</tr>	
		</table>
		<br/>
		<button id="view-contents-save">保存</button><button id="view-contents-cancel">取消</button>
	</div>
	<@theme.theme>
	</@theme.theme>
</div>
<!--浮动工具栏-->
<div id="ui-designer-widgetbar" class="ui-designer-widgetbar" style="width:150px;position:fixed;left:5px;border:2px solid #EEEEEE;">
<h3 class="ui-corner-top" title="可拖拽至页面任何地方">我的组件列表</h3>
<ul id="widgets-tree" class="">
	<li><span class="">自定义组件</span>
	<ul id="widgets-tree-custome">
		<li><span class="">单栏</span>
		<ul id="widgets-tree-custome-0">
			<li><span class=""><a target="_blank" href="/router/member/widget/sys?layout=0&type=-1">制作该布局组件</a></span></li>
		</ul>
		</li>
		<li><span class="">两栏(1-3)右</span>
		<ul id="widgets-tree-custome-1">
			<li><span class=""><a target="_blank" href="/router/member/widget/sys?layout=1&type=-1">制作该布局组件</a></span></li>
		</ul>
		</li>
		<li><span class="">三栏(1-3-1)中</span>
		<ul id="widgets-tree-custome-2">
			<li><span class=""><a target="_blank" href="/router/member/widget/sys?layout=2&type=-1">制作该布局组件</a></span></li>
		</ul>
		</li>
		<li><span class="">两栏(1-1)左/右</span>
		<ul id="widgets-tree-custome-3">
			<li><span class=""><a target="_blank" href="/router/member/widget/sys?layout=3&type=-1">制作该布局组件</a></span></li>
		</ul>
		</li>
		<li><span class="">三栏(1-1-1)左/中/右</span>
		<ul id="widgets-tree-custome-4">
			<li><span class=""><a target="_blank" href="/router/member/widget/sys?layout=4&type=-1">制作该布局组件</a></span></li>
		</ul>
		</li>
		<li><span class="">两栏(1-3)左</span>
		<ul id="widgets-tree-custome-5">
			<li><span class=""><a target="_blank" href="/router/member/widget/sys?layout=5&type=-1">制作该布局组件</a></span></li>
		</ul>
		</li>
		<li><span class="">三栏(1-3-1)左/右</span>
		<ul id="widgets-tree-custome-6">
			<li><span class=""><a target="_blank" href="/router/member/widget/sys?layout=6&type=-1">制作该布局组件</a></span></li>
		</ul>
		</li>
	</ul>
	</li>
	<li class="closed"><span class="">推广组组件</span>
	<ul id="widgets-tree-group">
		<li class="widget" wname="itemsLinkView" layout="0,1,2,3,4,5,6"><span class="">文字链接</span></li>
		<li class="widget" wname="itemsThumbView" layout="0,1,2,3,4,5,6"><span class="">图形相册</span></li>
		<li class="widget" wname="itemsListView" layout="0,1,2"><span class="">商品列表</span></li>
		<li class="widget" wname="itemsScrollableView" layout="0,1,2"><span class="">横向滚动</span></li>
	</ul>
	</li>
	<li class="closed"><span class="">阿里妈妈组件</span>
	<ul id="widgets-tree-mama">
		<li class="widget" wname="searchBox" layout="0,1,2,3,4,5,6"><span class="">新版搜索框</span></li>
		<li class="widget" wname="channelView" layout="0"><span class="">频道推广</span></li>
		<li class="widget" wname="flashView" layout="0,1,2,3,4,5,6"><span class="">阿里妈妈广告牌</span></li>
	</ul>
	</li>
	<li class="closed"><span class="">其他组件</span>
	<ul id="widgets-tree-other">
		<li class="widget" wname="netLinkView" layout="0,1,2,3,4,5,6"><span class="">友情链接</span></li>
		<li class="widget" wname="chongzhiView" layout="0,1,2,3,4,5"><span class="">虚拟充值框</span></li>
		<li class="widget" wname="huabaoView" layout="0"><span class="">导购画报组件</span></li>
		<li class="widget" wname="richEditor" layout="0,1,2,3,4,5,6"><span class="">html高级编辑器</span></li>
	</ul>
	</li>
</ul>
</div>
<!--组件预览--> <!-- itemsLinkView -->
<div wname="itemsLinkView" class="previewWidgetImg"><img
	src="/assets/min/images/widget/itemsLinkView.png" /></div>
<!-- itemsThumbView -->
<div wname="itemsThumbView" class="previewWidgetImg"><img
	src="/assets/min/images/widget/itemsThumbView.png" /></div>
<!-- itemsListView -->
<div wname="itemsListView" class="previewWidgetImg"><img
	src="/assets/min/images/widget/itemsListView.png" /></div>
<!-- itemsRotatorView -->
<div wname="itemsRotatorView" class="previewWidgetImg"><img
	src="/assets/min/images/widget/itemsRotatorView.png" /></div>
<!-- itemsZoomView -->
<div wname="itemsZoomView" class="previewWidgetImg"><img
	src="/assets/min/images/widget/itemsZoomView.png" /></div>
<!-- itemsAppleView -->
<div wname="itemsAppleView" class="previewWidgetImg"><img
	src="/assets/min/images/widget/itemsAppleView.png" /></div>
<!-- itemsCycleView -->
<div wname="itemsCycleView" class="previewWidgetImg"><img
	src="/assets/min/images/widget/itemsCycleView.png" /></div>
<!-- itemsScrollableView -->
<div wname="itemsScrollableView" class="previewWidgetImg"><img
	src="/assets/min/images/widget/itemsScrollableView.png" /></div>
<!-- richEditor -->
<div wname="richEditor" class="previewWidgetImg"><img
	src="/assets/min/images/widget/richEditor.png" /></div>
<!-- flashView -->
<div wname="flashView" class="previewWidgetImg"><img
	src="/assets/min/images/widget/flashView.png" /></div>
<!-- searchBox -->
<div wname="searchBox" class="previewWidgetImg"><img
	src="/assets/min/images/widget/searchBox.png" /></div>
<!-- netLinkView -->
<div wname="netLinkView" class="previewWidgetImg"><img
	src="/assets/min/images/widget/netLinkView.png" /></div>
<!-- channelView -->
<div wname="channelView" class="previewWidgetImg"><img
	src="/assets/min/images/widget/channelView.png" /></div>
<div wname="ucBlogView" class="previewWidgetImg"><img
	src="/assets/min/images/widget/ucBlogView.png" /></div>
<!-- widgetCustomer -->
<div wname="widgetCustomer" class="previewWidgetImg"><img
	src="/assets/min/images/widget/widgetCustomer.png" /></div>
<!-- huabaoView -->
<div wname="huabaoView" class="previewWidgetImg"><img
	src="/assets/min/images/widget/huabaoView.jpg" /></div>
<!-- chongzhiView -->
<div wname="chongzhiView" class="previewWidgetImg"><img
	src="/assets/min/images/widget/chongzhiView.png" /></div>
<!--组件工具栏-->
<div id="ui-designer-widget-handle" title="移动此组件" class="ui-designer-widget-handle ui-corner-top">
	<ul style="margin-top:3px;margin-left:5px;">
	<li><a id="add-widget" title="添加新组件">添加</a></li>
	<li><a id="widgetSet" title="编辑">编辑</a></li>
	<li><a id="moveUp" title="上移">上移</a></li>
	<li><a id="moveDown" title="下移">下移</a></li>
	<li><a id="widgetRemove" title="移除此组件">删除</a></li>
	</ul>
</div>
<div id="widget-groups-dialog" title="请选择推广组" style="position:relative;display:none;">
<ol class="sort-number">
	<li class="item1">
		<h3>选择推广组:</h3>
		<select id="itemGroups" class="ui-designer-groups" style="display:block;"><option value="0">选择推广组</option></select>
	</li>
	<li class="item2">
		<h3>选择排序方式</h3>
		<select id="itemsSortBy">
		<option selected value="sortOrder_asc">默认</option>
		<option value="commission_desc">佣金由高到低</option>
		<option value="commission_num_desc">成交量由高到低</option>
		<option value="commission_volume_desc">总支出佣金由高到低</option>
		<option value="commission_rate_desc">佣金比率由高到低</option>
		<option value="price_asc">价格由低到高</option>
		<option value="price_desc">价格由高到低</option>
		</select>
	</li>
</ol>
</div>
<!--Kissy编辑器-->
<div id="richEditorTextAreaDialog" title="编辑自定义HTML内容" style="display:none;position:relative;">
<textarea id="richEditorTextArea" style="width:98%;height:250px"></textarea>
</div>
<div id="widget-searchBox-dialog" title="请选择关键词分类及显示行数" style="position:relative;display:none;">
<ol class="sort-number">
	<li class="item1">
		<h3>选择分类:</h3>
		<select id="searchBoxCats" style="width:200px;"><option value="0" selected="selected">所有类目</option><option value="0001">女人</option><option value="0002">男人</option><option value="0003">数码</option><option value="0004">美容</option><option value="0005">家居</option><option value="0006">运动</option><option value="0099">其他</option></select>
	</li>
	<li class="item2">
		<h3>选择显示行数</h3>
		<input type="text" id="searchBoxLines" value="0" maxlength="2" size="6">
	</li>
</ol>
</div>
<div id="widget-customes-dialog" title="切换自定义组件" style="position:relative;display:none;">
<ul class="designer-widgets-custome" style="list-style:none;margin-top:20px;margin-left:10px;"></ul>
</div>
<div id="widget-channels-dialog" title="请选择频道" style="position:relative;display:none;">
<ul>
<#list channels as c><li channel="${c.value}"><img src="${c.pic}" alt="${c.name}" width="96px" height="93px"><a href="${c.clickUrl?replace('mm_10011550_0_0',pid)}" title="${c.name}" class="smoothbox_word" target="_blank">${c.name}</a></li></#list>
</ul>
</div>
<div id="ui-designer-header-tools-dialog" style="position:relative;display:none;" title="编辑Header">
	<div  id="headerTabs">
		<ul>
			<li><a href="/designer/assets/toolbar/header/headerSmartAds.html">智能广告牌</a></li>
			<li><a href="/designer/assets/toolbar/header/headerAlimamaBMFlash.html">自定义阿里妈妈广告牌</a></li>
			<li><a href="/designer/assets/toolbar/header/headerImage.html">自定义广告图片</a></li>
			<li><a href="/designer/assets/toolbar/header/headerMenu.html">编辑导航栏</a></li>
		</ul>
	</div>
</div>
<div id="ui-designer-header-tools" class="ui-designer-header-tools" style="height:25px;display:none;" align="center">
	<button id="headerSet" style="height:25px;width:150px;zoom:1;">编辑Header部分</button>
</div>
<!--大小描述-->
<div id="ui-designer-size" class="ui-designer-size">
	<span>大小(宽:<span id="oWidth"></span>,高<span id="oHeight"></span>)</span>
</div>

<!--阿里妈妈BM弹出设置-->
<div id="alimamaBMDialog" title="阿里妈妈Flash广告牌DIY" style="display:none">
	<h3><a style="color: #FF0084;" href="http://banner.alimama.com/templets" target="_blank">去阿里妈妈制作广告牌</a></h3><br/>
<ol class="sort-number">
	<li class="item1">
		<h3>广告牌Flash地址:</h3><input type="text" id="alimamaBM" size="60">
	</li>
	<li><button id="modifyAlimamaBM">编辑此广告牌</button></li>
</ol>
</div>
</div>
<!--画报编辑组件弹出配置-->
<div id="huabaoEditorDialog" title="选择要显示的画报" style="position:relative;display:none">
<div style="width:700px" align="center">
<input name="huabaoSearchText" id="huabaoSearchText" style="padding:2px;width:300px;"><button id="huabaoSearchButton" style="padding:2px;cursor:pointer;">搜索画报</button>
<ul id="huabaoEditorType" style="width:300px;"><li><a t="0">全部</a></li><li><a t="1">男人</a></li><li><a t="2">女人</a></li><li><a t="3">服饰</a></li><li><a t="5">居家</a></li><li><a t="6">亲子</a></li><li><a t="8">创意站</a></li></ul>
</div>
<div id="huabao-search" style="clear:both;"></div>
</div>
<div id="widgetTitleDialog" title="编辑组件标题" style="display:none;position:relative;" align="center">
组件标题长度不能超过30<br/><br/>
<input id="widgetTitleInput" size="30" style="" maxlength="30">
</div>
<div id="colorPicker" style="display:none">
</div>
<div id="netLinkViewEditor" title="友情链接编辑器" style="display:none;position:relative;">
<table width=100%><tr><th width=140px>操作</th><th width=220px>链接标题</th><th width=290px>链接地址</th><th>显示</th></tr></table>
<ul>
</ul>
</div>
<div id="designer-widgets-dialog" title="添加新组件" style="display:none;margin:0px;padding:0px;;position:relative;">
<table width="100%"><tr><td id="designer-widgets-dialog-tabs" width="100%">
<ul style="height:160px;"><li><a href="#widgettype-custome">自定义组件</a></li><li><a href="#widgettype-group">推广组组件</a></li><li><a href="#widgettype-alimama">阿里妈妈组件</a></li><li><a href="#widgettype-other">其他组件</a></li></ul>
<ul id="widgettype-custome" class="designer-widgets designer-widgets-custome"></ul>
<ul id="widgettype-group" class="designer-widgets">
<li class="widget" layout="0,1,2,3,4,5,6" widget="itemsLinkView" align="center" title="" wtype="group"><div class="img"><a><img src="/assets/min/images/widget/itemsLinkView_160.png" /></a></div><div><span class="title">文字链接</span></div></li>
<li class="widget" layout="0,1,2,3,4,5,6" widget="itemsThumbView" align="center" title="" wtype="group"><div class="img"><a><img src="/assets/min/images/widget/itemsThumbView_160.png" /></a></div><div><span class="title">图形相册</span></div></li>
<li class="widget" layout="0,1,2" widget="itemsListView" align="center" title="" wtype="group"><div class="img"><a><img src="/assets/min/images/widget/itemsListView_160.png" /></a></div><div align="center"><span class="title">商品列表</span></div></li>
<li class="widget" layout="0,1,2" widget="itemsScrollableView" align="center" title="" wtype="group"><div class="img"><a><img src="/assets/min/images/widget/itemsScrollableView_160.png" /></a></div><div align="center"><span class="title">横向滚动</span></div></li>
</ul>
<ul id="widgettype-alimama" class="designer-widgets">
<li class="widget" layout="0,1,2,3,4,5,6" widget="searchBox" align="center" title="" wtype="alimama"><div class="img"><a><img src="/assets/min/images/widget/searchBox_160.png" /></a></div><div align="center"><span class="title">新版搜索框</span></div></li>
<li class="widget" layout="0" widget="channelView" align="center" title="" wtype="alimama"><div class="img"><a><img src="/assets/min/images/widget/channelView_160.png" /></a></div><div align="center"><span class="title">频道推广</span></div></li>
<li class="widget" layout="0,1,2,3,4,5,6" widget="flashView" align="center" title="" wtype="alimama"><div class="img"><a><img src="/assets/min/images/widget/flashView_160.png" /></a></div><div align="center"><span class="title">阿里妈妈广告牌</span></div></li>
</ul>
<ul id="widgettype-other" class="designer-widgets">
<li class="widget" layout="0,1,2,3,4,5,6" widget="netLinkView" align="center" title="" wtype="other"><div class="img"><a><img src="/assets/min/images/widget/netLinkView_160.png" /></a></div><div align="center"><span class="title">友情链接</span></div></li>
<li class="widget" layout="0,1,2,3,4,5" widget="chongzhiView" align="center" title="" wtype="other"><div class="img"><a><img src="/assets/min/images/widget/chongzhiView_160.jpg" /></a></div><div><span class="title">虚拟充值组件</span></div></li>
<li class="widget" layout="0" widget="huabaoView" align="center" title="" wtype="other"><div class="img"><a><img src="/assets/min/images/widget/huabaoView_160.jpg" /></a></div><div><span class="title">导购画报组件</span></div></li>
<li class="widget" layout="0,1,2,3,4,5,6" widget="richEditor" align="center" title="" wtype="other"><div class="img"><a><img src="/assets/min/images/widget/richEditor_160.png" /></a></div><div align="center"><span class="title">html高级编辑器</span></div></li>
</ul>
</td><td></td></tr></table>
</div>
<div id="pageDesignerDialog" style="display:none;">
<TABLE class="wTable" style="padding-left:2px;padding-right:2px;" width=100% border="0" cellspacing="1" cellpadding="1">
	<THEAD><TR><TH>页面名称</TH><TH>页面地址</TH><TH>状态</TH><TH>操作</TH></TR>
	</THEAD>
	<tbody id="pages-tbody">
	</tbody>
</table>	
</div>
<div id="designerBrowserWarn" title="设计器提示信息" style="display:none;">
系统检测到您正在使用<span id="designerBrowserInfo" style="color:#FF0084;font-weight:blod;"></span><br/>
<br/>
使用此低版本浏览器。您暂时无法使用以下功能：
<ul id="designerBrowserList">
</ul>
<br/>
如果您继续使用此低版本浏览器，可能会发现各种功能操作比较缓慢。
<br/>
<br/>
新淘网强烈建议您使用
<a href="http://www.google.com/chrome" target="_blank" style="color:#0073EA;font-weight:blod;">谷歌(Chrome)</a>,
<a href="http://www.mozillaonline.com/" target="_blank" style="color:#0073EA;font-weight:blod;">火狐(Firefox)</a>,
<a href="http://www.microsoft.com/china/windows/internet-explorer/" target="_blank" style="color:#0073EA;font-weight:blod;">IE8</a>浏览器访问以获取更好,更快的体验。<br/><br/>
<span style="color:#FF0084;">无论您使用以上哪个浏览器。新淘网设计器将保证设计结果在各个主流浏览器一致。</span>
</div>
<div id="designer" class="ui-designer-body">
</div>
<div id="designer-loading" style="z-Index:10000000;background-color:#666;display:none;opacity:0.5;filter:alpha(opacity=50);position:absolute;left:0px;top:0px;width:100%;height:100%;">
<span style="font-weight:bold;position:absolute;top:5px;right:20px;">正在加载...</span>
</div>
</body>
</html>
