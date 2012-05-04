<div style="width: 720px;" align=center>
<table cellspacing="0" cellpadding="0" class="formtable">
	<tbody>
	<#if cats??&&cats?size!=0>
	<#list cats as c><#if c_index%5==0><tr></#if><td width="100"><input type="checkbox" name="mall-cat" value="${c.id}" />${c.title}</td><#if c_index%5==4||!c_has_next></tr></#if></#list>
	<tr>
	<td><input type="radio" name="dianpu-color" value="red" checked/>红色</td>
	<td><input type="radio" name="dianpu-color" value="yellow" />黄色</td>
	<td><input type="radio" name="dianpu-color" value="green" />绿色</td>
	<td><input type="radio" name="dianpu-color" value="blue" />蓝色</td>
	<td><input type="radio" name="dianpu-color" value="purple" />紫色</td>
	</tr>
	</#if>
	</tbody>
</table>
</div>