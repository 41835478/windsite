<div class="layout grid-m ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div name="shopCustom" class="box J_TBox ks-clear">
				<div class="shop-custom no-border">
					<div class="bd">
						<div class="custom-area">
							<div class="store_show_box">
							    <div class="store_show_box_logo">
									<p class="t1"><a href="/gshop/${shop.sid}.html" target="_blank"><img src="http://logo.taobao.com/shop-logo${shop.picPath}" class="pic" alt="${shop.title}"></a></p><p class="t4"><a href="/gshop/${shop.sid}.html" target="_blank"><img src="http://static.xintaonet.com/assets/min/stylesheets/images/jump.gif" class="jump" alt="${shop.title}"></a></p>
								</div>
								<div class="store_show_box_info">
									<ul>
										<li style="width:550px;">店铺名称：<h1><a href="/gshop/${shop.sid}.html" target="_self" title="${shop.title}">${shop.title}</a></h1></li>
										<li style="width:145px;"><img src="http://static.xintaonet.com/assets/min/stylesheets/images/315.gif" alt="品质卖家"></li>
										<li>店铺掌柜：${shop.nick}<a href="http://amos.im.alisoft.com/msg.aw?v=2&amp;uid=${shop.nick}&amp;site=cntaobao&amp;s=2&amp;charset=utf-8" target="_blank"><img src="http://amos.im.alisoft.com/online.aw?v=2&amp;uid=${shop.nick}&amp;site=cntaobao&amp;s=2&amp;charset=utf-8" alt="点击这里给我发消息"></a></li>
										<#if tShop??&&tShop.sellerCredit??&&''!=tShop.sellerCredit><li>卖家信用：<span><img src="http://static.xintaonet.com/assets/min/stylesheets/images/${tShop.sellerCredit}.gif" style="vertical-align: text-bottom;"/></span></li></#if>
										<#if tShop??&&tShop.auctionCount??><li>商品总数：<span>${tShop.auctionCount}件</span></li></#if>
										<#if shop.shopScore??><#assign score=shop.shopScore>
										<li>商品描述：<span class="c-value-no" title="${score.itemScore}/5.0"><i style="width: ${score.itemScore}em"></i></span></li>
										<li>服务态度：<span class="c-value-no" title="${score.serviceScore}/5.0"><i style="width: ${score.serviceScore}em"></i></span></li>
										<li>发货速度：<span class="c-value-no" title="${score.deliveryScore}/5.0"><i style="width: ${score.deliveryScore}em"></i></span></li>
										</#if>
										<li>创店时间：<span>${shop.created?datetime}</span></li><li>更新时间：<span>${shop.modified?datetime}</span></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="layout grid-m0s5 ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div id="J_ItemsHotBox" name="shopDisplay" class="box J_TBox ks-clear J_ShopDetailBox">
				<div class="shop-display">
					<div class="hd"><h3><span>店主推荐</span></h3></div>
					<div class="bd">
						<div class="grid">
							<ul class="shop-list">
					<#list items as d>
						<#assign dTitle=d.title?replace('<span class=H>','')?replace('</span>','')>
						<li>
							<div class="item" co='${d.commission}'>
								<div class="pic"><a target="_blank" href="/titem/${d.numIid}.html" title="${dTitle}"><img src="${d.picUrl?replace("bao/uploaded", "imgextra")}_160x160.jpg" alt="${dTitle}"></a></div>
								<div class="desc"><a target="_blank" href="/titem/${d.numIid}.html" class="permalink">${d.title}</a></div>
								<div class="price"><div class="now"><span>￥ </span><strong>${d.price}元</strong></div></div>
								<div class="sales-amount">最近30天售出<em>${d.volume}</em>笔</div>
							</div>
						</li>
					</#list>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="col-sub J_TRegion">
		<div name="shopRank" class="box J_TBox ks-clear">
			<div class="shop-rank">
				<div class="hd"><h3><span>同类店铺</span></h3></div>
				<div class="bd">
					<div class="rank-tab">
						<div class="rank-panels" style="border-top:0px;">
							<div class="rank-panel">
								<ul><!--#include virtual="/hshop/cats/${shop.cid}.html"--></ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>