<div class="tshop-psm tb-box" id="J_Detail">
	<div id="reviews" class="J_DetailSection" >
		<div class="tb-revbd">
			<ul class="tb-r-comments">
				<?php
	if ($rates) {
		foreach ($rates as $rate) {
	?>
				<li class="tb-r-comment ">
					<div class="tb-r-buyer"><div class="tb-r-nick"><?php echo $rate['nick']?></div></div>
					<div class="tb-r-bd"><div class="tb-r-body"><div class="tb-r-cnt"><?php echo $rate['content']?></div></div></div>
				</li>
						<?php }}?>
			</ul>
		</div>
	</div>
</div>