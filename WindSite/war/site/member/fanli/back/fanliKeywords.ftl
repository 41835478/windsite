<TABLE class="wTable" width=100% height=100% border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=200px>关键词</TH>
			<TH>链接</TH>
		</TR>
	</THEAD>
	<TBODY id="keywords">
		<#if words??&&words?size!=0>
		<#list 0..19 as i>
			<#if (i<words?size)><tr><td><input class="k" value="${words[i].title}"/></td><td><input class="v" value="${words[i].url}"/></td></tr>
			<#else><tr><td><input class="k" value=""/></td><td><input class="v" value=""/></td></tr></#if>
		</#list>
		<#else>
			<#list 0..19 as i><tr><td><input class="k" value=""/></td><td><input class="v" value=""/></td></tr></#list>
		</#if>
	</TBODY>
</TABLE>