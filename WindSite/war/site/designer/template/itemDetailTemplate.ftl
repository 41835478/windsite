<div id="detail" class="xt-box">
	<div class="xt-detail-hd"><h3>${item.title}</h3></div>
	<div class="xt-detail-bd xt-clear">
		<div class="xt-summary xt-clear">
			<div class="xt-property">
				<div class="xt-wrap ">
					<ul class="xt-meta">
						<li class="xt-detail-price xt-clearfix"><span>一 口 价：</span><strong>${item.price}</strong>元 </li>
						<!--<li class="xt-sold-out"><span>30天售出：</span><em>${item.volume}</em>件</li>-->
						<li><span>运　　费：</span>平邮　${item.postFee} 元 快递　${item.expressFee}　元 EMS　${item.emsFee}　元</li>
						<li><span>库存数量：</span>${item.num}件</li>
						<li><span>卖　　家：</span>${item.nick}</li>
						<li><span>卖家信用：</span><img src="http://static.xintaonet.com/assets/min/images/credit/<@ws.credit detail.sellerCreditScore></@ws.credit>.gif"/></li>   
						<#if item.location??><li><span>地　　区：</span>${item.location.state} ${item.location.city}</li></#if>
					</ul>
					<div class="xt-key">
						<div class="xt-skin xt-naked">
							<div class="xt-action xt-clearfix" style="margin-left:20px;">
								<a biz-itemid="${item.numIid}" href="http://item.taobao.com/item.htm?id=${item.numIid}" data-type="0" data-tmpl="192x40" data-tmplid="225" data-rd="1" data-style="2" data-border="0"></a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="xt-gallery">
				<div class="xt-booth xt-pic xt-s310" data-id="${item.numIid}"><a href="http://item.taobao.com/item.htm?id=${item.numIid}" target="_blank"><#if item.picUrl??><img id="XT_ImgBooth" src="${item.picUrl?replace("bao/uploaded", "imgextra")}_310x310.jpg"></a></#if></div>
			</div>
		</div>
	</div>
</div>