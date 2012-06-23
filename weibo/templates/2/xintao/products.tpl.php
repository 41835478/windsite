<?php
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php
$site = F('escape',V('-:sysConfig/site_name'));
$params = $mod['param'];
if (isset ($params['q']) && !empty ($params['q'])) { //关键词
	$qName = $params['q'];
	
	if (count($cat) == 1) {
		echo '<title>' . $params['q'] . '-' . $cat[0]['name'] . '-' . $site . '</title>';
		echo '<meta name="title" content="' . $params['q'] . '-' . $cat[0]['name'] . '-' . $site . '">';
	} else {
		echo '<title>' . $params['q'] . '-' . $site . '</title>';
		echo '<meta name="title" content="' . $params['q'] . '-' . $site . '">';
	}
	echo '<meta name="keywords" content="' . $qName . ',' . $site . '">';
	echo '<meta name="description" content="' . $site . '帮你找到' . $qName . '的所有关于价格，商家，产品图片和评测信息，你可以通过比较' . $qName . '不同商家的报价、服务、用户评论，帮您做出最好的购买选择">';

}
elseif (count($cat) == 1) {
	$catName = $cat[0]['name'];
	echo '<title>' . $catName . '-' . $site . '</title>';
	echo '<meta name="title" content="' . $catName . '-' . $site . '">';
	echo '<meta name="keywords" content="' . $catName . ',' . $site . '">';
	echo '<meta name="description" content="' . $site . '为您提供有关' . $catName . '产品批发价格,品牌专卖店新品，厂家专卖产品等信息,是' . $catName . '选购的最佳网站">';
	
} else {
	if (isset ($params['nicks']) && !empty ($params['nicks'])) {
		echo '<title>官方店铺[' . $params['nicks'] . ']-' . $site . '</title>';
		echo '<meta name="title" content="官方店铺[' . $params['nicks'] . ']-' . $site . '">';
		echo '<meta name="keywords" content="' . $params['nicks'] . '">';
		echo '<meta name="description" content="'.$params['nicks'].'官方旗舰店">';
	} else {
		echo '<title>官方店铺-' . $site . '</title>';
	}
}
?>

<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<link href="http://static.xintaowang.com/css/default/pub.css" rel="stylesheet" type="text/css" />
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
				<div class="content">
					<div class="main-wrap">
						<div class="main">
                        	<div class="main-bd">
                            	<?php

TPL :: module('xintao/products', array (
	'mod' => $mod,
	'total_results' => $total_results,
	'list' => $list,
	'cats' => $cats,
	'cat' => $cat
));
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
	// 延迟加载模块内图片
	lazyload($('#J_ProductSearch .pic img'));
	$('#J_ProductSearch a.J_TrackItem').click(function() {
					X.trackItem($(this));
				});
	$('#J_ProductSearch a.J_TrackShop').click(function() {
				X.trackShop($(this));
			});
	// 价格
	$('#rank-priceform').hover(function() {
				$('#rank-priceform').addClass('focus');
			}, function() {
				$('#rank-priceform')
						.removeClass('focus');
			});
	$('#J_PriceButton').click(function() {
				taobaoProductSearch();
			});
	if ($('#J_ProductSearch .grid').hasClass('small')) {
		var w = $(window);
		var right = w.width() + w.scrollLeft();
		$("#J_ProductSearch .grid li").each(function() {
					productDetail($(this), right);
				})
	}		
})(Xwb, $);			
</script>
</html>
