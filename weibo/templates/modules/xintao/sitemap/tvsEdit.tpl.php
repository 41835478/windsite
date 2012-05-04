<div class="form-row">
    <label class="form-field">视频分类</label>
    <div class="form-cont">
        <select name="param[c]" data-value="<?php echo $params['c']?>">
			<?php
				$count=0;
				foreach($sotvs as $sotv){
					echo '<option value="'.$sotv['id'].'" '.($count==0?'selected':'').'>'.$sotv['title'].'</option>';
					$count++;
				}
			?>
        </select>
    </div>
</div>
<div class="form-row">
    <label class="form-field">排序方式</label>
    <div class="form-cont">
        <select name="param[o]" data-value="<?php echo $params['o']?>">
			<option value="">相关程度</option>
			<option value="5">日播放最多</option>
			<option value="7">周播放最多</option>
			<option value="1">总播放最多</option>
			<option value="3">最新发布</option>
			<option value="4">评分最高</option>
        </select>
    </div>
</div>