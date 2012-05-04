<@p.pageHeader>
<meta name="keywords" content="${sitetitle},会员注册">
<meta name="description" content="会员注册 - ${sitetitle}">
<title>会员注册-${sitetitle}</title>
</@p.pageHeader>
<script src="/assets/min/js/page/fanli.min.js"></script>
<script src="/assets/js/jquery/tools/validator.min.js" type="text/javascript"></script>
<script src="/assets/min/js/page/ext_fanli.min.js"></script>
<script>
$(function(){
	initRegiste();
});
</script>
<style>
.apple_overlay {display:none;background-image:url(/assets/min/stylesheets/images/white.png);width:330px;padding:35px;font-size:11px;}.apple_overlay .close {background-image:url(/assets/min/stylesheets/images/close.png);position:absolute; right:5px; top:5px;cursor:pointer;height:35px;width:35px;}.apple_overlay .field {padding-top: 12px;zoom: 1;}.apple_overlay .field label {display: inline-block;padding-right: 10px;text-align: right;width: 66px;}.apple_overlay .login-text {border: 1px solid #C8C8C8;height: 18px;line-height: 18px;margin-right: 3px;padding: 3px;vertical-align: middle;width: 180px;}
<!--[if lt IE 7]><style>div.apple_overlay {background-image:url(http://static.flowplayer.org/tools/img/overlay/overlay_IE6.gif);color:#fff;}div.apple_overlay div.close {background-image:url(http://static.flowplayer.org/tools/img/overlay/overlay_close_IE6.gif);}</style><![endif]-->
</style>
<link href="/assets/min/stylesheets/ext_fanli.css?v=${dateVersion()}" rel="stylesheet"/>
<div id="fanli-site-map" style="display:none;padding-top:80px;" class="apple_overlay">
	<div style="margin:10px 30px 0 0px; border-bottom:1px solid #E6E6E6; padding-bottom:12px;"><span style="color:#313131; font-size:14px;">注册成功，点击进入快速通道!</span></div>
	<ul>
		<li><a href="http://${www}/router/fanlimember">会员中心</a></li>
		<li><a href="http://${www}">购物首页</a></li>
		<li><a href="http://${www}/huabao/index.html">画报返利</a></li>
		<#if weibo??&&''!=weibo><li><a href="http://${www}/router/fanli/loginuc?redirect=http://${weibo}">微博广场</a></li></#if>
	</ul>
</div>
<div class="layout grid-m ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div style="border: 1px solid #DDD;margin: 20px auto 0px;margin-top: 20px;width:100%;">
				<input type="hidden" id="referer" value="${referer}"/>
				<div class="fm-input" style="float:left;width:520px;">
					<form id="fanliForm" method="POST">
						<fieldset><legend><#if is_bind>完善注册信息&nbsp;&nbsp;或&nbsp;&nbsp;<a href="/router/fanli/login?referer=${referer}" style="color:red;font-size:14px;">已有账号登录</a><#else>注册个人账户</#if></legend>
						<div class="fm-item"><label for="username" class="fm-label"><span class="required">*</span>用户名：</label><input type="text"  required="required" minlength="3" maxlength="15" class="i-text J-autofocus" id="username" name="username" value="${third_nick}"><div class="fm-explain">由3-15个字符组成。</div></div>
						<div class="fm-item"><label class="fm-label" for="pwd"><span class="required">*</span>登录密码：</label><input type="password"  required="required" minlength="6" maxlength="20"  class="i-text J-pwdStrengthCheck" id="pwd" name="pwd" value=""><div class="fm-explain">由6-20个字符组成。</div></div>
						<div class="fm-item"><label class="fm-label" for="pwd-confirm"><span class="required">*</span>确认密码：</label><input type="password" data-equals="pwd" required="required" class="i-text" id="pwd-confirm" name="pwd-confirm" value=""><div class="fm-explain"></div></div>
						<div class="fm-item"><label for="email" class="fm-label"><span class="required">*</span>电子邮箱：</label><input type="email" required="required" class="i-text J-autofocus" id="email" name="email" value=""><div class="fm-explain">Email主要作为取回密码用。</div></div>
						<div class="fm-item"><label for="alipay" class="fm-label">支付宝帐号：</label><input type="text" class="i-text J-autofocus" id="alipay" name="alipay" value=""><div class="fm-explain">返利支付的帐号，请务必填写正确。</div></div>
						<div class="fm-part" <#if is_bind>style="display:none"</#if>>
							<div class="fm-item"><label for="qq" class="fm-label">QQ：</label><input type="text" class="i-text J-autofocus" id="qq" name="qq" value=""><div class="fm-explain">方便客服与您及时联系。</div></div>
							<div class="fm-item"><label for="msn" class="fm-label">MSN：</label><input type="text" class="i-text J-autofocus" id="msn" name="msn" value=""><div class="fm-explain">方便客服与您及时联系。</div></div>
							<div class="fm-item"><label for="wangwang" class="fm-label">旺旺：</label><input type="text" class="i-text J-autofocus" id="wangwang" name="wangwang" value=""><div class="fm-explain">方便客服与您及时联系。</div></div>
							<div class="fm-item"><label for="mobile" class="fm-label">手机号：</label><input type="text" class="i-text J-autofocus" id="mobile" name="mobile" value=""><div class="fm-explain">方便客服与您及时联系。</div></div>
						</div>
						<div class="fm-item">
							<span class="btn btn-ok"><input type="submit" value="马上注册"></span>
							<#if is_bind>&nbsp;&nbsp;&nbsp;<a href="/router/fanli/login?referer=${referer}" style="color:red;font-size:14px;">已有账号登录</a></#if>
						</div>
						</fieldset>
					</form>
				</div>
				<div style="width:400px;border-left: 2px dashed #CCC;float: left;line-height: 25px;margin-top: 20px;padding-left: 20px;"><b style="color: #F50;font-size: 16px;">&nbsp;&nbsp;本站声明文件：</b><br>
					&nbsp;&nbsp;&nbsp;&nbsp;1、本站提供淘宝网(www.taobao.com)以及国内其他主流商城优质商品及店铺的相关链接和推广，不承担商品的质量及售后服务；<br>
					&nbsp;&nbsp;&nbsp;&nbsp;2、本站不涉及网络支付等问题，所有商品购买最终都通过淘宝网，其他主流商城以及支付宝平台，故不存在账号泄露等问题，请买家放心；<br>
					&nbsp;&nbsp;&nbsp;&nbsp;3、通过本站购买商品的买家均可获得一定现金金额的返还；<br>
					&nbsp;&nbsp;&nbsp;&nbsp;4、当您通过本站去淘宝网或其他商城购物（确认收货付款后），就可以登录会员中心查看返利记录，我们会及时将返利金额打到您的支付宝账户。<br>
				</div>
				<div style="clear:both;"></div>
			</div>
		</div>
	</div>
</div>
<@p.pageFooter>
</@p.pageFooter>