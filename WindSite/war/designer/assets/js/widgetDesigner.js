var isCustomeEditor = true;
var expose = null;
var editingCustomeEditor = null;// 当前自定义组件编辑
$(function() {
			$('#customeWidgetDialog').customeWidgetEditor({
						mode : 'custome'
					});// 自定义组件编辑器
			$('body').hover(function() {
					}, function() {
						$('#custome-bar,.custome-bar-border').remove();
					});
			$('#previewCommission').button().click(function() {
						if ('显示佣金' == $(this).button('option', 'label')) {
							$('#custome-bar,.custome-bar-border').remove();
							previewCommission($('#widget-customer'));
							$(this).button('option', 'label', '不显示佣金');
							isCustomeEditor = false;
						} else {
							$('.c-c').remove();
							$(this).button('option', 'label', '显示佣金');
							isCustomeEditor = true;
						}
					});
			$('#deployWidget').button().click(function() {
						deployCustomeWidget($('#widget_id').val(), 'create');
						return false;
					});
			$('#deployUpdateWidget').button().click(function() {
						deployCustomeWidget($('#cwidget_id').val(), 'update');
						return false;
					});

		});
function deployCustomeWidget(wid, type) {
	$('#custome-bar,.custome-bar-border,.c-c').remove();
	var cid = $('#widget_cats').val();
	var title = $('#widget_title').val();
	var friend = $('input[type="radio"][name="friendRadio"]:checked').val();
	var description = $('#widget_description').val();
	var color = 0;
	if (cid == '-1') {
		alert('组件所属类目不能为空!');
		return false;
	}
	if (!title || title.length == 0) {
		alert('组件名称不能为空!');
		return false;
	}
	if (title.length > 30) {
		alert('组件名称长度不能超过30');
		return false;
	}
	if (description && description.length > 200) {
		alert('组件描述不能超过200');
		return false;
	}
	if (validateCustomeWidget()) {
		var cwClone = $('#widget-customer').clone();
		var content = '';
		try {
			$('a', cwClone).each(function() {// 替换所有PID
						var href = $(this).attr('href');
						href = href.replace('http://www.xintaonet.com', '');// 移除新淘网默认网址
						$(this).attr('href', href);
						var onclick = $(this).attr('onClick');
						if (onclick && onclick != '') {
							$(this)
									.attr(
											'onClick',
											onclick
													.toString()
													.replace(
															/^function (anonymous|onclick)\(\)\n\{\n(.*)\n\}$/m,
															'$2'));
						}
					});
			$('img', cwClone).each(function() {// 移除所有图片样式
						$(this).removeAttr('style');
					});
			content = cwClone.html();
		} catch (e) {
			alert(e);
			return false;
		}
		$('#deployWidget,#deployUpdateWidget').button('disable');
		var sender = new WindSender("/router/member/widget/" + type + "/" + wid);
		sender.load("POST", {
					"title" : title,
					"cid" : cid,
					"friend" : friend,
					"color" : color,
					"desc" : description,
					"content" : content
				}, function(response) {
					if (response.isSuccess()) {
						alert(('create' == type ? "新增" : "修改") + "自定义组件成功");
						if ('create' == type) {
							document.location.href = '/router/member/designer/widgetdesigner/update/'
									+ response.body.id;
						}
						$('#deployUpdateWidget').button('enable');
					} else {
						alert(response.msg);
					}
				});
	}
}

function validateCustomeWidget() {
	var validate = true;
	$('.a-s,.l-a-s,.l-a-s-p,.d-a-i,.l-d-a-i,.l-d-a-i-p').each(function() {
		var self = $(this);
		$('span', $(this)).each(function() {
					if ('标题' == $(this).text()) {
						alert('当前组件还有未配置好的标题属性');
						self.expose({
									color : '#456',
									onBeforeLoad : function() {
										self.css('background', '#FFFFFF');
									},
									onBeforeClose : function() {
										self.css('background', 'none');
									}
								});
						validate = false;
						return false;
					} else {
						return true;
					}
				});
		$('img', $(this)).each(function() {
					if ('/assets/min/images/nopicture.gif' == $(this)
							.attr('src')) {
						alert('当前组件还有未配置好的图片属性');
						self.expose({
									color : '#456',
									onBeforeLoad : function() {
										self.css('background', '#FFFFFF');
									},
									onBeforeClose : function() {
										self.css('background', 'none');
									}
								});
						validate = false;
						return false;
					} else {
						return true;
					}

				});
		return validate;
	});
	return validate;
}

function addWidgetAttr() {
	if (editingCustomeEditor != null) {
		var edit = editingCustomeEditor.clone();
		var l, a, s, d, i, p, ta, ts;
		var title = '标题', alt = '标题', clickurl = '#', picurl = '/assets/min/images/nopicture.gif', price = '0', tclickurl = '#';
		edit.toggleClass('pair').removeAttr('co').removeAttr('cr');
		if (edit.hasClass('a-s')) {
			a = edit;
			s = a.find('span');
			a.attr('href', clickurl);
			a.attr('title', alt);
			s.text(title);
		} else if (edit.hasClass('l-a-s')) {
			a = edit.find('a');
			s = a.find('span');
			a.attr('href', clickurl);
			a.attr('title', alt);
			s.text(title);
		} else if (edit.hasClass('l-a-s-p')) {
			a = edit.find('a');
			s = a.find('span');
			p = edit.find('.price');
			a.attr('href', clickurl);
			a.attr('title', alt);
			s.text(title);
			p.text(price);
		} else if (edit.hasClass('d-a-i')) {
			a = edit.find('a');
			i = a.find('img');
			a.attr('href', clickurl);
			i.attr('alt', alt);
			i.attr('title', alt);
			i.attr('src', picurl);
			ta = edit.find('.title');
			if (ta.length > 0) {
				ta.attr('href', tclickurl);
				ta.attr('title', alt);
				ts = ta.find('span');
				ts.text(title);
			}
		} else if (edit.hasClass('l-d-a-i')) {
			a = edit.find('div a');
			i = a.find('img');
			a.attr('href', clickurl);
			i.attr('alt', alt);
			i.attr('title', alt);
			i.attr('src', picurl);
			ta = edit.find('.title');
			if (ta.length > 0) {
				ta.attr('href', tclickurl);
				ta.attr('title', alt);
				ts = ta.find('span');
				ts.text(title);
			}
		} else if (edit.hasClass('l-d-a-i-p')) {
			a = edit.find('div a');
			i = a.find('img');
			p = edit.find('.price');
			a.attr('href', clickurl);
			i.attr('alt', alt);
			i.attr('title', alt);
			i.attr('src', picurl);
			p.text(price);
			ta = edit.find('.title');
			if (ta.length > 0) {
				ta.attr('href', tclickurl);
				ta.attr('title', alt);
				ts = ta.find('span');
				ts.text(title);
			}
		}
		edit.unbind('hover').hover(function() {
					widgetAttrhover($(this));
				}, function() {
					// $('#custome-bar,.custome-bar-border').remove();
				});
		return edit;
	}
}
function initDesignerWidget() {
	$('.l-a-s,.l-a-s-p,.l-d-a-i,.l-d-a-i-p').parent().sortable({
				start : function() {
					$('#custome-bar,.custome-bar-border').remove();
					isCustomeEditor = false;
				},
				stop : function() {
					isCustomeEditor = true;
					refreshCustomeWidget($(this));
				}
			});
	$('.a-s,.l-a-s,.l-a-s-p,.d-a-i,.l-d-a-i,.l-d-a-i-p').hover(function() {
				widgetAttrhover($(this));
			}, function() {
				// $('#custome-bar,.custome-bar-border').remove();
			});
}
/**
 * 刷新整个组件
 * 
 * @param {}
 *            widget
 */
function refreshCustomeWidget(widget) {
	var isNum = widget.hasClass('custome-num') ? true : false;
	var count = 1;
	widget.children().each(function() {
				if (isNum) {
					var num = $('.num', this);
					num.text(count);
					num.removeClass('numhighlight')
					if (count <= 3) {
						num.addClass('numhighlight');
					}
				}
				$(this).removeClass('pair');
				if (count % 2 == 0) {
					$(this).addClass('pair');
				}
				count++;
			});
}
function widgetAttrhover(attr) {
	if (!isCustomeEditor) {
		return;
	}
	$('#custome-bar,.custome-bar-border').remove();
	var top = attr.offset().top;
	var left = attr.offset().left;
	var height = attr.height();
	var width = attr.width();
	var isEditor = false;// 是否是可编辑组件
	var isHighLightEditor = false;// 是否显示高亮按钮
	var isHighLight = false;// 沒有高亮
	var parent = attr.parent();
	if (parent.hasClass('custome-edit')) {
		isEditor = true;
	}
	if (parent.hasClass('custome-highlight')) {
		isHighLightEditor = true;
		isHightLight = attr.hasClass('highlight') ? true : false;
	}
	editingCustomeEditor = attr;
	$('body')
			.append('<div id="custome-bar"><a id="custome-bar-modify" href="#">编辑</a>'
					+ (isEditor
							? ('&nbsp;&nbsp;<a id="custome-bar-add" href="#">新增</a>&nbsp;&nbsp;<a id="custome-bar-delete" href="#">删除</a>')
							: '')
					+ (isHighLightEditor
							? ('&nbsp;&nbsp;<a id="custome-bar-highlight" href="#">'
									+ (isHightLight ? '取消高亮' : '标记为高亮') + '</a>')
							: '') + '</div>');
	// 编辑
	$('#custome-bar-modify').unbind('click').click(function() {
				$('#custome-bar,.custome-bar-border').remove();
				$('#customeWidgetDialog').dialog('open');
				return false;
			});
	// 新增
	$('#custome-bar-add').unbind('click').click(function() {
				$('#custome-bar,.custome-bar-border').remove();
				var edit = addWidgetAttr();
				editingCustomeEditor.after(edit);
				refreshCustomeWidget(editingCustomeEditor.parent());
				return false;
			});
	// 删除
	$('#custome-bar-delete').unbind('click').click(function() {
				$('#custome-bar,.custome-bar-border').remove();
				confirm('您确认删除此项吗？', function(r) {
							if (r) {
								var parent = editingCustomeEditor.parent();
								editingCustomeEditor.remove();
								refreshCustomeWidget(parent);
							}
						});

				return false;
			});
	$('#custome-bar-highlight').unbind('click').click(function() {
				editingCustomeEditor.toggleClass('highlight');
			});
	$('body')
			.append('<div class="custome-bar-border" style="left:'
					+ left
					+ 'px;top:'
					+ top
					+ 'px;width:1px;height:'
					+ (height)
					+ 'px;"></div><div class="custome-bar-border" style="width:1px;left:'
					+ (left + width)
					+ 'px;top:'
					+ top
					+ 'px;height:'
					+ (height)
					+ 'px;"></div><div class="custome-bar-border" style="height:1px;left:'
					+ left
					+ 'px;top:'
					+ top
					+ 'px;height:1px;width:'
					+ (width)
					+ 'px;"></div><div class="custome-bar-border" style="height:1px;left:'
					+ left + 'px;top:' + (top + height) + 'px;width:' + (width)
					+ 'px;"></div>');
	$('#custome-bar').css({
				top : top - 20,
				left : left
			});
}
