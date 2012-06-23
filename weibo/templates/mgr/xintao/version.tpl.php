<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>版本说明</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
<style>
.yes,.no{display:block;width:13px;height:13px;text-indent:-9999px;overflow:hidden;margin:0 auto;background:url(http://static.xintaowang.com/css/default/xintao/check_green.gif) no-repeat;}
.no{background:url(http://static.xintaowang.com/css/default/xintao/close_red.gif) no-repeat;}
</style>
</head>
<body class="main-body">
	<div class="path"><p>当前位置：版本说明</p></div>
    <div class="main-cont">
		<div class="set-area">
			<?php TPL::plugin('mgr/xintao/versionTable',false,false); ?>
    	</div>
</div>
</body>
</html>
