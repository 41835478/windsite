<fieldset style="border: 0px; padding: 5px;"><legend><strong>基本信息</strong></legend>
<table cellspacing="4" cellpadding="4">
	<tr>
		<td><label for="addTemplateName">标题：</label></td>
		<td><input id="addTemplateName" title="页面名称标题，长度不能超过20"
			type="text" style="width: 250px;" /></td>
	</tr>
	<tr>
		<td>推广类别:</td><td>
			<select id="addTemplateCid" style="width:135px;" title="页面推广类别，影响淘客商品广告投放">
				<option value="0">所有分类</option>
				<#list cats as c>
						<option value="${c.cid}">${c.name}</option>
				</#list>
			</select></td>
	</tr>
	<tr>
		<td><label for="addTemplateDesc">描述：</label></td>
		<td><textarea id="addTemplateDesc" title="页面描述信息，长度不能超过100"
			rows="3" cols="40"></textarea></td>
	</tr>
	<tr>
		<td><label for="addTemplateKeyWords">关键词：</label></td>
		<td><textarea id="addTemplateKeyWords" title="页面关键词，长度不能超过80"
			rows="3" cols="40"></textarea></td>
	</tr>
	<tr>
		<td>
		<button id="add-template-confirm">确定</button>
		</td>
	</tr>
</table>
</fieldset>