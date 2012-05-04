<#assign imgAttr='original'><#if isDesigner><#assign imgAttr='src'></#if>
<div class="shop-complex-b">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd">
	<#if SITEIMPL.versionNo==1>
		<div>您当前使用的是新淘网淘客普及版，无法使用画报类推广模块</div>
	<#else>
	<#if data??&&data?size==11>
	<#assign left=data[0..4] right=data[5..10]>
		<table width=100%>
			<tbody>
				<tr>
					<td width=690px valign="top">
						<ul class="img-list img-180-150">
						<#if left??&&left?size==5>
							<#list left as d>
								<#assign pic=d.cover_urls>
								<#if d.cover_urls?contains(',')>
									<#if d_index==0>
									<#assign pic=d.cover_urls?split(',')[1]>
									<#else>
									<#assign pic=d.cover_urls?split(',')[0]>
									</#if>
								</#if>
								<li<#if d_index==0> class="img-290-360"</#if>><a target="_blank" href="/huabao/${d.id}.html"><img alt="${d.title}" title="${d.title}" ${imgAttr}="${pic}"><#if d_index!=0><span>${d.short_title}</span></#if></a></li>
							</#list>
						</#if>
	                	</ul>
					</td>
					<td width=255px align=center valign="top">
						<ul class="img-list img-110-90">
 	            			<#if right??&&right?size==6>
							<#list right as d>
								<#assign pic=d.cover_urls>
								<#if d.cover_urls?contains(',')><#assign pic=d.cover_urls?split(',')[0]></#if>
								<li><a target="_blank" href="/huabao/${d.id}.html"><img alt="${d.title}" title="${d.title}" ${imgAttr}="${pic}_110x90.jpg"><span>${d.short_title}</span></a></li>
							</#list>
						</#if>
	            		</ul>
					</td>
				</tr>
			</tbody>
		</table>
		</#if>
		</#if>
	</div>
</div>
