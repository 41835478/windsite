<#assign filePath = user.user_id?substring(user.user_id?length-2,user.user_id?length)>
<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<META HTTP-EQUIV="pragma" CONTENT="no-cache"/>
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate"/>
<META HTTP-EQUIV="expires" CONTENT="0"/>
<meta name="keywords" content="${page.keywords}"/>
<meta name="description" content="${page.description}"/>
<#if page.isIndex??&&page.isIndex>
<!--#include virtual="/zone/${filePath}/${user.user_id}/metadata.html"-->
</#if>
<title><#if page.isIndex??&&page.isIndex>${page.title}<#else>${page.title}-${site.title}</#if></title>
<#if site_ico??&&''!=site_ico>
<link rel="shortcut icon" type="image/ico" href="${site_ico}">
</#if>
<link href="http://static.xintaonet.com/assets/min/stylesheets/xintao.min.css?v=${dateVersion}" rel="stylesheet"/>
<#if !page.isIndex&&page.skin??&&''!=page.skin><#assign skin=page.skin></#if>
<#if !page.isIndex&&page.css??&&''!=page.css><#assign theme=page.css></#if>
<#if skin??&&''!=skin>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/${skin}.css" rel="stylesheet"/>
<#else>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/yellow.css" rel="stylesheet"/>
</#if>
<#if versionNo??&&(versionNo>1)>
<#if theme??&&''!=theme>
<link href="http://static.xintaonet.com/assets/min/stylesheets/theme/${theme}.css" rel="stylesheet"/>
</#if>
</#if>
<#if skin??&&''!=skin>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/${skin}_fixed.css?v=${dateVersion}" rel="stylesheet"/>
<#else>
<link href="http://static.xintaonet.com/assets/min/stylesheets/skin/yellow_fixed.css?v=${dateVersion}" rel="stylesheet"/>
</#if>
</head>
<body>
<#macro pageLayout modules=[]>
<#if modules??&&modules?size!=0>
<#list modules as m>
${"$"+"{module('"+m.id+"','"+user.nick+"','"+pid+"','false')}"}
</#list>
</#if>
</#macro>
<div id="site-nav"><div id="site-nav-bd"></div></div>
<div id="content" class="tb-shop eshop<#if page.isIndex> head-expand</#if>">
${content}
<#if isDesigner??&&isDesigner>
<!--page ft-->
<#include "/site/designer/include/pageContentFooter.ftl">
</div>
<div id="footer"></div>
<#else>
<!--#include virtual="/zone/${filePath}/${user.user_id}/footer.html"-->
</#if>
<#if P_SITEIMPL??&&P_SITEIMPL.qq_appkey??&&P_SITEIMPL.www??>
<script type="text/javascript" src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="${P_SITEIMPL.qq_appkey}" data-redirecturi="http://${P_SITEIMPL.www}/zone/qc_callback.html" charset="utf-8" ></script>
</#if>
<#if P_SITEIMPL??&&P_SITEIMPL.taobao_appkey??&&P_SITEIMPL.www??>
<script src="http://a.tbcdn.cn/apps/top/x/sdk.js?appkey=${taobao_appkey}"></script>
</#if>
<script src="/assets/min/js/page/page.min.js?v=${dateVersion}"></script>
<!--Designer-->
<script type="text/javascript">
var DEBUG=false,ISDESIGNER=false,SITEID='${site.id}',APP=${user.appType},PAGEID='${page.id}',PAGEADSID='${page.pageid}',USERID='${user.user_id}',USERNICK='${user.nick}',PPID='${user.pid}',PID='${user.pid}'<#if versionNo??>,VERSIONNO=${versionNo}<#else>,VERSIONNO=1</#if>;
</script>
</body>
</html>
