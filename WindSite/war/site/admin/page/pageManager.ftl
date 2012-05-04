<script>
$(function(){
$('#page-add-dialog').click(function(){
openPageTemplateDialog();
});
});
</script>
<TABLE class="wTable">
<THEAD><TR><TH width=400px>模板标题</TH><TH>操作</TH></TR></THEAD>
<tbody>
<#if pages??&&pages?size!=0>
<#list pages as p>
<tr><td>${p.title}</td><td><a href="/router/member/page/sysdesigner/${p.id}" target="_blank">设计</a></td></tr>
</#list>
</#if>
</tbody>
</table>
<input id="page-add-dialog" type="button" value="新增页面">