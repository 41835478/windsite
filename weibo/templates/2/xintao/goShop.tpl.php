<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-cn" lang="zh-cn">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Language" content="utf-8" />
<?php
$site = F('escape',V('-:sysConfig/site_name'));
if ($shop) {
	$title  = $shop['shop_title'];
?>
<title><?php echo $site.'正带您去'.$title.'-'.$site?></title>
<meta name="title" content="<?php echo $site.'正带您去'.$title.'-'.$site?>">
<meta name="keywords" content="<?php echo $site.','.$title?>">
<meta name="description" content="<?php echo $title.','.$site.'为您提供淘宝网优质店铺：'.$title.'的产品,评价信息。'?>">
<?php }else{?>
<meta name="robots" content="noindex,nofollow">	
<meta name="Description" content="<?php echo $site?>为您提供专业的淘宝购物导航" />
<meta name="keywords" content="<?php echo $site?>" /> 
<title>最专业的淘宝店铺购物导航 - <?php echo $site?></title>
<?php }?> 
<style type="text/css">
* {margin: 0;padding: 0;}
body{background:none;color: #7D7D7D;text-align: center;font: 12px/1.5em Verdana,Arial;height: 100%;}
.notice {display:none;position: relative;width: 98%;margin: 0 auto;text-align: center;}
.ticket_location {position: relative;width: 448px;height: 254px;margin: 0 auto;}
.ticket_location .n_zone {position: absolute;top: 120px;left: 0;width: 448px;height: 254px;background: #F6F6F6;border: 2px #CCC solid;}
.ticket_location .n_zone h1 {height: 85px;clear: both;}.exp {display: none;}.ticket_location .n_zone .n_info {font-size: 14px;padding-top: 10px;}.red {color: red;}a.red:link, a.red:visited, a.red:active {color: red;text-decoration: none;}
</style>
</head>
<body>
<?php
	$shopTitle = '淘宝网';
	if ($shop) {
		$shopTitle = $shop['shop_title'];
	}
?>
<div class="notice">
	<div class="ticket_location" id="jump_div"> 
			<div class="n_zone">
				<h1><span class="exp"><?php echo $site.'。http://'.XT_SITE_DOMAIN?></span></h1>
				<p><img src="http://imgcache.qq.com/club/go/img/go_loading.gif" alt="请稍候......" /></p>
				<p class="n_info"><?php echo $site?>正带您去<strong class="red"><?php echo $shopTitle?></strong>，请稍等。</p>
                <p class="n_info">
                    如果浏览器没有自动跳转，请
                    <a id='jump' href="<?php echo $click_url?>" class="red">点击这里</a>
                </p>
			</div>
		</div> 
</div>
<?php
if (XT_IS_WEIBO == 'true' && XT_PIWIK_ID > 0) {
?>
<!-- Image Tracker -->
<img src="http://track.xintaowang.com/piwik.php?idsite=<?php echo XT_PIWIK_ID;?>&amp;rec=1&amp;action_name=<?php echo urlencode('有效推广：'.$itemTitle);?>&amp;urlref=<?php echo urlencode($_SERVER['HTTP_REFERER']);?>" style="border:0" alt="" />
<!-- End -->
<?php }?>
<?php if (V('-:sysConfig/third_code', false)): ?>
	<?php echo '<div style="hidden">'.V('-:sysConfig/third_code').'</div>';?>
<?php endif; ?>
<script type="text/javascript">
function start_jump() {
	window.top.location = "<?php echo $click_url?>";
};
window.setTimeout( start_jump , 100);
</script>
</body>
</html>