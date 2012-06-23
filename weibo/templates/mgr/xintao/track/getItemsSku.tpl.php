<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>商品统计 - 推广统计 - 推广管理</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
<style>.loading{ margin:15px auto 20px; width:20px; height:20px; background:url(http://static.xintaowang.com/css/default/bgimg/loading.gif) no-repeat;}</style>
</head>
<body class="main-body">
	<div class="path"><p>当前位置：推广管理<span>&gt;</span>商品统计</p></div>
    <div class="main-cont">
        <h3 class="title">本月通过您的微购站点访问您淘宝商品的统计数据</h3>
		<div class="set-area">
			<p class="tips-desc">说明:下表仅显示进入您淘宝店铺的商品访问情况（<strong style="color:red;">注：目前仅提供淘宝卖家自己的店铺商品统计</strong>）</p>
			<table class="table" cellpadding="0" cellspacing="0" width="100%" border="0">
				<colgroup>
						<col/>
						<col class="w100"/>
						<col class="w150"/>
						<col class="w100" />
						<col class="w100" />
				</colgroup>
			    <thead class="tb-tit-bg">
					<tr>
						<th><div class="th-gap">商品</div></th>
						<th><div class="th-gap">价格</div></th>
						<th><div class="th-gap">卖家</div></th>
						<th><div class="th-gap">访问次数</div></th>
						<th><div class="th-gap">用户数</div></th>
					</tr>
			    </thead>
			    <tbody id="J_GetItemsSku">
			    </tbody>
			 </table>
    	</div>
	</div>
</body>
<script>
$(function(){
	getItemsSkuAjax(1);
	function getItemsSkuAjax(pageNo){
		$('#J_GetItemsSku').html('<div id="xweibo_loading" class="loading"></div>');
		$.get('/admin.php?m=mgr/xintao/track.getItemsSkuAjax', {
				'page_no' : pageNo
			}, function(rst) {
				if (rst['errno'] > 0) {
					alert('获取失败:' + rst['err']);
					return;
				}
				$('#J_GetItemsSku').html(rst['rst']);
				$('#J_GetItemsSku .page a').click(function(){
					getItemsSkuAjax($(this).attr('data-page'));
					return false;
				});
			});
	}
});
</script>
</html>
