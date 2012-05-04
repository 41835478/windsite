<div class="shop-template shop-custom no-border" flash="${flash}">
<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
<div class="bd">
<div class="custom-area">
<#if bd??&&''!=bd>${bd}<#else>自定义内容区内容为空，请重新编辑（请不要添加js，css代码），或者删除此模块</#if>
</div>
</div>
</div>