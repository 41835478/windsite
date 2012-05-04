<#if ads??&&ads?size!=0>
<TR><td>共<strong style="color:red">${page.totalCount}</strong>条推广记录</td><td colspan=3 style="line-height:14px;height:20px;"><div style="float:right;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount></@ws.pager></div></td></TR>
<#list ads as ad>
<tr><td class="item-a"><a href="/gitem/${ad.pk.numIid}.html" target="_blank">${ad.title}</a></td><td>${ad.nick}</td><td>${ad.adDate?datetime}</td><td><a href="${ad.url}" target="_blank">投放位置</a></td></tr>
</#list></#if>