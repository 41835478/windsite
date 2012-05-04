<#setting number_format="0.##"> 
<script type="text/javascript">
	$(function() {
		$('#datatypes').change(function(){
			$('#w-a tr').fadeOut();
			if($(this).val()=="0"){
				$('#w-a tr').fadeIn();
			}else{
				var did = $(this).val();
				var watr=$('#w-a tr');
				
				if(watr.length==0){
					$('#copyWa').show();
				}
				var i=0;
				watr.each(function(){
					if(did==$(this).attr('did')){
						$(this).fadeIn();
						i++;
					}else{
						$(this).fadeOut();
					}
				});
				$('#waCount').text(i);
			}
		});
		$("#addWidgetAttributeA").click(function(){
			if($("#types").val()==0){
					alert("请选中具体类型");return;
			}
			$('#addWidgetAttributedialog').remove();
			$('body').append('<div id="addWidgetAttributedialog" title="新增组件属性"></div>');
			$('#addWidgetAttributedialog').load("/site/admin/addwidgetattribute.html?v="+Math.random(),function(){
						$("#addWidgetAttributedialog").dialog({
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
										if($("#a_title").val().length==0){
											alert("title不能为空！");return;
										}
										if($("#a_type").val().length==0){
											alert("type不能为空！");return;
										}
										if($("#datatypes").val().length==0||$("#datatypes").val()=="0"){
											alert("datatype不能为空！");return;
										}
										createWidgetAttribute($("#a_title").val(),$("#a_type").val(),$("#a_clickUrl").val(),
																$("#a_picUrl").val(),
														 		"${widget.id}",$("#datatypes").val(),$("#a_sortOrder").val(),$("#a_desc").val());
									}
								},
								close: function() {
								}
						});
						$('#addWidgetAttributedialog').dialog("open");
					});
					return false;
		});
		//Dialog
	$('#editor').click(function(){
		if($('#datatypes').val()=="0"){
			alert('未选中具体数据类型');return false;
		}
		$('#editorForm').attr('action',
					'/router/member/admin/editor/${widget.id}/'+$('#datatypes').val()+'?version=' + Math.random());
		$('#editorForm').submit();// 提交编辑	
		return false;		
	});	
	$('#preview').click(function(){
		if($('#datatypes').val()=="0"){
			alert('未选中具体数据类型');return false;
		}
		$('#previewForm').attr('action',
					'/router/member/admin/preview/${widget.id}/'+$('#datatypes').val()+'?version=' + Math.random());
		$('#previewForm').submit();// 提交预览	
		return false;		
	});
	$('#deploy').click(function(){
		if($('#datatypes').val()=="0"){
			alert('未选中具体数据类型');return false;
		}
		var sender = new WindSender('/router/member/admin/deploy/${widget.id}/'+$('#datatypes').val()+'?version=' + Math.random());
		sender.load("GET", {}, function(response) {
				if (response.isSuccess()) {
					alert("发布组件成功");
				} else {
					alert(response.msg);
				}
			});
		return false;	
	});
	$('.updateAttr').click(function(){
		var tr=$(this).parents('tr');
		var title=$('.a-title',tr).val();
		var clickUrl=$('.a-clickurl',tr).val();
		var picUrl=$('.a-picurl',tr).val();
		var description=$('.a-desc',tr).val();
		var sender = new WindSender('/router/member/admin/attribute/update/'+$(this).attr('aid'));
		sender.load("POST", {'title':title,'clickUrl':clickUrl,'picUrl':picUrl,'description':description}, function(response) {
				if (response.isSuccess()) {
					alert("修改组件属性成功");
				} else {
					alert(response.msg);
				}
			});
	});
	$('#copyWa').click(function(){
		if($('#datatypes').val()=="0"){
			alert('未选中具体数据类型');return false;
		}
		confirm('确认要重新生成该数据类型下的组件属性吗？',function(r){
			if(r){
				var sender = new WindSender('/router/member/admin/attribute/rebuild/${widget.id}/'+$('#datatypes').val());
				sender.load("GET", {}, function(response) {
						if (response.isSuccess()) {
							alert("重新生成组件属性成功");
							getHtmlWidget('${widget.id}');
						} else {
							alert(response.msg);
						}
					});
			}else{
				return false;
			}
		});
		return false;
	});
});
	
</script>
<style>
.a-title{width:150px;}.a-type{width:50px;}
</style>
<form id="previewForm" name="previewForm" method="GET" target="_blank">
</form>
<form id="editorForm" name="editorForm" method="GET" target="_blank">
</form>
<div class="conent ui-widget-content" style="height:100%" align="left">
<div style="height:2px;"></div>
<div class="ui-widget-content ui-corner-all" align="center">
<div class="buttonBar" align="left">
<a href="javascript:getHtmlWidgets('${widget.type.id}')">返回</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<span style="color: #1c94c4;">当前组件:${widget.title}&nbsp;&nbsp;&nbsp;&nbsp;</span>
<select id="datatypes" style="height:22px;">
	<option value="0" selected>全部</option>
	<#if (datatypes?size>0)>
		<#list datatypes as t>
			<option value="${t.id}">${t.title}</option>
		</#list>
	</#if>
</select>
<a href="#" id="addWidgetAttributeA">新增组件属性</a>
<a id="editor" target="_blank" href="#">编辑</a>
<a id="preview" target="_blank" href="#">预览</a>
<a id="deploy" target="_blank"  href="#">发布</a>

<a id="copyWa" target="_blank"  href="#" style="display:none;">复制结构至当前数据类型</a>
</div>
共<span id="waCount" style="color:red;font-weight:bold;">${widget.attributes?size}</span>个属性
<TABLE class="wTable" style="padding-left:2px;padding-right:2px;" width=100% border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=50px>类型</TH>
			<TH width=150px>标题</TH>
			<TH width=50px>属性类型</TH>
			<TH width=150px>点击地址</TH>
			<TH width=150px>图片地址</TH>
			<TH>描述</TH>
			<TH>操作</TH>
		</TR>
	</THEAD>
	<TBODY id="w-a">
	<#if widget.attributes?size!=0>
		<#list widget.attributes as a>
			<TR  style="font-weight: bold;" did="${a.dataType.id}">
				<td><strong style="color:green">${a.dataType.name}</strong></td>
				<TD><input class="a-title" value="${a.title}" title="${a.title}"/></TD>
				<TD><input class="a-type" value="${a.type}" title="${a.type}"/></TD>
				<TD><input class="a-clickurl" value="${a.clickUrl}" title="${a.clickUrl}"/></TD>
				<TD><input class="a-picurl" value="${a.picUrl}"	title="${a.picUrl}"/></TD>
				<TD><input class="a-desc" value="${a.description}" title="${a.description}"/></TD>
				<TD><a class="updateAttr" aid="${a.id}">修改</a></TD>
			</TR>
		</#list>
		<#else>
		<tr><td colspan=8 align="center"><h3>抱歉，暂无属性</h3></td>
		</tr>
	</#if>
	</TBODY>
</TABLE>
</div>
</div>