<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>站点地图-返利管理-我是淘客-新淘网</title>
</@ws.header>
<@xt.taoketemplate navselected='taoke' bdselected='fanli-sitemap' group=2>
<table class="tb tb2">
<tbody>
<#if cats??&&cats?size!=0>
<#list cats as c>
<tr class="hover">
	<td class="td25"><input type="text" class="txt" name="sortOrder" value="${c.sortOrder}"></td>
	<td><div class="board"><input type="text" name="title" value="${c.title}" class="txt"><#if 'C'==c.type><a onclick="" class="addchildboard">添加链接</a></#if></div></td>
	<td>${c.description}</td>
	<td><a title="删除本分类及分类下的所有链接" class="act">删除</a></td>
</tr>
</#list>	
</#if>	
</tbody>
</table>
<@ws.help>
<h3>注意事项？</h3>
<p>每个页面位置最多可添加3个广告，系统将随机展示其中的有效广告</p>
</@ws.help>
</@xt.taoketemplate>
