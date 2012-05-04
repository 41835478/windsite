function initWeiboForm(func, form) {
	if (!form) {
		form = $('#weiboForm');
	}
	$('.btn-ok', form).hover(function() {
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
	$.tools.validator.fn("[minlength]", function(input, value) {
				var min = input.attr("minlength");
				var temp = value.replace(/[^\x00-\xff]/g, "**");
				return temp.length >= min ? true : {
					en : "请至少填写 " + min + "个字符，" + min / 2 + "个汉字"
				};
			});
	$.tools.validator.fn("[maxlength]", function(input, value) {
				var max = input.attr("maxlength");
				var temp = value.replace(/[^\x00-\xff]/g, "**");
				return temp.length <= max ? true : {
					en : "最多允许" + max + "个字符，" + max / 2 + "个汉字"
				};
			});
	form.validator({
				position : 'center right'
			}).submit(function(e) {
				if ($('#weiboForm .btn-ok', $(this))
						.hasClass('btn-ok-disabled')) {
					e.preventDefault();
					return;
				}
				// client-side validation passed
				if (!e.isDefaultPrevented()) {
					// submit the data to the server with AJAX
					$('.btn-ok', form).addClass('btn-ok-disabled');
					func();
					// prevent default form submission logic
					e.preventDefault();
				} else {
					$('.btn-ok', form).removeClass('btn-ok-disabled');
				}
			});
}
function initWeiboProfile() {
	initWeiboForm(function() {
		var logo = $('#wb_logo').val();
		if (logo) {
			var ft = logo.substring(logo.length - 3, logo.length);
			if (ft != 'png' && ft != 'PNG') {
				alert('您的微博LOGO必须为PNG图片');
				$('#wb_logo').focus();
				$('#weiboForm .btn-ok').removeClass('btn-ok-disabled');
				return;
			}
		}
		var sender = new WindSender("/router/member/fl/weibo/profile/update");
		sender.load("POST", {
			wb_site_title : $('#wb_site_title').val(),
			wb_skin_default : $('#wb_skin_default').val(),
			wb_site_info : $('#wb_site_info').val(),
			wb_site_record : $('#wb_site_record').val(),
			wb_logo : $('#wb_logo').val(),
			wb_third_code : $('#wb_third_code').val(),
			wb_login_way : $('input[type="radio"][name="wb_login_way"]:checked')
					.val()
		}, function(response) {
			if (response.isSuccess()) {
				alert('修改微博基本设置成功');
			} else {
				alert(response.msg);
			}
			$('#weiboForm .btn-ok').removeClass('btn-ok-disabled');
		});
	});
}
function initWeiboWbIndex() {
	$('input[type="radio"][name="wb_oper"]').change(function() {
				if ($(this).val() == '1') {// 如果是发布微博
					// 链接不可编辑
					$('#wb_link').css('background', '#EBEBE4').attr('readonly',
							true);
					// 话题可编辑
					$('#wb_topic').css('background', 'none').attr('readonly',
							false);
				} else {// 如果是跳转到其他页面
					// 话题不可编辑
					$('#wb_topic').css('background', '#EBEBE4').attr(
							'readonly', true);
					// 链接可编辑
					$('#wb_link').css('background', 'none').attr('readonly',
							false);
				}
			});
	initWeiboForm(function() {
				var sender = new WindSender("/router/member/fl/weibo/wbindex/update");
				sender.load("POST", {
							wb_title : $('#wb_title').val(),
							wb_text : $('#wb_text').val(),
							wb_topic : $('#wb_topic').val(),
							wb_link : $('#wb_link').val(),
							wb_btn_title : $('#wb_btn_title').val(),
							wb_oper : $('input[type="radio"][name="wb_oper"]:checked')
									.val()
						}, function(response) {
							if (response.isSuccess()) {
								alert('修改微博首页聚焦位配置成功');
							} else {
								alert(response.msg);
							}
							$('#weiboForm .btn-ok')
									.removeClass('btn-ok-disabled');
						});
			});
}
function initWeiboOpen() {
	var root = $("#addOpenWizard").scrollable();
	var api = root.scrollable();
	api.onBeforeSeek(function(event, i) {
				$("#status li").removeClass("active").eq(i).addClass("active");
				if (i == 1) {
					if ('系统分配' == $('#wb_app_key').val()) {// 如果是系统分配，无需设置管理员

					} else {// 自己的必须设置管理员

					}
				}
			});

	$('#appKeyType').click(function() {
		var self = $(this);
		if (self.text() == '系统分配') {
			confirm('您确定要切换回系统分配的吗？', function(r) {
						if (r) {
							self.text('自定义');
							$('#wb_app_key,#wb_app_secret').attr('readonly',
									true).css('background', 'gray').val('系统分配');// 设置AppKey,AppSecret为系统分配
						}
					});
		} else {
			self.text('系统分配');
			$('#wb_app_key,#wb_app_secret').attr('readonly', false).css(
					'background', 'none').val('');// 设置AppKey,AppSecret为空并可编辑
		}
	});
	initWeiboForm(function() {
		var sender = new WindSender("/router/member/fl/weibo/open/update");
		sender.load("POST", {
					wb_app_key : $('#wb_app_key').val(),
					wb_app_secret : $('#wb_app_secret').val(),
					wb_nick : $('#wb_nick').val()
				}, function(response) {
					if (response.isSuccess()) {
						if ('系统分配' == $('#wb_app_key').val()) {
							alert('使用系统分配新浪微博开放平台信息成功，无需设置管理员');
						} else {
							alert('使用自己的新浪微博开放平台信息成功，必需设置管理员');
							api.next();
						}
					} else {
						alert(response.msg);
					}
					$('#weiboFirstForm .btn-ok').removeClass('btn-ok-disabled');
				});
	}, $('#weiboFirstForm'));
	initWeiboForm(function() {
				if ('系统分配' != $('#wb_app_key').val()) {
					if (!$('#wb_nick').val()) {
						alert('使用自己的App Key,必须指定管理员昵称');
						return;
					}
				}
				var sender = new WindSender("/router/member/fl/weibo/open/update");
				sender.load("POST", {
							wb_app_key : $('#wb_app_key').val(),
							wb_app_secret : $('#wb_app_secret').val(),
							wb_nick : $('#wb_nick').val()
						}, function(response) {
							if (response.isSuccess()) {
								alert('设置微博管理员成功');
							} else {
								alert(response.msg);
							}
							$('#weiboSecondForm .btn-ok')
									.removeClass('btn-ok-disabled');
						});
			}, $('#weiboSecondForm'));
}
function initWeiboAd() {
	initWeiboForm(function() {
				var sender = new WindSender("/router/member/fl/weibo/weiboad/update");
				sender.load("POST", {
							wb_ad_footer : $('#wb_ad_footer').val()
						}, function(response) {
							if (response.isSuccess()) {
								alert('修改微博广告成功');
							} else {
								alert(response.msg);
							}
							$('#weiboForm .btn-ok')
									.removeClass('btn-ok-disabled');
						});
			});
}
function initWeiboLinks() {
	$('#links .links-head').click(function() {
		var icon = $('.ui-icon', $(this));
		if (icon.hasClass('ui-icon-minusthick')) {// 已显示
			$(this).parent().find('.links-body').fadeOut();
			icon.removeClass('ui-icon-minusthick')
					.addClass('ui-icon-plusthick');
		} else {
			$(this).parent().find('.links-body').fadeIn();
			icon.removeClass('ui-icon-plusthick')
					.addClass('ui-icon-minusthick');
		}
	});
	$('#wb-profile-link-create').click(function(e) {
		if ($('#wb-profile-links tr.wb-link-row').length > 5) {
			alert('您已经添加了5个顶部链接');
			e.preventDefault();
			return false;
		}
		var tr = $('<tr class="wb-link-row"><td width=200px><input class="i-text wb-link-name" /></td><td width=400px><input class="i-text wb-link-address" /></td><td><a class="delete-link">删除</a></td></tr>');
		$('#wb-profile-links').append(tr);
		$('.delete-link', tr).click(function() {
					$(this).parents('tr.wb-link-row').remove();
				});
		e.preventDefault();
		return false;
	});
	$('#wb-top-link-create').click(function(e) {
		if ($('#wb-top-links tr.wb-link-row').length > 5) {
			alert('您已经添加了5个顶部链接');
			e.preventDefault();
			return false;
		}
		var tr = $('<tr class="wb-link-row"><td width=200px><input class="i-text wb-link-name" /></td><td width=400px><input class="i-text wb-link-address" /></td><td><a class="delete-link">删除</a></td></tr>');
		$('#wb-top-links').append(tr);
		$('.delete-link', tr).click(function() {
					$(this).parents('tr.wb-link-row').remove();
				});
		e.preventDefault();
		return false;
	});
	$('#wb-bottom-link-create').click(function(e) {
		if ($('#wb-bottom-links tr.wb-link-row').length > 10) {
			alert('您已经添加了10个顶部链接');
			e.preventDefault();
			return false;
		}
		var tr = $('<tr class="wb-link-row"><td width=200px><input class="i-text wb-link-name" /></td><td width=400px><input class="i-text wb-link-address" /></td><td><a class="delete-link">删除</a></td></tr>');
		$('#wb-bottom-links').append(tr);
		$('.delete-link', tr).click(function() {
					$(this).parents('tr.wb-link-row').remove();
				});
		e.preventDefault();
		return false;
	});
	$('a.delete-link').click(function() {
				var a = $(this);
				confirm('您确认要删除该链接吗？', function(r) {
							if (r) {
								a.parents('tr.wb-link-row').remove();
								$('.wb-link-confirm[t="' + a.attr('t') + '"]')
										.click();
							}
						});

			});
	$('.wb-link-confirm').hover(function() {
				$(this).removeClass('btn-ok-hover').addClass('btn-ok-hover');
			}, function() {
				$(this).removeClass('btn-ok-hover');
			}).click(function() {
				weiboLinksUpdate($(this));
			});
}
function weiboLinksUpdate(confirm) {
	var t = confirm.attr('t');
	var trs = $('#wb-' + t + '-links tr.wb-link-row');
	var isError = false;
	var links = [];
	var num = 1;
	trs.each(function() {
				var name = $(this).find('.wb-link-name');
				var address = $(this).find('.wb-link-address');
				var reg = /\"/g;
				if (!name.val()) {
					alert('链接标题不能为空');
					isError = true;
					name.focus();
					return false;
				} else {
					name.val(name.val().replace(reg, ''));
				}
				if (!address.val()) {
					alert('链接地址不能为空');
					isError = true;
					address.focus();
					return false;
				} else {
					address.val(address.val().replace(reg, ''));
				}
				if (t == 'profile') {// 用户资料位广告链接
					links.push('{"title":"' + name.val() + '","link":"'
							+ address.val() + '"}');
				} else {// 顶部，底部链接
					links.push('"' + num + '":{"link_name":"' + name.val()
							+ '","link_address":"' + address.val() + '"}');
				}
				num++;
			});
	if (isError) {
		confirm.removeClass('btn-ok-disabled');
		return;
	}
	var linksStr = '[]';
	if (links.length > 0) {
		if (t == 'profile') {
			linksStr = '[' + links.join(',') + ']';
		} else {
			linksStr = '{' + links.join(',') + '}';
		}
	}
	confirm.addClass('btn-ok-disabled');
	if ('top' == t) {
		confirmWeiboLinksUpdate(confirm, linksStr, '', '');
	} else if ('bottom' == t) {
		confirmWeiboLinksUpdate(confirm, '', linksStr, '');
	} else if ('profile' == t) {
		confirmWeiboLinksUpdate(confirm, '', '', linksStr);
	}
}
function confirmWeiboLinksUpdate(confirm, top, bottom, profile) {
	var sender = new WindSender("/router/member/fl/weibo/links/update");
	sender.load("POST", {
				wb_head_link : top,
				wb_foot_link : bottom,
				wb_profile_link : profile
			}, function(response) {
				if (response.isSuccess()) {
					alert('修改微博链接配置成功');
					document.location.href = '/router/member/fl/weibo/links';
				} else {
					alert(response.msg);
				}
				confirm.removeClass('btn-ok-disabled');
			});
}