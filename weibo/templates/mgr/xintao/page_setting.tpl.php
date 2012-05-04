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
		<h3 class="title"><?php echo $page['page_name'];?>设置</h3>
		<div class="drag-area clear">
			<div class="caption-box"><span>logo位置</span></div>
			<div class="drag-area-middle" id="middle">
				<?php if (isset($single_modules) && is_array($single_modules) && !empty($single_modules)) { foreach($single_modules as $m) { ?>
				<div class="drag-box" data="<?php echo $m['id']; ?>" component="<?php echo $m['component_id']; ?>">
					<h4>
						<span>
						<?php if (16 != $m['component_id'] ) { // 微博发布框不用设置 ?>
						<a href="#" onclick="openPop('<?php echo URL('mgr/page_manager.editComponentView', array('page_id'=>$page_id, 'id'=>$m['id'])).'\' ,\''.$m['title'].'设置\','.$m['component_id'] ;?>);return false;" >设置</a>
						<?php } ?>
						
						<?php if(empty($m['isNative'])) { ?>
							<a href="#" onclick="delConfirm('<?php echo URL('mgr/page_manager.delComponent', array('page_id'=>$page_id, 'pmId'=>$m['id']));?>');return false;" title="删除">删除</a>
						<?php } ?>
						</span>

						<?php echo F('escape', $m['newTitle']);?>
						<em style='color:#707070'> — <?php echo F('escape',$m['name'])?></em>
					</h4>
				</div>
				<?php }?>
				<?php } else {?>
				<p class="no-data">
					您添加的页面还没有内容,您可以添加一些模块
				</p>
				<?php }?>
				<?php if(!in_array($page_id,array(998,999,800))){?>
					<?php if(isset($single_modules) && is_array($single_modules) && count($single_modules)<6){?>
					<a class="btn-general" href="#" onclick="newPop('<?php echo URL('mgr/page_manager.componentCategory', array('page_id'=>$page_id, 'componentType'=>3));?>','添加新组件','712');return false;"><span>添加主体模块</span></a>
					<?php }else{echo '<a class="btn-general"><span>目前仅允许添加6个模块</span></a>';}?>
				<?php }?>
			</div>
		</div>
		<p>
			<a class="btn-general highlight" target="_blank" href="<?php echo URL("{$page['url']}", array('page_id'=>$page_id), 'index.php',2);?>"><span>预览</span></a>
			<?php if(!in_array($page_id,array(998,999,800))){?><a class="btn-general" href="javascript:;" id="saveSort"><span>保存排序</span></a><?php }?>
		</p>
	</div>
</body>
</html>
