<?php
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>每日5折 - 新淘高清视频</title>
<meta name="title" content="每日5折 - 新淘高清视频">
<meta name="keywords" content="每日5折,女装，居家，箱包，男鞋，女鞋，内衣，男装每日优惠折扣">
<meta name="description" content="新淘高清视频每日5折频道为您提供淘宝网女装，居家，箱包，男鞋，女鞋，内衣，男装精品皇冠店铺每日优惠折扣">
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<link href="http://static.xintaowang.com/css/default/tv.css" rel="stylesheet" type="text/css" />
<style type="text/css">
#J_Discount a{cursor:pointer;}dl{margin:0px;padding:0px;}
.cgd_info {border: 1px solid #E1E1E1;display: block;border-bottom: 4px solid #E1E1E1;margin-bottom: 25px;padding: 4px 0 4px 4px;cursor: pointer;}
.cgd_info img {width: 490px;height: 170px;}.fl {float: left;}.fr {float: right;}
.cgd_info dl {width: 234px;height: 170px;text-align: center;color: #898989;line-height: 23px;}
.cgd_info dt {font: 18px/43px "微软雅黑e\8f6f\96c5\9ed1";}.cgd_num {color: #FFFAA8;font: bold 26px/52px "微软雅黑e\8f6f\96c5\9ed1";background-color: #DB313D;height: 52px;}
.cgd_num span {font-size: 16px;color: white;margin-left: 5px;}.cgd_info strong {color: #FF5A00;}
.cgd_info:hover {border-color: #FFB66B;text-decoration: none;color: #F60;}
</style>
</head>
<body id="sotv">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/xintaoTvHeader',array('channel'=> 'discount','key'=>'')); ?>
			<div id="container">
				<div class="blank12H"></div>
				<div class="extra">
					<!-- 站点导航 开始 -->
					<div class="indexMenu bord ks-clear" id="J_Discount">
						<h2><span>分类检索</span></h2>
						<ul>
							<li class="now" data-id=""><a href="#">全部</a></li>
							<li data-id="nvzhuang"><a href="#">女装</a></li>
							<li data-id="jujia"><a href="#">居家</a></li>
							<li data-id="xiangbao"><a href="#">箱包</a></li>
							<li data-id="nanxie"><a href="#">男鞋</a></li>
							<li data-id="nvxie"><a href="#">女鞋</a></li>
							<li data-id="neiyi"><a href="#">内衣</a></li>
							<li data-id="nanzhuang"><a href="#">男装</a></li>
						</ul>
					</div>
					<!-- 站点导航 结束 -->
				</div>
				<div class="content">
					<div class="main">
						<ul id="J_Discounts" class="cg_discount ks-clear" style="width:730px;float:right;">
							<?php


if (isset ($discounts) && !empty ($discounts)) {
	foreach ($discounts as $discount) {
?>
							<li data-value="<?php echo $discount['cat']?>">
								<a rel="nofollow" class="cgd_info ks-clear" href="<?php echo $discount['url']?>" target="_blank">
									<img class="fl" src="<?php echo $discount['pic_url']?>" alt="折扣信息" width="490" height="170">
									<dl class="fr">
										<dt><?php echo $discount['title']?></dt>
										<dd class="cgd_num"><?php echo $discount['zhekou']?></dd>
										<dd><?php echo $discount['description']?></dd>
										<dd><?php echo $discount['dateline']?></dd>
										<dd><?php echo $discount['datedesc']?></dd>
									</dl>
								</a>
							</li>	
							<?php	}}?>
						</ul>
					</div>
				</div>
			</div>
			<!-- 尾部 开始 -->
			<?php TPL::module('xintaoTvFooter');?>
			<!-- 尾部 结束 -->
		</div>
	</div>
	<?php TPL::module('gotop');?>
</body>
<script>
$(function(){
	initFloat($("#J_Discount"),{x:140,y:170,z:230,speed:"fast"});
	$('#J_Discount li').click(function(){
		if(!$(this).hasClass('now')){
			$(this).addClass('now').siblings().removeClass('now');
			var $cat = $(this).attr('data-id');
			if($cat!=''){
				$('#J_Discounts li').each(function(){
					if($(this).attr('data-value')==$cat){
						$(this).fadeIn();
					}else{
						$(this).hide();
					}
				});	
			}else{
				$('#J_Discounts li').fadeIn();
			}	
		}
	});
});			
</script>	
</html>
