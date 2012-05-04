<div class="pages-setting" style="width:650px;margin:0px auto;">
<table>
<tr><td width=150px valign=top>画报频道：</td><td width=490px valign=top>
<ul><#list channels as c><li><input name="posterchannels-radio" type="radio" value="${c.id}" title="${c.cn_name}"/><label title="${c.cn_name}">${c.cn_name}</label></li></#list></ul><div class="ks-clear"></div>
</td></tr>
<tr><td>排序方式：</td><td>
<#if 'shopComplexA'==module||'shopComplexB'==module>
<select id="posterchannels-type">
	<option selected value="hits">热门</option>
	<option value="created">最新</option>
</select>
<#else>
<select id="posterchannels-type">
	<option selected value="HOT">热门</option>
	<option value="RECOMMEND">推荐</option>
</select>
</#if>
</td></tr>
<#if 'shopComplexA'!=module&&'shopComplexB'!=module&&'shopJingxi'!=module>
<tr><td>显示数量：</td><td>
	<select id="posterchannels-itemnum">
		<option value="10" selected>10</option>
		<option value="11">11</option>
		<option value="12">12</option>
		<option value="13">13</option>
		<option value="14">14</option>
		<option value="15">15</option>
		<option value="16">16</option>
		<option value="17">17</option>
		<option value="18">18</option>
		<option value="19">19</option>
		<option value="20">20</option>
	</select>
</td></tr>
</#if>
</div>
