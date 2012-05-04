<div class="pages-setting" style="width:650px;margin:0px auto;">
<#if classes??&&classes?size!=0>
<ul><#list classes as c><li><input name="class-checkbox" type="checkbox" value="${c.classid}" title="${c.classname}"/><label title="${c.classname}">${c.classname}</label></li></#list></ul><div class="ks-clear"></div>
<#else>
您尚未在新淘家园创建文章分类，请进入<a href="/router/site/loginuc?redirect=http://home.xintaonet.com" target="_blank">新淘家园</a>-->发表日志-->(日志标题左侧)新建分类
</#if>
</div>