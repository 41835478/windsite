<#if blogs??&&blogs?size!=0>
<#list blogs as b>
	<#if b_index%8==0>
		<ul>
	</#if>
	<li title="${b.subject}" bid="${b.blogid}"  t="${b.subject}" c="/blog/${USER.uc_id}/${b.blogid}.html">
		<table><tr><td width=30px><input type="radio" name="checkedblog"/></td><td><a href="/blog/${USER.uc_id}/${b.blogid}.html" target="_blank">${b.subject}</a></td></tr></table>
	</li>
	<#if b_index%8==7>
		</ul>
	</#if>
</#list>
<#else>
<ul>
<h4 style="padding-top:100px;color:#F60;">您尚未发表购物资讯类日志，请进入<a href="http://www.xintaonet.com/router/site/loginuc?redirect=http://home.xintaonet.com" target="_blank">新淘家园</a>，发表日志【隐私设置需修改为购物资讯】</h4>
</ul>
</#if>