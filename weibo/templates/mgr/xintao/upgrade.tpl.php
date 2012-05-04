<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>升级服务</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
</head>
<body class="main-body">
	<div class="path"><p>当前位置：升级服务</p></div>
    <div class="main-cont">
		<h3 class="title">增值服务列表(提醒：订购增值服务后，需要<a href="<?php echo TB_CONTAINER;?>" target="_top">重新登录</a>管理员后台)</h3>
		<div class="box" style="padding-left:0px;">
		<?php TPL :: module('xintao/appstore');?>
		</div>
	</div>		
</body>
</html>
