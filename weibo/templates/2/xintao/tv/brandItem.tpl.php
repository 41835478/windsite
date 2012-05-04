<?php
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php echo $brand['name']?>特价包邮区 - 品牌特价(包邮) - 新淘高清视频</title>
<meta name="title" content="<?php echo $brand['name']?>品牌特价(包邮) - 新淘高清视频">
<meta name="keywords" content="<?php echo $brand['name']?>品牌特价(包邮),服装，内衣，配饰，鞋品，婴童，运动，箱包，皮具，家纺，家居品牌特价包邮商品">
<meta name="description" content="<?php echo $brand['name']?>官方旗舰网上专卖店:<?php echo isset($brand['description'])&&!empty($brand['description'])?htmlentities(trim($brand['description']),ENT_COMPAT,'UTF-8'):'品牌特价包邮商品,新淘高清视频品牌特价频道每天10点上架新品特价包邮'?>">
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<script src="http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js"></script>
<link href="http://www.xintaowang.com/css/default/tv.css" rel="stylesheet" type="text/css" />
</head>
<body id="sotv">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/xintaoTvHeader',array('channel'=> 'brand')); ?>
			<div id="container">
				<div class="special-offer-top">
					<div class="logoBar" id="J_LogoBar">
						<div class="logoBar-trigger">
							<ul class="logoList block-list Provide-block" id="J_Trigger">
								<li><a href="/brand/name-<?php echo urlencode('真维斯')?>" title="真维斯品牌特价包邮区"> <img src="http://img03.taobaocdn.com/tps/i3/T1ygWmXXJiXXXXXXXX-60-30.png" alt="真维斯品牌特价包邮区" /> </a></li>
								<li><a href="/brand/name-<?php echo urlencode('马克华菲')?>" title="马克华菲品牌特价包邮区"> <img src="http://img04.taobaocdn.com/tps/i4/T1MDWIXXJlXXXXXXXX-60-30.jpg" alt="马克华菲品牌特价包邮区" /> </a></li>
								<li><a href="/brand/name-<?php echo urlencode('雅鹿')?>" title="雅鹿品牌特价包邮区"> <img src="http://img04.taobaocdn.com/tps/i4/T1BwOmXbNjXXXXXXXX-60-30.png" alt="雅鹿品牌特价包邮区" /> </a></li>
								<li><a href="/brand/name-<?php echo urlencode('杰西伍')?>" title="杰西伍品牌特价包邮区"> <img src="http://img04.taobaocdn.com/tps/i4/T17LWmXeVxXXXXXXXX-60-30.jpg" alt="杰西伍品牌特价包邮区" /> </a></li>
								<li><a href="/brand/name-<?php echo urlencode('坚持我的')?>" title="坚持我的品牌特价包邮区"> <img src="http://img04.taobaocdn.com/tps/i4/T1MMCmXnVkXXXXXXXX-60-30.png" alt="坚持我的品牌特价包邮区" /> </a></li>
								<li><a href="/brand/name-<?php echo urlencode('歌莉娅')?>" title="歌莉娅品牌特价包邮区"> <img src="http://img01.taobaocdn.com/tps/i1/T1EYKNXeBkXXXXXXXX-60-30.png" alt="歌莉娅品牌特价包邮区" /> </a></li>
								<li><a href="/brand/name-<?php echo urlencode('咖飞')?>" title="咖飞品牌特价包邮区"><img src="http://img03.taobaocdn.com/tps/i3/T1y4apXfFtXXXXXXXX-60-30.jpg" alt="咖飞品牌特价包邮区" /> </a></li>
								<li><a href="/brand/name-<?php echo urlencode('耐克')?>" title="耐克品牌特价包邮区"><img src="http://img01.taobaocdn.com/tps/i1/T1iwymXlXlXXXXXXXX-60-30.png" alt="耐克品牌特价包邮区" /> </a></li>
								<li><a href="/brand/name-<?php echo urlencode('狼爪')?>" title="狼爪品牌特价包邮区"><img src="http://img04.taobaocdn.com/tps/i4/T1.a1wXe8YXXXXXXXX-60-30.jpg" alt="狼爪品牌特价包邮区" /> </a></li>
								<li><a href="/brand/name-<?php echo urlencode('玖熙')?>" title="玖熙品牌特价包邮区"><img src="http://img03.taobaocdn.com/tps/i3/T1xF9rXfdkXXXXXXXX-60-30.jpg" alt="玖熙品牌特价包邮区" /> </a></li>
								<li><a href="/brand" title="所有品牌"><img src="http://img02.taobaocdn.com/tps/i2/T1kI9uXotnXXXXXXXX-60-30.png" alt="所有品牌" /> </a></li>
							</ul>
						</div>
					</div>
					<?php if(!empty($brand['banner'])){?>
					<div class="shop-show">
						<div class="banner-img"><img width="950px" height="239px" src="<?php echo $brand['banner']?>" alt="<?php echo $brand['name']?>品牌特价包邮区"></div>
						<div class="shop-desc">
							<div class="logoText">
								<?php if(!empty($brand['shopLogo'])){?><a class="shop-logo" href="/brand/name-<?php echo urlencode($brand['name'])?>"> <img src="<?php echo $brand['shopLogo']?>" alt="<?php echo $brand['name']?>"> </a><?php }?>
								<p><?php echo $brand['description']?></p>
							</div>
						</div>
					</div>
					<?php }?>
				</div>
				<?php 
					$col1 = array ();
					$col2 = array ();
					$col3 = array ();
					$col4 = array ();
					$count = 0;
					if(isset($brand['items'])&&!empty($brand['items'])){
						$items = $brand['items'];
						foreach($items as $item){
							if ($count % 4 == 0) {
								$col1[] = $item;
							}
							elseif ($count % 4 == 1) {
								$col2[] = $item;
							}
							elseif ($count % 4 == 2) {
								$col3[] = $item;
							}
							elseif ($count % 4 == 3) {
								$col4[] = $item;
							}
							$count++;
						}	
					}
				?>
				<!--主体商品列表 @start-->
				<div id="J_Collists" class="col-lists-content ks-clear">
					<div id="col-1" class="col col-1">
						<ul class="col-list block-list Provide-block">
						<?php foreach($col1 as $row){$url = "http://s.click.taobao.com/t_9?p=mm_13667242_0_0&l=".urlencode('http://detail.tmall.com/item.htm?id='.$row['nid']);?>
							<li>
								<a rel="nofollow" href="<?php echo $url;?>" target="_blank" class="img">
									<span class="saled"><?php echo $row['volume'];?></span>
									<img class="zoom" alt="<?php echo $row['title'];?>" src="<?php echo $row['pic_url'];?>" />
								</a>
								<div class="bottomBlock">
									<div class="logoTitle">
										<a class="logo"><img src="<?php echo $brand['shopLogo'];?>" alt="<?php echo $brand['name'];?>LOGO" /></a>
										<a rel="nofollow" href="<?php echo $url;?>" target="_blank" class="desc"><?php echo $row['title'];?></a>
									</div>
									<a rel="nofollow" class="price" href="<?php echo $url;?>" target="_blank">
										<p><del class="marketPrice"><?php echo $row['marketPrice'];?></del></p>
										<strong class="discountPrice"><s></s><?php echo $row['discountPrice'];?></strong>
									</a>
								</div>
							</li>
						<?php }?>	
						</ul>
					</div>
					<div id="col-2" class="col col-2">
						<ul class="col-list block-list Provide-block">
						<?php foreach($col2 as $row){$url = "http://s.click.taobao.com/t_9?p=mm_13667242_0_0&l=".urlencode('http://detail.tmall.com/item.htm?id='.$row['nid']);?>
							<li>
								<a rel="nofollow" href="<?php echo $url;?>" target="_blank" class="img">
									<span class="saled"><?php echo $row['volume'];?></span>
									<img class="zoom" alt="<?php echo $row['title'];?>" src="<?php echo $row['pic_url'];?>" />
								</a>
								<div class="bottomBlock">
									<div class="logoTitle">
										<a class="logo"><img src="<?php echo $brand['shopLogo'];?>" alt="<?php echo $brand['name'];?>LOGO" /></a>
										<a rel="nofollow" href="<?php echo $url;?>" target="_blank" class="desc"><?php echo $row['title'];?></a>
									</div>
									<a rel="nofollow" class="price" href="<?php echo $url;?>" target="_blank">
										<p><del class="marketPrice"><?php echo $row['marketPrice'];?></del></p>
										<strong class="discountPrice"><s></s><?php echo $row['discountPrice'];?></strong>
									</a>
								</div>
							</li>
						<?php }?>
						</ul>
					</div>
					<div id="col-3" class="col col-3">
						<ul class="col-list block-list Provide-block">
						<?php foreach($col3 as $row){$url = "http://s.click.taobao.com/t_9?p=mm_13667242_0_0&l=".urlencode('http://detail.tmall.com/item.htm?id='.$row['nid']);?>
							<li>
								<a rel="nofollow" href="<?php echo $url;?>" target="_blank" class="img">
									<span class="saled"><?php echo $row['volume'];?></span>
									<img class="zoom" alt="<?php echo $row['title'];?>" src="<?php echo $row['pic_url'];?>" />
								</a>
								<div class="bottomBlock">
									<div class="logoTitle">
										<a class="logo"><img src="<?php echo $brand['shopLogo'];?>" alt="<?php echo $brand['name'];?>LOGO" /></a>
										<a rel="nofollow" href="<?php echo $url;?>" target="_blank" class="desc"><?php echo $row['title'];?></a>
									</div>
									<a rel="nofollow" class="price" href="<?php echo $url;?>" target="_blank">
										<p><del class="marketPrice"><?php echo $row['marketPrice'];?></del></p>
										<strong class="discountPrice"><s></s><?php echo $row['discountPrice'];?></strong>
									</a>
								</div>
							</li>
						<?php }?>
						</ul>
					</div>
					<div id="col-4" class="col col-4">
						<ul class="col-list block-list Provide-block">
						<?php foreach($col4 as $row){$url = "http://s.click.taobao.com/t_9?p=mm_13667242_0_0&l=".urlencode('http://detail.tmall.com/item.htm?id='.$row['nid']);?>
							<li>
								<a rel="nofollow" href="<?php echo $url;?>" target="_blank" class="img">
									<span class="saled"><?php echo $row['volume'];?></span>
									<img class="zoom" alt="<?php echo $row['title'];?>" src="<?php echo $row['pic_url'];?>" />
								</a>
								<div class="bottomBlock">
									<div class="logoTitle">
										<a class="logo"><img src="<?php echo $brand['shopLogo'];?>" alt="<?php echo $brand['name'];?>LOGO" /></a>
										<a rel="nofollow" href="<?php echo $url;?>" target="_blank" class="desc"><?php echo $row['title'];?></a>
									</div>
									<a rel="nofollow" class="price" href="<?php echo $url;?>" target="_blank">
										<p><del class="marketPrice"><?php echo $row['marketPrice'];?></del></p>
										<strong class="discountPrice"><s></s><?php echo $row['discountPrice'];?></strong>
									</a>
								</div>
							</li>
						<?php }?>
						</ul>
					</div>
				</div>
				<!--主体商品列表 @end-->	
			</div>
			<!-- 尾部 开始 -->
			<?php TPL::module('xintaoTvFooter');?>
			<!-- 尾部 结束 -->
		</div>
	</div>
	<?php TPL::module('gotop');?>
</body>
<script type="text/javascript">
KISSY.ready(function(C) {
			var G = C.DOM, J = C.all("#J_Trigger a"), H = C
					.all("#J_Trigger li");
			var A = C.DOM, E = C.UA.ie, B = C.one("#J_Trigger");
			function F(D) {
				D.on("mouseenter", function(K) {
							J.addClass("hover");
							this.parent().css("borderColor", "#bbbbbb")
						});
				D.on("mouseleave", function(K) {
							J.removeClass("hover");
							this.parent().css("borderColor", "#e1e1e1")
						})
			}
			var I = G.create('<div class="mask"/>');
			J.prepend(I);
			if (E == 6) {
				J.on("mouseenter", function(D) {
							D.target.one(".mask").hide()
						});
				J.on("mouseleave", function(D) {
							D.target.one(".mask").show()
						})
			}
			F(B)
		});
</script>
</html>
