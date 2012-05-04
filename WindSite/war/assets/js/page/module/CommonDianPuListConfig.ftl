<div style="width: 720px;" align=center>
<table cellspacing="0" cellpadding="0" class="formtable">
	<tbody>
	<#if dianpuCats??&&dianpuCats?size!=0&&rootCats??&&rootCats?size!=0>
	<#list rootCats as r>
		<#if r_index%2==0><tr></#if>
		<th width=60px><input type="checkbox" name="dianpu-cat" value="${r.id}" />${r.title}</th>
		<#assign cats=dianpuCats[r.name]>
		<td width=300px><#if cats??><#list cats as c><input type="checkbox" name="dianpu-cat" value="${c.id}" />${c.title}&nbsp;&nbsp;</#list></#if></td>
		<#if r_index%2==1||!r_has_next></tr></#if>
	</#list>
	<tr><th>渐变色:</th><td>
	<input type="radio" name="dianpu-color" value="red" checked/>红色&nbsp;&nbsp;
	<input type="radio" name="dianpu-color" value="yellow" />黄色&nbsp;&nbsp;
	<input type="radio" name="dianpu-color" value="green" />绿色&nbsp;&nbsp;
	<input type="radio" name="dianpu-color" value="blue" />蓝色&nbsp;&nbsp;
	<input type="radio" name="dianpu-color" value="purple" />紫色&nbsp;&nbsp;
	</td><th></th><td></td></tr>
	</#if>
	</tbody>
</table>
</div>