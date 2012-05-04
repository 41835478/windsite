<table>
<thead><tr><th>键</th><th>值</th></tr></thead>
<tbody>
<#if caches??&&caches?size!=0>
<#list caches as c>
<tr><td>${c.key}</td><td>${c.value}</td></tr>
</#list>
</#if>
</tbody>
</table>