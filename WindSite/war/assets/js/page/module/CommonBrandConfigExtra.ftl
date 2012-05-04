<#if brands??&&brands?size!=0>
<#list brands as d><li class="brand" style="float:left;margin-right:5px;margin-bottom:5px;"><img src="${d.picPath}" alt="${d.title}" width="57px" height="39px"><br/><input type="button" bid="${d.sid}" bpic="${d.picPath}" btitle="${d.title}" value="添加"></li></#list>
</#if>