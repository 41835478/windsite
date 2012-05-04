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


$page = V('g:page_no', 1);
$site = F('escape', V('-:sysConfig/site_name'));
if ($type) {
	$title = '商品地图';
?>
<title><?php echo $title.($page>1?('第'.$page.'页'):'').' - '.$site?></title>
<meta name="title" content="<?php echo $title.($page>1?('第'.$page.'页'):'').' - '.$site?>">
<meta name="keywords" content="<?php echo $site.','.$title?>">
<meta name="description" content="<?php echo $title.','.$site?>">

<?php }?>
<?php TPL::plugin('xintao/sitemap/css_link');?>
<?php TPL::plugin('include/js_link');?>
<style>
.box {margin-bottom:10px;}.box h2 {height:28px;line-height:26px;padding-left:8px;margin-bottom:5px;border:1px #CCC solid;background-color:#F5F5F5;clear:both;overflow:hidden;}.box h2 a{color:#900;}.box u{text-decoration:none;}.box u a{ width:183px;height:22px;line-height:22px;padding-left:6px;float:left;display:inline-block;overflow:hidden;}
.item_box u a{width:370px;text-align:left;height:30px;line-height:30px;}
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
						<div class="box item_box">
							<?php
	if (isset ($items) && !empty ($items)) {
		foreach ($items as $item) {
			echo '<u><a class="Go" data-nid="'.$item['num_iid'].'" href="/item/id-' . $item['num_iid'] . '" target="_blank">' . $item['title'] . '</a></u>';
		}
	}
	$pager = APP :: N('TaobaoPager', $total_results, 40, $page);
?>
							<div class="ks-clear"></div>
						</div>
						<div class="pagination" style="width:756px;" align="center">
							<div class="page-bottom" style="width:450px;">
							<?php
							
							echo $pager->show('sitemap.item', array(), 'bottom');
							?>
								<div class="ks-clear"></div>
							</div>
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
	$('.item_box a.Go').click(function(){
		X.trackItem($(this));
	});
})(Xwb, $);
</script>
</html>
