<#setting number_format="0.##"> 
<script type="text/javascript">
	$(function() {
		//$("a.fb").fancybox();
		$("#addWidgetA").click(function(){
			if($("#types").val()==0){
					alert("请选中具体类型");return;
			}
			$('#addWidgetdialog').load("/site/admin/addwidget.html",{},function(){
						$('#addWidgetdialog').dialog("open");
					});
					return false;
		});
		
		$("#types").change(function(){ //事件發生  
			getHtmlWidgets($('#types option:selected').val());
		}); 
		//Dialog
	$("#addWidgetdialog").dialog({
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
					if($("#w_name").val().length==0){
						alert("name不能为空！");return;
					}
					if($("#w_title").val().length==0){
						alert("title不能为空！");return;
					}
					createWidget($("#w_name").val(),$("#w_title").val(),
									 $("#types").val(),$("#w_picUrl").val(),
									 $("#w_isDefault").attr("checked")?"true":"false",
									 $("#w_isCharge").attr("checked")?"true":"false",
									 $("#w_sortOrder").val(),$("#w_desc").val(),$('#w_layout').val());
				}
			},
			close: function() {
			}
	});
	
});
	
</script>
<div id="addWidgetdialog" title="新增组件"></div>

<div class="conent ui-widget-content" style="height:100%" align="left">
<div class="buttonBar" style="height:25px;" align="left">
<select id="types" style="height:22px;">
	<#if (types?size>0)>
		<option value="0">所有类型</option>		
		<#list types as t>
				<#if type??&&type.id==t.id>
					<option selected value="${t.id}">${t.title}</option>
				<#else>
					<option value="${t.id}">${t.title}</option>
				</#if>
		</#list>
	</#if>
</select>
<a href="#" id="refresh">刷新</a>
</div>
<div style="height:2px;"></div>
<div class="ui-widget-content ui-corner-all" align="center">
<div class="buttonBar" align="left">
<a href="#" id="addWidgetA">新增组件</a>
</div>
<TABLE class="wTable" style="padding-left:2px;padding-right:2px;" width=100% border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<!--<TH width=100px>缩略图</TH>-->
			<TH width=100px>英文</TH>
			<TH width=100px>中文</TH>
			<TH width=100px>组件类型</TH>
			<TH width=55px>是否默认</TH>
			<TH width=55px>是否收费</TH>
			<TH>描述</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#if widgets?size!=0>
		<#list widgets as w>
			<TR  style="font-weight: bold;">
				<!--<TD>
					<div class="bb-info">
						<div class="bb-pic"><a class="fb" rel="group" href="${w.picUrl}" target="_blank"><img id="${w.id}" src="${w.picUrl}" alt="${w.title}" width=60px height=60px/></a></div>
					</div>
				</TD>-->
				<TD><a href="javascript:getHtmlWidget('${w.id}')">${w.name}</a></TD>
				<TD><a href="javascript:getHtmlWidget('${w.id}')">${w.title}</a></TD>
				<TD><font color="#D02200">${w.type.title}</TD>
				<TD><font color="#D02200"><#if w.isDefault>默认<#else>非默认</#if></font></TD>
				<TD><font color="#D02200"><#if w.isCharge>收费<#else>免费</#if></font></TD>
				<TD><font color="green">${w.description}</font></TD>
			</TR>
		</#list>
		<#else>
		<tr><td colspan=8 align="center"><h3>抱歉，暂无组件</h3></td>
		</tr>
	</#if>
	</TBODY>
</TABLE>
</div>
</div>