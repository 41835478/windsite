<#if huabaos??>
<script>var HID=${huabaos.id},PICID=${picId!'0'},HOTTYPE='${type!'0'}',USERNICK='${nick}';</script>
<div id="poster-detail">
	<div class="poster-area-950 grid-c2-s4f">
		<div class="col-main" id="col-main">
			<div class="main-wrap">
				<div id="poster-title">
					<h2>${huabaos.name}</h2>
					<span class="author" style="font-weight:bold;"><a target="_blank" title="联系站长-${nick}" href="http://amos1.taobao.com/msg.ww?v=2&uid=${nick}&s=1" ><img border="0" src="http://amos1.taobao.com/online.ww?v=2&uid=${nick}&s=1" alt="联系站长-${nick}" /></a></span>
					<div id="share-to"><h4>分享：</h4><ul>
						<li><a href="javascript:window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(document.location.href));void(0);" title="分享到QQ空间" class="J_ShareToItem" id="share-qq"></a></li>
						<li><a href="javascript:window.open('http://v.t.sina.com.cn/share/share.php?title=《'+document.title+'》很好看哦，快去看看！&url='+encodeURIComponent(document.location.href),'favit','');void(0);" title="分享到新浪微博" class="J_ShareToItem" id="share-sina"></a></li>
						<li><a href="javascript:window.open('http://www.kaixin001.com/repaste/share.php?rtitle=《'+document.title.substring(0,76)+'》很好看哦，快去看看！&rcontent='+encodeURIComponent(document.title)+'&rurl='+encodeURIComponent(document.location.href),'favit','');void(0);" title="分享到开心网" class="J_ShareToItem" id="share-kaixin"></a></li>
						<li><a href="javascript:window.open('http://www.douban.com/recommend/?title='+encodeURIComponent('《'+document.title.substring(0,76)+'》很好看哦，快去看看！')+'&url='+encodeURIComponent(document.location.href),'favit','');void(0);" title="分享到豆瓣" class="J_ShareToItem" id="share-douban"></a></li>
						<li><a href="javascript:window.open('http://share.renren.com/share/buttonshare.do?link='+encodeURIComponent(document.location.href),'favit','');void(0);" title="分享到人人网" class="J_ShareToItem" id="share-renren"></a></li>
					</ul>
					</div>
				</div>
				<div id="J_posterContainer" class="poster-container clearfix">
					<div class="poster-page-navigation"><a href="#" class="prev-page" id="J_prevPage" hidefocus="true"><span>‹</span> 上一页</a><span class="page-info" id="J_pageInfo"><strong id="currentNum">1</strong>/${huabaos.nums}</span><a href="#" class="next-page" id="J_nextPage" hidefocus="true">下一页 <span>›</span> </a><!--<a title="预览本画报全部图片" class="view-all-images">浏览</a>--></div>
					<dl class="clearfix" id="related-goods" style="opacity: 1; "><dt>所含商品</dt></dl>
					<div class="poster-box">
						<div class="poster-original-image" id="J_posterOriginalImage" style="min-height: 0px; height: 806px; ">
							<div class="wrap" title="点击查看下一页"><img id="J_Image"/></div>
						</div>
						<div id="J_PosterDesc" class="poster-desciption"></div>
					</div>
					<div class="poster-sidebar">
						<b class="corner"></b>
						<div class="wrap">
							<div class="poster-thumb">
								<a href="#" class="prev-thumb" id="J_prevThumb" hidefocus="true">上一页</a>
								<div class="poster-thumb-list" id="J_thumbList" style="position: relative; ">
									<ul style="position: absolute; top: 0px; "><#if pics??&&pics?size!=0><#list pics as p><li><div><img data-picid="${p.picId}" data-picindex="${p_index}" src="${p.picSrc}_81x65.jpg"></div></li></#list></#if></ul>
									<b id="thumbCurrent" class="thumbCurrent" style="top: 0px; "></b>
								</div>
								<a href="#" class="next-thumb" id="J_nextThumb" hidefocus="true">下一页</a>
							</div>
						</div>
						<b class="corner"></b>
					</div>
					<div style="clear:both;"></div>
				</div>
			</div>
		</div>
		<div class="col-sub"><h2>推荐画报</h2><ul id="poster-recommended"></ul></div>
	</div>
</div>
<#else>
未找到该画报
</#if>