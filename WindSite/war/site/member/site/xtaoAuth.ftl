<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>淘宝开放平台验证-我是淘客-新淘网</title>
</@ws.header>
<script>
$(function(){
	$('#xtaoAuthButton').click(function(){
		var code=$('#xtaoAuthCode').val();
		if(code){
			if(code.length>50||code.length<10){
				alert('请确认xtaoAuth.html内的验证正确');
				return;
			}
		}
		var sender = new WindSender("/router/member/sitemanager/xtaoAuth/update");
		sender.load("POST", {
				xtaoAuth:code
			}, function(response) {
				if (response.isSuccess()) {
					alert('保存淘宝开放平台xtaoAuth.html代码成功！')
					document.location.href = "/router/member/sitemanager/xtaoAuth";
				} else {
					alert(response.msg);
				}
			});
	});
});</script>
<@xt.taoketemplate navselected='taoke' bdselected='site-xtaoAuth'>
<@ws.info>
<span style="font-size:14px;color:red;">
请下载最新的xtaoAuth.html文件,并打开复制里边的验证码
</span>
</@ws.info>
<table width="720" align="center" border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#dddddd">
<tr><td align="right" width=150px>xtaoAuth.html代码:</td><td><textarea id="xtaoAuthCode" style="width:100%;_width:570px;height:30px;margin:0 auto;">${kefu.xtaoAuth}</textarea></td></tr>
<tr><td height="30" colspan="2" height="30" class="bigtext">&nbsp;&nbsp;&nbsp;&nbsp;<input id="xtaoAuthButton" type="button" style="padding:2px;cursor:pointer;" value="保 存 设 置 "> &nbsp;&nbsp;&nbsp;</td></tr>
<tr><td height="30" colspan="2" align="left" class="bigtext"><span class="bigtext" style="padding-left:27px; color:#FF0000">提醒：请确保您的xtaoAuth.html代码是最新的,正确的，否则无法验证通过。</span></td></tr>
</table>
<@ws.help>
	<p><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=51753" target="_blank">开放淘宝开放平台APPKEY,APPSECRET配置?</a></P>
</@ws.help>
</@xt.taoketemplate>