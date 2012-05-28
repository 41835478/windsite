<#setting url_escaping_charset='UTF-8'>
<#assign isCat=false>
<#if cat??><#assign isCat=true></#if>
<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="keywords" content="<#if isCat>${cat.name}<#else>${q}</#if>,${sitetitle}">
<meta name="description" content="${sitetitle}<#if isCat>提供为您带来有关${cat.name}产品批发价格,品牌专卖店新品，厂家专卖产品等信息,是${cat.name}选购的最佳网站<#else>帮你找到${q}的所有关于价格，商家，产品图片和评测信息，你可以通过比较${q}不同商家的报价、服务、用户评论，帮您做出最好的购买选择</#if>">
<title><#if isCat>${cat.name}<#else><#if q??&&q!=''>${q}<#else>类目${cid}搜索</#if></#if>-${sitetitle}</title>
</head>
<body>
<iframe frameborder="0" scrolling="no" src="${clickUrl}" marginwidth="0" marginheight="0" width="100%"></iframe>
</body>
</html>
