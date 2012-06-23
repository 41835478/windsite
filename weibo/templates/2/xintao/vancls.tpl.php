<?php
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
$cid = V('G:cid');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php

F('web_page_seo', 997, array (), array (), '');
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


TPL :: module('xintao/vancls', array (
	'mod' => $mod,
	'total_results' => $total_results,
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
	lazyload($('#J_VanclSearch .pic img'), 'vancl');
	$('#J_VanclSearch a.J_TrackVancl').click(function() {
					X.trackVancl($(this));
				});
	$('#J_VanclPrice').click(function() {
				vanclItemSearch();
			});
	$('#J_VanclSpecial input[type="radio"]').change(
			function() {
				$('#J_VanclPageNo').val(1);// 页码设置为1
				vanclItemSearch();
			});
	var w = $(window);
	var right = w.width() + w.scrollLeft();
	$("#J_VanclSearch .vancl li").each(function() {
				productDetail($(this), right);
			})
})(Xwb, $);					
</script>
</html>
