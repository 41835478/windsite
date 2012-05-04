<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>开放平台设置--微博管理-我是淘客-新淘网</title>
</@ws.header>
<script src="/assets/js/jquery/tools/validator.min.js?v=${dateVersion()}" type="text/javascript"></script>
<script>
$(function(){
	initWeiboOpen();
});
</script>
<@xt.weibotemplate navselected='taoke' bdselected='weibo-open' group=2>
<style>
#addOpenWizard {font-size:12px;width:750px;height:320px;overflow-x:hidden;position:relative;}  #addOpenWizard .items {width:20000em;clear:both;position:absolute;}#addOpenWizard .step {padding:20px 30px;width:680px;float:left;}#addOpenWizard h2{position:relative;}#addOpenWizard h2{color:#5DAE40;font-weight:bold;border-bottom:1px dotted #ccc;font-size:17px;padding-bottom:5px;}#addOpenWizard #status {border: 1px solid #8AB78A;margin:0px !important;height:35px;background:#F0F5F9;padding-left:25px !important;}#status li {list-style-type:none;list-style-image:none;float:left;color:#414141;padding:10px 30px;}#status li.active {background-color:#5DAE40;color:#fff;font-weight:bold;}
input.i-text{width:280px;}
</style>
<div id="addOpenWizard">
	<ul id="status"> 
		<li class="active"><strong>1.</strong> 填写App Key,App Secret</li> 
		<li><strong>2.</strong> 设置管理员帐号</li>
	</ul>
	<div class="items">
		<div class="step firstStep">
			<h2> 
				步骤 1: 选择推广类型
			</h2>
			<div class="fm-input" style="width:520px;">
				<form id="weiboFirstForm" method="POST">
				<fieldset><legend>设置新浪微博开放平台信息</legend>
				<#if '4288004032'==config.app_key>
					<div class="fm-item"><label for="wb_app_key" class="fm-label"><span class="required">*</span>App Key：</label><input type="text"  required="required" class="i-text" id="wb_app_key" name="wb_app_key" readonly style="background:gray;" value="系统分配"><a id="appKeyType">自定义</a><div class="fm-explain">新浪微博应用的唯一标识</div></div>
					<div class="fm-item"><label class="fm-label" for="wb_app_secret"><span class="required">*</span>App Secret：</label><input type="text"  required="required" class="i-text" id="wb_app_secret" name="wb_app_secret" readonly style="background:gray;" value="系统分配"><div class="fm-explain">新浪微博应用分配的密钥</div></div>
				<#else>
					<div class="fm-item"><label for="wb_app_key" class="fm-label"><span class="required">*</span>App Key：</label><input type="text"  required="required" class="i-text" id="wb_app_key" name="wb_app_key" value="${config.app_key}"><a id="appKeyType">系统分配</a><div class="fm-explain">新浪微博应用的唯一标识</div></div>
					<div class="fm-item"><label class="fm-label" for="wb_app_secret"><span class="required">*</span>App Secret：</label><input type="text"  required="required" class="i-text" id="wb_app_secret" name="wb_app_secret" value="${config.app_secret}"><div class="fm-explain">新浪微博应用分配的密钥</div></div>
				</#if>
				<div class="fm-item"><span class="btn btn-ok"><input type="submit" value="下一步"></span><span class="fm-confirm"><span class="loading-text fn-hide">正在提交信息</span></span>&nbsp;&nbsp;&nbsp;<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=4550" target="_blank">查看相关帮助</a></div>
				</fieldset>
				</form>
			</div>
		</div> 
		<div class="step secondStep"> 
			<h2> 
				步骤 2: 填写管理员帐号<a href="#" class="prev" style="position:absolute;right:0px;color:#F60;">返回上一步</a>
			</h2>
			<span>请确认您已经登录您的<a href="http://${USER.sites[0].www?replace('www.','t.','f')}" target="_blank">微博站点</a>,并绑定了您的新浪微博帐号</span>
					<br/>
			<div class="fm-input" style="width:520px;">
				<form id="weiboSecondForm" method="POST">
				<fieldset><legend>设置新浪微博开放平台信息</legend>
					<div id="wb_nick_item" class="fm-item"><label class="fm-label" for="wb_nick"><span class="required">*</span>管理员昵称：</label><input type="text" class="i-text" id="wb_nick" name="wb_nick" value="${config.nickname}"><div class="fm-explain">您自己在微博站点的新浪微博昵称</div></div>
					<div class="fm-item"><span class="btn btn-ok"><input type="submit" value="保存设置"></span><span class="fm-confirm"><span class="loading-text fn-hide">正在提交信息</span></span>&nbsp;&nbsp;&nbsp;<a class="prev">上一步</a></div>
				</fieldset>
				</form>
			</div>
		</div> 
	</div>  
</div> 
<@ws.help>
<h3>1.为什么我要填写自己的新浪微博开放平台app key和app secret？</h3>
<p>当您在<a href="http://open.t.sina.com.cn" target="_blank">新浪微博开放平台</a>申请的应用审核通过后，进入新淘网提供的微博应用发布的所有微博内容，来源将显示您的新淘网购物返利微博地址。请确保新浪微博应用地址填写的是:<strong style="color:red;">http://${USER.sites[0].www?replace('www.','t.','f')}</strong></P>
<h3>1.如何获取自己的新浪微博开放平台app key和app secret？</h3>
<p><a href="http://open.t.sina.com.cn/wiki/index.php/%E6%96%B0%E6%89%8B%E6%8C%87%E5%8D%97#.E5.BA.94.E7.94.A8.E5.88.9B.E5.BB.BA.E5.8F.8A.E5.8F.91.E5.B8.83.E6.B5.81.E7.A8.8B.E5.9B.BE" target="_blank">新浪微博开放平台帮助文档</a></P>
</@ws.help>
</@xt.weibotemplate>
