<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="robots" content="index,follow">

<meta name="keywords" content="${title}新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚">
<meta name="description" content="${title} - 新淘网实现了多种酷炫图片组件封装，向广大普通互联网用户提供一站式的建站方案，大幅度降低建站门槛，会用鼠标就可以拖拽生成独立而漂亮的淘宝推广网站，让更多的普通互联网用户成为专业淘客、推广淘宝、赚取佣金">
<meta http-equiv="refresh" content="0;url=${redirect}">
<title>${title}-新淘网</title>
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
<#if pid??&&pid!=''>_gaq.push(['_trackEvent', 'xt-${pid}', 'key-${cid!'0'}', '${title}']);</#if>
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
<a href="${redirect}">搜索关键词:【${title}】</a></a><br />
<a href="${redirect}">如果您的浏览器没有自动跳转,请点击这里</a></div>
</center>
<#include "/site/template/analytics.ftl">
</body>
</html>