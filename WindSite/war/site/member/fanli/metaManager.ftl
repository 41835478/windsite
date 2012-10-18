<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>站长认证-返利管理-我是淘客-新淘网</title>
<style>
.error {height:15px;background-color:#FFFE36;border:1px solid #E1E16D;font-size:11px;color:#000;padding:3px 10px;margin-left:-2px;-moz-border-radius:4px;-webkit-border-radius:4px;-moz-border-radius-bottomleft:0;-moz-border-radius-topleft:0;-webkit-border-bottom-left-radius:0;-webkit-border-top-left-radius:0;-moz-box-shadow:0 0 6px #ddd;-webkit-box-shadow:0 0 6px #ddd;}
fieldset{padding:5px;margin-bottom:10px;border:1px solid #EFEFEF;}fieldset legend{font-weight:700;font-size:14px;color:#014D7F}fieldset table td{height:25px;line-height:17px;} td.key{width:100px;text-align:right;}td.value{width:150px;padding-left:20px;}
td.fl-num{text-align:center;width:80px;}th strong{color:red} fieldset .wTable td.value{text-align:left;}a.a-num-un,a.a-num-wait,a.a-num-finish{font-weight:800;font-size:16px;text-decoration: underline;}a.a-num-un{color:red;}a.a-num-wait{color:#090;}a.a-num-finish{color:gray}
</style>
</@ws.header>
<script>
$(function(){
$('#addMetaDialog').dialog({
				bgiframe : true,
				autoOpen : false,
				width : 600,
				zIndex : 1000,
				modal : true,
				buttons:{
					'取消':function(){
						$('#addMetaDialog').dialog('close');
					},
					'确认':function(){
						var reg=/^<meta/gi;
						var meta=$('#addMetaCode').val();
						if(!meta){
							alert('您尚未填写元标记验证');return false;
						}
						if(meta.length>300){
							alert('请确认您的元标记代码正确，长度超过300，如果确认正确，可联系客服QQ：153647646');return flase;
						}
						if(!reg.test(meta)){
							alert('请确认您的元标记代码正确，如果确认正确，可联系客服QQ：153647646');return flase;
						}
						var sender = new WindSender("/router/member/fl/meta/add");
						sender.load("POST", {
								"meta" : meta
							}, function(response) {
								if (response.isSuccess()) {
									alert("元标记添加成功");
									document.location.href = document.location.href;
								} else {
									alert(response.msg);
								}
							});
					}
				}
			});
$('#addMetaButton').click(function(){
	if($('#metaBody tr').length>=10){
		alert('您最多添加10个元标记认证');return false;
	}
	$('#addMetaDialog').dialog('open');
});
$('a.updateMetaButton').click(function(){
	var reg=/^<meta/gi;
	var meta=$(this).parents('tr:first').find('.meta').val();
	if(!meta){
		alert('您尚未填写元标记验证');return false;
	}
	if(meta.length>300){
		alert('请确认您的元标记代码正确，长度超过300，如果确认正确，可联系客服QQ：153647646');return flase;
	}
	if(!reg.test(meta)){
		alert('请确认您的元标记代码正确，如果确认正确，可联系客服QQ：153647646');return flase;
	}
	var mid=$(this).attr('mid');
	confirm('您确认修改元标记？',function(r){
		if(r){
			var sender = new WindSender("/router/member/fl/meta/update/"+mid);
			sender.load("POST", {
					"meta" : meta
				}, function(response) {
					if (response.isSuccess()) {
						alert("元标记修改成功");
						document.location.href = document.location.href;
					} else {
						alert(response.msg);
					}
				});
		}
		return flase;
	});
});
$('a.deleteMetaButton').click(function(){
	var mid=$(this).attr('mid');
	confirm('您确认删除该标记？',function(r){
		if(r){
			var sender = new WindSender("/router/member/fl/meta/delete/"+mid);
			sender.load("POST", {
				}, function(response) {
					if (response.isSuccess()) {
						alert("元标记删除成功");
						document.location.href = document.location.href;
					} else {
						alert(response.msg);
					}
				});
		}
		return flase;
	});
});
});

</script>
<@xt.taoketemplate navselected='taoke' bdselected='fanli-meta' group=2>
<div id="addMetaDialog" title="增加元标记认证" style="width:600px;display:none;" align=center>
请输入第三方的元标记：<br/><br/>
<input style="padding:3px;width:400px" id="addMetaCode"><br/><br/>
<@ws.help>
<p>格式：如百度联盟元标记验证代码<br/>${'<meta name="baidu_union_verify" content="5e10a07b15be46ca720676f866b3c5f3">'?html}</p><br/><p>具体网站代码不同，请参考提供验证的网站帮助说明</p>
</@ws.help>
</div>
<table width="720" align="center" border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#dddddd">
<theader>
<tr><th height="30" class="bigtext" >元标记</th><th height="30" class="bigtext" >操作</th></tr>
</theader>
<tbody id="metaBody">
<#if metas??&&metas?size!=0>
<#list metas as m>
<tr><td height="30" class="bigtext" width=550px align=center><input type="text" class="meta" value="${m.metadata?html}" class="btn3" style="width:520px;padding:2px;"></td><td align=center><a class="updateMetaButton" mid="${m.id}">修改</a>&nbsp;&nbsp;<a class="deleteMetaButton" mid="${m.id}">删除</a></td></tr>
</#list>
</#if>
</tbody>
<tfooter>
<tr><td height="30" height="30" class="bigtext">&nbsp;&nbsp;&nbsp;&nbsp;<input id="addMetaButton" type="button" style="padding:2px;cursor:pointer;" value="新增元标记认证 "> &nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;</td></tr>
</tfooter>
</table>
<@ws.help>
<h3>什么是站长认证？</h3>
<p>站长认证是指：在使用一些广告联盟，站长工具的时候，需要对您的站点所有权进行认证，来确保您是这个站点的拥有者，新淘网目前开放了元标记认证(html标签认证)，当您使用这些广告联盟，站长工具时，如果提示需要您认证您的站点，那么可以使用该功能，添加元标记确认您的站长身份</p>
<h3><a href="http://forum.xintaonet.com/viewthread.php?tid=696&extra=page%3D1" target="_blank">如何通过百度联盟的站长验证?</a></h3>
</@ws.help>
</@xt.taoketemplate>
