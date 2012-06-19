<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>高级店铺查询-淘客推广-我是淘客-新淘网</title>
</@ws.header>
<style>
.wTable td{line-height:20px;}
.filter .select-item span,.filter-tabbar li.status a, .filter-tabbar li.combine a, .filter-tabbar li.status a span, .toolbar .order .order-options li a , .page-start, .page-next, .page-prev, .page-end{background: url(http://static.xintaonet.com/assets/images/T18VtIXbdwXXXXXXXX.png) no-repeat -9999px -9999px;}
.search_goods {background: #F3F3F3;border-top: 1px solid white;height: 30px;padding: 10px 0px;}
.search_goods .search_con {margin: 0px auto;width: 700px;}.search_goods select {border: 1px solid #C1C1C1;float: left;font-size: 12px;height: 21px;margin-right: 5px;}
.txt_sea {border: 1px solid #C1C1C1;float: left;height: 19px;margin-right: 5px;width: 243px;}
.btn_alltype_sea {background-position: -105px -61px;border: none;color: white;cursor: pointer;font-size: 14px;font-weight: bold;height: 21px;line-height: 25px;overflow: hidden;padding-bottom: 2px;width: 63px;}
.button{background: url(http://static.xintaonet.com/assets/images/btn_bg.gif) no-repeat 0px 0px;color: white;cursor: pointer;display: inline-block;font-size: 14px;font-weight: bold;height: 20px;line-height: 20px;text-align: center;width: 80px;background-position: 0px 0px;}
.search-nav, .search-nav .crumbs li,.filter-tabbar li,.filter-tabbar li .l, .filter-tabbar li .r,.toolbarWrapper,.filter .select-item  {background: url(http://static.xintaonet.com/assets/images/T1MBVHXjdeXXXXXXXX.png) repeat-x;}
.search-nav {background-position: 0px 0px;border: 1px solid #E5E5E5;border-bottom-left-radius: 3px 3px;border-bottom-right-radius: 3px 3px;border-top-left-radius: 3px 3px;border-top-right-radius: 3px 3px;line-height: 25px;padding: 0px 6px;}
.search-nav {line-height: 25px;width:740px;}
.search-nav .crumbs li {background-position: 100% -25px;background-repeat: no-repeat;margin-right: 8px;padding-right: 17px;}
.navigation {border: 1px solid #FFC44C;margin-top: 10px;overflow: hidden;position: relative;}
.bb-info{width:350px;height:85px;}.bb-selectbox{margin:30px 0px 30px 0px;float:left;width:20px;}.bb-pic{float:left;width:90px;padding-top:10px;}.bb-disc{float:left;width:230px;}.bb-disc a{color:#0063DC;}.bb-disc a:hover{color:#F60;}
.filter {margin-top: 5px;width: 760px;}.filter-tabbar {border-bottom: 2px solid #F50;height: 27px;padding-top: 1px;position: relative;width: 100%;z-index: 100;}
.filter-tabbar li {background-position: 0px -361px;float: left;margin: 3px 3px 0px 0px;position: relative;}
.filter-tabbar li.selected {background-position: 0px -310px;margin-top: 0px;}
.filter .item-list li a:hover {background-color: #EEE;text-decoration: none;}
.filter-tabbar li .l, .filter-tabbar li .r {background-repeat: no-repeat;height: 24px;position: absolute;top: 0px;width: 3px;}
.filter-tabbar li .l {background-position: 0px -337px;left: 0px;}.filter-tabbar li .r {background-position: 100% -337px;right: 0px;}
.filter-tabbar li.selected .l {background-position: 0px -283px;}.filter-tabbar li.selected .r {background-position: 100% -283px;}
.filter-tabbar li a {color: #333;float: left;height: 24px;line-height: 24px;padding: 0px 20px;}
.filter-tabbar li.selected a {color: white;font-size: 14px;font-weight: bold;height: 27px;line-height: 27px;}
.filter-tabbar li.pagination {background-image: none;float: right;margin: 0px;padding: 0px;position: static;}
.toolbar li {float: left;height: 32px;line-height: 32px;margin-right:10px;}
ul.pages li{background:none;padding:3px;}ul.pages li a{height: 14px;line-height: 14px;padding: 0px;}
</style> 
<script>
var PID='${USER.pid}';
$(function(){
});
</script>
<script src="/assets/js/site/advanceshops.js?v=${dateVersion()}" type="text/javascript"></script>
<@xt.taoketemplate navselected='taoke' bdselected='taoke-shops' group=3>
<div class="search_goods">
  <div class="search_con">
	<input id="q" name="q" type="text" onkeydown="if(event.keyCode==13) {advanceShopsSearch_();}" value="" size="52" class="txt_sea" maxlength="50">
    <select id="cat" name="cat" style=""><option typeid="0" value="">所有分类</option><#list cats as c><option value="${c.cid}">${c.name}</option></#list></select>
        <a id="search" class="button">搜索</a>
	</div>
</div>
<input type="hidden" id="nick" value="${USER.nick}">
<div id="items-result"></div>
</@xt.taoketemplate>
