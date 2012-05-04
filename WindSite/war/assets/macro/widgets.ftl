<#ftl strip_whitespace=true>
<!--商品排序-->
<#function itemsSort items sortBy>
	<#assign _sorts = sortBy?replace('_asc',' asc')?replace('_desc',' desc')?split(' ') >
	<#if "sortOrder"==_sorts[0]><!--如果是默认排序-->
		<#return items>
	</#if>
	<#if "asc"==_sorts[1]>
		<#return items?sort_by(['sortOrder'])?sort_by([_sorts[0]])><!--升序-->
		<#else>
		<#return items?sort_by(['sortOrder'])?reverse?sort_by([_sorts[0]])?reverse><!--降序-->	
	</#if>
</#function>
<#macro itemsLinkView sortBy='sortOrder_asc' length=0 m_left=10 items=[] noPic="/assets/min/images/nopicture.gif">
	<dl class="widget-itemslinkview-items">
		<#if items??&&(items?size>0)&&length??&&(length>0)>
			<#list itemsSort(items,sortBy) as i>
				<dt class="item" align="left" co="${i.commission}">
					<a target="_blank" nid="${i.num_iid}" nk="${i.nick}" onClick="_gaq.push(['_trackEvent', 'xt-${pid}', 'item-d-${i.nick}-${i.num_iid}', '${i.title}']);" title="${i.title?replace('<span class=H>','')?replace('</span>','')}" href="/titem/${i.num_iid}.html" target="_blank"><span class="ellipsis_text">${i.title}</span></a>
				</dt>
				<#if i_index==(length-1)>
				<#break>
				</#if>
			</#list>
			<#else>
			<#list 1..length as i>
				<dt class="item" align="left" co="">
				<a target="_blank" title="商品标题" href="" target="_blank"><span class="ellipsis_text">商品标题</span></a>
				</dt>
			</#list>
		</#if>
	</dl>
</#macro>
<#macro itemsThumbView sortBy='sortOrder_asc' length=0 m_left=10 items=[] noPic="/assets/min/images/nopicture.gif" hCount=1 marginleft="0px" marginright="0px">
	<ul class="widget-itemsthumbview-items">
		<#if items??&&(items?size>0)&&length??&&(length>0)>
			<#list itemsSort(items,sortBy) as i>
				<#if hCount==1>
					<li style="margin-left:${marginleft}">
				<#else>
					<#switch (i_index+1)%hCount>
						<#case 0><!--最后一个-->
						<li style="margin-left:${marginleft};margin-right:10px;" nid="${i.num_iid}" co="${i.commission}">
						<#break>
						<#case 1><!--第一个-->
						<li style="margin-left:10px;margin-right:0px;" nid="${i.num_iid}" co="${i.commission}">
						<#break>
						<#default><!--中间-->
						<li style="margin-left:${marginleft};margin-right:0px;" nid="${i.num_iid}" co="${i.commission}">
						<#break>
					</#switch>
				</#if>
					<div class="item">
						<div class="pic" align="center"><a nid="${i.num_iid}" nk="${i.nick}" title="${i.title?replace('<span class=H>','')?replace('</span>','')}" onClick="_gaq.push(['_trackEvent', 'xt-${pid}', 'item-d-${i.nick}-${i.num_iid}', '${i.title}']);" title="${i.title?replace('<span class=H>','')?replace('</span>','')}" class="a-cell" href="/titem/${i.num_iid}.html" target="_blank">
						<img src="${i.pic_url?replace("bao/uploaded", "imgextra")}_160x160.jpg"  alt="${i.title?replace('<span class=H>','')?replace('</span>','')}" title="${i.title?replace('<span class=H>','')?replace('</span>','')}"/>
						</a></div>
						<div class="title"><a target="_blank" title="${i.title?replace('<span class=H>','')?replace('</span>','')}" href="/item/${i.id}.html">${i.title}</a></div>
						<div><span class="price-desc">价格:</span><span  class="price"><b>${i.price}元</b></span></div>
					</div>
				</li>
				<#if i_index==(length-1)>
				<#break>
				</#if>
			</#list>
			<#else>
			<#list 1..length as i>
				<li>
					<div class="item">
						<div class="pic" align="center"><a class="a-cell" href="#" rel="groups"><img src="${noPic}"   alt="商品标题" title="商品标题"/></a></div>
						<div class="title"><a target="_blank" title="商品标题">商品标题</a></div>
						<div><span class="price-desc">价格:</span><span  class="price"><b>0元</b></span></div>
					</div>
				</li>
			</#list>
		</#if>
	</ul>
</#macro>
<#macro itemsListView  sortBy='sortOrder_asc' length=0  items=[] noPic="/assets/min/images/nopicture.gif">
	<ul class="widget-itemslistview-items">
		<#if items??&&(items?size>0)&&length??&&(length>0)>
			<#list itemsSort(items,sortBy) as i>
				<li class="item" co="${i.commission}">
					<div class="pic" align="center">
						<a class="a-cell" nid="${i.num_iid}" nk="${i.nick}" title="${i.title?replace('<span class=H>','')?replace('</span>','')}" onClick="_gaq.push(['_trackEvent', 'xt-${pid}', 'item-d-${i.nick}-${i.num_iid}', '${i.title}']);" title="${i.title?replace('<span class=H>','')?replace('</span>','')}" href="/titem/${i.num_iid}.html" rel="groups" target="_blank"><img src="${i.pic_url?replace("bao/uploaded", "imgextra")}_100x100.jpg"  alt="${i.title?replace('<span class=H>','')?replace('</span>','')}" title="${i.title?replace('<span class=H>','')?replace('</span>','')}"/></a>
					</div>
					<div class="title"><a target="_blank" title="${i.title?replace('<span class=H>','')?replace('</span>','')}" href="/item/${i.id}.html">${i.title}</a></div>
					<div class="price-div"><span class="price-desc">价格:</span><span  class="price"><b>${i.price}元</b></span>
					<br/><span class="volume-desc">最近成交:</span><span class="volume">${i.volume}</span>
					</div>
					<div class="buy-button"><a nid="${i.num_iid}" nk="${i.nick}" title="${i.title?replace('<span class=H>','')?replace('</span>','')}" onClick="_gaq.push(['_trackEvent', 'xt-${pid}', 'item-d-${i.nick}-${i.num_iid}', '${i.title}']);" title="${i.title?replace('<span class=H>','')?replace('</span>','')}" href="/titem/${i.num_iid}.html" target="_blank"><img src="/assets/min/images/list_buy_now_sch.gif"></a></div>
				</li>
				<#if i_index==(length-1)>
				<#break>
				</#if>
			</#list>
			<#else>
			<#list 1..length as i>
				<li class="item">
					<div class="pic" align="center">
						<a class="a-cell" href="#" rel="groups"><img src="${noPic}" alt="商品标题" title="商品标题"/></a>
					</div>
					<div class="title"><a target="_blank" title="商品标题">商品标题</a></div>
					<div class="price-div"><span class="price-desc">价格:</span><span  class="price"><b>0元</b></span></div>
					<div class="buy-button"><a  target="_blank"><img src="/assets/min/images/list_buy_now_sch.gif"></a></div>
				</li>
			</#list>
		</#if>
	</ul>
</#macro>
<#macro itemsRotatorView  sortBy='sortOrder_asc' length=0  items=[] noPic="/assets/min/images/nopicture.gif">
<div class="widget-itemsrotatorview-items">
	<div class="main_image" align="center"> 
		<div style="width: 310px; height: 310px;"><a target="_blank" class="a-cell"><img class="main_img" alt="" /></a></div><br/> 
		<div class="desc" align="center">
			<span class="title"></span> <br/><br/>
			<span class="price-desc">价格:</span><span class="price"></span>
		</div> 
	</div>
	<div class="image_thumb"> 
		<ul>
			<#if items??&&(items?size>0)&&length??&&(length>0)>
				<#list itemsSort(items,sortBy) as i>
					<li align="center" nid="${i.num_iid}" nk="${i.nick}" co="${i.commission}">
					<div class="div-cell" align="center"><a href="${i.pic_url}" class="a-cell"><img src="${i.pic_url?replace("bao/uploaded", "imgextra")}_40x40.jpg" alt="${i.title?replace('<span class=H>','')?replace('</span>','')}" /></a></div>
					<div align="left" class="title" commission="${i.commission}" price="${i.price}" href="/titem/${i.num_iid}.html">${i.title}</div>
					</li>
					<#if i_index==(length-1)>
					<#break>
					</#if>
				</#list>
				<#else>
				<#list 1..length as i>
					<li align="center">
					<div class="div-cell" align="center"><a href="${noPic}" class="a-cell"><img src="${noPic}" alt="商品标题" /></a></div>
					<div align="left" class="title" commission="0" price="0" >商品标题</div>
					</li>
				</#list>
			</#if>
		</ul>
	</div>	
</div> 
</#macro>
<#macro itemsZoomView  sortBy='sortOrder_asc' length=0  items=[] noPic="/assets/min/images/nopicture.gif">
<div class="widget-itemszoomview-items">
	<ul class="thumb" style="width:${length/3*120}px;">
		<#if items??&&(items?size>0)&&length??&&(length>0)>
				<#list itemsSort(items,sortBy) as i>
					<li align="center" co="${i.commission}">
						<div align="center" class="div-cell">
						<a class="a-cell" nid="${i.num_iid}" nk="${i.nick}" href="${i.pic_url?replace("bao/uploaded", "imgextra")}_310x310.jpg" price="${i.price}" title="${i.title?replace('<span class=H>','')?replace('</span>','')}" click="/titem/${i.num_iid}.html" commission="${i.commission}">
							<img src="${i.pic_url?replace("bao/uploaded", "imgextra")}_100x100.jpg" alt="${i.title?replace('<span class=H>','')?replace('</span>','')}"/>
						</a>
						</div>
					</li>
					<#if i_index==(length-1)>
					<#break>
					</#if>
				</#list>
				<#else>
				<#list 1..length as i>
					<li align="center">
						<div align="center" class="div-cell">
						<a  class="a-cell" href="${noPic}" price="0" title="商品标题" commission="0">
							<img src="${noPic}" alt="商品标题"/>
						</a>
						</div>
					</li>
				</#list>
		</#if>
	</ul>
	<div class='main-view' align="center">
		<a target="_blank" class="a-cell"><img /></a>
		<span class="title"><a class="title" target='_blank'></a></span> <br />
		<span class="price-desc">价格:</span><span class="price"></span>
	</div>
</div>
</#macro>
<#macro itemsAppleView  sortBy='sortOrder_asc' length=0  items=[] noPic="/assets/min/images/nopicture.gif">
<div class="widget-itemsappleview-items">
	<div class="slides">
		<#if items??&&(items?size>0)&&length??&&(length>0)>
				<#list itemsSort(items,sortBy) as i>
					<div class="slide" align="center">
					<div style="width: 310px; height: 310px;">
					<a href="/titem/${i.num_iid}.html" target="_blank" class="a-cell" nid="${i.num_iid}" nk="${i.nick}" title="${i.title?replace('<span class=H>','')?replace('</span>','')}" onClick="_gaq.push(['_trackEvent', 'xt-${pid}', 'item-d-${i.nick}-${i.num_iid}', '${i.title}']);" title="${i.title?replace('<span class=H>','')?replace('</span>','')}"><img src="${i.pic_url?replace("bao/uploaded", "imgextra")}_310x310.jpg" alt="${i.title?replace('<span class=H>','')?replace('</span>','')}" /></a>
					</div>
					<div><a class="title" target="_blank" href="/item/${i.id}.html">${i.title}</a>
					<br/><span class="price-desc">价格:</span><span class="price">${i.price}元</span>
					</div></div>
					<#if i_index==(length-1)>
					<#break>
					</#if>
				</#list>
				<#else>
				<#list 1..length as i>
					<div class="slide" align="center">
					<div style="width: 310px; height: 310px;"><a class="a-cell"><img src="${noPic}" alt="商品标题" /></a></div>
					<div><a class="title" target="_blank" >商品标题</a>
					<br/><span class="price-desc">价格:</span><span class="price">0元</span>
					</div>
					</div>
				</#list>
		</#if>
	</div>
	<div class="menu">
		<table><tr>
		<#if items??&&(items?size>0)&&length??&&(length>0)>
				<#list itemsSort(items,sortBy) as i>
					<td class="menuItem" align="center" nid="${i.num_iid}" co="${i.commission}">
					<a class="a-cell" ><img src="${i.pic_url?replace("bao/uploaded", "imgextra")}_60x60.jpg" alt="${i.title?replace('<span class=H>','')?replace('</span>','')}" /></a>
					</td>
					<#if i_index==(length-1)>
					<#break>
					</#if>
				</#list>
				<#else>
				<#list 1..length as i>
					<td class="menuItem" align="center"><a class="a-cell"><img src="${noPic}" alt="商品标题" /></a></td>
				</#list>
		</#if>
		</tr></table>
	</div>
</div>	
</#macro>
<#macro itemsCycleView  sortBy='sortOrder_asc' length=0  items=[] noPic="/assets/min/images/nopicture.gif">
<div class="widget-itemscycleview-items" align="center">
	<div class="pics" align="center">
		<#if items??&&(items?size>0)&&length??&&(length>0)>
				<#list itemsSort(items,sortBy) as i>
					<div class="pic" align="center" nid="${i.num_iid}" co="${i.commission}"><a href="/titem/${i.num_iid}.html" nid="${i.num_iid}" nk="${i.nick}" onClick="_gaq.push(['_trackEvent', 'xt-${pid}', 'item-d-${i.nick}-${i.num_iid}', '${i.title}']);" title="${i.title?replace('<span class=H>','')?replace('</span>','')}" title="${i.title}" target="_blank"><img src="${i.pic_url?replace("bao/uploaded", "imgextra")}_160x160.jpg" click="/titem/${i.num_iid}.html" alt="${i.title?replace('<span class=H>','')?replace('</span>','')}" title="${i.title?replace('<span class=H>','')?replace('</span>','')}" nid="${i.num_iid}" price="${i.price}" commission="${i.commission}"/></a></div>
					<#if i_index==(length-1)>
					<#break>
					</#if>
				</#list>
				<#else>
				<#list 1..length as i>
					<div class="pic" align="center"><img src="${noPic}" click="#" alt="商品标题" title="商品标题" price="0" commission="0"/></div>
				</#list>
		</#if>
	</div>
	<div style="margin-left:10px;margin-top:5px;">
	<span class="prev" style="cursor:pointer">上一个</span>&nbsp;&nbsp;
	<span class="next" style="cursor:pointer">下一个</span></div>
	<div style="margin-left:5px;margin-right:10px;" align="center">
		<span class="title"  align="left"><a target="_blank" href="#"></a></span><br/>
		<span class="price-desc">价格:</span><span class="price"></span>
	</div>
</div>
</#macro>
<#macro itemsScrollableView  sortBy='sortOrder_asc' length=0  items=[] noPic="/assets/min/images/nopicture.gif" count=5>
<div class="widget-itemsscrollableview-items scrollable"> 
	<div class="items">
	<#if items??&&(items?size>0)&&length??&&(length>0)>
		<#list itemsSort(items,sortBy) as i>
		<#if i_index%count==0><div class="item" <#if count==3>style="margin-left:10px;"<#elseif count==5>style="margin-left:20px;"</#if>></#if>
		<div class="d-a-i" nid="${i.num_iid}" co="${i.commission}" <#if count!=4>style="margin-right:10px;"</#if>>
			<a class="a-cell" href="/item/${i.id}.html" target="_blank" title="${i.title?replace('<span class=H>','')?replace('</span>','')}">
				<img src="${i.pic_url?replace("bao/uploaded", "imgextra")}_160x160.jpg" alt="${i.title?replace('<span class=H>','')?replace('</span>','')}" title="${i.title?replace('<span class=H>','')?replace('</span>','')}"/>
			</a>
		</div>
		<#if (i_index%count==(count-1))||!i_has_next></div></#if>
		</#list>
		<#else>
		<#list 1..length as i>
			<#if i_index%count==0><div class="item" <#if count==3>style="margin-left:10px;"<#elseif count==5>style="margin-left:20px;"</#if>></#if>
			<div class="d-a-i" nid="" co="" <#if count!=4>style="margin-right:10px;"</#if>><a class="a-cell" href="${noPic}" title="商品标题" click_url="#" price="0"><img src="${noPic}" alt="商品标题" title="商品标题"/></a></div>
		    <#if (i_index%count==(count-1))||!i_has_next></div></#if>
		</#list>
	</#if>	
	</div>
</div>
</#macro>