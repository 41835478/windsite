var PageB2CMallListConfig = {
	initCommonB2CMallListConfig : function(func) {
		$.ajax({
			url : '/router/member/page/config/b2cMallList?v=' + Math.random(),
			type : 'GET',
			data : {
				module : $('#page-module-editor').pageModuleEditor('option',
						'module')
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
					if (options.cats) {// 根分类
						var cats = options.cats.split(',');
						for (var i = 0; i < cats.length; i++) {
							$('#module-content input[type="checkbox"][name="mall-cat"][value="'
									+ cats[i] + '"]').attr('checked', true);
						}
					}
					if (options.color) {// 颜色
						$('#module-content input[type="radio"][name="dianpu-color"][value="'
								+ options.color + '"]').attr('checked', true);
					}
				}
				$('#module-content input[type="checkbox"][name="mall-cat"]')
						.change(function() {
							var checkeds = $('#module-content input[type="checkbox"][name="mall-cat"]:checked');
							if (checkeds.length > 5) {
								alert('您只能选择5个返利商城分类');
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
	validateCommonB2CMallListConfig : function(func) {
		var checkeds = $('#module-content input[type="checkbox"][name="mall-cat"]:checked');
		if (checkeds.length == 0) {
			alert('您尚未选择返利商城分类');
			return false;
		}
		if (checkeds.length != 5) {
			alert('您必须选择5个返利商城分类');
			return false;
		}
		return true;
	},
	createCommonB2CMallListParams : function() {
		var params = {};
		params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
		var cats = [];
		$('#module-content input[type="checkbox"][name="mall-cat"]:checked')
				.each(function() {
							cats.push($(this).val());
						});
		params.adType = 'mall';
		params.cats = cats.join(',');
		params.color = $('#module-content input[type="radio"][name="dianpu-color"]:checked')
				.val();
		return params;
	}
};