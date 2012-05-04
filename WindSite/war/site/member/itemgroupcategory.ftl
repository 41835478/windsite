<#include "/site/template/header.ftl">
<script type="text/javascript">
$(function() {
$("#selectType").change(function(){
	if($("#keyword").val()||$("#selectType").val()!="0"){
			itemGroupSearch('${group_id}',$("#selectType").val(),$("#keyword").val());
	}else{
			alert("请输入查询关键字,或选择商品类别!");
	}
});
$('#search').click(function(){
		if($("#keyword").val()||$("#selectType").val()!="0"){
			itemGroupSearch('${group_id}',$("#selectType").val(),$("#keyword").val());
		}else{
			alert("请输入查询关键字,或选择商品类别!");
		}
		return;
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
/**
 * 推广组类别搜索事件
 */
function searchAuction(cid, name, count) {
	itemGroupSearch('${group_id}', cid, '');
}
</script> 	
<div class="wind-header">
添加商品到推广组(<a href="/router/member/view/personal?goto=itemGroups&gid=${group_id}" style="color: #0065FF;">${group_name}</a>)
</div>
<div style="height:5px;"></div>
<#include "/site/template/groupcategory.ftl">
<#include "/site/template/footer.ftl">