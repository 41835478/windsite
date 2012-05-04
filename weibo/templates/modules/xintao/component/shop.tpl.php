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
		
		 <div class="form-row">
			<label class="form-field">卖家昵称</label>
		    <div class="form-cont">
		         <input class="input-txt w200" vrel="ne=m:不能为空|sz=max:30,min:2,m:长度2-30" type="text" warntip="#nickErr" name="param[nick]" value="">
		         <span class="tips-error hidden" id="nickErr"></span>
		         <p class="form-tips">(输入一个指定的淘宝卖家昵称，如果输入错误，将无法显示)</p>
		    </div>
		</div>
		
		<div class="form-row checkbox-row">
			  <label class="form-field">显示方案</label>
			  <div class="form-cont">
			  	  <p class="input-item">
			  	  	  <label for="checkbox_isCredit">
						  <input class="r" type="checkbox" checked value="1" name="param[isCredit]"id="checkbox_isCredit">显示信用
					  </label>
					  <label for="checkbox_isVolume">
						  <input class="r" type="checkbox" checked value="1" name="param[isVolume]" id="checkbox_isVolume">显示销量
					  </label>
				  </p>
				  <p class="form-tips">(不选中则不显示)</p>
			  </div>
		</div>
		<?php
		if($component_id==106){ 
		?><div class="form-row">
		    <label class="form-field">商品排序</label>
		    <div class="form-cont">
		        <select name="param[order_by]">
					<option selected="" value="popularity:desc">人气从高到低</option>
					<option value="volume:desc">成交量从高到低</option>
		        </select>
		    </div>
		</div>
		<?php }?>
		
