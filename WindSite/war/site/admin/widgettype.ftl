<script type="text/javascript">
$(function() {
	$("#createType").button();
	$('#createType').click(function(){
					$('#addTypedialog').empty().load("/site/admin/addwidgettype.html",{},function(){
						$('#addTypedialog').dialog("open");
					});
					return false;
	});
	$(".addWidgetDataTypeA").click(function(){
			var tid=$(this).attr('tid');
			$('#addWidgetDataTypedialog').remove();
			$('body').append('<div id="addWidgetDataTypedialog" title="新增组件数据类型"></div>');
			$('#addWidgetDataTypedialog').load("/site/admin/addwidgetdatatype.html",{},function(){
						$("#addWidgetDataTypedialog").dialog({
								bgiframe: true,
								autoOpen: false,
								height: 400,
								width:500,
								modal: true,
								buttons: {
									'取消': function() {
										$(this).dialog('close');
									},
									'确定': function() {
										if($("#wa_title").val().length==0){
											alert("title不能为空！");return;
										}
										createWidgetDataType($("#wa_name").val(),$("#wa_title").val(),
														 $(this).dialog('option','tid'),
														 $("#wa_isDefault").attr("checked")?"true":"false",$("#wa_sortOrder").val());
									}
								},
								close: function() {
								}
						});
						$('#addWidgetDataTypedialog').dialog("open").dialog('option','tid',tid);
					});
					return false;
		});
	//Dialog
	$("#addTypedialog").dialog({
			bgiframe: true,
			autoOpen: false,
			height: 300,
			width:400,
			modal: true,
			buttons: {
				'取消': function() {
					$(this).dialog('close');
				},
				'确定': function() {
					if($("#t_name").val().length==0){
						alert("name不能为空！");return;
					}
					if($("#t_title").val().length==0){
						alert("title不能为空！");return;
					}
					createWidgetType($("#t_name").val(),$("#t_title").val(),$("#t_sortOrder").val(),$("#t_desc").val());
				}
			},
			close: function() {
			}
	});
});
	
function deleteType(id,name){
window.confirm("确定删除当前组件类型["+name+"]",function(r){
	if(r){
		deleteWidgetType(id);
	}
	return;
});
}

</script>
<div id="addTypedialog" title="新增组件类型"></div>
<a href="#" id="createType" class="">新增组件类型</a>
<div style="height:2px;"></div>
<TABLE class="wTable" width=100% height=100% border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=150px>英文</TH>
			<TH width=150px>中文</TH>
			<TH width=150px>创建时间</TH>
			<TH width=80px>组件数</TH>
			<TH>操作</TH>
			<TH>操作</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#if (types?size>0)>
		<#list types as t>
			<TR>
				<TD><a href="javascript:getHtmlWidgets('${t.id}');" style="color:#00E;font-weight:bold">${t.name}</a></TD>
				<TD><a href="javascript:getHtmlWidgets('${t.id}');" style="color:#00E;font-weight:bold">${t.title}</a></TD>
				<TD>${t.created?datetime}</TD>
				<TD><#if t.widgets??&&(t.widgets?size>0)>${t.widgets?size}<#else>0</#if>个</TD>
				<TD><a href="javascript:getHtmlWidgets('${t.id}');">查看和管理</a>&nbsp;&nbsp;&nbsp;<a href="javascript:deleteType('${t.id}','${t.name}')">删除</a></TD>
				<TD>
					<a href="#" class="addWidgetDataTypeA" tid="${t.id}">新增组件数据类型</a>
				</TD>
			</TR>
		</#list>
	<#else>
		<tr><td colspan=8 align="center"><h3>抱歉，您还未创建组件类型</h3></td>
		</tr>
	</#if>
	</TBODY>
</TABLE>