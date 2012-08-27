QC.Login({
			btnId : "third_login_qq",// 插入按钮的html标签id
			size : "A_M",// 按钮尺寸
			scope : "get_user_info",// 展示授权，可选
			display : "pc"// 应用场景，可选
		}, function(dt, opts) {
			if (QC.Login.check()) {// 如果已登录
				QC.Login.getMe(function(openId, accessToken) {
					QC.api("get_user_info").success(function(s) {
						$.post('/router/fanli/loginfl/bind', {
									third_type : 'qq',
									third_id : '' + openId,
									third_nick : dt.nickname
								}, function(state) {
									if (state != '200') {
										alert('当前QQ帐号已绑定在【' + state + '】上');
									}
									document.location.href = document.location.href;

								});
						QC.Login.signOut();
					}).error(function(f) {// 失败回调
							}).complete(function(c) {// 完成请求回调
							});

				});
			}
		});