<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php
	$screen_name = F('escape', $userinfo['screen_name']);
	$weibo_text = F('escape', $mblog_info['text']);
?>
<title><?php echo F('web_page_title', F('escape', $userinfo['screen_name']));?></title>
<meta name="title" content="<?php echo F('web_page_title', F('escape', $userinfo['screen_name']));?>">
<meta name="keywords" content="新浪微博<?php echo $screen_name?>">
<meta name="description" content="<?php echo $screen_name.'：'.$weibo_text?>">
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
</head>
<body>
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/header');?>
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
                                <div class="title-box">
									<h3><?php if ($uid == $userinfo['id']):?><?php LO('mblogDetail__show__myTitle');?><?php else:?><?php echo F('escape', $userinfo['screen_name']);?><?php endif;?><?php LO('mblogDetail__show__aWeibo');?></h3>
                                </div>
                                <?php 
								$params = array('mblog_info' => $mblog_info, 'is_show' => $is_show);
								Xpipe::pagelet('weibo.detail', $params);
								?>
                            </div>
						</div>
						<div class="aside">
							<!-- 用户信息 开始-->
							<?php Xpipe::pagelet('common.userPreview', $userinfo);?>
							<!-- 用户标签 开始-->
							<?php Xpipe::pagelet('common.userTag');?>
							<?php Xpipe::pagelet('common.sideComponents', array('type'=>2) );?>
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
