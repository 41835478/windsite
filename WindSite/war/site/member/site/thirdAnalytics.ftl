<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>第三方统计-淘客建站-我是淘客-新淘网</title>
</@ws.header>
<script>
$(function(){
$('#analytics_cancel').button().click(function(){
	confirm('您确认要取消当前第三方统计？',function(r){
		if(r){
			var sender = new WindSender("/router/member/designer/analytics");
			sender.load('POST', {
						sid :  $('#site_Id').val()
					}, function(response) {
						if (response.isSuccess()) {
							alert('站点统计信息更新成功');
							document.location.href="/router/member/sitemanager/analytics"
						} else {
							alert(response.msg);
						}
					});
		}
	});
});
$('#analytics_update').button().click(function() {
				var type = $('#analytics input[type=radio]:checked');
				if (type.length == 0) {
					alert('您尚未选择默认的站点统计');
					return;
				}
				var anay = $('#' + type.val());
				if (anay.val() == '') {
					alert('当前默认的站点统计标识不能为空');
					return;
				}
				var lid = $('#analytics_linezing').val();
				var laid = $('#analytics_51la').val();
				var sid = $('#site_Id').val();
				var gid = $('#analytics_google').val();
				if(gid&&gid.length>0){
					if(gid.indexOf('UA')==-1){
						alert('Google Analytics标识格式错误');
						return;
					}
				}
				if(lid&&lid.length>0){
					if(!isNumber(lid)){
						alert('量子恒道统计标识格式错误，必须全部为数字');
						return;
					}
				}
				if(laid&&laid.length>0){
					if(!isNumber(laid)){
						alert('我要啦统计标识格式错误，必须全部为数字');
						return;
					}
				}
				
				var sender = new WindSender("/router/member/designer/analytics");
				sender.load('POST', {
							sid : sid,
							type : type.val(),
							gid : gid,
							lid : lid,
							laid : laid
						}, function(response) {
							if (response.isSuccess()) {
								alert('站点统计信息更新成功');
								document.location.href="/router/member/sitemanager/analytics"
							} else {
								alert(response.msg);
							}
						});

			});
});

</script>
<@xt.taoketemplate navselected='taoke' bdselected='site-analytics'>
<#if sites?size==1>
<#list sites as s>
<input type="hidden" id="site_Id" value="${s.id}"/>
<div id="analytics" align="center" style="width: 80%;">
		<@ws.info>建议您尽量不要随便修改站点统计，这样会影响统计准确度，当您修改站点统计时，如果您的站点已发布，那么该站点下所有页面会自动重新发布并启用当前的站点统计配置</@ws.info>
		<table cellpadding="10" style="border: 1px solid #DDD;">
			<tr style="border: 1px solid #DDD;">
				<th width=50px height=30px>默认</th>
				<th width=150px height=30px align=left>类型</th>
				<th width=200px height=30px align=left>标识</th>
			</tr>
			<tr>
				<td align="center"><input type="radio" value="analytics_google" name="analytics_radios" <#if s.analyticsType=='analytics_google'>checked</#if>/></td>
				<td align="left"><a href="http://www.google.com/analytics/"
					target="_blank">Google Analytics</a></td>
				<td align="center"><input type="text" style="" id="analytics_google" value="${s.gid}"/>&nbsp;&nbsp;&nbsp;<a
					href="http://forum.xintaonet.com/faq.php?action=faq&id=36&messageid=44" target="_blank">查看帮助</a></td>
			</tr>
			<tr>
				<td align="center"><input type="radio" value="analytics_linezing" name="analytics_radios" <#if s.analyticsType=='analytics_linezing'>checked</#if>/></td>
				<td align="left"><a href="http://tongji.linezing.com"
					target="_blank">量子恒道</a></td>
				<td align="center"><input type="text" style="" id="analytics_linezing" value="${s.lid}"/>&nbsp;&nbsp;&nbsp;<a
					href="http://forum.xintaonet.com/faq.php?action=faq&id=36&messageid=45" target="_blank">查看帮助</a></td>
			</tr>
			<tr>
				<td align="center"><input type="radio" value="analytics_51la" name="analytics_radios" <#if s.analyticsType=='analytics_51la'>checked</#if>/></td>
				<td align="left"><a href="http://www.51.la" target="_blank">我要啦</a></td>
				<td align="center"><input type="text"  style="" id="analytics_51la" value="${s.laid}"/>&nbsp;&nbsp;&nbsp;<a
					href="http://forum.xintaonet.com/faq.php?action=faq&id=36&messageid=43" target="_blank">查看帮助</a></td>
			</tr>
			<tr>
				<td colspan="3" align="center">
				<button id="analytics_update">确认</button>&nbsp;&nbsp;&nbsp;&nbsp;<button id="analytics_cancel">取消第三方统计</button>
				</td>
			</tr>
			<tr><td colspan=3>
			<@ws.help>
				<a href="http://www.xintaonet.com/router/site/view/support?type=help-myxintao&faq=04" target="_blank"><h3>1.如何统计我在新淘网的站点的流量？</h3></a>
			</@ws.help>
			</td></tr>
		</table>
	</div>
</#list></#if>
</@xt.taoketemplate>