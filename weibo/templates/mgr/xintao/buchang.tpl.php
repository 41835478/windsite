<form id="addForm" action="<?php echo URL('mgr/xintao/domains.buchangSave');?>" method="post"  name="changes-newlink">
	<?php
		if(!empty($buchang)){//已申请绑定
			if(0==$buchang['status']){//审核中...
				echo '<p class="form-tips" style="color:red;">['.$buchang['nick'].']申请补偿审核中</p>';
			}elseif(1==$buchang['status']){//审核已通过...
				echo '<p class="form-tips" style="color:red;">['.$buchang['nick'].']已获得补偿，点击<a href="'.TB_CONTAINER.'" target="_top">重新登录</a>之后生效</p>';
			}elseif(2==$buchang['status']){//未通过
				echo '<div class="form-box">'.
				 '	<div class="form-row">'.
			     '       <div class="form-cont">'.
			     '		   <p class="tips-desc">只有2011-8-8至2011-8-12期间付费使用的新淘网会员才可以申请补偿。</p>'.
			     '		   <input type="hidden" name="status" value="0">'.
			     '		   <input type="hidden" name="nick" value="'.XT_USER_NICK.'">'.
			     '		   <input type="hidden" name="remark" value="'.$buchang['remark'].'">'.
			     '			<p class="form-tips" style="color:red;">（审核未通过：'.$buchang['remark'].'）</p>'.
			     '   	</div>'.
			     '   </div>'.
			     '	<div class="btn-area">'.
			     '   	<a class="btn-general  highlight" id="submitBtn" href="#"><span>确定</span></a>'.
			     '   	<a class="btn-general" id="pop_cancel" href="#"><span>取消</span></a>'.
			     '  </div>'.
			     '</div>';
			}
		}else{//未申请
			echo '<div class="form-box">'.
				 '	<div class="form-row">'.
			     '       <div class="form-cont">'.
			     '		   <p class="tips-desc">只有2011-8-8至2011-8-12期间付费使用的新淘网会员才可以申请补偿。</p>'.
			     '		   <input type="hidden" name="remark" value="">'.
			     '		   <input type="hidden" name="status" value="0">'.
			     '		   <input type="hidden" name="nick" value="'.XT_USER_NICK.'">'.
			     '   	</div>'.
			     '   </div>'.
			     '	<div class="btn-area">'.
			     '   	<a class="btn-general  highlight" id="submitBtn" href="#"><span>确定</span></a>'.
			     '   	<a class="btn-general" id="pop_cancel" href="#"><span>取消</span></a>'.
			     '  </div>'.
			     '</div>';
		}
	?>
</form>