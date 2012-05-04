				<?php TPL :: module('xintao/component/posters', array('component_id'=>$component_id,'page_id'=>$page_id));?>
		<div class="form-row">
			  <label class="form-field">图片大小</label>
			  <div class="form-cont">
			  	  <p class="input-item">
					  <label for="showsize_get1">
						  <input class="r" type="radio" value="big" name="param[show_size]" id="showsize_get1">大图(220X220)
					  </label>
					  <label for="showsize_get2">
						  <input class="r" type="radio" value="" checked="checked" name="param[show_size]" id="showsize_get2">中图(160X160)
					  </label>
					  <label for="showsize_get3">
						  <input class="r" type="radio" value="small" name="param[show_size]" id="showsize_get3">小图(120X120)
					  </label>
				  </p>
			  </div>
        </div>		
        <div class="btn-area">
            <a class="btn-general highlight" href="#" id="submitBtn"><span>确定</span></a>
            <a class="btn-general" href="#" id="pop_cancel"><span>取消</span></a>
        </div>
   </div>
</form>
</div>		