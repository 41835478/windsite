<div class="form-box">	
    <form name="config" id="addForm" action="<?php echo URL('mgr/page_manager.doEditComponent', array('page_id'=>$page_id));?>" method="post">
		<input type="hidden" name="pmId" value="<?php echo $pmId ?>" />
		<?php $params = $data['param'];?>
		<div class="form-row">
			<label class="form-field">标题</label>
		    <div class="form-cont">
		         <input class="input-txt w130" type="text" vrel="ne=m:不能为空|sz=max:40,min:4,m:范围2-20个汉字,ww" warntip="#titleErr" name="data[title]" value="<?php echo V('r:title', F('escape', $data['title'])); ?>">
		         <span class="tips-error hidden" id="titleErr"></span>
		    </div>
		</div>
		<div class="form-row">
		    <label class="form-field">视频分类</label>
		    <div class="form-cont">
		        <select name="param[c]" data-value="<?php echo $params['c']?>">
					<?php
						$sotvs = V('-:sotv');
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