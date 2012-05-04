<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>分享与收藏-淘客建站-我是淘客-新淘网</title>
</@ws.header>
<script>
$(function(){
$('#shareButton').click(function(){
	var code=$('#shareCode').val();
	if(code){
		var isTrue=false;
		var reg = /script/gi;
		var srcreg=/src=/gi;
		var jiathis=/v2.jiathis.com/gi;
		var baidu=/share.baidu.com/gi;
		var result = code.match(baidu);
		if(result != null){//baidu
			result = code.match(reg);
			if(result.length>9){
				alert('请确认您的百度分享与收藏是否正确');return false;
			}
			if(!code.match(/type=slide/gi)){
				alert('仅支持浮窗式百度分享与收藏');return false;
			}
			isTrue=true;
		}else{
			result = code.match(reg);
			if (result != null) {//JiaThis
				if(result.length>6){
					alert('请确认您的在线分享与收藏是否正确');return false;
				}
				result=code.match(srcreg);
				if(result!=null){
					if(result.length!=1){
						alert('请确认您的在线分享与收藏是否正确');return false;
					}
					result=code.match(jiathis);
					if(result!=null){
						//匹配
						isTrue=true;
					}else{
						//未匹配
						alert('请确认您的在线分享与收藏是否正确');return false;
					}
				}else{
					alert('请确认您的在线分享与收藏是否正确');return false;
				}
			}else{
				alert('请确认您的在线分享与收藏是否正确');return false;
			}
		}
		
		if(isTrue){
				var sender = new WindSender("/router/member/sitemanager/share/update");
				sender.load("POST", {
							share:code
						}, function(response) {
							if (response.isSuccess()) {
								alert('保存分享与收藏成功！')
								document.location.href = "/router/member/sitemanager/share";
							} else {
								alert(response.msg);
							}
						});
			}
	}else{
	var sender = new WindSender("/router/member/sitemanager/share/update");
	sender.load("POST", {
				share:code
			}, function(response) {
				if (response.isSuccess()) {
					alert('保存分享与收藏成功！')
					document.location.href = "/router/member/sitemanager/share";
				} else {
					alert(response.msg);
				}
			});
	}
});
});</script>
<@xt.taoketemplate navselected='taoke' bdselected='site-share'>
<@ws.info>
<span style="font-size:14px;color:red;">
目前仅支持<strong style="font-size:16px;">侧栏式<strong><a href="http://www.jiathis.com" target="_blank">www.jiathis.com</a>或<strong style="font-size:16px;">浮窗式<strong><a href="http://www.jiathis.com" target="_blank">share.baidu.com</a>分享与收藏。
</span>
</@ws.info>
<table width="720" align="center" border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#dddddd">
<tr><td align="right" width=200px>JiaThis或百度分享代码:</td><td><textarea id="shareCode" style="width:100%;_width:570px;height:150px;margin:0 auto;">${share.share}</textarea></td></tr>
<tr><td height="30" colspan="2" height="30" class="bigtext">&nbsp;&nbsp;&nbsp;&nbsp;<input id="shareButton" type="button" style="padding:2px;cursor:pointer;" value="保 存 设 置 "> &nbsp;&nbsp;&nbsp;</td></tr>
<tr><td height="30" colspan="2" align="left" class="bigtext"><span class="bigtext" style="padding-left:27px; color:#FF0000">提醒：请确保您使用的侧栏式JiaThis代码正确，留空则不启用分享与收藏。</span></td></tr>
</table>
<@ws.help>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=13354" target="_blank"><h3>1.如何设置JiaThis的侧栏式分享与收藏代码？</h3></a>
</@ws.help>
</@xt.taoketemplate>