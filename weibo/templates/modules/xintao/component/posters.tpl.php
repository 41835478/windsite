<div class="form-box">	
<form id="addForm" action="<?php echo URL('mgr/page_manager.doCreateComponent');?>" method="post"  name="changes-newlink">
	<input type="hidden" name="page_id" value="<?php echo $page_id; ?>">
	<input type="hidden" name="data[component_id]" value="<?php echo $component_id; ?>">
	<div id="componentPropertyDiv">
		<div class="form-row">
			<label class="form-field">标题</label>
		    <div class="form-cont">
		         <input class="input-txt w130" type="text" vrel="ne=m:不能为空|sz=max:40,min:4,m:范围2-20个汉字,ww" warntip="#titleErr" name="data[title]" value="">
		         <span class="tips-error hidden" id="titleErr"></span>
		    </div>
		</div>
		<div class="form-row source">
			<label class="form-field">关键词</label>
		    <div class="form-cont">
		         <input class="input-txt w130" type="text" warntip="#keywordErr" name="param[key_word]" value="">
		         <span class="tips-error hidden" id="keywordErr"></span>
		         <p class="form-tips">(搜索画报的关键词，频道，必选一)</p>
		    </div>
		</div>
		<?php $cats = F('top.posterChannelsGet');?>
		<div class="form-row source">
		    <label class="form-field">画报频道</label>
		    <div class="form-cont">
		        <select name="param[channel_ids]">
					<option selected="" value="">请选择分类</option>
					<?php if(!empty($cats)){foreach($cats as $cat){echo '<option value="'.$cat['id'].'">'.$cat['channel_name'].'</option>';}}?>
		         </select>
		         <p class="form-tips">(搜索画报的关键词，频道，必选一)</p>
		    </div>
		</div>