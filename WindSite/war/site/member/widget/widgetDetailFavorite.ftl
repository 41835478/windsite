<script>
$(function(){
$('#favoriteHistoryList .page-number').click(function(){
		getFavoriteHistoryListImpl($('a',$(this)).text());
	});
$('#favoriteHistoryList .pgNext').click(function(){
	if(!$(this).hasClass('pgEmpty')){
		getFavoriteHistoryListImpl($(this).attr('page'));
	}
	return false;
});	
});
</script>
<#if widgets??&&widgets?size!=0>
<tr><td align=right colspan=4>
<@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount?number></@ws.pager>
</td></tr>
<#list widgets as w>
<tr class="<#if w_index%2==0>odd<#else>even</#if>"><td align=left>${w.nick}</td><td align=center>${w.created}</td></tr>
</#list>

<#else>
<tr><td colspan=2>该组件尚未被人收藏</td></tr>
</#if>