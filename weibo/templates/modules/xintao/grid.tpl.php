<?php 
	/**
	 * 海报展现
	 * @version $Id$
	 */
	if(!defined('IN_APPLICATION')){
		exit('ACCESS DENIED!');
	}
$pic_jpg = '_170x170.jpg';
$show_size = $mod['param']['show_size'];
$layout = $mod['param']['layout'];
$row_size = 4;
if('main-bd'==$layout){//如果是560布局
	$row_size=$row_size-1;
}
if ('big' == $show_size) {
	$pic_jpg = '_b.jpg';
	$row_size = $row_size-1;
}
elseif ('small' == $show_size) {
	$pic_jpg = '_120x120.jpg';
	$row_size = $row_size+1;
}
?>

<div class="box">
	<div class="shop-display">
	    <div class="hd"><h3><?php echo F('escape', $mod['title']);?></h3></div>
	    <div class="bd">
		<?php 
		$count = 0;
		$length = count($list);
		if('poster'==$data_type){
			foreach ($list as $row) {
				if ($count % $row_size == 0) {
					echo '<div class="grid ' . $show_size . '"><ul class="shop-list">';
				}
				list($pic) = explode(',',$row['cover_urls'],1);
				$title=$row['title'];
				$url=URL('poster',array('id'=>$row['id']));
				if ($count % $row_size == ($row_size -1) || $count == $length -1) {
					echo '<li style="margin-right:0px;"><div class="item"><div class="pic"><a href="'.$url.'" title="'.$title.'"><img src="'.$pic.'" alt="'.$title.'" title="'.$title.'"/></a></div><div class="desc"><a href="'.$url.'">'.$title.'</a></div></div></li>';
					echo '</ul></div>';
				}else{
					echo '<li><div class="item"><div class="pic"><a href="'.$url.'" title="'.$title.'"><img src="'.$pic.'" alt="'.$title.'" title="'.$title.'"/></a></div><div class="desc"><a href="'.$url.'">'.$title.'</a></div></div></li>';	
				}
				$count++;
			}
		}
		?>
	    </div>
	    <?php
			TPL::module('page', array('list' => $list, 'limit' => $mod['param']['show_num']));
		?>
	</div>    
</div>
