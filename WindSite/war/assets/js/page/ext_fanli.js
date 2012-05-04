function initLogin() {
	$('#fanli-site-map').overlay({
				mask : {
					color : '#000',
					opacity : 0.5
				},
				closeOnClick : false,
				effect : 'apple',
				top : '20%'
			});
	$('.btn-ok').hover(function() {
				$(this).removeClass('btn-ok-hover').addClass('btn-ok-hover');
			}, function() {
				$(this).removeClass('btn-ok-hover');
			});
	$.tools.validator.localize("en", {
				'*' : '输入错误',
				':email' : '电子邮箱格式不正确',
				':number' : '请输入数字',
				':url' : 'URL地址不正确',
				'[max]' : '请输入一个小于 $1的数字',
				'[min]' : '请输入一个大于$1的数字',
				'[required]' : '必填项'
			});
	$("#fanliLoginForm").validator({
				position : 'center right'
			}).submit(function(e) {
				if ($('.btn-ok', $(this)).hasClass('btn-ok-disabled')) {
					e.preventDefault();
					return;
				}
				var form = $(this);
				// client-side validation passed
				if (!e.isDefaultPrevented()) {
					// submit the data to the server with AJAX
					$('.btn-ok', form).addClass('btn-ok-disabled');
					loginMember();
					// prevent default form submission logic
					e.preventDefault();
				} else {
					$('.btn-ok').removeClass('btn-ok-disabled');
				}
			});
}
function loginMember() {
	var username = $('#username').val();
	var pwd = $('#pwd').val();
	var sender = new WindSender("/router/fanli/loginfl");
	sender.load("POST", {
				username : username,
				password : pwd
			}, function(response) {
				if (response.isSuccess()) {
					var referer = $('#referer');
					var redirect = '';
					if (referer.length == 1) {
						var refererV = referer.val();
						if (refererV && refererV != '') {
							redirect = refererV;
						}
					}
					if (redirect != '') {
						document.location.href = redirect;
					} else {
						$('#fanli-site-map').data('overlay').load();
					}
				} else {
					alert(response.msg);
				}
				$('#fanliLoginForm .btn-ok').removeClass('btn-ok-disabled');
			});
}
function initRegiste() {
	$('#fanli-site-map').overlay({
				mask : {
					color : '#000',
					opacity : 0.5
				},
				closeOnClick : false,
				effect : 'apple',
				top : '20%'
			});
	$('.btn-ok').hover(function() {
				$(this).removeClass('btn-ok-hover').addClass('btn-ok-hover');
			}, function() {
				$(this).removeClass('btn-ok-hover');
			});
	$.tools.validator.localize("en", {
				'*' : '输入错误',
				':email' : '电子邮箱格式不正确',
				':number' : '请输入数字',
				':url' : 'URL地址不正确',
				'[max]' : '请输入一个小于 $1的数字',
				'[min]' : '请输入一个大于$1的数字',
				'[required]' : '必填项'
			});
	$.tools.validator.fn("[data-equals]", "确认密码和登录密码不一致", function(input) {
				var name = input.attr("data-equals"), field = this.getInputs()
						.filter("[name=" + name + "]");
				return input.val() == field.val() ? true : false;
			});
	$.tools.validator.fn("[minlength]", function(input, value) {
				var min = input.attr("minlength");
				return value.length >= min ? true : {
					en : "请至少填写 " + min + "个字符"
				};
			});
	$.tools.validator.fn("[maxlength]", function(input, value) {
				var max = input.attr("maxlength");
				var temp = value.replace(/[^\x00-\xff]/g, "**");
				return temp.length <= max ? true : {
					en : "最多允许" + max + "个字符"
				};
			});
	$("#fanliForm").validator({
				position : 'center right'
			}).submit(function(e) {
				if ($('.btn-ok', $(this)).hasClass('btn-ok-disabled')) {
					e.preventDefault();
					return;
				}
				var form = $(this);
				// client-side validation passed
				if (!e.isDefaultPrevented()) {
					$('.btn-ok', form).addClass('btn-ok-disabled');
					// submit the data to the server with AJAX
					registeMember();
					// prevent default form submission logic
					e.preventDefault();
				} else {
					$('#fanliForm .btn-ok').removeClass('btn-ok-disabled');
				}
			});
}
function registeMember() {
	var username = $('#username').val();
	var pwd = $('#pwd').val();
	var email = $('#email').val();
	var alipay = $('#alipay').val();
	var qq = $('#qq').val();
	var msn = $('#msn').val();
	var wangwang = $('#wangwang').val();
	var mobile = $('#mobile').val();
	if (alipay) {
		if (alipay.replace(/^\s+|\s+$/g, "") != alipay) {
		}
		alipay = alipay.replace(/^\s+|\s+$/g, "");
		if (alipay.replace(/[。．]/, '.') != alipay) {
		}
		alipay = alipay.replace(/[。．]/, '.');
		if (alipay.length > 100) {
			alert("帐户名的长度不能超过100位。");
			$('#fanliForm .btn-ok').removeClass('btn-ok-disabled');
			return false;
		} else if (/^1[3458]\d{9}$/.test(alipay)) {
		} else if (/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
				.test(alipay)) {
		} else if (/^(00)?(886|853|852|82|81)-?[0-9]{7,11}$/.test(alipay)) {
		} else {
			alert("支付宝账户名格式错误，请检查是否为Email地址或手机号。");
			$('#fanliForm .btn-ok').removeClass('btn-ok-disabled');
			return false;
		}
	}
	var sender = new WindSender("/router/fanli/registe/addMember");
	sender.load("POST", {
				username : username,
				pwd : pwd,
				email : email,
				alipay : alipay,
				qq : qq,
				msn : msn,
				wangwang : wangwang,
				mobile : mobile
			}, function(response) {
				if (response.isSuccess()) {
					var referer = $('#referer');
					var redirect = '';
					if (referer.length == 1) {
						var refererV = referer.val();
						if (refererV && refererV != '') {
							redirect = refererV;
						}
					}
					if (redirect != '') {
						alert('注册成功！');
						document.location.href = redirect;
					} else {
						$('#fanli-site-map').data('overlay').load();
					}
				} else {
					alert(response.msg);
					$('#fanliForm .btn-ok').removeClass('btn-ok-disabled');
				}
			});
}
