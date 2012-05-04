<#setting url_escaping_charset='utf8'> 
<@p.huabaoHeader hType="tour">
<meta name="keywords" content="淘画报 淘宝画报 图片 美图 购物 导购  服饰 搭配 明星 街拍 红人 美容 彩妆">
<meta name="description" content="${sitetitle}旅游画报频道,最靓景点、最热线路、最低价格">
<title>旅游画报- ${sitetitle}</title>
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
								<li rel="mall"><a href="javascript:;" target="_self">商城</a></li>
								<li rel="shop"><a href="javascript:;" target="_self">店铺</a></li>
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
<#include  "//huabao/tour.html" parse=false encoding="utf8">
<@p.pageFooter>
</@p.pageFooter>