<@ws.header>
<meta name="keywords" content="新淘网,填写站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,填写站点基本信息">
<title>选择淘站模板-我是淘客-新淘网</title>
</@ws.header>
<style>
.step li span{display: -moz-inline-box;display: inline-block; *zoom: 1; *display: inline;vertical-align: middle;line-height: 100%;text-align: left;font-size: 12px;}
.step {width: 100%;margin-bottom: 20px;overflow: hidden;}.step li,.step li span {background-image: url('/assets/min/images/bg-step.png');background-repeat: no-repeat;text-align: center;}.step li {width: 207px;height: 29px;line-height: 29px;padding-left: 20px;float: left;overflow: hidden;text-align: center;position: relative;background-position: right -108px;border: none;color: #605F5F;}.step li span {width: 100%;font-size: 14px;line-height: 27px;line-height: 29px;display: block;position: absolute;left: -17px;background-position: 0 -108px;text-indent: 17px;}.step li.finished {background-position: -4px -108px;}.step li.finished span {left: 0;background-position: 0 -108px;}.step li.current {height: 29px;background-position: right -51px;border: none;}.step li.current span {background-position: 17px -51px;font-weight: bold;color: #AB4400;}.step li.last {border-right: 1px #DBDBDB solid;background-position: right -406px;}.step li.last span {background: none;left: 0;}.step li.last-current {height: 29px;background-position: right -166px;border: none;border-right: 1px solid #ffab0a;}.step li.last-current span {background-position: 15px -166px;font-weight: bold;color: #AB4400;left: -15px;}
.step-three li{width:450px;}.fm-input .i-text{width:300px}
.ui-selecting {background: #FECA40;}
.ui-selected {background: #F39814;color: white;}
.channel_show_small{margin:0px;padding:0px;padding-top: 10px;list-style:none;}
.channel_show_small li{display: inline;float: left;padding:2px;height: 200px;margin-right: 10px;position: relative;width: 217px;cursor:pointer;}
.channel_show_small .smoothbox_btn{background: transparent url(/assets/min/images/template_detail.gif) no-repeat scroll 0px 0px;border: none;bottom: 14px;color: black;height: 26px;line-height: 29px;line-height: 29px;overflow: hidden;position: absolute;right: 5px;text-align: center;width: 78px;z-index: 2;}
.channel_show_small .smoothbox_word{color: #0065FF;display: block;font-weight: bolder;text-align: center;}
.smoothbox_img img{width:210px;height:160px;}#channel_show_big{width:365px;386px;}
</style>
<script src="/assets/js/jquery/tools/validator.min.js?v=${dateVersion()}" type="text/javascript"></script>
<script src="/assets/js/site/siteStep.js?v=${dateVersion()}" type="text/javascript"></script>
<script src="/assets/js/site/channels.js?v=${dateVersion()}" type="text/javascript"></script>
<script>
var PID='${USER.pid}';
$(function(){
	initSiteStep2();
})
</script>
<@xt.steptemplate navselected='taoke'>
<link rel="stylesheet" href="/assets/min/css/fanli.css?v=${dateVersion()}" type="text/css"/>
<ol class="step step-three"><li><span>填写站点基本信息</span></li><li class="last last-current"><span>选择淘站模板</span></li></ol>
<div id="channel_show_small_dialog" style="display:none;">
<table>
<tr>
<td id="_template_pic" align="center" style="padding:5px;border:1px solid #DDD;">
<ul style="list-style:none;">
<li style="width:365px;height:390px;border:1px solid #DDD;"><img id="channel_show_big"/></li>
<li><a href="#" id="preview_template" target="_blank" style="font-size:16px;font-weight:900;text-decoration: underline;color:#0065FF">预览页面效果</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="btn btn-ok" id="use_template"><input type="button" value="应用此模板"></span></li>
</ul>
</td>
</tr>
</table>
<!--<a href="http://www.xintaonet.com/zone/channel/channel.html?channel='+channel.value+'&pid=${USER.pid}" title="'+channel.name+'" class="smoothbox_word" target="_blank">'+channel.name+'</a>-->
</div>
<ul id="channel_show_small" class="channel_show_small">
<#list channels as c>
<li channel="${c.value}"><a class="smoothbox smoothbox_img"><img src="${c.bigPic}"/></a><a title="${c.name}" class="smoothbox smoothbox_btn">查看详情</a>
<a href="/zone/channel/channel.html?channel=${c.value}&pid=${USER.pid}" title="${c.name}" class="smoothbox_word" target="_blank">${c.name}</a></li>
</#list>				
</ul> 
</@xt.steptemplate>