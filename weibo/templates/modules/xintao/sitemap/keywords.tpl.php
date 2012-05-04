<div class="form-row">
    <div class="form-cont">
      <ul>
	    <?php
	    	for($i=0;$i<100;$i++){
	    		echo '<li><input class="input-txt w150" type="text" vrel="sz=max:40,min:0,m:0-40个汉字,ww" warntip="#keywordErr_'.$i.'" name="keyword[]" value=""><span class="tips-error hidden" id="keywordErr_'.$i.'"></span></li>';
	    	}
	    ?>
      </ul>  
    </div>
</div>