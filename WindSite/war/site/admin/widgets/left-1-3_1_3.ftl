<div class="custome-235-3">
<#if class??&&blogs??&&blogs?size!=0>
<h2 class="custome-header-h2"><a href="/class/${class.classid}.html" class="a-s" target="_blank"><span>${class.classname}</span></a></h2>
<table class="custome-table">
	<tr>
		<td width=230px style="padding-bottom:5px;">
			<ul>
				<#list blogs as b>
					<li class="l-a-s" title="${b.subject}"><a href="/blog/${uc_id}/${b.blogid}.html" target="_blank"><span>${b.subject}</span></a><b>${dateline(b.dateline,'MM-dd')}</b></li>
				</#list>
			</ul>
		</td>
	</tr>
</table>
<#else>文章列表不存在</#if>
</div>
