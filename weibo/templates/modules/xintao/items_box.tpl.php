<?php


/**
 * 淘宝客商品搜索
 * @version $Id$
 */
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
$show_size = 'small';
$pic_jpg = '_120x120.jpg';
$row_size = 5;
//分页
$pager = APP :: N('TaobaoPager', $total_results, 40, $params['page_no']);
?>

<div id="J_ProductSearchBox">
<div class="filter" id="J_Filter">
	<ul class="filter-tabbar" id="J_FilterTabBar">
		<li style="background:none;" class="checkbox-li">
		 	<label for="checkbox_cash_ondelivery"><input type="checkbox" <?php if ($params['cash_ondelivery']){ echo ' checked value="true" '; }else{echo 'value=""';}?> name="param[cash_ondelivery]" id="checkbox_cash_ondelivery">货到付款</label>
			<label for="checkbox_mall_item"><input type="checkbox" <?php if ($params['mall_item']){ echo ' checked value="true" '; }else{echo 'value=""';}?> name="param[mall_item]" id="checkbox_mall_item">商城商品</label>
			<label for="checkbox_sevendays_return"><input type="checkbox" <?php if ($params['sevendays_return']){ echo ' checked value="true" '; }else{echo 'value=""';}?> name="param[sevendays_return]" id="checkbox_sevendays_return">7天退换</label>
			<label for="checkbox_guarantee"><input type="checkbox" <?php if ($params['guarantee']){ echo ' checked value="true" '; }else{echo 'value=""';}?> name="param[guarantee]" id="checkbox_guarantee">消保卖家</label>
			<label for="checkbox_onemonth_repair"><input type="checkbox" <?php if ($params['onemonth_repair']){ echo ' checked value="true" '; }else{echo 'value=""';}?> name="param[onemonth_repair]" id="checkbox_onemonth_repair">30天维修</label>
			<label for="checkbox_real_describe"><input type="checkbox" <?php if ($params['real_describe']){ echo ' checked value="true" '; }else{echo 'value=""';}?> name="param[real_describe]" id="checkbox_real_describe">如实描述</label>
		</li>
		<li style="background:none;">
			<select name="rs" id="J_StartCredit" style="width:65px;" data-value="<?php echo $params['start_credit']?>">
			  <option value="5goldencrown" data-value="20">5皇冠</option>
			  <option value="4goldencrown" data-value="19">4皇冠</option>
			  <option value="3goldencrown" data-value="18">3皇冠</option>
			  <option value="2goldencrown" data-value="17">2皇冠</option>
			  <option value="1goldencrown" data-value="16">1皇冠</option>
			  <option value="5crown" data-value="15">5蓝冠</option>
			  <option value="4crown" data-value="14">4蓝冠</option>
			  <option value="3crown" data-value="13">3蓝冠</option>
			  <option value="2crown" data-value="12">2蓝冠</option>
			  <option value="1crown" data-value="11">1蓝冠</option>
			  <option value="5diamond" data-value="10">5钻</option>
			  <option value="4diamond" data-value="9">4钻</option>
			  <option value="3diamond" data-value="8">3钻</option>
			  <option value="2diamond" data-value="7">2钻</option>
			  <option value="1diamond" data-value="6">1钻</option>
			  <option value="5heart" data-value="5">5心</option>
			  <option value="4heart" data-value="4">4心</option>
			  <option value="3heart" data-value="3">3心</option>
			  <option value="2heart" data-value="2">2心</option>
			  <option value="1heart" data-value="1" selected>1心</option>
			</select>
			<select name="re" id="J_EndCredit" style="width:65px;" data-value="<?php echo $params['end_credit']?>">
			  <option value="5goldencrown" data-value="20" selected>5皇冠</option>
			  <option value="4goldencrown" data-value="19">4皇冠</option>
			  <option value="3goldencrown" data-value="18">3皇冠</option>
			  <option value="2goldencrown" data-value="17">2皇冠</option>
			  <option value="1goldencrown" data-value="16">1皇冠</option>
			  <option value="5crown" data-value="15">5蓝冠</option>
			  <option value="4crown" data-value="14">4蓝冠</option>
			  <option value="3crown" data-value="13">3蓝冠</option>
			  <option value="2crown" data-value="12">2蓝冠</option>
			  <option value="1crown" data-value="11">1蓝冠</option>
			  <option value="5diamond" data-value="10">5钻</option>
			  <option value="4diamond" data-value="9">4钻</option>
			  <option value="3diamond" data-value="8">3钻</option>
			  <option value="2diamond" data-value="7">2钻</option>
			  <option value="1diamond" data-value="6">1钻</option>
			  <option value="5heart" data-value="5">5心</option>
			  <option value="4heart" data-value="4">4心</option>
			  <option value="3heart" data-value="3">3心</option>
			  <option value="2heart" data-value="2">2心</option>
			  <option value="1heart" data-value="1">1心</option>
			</select>
		</li>
		<li style="background:none"><span class="btn"><button id="J_FilterButton" style="cursor:pointer;">确定</button></span></li>
		<li class="pagination"><?php echo $pager->show('items', array(), 'top',true);?></li>
	</ul>
	<div id="rankbar-form">
 		<div id="rankbar" class="old-srp" style="width: 758px; ">
 			<div class="iw">
            	<div class="tgl-switch tgl-switch-righton">
               		<!--<a href="" title="切换到列表视图"><span>切换到列表</span></a>-->
            	</div>
            	<div class="sorting">
	                <ul class="sorting-btns" id="J_FilterOrderBy">
	                	<?php


$orderBy = $params['sort'];
if ('credit_desc' == $orderBy) { //信用高到低
	echo $isTaoke ? '<li><a rel="nofollow" href="#" title="佣金比例从高到低" data-value="commissionRate_desc"><span>佣金比例</span></a></li>' : '';
	echo '<li><a rel="nofollow" href="#" title="销量从高到低" data-value="commissionNum_desc"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="信用从高到低" class="crt" data-value="credit_desc"><span>信用</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="点击按价格从低到高排序" class="dbsort" data-value="price_asc"><span>价格</span></a></li>';
}
elseif ('commissionNum_desc' == $orderBy) { //销量高到低
	echo $isTaoke ? '<li><a rel="nofollow" href="#" title="佣金比例从高到低" data-value="commissionRate_desc"><span>佣金比例</span></a></li>' : '';
	echo '<li><a rel="nofollow" href="#" title="销量从高到低" class="crt" data-value="commissionNum_desc"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="信用从高到低" data-value="credit_desc"><span>信用</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="点击按价格从低到高排序" class="dbsort" data-value="price_asc"><span>价格</span></a></li>';
}
elseif ('price_desc' == $orderBy) { //价格高到低
	echo $isTaoke ? '<li><a rel="nofollow" href="#" title="佣金比例从高到低" data-value="commissionRate_desc"><span>佣金比例</span></a></li>' : '';
	echo '<li><a rel="nofollow" href="#" title="销量从高到低" data-value="commissionNum_desc"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="信用从高到低" data-value="credit_desc"><span>信用</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="点击按价格从低到高排序" class="crt dbsort-desc" data-value="price_asc"><span>价格</span></a></li>';
}
elseif ('price_asc' == $orderBy) { //价格低到高
	echo $isTaoke ? '<li><a rel="nofollow" href="#" title="佣金比例从高到低" data-value="commissionRate_desc"><span>佣金比例</span></a></li>' : '';
	echo '<li><a rel="nofollow" href="#" title="销量从高到低" data-value="commissionNum_desc"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="信用从高到低" data-value="credit_desc"><span>信用</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="点击按价格从高到低排序" class="crt dbsort-asc" data-value="price_desc"><span>价格</span></a></li>';
}
elseif ('commissionRate_desc' == $orderBy) {
	echo $isTaoke ? '<li><a rel="nofollow" href="#" title="佣金比例从高到低" class="crt" data-value="commissionRate_desc"><span>佣金比例</span></a></li>' : '';
	echo '<li><a rel="nofollow" href="#" title="销量从高到低" data-value="commissionNum_desc"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="信用从高到低" data-value="credit_desc"><span>信用</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="点击按价格从高到低排序" class="dbsort" data-value="price_desc"><span>价格</span></a></li>';
} else {
	echo $isTaoke ? '<li><a rel="nofollow" href="#" title="佣金比例从高到低" data-value="commissionRate_desc"><span>佣金比例</span></a></li>' : '';
	echo '<li><a rel="nofollow" href="#" title="销量从高到低" class="crt" data-value="commissionNum_desc"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="信用从高到低" data-value="credit_desc"><span>信用</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="点击按价格从低到高排序" class="dbsort" data-value="price_asc"><span>价格</span></a></li>';
}
?>
	                </ul>
            	</div>
	            <div id="rank-priceform">
	                <div class="fm-price">
		                 <p>
		                    <input type="text" value="<?php echo $params['start_price'];?>" class="txt" id="J_StartPrice" title="按价格区间筛选 最低价">
		                    <span>-</span>
		                    <input type="text" value="<?php echo $params['end_price'];?>" class="txt" id="J_EndPrice" title="按价格区间筛选 最高价">
		                </p>
		                <div class="btns">
		                	<input type="hidden" id="J_ParamPageNo" value="<?php echo $params['page_no']?>"/>
		                    <span class="btn"><button class="i" id="J_PriceButton" style="cursor:pointer;">确定</button></span>
		                </div>
	            	</div>
	 			</div>
        	</div>
    	</div>
  	</div>
</div>
<div class="box" style="width:760px;">
	<div class="shop-display">
	    <div class="hd hidden"><h3></h3></div>
	    <div class="bd">
	    			<?php


if (!empty ($list)) {
	$count = 0;
	$length = count($list);
	foreach ($list as $row) {
		$title = $row['title'];
		$url = URL('item', array (
			'id' => $row['num_iid']
		));
		if ($count % $row_size == 0) {
			echo '<div class="grid ' . $show_size . '"><ul class="shop-list">';
		}
		$pic = $row['pic_url'] . $pic_jpg;
		$rel = ' class="J_TrackItem Go" data-nid="' . $row['num_iid'] . '" data-nick="' . $row['nick'] . '" data-click="' . base64_encode($row['click_url']) . '" ';
		$shopRel = ' class="J_TrackShop Go" data-nick="' . $row['nick'] . '" ' . ($row['shop_click_url'] ? ('data-click="' . base64_encode($row['shop_click_url']) . '"') : '') . ' ';
		$buttons = $isTaoke ? ((in_array($row['num_iid'], $nids) ? '<div class="ks-clear"><span class="followed-btn item-faved">已添加</span></div>' : ('<div class="ks-clear"><a class="addfollow-btn item-share" rel="e:addtbk" data-nid="' . $row['num_iid'] . '" data-title="' . F('escape', str_replace(array (
			'<span class=H>',
			'</span>'
		), array (
			'',
			''
		), $title)) . '" data-price="' . $row['price'] . '" data-nick="' . $row['nick'] . '" data-pic_url="' . $row['pic_url'] . '" data-commission="' . $row['commission'] . '" data-commission_num="' . $row['commission_num'] . '" data-item_location="' . $row['item_location'] . '" data-volume="' . $row['volume'] . '" href="#" style="color:red;"><span class="plus">+</span>添加(佣金:' . $row['commission'] . '元)</a></div>'))) : ('<div class="ks-clear"><a class="addfollow-btn item-share" rel="e:tbs,i:' . $row['num_iid'] . ',p:' . $row['price'] . ',n:' . $row['nick'] . ',t:' . F('escape', $row['title']) . ',u:' . base64_encode($row['pic_url']) . '" href="#"><span class="plus">+</span>分享</a><a class="addfollow-btn item-fav hidden" rel="e:tbf,i:' . $row['num_iid'] . ',n:' . $row['nick'] . '" href="#"><span class="plus">+</span>收藏</a></div>');
		if ($count % $row_size == ($row_size -1) || $count == $length -1) {
			echo '<li style="margin-right:0px;" data-value="' . $row['num_iid'] . '"><div class="item"><div class="pic"><a href="' . $url . '" title="' . $title . '" target="_blank" ' . $rel . '><img src="' . $pic . '" alt="' . $title . '" title="' . $title . '"/></a></div>' . $buttons . '<div class="desc"><a href="' . $url . '" target="_blank" ' . $rel . '>' . $title . '</a></div><div class="price"><div class="now"><span>￥ </span><strong>' . $row['price'] . '元</strong></div></div><div class="sales-amount">最近售出<em>' . $row['volume'] . '</em>笔</div><div class="seller"><a ' . $shopRel . ' href="' . URL('shop', array (
				'nick' => $row['nick']
			)) . '" target="_blank">' . $row['nick'] . '</a></div></div></li>';
			echo '</ul></div>';
		} else {
			echo '<li data-value="' . $row['num_iid'] . '"><div class="item"><div class="pic"><a href="' . $url . '" title="' . $title . '" target="_blank" ' . $rel . '><img src="' . $pic . '" alt="' . $title . '" title="' . $title . '"/></a></div>' . $buttons . '<div class="desc"><a href="' . $url . '" target="_blank" ' . $rel . '>' . $title . '</a></div><div class="price"><div class="now"><span>￥ </span><strong>' . $row['price'] . '元</strong></div></div><div class="sales-amount">最近售出<em>' . $row['volume'] . '</em>笔</div><div class="seller"><a ' . $shopRel . ' href="' . URL('shop', array (
				'nick' => $row['nick']
			)) . '" target="_blank">' . $row['nick'] . '</a></div></div></li>';
		}
		$count++;
	}
} else {
	echo '<div class="noresult" style="padding:10px 0px;"><p>抱歉！没有找到相关的宝贝</p></div>';
}
?>
	    </div>
	</div>
	<div class="ks-clear"></div>  
</div>
</div>
<div class="pagination" style="width:756px;" align="center">
<div class="page-bottom" style="width:450px;">
<?php


echo $pager->show('items', array (), 'bottom', true);
?>
<div class="ks-clear"></div>
</div>
</div>