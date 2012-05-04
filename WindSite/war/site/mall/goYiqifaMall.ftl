<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="robots" content="index,follow">
<#assign mallTitle="商城">
<#if mall??><#assign mallTitle=mall.title?replace('CPS|ROI|CPA|CPC','','ir')></#if>
<#assign clickUrl=mall.url>
<#if action??&&action.pk&&action.pk.clickUrl??><#assign clickUrl=action.pk.clickUrl></#if>
<meta name="keywords" content="${mallTitle}">
<meta name="description" content="${mallTitle}:${mall.url}">
<#if clickUrl??&&clickUrl!=''><meta http-equiv="refresh" content="0;url=${clickUrl}"></#if>
<title>${mallTitle}-${sitetitle}</title>
<style type="text/css">
body {
	background: #fff;
	color: #AFCE50;
	font: 9pt/ 200% Verdana;
}
a {
	text-decoration: none;
	color: #2B76B0
}
a:hover {
	text-decoration: underline;
}
img {
	border: 0;
}
</style>
<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push( [ '_setAccount', 'UA-10891782-8' ]);
	_gaq.push( [ '_trackPageview' ]);
<#if pid??&&pid!=''>_gaq.push(['_trackEvent', 'xt-${pid}', 'mall-d-${mall.id}', '${mall.title}']);</#if>
	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl'
				: 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
</script>
</head>
<body>

<center>
<div
	style="display:none;padding: 15px 60px; border: 1px solid #D5E5E8; background: #F4FBFF; text-align: center; margin: 20% auto auto; width: 55%">
<a href="${clickUrl}">进入商城:【${mallTitle}】</a></a><br />
<a href="${clickUrl}">如果您的浏览器没有自动跳转,请点击这里</a></div>
</center>
<#include "/site/template/analytics.ftl">
</body>
</html>