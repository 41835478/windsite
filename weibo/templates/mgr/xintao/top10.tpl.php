<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>营销排行榜 - 推广统计 - 推广管理</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
</head>
<body class="main-body">
	<div class="path"><p>当前位置：推广统计<span>&gt;</span>营销排行榜</p></div>
    <div class="main-cont">
        <?php TPL :: module('xintao/yingxiao/top10');?>
        <p class="tips-desc">
        1.次数：指由本人或淘客已发布推广的营销微博的条数<br/>
        2.淘客：指正在推广该卖家的淘宝客人数（需订购卖家服务）<br/>
        3.详情：点击具体微博平台查看营销微博详细情况
        </p>
		<div class="box ks-clear" style="padding-left:0px;">
		<?php TPL :: module('xintao/appstore');?>
		</div>
	</div>
</body>
</html>
