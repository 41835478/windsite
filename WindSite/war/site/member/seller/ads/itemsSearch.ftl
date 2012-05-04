<script>
$(function(){
	$('.page-number').click(function(){
			planItemSearch('${q}',$('a',$(this)).text());
			return false;
		});
	$('.pgNext').click(function(){
		if(!$(this).hasClass('pgEmpty')){
			planItemSearch('${q}',$(this).attr('page'));
		}
		return false;
	});
	$('#itemSearchResult .itemSearchResult li').hover(function() {
				$(this).toggleClass("ui-selecting");
				$('#itemSearchResult .itemSearchResult li').not($(this)).removeClass("ui-selecting");
			}, function() {
				$(this).removeClass("ui-selecting");
			}).click(function() {
				if($(this).hasClass('ui-selected')){
					$('input[type="checkbox"]', $(this)).attr('checked', false);
					$(this).removeClass("ui-selected");
					removeCheckedPlanItem($(this));
				}else{
					if($('#checkedItems ul li').length>=5){
						alert('您只能选择5个推广商品');return;
					}
					$('input[type="checkbox"]', $(this)).attr('checked', true);
					$(this).addClass("ui-selected");
					addCheckedPlanItem($(this).clone());
				}
			});
	$('#itemSearchResult .itemSearchResult li input[type="checkbox"]').click(function(event) {
				if($(this).is(':checked')){
					if($('#checkedItems ul li').length>=5){
						alert('您只能选择5个推广商品');$(this).attr('checked',false);event.stopPropagation();return;
					}
					var li = $(this).parents('li');
					li.removeClass('ui-selected').addClass("ui-selected");
					addCheckedPlanItem(li.clone());
				}else{
					var li = $(this).parents('li');
					li.removeClass('ui-selected');
					removeCheckedPlanItem(li);
				}
				event.stopPropagation();
			});
})
</script>
<table class="items-pages" width="100%" height="20px">
	<TR>
		<td><div style="float:right;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount></@ws.pager></div></td>
	</TR>
</table>
<#if items??&&items?size!=0><ul class="itemSearchResult"><#list items as i>
<li title="30天总销量:${i.volume}&#13;30天推广量:${i.commissionNum}" nid="${i.numIid}">
	<div class="pic" align="center">
	<img src="${i.picUrl?replace('bao/uploaded', 'imgextra')}_60x60.jpg" alt="${i.title}"/>
	</div>
	<div class="item">
	<div class="title">
	<a onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'item-d-${i.nick}-${i.numIid}', '${i.title}']);" target="_blank" title="${i.title}">${i.title}</a>
	</div>
	<div><span class="k">价格:</span><span class="v">${i.price}</span></div>
	<div><span class="k">佣金:</span><span class="v">${i.commission}</span></div><input class="customechecked" type="checkbox" name="checkedgroupitem" title="${i.title}" nid="${i.numIid}"/></div>
	</li>
</#list></ul><#else><h2><#if q??&&q!=''>抱歉，没有搜索到符合条件的商品<#else>请确认您的淘宝店铺已经加入淘宝客推广,查看<a target="_blank" href="http://forum.xintaonet.com/faq.php?action=faq&id=36&messageid=48" style="font-size:17px;">帮助</a></#if></h2></#if>
