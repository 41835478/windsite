<#setting url_escaping_charset='utf8'> 
<@p.huabaoHeader hType="man">
<meta name="keywords" content="淘画报 淘宝画报 图片 美图 购物 导购  服饰 搭配 明星 街拍 红人 美容 彩妆">
<meta name="description" content="${sitetitle}男人画报频道,从多个角度诠释男人时尚生活方式，包含各种男性产品(服饰、着装、品牌、汽车、奢侈品、护肤品…）精品资讯导购及精彩专题活动等,让你尽享网上在线购物乐趣! 淘宝,掏宝,男人购物,男人帮,好男人,时尚,潮流,型男,好男儿,时尚,潮流,热卖,奢侈品,新品,导购指南,资讯频道">
<title>男人画报- ${sitetitle}</title>
</@p.huabaoHeader>
<div class="layout grid-m ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
		<div name="itemSearch" class="box J_TBox ks-clear">
			<div class="item-search">
				<div class="hd" style="display:none;"><h3><span>搜索画报</span></h3></div>
				<div class="bd" style="border-bottom-width:0px;background-color:transparent;">
					<div class="shop-custom item-search-form">
						<form method="get" action="/router/huabao/search">
							<fieldset><legend>搜索</legend>
							<ul class="search-tab">
								<li class="selected" rel="poster"><a href="javascript:;" target="_self" class="self">画报</a></li>
								<li rel="item"><a href="javascript:;" target="_self" class="self">宝贝</a></li>
							</ul>
							<div class="search-auto" style="margin-top:-3px;">
								<input name="is_mall" type="hidden" value="">
								<input name="q" class="search-input" value="${words}"  autocomplete="off">
								<input type="button" id="search-button"/>
							</div>
						</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
		</div>
	</div>
</div>
<#include  "//huabao/man.html" parse=false encoding="utf8">
<@p.pageFooter>
</@p.pageFooter>