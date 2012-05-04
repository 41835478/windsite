<?php


/**
 * 海报展现
 * @version $Id$
 */
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
$params = $mod['param'];
$queryStr = $params;
$row_size = 4;
//分页
$pager = APP :: N('TaobaoPager', $total_results, 40, $queryStr['page_no']);
?>
<?php


//增加搜索分类|属性 管道输出
Xpipe :: pagelet('component/component_94.run', array (
	'title' => '凡客分类',
	'component_id' => '94',
	'param' => array (
		'q' => $queryStr['q'],
		'cid' => $queryStr['cid'],
		'total_results' => $total_results
	)
));
?>
<div class="searchHead" id="divsort">
    <div class="orderimg">
    <?php


if ('3' == $queryStr['sortOrder']) { //价格由低到高
	echo '<a href="' . URL('vancls', array_filter(array_merge($queryStr, array (
		'sortOrder' => ''
	)))) . '" class="s_zuixin1" title="上架新品"></a>';
	echo '<a href="' . URL('vancls', array_filter(array_merge($queryStr, array (
		'sortOrder' => '4'
	)))) .
	'" class="s_jiage2" title="按价格由低到高"></a>';
}
elseif ('4' == $queryStr['sortOrder']) { //价格由高到低
	echo '<a href="' . URL('vancls', array_filter(array_merge($queryStr, array (
		'sortOrder' => ''
	)))) . '" class="s_zuixin1" title="上架新品"></a>';
	echo '<a href="' . URL('vancls', array_filter(array_merge($queryStr, array (
		'sortOrder' => '3'
	)))) .
	'" class="s_jiage3" title="按价格由高到低"></a>';
} else { //最新
	echo '<a href="' . URL('vancls', array_filter(array_merge($queryStr, array (
		'sortOrder' => ''
	)))) . '" class="s_zuixin2" title="上架新品"></a>';
	echo '<a href="' . URL('vancls', array_filter(array_merge($queryStr, array (
		'sortOrder' => '3'
	)))) .
	'" class="s_jiage1" title="按价格由低到高"></a>';
}
?>
    </div>
    <div class="searchbarText">
    	<input type="hidden" id="J_VanclCid" value="<?php echo $queryStr['cid'];?>">
    	<input type="hidden" id="J_VanclSortOrder" value="<?php echo $queryStr['sortOrder'];?>">
    	<input type="hidden" id="J_VanclPageNo" value="<?php echo $queryStr['page_no'];?>">
	    <div class="priceTextArea">        
        <input type="text" class="FpriceText" id="J_VanclSPrice" value="<?php echo $queryStr['sprice'];?>">
        <span class="Fline">-</span>
        <input type="text" class="FpriceText" id="J_VanclEPrice" value="<?php echo $queryStr['eprice'];?>">
        <input type="button" class="FpriceBtn" id="J_VanclPrice"></div>	
    </div>
    <div class="styleorder" id="J_VanclSpecial">
        <span class="span01"><input type="radio" <?php echo !$queryStr['isspecial']?'checked':'';?> name="isspecial" value=""></span>
        <span class="span02">全部</span>
        <span class="span01"><input type="radio" <?php echo $queryStr['isspecial']==true?'checked':'';?> name="isspecial" value="1"></span>
        <span class="span02">仅特惠</span>
    </div>
    <div class="pagination"><?php echo $pager->show('vancls', $queryStr, 'top');?></div>
</div>
<div id="J_VanclSearch" class="box">
	<div class="shop-display">
	    <div class="hd hidden"><h3><?php echo F('escape', $mod['title']);?></h3></div>
	    <div class="bd">
	    			<?php


if (!empty ($list)) {
	$count = 0;
	$length = count($list);
	foreach ($list as $row) {
		$title = F('escape', $row['name']);
		$code = $row['productCode'];
		$url = URL('vancl', array (
			'id' => $code
		));
		$originalPrice = (int) $row['originalPrice'];
		$currentPrice = (int) $row['currentPrice'];
		$picPath = 'http://i.vanclimg.com/product/' . $code[0] . '/' . $code[1] . '/' . $code[2] . '/' . $code;
		$pic = base64_encode($picPath . '/lists170/' . $code . '.jpg');
		$picBig = base64_encode($picPath . '/mid/' . $row['photos'] . '.jpg');
		if ($count % $row_size == 0) {
			echo '<div class="grid vancl"><ul class="shop-list">';
		}
		$special = (!empty ($row['specialPrice']) ? '<div class="tehui">' . (int) $row['specialPrice'] . '</div>' : '');
		$specialP = (!empty ($row['specialPrice']) ? ('<p class="jJ02"><strong>特惠价：￥' . (int) $row['specialPrice'] . '</strong></p><p class="jJ03">市场价：<del>￥' . $originalPrice . '</del>　<span>售价：￥' . $currentPrice . '</span></p>') : '<p class="jJ02"><strong>售价：￥' . $currentPrice . '</strong></p><p class="jJ03">市场价：<del>￥' . $originalPrice . '</del>　<span></span></p>');
		$isNew = ($row['isNew'] ? '<div class="newview"></div>' : '');
		$rel = ' data-vid="'.$code.'" class="J_TrackVancl" ';
		$info = '<div id="productInfo_' . $code . '" class="productInfo fc02"><p align="center" class="jJ"><img src="' . XT_LAZYLOAD_PIC . '" data-original="' . $picBig . '" style="width: 270px; height: 270px; "></p><div class="sd">' . $title . '</div><p class="jJ01">产品编号：' . $code . '</p>' . $specialP . '</div>';
		if ($count % $row_size == ($row_size -1) || $count == $length -1) {
			echo '<li style="margin-right:0px;" data-value="' . $code . '"><div class="item"><div class="pic">' . $isNew . '<a href="' . $url . '" title="' . $title . '" target="_blank" '.$rel.'><img src="' . XT_LAZYLOAD_PIC . '" data-original="' . $pic . '" alt="' . $title . '" title="' . $title . '"/></a>' . $special . '</div><div class="desc"><a href="' . $url . '" title="' . $title . '" target="_blank" '.$rel.'>' . $title . '</a></div><div class="price"><span class="Mprice">市场价￥<em>' . $originalPrice . '</em></span><span class="Sprice">售价￥' . $currentPrice . '</span></div></div>'.$info.'</li>';
			echo '</ul></div>';
		} else {
			echo '<li data-value="' . $code . '"><div class="item"><div class="pic">' . $isNew . '<a href="' . $url . '" title="' . $title . '" target="_blank" '.$rel.'><img src="' . XT_LAZYLOAD_PIC . '" data-original="' . $pic . '" alt="' . $title . '" title="' . $title . '"/></a>' . $special . '</div><div class="desc"><a href="' . $url . '" title="' . $title . '" target="_blank" '.$rel.'>' . $title . '</a></div><div class="price"><span class="Mprice">市场价￥<em>' . $originalPrice . '</em></span><span class="Sprice">售价￥' . $currentPrice . '</span></div></div>'.$info.'</li>';
		}
		$count++;
	}
} else {
	echo '<div class="noresult" style="padding:10px 0px;"><p>抱歉！没有找到相关的宝贝，请更换搜索条件后重试</p></div>';
}
?>
	    </div>
	</div>
	<div class="ks-clear"></div>  
</div>
<div class="pagination" style="width:756px;" align="center">
<div class="page-bottom" style="width:450px;">
<?php


echo $pager->show('vancls', $queryStr, 'bottom');
?>
<div class="ks-clear"></div>
</div>
</div>