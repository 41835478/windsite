<?php


/**
 * 商品详情展现
 * @version $Id$
 */
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
?>

<?php


if ($item&&count($items)==0) {
	$itemRel = ' data-nid="' . $item['num_iid'] . '" data-nick="' . $item['nick'] . '" ' . ($item['click_url'] ? ('data-click="' . base64_encode($item['click_url']) . '"') : '') . ' ';
	$shopRel = ' data-sid="' . $item['sid'] . '" data-nick="' . $item['nick'] . '" ' . ($item['shop_click_url'] ? ('data-click="' . base64_encode($item['shop_click_url']) . '"') : '') . ' ';
?>
<div id="detail" class="tshop-psm tb-box" style="_width: 760px;">
	<div class="tb-detail-hd"><h3><?php if($cat){echo '<a href="'.$cat['url'].'">'.$cat['name'].'</a>&nbsp;&nbsp;>&nbsp;&nbsp;';}?><?php echo $item['title']?></h3></div>
	<div class="tb-detail-bd ks-clear">
		<div class="tb-summary ks-clear">
			<div class="tb-property">
				<div class="tb-wrap tb-wrap-newshop">
	 				<ul class="tb-meta">
						<li><div class="tb-consumer-protections"><div><img src="http://a.tbcdn.cn/sys/common/icon/trade/xb_truth_b.png"><p>淘宝网将保障您的购物资金及运费安全。</p></div></div></li>
						<li id="J_StrPriceModBox" class="tb-detail-price ks-clear"><span>价　　格：</span><strong id="J_StrPrice"><?php echo $item['price']?></strong>元  </li>
						<li><span>运　　费：</span>平邮　<?php echo $item['post_fee']?> 元 快递　<?php echo $item['express_fee']?>　元 EMS　<?php echo $item['ems_fee']?>　元</li>
						<?php if($item['volume']){?><li class="tb-sold-out"><span>30天售出：</span><em><?php echo $item['volume']?></em>件</li><?php }?>
						<li><span>商品数量：</span><?php echo $item['num']?>件</li>
						<li><span>下架时间：</span><?php echo $item['delist_time']?></li>
						<li><span>掌柜名称：</span><?php echo $item['nick']?></li>
						<?php if($item['seller_credit_score']){?><li><span>卖家信用：</span><a class="rank seller-rank-<?php echo $item['seller_credit_score']?>"></a></li><?php }?>
						<?php if($item['location']){?><li><span>所在地区：</span><em><?php echo $item['location']['state'].' '.$item['location']['city']?></em></li><?php }?>
					</ul>
				    <div class="tb-key">
						<div class="tb-skin tb-naked">
							<div class="tb-action ks-clear" style="margin-left:0px;">
								<div class="tb-btn-buy"><a href="#" <?php echo $itemRel;?> rel="nofollow"  class="J_TrackItem Go" target="_blank" style="width:170px;"><img src="http://www.xintaowang.com/css/default/xintao/taobao/gomai.gif"></a></div>
								<?php if($item['sid']||$item['shop_click_url']){?><div class="tb-btn-buy"><a href="<?php if($item['sid']){echo 'http://shop'.$item['sid'].'.taobao.com';}else{echo '#';}?>" <?php echo $shopRel;?> rel="nofollow" class="J_TrackShop Go" target="_blank" style="width:170px;"><img src="http://www.xintaowang.com/css/default/xintao/taobao/gozhanggui.gif"></a></div><?php }?>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="tb-gallery">
	 			<div class="pic tb-booth tb-pic s310"><a href="#" <?php echo $itemRel;?> rel="nofollow" target="_blank" class="J_TrackItem Go"><img id="J_ImgBooth" data-original="<?php echo base64_encode($item['pic_url'] . '_310x310.jpg');?>" alt="<?php echo $item['title']?>"></a></div>
				<!--<div class="tb-share-action ks-clear">
					<div class="tb-share-opt">
						<div class="J_TBDig tb-dig" ><div class="wrap"><div class="tb-dig-top J_ShareTo"><span class="title"><s class="ico-share"></s>分享</span></div></div></div>
					</div>
				</div>-->
	 		</div>
		</div>
	</div>
	<ul class="tabbar" id="J_TabBar">
		<li class="selected"><a href="#description" hidefocus="true" data-index="0">宝贝详情</a></li>
		<!--<li><a href="#reviews" hidefocus="true" data-index="1">评价详情(<em class="J_ReviewsCount">21</em>)</a></li>-->
	</ul>
	<?php if($item['props_name']){?>
	<div id="attributes" class="attributes">
		<ul class="attributes-list">
			<?php


	$props = explode(';', $item['props_name']);
	if ($props) {
		$propArray = array ();
		foreach ($props as $prop) {
			$ps = explode(':', $prop);
			if (count($ps) == 4) {
				$key = $ps[2];
				if (isset ($propArray[$key])) {
					$propArray[$key] = $propArray[$key] . ' ' . $ps[3];
				} else {
					$propArray[$key] = $ps[3];
				}
			}
		}
		if (!empty ($propArray)) {
			foreach ($propArray as $prop => $value) {
				echo '<li title="' . $value . '">' . $prop . ':' . $value . '</li>';
			}
		}
	}
?>
		</ul>
	</div>
	<?php }?>
</div>
<?php
//Xpipe :: pagelet('xintao.itemRates',array('num_iid'=>$item['num_iid'],'seller_nick'=>$item['nick']));
?>
<?php }else{?>
	很抱歉，您查看的宝贝不存在，可能已下架或者被转移
	<div class="box" id="J_ItemCatSearch">
	<div class="shop-display">
	    <div class="hd hidden"><h3></h3></div>
	    <div class="bd">
	    			<?php
$pic_jpg = '_160x160.jpg';	    			
$row_size = 4;
if (!empty ($items)) {
	$count = 0;
	$length = count($items);
	foreach ($items as $row) {
		$title = F('escape', $row['title']);
		$url = URL('item', array (
			'id' => $row['num_iid']
		));
		if ($count % $row_size == 0) {
			echo '<div class="grid"><ul class="shop-list">';
		}
		$pic = base64_encode($row['pic_url'] . $pic_jpg);
		$rel = ' class="J_TrackItem" data-nid="'.$row['num_iid'].'" data-nick="'.$row['nick'].'" data-click="'.base64_encode($row['click_url']).'" ';
		if ($count % $row_size == ($row_size -1) || $count == $length -1) {
			echo '<li style="margin-right:0px;" data-value="' . $row['num_iid'] . '"><div class="item"><div class="pic"><a href="' . $url . '" title="' . $title . '" target="_blank" '.$rel.'><img src="' . XT_LAZYLOAD_PIC . '" data-original="' . $pic . '" alt="' . $title . '" title="' . $title . '"/></a></div><div class="desc"><a href="' . $url . '" target="_blank" '.$rel.'>' . $title . '</a></div><div class="price"><div class="now"><span>￥ </span><strong>' . $row['price'] . '元</strong></div></div><div class="sales-amount">最近30天售出<em>' . $row['volume'] . '</em>笔</div></div></li>';
			echo '</ul></div>';
		} else {
			echo '<li data-value="' . $row['num_iid'] . '"><div class="item"><div class="pic"><a href="' . $url . '" title="' . $title . '" target="_blank" '.$rel.'><img src="' . XT_LAZYLOAD_PIC . '" data-original="' . $pic . '" alt="' . $title . '" title="' . $title . '"/></a></div><div class="desc"><a href="' . $url . '" target="_blank" '.$rel.'>' . $title . '</a></div><div class="price"><div class="now"><span>￥ </span><strong>' . $row['price'] . '元</strong></div></div><div class="sales-amount">最近30天售出<em>' . $row['volume'] . '</em>笔</div></div></li>';
		}
		$count++;
	}
}
?>
	    </div>
	</div>
	<div class="ks-clear"></div>  
</div>
</div>
<?php }?>
