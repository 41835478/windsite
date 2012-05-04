<#if page??>
<form style="width:650px;margin:0px auto;">
<div class="rowElem ks-clear "><label class="label-key">标题:</label><input id="page-update-title" type="text" size=30 value="${page.title}"/></div>
<div class="rowElem ks-clear form-select">
	<label class="label-key">所属分类:</label>
	<select id="page-update-cid">
		<option selected value="0">请选择分类</option>
    	<#list cats as c><option value="${c.cid}" <#if page.cid==c.cid>selected</#if>>${c.name}</option></#list>
	</select>
</div>
<div class="rowElem ks-clear "><label class="label-key">关键词:</label><textarea id="page-update-keywords" style="height:50px;width:300px;">${page.keywords}</textarea></div>
<div class="rowElem ks-clear "><label class="label-key">描述:</label><textarea id="page-update-description" style="height:50px;width:300px;">${page.description}</textarea></div>
  </form>
 <div class="fm-item ks-clear" style="padding-left:270px;"><span class="btn btn-ok"><input type="button" value="确认修改"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
<div class="ks-clear"></div>
</#if>