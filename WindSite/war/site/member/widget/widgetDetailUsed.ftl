<script>
$(function(){
$('#usedHistoryList .page-number').click(function(){
		getUsedHistoryListImpl($('a',$(this)).text());
	});
$('#usedHistoryList .pgNext').click(function(){
	if(!$(this).hasClass('pgEmpty')){
		getUsedHistoryListImpl($(this).attr('page'));
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
<tr class="<#if w_index%2==0>odd<#else>even</#if>">
<td align="left">${w.nick}</td><td align="center">${w.created}</td>
<td align="center"><#if w.autoUpdate>接受<#else>不接受</#if></td>
<#assign path=getTime(w.template.created)>
<td align="left"><a href="<#if w.template.isDefault>http://shop${w.user_id}.xintaonet.com<#elseif path??>http://shop${w.user_id}.xintaonet.com/pages/${path}.html<#else>http://shop${w.user_id}.xintaonet.com</#if>" target="_blank">${w.template.name}</a></td></tr>
</#list>

<#else>
<tr><td colspan=3>该组件尚未被人使用</td></tr>
</#if>