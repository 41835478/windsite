<div class="form-box">	
    <form name="config" id="form1" action="<?php echo URL('mgr/page_manager.doEditComponent', array('page_id'=>$page_id));?>" method="post">
        <input type="hidden" name="pmId" value="<?php echo $pmId ?>" />
        <div class="form-row">
            <label class="form-field">标题</label>
            <div class="form-cont">
                <input class="input-txt w130" type="text" vrel="ne=m:不能为空|sz=max:40,min:4,m:范围2-20个汉字,ww" warntip="#titleErr" name="data[title]" value="<?php echo V('r:title', F('escape', $data['title'])); ?>"/>
                <span class="tips-error hidden" id="titleErr"></span>
            </div>
        </div>
        <?php $params=$data['param'];$source1=$params['source']==1?true:false;?>
        <div class="form-row">
			  <label class="form-field">数据来源</label>
			  <div class="form-cont">
			  	  <p class="input-item">
					  <label for="source_get1">
						  <input class="r" type="radio" value="1" <?php if ($source1){ echo ' checked '; }?>  name="param[source]" onclick="javascript:$('#form1 .source').addClass('hidden');$('#form1 .source1').removeClass('hidden');" id="source_get1">自动搜索
					  </label>
					  <label for="source_get2">
						  <input class="r" type="radio" value="2" <?php if (!$source1){ echo ' checked '; }?> name="param[source]" onclick="javascript:$('#form1 .source').addClass('hidden');$('#form1 .source2').removeClass('hidden');" id="source_get2">卖家昵称
					  </label>
				  </p>
			  </div>
        </div>
        <div class="form-row source source2<?php if ($source1){ echo ' hidden'; }?>">
        	<label class="form-field">卖家昵称</label>
            <div class="form-cont">
                 <input class="input-txt w200 seller-nicks" vrel="ne=m:不能为空|sz=max:150,min:2,m:长度2-150|nicks=m:英文逗号隔开，最多5个" type="text" warntip="#nicksErr" name="param[nicks]" value="<?php echo $params['nicks'];?>">
                 <span class="tips-error hidden" id="nicksErr"></span>
                 <p class="form-tips">(淘宝卖家昵称，多个之间“,”分隔；最多支持5个卖家昵称)</p>
            </div>
		</div>
		<div class="form-row">
        	<label class="form-field">关键词</label>
            <div class="form-cont">
                 <input class="input-txt w130" type="text" warntip="#qErr" name="param[q]" value="<?php echo $params['q'];?>">
                 <span class="tips-error hidden" id="qErr"></span>
                 <p class="form-tips">(搜索商品的关键词，关键词，商品分类，卖家昵称必选一)</p>
            </div>
		</div>
		<div class="form-row source source1<?php if (!$source1){ echo ' hidden'; }?>">
            <label class="form-field">商品分类</label>
            <div class="form-cont">
                <select name="param[cid]" data-value="<?php echo $params['cid'];?>">
					<option selected="" value="">请选择分类</option>
					<?php $cats = F('top.getRootCat');if(!empty($cats)){foreach($cats as $cat){echo '<option value="'.$cat['cid'].'">'.$cat['name'].'</option>';}}?>
                 </select>
                 <p class="form-tips">(搜索商品的类别，关键词，商品分类，卖家昵称必选一)</p>
            </div>
		</div>
		<div class="form-row source source1<?php if (!$source1){ echo ' hidden'; }?>">
            <label class="form-field">掌柜信用</label>
            <div class="form-cont">从
                <select name="param[start_score]" data-value="<?php echo $params['start_score'];?>">
                    <option value="20">五黄冠</option>
					<option value="19">四黄冠</option>
					<option value="18">三黄冠</option>
					<option value="17">二黄冠</option>
					<option value="16">一黄冠</option>
					<option value="15">五冠</option>
					<option value="14">四冠</option>
					<option value="13">三冠</option>
					<option value="12">二冠</option>
					<option value="11" selected>一冠</option>
					<option value="10">五钻</option>
					<option value="9">四钻</option>
					<option value="8">三钻</option>
					<option value="7">二钻</option>
					<option value="6">一钻</option>
					<option value="5">五心</option>
					<option value="4">四心</option>
					<option value="3">三心</option>
					<option value="2">两心</option>
					<option value="1">一心</option>
                 </select>到
                 <select name="param[end_score]" data-value="<?php echo $params['end_score'];?>">
                    <option value="20" selected>五黄冠</option>
					<option value="19">四黄冠</option>
					<option value="18">三黄冠</option>
					<option value="17">二黄冠</option>
					<option value="16">一黄冠</option>
					<option value="15">五冠</option>
					<option value="14">四冠</option>
					<option value="13">三冠</option>
					<option value="12">二冠</option>
					<option value="11">一冠</option>
					<option value="10">五钻</option>
					<option value="9">四钻</option>
					<option value="8">三钻</option>
					<option value="7">二钻</option>
					<option value="6">一钻</option>
					<option value="5">五心</option>
					<option value="4">四心</option>
					<option value="3">三心</option>
					<option value="2">两心</option>
					<option value="1">一心</option>
                 </select>
            </div>
		</div>
		<div class="form-row source source1<?php if (!$source1){ echo ' hidden'; }?>">
            <label class="form-field">价格范围</label>
            <div class="form-cont">
   				<p class="input-item">
	   				从<input class="input-txt w30" type="text" name="param[start_price]" vrel="bt=min:0,max:1000000,m:范围为0-1000000|int=m:只能输入数字" warntip="#priceErr" value="<?php echo $params['start_price'];?>">元&nbsp;&nbsp;
	   				到<input class="input-txt w30" type="text" name="param[end_price]" vrel="bt=min:0,max:1000000,m:范围为0-1000000|int=m:只能输入数字" warntip="#priceErr" value="<?php echo $params['end_price'];?>">元
	   				<span id="priceErr" class="tips-error hidden"></span>
   				</p>
			</div>
		</div>
		<div class="form-row source checkbox-row source1<?php if (!$source1){ echo ' hidden'; }?>">
			  <label class="form-field">常用</label>
			  <div class="form-cont">
			  	  <p class="input-item">
			  	  	  <label for="checkbox_post_free">
						  <input class="r" type="checkbox" <?php if ($params['post_free']){ echo ' checked value="1" '; }else{echo 'value=""';}?> name="param[post_free]"id="checkbox_post_free">卖家包邮
					  </label>
					  <label for="checkbox_is_cod">
						  <input class="r" type="checkbox" <?php if ($params['is_cod']){ echo ' checked value="1" '; }else{echo 'value=""';}?> name="param[is_cod]" id="checkbox_is_cod">货到付款
					  </label>
					  <label for="checkbox_is_mall">
						  <input class="r" type="checkbox" <?php if ($params['is_mall']){ echo ' checked value="1" '; }else{echo 'value=""';}?> name="param[is_mall]"id="checkbox_is_mall">商城商品
					  </label>
				  </p>
				  <p class="input-item">
				  	  <label for="checkbox_genuine_security">
						  <input class="r" type="checkbox" <?php if ($params['genuine_security']){ echo ' checked value="1" '; }else{echo 'value=""';}?> name="param[genuine_security]" id="checkbox_genuine_security">正品保障
					  </label>
					  <label for="checkbox_is_prepay">
						  <input class="r" type="checkbox" <?php if ($params['is_prepay']){ echo ' checked value="1" '; }else{echo 'value=""';}?> name="param[is_prepay]" id="checkbox_is_prepay">如实描述(即:先行赔付)
					  </label>
				  </p>
				  <p class="form-tips">(不选中则不判断当前过滤条件)</p>
			  </div>
        </div>
		<div class="form-row">
            <label class="form-field">排序方式</label>
            <div class="form-cont">
                <select name="param[order_by]" data-value="<?php echo $params['order_by'];?>">
					<option selected="" value="popularity:desc">人气值从高到低</option>
					<option value="volume:desc">成交量从高到低</option>
					<option value="seller_credit:desc">信用等级从高到低</option>
					<option value="price:asc">价格从低到高</option>
                </select>
            </div>
		</div>
		<div class="form-row">
			  <label class="form-field">图片大小</label>
			  <div class="form-cont">
			  	  <p class="input-item">
					  <label for="showsize_get1">
						  <input class="r" type="radio" <?php if ($params['show_size']=='big'){ echo ' checked '; }?> value="big" name="param[show_size]" id="showsize_get1">大图(220X220)
					  </label>
					  <label for="showsize_get2">
						  <input class="r" type="radio" <?php if ($params['show_size']==''){ echo ' checked '; }?> value="" name="param[show_size]" id="showsize_get2">中图(160X160)
					  </label>
					  <label for="showsize_get3">
						  <input class="r" type="radio" <?php if ($params['show_size']=='small'){ echo ' checked '; }?> value="small" name="param[show_size]" id="showsize_get3">小图(120X120)
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