$(function() {
			initCats();
			$('#widget_cats').change(function() {
						$('#custome_cats_select1').val($(this).val());
						loadCats(2, $(this).val());
					});
			$('#deployWidget').button().click(function() {
						deploySearchCustomeWidget($('#widget_id').val(),
								'create');
						return false;
					});
			$('#deployUpdateWidget').button().click(function() {
						deploySearchCustomeWidget($('#cwidget_id').val(),
								'update');
						return false;
					});
			$('#moveUp').click(function() {
						var thisItem = $(this).parents('.prop-item:first');
						var list = $('.prop-list');
						if (thisItem.length == 1) {
							var prevItem = thisItem.prevAll('.prop-item:first');
							if (prevItem.length == 0) {// 如果前边没有
								list.append(thisItem);// 追加至最后
							} else {
								prevItem.before(thisItem);// 向前移动一位
							}
						}
					});
			$('#moveDown').click(function() {
						var thisItem = $(this).parents('.prop-item:first');
						var list = $('.prop-list');
						if (thisItem.length == 1) {
							var nextItem = thisItem.nextAll('.prop-item:first');
							if (nextItem.length == 0) {// 如果前边没有
								list.prepend(thisItem);// 追加至最后
							} else {
								nextItem.after(thisItem);// 向前移动一位
							}
						}
					});
		});
/**
 * 动态加载
 * 
 * @param {}
 *            wid
 * @param {}
 *            classid
 * @param {}
 *            bloglength
 */
function loadSearchCustomeWidget(wid, classid, bloglength) {
	$('#widget-customer').empty()
			.append("<div id='loading' align='left'>正在加载数据,请稍候...</div>");;
	$.ajax({
				url : '/router/member/designer/searchdesigner/widget/' + wid
						+ '?classid=' + classid + '&bloglength=' + bloglength
						+ '&v=' + Math.random(),
				type : 'GET',
				data : {},
				dataType : 'html',
				beforeSend : function(xhr) {
					xhr.setRequestHeader("WindType", "AJAX");// 请求方式
					xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
				},
				error : function(request, textStatus, errorThrown) {
					$("#loading").remove();
					alert(textStatus);
				},
				success : function(data) {
					$("#loading").remove();
					$('#widget-customer').empty().append(data);
				}
			});
}
function deploySearchCustomeWidget(wid, type) {
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
	if ($('#widget-customer .prop-item').length == 0) {
		alert('尚未选择分类生成的属性值查询');
		return false;
	}
	var clone = $('#widget-customer').clone();
	$('.prop-item li a', clone).removeClass('selected');// 移除所有选中项属性值
	$('.searchCustome input[name="words"]', clone).val('');// 清空关键词
	$('.searchCustome input[name="q"]', clone).val('');// 清空隐藏关键词
	$('.searchCustome input[name="props"]', clone).val('');// 清空属性值
	$('.selected-attr dd', clone).remove();// 清空已选中属性值
	$('body').append($('#upDown'));// 移出向上向下
	$('.selected-attr', clone).hide();// 隐藏选中列表区
	$('.moreValue', clone).hide();// 隐藏所有应该隐藏的属性值
	$('.prop-item:gt(3)', clone).hide();// 隐藏所有应该隐藏的属性
	$('dd a.more', clone).removeClass('open').addClass('close').text('更多');// 还原属性值更多按钮【样式还原,文字还原】
	$('.J_PropToggler a', clone).removeClass('open').addClass('close');// 还原属性更多按钮【样式还原】
	$('.J_PropToggler a span', clone).text('更多');// // 还原属性更多按钮【文字还原】
	var content = clone.html();
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
					alert(('create' == type ? "新增" : "修改") + "属性搜索组件成功");
					if ('create' == type) {
						document.location.href = '/router/member/designer/searchdesigner/update/'
								+ response.body.id;
					}
					$('#deployUpdateWidget').button('enable');
				} else {
					alert(response.msg);
				}
			});

}

function loadCats(select, pcid) {
	if (!pcid || pcid.length == 0) {
		pcid = "0";
	}
	if (!select) {
		select = 1;
	}
	$('#custome_cats_select' + select).empty()
			.append('<option value=""></option>');
	var sender = new WindSender("/router/member/designer/custome/cats/" + pcid);
	sender.load("GET", {}, function(response) {
		if (response.isSuccess()) {
			var cats = response.body;
			if (cats.length > 0) {
				for (var i = 0; i < cats.length; i++) {
					var cat = cats[i];
					var option = '<option p="' + cat.isParent + '" value="'
							+ cat.cid + '">' + cat.name + '</option>';
					$('#custome_cats_select' + select).append(option);
				}
				if (select < 4) {// 前三个select 触发change事件
					$('#custome_cats_select' + select).unbind('change').change(
							function() {
								if ($(this).val() != '') {// 如果非空
									var selected = $('#custome_cats_select'
											+ select + ' option:selected');
									if ('true' == selected.attr('p')) {
										loadCats(select + 1, $(this).val());
									}
									for (var j = select + 1; j <= 4; j++) {// 清空后续类目
										$('#custome_cats_select' + j)
												.empty()
												.append('<option value=""></option>');
									}
								}
								if (select == 1) {
									$('#widget_cats').val($(this).val());
								}
							});
				}
			}

		} else {
			alert(response.msg);
		}
	});
}
/**
 * 初始化类目推广
 */
function initCats() {
	loadCats();
	$('#custome_cats_confirm').button().click(function() {
		var s4 = $('#custome_cats_select4').val();
		var s3 = $('#custome_cats_select3').val();
		var s2 = $('#custome_cats_select2').val();
		var s1 = $('#custome_cats_select1').val();
		var s;
		if (s1 && s1.length > 0) {
			s = $('#custome_cats_select1 option:selected');
		}
		if (s2 && s2.length > 0) {
			s = $('#custome_cats_select2 option:selected');
		}
		if (s3 && s3.length > 0) {
			s = $('#custome_cats_select3 option:selected');
		}
		if (s4 && s4.length > 0) {
			s = $('#custome_cats_select4 option:selected');
		}
		if ('true' == s.attr('p')) {
			alert('您当前选择的不是叶子类目，请继续选择子类目！');
			return;
		}
		getHtmlContent('widget-customer',
				'/router/member/designer/searchdesigner/cat/' + s.val(), 'GET',
				{
					template : $('#widget_template').val()
				}, function(data) {
					$('#widget-customer').append(data);
					initSearchWidget();
					$('.prop-list .prop-item').hover(function() {
								$(this).append($('#upDown').show());
							}, function() {
								$('body').append($('#upDown').hide());
							});
				});
	});
}
