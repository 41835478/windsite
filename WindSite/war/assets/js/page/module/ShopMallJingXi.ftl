<div class="shop-mall-jingxi no-border">
<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
<div class="bd">
<#if data??&&(data?size>=6)&&adType??&&''!=adType>
<#assign left=data[0..2] right=data[3..5]>
<#switch adType>
<#case 'item'>
<table>
	<tbody>
		<tr>
			<td valign=top>
				<div class="jingxi-section jingxi-left">
					<div class="jingxi-box">
						<div class="items">
							<a class="current" href="/titem/${left[0].num_iid}.html" target="_blank" title="" style="background-image: url(${left[0].pic_url?replace("bao/uploaded", "imgextra")}_120x120.jpg);"></a>
							<#list left as d>
							<a class="item${d_index} trigger" href="/titem/${d.num_iid}.html" target="_blank" title="" style="background-image: url(${d.pic_url?replace("bao/uploaded", "imgextra")}_80x80.jpg);" data-image="${d.pic_url?replace("bao/uploaded", "imgextra")}_120x120.jpg" data-round="${3-d_index}"></a>
							</#list>
							<div class="round round-3"></div>
						</div>
						<div class="commendIcon"></div>
					</div>
					<#list left as d>
					<div class="detail detail-${3-d_index}" style="display:  <#if (d_index==0)>block<#else>none</#if>;">
						<div class="jingxi-article">
							<h3>${d.title}</h3>
							<p class="surprisePrice">惊喜价：<span class="rmb">¥</span><em>${d.price}</em></p>
						</div>
						<div class="buttonZone"><!--<p>已售出<em>${d.volume}</em>件</p>--><a class="button" href="/titem/${d.num_iid}.html" title="${d.title?html}" target="_blank" style="margin-top: 20px;"></a></div>
					</div>
					</#list>
				</div>
			</td>
			<td valign=top>
				<div class="jingxi-section jingxi-right">
					<div class="jingxi-box">
						<div class="items">
							<a class="current" href="/titem/${right[0].num_iid}.html" target="_blank" title="" style="background-image: url(${right[0].pic_url?replace("bao/uploaded", "imgextra")}_120x120.jpg);"></a>
							<#list right as d>
							<a class="item${d_index} trigger" href="/titem/${d.num_iid}.html" target="_blank" title="" style="background-image: url(${d.pic_url?replace("bao/uploaded", "imgextra")}_80x80.jpg);" data-image="${d.pic_url?replace("bao/uploaded", "imgextra")}_120x120.jpg" data-round="${3-d_index}"></a>
							</#list>
							<div class="round round-3"></div>
						</div>
					</div>
					<#list right as d>
					<div class="detail detail-${3-d_index}" style="display: <#if (d_index==0)>block<#else>none</#if>;">
						<div class="jingxi-article">
							<h3>${d.title}</h3>
							<p class="surprisePrice">惊喜价：<span class="rmb">¥</span><em>${d.price}</em></p>
						</div>
						<div class="buttonZone"><!--<p>已售出<em>${d.volume}</em>件</p>--><a class="button" href="/titem/${d.num_iid}.html" title="${d.title?html}" target="_blank" style="margin-top: 20px;"></a></div>
					</div>
					</#list>
				</div>
			</td>
		</tr>
	</tbody>
</table>
<#break>
<#case 'shop'>
<#break>
<#case 'poster'>
<#break>
</#switch>
</#if>
</div>
</div>