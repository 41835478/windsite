<#if ads??&&ads?size!=0>
<div id="J_ADBottomRight" name="shopDisplay" class="box J_TBox ks-clear" style="width:300px;overflow:hidden;">
<div class="shop-display shop-float shop-scrollable shop-scrollable-h" x="bottom" y="right">
	<div class="hd" ><h3 style="position:relative;width:290px;"><span>今日推荐</span><span style="position:absolute;right:5px;cursor:pointer;z-index:100000001" onclick="$('#J_ADBottomRight').fadeOut();">X</span></h3></div>
	<div class="bd" style="border-width:2px;height:310px;overflow:hidden;">
		<div class="grid smaller shop-scrollable-items">
			<#list ads as a>
			<#assign shop=a['shop'] items=a['items']>
			<div class="items">
			<ul class="shop-list" style="margin-top:1px;margin-bottom:1px;">
				<li>
					<div class="item" cr="${shop.commissionRate}">
						<div class="pic"><a target="_blank" href="/tshop/${shop.sid}.html" title="${shop.title}"><img src="<#if ''!=shop.picPath>http://logo.taobao.com/shop-logo${shop.picPath}<#else>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png</#if>" alt="${shop.title}" width=80px height=80px></a></div>
						<div class="desc"><a target="_blank" href="/tshop/${shop.sid}.html" class="permalink">${shop.title}</a></div>
					</div>
				</li>
				<#list items as i>
				<li>
					<div class="item" co="${i.commission_rate}">
						<div class="pic"><a target="_blank" href="/titem/${i.num_iid}.html" title="${i.title}"><img src="${i.pic_url}_80x80.jpg" alt="${i.title}"></a></div>
						<div class="desc"><a target="_blank" href="/titem/${i.num_iid}.html" class="permalink">${i.title}</a></div>
						<div class="price"><div class="now"><strong>${i.price}元</strong></div></div>
					</div>
				</li>
				</#list>
			</ul>
			<#if shop.sid??><p class="more-items" style="width:280px;"><a href="/tshop/${shop.sid}.html" target="_blank" class="button">查看更多</a></p></#if>
			</div>
			</#list>
		</div>
	</div>
</div>
</div>
</#if>