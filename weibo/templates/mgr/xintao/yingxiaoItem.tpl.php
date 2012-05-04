<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>商品统计 - 推广统计 - 推广管理</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<script src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
</head>
<body class="main-body">
	<div class="path"><p>当前位置：推广管理<span>&gt;</span>商品统计</p></div>
    <div  class="main-cont">
        <div class="search-area" style="padding-top:0px;">
        	<p class="tips-desc" style="padding-bottom:5px;color:red;font-weight:bold;">
        	<?php if(SYSTEM_SINA_USERNICK==''){?>必须<a href="/admin.php?m=mgr/xintao/active_admin.bindList" target="_self"text-decoration: underline;">绑定新浪微博帐号</a>才能正式生效。<?php }?>
        	<?php 
        		if(XT_IS_SELLER=='true'&&XT_FREE_DATELINE==''){//正常增值服务用户
        			echo '您的淘宝店铺已处于商品自动营销中...';
        		}elseif(XT_SID!=''){//淘宝卖家
        			if(XT_FREE_DATELINE!=''){//体验版
        				echo '您当前是体验版，建议您立刻订购卖家服务获得<strong style="color:red;font-size:18px;">20倍</strong>营销增速，届时微购淘宝客会员将自动协助您推广店铺与商品！';
        			}else{//过期
        				echo '您是淘宝卖家，建议订购我们的卖家服务获得<strong style="color:red;font-size:18px;">20倍</strong>营销增速，这样您的淘宝商品，将由我们的淘客会员每日自动发布商品营销微博！';	
        			}
        		}else{
        			echo '该功能目前仅针对淘宝卖家！';
        		}
        		
        	?><br/>(必须加入淘宝客推广计划，且订购微购卖家服务，微购淘宝客才能正式推广您的店铺和商品)</p>
        	<p class="tips-desc" style="padding-bottom:5px;">前提：1.您必须是淘宝卖家（即在淘宝拥有店铺），2.您必须加入淘宝的淘宝客推广计划，3.您必须订购微购的卖家服务</p>
        	<p class="tips-desc" style="padding-bottom:5px;">提示：您的淘宝商品将每天通过微购的淘宝客会员微博进行营销，随着淘客会员增多，您的商品营销数量及力度会日益加大
        	<?php if(SYSTEM_SINA_USERNICK==''){?><br/>
        	<span style="color:red;">您尚未绑定新浪微博，如果您在后台绑定新浪微博帐号，则淘客发布营销微博时，将自动@您的帐号，方便您在新浪查看</span>
        	<?php }?></p>
        </div>
        <div class="user-list">
            <table width="100%" border="0" cellpadding="0" cellspacing="0" class="table">
                <colgroup>
                    <col />
                    <col class="w80" />
                    <col class="w100" />
                    <col class="w80" />
                    <col class="w200" />
                </colgroup>
                <thead class="tb-tit-bg">
                    <tr>
                        <th><div class="th-gap">商品名称【累计<strong style="color:red;font-size:18px;"><?php echo $count;?>x4</strong>次营销】【<a style="font-weight:bold;font-size:14px;" target="_blank" href="http://img04.taobaocdn.com/imgextra/i4/71614142/T2KWWbXiXXXXXXXXXX_!!71614142.png">演示</a>】</div></th>
                        <th><div class="th-gap">价格</div></th>
                        <th><div class="th-gap">卖家</div></th>
                        <th><div class="th-gap">最近销量</div></th>
                        <th><div class="th-gap">营销[新浪,腾讯,搜狐,网易]</div></th>
                    </tr>
                </thead>
                <tfoot class="td-foot-bg">
                    <tr>
                        <td colspan="5">
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
                		$showUrl = '/go/nid-'.$row['nid'];
                    	if(XT_IS_WEIBO=='true'){
                    		$localShowUrl = URL('item',array('id'=>$row['nid']), 'index.php',2);
                    	}
                	?>
                    <tr>
                        <td><?php echo htmlspecialchars($row['title']).($row['isValid']?'【<strong style="color:red">推广中</strong>】':'【<strong style="color:red">停止推广</strong>】')?><br/><a href="<?php echo $showUrl;?>" target="_blank">淘宝地址</a>，<a href="<?php echo $localShowUrl;?>" target="_blank">本站地址</a></td>
                        <td><?php echo $row['price'];?></td>
                        <td><?php echo $row['nick'];?></td>
                        <td><?php echo $row['volume'];?></td>
                        <td><?php echo $row['nums'].'，'.$row['qq_nums'].'，'.$row['sh_nums'].'，'.$row['wy_nums'];?>(次数)</td>
                    </tr>
                <?php }} else {?>
                    <tr><td colspan="5"><p class="no-data">搜索不到任何数据</p></td></tr>
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
