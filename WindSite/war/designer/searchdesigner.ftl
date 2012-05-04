<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<head>
<meta name="keywords" content="新淘网,自助建站">
<meta name="description" content="软文组件设计器-新淘网">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>搜索组件设计器</title>
<script src="/assets/min/js/site-utils-all.min.js?v=${dateVersion()}" type="text/javascript"></script>
<script src="/assets/min/js/site-all.min.js?v=${dateVersion()}" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="/assets/min/css/designer-all.min.css?v=${dateVersion()}">
<script type="text/javascript" src="/designer/assets/js/searchDesigner.js?v=${dateVersion()}"></script>
<script type="text/javascript">
	var PID = '${USER.pid}';
	var SPID = '${USER.pid?replace('mm_','')?replace('_0_0','')}';
$(function() {
	<#if designer??&&'create'==designer>
		//initDesignerWidget();
	<#elseif 'update'==designer&&cwidget??>
		//initDesignerWidget();
		$('#widget_cats').val('${cwidget.cat.cid}');
		$('input[type="radio"][name="friendRadio"][value="${cwidget.friend}"]').attr('checked',true);
	</#if>
});
</script>
<script src="/designer/assets/js/searchWidget.js?v=${dateVersion()}" type="text/javascript"></script>
<style>
.move{float:left;cursor:pointer;}
select,input{border: 1px solid #DDD;line-height: 16px;padding: 3px 2px;}
.info {background: #FFC url(/assets/images/light.gif) no-repeat 20px 8px;background-image: url(/assets/images/light.gif);border: 1px solid #FC6;color: #666;line-height: 18px;padding: 14px 0px 14px 60px;}
</style>
<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push( [ '_setAccount', 'UA-10891782-8' ]);
	_gaq.push( [ '_trackPageview' ]);
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
</head>
<body class="ui-designer-body">
<input type="hidden" id="widget_layout" value="${widget.layout}">
<input type="hidden" id="widget_id" value="${widget.id}">
<input type="hidden" id="cwidget_id" value="<#if cwidget??>${cwidget.id}</#if>">
<input type="hidden" id="widget_template" value="${widget.name}">
<table id="widgetDesigner" style="margin-top:20px;">
<tr><td>
<@ws.info>
	<span>
	<#if designer??&&'create'==designer>
		<strong style="color:red">一旦您发布了该组件，将不再允许调整该组件的隐私设置。</strong>
	<br/>
	</#if>
		搜索组件操作步骤:<br/>
		1.选择分类，选择的必须是最终的叶子分类<br/>
		2.点击确认按钮，生成当前分类的搜索属性值<br/>
		备注:您可以通过向上向下按钮来排列属性值显示位置
	</span>
	<a href="/router/site/view/support?type=help-customewidget" target="_blank"><strong>相关帮助</strong></a>&nbsp;&nbsp;&nbsp;<a href="/help/demo/widget/widget.html" target="_blank"><strong>观看演示视频</strong></a>
</@ws.info>
</td></tr>
<tr><td align=center height=50 valign=top>
<#if 'create'==designer><button id="deployWidget">发布</button><#else><button id="deployUpdateWidget">发布</button></#if>
<td></tr>
<tr><td>
<table>
<tr><td><label for="widget_cats">所属分类：</label></td><td>
<select id="widget_cats">
<option value="-1">选择所属类目</option>
<#list cats as c>
<option value="${c.cid}">${c.name}</option>
</#list>
</select></td><td><label for="widget_title">组件名称：</label></td><td><input type="text" id="widget_title" style="width:400px;" value="<#if cwidget??>${cwidget.name}</#if>"/><label class="desc">长度不能超过30</label></td></tr>
</table>
</td></tr>
<tr><td align=center>
<table>
<tr><td>
<div id="custome_cats" style="margin:0px;padding:0px;">
	<table><tr><td>
	<table><tr><td>
	<select id="custome_cats_select1">
	</select></td><td><select id="custome_cats_select2">
	</select></td><td><select id="custome_cats_select3">
	</select></td><td><select id="custome_cats_select4">
	</select></td><td><button id="custome_cats_confirm">确认</button></td></tr></table>
	</td></tr></table>
	</div>
</td></tr>
</table>
</td></tr>
<tr>
<td id="widget-customer-parent">
<div id="widget-customer" class="widget-customer" align="center" style="display:block;width: 955px;margin: 0 auto;zoom: 1;">
<#if designer??&&'update'==designer><#if cwidget??>${cwidget.content}</#if></#if>
</div></td>
</tr>
<tr><td valign=top>
<table>
<tr><td><label>隐私设置：</label></td><td>
<input type="radio" name="friendRadio" id="friendRadio_0" checked value="0" <#if designer??&&'update'==designer><#if cwidget??>disabled</#if></#if>/><label for="friendRadio_0">所有人可用</label>
<input type="radio" name="friendRadio" id="friendRadio_3" value="3" <#if designer??&&'update'==designer><#if cwidget??>disabled</#if></#if>/><label for="friendRadio_3">仅自己可用</label>
</td></tr>
<tr><td colspan=2>
<p style="padding:5px;margin-left:100px;color:red;"><strong>隐私设置一旦选择后将不可修改。</strong>选择所有人可用后，您的组件将出现在组件超市中，可以被其他人使用。选择仅自己可用，则不会出现在组件超市中。</p>
<td></tr>
<tr><td><label for="widget_description">组件描述：</label></td><td><textarea id="widget_description" rows="4" cols="100"><#if cwidget??>${cwidget.description}</#if></textarea><label class="desc">长度不能超过200</label></td></tr></table>
</td>
</tr>
<tr><td>
<@ws.help>
	<h3>淘客为什么要设计组件？</h3>
	<p>淘客可以设计自己专属的组件，然后在站点设计器中直接使用</P>
	<h3>卖家为什么要设计组件？</h3>
	<p>卖家可以根据自己店铺的商品来编辑组件，然后提供给淘客直接使用，使用人数越多，您店铺商品被推广的几率就越大。</p>
	</@ws.help>
</td></tr>
</table>
<div id="upDown" style="display:none;position:absolute;background: #0080C0;left:0px;height:20px;top:0px;width:40px;opacity: 0.8; filter:Alpha(Opacity=80);"><span id="moveUp" class="move ui-icon ui-icon-arrowthick-1-n" title="向上移动"></span><span  id="moveDown" title="向下移动" class="move ui-icon ui-icon-arrowthick-1-s"></span></div>
</body>
</html>