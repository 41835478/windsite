/**
 * 页头浮动分类
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopTabNav", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'false'
					// 默认显示标题栏
				},
				_initModule : function() {
					PageModuleUtils.initShopTabNav(this.element);
				}
			});
})(jQuery);

/**
 * 初始化模块内容编辑页面
 */
function initShopTabNavModuleConfig(func) {
	$('#module-content').load(
			'/assets/js/page/module/ShopTabNavConfig.html?v=' + Math.random(),
			function() {
				if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
					var options = MODULE['page'
							+ PageModuleUtils
									.getModuleName(MODULE.attr('name'))]('option');
					if (options.cats) {// 根分类
						var cats = options.cats.split(',');
						for (var i = 0; i < cats.length; i++) {
							$('#module-content input[type="checkbox"][name="tabnav-cat"][value="'
									+ cats[i] + '"]').attr('checked', true);
						}
					}
					if (options.color) {
						$('#module-content input[type="radio"][name="tabnav-color"][value="'
								+ options.color + '"]').attr('checked', true);
					}
				}
				$('#module-content input[type="checkbox"][name="tabnav-cat"]')
						.change(function() {
							var checkeds = $('#module-content input[type="checkbox"][name="tabnav-cat"]:checked');
							if (checkeds.length > 8) {
								alert('您最多可以选择8个导购分类');
								$(this).attr('checked', false);
								return;
							}
						});
				if (func && typeof(func) == 'function') {
					func();
				}
			});
	return true;
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopTabNavModuleConfig() {
	var checkeds = $('#module-content input[type="checkbox"][name="tabnav-cat"]:checked');
	if (checkeds.length == 0) {
		alert('您尚未选择导购分类');
		return false;
	}
	if (checkeds.length > 8) {
		alert('您最多可以选择8个导购分类');
		return false;
	}
	return true;
}
/**
 * 新增模块
 * 
 * @param {}
 *            name
 * @param {}
 *            title
 * @param {}
 *            region
 * @param {}
 *            next
 * @param {}
 *            func
 */
function createShopTabNavModuleContent(name, title, region, next, func) {
	var params = {};
	params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
	var cats = [];
	$('#module-content input[type="checkbox"][name="tabnav-cat"]:checked')
			.each(function() {
						cats.push($(this).val());
					});
	params.cats = cats.join(',');
	params.color = $('#module-content input[type="radio"][name="tabnav-color"]:checked')
			.val();
	PageUtils.addModule(name, title, region, next, params, function(data) {
				if (func) {
					$('.sub-menu-popup').remove();
					func(data);
				}
			});

}
/**
 * 更新模块
 * 
 * @param {}
 *            id
 * @param {}
 *            title
 * @param {}
 *            func
 */
function updateShopTabNavModuleContent(id, title, func) {
	var params = {};
	params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
	var cats = [];
	$('#module-content input[type="checkbox"][name="tabnav-cat"]:checked')
			.each(function() {
						cats.push($(this).val());
					});
	params.cats = cats.join(',');
	params.color = $('#module-content input[type="radio"][name="tabnav-color"]:checked')
			.val();
	PageUtils.updateModule(id, title, params, function(data) {
				if (func) {
					$('.sub-menu-popup').remove();
					func(data);
				}
			});
}