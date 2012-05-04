$(function() {
	$('#page-templates-template').click(function() {
				$('#bd .page-templates-content').hide();
				$('#page-templates-div').show();
			});
	$('#page-templates-layout').click(function() {
				$('#bd .page-templates-content').hide();
				$('#page-layout-div').show();
			});
	$('#bd .layout-list a').click(function() {
				$('#bd .layout-list a').removeClass('selected');
				$(this).addClass('selected');
			});
	var root = $("#content").scrollable({
				items : '#bd'
			});
	var api = root.scrollable();
	api.onBeforeSeek(function(event, i) {
				$("#content .step li").removeClass("current")
						.removeClass('last-current').eq(i).addClass(i == 1
								? "last-current"
								: "current");
			});
	if (typeof(PAGEID) != 'undefined' && PAGEID) {
		api.seekTo(1);// 如果是修改，直接定向至页面模板
	}
	$('#bd #secondStepButton').hover(function() {
				$(this).addClass('btn-ok-hover');
			}, function() {
				$(this).removeClass('btn-ok-hover');
			}).click(function() {
		var selected = $('#bd .layout-list a.selected');
		if (selected.length == 0) {
			alert('您尚未选择默认布局');
			return false;
		}
		$(this).addClass('btn-ok-disabled');
		PageUtils.addPage($('#modifyTemplateName').val(),
				$('#modifyTemplateCid').val(), $('#modifyTemplateKeyWords')
						.val(), $('#modifyTemplateDesc').val(), selected
						.attr('layout'), function(id) {
					alert('添加页面成功，转向页面设计器');
					$(this).removeClass('btn-ok-disabled');
					document.location.href = '/router/member/page/designer?page='
							+ id;
				}, ISINDEX);
	});
	$('#bd #firstStepButton').hover(function() {
				$(this).addClass('btn-ok-hover');
			}, function() {
				$(this).removeClass('btn-ok-hover');
			}).click(function() {
		var title = $('#modifyTemplateName').val();
		if (!title) {
			alert('您尚未填写页面标题');
			api.seekTo(0);
			$('#modifyTemplateName').focus();
			return false;
		}
		var temp = $('#modifyTemplateName').val()
				.replace(/[^\x00-\xff]/g, "**");
		if (temp.length > 60) {
			alert('标题最多允许60个字符,30个汉字');
			api.seekTo(0);
			$('#modifyTemplateName').focus();
			return false;
		}
		var keywords = $('#modifyTemplateKeyWords').val();
		if (keywords) {
			temp = keywords.replace(/[^\x00-\xff]/g, "**");
			if (temp.length > 160) {
				alert('关键词最多允许160个字符,80个汉字');
				api.seekTo(0);
				$('#modifyTemplateKeyWords').focus();
				return false;
			}
		}
		var desc = $('#modifyTemplateDesc').val();
		if (desc) {
			temp = desc.replace(/[^\x00-\xff]/g, "**");
			if (temp.length > 300) {
				alert('描述最多允许300个字符,150个汉字');
				api.seekTo(0);
				$('#modifyTemplateDesc').focus();
				return false;
			}
		}
		api.seekTo(1);
	});
	// $('.btn-preview').click(function() {// 返利版，卖家版模板预览
	// $('#page_preview').attr(
	// 'action',
	// '/router/member/page/preview/template/'
	// + $(this).attr('template') + '?v='
	// + Math.random()).submit();
	//
	// });
	$('#bd .page-templates-version').click(function() {
				var t = $(this).attr('t');
				if ('0' == t) {
					$('#page-templates li').fadeIn();
				} else {
					$('#page-templates li').each(function() {
								if (parseFloat(t) >= parseFloat($(this)
										.attr('t'))) {
									$(this).fadeIn();
								} else {
									$(this).fadeOut();
								}
							});
				}
			});
	$('.btn-apply').click(function() {// 模板应用
				if ($(this).hasClass('btn-ok-disabled')) {
					return false;
				}
				if (VERSIONNO >= $(this).attr('version')) {
					if (ISINDEX) {
						if (confirm('您确认应用此模板吗？')) {
							$('.btn-apply').addClass('btn-ok-disabled');
							PageUtils.addPageByTemplate($(this)
											.attr('template'), true,
									$('#modifyTemplateName').val(),
									$('#modifyTemplateCid').val(),
									$('#modifyTemplateKeyWords').val(),
									$('#modifyTemplateDesc').val(),
									function(id) {
										alert('模板应用成功，转向页面设计器');
										document.location.href = '/router/member/page/designer?page='
												+ id;
										$('.btn-apply')
												.removeClass('btn-ok-disabled');
									}, function() {
										$('.btn-apply')
												.removeClass('btn-ok-disabled');
									});
						}
					} else {
						if (typeof(PAGEID) != 'undefined' && PAGEID) {// 根据模板修改指定页面
							if (confirm('您确认应用此模板？应用后该页面将使用此模板的布局及模块，之前设计的布局，模块将全部移除！')) {
								PageUtils.updatePageByTemplate($(this)
												.attr('template'), function() {
											alert('模板应用成功，转向页面设计器');
											document.location.href = '/router/member/page/designer?page='
													+ PAGEID;
											$('.btn-apply')
													.removeClass('btn-ok-disabled');
										}, function() {
											$('.btn-apply')
													.removeClass('btn-ok-disabled');
										});
							}
						} else {// 根据模板新增页面
							if (confirm('您确认应用此模板吗？')) {
								$('.btn-apply').addClass('btn-ok-disabled');
								PageUtils.addPageByTemplate($(this)
												.attr('template'), false,
										$('#modifyTemplateName').val(),
										$('#modifyTemplateCid').val(),
										$('#modifyTemplateKeyWords').val(),
										$('#modifyTemplateDesc').val(),
										function(id) {
											alert('模板应用成功，转向页面设计器');
											document.location.href = '/router/member/page/designer?page='
													+ id;
											$('.btn-apply')
													.removeClass('btn-ok-disabled');
										}, function() {
											$('.btn-apply')
													.removeClass('btn-ok-disabled');
										});
							}
						}
					}
				} else {
					PageUtils.loadVersionInfo(VERSIONNO, '高级页面模板', $(this)
									.attr('version'));
				}
			});
});