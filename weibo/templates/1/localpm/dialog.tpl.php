<?php 
if(!defined('IN_APPLICATION')){
	exit('ACCESS DENIED!');
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php echo F('web_page_title');?></title>
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
</head>
<body id="messages">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/header');?>
			<div id="container">
				<div class="content">
					<div class="main">
						<?php Xpipe::pagelet('localpm.dialog');?>
					</div>
				</div>
				<div class="aside">
					<!-- 用户信息 开始-->
                    <?php Xpipe::pagelet('common.userPreview');?>
                    <?php Xpipe::pagelet('common.userMenu');?>
                    <!-- 用户信息 结束-->
				</div>
			</div>
			<!-- 底部 开始-->
			<?php TPL::module('footer');?>
			<!-- 底部 结束-->
		</div>
	</div>
	<?php TPL::module('gotop');?>
</body>
</html>
