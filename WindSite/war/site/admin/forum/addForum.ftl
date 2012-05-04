<@ws.header>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚">
<meta name="description" content="新淘网 - 系统管理">
<title>新增阵地- 新淘网</title>
</@ws.header>
<style>

</style>
<script type="text/javascript">
	$(function() {
	});
</script>	
<div class="ui-widget-content ui-corner-all" style="width:950px;height:100%;" align="left">
<form action="/router/member/admin/forum/add" method="POST">
<table>
<tr><td>title</td><td><input name="title"/></td></tr>
<tr><td>sortorder</td><td><input name="sortOrder"/></td></tr>
<tr><td>url</td><td><input name="url"/></td></tr>
<tr><td>realUrl</td><td><input name="realUrl"/></td></tr>
<tr><td>type</td><td>
<select name="type">
<#list types as t>
<option value="${t.id}">${t.title}</option>
</#list>
</select>
</td></tr>
<tr><td colspan=2><input type="submit" value="提交"></td></tr>
</table>
</form>
</div>
<#include "/site/template/footer.ftl">
