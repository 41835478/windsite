<?php


/**
 * 站内商品搜索
 * @version $Id$
 */
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}

$params = $mod['param'];
$params['nicks'] = '';
$queryStr = $params;
$show_size = '';
$pic_jpg = '_160x160.jpg';
$row_size = 4;
//排序
//$mallQuery['order_by'] = 'popularity:desc';
$orderPopularityQuery = URL('products', array_merge($queryStr, array (
	'order_by' => 'popularity:desc'
)));
//分页
$pager = APP :: N('TaobaoPager', $total_results, 40, $queryStr['page_no']);
?>
<!-- 搜索 开始 -->
<?php Xpipe::pagelet('common.xtSearchMod',array('keyword'=>$queryStr['q'])); ?>
<!-- 搜索 结束 -->
<?php


//增加搜索分类|属性 管道输出
Xpipe :: pagelet('component/component_96.run', array (
	'title' => '分类|属性',
	'component_id' => '96',
	'route' => 'products',
	'param' => array (
		'cats' => $cats,
		'total_results' => $total_results
	),
	'queryStr' => $queryStr
));
?>
<div id="J_ProductSearch">
<?php if(!empty($queryStr['q'])){?>
<div class="related-search-outter"><dl class="related-search" id="J_RelatedSearch"></dl></div>
<?php }?>
<div class="filter" id="J_Filter">
	<ul class="filter-tabbar" id="J_FilterTabBar"><li class="pagination"><?php echo $pager->show('products', $queryStr, 'top');?></li></ul>
	<div id="rankbar-form">
 		<div id="rankbar" class="old-srp" style="width: 758px; ">
 			<div class="iw">
            	<div class="tgl-switch tgl-switch-righton">
               		<!--<a href="" title="切换到列表视图"><span>切换到列表</span></a>-->
            	</div>
            	<div class="sorting">
	                <ul class="sorting-btns" id="J_FilterOrderBy">
	                	<?php


$orderBy = $queryStr['order_by'];
if ('popularity:desc' == $orderBy) { //人气高到低
	echo '<li><a rel="nofollow" href="' . $orderPopularityQuery . '" title="人气值从高到低" class="crt" data-value="popularity:desc"><span>人气</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity', 'volume', $orderPopularityQuery) . '" title="销量从高到低"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity%3Adesc', 'price%3Aasc', $orderPopularityQuery) . '" title="点击按价格从低到高排序" class="dbsort"><span>价格</span></a></li>';
}
elseif ('volume:desc' == $orderBy) { //销量高到低
	echo '<li><a rel="nofollow" href="' . $orderPopularityQuery . '" title="人气值从高到低"><span>人气</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity', 'volume', $orderPopularityQuery) . '" title="销量从高到低" class="crt" data-value="volume:desc"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity%3Adesc', 'price%3Aasc', $orderPopularityQuery) . '" title="点击按价格从低到高排序" class="dbsort"><span>价格</span></a></li>';
}
elseif ('seller_credit:desc' == $orderBy) { //信用高到低
	echo '<li><a rel="nofollow" href="' . $orderPopularityQuery . '" title="人气值从高到低"><span>人气</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity', 'volume', $orderPopularityQuery) . '" title="销量从高到低"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity%3Adesc', 'price%3Aasc', $orderPopularityQuery) . '" title="点击按价格从低到高排序" class="dbsort"><span>价格</span></a></li>';
}
elseif ('price:desc' == $orderBy) { //价格高到低
	echo '<li><a rel="nofollow" href="' . $orderPopularityQuery . '" title="人气值从高到低"><span>人气</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity', 'volume', $orderPopularityQuery) . '" title="销量从高到低"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity%3Adesc', 'price%3Aasc', $orderPopularityQuery) . '" title="点击按价格从低到高排序" class="crt dbsort-desc" data-value="price:desc"><span>价格</span></a></li>';
}
elseif ('price:asc' == $orderBy) { //价格低到高
	echo '<li><a rel="nofollow" href="' . $orderPopularityQuery . '" title="人气值从高到低"><span>人气</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity', 'volume', $orderPopularityQuery) . '" title="销量从高到低"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity%3Adesc', 'price%3Adesc', $orderPopularityQuery) . '" title="点击按价格从高到低排序" class="crt dbsort-asc" data-value="price:asc"><span>价格</span></a></li>';
} else {
	echo '<li><a rel="nofollow" href="' . $orderPopularityQuery . '" title="人气值从高到低"><span>人气</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity', 'volume', $orderPopularityQuery) . '" title="销量从高到低"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity%3Adesc', 'price%3Aasc', $orderPopularityQuery) . '" title="点击按价格从低到高排序" class="dbsort"><span>价格</span></a></li>';
}
?>
	                </ul>
            	</div>
	            <div id="rank-priceform">
	                <div class="fm-price">
		                 <p>
		                    <input type="text" value="<?php echo $queryStr['start_price'];?>" class="txt" id="J_StartPrice" title="按价格区间筛选 最低价">
		                    <span>-</span>
		                    <input type="text" value="<?php echo $queryStr['end_price'];?>" class="txt" id="J_EndPrice" title="按价格区间筛选 最高价">
		                </p>
		                <div class="btns">
		                	<input type="hidden" id="J_ParamCid" value="<?php echo $queryStr['cid']?>"/>
							<input type="hidden" id="J_ParamNicks" value="<?php echo $queryStr['nicks']?>"/>
							<input type="hidden" id="J_ParamShowSize" value="<?php echo $queryStr['show_size']?>"/>
		                    <span class="btn"><button class="i" id="J_PriceButton" style="cursor:pointer;">确定</button></span>
		                </div>
	            	</div>
	 			</div>
        	</div>
    	</div>
  	</div>
</div>
<div class="box">
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
		$pic = base64_encode($row['pic_url'] . $pic_jpg);
		$picBig = base64_encode($row['pic_url'] . '_310x310.jpg');
		$info = '<div id="productInfo_' . $row['num_iid'] . '" class="productInfo fc02 items02"><p align="center" class="jJ"><img src="' . XT_LAZYLOAD_PIC . '" data-original="' . $picBig . '" style="width: 310px; height: 310px; "></p><div class="sd">' . $title . '</div></div>';
		$rel = ' class="J_TrackItem" data-nid="' . $row['num_iid'] . '" data-nick="' . $row['nick'] . '"';
		$buttons = '<div class="ks-clear"><a class="addfollow-btn item-share" rel="e:tbs,i:' . $row['num_iid'] . ',p:' . $row['price'] . ',n:' . $row['nick'] . ',t:' . F('escape', $row['title']) . ',u:'.base64_encode($row['pic_url']).'" href="#"><span class="plus">+</span>分享</a><a class="addfollow-btn item-fav" rel="e:tbf,i:' . $row['num_iid'] . ',n:' . $row['nick'] . '" href="#"><span class="plus">+</span>收藏</a></div>';
		if ($count % $row_size == ($row_size -1) || $count == $length -1) {
			echo '<li style="margin-right:0px;" data-value="' . $row['num_iid'] . '"><div class="item"><div class="pic"><a href="' . $url . '" title="' . $title . '" target="_blank" ' . $rel . '><img src="' . XT_LAZYLOAD_PIC . '" data-original="' . $pic . '" alt="' . $title . '" title="' . $title . '"/></a></div>' . $buttons . '<div class="desc"><a href="' . $url . '" target="_blank" ' . $rel . '>' . $title . '</a></div><div class="price"><div class="now"><span>￥ </span><strong>' . $row['price'] . '元</strong></div></div><div class="sales-amount">最近30天售出<em>' . $row['volume'] . '</em>笔</div></div>' . $info . '</li>';
			echo '</ul></div>';
		} else {
			echo '<li data-value="' . $row['num_iid'] . '"><div class="item"><div class="pic"><a href="' . $url . '" title="' . $title . '" target="_blank" ' . $rel . '><img src="' . XT_LAZYLOAD_PIC . '" data-original="' . $pic . '" alt="' . $title . '" title="' . $title . '"/></a></div>' . $buttons . '<div class="desc"><a href="' . $url . '" target="_blank" ' . $rel . '>' . $title . '</a></div><div class="price"><div class="now"><span>￥ </span><strong>' . $row['price'] . '元</strong></div></div><div class="sales-amount">最近30天售出<em>' . $row['volume'] . '</em>笔</div></div>' . $info . '</li>';
		}
		$count++;
	}
}
elseif ($pager->totalPages > $pager->nowPage) {
	//$nextPageQuery = array_filter($queryStr);
	$nextPageQuery['page_no'] = $pager->nowPage + 1;
	echo '<div class="noresult" style="padding:10px 0px;"><p>抱歉！当前页宝贝已下架，请点击<a href="' . URL('products', $nextPageQuery) . '">下一页</a>查看</p></div>';
} else {
	echo '<div class="noresult" style="padding:10px 0px;"><p>抱歉！没有找到相关的宝贝，' . (XT_IS_TAOKE ? ('<a href="' . URL('items', array (
		'q' => $queryStr['q'],
		'cid' => $queryStr['cid'],
		'props' => $queryStr['props'],

		
	)) . '">搜索全站</a>') : '请更换搜索条件后重试') . ',</p></div>';
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


echo $pager->show('products', $queryStr, 'bottom');
?>
<div class="ks-clear"></div>
</div>
</div>