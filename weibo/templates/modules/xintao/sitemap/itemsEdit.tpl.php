<div class="form-row source">
	<label class="form-field">关键词</label>
    <div class="form-cont">
         <input class="input-txt w130" type="text" warntip="#keywordErr" name="param[keyword]" value="<?php echo $params['keyword'];?>">
         <span class="tips-error hidden" id="keywordErr"></span>
         <p class="form-tips">(搜索商品的关键词，关键词，商品分类必选一)</p>
    </div>
</div>
<div class="form-row source">
    <label class="form-field">商品分类</label>
    <div class="form-cont">
        <select name="param[cid]" data-value="<?php echo $params['cid'];?>">
			<option selected="" value="">请选择分类</option>
			<?php if(!empty($cats)){foreach($cats as $cat){echo '<option value="'.$cat['cid'].'">'.$cat['name'].'</option>';}}?>
         </select>
         <p class="form-tips">(搜索商品的类别，关键词，商品分类必选一)</p>
    </div>
</div>
<div class="form-row source">
    <label class="form-field">掌柜信用</label>
    <div class="form-cont">从
        <select name="param[start_credit]" data-value="<?php echo $params['start_credit'];?>">
            <option value="5goldencrown" score="20">五黄冠</option>
			<option value="4goldencrown" score="19">四黄冠</option>
			<option value="3goldencrown" score="18">三黄冠</option>
			<option value="2goldencrown" score="17">二黄冠</option>
			<option value="1goldencrown" score="16">一黄冠</option>
			<option value="5crown" score="15">五冠</option>
			<option value="4crown" score="14">四冠</option>
			<option value="3crown" score="13">三冠</option>
			<option value="2crown" score="12">二冠</option>
			<option value="1crown" score="11" selected>一冠</option>
			<option value="5diamond" score="10">五钻</option>
			<option value="4diamond" score="9">四钻</option>
			<option value="3diamond" score="8">三钻</option>
			<option value="2diamond" score="7">二钻</option>
			<option value="1diamond" score="6">一钻</option>
			<option value="5heart" score="5">五心</option>
			<option value="4heart" score="4">四心</option>
			<option value="3heart" score="3">三心</option>
			<option value="2heart" score="2">两心</option>
			<option value="1heart" score="1">一心</option>
         </select>到
         <select name="param[end_credit]" data-value="<?php echo $params['end_credit'];?>">
            <option value="5goldencrown" score="20" selected>五黄冠</option>
			<option value="4goldencrown" score="19">四黄冠</option>
			<option value="3goldencrown" score="18">三黄冠</option>
			<option value="2goldencrown" score="17">二黄冠</option>
			<option value="1goldencrown" score="16">一黄冠</option>
			<option value="5crown" score="15">五冠</option>
			<option value="4crown" score="14">四冠</option>
			<option value="3crown" score="13">三冠</option>
			<option value="2crown" score="12">二冠</option>
			<option value="1crown" score="11">一冠</option>
			<option value="5diamond" score="10">五钻</option>
			<option value="4diamond" score="9">四钻</option>
			<option value="3diamond" score="8">三钻</option>
			<option value="2diamond" score="7">二钻</option>
			<option value="1diamond" score="6">一钻</option>
			<option value="5heart" score="5">五心</option>
			<option value="4heart" score="4">四心</option>
			<option value="3heart" score="3">三心</option>
			<option value="2heart" score="2">两心</option>
			<option value="1heart" score="1">一心</option>
         </select>
    </div>
</div>
<div class="form-row source">
    <label class="form-field">佣金比例</label>
    <div class="form-cont">
		<p class="input-item">
			从<input class="input-txt w30" type="text" name="param[start_commissionRate]" vrel="bt=min:0,max:50,m:范围为0-50|int=m:只能输入数字" warntip="#commissionrateErr" value="<?php echo $params['start_commissionRate'];?>">%&nbsp;&nbsp;
			到<input class="input-txt w30" type="text" name="param[end_commissionRate]" vrel="bt=min:0,max:50,m:范围为0-50|int=m:只能输入数字" warntip="#commissionrateErr" value="<?php echo $params['end_commissionRate'];?>">%
			<span id="commissionrateErr" class="tips-error hidden"></span>
		</p>
		<p class="form-tips">(设置范围0至50之间)</p>
	</div>
</div>
<div class="form-row source">
    <label class="form-field">价格范围</label>
    <div class="form-cont">
		<p class="input-item">
			从<input class="input-txt w30" type="text" name="param[start_price]" vrel="bt=min:0,max:1000000,m:范围为0-1000000|int=m:只能输入数字" warntip="#priceErr" value="<?php echo $params['start_price'];?>">元&nbsp;&nbsp;
			到<input class="input-txt w30" type="text" name="param[end_price]" vrel="bt=min:0,max:1000000,m:范围为0-1000000|int=m:只能输入数字" warntip="#priceErr" value="<?php echo $params['end_price'];?>">元
			<span id="priceErr" class="tips-error hidden"></span>
		</p>
	</div>
</div>
<div class="form-row source checkbox-row">
	  <label class="form-field">常用</label>
	  <div class="form-cont">
	  	  <p class="input-item">
	  	  	  <label for="checkbox_cash_ondelivery">
				  <input class="r" type="checkbox" <?php if ($params['cash_ondelivery']){ echo ' checked value="true" '; }else{echo 'value=""';}?> name="param[cash_ondelivery]" id="checkbox_cash_ondelivery">货到付款
			  </label>
			  <label for="checkbox_mall_item">
				  <input class="r" type="checkbox" <?php if ($params['mall_item']){ echo ' checked value="true" '; }else{echo 'value=""';}?> name="param[mall_item]" id="checkbox_mall_item">商城商品
			  </label>
			  <label for="checkbox_sevendays_return">
				  <input class="r" type="checkbox" <?php if ($params['sevendays_return']){ echo ' checked value="true" '; }else{echo 'value=""';}?> name="param[sevendays_return]" id="checkbox_sevendays_return">7天退换
			  </label>
		  </p>
		  <p class="input-item">
		  	  <label for="checkbox_guarantee">
				  <input class="r" type="checkbox" <?php if ($params['guarantee']){ echo ' checked value="true" '; }else{echo 'value=""';}?> name="param[guarantee]" id="checkbox_guarantee">消保卖家
			  </label>
			  <label for="checkbox_onemonth_repair">
				  <input class="r" type="checkbox" <?php if ($params['onemonth_repair']){ echo ' checked value="true" '; }else{echo 'value=""';}?> name="param[onemonth_repair]" id="checkbox_onemonth_repair">30天维修
			  </label>
			  <label for="checkbox_real_describe">
				  <input class="r" type="checkbox" <?php if ($params['real_describe']){ echo ' checked value="true" '; }else{echo 'value=""';}?> name="param[real_describe]" id="checkbox_real_describe">如实描述(即:先行赔付)
			  </label>
		  </p>
		  <p class="form-tips">(不选中则不判断当前过滤条件)</p>
	  </div>
</div>
<div class="form-row source">
    <label class="form-field">排序方式</label>
    <div class="form-cont">
        <select name="param[sort]" data-value="<?php echo $params['sort'];?>">
			<option selected="" value="default">默认</option>
			<option value="commissionNum_desc">成交量从高到低</option>
			<option value="credit_desc">信用等级从高到低</option>
			<option value="commissionRate_desc">佣金比率从高到低</option>
			<option value="price_asc">价格从低到高</option>
			<option value="commissionVolume_desc">总支出佣金从高到低</option>
        </select>
    </div>
</div>
