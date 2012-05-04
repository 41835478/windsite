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
		echo '<title>' . $params['q'] . ($params['page_no']>1?('第'.$params['page_no'].'页'):'') . '-' . $cat[0]['name'] . '-' . $site . '</title>';
		echo '<meta name="title" content="' . $params['q'] . ($params['page_no']>1?('第'.$params['page_no'].'页'):'') . '-' . $cat[0]['name'] . '-' . $site . '">';
	} else {
		echo '<title>' . $params['q'] . ($params['page_no']>1?('第'.$params['page_no'].'页'):'') . '-' . $site . '</title>';
		echo '<meta name="title" content="' . $params['q'] . ($params['page_no']>1?('第'.$params['page_no'].'页'):'') . '-' . $site . '">';
	}
	
	echo '<meta name="keywords" content="' . $qName . ',' . $site . '">';
	echo '<meta name="description" content="' . $site . '帮你找到' . $qName . '的所有关于价格，商家，产品图片和评测信息，你可以通过比较' . $qName . '不同商家的报价、服务、用户评论，帮您做出最好的购买选择">';
}
elseif (count($cat) == 1) {
	$catName = $cat[0]['name'];
	echo '<title>' . $catName . ($params['page_no']>1?('第'.$params['page_no'].'页'):'') . '-' . $site . '</title>';
	echo '<meta name="title" content="' . $catName . ($params['page_no']>1?('第'.$params['page_no'].'页'):'') . '-' . $site . '">';
	echo '<meta name="keywords" content="' . $catName . ',' . $site . '">';
	echo '<meta name="description" content="' . $site . '为您提供有关' . $catName . '产品批发价格,品牌专卖店新品，厂家专卖产品等信息,是' . $catName . '选购的最佳网站">';
} else {
	if (isset ($params['nicks']) && !empty ($params['nicks'])) {
		echo '<title>淘宝卖家[' . $params['nicks'] . ']搜索'.($params['page_no']>1?('第'.$params['page_no'].'页'):'').'-' . $site . '</title>';
		echo '<meta name="title" content="淘宝卖家[' . $params['nicks'] . ']搜索'.($params['page_no']>1?('第'.$params['page_no'].'页'):'').'-' . $site . '">';
		echo '<meta name="keywords" content="' . $params['nicks'] . '">';
		echo '<meta name="description" content="淘宝卖家'.$params['nicks'].'官方旗舰店">';
	} else {
		echo '<title>淘宝商品搜索'.($params['page_no']>1?('第'.$params['page_no'].'页'):'').'-' . $site . '</title>';
	}
}
?>

<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<link href="http://www.xintaowang.com/css/default/xintao/tmall.css" rel="stylesheet" type="text/css" />
</head>
<body id="items">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/header'); ?>
			<div id="container" class="single" style="background:none;background-color:white;">
				<div class="extra" style="width:190px;padding-top:30px;">
					<!-- 站点导航 开始 -->
					<?php Xpipe::pagelet('xintao.tmallCats'); ?>
					<!-- 站点导航 结束 -->
				</div>
				<div class="content" style="margin-left: 190px;_margin-left: 187px;">
					<div class="main-wrap">
						<div class="main">
                        	<div class="main-bd" style="margin-right:3px;margin-left:5px;">
                        	<!-- 搜索 开始 -->
<?php Xpipe::pagelet('common.xtSearchMod',array('keyword'=>$mod['param']['q'])); ?>
<!-- 搜索 结束 -->
<?php

//增加搜索分类|属性 管道输出
Xpipe :: pagelet('component/component_96.run', array (
	'title' => '分类|属性',
	'component_id' => '96',
	'route' => 'items',
	'param' => array (
		'cats' => $cats,
		'cat' => $cat,
		'total_results' => $total_results
	),
	'queryStr' => $mod['param']
));
?>
                            	<?php


TPL :: module('xintao/items', array (
	'data_type' => $data_type,
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
	lazyload($('#J_ItemSearch .pic img'));
	$('#J_ItemSearch a.J_TrackItem').click(function() {
					X.trackItem($(this));
				});
	$('#J_ItemSearch a.J_TrackShop').click(function() {
				X.trackShop($(this));
			});
	var q = '<?php if (isset ($params['q']) && !empty ($params['q'])) {echo F('escape',$params['q']);}?>';
	if (q) {
		$
				.getScript('http://suggest.taobao.com/sug?code=utf-8&extras=1&callback=XT.Suggest.RelatedSearchCallback&q='
						+ encodeURIComponent(q));
	}
	// 搜索
	$('#J_SubmitBtn').click(function() {
				taobaoItemSearch();
			});
	var status = $('#J_StuffStatus .item-list');
	// 新旧
	$('#J_StuffStatus').hover(function() {
				$(this).addClass('hover');
				status.fadeIn(100);
			}, function() {
				$(this).removeClass('hover');
				status.fadeOut(100);
			});

	$('#J_StuffStatus li').click(function() {
		$('#J_StuffStatusSelected').attr('data-value',
				$(this).attr('data-value'));
		$('#J_StuffStatusSelected').find('span').text($(this)
				.attr('data-label'));// 设置新旧显示
		$(this).addClass('selected').siblings()
				.removeClass('selected');// 选中新旧状态
		$('#J_StuffStatus').removeClass('hover');// 移除hover
		status.fadeOut(100);// 隐藏新旧状态下拉
	});
	// 正品保障
	$('#filterProtectionQuality').change(function() {
		if ($(this).is(':checked')) {
			$('#filterProtectionTruth,#J_PromotedService4')
					.attr('checked', true);
		}
	});
	// 价格
	$('#rank-priceform').hover(function() {
				$('#rank-priceform').addClass('focus');
			}, function() {
				$('#rank-priceform').removeClass('focus');
			});
	$('#J_PriceButton').click(function() {
				taobaoItemSearch();
			});
	// 地区
	var locSelected = $('#sel-loc .selected a');
	// 初始化选中
	if (locSelected.attr('data-state')) {// 省份
		$('#sel-loc .loc4 a:contains('
				+ locSelected.attr('data-state') + ')')
				.parent().addClass('checked');
	} else if (locSelected.attr('data-city')) {// 城市
		var citySelected = $('#sel-loc .loc2 a:contains('
				+ locSelected.attr('data-city') + ')');
		if (citySelected.length == 0) {
			citySelected = $('#sel-loc .loc3 a:contains('
					+ locSelected.attr('data-city') + ')');
		}
		if (citySelected.length == 1)
			citySelected.parent().addClass('checked');
	} else {// 所有地区
		$('#sel-loc .loc1 a').parent().addClass('checked');
	}
	// /地区事件
	$('#sel-loc').hover(function() {
				$(this).addClass('hover');
			}, function() {
				$(this).removeClass('hover');
			});
	$('#sel-loc .loc1 a').click(function() {// 所有地区
				locSelected.attr('data-state', '').attr(
						'data-city', '').text('所有地区');
				taobaoItemSearch();
			});
	$('#sel-loc .loc2 a,#sel-loc .loc3 a').click(function() {// 城市
				var city = $(this).text();
				locSelected.attr('data-state', '').attr(
						'data-city', city).text(city);
				taobaoItemSearch();
			});
	$('#sel-loc .loc4 a').click(function() {// 省份
				var state = $(this).text();
				locSelected.attr('data-state', state).attr(
						'data-city', '').text(state);
				taobaoItemSearch();
			});
	if ($('#J_ItemSearch .grid').hasClass('small')) {
		var w = $(window);
		var right = w.width() + w.scrollLeft();
		$("#J_ItemSearch .grid li").each(function() {
					productDetail($(this), right);
				})
	}
})(Xwb, $);			
</script>
</html>
