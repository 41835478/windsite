<@ws.header>
<meta name="keywords" content="新淘网,填写站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,填写站点基本信息">
<title>填写站点基本信息-我是淘客-新淘网</title>
</@ws.header>
<style>
.step li span{display: -moz-inline-box;display: inline-block; *zoom: 1; *display: inline;vertical-align: middle;line-height: 100%;text-align: left;font-size: 12px;}
.step {width: 100%;margin-bottom: 20px;overflow: hidden;}.step li,.step li span {background-image: url('/assets/min/images/bg-step.png');background-repeat: no-repeat;text-align: center;}.step li {width: 207px;height: 29px;line-height: 29px;padding-left: 20px;float: left;overflow: hidden;text-align: center;position: relative;background-position: right -108px;border: none;color: #605F5F;}.step li span {width: 100%;font-size: 14px;line-height: 27px;line-height: 29px;display: block;position: absolute;left: -17px;background-position: 0 -108px;text-indent: 17px;}.step li.finished {background-position: -4px -108px;}.step li.finished span {left: 0;background-position: 0 -108px;}.step li.current {height: 29px;background-position: right -51px;border: none;}.step li.current span {background-position: 17px -51px;font-weight: bold;color: #AB4400;}.step li.last {border-right: 1px #DBDBDB solid;background-position: right -406px;}.step li.last span {background: none;left: 0;}.step li.last-current {height: 29px;background-position: right -166px;border: none;border-right: 1px solid #ffab0a;}.step li.last-current span {background-position: 15px -166px;font-weight: bold;color: #AB4400;left: -15px;}
.step-three li{width:450px;}.fm-input .i-text{width:300px}
</style>
<script src="/assets/js/jquery/tools/validator.min.js" type="text/javascript"></script>
<script src="/assets/js/site/siteStep.js?v=${dateVersion()}" type="text/javascript"></script>
<script>
$(function(){
	initSiteStep1();
})
</script>
<@xt.steptemplate navselected='taoke'>
<link rel="stylesheet" href="/assets/min/css/fanli.css?v=${dateVersion()}" type="text/css"/>
<ol class="step step-three"><li class="current"><span>填写站点基本信息</span></li><li class="last"><span>淘站装修</span></li></ol>
<div style="border: 1px solid #DDD;margin: 20px auto 0px;margin-top: 5px;width:100%;">
<div class="fm-input" style="float:left;width:520px;margin-top:5px;">
	<form id="siteForm" method="POST">
		<input type="hidden" id="siteId" value="${site.id}">
		<fieldset><legend>填写站点基本信息</legend>
		<div class="fm-item"><label for="siteTitle" class="fm-label"><span class="required">*</span>淘站名称：</label><input type="text"  required="required" minlength="3" maxlength="50" class="i-text" id="siteTitle" name="siteTitle" value="${site.title}"><div class="fm-explain">由3-50个字符组成。</div></div>
		<div class="fm-item"><label class="fm-label" for="siteCid"><span class="required">*</span>类别：</label>
		<select id="siteCid" style="padding: 4px 2px 5px;"><#list cats as c>
					<#if c.cid==site.cid>
						<option value="${c.cid}" selected>${c.name}</option>
					<#else>
						<option value="${c.cid}">${c.name}</option>
					</#if>
				</#list></select><div class="fm-explain">选择淘站推广的类别。</div></div>
		<div class="fm-item"><span class="btn btn-ok"><input type="submit" value="下一步"></span><span class="fm-confirm"><span class="loading-text fn-hide">正在提交信息</span></span></div>
		</fieldset>
	</form>
</div>
<div style="width:400px;border-left: 2px dashed #CCC;float: left;line-height: 25px;margin-top: 5px;padding-left: 20px;">
<div style="clear:both;"></div>
</div>
</@xt.steptemplate>
