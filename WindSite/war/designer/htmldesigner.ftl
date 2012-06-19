<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<head>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站">
<meta name="description" content="组件设计器-新淘网">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>HTML标准推广组件设计器</title>
<script src="/assets/min/js/site-utils-all.min.js?v=${dateVersion()}" type="text/javascript"></script>
<script src="/assets/min/js/site-all.min.js?v=${dateVersion()}" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="http://static.xintaonet.com/assets/min/css/designer-all.min.css?v=${dateVersion()}">
<#import "/assets/macro/widgeteditor.ftl" as widgeteditor>
<script type="text/javascript">
	var PID = '${USER.pid}';
	var SPID = '${USER.pid?replace('mm_','')?replace('_0_0','')}';
$(function() {
	<#if designer??&&'create'==designer>
	$('#widget-customer').load('/router/member/designer/widgetdesigner/widget/${widget.id}',function(){
		initDesignerWidget();
	});
	<#elseif 'update'==designer&&cwidget??>
		initDesignerWidget();
		$('#widget_cats').val('${cwidget.cat.cid}');
		$('input[type="radio"][name="friendRadio"][value="${cwidget.friend}"]').attr('checked',true);
	</#if>
});
</script>
<script type="text/javascript" src="/assets/min/js/htmldesigner.min.js?v=${dateVersion()}"></script>
<style>
select,input{border: 1px solid #DDD;line-height: 16px;padding: 3px 2px;}
.info {background: #FFC url(http://static.xintaonet.com/assets/images/light.gif) no-repeat 20px 8px;background-image: url(http://static.xintaonet.com/assets/images/light.gif);border: 1px solid #FC6;color: #666;line-height: 18px;padding: 14px 0px 14px 60px;}
.top_box{background: #F9FCF7;}
.top_box{display: inline;float: left;margin: 0px 12px 12px 0px;overflow: ;width: 280px;}
.top_box .note{border:1px solid #D6D6D6;clear: both;padding: 8px 5px 5px;}
.top_box .note p{background: #FDFDE0;border: 1px dashed #CCC;margin: 0px 5px;padding: 5px;}
.top_box .list{border:1px solid #D6D6D6;clear: both;padding: 5px;position: relative;width: 268px;}
.top_box li{cursor:pointer;border-bottom: 1px dashed #CCC;height: 12px;padding: 6px 0px;position: relative;vertical-align: top;width: 268px;}
.top_box li.active{background: #EAF6C1;}.top_box .num{display: inline-block;font-size: 13px;text-align: right;width: 22px;}
.top_box .keyname{color: #0A4409;height: 13px;left: 29px;overflow: hidden;position: absolute;top: 6px;width: 150px;word-wrap: break-word;}
.rpm{text-align: right;}.top_box .rpm{height: 13px;overflow: hidden;position: absolute;right: 6px;top: 6px;width: 40px;}
.top_box .header{color:red;font-weight:bold;}ol{padding:0px;margin:0px;list-style:none;}
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
<@widgeteditor.widgetEditor>
</@widgeteditor.widgetEditor>
<input type="hidden" id="widget_layout" value="${widget.layout}">
<input type="hidden" id="widget_id" value="${widget.id}">
<input type="hidden" id="cwidget_id" value="<#if cwidget??>${cwidget.id}</#if>">
<table id="widgetDesigner" style="margin-top:20px;">
<tr><td>
<@ws.info>
	<span>
	<#if designer??&&'create'==designer>
		<strong style="color:red">一旦您发布了该组件，将不再允许调整该组件的隐私设置。</strong>
	<br/>
	</#if>
		您组件的更新将会同步更新使用了该组件并且接受自动更新的新淘网会员的页面。发布前建议显示下佣金，检查组件是否正常显示，如发现商品，店铺推广类没有显示佣金，请重新编辑该商品或店铺。
	</span>
	<a href="/router/site/view/support?type=help-customewidget" target="_blank"><strong>相关帮助</strong></a>&nbsp;&nbsp;&nbsp;<a href="/help/demo/widget/widget.html" target="_blank"><strong>观看演示视频</strong></a>
</@ws.info>
</td></tr>
<tr><td align=center height=50 valign=top>
<button id="previewCommission" title="只有店铺和商品可以查看到佣金" >显示佣金</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<#if 'create'==designer><button id="deployWidget">发布</button><#else><button id="deployUpdateWidget">发布</button></#if>
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
<tr><td id="widget-customer-parent">
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
</body>
</html>