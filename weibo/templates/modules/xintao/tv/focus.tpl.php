<div id="mFocus1" class="fi_movie area">
	<div class="fi_ct">
		<?php $count=0;foreach($videos as $row){?>
		<a href="/video/vid-<?php echo $row['vid']?>" >
			<img class="fi_player" height="368" width="950" <?php echo $count==0?'src':'data-ks-lazyload-custom'?>="<?php echo $row['p']?>">
		</a>
		<?php $count++;}?>
	</div>
	<div class="fi_tab">
		<!--<div class="fi_btn fi_prev"><a href="javascript:void(0)"></a></div>-->
		<div class="fi_tab_inner" style="width: 564px; height: 49px;">
			<ul style="width: 940px;" class="fi_tab_ clear items">
				<?php foreach($videos as $row){?>
				<li>
					<a  rel="nofollow" href="/video/vid-<?php echo $row['vid']?>">
						<img height="45" width="80" src="<?php echo $row['p1']?>">
						<div class="fi_ovl_tab" style="opacity: 0.3; display: none;"></div>
					</a>
				</li>
				<?php }?>
			</ul>
			<div class="fi_pointer" style="display: block; left: 5px;"></div>
		</div>
		<!--<div class="fi_btn fi_next"><a href="javascript:void(0)"></a></div>-->
	</div>
	<?php $count=0;foreach($videos as $row){?>
	<div class="fi_note<?php echo $count==0?'':' hidden'?>" data-vid="<?php echo $row['vid']?>">
		<div class="fi_jb"></div>
		<h2 class="fi_tt"><a  href="/video/vid-<?php echo $row['vid']?>"><?php echo $row['t']?></a></h2>
		<h3 class="fi_tt0"><a  rel="nofollow" href="/video/vid-<?php echo $row['vid']?>"><?php echo $row['t_']?></a></h3>
		<div class="fi_meta">
			<div class="fi_mtype"><label>类型：</label>
				<p><?php if(isset($row['mtype'])&&!empty($row['mtype'])){foreach($row['mtype'] as $mtype){echo '<a>'.$mtype['t'].'</a>';}}?></p>
			</div>
			<div class="fi_mdirector"><label><?php echo $type=='zongyi'?'主持人':'导演'?>：</label>
				<p><?php if(isset($row['mdirector'])&&!empty($row['mdirector'])){foreach($row['mdirector'] as $mtype){echo '<a>'.$mtype['t'].'</a>';}}?></p>
			</div>
			<div class="fi_mactor"><label><?php echo $type=='zongyi'?'时间':($type=='comic'?'产地':'主演')?>：</label>
				<p><?php if(isset($row['mactor'])&&!empty($row['mactor'])){foreach($row['mactor'] as $mtype){echo '<a>'.$mtype['t'].'</a>';}}?></p>
			</div>
			<div class="fi_mdesc">
				<?php echo $row['t1']?>
				<div></div>
			</div>
		</div>
	</div>
	<?php $count++;}?>	
	<div class="fi_acts"><a class="fi_btnplay"  rel="nofollow" href="<?php if(!empty($videos)){echo '/video/vid-'.$videos[0]['vid'];}else{echo '#';}?>"><span></span></a></div>
	<div class="fi_ovl_note" style="opacity: 0.5;"></div>
</div>