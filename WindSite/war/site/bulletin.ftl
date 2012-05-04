<#if bulletins??&&bulletins?size!=0>
<#list bulletins as b><li><a target="_blank" title="${b.subject}" href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=${b.blogid}">${b.subject}</a></li></#list>
</#if>