<#if shop??>
<#setting url_escaping_charset='utf8'> 
<div class="shop-intro">
	<div class="name"><span style="font-size:14px;font-weight:bold;"><a href="/search?nicks=${shop.nick?url}" target="_blank">${shop.title}</a></span></div>
	<div align=center><a href="/search?nicks=${shop.nick?url}" target="_blank"><img src="<#if shop.picPath??&&shop.picPath!=''>http://logo.taobao.com/shop-logo${shop.picPath}<#else>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png</#if>" width="168px" height="168px"></a></div>
	<div class="extend">
		<ul>
			<li><label>掌柜名称：</label><a href="/search?nicks=${shop.nick?url}" target="_blank">${shop.nick}</a></li>
			<li><label>创店时间：</label>${shop.created?string('yyyy-MM-dd')}</li>
		</ul>
	</div>
	<#if shop.shopScore??>
	<div class="grade"><h4>店铺动态评分</h4>
		<ul>
			<li><span>宝贝与描述相符：</span><span class="c-value-no"><i style="width: ${shop.shopScore.itemScore}em"></i></span>${shop.shopScore.itemScore}</li>
			<li><span>卖家的服务态度：</span><span class="c-value-no"><i style="width: ${shop.shopScore.serviceScore}em"></i></span>${shop.shopScore.serviceScore}</li>
			<li><span>卖家发货的速度：</span><span class="c-value-no"><i style="width: ${shop.shopScore.deliveryScore}em"></i></span>${shop.shopScore.deliveryScore}</li>
		</ul>
	</div>
	</#if>
	<div class="other"></div>
</div>
</#if>