<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<head>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站">
<meta name="description" content="新淘网 - 新淘网实现了多种酷炫图片组件封装，向广大普通互联网用户提供一站式的建站方案，大幅度降低建站门槛，会用鼠标就可以拖拽生成独立而漂亮的淘宝推广网站，让更多的普通互联网用户成为专业淘客、推广淘宝、赚取佣金">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title><#if site??&&(!utemplate.parent??)>${site.title}<#else>${utemplate.name}</#if>-淘空间设计器</title>
<link rel="stylesheet" type="text/css" href="http://static.xintaonet.com/assets/min/css/designer-all.min.css?v=${dateVersion()}">
<#import "/assets/macro/widgets.ftl" as w>
<#import "/assets/macro/themeroller.ftl" as theme>
<#import "/assets/macro/templates.ftl" as template>
<#import "/assets/macro/widgeteditor.ftl" as widgeteditor>
<script type="text/javascript" src="/assets/min/js/designer-utils-all.min.js?v=${dateVersion()}"></script>
<script type="text/javascript" src="/assets/min/js/designer-all.min.js?v=${dateVersion()}"></script>
<script type="text/javascript" src="/assets/js/tinymce/tiny_mce_src.js?v=${dateVersion()}"></script>
<script type="text/javascript">
	var USERID='${USER.user_id}';
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
<div id="hiddenTheme" style="display:none;width:0px;height:0px;">
<div class="ui-designer-header-tabs" style="width:0px;height:0px;"><a href="#" style="width:0px;height:0px;"><h2 style="width:0px;height:0px;"></h2></a></div>
<div class="ui-designer-body" style="width:0px;height:0px;"></div>
<div class="ui-designer-widget-header" style="width:0px;height:0px;"></div>
<div class="ui-designer-widget" style="width:0px;height:0px;"></div>
<div class="title" style="width:0px;height:0px;"></div>
<div class="price" style="width:0px;height:0px;"></div>
<div class="widget-catslistview-cats" style="widget:0px;height:0px;"><div class="title"></div></div>
</div>
<!--隐藏工具栏按钮-->
<!--<span id="ui-designer-topbar-hide" style="position:fixed;right:5px;top:5px;font-weight:bold;z-Index:100000;cursor:pointer;color:#FF0084;">隐藏工具栏</span>-->
<ul id="sysbar">
</ul>
<!--顶部工具栏-->
<div id="ui-designer-topbar" class="ui-designer-topbar" align="center">
 	<ul style="width:940px;padding-left:30px;margin:0px;background:url(http://static.xintaonet.com/assets/images/bgbar.png) repeat-x top;border:0px;">
 		<#if template??>
		<!--<li><a id="currentTemplateA" href="#currentTemplate">基本信息</a></li>-->
		</#if>
		<li title="设计整个页面的布局"><a href="#view-contents">布局设计</a><!--<button id="changeDesignerModel">组件设计</button>--></li>
		<li title="选择不同系统皮肤或自定义皮肤"><a href="#themeRoller">风格/皮肤</a></li>
		<form id="checkoutMySiteForm" name="checkoutMySiteForm" target="_blank" method="get" action="http://shop${USER.user_id}.xintaonet.com">
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
		<li title="在设计过程中当推广组商品发生变化时点击刷新获取最新商品信息"><button id="refreshGroups">刷新推广组</button></li>
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
<div id="ui-designer-widgetbar" class="ui-designer-widgetbar" style="width:140px;position:fixed;left:5px;"></div>
<!--组件工具栏-->
<div id="ui-designer-widget-handle" title="移动此组件" class="ui-designer-widget-handle ui-corner-top">
	<ul style="margin-top:3px;margin-left:5px;">
	<li><button id="add-widget" title="添加"></button></li>
	<li><button id="moveUp" title="上移"></button></li>
	<li><button id="moveDown" title="下移"></button></li>
	<li><button id="widgetSet" title="编辑"></button></li>
	<li><button id="widgetRemove" title="移除此组件"></button></li>
	<li>
	<select id="itemGroups" class="ui-designer-groups" style="width:90px;">
		<option value="0">选择推广组</option>
	</select>
	</li>
	<li>
	<select id="myCustomeWidgetSelect" style="display:none;width:100px;">
		<option layout="-1" value="-1">选择自定义组件</option>
		<optgroup label="我的设计" wtype="my">
        </optgroup>
        <optgroup label="我的收藏" wtype="fav">
        </optgroup>
	</select>
	</li>
	<li>
	<select id="itemsSortBy" style="display:none;width:120px;">
		<option selected value="sortOrder_asc">默认</option>
		<option value="commission_desc">佣金由高到低</option>
		<option value="commission_num_desc">成交量由高到低</option>
		<option value="commission_volume_desc">总支出佣金由高到低</option>
		<option value="commission_rate_desc">佣金比率由高到低</option>
		<option value="price_asc">价格由低到高</option>
		<option value="price_desc">价格由高到低</option>
	</select>
	</li>
	<!--<li>
		<select id="shopWindowsSelect" style="display:none;width:50px;">
			<option value="beauty" selected>美容</option>
			<option value="lady">女装</option>
			<option value="food">食品</option>
			<option value="sports">运动</option>
			<option value="digital">数码</option>
		</select>
	</li>-->
	<li>
		<select id="channelsSelect" style="display:none;width:100px;">
		<option value="channelcode" selected>综合频道</option>
		<option value="shop_street">店铺街</option>
		<option value="brand_lib">品牌库</option>
		<option value="channelmall">商城频道</option>
		<option value="electric">电器城频道</option>
		<option value="man">男人频道</option>
		<option value="lady">女人频道</option>
		<option value="digital">数码频道</option>
		<option value="baby">居家玩具</option>
		<option value="beauty">美容频道</option>
		<option value="jewelry">饰品鞋包</option>
		<option value="food">食品频道</option>
		<option value="mallhouse">家装频道</option>
		<option value="taiwan">台湾馆频道</option>
		<option value="channelfy">淘宝风云榜</option>
		</select>
	</li>
	<ul>
</div>
<div id="ui-designer-header-tools-dialog" style="position:relative;display:none;" title="编辑Header">
	<div  id="headerTabs">
		<ul>
			<!--<li><a href="/designer/assets/toolbar/header/headerAlbum.html">图片相册</a></li>-->
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

<!--商品选择器-->
<div id="itemsSelect" title="推广商品选择" style='display:none'>
	<select id="itemGroupsSelect"  class="ui-designer-groups">
		<option value="0">选择推广组</option>
	</select>
	<span>图片大小:</span>
	<input type='radio' value='40x40' name='imageSize'>40x40&nbsp;
	<input type='radio' value='60x60' name='imageSize' checked >60x60&nbsp;
	<input type='radio' value='100x100'name='imageSize'>100x100&nbsp;
	<input type='radio' value='160x160'name='imageSize'>160x160&nbsp;
	<input type='radio' value='310x310'name='imageSize'>310x310&nbsp;
	<div class="ui-widget-content" style="margin-top:20px;">
		<ul class="ui-designer-items">
		</ul>
	</div>
</div>
<!--类目选择器-->
<!--<div id="itemCatsSelect" title="商品类目选择" style="display:none;position:relative;">
<#if USER.pid=="">
		您尚未同步您的PID,不能使用类目推广,点击同步PID！
<#else>
<ul class="add-cats-grid">
</ul> 
<div id="addCatsButton" style="display:none;">
	<button id="confirmCatsAdd">确认增加已选类目</button><button id="deleteCatsAdd">删除已选类目</button>
</div>
	<hr width="99%"/> 
<div>
类目名称:<input type="text" id="itemCatName">
<button id="itemCatLocalSearch">搜索当前类目</button>
<button id="itemCatLocalAllSearch">显示当前所有类目</button>
</div>
<div>
&nbsp;&nbsp;<input type="checkbox" id="catsCheckAll">全选&nbsp;&nbsp;<a id="rootCatsPath" class="catsPath" cid="0" isparent="true">根类目<span style="color:red;font-weight:bold;">></span></a><span id="catsPath"></span>
</div>
<ul class="cats-grid">
</ul>
</#if>
</div>-->
<!--阿里妈妈BM弹出设置-->
<div id="alimamaBMDialog" title="阿里妈妈Flash广告牌DIY" style="display:none">
	<h3><a style="color: #FF0084;" href="http://banner.alimama.com/" target="_blank">去阿里妈妈制作广告牌</a></h3><br/>
	广告牌Flash地址:<input type="text" id="alimamaBM" size="80"><br/><br/>
	<button id="modifyAlimamaBM">编辑此广告牌</button>
</div>

</div>
<!--横向滚动组件弹出-->
<div class="simple_overlay" id="gallery" align="center"> 
	 	<a class="prev">上一个</a> 
	 	<a class="next">下一个</a> 
	 	<div class="info" style="width:auto;"></div> 
	 	<img class="progress" src="/assets/min/images/scrollable_loading.gif" /> 
</div>
<!--搜索框编辑器-->
<div id="searchBoxEditor" title="编辑当前搜索框设计" style="display:none;height:250px;position:relative;">
<fieldset style="border: 0px; padding: 5px;"><legend><strong>选择图文样式:</strong></legend>
搜索框 + <input id="lg_i" type="checkbox" value=""> 淘宝logo + <input
	id="c_i" type="checkbox" value=""> 分类类目 + <input id="hot_i"
	type="checkbox" value=""> 热门关键词 + 搜索按钮</fieldset>
<fieldset style="border: 0px; padding: 5px;"><legend><strong>元素样式修改:</strong></legend>
<ul style="list-style: none;">
	<li style="margin: 5px auto;display:none;"><span>整个搜索框长度</span><input
		type="text" id="w_i" size="8" value="562">px&nbsp;&nbsp;<span>包含logo和搜索按钮的整长</span></li>
	<li style="margin: 5px auto;"><span>输入搜索框的提示</span> <input
		id="txt_s" maxlength="20" name="" type="text" style="width: 222px">
	<span>例：去淘宝购物</span></li>
	<li style="margin: 5px auto;"><table><tr><td><span>热门关键词颜色</span></td><td> <div class="colorContainer">
		<div id="hc_c" name="tColorPicker" class="colorPicker">
		<div class="bgColorPicker"></div>
		</div>
		</div></td></tr></table></li>
	<li style="margin: 5px auto;"><span>热门关键词的类目</span> <select
		id='cid_i' style="width: 226px">
		<option typeid="0" value="0" selected>所有分类</option>
		<option typeid="16" value="16">女装/女士精品</option>
		<option typeid="30" value="30">男装</option>
		<option typeid="50006842" value="50006842">箱包皮具/热销女包/男包</option>
		<option typeid="1801" value="1801">美容护肤/美体/精油</option>
		<option typeid="50008165" value="50008165">童装/童鞋/孕妇装</option>
		<option typeid="50006843" value="50006843">女鞋</option>
		<option typeid="50002766" value="50002766">零食/坚果/茶叶/特产</option>
		<option typeid="21" value="21">居家日用/收纳/礼品</option>
		<option typeid="1625" value="1625">女士内衣/男士内衣/家居服</option>
		<option typeid="2128" value="2128">家装饰品/窗帘/地毯</option>
		<option typeid="27" value="27">装潢/灯具/五金/安防/卫浴</option>
		<option typeid="50010788" value="50010788">彩妆/香水/美发/工具</option>
		<option typeid="50010404" value="50010404">服饰配件/皮带/帽子/围巾</option>
		<option typeid="26" value="26">汽车/配件/改装/摩托/自行车</option>
		<option typeid="50008090" value="50008090">3C数码配件市场</option>
		<option typeid="50008163" value="50008163">床上用品/靠垫/毛巾/布艺</option>
		<option typeid="25" value="25">玩具/模型/娃娃/人偶</option>
		<option typeid="50013864" value="50013864">饰品/流行首饰/时尚饰品新</option>
		<option typeid="50011740" value="50011740">流行男鞋</option>
		<option typeid="50011699" value="50011699">运动服/运动包/颈环配件</option>
		<option typeid="50010728" value="50010728">运动/瑜伽/健身/球迷用品</option>
		<option typeid="50002768" value="50002768">个人护理/保健/按摩器材</option>
		<option typeid="50008164" value="50008164">家具/家具定制/宜家代购</option>
		<option typeid="23" value="23">古董/邮币/字画/收藏</option>
		<option typeid="50007218" value="50007218">办公设备/文具/耗材</option>
		<option typeid="33" value="33">书籍/杂志/报纸</option>
		<option typeid="50014811" value="50014811">网店/网络服务/个性定制/软件</option>
		<option typeid="50005998" value="50005998">益智玩具/早教/童车床/出行</option>
		<option typeid="11" value="11">电脑硬件/台式整机/网络设备</option>
		<option typeid="2813" value="2813">成人用品/避孕/计生用品</option>
		<option typeid="28" value="28">ZIPPO/瑞士军刀/眼镜</option>
		<option typeid="50007216" value="50007216">鲜花速递/蛋糕配送/园艺花艺</option>
		<option typeid="35" value="35">奶粉/辅食/营养品</option>
		<option typeid="34" value="34">音乐/影视/明星/乐器</option>
		<option typeid="50011397" value="50011397">珠宝/钻石/翡翠/黄金</option>
		<option typeid="29" value="29">宠物/宠物食品及用品</option>
		<option typeid="50012082" value="50012082">厨房电器</option>
		<option typeid="50011972" value="50011972">影音电器</option>
		<option typeid="50013886" value="50013886">户外/登山/野营/旅行用品</option>
		<option typeid="50012100" value="50012100">生活电器</option>
		<option typeid="50016422" value="50016422">滋补/生鲜/速食/订餐</option>
		<option typeid="14" value="14">数码相机/摄像机/摄影器材</option>
		<option typeid="40" value="40">腾讯QQ专区</option>
		<option typeid="50016349" value="50016349">厨房/餐饮用具</option>
		<option typeid="50014812" value="50014812">尿片/洗护/喂哺等用品</option>
		<option typeid="50011665" value="50011665">网游装备/游戏币/帐号/代练</option>
		<option typeid="50008907" value="50008907">IP卡/网络电话/手机号码</option>
		<option typeid="50016348" value="50016348">日化/清洁/护理</option>
		<option typeid="50004958" value="50004958">移动/联通/小灵通充值中心</option>
		<option typeid="20" value="20">电玩/配件/游戏/攻略</option>
		<option typeid="99" value="99">网络游戏点卡</option>
		<option typeid="50012164" value="50012164">闪存卡/U盘/移动存储</option>
		<option typeid="50010388" value="50010388">运动鞋</option>
		<option typeid="50011949" value="50011949">旅游度假/打折机票/特惠酒店</option>
		<option typeid="50008075" value="50008075">演出/吃喝玩乐折扣券</option>
		<option typeid="50005700" value="50005700">品牌手表/流行手表</option>
		<option typeid="1512" value="1512">手机</option>
		<option typeid="1201" value="1201">MP3/MP4/iPod/录音笔</option>
		<option typeid="1101" value="1101">笔记本电脑</option>
		<option typeid="50011150" value="50011150">其它</option>
		<option typeid="50014442" value="50014442">世博会特许商品</option>
		<option typeid="50012081" value="50012081">国货精品手机</option>
		<option typeid="50012472" value="50012472">保健食品</option>
		<option typeid="50016891" value="50016891">网游垂直市场根类目</option>
	</select></li>
</ul>
</fieldset>
</div>
<!--智能广告编辑器-->
<!--
<div id="smartAdsFlashEditor" title="编辑当前智能广告" style="display:none;position:relative;">
</div>-->
<div id="widgetTitleDialog" title="编辑组件标题" style="display:none;position:relative;" align="center">
组件标题长度不能超过30<br/><br/>
<input id="widgetTitleInput" size="30" style="" maxlength="30">
</div>
<!--固定尺寸智能广告编辑器-->
<!--
<div id="fixedSmartAdsFlashEditor" title="编辑当前固定尺寸智能广告" style="display:none;position:relative;">
</div>-->
<!--<div id="ucBlogEditor" title="选择您要添加显示的日志" style="display:none;position:relative;">
</div>-->
<div id="colorPicker" style="display:none">
</div>
<div id="netLinkViewEditor" title="友情链接编辑器" style="display:none;position:relative;">
</div>
<div id="topicEditor" title="主题广告编辑器" align="left" style="margin: 0px; padding: 0px; width: 100%; height: 100%; background: #E1F1FF;display:none;position:relative;">
</div>
<div id="designer-widgets-dialog" title="添加新组件" style="display:none;margin:0px;padding:0px;;position:relative;">
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
<a href="http://www.mozillaonline.com/" target="_blank" style="color:#0073EA;font-weight:blod;">火狐(Firefox)</a>,
<a href="http://www.google.com/chrome" target="_blank" style="color:#0073EA;font-weight:blod;">谷歌(Chrome)</a>,
<a href="http://www.microsoft.com/china/windows/internet-explorer/" target="_blank" style="color:#0073EA;font-weight:blod;">IE8</a>浏览器访问以获取更好,更快的体验。<br/><br/>
<span style="color:#FF0084;">无论您使用以上哪个浏览器。新淘网设计器将保证设计结果在各个主流浏览器一致。</span>
</div>
<div id="designer" class="ui-designer-body">
</div>
<div id="designer-loading" style="z-Index:10000000;background-color:#666;display:none;opacity:0.5;filter:alpha(opacity=50);position:absolute;left:0px;top:0px;width:100%;height:100%;">
<span style="font-weight:bold;position:absolute;top:5px;right:20px;">正在加载...</span>
</div>
<!--<div id="designerZoom" align="center" style="padding:5px;display:none;"><button class="designerZoom-header">顶部</button><div id="designerZoomContents"><div class="designerZoom-handle"></div></div><button class="designerZoom-footer">底部</button></div>-->
</body>
</html>
