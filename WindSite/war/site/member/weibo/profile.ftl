<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>基本设置--微博管理-我是淘客-新淘网</title>
</@ws.header>
<script src="/assets/js/jquery/tools/validator.min.js?v=${dateVersion()}" type="text/javascript"></script>
<script>
$(function(){
	initWeiboProfile();
});
</script>
<@xt.weibotemplate navselected='taoke' bdselected='weibo-profile' group=2>
<style>
input.i-text{width:300px;}
</style>
<div class="fm-input" style="width:520px;">
		<form id="weiboForm" method="POST">
		<fieldset><legend>设置微博站点基本信息</legend>
		<div class="fm-item"><label for="wb_site_title" class="fm-label"><span class="required">*</span>名称：</label><input type="text"  required="required" minlength="3" maxlength="50" class="i-text" id="wb_site_title" name="wb_site_title" value="${config.site_name}"><div class="fm-explain">微博站点名称：由3-50个字符组成。</div></div>
		<div class="fm-item"><label class="fm-label" for="wb_skin_default"><span class="required">*</span>皮肤：</label><select id="wb_skin_default" style="width:150px;padding: 4px 2px 5px" name="wb_skin_default"><option <#if '5'==config.skin_default>selected="selected"</#if> value="5">默认</option><option <#if '1'==config.skin_default>selected="selected"</#if> value="1">旅行</option><option <#if '2'==config.skin_default>selected="selected"</#if> value="2">科技</option><option <#if '3'==config.skin_default>selected="selected"</#if> value="3">荷花</option><option <#if '4'==config.skin_default>selected="selected"</#if> value="4">风景</option><option <#if '6'==config.skin_default>selected="selected"</#if> value="6">海滩</option></select><div class="fm-explain">微博站点的默认皮肤</div></div>
		<div class="fm-item"><label for="wb_site_info" class="fm-label">描述：</label><textarea id="wb_site_info"  class="i-textarea" name="wb_site_info" maxlength="300">${config.site_info}</textarea><div class="fm-explain">填写微博站点描述,长度300以内</div></div>
		<div class="fm-item"><label class="fm-label" for="wb_site_record">备案号：</label><input type="text"  class="i-text" id="wb_site_record" name="wb_site_record" value="${config.site_record}"><div class="fm-explain">非cn域名如果尚未备案，可使用：京ICP备10035914号。</div></div>
		<div class="fm-item"><label class="fm-label">登录设置：</label><input type="radio"  class="i-radio" name="wb_login_way" value="2" style="line-height:24px;margin-bottom:8px;" <#if '2'==config.login_way>checked</#if>>仅使用购物站点帐号登录（需绑定帐号）<br/> <input type="radio"  class="i-radio" name="wb_login_way" style="line-height:24px;" value="3" <#if '3'==config.login_way>checked</#if>>使用新浪帐号与原有站点帐号并存方式登录（推荐）<div class="fm-explain">选择微博站点的登录方式。</div></div>
		<div class="fm-item"><label for="wb_logo" class="fm-label">微博LOGO：</label><input type="text" class="i-text" id="wb_logo" name="wb_logo" value="${config.logo}"><div class="fm-explain">微博站点LOGO,请填写正确的PNG图片地址，图片大小不超过200*65；为显示美观，请使用透明底素材</div></div>
		<div class="fm-item"><label for="wb_third_code" class="fm-label">第三方统计：</label><textarea id="wb_third_code"  class="i-textarea" name="wb_third_code">${config.third_code}</textarea><div class="fm-explain">请复制第三方统计代码</div></div>
		<div class="fm-item"><span class="btn btn-ok"><input type="submit" value="保存设置"></span><span class="fm-confirm"><span class="loading-text fn-hide">正在提交信息</span></span></div>
		</fieldset>
	</form>
</div>
</@xt.weibotemplate>
