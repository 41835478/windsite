<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>在线客服-淘客建站-我是淘客-新淘网</title>
</@ws.header>
<script>
$(function(){
$('#kefuButton').click(function(){
	var code=$('#kefuCode').val();
	if(code){
		var isTrue=false;
		var reg = /script/gi;
		var srcreg=/src=/gi;
		var bzooz=/bzooz.com/gi;
		var mpn=/mpnco.com.cn/gi;
		var talk=/lead.soperson.com/gi;
		var result = code.match(reg);
		if (result != null) {
			if(result.length!=3){
				alert('请确认您的在线客服代码是否正确');return false;
			}
			result=code.match(srcreg);
			if(result!=null){
				if(result.length!=1){
					alert('请确认您的在线客服代码是否正确');return false;
				}
				result=code.match(bzooz);
				if(result!=null){
					//匹配
					isTrue=true;
				}else{
					result=code.match(mpn);
					if(result!=null){
						//匹配
						isTrue=true;
					}else{
						result=code.match(talk);
						if(result!=null){
							isTrue=true;
						}else{
							//未匹配
							alert('请确认您的在线客服代码是否正确');return false;
						}
					}
				}
			}else{
				alert('请确认您的在线客服代码是否正确');return false;
			}
			if(isTrue){
				var sender = new WindSender("/router/member/sitemanager/kefu/update");
				sender.load("POST", {
							kefu:code
						}, function(response) {
							if (response.isSuccess()) {
								alert('保存客服代码成功！')
								document.location.href = "/router/member/sitemanager/kefu";
							} else {
								alert(response.msg);
							}
						});
			}
		}else{
			alert('请确认您的在线客服代码是否正确');return false;
		}
	}else{
	var sender = new WindSender("/router/member/sitemanager/kefu/update");
	sender.load("POST", {
				kefu:code
			}, function(response) {
				if (response.isSuccess()) {
					alert('保存客服代码成功！')
					document.location.href = "/router/member/sitemanager/kefu";
				} else {
					alert(response.msg);
				}
			});
	}
});
});</script>
<@xt.taoketemplate navselected='taoke' bdselected='site-kefu'>
<@ws.info>
<span style="font-size:14px;color:red;">
目前支持<a href="http://www.bzooz.com" target="_blank">www.bzooz.com在线客服系统</a>，如果您有其他在线客服系统需要我们支持，请联系客服QQ:153647646.
</span>
</@ws.info>
<table width="720" align="center" border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#dddddd">
<tr><td align="right" width=150px>在线客服代码:</td><td><textarea id="kefuCode" style="width:100%;_width:570px;height:90px;margin:0 auto;">${kefu.kefu}</textarea></td></tr>
<tr><td height="30" colspan="2" height="30" class="bigtext">&nbsp;&nbsp;&nbsp;&nbsp;<input id="kefuButton" type="button" style="padding:2px;cursor:pointer;" value="保 存 设 置 "> &nbsp;&nbsp;&nbsp;</td></tr>
<tr><td height="30" colspan="2" align="left" class="bigtext"><span class="bigtext" style="padding-left:27px; color:#FF0000">提醒：请确保您的在线客服代码正确，留空则不启用在线客服。</span></td></tr>
</table>
<@ws.help>
	<a href="http://forum.xintaonet.com/viewthread.php?tid=694&extra=" target="_blank"><h3>1.如何获取www.bzooz.com的客服代码？</h3></a>
</@ws.help>
</@xt.taoketemplate>