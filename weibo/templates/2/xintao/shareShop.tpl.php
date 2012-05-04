<?php
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php


$site = F('escape', V('-:sysConfig/site_name'));
$pageTitle = '';
if (!empty ($subName)) {
	$pageTitle = $catName . $subName . '的购物分享' . ($page > 1 ? ('第' . $page . '页') : '') . ' - ' . $site;
	echo '<title>关于' . $pageTitle . '</title>';
	echo '<meta name="keywords" content="' . $subName . ',' . $catName . ',' . $site . '">';
	echo '<meta name="description" content="' . $site . '会员关于' . $catName . $subName . '的购物分享与心得">';
} else {
	$pageTitle = $catName . '的购物分享' . ($page > 1 ? ('第' . $page . '页') : '') . ' - ' . $site;
	echo '<title>关于' . $pageTitle . '</title>';
	echo '<meta name="keywords" content="' . $catName . ',' . $site . '">';
	echo '<meta name="description" content="' . $site . '会员关于' . $catName . '的购物分享与心得">';
}
?>
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<link href="<?php echo W_BASE_URL;?>css/default/share.css" rel="stylesheet" type="text/css" />
</head>
<body id="pub">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/header'); ?>
			<div id="container">
				<div id="J_listResult" class="result-list-wrapper">
					<?php TPL::module('xintao/wow/shareMenu',array('cat'=>$cat,'sub'=>$sub,'catName'=>$catName,'subs'=>$subs));?>
					<div id="J_containerWrap" class="result-box">
								<?php

if (!empty ($items)) {
	$col1 = array ();
	$col2 = array ();
	$col3 = array ();
	$col4 = array ();
	$count = 0;
	foreach ($items as $item) {
		if ($count % 4 == 0) {
			$col1[] = $item;
		}
		elseif ($count % 4 == 1) {
			$col2[] = $item;
		}
		elseif ($count % 4 == 2) {
			$col3[] = $item;
		}
		elseif ($count % 4 == 3) {
			$col4[] = $item;
		}
		$count++;
	}
?>
<div class="result-col" style="margin-left:1px;">
<?php foreach($col1 as $row){ $pic = base64_encode(!empty($row['pic_path'])?'http://logo.taobao.com/shop-logo'.$row['pic_path']:('http://img03.taobaocdn.com/tps/i3/T1N.tyXcNpXXXXXXXX-70-70.png'));?>
<div class="result-item">
	<div class="result-item-wrap">
		<div class="result-item-bd">
			<div class="pic-brief">
				<div><a rel="nofollow" href="/shop/nick-<?php echo urlencode($row['nick'])?>" class="J_TrackShop" data-sid="<?php echo $row['sid']?>" target="_blank"><img width="80" src="<?php echo XT_LAZYLOAD_PIC?>" data-original="<?php echo $pic?>" alt="<?php echo $row['title']?>"></a></div>
				<?php if(!empty($row['cid'])&&!empty($row['catName'])){?><div class="vote-price ks-clear"><?php echo $row['catName']?></div><?php }?>
			</div>
			<div class="fx-brief">
				<div class="fx-cnt-bd ks-clear">
					<p class="fx-txts">
						<a href="/shop/nick-<?php echo urlencode($row['nick'])?>" class="J_TrackShop" data-sid="<?php echo $row['sid']?>" target="_blank"><?php echo $row['title']?></a>
					</p>
					<div class="fxer-show"></div>
				</div>
			</div>
		</div>
		<div class="result-item-ft">
			<a rel="nofollow" href="/wow.shop/sub-<?php echo $row['user_id']?>" >查看商品分享</a> 
		</div>
	</div>
</div>		
<?php }?>
</div>
<div class="result-col">
<?php foreach($col2 as $row){ $pic = base64_encode(!empty($row['pic_path'])?'http://logo.taobao.com/shop-logo'.$row['pic_path']:('http://img03.taobaocdn.com/tps/i3/T1N.tyXcNpXXXXXXXX-70-70.png'));?>
	<div class="result-item">
		<div class="result-item-wrap">
			<div class="result-item-bd">
				<div class="pic-brief">
					<div><a rel="nofollow" href="/shop/nick-<?php echo urlencode($row['nick'])?>" class="J_TrackShop" data-sid="<?php echo $row['sid']?>" target="_blank"><img width="80" src="<?php echo XT_LAZYLOAD_PIC?>" data-original="<?php echo $pic?>"  alt="<?php echo $row['title']?>"></a></div>
					<?php if(!empty($row['cid'])&&!empty($row['catName'])){?><div class="vote-price ks-clear"><?php echo $row['catName']?></div><?php }?>
				</div>
				<div class="fx-brief">
					<div class="fx-cnt-bd ks-clear">
						<p class="fx-txts">
							<a href="/shop/nick-<?php echo urlencode($row['nick'])?>" class="J_TrackShop" data-sid="<?php echo $row['sid']?>" target="_blank"><?php echo $row['title']?></a>
						</p>
						<div class="fxer-show"></div>
					</div>
				</div>
			</div>
			<div class="result-item-ft">
    			<a rel="nofollow" href="/wow.shop/sub-<?php echo $row['user_id']?>">查看商品分享</a> 
			</div>
		</div>
	</div>		
<?php }?>
</div>
<div class="result-col">
<?php foreach($col3 as $row){ $pic = base64_encode(!empty($row['pic_path'])?'http://logo.taobao.com/shop-logo'.$row['pic_path']:('http://img03.taobaocdn.com/tps/i3/T1N.tyXcNpXXXXXXXX-70-70.png'));?>
	<div class="result-item">
		<div class="result-item-wrap">
			<div class="result-item-bd">
				<div class="pic-brief">
					<div><a rel="nofollow" href="/shop/nick-<?php echo urlencode($row['nick'])?>" class="J_TrackShop" data-sid="<?php echo $row['sid']?>" target="_blank"><img width="80" src="<?php echo XT_LAZYLOAD_PIC?>" data-original="<?php echo $pic?>"  alt="<?php echo $row['title']?>"></a></div>
					<?php if(!empty($row['cid'])&&!empty($row['catName'])){?><div class="vote-price ks-clear"><?php echo $row['catName']?></div><?php }?>
				</div>
				<div class="fx-brief">
					<div class="fx-cnt-bd ks-clear">
						<p class="fx-txts">
							<a href="/shop/nick-<?php echo urlencode($row['nick'])?>" class="J_TrackShop" data-sid="<?php echo $row['sid']?>" target="_blank"><?php echo $row['title']?></a>
						</p>
						<div class="fxer-show"></div>
					</div>
				</div>
			</div>
			<div class="result-item-ft">
    			<a rel="nofollow" href="/wow.shop/sub-<?php echo $row['user_id']?>" >查看商品分享</a> 
			</div>
		</div>
	</div>		
<?php }?>
</div>
<div class="result-col" style="margin-right:1px;">
<?php foreach($col4 as $row){ $pic = base64_encode(!empty($row['pic_path'])?'http://logo.taobao.com/shop-logo'.$row['pic_path']:('http://img03.taobaocdn.com/tps/i3/T1N.tyXcNpXXXXXXXX-70-70.png'));?>
	<div class="result-item">
		<div class="result-item-wrap">
			<div class="result-item-bd">
				<div class="pic-brief">
					<div><a rel="nofollow" href="/shop/nick-<?php echo urlencode($row['nick'])?>" class="J_TrackShop" data-sid="<?php echo $row['sid']?>" target="_blank"><img width="80" src="<?php echo XT_LAZYLOAD_PIC?>" data-original="<?php echo $pic?>"  alt="<?php echo $row['title']?>"></a></div>
					<?php if(!empty($row['cid'])&&!empty($row['catName'])){?><div class="vote-price ks-clear"><?php echo $row['catName']?></div><?php }?>
				</div>
				<div class="fx-brief">
					<div class="fx-cnt-bd ks-clear">
						<p class="fx-txts">
							<a href="/shop/nick-<?php echo urlencode($row['nick'])?>" class="J_TrackShop" data-sid="<?php echo $row['sid']?>" target="_blank"><?php echo $row['title']?></a>
						</p>
						<div class="fxer-show"></div>
					</div>
				</div>
			</div>
			<div class="result-item-ft">
    			<a rel="nofollow" href="/wow.shop/sub-<?php echo $row['user_id']?>" >查看商品分享</a> 
			</div>
		</div>
	</div>		
<?php }?>
</div>
<div class="ks-clear"></div>
								
					<?php }else{?>
					<div class="no-result-tip">
						<div class="no-result-icon">
							<img src="http://img04.taobaocdn.com/tps/i4/T1PQl6XmtyXXXXXXXX-124-140.jpg">
						</div>
						<div class="no-result-con">
							<div class="no-result-text">
								<p>不好意思，没有找到合适的的宝贝分享</p>
								<p>你可以<a href="/wow">去看看大家分享的宝贝</a><s></s></p>
							</div>
							<div class="no-result-quo">
								<s></s>
							</div>
						</div>
					</div>
				<?php }?>
					</div>
				</div>
			</div>
			<!-- 尾部 开始 -->
			<?php TPL::module('footer');?>
			<!-- 尾部 结束 -->
		</div>
	</div>
	<?php TPL::module('gotop');?>
</body>
<script>
(function(X, $) {
// 延迟加载模块内图片
	lazyload($('#J_listResult .pic-brief img'));
	$('#J_listResult a.J_TrackShop').click(function() {
					X.trackShop($(this));
				});
				
})(Xwb, $);			
</script>
</html>