<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>我的店铺收藏-淘客建站-我是淘客-新淘网</title>
</@ws.header>
<script>
$(function(){
	$('#createGroup').button().click(function() {
		openCreateShopGroupDialog();
		return false;
	});
	$('a.shopgroup-get').click(function() {
				getHtmlShopGroup($(this).attr('gid'));
				return false;
			});
	$('a.shopgroup-delete').click(function() {
				deleteGroup($(this).attr('gid'), $(this).attr('gname'));
				return false;
			});
});
function getHtmlShopGroup(id, sortBy) {
	if (!sortBy) {
		sortBy = '';
	}
	getRightContentHtmlContent("/router/member/sitemanager/shopgroup/" + id, "GET", {
				sortBy : sortBy
			}, rightContentAppend);
}
function deleteShopsFromShopGroup(gid,ids) {
	var sender = new WindSender("/router/member/shops/favorite/delete/"+gid);
	sender.load("POST", {
				"ids" : ids
			}, function(response) {
				if (response.isSuccess()) {
					alert("删除成功");
					getHtmlShopGroup(gid, $('#shopsSortBy').val());
				} else {
					alert(response.msg);
				}
			});
}

function renameShopGroup(id, name) {
	var sender = new WindSender("/router/member/sitemanager/shops/group/rename/" + id);
	sender.load("POST", {
				"name" : name
			}, function(response) {
				if (response.isSuccess()) {
					alert("修改名称成功");
					$("#renameGroupDialog").dialog("close");
					getHtmlShopGroup(id);
				} else {
					alert(response.msg);
				}
			});
}
function openCreateShopGroupDialog(){
	$('#dialog').remove();
		$("body")
				.append("<div id='dialog' title='新增店铺分组'><p id='validateTips'>店铺分组名称不能为空.</p><br/><form><label for='groupName'>推广组名称:</label><input type='text' name='groupName' id='groupName' size=30 value=''/></form></div>");
		$("#dialog").dialog({
					bgiframe : true,
					autoOpen : false,
					height : 200,
					width : 400,
					modal : true,
					buttons : {
						'取消' : function() {
							$(this).dialog('close');
						},
						'确定' : function() {
							var groupName = $("#groupName").val();
							if (groupName) {
								if (groupName.length > 10) {
									alert("推广组名称长度不能超过10");
									return;
								}
								var sender = new WindSender("/router/member/sitemanager/shops/group/create");
								sender.load("POST", {
											"name" : groupName
										}, function(response) {
											if (response.isSuccess()) {
												alert("创建成功");
												$("#dialog").dialog("close");
												document.location.href = "/router/member/sitemanager/shops";
											} else {
												alert(response.msg);
											}
										});
							} else {
								alert("推广组名称不能为空");
							}
						}
					}
				});
	$("#dialog").dialog('open');
} 
function deleteGroup(id,name){
	window.confirm("确定删除当前店铺分组["+name+"]",function(r){
		if(r){
			var sender = new WindSender("/router/member/sitemanager/shops/group/delete/" + id);
			sender.load("GET", {}, function(response) {
						if (response.isSuccess()) {
							alert("删除成功");
							document.location.href = "/router/member/sitemanager/shops";
						} else {
							alert(response.msg);
						}
					});
		}
		return;
	});
}
</script>
<@xt.taoketemplate navselected='taoke' bdselected='site-shopgroups'>
<#if (groups?size<USER.limit.groups)>
<a href="javascript:;" id="createGroup" class="">新增店铺收藏分组</a>
<div style="height:2px;"></div>
</#if>
<@ws.info>
<span>
您的店铺收藏分组数量最高限额为<strong style='color:#D02200;font-weight:bold;'>10</strong>  个，
您还可以添加 <strong style='color:#D02200;font-weight:bold;'>${10-groups?size}</strong> 个
</span>
</@ws.info>
<TABLE class="wTable" width=100% height=100% border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=300px>店铺分组名称</TH>
			<TH width=100px>店铺数</TH>
			<TH>操作</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#if (groups?size>0)>
		<#list groups as g>
			<TR class="<#if g_index%2==0>odd<#else>even</#if>">
				<TD><a href="#" class="shopgroup-get" gid="${g.id}" style="color:#00E;font-weight:bold">${g.name}</a></TD>
				<TD>${g.count}个</TD>
				<TD><a href="#"  class="shopgroup-get" gid="${g.id}">查看和管理</a>&nbsp;&nbsp;&nbsp;<a href="#"  class="shopgroup-delete" gid="${g.id}" gname="${g.name}">删除</a></TD>
			</TR>
		</#list>
	<#else>
		<tr><td colspan=3 align="center"><h3>抱歉，您还未创建店铺分组</h3></td>
		</tr>
	</#if>
	</TBODY>
</TABLE>
<@ws.help>
	<a href="http://www.xintaonet.com/router/site/view/support?type=help-myxintao&faq=09" target="_blank"><h3>1.什么是店铺分组？如何创建店铺分组？</h3></a>
	<a href="http://www.xintaonet.com/router/site/view/support?type=help-myxintao&faq=11" target="_blank"><h3>2.为什么我的店铺搜索不到？</h3></a>
</@ws.help>
</@xt.taoketemplate>