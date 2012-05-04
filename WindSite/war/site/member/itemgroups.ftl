<script type="text/javascript">
$(function() {
	$("#createGroup").button();
	$('#createGroup').click(function(){
					$('#dialog').dialog('open');
					return false;
	});
	if($("#dialog").length>0){
			$("#dialog").remove();
		}
	var createGroupStr = "<div id=\"dialog\" title=\"新增推广组\">";
	createGroupStr+="<p id=\"validateTips\">推广组名称不能为空.</p><br/>";
	createGroupStr+="<form><label for=\"groupName\">推广组名称:</label>";
	createGroupStr+="<input type=\"text\" name=\"groupName\" id=\"groupName\" size=30 value=\"推广组_${groups?size}\"/>";
	createGroupStr+="</form></div>";
	$("body").append(createGroupStr);
	$('#groupName').bind('keydown', 'return', function(evt) {if(evt.keyCode==13)return false;});
	function __addItemGroup(){
		var groupName =$("#groupName").val(); 
		if (groupName) {
			if(groupName.length>10){
				alert("推广组名称长度不能超过10");
				return;
			}
			createItemGroup(groupName);
		}else{
			alert("推广组名称不能为空");
		}
	}
	//Dialog
	$("#dialog").dialog({
			bgiframe: true,
			autoOpen: false,
			height: 200,
			width:400,
			modal: true,
			buttons: {
				'取消': function() {
					$(this).dialog('close');
				},
				'确定': function() {
					__addItemGroup();
				}
			},
			open:function(){
				//$(this).unbind('keydown').bind('keydown', 'return', function(evt) {
				//		__addItemGroup();
				//		return false;
				//	});
			},
			close: function() {
				//$(this).unbind('keydown');
			}
	});
	$('a.itemgroup-get').click(function(){
		getHtmlItemGroup($(this).attr('gid'));
		return false;
	});	
	$('a.itemgroup-delete').click(function(){
		deleteGroup($(this).attr('gid'),$(this).attr('gname'));
		return false;
	});
});
	
function deleteGroup(id,name){
window.confirm("确定删除当前推广组["+name+"]",function(r){
	if(r){
		deleteItemGroup(id);
	}
	return;
});
}

</script>
<style>
a.itemgroup-get,a.itemgroup-delete{
	position:relative;
	z-Index:1;
}
</style>
<#if (groups?size<USER.limit.groups)>
<a href="#" id="createGroup" class="">新增推广组</a>
<div style="height:2px;"></div>
</#if>
<@ws.info>
<span>
您的推广组数量最高限额为<strong style='color:#D02200;font-weight:bold;'>${USER.limit.groups}</strong>  个，
您还可以添加 <strong style='color:#D02200;font-weight:bold;'>${USER.limit.groups-groups?size}</strong> 个
</span>
</@ws.info>
<TABLE class="wTable" width=100% height=100% border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=200px>推广组名</TH>
			<TH width=200px>创建时间</TH>
			<TH width=80px>商品数</TH>
			<TH>操作</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#if (groups?size>0)>
		<#list groups as g>
			<TR>
				<TD><a href="#" class="itemgroup-get" gid="${g.id}" style="color:#00E;font-weight:bold">${g.name}</a></TD>
				<TD>${g.created?datetime}</TD>
				<TD>${g.count}个</TD>
				<TD><a href="#"  class="itemgroup-get" gid="${g.id}">查看和管理</a>&nbsp;&nbsp;&nbsp;<a href="#"  class="itemgroup-delete" gid="${g.id}" gname="${g.name}">删除</a></TD>
			</TR>
		</#list>
	<#else>
		<tr><td colspan=8 align="center"><h3>抱歉，您还未创建推广组</h3></td>
		</tr>
	</#if>
	</TBODY>
</TABLE>
<@ws.help>
	<a href="http://www.xintaonet.com/router/site/view/support?type=help-myxintao&faq=09" target="_blank"><h3>1.什么是推广组？如何创建推广组？</h3></a>
	<a href="http://www.xintaonet.com/router/site/view/support?type=help-myxintao&faq=11" target="_blank"><h3>2.为什么我的店铺商品搜索不到？</h3></a>
</@ws.help>