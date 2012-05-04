<div class="blockLB bordA clear" id="theLatest">
	<div class="title">
		<?php if(isset($moreUrl)&&!empty($moreUrl)){?><a class="color1 r" href="<?php echo $moreUrl;?>" >更多&gt;&gt;</a><?php }?>
		<span><?php if(isset($titlePic)&&!empty($titlePic)){?><a><img height="18" src="http://www.xintaotv.com/css/default/xintao/xintaotv/<?php echo $titlePic?>"></a><?php }?></span>
	</div>
	<div class="pp pp3" style="width: 662px;">
		<ul>
			<?php
$count=0;			
foreach ($videos as $row) {
	$tipKey = $channel=='teleplay'?'tip_num':'tip';
	$url = F('tv.getNewPlayLink', isset ($row['sid']) ? $row['sid'] : -1, isset ($row['vid']) ? $row['vid'] : -1, isset ($row['cid']) ? $row['cid'] : -1);
?>
			<li<?php echo $count%5==4?' class="end"':''?>>
				<a href="<?php echo $url?>" rel="e:xtv,na"><img height="145" alt="<?php echo $row['tv_name']?>" src="<?php echo $row['ver_big_pic']?>" width="105"></a>
				<span><strong><a href="<?php echo $url?>"  rel="e:xtv,na"><?php echo $row['tv_name']?></a></strong></span>
				<span class="label"><i></i><code class="cc"></code><em><?php echo $row[$tipKey]?></em></span>
			</li>	
				
			<?php $count++;}?>
			
		</ul>
	</div>
</div>