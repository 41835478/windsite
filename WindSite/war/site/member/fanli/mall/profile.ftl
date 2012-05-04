<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>商城设置-返利管理-我是淘客-新淘网</title>
<style>
.error {height:15px;background-color:#FFFE36;border:1px solid #E1E16D;font-size:11px;color:#000;padding:3px 10px;margin-left:-2px;-moz-border-radius:4px;-webkit-border-radius:4px;-moz-border-radius-bottomleft:0;-moz-border-radius-topleft:0;-webkit-border-bottom-left-radius:0;-webkit-border-top-left-radius:0;-moz-box-shadow:0 0 6px #ddd;-webkit-box-shadow:0 0 6px #ddd;}
fieldset{padding:5px;margin-bottom:10px;border:1px solid #EFEFEF;}fieldset legend{font-weight:700;font-size:14px;color:#014D7F}fieldset table td{height:25px;line-height:17px;} td.key{width:100px;text-align:right;}td.value{width:150px;padding-left:20px;}
td.fl-num{text-align:center;width:80px;}th strong{color:red} fieldset .wTable td.value{text-align:left;}a.a-num-un,a.a-num-wait,a.a-num-finish{font-weight:800;font-size:16px;text-decoration: underline;}a.a-num-un{color:red;}a.a-num-wait{color:#090;}a.a-num-finish{color:gray}
</style>
</@ws.header>
<script>
$(function(){
	$('#updateCommission').click(function(){
		var yiqifa_username=$('#yiqifa_username').val();
		if(!yiqifa_username){
			alert('亿起发用户名不能为空');
		}
		var yiqifa_sid = $('#yiqifa_sid').val();
		if(!yiqifa_sid){
			alert('亿起发网站编号不能为空');
		}
		var sender = new WindSender("/router/member/fl/mall/profile/update");
		sender.load("POST", {
					username:yiqifa_username,
					sid:yiqifa_sid,
					secret:$('#yiqifa_secret').val()
				}, function(response) {
					if (response.isSuccess()) {
						alert('保存返利设置成功');
						document.location.href='/router/member/fl/mall/profile';
					} else {
						alert(response.msg);
					}
				});	
	});
});
</script>
<@xt.taoketemplate navselected='taoke' bdselected='fanli-mall' group=2>
<#if !(USER.sites[0].www??&&''!=USER.sites[0].www)><@ws.info><span style="color:red;font-size:14px;font-weight:bold;">警告：您的站点还没有绑定顶级域名，绑定顶级域名后才能正式启用返利版：<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=1803" target="_blank">查看绑定顶级域名帮助</a></span></@ws.info></#if>
<strong style="color:red;font-size:14px;font-weight:bold;"><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=12108" target="_blank">返利商城设置教程</a></strong>
<table width="720" align="center" border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#dddddd">
<tr><th height="30" align="right" class="bigtext">亿起发用户名：</th><td height="30" class="bigtext">&nbsp;<input type="text" id="yiqifa_username" style="padding:2px 0px;" value="${commission.yiqifa_username}" size="50" class="btn3" style="width:150px">您在亿起发联盟登录时的帐号名（email） </td></tr>
<tr><th height="30" align="right" class="bigtext">亿起发网站编号：</th><td height="30" class="bigtext">&nbsp;<input type="text" id="yiqifa_sid" style="padding:2px 0px;" value="${commission.yiqifa_sid}" size="50" class="btn3" style="width:150px">您在亿起发联盟创建的网站(必须是在新淘网建立的站点)编号</td></tr>
<tr><th height="30" align="right" class="bigtext">数据同步密钥：</th><td height="30" class="bigtext">&nbsp;<input type="text" id="yiqifa_secret" style="padding:2px 0px;" value="${commission.yiqifa_secret}" size="50" class="btn3" style="width:150px">您在亿起发联盟设置的报表数据同步密钥</td></tr>
<tr><td height="30" colspan="2" height="30" class="bigtext">&nbsp;&nbsp;&nbsp;&nbsp;<input id="updateCommission" type="button" style="padding:2px;cursor:pointer;" value="保 存 设 置 "> &nbsp;&nbsp;&nbsp;<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=12110" target="_blank">查看帮助</a></td></tr>
</table>
<@ws.help>
<h3>1.亿起发用户名？</h3>
<p>是指您在亿起发登录时使用的email帐号。</p>
<h3>2.亿起发网站编号？</h3>
<p>是指您在亿起发添加的新淘网站点的网站编号【亿起发联盟-----网站管理-----网站ID】。</p>
<h3>3.数据同步密钥？</h3>
<p>是指您在亿起发配置的数据同步密钥（可由数字字母组成），需要您联系您在亿起发联盟的客户经理，由他配置您指定的密钥，同时您需要将此密钥配置在新淘网，两者匹配后，新淘网才可以帮助您获取亿起发的推广报表数据</p>
</@ws.help>
</@xt.taoketemplate>
