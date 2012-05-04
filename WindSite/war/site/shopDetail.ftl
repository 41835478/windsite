<#setting url_escaping_charset='utf8'> 
<@p.pageHeader>
<meta name="keywords" content="${shop.title}">
<meta name="description" content="${shop.title},掌柜:${shop.nick}">
<title>${shop.title}- ${sitetitle}</title>
</@p.pageHeader>
<div class="layout grid-m ks-clear ks-hidden">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
		</div>
	</div>
</div>
<div class="layout grid-m0s5 ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			
		</div>
	</div>
	<div class="col-sub J_TRegion">
		<div name="shopSearch" class="box J_TBox ks-clear">
			<div class="shop-search">
				<div class="hd"><h3><span>搜索淘宝宝贝</span></h3></div>
				<div class="bd">
					<div class="search-form">
						<form name="SearchForm" action="/search" method="get" target="_blank">
							<input type="hidden" name="cid" value="0">
							<ul>
								<li class="keyword"><label for="keyword">关键字：</label><input type="text" size="18" name="q" id="KeywordBox" value="" onfocus="this.select();"></li>
								<li class="price"><label for="price">价格：</label><input id="price1" type="text" name="start_price" class="price J_CheckInput" size="4" value="">到<input id="price2" name="end_price" class="price J_CheckInput" type="text" size="4" value=""></li>
								<li class="submit"><button type="submit" class="button">搜索</button></li>
							</ul>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<@p.pageFooter>
var SELLERNICK='${shop.nick}',CID='${shop.cid}';
<#if pid??&&pid!=''>
_gaq.push(['_trackEvent', 'xt-${pid}', 'shop-d-${shop.sid}', '${shop.title}']);
</#if>
$(function(){
	$('#J_ItemDetail a[href*="item.taobao.com"]').each(function(){
		var href = $(this).attr('href');
		if(href.indexOf('?id=')!=-1||href.indexOf('?item_num_id=')!=-1){
			if(href.indexOf('&')!=-1){
				$(this).attr('href','/titem/'+href.split('&')[0].split('=')[1]+'.html');
			}else{
				$(this).attr('href','/titem/'+href.split('=')[1]+'.html');
			}
		}
	});
});
</@p.pageFooter>
			