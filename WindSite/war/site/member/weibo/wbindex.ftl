<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>用户首页设置--微博管理-我是淘客-新淘网</title>
</@ws.header>
<script src="/assets/js/jquery/tools/validator.min.js?v=${dateVersion()}" type="text/javascript"></script>
<script>
$(function(){
	initWeiboWbIndex();
});
</script>
<@xt.weibotemplate navselected='taoke' bdselected='weibo-wbindex' group=2>
<style>
input.i-text{width:300px;}
</style>
<div class="fm-input" style="width:520px;">
		<form id="weiboForm" method="POST">
		<fieldset><legend>设置微博站点用户首页聚焦位</legend>
		<div class="fm-item"><label for="wb_title" class="fm-label"><span class="required">*</span>标题：</label><input type="text"  required="required" minlength="3" maxlength="50" class="i-text" id="wb_title" name="wb_title" value="${config.title}"><div class="fm-explain">我的首页聚焦位标题：由3-50个字符组成。</div></div>
		<div class="fm-item"><label for="wb_text" class="fm-label">内容：</label><textarea id="wb_text"  class="i-textarea" name="wb_text" maxlength="150">${config.text}</textarea><div class="fm-explain">我的首页聚焦位内容,长度74字以内</div></div>
		<div class="fm-item fm-selectbox"><label class="fm-label">操作设置：</label><input type="radio" name="wb_oper" class="i-radio" value="1" <#if config.oper=='1'>checked</#if>>发布微博<input type="radio" name="wb_oper" class="i-radio" value="2" <#if config.oper=='2'>checked</#if>>跳转到其他页面<div class="fm-explain">用户点击触发的操作事件</div></div>
		<div class="fm-item"><label for="wb_topic" class="fm-label">话题：</label><input type="text" class="i-text" <#if config.oper=='2'>readonly style="background:#EBEBE4;"</#if> id="wb_topic" name="wb_topic" value="${config.topic}"><div class="fm-explain">话题（操作设置为发布微博时有效）</div></div>
		<div class="fm-item"><label for="wb_link" class="fm-label">链接：</label><input type="text" class="i-text" <#if config.oper=='1'>readonly style="background:#EBEBE4;"</#if> id="wb_link" name="wb_link" value="${config.link}"><div class="fm-explain">跳转链接（操作设置为跳转到其他页面时有效）</div></div>
		<div class="fm-item"><label for="wb_btn_title" class="fm-label"><span class="required">*</span>按钮文字：</label><input  required="required" minlength="4" maxlength="10" type="text" class="i-text" id="wb_btn_title" name="wb_btn_title" value="${config.btnTitle}"><div class="fm-explain">我的首页聚焦位按钮的描述文字</div></div>
		<div class="fm-item"><span class="btn btn-ok"><input type="submit" value="保存设置"></span><span class="fm-confirm"><span class="loading-text fn-hide">正在提交信息</span></span>&nbsp;&nbsp;&nbsp;<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=4538" target="_blank">查看相关帮助</a></div>
		</fieldset>
	</form>
</div>
</@xt.weibotemplate>
