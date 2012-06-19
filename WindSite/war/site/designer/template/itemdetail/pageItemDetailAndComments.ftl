<script>var SELLERNICK='${item.nick}',CID='${item.cid}';</script>
<div id="detail" class="xt-box">
	<div class="xt-detail-hd"><h3>${item.title}</h3></div>
	<div class="xt-detail-bd xt-clear">
		<div class="xt-summary xt-clear">
			<div class="xt-property">
				<div class="xt-wrap">
					<ul class="xt-meta">
						<li class="xt-detail-price xt-clearfix"><span>一 口 价：</span><strong>${item.price}</strong>元 </li>
						<!--<li class="xt-sold-out"><span>30天售出：</span><em>${item.volume}</em>件</li>-->
						<li><span>运　　费：</span>平邮　${item.postFee} 元 快递　${item.expressFee}　元 EMS　${item.emsFee}　元</li>
						<li><span>库存数量：</span>${item.num}件</li>
						<li style="display:none;"><span>下架时间：</span>${item.delistTime?datetime}</li>
						<li><span>卖　　家：</span>${item.nick}</li>
						<li><span>卖家信用：</span><img src="/assets/min/images/credit/<@ws.credit detail.sellerCreditScore></@ws.credit>.gif"/></li>   
						<#if item.location??><li><span>所在地区：</span>${item.location.state} ${item.location.city}</li></#if>
					</ul>
					<div class="xt-key">
						<div class="xt-skin xt-naked">
							<div class="xt-action xt-clearfix" style="margin-left:20px;">
								<div class="xt-btn-buy"><a id="J_LinkBuy" href="/gitem/${item.numIid}.html" class="fl-link" target="_blank" style="width:170px;"><img src="http://static.xintaonet.com/assets/min/stylesheets/images/gomai.gif"></a></div>
								<#if shopId??&&''!=shopId><div class="xt-btn-buy"><a href="/gshop/${shopId}.html" class="fl-link" target="_blank" style="width:170px;"><img src="http://static.xintaonet.com/assets/min/stylesheets/images/gozhanggui.gif"></a></div></#if>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="xt-gallery">
				<div class="xt-booth xt-pic xt-s310" data-id="${item.numIid}"><a id="J_LinkBuy" href="/gitem/${item.numIid}.html" target="_blank"><#if item.picUrl??><img id="XT_ImgBooth" src="${item.picUrl?replace("bao/uploaded", "imgextra")}_310x310.jpg" alt="${item.title}" title="${item.title}"></a></#if></div>
			</div>
		</div>
	</div>
</div>
<div name="shopCustom" class="box J_TBox ks-clear">
	<div class="shop-custom no-border">
		<div class="bd">
			<ul class="tabbar" id="XT_TabBar">
				<li class="selected"><a href="javascript:;">宝贝详情</a></li>
				<li data-box="XT_ReviewsBox"><a href="javascript:;">评价详情(<em class="XT_ReviewsCount">${totalResults}</em>)</a></li>
			</ul>
		</div>
	</div>
</div>
<div id="XT_DescriptionBox" name="shopCustom" class="box J_TBox ks-clear">
	<div class="shop-custom no-border">
		<div class="bd">
			<div id="XT_ItemDetail" class="ks-post custom-area" style="padding-top:10px;">${item.desc}</div>
		</div>
	</div>
</div>
<div id="XT_ReviewsBox" name="shopCustom" class="box J_TBox ks-clear" style="display:none;">
	<div class="shop-custom no-border">
		<div class="hd" style="display:none;"><h3><span>评价详情(${totalResults})</span></h3></div>
		<div class="bd">
			<#if totalResults!=0>
			<table style="width: 100%;" class="xt-rate">
				<tbody>
<#if rates??&&rates?size!=0><#list rates as r><tr><td class="cmt"><p style="" class="rate">${r.content}</p><p class="cmtInfo"><span class="date">[${r.created?datetime}]</span></p></td><td class="buyer"><p>${r.nick}</p></td></tr></#list></#if>
				</tbody>
			</table>
			</#if>
		</div>
	</div>
</div>