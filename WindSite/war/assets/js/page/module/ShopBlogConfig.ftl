<table style="width: 650px;" class="ks-clear">
	<tbody>
		<tr>
			<th width="200px">展现形式：</th>
			<td width="400px"><input type="radio" name="shop-blog-showtype" value="0" checked>标题&nbsp;&nbsp;<input type="radio" name="shop-blog-showtype" value="1">标题+简介&nbsp;&nbsp;<input type="radio" name="shop-blog-showtype" value="2">标题+简介+图片</td>
		</tr>
		<tr>
			<th width="200px">文章分类：</th>
			<td width="400px">
				<select id="shop-blog-cids">
					<option value="0">请选择文章分类</option>
					<#if classes??&&classes?size!=0>
					<#list classes as c><option value="${c.classid}">${c.classname}</option></#list>
					</#if>
				</select>
			</td>
		</tr>
		<tr>
			<th width="200px">显示文章数：</th>
			<td width="400px">
				<input id="shop-blog-count" value="5"/>条&nbsp;&nbsp;<input type="checkbox" id="shop-blog-isdate" checked/>显示发布日期
			</td>
		</tr>
		<tr>
			<th width="200px">文章标题字数：</th>
			<td width="400px">
				<input id="shop-blog-tlength" value=""/>字，不填写，则显示全部
			</td>
		</tr>
	</tbody>
</table>