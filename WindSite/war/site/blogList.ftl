<#if clazz??><#assign classname=clazz.classname></#if>
<#assign wwwDomain="">
<#if www??&&''!=www><#assign wwwDomain='http://'+www></#if> 
<@p.pageHeader>
<meta name="keywords" content="${classname}">
<meta name="description" content="${sitetitle}${classname}">
<title>${classname}- ${sitetitle}</title>
</@p.pageHeader>
<script>function adBlog(b){!b||b==""||$.ajax({url:"/router/ad/page/blog?sid="+b,type:"GET",data:{},dataType:"html",beforeSend:function(a){a.setRequestHeader("WindType","AJAX");a.setRequestHeader("WindDataType","HTML")},error:function(a,c,d){},success:function(a){$("#adShopDisplay").append(a);$("#adShopDisplay .pic img").each(function(){var o=$(this).attr('original');if(o){$(this).attr('src',o);}});}})};</script></script>
<style>.cvl-line li {margin-bottom:0px;}</style>
<div class="layout grid-s5m0 ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div name="shopBlog" class="box J_TBox ks-clear">
				<div class="shop-blog cmsview-list-line no-border">
					<div class="hd"><h3><span>${classname}</span></h3></div>
					<#assign pageUrl="">
					<#if clazz??><#assign pageUrl=wwwDomain+'/tblogs/'+clazz.classid+'.html'><#else><#assign pageUrl=wwwDomain+'/tblogs.html'></#if>
					<div align=right style="text-align:right;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount url=pageUrl></@ws.pager><div style="clear:both;"></div></div>
					<div class="bd" style="background:none;">
						<ul class="cvl-line">
							<#if blogs??&&blogs?size!=0>
							<#list blogs as d><li <#if d_index%2==1>class="split"</#if>><h3><a href="/tblogs/${d.classid}/${d.blogid}.html">${d.subject}&nbsp;&nbsp;${dateline(d.dateline)}</a></h3><#if isMsg??&&isMsg><div class="desc">${d.message}</div></#if></li></#list>
							</#if>
						</ul>
					</div>
					<div align=right style="text-align:right;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount url=pageUrl></@ws.pager><div style="clear:both;"></div></div>
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
adBlog('${sid}');
</@p.pageFooter>