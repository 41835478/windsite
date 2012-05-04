$(function() {
			$('#J_FanliLoginBox').overlay({
						mask : {
							color : '#000',
							opacity : 0.5
						},
						closeOnClick : false,
						effect : 'apple',
						top : '20%'
					});
			$('#J_FanliLoginButton').hover(function() {
						$(this).addClass('btn-ok-hover');
					}, function() {
						$(this).removeClass('btn-ok-hover');
					}).click(function() {
						if ($(this).hasClass('btn-ok-disabled')) {
							return;
						}
						var username = $('#J_Username').val();
						var pwd = $('#J_Pwd').val();
						if (!username) {
							alert('用户名不能为空');
							$(this).removeClass('btn-ok-disabled');
							return;
						}
						if (!pwd) {
							alert('密码不能为空');
							$(this).removeClass('btn-ok-disabled');
							return;
						}
						$(this).addClass('btn-ok-disabled');
						loginFanliMember(username, pwd, $(this)
										.attr('data-url'));
					});

		});
function loginFanliMember(username, pwd, url) {
	var sender = new WindSender("/router/fanli/loginfl");
	sender.load("POST", {
				username : username,
				password : pwd
			}, function(response) {
				if (response.isSuccess()) {
					if (url) {
						document.location.href = url;
					} else {
						document.location.href = document.location.href;
					}
				} else {
					alert(response.msg);
				}
				$('#J_FanliLoginButton').removeClass('btn-ok-disabled');
			});
}