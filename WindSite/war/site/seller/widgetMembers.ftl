<#if members??&&members?size!=0>
<tr><td colspan=3 style="text-align:center;line-height:14px;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount?number></@ws.pager></td>
<td colspan=1 style="text-align:center;line-height:14px;">共<span style="color:red;">${page.totalCount}</span>条记录<input type="hidden" id="pageNoFilter" value="${page.pageNo}"/></td>
</tr>
<#list members as m>
<tr class="<#if m_index%2==0>odd<#else>even</#if>">
<td><a href="#"  class="filterWid" title="${m.name}" wid="${m.wid}">${m.name}</a></td><td>${m.nick}</td>
<#assign path=getTime(m.created)>
<td><a href="<#if m.isDefault>http://shop${m.user_id}.xintaonet.com<#elseif path??>http://shop${m.user_id}.xintaonet.com/pages/${path}.html<#else>http://shop${m.user_id}.xintaonet.com</#if>" target="_blank">${m.templateName}</a></td>
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
<td colspan=4>抱歉！您制作的自定义组件没有被新淘网会员使用或者您没有制作自己的自定义组件，去<a href="/router/member/widget/my" target="_blank">我的组件库</a>查看自定义组件详情</td>
</tr>
</#if>