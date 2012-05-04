<#setting url_escaping_charset='utf8'> 
<@p.huabaoHeader>
<meta name="keywords" content="淘画报 淘宝画报 图片 美图 购物 导购  服饰 搭配 明星 街拍 红人 美容 彩妆">
<meta name="description" content="${sitetitle}画报频道提供精美图库，涵盖服饰、女装、男装、美容、居家、亲子、数码、明星、旅游、宠物、网络红人、创意新品等内容，同时图上有精确的商品信息，可进行一站式购物。这是一个全新的图片导购平台，一种全新的图片网购模式。">
<title>画报导购- ${sitetitle}</title>
</@p.huabaoHeader>
<style>
.tb-shop .col-main .main-wrap{background-color:white;}.tb-shop .col-main .main-wrap .box{margin-bottom:10px;}.carrousel-wrap {overflow: hidden;width: 638px;height: 369px;border: 1px solid #000;}.carrousel-images {width: 638px;height: 369px;}.carrousel-images li {overflow: hidden;float: left;}.img-638-369 img {display: block;border: 1px solid;border-color: #282828;width: 638px;height: 369px;border-width: 0;}#carrousel-box {position: relative;width: 640px;height: 450px;padding: 15px;}#carrousel-box .current .hover-icon,.tb-shop .col-main .main-wrap .box .hd{text-indent: -9999em;background-image: url("http://img04.taobaocdn.com/tps/i4/T1U0xzXgFvXXXXXXXX-400-900.png");background-repeat: no-repeat;}
.tb-shop .col-main .main-wrap .box .hd{margin:0px;padding:0px;}.tb-shop .col-main .main-wrap .box .hd h3{margin:0px;padding:0px;}.tb-shop .col-main .main-wrap .box .hd span{display: block;width: 200px;height: 50px;outline: none;margin:0px;padding:0px;}.tb-shop .col-main .main-wrap .box .bd{background-color: #ECE8E8;}.tb-shop .col-main .box .hd{height:50px;background-color: white;}.tb-shop .col-main .box .hd-fashion {background-position: -200px 0;}.tb-shop .col-main .box .hd-man {background-position: -200px -50px;}.tb-shop .col-main .box .hd-beauty {background-position: -200px -100px;}.tb-shop .col-main .box .hd-life {background-position: -200px -150px;}.tb-shop .col-main .box .hd-star {height:30px;background-position: -200px -200px;}.tb-shop .col-main .box .hd-baby {height:30px;background-position: -200px -240px;}
.tb-shop .col-main .box .hd-digital {height:30px;background-position: -200px -280px;}.tb-shop .col-main .box .hd-lady {height:30px;background-position: -200px -320px;}.carrousel-indicator {position: absolute;top: 400px;width: 642px;}.carrousel-indicator li {position: relative;overflow: visible;float: left;cursor: pointer;}.img-107-65 img {width: 101px;height: 58px;border-width: 1px;margin: 2px;display: block;}
.hover-icon {position: absolute;z-index: 5;display: block;width: 0;height: 0;}.carrousel-indicator .hover-icon {position: absolute;top: -6px;left: 48px;width: 12px;height: 6px;}.carrousel-indicator .current img {border: 3px solid #f43d1c;margin: 0;}#carrousel-box .carrousel-indicator .current .hover-icon {background-position: 0 -40px;font-size: 0;line-height: 1em;}
</style>
<script>
$(function(){
	var scroll = $('#carrousel-box').scrollable({
					items : '.carrousel-images',
					circular : true
				}).autoscroll({
					autoplay : true,
					interval : 4000
				}).data('scrollable');
	scroll.onBeforeSeek(function(event, i) {
						$('#carrousel-box ol li').eq(i).addClass('current').siblings().removeClass('current');
					});			
	$('#carrousel-box ol li').click(function(){
		$(this).addClass('current').siblings().removeClass('current');
		scroll.seekTo($(this).index());
	});			
});
</script>
<div class="layout grid-m ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
		<#include  "//huabao/index.html" parse=false encoding="utf8">
		</div>
	</div>
</div>
<@p.pageFooter>
</@p.pageFooter>
			