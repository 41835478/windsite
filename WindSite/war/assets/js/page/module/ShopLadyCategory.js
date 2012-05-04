/**
 * 女装分类
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopLadyCategory", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'false'
					// 默认显示标题栏
				},
				_initModule : function() {
				},
				/**
				 * 返回当前模块源码
				 */
				toSource : function(isValidate) {

				}

			});
})(jQuery);

/**
 * 初始化模块内容编辑页面
 */
function initShopLadyCategoryModuleConfig(func) {
	$('#module-content').load(
			'/assets/js/page/module/CommonLadyCatConfig.html?v='
					+ Math.random(), function() {
				if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
					var options = MODULE['page'
							+ PageModuleUtils
									.getModuleName(MODULE.attr('name'))]('option');
					if (options.cats) {// 根分类
						var cats = options.cats.split(',');
						for (var i = 0; i < cats.length; i++) {
							$('#module-content input[type="checkbox"][name="lady-cat"][value="'
									+ cats[i] + '"]').attr('checked', true);
						}
					}
				}
				$('#module-content input[type="checkbox"][name="lady-cat"]')
						.change(function() {
							var checkeds = $('#module-content input[type="checkbox"][name="lady-cat"]:checked');
							if (checkeds.length > 20) {
								alert('您最多可以选择20个女装二级分类');
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
function validateShopLadyCategoryModuleConfig() {
	var checkeds = $('#module-content input[type="checkbox"][name="lady-cat"]:checked');
	if (checkeds.length == 0) {
		alert('您尚未选择女装二级分类');
		return false;
	}
	if (checkeds.length > 20) {
		alert('您最多可以选择20个女装二级分类');
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
function createShopLadyCategoryModuleContent(name, title, region, next, func) {
	var params = {};
	params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
	var cats = [];
	$('#module-content input[type="checkbox"][name="lady-cat"]:checked').each(
			function() {
				cats.push($(this).val());
			});
	params.cats = cats.join(',');
	PageUtils.addModule(name, title, region, next, params, function(data) {
				if (func) {
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
function updateShopLadyCategoryModuleContent(id, title, func) {
	var params = {};
	params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
	var cats = [];
	$('#module-content input[type="checkbox"][name="lady-cat"]:checked').each(
			function() {
				cats.push($(this).val());
			});
	params.cats = cats.join(',');
	PageUtils.updateModule(id, title, params, function(data) {
				if (func) {
					func(data);
				}
			});
}