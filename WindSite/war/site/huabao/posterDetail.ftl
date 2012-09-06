<#setting url_escaping_charset='utf8'> 
<@p.huabaoHeader>
<meta name="keywords" content="${poster.titleShort}">
<meta name="description" content="${sitetitle}画报频道提供关于${poster.title}的精美图库。">
<title>${poster.title}- ${sitetitle}</title>
<#assign RATE=0 ISFANLI=((versionNo>=2)&&''!=www) ISMEMBER='false'>
<#if MEMBER??>
<#if MEMBER.commissionRate??&&''!=MEMBER.commissionRate><#assign RATE=(MEMBER.commissionRate/100)?number ISMEMBER='true'></#if>
<#else>
<#if isAsyn&&commissionRate??&&''!=commissionRate><#assign RATE=(commissionRate/100)?number></#if>
</#if> 
<script>
var data={};var HID=${poster.id};var PID='${pid}';var PPID='${pPid}';var PICID=${picId!'0'};var ISFANLI=<#if ISFANLI>true<#else>false</#if>;var ISMEMBER=${ISMEMBER};var WWW='${www}';
if (!String.prototype.replaceAll) {String.prototype.replaceAll = function(b, a) {return this.replace(new RegExp(b, "gm"), a)}}
</script>
</@p.huabaoHeader>
<link rel="stylesheet" href="/assets/js/jquery/poster/poster.css?v=${dateVersion()}" type="text/css"/>
<input name='_tb_token_' type='hidden' value='7a57fe5683533'>
<#if isSuccess??&&isSuccess>
<#assign posterId=poster.id?string>
<#assign filePath = posterId?substring(posterId?length-2,posterId?length)>
<script src="/hposter/${filePath}/${posterId}.js" type="text/javascript"></script>
<#else>
</#if>
<style>.poster-share{display:none;}
.s30,.s30 a {width: 30px;height: 30px;}.s40,.s40 a {width: 40px;height: 40px;}.s50,.s50 a {width: 50px;height: 50px;}.s60,.s60 a {width: 60px;height: 60px;}.s70,.s70 a {width: 70px;height: 70px;}.s80,.s80 a {width: 80px;height: 80px;}.s110x90,.s110x90 a {width: 110px;height: 90px;}.s120,.s120 a {width: 120px;height: 120px;}.s160,.s160 a {width: 160px;height: 160px;}.s220,.s220 a {width: 220px;height: 220px;}.s310,.s310 a {width: 310px;height: 310px;}
.s30 img {max-width: 30px;max-height: 30px;}.s40 img {max-width: 40px;max-height: 40px;}.s50 img {max-width: 50px;max-height: 50px;}.s60 img {max-width: 60px;max-height: 60px;}.s70 img {max-width: 70px;max-height: 70px;}.s80 img {max-width: 80px;max-height: 80px;}.s110x90 img {max-width: 110px;max-height: 90px;}.s120 img {max-width: 120px;max-height: 120px;}.s160 img {max-width: 160px;max-height: 160px;}.s220 img {max-width: 220px;max-height: 220px;}.s310 img {max-width: 310px;max-height: 310px;}</style>
<script src="/assets/js/jquery/poster/poster.js?v=${dateVersion()}" type="text/javascript"></script>
<div class="layout grid-m0s5 ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div class="crumbs">您当前的位置：<a href="/">购物首页</a><span>&gt;</span><a href="/huabao/index.html">画报首页</a><span>&gt;</span><#if channel??><a href="/huabao/${channel.name}.html">${channel.cn_name}</a><span>&gt;</span></#if>${poster.title}</div>
				<#if poster??>
				<div id="J_Poster" class="poster-detail">
					<div class="poster_path" style="margin-top:20px;">
						<h2>${poster.title}</h2>
						<span>(<span class="current-page" id="J_CurrentPage">1</span>/<span id="J_TotalPage">${pics?size}</span>)</span>
						<p class="poster-tools hidden ks-hidden">
							<a href="#" class="J_AddFavor add-favor">收藏</a>
							<a href="#" hidefocus="true" class="J_ToggleSkin lighten">关灯</a>
							<a href="http://huabao.taobao.com/life/a-395650.htm" target="_blank" class="list">全部</a>
						</p>
					</div>
					<!-- poster 主体区域开始 -->
					<#if ad??>
						<div style="width:758px;max-height:90px;overflow:hidden;background-color: #F1F1F1;" align=center>
						<#include "/site/designer/include/ad.ftl">
						</div>
					</#if>
					<div class="poster-container" style="float:none;">
						<div class="poster-tags"><span>标签:</span><span id="J_PosterTag">${poster.tag}</span></div>
						<div class="poster-box J_PosterImageArea">
					        <div class="image-wrapper J_ImageWrap" style="position:relative;"><img <#if pics??&&pics?size!=0>src="${pics[0]['picUrl']}_620x10000.jpg"</#if> style="display:none;"/><span id="J_PosterImageLoading" style="background:url(http://static.xintaonet.com/assets/min/stylesheets/images/loading.gif) no-repeat;width:32px;height:32px;position:absolute;top:100px;left:294px;"></span></div>
					    </div>
					    <div class="poster-sidebar">
					    	<#if prev??&&prev.cover_urls??>
					    	<#assign pic=prev.cover_urls>
							<#if prev.cover_urls?contains(',')><#assign pic=prev.cover_urls?split(',')[0]></#if>
							<div class="poster-prev pic s60"><span>上一图集</span><a href="/huabao/${prev.id}.html" class="J_LocateToPrevPoster"><img title="${prev.title}" alt="${prev.title}" src="${pic}_81x65.jpg" width=60px></a></div>
							</#if>
							<div class="poster-thumb J_PosterThumb">
								<a hidefocus="true" class="prev-thumb" id="J_ThumbScrollPrev" href="#">上一页</a>
									<div class="poster-thumb-list" style="position: relative;">
										<ul class="J_ThumbContent thumb-content" style="position: absolute;">
										<#if pics??&&pics?size!=0>
											<li class="thumb-first-notice" data-thumbItemIndex="-1"></li>
											<#list pics as pic>
												<li data-thumbitemindex="${pic_index}" class="J_ThumbItems"><div class="pic s60"><a><img data-picid="${pic.picId}" src="${pic.picUrl}_60x60.jpg" data-original-src="${pic.picUrl}" alt="${pic.picNote?html}"></a></div></li>
											</#list>
											<li class="thumb-last-notice" data-thumbItemIndex="${pics?size}"></li>
										</#if>
										</ul>
										<b id="J_ThumbCurrent" class="thumbCurrent" style="position: absolute; top: 76px; "><b></b></b>
					                </div>
								<a hidefocus="true" class="next-thumb" id="J_ThumbScrollNext" href="#">下一页</a>
							</div>
							<#if next??&&next.cover_urls??>
							<#assign pic=next.cover_urls>
							<#if next.cover_urls?contains(',')><#assign pic=next.cover_urls?split(',')[0]></#if>
							<div class="poster-next pic s60"><a href="/huabao/${next.id}.html" class="J_LocateToNextPoster"><img title="${next.title}" alt="${next.title}" src="${pic}_81x65.jpg" width=60px></a><span>下一图集</span></div>
							</#if>
						</div>
						<div class="ks-clear"></div>
					</div>
					<!-- poster 主体区域结束 -->
					<div class="ks-clear"></div>
			</div>
			<#else>
			<div class="msg24"><p class="error" style="height:22px;">对不起，您浏览的画报可能已被删除、重命名或暂时不可用。</p></div>
			</#if>
		</div>
	</div>
	<div class="col-sub" style="margin-top:70px;height:600px;background: #F1F1F1;">
		<!--图片描述-->
		<div class="poster-title" style="padding-top:5px;background: #F1F1F1;">
	  	<p id="J_DescRgn" class="description" style="display: block;margin-bottom:0px;"></p>
		</div>
		<!--暂时不启用：相关宝贝-->
		<div class="related-goods ks-clear" style="background: #F1F1F1;padding-top:10px;display: none; ">
			<a class="related-goodslink" id="J_RelatedGoodsLink" target="_blank" href="#">相关宝贝</a>
		</div>
		<div class="poster-goods">
			<h4 style="display: none; ">本图片包含商品</h4>
			<div id="J_PosterRelatedGoods" class="related-goods-list" style="display: none;"></div>
			<div class="ks-clear"></div>
		</div>
	</div>
</div>
<div class="layout grid-m ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
<#if channel??><#include  "//huabao/hot_${channel.name}.html" parse=false encoding="utf8"></#if>
		</div>
	</div>
</div>
<script>
$(function(){
	$('#J_Poster').posters({defaultLink:'/titem/NUMIID.html',data : typeof(PosterMarkerData)!='undefined'?PosterMarkerData:{},image : typeof(PosterImageData)!='undefined'?PosterImageData:{},poster : typeof(PosterData)!='undefined'?PosterData:{}});
});
</script>
<@p.pageFooter>
</@p.pageFooter>
			