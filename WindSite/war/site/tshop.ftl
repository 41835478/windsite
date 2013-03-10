<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="robots" content="index,follow">

<meta name="keywords" content="${shop.title}">
<meta name="description" content="${shop.title}">
<title>${shop.title}-${sitetitle}</title>
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
<#if appKey??>
<script src="http://l.tbcdn.cn/apps/top/x/sdk.js?appkey=${appKey}"></script>
</#if>
</head>
<body>
<center>
<div id="Shop_Box" 
	style="display:none;padding: 15px 60px; border: 1px solid #D5E5E8; background: #F4FBFF; text-align: center; margin: 20% auto auto; width: 55%">
<#assign href = domainName+'.xintaonet.com'>
<#if www??&&www!=''>
<#assign href = www>
</#if>
<a id="Shop_Go" href="http://${href}" class="shop_click" onclick="">进入淘宝店铺:【${shop.title}】</a></a><br />
<a id="Shop_Go_2" href="http://${href}" class="shop_click">如果您的浏览器没有自动跳转,请点击这里</a></div>
</center>
<#include "/site/template/analytics.ftl">
<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push( [ '_setAccount', 'UA-10891782-8' ]);
	_gaq.push( [ '_trackPageview' ]);
<#if pid??&&pid!=''>_gaq.push(['_trackEvent', 'xt-${pid}', 'shop-d-${sid}', '${shop.title}']);</#if>
	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl'
				: 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
	function goShop(){
		if (typeof(TOP) != 'undefined') {
			try {
				TOP.api({
							method : 'taobao.taobaoke.widget.shops.convert',
							fields : 'click_url',
							seller_nicks : '${shop.nick}',
							nick:'${nick}'
						}, function(resp) {
							try {
								if (resp.taobaoke_shops.taobaoke_shop) {
									var c = resp.taobaoke_shops.taobaoke_shop[0].click_url;
									if(!window.attachEvent){
								      document.write('<input style="display:none" type="button" id="exe" value="AAAAA" onclick="window.location=\''+(c)+'\'">');
								      document.getElementById('exe').click();
								    }else{
								      document.getElementById('Shop_Box').display='';
								      document.getElementById('Shop_Go').href=c;
								      document.getElementById('Shop_Go_2').href=c;
								      document.write('<a style="display:none" href="'+(c)+'" id="exe">AAAAAA</a>');
								      document.getElementById('exe').click();
							   		}
								}
							} catch (e) {
								var href = document.getElementById('Shop_Go_2').href;
								document.getElementById('Shop_Go_2').click();
							}
			
						});
			} catch (e) {
			}
		}
	}
	goShop();
</script>
</body>
</html>