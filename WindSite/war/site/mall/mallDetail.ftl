<#setting url_escaping_charset='utf8'>
<#assign mallTitle=mall.title?replace('CPS|ROI|CPA|CPC','','ir')>
<@p.pageHeader>
<meta name="keywords" content="${mallTitle}">
<meta name="description" content="${mallTitle}<#if detail??>-${detail.description}</#if>">
<title>${mallTitle} - <#if cat??>${cat.title} - </#if>${sitetitle}</title>
</@p.pageHeader>
<style>
.store_show_box{ float:left; margin:5px 0px; padding:0; width:945px; height:auto;}.store_show_box_logo{ float:left; margin:0px 0px 0px 5px; padding:0; width:222px; height:182px;color:#333333; overflow:hidden;}
.store_show_box_logo p.t1,.store_show_box_logo p.t2,.store_show_box_logo p.t3,.store_show_box_logo p.t4{ margin:0; padding:0;width:222px;}.store_show_box_logo .pic { width:100px; height:100px; margin:25px 61px 10px 61px; padding:0; display:block; overflow:hidden;}
.store_show_box_logo b{ color:#FF6600;}.store_show_box_logo p.t2,.store_show_box_logo p.t3{ height:25px; line-height:25px; overflow:hidden;}.store_show_box_logo p.t4{ margin:5px 0 0 0;}
.store_show_box_logo .jump{ display:block; width:125px; height:35px; margin:0 auto; padding:0; background:url(/assets/min/stylesheets/images/dinggou.gif) no-repeat;}
.store_show_box_info{ float:left; margin:0px 0px 0px 8px; padding:0; width:710px; color:#4e4e4e;}.store_show_box_info ul{ float:left; margin:0; padding:0;}
.store_show_box_info ul li{ float:left; width:700px; margin:5px 0px; text-align:left; line-height:20px; overflow:hidden;border-bottom:1px solid #CCCCCC;padding-bottom:5px;}
.store_show_box_info ul li h1{font-size:13px; font-weight:700;padding:0;display:inline;}a.zhuying{height:25px; line-height:25px;color:#0163C8;}
.main_curpath{ margin:0; padding:0; width:800px; height:25px; line-height:25px; text-align:left; text-indent:10px; overflow:hidden;}.main_curpath h3{ font-size:12px; font-weight:100;}
</style>
<#if ((versionNo??&&(versionNo>=2)))&&www??&&www!=''&&'true'==site_isLogin&&!MEMBER??>
<script src="/assets/min/js/page/fanli.min.js?v=${dateVersion()}"></script>
<style>
.apple_overlay {display:none;background-image:url(/assets/min/stylesheets/images/white.png);width:300px;padding:35px;font-size:11px;}.apple_overlay .close {background-image:url(/assets/min/stylesheets/images/close.png);position:absolute; right:5px; top:5px;cursor:pointer;height:35px;width:35px;}.apple_overlay .field {padding-top: 12px;zoom: 1;}.apple_overlay .field label {display: inline-block;padding-right: 10px;text-align: right;width: 66px;}.apple_overlay .login-text {border: 1px solid #C8C8C8;height: 18px;line-height: 18px;margin-right: 3px;padding: 3px;vertical-align: middle;width: 180px;}
<!--[if lt IE 7]><style>div.apple_overlay {background-image:url(http://static.flowplayer.org/tools/img/overlay/overlay_IE6.gif);color:#fff;}div.apple_overlay div.close {background-image:url(http://static.flowplayer.org/tools/img/overlay/overlay_close_IE6.gif);}</style><![endif]-->
</style>
<div id="J_FanliLoginBox" class="apple_overlay">
	<div class="hd"></div>
	<div class="bd">
		<div style="margin:10px 30px 0 30px; border-bottom:1px solid #E6E6E6; padding-bottom:12px;"><span style="color:#313131; font-size:14px; margin-left:9px;">您尚末登录，购物无法拿到返利!</span></div>
		<div class="field"><label>账户名</label> <input type="text" id="J_Username" class="login-text"></div>
		<div class="field"><label>密　码</label>	<input type="password" id="J_Pwd" class="login-text"></div>
		<div class="field"><span id="J_FanliLoginButton" class="btn btn-ok" style="margin-left:80px;"><input type="button" value="登录"></span>&nbsp;&nbsp;&nbsp;<a href="/router/fanli/registe" id="J_FanliRegiste" style="color:#f30;" target="_blank">注册新会员</a></div>
		<div style="margin:22px 30px 0 30px; text-align:right;"><a id="J_FanliLink" style="font-size:14px;" href="#" target="_blank">不要返利，直接购买&gt;&gt;</a></div>
	</div>
</div>
</#if>
<#assign objectConstructor = "freemarker.template.utility.ObjectConstructor"?new()>
<#assign file = objectConstructor("java.io.File", htmlPath+"/htdocs/zone/ymall/malls/${mall.b2cId}.html")> 
<#if file.exists()><#include  "//ymall/malls/${mall.b2cId}.html" parse=false encoding="utf8"></#if>
<@p.pageFooter>
</@p.pageFooter>