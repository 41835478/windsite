<#setting url_escaping_charset='UTF-8'>
<#if floor??>
<#assign left=floor.floorLeft middle=floor.floorMiddle right=floor.floorRight words=floor.words>
<table width=100% class="f${floor.sortOrder}" style="table-layout:fixed;"><tbody><tr>
<td width=190px style="border-bottom: 2px solid #990D1B;"><h3 class="f-hd">${floor.title}</h3></td>
<td width=755px align=right style="border-bottom: 2px solid #CCC;">
<div class="f-ft"><#if words??&&words?size!=0><#list words as m><a href="/search?q=${m?url}" target="_blank">${m}</a></#list></#if></div>
</td></tr></tbody></table>
<table width=100% class="f${floor.sortOrder}" style="table-layout:fixed;">
<tbody><tr><td width=190px valign=top><#include "assets/js/page/module/extra/floor_left_${floor.sortOrder}.ftl"></td>
<td width=545px valign=top>
<#if middle??&&middle.images??&&middle.images?size==3>
<#if !middle.isSlide>
<#list middle.images as m>
<div class="m-box f-otitle"><a href="http://s.click.taobao.com/t_9?p=${'$'+'{pid}'}&l=${m.url?url}" title="${m.title}" target="_blank"><img src="${m.image}" width="170" height="240"><span>${m.title}</span></a></div>
</#list>
<#else>
<div class="slider-promo J_Slider J_TWidget" style="height:240px;">
	<ul class="lst-main ks-switchable-content">
		<#list middle.images as m><li style="height:240px;"><a href="http://s.click.taobao.com/t_9?p=${'$'+'{pid}'}&l=${m.url?url}" target="_blank"><img src="${m.image}" alt="${m.title}" width="540" height="240"></a></li></#list>
	</ul>
	<ul class="f-trigger ks-clear"><#list middle.images as m><li><a href="http://s.click.taobao.com/t_9?p=${'$'+'{pid}'}&l=${m.url?url}" target="_blank">${m.title}</a><s class="bg"></s></li></#list></ul>
</div>
</#if>
</#if>
</td><td width=212px valign=top>
<#if right??>
<#if right.grids??&&right.grids?size!=0>
<ul class="s-girds clearfix f-otitle">
<#list right.grids as m>
<li><a href="http://s.click.taobao.com/t_9?p=${'$'+'{pid}'}&l=${m.url?url}" title="${m.title}" target="_blank"><img src="${m.image}" width="86" height="75"><span>${m.title}</span></a></li>
</#list>
</ul>
</#if>
<#if right.links??&&right.links?size!=0>
<ul class="s-ul s-ul-${right.links?size}">
<#list right.links as m>
<li><a href="http://s.click.taobao.com/t_9?p=${'$'+'{pid}'}&l=${m.url?url}" title="${m.title}" title="${m.title}" target="_blank">${m.title}</a></li>
</#list>
</ul>
</#if>
<#if right.boxs??&&right.boxs?size!=0>
<#list right.boxs as m>
<div class="s-box"><a href="http://s.click.taobao.com/t_9?p=${'$'+'{pid}'}&l=${m.url?url}" title="${m.title}" target="_blank"><img src="${m.image}" width="190" height="70"></a></div>
</#list>
</#if>
</#if>
</td></tr></tbody>
</table>
<#else>
模块数据为空
</#if>