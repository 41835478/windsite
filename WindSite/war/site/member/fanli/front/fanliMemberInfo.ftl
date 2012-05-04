<@p.pageMemberHeader>
<meta name="keywords" content="会员中心">
<meta name="description" content="会员中心">
<title>编辑个人信息- ${sitetitle}</title>
</@p.pageMemberHeader>
<#assign isThird = qq_appkey??||sina_appkey??||taobao_appkey??>
<script src="/assets/js/jquery/tools/validator.min.js?v=${dateVersion()}" type="text/javascript"></script>
<script>
$(function(){
	initFanliSiteMemberInfo();
	$('.J_UnbindAccount').click(function(){
		var self = $(this);
		$.post('/router/fanli/loginfl/unbind', {
			third_type : self.attr('data-type')
		}, function(state) {
			alert('已解绑');
			document.location.href = document.location.href;
		});
	});
});
</script>
<div class="layout grid-m0 ks-clear"><div class="col-main"><div class="main-wrap J_TRegion"><dl id="position"><dt>帐户管理</dt><dd> &gt; <span id="UserMap">编辑个人信息</span></dd></dl></div></div></div>
<div class="layout grid-s5m0 ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div class="box J_TBox ks-clear">
				<div class="fm-input member-info-update" style="margin-top:0px;">
					<form id="fanliUpdateForm" method="POST">
						<fieldset style="padding-top:15px;"><legend>注册个人账户</legend>
						<div class="fm-item"><label for="username" class="fm-label"><span class="required">*</span>用户名：</label><input type="text"  required="required" minlength="3" maxlength="15" class="i-text J-autofocus" id="username" name="username" readonly style="background:gray;" value="${member.info.username}"><div class="fm-explain">由3-15个字符组成。</div></div>
						<div class="fm-item"><label class="fm-label" for="pwd"><span class="required">*</span>旧密码：</label><input type="password"  required="required" minlength="6" maxlength="20"  class="i-text J-pwdStrengthCheck" id="oldpwd" name="oldpwd" value=""><div class="fm-explain">由6-20个字符组成。</div></div>
						<div class="fm-item"><label class="fm-label" for="pwd"><span class="required">*</span>新密码：</label><input type="password"  required="required" minlength="6" maxlength="20"  class="i-text J-pwdStrengthCheck" id="newpwd" name="newpwd" value=""><div class="fm-explain">由6-20个字符组成。</div></div>
						<div class="fm-item"><label class="fm-label" for="pwd-confirm"><span class="required">*</span>确认密码：</label><input type="password" data-equals="newpwd" required="required" class="i-text" id="pwd-confirm" name="pwd-confirm" value=""><div class="fm-explain">与新密码一致</div></div>
						<div class="fm-item"><label for="email" class="fm-label"><span class="required">*</span>电子邮箱：</label><input type="email" required="required" class="i-text J-autofocus" id="email" name="email" value="${member.info.email}"><div class="fm-explain">Email主要作为取回密码用。</div></div>
						<div class="fm-item"><label for="alipay" class="fm-label">支付宝帐号：</label><input type="text" class="i-text J-autofocus" id="alipay" name="alipay" value="${member.info.alipay}"><div class="fm-explain">返利支付时的帐号。</div></div>
						<div class="fm-item"><label for="alipay" class="fm-label">支付宝姓名：</label><input type="text" class="i-text J-autofocus" id="alipayName" name="alipayName" value="${member.info.alipayName}"><div class="fm-explain">返利支付时的帐号对应的姓名。</div></div>
						<div class="fm-item"></div>
						<div class="fm-part ks-clear">
							<div class="fm-item"><label for="qq" class="fm-label">QQ：</label><input type="text" class="i-text J-autofocus" id="qq" name="qq" value="${member.info.qq}"><div class="fm-explain">方便客服与您及时联系。</div></div>
							<div class="fm-item"><label for="msn" class="fm-label">MSN：</label><input type="text" class="i-text J-autofocus" id="msn" name="msn" value="${member.info.msn}"><div class="fm-explain">方便客服与您及时联系。</div></div>
							<div class="fm-item"><label for="wangwang" class="fm-label">旺旺：</label><input type="text" class="i-text J-autofocus" id="wangwang" name="wangwang" value="${member.info.wangwang}"><div class="fm-explain">方便客服与您及时联系。</div></div>
							<div class="fm-item"><label for="mobile" class="fm-label">手机号：</label><input type="text" class="i-text J-autofocus" id="mobile" name="mobile" value="${member.info.mobile}"><div class="fm-explain">方便客服与您及时联系。</div></div>
						</div>
						<#if isThird>
						<div class="fm-part ks-clear">
							<#if qq_appkey??>
							<div class="fm-item"><label for="qq_appkey" class="fm-label">QQ登录：</label>
							<#if member.qq_uid??&&member.qq_nick>${member.qq_nick}　<a class="J_UnbindAccount" data-type="qq">解除绑定</a><#else>
								<div id="third_login_qq"></div>
								<script type="text/javascript" src="http://qzonestyle.gtimg.cn/qzone/openapi/qc.js" charset="utf-8" ></script>
								<script type="text/javascript">
									QC.init({appId:"${qq_appkey}"});
									QC.Login({
										btnId : "third_login_qq",// 插入按钮的html标签id
										size : "A_M",// 按钮尺寸
										scope : "get_user_info",// 展示授权，可选
										display : "pc"// 应用场景，可选
									}, function(dt, opts) {
										QC.Login.getMe(function(openId, accesToken, backData){
	    									$.post('/router/fanli/loginfl/bind', {
													third_type : 'qq',
													third_id : '' + openId,
													third_nick : dt.nickname
												}, function(state) {
													if(state!='200'){
														alert('当前QQ帐号已绑定在【'+state+'】上');
													}
													document.location.href = document.location.href;
													
												});
												QC.Login.signOut();
										});
										
									}, function() {
									});
								</script>		
							</#if>
							</div>
							</#if>
							<#if sina_appkey??>
							<div class="fm-item"><label for="qq_appkey" class="fm-label">新浪微博登录：</label>
								<#if member.sina_uid??&&member.sina_nick><strong>${member.sina_nick}</strong>　<a class="J_UnbindAccount" data-type="sina">解除绑定</a><#else>
										<div id="third_login_sina"></div>
										<script src=" http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=${sina_appkey}" type="text/javascript" charset="utf-8"></script>
										<script>
										WB2.anyWhere(function(W) {
										W.widget.connectButton({
											id : "third_login_sina",
											callback : {
												login : function(o) {
													$.post('/router/fanli/loginfl/bind', {
																third_type : 'sina',
																third_id : '' + o.id,
																third_nick : o.screen_name,
																referer : document.location.href
															}, function(state) {
																if(state!='200'){
																	alert('当前新浪微博帐号已绑定在【'+state+'】上');
																}
																	document.location.href = document.location.href;
															});
													WB2.logout();
												},
												logout : function() {
												}
											}
										});
									});
										</script>
								</#if>
							</div>
							</#if>
						</div>
						</#if>
						<div class="fm-item ks-clear"><span class="btn btn-ok"><input type="submit" value="确认修改"></span><span class="fm-confirm"><span class="loading-text fn-hide">正在提交信息</span></span></div>
						</fieldset>
					</form>
				</div>
			</div>			
		</div>
	</div>
	<div class="col-sub J_TRegion">
		<@p.pageMemberSideMenu></@p.pageMemberSideMenu>
	</div>
</div>
<@p.pageFooter>
</@p.pageFooter>