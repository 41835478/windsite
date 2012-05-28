<#setting url_escaping_charset='utf8'> 
<@p.huabaoHeader>
<meta name="keywords" content="淘画报 淘宝画报 图片 美图 购物 导购  服饰 搭配 明星 街拍 红人 美容 彩妆">
<meta name="description" content="${sitetitle}画报频道提供精美图库，涵盖服饰、女装、男装、美容、居家、亲子、数码、明星、旅游、宠物、网络红人、创意新品等内容，同时图上有精确的商品信息，可进行一站式购物。这是一个全新的图片导购平台，一种全新的图片网购模式。">
<title><#if words??&&''!=words>${words}-关键词搜索<#elseif tag??&&''!=tag>${tag}-标签搜索<#elseif channelName??&&''!=channelName>${channelName}画报-频道搜索<#else>画报搜索</#if>- ${sitetitle}</title>
</@p.huabaoHeader>
<div class="layout grid-m ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div name="itemSearch" class="box J_TBox ks-clear">
				<div class="item-search">
					<div class="hd" style="display:none;"><h3><span>搜索画报</span></h3></div>
					<div class="bd" style="border-bottom-width:0px;">
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
			<div class="box J_TBox ks-clear">
				<div class="shop-display">
					<div class="hd" style="display:none"><h3><span>画报结果</span></h3></div>
					<div class="bd" style="border-top-width:0px;">
					<div style="width:100%;margin-bottom:0px;margin-left:10px;background-image: url(http://img02.taobaocdn.com/tps/i2/T1PlxwXehrXXXXXXXX-355-39.jpg);background-position: 0 50%;background-repeat: no-repeat;font-weight: 700;">
						<div style="padding: 8px 5px 22px;background-repeat: no-repeat;background-position: top left;"><#if words??&&''!=words><span style="color: #FF7850;font-size:14px;font-weight:700;">${words}</span>的<#elseif tag??&&''!=tag><span style="color: #FF7850;font-size:14px;font-weight:700;">${tag}</span>的<#elseif channelName??&&''!=channelName><span style="color: #FF7850;font-size:14px;font-weight:700;">${channelName}画报</span>的</#if>搜索结果：</div>
					</div>
					<#if posters??&&posters?size!=0>
						
						<div class="ks-clear"></div>
						<div class="grid big">
							<ul class="shop-list">
							<#list posters as d>
							<#assign pic=d.coverPicUrl>
							<#if d.coverPicUrl?contains(',')><#assign pic=d.coverPicUrl?split(',')[1]></#if>
							<li>
							<div class="item">
								<div class="pic"><a target="_blank" href="/huabao/${d.id}.html" title="${d.title}"><img src="${pic}_250x250.jpg" alt="${d.title}"></a></div>
								<div class="desc"><a target="_blank" href="/huabao/${d.id}.html" class="permalink">${d.title}</a></div>
							</div>
							</li>
							</#list>
							</ul>
						</div>
						<div style="width:100%;">
						<div style="margin-right:15px;float:right;">
						<#if (pageNo>1)><a href="${"/router/huabao/search?channel="+channel+"&words="+words+"&tag="+tag+"&pageNo="+(pageNo-1)}" class="btn-s1"><span>上一页</span></a></#if>
						<#if posters??&&posters?size!=0><a href="${"/router/huabao/search?channel="+channel+"&words="+words+"&tag="+tag+"&pageNo="+(pageNo+1)}" class="btn-s1"><span>下一页</span></a></#if>
						</div></div>
						<div class="ks-clear"></div>
					<#else>
					<h2>抱歉！未找到符合条件的画报，请修改关键词或标签重新搜索！</h2>	
					</#if>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<@p.pageFooter>
</@p.pageFooter>
			