	<#if links??&&links?size!=0>
	<#function linkType type>
	<#switch type>
	<#case 1>
	<#return "商品推广链接">
	<#case 2>
	<#return "店铺推广链接">
	<#case 3>
	<#return "推广组推广链接">
	<#case 4>
	<#return "店铺收藏推广链接">
	</#switch>
	</#function>
		<tr><td  style="text-align:center;line-height:14px;" colspan=2><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount?number></@ws.pager></td>
		<td style="text-align:center;line-height:14px;">共<span style="color:red;">${page.totalCount}</span>条记录</td>
		</tr>
		<#list links as l>
			<tr  class="<#if l_index%2==0>odd<#else>even</#if>">
			<#assign type=linkType(l.type)>
			<td>${l.name}</td><td><a href="#" class="filterType" title="${type}" type="${l.type}">${type}</a></td><td><a href="#" lid="${l.id}"  class="getLink">获取推广代码</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" lid="${l.id}" class="deleteLink">删除</a></td>
			</tr>
		</#list>
		<#else>
		<tr><td colspan=3>您尚未新增自己的推广链接，请点击新增推广链接按钮，按照步骤新增自己的推广链接</td></tr>
	</#if>