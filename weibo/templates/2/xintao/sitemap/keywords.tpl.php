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


$site = F('escape', V('-:sysConfig/site_name'));
if ($type) {
	$title = '关键词地图';
?>
<title><?php echo $title.' - '.$site?></title>
<meta name="title" content="<?php echo $title.' - '.$site?>">
<meta name="keywords" content="<?php echo $site.','.$title?>">
<meta name="description" content="<?php echo $title.','.$site?>">

<?php }?>
<?php TPL::plugin('xintao/sitemap/css_link');?>
<?php TPL::plugin('include/js_link');?>
<style>
.box {margin-bottom:10px;}.box h2 {height:28px;line-height:26px;padding-left:8px;margin-bottom:5px;border:1px #CCC solid;background-color:#F5F5F5;clear:both;overflow:hidden;}.box h2 a{color:#900;}.box u{text-decoration:none;}.box u a{ width:183px;height:22px;line-height:22px;padding-left:6px;float:left;display:inline-block;overflow:hidden;}
</style>
</head>
<body id="pub">
	<div id="wrap">
		<div class="wrap-in">
			<!-- 头部 开始-->
			<?php TPL::plugin('xintao/sitemap/header',array('type'=>$type)); ?>
			<!-- 头部 结束-->
			<div id="container" style="background:none;background-color:white;">
				<div class="content" style="float:none;">
					<div class="main" style="margin-right:0px;">
						<div class="box">
							<?php


	if (isset ($keywords) && !empty ($keywords)) {
		$queryStr = F('taobao.taobao_default_search', array (
			'q' => 'Q'
		));
		$urlTemp = URL('items', array_filter($queryStr)); //过滤空属性，并生成模板URL
		foreach ($keywords as $word) {
			echo '<u><a class="Go" data-word="' . ($word) . '" href="' . str_replace('Q', urlencode(str_replace(array (
				'/',
				'-'
			), array (
				'',
				''
			), $word)), $urlTemp) . '" target="_blank">' . $word . '</a></u>';
		}

	}
?>
							<div class="ks-clear"></div>
						</div>
					</div>
				</div>
			</div>
			<!-- 底部 开始-->
			<?php TPL::module('footer');?>
			<!-- 底部 结束-->
		</div>
	</div>
	<?php TPL::module('gotop');?>
</body>
<script>
(function(X, $) {
	$('.box a.Go').click(function(){
		X.trackKeyword($(this));
	});
})(Xwb, $);
</script>
</html>
