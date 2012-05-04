<style>
.scrollable {position:relative;overflow:hidden;width: 710px;border:1px solid #ccc;}#hotHbs .items {width:20000em;position:absolute;clear:both;}.items div.item {float:left;width:710px;}.scrollable .h-d-a-i {float:left;margin:10px 5px 15px 5px;background-color:#fff;padding:2px;border:1px solid #ccc;-moz-border-radius:4px;-webkit-border-radius:4px;vertical-align: middle;}.scrollable .active {border: 1px solid #FF7303;background:#FF7303}
.h-d-a-i{float:left;vertical-align: middle;width:160px;height:180px;}.h-d-a-i a {vertical-align: middle;cursor: pointer;display: table-cell;_display: block;text-align: center;}.h-d-a-i a{float:left;background-color:#F7F7F7;width: 160px;height: 160px; *font-size: 140px;}.h-d-a-i img{vertical-align: middle;border: 0px; #margin-top: -2px;}.h-d-a-i a.title{width:160px;height:20px;font-size:14px;color: #747474;font-weight: bold;}#lastHbs .h-d-a-i{height:180px;}
.navi-page {position:absolute;right:0px;top:10px;}#search-result {background-image: url(http://img02.taobaocdn.com/tps/i2/T1PlxwXehrXXXXXXXX-355-39.jpg);background-position: 0% 50%;background-repeat: no-repeat;font-weight: 700;}#search-result-inner {background-position: 0% 0%;background-repeat: no-repeat;padding: 8px 5px 22px;}#search-result .highlight {font-size: 14px;color: #FF7850;}.nums{position:absolute;background:#ccc;bottom:0px;right:0px; opacity: 0.75; filter:Alpha(Opacity=75);cursor:pointer;}
ul.pages li.pgCurrent{background: #FF7303;}ul.pages li.pgCurrent a {color: white;}
</style>
<div id="search-result" style="margin:10px;width:730px;position:relative;"><div id="search-result-inner">画报搜索结果为：<span class="highlight">${page.totalCount}个</span>相关结果</div><div class="navi-page" style="width:400px;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount></@ws.pager></div></div>
<div class="scrollable" style="width:730px;">    
   <div class="items">
   	<#if resultHbs??&&resultHbs?size!=0>
   	<#list resultHbs as h>
   	<div class="h-d-a-i" h="${h.id}" t="${h.type}"><a target="_blank" title="${h.name}"><img alt="${h.name}" src="${h.cover?replace('_250x250','_160x160')}" title="${h.name}"></a><span style="display:block;"><a class="title" target="_blank" title="${h.name}">${h.shortName}</a></span><!--<span class="nums" title="本画报含${h.nums}张图片">${h.nums}</span>--></div>
   	</#list>
   	</#if>
   </div> 
</div>