<?php $colums = 5;$lastMod=4;if($limit==4) {$colums=2;$lastMod=0;}?>
<div>
<div class="topx topx-<?php echo $limit;?>" style="position: relative;overflow:hidden;">
<div class="topx-hd">
    <?php echo $limit==4?'':'<div class="topic">今日销量排行</div>';?>
    <ol id="J_Tit" class="topx-hd-ol">
		<li value="0" data-cat="TR_FS" class="ks-switchable-trigger hover">服饰</li>
		<li value="3" data-cat="TR_JJ" class="ks-switchable-trigger">家居</li>
		<li value="1" data-cat="TR_MY" class="ks-switchable-trigger">母婴</li>
		<li value="2" data-cat="TR_SP" class="ks-switchable-trigger">食品</li>
		<li value="5" data-cat="TR_WT" class="ks-switchable-trigger">文体</li>
		<li value="4" data-cat="TR_ZH" class="ks-switchable-trigger">车|玩具|宠物</li>
	</ol>
</div>
<div id="J_Cnt" class="topx-bd" style="position: relative;overflow:hidden;">
	<?php
$olCount = 1;
foreach ($topItems as $items) {
	echo '<ol class="ks-switchable-panel">';
	$count = 1;
	foreach ($items as $item) {
		$pic = $item['pic_url'];
		if ($limit == 4) {
			$pic = str_replace('160x160', '120x120', $pic);
		}
?>
		<li<?php if($count%$colums==1){echo ' class="first"';}elseif($count%$colums==$lastMod){echo ' class="last"';}?>>
            <div class="unit">
                <s class="fst"><?php echo $count?></s>
                <div class="pic">
                    <a target="_blank" rel="nofollow" href="<?php echo $item['click_url']?>">
                    <img <?php echo $olCount==1?'src':'data-ks-lazyload-custom'?>="<?php echo $pic?>" title="<?php echo $item['title']?>" alt="<?php echo $item['title']?>"></a>
                </div>
                <a class="title" rel="nofollow" title="<?php echo $item['title']?>" href="<?php echo $item['click_url']?>" target="_blank"><?php echo $item['title']?></a>
                <span class="price">￥ <em><?php echo $item['price']?></em></span>
				<span class="sales">本月销售：<?php echo $item['volume']?>件</span>
            </div>
        </li>
     <?php $count++;}echo '</ol>';$olCount++;}?>
</div>
</div>
</div>