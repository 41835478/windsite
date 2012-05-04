<table>
<thead><tr><th>页面标识</th><th>下次发布时间</th></tr></thead>
<tbody>
<#if delay??>
<#list delay?keys as k>
<tr><td>${k}</td><td>${delay[k]?datetime}</td></tr>
</#list>
</#if>
</tbody>
</table>