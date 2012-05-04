<br/>
总错误数<#if errors??&&errors?size!=0><strong style="color:red;">【${errors?size}】</strong></#if>
<TABLE id="itemsTable" class="wTable" width="100%" border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=50px>序号</TH>
			<TH width=100px>昵称</TH>
			<TH width=120px>发生时间</TH>
			<TH>错误</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#if errors??>
	<#if errors?size!=0>
		<#list errors as e>
			<TR  style="font-weight: bold;">
				<TD>${e_index+1}</TD>
				<TD>${e.nick}</TD>
				<TD>${e.created}</TD>
				<TD>${e.content}</TD>
			</TR>
		</#list>
		<#else>
		<tr><td colspan=8 align="center"><h3>恭喜，暂无错误</h3></td>
		</tr>
	</#if>
	</#if>
	</TBODY>
</TABLE>