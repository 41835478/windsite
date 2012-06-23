<?php
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>品牌特价(包邮) - 新淘高清视频</title>
<meta name="title" content="品牌特价(包邮) - 新淘高清视频">
<meta name="keywords" content="品牌特价(包邮),服装，内衣，配饰，鞋品，婴童，运动，箱包，皮具，家纺，家居品牌特价包邮商品">
<meta name="description" content="新淘高清视频品牌特价频道为您提供淘宝网,服装，内衣，配饰，鞋品，婴童，运动，箱包，皮具，家纺，家居品牌特价包邮商品,每天10点更新">
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<script src="http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js"></script>
<link href="http://static.xintaowang.com/css/default/tv.css" rel="stylesheet" type="text/css" />
</head>

<body id="sotv">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/xintaoTvHeader',array('channel'=> 'brand')); ?>
			<div id="container">
				<div class="brands-contents" id="J_AllBrands" style="margin-top: 10px;">
					<div class="tabWrapper">
						<ul class="logoTab clearfix" id="logoTabTrigger">
							<li class="cat cur" rel="all"><a title="全部品牌">全部</a> <s class="arrow"></s></li>
							<li class="cat" rel="fz"><a title="服装品牌特价">服装</a> <s class="arrow"></s></li>
							<li class="cat" rel="ny"><a title="内衣品牌特价">内衣</a> <s class="arrow"></s></li>
							<li class="cat" rel="ps"><a title="配饰品牌特价">配饰</a> <s class="arrow"></s></li>
							<li class="cat" rel="xp"><a title="鞋品品牌特价">鞋品</a> <s class="arrow"></s></li>
							<li class="cat" rel="yt"><a title="婴童品牌特价">婴童</a> <s class="arrow"></s></li>
							<li class="cat" rel="yd"><a title="运动品牌特价">运动</a> <s class="arrow"></s></li>
							<li class="cat" rel="xb"><a title="箱包品牌特价">箱包</a> <s class="arrow"></s></li>
							<li class="cat" rel="pj"><a title="皮具品牌特价">皮具</a> <s class="arrow"></s></li>
							<li class="cat" rel="jf"><a title="家纺品牌特价">家纺</a> <s class="arrow"></s></li>
							<li class="cat" rel="jj"><a title="家居品牌特价">家居</a> <s class="arrow"></s></li>
						</ul>
					</div>
					<div class="logoWrapper logoBar-trigger">
						<ul class="logoList" id="J_LogosTrigger">
							<?php $brands = F('get_xintaotv_brand');foreach($brands as $brand){?>
								<li class="<?php echo $brand['cat']?>"><a href="/brand/name-<?php echo urlencode($brand['name'])?>" title="<?php echo $brand['name']?>"> <b class="tmsspr"><b style="<?php echo $brand['logo']?>" class="tmsspr-img"></b><?php echo $brand['name']?></b> </a></li>
							<?php }?>
						</ul>
					</div>	
				</div>
			</div>
			<!-- 尾部 开始 -->
			<?php TPL::module('xintaoTvFooter');?>
			<!-- 尾部 结束 -->
		</div>
	</div>
	<?php TPL::module('gotop');?>
</body>
<script type="text/javascript">
KISSY.ready(function(S) {
	var DOM = S.DOM, brands = S.all('#J_LogosTrigger a'), lis = S
			.all('#J_LogosTrigger li'), tab_triggers = S.one('#logoTabTrigger'), D = S.DOM, IE = S.UA.ie, trigger = S
			.one('#J_LogosTrigger');
	function setHover(els) {
		els.on('mouseenter', function(e) {
					brands.addClass('hover');
					$(this).parent().css('borderColor', '#bbbbbb');
					tab_triggers.one('.cur .mask').css('visibility', 'visible');
					var cur = tab_triggers.one('.cur');
					cur.css({
								'borderColor' : '#bbbbbb',
								'borderBottomColor' : '#cecece'
							});
					if (cur.next()) {
						cur.next().css({
									'borderLeftColor' : '#bbbbbb',
									'boderBottomColor' : '#e1e1e1'
								});
					} else {
						tab_triggers.parent()
								.css('borderRightColor', '#bbbbbb');
					}
				});
		els.on('mouseleave', function(e) {
					brands.removeClass('hover');
					$(this).parent().css('borderColor', '#e1e1e1');
					tab_triggers.one('.cur .mask').css('visibility', 'hidden');
					var cur = tab_triggers.one('.cur');
					cur.css({
								'borderColor' : '#e1e1e1'
							});
					if (cur.next()) {
						cur.next().css('borderLeftColor', '#e1e1e1');
					} else {
						tab_triggers.parent()
								.css('borderRightColor', '#e1e1e1');
					}
				});
	}
	function setHeight() {
		var len = lis.length - trigger.all('.hidden').length;
		var line = Math.ceil(len / 11);
		var height = line * 50 - 1;
		trigger.height(height);
	}
	var mask = DOM.create('<div class="mask"/>');
	brands.prepend(mask);
	tab_triggers.all('a').prepend(mask);
	S.use('sizzle', function() {
				setHover(trigger);
			})
	var len = lis.length;
	var line = Math.ceil(len / 11) + 1;
	var height = line * 50;
	S.one('#J_AllBrands').height(height);
	if (IE == 6) {
		brands.on('mouseenter', function(e) {
					e.target.one('.mask').hide();
				});
		brands.on('mouseleave', function(e) {
					e.target.one('.mask').show();
				});
	}
	var ts = tab_triggers.children('.cat');
	setHeight();
	ts.on('mouseover', function() {
				tab_triggers.all('.cur').removeClass('cur');
				var catIndex = $(this).attr('rel');
				if (catIndex == 'all') {
					lis.removeClass('hidden');
				} else {
					lis.addClass('hidden');
					trigger.children('.' + $(this).attr('rel'))
							.removeClass('hidden');		
				}
				setHeight();
				$(this).addClass('cur');
			});
})

</script>
</html>
