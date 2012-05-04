<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<title>页面设置 - 页面模块 - 界面管理</title>

<link type="text/css" rel="stylesheet" href="<?php echo W_BASE_URL;?>css/admin/admin.css" media="screen" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin/jquery-ui-1.8.11.custom.min.js"></script>
<script type="text/javascript">
	var pageID= <?php echo $page_id;?>;
</script>
<style type="text/css">.win-pub{width:700px;}.form-box{height:380px;}</style>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/pagesetting.js"></script>
</head>

<body class="main-body">
	<div class="path"><p>当前位置：界面管理<span>&gt;</span><a href="<?php echo URL('mgr/page_manager') ?>">页面设置</a><span>&gt;</span><?php echo $page['page_name'];?>设置</p></div>
	<div class="main-cont">
		<h3 class="title"><?php echo $page['page_name'];?>设置(<strong style="color:red">左右两侧建议尺寸178X390</strong>)</h3>
		<div class="drag-area clear">
			<div class="caption-box"><span>logo位置</span></div>
			<div class="drag-area-middle" id="left" style="width:195px;float:left;">
				<?php if (isset($left_modules) && is_array($left_modules) && count($left_modules)==1) {foreach($left_modules as $m) {?>
					<div class="drag-box"  data="<?php echo $m['id']; ?>" component="<?php echo $m['component_id']; ?>">
						<h4>
						<span>
						<a href="#" onclick="openPop('<?php echo URL('mgr/page_manager.editComponentView', array('page_id'=>$page_id, 'id'=>$m['id'])).'\',\''.$m['title'].'设置\','.$m['component_id'] ;?>);return false;" >设置</a>
						</span>
						<?php echo F('escape', $m['name']);?>
						</h4>
					</div>
				<?php }} else {?>
				<p class="no-data">
					您添加的页面还没有内容,您可以添加一些模块
				</p>
				<?php }?>
			</div>
			<div class="drag-area-middle" style="width:350px;margin-left:10px;float:left;">
				<div class="caption-box"><span>视频播放器</span></div>
			</div>
			<div class="drag-area-right" id="right" style="margin-top:0px;">
				<?php if (isset($right_modules) && is_array($right_modules) && count($right_modules)==1) {foreach($right_modules as $m) {?>
					<div class="drag-box"  data="<?php echo $m['id']; ?>" component="<?php echo $m['component_id']; ?>">
						<h4>
						<span>
						<a href="#" onclick="openPop('<?php echo URL('mgr/page_manager.editComponentView', array('page_id'=>$page_id, 'id'=>$m['id'])).'\',\''.$m['title'].'设置\','.$m['component_id'] ;?>);return false;" >设置</a>
						</span>
						<?php echo F('escape', $m['name']);?>
						</h4>
					</div>
				<?php }} else {?>
				<p class="no-data">
					您添加的页面还没有内容,您可以添加一些模块
				</p>
				<?php }?>
			</div>
		</div>
		<?php if(XT_IS_SELLER=='true'){?>
		<p>
			<p class="tips-desc" style="color:red;">1.如果选择显示配置的广告联盟，则视频播放器两侧显示您上边配置的左右侧边栏广告</p>
			<p class="tips-desc" style="color:red;">2.如果选择显示卖家自己的商品推广，则视频播放器两侧显示您店铺内的商品推广，上边的广告联盟代码配置无效</p>
			<?php
				if(XT_TVAD_IS_SELLER=='true'){
					echo '<a class="btn-general" href="#" id="J_TVPlayAdNotSeller"><span>显示配置的广告联盟</span></a>';
				}else{
					echo '<a class="btn-general" href="#" id="J_TVPlayAdSeller"><span>显示卖家自己的商品推广</span></a>';		
				}
			?>
		</p>
		<script>
		$(function(){
			$('#J_TVPlayAdNotSeller').click(function(){
				setTVPlayAd('notSeller');
				return false;
			});
			$('#J_TVPlayAdSeller').click(function(){
				setTVPlayAd('isSeller');
				return false;
			});
			function setTVPlayAd(isSeller){
				Xwb.request.postReq(mkUrl('mgr/xintao/xintao', 'setIsTVPlayAd'), {
					isSeller:isSeller
				}, function(r) {
					if (r.isOk()) {
						Xwb.ui.MsgBox.success('提示', '保存成功', function(id) {
									if (id == 'ok') {
										location.reload();
									}
								});
					} else {
						Xwb.ui.MsgBox.alert('提示', r.getMsg());
					}
				});
		
			}
		});
		</script>
		<?php } ?>
	</div>
</body>
</html>
