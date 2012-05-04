function openGuideDialog(idStr, url) {
	var id = '#' + idStr;
	if ($(id).length == 0) {
		$('body').append('<div id="' + idStr
				+ '" class="guide-dialog" style="display:none;"></div>');
		$(id).load(url + '?v=' + Math.random(), function() {
					initGuideDialog(id);
				});
	} else {
		$(id).dialog('open');
	}
}
function initGuideDialog(id) {
	$(id).dialog({
				bgiframe : true,
				width : 700,
				top : 100,
				autoOpen : false,
				zIndex : 100000,
				modal : true
			}).dialog('open');
	$(id + ' .guide-button-next').click(function() {
		if ('关闭' == $(this).val()) {
			$(id).dialog('close');
		} else {
			var current = $(id + ' .steps .step:visible');
			var next = current.next('.step');
			if (next.length == 1) {
				current.hide();
				next.show();
			}
			var index = next.index();
			var stepLis = $(id + ' ol.step li');
			stepLis.each(function() {
						$(this).removeClass('current')
								.removeClass('last-current');
						if ($(this).index() == index) {
							$(this).addClass(((index == stepLis.length - 1)
									? 'last-current'
									: 'current'));
						}
					});
			next = next.next('.step');
			if (next.length == 0) {
				$(this).val('关闭');
			}
			$(id + ' .guide-button-prev').removeClass('guide-button-disable');
		}
	});
	$(id + ' .guide-button-prev').click(function() {
		if ($(this).hasClass('guide-button-disable')) {
			return;
		}
		var current = $(id + ' .steps .step:visible');
		var prev = current.prev('.step');
		if (prev.hasClass('step')) {
			current.hide();
			prev.show();
			$(id + ' .guide-button-next').val('下一步');
		}
		var index = prev.index();
		var stepLis = $(id + ' ol.step li');
		stepLis.each(function() {
					$(this).removeClass('current').removeClass('last-current');
					if ($(this).index() == index) {
						$(this).addClass(((index == stepLis.length - 1)
								? 'last-current'
								: 'current'));
					}
				});
		prev = prev.prev('.step');
		if (prev.length == 0) {
			$(this).addClass('guide-button-disable');
		}
	});
}
/**
 * 帮助按钮
 * 
 * @return {Boolean}
 */
function gtGuide() {
	return false;
}
/**
 * 站点基本信息-点击修改基本信息
 */
function gtChangeSiteUpdate() {
	$('#siteProfile').hide();
	$('#updateSiteTable').show();
}
/**
 * 站点基本信息-取消修改基本信息
 */
function gtCancelSite() {
	$('.gt-border').remove();
	$('#siteProfile').show();
	$('#updateSiteTable').hide();
}
/**
 * 站点基本信息-修改基本信息
 */
function gtUpdateSite() {

	alert("更新站点成功");
	document.location.href = "/router/member/sitemanager/profile";
}
/**
 * 我的推广组-新增推广组
 */
function gtCreateGroupDialog() {
	$('#dialog').remove();
	$("body")
			.append("<div id='dialog' title='新增推广组'><p id='validateTips'>推广组名称不能为空.</p><br/><form><label for='groupName'>推广组名称:</label><input type='text' name='groupName' id='groupName' size=30 value=''/></form></div>");
	$("#dialog").dialog({
				bgiframe : true,
				autoOpen : false,
				height : 200,
				width : 400,
				modal : true,
				buttons : {
					'取消' : function() {
						$(this).dialog('close');
					},
					'确定' : function() {
						var groupName = $("#groupName").val();
						if (groupName) {
							if (groupName.length > 10) {
								alert("推广组名称长度不能超过10");
								return;
							}
							createItemGroup(groupName);
						} else {
							alert("推广组名称不能为空");
						}
					}
				}
			});
	$("#dialog").dialog('open');
}
function gtAddTemplate() {
	var name = $('#addTemplateName').val();
	if (!name) {
		alert("模板标题不能为空！");
		return;
	}
	if (name.length > 50) {
		alert("模板标题长度不能超过50");
		return;
	}
	var desc = $('#addTemplateDesc').val();
	if (desc) {
		if (desc.length > 150) {
			alert("模板简介长度不能超过150");
			return;
		}
	}
	var metadata = $('#addTemplateKeyWords').val();
	if (metadata) {
		if (metadata.length > 80) {
			alert("模板关键词长度不能超过80");
			return;
		}
	}
	addTemplate(name, desc, metadata, $('#addTemplateCid').val());
	$('#addTemplateDialog').dialog('close');
}
function gtOpenAddTemplateDialog() {
	var dialog = $('#addTemplateDialog');
	dialog.dialog({
				bgiframe : true,
				autoOpen : false,
				height : 300,
				width : 400,
				zIndex : 100000,
				modal : true
			});
	$('#add-template-confirm').button().click(function() {
				gtAddTemplate();
			});
	dialog.dialog('open');
	$("#addTemplateDialog :input").tooltip({
				position : "center right",
				offset : [-2, 10],
				effect : "fade",
				opacity : 0.7
			});
}
function openAddTemplateDialog() {
	if ($('#addTemplateDialog').length == 1) {
		$('#addTemplateDialog').remove();
	}
	var dialog = $('<div id="addTemplateDialog" title="添加新的页面设计"></div>');
	$('body').append(dialog);
	dialog.load('/router/member/template/add/view', function() {
				gtOpenAddTemplateDialog();
			});
}