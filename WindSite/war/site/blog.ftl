<#function blog_flash $swf_url=''  $type=''>
<#assign $width='520' $height='390'>
<#if $type=='media'>
	<#return '<object classid="clsid:6bf52a52-394a-11d3-b153-00c04f79faa6" width="'+$width+'" height="'+$height+'"><param name="autostart" value="0"><param name="url" value="'+$swf_url+'"><embed autostart="false" src="'+$swf_url+'" type="video/x-ms-wmv" width="'+$width+'" height="'+$height+'" controls="imagewindow" console="cons"></embed></object>'>
	<#elseif $type=='real'>
	<#return '<object classid="clsid:cfcdaa03-8be4-11cf-b84b-0020afbbccfa" width="'+$width+'" height="'+$height+'"><param name="autostart" value="0"><param name="src" value="'+$swf_url+'"><param name="controls" value="Imagewindow,controlpanel"><param name="console" value="cons"><embed autostart="false" src="'+$swf_url+'" type="audio/x-pn-realaudio-plugin" width="'+$width+'" height="'+$height+'" controls="controlpanel" console="cons"></embed></object>'>
	<#else>
	<#return '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="'+$width+'" height="'+$height+'"><param name="movie" value="'+$swf_url+'"><param name="allowscriptaccess" value="always"><embed src="'+$swf_url+'" type="application/x-shockwave-flash" width="'+$width+'" height="'+$height+'" allowfullscreen="true" allowscriptaccess="always"></embed></object>'>
</#if>
</#function>
<#if clazz??><#assign classname=clazz.classname></#if>
<#assign wwwDomain="">
<#if www??&&''!=www><#assign wwwDomain='http://'+www></#if> 
<@p.pageHeader>
<meta name="keywords" content="${blog.subject}">
<meta name="description" content="${sitetitle}${blog.subject}">
<title>${blog.subject}- ${sitetitle}</title>
</@p.pageHeader>
<script>function adBlog(b){!b||b==""||$.ajax({url:"/router/ad/page/blog?sid="+b,type:"GET",data:{},dataType:"html",beforeSend:function(a){a.setRequestHeader("WindType","AJAX");a.setRequestHeader("WindDataType","HTML")},error:function(a,c,d){},success:function(a){$("#adShopDisplay").append(a);$("#adShopDisplay .pic img").each(function(){var o=$(this).attr('original');if(o){$(this).attr('src',o);}});}})};</script>
<link href="http://static.xintaonet.com/assets/min/stylesheets/reset-post.css" rel="stylesheet"/>
<style>* {word-wrap: break-word;word-break: break-all;}.cvl-line li {margin-bottom:0px;}.blog-detail .blog-title h3 {color: black;font-size: 14px;line-height: 21px;overflow: hidden;padding-left: 0px;text-align: left;text-indent: 5px;white-space: nowrap;width: 530px;}</style>
<div class="layout grid-s5m0 ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div name="shopCustom" class="box J_TBox ks-clear">
				<div class="shop-custom cms-detail">
					<ul class="cvl-line">
						<li style="float:left;width:320px;overflow:hidden;"><h3><span style="float:left;">上一篇文章：</span><#if prevBlog??><a href="${wwwDomain}/tblogs/${blog.classid}/${prevBlog.blogid}.html" style="width:220px;overflow:hidden;">${prevBlog.subject}</a><#else>没有了</#if></h3></li>
						<li style="float:left;width:320px;overflow:hidden;"><h3><span style="float:left;">下一篇文章：</span><#if nextBlog??><a href="${wwwDomain}/tblogs/${blog.classid}/${nextBlog.blogid}.html" style="width:220px;overflow:hidden;">${nextBlog.subject}</a><#else>没有了</#if></h3></li>
					</ul>
					<div class="bd ks-post" style="background:none;clear:both;word-break:break-all;">
						<h1><#if clazz??><a href="${wwwDomain}/tblogs/${clazz.classid}.html">${clazz.classname}</a><#else><a href="${wwwDomain}/tblogs.html">购物资讯</a></#if>&nbsp;>>&nbsp;<span>${blog.subject}</span></h1>
						<div class="post_date" style="margin-top:10px;">${dateline(blog.dateline)}</div>
						<div id="post_content" class="custom-area">
						<#if ad??>
						<!--文章内容区广告位开始-->
						<div style="float:right;padding:5px;">
						<#include "/site/designer/include/ad.ftl">
						</div>
						<!--文章内容区广告位结束-->
						</#if>
						${blog.message?replace('http://home.xintaonet.com/attachment/','attachment/')?replace('attachment/','http://home.xintaonet.com/attachment/')?replace('mm_[0-9]+_0_0',pid,'r')?replace('\\[flash=?(media|real)*\\](.+?)\\[\\/flash\\]', blog_flash('$2', '$1'),'r')}
						</div>
					</div>
					<ul class="cvl-line">
						<li style="float:left;width:320px;overflow:hidden;"><h3><span style="float:left;">上一篇文章：</span><#if prevBlog??><a href="${wwwDomain}/tblogs/${blog.classid}/${prevBlog.blogid}.html" style="width:220px;overflow:hidden;">${prevBlog.subject}</a><#else>没有了</#if></h3></li>
						<li style="float:left;width:320px;overflow:hidden;"><h3><span style="float:left;">下一篇文章：</span><#if nextBlog??><a href="${wwwDomain}/tblogs/${blog.classid}/${nextBlog.blogid}.html" style="width:220px;overflow:hidden;">${nextBlog.subject}</a><#else>没有了</#if></h3></li>
					</ul>
					<div class="clear:both;"></div>
					<#if clazz??&&wwwDomain??&&''!=wwwDomain>
					<script type="text/javascript" id="wumiiRelatedItems"></script>
					<script type="text/javascript">
					    var wumiiPermaLink = "${wwwDomain}/tblogs/${clazz.classid}/${prevBlog.blogid}.html"; //请用代码生成文章永久的链接
					    var wumiiSitePrefix = "${wwwDomain}";
					    var wumiiParams = "&num=5&mode=3&pf=JAVASCRIPT";
					</script>
					<script type="text/javascript" src="http://widget.wumii.com/ext/relatedItemsWidget.htm"></script>
					<a href="http://www.wumii.com/widget/relatedItems.htm" style="border:0;"><img src="http://static.wumii.com/images/pixel.png" alt="无觅相关文章插件，快速提升流量" style="border:0;padding:0;margin:0;" /></a>
					</#if>
					<#if uyan??>
					<div class="clear:both;"></div>
					<!-- UY BEGIN -->
					<div id="uyan_frame"></div>
					<script type="text/javascript" id="UYScript" src="http://v1.uyan.cc/js/iframe.js?UYUserId=${uyan}" async=""></script>
					<!-- UY END -->
					</#if>
				</div>		
			</div>
		</div>
	</div>
	<div class="col-sub J_TRegion">
		<div name="shopCategory" class="box J_TBox ks-clear">
			<div class="shop-category">
				<div class="hd"><h3><span>文章分类</span></h3></div>
				<div class="bd">
					<ul id="J_Cats" class="cats J_TWidget">
						<#include "/site/template/blogClass.ftl">
					</ul>
				</div>
			</div>
		</div>
		<div name="shopSearch" class="box J_TBox ks-clear">
			<div class="shop-search">
				<div class="hd"><h3><span>搜索淘宝宝贝</span></h3></div>
				<div class="bd">
					<div class="search-form">
						<form name="SearchForm" action="/search" method="get" target="_blank">
							<input type="hidden" name="cid" value="0">
							<ul>
								<li class="keyword"><label for="keyword">关键字：</label><input type="text" size="18" name="q" id="KeywordBox" value="" onfocus="this.select();"></li>
								<li class="price"><label for="price">价格：</label><input id="price1" type="text" name="start_price" class="price J_CheckInput" size="4" value="">到<input id="price2" name="end_price" class="price J_CheckInput" type="text" size="4" value=""></li>
								<li class="submit"><button type="submit" class="button">搜索</button></li>
							</ul>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="layout grid-m ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div id="adShopDisplay" name="shopDisplay" class="box J_TBox ks-clear"></div>
		</div>
	</div>
</div>
<@p.pageFooter>
<#if pid??&&pid!=''>_gaq.push(['_trackEvent', 'xt-${pid}', 'blog-${blog.blogid}', '${blog.subject}']);</#if>adBlog('${sid}');
</@p.pageFooter>
