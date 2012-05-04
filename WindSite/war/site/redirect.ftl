<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<header>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚">
<meta name="description" content="新淘网 - 新淘网实现了多种酷炫图片组件封装，向广大普通互联网用户提供一站式的建站方案，大幅度降低建站门槛，会用鼠标就可以拖拽生成独立而漂亮的淘宝推广网站，让更多的普通互联网用户成为专业淘客、推广淘宝、赚取佣金">
<title>未登录或登录超时- 新淘网</title>
<#include "/site/template/import.ftl">
<script type="text/javascript">
$(function() {
	$('#site-login-dialog').dialog({
		bgiframe : true,
		height : 200,
		width : 400,
		zIndex : 1000,
		modal : false,
		close:function(){
			document.location.href="/router/site";
		}
	});
});
</script>
</header>
<BODY>
<div id="site-login-dialog" style="display:none;position:relative;" title="未登录或登录超时" align=center>
<style>
.btn-web-account {background:url(/assets/images/btn_bg.png) no-repeat;outline:none;}.btn-web-account{text-align:left;color:#000;display:inline-block;font-size:14px;height:32px;line-height:32px;margin:10px 0;padding:0 5px 0 40px;width:163px;outline:none;}.btn-web-account{background-position:0 0;}.btn-web-account:hover {background-position:-228px 0;}

</style>
<#if USER??&&USER.appType??&&USER.usb??>
	<#if USER.appType=='0'>
	<@ws.help>
	<h3>版本提示：您使用的是淘客卖家联盟的<#if USER.usb.versionNo==1||USER.usb.versionNo==1.6>普及版<#elseif USER.usb.versionNo==2>返利版(月租型)<#elseif USER.usb.versionNo==3>卖家版</#if>，请登录淘宝客卖家联盟</h3>
	</@ws.help>
	<div class="fm-item"><a class="btn-web-account" href="${taobaoEnv.container}" title="适合普及版，返利版(月租型)，卖家版">登录淘客卖家联盟</a><br/><span>适合普及版，返利版(月租型)，卖家版</span></div>
	<#elseif USER.appType=='1'>
	<@ws.help>
	<h3>版本提示：您使用的是淘客分成型，请登录淘客分成版</h3>
	</@ws.help>
	<div class="fm-item"><a class="btn-web-account" href="http://container.open.taobao.com/container?appkey=12194773" title="适合分成版">登录淘客分成版</a><br/><span>适合分成版</span></div>
	<#else>
	<div class="fm-item"><a class="btn-web-account" href="${taobaoEnv.container}" title="适合普及版，返利版(月租型)，卖家版">登录淘客卖家联盟</a><br/><span>适合普及版，返利版(月租型)，卖家版</span></div>
	<div class="fm-item"><a class="btn-web-account" href="http://container.open.taobao.com/container?appkey=12194773" title="适合分成版">登录淘客分成版</a><br/><span>适合分成版</span></div>	
	</#if>
<#else>
<div class="fm-item"><a class="btn-web-account" href="${taobaoEnv.container}" title="适合普及版，返利版(月租型)，卖家版">登录淘客卖家联盟</a><br/><span>适合普及版，返利版(月租型)，卖家版</span></div>
<div class="fm-item"><a class="btn-web-account" href="http://container.open.taobao.com/container?appkey=12194773" title="适合分成版">登录淘客分成版</a><br/><span>适合分成版</span></div>	
</#if>
<!--<div class="fm-item"><a class="btn-web-account" href="${taobaoEnv.container}" title="适合普及版，返利版(月租型)，卖家版">登录淘客卖家联盟</a><br/><span>适合普及版，返利版(月租型)，卖家版</span></div>
<div class="fm-item"><a class="btn-web-account" href="http://container.open.taobao.com/container?appkey=12194773" title="适合分成版">登录淘客分成版</a><br/><span>适合分成版</span></div>-->
</div>
</BODY>
</html>