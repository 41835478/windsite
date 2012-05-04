       <?php TPL :: module('xintao/component/taokeItemsEdit', array('data'=>$data,'pmId'=>$pmId,'component'=>$component,'page'=>$page,'page_id'=>$page_id));?>
		<div class="form-row">
			<label class="form-field">显示数量</label>
			<div class="form-cont">
   				<input class="input-txt w130" name="param[show_num]" type="text" vrel="bt=min:3,max:10,m:范围为3-10|int=m:只能输入数字|ne=m:不能为空" value="<?php echo $data['param']['show_num'];?>" warntip="#showNumErr">
				<span id="showNumErr" class="tips-error hidden"></span>
   				<p class="form-tips">(设置范围3至10之间)</p>
			</div>
		</div>
		<?php $show_type=$data['param']['show_type'];?>
		<div class="form-row">
			<label class="form-field">显示方案</label>
			<div class="form-cont">
   				<p class="input-item">
					  <label for="showtype_get3">
						  <input class="r" type="radio" value="text" <?php if ($show_type=='text'){ echo ' checked '; }?> name="param[show_type]" id="showtype_get3">仅文字
					  </label>
					  <label for="showtype_get2">
						  <input class="r" type="radio" value="small" <?php if ($show_type=='small'){ echo ' checked '; }?> name="param[show_type]" id="showtype_get2">小图显示
					  </label>
					  <label for="showtype_get1">
						  <input class="r" type="radio" value="big" <?php if ($show_type=='big'){ echo ' checked '; }?> name="param[show_type]" id="showtype_get1">大图显示
					  </label>
				  </p>
			</div>
		</div> 		
	    <div class="btn-area">
	        <a class="btn-general highlight" href="#" id="submitBtn"><span>确定</span></a>
	        <a class="btn-general" href="#" id="pop_cancel"><span>取消</span></a>
	    </div>
    </form>
</div>