<div style="width: 750px;" align=center>
<table cellspacing="0" cellpadding="0" class="formtable">
<tr><td align=center><input type="radio" name="dataType" value="J_Search" checked>自动&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="dataType" value="J_Custom">手动</td></tr>
</table>
<table cellspacing="0" cellpadding="0" class="formtable J_Filter J_Search">
<#if cats??&&cats?size!=0>
<#list cats as c><#if c_index%5==0><tr></#if><td width="100"><input type="radio" name="tabnav-cat" value="${c.id}" />${c.title}</td><#if c_index%5==4||!c_has_next></tr></#if></#list>
</#if>
<tr><td colspan=5><label class="label-key">显示数量:</label>
	<select id="b2cmall-count">
		<option value="3">3</option>
		<option selected value="4">4</option>
		<option value="5">5</option>
		<option value="6">6</option>
		<option value="7">7</option>
		<option value="8">8</option>
		<option value="9">9</option>
		<option value="10">10</option>
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
	</select></td></tr>
</table>
<div class="catlist J_Filter J_Custom" style="display:none;">
	<div class="pre" style="position: relative;height:254px;text-align:left;">
		<div class="movelist" style="position:relative;left:0;top:0;height:254px;">
			<ul class="b2cMallCats" style="position:relative;left:0;top:0;width:160px;height:250px;">
				<#list cats as c>
				<li cid="${c.id}"><b class="arrow-right"></b><span>${c.title}</span></li>
				</#list>
			</ul>
			<ul id="J_B2cMalls" style="width:300px;height:250px;"></ul>
		</div>
	</div>
	<div class="selected" style="height:254px;width:256px;">
		<ul id="ul_selected" style="height:231px;width:250px;">
		</ul>
		<div class="operater"><span class="btn_del">删除</span><span class="btn_up">上移</span><span class="btn_down">下移</span></div>
	</div>
</div>
</div>