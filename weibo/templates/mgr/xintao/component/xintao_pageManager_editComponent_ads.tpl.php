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
        <?php $params = $data['param'];?>
		<div class="form-row">
			  <label class="form-field">广告方式</label>
			  <div class="form-cont">
			  	   <select data-value="<?php echo $params['source'];?>" class="w200" name="param[source]" onchange="javascript:$('#form1 .source').addClass('hidden');$('#form1 .source'+$(this).val()).removeClass('hidden');" >
                    <option value="0">淘宝联盟(阿里妈妈)</option>
					<option value="1">Google Adsense</option>
					<option value="2">百度联盟</option>
					<option value="3">Flash广告牌</option>
					<option value="4">图片</option>
					<option value="5">文本</option>
                 </select>
			  </div>
        </div>
 		<div class="form-row source source0">
        	<label class="form-field" style="width:120px;">alimama_pid</label>
            <div class="form-cont">
                 <input class="input-txt w130" type="text" vrel="ne=m:不能为空|pid=m:PID格式不正确" warntip="#pidErr" name="param[pid]" value="<?php echo $params['pid'];?>">
                 <span class="tips-error hidden" id="pidErr"></span>
            </div>
		</div>
		<div class="form-row source source0">
        	<label class="form-field" style="width:120px;">alimama_sizecode</label>
            <div class="form-cont">
                 <input class="input-txt w130" type="text" vrel="bt=min:0,max:50,m:范围为0-50|ne=m:不能为空|int=m:只能输入数字" warntip="#sizecodeErr" name="param[sizecode]" value="<?php echo $params['sizecode'];?>">
                 <span class="tips-error hidden" id="sizecodeErr"></span>
            </div>
		</div>
		<div class="form-row source source0">
        	<label class="form-field" style="width:120px;">alimama_width</label>
            <div class="form-cont">
                 <input class="input-txt w130" type="text" vrel="ne=m:不能为空|int=m:只能输入数字" warntip="#widthErr" name="param[width]" value="<?php echo $params['width'];?>">
                 <span class="tips-error hidden" id="widthErr"></span>
            </div>
		</div>
		<div class="form-row source source0">
        	<label class="form-field" style="width:120px;">alimama_height</label>
            <div class="form-cont">
                 <input class="input-txt w130" type="text" vrel="ne=m:不能为空|int=m:只能输入数字" warntip="#heightErr" name="param[height]" value="<?php echo $params['height'];?>">
                 <span class="tips-error hidden" id="heightErr"></span>
            </div>
		</div>
		<div class="form-row source source0">
        	<label class="form-field" style="width:120px;">alimama_type</label>
            <div class="form-cont">
                 <input class="input-txt w130" type="text" vrel="ne=m:不能为空|bt=min:0,max:10,m:范围为0-10|int=m:只能输入数字" warntip="#typeErr" name="param[type]" value="<?php echo $params['type'];?>">
                 <span class="tips-error hidden" id="typeErr"></span>
            </div>
		</div>
		<div class="form-row source source0">
        	<label class="form-field" style="width:120px;">alimama_titlecolor</label>
            <div class="form-cont">
                 <input class="input-txt w130" type="text" vrel="ne=m:不能为空|sz=max:6,min:6,m:颜色代码长度为6" warntip="#titlecolorErr" name="param[titlecolor]" value="<?php echo $params['titlecolor'];?>">
                 <span class="tips-error hidden" id="titlecolorErr"></span>
            </div>
		</div>
		<div class="form-row source source0">
        	<label class="form-field" style="width:120px;">alimama_descolor</label>
            <div class="form-cont">
                 <input class="input-txt w130" type="text" vrel="ne=m:不能为空|sz=max:6,min:6,m:颜色代码长度为6" warntip="#descolorErr" name="param[descolor]" value="<?php echo $params['descolor'];?>">
                 <span class="tips-error hidden" id="descolorErr"></span>
            </div>
		</div>
		<div class="form-row source source0">
        	<label class="form-field" style="width:120px;">alimama_bgcolor</label>
            <div class="form-cont">
                 <input class="input-txt w130" type="text" vrel="ne=m:不能为空|sz=max:6,min:6,m:颜色代码长度为6" warntip="#bgcolorErr" name="param[bgcolor]" value="<?php echo $params['bgcolor'];?>">
                 <span class="tips-error hidden" id="bgcolorErr"></span>
            </div>
		</div>
		<div class="form-row source source0">
        	<label class="form-field" style="width:120px;">alimama_bordercolor</label>
            <div class="form-cont">
                 <input class="input-txt w130" type="text" vrel="ne=m:不能为空|sz=max:6,min:6,m:颜色代码长度为6" warntip="#bordercolorErr" name="param[bordercolor]" value="<?php echo $params['bordercolor'];?>">
                 <span class="tips-error hidden" id="bordercolorErr"></span>
            </div>
		</div>
		<div class="form-row source source0">
        	<label class="form-field" style="width:120px;">alimama_linkcolor</label>
            <div class="form-cont">
                 <input class="input-txt w130" type="text" vrel="ne=m:不能为空|sz=max:6,min:6,m:颜色代码长度为6" warntip="#linkcolorErr" name="param[linkcolor]" value="<?php echo $params['linkcolor'];?>">
                 <span class="tips-error hidden" id="linkcolorErr"></span>
            </div>
		</div>
		<div class="form-row source source0">
        	<label class="form-field" style="width:120px;">alimama_bottomcolor</label>
            <div class="form-cont">
                 <input class="input-txt w130" type="text" vrel="ne=m:不能为空|sz=max:6,min:6,m:颜色代码长度为6" warntip="#bottomcolorErr" name="param[bottomcolor]" value="<?php echo $params['bottomcolor'];?>">
                 <span class="tips-error hidden" id="bottomcolorErr"></span>
            </div>
		</div>
		<div class="form-row source source0">
        	<label class="form-field" style="width:120px;">alimama_anglesize</label>
            <div class="form-cont">
                 <input class="input-txt w130" type="text" vrel="ne=m:不能为空|int=m:只能输入数字|bt=min:0,max:10,m:范围为0-10" warntip="#anglesizeErr" name="param[anglesize]" value="<?php echo $params['anglesize'];?>">
                 <span class="tips-error hidden" id="anglesizeErr"></span>
            </div>
		</div>
		<div class="form-row source source0">
        	<label class="form-field" style="width:120px;">alimama_bgpic</label>
            <div class="form-cont">
                 <input class="input-txt w130" type="text" vrel="ne=m:不能为空|int=m:只能输入数字|bt=min:0,max:20,m:范围为0-20" warntip="#bgpicErr" name="param[bgpic]" value="<?php echo $params['bgpic'];?>">
                 <span class="tips-error hidden" id="bgpicErr"></span>
            </div>
		</div>
		<div class="form-row source source0">
        	<label class="form-field" style="width:120px;">alimama_icon</label>
            <div class="form-cont">
                 <input class="input-txt w130" type="text" vrel="ne=m:不能为空|int=m:只能输入数字|bt=min:0,max:10,m:范围为0-10" warntip="#iconErr" name="param[icon]" value="<?php echo $params['icon'];?>">
                 <span class="tips-error hidden" id="iconErr"></span>
            </div>
		</div>
        <div class="form-row source source1 hidden">
        	<label class="form-field" style="width:120px;">google_ad_client</label>
            <div class="form-cont">
                 <input class="input-txt w130" type="text" vrel="ne=m:不能为空|sz=max:40,min:10,m:长度10-40之间" warntip="#adClientErr" name="param[ad_client]" value="<?php echo $params['ad_client'];?>">
                 <span class="tips-error hidden" id="adClientErr"></span>
            </div>
		</div>
		<div class="form-row source source1 hidden">
        	<label class="form-field" style="width:120px;">google_ad_slot</label>
            <div class="form-cont">
                 <input class="input-txt w130" type="text" vrel="ne=m:不能为空|int=m:只能输入数字" warntip="#adSlotErr" name="param[ad_slot]" value="<?php echo $params['ad_slot'];?>">
                 <span class="tips-error hidden" id="adSlotErr"></span>
            </div>
		</div>
		<div class="form-row source source1 hidden">
        	<label class="form-field" style="width:120px;">google_ad_width</label>
            <div class="form-cont">
                 <input class="input-txt w130" type="text" vrel="ne=m:不能为空|int=m:只能输入数字" warntip="#adWidthErr" name="param[ad_width]" value="<?php echo $params['ad_width'];?>">
                 <span class="tips-error hidden" id="adWidthErr"></span>
            </div>
		</div>
		<div class="form-row source source1 hidden">
        	<label class="form-field" style="width:120px;">google_ad_height</label>
            <div class="form-cont">
                 <input class="input-txt w130" type="text" vrel="ne=m:不能为空|int=m:只能输入数字" warntip="#adHeightErr" name="param[ad_height]" value="<?php echo $params['ad_height'];?>">
                 <span class="tips-error hidden" id="adHeightErr"></span>
            </div>
		</div>
        <div class="form-row source source2 hidden">
        	<label class="form-field">cpro_id</label>
            <div class="form-cont">
                 <input class="input-txt w130" type="text" vrel="ne=m:不能为空|sz=max:10,min:4,m:长度4-12之间" warntip="#cproIdErr" name="param[cpro_id]" value="<?php echo $params['cpro_id'];?>">
                 <span class="tips-error hidden" id="cproIdErr"></span>
            </div>
		</div>
		<div class="form-row source source3 hidden">
        	<label class="form-field">Flash地址</label>
            <div class="form-cont">
                 <input class="input-txt w200" type="text" vrel="ne=m:不能为空|url=m:URL地址格式不正确" warntip="#flashUrlErr" name="param[flash-url]" value="<?php echo $params['flash-url'];?>">
                 <span class="tips-error hidden" id="flashUrlErr"></span>
            </div>
		</div>
		<div class="form-row source source3 hidden">
        	<label class="form-field">Flash宽度</label>
            <div class="form-cont">
                 <input class="input-txt w50" type="text" vrel="ne=m:不能为空|int=m:只能输入数字" warntip="#flashWidthErr" name="param[flash-width]" value="<?php echo $params['flash-width'];?>">px
                 <span class="tips-error hidden" id="flashWidthErr"></span>
            </div>
		</div>
		<div class="form-row source source3 hidden">
        	<label class="form-field">Flash高度</label>
            <div class="form-cont">
                 <input class="input-txt w50" type="text" vrel="ne=m:不能为空|int=m:只能输入数字" warntip="#flashHeightErr" name="param[flash-height]" value="<?php echo $params['flash-height'];?>">px
                 <span class="tips-error hidden" id="flashHeightErr"></span>
            </div>
		</div>
		<div class="form-row source source4 hidden">
        	<label class="form-field">图片地址</label>
            <div class="form-cont">
                 <input class="input-txt w200" type="text" vrel="ne=m:不能为空|pic=m:图片地址格式不正确" warntip="#imageSrcErr" name="param[image-src]" value="<?php echo $params['image-src'];?>">
                 <span class="tips-error hidden" id="imageSrcErr"></span>
            </div>
		</div>
		<div class="form-row source source4 hidden">
        	<label class="form-field">图片链接</label>
            <div class="form-cont">
                 <input class="input-txt w200" type="text" vrel="ne=m:不能为空|url=m:URL地址格式不正确" warntip="#imageUrlErr" name="param[image-url]" value="<?php echo $params['image-url'];?>">
                 <span class="tips-error hidden" id="imageUrlErr"></span>
            </div>
		</div>
		<div class="form-row source source4 hidden">
        	<label class="form-field">图片宽度</label>
            <div class="form-cont">
                 <input class="input-txt w50" type="text" vrel="int=m:只能输入数字" warntip="#imageWidthErr" name="param[image-width]" value="<?php echo $params['image-width'];?>">px
                 <span class="tips-error hidden" id="imageWidthErr"></span>
            </div>
		</div>
		<div class="form-row source source4 hidden">
        	<label class="form-field">图片高度</label>
            <div class="form-cont">
                 <input class="input-txt w50" type="text" vrel="int=m:只能输入数字" warntip="#imageHeightErr" name="param[image-height]" value="<?php echo $params['image-height'];?>">px
                 <span class="tips-error hidden" id="imageHeightErr"></span>
            </div>
		</div>
		<div class="form-row source source4 hidden">
        	<label class="form-field">图片描述</label>
            <div class="form-cont">
                 <input class="input-txt w200" type="text" vrel="sz=max:40,min:4,m:范围2-20个汉字,ww" warntip="#imageAltErr" name="param[image-alt]" value="<?php echo $params['image-alt'];?>">
                 <span class="tips-error hidden" id="imageAltErr"></span>
            </div>
		</div>
        <div class="form-row source source5 hidden">
        	<label class="form-field">文字内容</label>
            <div class="form-cont">
                 <input class="input-txt w200" type="text" vrel="ne=m:不能为空|sz=max:40,min:4,m:范围2-20个汉字,ww" warntip="#textTitleErr" name="param[text-title]" value="<?php echo $params['text-title'];?>">
                 <span class="tips-error hidden" id="textTitleErr"></span>
            </div>
		</div>
		<div class="form-row source source5 hidden">
        	<label class="form-field">文字链接</label>
            <div class="form-cont">
                 <input class="input-txt w200" type="text" vrel="ne=m:不能为空|url=m:URL地址格式不正确" warntip="#textLinkErr" name="param[text-link]" value="<?php echo $params['text-link'];?>">
                 <span class="tips-error hidden" id="textLinkErr"></span>
            </div>
		</div>
		<div class="form-row source source5 hidden">
        	<label class="form-field">文字大小</label>
            <div class="form-cont">
                 <input class="input-txt w50" type="text" vrel="bt=min:12,max:30,m:范围为12-30|int=m:只能输入数字|ne=m:不能为空" warntip="#textSizeErr" name="param[text-size]" value="<?php echo $params['text-size'];?>">px
                 <span class="tips-error hidden" id="textSizeErr"></span>
            </div>
		</div>
	    <div class="btn-area">
	        <a class="btn-general highlight" href="#" id="submitBtn"><span>确定</span></a>
	        <a class="btn-general" href="#" id="pop_cancel"><span>取消</span></a>
	    </div>
    </form>
</div>