<script type="text/javascript">
	$(function() {
		$("#itemsDoctorRefresh").click(function(){
			getHtmlItemsDoctor("false");
			return false;
		}).hover(
		function() {
			$(this).addClass('ui-state-hover');
		},
		function() {
			$(this).removeClass('ui-state-hover');
		}
	)
	.focus(function() {
		$(this).addClass('ui-state-focus');
	})
	.blur(function() {
		$(this).removeClass('ui-state-focus');
	});
});
</script>
<TABLE class="wTable" algin="left" width=100% border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=60px >
			<a id="itemsDoctorRefresh" href="#" class="button  ui-state-default">刷新</a>
			</TH>
			<TH width=200px>推广组名</TH>
			<TH width=80px>商品数</TH>
			<TH width=140px>完成时间</TH>
			<TH>检测信息</TH>
			<TH>操作</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#if (doctors?size>0)>
		<tr><td colspan="6" style="height:30px;background: #FFC url(/assets/images/light.gif) no-repeat 20px 8px;padding-left:50px;"><span>下述列表为最近一次商品检测结果</span></td></tr>
		<#list doctors as d>
			<TR class="<#if d_index%2==0>odd<#else>even</#if>">
				<TD>
					<#if d.state=="0">
						检测中...
						<#elseif d.state=="1">
						检测完成
						<#else>
						检测失败
					</#if>
				</TD>
				<TD><a href="javascript:getHtmlItemGroup('${d.group.id}');">${d.group.name}</a></TD>
				<TD>${d.group.count}个</TD>
				<TD><#if d.updated??>${d.updated?datetime}<#else>未完成</#if></TD>
				<TD>${d.msg}</TD>
				<TD><a href="javascript:deleteInvalidItems('${d.group.id}');">删除所有无效商品</a></TD>
			</TR>
		</#list>
	<#else>
		<tr><td colspan=8 align="center"><h3>您还未检测过推广商品</h3></td>
		</tr>
	</#if>
	</TBODY>
</TABLE>