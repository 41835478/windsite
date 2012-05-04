<?php
if ($shop) {
	$shopScore = $shop['shop_score'];
	$shopTitle = $shop['title'];
	$shopUrl = URL('shop', array (
		'nick' => $shop['nick']
	));
	$rel = ' data-sid="' . $shop['sid'] . '" data-nick="' . $shop['nick'] . '" ' . ($shop['click_url'] ? ('data-click="' . base64_encode($shop['click_url']) . '"') : '') . ' ';
	$text = F('escape', addslashes('#'.$shopTitle.'#'));
?>
<div class="shop  ks-clear">
    <div class="shop-show floatleft">
        <div class="shop-name">
            <h2 class="floatleft dib"><a rel="nofollow" <?php echo $rel;?> href="<?php echo $shopUrl?>" class="J_TrackShop Go" target="_blank"><?php echo $shop['title']?></a></h2>
            <p class="floatleft"><a class="rank seller-rank-<?php echo $shop['level'];?>"></a></p>
            <p class="floatleft c80"><?php echo $shop['nick']?></p>
            <p class="name-wangwang floatleft"></p>
        </div>
        <div class="shop-info ks-clear">
        		<?php


	if ($shopScore) {
		$item_score = $shopScore['item_score'];
		$service_score = $shopScore['service_score'];
		$delivery_score = $shopScore['delivery_score'];
?>
            <div class="floatleft">
				<ul class="shop-score-ul" style="width:180px">
					<li><span>宝贝与描述相符：</span><span class="c-value-no c-value-<?php echo str_replace('.','d',$item_score);?>" title="<?php echo $item_score;?>/5.0"></span><?php echo $item_score;?></li>
					<li><span>卖家的服务态度：</span><span class="c-value-no c-value-<?php echo str_replace('.','d',$service_score);?>" title="<?php echo $service_score;?>/5.0"></span><?php echo $service_score;?></li>
					<li><span>卖家发货的速度：</span><span class="c-value-no c-value-<?php echo str_replace('.','d',$delivery_score);?>" title="<?php echo $delivery_score;?>/5.0"></span><?php echo $delivery_score;?></li>
				</ul>
			</div>
			<?php }?>
			<?php


		if (XT_IS_TAOKE == 'true' && $shop['cid']) {
			Xpipe :: pagelet('xintao.shopList', $shop['cid']);
		}
?>
        </div>
    </div>
    <div class="shop-btn floatright">
       <a href="<?php echo $shopUrl?>" class="enter-shop J_TrackShop Go" rel="nofollow" <?php echo $rel;?> target="_blank" style="margin-top:24px;" target="_blank">进店逛逛</a>
       <a href="#" class="collect-shop J_FavTrigger" rel="e:tbf,s:<?php echo $shop['sid']?>,n:<?php echo $shop['nick']?>">我要收藏</a>
       <a href="#" class="comment-shop" rel="e:tbs,m:<?php echo $text?>">我要点评</a>
    </div>
</div>
<?php }?>