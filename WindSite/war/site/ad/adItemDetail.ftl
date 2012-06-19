<#assign RATE=0 ISFANLI=(versionNo>=2&&''!=www)>
<#if MEMBER??><#assign RATE=(MEMBER.commissionRate/100)?number></#if> 
<@ws.siteHeader>
<meta name="keywords" content="${item.title}">
<meta name="description" content="${item.title},价格:${item.price},掌柜:${item.nick}">
<title>${item.title}- ${sitetitle}</title>
</@ws.siteHeader>
<link rel="stylesheet" href="http://static.xintaonet.com/assets/min/css/items.css?v=${dateVersion()}" type="text/css"/>
<script type="text/javascript">
$(function(){
		$('#J_TabBar li').click(function(){
			$('#J_TabBar li').removeClass('selected');
			$(this).addClass('selected');
			var t = $(this).attr('t');
			if('description'==t){
				$('.item_list').hide();
				$('#description').show();
				var isLoad = $('#description').data('load');
				if(!isLoad){
					getHtmlContent('description', '/router/site/description/${item.num_iid}?v=' + Math.random(), 'GET', {}, function(data) {
						$('#description').empty().append(data);
						$('#description').data('load',true);
					});
				}
			}else if('item_list'==t){
				$('.item_list').show();
				$('#description').hide();
			}
		});
		getHtmlContent('relateItems',
			'/router/ad/plans/relate/${item.planid}', 'GET', {}, function(data) {
				$('#relateItems').empty().append(data);
			}, function() {
			});
	});
</script>
<table width=100%>
<tr><td valign=top>
<table><tr><td>	
<div class="item_detail">
	<a  href="/titem/${item.num_iid}.html" target="_blank"><h3 class="title">${item.title}</h3></a>
	<br/>
	<div class="item_main">
		<div class="item_img">
			<a href="/titem/${item.num_iid}.html" target="_blank"><img src="${item.pic_url?replace("bao/uploaded", "imgextra")}_310x310.jpg" width="310px" height="310px"/></a>
		</div>
		<div class="item_desc">
			<ul>
				<li>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格：<span class="price">${item.price}元</span></li>
				<li>掌&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;柜：<a <#if shop??>onClick="_gaq.push(['_trackEvent', 'xt-${pid}', 'shop-d-${shop.sid}', '${shop.title}']);"</#if> href="<@ws.convertLink href=item.shop_click_url></@ws.convertLink>" target="_blank"><span class="nick">${item.nick}</span></a></li>
				<li>信&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;誉：${item.seller_credit_score}</li>
				<li>30天售出：${item.volume}件</li>
				<li>所在地区：${item.item_location}</li>
				<#if ISFANLI><li>返利金额:<@ws.rate RATE=RATE commission=item.commission></@ws.rate></li></#if>
				<li><a  href="/titem/${item.num_iid}.html" target="_blank"><img src="http://static.xintaonet.com/assets/min/images/list_buy_now_sch.gif"/></a></li>
			</ul>
		</div>
	</div>
</div>
</td></tr><tr><td>
<ul class="tabbar" id="J_TabBar"><li class="selected" t="item_list"><a>相关商品</a></li><li t="description"><a>商品详情</a></li></ul>
<div class="item_list">
	<ul>
		<#if items??&&items?size!=0>
		<#list items as i>
		<#switch (i_index+1)%5>
			<#case 0><!--最后一个-->
			<li style="margin-left:25px;margin-right:10px;">
			<#break>
			<#case 1><!--第一个-->
			<li style="margin-left:10px;margin-right:0px;">
			<#break>
			<#default><!--中间-->
			<li style="margin-left:25px;margin-right:0px;">
			<#break>
		</#switch>
			<div class="item">
				<div class="pic" align="center"><a class="a-cell" href="/titem/${item.num_iid}.html">
				<img src="${i.pic_url?replace("bao/uploaded", "imgextra")}_160x160.jpg"  alt="${i.title?replace('<span class=H>','')?replace('</span>','')}" title="${i.title?replace('<span class=H>','')?replace('</span>','')}"/>
				</a></div>
				<div class="title"><a target="_blank" title="${i.title?replace('<span class=H>','')?replace('</span>','')}" href="/aditem/${i.id}.html">${i.title}</a></div>
				<div><span class="price-desc">价格:</span><span  class="price"><b>${i.price}元</b></span><#if ISFANLI><div class="fanli" style="float:right;"><span class="fanli-desc">返利:</span><@ws.rate RATE=RATE commission=i.commission></@ws.rate></div></#if></div>
			</div>
		</li>
		</#list>
		</#if>
	</ul>	 
</div>
<div class="item_list">
	<ul>
		<#if others??&&others?size!=0>
		<#list others as i>
		<#switch (i_index+1)%5>
			<#case 0><!--最后一个-->
			<li style="margin-left:25px;margin-right:10px;">
			<#break>
			<#case 1><!--第一个-->
			<li style="margin-left:10px;margin-right:0px;">
			<#break>
			<#default><!--中间-->
			<li style="margin-left:25px;margin-right:0px;">
			<#break>
		</#switch>
			<div class="item">
				<div class="pic" align="center"><a class="a-cell" href="/titem/${item.num_iid}.html">
				<img src="${i.pic_url?replace("bao/uploaded", "imgextra")}_160x160.jpg"  alt="${i.title?replace('<span class=H>','')?replace('</span>','')}" title="${i.title?replace('<span class=H>','')?replace('</span>','')}"/>
				</a></div>
				<div class="title"><a target="_blank" title="${i.title?replace('<span class=H>','')?replace('</span>','')}" href="/aditem/${i.id}.html">${i.title}</a></div>
				<div><span class="price-desc">价格:</span><span  class="price"><b>${i.price}元</b></span><#if ISFANLI><div class="fanli" style="float:right;"><span class="fanli-desc">返利:</span><@ws.rate RATE=RATE commission=i.commission></@ws.rate></div></#if></div>
			</div>
		</li>
		</#list>
		</#if>
	</ul>	 
</div>
<div id="description" style="display:none;padding-top:20px;text-align:center" align=center></div>
</td></tr></table>
</td>
<td width=200px valign=top><div id="p4p-mask">
<div class="StandardSidePanel">
<div id="p4p:sidebar" class="hesper-sidebar"><div class="p4p-title Title"><b>掌柜热卖</b></div><ul class="p4p-list" id="relateItems"></ul></div>
</div>
</div></td><tr>
</table>
<@ws.siteFooter>
<#if pid??&&pid!=''>_gaq.push(['_trackEvent', 'xt-${pid}', 'item-${item.nick}-${item.num_iid}', '${item.title}']);</#if>
</@ws.siteFooter>
			