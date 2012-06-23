<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>自动营销 - 营销管理 - 推广管理</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/xintao/insertatcaret/jquery.insertatcaret.min.js"></script>
<script><?php echo 'var XT_SIDS="'.XT_SIDS.'"';?></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/xintao/autoCron.js"></script>
<style>
.post-textarea, .post-textarea .inner, .post-focus, .post-focus .inner {background: url(http://static.xintaowang.com/css/default/bgimg/post_box_bg.png) no-repeat;}
.post-textarea, .post-focus {padding-left: 7px;height: 75px;}
.post-textarea {background-position: 0 -32px;}
.post-textarea .inner, .post-focus .inner {padding: 10px 7px 10px 3px;height: 55px;}
.post-textarea .inner {background-position: right -112px;}
.post-textarea .inner textarea, .post-focus .inner textarea {width: 100%;height: 55px;border-width:0px;font-size: 14px;line-height: 18px;overflow-x: hidden;}
textarea {font-family: Arial, Geneva, sans-serif;overflow-x: hidden;overflow-y: auto;resize: none;border-width:0px;outline:none}
.key-tips {height: 30px;line-height: 30px;color: #999;}
.key-tips span {font-size: 26px;font-family: "Constantia", Times, serif;}
.key-tips.out140 {padding-left: 20px;background-position: -2px -532px;color: red;}
.out140{background: url(http://static.xintaowang.com/css/default/bgimg/ico_bg.png) no-repeat;}
</style>
</head>
<body class="main-body">
	<div class="path"><p>当前位置：营销管理<span>&gt;</span>自动营销</p></div>
    <div class="main-cont">
		<div class="set-area" style="margin-top:5px;">
			<p class="tips-desc">说明:类似[宝贝标题],[宝贝价格],[宝贝链接]等字样，在自动发微博时将自动替换为对应的商品标题，价格，链接</p>
			<p class="tips-desc">建议:模板内容建议时常变化一下，避免产生太多相似内容，尽可能避开广告微博的审核（尽量避免使用一些有推广意味的关键词）</p>
        	<table class="table" cellpadding="0" cellspacing="0" width="100%" border="0">
            	<colgroup>
						<col class="w150"/>
                        <col class="w100" />
    					<col style="width:590px;"/>
    					<col/>
    			</colgroup>
                <thead class="tb-tit-bg">
  					<tr>
    					<th><div class="th-gap">类型</div></th>
    					<th><div class="th-gap">已发布（条）</div></th>
                        <th><div class="th-gap">模板，<label>注意：总字数不能超过<strong style="color:red">140</strong>,考虑到商品标题,价格,链接的字数，请尽量限制在<strong style="color:red">100</strong>以内</label></div></th>
                        <th><div class="th-gap">操作</div></th>
  					</tr>
                </thead>
				<tfoot class="tb-tit-bg"><tr><td colspan="4"><div class="pre-next"></div></td></tr></tfoot>
                <tbody>
<?php if (!empty($crons)){?>
	<?php
foreach ($crons as $cron) {
	if ($cron['id'] == 3) {
		continue;
	}
	$template = $cron['metadata'];
?>
                	<tr>
    					<td><?php echo $cron['name'];?></td>
    					<td><?php echo $cron['nums'];?></td>
                        <td>
                        	<div class="key-tips xwb_word_cal"></div>
                        	<div class="post-textarea"><div class="inner"><textarea class="autocron-area"><?php echo F('escape', $template)?></textarea></div></div>
                        	<?php


	echo '<div style="width:90%;padding-top:5px;"><label>支持插入:<a href="#" title="当前商品的标题" class="insert_sys">[宝贝标题]</a>,<a href="#" title="当前商品的价格" class="insert_sys">[宝贝价格]</a>,<a href="#" title="当前商品的地址" class="insert_sys">[宝贝链接]</a>';
	if ($cron['id'] == 1) {
		echo '';
	}
	elseif ($cron['id'] == 2) {
		echo '';
	}
	elseif ($cron['id'] == 3) {
		echo '';
	}
	elseif ($cron['id'] == 100) {
		echo '';
	}
	echo '</label><a href="#" class="btn-general highlight submitBtn" data-id="' . $cron['id'] . '" style="float:right;" name="保存修改"><span>保存修改</span></a></div>';
?>                        	
                        </td>
    					<td><?php if($cron['isValid']){echo '<a href="#" data-id="'.$cron['id'].'" class="icon-set cron-operate">停止</a>';}else{echo '<a href="#" data-id="'.$cron['id'].'" class="icon-set cron-operate">启用</a>';}?></td>
  					</tr>
	<?php }?>
<?php }else{?>
<tr><td colspan="4"><p class="no-data">搜索不到任何数据</p></td></tr>
<?php }?>
                </tbody>
			</table>
    	</div>
</div>
<script type="text/javascript">
//TODO 开启或关闭主动通知
</script>
</body>
</html>
