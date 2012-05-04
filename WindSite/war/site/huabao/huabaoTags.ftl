<#setting url_escaping_charset='utf8'>
<@p.huabaoHeader>
<meta name="keywords" content="淘画报 淘宝画报 图片 美图 购物 导购  服饰 搭配 明星 街拍 红人 美容 彩妆">
<meta name="description" content="${sitetitle}画报频道提供精美图库，涵盖服饰、女装、男装、美容、居家、亲子、数码、明星、旅游、宠物、网络红人、创意新品等内容，同时图上有精确的商品信息，可进行一站式购物。这是一个全新的图片导购平台，一种全新的图片网购模式。">
<title>热门标签-导购画报- ${sitetitle}</title>
</@p.huabaoHeader>
<div class="layout grid-m ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
		<div class="box J_TBox ks-clear">
			<div class="shop-categoryvancl">
				<div class="hd"><h3><span>热门标签</span></h3></div>
				<div class="bd">
					<div class="kind-area ks-clear" style="padding:10px;background:white;padding-left:20px;">
				        <div class="moreKind" style="width:100%;">
				          <ul><#if tags??&&tags?size!=0><#list tags as t><li style="width:120px"><a href="/router/huabao/search?tag=${t.title?url}" title="${t.title}"  target="_blank">${t.title}</a>[${t.nums}]</li></#list></#if></ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
	</div>
</div>
<@p.pageFooter>
</@p.pageFooter>