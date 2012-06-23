<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>商品营销 - 推广统计 - 推广管理</title>
<link href="http://static.xintaowang.com/css/admin/admin.css" rel="stylesheet" type="text/css" />
<script src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
<script type="text/javascript">
var ISSELLER=<?php echo XT_IS_SELLER=='true'&&XT_FREE_DATELINE==''?'true':'false'?>;
</script>
<script src="<?php echo W_BASE_URL;?>js/xintao/useritem.js?v=20120501"></script> 
<style>
.search-area .search-block .s-btn, .btn-login, .btn-launch-event, .btn-ffirm, .select-user .click-btn, .search-host {background: url(http://static.xintaowang.com/css/default/bgimg/skin_btn.png) no-repeat;}
.mod-search {padding:0 0 15px; height:109px;}
.search-area {padding:16px 0 0 10px; }
.search-area .search-block { position:relative;height:42px; padding-left:5px; background-position:0 0; }
.search-area .search-inner { padding-right:104px; _padding-right:102px; height:100%;  background-position:right -47px; }
.search-area .search-block .input-txt { width:100%; border:1px solid #ccc;color:#999;font-family:inherit;font-size:14px;height:28px;line-height:22px; padding:3px 0 0 5px; margin:5px 0 0 ;_width:98.5%;}
.search-area .search-block .s-btn{ position:absolute; right:6px; top:5px; height:32px; width:86px; background-position:0 -48px;
 text-indent:-9999px;line-height:0;vertical-align:top;outline:none;cursor:pointer;}
.search-area .search-block .s-btn:hover {background-position:-103px -48px;}
.search-area .search-field .ico-join { padding-left:23px;background-position:0 -886px;}
.search-area .search-field .ico-follow { padding-left:20px;}
.search-area .search-field { margin-right:15px;padding:6px 0 0 10px;overflow:hidden;}
.search-area .search-field label { margin-right:17px; *margin-right:12px;}
.search-area .search-field input { margin-right:3px;  *margin-top:-5px;vertical-align:-2px; }
.search-area .search-field span { float:right; margin-left:15px;}
.search-area .cate-bar { height:24px; padding-left:10px; overflow:hidden;}
.search-area .cate-bar span { float:left; height:24px; margin-right:13px; line-height:24px; }
.search-area .cate-bar span a { font-size:12px; }
.search-result {margin:50px 0;padding-left:30px;}
.search-result p {font-size:13px;margin-left:50px;padding-top:12px;}
.win-item .win-box{padding:0px;}.win-item .box{padding-left:0px;}
.win-item select {vertical-align: middle;padding: 0px;margin: 0px;}
.loading{ margin:15px auto 20px; width:20px; height:20px; background:url(http://static.xintaowang.com/css/default/bgimg/loading.gif) no-repeat;}
#recordList li{position:relative;}
#recordList li a.item-title{display:block;overflow:hidden;height:20px;}		
</style>
<link href="http://www.xintaowang.com/assets/min/xintao.min.css" rel="stylesheet" type="text/css" />
</head>
<body class="main-body">
	<?php if(XT_SID!=''&&!(XT_IS_SELLER=='true'&&XT_FREE_DATELINE=='')){ echo ('<div id="J_NoTaoke" style="padding:10px;padding-left:30px;height:45px;background:url(http://static.xintaowang.com/css/default/xintao/360/Mainbanner_Danger.png) repeat-x;"><div style="padding:10px;padding-left:60px;height:20px;background:url(http://static.xintaowang.com/css/default/xintao/360/Error_L.png) no-repeat;color:#B11506;font-size:16px;font-weight:700;">您尚未订购卖家服务，淘宝客无法推广您的淘宝店铺，<a href="#" rel="e:openAppstore">立刻订购卖家服务？</a></div></div>'); }?>
	<div class="path"><p>当前位置：推广管理<span>&gt;</span>商品营销(卖家)</p></div>
    <div  class="main-cont" style="padding-left:10px;">
		<div class="tab-box">
			<h5 class="tab-nav tab-nav-s1 clear" id="userItem-type">
				<a class="current"><span>自动挑选商品</span></a>
				<a><span>手动挑选商品</span></a>
				<a><span>推广详情</span></a>
			</h5>
			<div class="tab-con-s1" id="userItem-tabs" style="overflow:hidden;">
		        <div class="tab">
					<div class="health-main">
						<div class="search-area ks-clear" style="padding:10px;margin-bottom:5px;">
							<div style="float:left;width:550px;">
								<p>系统每天自动同步您的淘宝人气商品，推广次序：手动挑选>自动挑选
									<?php if(XT_IS_SELLER=='true'){?>
										，<div class="btn-area"><a class="btn-general highlight" href="#" id="J_AutoYingxiaoItemChoose" data-value="<?php if(XT_IS_ITEMCLOSED=='true'){echo 'false';}else{echo 'true';}?>"><span><?php if(XT_IS_ITEMCLOSED=='true'){echo '开启自动挑选';}else{echo '关闭自动挑选';}?></span></a></div>
									<?php }?>
								</p>
							</div>
						</div>
		                <table width="100%" border="0" cellpadding="0" cellspacing="0" class="table">
		                    <colgroup>
		                        <col />
		                        <col class="w100" />
		                    </colgroup>
		                    <thead class="tb-tit-bg">
		                        <tr>
		                            <th><div class="th-gap">商品详情</div></th>
		                            <th><div class="th-gap">推广次数</div></th>
		                        </tr>
		                    </thead>
		                    <tfoot class="td-foot-bg">
		                        <tr>
		                            <td colspan="2">
		                                <div class="pre-next">
		
		                                </div>
		                            </td>
		                        </tr>
		                    </tfoot>
		                    <tbody id="recordList">
		                    <?php


$list = DS('xintao/userItem.getItems');
if (!empty ($list)) {
	foreach ($list as $row) {
		if (!$row['cid'] > 0) {
			$isSynCat = true;
		}
		echo '<td><ul><li><a class="item-title" target="_blank" href="/go/nid-' . $row['nid'] . '">' . ($row['isValid'] ? '【<strong style="color:red">推广中</strong>】' : '【<strong style="color:red">停止推广</strong>】') . $row['title'] . '</a></li><li>价格：' . $row['price'] . '　佣金：' . $row['commission'] . '　销量：' . $row['volume'] . '</li><li>分类：' . ($row['catName'] ? ('<a target="_blank" href="/go/cid-' . $row['cid'] . '">' . $row['catName'] . '</a>') : '尚未同步') . '</li><li>卖家：<a target="_blank" href="/go/shopnick-' . urlencode($row['nick']) . '">' . $row['nick'] . '</a></li></ul></td>';
		echo '<td>' . $row['nums'] . 'x4</td></tr>';
	}
} else {
	echo '<tr><td colspan=2>尚未同步您的淘宝店铺商品</td></tr>';
}
?>
		                    </tbody>
		                </table>
		             </div>
		        </div>
		        <!-- tab内容 -->
				<div class="tab hidden">
					<div class="health-main">
						<div class="search-area ks-clear" style="padding:10px;margin-bottom:5px;">
							<div style="float:left;width:550px;">
							<?php $list = DS('xintao/userItem.getItems','',1);?>
							<h3 style="font-size:13px;">您已经添加了&nbsp;<strong style="color:red;font-size:18px;"><?php echo count($list)?></strong>&nbsp;个自动营销商品，最多&nbsp;<strong style="color:red;font-size:18px;">40</strong>&nbsp;个</h3>
							<p>系统每天根据您添加的商品自动安排淘宝客发布商品营销微博</p>
							</div>
							<a <?php echo XT_SID!=''?'rel="e:openUserItem"':'href="javascript:alert(\'该功能仅对淘宝卖家开放！\');"'?> style="cursor: pointer;display: block;width: 98px;height: 38px;float: right;background: url(http://static.xintaowang.com/css/default/xintao/360/AddItemButton.png) no-repeat;_background: url(http://static.xintaowang.com/css/default/xintao/360/AddItemButton_ie6.png) no-repeat;"></a>
						</div>
		                <table width="100%" border="0" cellpadding="0" cellspacing="0" class="table">
		                    <colgroup>
		                    	<col class="w50" />
		                        <col />
		                        <col class="w100" />
		                    </colgroup>
		                    <thead class="tb-tit-bg">
		                        <tr>
		                        	<th><div class="th-gap"><a href="#" rel="e:deleteUserItem">删除</a></div></th>
		                            <th><div class="th-gap">商品详情</div></th>
		                            <th><div class="th-gap">推广次数</div></th>
		                        </tr>
		                    </thead>
		                    <tfoot class="td-foot-bg">
		                        <tr>
		                            <td colspan="3">
		                                <div class="pre-next">
		
		                                </div>
		                            </td>
		                        </tr>
		                    </tfoot>
		                    <tbody id="recordListCustome">
		                    <?php
$isSynCat = false;
$isSynTaokeItem = false;
if (!empty ($list)) {
	foreach ($list as $row) {
		if (!$row['cid'] > 0 || empty ($row['catName'])) {
			$isSynCat = true;
		}
		if (XT_IS_SELLER == 'true' && XT_FREE_DATELINE == '' && XT_IS_TAOKE_SHOP == 'true' && empty ($row['click_url'])) {
			$isSynTaokeItem = true;
		}
		echo '<tr><td><input type="checkbox" name="user_items" data-nid="' . $row['nid'] . '"></td>';
		echo '<td><ul><li><a class="item-title" target="_blank" href="/go/nid-' . $row['nid'] . '">' . ($row['isValid'] ? '【<strong style="color:red">推广中</strong>】' : '【<strong style="color:red">停止推广</strong>】') . $row['title'] . '</a></li><li>价格：' . $row['price'] . '　佣金：' . $row['commission'] . '　销量：' . $row['volume'] . '</li><li>分类：' . ($row['catName'] ? ('<a target="_blank" href="/go/cid-' . $row['cid'] . '">' . $row['catName'] . '</a>') : '尚未同步') . '</li><li>卖家：<a target="_blank" href="/go/shopnick-' . urlencode($row['nick']) . '">' . $row['nick'] . '</a></li></ul></td>';
		echo '<td>' . $row['nums'] . 'x4</td></tr>';
	}
} else {
	echo '<tr><td colspan=3>您尚未添加商品</td></tr>';
}
?>
		                    </tbody>
		                </table>
		             </div>
		        </div>
		        <div class='tab hidden' style="padding-top:10px;">
	                <table width="100%" border="0" cellpadding="0" cellspacing="0" class="table">
	                    <colgroup>
	                        <col />
	                        <col class="w150" />
	                        <col class="w150" />
	                    </colgroup>
	                    <thead class="tb-tit-bg">
	                        <tr>
	                            <th><div class="th-gap">微博内容</div></th>
	                            <th><div class="th-gap">作者(本人或淘客)</div></th>
	                            <th><div class="th-gap">发布时间</div></th>
	                        </tr>
	                    </thead>
	                    <tfoot class="td-foot-bg">
	                        <tr>
	                            <td colspan="3">
	                                <div class="pre-next">

	
	                                </div>
	                            </td>
	                        </tr>
	                    </tfoot>
	                    <tbody id="recordWeiboList">
	                    </tbody>
	                </table>
		        </div>
		   </div>
	   </div>
    </div>
</body>	
<?php if($isSynCat){?>
<script>
$(function(){
	$.get('/admin.php?m=mgr/xintao/yingxiaoWeibo.synCat');
})
</script>		
<?php	}?>
<?php if($isSynTaokeItem){?>
<script>
$(function(){
	$.get('/admin.php?m=mgr/xintao/yingxiaoWeibo.synTaokeItem');
})
</script>		
<?php	}?>
<script type='text/javascript'>
$(function(){
		var switcher1 = new Switcher({
			items: $('#userItem-type a'),
			contents: $('#userItem-tabs>.tab'),
			trigMode: 'click',
			selectedCS: 'current'
		});
		$('#J_AutoYingxiaoItemChoose').click(function(){
			var isClose = $(this).attr('data-value');
			Xwb.ui.MsgBox.confirm('您确定要'+(isClose=='true'?'关闭自动挑选':'开启自动挑选')+'？',
			'<strong style="color:red;">'+(isClose=='true'?'关闭后将仅自动营销您手动挑选的商品':'开启后系统每天自动同步您店铺内的人气商品')+'！</strong>', function(id) {
				if (id == 'ok') {
					$.ajax({
						type : 'POST',
						url : '/admin.php?m=mgr/xintao/xintao.setIsItemClose',
						dataType : 'json',
						data : {
							'isClose' : isClose
						},
						success : function(data) {
							if (isClose=='false') {
								$.get('/map.synItem',{},function(){
									location.reload();
								});
							}else{
								location.reload();
							}
						}
					});	
				}
			});
			
		});
});
</script>
</html>
