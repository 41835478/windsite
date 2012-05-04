<#macro huabaoComplexB hd="" posters=[] posterChannel="导购">
<#if posters??&&posters?size==28>
<#assign left=posters[0..4] right=posters[5..10]>
<div name="shopComplexB" class="box J_TBox ks-clear">
<div class="shop-complex-b">
	<div class="hd hd-${hd}" <#if 'idea'==hd>style="height:30px;background-image:url('http://img03.taobaocdn.com/tps/i3/T1lGXEXhhLXXXXXXXX-151-40.png');background-position:-3px -10px;"</#if>><h3><span></span></h3></div>
	<div class="bd">
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
								<li<#if d_index==0> class="img-290-360"</#if>><a target="_blank" href="/huabao/${d.id}.html"><img alt="${d.title}" title="${d.title}" src="${pic}"><#if d_index!=0><span>${d.short_title}</span></#if></a></li>
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
								<li><a target="_blank" href="/huabao/${d.id}.html"><img alt="${d.title}" title="${d.title}" src="${pic}_110x90.jpg"><span>${d.short_title}</span></a></li>
							</#list>
						</#if>
	            		</ul>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
</div>
</#if>
</#macro>
<#macro huabaoComplexA posters=[] posterChannel="导购">
<#if posters??&&posters?size==28>
<#assign left=posters[0] middle=posters[1..8] right=posters[9..19] bottom=posters[20..27]>
<#assign pic=left.cover_urls>
<#if left.cover_urls?contains(',')><#assign pic=left.cover_urls?split(',')[1]></#if>
<div name="shopComplexA" class="box J_TBox ks-clear">
<div class="shop-complex-a">
	<div class="hd"><h3><span>${posterChannel}画报</span></h3></div>
	<div class="bd">
		<table width=100% height=350><tbody>
			<tr><td valign="top">
				<table width=100%><tbody><tr>
					<td width=240px valign="top" align=center style="padding-top:10px;"><a href="/huabao/${left.id}.html" target="_blank" title="${left.title}"><img src="${pic}" alt="${left.title}" title="${left.title}" width=220 height=320  style="border:1px solid #CCC;"></a></td>
					<td width=480px valign="top">
						<div class="grid grid-110">
							<ul class="shop-list">
								<#list middle as d>
								<#assign pic=d.cover_urls>
								<#if d.cover_urls?contains(',')><#assign pic=d.cover_urls?split(',')[0]></#if>
								<li>
									<div class="item">
										<div class="pic"><a target="_blank" href="/huabao/${d.id}.html" title="${d.title}"><img src="${pic}" alt="${d.title}" width=110px height=110px></a></div>
										<div class="desc"><a target="_blank" href="/huabao/${d.id}.html" class="permalink">${d.title}</a></div>
									</div>
								</li>
							</#list>
							</ul>
						</div>
					</td>
					<td width=220px align=center valign="top" style="padding-top:10px;">
						<h3 style="width: 220px;margin: 0;padding: 0;height: 25px;line-height: 25px;color: #900;font-size: 16px;overflow: hidden;">${posterChannel}画报热荐排行</h3>
						<ul class="items-right">
						<#list right as d>
							<li><a href="/huabao/${d.id}.html" target="_blank" title="${d.title}">${d.title}</a></li>
						</#list>
						</ul>
					</td>
				</tr></tbody></table>
			</td></tr>
			<tr><td valign="top">
				<div class="grid grid-100">
					<ul class="shop-list" style="margin-top:0px;">
					<#list bottom as d>
					<#assign pic=d.cover_urls>
					<#if d.cover_urls?contains(',')><#assign pic=d.cover_urls?split(',')[0]></#if>
						<li>
						<div class="item">
							<div class="pic"><a target="_blank" href="/huabao/${d.id}.html" title="${d.title}"><img src="${pic}" alt="${d.title}" width=100px height=100px></a></div>
							<div class="desc"><a target="_blank" href="/huabao/${d.id}.html" class="permalink">${d.title}</a></div>
						</div>
						</li>
					</#list>
					</ul>
				</div>
			</td></tr>
		</tbody>
		</table>
	</div>
</div>
</div>
</#if>
</#macro>