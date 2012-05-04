<script type="text/javascript">
	$(function() {
		$("#backFriends").click(function(){ //返回好友列表  
			getHtmlFriends();
		}); 
		$("#profileTabs").tabs();
		$("#synTUser").button().click(function(){
			synTaobao('${user.user_id}');
		});
		$("#synSUser").button().click(function(){
			synJianghu('${user.user_id}');
		});
		$("#synPID").click(function(){
			synPID('${user.user_id}');
		});
	});
</script>
<style>
.wTable td, th {padding: 4px 4px; border-bottom: 1px solid #EEE;}.favorite li,.tUser li,.tShop li{margin:0px;padding:0px;height:22px;}.key{width:120px;display: block;float:left;}.value{float:left;}
</style>
<div id="profileTabs">
<ul>
	<li><a href="#tUserProfile">淘宝信息</a></li>
	<li><a href="#tShopProfile">店铺信息</a></li>
	<!--<li><a href="#sUserProfile">淘江湖信息</a></li>-->
</ul>
<div id="tUserProfile">
<#if user.t_created??>
<ul class="tUser" style="list-style:none;">
<#if USER??&&user.user_id==USER.user_id>
<li><label class="key">用户ID:</label><span class="value">${user.user_id}</span></li>
<li><label class="key">阿里妈妈PID(淘宝):</label><span class="value"><#if user.pid??&&(user.pid!='')>${user.pid}<#else><a id="synPID" style="color:#0073EA;cursor:pointer;">同步阿里妈妈PID</a></#if></span></li>
</#if>
<li><label class="key">用户昵称:</label><span class="value">${user.nick}</span></li>
<li><label class="key">性别:</label><span class="value">${(user.sex!'')?replace('m','男')?replace('f','女')}</span></li>
<li><label class="key">城市:</label><span class="value">${user.city}</span></li>
<li><label class="key">淘宝注册时间:</label><span class="value">${user.t_created}</span></li>
<li><label class="key">最近登录淘宝时间:</label><span class="value">${user.t_last_visit}</span></li>
</ul>
<#else>
尚未同步淘宝公开信息
</#if>
<#if USER??&&USER.user_id==user.user_id>
<br/>
<a id="synTUser" href="javascript:;" style="color:#00F"><strong>同步淘宝个人公开信息</strong></a>
</#if>
<@ws.help>
	<a href="http://www.xintaonet.com/router/site/view/support?type=help-myxintao&faq=10" target="_blank"><h3>1.为什么我在新淘网的PID与阿里妈妈的PID不一致？</h3></a>
	<h3>2.我可以修改我的PID吗？</h3>
	<p>不可以修改的。您在新淘网的PID是淘宝帐号对应的阿里妈妈的PID。新淘网基于淘宝TOP平台为大家提供淘宝客建站，目前仅支持淘宝帐号登录，即只支持淘宝帐号对应的PID</p>
</@ws.help>
</div>
<div id="tShopProfile">
	<#if shop??>
	<h3>基本信息</h3>
	<ul class="tShop" style="list-style:none;">
	<li><span class='key'>店铺名称：</span><span class='value'>${shop.title}</span></li>
	<li><span class='key'>佣金比例：</span><span class='value'><#if shop.commissionRate??>${shop.commissionRate}%<#else>您尚未加入推广</#if></span></li>
	<#else>
	<h3>尚未在淘宝开店或者未加入淘宝客推广，如果您已开店。但并未加入淘宝客推广。请点击:<a style="color:#00E;" href="http://forum.xintaonet.com/faq.php?action=faq&id=36&messageid=48" target="_blank">淘宝卖家如何加入淘宝客推广？</a></h3>
	</#if>
</ul>
</div>
</div>
