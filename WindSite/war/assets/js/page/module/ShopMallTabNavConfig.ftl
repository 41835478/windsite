<div style="width: 650px; margin-left: 50px;" align=center>
<table cellspacing="0" cellpadding="0" class="formtable">
	<tbody>
		<#if cats??&&cats?size!=0>
		<#list cats as c><#if c_index%5==0><tr></#if><td width="100"><input type="checkbox" name="tabnav-cat" value="${c.id}" />${c.title}</td><#if c_index%5==4||!c_has_next></tr></#if></#list>
		</#if>
		<tr>
			<td width="100" align=center>
			<div style="background-color: #d85e80; height: 20px; width: 50px;"></div>
			<input type="radio" name="tabnav-color" value="taozhuang" checked /></td>
			<td width="100" align=center>
			<div style="background-color: #560c16; height: 20px; width: 50px;"></div>
			<input type="radio" name="tabnav-color" value="nvxie" /></td>
			<td width="100" align=center>
			<div style="background-color: #735437; height: 20px; width: 50px;"></div>
			<input type="radio" name="tabnav-color" value="xiangbao" /></td>
			<td width="100" align=center>
			<div style="background-color: #144999; height: 20px; width: 50px;"></div>
			<input type="radio" name="tabnav-color" value="jiadian" /></td>
			<td width="100" align=center>
			<div style="background-color: #733e08; height: 20px; width: 50px;"></div>
			<input type="radio" name="tabnav-color" value="buyi" /></td>
		</tr>
		<tr>
			<td width="100" align=center>
			<div style="background-color: #fa4e86; height: 20px; width: 50px;"></div>
			<input type="radio" name="tabnav-color" value="muying" /></td>
			<td width="100" align=center>
			<div style="background-color: #ffc84d; height: 20px; width: 50px;"></div>
			<input type="radio" name="tabnav-color" value="toy" /></td>
			<td width="100" align=center>
			<div style="background-color: #74b72c; height: 20px; width: 50px;"></div>
			<input type="radio" name="tabnav-color" value="sport" /></td>
			<td width="100" align=center>
			<div style="background-color: #655a40; height: 20px; width: 50px;"></div>
			<input type="radio" name="tabnav-color" value="watch" /></td>
			<td width="100" align=center>
			<div style="background-color: #598700; height: 20px; width: 50px;"></div>
			<input type="radio" name="tabnav-color" value="food" /></td>
		</tr>
		<tr>
			<td width="100" align=center>
			<div style="background-color: #00b7ba; height: 20px; width: 50px;"></div>
			<input type="radio" name="tabnav-color" value="health" /></td>
			<td width="100" align=center>
			<div style="background-color: #3a4366; height: 20px; width: 50px;"></div>
			<input type="radio" name="tabnav-color" value="car" /></td>
			<td width="100" align=center>&nbsp;</td>
			<td width="100" align=center>&nbsp;</td>
			<td width="100" align=center>&nbsp;</td>
		</tr>
	</tbody>
</table>
</div>