<div class="menu">
	<ul class="main-menu">
		<li class="menu-first"><a hideFocus="true" href="http://<?php echo XT_SITE_DOMAIN?>" >首页</a></li>
		<?php
if (XT_IS_SELLER == 'true' && XT_SHOPS != '') {
	echo '<li' . ($type == 'products' ? ' class="menu-custom"' : '') . '><a hideFocus="true" href="http://' . XT_SITE_DOMAIN . '/sitemap" >官方店铺</a></li>';
	echo '<li' . ($type == 'cids' ? ' class="menu-custom"' : '') . '><a hideFocus="true" href="http://' . XT_SITE_DOMAIN . '/sitemap.cat" >分类地图</a></li>';
} else {
	echo '<li class="menu-first' . ($type == 'cids' ? ' menu-custom' : '') . '"><a hideFocus="true" href="http://' . XT_SITE_DOMAIN . '/sitemap" >分类地图</a></li>';
}
?>
		<li<?php echo ($type=='items'?' class="menu-custom"':'')?>><a hideFocus="true" href="http://<?php echo XT_SITE_DOMAIN?>/sitemap.item" >商品地图</a></li>
		<li<?php echo ($type=='shops'?' class="menu-custom"':'')?>><a hideFocus="true" href="http://<?php echo XT_SITE_DOMAIN?>/sitemap.shop" >店铺地图</a></li>
		<li<?php echo ($type=='keywords'?' class="menu-custom"':'')?>><a hideFocus="true" href="http://<?php echo XT_SITE_DOMAIN?>/sitemap.keyword" >关键词地图</a></li>
		<li<?php echo ($type=='posters'?' class="menu-custom"':'')?>><a hideFocus="true" href="http://<?php echo XT_SITE_DOMAIN?>/sitemap.poster" >画报地图</a></li>
		<li<?php echo ($type=='tvs'?' class="menu-custom"':'')?>><a hideFocus="true" href="http://<?php echo XT_SITE_DOMAIN?>/sitemap.tv" >影视地图</a></li>
    </ul>
	<div class="menu-bg">
        <span class="r-bg"></span>
        <span class="l-bg"></span>
    </div>
</div>