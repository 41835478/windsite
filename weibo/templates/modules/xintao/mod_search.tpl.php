<?php
$router_str = APP :: getRuningRoute(false);
if ($router_str == 'items.default_action') {
?>
<div class="mod-search" style="padding:0px 75px;height:73px;">
	<div class="search-area" style="padding-top:0px;height:70px;">
		<form method="get" id="searchForm" action="<?php echo URL('items');?>">
		<div class="tab-s1">
			<span rel="items" class="current"><span><a href="#">淘宝商品</a></span></span>
			<!--<span rel="posters"><span><a href="#">导购画报</a></span></span>-->
		</div>
		<div class="search-block">
			<div class="search-inner">
				<?php $q=htmlspecialchars(V('g:q', ''));?>
				<input type="text" class="input-txt" value="<?php echo empty($q)?$keyword:$q; ?>" name="q"  id="filterSearchKeyWord" autocomplete="off"/>
			</div>
			<a href="#" class="s-btn skin-btn" id="searchBtn">搜索</a>
		</div>
		</form>
	</div>
</div>
<?php }elseif($router_str == 'posters.default_action'||$router_str == 'poster.default_action'){?>
<div class="mod-search" style="padding:0px 75px;height:73px;">
	<div class="search-area" style="padding-top:0px;height:70px;">
		<form method="get" id="searchForm" action="<?php echo URL('posters');?>">
		<div class="tab-s1">
			<span rel="posters" class="current"><span><a href="#">导购画报</a></span></span>
			<!--<span rel="items"><span><a href="#">淘宝商品</a></span></span>-->
		</div>
		<div class="search-block">
			<div class="search-inner">
				<?php $key_word=htmlspecialchars(V('g:key_word', ''));?>
				<input type="text" class="input-txt" value="<?php echo empty($key_word)?$keyword:$key_word; ?>" name="key_word"  id="filterSearchKeyWord" autocomplete="off"/>
			</div>
			<a href="#" class="s-btn skin-btn" id="searchBtn">搜索</a>
		</div>
		</form>
	</div>
</div>	
<?php }elseif($router_str == 'products.default_action'){?>
	<div class="mod-search" style="padding:0px 75px;height:53px;">
	<div class="search-area" style="padding-top:0px;height:42px;">
		<form method="get" id="searchForm" action="<?php echo URL('products');?>">
		<div class="search-block">
			<div class="search-inner">
				<?php $q=htmlspecialchars(V('g:q', ''));?>
				<input type="text" class="input-txt" value="<?php echo empty($q)?$keyword:$q; ?>" name="q"  id="filterSearchKeyWord" autocomplete="off"/>
			</div>
			<a href="#" class="s-btn skin-btn" id="searchBtn">搜索</a>
		</div>
		</form>
	</div>
</div>
<?php }?>
