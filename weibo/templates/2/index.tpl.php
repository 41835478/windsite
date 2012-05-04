<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php echo F('web_page_title', false, V('g:skinset', false)? L('index__default__skinSetTitle') : false);?></title>
<?php TPL::plugin('include/css_link');?>
<?php
if (trim(V('g:skinset')) == 1)
	:
?>
<link href="<?php echo W_BASE_URL ?>css/default/skin_set.css" rel="stylesheet" type="text/css" />
<?php
 endif;
?>
<?php TPL::plugin('include/js_link');?>
</head>
<body id="home" class="own">
	<?php


if (trim(V('g:skinset')) == 1) {
	Xpipe :: pagelet('common.userSkin');
}
?>
	<div id="wrap">
		<div class="wrap-in">
			<!-- 头部 开始-->
			<?php TPL::plugin('include/header');?>
            <!-- 头部 结束-->
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
                                <!-- 微博列表 开始-->                	
                                
				<?php if (empty($list) && empty($filter_type)):?>
					<!-- 初始化页面 -->
					<div class="index-default">
					<?php if (V('g:page', 1) > 1):?>
						<div class="default-tips">
							<div class="icon-tips"></div>
							<p><?php LO('index__default__endPageTip');?></p>
						</div>
					<?php else:?>
						<div class="default-tips">
							<div class="icon-tips"></div>
							<p><?php LO('index__default__emptyWeiboTip');?></p>
							<p><?php LO('index__default__showMoreWeiboTip', URL('search.recommend'), "javascript:$('#publish_box textarea').focus(),void(0);");?></p>
						</div>
						<?php Xpipe::pagelet('user.hotUser'); ?>
						<?php endif;?>
					</div>
					<!-- end 初始化页面 -->
				<?php
 else
	:
	//聚焦位更换成站点店铺(随机取其中一个)
	if (XT_IS_SELLER == 'true') {
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
				<?php


$param = array (
	'list' => $list,
	'limit' => $limit,
	'not_found_msg' => L('index__default__notFoundTip', URL('index')),
	'list_title' => L('index__default__listTitle'),
	'filter_type' => $filter_type
);
Xpipe :: pagelet('weibo.weiboList', $param);
?>

				<?php endif;?>
				<!-- 微博列表 结束-->
                            </div>
                        </div>
						<div class="aside">
							<!-- 用户信息 开始-->
							<?php Xpipe::pagelet('common.userPreview');?>
							<?php

?>


							<!-- 用户标签 开始-->
							<?php TPL::module('user_tag');?>    
							<?php Xpipe::pagelet('common.sideComponents', array('type'=>2) );?>
							<!-- 关注的话题 -->
							<?php Xpipe::pagelet('common.subjectFollowed',USER::uid()); ?>
							<!-- 关注的话题 -->	
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
<img src="<?php echo F('report');?>" class="hidden"/>
