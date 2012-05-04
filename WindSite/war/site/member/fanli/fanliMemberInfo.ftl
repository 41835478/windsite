<@ws.fanliheader navselected='H05'>
<meta name="keywords" content="${sitetitle},会员管理">
<meta name="description" content="会员管理 - ${sitetitle}">
<title>用户信息-${sitetitle}</title>
</@ws.fanliheader>
<script src="/assets/js/jquery/tools/validator.min.js?v=${dateVersion()}" type="text/javascript"></script>
<script>
$(function(){
	initFanliSiteMemberInfo();
});
</script>
<@xt.fanlitemplate>
<div class="fm-input" style="float:left;width:520px;">
	<form id="fanliUpdateForm" method="POST">
		<fieldset><legend>注册个人账户</legend>
		<div class="fm-item"><label for="username" class="fm-label"><span class="required">*</span>用户名：</label><input type="text"  required="required" minlength="3" maxlength="15" class="i-text J-autofocus" id="username" name="username" readonly style="background:gray;" value="${member.info.username}"><div class="fm-explain">由3-15个字符组成。</div></div>
		<div class="fm-item"><label class="fm-label" for="pwd"><span class="required">*</span>旧密码：</label><input type="password"  required="required" minlength="6" maxlength="20"  class="i-text J-pwdStrengthCheck" id="oldpwd" name="oldpwd" value=""><div class="fm-explain">由6-20个字符组成。</div></div>
		<div class="fm-item"><label class="fm-label" for="pwd"><span class="required">*</span>新密码：</label><input type="password"  required="required" minlength="6" maxlength="20"  class="i-text J-pwdStrengthCheck" id="newpwd" name="newpwd" value=""><div class="fm-explain">由6-20个字符组成。</div></div>
		<div class="fm-item"><label class="fm-label" for="pwd-confirm"><span class="required">*</span>确认密码：</label><input type="password" data-equals="newpwd" required="required" class="i-text" id="pwd-confirm" name="pwd-confirm" value=""><div class="fm-explain"></div></div>
		<div class="fm-item"><label for="email" class="fm-label"><span class="required">*</span>电子邮箱：</label><input type="email" required="required" class="i-text J-autofocus" id="email" name="email" value="${member.info.email}"><div class="fm-explain">Email主要作为取回密码用。</div></div>
		<div class="fm-item"><label for="alipay" class="fm-label"><span class="required">*</span>支付宝帐号：</label><input type="text" required="required" class="i-text J-autofocus" id="alipay" name="alipay" value="${member.info.alipay}"><div class="fm-explain">返利支付的帐号，请务必填写正确。</div></div>
		<div class="fm-part">
		<div class="fm-item"><label for="qq" class="fm-label">QQ：</label><input type="text" class="i-text J-autofocus" id="qq" name="qq" value="${member.info.qq}"><div class="fm-explain">方便客服与您及时联系。</div></div>
		<div class="fm-item"><label for="msn" class="fm-label">MSN：</label><input type="text" class="i-text J-autofocus" id="msn" name="msn" value="${member.info.msn}"><div class="fm-explain">方便客服与您及时联系。</div></div>
		<div class="fm-item"><label for="wangwang" class="fm-label">旺旺：</label><input type="text" class="i-text J-autofocus" id="wangwang" name="wangwang" value="${member.info.wangwang}"><div class="fm-explain">方便客服与您及时联系。</div></div>
		</div>
		<div class="fm-item"><span class="btn btn-ok"><input type="submit" value="确认修改"></span><span class="fm-confirm"><span class="loading-text fn-hide">正在提交信息</span></span></div>
		</fieldset>
	</form>
</div>
</@xt.fanlitemplate>