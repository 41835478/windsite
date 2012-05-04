<?php


/**
 * TOP列表模块模板
 * 需要参数参见component_6_pls
 * @version $Id$
 */
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
?>

<div class="mod-aside top10 mod-side">
    <div class="hd"><h3><?php echo F('escape', $mod['title']);?></h3></div>
    <div class="bd">
        
        <?php


$show_type = $mod['param']['show_type'];
$count = 1;
if (!empty ($list)) {
	if ('text' == $show_type) { //文字链模式
		echo '<ul class="side-text">';
		if ('shop' == $data_type) {
			foreach ($list as $row) {
				$topic = $row['shop_title'];
?>
                     <li>
                        <div class="ranking<?php if ($count < 4):?> r-<?php echo $count;?><?php endif;?> skin-bg"><?php echo $count;?></div>
                        <a class="J_TrackShop Go" data-click="<?php echo base64_encode($row['click_url'])?>" href="#" title="<?php echo $topic;?>" target="_blank"><?php echo $topic;?></a>
                    </li>
        <?php


				$count++;
			}
		}
		elseif ('poster' == $data_type) {
			foreach ($list as $row) {
				$topic = $row['short_title'];
				$title = $row['title'];
				$url = URL('poster', array (
					'id' => $row['id']
				));
?>
					<li>
                        <div class="ranking<?php if ($count < 4):?> r-<?php echo $count;?><?php endif;?> skin-bg"><?php echo $count;?></div>
                        <a href="<?php echo $url;?>" title="<?php echo $title;?>" target="_blank"><?php echo $topic;?></a>
                    </li>
		<?php


				$count++;
			}
		}
		elseif ('item' == $data_type) {
			foreach ($list as $row) {
				$topic = $row['title'];
				$title = $row['title'];
				$url = URL('item', array (
					'id' => $row['num_iid']
				));
				$rel = '';
				if(isset($row['click_url'])&&$row['click_url']){
					$rel = ' data-nid="'.$row['num_iid'].'" data-nick="'.$row['nick'].'" data-click="'.base64_encode($row['click_url']).'" ';	
				}else{
					$rel = ' data-nid="'.$row['num_iid'].'" data-nick="'.$row['nick'].'" ';
				}
?>
					<li>
                        <div class="ranking<?php if ($count < 4):?> r-<?php echo $count;?><?php endif;?> skin-bg"><?php echo $count;?></div>
                        <a class="J_TrackItem" <?php echo $rel?> href="<?php echo $url;?>" title="<?php echo $title;?>" target="_blank"><?php echo $topic;?></a>
                    </li>
		<?php


				$count++;
			}
		}
		echo '</ul>';
	}
	elseif ('big' == $show_type) { //大图模式
		echo '<ul class="side-big">';
		if ('shop' == $data_type) {
			foreach ($list as $row) {

			}
		}
		elseif ('poster' == $data_type) {
			foreach ($list as $row) {
			}
		}
		elseif ('item' == $data_type) {
			foreach ($list as $row) {
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
				echo '<li class="item"><div class="pic"><a class="J_TrackItem" title="' . $alt . '" '.$rel.' href="' . $url . '" target="_blank"><img src="' . XT_LAZYLOAD_PIC . '" data-original="' . base64_encode($row['pic_url'].'_160x160.jpg') . '" alt="' . $alt . '" title="' . $alt . '"></a></div><div class="price"><strong>' . $row['price'] . '</strong></div><div class="title"><a class="J_TrackItem" '.$rel.' title="' . $alt . '" href="' . $url . '" target="_blank">' . $title . '</a></div><div class="transaction">最近成交' . $row['volume'] . '笔</div></li>';
			}

		}
		echo '</ul>';
	}
	elseif ('small' == $show_type) { //小图模式
		echo '<ul class="side-small">';
		if ('shop' == $data_type) {
			foreach ($list as $row) {

			}
		}
		elseif ('poster' == $data_type) {
			foreach ($list as $row) {
			}
		}
		elseif ('item' == $data_type) {
			foreach ($list as $row) {
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
				echo '<li><div class="pic"><a class="J_TrackItem" '.$rel.' title="'.$alt.'" href="' . $url . '" target="_blank"><img src="' . XT_LAZYLOAD_PIC . '" data-original="' . base64_encode($row['pic_url'].'_40x40.jpg') . '" alt="' . $alt . '" title="' . $alt . '"></a></div><div class="desc"><a class="J_TrackItem" '.$rel.' title="' . $alt . '" href="' . $url . '" target="_blank">' . $title . '</a></div><div class="price"><i></i>' . $row['price'] . '</div><div class="sale"><i></i>已售出<strong>' . $row['volume'] . '</strong>笔</div></li>';
			}
		}
		echo '</ul>';
	}
}
?>
        
    </div>
</div>
