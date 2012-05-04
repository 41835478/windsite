<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php 
if($userinfo){
	$site = F('escape',V('-:sysConfig/site_name'));
	$screen_name = F('escape', $userinfo['screen_name']);
	$description = F('escape', $userinfo['description']);
	$ta_url = W_BASE_HTTP.URL('ta', 'id='.$userinfo['id']);
?>
<title><?php echo F('web_page_title', F('escape', $userinfo['screen_name']));?></title>
<meta name="title" content="<?php echo F('web_page_title', F('escape', $userinfo['screen_name']));?>">
<meta name="keywords" content="<?php echo $screen_name.'新浪腾讯微博:'.$description.','.$ta_url?>">
<meta name="description" content="<?php echo $site.'为您提供关于'.$screen_name.'的新浪腾讯微博:'.$description.',地址:'.$ta_url?>">
<?php }?>
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
</head>
<body id="weibo">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/header');?>
			<div id="container">
				<div class="extra">
					<!-- 站点导航 开始 -->
					<?php Xpipe::pagelet('common.siteNav');?>
					<!-- 站点导航 结束 -->
				</div>
				<div class="content">
					<div class="main-wrap">
						<div class="main">
                        	<div class="main-bd">
                                <!-- 用户头部介绍 开始-->
								<?php Xpipe::pagelet('user.userHead', $userinfo ); ?>
                                <!-- 用户头部介绍 结束-->
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
                                <?php if ($userinfo['needPrivacy']) {Xpipe::pagelet('user.privacyNotice', $userinfo );} ?>
								<?php Xpipe::pagelet('weibo.userTimelineList', $userinfo ); ?>
								<?php if ($userinfo['needPrivacy']) {Xpipe::pagelet('user.privacyNotice', $userinfo );} ?>
                            </div>
						</div>
						<div class="aside">
							<div class="user-preview">
								<?php echo F('verified', $userinfo, 'profile');?>
							</div>
							<!-- 用户关注、粉丝、微博信息总数 开始-->
							<?php Xpipe::pagelet('common.userTotal', $userinfo ); ?>
							<!-- 用户关注、粉丝、微博信息总数 结束-->
							<!-- 推广区 开始-->
							<?php

?>


							<!-- 推广区 结束-->
							<!-- 用户标签 开始-->
							<?php Xpipe::pagelet('common.userTag', $userinfo);?>
							<!-- 用户标签 结束-->
							<!-- 可能感兴趣的人 开始-->
								<?php Xpipe::pagelet('common.magicFriends', $userinfo ); ?>
							<!-- 可能感兴趣的人 结束-->
							<!-- 关注的话题 -->
							<?php Xpipe::pagelet('common.subjectFollowed',$userinfo['id']); ?>
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
<img src="<?php echo F('report', 'ta');?>" class="hidden"/>
