<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>店铺营销 - 推广统计 - 推广管理</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<script src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
</head>
<body class="main-body">
	<?php if(XT_SID!=''&&!(XT_IS_SELLER=='true'&&XT_FREE_DATELINE=='')){ echo ('<div id="J_NoTaoke" style="padding:10px;padding-left:30px;height:45px;background:url(http://static.xintaowang.com/css/default/xintao/360/Mainbanner_Danger.png) repeat-x;"><div style="padding:10px;padding-left:60px;height:20px;background:url(http://static.xintaowang.com/css/default/xintao/360/Error_L.png) no-repeat;color:#B11506;font-size:16px;font-weight:700;">您尚未订购卖家服务，淘宝客无法推广您的淘宝店铺，<a href="#" rel="e:openAppstore">立刻订购卖家服务？</a></div></div>'); }?>
	<div class="path"><p>当前位置：推广管理<span>&gt;</span>店铺营销</p></div>
    <div  class="main-cont">
        <div class="user-list">
            <table width="100%" border="0" cellpadding="0" cellspacing="0" class="table">
                <colgroup>
                    <col />
                    <col class="w150" />
                    <col class="w150" />
                </colgroup>
                <thead class="tb-tit-bg">
                    <tr>
                        <th><div class="th-gap">微博内容【累计<strong style="color:red;font-size:18px;"><?php echo $count;?>x4</strong>次营销】【<a style="font-weight:bold;font-size:14px;" target="_blank" href="http://img04.taobaocdn.com/imgextra/i4/71614142/T2m9mXXXpXXXXXXXXX_!!71614142.png">演示</a>】【<a style="font-weight:bold;font-size:14px;" target="_blank" href="http://img02.taobaocdn.com/imgextra/i2/71614142/T28GObXf4aXXXXXXXX_!!71614142.png">单条微博演示</a>】</div></th>
                        <th><div class="th-gap">作者(淘客)</div></th>
                        <th><div class="th-gap">发布时间</div></th>
                    </tr>
                </thead>
                <tfoot class="td-foot-bg">
                    <tr>
                        <td colspan="3">
                            <div class="pre-next">
                            <?php if (isset($list) && is_array($list) && !empty($list)) { echo $pager; }?>	
                            </div>
                        </td>
                    </tr>
                </tfoot>
                <tbody id="recordList">
                <?php if (isset($list) && is_array($list) && !empty($list)) {foreach ($list as $key => $row) {?>
                	<?php 
                		$localShowUrl = 'javascript:alert(\'需要订购增值服务(卖家服务/淘客服务)\');return false;';
                		$localTaUrl = 'javascript:alert(\'需要订购增值服务(卖家服务/淘客服务)\');return false;'; 
                		$showUrl = 'http://api.t.sina.com.cn/'.$row['uid'].'/statuses/'.$row['id'];
                    	$taUrl = 'http://weibo.com/'.$row['uid'];
                    	$qqShowUrl='';
                    	if($row['qq_id']>0){
                    		$qqShowUrl = '，<a href="http://t.qq.com/p/t/'.$row['qq_id'].'" target="_blank">腾讯地址</a>';
                    	}else{
                    		$qqShowUrl = '，腾讯地址';
                    	}
                    	$shShowUrl = '';
						if (!empty ($row['sh_id'])) {
							$shShowUrl = '，<a href="http://t.sohu.com/m/' . $row['sh_id'] . '" target="_blank">搜狐地址</a>';
						} else {
							$shShowUrl = '，搜狐地址';
						}
						$wyShowUrl = '';
						if (!empty ($row['wy_id'])) {
							$wyShowUrl = '，<a href="http://t.163.com/' . (WB_WY_NICK != '' ? WB_WY_NICK : '4374334249') . '/status/' . $row['wy_id'] . '" target="_blank">网易地址</a>';
						} else {
							$wyShowUrl = '，网易地址';
						}			
                    	if(XT_IS_WEIBO=='true'){
                    		$localShowUrl = URL('show',array('id'=>$row['id']), 'index.php',2);
                    		$localTaUrl = URL('ta',array('id'=>$row['uid']), 'index.php',2);
                    	}
                	?>
                    <tr>
                        <td><?php echo htmlspecialchars($row['weibo'])?><br/><a href="<?php echo $showUrl;?>" target="_blank">新浪地址</a><?php echo $qqShowUrl . $shShowUrl . $wyShowUrl ?>，<a href="<?php echo $localShowUrl;?>" target="_blank">本站地址</a></td>
                        <td><?php echo htmlspecialchars($row['nickname']);?><br/><a href="<?php echo $taUrl;?>" target="_blank">新浪地址</a>，<a href="<?php echo $localTaUrl;?>" target="_blank">本站地址</a></td>
                        <td><?php echo date('Y-m-d H:i:s', $row['addtime']);?></td>
                    </tr>
                <?php }} else {?>
                    <tr><td colspan="3"><p class="no-data">搜索不到任何数据</p></td></tr>
                <?php }?>
                </tbody>
            </table>
        </div>
        <div class="box" style="padding-left:0px;">
		<?php TPL :: module('xintao/appstore');?>
		</div>
    </div>
</body>
</html>
