<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>广告设置--微博管理-我是淘客-新淘网</title>
</@ws.header>
<script src="/assets/js/jquery/tools/validator.min.js?v=${dateVersion()}" type="text/javascript"></script>
<script>
$(function(){
	initWeiboAd();
});
</script>
<@xt.weibotemplate navselected='taoke' bdselected='weibo-weiboad' group=2>
<style>
input.i-text{width:300px;}
</style>
<div class="fm-input" style="width:520px;">
		<form id="weiboForm" method="POST">
		<fieldset><legend>设置微博站点广告</legend>
		<div class="fm-item"><label for="wb_ad_footer" class="fm-label">页尾广告：</label><textarea id="wb_ad_footer"  class="i-textarea" name="wb_ad_footer">${config.ad_footer}</textarea><div class="fm-explain">请输入页尾广告代码</div></div>
		<div class="fm-item"><span class="btn btn-ok"><input type="submit" value="保存设置"></span><span class="fm-confirm"><span class="loading-text fn-hide">正在提交信息</span></span></div>
		</fieldset>
	</form>
</div>
</@xt.weibotemplate>
