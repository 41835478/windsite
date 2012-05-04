<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>酷站展示-淘客建站-我是淘客-新淘网</title>
</@ws.header>
<script>
$(function(){
$('#pic_90X80_img,#pic_160X120_img,#pic_640X480_img').each(function() {
				$(this).attr('src',
						$(this).attr('src') + '?version=' + Math.random());
			});
	$('#coolsiteconfirm').button().click(function() {
		var pic_90X80 = $('#pic_90X80').val();
		var pic_160X120 = $('#pic_160X120').val();
		var pic_640X480 = $('#pic_640X480').val();
		if ($('#pic_90X80_img').attr('src').indexOf('nopicture') != -1) {
			if (!pic_90X80) {
				alert('尚未选择90X80淘站缩略图');
				return;
			}
		}
		if (pic_90X80 && pic_90X80.indexOf('.png') == -1) {
			alert('目前90X80缩略图只支持png格式的图片');
			return;
		}
		if ($('#pic_160X120_img').attr('src').indexOf('nopicture') != -1) {
			if (!pic_160X120) {
				alert('尚未选择160X120淘站缩略图');
				return;
			}
		}
		if (pic_160X120 && pic_160X120.indexOf('.png') == -1) {
			alert('目前160X120缩略图只支持png格式的图片');
			return;
		}
		if ($('#pic_640X480_img').attr('src').indexOf('nopicture') != -1) {
			if (!pic_640X480) {
				alert('尚未选择640X480淘站缩略图');
				return;
			}
		}
		if (pic_640X480 && pic_640X480.indexOf('.png') == -1) {
			alert('目前640X480缩略图只支持png格式的图片');
			return;
		}
		if (!pic_90X80 && !pic_160X120 && !pic_640X480) {
			alert("请选择要修改的缩略图");
			return;
		}
		$('#coolSitePic').attr(
				'action',
				'/router/member/coolsite/pic/' + $('#coolSitePic').attr('cid')
						+ '?version=' + Math.random());
		$('#coolSitePic').submit();
	});
	$('#coolsitecancel').button().click(function() {
				$('#coolSitePic')[0].reset();
				return;
			});
});
</script>
<@xt.taoketemplate navselected='taoke' bdselected='site-coolsite'>
<#if sites?size==1>
<#list sites as s>
<input type="hidden" id="site_Id" value="${s.id}"/>
<div id="coolSiteTab" style="margin:10px;">
		<@ws.help>
		<a href="http://www.xintaonet.com/router/site/view/support?type=help-myxintao&faq=03" target="_blank"><h3>1.如何提交酷站展示？</h3></a>
		</@ws.help>
		<#assign pic='/assets/images/nopicture.gif'>
		<table><tr><td><button id="coolsiteconfirm">提交</button></td></tr></table>
		<form id="coolSitePic" name="coolSitePic" method="post" cid="${s.id}" action="/router/member/coolsite/pic/${s.id}" enctype="multipart/form-data">
		<table>
		<#if coolSite??&&coolSite.user_id??>
				<#if !coolSite.isValid>
					<#if coolSite.remark??>
						<tr><td colspan="2" style="color:red">您的酷站展示审核未通过：【<span>${coolSite.remark}</span>】,请修改后提交</td></tr>
						<#else>
						<tr><td colspan="2" style="color:red">您的酷站展示进入审核阶段.审核通过后将进入酷站展示</td></tr>
					</#if>
				<#else>
					<tr><td colspan="2" style="color:red">您的淘站已经在酷站展示中.如果修改缩略图,将会进入审核阶段.在审核阶段.您的淘站将不会出现在酷站展示中。</td></tr>
				</#if>
				<#assign pic = '/zone/'+(coolSite.user_id?substring((coolSite.user_id?length)-2,(coolSite.user_id?length)))+'/'+coolSite.user_id+'/'+coolSite.user_id>
				<tr><td><img id="pic_90X80_img" src="${pic}_90X80.png"  width="90px" height="80px"/><br/><input type="file" class="multi" name="${USER.user_id}_90X80" id="pic_90X80">
				<p class="desc"> 上传90 X 80像素长宽的图片，大小不能超过50K，只支持PNG一种格式 </p></td><td>
				</td></tr>
				<tr><td><img id="pic_160X120_img" src="${pic}_160X120.png"  width="160px" height="120px"/><br/><input type="file" class="multi" name="${USER.user_id}_160X120" id="pic_160X120">
				<p class="desc"> 上传160 X 120像素长宽的图片，大小不能超过100K，只支持PNG一种格式 </p></td><td>
				</td></tr>
				<tr><td><img id="pic_640X480_img" src="${pic}_640X480.png" width="640px" height="480px"/><br/><input type="file" class="multi" name="${USER.user_id}_640X480" id="pic_640X480">
				<p class="desc"> 上传640 X 480像素长宽的图片，大小不能超过500K，只支持PNG一种格式 </p></td><td>
				</td></tr>
				<#else>
				<tr><td colspan="2">您尚未上传缩略图</td></tr>
				<tr><td><img id="pic_90X80_img" src="${pic}"  width="90px" height="80px"/><br/><input type="file" class="multi" name="${USER.user_id}_90X80" id="pic_90X80">
				<p class="desc"> 上传90 X 80像素长宽的图片，大小不能超过50K，只支持PNG一种格式 </p></td><td>
				</td></tr>
				<tr><td><img id="pic_160X120_img" src="${pic}"  width="160px" height="120px"/><br/><input type="file" class="multi" name="${USER.user_id}_160X120" id="pic_160X120">
				<p class="desc"> 上传160 X 120像素长宽的图片，大小不能超过100K，只支持PNG一种格式 </p></td><td>
				</td></tr>
				<tr><td><img id="pic_640X480_img" src="${pic}" width="640px" height="480px"/><br/><input type="file" class="multi" name="${USER.user_id}_640X480" id="pic_640X480">
				<p class="desc"> 上传640 X 480像素长宽的图片，大小不能超过500K，只支持PNG一种格式 </p></td><td>
				</td></tr>
		</#if>
		</table>
		</form>
	</div>
</#list></#if>
</@xt.taoketemplate>