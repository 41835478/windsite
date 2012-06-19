<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>找淘客-淘客管理-我是卖家-新淘网</title>
</@ws.header>
<script language="javascript" type="text/javascript" src="/assets/js/site/taokeSearch.js?v=${dateVersion()}"></script>
<script>
$(function(){
	<#if shop??&&shop.cid??>taokeSearch('','${shop.cid}',1);<#else>taokeSearch('',0,1);</#if>
	$('#search').click(function(){taokeSearch($('#q').val(),$('#cat').val(),1);});
});
</script>
<style>
.search_goods {background: #F3F3F3;border-top: 1px solid white;height: 30px;padding: 10px 0px;}.search_goods .search_con {margin: 0px auto;width: 700px;}.search_goods select {border: 1px solid #C1C1C1;float: left;font-size: 12px;height: 21px;margin-right: 5px;}
.txt_sea {border: 1px solid #C1C1C1;float: left;height: 19px;margin-right: 5px;width: 243px;}.btn_alltype_sea {background-position: -105px -61px;border: none;color: white;cursor: pointer;font-size: 14px;font-weight: bold;height: 21px;line-height: 25px;overflow: hidden;padding-bottom: 2px;width: 63px;}
.button{background: url(http://static.xintaonet.com/assets/images/btn_bg.gif) no-repeat 0px 0px;color: white;cursor: pointer;display: inline-block;font-size: 14px;font-weight: bold;height: 20px;line-height: 20px;text-align: center;width: 80px;background-position: 0px 0px;}
.why_d {border: 1px solid #ccc;background: #f7f7f7;padding: 10px 15px;margin-bottom: 15px;clear:both;}.l {float: left;}.r {float: right;clear: right}.l50_s {width: 76px;height: 63px;overflow: hidden;padding-top: 6px;margin: 0 5px 5px 0;text-align: center;}.ts41p {margin-bottom: 5px}.f12 {font-size: 12px;}.sl, a.sl {color: #369;font-family: Arial;}.c9, a.c9 {color: #999;font-family: Arial;}.bb1d8 {border-bottom: 1px solid #D8DFEA;}a.sl2_r {color: #369;display: block;padding: 0px 5px;text-decoration: none;}.c {clear: both}
#operate-overlay{display:none;width:400px;border:6px solid #666;border:6px solid rgba(82, 82, 82, 0.698);-moz-border-radius:8px;-webkit-border-radius:8px;}#operate-overlay h2 {color:#fff;background-color:#6D84B4;padding:5px 10px;border:1px solid #3B5998;font-size:20px;}
</style>
<@xt.sellertemplate navselected='seller' bdselected='seller-taoke'>
<div id="operate-overlay"><h2>正在操作中,请稍候...</h2></div>
<div class="search_goods">
  <div class="search_con">
	<input id="q" name="q" type="text" onkeydown="if(event.keyCode==13) {taokeSearch($(this).val(),$('#cat').val(),1);}" value="" size="52" class="txt_sea" maxlength="50">
    <select id="cat" name="cat" style=""><option typeid="0" value="">所有分类</option><#list cats as c><option value="${c.cid}">${c.name}</option></#list></select>
        <a id="search" class="button">搜索</a>
	</div>
</div>
<div id="taokes-result"></div>
</@xt.sellertemplate>
