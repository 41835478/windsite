<?php


/**
 * 站内商品搜索
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
	<ul class="filter-tabbar" id="J_FilterTabBar"><li class="pagination"><?php echo $pager->show('products', array(), 'top',true);?></li></ul>
	<div id="rankbar-form">
 		<div id="rankbar" class="old-srp" style="width: 758px; ">
 			<div class="iw">
            	<div class="tgl-switch tgl-switch-righton">
               		<!--<a href="" title="切换到列表视图"><span>切换到列表</span></a>-->
            	</div>
            	<div class="sorting">
	                <ul class="sorting-btns" id="J_FilterOrderBy">
	                	<?php


$orderBy = $params['order_by'];
if ('popularity:desc' == $orderBy) { //人气高到低
	echo '<li><a rel="nofollow" href="#" title="人气值从高到低" class="crt" data-value="popularity:desc"><span>人气</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="销量从高到低" data-value="volume:desc"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="点击按价格从低到高排序" class="dbsort" data-value="price:asc"><span>价格</span></a></li>';
}
elseif ('volume:desc' == $orderBy) { //销量高到低
	echo '<li><a rel="nofollow" href="#" title="人气值从高到低" data-value="popularity:desc"><span>人气</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="销量从高到低" class="crt" data-value="price:desc"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="点击按价格从低到高排序" class="dbsort" data-value="price:asc"><span>价格</span></a></li>';
}
elseif ('price:desc' == $orderBy) { //价格高到低
	echo '<li><a rel="nofollow" href="#" title="人气值从高到低" data-value="popularity:desc"><span>人气</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="销量从高到低" data-value="volume:desc"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="点击按价格从低到高排序" class="crt dbsort-desc" data-value="price:asc"><span>价格</span></a></li>';
}
elseif ('price:asc' == $orderBy) { //价格低到高
	echo '<li><a rel="nofollow" href="#" title="人气值从高到低" data-value="popularity:desc"><span>人气</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="销量从高到低" data-value="volume:desc"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="点击按价格从高到低排序" class="crt dbsort-asc" data-value="price:desc"><span>价格</span></a></li>';
} else {
	echo '<li><a rel="nofollow" href="#" title="人气值从高到低" class="crt" data-value="popularity:desc"><span>人气</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="销量从高到低" data-value="volume:desc"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="#" title="点击按价格从低到高排序" class="dbsort" data-value="price:asc"><span>价格</span></a></li>';
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
		$url = $isBack ? ('/go/nid-' . $row['num_iid']) : (URL('item', array (
			'id' => $row['num_iid']
		)));
		if ($count % $row_size == 0) {
			echo '<div class="grid ' . $show_size . '"><ul class="shop-list">';
		}
		$pic = $row['pic_url'] . $pic_jpg;
		$rel = ' class="J_TrackItem Go" data-nid="' . $row['num_iid'] . '" data-nick="' . $row['nick'] . '"';
		$buttons = $isBack ? ((in_array($row['num_iid'], $nids) ? '<div class="ks-clear"><span class="followed-btn item-faved">已添加</span></div>' : ('<div class="ks-clear"><a class="addfollow-btn item-share" rel="e:addtb" data-nid="' . $row['num_iid'] . '" data-title="' . F('escape', str_replace(array (
			'<span class=H>',
			'</span>'
		), array (
			'',
			''
		), $title)) . '" data-volume="' . $row['volume'] . '" data-cid="' . $row['cid'] . '" data-price="' . $row['price'] . '" data-nick="' . $row['nick'] . '" data-pic_url="' . $row['pic_url'] . '" href="#" style="color:red;"><span class="plus">+</span>添加该商品</a></div>'))) : ('<div class="ks-clear"><a class="addfollow-btn item-share" rel="e:tbs,i:' . $row['num_iid'] . ',p:' . $row['price'] . ',n:' . $row['nick'] . ',t:' . F('escape', $row['title']) . ',u:' . base64_encode($row['pic_url']) . '" href="#"><span class="plus">+</span>分享</a><a class="addfollow-btn item-fav hidden" rel="e:tbf,i:' . $row['num_iid'] . ',n:' . $row['nick'] . '" href="#"><span class="plus">+</span>收藏</a></div>');
		if ($count % $row_size == ($row_size -1) || $count == $length -1) {
			echo '<li style="margin-right:0px;" data-value="' . $row['num_iid'] . '"><div class="item"><div class="pic"><a href="' . $url . '" title="' . $title . '" target="_blank" ' . $rel . '><img src="' . $pic . '" alt="' . $title . '" title="' . $title . '"/></a></div>' . $buttons . '<div class="desc"><a href="' . $url . '" target="_blank" ' . $rel . '>' . $title . '</a></div><div class="price"><div class="now"><span>￥ </span><strong>' . $row['price'] . '元</strong></div></div><div class="sales-amount">最近售出<em>' . $row['volume'] . '</em>笔</div></div></li>';
			echo '</ul></div>';
		} else {
			echo '<li data-value="' . $row['num_iid'] . '"><div class="item"><div class="pic"><a href="' . $url . '" title="' . $title . '" target="_blank" ' . $rel . '><img src="' . $pic . '" alt="' . $title . '" title="' . $title . '"/></a></div>' . $buttons . '<div class="desc"><a href="' . $url . '" target="_blank" ' . $rel . '>' . $title . '</a></div><div class="price"><div class="now"><span>￥ </span><strong>' . $row['price'] . '元</strong></div></div><div class="sales-amount">最近售出<em>' . $row['volume'] . '</em>笔</div></div></li>';
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


echo $pager->show('products', array (), 'bottom', true);
?>
<div class="ks-clear"></div>
</div>
</div>