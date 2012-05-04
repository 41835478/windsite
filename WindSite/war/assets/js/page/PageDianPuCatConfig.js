var PageDianPuCatConfig = {
	initCommonDianPuCatConfig : function(func) {
		$('#module-content').load(
				'/assets/js/page/module/CommonDianPuCatConfig.html?v='
						+ Math.random(), function() {
					if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
						var options = MODULE['page'
								+ PageModuleUtils.getModuleName(MODULE
										.attr('name'))]('option');
						if (options.cats) {// 根分类
							var cats = options.cats.split(',');
							for (var i = 0; i < cats.length; i++) {
								$('#module-content input[type="checkbox"][name="dianpu-cat"][value="'
										+ cats[i] + '"]').attr('checked', true);
							}
						}
					}
					$('#module-content input[type="checkbox"][name="dianpu-cat"]')
							.change(function() {
								var checkeds = $('#module-content input[type="checkbox"][name="dianpu-cat"]:checked');
								if (checkeds.length > 13) {
									alert('您只能选择13个淘店铺分类');
									$(this).attr('checked', false);
									return;
								}
							});
					if (func && typeof(func) == 'function') {
						func();
					}
				});
		return true;
	},
	validateCommonDianPuCatConfig : function(func) {
		var checkeds = $('#module-content input[type="checkbox"][name="dianpu-cat"]:checked');
		if (checkeds.length == 0) {
			alert('您尚未选择淘店铺分类');
			return false;
		}
		if (checkeds.length > 13) {
			alert('您最多可以选择13个淘店铺分类');
			return false;
		}
		return true;
	},
	createCommonDianPuCatParams : function() {
		var params = {};
		params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
		var cats = [];
		$('#module-content input[type="checkbox"][name="dianpu-cat"]:checked')
				.each(function() {
							cats.push($(this).val());
						});
		params.cats = cats.join(',');
		return params;
	}
};