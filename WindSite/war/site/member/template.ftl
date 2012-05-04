<fieldset style="border: 0px; padding: 5px;"><legend><strong>基本信息</strong></legend>
<table cellspacing="4" cellpadding="4">
	<tr>
		<td width=100px><label for="modifyTemplateName">标题：</label></td>
		<td><input id="modifyTemplateName" type="text" style="width:250px;" value="${template.name}"/></td>
	</tr>
	<tr>
		<td>推广类别:</td><td>
			<select id="modifyTemplateCid" style="width:135px;">
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
</table>
</fieldset>