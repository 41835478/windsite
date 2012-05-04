<?php
$AD950x88S = array (
	array (
		array (
			'url' => 'http://3c.tmall.com/go/act/tmall/dqceznac.php',
			'pic' => 'http://img01.taobaocdn.com/imgextra/i1/71614142/T28qyoXb0XXXXXXXXX_!!71614142.jpg'
		)
	)
);
$AD950x88 = $AD950x88S[array_rand($AD950x88S)];
shuffle($AD950x88);
?>
<div id="J_AdSlide" class="J_AdSlide">
<ol class="ks-switchable-content">
	<?php


$adCount = 0;
foreach ($AD950x88 as $ad) {
	echo '<li' . ($adCount == 0 ? '' : ' class="hidden"') . '><a href="http://s.click.taobao.com/t_9?p=mm_13667242_0_0&l=' . urlencode($ad['url']) . '" target="_blank" rel="nofollow"><img border="0" src="' . $ad['pic'] . '" width="950px" height="88px"></a></li>';
}
?>
</ol>
</div>
<script type="text/javascript">
KISSY.use("switchable", function (S, Switchable) {
    var s = new Switchable.Slide('#J_AdSlide', {
        effect : 'scrolly',
        easing : 'easeOutStrong',
        countdown : true,
        countdownFromStyle : 'width:18px'
    });
 });
</script>