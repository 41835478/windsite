<div class="shop-dianpu-list no-border">
<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
<div class="bd">
<#if data??&&data?size!=0>
<div class="shop-dianpu-div">
	<div class="shop-dianpu-box<#if color??> ${color}<#else> red</#if>" style="margin-top:0px;">
		<div class="shop-dianpu-inner first">
		<#if SITEIMPL.versionNo==1>
			<div>您当前使用的是新淘网普及版(免费)，无法使用淘店铺模块，请删除此模块，或者升级为淘客返利版（月租型）或卖家版</div>
		<#else>
		<#if adType??&&'mall'==adType>
			<ul>
				<#list data as c>
				<li>
					<h3><a href="/ymall.html?cat=${c.id}" target="_blank">${c.title}</a></h3>
					<div class="shop-dianpu-ctr">
					<#if c.malls??&&c.malls?size!=0><#list c.malls as m><#assign mallTitle=m.title?replace('CPS|ROI|CPA|CPC','','ir') mallCat=c><a class="shop-mall-a" data-pic="${m.logo}" data-rate="${m.topRate}" data-cat="<#if mallCat??>${mallCat.title}</#if>" data-start="${m.startDate}" data-end="${m.endDate}" data-b2cId="${m.b2cId}" href="/ymall-${m.b2cId}.html" target="_blank">${mallTitle}</a></#list></#if>
					</div>
					<div class="shop-dianpu-more"><a href="/ymall.html?cat=${c.id}" target="_blank">更多 »</a></div>
				</li>
				<#if c_index==4><#break></#if>
				</#list>
			</ul>
		<#else>
			<ul>
				<#list data as c>
				<#assign url="/dianpu/">
				<#if c.parentCat??><#assign url=url+c.parentCat.name+'/'+c.name+'.html'><#else><#assign url=url+c.name+'.html'></#if>
				<li>
					<h3><a href="${url}" target="_blank">${c.title}</a></h3>
					<div class="shop-dianpu-ctr">
					<#if c.shops??&&c.shops?size!=0><#list c.shops as s><a class="shop-dianpu-a" data-pic="${s.picPath}" data-zhuying="${s.zhuying}" data-haoping="${s.haoping}" data-credit="${s.sellerCredit}" data-city="${s.city}" data-sid="${s.sid}" href="/tshop/${s.sid}.html" target="_blank">${s.shortTitle}</a></#list></#if>
					</div>
					<div class="shop-dianpu-more"><a href="${url}" target="_blank">更多 »</a></div>
				</li>
				<#if c_index==4><#break></#if>
				</#list>
			</ul>
		</#if>	
		</#if>	
		</div>
		<div class="shop-dianpu-cbbl"></div>
		<div class="shop-dianpu-cbbr"></div>
	</div>
</div>
</#if>
</div>
</div>