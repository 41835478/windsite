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
$cName = '';
if (!empty ($xiaohua)) {
	$cat = V('-:xiaohua/' . $xiaohua['type']);
	if (!empty ($cat)) {
		$cName = $cat['title'];
	}
	$title = $xiaohua['title'];
	$desc = $xiaohua['cSize'] > 300 ? F('tv.utf8Substr', $xiaohua['content'], 0, 100) : $xiaohua['content']; //截取
	$desc = F('autoCron.str_replace_limit', $xiaohua['title'], '', $desc, 1); //移除内容中的标题

	echo '<title>' . $title . '-' . $cName . '-笑话大全-' . $site . '</title>';
	echo '<meta name="title" content="' . $title . '-' . $cName . '-笑话大全-' . $site . '">';
	echo '<meta name="keywords" content="' . $cName . ',' . $title . ',' . $site . '">';
	echo '<meta name="description" content="' . $title . '：' . $desc . '">';
	
} else {
	echo '<title>笑话大全-' . $site . '</title>';
}
?>
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<link href="<?php echo W_BASE_URL;?>css/default/pub.css" rel="stylesheet" type="text/css" />
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
                        		<?php

if (!empty ($xiaohua)) {
?>
                        		<div class="title-box">
									<h3><?php echo $xiaohua['title']?></h3>
                                </div>
                                <p class="feed-main" style="margin-bottom:20px;">
                                	<?php echo F('autoCron.str_replace_limit',$xiaohua['title'], '', $xiaohua['content'], 1);?>
                                </p>
                                <!-- 站内店铺开始 -->
                                <?php
if(XT_IS_SELLER=='true'){
$shops = str_replace(array (
	'[',
	']'
), array (
	'',
	''
), XT_SHOPS);
if ($shops) {
	$nicks = explode(',', $shops);
	$nick = array_rand($nicks);
	Xpipe :: pagelet('component/component_106.run', array (
		'param' => array (
			'isVolume' => '1',
			'isCredit' => '1',
			'nick' => $nicks[$nick],
			'order_by' => 'popularity:desc'
		)
	));
}	
}                                
?>
                                <!-- 站内店铺结束 -->
                                <?php Xpipe :: pagelet('xintao.tvTopic', empty($cName)?'笑话':$cName);?>
                                <?php

} else {
	echo '未找到该条笑话';
}
?>
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
