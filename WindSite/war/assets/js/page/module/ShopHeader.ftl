<div class="shop-header" t="${type!'smart'}" image="${image}" image_url="${image_url}" flash="${flash}">
	<div class="hd" style="display:none;"><h3><span>${title}</span></h3></div>
	<div class="bd">
		<#if 'nobg'!=type>
		<#assign height='90'>
		<#if 'flash'==type&&''!=flash>
			<#if !flash?contains('tbcdn')>
			<#assign splits = flash?split('.swf')[0]?split('_')><#assign wh = splits[splits?size - 1]?split('x')>
			<#assign width=wh[0]>
			<#assign height=wh[1]>
			<#else>
			<#assign width='100%'>
			<#assign height=0>
			</#if>
		</#if>
		<div class="header-bd" <#if 'image'!=type&&(height>0)>style="height:${height}px;"</#if>>
			<#if 'image'==type>
			<a href="<#if image_url??&&''!=image_url>${image_url}<#else>javascript:;</#if>" target="_blank"><img src="${image}" style="border:0px;"/></a>
			<#elseif 'flash'==type>
			<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" <#if (height>0)>height="${height}""</#if>  width="${width}> 
			<param name="movie" value="${flash}"> 
			<param name="wmode" value="transparent"> 
			<!--[if !IE]>--> 
			<object type="application/x-shockwave-flash" data="${flash}" <#if (height>0)>height="${height}"</#if> width="${width}"> 
			<param name="wmode" value="transparent"> 
			</object> 
			<!--<![endif]--> 
			</object>
			<#else>
			<embed src="http://a.alimama.cn/widget/yr1/yr1fixed_950_90.swf" flashvars="catid=&count=20&sz=15&type=2&i=${pid}" width="950" height="90" quality="high" wmode="transparent" bgcolor="#ffffff" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />
			<!--<![endif]--> 
			</object>
			</#if>
		</div>
		</#if>
		<#assign pages=[]>
		<div class="nav ${nav_layout}" <#if 'nobg'==type>style="position: static;"</#if>>
			<ul>
				<#if data??&&data?size!=0>
					<#list data as d>
						<#if !(SITEIMPL.versionNo>1.5)&&'channel'==d.t>
						<#else>
						<#if 'sys'==d.t&&d.v="pages"&&extra??&&extra?size!=0>
						<li title="${d.title}" t="${d.t}" v="${d.v}" open="<#if 'S'==d.open>S<#else>B</#if>"><a id="J_HeaderPages" href="javascript:;" target="_blank"><em>${d.title}</em></a></li>
						<#else>
						<li title="${d.title}" t="${d.t}" v="${d.v}" open="<#if 'S'==d.open>S<#else>B</#if>"><a href="${d.url?replace('{pid}',pid)}" <#if 'S'!=d.open||isDesigner>target="_blank"</#if>><em>${d.title}</em></a></li>	
						</#if>
						</#if>
					</#list>
				<#else>
				<#if SITEIMPL??&&SITEIMPL.versionNo!=1.5&&SITEIMPL.versionNo!=1.55>
					<li title="首页" t="sys" v="index" open="S"><a href="/" title="首页"><em>首页</em></a></li>
					<li t="channel" v="channelcode" open="B" title="综合频道"><a target="_blank" href="/channel/channelcode.html"><em>综合频道</em></a></li>
					<li t="channel" v="onsale" open="B" title="特卖频道"><a target="_blank" href="/channel/onsale.html" title="特卖频道"><em>特卖频道</em></a></li>
					<li t="channel" v="channelmall" open="B" title="商城频道"><a target="_blank" href="/channel/channelmall.html" title="商城频道"><em>商城频道</em></a></li>
					<li t="channel" v="lady" open="B" title="女人频道"><a target="_blank" href="/channel/lady.html" title="女人频道"><em>女人频道</em></a></li>
					<li t="channel" v="man" open="B" title="男人频道"><a target="_blank" href="/channel/man.html" title="男人频道"><em>男人频道</em></a></li>
				</#if>	
				</#if>
			</ul>
		</div>
		<#if extra??&&extra?size!=0>
		<#assign www=SITEIMPL.domainName>
		<#if SITEIMPL.www??&&''!=SITEIMPL.www><#assign www=SITEIMPL.www></#if>
		<div id="J_HeaderPagesPopup" class="tb-shop hidden" style="display:none;">
			<div class="cat-items">
				<div class="bd">
				<#list extra as p><div class="cat-item"><a href="http://${www}/pages/${p.pageid}.html" target="_blank" class="cat-hd" title="${p.title}">${p.title}</a></div></#list>
				</div>
			</div>
		</div>
		</#if>
	</div>
</div>