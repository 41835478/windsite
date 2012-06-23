<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>商品管理 - 淘客推广 - 推广管理</title>
<link href="http://static.xintaowang.com/css/admin/admin.css" rel="stylesheet" type="text/css" />
<script src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
<script src="<?php echo W_BASE_URL;?>js/xintao/taokeitem.js?v=20111216"></script> 
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
	<div class="path"><p>当前位置：推广管理<span>&gt;</span>商品管理</p></div>
    <div  class="main-cont" style="padding-left:10px;">
		<div class="tab-box">
			<h5 class="tab-nav tab-nav-s1 clear" id="taokeItem-type">
				<a class="current"><span>商品详情</span></a>
				<a><span>微博详情</span></a>
			</h5>
			<div class="tab-con-s1" id="taokeItem-tabs" style="overflow:hidden;">
				<!-- tab内容 -->
				<div class="tab">
					<div class="health-main">
						<div class="search-area ks-clear" style="padding:10px;margin-bottom:5px;">
							<div style="float:left;width:550px;">
							<h3 style="font-size:13px;">您已经添加了&nbsp;<strong style="color:red;font-size:18px;"><?php echo count($list)?></strong>&nbsp;个淘宝客自动营销商品，最多&nbsp;<strong style="color:red;font-size:18px;">40</strong>&nbsp;个</h3>
							<p>1.系统每天根据添加的淘客商品自动发布(免费版<strong style="color:red;font-size:18px;">2x2</strong>个,<a href="#" rel="e:openAppstore">淘客/卖家服务</a><strong style="color:red;font-size:18px;">10x4</strong>个)淘客商品营销微博<br>
							2.<?php if(XT_IS_WEIBO=='true'&&XT_FREE_DATELINE==''){echo '当前营销速度（<strong style="color:#00FF00;font-size:18px;">快</strong>,每天<strong style="color:red;font-size:18px;">10x4</strong>条）';}else{echo '当前营销速度（<strong style="color:#FF0000;font-size:18px;">慢</strong>,每天<strong style="color:red;font-size:18px;">2x4</strong>条,<a href="#" rel="e:openAppstore">加速</a>）';}?></p>
							</div>
							<a rel="e:openTaokeItem" style="cursor: pointer;display: block;width: 98px;height: 38px;float: right;background: url(http://static.xintaowang.com/css/default/xintao/360/AddItemButton.png) no-repeat;_background: url(http://static.xintaowang.com/css/default/xintao/360/AddItemButton_ie6.png) no-repeat;"></a>
						</div>
		                <table width="100%" border="0" cellpadding="0" cellspacing="0" class="table">
		                    <colgroup>
		                    	<col class="w50" />
		                        <col />
		                        <col class="w100" />
		                    </colgroup>
		                    <thead class="tb-tit-bg">
		                        <tr>
		                        	<th><div class="th-gap"><a href="#" rel="e:deleteTaokeItem">删除</a></div></th>
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
		                    <tbody id="recordList">
		                    <?php
$isSynCat = false;
if (!empty ($list)) {
	foreach ($list as $row) {
		if (!$row['cid'] > 0) {
			$isSynCat = true;
		}
		echo '<tr><td><input type="checkbox" name="taoke_items" data-nid="' . $row['nid'] . '"></td>';
		echo '<td><ul><li><a class="item-title" target="_blank" href="/go/nid-' . $row['nid'] . '">' . ($row['isValid'] ? '【<strong style="color:red">推广中</strong>】' : '【<strong style="color:red">停止推广</strong>】') . $row['title'] . '</a></li><li>价格：' . $row['price'] . '　佣金：' . $row['commission'] . '　销量：' . $row['volume'] . '</li><li>分类：' . ($row['catName'] ? ('<a target="_blank" href="/go/cid-' . $row['cid'] . '">' . $row['catName'] . '</a>') : '尚未同步') . '</li><li>卖家：<a target="_blank" href="/go/shopnick-' . urlencode($row['nick']) . '">' . $row['nick'] . '</a></li></ul></td>';
		echo '<td>' . $row['nums'] . 'x4</td></tr>';
	}
} else {
	echo '<tr><td colspan=3>您尚未添加淘宝客自动营销商品</td></tr>';
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
	                    </colgroup>
	                    <thead class="tb-tit-bg">
	                        <tr>
	                            <th><div class="th-gap">微博内容</div></th>
	                            <th><div class="th-gap">发布时间</div></th>
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
<script type='text/javascript'>
$(function(){
		var switcher1 = new Switcher({
			items: $('#taokeItem-type a'),
			contents: $('#taokeItem-tabs>.tab'),
			trigMode: 'click',
			selectedCS: 'current'
		});
});
</script>
</html>
