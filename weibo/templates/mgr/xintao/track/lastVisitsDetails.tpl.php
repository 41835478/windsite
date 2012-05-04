<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>访客记录 - 推广统计 - 推广管理</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
</head>
<body class="main-body">
	<div class="path"><p>当前位置：推广管理<span>&gt;</span>访客记录</p></div>
    <div class="main-cont">
        <h3 class="title">最近5个访客列表</h3>
		<div class="set-area">
		
        	<table class="table" cellpadding="0" cellspacing="0" width="100%" border="0">
            	<colgroup>
            			<col class="w60"/>
						<col class="w150"/>
    					<col class="w150" />
    					<col />
    			</colgroup>
                <thead class="tb-tit-bg">
  					<tr>
  						<th><div class="th-gap">序号</div></th>
    					<th><div class="th-gap">日期</div></th>
    					<th><div class="th-gap">来源</div></th>
                        <th><div class="th-gap">动作</div></th>
  					</tr>
                </thead>
				<tfoot class="tb-tit-bg"><tr><td colspan="4"><div class="pre-next"></div></td></tr></tfoot>
                <tbody>
<?php if (!empty($list)){?>
	<?php
		$count=1;
		foreach($list as $visit){
	?>
                	<tr>
                		<td valign="top"><?php echo $count++;?></td>
    					<td valign="top"><?php echo $visit['serverDatePrettyFirstAction'].'   '.$visit['serverTimePrettyFirstAction'];?><br/>IP:<?php echo $visit['visitIp'];?></td>
    					<td valign="top"><?php F('piwik.convertReferrer',$visit);?></td>
                        <td>
                        <strong><?php echo $visit['actions'];?>动作- <?php echo $visit['visitDurationPretty'];?></strong>
                        <?php
                        	if($visit['actions']>0){
                        		echo '<br/><ol>';
                        		$actions = $visit['actionDetails'];
                        		foreach($actions as $action){
                        			if($action['type']=='outlink'){
                        				echo '<li title="'.$action['serverTimePretty'].' - '.$action['url'].'">（跳出）<a href="'.$action['url'].'" target="_blank">'.$action['url'].'</a></li>';
                        			}else{
                        				echo '<li title="'.$action['serverTimePretty'].' - '.$action['url'].'">'.$action['pageTitle'].'<br/><a href="'.$action['url'].'" target="_blank">'.$action['url'].'</a></li>';	
                        			}
                        			
                        		}
                        		echo '</ol>';
                        	}
                        	
                        ?></td>
  					</tr>
	<?php }?>
<?php }else{?>
<tr><td colspan="4"><p class="no-data">搜索不到任何数据</p></td></tr>
<?php }?>
                </tbody>
			</table>
    	</div>
</div>
</body>
</html>
