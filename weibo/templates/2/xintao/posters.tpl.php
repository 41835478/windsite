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
if (isset ($params['key_word']) && !empty ($params['key_word'])) { //关键词
	$qName = $params['key_word'];
	echo '<title>' . $qName . ($params['page_no']>1?('第'.$params['page_no'].'页'):'') . '-淘画报-' . $site . '</title>';
	echo '<meta name="title" content="' . $qName . ($params['page_no']>1?('第'.$params['page_no'].'页'):'') . '-淘画报-' . $site . '">';
	echo '<meta name="keywords" content="' . $qName . ',' . $site . '">';
	echo '<meta name="description" content="' . $site . '帮你找到' . $qName . '的所有淘画报，你可以通过比较' . $qName . '不同商家的报价、服务、用户评论，帮您做出最好的购买选择">';
	
}
elseif ($cat) {
	$catName = $cat['channel_name'];
	echo '<title>' . $catName . ($params['page_no']>1?('第'.$params['page_no'].'页'):'') . '-淘画报-' . $site . '</title>';
	echo '<meta name="title" content="' . $catName . ($params['page_no']>1?('第'.$params['page_no'].'页'):'') . '-淘画报-' . $site . '">';
	echo '<meta name="keywords" content="' . $catName . ',' . $site . '">';
	echo '<meta name="description" content="' . $site . '为您提供有关' . $catName . '淘画报,是' . $catName . '选购的最佳网站">';
} else {
	echo '<title>淘画报搜索'.($params['page_no']>1?('第'.$params['page_no'].'页'):'').'-' . $site . '</title>';
}
?>

<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<link href="<?php echo W_BASE_URL;?>css/default/pub.css" rel="stylesheet" type="text/css" />
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
TPL :: module('xintao/posters', array (
	'mod' => $mod,
	'cat' => $cat,
	'cats' => $cats,
	'list' => $list
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
lazyload($('#J_PosterSearch .pic img'));
})(Xwb, $);
</script>
</html>
