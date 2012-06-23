<style>
small { font-size: 12px; -webkit-text-size-adjust: none;}small.rank {display: inline-block;font: bold 11px arial, "宋体", sans-serif;text-align: center;border-radius: 3px;margin-right: 10px;line-height: 14px;width: 14px;color: white;background: #FF7300;}
.grey small.rank {background: #B3B3B3;}#rank-section .info {color: #666;margin-bottom: 10px;font-size: 14px;}#rank-section .info em {color: #3391D4;margin: 0 5px;}#rank-section .mod {border: 1px solid #3391D4;border-top-width: 5px;float: left;width: 460px;margin: 0 0 18px 0;}#rank-section .mod-1 ol,#rank-section .mod-2 ol {height: 480px;}
#rank-section div.odd {margin-right: 10px;}#rank-section ::-webkit-scrollbar {width: 5px;}#rank-section ::-webkit-scrollbar-track {border-radius: 3px;background-color: #D9D9D9;}#rank-section ::-webkit-scrollbar-thumb {border-radius: 3px;background-color: #3391D4;}#rank-section ::-webkit-scrollbar-button {width: 5px;height: 5px;}
#rank-section h3 {background: #FFF;color: #3391D4;font-size: 16px;line-height: 30px;margin-bottom: 0px;}#rank-section h3,#rank-section .head {padding-left: 10px;font-weight: bold;}
#rank-section .head {border-top: #E0E0E0;background: #ECECEC;color: #999;}#rank-section ol {background: #F8F8F8;height: 300px;margin: 0 5px;padding:0px;}#rank-section li,#rank-section .head {height: 29px;line-height: 29px;}#rank-section span {display: inline-block;text-indent: 3px;}#rank-section span * {text-indent: 0;}#rank-section li {border-bottom: 1px dashed #CCC;padding: 0 5px;}#rank-section li.last,#rank-section ol li:last-child {border-bottom: none;}
#rank-section li .key a {color: #106099;}#rank-section span.rank {width: 30px;}#rank-section small.rank {min-width: 14px;width: auto;_width: 14px;}#rank-section .key {width: 150px;}#rank-section .value {width: 55px;}
#rank-section li .rise {background: url(http://static.xintaowang.com/css/default/xintao/taobao/bc_color_arrow.png) no-repeat 0 -900px;height: 20px;padding-left: 12px;}#rank-section .up .rise {background-position: 0 5px;}#rank-section .down .rise {background-position: 0 -16px;}
</style>
<?php $my = F('yingxiao.getMyYingxiao');?>
<div id="rank-section" class="ks-clear">
    <div class="info">
        <strong style="color:red;">没有淘客推广自己的店铺？</strong><a href="#" rel="e:openAppstore">订购卖家服务</a>，您将得到淘宝客的协同推广提升<strong style="color:red;font-size:16px;">20</strong>倍营销增速，微购累计为淘宝卖家，淘客带来<strong style="color:red;font-size:16px;"><?php echo F('yingxiao.getWeiboYingxiao');?></strong>次营销推广
    </div>
    <?php $shops = F('yingxiao.getItemYingxiaoTop10');?>
    <div class="mod odd mod-11">
            <h3 class="title">商品营销<?php echo $my['item']>0?('【我的商品营销<strong style="color:red;">'.$my['item'].'</strong>次】'):''?></h3>
            <div class="head">
                <span class="rank">排行</span>
                <span class="key">淘宝卖家</span>
                <span class="rise">次数&nbsp;/&nbsp;淘客(人)</span>
            </div>
        <ol>
        		<?php
if (!empty ($shops)) {
	$count = 1;
	foreach ($shops as $row) {
		$nick = $row['nick'];
		$nums = $row['nums'];
		$taokes = $row['taokes'];
		$isSeller = $row['isSeller'];
?>
            <li class="<?php echo ($isSeller?'up':'down').($count>3?' grey':'');?>">
                <span class="rank"><small class="rank"><?php echo $count?></small></span>
                <span class="key"><?php if($isSeller){?><a target="_blank" href="/go/shopnick-<?php echo urlencode($nick)?>" title="<?php echo F('escape',$nick)?>"><?php echo $nick?></a><?php }else{ echo $nick.'(已过期)';}?></span>
                <span class="rise"><?php echo $nums.'&nbsp;/&nbsp;'.$taokes?>
                	<?php
                		$sina = $row['sina'];
                		$qq = !empty($row['qq'])?$row['qq']:$sina;
                		$sh = !empty($row['sh'])?$row['sh']:$sina;
                		$wy = !empty($row['wy'])?$row['wy']:$sina;
                		$wKey = $row['wKey'];
                	?>
                	【<?php echo ('<a target="_blank" href="http://s.weibo.com/weibo/'.(urlencode($wKey)).'">新浪</a>');?>
                	,<?php echo ('<a target="_blank" href="http://t.qq.com/search/index.php?sort=0&k='.($wKey).'">腾讯</a>');?>
                	,<?php echo ('<a target="_blank" href="http://t.sohu.com/twsearch/twSearch?key='.(urlencode(mb_convert_encoding(($wKey),'GBK','UTF-8'))).'">搜狐</a>');?>
                	,<?php echo ('<a target="_blank" href="http://t.163.com/tag/'.(urlencode($wKey)).'">网易</a>');?>】
                </span>
            </li>
            <?php $count++;}}?>
        </ol>
    </div>
    <?php $shops = F('yingxiao.getShopYingxiaoTop10');?>
    <div class="mod odd mod-11">
            <h3 class="title">店铺营销<?php echo $my['shop']>0?('【我的店铺营销<strong style="color:red;">'.$my['shop'].'</strong>次】'):''?></h3>
            <div class="head">
                <span class="rank">排行</span>
                <span class="key">淘宝卖家</span>
                <span class="rise">次数&nbsp;/&nbsp;淘客(人)</span>
            </div>
            <ol>
            <?php


		if (!empty ($shops)) {
			$count = 1;
			foreach ($shops as $shop) {
				$isSeller = $shop['isSeller'];
?>
            <li class="<?php echo ($isSeller?'up':'down').($count>3?' grey':'');?>">
                <span class="rank"><small class="rank"><?php echo $count?></small></span>
                <span class="key"><?php if($isSeller){?><a target="_blank" href="/go/sid-<?php echo $shop['sid']?>" title="<?php echo F('escape',$shop['title'])?>"><?php echo $shop['nick']?></a><?php }else{ echo $shop['nick'].'(已过期)';}?></span>
                <span class="rise"><?php echo $shop['nums'].'&nbsp;/&nbsp;'.$shop['taokes']?>
                <?php
                		$sina = $shop['sina'];
                		$qq = !empty($shop['qq'])?$shop['qq']:$sina;
                		$sh = !empty($shop['sh'])?$shop['sh']:$sina;
                		$wy = !empty($shop['wy'])?$shop['wy']:$sina;
                		$wKey = $shop['wKey'];
                	?>
                	【<?php echo ('<a target="_blank" href="http://s.weibo.com/weibo/'.(urlencode($wKey)).'">新浪</a>');?>
                	,<?php echo ('<a target="_blank" href="http://t.qq.com/search/index.php?sort=0&k='.($wKey).'">腾讯</a>');?>
                	,<?php echo ('<a target="_blank" href="http://t.sohu.com/twsearch/twSearch?key='.(urlencode(mb_convert_encoding(($wKey),'GBK','UTF-8'))).'">搜狐</a>');?>
                	,<?php echo ('<a target="_blank" href="http://t.163.com/tag/'.(urlencode($wKey)).'">网易</a>');?>】
                </span>
            </li>
            <?php $count++;}}?>
               </ol>
    </div>
</div>