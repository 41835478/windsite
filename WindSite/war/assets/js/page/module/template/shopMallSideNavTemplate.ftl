<#setting url_escaping_charset='UTF-8'>
<div id="J_MallCategory" class="mall-category" style="z-index: 15;">
<h2 class="title"><a href="/ymall.html" target="_blank">所有商城分类</a></h2>
<div class="entity">
<div class="items">
<ul class="item">
<#if cats??&&cats?size!=0><#list cats as c><li class="J_MenuItem" cat="${c.id}"><a class="c1"><s></s><i></i>${c.title}</a></li></#list></#if>
</ul>
</div>
</div>
<#if cats??&&cats?size!=0><#list cats as c>
<div class="J_MallPopSubCategory pop-subcategory ks-hidden" cat="${c.id}">
<div class="shadow"><b class="tl"></b><b class="tr"></b>
<div class="entity-main J_SubViewItem">
<div class="lst-subcategory">
<h3>${c.title}：</h3>
<dl class="J_HotMenuItem ks-clear">
<#if c.malls??&&c.malls?size!=0><#list c.malls as m><#assign mallTitle=m.title?replace('CPS|ROI|CPA|CPC','','ir')><dt><a href="/ymall-${m.b2cId}.html" target="_blank" title="${m.topRate?html}">${mallTitle}<strong class="b2c-fl">（最高返利${m.topRate}）</strong></a><i></i></dt></#list></#if>
<div class="ks-clear"></div>
</dl>
</div>
</div>
<b class="bl"></b><b class="br"></b></div>
</div>
</#list></#if>
</div>