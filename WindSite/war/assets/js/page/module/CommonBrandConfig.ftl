<div style="width:650px;margin-left:50px;" align=center>
<table width=650px>
<tr><td align=center style="font-size:16px;font-weight:700;display:none;"><input type="radio" name="dataType" value="J_Search" checked>自动&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="dataType" value="J_Custom">手动</td></tr>
<tr><td  class="J_Filter J_Search"><table>
<tr><td width=120px>选择分类：</td><td width=500px><ul><#list cats as c><li style="float:left;margin-right:5px;margin-bottom:5px;"><input name="cid-radio" type="radio" value="${c.id}" title="${c.title}"/><label title="${c.title}">${c.title}</label></li></#list></ul></td></tr>
<tr><td>显示数量：</td><td><select id="brands-count">
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4" selected>4</option>
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
</table></td></tr>
<tr><td class="J_Filter J_Custom" style="display:none;">
<table>
<tr><td width=200px><select id="J_Custom_Cats"><option value="0">请选择分类</option><#list cats as c><option value="${c.id}">${c.title}</option></#list></select></td>
<td>&nbsp;&nbsp;</td>
</tr>
<tr>
<td width=200px valign=top>
<ul id="J_Custom_Selected">
<#if brands??&&brands?size!=0><#list brands as d><li bid="${d.sid}" style="float:left;margin-right:5px;margin-bottom:5px;"><a class="custome-del">删除</a>&nbsp;<img src="${d.picPath}" alt="${d.title}" width="95px" height="65px"></li></#list></#if>
</ul>
</td>
<td width=550px valign=top>
<ul id="J_Custom_Result">
</ul>
</td></tr>
</table>
</td></tr>
</table>
</div>