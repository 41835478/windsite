<?php


/**
 * 商品搜索
 * @version $Id$
 */
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
$pic_jpg = '_160x160.jpg';
$params = $mod['param'];
$queryStr = $params;
$show_size = $queryStr['show_size'];
$row_size = 4;
if ('big' == $show_size) {
	$pic_jpg = '_b.jpg';
	$row_size = 3;
}
elseif ('small' == $show_size) {
	$pic_jpg = '_120x120.jpg';
	$row_size = 5;
}
//所有|商城标签区
//$mallQuery = array_filter($queryStr);
//$mallQuery['is_mall'] = 'true';
$mallUrl = URL('items', array_merge($queryStr, array (
	'is_mall' => true
)));
//$mallQuery['is_mall'] = '';
$allUrl = URL('items', array_merge($queryStr, array (
	'is_mall' => ''
)));
//排序
//$mallQuery['order_by'] = 'popularity:desc';
$orderPopularityQuery = URL('items', array_merge($queryStr, array (
	'order_by' => 'popularity:desc'
)));
//新旧
$stuffStatus = array (
	'' => '新旧',
	'new' => '全新',
	'second' => '二手',
	'unused' => '闲置'
);
//分页
$pager = APP :: N('TaobaoPager', $total_results, 40, $queryStr['page_no']);
?>


<div id="J_ItemSearch">
<?php if(!empty($queryStr['q'])){?>
<div class="related-search-outter"><dl class="related-search" id="J_RelatedSearch"></dl></div>
<?php }?>
<div class="filter" id="J_Filter">
	<ul class="filter-tabbar" id="J_FilterTabBar">
		<li<?php if(empty($queryStr['is_mall'])){echo ' class="selected"';}?> data-value="all"><span class="l"></span><span class="r"></span><a href="<?php echo $allUrl?>">所有宝贝</a></li>
		<li<?php if(true==$queryStr['is_mall']){echo ' class="selected"';}?> data-value="mall"><span class="l"></span><span class="r"></span><a href="<?php echo $mallUrl?>">淘宝商城</a></li>
		<li class="pagination">
		<?php


echo $pager->show('items', $queryStr, 'top');
?>
		</li>
	</ul>
	<div id="filterForm">
		<fieldset style="border:0px;">
			<legend>宝贝筛选器</legend>
				<ul class="basic">
					<li class="keywords"><label for="filterSearchNicks">卖家昵称：</label><input id="filterSearchNicks" type="text" class="text" name="nicks" value="<?php echo $queryStr['nicks'];?>"></li>
					<li class="fineness" id="J_StuffStatus">
						<span id="J_StuffStatusSelected" class="select-item" data-value="<?php echo $queryStr['stuff_status']?>"><span><?php echo $stuffStatus[$queryStr['stuff_status']]?></span></span>
						<ul class="item-list">
							<li<?php if('new'==$queryStr['stuff_status'])echo ' class="selected"'?> data-value="new" data-label="全新"><a>全新</a></li>	
							<li<?php if('second'==$queryStr['stuff_status'])echo ' class="selected"'?>  data-value="second" data-label="二手"><a>二手</a></li>
							<li<?php if('unused'==$queryStr['stuff_status'])echo ' class="selected"'?>  data-value="unused" data-label="闲置"><a>闲置</a></li>
							<li<?php if(''==$queryStr['stuff_status'])echo ' class="selected"'?> data-value="" data-label="新旧"><a>不限</a></li>
						</ul>
					</li>
				</ul>
				<div class="advanced" id="J_FilterOptions">
		        	<table style="width:100%;table-layout:fixed;">
						<tbody>
							<tr>
								<th width="45px">常用：</th>
								<th width="60px"><input type="checkbox"<?php if(true==$queryStr['post_free']){echo ' checked';}?> id="J_PostFree"><label for="J_PostFree">包邮</label></th>
								<th width="80px"><input type="checkbox"<?php if(true==$queryStr['is_cod']){echo ' checked';}?> id="filterServiceCOD"><label for="filterServiceCOD">货到付款</label></th>
								<th width="100px"><input type="checkbox"<?php if(true==$queryStr['is_prepay']){echo ' checked';}?> id="filterProtectionTruth"><label for="filterProtectionTruth">消费者保障</label></th>
								<th width="80px"><input type="checkbox"<?php if('4'==$queryStr['promoted_service']){echo ' checked';}?> id="J_PromotedService4"><label for="J_PromotedService4">7天退换</label></th>
								<th width="80px"><input type="checkbox"<?php if(true==$queryStr['genuine_security']){echo ' checked';}?> id="filterProtectionQuality"><label for="filterProtectionQuality">正品保障</label></th>
								<th width="80px"><input type="checkbox"<?php if(true==$queryStr['one_station']){echo ' checked';}?> id="filterServiceTao1Site"><label for="filterServiceTao1Site">淘宝代购</label></th>
								<th><input type="checkbox"<?php if(true==$queryStr['ww_status']){echo ' checked';}?> id="filterServiceWWOnline"><label for="filterServiceWWOnline" class="wwicon">旺旺在线</label></th>
							</tr>
						</tbody>
					</table>
					<!-- <a id="filterToggle" hidefocus="true" href="#">更多</a> -->
					<a id="filterToggle" href="#">收起</a>
				</div>
				<input type="hidden" id="J_ParamCid" value="<?php echo $queryStr['cid']?>"/>
				<input type="hidden" id="J_ParamNicks" value="<?php echo $queryStr['nicks']?>"/>
				<input type="hidden" id="J_ParamShowSize" value="<?php echo $queryStr['show_size']?>"/>
				<button class="submit highlight" id="J_SubmitBtn">确定</button>
		</fieldset>
	</div>
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
	echo '<li><a rel="nofollow" href="' . str_replace('popularity', 'seller_credit', $orderPopularityQuery) . '" title="信用从高到低"><span>信用</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity%3Adesc', 'price%3Aasc', $orderPopularityQuery) . '" title="点击按价格从低到高排序" class="dbsort"><span>价格</span></a></li>';
}
elseif ('volume:desc' == $orderBy) { //销量高到低
	echo '<li><a rel="nofollow" href="' . $orderPopularityQuery . '" title="人气值从高到低"><span>人气</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity', 'volume', $orderPopularityQuery) . '" title="销量从高到低" class="crt" data-value="volume:desc"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity', 'seller_credit', $orderPopularityQuery) . '" title="信用从高到低"><span>信用</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity%3Adesc', 'price%3Aasc', $orderPopularityQuery) . '" title="点击按价格从低到高排序" class="dbsort"><span>价格</span></a></li>';
}
elseif ('seller_credit:desc' == $orderBy) { //信用高到低
	echo '<li><a rel="nofollow" href="' . $orderPopularityQuery . '" title="人气值从高到低"><span>人气</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity', 'volume', $orderPopularityQuery) . '" title="销量从高到低"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity', 'seller_credit', $orderPopularityQuery) . '" title="信用从高到低" class="crt" data-value="seller_credit:desc"><span>信用</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity%3Adesc', 'price%3Aasc', $orderPopularityQuery) . '" title="点击按价格从低到高排序" class="dbsort"><span>价格</span></a></li>';
}
elseif ('price:desc' == $orderBy) { //价格高到低
	echo '<li><a rel="nofollow" href="' . $orderPopularityQuery . '" title="人气值从高到低"><span>人气</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity', 'volume', $orderPopularityQuery) . '" title="销量从高到低"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity', 'seller_credit', $orderPopularityQuery) . '" title="信用从高到低"><span>信用</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity%3Adesc', 'price%3Aasc', $orderPopularityQuery) . '" title="点击按价格从低到高排序" class="crt dbsort-desc" data-value="price:desc"><span>价格</span></a></li>';
}
elseif ('price:asc' == $orderBy) { //价格低到高
	echo '<li><a rel="nofollow" href="' . $orderPopularityQuery . '" title="人气值从高到低"><span>人气</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity', 'volume', $orderPopularityQuery) . '" title="销量从高到低"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity', 'seller_credit', $orderPopularityQuery) . '" title="信用从高到低"><span>信用</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity%3Adesc', 'price%3Adesc', $orderPopularityQuery) . '" title="点击按价格从高到低排序" class="crt dbsort-asc" data-value="price:asc"><span>价格</span></a></li>';
} else {
	echo '<li><a rel="nofollow" href="' . $orderPopularityQuery . '" title="人气值从高到低"><span>人气</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity', 'volume', $orderPopularityQuery) . '" title="销量从高到低"><span>销量</span></a></li>';
	echo '<li><a rel="nofollow" href="' . str_replace('popularity', 'seller_credit', $orderPopularityQuery) . '" title="信用从高到低"><span>信用</span></a></li>';
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
		                    <span class="btn"><button class="i" id="J_PriceButton" style="cursor:pointer;">确定</button></span>
		                </div>
	            	</div>
	 			</div>
	 			<div class="fake-select sel-loc" data-name="loc" id="sel-loc">
		           <ul class="selected"><li><s class="sel_dropdown"><s class="i"></s></s><a data-state="<?php echo $queryStr['state']?>" data-city="<?php echo $queryStr['city']?>" href="javascript:;"><?php if(!empty($queryStr['state'])){echo $queryStr['state'];}elseif(!empty($queryStr['city'])){echo $queryStr['city'];}else{echo '所在地';}?></a></li></ul>
            		<div class="toselect">
            			<ul class="loc1"><li><a href="javascript:;" data-value="">所有地区</a></li></ul>
 						<ul class="loc2 split">
 							<!--<li><a href="javascript:;" data-value="江苏,浙江,上海">江浙沪</a></li>
 							<li><a href="javascript:;" data-value="广州,深圳,中山,珠海,佛山,东莞,惠州">珠三角</a></li>	
 							<li><a href="javascript:;" data-value="香港,澳门,台湾">港澳台</a></li>
 							<li><a href="javascript:;" data-value="美国,英国,法国,瑞士,澳洲,新西兰,加拿大,奥地利,韩国,日本,德国,意大利,西班牙,俄罗斯,泰国,印度,荷兰,新加坡,其它国家">海外</a></li>-->	
 							<li><a href="javascript:;">北京</a></li><li><a href="javascript:;">上海</a></li><li><a href="javascript:;">广州</a></li><li><a href="javascript:;">深圳</a></li>
 						</ul>
       					<!--<div class="split userdefine">
        					<input type="text" class="txt" placeholder="多个地区用逗号隔开" id="inp-rankloc" name="loc">
        					<span class="btn"><button type="submit" class="i">确定</button></span>
        				</div>-->
 						<ul class="loc3">
 							<li><a href="javascript:;">杭州</a></li><li><a href="javascript:;">温州</a></li><li><a href="javascript:;">宁波</a></li><li><a href="javascript:;">南京</a></li><li><a href="javascript:;">苏州</a></li>
 							<li><a href="javascript:;">济南</a></li><li><a href="javascript:;">青岛</a></li><li><a href="javascript:;">大连</a></li><li><a href="javascript:;">无锡</a></li><li><a href="javascript:;">合肥</a></li>
 							<li><a href="javascript:;">天津</a></li><li><a href="javascript:;">长沙</a></li><li><a href="javascript:;">武汉</a></li><li><a href="javascript:;">郑州</a></li><li><a href="javascript:;">石家庄</a></li>
 							<li><a href="javascript:;">成都</a></li>	<li><a href="javascript:;">重庆</a></li>	<li><a href="javascript:;">西安</a></li><li><a href="javascript:;">昆明</a></li><li><a href="javascript:;">南宁</a></li>
 							<li><a href="javascript:;">福州</a></li><li><a href="javascript:;">厦门</a></li><li><a href="javascript:;">南昌</a></li><li><a href="javascript:;">东莞</a></li><li><a href="javascript:;">沈阳</a></li>	
 							<li><a href="javascript:;">长春</a></li><li><a href="javascript:;">哈尔滨</a></li>
 						</ul>
						<ul class="loc4 split">
							<li><a href="javascript:;">河北</a></li><li><a href="javascript:;">河南</a></li><li><a href="javascript:;">湖北</a></li><li><a href="javascript:;">湖南</a></li><li><a href="javascript:;">福建</a></li>
							<li><a href="javascript:;">江苏</a></li><li><a href="javascript:;">江西</a></li><li><a href="javascript:;">广东</a></li><li><a href="javascript:;">广西</a></li><li><a href="javascript:;">海南</a></li>
							<li><a href="javascript:;">浙江</a></li><li><a href="javascript:;">安徽</a></li><li><a href="javascript:;">吉林</a></li><li><a href="javascript:;">辽宁</a></li><li><a href="javascript:;">黑龙江</a></li>
							<li><a href="javascript:;">山东</a></li>	<li><a href="javascript:;">山西</a></li><li><a href="javascript:;">陕西</a></li><li><a href="javascript:;">新疆</a></li><li><a href="javascript:;">内蒙古</a></li>
							<li><a href="javascript:;">云南</a></li>	<li><a href="javascript:;">贵州</a></li><li><a href="javascript:;">四川</a></li><li><a href="javascript:;">甘肃</a></li><li><a href="javascript:;">宁夏</a></li>
							<li><a href="javascript:;">青海</a></li><li><a href="javascript:;">西藏</a></li><li><a href="javascript:;">香港</a></li><li><a href="javascript:;">澳门</a></li><li><a href="javascript:;">台湾</a></li>
						</ul>
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
		$rel = ' class="J_TrackItem" data-nid="'.$row['num_iid'].'" data-nick="'.$row['nick'].'" data-click="'.base64_encode($row['click_url']).'" ';
		$shopRel = ' class="J_TrackShop Go" data-nick="' . $row['nick'] . '" ' . ($row['shop_click_url'] ? ('data-click="' . base64_encode($row['shop_click_url']) . '"') : '') . ' ';
		if ($count % $row_size == ($row_size -1) || $count == $length -1) {
			echo '<li style="margin-right:0px;" data-value="' . $row['num_iid'] . '"><div class="item"><div class="pic"><a href="' . $url . '" title="' . $title . '" target="_blank" '.$rel.'><img src="' . XT_LAZYLOAD_PIC . '" data-original="' . $pic . '" alt="' . $title . '" title="' . $title . '"/></a></div><div class="desc"><a href="' . $url . '" target="_blank" '.$rel.'>' . $title . '</a></div><div class="price"><div class="now"><span>￥ </span><strong>' . $row['price'] . '元</strong></div></div><div class="sales-amount">最近30天售出<em>' . $row['volume'] . '</em>笔</div><div class="seller"><a '.$shopRel.' href="'.URL('shop',array('nick'=>$row['nick'])).'" target="_blank">'.$row['nick'].'</a></div></div>' . $info . '</li>';
			echo '</ul></div>';
		} else {
			echo '<li data-value="' . $row['num_iid'] . '"><div class="item"><div class="pic"><a href="' . $url . '" title="' . $title . '" target="_blank" '.$rel.'><img src="' . XT_LAZYLOAD_PIC . '" data-original="' . $pic . '" alt="' . $title . '" title="' . $title . '"/></a></div><div class="desc"><a href="' . $url . '" target="_blank" '.$rel.'>' . $title . '</a></div><div class="price"><div class="now"><span>￥ </span><strong>' . $row['price'] . '元</strong></div></div><div class="sales-amount">最近30天售出<em>' . $row['volume'] . '</em>笔</div><div class="seller"><a '.$shopRel.' href="'.URL('shop',array('nick'=>$row['nick'])).'" target="_blank">'.$row['nick'].'</a></div></div>' . $info . '</li>';
		}
		$count++;
	}
}
elseif ($pager->totalPages > $pager->nowPage) {
	//$nextPageQuery = array_filter($queryStr);
	$nextPageQuery['page_no'] = $pager->nowPage + 1;
	echo '<div class="noresult" style="padding:10px 0px;"><p>抱歉！当前页宝贝已下架，请点击<a href="' . URL('items', $nextPageQuery) . '">下一页</a>查看</p></div>';
} else {
	echo '<div class="noresult" style="padding:10px 0px;"><p>抱歉！没有找到相关的宝贝，请更换搜索条件后重试</p></div>';
}
?>
	    </div>
	</div>
	<div class="ks-clear"></div>  
</div>
</div>
<div class="pagination" style="width:756px;" align="center">
<div class="page-bottom" style="width:450px;">
<?php echo $pager->show('items', $queryStr, 'bottom');?>
<div class="ks-clear"></div>
</div>
</div>