<?php 
if(!defined('IN_APPLICATION')){
	exit('ACCESS DENIED!');
}
$channels = V('-:poster');
$cid = V('G:cid');
$channel = isset($channels[$cid])?$channels[$cid]:'';
$htmlTitle = (empty($channel)?'导购画报':($channel['title'].' - 导购画报'));
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php F('web_page_seo',999,array(),array(),empty($channel)?'':($channel['title']));?>
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<link href="<?php echo W_BASE_URL;?>css/default/pub.css" rel="stylesheet" type="text/css" />
</head>
<body id="posters">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/header'); ?>
			<div id="container">
				<div class="content">
					<div class="main">
                		<div class="feed-list" style="margin-bottom:0px;padding-bottom:10px;">
                    		<div class="title-box" style="margin-bottom:0px;">
								<div class="feed-filter" style="float:left;">
									<?php
										if(empty($channel)){//如果未指定频道
											echo '<strong>全部</strong>|';
											foreach ($channels as $row) {
												if($row['isValid'])
												echo '<a href="'.URL('posters',array('cid'=>$row['id'])).'">'.$row['title'].'</a>|';
											}
										}else{
											echo '<a href="'.URL('posters').'">全部</a>|';
											foreach ($channels as $row) {
												if($row['isValid'])
												if($cid==$row['id']){
													echo '<strong>'.$row['title'].'</strong>|';	
												}else{
													echo '<a href="'.URL('posters',array('cid'=>$row['id'])).'">'.$row['title'].'</a>|';	
												}
											}
										}
									?>
								</div>
							</div>
						</div>
		            	<?php
		                	Xpipe::pagelet('component/component_99.run', array('title'=>'','component_id'=>'99','param'=>array('channel_id'=>$cid,'show_num'=>28,'show_size'=>'small','layout'=>'main-bd')) );
		                ?>
                    </div>
                 </div>   	
				<div class="aside xt-aside">
                   <?php
		               Xpipe::pagelet('component/component_98.run', array('title'=>'热门画报','component_id'=>'98','param'=>array('channel_ids'=>$cid,'show_num'=>20,'type'=>'HOT')) );
		               Xpipe::pagelet('component/component_98.run', array('title'=>'推荐画报','component_id'=>'98','param'=>array('channel_ids'=>$cid,'show_num'=>20,'type'=>'RECOMMEND')) );
	               ?>
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
