<#setting url_escaping_charset='UTF-8'>
<#if floor??>
<#assign left=floor.floorLeft middle=floor.floorMiddle right=floor.floorRight bottom=floor.floorBottom brands=floor.brands>
<table width=100% class="f${floor.sortOrder}" style="table-layout:fixed;"><tbody><tr>
<td width=240px style="border-bottom: 2px solid #990D1B;"><h3 class="floorHd">${floor.title}</h3></td>
<td align=right style="border-bottom: 2px solid #CCC;">
<div class="floorTop"><#if brands??&&brands?size!=0><#list brands as m><a href="http://s.click.taobao.com/t_9?p=${'$'+'{pid}'}&l=${m.url?url}" target="_blank">${m.title}<i class="cArror"></i></a></#list></#if></div>
</td></tr></tbody></table>
<table width=100% class="f${floor.sortOrder}" style="table-layout:fixed;">
<tbody><tr><td width=240px valign=top>
<#if left??&&left.images??&&left.images?size!=0>
<div class="floorSlide slider-promo J_Slider J_TWidget" style="height:300px;"><ul class="lst-main f-slideCon ks-switchable-content">
<#list left.images as m>
<li><a href="http://s.click.taobao.com/t_9?p=${'$'+'{pid}'}&l=${m.url?url}" title="${m.title}" target="_blank"><img src="${m.image}" width="240" height="300" alt="${m.title}"></a></li>
</#list>
</ul><#if (left.images?size>1)><ul class="f-trigger ks-clear"><#list left.images as s><li class="<#if s_index==0>ks-active</#if>">${s_index+1}</li></#list></ul></#if>
</div>
</#if>
</td>
<td width=515px valign=top>
<#if middle??&&middle.images??&&middle.images?size!=0>
<ul class="mainCon"><#list middle.images as m><li><a href="http://s.click.taobao.com/t_9?p=${'$'+'{pid}'}&l=${m.url?url}" title="${m.title}" target="_blank"><img src="${m.image}" width="170" height="150" alt="${m.title}"><span>${m.title}</span></a></li></#list></ul>
<#elseif middle??&&middle.cells??&&middle.cells?size!=0>
<#list middle.cells as c>
<#assign top_=c.top middle_=c.middle bottom_=c.bottom>
<div class="mainBox">
<p class="itemPic"><a target="_blank" href="http://s.click.taobao.com/t_9?p=${'$'+'{pid}'}&l=${top_.url?url}" title="${top_.title}"><img height="160" width="160" src="${top_.image}" alt="${top_.title}"></a></p>
<ul class="newsList">
<#list middle_ as m><li><a target="_blank" href="http://s.click.taobao.com/t_9?p=${'$'+'{pid}'}&l=${m.url?url}">${m.title}</a></li></#list>
<li class="nl-more"><p><a target="_blank" href="http://s.click.taobao.com/t_9?p=${'$'+'{pid}'}&l=${bottom_?url}">更多<s>&gt;&gt;</s></a></p></li>
</ul>
</div>
</#list>
</#if>
</td><td width=192px valign=top>
<#if right??>
<#if right.grids??&&right.grids?size!=0>
<ul class="kindList ks-clear">
<#list right.grids as m>
<li><a target="_blank" href="http://s.click.taobao.com/t_9?p=${'$'+'{pid}'}&l=${m.url?url}"><i class="klIco${m_index+1}"></i><span>${m.title}</span></a></li>
</#list>
</ul>
<#elseif right.boxs??&&right.boxs?size!=0>
<#list right.boxs as m>
<div class="subBox"><a target="_blank" href="http://s.click.taobao.com/t_9?p=${'$'+'{pid}'}&l=${m.url?url}" title="${m.title}"><img height="100" width="190" src="${m.image}" alt="${m.title}"></a></div>
</#list>
</#if>
</#if>
</td></tr>
</tbody>
</table>
<#if bottom??>
<table width=100% style="table-layout:fixed;"><tbody><tr><td width=945px><ul class="brandList ks-clear" style="${bottom.style}">
<#if bottom.logos??&&bottom.logos?size!=0><#list bottom.logos as m><li<#if m_index==11> class="bl-more"</#if>><a target="_blank" href="http://s.click.taobao.com/t_9?p=${'$'+'{pid}'}&l=${m.url?url}" title="${m.title}"><span>${m.title}</span></a></li></#list></#if></ul>
</td></tr></tbody></table>
</#if>
<#else>
模块数据为空
</#if>