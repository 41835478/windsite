<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>淘宝联盟验证-我是淘客-新淘网</title>
</@ws.header>
<script>
$(function(){
	$('#rootButton').click(function(){
		var code=$('#rootCode').val();
		if(code){
			var reg = /^[A-Za-z0-9]{20,50}$/;
			if(!reg.test(code)){
				alert('请确认root.txt内的验证正确');
				return;
			}
		}
		var sender = new WindSender("/router/member/sitemanager/alimama/update");
		sender.load("POST", {
				alimama:code
			}, function(response) {
				if (response.isSuccess()) {
					alert('保存阿里妈妈root.txt代码成功！')
					document.location.href = "/router/member/sitemanager/alimama";
				} else {
					alert(response.msg);
				}
			});
	});
});</script>
<@xt.taoketemplate navselected='taoke' bdselected='site-alimama'>
<@ws.info>
<span style="font-size:14px;color:red;">
请下载最新的root.txt文件,并打开复制里边的验证码
</span>
</@ws.info>
<table width="720" align="center" border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#dddddd">
<tr><td align="right" width=150px>root.txt代码:</td><td><textarea id="rootCode" style="width:100%;_width:570px;height:30px;margin:0 auto;">${kefu.alimama}</textarea></td></tr>
<tr><td height="30" colspan="2" height="30" class="bigtext">&nbsp;&nbsp;&nbsp;&nbsp;<input id="rootButton" type="button" style="padding:2px;cursor:pointer;" value="保 存 设 置 "> &nbsp;&nbsp;&nbsp;</td></tr>
<tr><td height="30" colspan="2" align="left" class="bigtext"><span class="bigtext" style="padding-left:27px; color:#FF0000">提醒：请确保您的root.txt代码是最新的,正确的，否则无法验证通过。</span></td></tr>
</table>
<@ws.help>
	<p><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=51434" target="_blank">如何在淘宝联盟登记新淘网网站,创建广告位,获得网站ID,广告位ID?</a></P>
</@ws.help>
</@xt.taoketemplate>