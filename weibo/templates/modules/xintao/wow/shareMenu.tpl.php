<div class="chrisma-header">
	<ul id="wow-nav" class="chrisma-wow-nav ks-clear">
		<?php $shopSubs = F('wow.wowTaokeItemCats');if(!empty($shopSubs)){?><li<?php echo $cat=='item'?' class="cur"':''?>><a href="/wow.item" hidefoucs="true">最In推荐<b class="l-l ms"></b><b class="r-l ms"></b><b class="arrow ms"></b></a></li><?php }?>
		<li<?php echo $cat=='lady'?' class="cur"':''?>><a href="/wow.lady" hidefoucs="true">女人<b class="l-l ms"></b><b class="r-l ms"></b><b class="arrow ms"></b></a></li>
		<li<?php echo $cat=='man'?' class="cur"':''?>><a href="/wow.man" hidefoucs="true">男人<b class="l-l ms"></b><b class="r-l ms"></b><b class="arrow ms"></b></a></li>
		<li<?php echo $cat=='life'?' class="cur"':''?>><a href="/wow.life" hidefoucs="true">生活<b class="l-l ms"></b><b class="r-l ms"></b><b class="arrow ms"></b></a></li>
		<li<?php echo $cat=='idea'?' class="cur"':''?>><a href="/wow.idea" hidefoucs="true">创意<b class="l-l ms"></b><b class="r-l ms"></b><b class="arrow ms"></b></a></li>
		<li<?php echo $cat=='shop'?' class="cur"':''?>><a href="/wow.shop" hidefoucs="true">合作商家<b class="l-l ms"></b><b class="r-l ms"></b><b class="arrow ms"></b></a></li>
	</ul>
</div>	
<div class="cat-rank-wrap-v2">
	<div class="second-rank-cat">
		<ul class="second-cat-list ks-clear">
			<li<?php echo $sub==''?' class="selected"':''?>><a href="/wow.<?php echo $cat?>" class="cat-with-icon"><b class="wow-hot-in"></b><?php echo $catName;?></a></li>
			<?php


if (!empty ($subs)) {
	foreach ($subs as $key => $value) {
		echo '<li' . ($sub == $key ? ' class="selected"' : '') . '><a href="/wow.' . $cat . '/sub-' . $key . '" class="cat-with-icon"><b class="' . $value['ico'] . '"></b>' . $value['title'] . '</a></li>';
	}
}
?>
		</ul>
		<div class="shadow-left"></div><div class="shadow-right"></div>
	</div>
</div>	
