<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>自动营销 - 营销管理 - 推广管理</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
<style>.form-box{overflow:hidden;}.form-box .form-field,.form-box .form-cont{float:none;}.form-box .form-field{display:block;width:auto;text-align: left;margin-bottom:5px;}</style>
</head>
<body class="main-body">
	<div class="path"><p>当前位置：营销管理<span>&gt;</span>自动营销</p></div>
    <div class="main-cont">
    <?php if(!(SYSTEM_SINA_UID > 0 && WB_USER_OAUTH_TOKEN_SECRET != '' && WB_USER_OAUTH_TOKEN != '')){echo '<h3 class="title">您尚未<a href="#" rel="e:bindList">绑定新浪微博帐号</a>，绑定后可配置</h3>';}?>
    <form id="addForm" action="<?php echo URL('mgr/xintao/autoCron.yingxiaoSave');?>" method="post"  name="changes-newlink" style="width:820px;">
    <?php
$xiaohuaChecked = array ();
$posterChecked = array ();
$tvChecked = array ();
$taokeChecked = array ();
$shareChecked = array ();
$taokeItemCron = 2;
$xiaohuaCron = 2;
$posterCron = 0;
$tvCron = 0;
$shareCron = 0;
$TOTAL_CRONS = 32; //总40-6-2
if (!empty ($yingxiao)) {
	$metadata = $yingxiao['metadata'];
	if (!empty ($metadata)) {
		if (isset ($metadata['xiaohua'])) {
			$xiaohuaChecked = $metadata['xiaohua'];
		}
		if (isset ($metadata['poster'])) {
			$posterChecked = $metadata['poster'];
		}
		if (isset ($metadata['tv'])) {
			$tvChecked = $metadata['tv'];
		}
		if (isset ($metadata['taoke'])) {
			$taokeChecked = $metadata['taoke'];
		}
		if (isset ($metadata['share'])) {
			$shareChecked = $metadata['share'];
		}
	}
	if (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '') {
		$crons = $yingxiao['crons'];
		if (!empty ($crons)) {
			if (isset ($crons['taokeItem'])) {
				$taokeItemCron = $crons['taokeItem'];
			}
			if (isset ($crons['xiaohua'])) {
				$xiaohuaCron = $crons['xiaohua'];
			}
			if (isset ($crons['poster'])) {
				$posterCron = $crons['poster'];
			}
			if (isset ($crons['tv'])) {
				$tvCron = $crons['tv'];
			}
			if (isset ($crons['share'])) {
				$shareCron = $crons['share'];
			}
		}
	}
}
$FREE_CRONS = $TOTAL_CRONS - $taokeItemCron - $xiaohuaCron - $posterCron - $tvCron - $shareCron; //剩余
?>
		<div class="form-box">	
			<table class="table" cellpadding="0" cellspacing="0" width="100%" border="0">
            	<colgroup>
						<col class="w150"/>
                        <col class="w100"/>
    					<col />
    			</colgroup>
                <thead class="tb-tit-bg">
  					<tr>
    					<th><div class="th-gap">营销类型</div></th>
    					<th><div class="th-gap">次数/天</div></th>
                        <th><div class="th-gap">来源</div></th>
  					</tr>
                </thead>
				<tfoot class="tb-tit-bg"><tr><td colspan="3" valign="top"><?php echo XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == ''?('剩余<strong style="color:red;font-size:16px;" id="J_FreeCrons">'.$FREE_CRONS.'</strong>条未配置，内容来源调整即时生效，每日发布次数调整，隔天生效！'):'当前每日营销限额为<strong style="color:red;font-size:16px;">12x2</strong>条，<a href="#" rel="e:openAppstore">订购淘客/卖家服务</a>后，增加至<strong style="color:red;font-size:16px;">40x4</strong>条，且可自由配置不同分类的营销次数'?></td></tr></tfoot>
			    <tbody>
			    	<tr>
			    		<td style="height:62px;">商品推荐</td>
			    		<td><?php echo XT_IS_SELLER == 'false' &&XT_IS_TAOKE=='true'&& XT_FREE_DATELINE == ''?6:10;?></td>
			    		<td>
			    			对于卖家：1.卖家自己的商品。2.订购了微购卖家服务，且加入淘宝客推广的淘宝卖家的淘客商品。<br>
			    			对于淘客：1.订购了微购卖家服务，且加入淘宝客推广的淘宝卖家的淘客商品
			    		</td>
			    	</tr>
			    	<tr>
			    		<td style="height:62px;">店铺推荐</td>
			    		<td>2</td>
			    		<td>
			    			对于卖家：1.卖家自己的店铺。2.订购了微购卖家服务，且加入淘宝客推广的淘宝卖家的淘客店铺。<br>
			    			对于淘客：1.订购了微购卖家服务，且加入淘宝客推广的淘宝卖家的淘客店铺
			    		</td>
			    	<tr>
			    		<td style="height:62px;">自选商品</td>
			    		<td>
			    		<?php


if (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '') { //VIP
	echo '<a href="#" class="cron-minus" data-value="J_Cron_TaokeItem"><img src="http://www.xintaowang.com/css/default/xintao/' . ($taokeItemCron == 0 ? 'minus_disable.gif' : 'minus.gif') . '"/></a>&nbsp;<input id="J_Cron_TaokeItem" name="crons[taokeItem]" type="text" readonly style="width:20px;height:15px;color:#4B4B4B;" value="' . $taokeItemCron . '">&nbsp;<a href="#" class="cron-plus" data-max="10" data-value="J_Cron_TaokeItem"><img src="http://www.xintaowang.com/css/default/xintao/' . ($taokeItemCron >= 10 || $FREE_CRONS == 0 ? 'plus_disable.gif' : 'plus.gif') . '"/></a>';
} else {
	echo '<a href="#" class="cron-minus"><img src="http://www.xintaowang.com/css/default/xintao/minus_disable.gif"/></a>&nbsp;<input name="crons[taokeItem]" type="text" readonly style="width:20px;height:15px;color:#4B4B4B;" value="' . $taokeItemCron . '">&nbsp;<a href="#" class="cron-plus"><img src="http://www.xintaowang.com/css/default/xintao/plus_disable.gif"/></a>';
}
?>
			    		</td>
			    		<td>自己在<a href="#" rel="e:taokeItem">商品营销(淘客)</a>中手动添加的有效的淘宝客商品</td>
			    	</tr>
			    	<tr>
			    		<td style="height:62px;">商品分享(<a href="http://img01.taobaocdn.com/imgextra/i1/71614142/T2O5qgXnlaXXXXXXXX_!!71614142.png" target="_blank">演示</a>)<br><a href="#" rel="e:openAppstore">需订购淘客/卖家服务</a></td>
			    		<td>
			    		<?php


if (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '') { //VIP
	echo '<a href="#" class="cron-minus" data-value="J_Cron_Share"><img src="http://www.xintaowang.com/css/default/xintao/' . ($shareCron == 0 ? 'minus_disable.gif' : 'minus.gif') . '"/></a>&nbsp;<input id="J_Cron_Share" name="crons[share]" type="text" readonly style="width:20px;height:15px;color:#4B4B4B;" value="' . $shareCron . '">&nbsp;<a href="#" class="cron-plus" data-max="10" data-value="J_Cron_Share"><img src="http://www.xintaowang.com/css/default/xintao/' . ($FREE_CRONS == 0 ? 'plus_disable.gif' : 'plus.gif') . '"/></a>';
} else {
	echo '<a href="#" class="cron-minus"><img src="http://www.xintaowang.com/css/default/xintao/minus_disable.gif"/></a>&nbsp;<input name="crons[share]" type="text" readonly style="width:20px;height:15px;color:#4B4B4B;" value="' . $shareCron . '">&nbsp;<a href="#" class="cron-plus"><img src="http://www.xintaowang.com/css/default/xintao/plus_disable.gif"/></a>';
}
?>
			    		</td>
			    		<td>
			    			<div class="form-cont">
			    		<?php


$wow = V('-:wow');
foreach ($wow as $key => $value) {
	echo '<p class="input-item"><label>' . $value['title'] . '：</label>';
	foreach ($value['sub'] as $subkey => $subvalue) {
		echo '<label><input class="r" ' . (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '' ? '' : 'disabled') . ' type="checkbox" name="meta[share][' . $key . '][]" value="' . $subkey . '" ' . (in_array($subkey, $shareChecked[$key]) ? 'checked' : '') . '>' . $subvalue['title'] . '</label>';
	}
	echo '</p>';
}
?>	</div>
			    		</td>
			    	</tr>
			    	<tr>
			    		<td>笑话幽默</td>
			    		<td>
			    		<?php


if (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '') { //VIP
	echo '<a href="#" class="cron-minus" data-value="J_Cron_Xiaohua"><img src="http://www.xintaowang.com/css/default/xintao/' . ($xiaohuaCron == 0 ? 'minus_disable.gif' : 'minus.gif') . '"/></a>&nbsp;<input id="J_Cron_Xiaohua" name="crons[xiaohua]" type="text" readonly style="width:20px;height:15px;color:#4B4B4B;" value="' . $xiaohuaCron . '">&nbsp;<a href="#" class="cron-plus" data-value="J_Cron_Xiaohua"><img src="http://www.xintaowang.com/css/default/xintao/' . ($FREE_CRONS == 0 ? 'plus_disable.gif' : 'plus.gif') . '"/></a>';
} else {
	echo '<a href="#" class="cron-minus"><img src="http://www.xintaowang.com/css/default/xintao/minus_disable.gif"/></a>&nbsp;<input name="crons[xiaohua]" type="text" readonly style="width:20px;height:15px;color:#4B4B4B;" value="' . $xiaohuaCron . '">&nbsp;<a href="#" class="cron-plus"><img src="http://www.xintaowang.com/css/default/xintao/plus_disable.gif"/></a>';
}
?>
			    		</td>
			    		<td>
			    			<div class="form-cont">
				  	  			<p class="input-item">
				  	  	<?php


$xiaohua = V('-:xiaohua');
foreach ($xiaohua as $xh) {
	echo '<label><input class="r" type="checkbox" name="meta[xiaohua][]" value="' . $xh['id'] . '" ' . (in_array($xh['id'], $xiaohuaChecked) ? 'checked' : '') . '>' . $xh['title'] . '</label>';
}
?>
					  			</p>
				    		</div>
			    		</td>
			    	</tr>
			    	<tr>
			    		<td>导购画报<br><a href="#" rel="e:openAppstore">需订购淘客/卖家服务</a></td>
			    		<td>
			    		<?php


if (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '') { //VIP
	echo '<a href="#" class="cron-minus" data-value="J_Cron_Poster"><img src="http://www.xintaowang.com/css/default/xintao/' . ($posterCron == 0 ? 'minus_disable.gif' : 'minus.gif') . '"/></a>&nbsp;<input id="J_Cron_Poster" name="crons[poster]" type="text" readonly style="width:20px;height:15px;color:#4B4B4B;" value="' . $posterCron . '">&nbsp;<a href="#" class="cron-plus" data-value="J_Cron_Poster"><img src="http://www.xintaowang.com/css/default/xintao/' . ($FREE_CRONS == 0 ? 'plus_disable.gif' : 'plus.gif') . '"/></a>';
} else {
	echo '<a href="#" class="cron-minus"><img src="http://www.xintaowang.com/css/default/xintao/minus_disable.gif"/></a>&nbsp;<input name="crons[poster]" type="text" readonly style="width:20px;height:15px;color:#4B4B4B;" value="' . $posterCron . '">&nbsp;<a href="#" class="cron-plus"><img src="http://www.xintaowang.com/css/default/xintao/plus_disable.gif"/></a>';
}
?>
			    		</td>
			    		<td>
			    			<div class="form-cont">
				  	  			<p class="input-item">
						  	  	<?php


$poster = V('-:poster');
foreach ($poster as $p) {
	echo '<label><input class="r" type="checkbox" name="meta[poster][]" value="' . $p['id'] . '" ' . (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '' ? '' : 'disabled') . ' ' . (in_array($p['id'], $posterChecked) ? 'checked' : '') . '>' . $p['title'] . '</label>';
}
?>						</p>
				    		</div>
			    		</td>
			    	</tr>
			    	<tr>
			    		<td>高清影视<br><a href="#" rel="e:openAppstore">需订购淘客/卖家服务</a></td>
			    		<td>
			    		<?php


if (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '') { //VIP
	echo '<a href="#" class="cron-minus" data-value="J_Cron_Tv"><img src="http://www.xintaowang.com/css/default/xintao/' . ($tvCron == 0 ? 'minus_disable.gif' : 'minus.gif') . '"/></a>&nbsp;<input id="J_Cron_Tv" name="crons[tv]" type="text" readonly style="width:20px;height:15px;color:#4B4B4B;" value="' . $tvCron . '">&nbsp;<a href="#" class="cron-plus" data-value="J_Cron_Tv"><img src="http://www.xintaowang.com/css/default/xintao/' . ($FREE_CRONS == 0 ? 'plus_disable.gif' : 'plus.gif') . '"/></a>';
} else {
	echo '<a href="#" class="cron-minus"><img src="http://www.xintaowang.com/css/default/xintao/minus_disable.gif"/></a>&nbsp;<input name="crons[tv]" type="text" readonly style="width:20px;height:15px;color:#4B4B4B;" value="' . $tvCron . '">&nbsp;<a href="#" class="cron-plus"><img src="http://www.xintaowang.com/css/default/xintao/plus_disable.gif"/></a>';
}
?>
			    		</td>
			    		<td>
			    			<div class="form-cont">
				  	  			<p class="input-item">
				  	  	<?php


$sotv = V('-:sotv');
foreach ($sotv as $tv) {
	echo '<label><input class="r" type="checkbox" name="meta[tv][]" value="' . $tv['id'] . '" ' . (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '' ? '' : 'disabled') . ' ' . (in_array($tv['id'], $tvChecked) ? 'checked' : '') . '>' . $tv['title'] . '</label>';
}
?>
					  			</p>
				    		</div>
			    		</td>
			    	</tr>
			    </tbody>
			</table>
			<div class="btn-area" style="margin-bottom:20px;">
            				<a class="btn-general highlight" href="#" id="submitBtn"><span>保存设置</span></a>
        	</div>
		</div>
	</form>		
</body>
<script type="text/javascript">
$(function(){
	<?php if(XT_IS_SIMPLE=='true'){?>
	 Xwb.use("action").reg("taokeItem",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#2,5";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("bindList",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#1,2";
  	top.location.reload();
  },{na:true});
  <?php }else{?>
  	 Xwb.use("action").reg("taokeItem",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#0,6";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("bindList",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#1,5";
  	top.location.reload();
  },{na:true});
  <?php }?>  
	<?php if (XT_IS_WEIBO == 'true'&&XT_FREE_DATELINE=='') {?>
		$('#addForm a.cron-minus').click(function(){
			var cron = $('#'+$(this).attr('data-value'));
			if(parseInt(cron.val())>0){
				$('#J_FreeCrons').text(parseInt($('#J_FreeCrons').text())+1);
				cron.val(parseInt(cron.val())-1);
				resetCronImg();
			}
			return false;
		});
		$('#addForm a.cron-plus').click(function(){
			var free = parseInt($('#J_FreeCrons').text());
			if(free>0){
				var cron = $('#'+$(this).attr('data-value'));
				var max = $(this).attr('max');
				if(max&&parseInt(cron.val())>=max){
					return false;
				}
				$('#J_FreeCrons').text(free-1);
				cron.val(parseInt(cron.val())+1);
				resetCronImg();
			}
			
			return false;
		});
		function resetCronImg(){
			//plus
			if(parseInt($('#J_FreeCrons').text())==0){
				$('#addForm a.cron-plus img').attr('src','http://www.xintaowang.com/css/default/xintao/plus_disable.gif');
			}else{
				$('#addForm a.cron-plus').each(function(){
					var isDisable=false;
					if($(this).attr('max')){
						if(parseInt($('#'+$(this).attr('data-value')).val())>=parseInt($(this).attr('max'))){
							isDisable=true;
						}
					}
					if(isDisable){
						$(this).find('img').attr('src','http://www.xintaowang.com/css/default/xintao/plus_disable.gif');
					}else{
						$(this).find('img').attr('src','http://www.xintaowang.com/css/default/xintao/plus.gif');
					}
				})
			}
			//minus
			$('#addForm a.cron-minus').each(function(){
					var isDisable=false;
					var val = parseInt($('#'+$(this).attr('data-value')).val());
					if(val==0){
						isDisable=true;
					}else{
						if($(this).attr('min')){
							if(parseInt($(this).attr('min'))>=val){
								isDisable=true;
							}
						}	
					}
					if(isDisable){
						$(this).find('img').attr('src','http://www.xintaowang.com/css/default/xintao/minus_disable.gif');
					}else{
						$(this).find('img').attr('src','http://www.xintaowang.com/css/default/xintao/minus.gif');
					}
				})
		}
	<?php }else{?>
		$('#addForm a.cron-minus,#addForm a.cron-plus').click(function(){
			Xwb.ui.MsgBox.alert('升级提示','您需要<a href="#" rel="e:openAppstore">订购淘客/卖家服务</a>后，才能自由配置');
			return false;
		});
	<?php }?>	
	<?php


if (SYSTEM_SINA_UID == '' || WB_USER_OAUTH_TOKEN == '' || WB_USER_OAUTH_TOKEN_SECRET == '') {
?>	
		Xwb.ui.MsgBox.tipError('您需要绑定新浪微博后才可以使用该功能！');
		$('#addForm .form-cont input[type="checkbox"]').attr('disabled','true');
		$('#submitBtn').unbind('click').click(function(){
			Xwb.ui.MsgBox.error('提示', '您需要绑定新浪微博后才可以使用该功能！',
									function() {
										top.location.href = "/admin.php?m=mgr/admin.index#1,4";
										top.location.reload();
									}, 'close');
		});
		$('#J_NeedBindSina').click(function(){
			top.location.href = "/admin.php?m=mgr/admin.index#1,4";
			top.location.reload();
			return false;
		});
	<?php


} else {
?>
	$('#submitBtn').click(function(){
			$('#addForm').submit();
			return false;
		});
	<?php


}
?>
	$('#addForm .form-cont input[type="checkbox"]').change(function(){
		if($(this).is(':checked')){
			if($(this).parents('.form-cont').find('input[type="checkbox"]:checked').length>5){
				alert('您只能选择5个分类');
				$(this).attr('checked',false);
				return false;
			}	
		}
	});
});
</script>
</html>
