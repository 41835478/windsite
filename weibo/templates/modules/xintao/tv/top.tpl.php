<div class="blockRC bordB ks-clear" id="theViewRank">
	<h2><span><?php echo $title;?></span><a href="/video.top/c-<?php echo $channel;?>">TOP50&gt;&gt;</a></h2>
	<?php $keys = array_keys($data);$values=array_values($data)?>
	<div class="menuA clear">
        <ul>
        	<?php
$count = 1;
foreach ($keys as $row) {
	echo '<li ' . ($count == 1 ? 'class="now"' : '') . '>' . $row . '<em></em></li>';
	$count++;
}
?>
        </ul>
    </div>
    <div class="snList clear">
    	<?php


$count = 1;
foreach ($values as $v) {
	echo '<ul' . ($count != 1 ? ' class="hidden"' : '') . '>';
	$count = 1;
	foreach ($v as $row) {
		$url = ($api == 'teleplay/top/views/' ? ('/video/sid-' . $row['sid']) : ('/video/vid-' . $row['vid']));
		echo '<li><span class="trend ' . ($row['tv_trend_count'] > 0 ? 'up' : 'down') . '"></span><span class="num">' . $row['tv_count'] . '</span><em class="' . ($count < 4 ? 'colorA' : '') . '">' . ($count) . '</em><a class="' . ($count < 4 ? 'color1' : '') . '" href="' . $url . '"  title="' . $row['tv_name'] . '">' . F('cut_string', $row['tv_name'], 16) . '</a></li>';
		$count++;
		if ($count > 10) {
			break;
		}
	}
	echo '</ul>';
}
?>
    </div>
</div>