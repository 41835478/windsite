<@p.pageHeader>
<meta name="keywords" content="购物网站大全,B2C网站大全,网上购物网站">
<meta name="description" content="购物商城 - ${sitetitle}旗下B2C商城网站大全，精选网上知名购物网站大全，推荐最热门商城、最高信誉商城，让网上购物消费者更放心。">
<title><#if cat??>${cat.title}-</#if>购物商城-${sitetitle}</title>
</@p.pageHeader>
<script>
$(function(){
	var focus=$('#J_FocusBar');
	var JCat = $('#J_Cat1');
	$('#J_NavList a').click(function(){
		var cid = $(this).attr('cid');
		var offset=$(this).offset();
		focus.offset({left:offset.left-5,top:offset.top}).text($(this).text()).show();
		if(JCat!=null&&JCat&&JCat.length==1){
			JCat.hide();
		}
		JCat=$('#J_Cat'+cid);
		JCat.fadeIn();
		JCat.find('img').each(function(){
				var self=this;
				if (!self.loaded) {
					$("<img />").bind("load", function() {
						$(self).hide().attr("src", $(self).attr("original")).fadeIn();
						self.loaded = true;
					}).attr("src", $(self).attr("original"));
				};
		});
		var top=$('body').scrollTop();
		var jTop = JCat.offset().top;
		if(top>jTop){
			$('body').scrollTop(0);
		}
	});
	<#if cat??>
	$('#J_NavList a[cid="${cat.id}"]').click();
	<#else>
	$('#J_NavList a:first').click();
	</#if>
});
</script>
<style>
.tb-shop .shop-b2c-cat .bd {margin: 0px;padding: 0px;}.shop-b2c-cat .navList {font-size: 12px;line-height: 16px;background-color: #f7f7f7;border: 1px solid #DDD;}.shop-b2c-cat .bd a {color: #333;cursor: pointer;display: block;height: 31px;line-height: 31px;padding: 0 5px;border-bottom: 1px solid #f2f2f2;margin: 0 5px;}
#J_FocusBar {position: absolute;left: 0;top: 0;color: #fff;font-size: 12px;font-weight: bold;line-height: 31px;width: 197px;height: 31px;padding-left: 10px;background:url(http://static.xintaonet.com/assets/min/stylesheets/images/T15K02XXRtXXXXXXXX-197-31.png) no-repeat;margin: 1px 0 0 1px;display:none;}
</style>
<#assign objectConstructor = "freemarker.template.utility.ObjectConstructor"?new()>
<#assign file = objectConstructor("java.io.File", htmlPath+"/htdocs/zone/ymall/mallCateogry.html")> 
<#if file.exists()><#include  "//ymall/mallCateogry.html" parse=false encoding="utf8"></#if>
<@p.pageFooter>
</@p.pageFooter>