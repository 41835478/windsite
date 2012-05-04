<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>我的推广组-淘客建站-我是淘客-新淘网</title>
</@ws.header>
<script>
$(function(){
$('#createGroup').button().click(function() {
	gtCreateGroupDialog();	
});
$('a.itemgroup-get').click(function() {
			getHtmlItemGroup($(this).attr('gid'));
			return false;
		});
$('a.itemgroup-delete').click(function() {
			deleteGroup($(this).attr('gid'), $(this).attr('gname'));
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
<@xt.taoketemplate navselected='taoke' bdselected='site-groups'>
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
			<TR class="<#if g_index%2==0>odd<#else>even</#if>">
				<TD><a href="#" class="itemgroup-get" gid="${g.id}" style="color:#00E;font-weight:bold">${g.name}</a></TD>
				<TD>${g.created?datetime}</TD>
				<TD>${g.count}个</TD>
				<TD><a href="#"  class="itemgroup-get" gid="${g.id}">查看和管理</a>&nbsp;&nbsp;&nbsp;<a href="#"  class="itemgroup-delete" gid="${g.id}" gname="${g.name}">删除</a><#if g.count!=0>&nbsp;&nbsp;&nbsp;<a href="/router/member/links?type=3&value=${g.id}">推广整个推广组</a></#if></TD>
			</TR>
		</#list>
	<#else>
		<tr><td colspan=4 align="center"><h3>抱歉，您还未创建推广组</h3></td>
		</tr>
	</#if>
	</TBODY>
</TABLE>
<@ws.help>
	<a href="http://www.xintaonet.com/router/site/view/support?type=help-myxintao&faq=09" target="_blank"><h3>1.什么是推广组？如何创建推广组？</h3></a>
	<a href="http://www.xintaonet.com/router/site/view/support?type=help-myxintao&faq=11" target="_blank"><h3>2.为什么我的店铺商品搜索不到？</h3></a>
</@ws.help>
</@xt.taoketemplate>