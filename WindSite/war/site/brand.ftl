<#setting url_escaping_charset='utf8'> 
<@p.pageHeader>
<#if cat??>
<meta name="keywords" content="${cat.title},品牌库">
<meta name="description" content="${cat.title}-品牌库-${sitetitle}">
<title>${cat.title}-品牌库-${sitetitle}</title>
<#else>
<meta name="keywords" content="品牌库">
<meta name="description" content="品牌库-${sitetitle}">
<title>品牌库-${sitetitle}</title>
</#if>
</@p.pageHeader>
<div class="layout grid-s5m0 ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div name="shopBrand" class="box J_TBox ks-clear">
			<div class="shop-brand">
				<div class="hd" style="display:none;"><h3><span>淘宝商城品牌</span></h3></div>
				<div class="bd">
					<ul>
					<#if brands??&&brands?size!=0><#list brands as d><li><a  title="${d.title}" href="/tshop/${d.sid}.html" target="_blank"><img src="${d.picPath}" alt="${d.title}"></a><p class="title"><a  title="${d.title}" href="/tshop/${d.sid}.html" target="_blank">${d.title}</a></p></li></#list></#if>
					</ul>
				</div>
			</div>
			</div>
		</div>
	</div>
	<div class="col-sub J_TRegion">
		<div name="shopCategory" class="box J_TBox ks-clear">
			<div class="shop-category">
				<div class="hd"><h3><span>品牌分类</span></h3></div>
				<div class="bd">
					<ul id="J_Cats" class="cats J_TWidget">
						<#if cats??&&cats?size!=0>
						<#list cats as c>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/brand/${c.id}.html">${c.title}</a></li></ul></li>
						</#list>
						</#if>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
<@p.pageFooter>
</@p.pageFooter>
			