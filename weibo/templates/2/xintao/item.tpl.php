<?php
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
if(empty($item)){
header("http/1.1 404 Not Found");   //返回错误  
header("Status: 404 Not Found");    //返回状态的定义，可不写此句
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php 

if($item){
	$site = F('escape',V('-:sysConfig/site_name'));
	$title = F('web_page_seo.title',$item['title']);
	$sellerNick = $item['nick'];
	$price = $item['price'];
	
?>
<title><?php echo $title.'['.$price.'元]-'.$site?></title>
<meta name="title" content="<?php echo $title.'['.$price.'元]-'.$site?>">
<meta name="keywords" content="<?php echo $site.','.$title.','.$sellerNick?>">
<meta name="description" content="<?php echo $title.','.$site.'淘宝购物频道为您提供关于'.$title.'的报价:'.$price.',商家:'.$sellerNick.',产品图片和评测信息。'?>">
<?php }?>

<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<link href="<?php echo W_BASE_URL;?>css/default/pub.css" rel="stylesheet" type="text/css" />
<link href="<?php echo W_BASE_URL;?>css/default/xintao/item.css" rel="stylesheet" type="text/css" />
</head>
<body id="items">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/header'); ?>
			<div id="container" class="single">
				<div class="extra">
					<!-- 站点导航 开始 -->
					<?php Xpipe::pagelet('common.siteNav'); ?>
					<!-- 站点导航 结束 -->
				</div>
				<div class="content" style="_width: 798px;">
					<div class="main-wrap">
						<div class="main">
                        	<div class="main-bd">
                            	<?php

TPL :: module('xintao/item', array (
	'cat' => $cat,
	'item' => $item,
	'items' => $items
));
if($item&&count($items)==0){
	//Xpipe :: pagelet('xintao.convertItemDetail');	
}
?>
                            </div>
                         </div>
					</div>
				</div>
			</div>
			<!-- 尾部 开始 -->
			<?php TPL::module('footer');?>
			<!-- 尾部 结束 -->
		</div>
	</div>
	<?php TPL::module('gotop');?>
</body>
<script>
(function(X, $) {
	if ($('#detail').length == 1) {
		lazyload($('#detail .pic img'));
		$('#detail a.J_TrackItem').click(function() {
					X.trackItem($(this));
				});
		$('#detail a.J_TrackShop').click(function() {
					X.trackShop($(this));
				});
	}
	if($('#J_ItemCatSearch').length==1){
		lazyload($('#J_ItemCatSearch .pic img'));
		$('#J_ItemCatSearch a.J_TrackItem').click(function() {
					X.trackItem($(this));
				});
		$('#J_ItemCatSearch a.J_TrackShop').click(function() {
					X.trackShop($(this));
				});
	}
})(Xwb, $);
</script>
</html>
