<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>淘站卫士-淘客建站-我是淘客-新淘网</title>
</@ws.header>
<script>
$(function(){
//Tab
		$("#doctorTabs").tabs();
		$("#itemsDoctor").click(function(){
				getHtmlItemsDoctor("true");
				$("#itemsDoctorInfo").hide();
				return;
		});
		<#if itemsProcessing==true>
			$("#itemsDoctorInfo").hide();
		</#if>
		getHtmlItemsDoctor("false");
});
</script>
<@xt.taoketemplate navselected='taoke' bdselected='site-doctor'>
<div id="doctorTabs">
	<ul>
		<li><a href="#tabs-1">商品检测</a></li>
		<!--<li><a href="#tabs-2">图片检测</a></li>
		<li><a href="#tabs-3">友情链接检测</a></li>-->
	</ul>
	<div id="tabs-1">
		<div id="itemsDoctorInfo">
			<h3>商品检测能做什么?</h3>
			商品检测可以检测您的推广组内的所有推广商品是否有效,并更新推广商品的最新信息<br/>
			商品无效有可能是该商品已被商家下架,或该商品为虚拟物品,无法获得佣金。<br>
			为保障您的商品均有效,建议每天检测一次
			<a id="itemsDoctor" href="#" style="color:white;" class="button-red">开始商品检测</a>
		</div>
		<div id="itemsDoctorResult" width=100% height=100%>
		</div>
		<@ws.help>
		<a href="http://www.xintaonet.com/router/site/view/support?type=help-myxintao&faq=08" target="_blank"><h3>1.什么是淘站卫士？如何使用？</h3></a>
		</@ws.help>
	</div>
	<!--<div id="tabs-2">
		<h3>图片检测能做什么?</h3>
		图片检测可以检测您的推广组内的所有推广商品的图片是否有效<br/>
		<div style="height:200px;padding-top:50px; padding-left:50px;">
		<a href="#" style="color:white" class="button-red">开始图片检测</a>
		</div>
	</div>
	<div id="tabs-3">
		<h3>友情链接检测能做什么?</h3>
			友情链接检测可以检测您的淘站内的所有友情链接是否有效<br/>
			<div style="height:200px;padding-top:50px; padding-left:50px;">
			<a href="#" style="color:white" class="button-red">开始友情链接检测</a>
		</div>
	</div>-->
	
</div>
</@xt.taoketemplate>