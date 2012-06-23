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
if($poster){
	$site = F('escape',V('-:sysConfig/site_name'));
	$title = $poster['title'];
?>
<title><?php echo $title.'-'.$site?></title>
<meta name="title" content="<?php echo $title.'-'.$site?>">
<meta name="keywords" content="<?php echo $site.','.$title.','.$poster['tag']?>">
<meta name="description" content="<?php echo $site.'画报频道为您提供关于'.$title.'的精美图库'?>">
<?php }?>
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<script type="text/javascript" src="/js/xintao/hotkeys/jquery.hotkeys.js"></script>
<link href="http://static.xintaowang.com/css/default/pub.css" rel="stylesheet" type="text/css" />
<link href="http://static.xintaowang.com/css/default/xintao/poster.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/js/xintao/poster/poster.js?v=20111115"></script>
<script>
<?php echo 'var PID=\''.XT_USER_PID.'\';';?>
</script>
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

TPL :: module('xintao/poster', array (
	'poster' => $poster,
	'pics' => $pics,
	'items' => $items,
	'channel' => $channel,
	'cats' => $cats
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
	$('#J_Poster .J_ThumbItems img').each(function() {
		var src = $.base64.decode($(this)
				.attr('data-original'));
		$(this).attr('src', src + '_60x60.jpg')
				.attr('data-original-src', src)
				.removeAttr('data-original');
	});
})(Xwb, $);	
</script>
</html>
