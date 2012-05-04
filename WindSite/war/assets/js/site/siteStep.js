function initSiteStep2() {
	var currentChannel = null;
	$('.smoothbox_btn').click(function() {
				currentChannel = channels[$(this).parents('li').attr('channel')];
				showDialog();
			});
	$("#channel_show_small li").click(function() {
				currentChannel = channels[$(this).attr('channel')];
				showDialog();
			}).hover(function() {
		$(this).toggleClass("ui-selecting").siblings()
				.removeClass("ui-selecting");
	}, function() {
		$(this).removeClass("ui-selecting");
	});
	$('#channel_show_small_dialog').dialog({
				bgiframe : true,
				autoOpen : false,
				resizable : false,
				width : 450,
				zIndex : 1000,
				modal : true
			});
	$('#use_template').hover(function() {
				$(this).removeClass('btn-ok-hover').addClass('btn-ok-hover');
			}, function() {
				$(this).removeClass('btn-ok-hover');
			}).click(function() {
		if (currentChannel == null) {
			alert('未选择频道');
			return;
		}
		if ($(this).hasClass('btn-ok-disabled')) {
			return;
		}
		confirm('您确认使用当前模板吗？', function(r) {
			if (r) {
				$('#use_template').addClass('btn-ok-disabled');
				var sender = new WindSender("/router/member/designer/channels/designer");
				sender.load('POST', currentChannel, function(response) {
							if (response.isSuccess()) {
								document.location.href = "/router/member/sitemanager";
							} else {
								alert(response.msg);
							}
							$('#use_template').removeClass('btn-ok-disabled');
						});
			} else {
				return;
			}
		});
		return false;
	});

	function showDialog() {
		if (currentChannel != null) {
			$('#channel_show_big').attr('src', currentChannel.bigPic);
			$('#preview_template').attr(
					'href',
					'/zone/channel/channel.html?channel='
							+ currentChannel.value + '&pid=' + PID);
			$('#channel_show_small_dialog').dialog('option', 'title',
					currentChannel.name).dialog('open');
		} else {
			alert('当前频道不存在');
		}
	}

}
function initSiteStep1() {
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
				return value.length <= max ? true : {
					en : "最多允许" + max + "个字符"
				};
			});
	$("#siteForm").validator({
				position : 'center right'
			}).submit(function(e) {
		if ($('.btn-ok', $(this)).hasClass('btn-ok-disabled')) {
			e.preventDefault();
			return;
		}
		var form = $(this);
		if (!e.isDefaultPrevented()) {
			$('.btn-ok', form).addClass('btn-ok-disabled');
			updateSiteStep1($('#siteId').val(), $('#siteTitle').val(),
					$('#siteCid').val());
			e.preventDefault();
		} else {
			$('#siteForm .btn-ok').removeClass('btn-ok-disabled');
		}
	});
	$('#siteForm .btn-ok').hover(function() {
				$(this).removeClass('btn-ok-hover').addClass('btn-ok-hover');
			}, function() {
				$(this).removeClass('btn-ok-hover');
			});
}
function updateSiteStep1(id, title, cid) {
	var sender = new WindSender("/router/member/site/update/" + id);
	sender.load("POST", {
				"title" : title,
				"cid" : cid
			}, function(response) {
				if (response.isSuccess()) {
					alert('站点信息更新成功，进入首页设置。');
					document.location.href = "/router/member/page/templates?isIndex=true";
				} else {
					alert(response.msg);
				}
				$('#siteForm .btn-ok').removeClass('btn-ok-disabled');
			});
}