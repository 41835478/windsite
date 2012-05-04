<?php
	if($shops){
		echo '<div class="floatright" style="width:340px;"><ul>';
		foreach($shops as $shop){
			echo '<li><a target="_blank" rel="nofollow" href="#" class="J_TrackShop Go" data-click="'.base64_encode($shop['click_url']).'" title="'.$shop['shop_title'].'">'.$shop['shop_title'].'</a></li>';
		}
		echo '</ul></div>';
	}
?>