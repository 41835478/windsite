<#setting url_escaping_charset='utf8'> 
<@p.huabaoHeader hType="fashion">
<meta name="keywords" content="淘画报 淘宝画报 图片 美图 购物 导购  服饰 搭配 明星 街拍 红人 美容 彩妆">
<meta name="description" content="${sitetitle}服饰画报频道--关于女人的服装类资讯，潮流、搭配、单品、鞋包、饰品、明星、街拍、韩国馆所有资讯！你能看到的，在淘宝上一定买得到！">
<title>服饰画报- ${sitetitle}</title>
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
<#include  "//huabao/fashion.html" parse=false encoding="utf8">
<@p.pageFooter>
</@p.pageFooter>