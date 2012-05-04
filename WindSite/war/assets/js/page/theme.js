$(function() {
	var img = $('#tm-preview img');
	var preview = $('#tm-preview a.preview');
	$('#J_TMColorPanel a').hover(function() {
				$(this).addClass('selected').siblings().removeClass('selected');
				var src = $(this).attr('data-imgsrc');
				if (src) {
					img.attr('src', src);
					preview.attr('skin', $(this).attr('skin'));
				}
			}, function() {
				$(this).removeClass('selected');
			}).click(function() {// 应用当前模板颜色
				if (confirm('您确定要使用当前颜色吗？')) {
					PageUtils.setSiteTheme('', $(this).attr('skin'),
							function() {
								alert('模板颜色应用成功，转向页面设计器');
								document.location.href = '/router/member/page/designer?page='
										+ PAGEID;
							});
				}
				return false;
			});
	preview.click(function() {// 普及版颜色预览
				var theme = preview.attr('theme');
				var skin = preview.attr('skin');
				if (!theme) {
					if (!skin) {
						alert('您尚未选择主题颜色');
						return;
					} else {
						$('#page_skin').val(skin);
					}
				} else {
					$('#page_theme').val(theme);
					if (skin) {
						$('#page_skin').val(skin);
					}
				}
				$('#page_preview').attr(
						'action',
						'/router/member/page/preview/' + PAGEID + '?v='
								+ Math.random()).submit();
			});
	$('.btn-ok').hover(function() {
				$(this).removeClass('btn-ok-hover').addClass('btn-ok-hover');
			}, function() {
				$(this).removeClass('btn-ok-hover');
			});
	$('.btn-preview').click(function() {// 返利版，卖家版模板预览
				$('#page_theme').val($(this).attr('theme'));
				$('#page_preview').attr(
						'action',
						'/router/member/page/preview/' + PAGEID + '?v='
								+ Math.random()).submit();

			});
	$('.btn-apply').click(function() {// 模板应用
				if ($(this).hasClass('btn-ok-disabled')) {
					return false;
				}
				if (VERSIONNO > 1) {
					if (confirm('您确认应用此主题吗？')) {
						$('.btn-apply').addClass('btn-ok-disabled');
						PageUtils.setSiteTheme($(this).attr('theme'), '',
								function() {
									alert('主题应用成功，转向页面设计器');
									document.location.href = '/router/member/page/designer?page='
											+ PAGEID;
									$('.btn-apply')
											.removeClass('btn-ok-disabled');
								});
					}
				} else {
					$('#upgrade-info').dialog('open');
					PageUtils.loadVersionInfo(VERSIONNO, '个性化主题', 1.5);
				}
			});
});
function initPageDetailManager() {
	$('#J_TLayoutList a').click(function() {
				if ($(this).hasClass('selected')) {
					return;
				}
				if (confirm('确认使用当前布局格式吗？')) {
					updatePageSysLayout('detail', $(this).attr('layout'));
				}
			});
}
function initPageSearchManager() {
	$('#J_TLayoutList a').click(function() {
				if ($(this).hasClass('selected')) {
					return;
				}
				if (confirm('确认使用当前布局格式吗？')) {
					updatePageSysLayout('search', $(this).attr('layout'));
				}
			});
	$('#J_TSearchView').click(function() {
		var checked = $('input[type="radio"][name="searchview"]:checked');
		if (checked.length == 0) {
			alert('您尚未选择要默认显示的搜索结果样式');
			return;
		}
		var message = '列表';
		if ('grid' == checked.val()) {
			message = '大图';
		}
		var isSearchBox = $('#isSearchBox').attr('checked') ? "true" : "false";
		if (confirm('您确认使用【' + message + '】视图,【'
				+ ('true' == isSearchBox ? '显示搜索框' : '不显示搜索框') + '】吗')) {
			updatePageSearchView(checked.val(), isSearchBox);
		}
	});
}
function updatePageSearchView(view, isSearchBox) {
	var sender = new WindSender('/router/member/page/manager/search/view?v='
			+ Math.random());
	sender.load("POST", {
				view : view,
				isSearchBox : isSearchBox
			}, function(response) {
				if (response.isSuccess()) {
					alert('更换搜索结果页显示样式成功');
					document.location.href = '/router/member/page/manager/search';
				} else {
					alert(response.msg);
					return;
				}
			});
}
function updatePageSysLayout(type, layout) {
	var sender = new WindSender('/router/member/page/manager/layout/change?v='
			+ Math.random());
	sender.load("POST", {
				type : type,
				layout : layout
			}, function(response) {
				if (response.isSuccess()) {
					alert('更换布局格式成功');
					document.location.href = '/router/member/page/manager/'
							+ type;
				} else {
					alert(response.msg);
					return;
				}
			});
}
function initPageManager() {
	$('#J_ReleaseDialog').dialog({
				bgiframe : true,
				autoOpen : false,
				width : 400,
				height : 200,
				zIndex : 1000,
				modal : true
			});
	$('.J_PageDeploy').click(function() {
		$('#J_ReleaseDialog').dialog('open').dialog('option', 'pageid',
				$(this).attr('page'));
	});
	$('#J_CancelRelease').click(function() {
				$('#J_ReleaseDialog').dialog('close');
			});
	$('#J_ConfirmRelease').click(function() {
				var self = $(this);
				if (self.hasClass('btn-ok-disabled')) {
					return false;
				}
				if (confirm('您确认已经设计完此页面？确认将重新发布该页面')) {
					self.addClass('btn-ok-disabled')
					PageUtils.showMsg('正在发布中...');
					var id = $('#J_ReleaseDialog').dialog('option', 'pageid');
					if (typeof(id) == 'string') {
						PageUtils.deploy(id, 'false', function() {
									self.attr('isHeader', 'false');
									PageUtils.showMsg('发布成功...');
									self.removeClass('btn-ok-disabled');
									$('#J_ReleaseDialog').dialog('close');
								});
					} else {
						alert('未指定要发布的页面');
					}
				}
			});
	$('#page-manager-dialog').dialog({
				bgiframe : true,
				autoOpen : false,
				width : 800,
				zIndex : 1000,
				modal : true,
				open : function() {
					$('#page-manager-dialog form').jqTransform({
								imgPath : '/assets/js/jquery/jqtransform/img'
							});
				}
			});
	// 步骤滚动初始化
	var root = $("#page-manager-dialog .module-steps").scrollable();
	var api = root.scrollable();
	api.onBeforeSeek(function(event, i) {
				$("#page-manager-dialog .steps li").removeClass("current")
						.removeClass('last-current').eq(i).addClass(i == 1
								? "last-current"
								: "current");
			});
	$('#page-manager-dialog .layout-list a').click(function() {
				$('#page-manager-dialog .layout-list a')
						.removeClass('selected');
				$(this).addClass('selected');
			});
	$('#page-manager-dialog .firstStep .btn-ok').hover(function() {
				$(this).addClass('btn-ok-hover');
			}, function() {
				$(this).removeClass('btn-ok-hover');
			}).click(function() {
				if (!$('#page-title').val()) {
					alert('页面标题不能为空');
					$('#page-title').focus();
					return;
				}
				var temp = $('#page-title').val()
						.replace(/[^\x00-\xff]/g, "**");
				if (temp.length > 60) {
					alert('最多允许60个字符,30个汉字');
					$('#page-title').focus();
					return;
				}
				api.seekTo(1);
			});
	$('#page-manager-dialog .secondStep .btn-ok').hover(function() {
				$(this).addClass('btn-ok-hover');
			}, function() {
				$(this).removeClass('btn-ok-hover');
			}).click(function() {
		if ($(this).hasClass('btn-ok-disabled')) {
			return false;
		}
		var selected = $('#page-manager-dialog .layout-list a.selected');
		if (selected.length == 0) {
			alert('您尚未选择默认布局');
			return false;
		}
		$(this).addClass('btn-ok-disabled');
		PageUtils.addPage($('#page-title').val(), $('#page-cid').val(),
				$('#page-keywords').val(), $('#page-description').val(),
				selected.attr('layout'), function() {
					alert('添加页面成功');
					$(this).removeClass('btn-ok-disabled');
					document.location.href = '/router/member/page/manager';
				});
	});
	$('#J_PageAddTrigger').click(function() {
				$('#page-manager-dialog').dialog('open');
				return false;
			});
	$('#J_PageIndexSet').click(function() {
		if ($(this).hasClass('disabled')) {
			return false;
		}
		var checked = $('#J_PMTable input[name="index-set"][type="radio"]:checked');
		if (checked.length == 0) {
			alert('您尚未选择要设置为首页的自定义页面');
			$(this).removeClass('disabled');
			return false;
		}
		$(this).addClass('disabled');
		indexPageSet(checked.val());
	});
	$('#page-update-dialog').dialog({
				bgiframe : true,
				autoOpen : false,
				width : 700,
				position : 'top',
				zIndex : 1000,
				modal : true
			});
	$('.page-update-info').click(function() {
		var id = $(this).attr('pid');
		$.ajax({
			url : '/router/member/page/info/' + id + '?v=' + Math.random(),
			type : 'GET',
			data : {},
			dataType : 'html',
			beforeSend : function(xhr) {
				xhr.setRequestHeader("WindType", "AJAX");// 请求方式
				xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
			},
			error : function(request, textStatus, errorThrown) {
			},
			success : function(data) {
				$('#page-update-dialog').empty().append(data).dialog('open');
				$('#page-update-dialog form').jqTransform({
							imgPath : '/assets/js/jquery/jqtransform/img'
						});
				$('#page-update-dialog .btn-ok').hover(function() {
							$(this).addClass('btn-ok-hover');
						}, function() {
							$(this).removeClass('btn-ok-hover');
						}).click(function() {
					var self = $(this);
					if (self.hasClass('btn-ok-disabled')) {
						return;
					}
					if (!$('#page-update-title').val()) {
						alert('页面标题不能为空');
						$('#page-update-title').focus();
						return;
					}
					var temp = $('#page-update-title').val().replace(
							/[^\x00-\xff]/g, "**");
					if (temp.length > 60) {
						alert('最多允许60个字符,30个汉字');
						$('#page-update-title').focus();
						return;
					}
					$(this).addClass('btn-ok-disabled');
					updatePageInfo(id, $('#page-update-title').val(),
							$('#page-update-cid').val(),
							$('#page-update-keywords').val(),
							$('#page-update-description').val(), function() {
								alert('页面基本信息修改成功');
								document.location.href = '/router/member/page/manager';
							});
				});
			}
		});
	});
}
function indexPageSet(id) {
	var sender = new WindSender('/router/member/page/index/set?v='
			+ Math.random());
	sender.load("POST", {
				page : id
			}, function(response) {
				if (response.isSuccess()) {
					alert('首页设置成功');
					document.location.href = '/router/member/page/manager';
				} else {
					alert(response.msg);
					return;
				}
				$('#J_PageIndexSet').removeClass('disabled');
			});
}
function updatePageInfo(id, title, cid, keywords, desc, callback) {
	var sender = new WindSender('/router/member/page/update/' + id + '?v='
			+ Math.random());
	sender.load("POST", {
				page_desc : desc,
				page_keywords : keywords,
				page_title : title,
				page_cid : cid
			}, function(response) {
				if (response.isSuccess()) {
					callback();
				} else {
					alert(response.msg);
					return;
				}
				$('#page-update-dialog .btn-ok').removeClass('btn-ok-disabled');
			});
}