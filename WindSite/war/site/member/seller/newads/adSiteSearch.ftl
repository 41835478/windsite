<#if USER.sid??&&''!=USER.sid&&sites??&&sites?size!=0>
<TR><td>共<strong style="color:red">${page.totalCount}</strong>个独立站点</td><td colspan=3 style="line-height:14px;height:20px;"><div style="float:right;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount></@ws.pager></div></td></TR>
<#list sites as s>
<tr><td class="item-a"><a href="http://${s.www}" target="_blank">${s.title}</a></td><td>http://${s.www}</td><td><a href="http://${s.www}/tshop/${USER.sid}.html" target="_blank">店铺推广</a></td><td><a href="http://${s.www}/search?nicks=${USER.nick?url}" target="_blank">商品推广</a></td></tr>
</#list></#if>