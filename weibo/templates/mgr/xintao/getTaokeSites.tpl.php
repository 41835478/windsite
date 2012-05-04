<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>淘站推广 - 推广统计 - 推广管理</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
</head>
<body class="main-body">
	<div class="path"><p>当前位置：推广统计<span>&gt;</span>淘站推广</p></div>
    <div class="main-cont">
        <h3 class="title">提醒：您的淘宝店铺必须加入淘宝客推广后，才能正常推广<?php if ($result) {if (isset ($result['count']) && $result['count'] != 0) {echo '，目前已投放至约<strong style="font-size:18px;color:red;">' . $result['count'] . '</strong>个独立的淘宝客站点';}}?></h3>
        	<table class="table" cellpadding="0" cellspacing="0" width="100%" border="0">
            	<colgroup>
						<col/>
                        <col class="w250" />
    					<col class="w250" />
    					<col class="w100" />
    			</colgroup>
                <thead class="tb-tit-bg">
  					<tr>
    					<th><div class="th-gap">站点名称</div></th>
    					<th><div class="th-gap">站点地址</div></th>
                        <th><div class="th-gap">店铺推广</div></th>
                        <th><div class="th-gap">商品推广</div></th>
  					</tr>
                </thead>
				<tfoot class="tb-tit-bg"><tr><td colspan="4"><div class="pre-next"></div></td></tr></tfoot>
                <tbody id="siteLists">
<?php
if (!empty ($result)) {
	$list = $result['sites'];
	$count = $result['count'];
	$currentCount=0;
?>
	<?php


	foreach ($list as $domain) {
		$currentCount++;
		$www = $domain['www'];
		$sids = explode(',', str_replace(array (
			'[',
			']'
		), array (
			'',
			''
		), XT_SIDS));
		$shops = explode(',', str_replace(array (
			'[',
			']'
		), array (
			'',
			''
		), XT_SHOPS));
		$index = 0;
?>
                	<tr <?php echo $currentCount>19?'class="sitemore hidden"':'';?>>
    					<td><?php echo $domain['title'];?></td>
    					<td><?php echo '<a href="http://'.$www.'" target="_blank">http://'.$www.'</a>';?></td>
                        <td><?php


		foreach ($sids as $sid) {
			echo '<a href="http://' . $www . '/tshop/' . $sid . '.html" target="_blank">' . $shops[$index] . '</a><br/>';
			$index++;
		}
?></td>
                        <td><a href="http://<?php echo $www;?>/search?nicks=<?php echo urlencode(implode(',',$shops));?>" target="_blank">商品推广</a></td>
  					</tr>
	<?php }?>
	<?php if($count>20){?>
	<tr><td colspan="4"><a class="btn-s2" style="cursor:pointer;" onclick="if($(this).find('span').text()=='展开全部'){$('#siteLists .sitemore').removeClass('hidden');$(this).find('span').text('收起内容');}else{$('#siteLists .sitemore').addClass('hidden');$(this).find('span').text('展开全部');}return false;"><span>展开全部</span></a></td></tr>	
	<?php }?>
<?php }else{?>
<tr><td colspan="4"><p class="no-data">搜索不到任何数据</p></td></tr>
<?php }?>
                </tbody>
			</table>
</div>
</body>
</html>
