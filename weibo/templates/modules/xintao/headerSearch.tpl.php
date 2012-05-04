<div class="ks-clear" style="clear:none;">
	<div class="shop-wrap">
		<div id="shop-search">
			<div class="shop-form" style="width:275px;">
				<input type="text" id="J_HeaderSearchQ" autocomplete="off" class="shop-text" value="想找什么宝贝？">
				<?php if(!empty($shop)){?>
				<span class="instore"><button id="J_HeaderSearchInStore" class="searchmy" type="button">搜本店</button></span>
				<?php }elseif(XT_IS_TAOKE=='true'){?>
				<span class="instore"><button id="J_HeaderSearchInPoster" class="searchmy" type="button">搜画报</button></span>
				<?php }?>
				<?php if(XT_IS_TAOKE=='true'){?>
				<span class="global"><button id="J_HeaderSearchInTaobao" class="searchtb" type="button">搜淘宝</button></span>
				<?php }?>
				<b class="shop-radius-l"></b>
			</div>
		</div>
	</div>
	<?php
if (!empty ($shop)) {
	$rel = ' data-sid="' . $shop['sid'] . '" data-nick="' . $shop['nick'] . '" ';
	$text = F('escape', urlencode(addslashes('#' . $shop['title'] . '#。详情：http://shop' . $shop['sid'] . '.taobao.com。')));
?>
	<div id="shop-info">
		<div class="shop-info-simple">
			<a href="http://shop<?php echo $shop['sid'];?>.taobao.com" target="_blank" class="hCard fn J_TrackShop Go" rel="nofollow" <?php echo $rel;?>><?php echo $shop['nick']?></a>
			<span class="shop-rank"> <a rel="e:tbf,s:<?php echo $shop['sid']?>,n:<?php echo $shop['nick']?>" class="shop-collect" href="#">点击收藏</a></span>
		</div>
		<!--<b class="arrow-wrap"><i class="shop-arrow"></i></b>-->
		<div class="shop-info-details">
		<?php


	$shopScore = $shop['shop_score'];
	if ($shopScore) {
		$item_score = $shopScore['item_score'];
		$service_score = $shopScore['service_score'];
		$delivery_score = $shopScore['delivery_score'];
?>
			<div class="shop-rate">
				<h4 style="font-size:12px;">店铺动态评分</h4>
				<ul class="shop-score-ul">
					<li><span>宝贝与描述相符：</span><a><span class="c-value-no c-value-<?php echo str_replace('.','d',$item_score);?>" title="<?php echo $item_score;?>/5.0"></span><?php echo $item_score;?></a></li>
					<li><span>卖家的服务态度：</span><a><span class="c-value-no c-value-<?php echo str_replace('.','d',$service_score);?>" title="<?php echo $service_score;?>/5.0"></span><?php echo $service_score;?></a></li>
					<li><span>卖家发货的速度：</span><a><span class="c-value-no c-value-<?php echo str_replace('.','d',$delivery_score);?>" title="<?php echo $delivery_score;?>/5.0"></span><?php echo $delivery_score;?></a></li>
				</ul>
			</div>
		<?php }?>	
			<div class="shop-other">
				<a class="tb-fav collection xshop_sc" rel="e:tbf,s:<?php echo $shop['sid']?>,n:<?php echo $shop['nick']?>" href="#">收藏</a>
				<!--<a class="tb-feed subscribe-rss" title="关注后，你可以进入我的淘宝查看该店铺的最新动态。" href="#" rel="e:tbfan,f:"><i></i>关注</a>-->
				<a class="tb-shared share-jianghu" href="#" rel="e:tbs,m:<?php echo $text;?>"><i></i>分享</a>
			</div>
		</div>
	</div>
	<?php }?>
</div>