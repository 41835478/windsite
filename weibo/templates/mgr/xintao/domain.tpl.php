<form id="addForm" action="<?php echo URL('mgr/xintao/domains.save');?>" method="post"  name="changes-newlink">
	<?php
		if(!empty($domain)){//已申请绑定
			if(0==$domain['status']){//审核中...
				echo '<p class="form-tips" style="color:red;">['.$domain['domain'].']审核中</p>';
			}elseif(1==$domain['status']){//审核已通过...
				echo '<p class="form-tips" style="color:red;">['.$domain['domain'].']已绑定</p>';
			}elseif(2==$domain['status']){//未通过
				echo '<div class="form-box">'.
				 '	<div class="form-row">'.
			     '       <div class="form-cont" style="float:none;">'.
			     '		   <p class="tips-desc">1.进入您的域名服务商后台,配置cname(别名)指向www.xintaowang.com.<br/>如:t.lovezippo.com =>  www.xintaowang.com</p>'.
			     '		   <p class="tips-desc">2.在下列输入框中填写您的独立域名如:t.lovezippo.com，并点击确定，等待审核通过（<strong style="color:red;">建议使用备案过的域名</strong>）。</p>'.
			     '		   <input type="hidden" name="id" value="'.$domain['id'].'">'.
			     '		   <input type="hidden" name="status" value="0">'.
			     '		   <input type="hidden" name="user_id" value="'.XT_USER_ID.'">'.
			     '         <input id="domain" name="domain" class="ipt-txt" type="text" warntip="#domainTip" vrel="_f|ne" value="'.$domain['domain'].'"/><span class="tips-error hidden" id="domainTip"></span>'.
			     '			<div style="color:red;">（审核未通过：'.$domain['remark'].'）</div>'.
			     '   	</div>'.
			     '   </div>'.
			     '	<div class="btn-area">'.
			     '   	<a class="btn-general  highlight" id="checkIp" href="#"><span>检测</span></a>'.			     
			     '   	<a class="btn-general  highlight hidden" id="submitBtn" href="#"><span>确定</span></a>'.
			     '   	<a class="btn-general" id="pop_cancel" href="#"><span>取消</span></a>'.
			     '  </div>'.
			     '</div>';
			}else{
				echo '<div class="form-box">'.
				 '	<div class="form-row">'.
			     '       <div class="form-cont">'.
			     '		   <p class="tips-desc">1.进入您的域名服务商后台,配置cname(别名)指向www.xintaowang.com.<br/>如:t.lovezippo.com => www.xintaowang.com</p>'.
			     '		   <p class="tips-desc">2.在下列输入框中填写您的独立域名如:t.lovezippo.com，并点击确定，等待审核通过（<strong style="color:red;">建议使用备案过的域名</strong>）。</p>'.
			     '		   <input type="hidden" name="status" value="0">'.
			     '		   <input type="hidden" name="user_id" value="'.XT_USER_ID.'">'.
			     '       <input id="domain" name="domain" class="ipt-txt" type="text" warntip="#domainTip" vrel="_f|ne" value=""/><span class="tips-error hidden" id="domainTip"></span>'.
			     '   	</div>'.
			     '   </div>'.
			     '	<div class="btn-area">'.
			     '   	<a class="btn-general  highlight" id="checkIp" href="#"><span>检测</span></a>'.				     
			     '   	<a class="btn-general  highlight hidden" id="submitBtn" href="#"><span>确定</span></a>'.
			     '   	<a class="btn-general" id="pop_cancel" href="#"><span>取消</span></a>'.
			     '  </div>'.
			     '</div>';
			}
		}else{//未申请
			echo '<div class="form-box">'.
				 '	<div class="form-row">'.
			     '       <div class="form-cont">'.
			     '		   <p class="tips-desc">1.进入您的域名服务商后台,配置cname(别名)指向www.xintaowang.com.<br/>如:t.lovezippo.com => www.xintaowang.com</p>'.
			     '		   <p class="tips-desc">2.在下列输入框中填写您的独立域名如:t.lovezippo.com，并点击确定，等待审核通过（<strong style="color:red;">建议使用备案过的域名</strong>）。</p>'.
			     '		   <input type="hidden" name="status" value="0">'.
			     '		   <input type="hidden" name="user_id" value="'.XT_USER_ID.'">'.
			     '       <input id="domain" name="domain" class="ipt-txt" type="text" warntip="#domainTip" vrel="_f|ne" value=""/><span class="tips-error hidden" id="domainTip"></span>'.
			     '   	</div>'.
			     '   </div>'.
			     '	<div class="btn-area">'.
			     '   	<a class="btn-general  highlight" id="checkIp" href="#"><span>检测</span></a>'.				     
			     '   	<a class="btn-general  highlight hidden" id="submitBtn" href="#"><span>确定</span></a>'.
			     '   	<a class="btn-general" id="pop_cancel" href="#"><span>取消</span></a>'.
			     '  </div>'.
			     '</div>';
		}
	?>
</form>