<#if (versionNo??&&(versionNo>=2))&&isAd??&&!isAd><#else><script>$(function(){IndexAd();});</script></#if>
<#if (versionNo??&&(versionNo>=2))&&www??&&www!=''&&user_id!=95242001&&user_id!=465792734&&www!='www.wy66.com'&&www!='www.isloli.com'&&www!='www.iamloli.com'>
<p class="login-info" id="login-info" style="width:500px;position:relative;">
	<#if MEMBER??>
		<#if  isAsyn??&&isAsyn&&MEMBER.commissionRate??&&''!=MEMBER.commissionRate><script>$(function(){PageModuleUtils.addFanliCommission(parseFloat(${MEMBER.commissionRate}/100));});</script></#if>
		您好,${MEMBER.info.username}！<a href="/router/fanli/logout">[退出]</a>&nbsp;&nbsp;|
		<a href="http://${www}/router/fanlimember"><span>会员中心</span></a>
	<#else>
		<script>$(function(){PageModuleUtils.unLoginSite('<#if 'true'==site_isLogin>true<#else>false</#if>','${sina_appkey}','${qq_appkey}');});</script>
		<#if isAsyn??&&isAsyn&&commissionRate??&&''!=commissionRate><script>$(function(){PageModuleUtils.addFanliCommission(parseFloat(${commissionRate}/100));});</script></#if>
		<span style="float:left;width:170px;">您好,游客！
		<a href="http://${www}/router/fanli/login">[请登录]</a>&nbsp;|&nbsp;<a href="http://${www}/router/fanli/registe">注册</a></span>
		<#if qq_appkey??>&nbsp;&nbsp;<span id="nav_third_login_qq" style="position:absolute;height:22px;left:170px;top:0px;width:130px;"></span></#if>
		<#if sina_appkey??>&nbsp;&nbsp;<span id="nav_third_login_sina" style="position:absolute;height:22px;left:<#if qq_appkey??>300px<#else>170px</#if>;top:0px;width:130px;"></span></#if>
	</#if>
</p>
<ul class="quick-menu">
    <li class="home"><a href="http://${www}/">购物首页</a></li>
	<li><a href="#" onclick="AddFavorite('${sitetitle}')">加入收藏</a></li>
	<li><a href="#" onclick="SetHome(this)">设为首页</a></li>
	<li><a href="http://${www}/ymall.html" target="_blank">综合商城</a></li>
	<#if weibo??&&''!=weibo><li><a href="http://${www}/router/fanli/loginuc?redirect=http://${weibo}" target="_blank">微博广场</a></li></#if>
	<li><a href="http://${www}/huabao/index.html" target="_blank">画报导购</a></li>
	<li><a href="http://${www}/dianpu.html" target="_blank">淘店铺</a></li>
	<li><a href="http://${www}/tblogs/584.html" target="_blank">帮助</a></li>
</ul>
<#else>
<#if (versionNo??&&(((versionNo==1.5))&&www??&&www!='')||versionNo>1.5)>
<p class="login-info" id="login-info">您好，欢迎来购物！</p>
<ul class="quick-menu">
    <li class="home"><a href="/">购物首页</a></li>
	<li><a href="#" onclick="AddFavorite('${sitetitle}')">加入收藏</a></li>
	<li><a href="#" onclick="SetHome(this)">设为首页</a></li>
	<li><a href="/huabao/index.html" target="_blank">导购画报</a></li>
	<li><a href="/dianpu.html" target="_blank">淘店铺</a></li>
	<li><a href="/tblogs.html" target="_blank">资讯</a></li>
</ul>
<#else>
<p class="login-info" id="login-info">您好，欢迎来购物！</p>
<ul class="quick-menu">
    <li class="home"><a href="/">购物首页</a></li>
	<li><a href="/shops" target="_blank">店铺街</a></li>
	<li><a href="/tblogs.html" target="_blank">资讯</a></li>
	<li><a href="http://www.jiathis.com/share.html" class="jiathis"><img src="http://www.jiathis.com/code/images/jiathis3.gif" width="125" height="21" border="0" id="jiathis_a"/></a></li>
</ul>
</#if>
</#if>