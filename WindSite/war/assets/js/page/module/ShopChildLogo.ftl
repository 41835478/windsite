<div class="shop-child-logo no-border">
<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
<div class="bd">
<#if cat??&&''!=cat>
<#include "assets/js/page/module/extra/child_logo_${cat}.ftl">
<#else>
未指定母婴店铺类别
</#if>
</div>
</div>