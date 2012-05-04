<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>站点升级 - 审核管理 - 新淘管理</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
</head>
<body class="main-body">
	<div class="path"><p>当前位置：审核管理<span>&gt;</span>站点升级</p></div>
    <div class="main-cont">
        <h3 class="title">站点升级列表</h3>
		<div class="set-area">
        	<table class="table" cellpadding="0" cellspacing="0" width="100%" border="0">
            	<colgroup>
						<col class="w60"/>
                        <col class="w140" />
    					<col />
    			</colgroup>
                <thead class="tb-tit-bg">
  					<tr>
    					<th><div class="th-gap">用户标识</div></th>
    					<th><div class="th-gap">用户昵称</div></th>
                        <th><div class="th-gap">升级信息</div></th>
  					</tr>
                </thead>
				<tfoot class="tb-tit-bg"><tr><td colspan="3"><div class="pre-next"></div></td></tr></tfoot>
                <tbody>
<?php if (!empty($list)){?>
	<?php
		foreach($list as $upgrade){
	?>
                	<tr>
    					<td><?php echo $upgrade['user_id'];?></td>
    					<td><?php echo $upgrade['user_nick'];?></td>
                        <td><?php echo $upgrade['upgrade'];?></td>
  					</tr>
	<?php }?>
<?php }else{?>
<tr><td colspan="3"><p class="no-data">搜索不到任何数据</p></td></tr>
<?php }?>
                </tbody>
			</table>
    	</div>
</div>
</body>
</html>
