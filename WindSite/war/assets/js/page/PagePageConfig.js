var PagePageConfig = {
	initCommonPageConfig : function(func) {
		$.ajax({
			url : '/router/member/page/config/page?v=' + Math.random(),
			type : 'GET',
			data : {
				layout : $('#page-module-editor').pageModuleEditor('option',
						'layout')
			},
			dataType : 'html',
			beforeSend : function(xhr) {
				xhr.setRequestHeader("WindType", "AJAX");// 请求方式
				xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
			},
			error : function(request, textStatus, errorThrown) {
				alert('网络错误:' + textStatus);
				return;
			},
			success : function(data) {
				$('#module-content').empty().append(data);
				if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
					var options = MODULE['page'
							+ PageModuleUtils
									.getModuleName(MODULE.attr('name'))]('option');
					if (options.pages) {
						var pages = options.pages.split(',');
						for (var i = 0; i < pages.length; i++) {
							$('#page-module-editor input[name="pages-checkbox"][value="'
									+ pages[i] + '"]').attr('checked', true);
						}
					}
				}
				$('#page-module-editor input[name="pages-checkbox"]').change(
						function() {
							if ($('#page-module-editor input[name="pages-checkbox"]:checked').length > 20) {
								alert('您只能选择20个页面');
								$(this).attr('checked', false);
								return;
							}
						});
				if (func && typeof(func) == 'function') {
					func();
				}
			}
		});
		return true;
	},
	validateCommonPageConfig : function(func) {
		var pages = $('#page-module-editor input[name="pages-checkbox"]:checked');
		if (pages.length == 0) {
			alert('您尚未选择要显示的页面推广');
			return false;
		}
		return true;
	},
	createCommonPageParams : function() {
		var params = {};
		params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
		params.adType = 'page';// 推广类型
		var pages = [];
		$('#page-module-editor input[name="pages-checkbox"]:checked').each(
				function() {
					pages.push($(this).val());
				});
		params.pages = pages.join(',');
		return params;
	}
};