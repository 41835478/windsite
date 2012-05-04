<div class="form-row source">
	<label class="form-field">关键词</label>
    <div class="form-cont">
         <input class="input-txt w130" type="text" warntip="#keywordErr" name="param[key_word]" value="">
         <span class="tips-error hidden" id="keywordErr"></span>
         <p class="form-tips">(搜索画报的关键词，频道，必选一)</p>
    </div>
</div>
<div class="form-row source">
    <label class="form-field">画报频道</label>
    <div class="form-cont">
        <select name="param[channel_ids]">
			<option selected="" value="">请选择分类</option>
			<?php if(!empty($posterCats)){foreach($posterCats as $cat){echo '<option value="'.$cat['id'].'">'.$cat['channel_name'].'</option>';}}?>
         </select>
         <p class="form-tips">(搜索画报的关键词，频道，必选一)</p>
    </div>
</div>
<div class="form-row source">
    <label class="form-field">排序方式</label>
    <div class="form-cont">
        <select name="param[sort_type]">
			<option selected="" value="4">最新</option>
			<option value="2">点击从高到低</option>
        </select>
    </div>
</div>