<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>基本信息-淘客建站-我是淘客-新淘网</title>
</@ws.header>
<script>
$(function(){
$('#designerSite').button();
	$('#changeSiteUpdate').button().click(function() {
				gtChangeSiteUpdate();
			});
	$('#updateSite').button().click(function() {
		var title = $("#siteTitle").val();
		if (!title) {
			alert("淘站名称不能为空！");
			return;
		}
		if (title.length > 50) {
			alert("淘站名称长度不能超过50");
			return;
		}
		var desc = $('#siteDescription').val();
		if (desc) {
			if (desc.length > 150) {
				alert("淘站简介长度不能超过150");
				return;
			}
		}
		var metadata = $('#siteMetadata').val();
		if (metadata) {
			if (metadata.length > 80) {
				alert("淘站关键词长度不能超过80");
				return;
			}
		}
		updateSite($('#site_Id').val(), title, desc, metadata, $('#siteCid')
						.val());
		return false;
	});
	$('#cancelSite').button().click(function() {
				gtCancelSite();
			});
	$('#copySiteUrl').button().click(function() {
				copyToClipBoard($('#site_Url'));
			});
	$('#site_Url').click(function() {
				$(this).select();
			});
});
</script>
<@xt.taoketemplate navselected='taoke' bdselected='site-proflie'>
<#if sites?size==1>
<#list sites as s>
<input type="hidden" id="site_Id" value="${s.id}"/>
<table id="siteProfile" cellspacing="5" cellpadding="5">
		<tr><td colspan=2><@ws.info>当您修改站点信息时，如果您的站点已发布，那么该站点下所有页面会自动重新发布</@ws.info></td></tr>
		<tr><td>淘站名称:</td><td>
			<#if s.status==1>
					<a class="site-link" href="http://<#if s.www??&&s.www!=''>${s.www}<#else>${s.domainName}.xintaonet.com</#if>" target="_blank" style="color:#00E;font-weight:bold;" >${s.title}</a>
				<#else>
					<span style="color:#00E;font-weight:bold;">${s.title}</span>
			</#if>
		</td><tr>
		<tr><td width=60px>淘站地址:</td><td>
			<input id="site_Url" type="text" style="width:200px;" value="http://<#if s.www??&&s.www!=''>${s.www}<#else>${s.domainName}.xintaonet.com</#if>">&nbsp;&nbsp;&nbsp;<input type="button" id="copySiteUrl" value="复制">
		</td><tr>
		<tr style="display:none;"><td>简介:</td><td>${s.description}</td><tr>
		<tr><td>店铺类别:</td><td><#if cat??>${cat.name}<#else>尚未设置类目</#if></td><tr>
		<tr style="display:none;"><td>关键词:</td><td>${s.metadata}</td><tr>
		<tr><td>状态:</td><td><#if s.status==1>已发布<#else>未发布</#if></td><tr>
		<tr><td>创建时间:</td><td>${s.created?datetime}</td><tr>
		<tr><td colspan="2"><button id="changeSiteUpdate">点击修改基本信息</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<#if s.domainName?starts_with('shop')>&nbsp;&nbsp;&nbsp;<a style="color:#F60;" onClick="createDomainName('${s.id}');return false;">设置自定义二级域名</a></#if></td><tr>
		<tr><td colspan="2">
		<@ws.help>
		<h3>1.为什么不能访问我的站点？</h3>
		<p>请确认您的站点状态为已发布，如果尚未发布请点击设计站点，进入设计器，调整您的站点设计后，点击发布按钮。</P>
		<a href="http://www.xintaonet.com/router/site/view/support?type=help-myxintao&faq=01" target="_blank"><h3>2.我在新淘网的推广站点地址是？</h3></a>
		<a href="http://www.xintaonet.com/router/site/view/support?type=help-myxintao&faq=02" target="_blank"><h3>3.如何修改我的站点名称？</h3></a>
		<h3>4.为什么我修改了站点名称，访问时没有显示修改后的？</h3>
		<p>请确认您修改站点名称后重新发布了该站点，如果发布后。访问时还是老的站点名称，请尝试刷新浏览器页面重新访问该站点页面</P>
		</@ws.help></td></tr>
</table>
<table  id="updateSiteTable" style="display:none;" cellspacing="5" cellpadding="5">
		<tr>
			<td>淘站名称:</td><td><input id="siteTitle" type="text" size="50" class="text" value="${s.title}"/></td>
		</tr>
		<tr>
			<td>店铺类别:</td><td>
			<select id="siteCid" style="width:135px;">
				<#list cats as c>
					<#if c.cid==s.cid>
						<option value="${c.cid}" selected>${c.name}</option>
					<#else>
						<option value="${c.cid}">${c.name}</option>
					</#if>
				</#list>
			</select></td>
		</tr>
		<tr style="display:none;">
			<td>描述:</td><td><textarea id="siteDescription" rows="3" cols="50">${s.description}</textarea></td>
		</tr>
		<tr style="display:none;">
			<td>关键词:</td><td><textarea id="siteMetadata" rows="3" cols="50">${s.metadata}</textarea><br/><span>关键词可以让搜索引擎更好的了解您的站点.<br/>例如:女装,男装,韩装...</span></td>
		</tr>
		<tr><td><button id="updateSite">保存修改</button></td><td><button id="cancelSite">取消</button></td></tr>
</table>
</#list></#if>
</@xt.taoketemplate>