<?php


/**
 * 单店铺展现
 * @version $Id$
 */
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
if ($position == 1) {
	if ($shop) {
		$params = $mod['param'];
		$isVolume = '1';
		if (isset ($params['isVolume'])) {
			$isVolume = $params['isVolume'];
		}
		$isCredit = '1';
		if (isset ($params['isCredit'])) {
			$isCredit = $params['isCredit'];
		}
		$shopTitle = $shop['title'];
		$shopUrl = URL('shop', array (
			'nick' => $shop['nick']
		));
		$shopScore = $shop['shop_score'];
		$shopNo = '';
		if (!F('xintao.isSiteShopById', $shop['sid'])) { //如果不是站内店铺，则不直接访问
			$shopNo = ' No ';
		}
		$rel = ' data-sid="' . $shop['sid'] . '" data-nick="' . $shop['nick'] . '" ';
		$text = F('escape', addslashes('#'.$shopTitle.'#'));
?>
<dl class="store-item ks-clear">
	<dt class="clearfix"><a class="title J_TrackShop<?php echo $shopNo?>" href="<?php echo $shopUrl?>" target="_blank" <?php echo $rel;?>><?php echo $shopTitle?></a> <span class="shopkeeper">(掌柜：<?php echo $shop['nick']?>)</span></dt>
	<dd class="shop">
	<ul>
		<li class="ks-clear">
			<div style="float:left;">
				<div class="pic s80">
					<a target="_blank" class="J_TrackShop<?php echo $shopNo?>" href="<?php echo $shopUrl?>" rel="nofollow" <?php echo $rel;?>><img src="<?php if($shop['pic_path']){echo 'http://logo.taobao.com/shop-logo'.$shop['pic_path'];}else{echo 'http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png';}?>" width=80px height=80px alt="<?php echo $shopTitle?>"></a>
				</div>
				<?php if($isCredit&&$shop['level']){?>	<p class="rank seller-rank-<?php echo $shop['level'];?>">卖家信用</p><?php }?>
				<p>好评率:<?php echo !empty($shop['total_num'])?round(100*($shop['good_num']/$shop['total_num']),2):0?>%</p>
			</div>
			<div class="shop-btn" style="float:left;">
            	<a href="<?php echo $shopUrl?>" class="enter-shop J_TrackShop<?php echo $shopNo?>" rel="nofollow" <?php echo $rel;?> target="_blank" style="margin-top:-15px;" target="_blank">进店逛逛</a>
            	<a href="#" class="collect-shop J_FavTrigger" rel="e:tbf,s:<?php echo $shop['sid']?>,n:<?php echo $shop['nick']?>">我要收藏</a>
            	<a href="#" class="comment-shop" rel="e:tbs,m:<?php echo $text?>">我要点评</a>
        	</div>
		</li>
		<?php


		if ($shopScore) {
			$item_score = $shopScore['item_score'];
			$service_score = $shopScore['service_score'];
			$delivery_score = $shopScore['delivery_score'];
?>
		<li>
			<div>
				<ul class="shop-score-ul">
					<li><span>宝贝与描述相符：</span><a><span class="c-value-no c-value-<?php echo str_replace('.','d',$item_score);?>" title="<?php echo $item_score;?>/5.0"></span><?php echo $item_score;?></a></li>
					<li><span>卖家的服务态度：</span><a><span class="c-value-no c-value-<?php echo str_replace('.','d',$service_score);?>" title="<?php echo $service_score;?>/5.0"></span><?php echo $service_score;?></a></li>
					<li><span>卖家发货的速度：</span><a><span class="c-value-no c-value-<?php echo str_replace('.','d',$delivery_score);?>" title="<?php echo $delivery_score;?>/5.0"></span><?php echo $delivery_score;?></a></li>
				</ul>
			</div>
		</li>
		<?php }?>
	</ul>
	</dd>
	<dd class="goods">
	<ul>
		<?php


			if (count($items) > 0) {
				foreach ($items as $item) {
					$title = $item['title'];
					$url = URL('item', array (
						'id' => $item['num_iid']
					));
					$rel = ' class="J_TrackItem' . $shopNo . '" data-nid="' . $item['num_iid'] . '" data-nick="' . $item['nick'] . '"';
					echo '<li class="unit">';
					echo '<div class="pic s80"><a href="' . $url . '" title="' . $title . '" target="_blank" ' . $rel . '> <img src="' . $item['pic_url'] . '_80x80.jpg" alt="' . $title . '"> </a></div>';
					echo '<div class="desc"><a href="' . $url . '" target="_blank" title="' . $title . '" ' . $rel . '>' . $title . '</a></div>';
					echo '<div class="price clearfix"><em>' . $item['price'] . ' </em></div>';
					if ($isVolume)
						echo '<div class="soldout">已售<em> ' . $item['volume'] . ' </em> 笔</div>';
					echo '</li>';
				}
			}
?>
	</ul>
	</dd>
</dl>
<?php


		} else {
			echo '<div>没有找到符合【' . $nick . '】要求的店铺，请确认卖家昵称正确</div>';
		}
	}
	elseif ($position == 2) {
		if ($shop) {
			$params = $mod['param'];
			$isVolume = '1';
			if (isset ($params['isVolume'])) {
				$isVolume = $params['isVolume'];
			}
			$isCredit = '1';
			if (isset ($params['isCredit'])) {
				$isCredit = $params['isCredit'];
			}
			$shopTitle = $shop['title'];
			$shopUrl = URL('shop', array (
				'nick' => $shop['nick']
			));
			$shopScore = $shop['shop_score'];
			$shopNo = '';
			if (!F('xintao.isSiteShopById', $shop['sid'])) { //如果不是站内店铺，则不直接访问
				$shopNo = ' No ';
			}
			$rel = ' data-sid="' . $shop['sid'] . '" data-nick="' . $shop['nick'] . '" ';
			$text = F('escape', addslashes('#'.$shopTitle.'#'));
?>
<dl class="store-item store-side">
	<dd class="shop">
	<ul>
		<li class="ks-clear">
			<div style="float:left;">
				<div class="pic s80">
					<a target="_blank" class="J_TrackShop<?php echo $shopNo?>" href="<?php echo $shopUrl?>" rel="nofollow" <?php echo $rel;?>><img src="<?php if($shop['pic_path']){echo 'http://logo.taobao.com/shop-logo'.$shop['pic_path'];}else{echo 'http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png';}?>" width=80px height=80px alt="<?php echo $shopTitle?>"></a>
				</div>
				<?php if($isCredit&&$shop['level']){?>	<p class="rank seller-rank-<?php echo $shop['level'];?>">卖家信用</p><?php }?>
				<p>好评率:<?php echo !empty($shop['total_num'])?round(100*($shop['good_num']/$shop['total_num']),2):0?>%</p>
			</div>
			<div class="shop-btn" style="float:left;">
            	<a href="<?php echo $shopUrl?>" class="enter-shop J_TrackShop<?php echo $shopNo?>" rel="nofollow" <?php echo $rel;?> target="_blank" style="margin-top:-15px;" target="_blank">进店逛逛</a>
            	<a href="#" class="collect-shop J_FavTrigger" rel="e:tbf,s:<?php echo $shop['sid']?>,n:<?php echo $shop['nick']?>">我要收藏</a>
            	<a href="#" class="comment-shop" rel="e:tbs,m:<?php echo $text?>">我要点评</a>
        	</div>
		</li>
		<li class="ks-clear"><a class="title J_TrackShop<?php echo $shopNo?>" href="<?php echo $shopUrl?>" target="_blank" <?php echo $rel;?>><?php echo $shopTitle?></a> <span class="shopkeeper">(掌柜：<?php echo $shop['nick']?>)</span></li>
		<?php

			if ($shopScore) {
				$item_score = $shopScore['item_score'];
				$service_score = $shopScore['service_score'];
				$delivery_score = $shopScore['delivery_score'];
?>
		<li>
			<div>
				<ul class="shop-score-ul">
					<li><span>宝贝与描述相符：</span><a><span class="c-value-no c-value-<?php echo str_replace('.','d',$item_score);?>" title="<?php echo $item_score;?>/5.0"></span><?php echo $item_score;?></a></li>
					<li><span>卖家的服务态度：</span><a><span class="c-value-no c-value-<?php echo str_replace('.','d',$service_score);?>" title="<?php echo $service_score;?>/5.0"></span><?php echo $service_score;?></a></li>
					<li><span>卖家发货的速度：</span><a><span class="c-value-no c-value-<?php echo str_replace('.','d',$delivery_score);?>" title="<?php echo $delivery_score;?>/5.0"></span><?php echo $delivery_score;?></a></li>
				</ul>
			</div>
		</li>
		<?php }?>
	</ul>
	</dd>
</dl>
<?php }else{echo '<div>没有找到符合【' . $nick . '】要求的店铺，请确认卖家昵称正确</div>';}}?>