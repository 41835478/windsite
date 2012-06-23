<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>商品分享(卖家) - 推广管理</title>
<link href="http://static.xintaowang.com/css/admin/admin.css" rel="stylesheet" type="text/css" />
<script src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
<style>
.loading{ margin:15px auto 20px; width:20px; height:20px; background:url(http://static.xintaowang.com/css/default/bgimg/loading.gif) no-repeat;}
#recordList li{position:relative;}
#recordList li a.item-title{display:block;overflow:hidden;height:20px;width:340px;}		
</style>
<link href="http://static.xintaowang.com/assets/min/xintao.min.css" rel="stylesheet" type="text/css" />
</head>
<body class="main-body">
	<?php if(XT_SID!=''&&!(XT_IS_SELLER=='true'&&XT_FREE_DATELINE=='')){ echo ('<div id="J_NoTaoke" style="padding:10px;padding-left:30px;height:45px;background:url(http://static.xintaowang.com/css/default/xintao/360/Mainbanner_Danger.png) repeat-x;"><div style="padding:10px;padding-left:60px;height:20px;background:url(http://static.xintaowang.com/css/default/xintao/360/Error_L.png) no-repeat;color:#B11506;font-size:16px;font-weight:700;">您尚未订购卖家服务，无法自动同步您的商品分享，<a href="#" rel="e:openAppstore">立刻订购卖家服务？</a></div></div>'); }?>
	<div class="path"><p>当前位置：推广管理<span>&gt;</span>商品分享(卖家)</p></div>
    <div  class="main-cont" style="padding-left:10px;">
		<h3 class="title">每天全自动更新最多1000个您的淘宝商品(<a href="#" rel="e:openAppstore">需订购卖家服务</a>)，同时投放至<a style="color:red;font-size:16px;font-weight:bold;" href="#"><?php echo count($sites);?></a>个微购淘客独立推广站点(需加入淘宝客推广)！</h3>
		<div class="tab-box">
			<h5 class="tab-nav tab-nav-s1 clear" id="userItem-type">
				<a class="current"><span>商品分享</span></a>
				<a><span>投放详情</span></a>
			</h5>
			<div class="tab-con-s1" id="userItem-tabs" style="overflow:hidden;">
				<!-- tab内容 -->
				<div class="tab">
					<?php if(XT_IS_SELLER=='true'&&XT_FREE_DATELINE==''){?>
			        <table width="100%" border="0" cellpadding="0" cellspacing="0" class="table">
			            <colgroup>
			                <col style="width:400px;"/>
			                <col/>
			            </colgroup>
			            <thead class="tb-tit-bg">
			                <tr>
			                    <th><div class="th-gap">商品详情</div></th>
			                    <th><div class="th-gap">分享内容</div></th>
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
			
			            </tbody>
			        </table>
			        <?php }else{echo '<img src="http://img02.taobaocdn.com/imgextra/i2/71614142/T20JGiXitXXXXXXXXX_!!71614142.png">';}?>
			 	</div>
		        <div class="tab hidden">
		        	<table width="100%" border="0" cellpadding="0" cellspacing="0" class="table">
			            <colgroup>
			                <col style="width:400px;"/>
			                <col/>
			            </colgroup>
			            <thead class="tb-tit-bg">
			                <tr>
			                    <th><div class="th-gap">独立淘客推广站点</div></th>
			                    <th><div class="th-gap">分享地址<?php if(!(XT_IS_SELLER=='true'&&XT_FREE_DATELINE=='')){echo '（<a href="#" rel="e:openAppstore">订购卖家服务</a>且加入淘宝客推广可自动接入合作商家）';}?></div></th>
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
			            <tbody>
							<?php
if (!empty ($sites)) {
	foreach ($sites as $site) {
		$url = 'http://' . $site['domain'];
		echo '<tr><td><a href="' . $url . '" target="_blank">' . $site['domain'] . '</a></td><td>'.(XT_IS_SELLER=='true'&&XT_FREE_DATELINE==''&&XT_IS_TAOKE_SHOP=='true'?('<a href="' . $url . '/wow.shop/sub-' . XT_USER_ID . '" target="_blank">'.XT_SHOPS.'的商品分享推广地址</a>'):('<a href="' . $url . '/wow.shop" target="_blank">演示地址</a>')).'</td></tr>';
	}
}
?>
			            </tbody>
			        </table>
		        </div>
		    </div>
		</div>              
    </div>
</body>	
<script type="text/javascript">
$(function(){
	$(function(){
		var switcher1 = new Switcher({
			items: $('#userItem-type a'),
			contents: $('#userItem-tabs>.tab'),
			trigMode: 'click',
			selectedCS: 'current'
		});
	});
	$.get('/admin.php?m=mgr/xintao/wowMgr.synWowUserItem');
<?php if(XT_IS_SELLER=='true'&&XT_FREE_DATELINE==''){?>
	getWowUserItemList(1);
	function getWowUserItemList(page_no) {
	$('#recordList')
			.html('<tr><td colspan=2><div id="xweibo_loading" class="loading"></div></td></tr>');
	$.get('/admin.php?m=mgr/xintao/wowMgr.userItem', {
				'page' : page_no
			}, function(rst) {
				if (rst['errno'] > 0) {
					alert('获取失败:' + rst['err']);
					return;
				}
				$('#recordList').html(rst['rst']);
				$('#recordList .pre-next a').click(function() {
							var page = 1;
							if ($(this).hasClass('next')) {
								page = page_no + 1;
							} else if ($(this).hasClass('pre')) {
								page = page_no - 1;
							} else {
								page = $(this).text();
							}
							getWowUserItemList(page);
							return false;
						});

			});
}
<?php }?>
});
</script>
</html>
