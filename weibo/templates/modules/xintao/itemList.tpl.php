<div class="box">
	<div class="shop-display">
	    <div class="bd">
	    			<?php

$show_size = '';
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
			echo '<div class="grid ' . $show_size . '"><ul class="shop-list">';
		}
		$pic = base64_encode($row['pic_url'] . $pic_jpg);
		$rel = ' class="J_TrackItem No" data-nid="'.$row['num_iid'].'" data-nick="'.$row['nick'].'" ';
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