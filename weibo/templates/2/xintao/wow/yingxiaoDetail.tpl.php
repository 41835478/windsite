<?php
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<link href="http://static.xintaowang.com/css/default/pub.css" rel="stylesheet" type="text/css" />
</head>
<body id="pub">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/header'); ?>
            
			<div id="container">
				<div class="extra">
					<!-- 站点导航 开始 -->
					<?php Xpipe::pagelet('common.siteNav'); ?>
					<!-- 站点导航 结束 -->
				</div>
				<div class="content">
					<div class="main-wrap">
						<div class="main">
                        	<div class="main-bd">
                       			<!-- 微博发布框 开始-->
								<?php Xpipe::pagelet('weibo.input'); ?>
                                <!-- 微博发布框 结束-->
                            </div>
						</div>
						<div class="aside">
							<!-- 用户信息 开始-->
							<?php Xpipe::pagelet('user.userPreview');?>
							<!-- 用户信息 结束-->
							
                        <?php


if (isset ($side_modules) && is_array($side_modules)) {
	foreach ($side_modules as $key => $mod) {
		Xpipe :: pagelet('component/component_' . $mod['component_id'] . '.run', $mod);
	}
}
//echo F('show_ad', 'sidebar', 'xad-box xad-box-p3');
?>
                        
						<?php echo F('show_ad', 'sidebar', '');?>
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
</html>
<!-- report -->
<img src="<?php echo F('report', 'pub');?>" class="hidden"/>
