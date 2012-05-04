<div class="form-row">
    <div class="form-cont">
      <ul>
	    <?php
	    	$c = 0;
	    	if(!empty($keywords)){
	    		
	    		foreach($keywords as $word){
	    			echo '<li><input class="input-txt w150" type="text" value="'.F('escape',$word).'" vrel="sz=max:40,min:0,m:0-40个汉字,ww" warntip="#keywordErr_'.$c.'" name="keyword[]" value=""><span class="tips-error hidden" id="keywordErr_'.$c.'"></span></li>';
	    			$c++;
	    		}
	    	}
	    	for($i=$c;$i<100;$i++){
	    		echo '<li><input class="input-txt w150" type="text" vrel="sz=max:40,min:0,m:0-40个汉字,ww" warntip="#keywordErr_'.$i.'" name="keyword[]" value=""><span class="tips-error hidden" id="keywordErr_'.$i.'"></span></li>';
	    	}
	    ?>
      </ul>  
    </div>
</div>