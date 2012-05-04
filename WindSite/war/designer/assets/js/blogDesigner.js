$(function() {
			$('#classes').change(function() {
				var classid = $(this).val();
				if (classid != '0') {
					var bloglength = $('#bloglength').val();
					if (bloglength == '0') {
						bloglength = 5;
						$('#bloglength').val('5');
					}
					loadBlogCustomeWidget($('#widget_id').val(), classid,
							bloglength);
				}
			});
			$('#bloglength').change(function() {
				var bloglength = $(this).val();
				if (bloglength != '0') {
					var classid = $('#classes').val();
					if (classid == '0') {
						alert('您尚未选择家园日志分类');
						return;
					}
					loadBlogCustomeWidget($('#widget_id').val(), classid,
							bloglength);
				}
			});
			$('#deployWidget').button().click(function() {
						deployBlogCustomeWidget($('#widget_id').val(), 'create');
						return false;
					});
			$('#deployUpdateWidget').button().click(function() {
						deployBlogCustomeWidget($('#cwidget_id').val(),
								'update');
						return false;
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
function loadBlogCustomeWidget(wid, classid, bloglength) {
	$('#widget-customer').empty()
			.append("<div id='loading' align='left'>正在加载数据,请稍候...</div>");;
	$.ajax({
				url : '/router/member/designer/blogdesigner/widget/' + wid
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
function deployBlogCustomeWidget(wid, type) {
	var cid = $('#widget_cats').val();
	var title = $('#widget_title').val();
	var friend = $('input[type="radio"][name="friendRadio"]:checked').val();
	var description = $('#widget_description').val();
	var classid = $('#classes').val();
	var bloglength = $('#bloglength').val();
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
	if (!classid || classid == '' || classid == '0') {
		alert('您尚未选择家园日志分类列表');
		return false;
	}
	if (!bloglength || bloglength == '' || bloglength == '0') {
		alert('您尚未选择日志显示数量');
		return false;
	}
	if ($('#widget-customer .a-s').length == 0) {
		alert('当前分类下没有文章可以显示,您登录新淘家园为该分类发布文章');
		return false;
	}
	if (description && description.length > 200) {
		alert('组件描述不能超过200');
		return false;
	}
	$('#deployWidget,#deployUpdateWidget').button('disable');
	var sender = new WindSender("/router/member/designer/blogdesigner/widget/"
			+ type + "/" + wid);
	sender.load("POST", {
				"title" : title,
				"cid" : cid,
				"friend" : friend,
				"color" : color,
				"desc" : description,
				"classid" : classid,
				"bloglength" : bloglength
			}, function(response) {
				if (response.isSuccess()) {
					alert(('create' == type ? "新增" : "修改") + "自定义组件成功");
					if ('create' == type) {
						document.location.href = '/router/member/designer/blogdesigner/update/'
								+ response.body.id;
					}
					$('#deployUpdateWidget').button('enable');
				} else {
					alert(response.msg);
				}
			});

}
