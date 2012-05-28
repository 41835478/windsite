<#setting url_escaping_charset='utf8'> 
<@p.huabaoHeader hType="star">
<meta name="keywords" content="淘画报 淘宝画报 图片 美图 购物 导购  服饰 搭配 明星 街拍 红人 美容 彩妆">
<meta name="description" content="${sitetitle}明星画报频道,以娱乐、体育、社会等明星、名人为重点内容对象，针对新闻、影视剧、演唱会、mv、赛事等涵盖所有相关图片内容，从八卦品牌、点评、满足网友购物需求（导购）、观看明星最新新闻为切入点，服务网友、卖家。整体包装定位为高端时尚、专业、独立、客观路线，形成high fashion的频道氛围，着重打造在淘宝用户及网络上的时尚影响力和话语权，可左右大部分网友的消费行为  ">
<title>明星画报- ${sitetitle}</title>
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
<#include  "//huabao/star.html" parse=false encoding="utf8">
<@p.pageFooter>
</@p.pageFooter>