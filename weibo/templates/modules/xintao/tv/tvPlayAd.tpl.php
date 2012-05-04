<?php


if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
$width = $isBoke?258:178;
$height = $isBoke?360:490;
if (!empty ($list)) {
	
?>
<div class="left" style="position:relative;width: <?php echo $width;?>px;*width:<?php echo ($width-3);?>px; height: <?php echo $height;?>px; ">
        <?php
	 //小图模式
		echo '<ul class="side-small">';
			$rows = array();
			if($isBoke){
				$rows = array_slice($list,0,6);
			}else{
				$rows = array_slice($list,0,8);	
			}
			$count=0;
			foreach ($rows as $row) {
				$title = $row['title'];
				$alt = preg_replace('/<span class=H>([^<]*?)<\/span>/', '$1', $title);
				$url = URL('item', array (
					'id' => $row['num_iid']
				));
				$rel = '';
				if(isset($row['click_url'])&&$row['click_url']){
					$rel = ' data-nid="'.$row['num_iid'].'" data-nick="'.$row['nick'].'" data-click="'.base64_encode($row['click_url']).'" ';	
				}else{
					$rel = ' data-nid="'.$row['num_iid'].'" data-nick="'.$row['nick'].'" ';
				}
				echo '<li '.($count==0?'style="padding-top:0px;"':'').'><div class="pic"><a class="J_TrackItem" '.$rel.' title="'.$alt.'" href="' . $url . '" target="_blank"><img src="' . XT_LAZYLOAD_PIC . '" data-original="' . base64_encode($row['pic_url'].'_40x40.jpg') . '" alt="' . $alt . '" title="' . $alt . '"></a></div><div class="desc" '.($isBoke?'style="width:200px;"':'').'><a class="J_TrackItem" '.$rel.' title="' . $alt . '" href="' . $url . '" target="_blank">' . $title . '</a></div><div class="price"><i></i>' . $row['price'] . '</div><div class="sale"><i></i>已售出<strong>' . $row['volume'] . '</strong>笔</div></li>';
				$count++;
			}
		echo '</ul>';

?>
</div>
<div class="right" style="position:relative;width: <?php echo $width;?>px;*width:<?php echo ($width-3);?>px; height: <?php echo $height;?>px; float:right">
        <?php
	 //小图模式
		echo '<ul class="side-small">';
			$rows = array();
			if($isBoke){
				$rows = array_slice($list,6,6);
			}else{
				$rows = array_slice($list,8,8);	
			}
			$count=0;
			foreach ($rows as $row) {
				$title = $row['title'];
				$alt = preg_replace('/<span class=H>([^<]*?)<\/span>/', '$1', $title);
				$url = URL('item', array (
					'id' => $row['num_iid']
				));
				$rel = '';
				if(isset($row['click_url'])&&$row['click_url']){
					$rel = ' data-nid="'.$row['num_iid'].'" data-nick="'.$row['nick'].'" data-click="'.base64_encode($row['click_url']).'" ';	
				}else{
					$rel = ' data-nid="'.$row['num_iid'].'" data-nick="'.$row['nick'].'" ';
				}
				echo '<li '.($count==0?'style="padding-top:0px;"':'').'><div class="pic"><a class="J_TrackItem" '.$rel.' title="'.$alt.'" href="' . $url . '" target="_blank"><img src="' . XT_LAZYLOAD_PIC . '" data-original="' . base64_encode($row['pic_url'].'_40x40.jpg') . '" alt="' . $alt . '" title="' . $alt . '"></a></div><div class="desc" '.($isBoke?'style="width:200px;"':'').'><a class="J_TrackItem" '.$rel.' title="' . $alt . '" href="' . $url . '" target="_blank">' . $title . '</a></div><div class="price"><i></i>' . $row['price'] . '</div><div class="sale"><i></i>已售出<strong>' . $row['volume'] . '</strong>笔</div></li>';
				$count++;
			}
		echo '</ul>';

?>
</div>
<?php }else{?>
<div class="left" style="position:relative;width: <?php echo $width;?>px;*width:<?php echo ($width-3);?>px; height: <?php echo $height;?>px; "></div>
<div class="right" style="position:relative;width: <?php echo $width;?>px;*width:<?php echo ($width-3);?>px; height: <?php echo $height;?>px; float:right;"></div>	
<?php }?>