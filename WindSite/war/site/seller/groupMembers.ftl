<#if members??&&members?size!=0>
<tr><td colspan=3 style="text-align:center;line-height:14px;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount?number></@ws.pager></td>
<td colspan=1 style="text-align:center;line-height:14px;">共<span style="color:red;">${page.totalCount}</span>条记录<input type="hidden" id="pageNoFilter" value="${page.pageNo}"/></td>
</tr>
<#list members as m>
<tr class="<#if m_index%2==0>odd<#else>even</#if>">
<td><a href="#"  class="filterNumIid" title="${m.title}" nid="${m.num_iid}">${m.title}</a></td>
<td><a href="#" class="filterMember" member="${m.user_id}" title="${m.nick}">${m.nick}</a></td><td><a href="http://shop${m.user_id}.xintaonet.com" target="_blank">http://shop${m.user_id}.xintaonet.com</a></td>
<td><#if USER.uc_id??>
	<#if m.uc_id??>
		<#if USER.uc_id!=m.uc_id>
			<#if friendIds??&&friendIds?contains('['+m.uc_id+']')>我的家园好友
				<#elseif unFriendIds??&&unFriendIds?contains('['+m.uc_id+']')>等待好友验证
				<#else><a href="#" uid="${USER.uc_id}" fuid="${m.uc_id}" class="addHomeFriend">加为家园好友</a>
			</#if>
			<#else>本人
		</#if>
		<#else>此会员尚未激活家园
	</#if>
	<#else>您尚未激活家园
	</#if></td>
</tr>
</#list>

<#else>
<tr>
<td colspan=4>抱歉！您的淘宝店铺推广商品没有被新淘网会员挑选并推广，去<a href="/router/site/loginuc?redirect=http://home.xintaonet.com" target="_blank">新淘家园</a>加好友推荐我的店铺推广商品</td>
</tr>
</#if>