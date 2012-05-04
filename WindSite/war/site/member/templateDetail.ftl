<style>
#usedHistory th{background: #F6F9FC;border-bottom: 2px solid #DDE4EA;font-weight: bold;text-align: left;}
#usedHistory td{border-bottom: 1px solid #EEF1F4;padding: 5px;}
#usedHistory a{color:#F60;}
.odd td{background: #D4F396;}
</style>
<script>
$(function(){
	$('#templates').change(function(){
		getHtmlTemplateDetail($('#templates').val());
	});
	$('.disable-update').button().click(function(){
		modifyUsedCustomeWidgetAutoUpdate($(this).attr('ucwid'),'false');
	});
	$('.enable-update').button().click(function(){
		modifyUsedCustomeWidgetAutoUpdate($(this).attr('ucwid'),'true');
	});
	$('#d-t').button();
	$('#modifyTemplateInfo').button().click(function(){
		var name = $('#modifyTemplateName').val();
		if (!name) {
			alert("模板标题不能为空！");
			return;
		}
		if (name.length > 50) {
			alert("模板标题长度不能超过50");
			return;
		}
		var desc = $('#modifyTemplateDesc').val();
		if (desc) {
			if (desc.length > 150) {
				alert("模板简介长度不能超过150");
				return;
			}
		}
		var metadata = $('#modifyTemplateKeyWords')
				.val();
		if (metadata) {
			if (metadata.length > 80) {
				alert("模板关键词长度不能超过80");
				return;
			}
		}
		modifyTemplate('${template.id}', name, desc, metadata,$('#modifyTemplateCid').val());
	});
	
});
function modifyUsedCustomeWidgetAutoUpdate(id, autoUpdate) {
	var sender = new WindSender("/router/member/usedWidget/autoUpdate/" + id);
	sender.load("POST", {
				"autoUpdate" : autoUpdate
			}, function(response) {
				if (response.isSuccess()) {
					if ("true" == autoUpdate) {
						alert("启用自动更新成功");
					} else {
						alert("取消自动更新成功");
					}
					getHtmlTemplateDetail('${template.id}');
				} else {
					alert(response.msg);
				}
			});
}
function modifyTemplate(id, name, desc, metadata,cid) {
	var sender = new WindSender("/router/member/template/modify/" + id);
	sender.load("POST", {
				"name" : name,
				"desc" : desc,
				"metadata" : metadata,
				"cid":cid
			}, function(response) {
				if (response.isSuccess()) {
					alert("修改页面基本信息成功");
					getHtmlTemplateDetail('${template.id}');
				} else {
					alert(response.msg);
				}
			});
}
</script>
<div class="conent" style="height:100%" align="left">
<div class="buttonBar" style="height:25px;" align="left">
<a href="/router/member/sitemanager/templates" >返回页面管理</a>
&nbsp;&nbsp;&nbsp;
<select id="templates" style="height:22px;z-Index:1000;">
	<#if (templates?size>0)>
		<#list templates as t>
			<#if t.id==template.id>
				<option selected value="${t.id}">${t.name}</option>
			<#else>
				<option value="${t.id}">${t.name}</option>
			</#if>
		</#list>
	</#if>
</select>
</div>
<@ws.info>当您修改当前页面的基本信息时，如果该页面已发布，那么该页面会自动重新发布并使用最新的信息</@ws.info>
<table width=100% class="wTable" cellspacing="4" cellpadding="4" style="margin-top:15px;">
	<tr>
		<td width=150px><label for="modifyTemplateName">标题：</label></td>
		<td><input id="modifyTemplateName" type="text" style="width:250px;" value="${template.name}"/></td>
	</tr>
	<tr>
		<td>推广类别:</td><td>
			<select id="modifyTemplateCid" style="width:135px;">
				<option value="0">所有分类</option>
				<#list cats as c>
					<#if c.cid==template.cid>
						<option value="${c.cid}" selected>${c.name}</option>
					<#else>
						<option value="${c.cid}">${c.name}</option>
					</#if>
				</#list>
			</select></td>
	</tr>
	<tr>
		<td><label for="modifyTemplateDesc">描述：</label></td>
		<td><textarea id="modifyTemplateDesc" rows="3" cols="40">${template.description}</textarea></td>
	</tr>
	<tr>
		<td><label for="modifyTemplateKeyWords">关键词：</label></td>
		<td><textarea id="modifyTemplateKeyWords" rows="3" cols="40">${template.metadata}</textarea></td>
	</tr>
	<tr>
		<td><button id="modifyTemplateInfo">修改基本信息</button></td>
		<td><a id="d-t" href="/router/member/designer?tid=${template.id}" target="_blank">设计该页面</a></td>
	</tr>
	<tr>
	<td colspan=2 style="margin-top:10px;">
	<@ws.info>
<span style="color:red;">
当前页面使用的自定义组件，如果启用自动更新，则当该组件更新时会自动更新您的页面。如果取消自动更新，该组件更新时将不会同时更新您的页面，需要您自己进入设计器更新发布。
</span>
</@ws.info>
	<TABLE id="usedHistory"  width="100%" border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=300px align="left">自定义组件名称</TH>
			<TH width=100px align="center">创建人</TH>
			<TH width=150px align="left">更新时间</TH>
			<TH width=150px align="left">操作</TH>
		</TR>
	</THEAD>
	<TBODY>
		<#if usedWidgets??&&usedWidgets?size!=0>
		<#list usedWidgets as w>
		<tr class="<#if w_index%2==0>odd<#else>even</#if>">
			<td width=300px>
			<a href="/router/member/widget/detail/${w.widget.id}" target="_blank">${w.widget.name}</a></td>
			<td><a href="/router/member/widget/designers/${w.widget.createdBy}" target="_blank">${w.widget.nick}</a></td>
			<td>${dateDiff(w.widget.updated!w.widget.created)}</td>
			<td>
				<#if w.autoUpdate><button class="disable-update" ucwid="${w.id}">取消自动更新</button><#else><button class="enable-update" ucwid="${w.id}">启用自动更新</button></#if>
			</td>
		</tr>
		</#list>
		<#else>
			<tr class="odd"><td colspan=4>当前页面没有使用自定义组件，您可以自己<a href="/router/member/widget/my" target="_blank">设计组件</a>或者<a href="/router/member/widget/favorite" target="_blank">收藏组件</a>来丰富您的页面。</td></tr>
		</#if>
	</TBODY>
	</TABLE>
	</td>
	</tr>
</table>
</div>