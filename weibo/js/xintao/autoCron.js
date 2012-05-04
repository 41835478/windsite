$(function() {
	$.get('/admin.php?m=mgr/xintao/autoCron.checkComet');
	$('a.insert_sys').click(function() {
				var textarea = $(this).parents('td:first').find('textarea');
				textarea.insertAtCaret($(this).text());
				checkText(textarea);
				return false;
			});
	var isOperate = false;
	$('.autocron-area').each(function() {
				$(this).keyup(function() {
							checkText($(this));
						}).keyup();
			})
	$('a.submitBtn').click(function() {
				if (isOperate) {
					return false;
				}
				var template = $(this).parents('td:first').find('textarea');
				if (!checkText(template)) {
					return false;
				}
				var self = $(this);
				isOperate = true;
				$.ajax({
							type : 'GET',
							url : '/admin.php?m=mgr/xintao/autoCron.updateTemplate',
							dataType : 'json',
							data : {
								'id' : $(this).attr('data-id'),
								'template' : (template.val())
							},
							success : function(data) {
								if (data.errno > 0) {
									alert('操作失败');
								} else {
									alert(data.rst);
								}
								isOperate = false;
							}
						});
				return false;
			});
	$('a.cron-operate').click(function() {
				if (isOperate) {
					return false;
				}
				var self = $(this);
				isOperate = true;
				$.ajax({
							type : 'GET',
							url : '/admin.php?m=mgr/xintao/autoCron.setIsValid',
							dataType : 'json',
							data : {
								'id' : $(this).attr('data-id'),
								'isValid' : ($(this).text() == '启用' ? 1 : 0)
							},
							success : function(data) {
								if (data.errno > 0) {
									alert('操作失败');
								} else {
									if (data.rst == 'start') {// 启用
										alert('启用成功');
										self.text('停止');
									} else {// 停止
										alert('停止成功');
										self.text('启用');
									}
								}
								isOperate = false;
							}
						});
				return false;
			});
});

function checkText(textarea) {
	var v = $.trim(textarea.val());
	var left = Xwb.util.calWbText(v, 100);
	var warn = textarea.parents('td').find('.xwb_word_cal');
	if (left >= 0)
		warn.removeClass('out140').html('您还可以输入<span>' + left + '</span>字');
	else {
		warn.addClass('out140').html('已超出<span>' + (-left) + '</span>字');
	}
	return left >= 0 && v;
}