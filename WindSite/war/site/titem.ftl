<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="robots" content="index,follow">

<meta name="keywords" content="${detail.item.title}">
<meta name="description" content="${detail.item.title}">
<#if detail.clickUrl??&&''!=detail.clickUrl><meta http-equiv="refresh" content="0;url=${detail.clickUrl}"></#if>
<title>${detail.item.title}-${sitetitle}</title>
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
<#if pid??&&pid!=''>_gaq.push(['_trackEvent', 'xt-${pid}', 'item-d-${detail.item.nick}-${detail.item.numIid}', '${detail.item.title}']);</#if>
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
<#if detail.clickUrl??&&''!=detail.clickUrl>
<center>
<div
	style="display:none;padding: 15px 60px; border: 1px solid #D5E5E8; background: #F4FBFF; text-align: center; margin: 20% auto auto; width: 55%">
<a href="${detail.clickUrl}">进入淘宝商品:【${detail.item.title}】</a></a><br />
<a href="${detail.clickUrl}">如果您的浏览器没有自动跳转,请点击这里</a></div>
</center>
<#else>
<center>
<div
	style="padding: 15px 60px; border: 1px solid #D5E5E8; background: #F4FBFF; text-align: center; margin: 20% auto auto; width: 55%">
淘宝商品:【${detail.item.title}】已被下架，返回<a href="/">购物首页</a>重新挑选商品</a><br /></div>
</center>
</#if>
<div style="display:none;">
<#include "/site/template/analytics.ftl">
</div>
</body>
</html>