<div class="shop-dianpu-list no-border">
<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
<div class="bd">
<#if data??&&data?size!=0>
<div class="shop-dianpu-div">
	<#assign map={'0','red','1':'yellow','2':'green','3':'blue','4':'purple','5':'purple'}>
	<#list data as d>
	<div class="shop-dianpu-box ${map[d_index+'']}"<#if d_index==0> style="margin-top:0px;"</#if>>
		<div class="shop-dianpu-inner<#if d_index==0> first</#if>">
			<ul>
				<#if d.cats??&&d.cats?size!=0>
				<#assign root=d.root>
				<#list d.cats as c>
				<li>
					<h3><a href="/dianpu/${root.name}/${c.name}.html">${c.title}</a></h3>
					<div class="shop-dianpu-ctr">
					<#if c.shops??&&c.shops?size!=0><#list c.shops as s><a class="shop-dianpu-a" data-pic="${s.picPath}" data-zhuying="${s.zhuying}" data-haoping="${s.haoping}" data-credit="${s.sellerCredit}" data-city="${s.city}" data-sid="${s.sid}" href="/tshop/${s.sid}.html" target="_blank">${s.shortTitle}</a></#list></#if>
					</div>
					<div class="shop-dianpu-more"><a href="/dianpu/${root.name}/${c.name}.html">更多 »</a></div>
				</li>
				</#list></#if>
			</ul>
		</div>
		<div class="shop-dianpu-cbbl"></div>
		<div class="shop-dianpu-cbbr"></div>
	</div>
	</#list>
</div>
</#if>
</div>
</div>