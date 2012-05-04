/**
 * 店铺排行榜
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopDianpuPaiHang", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'false'
					// 默认显示标题栏
				},
				_initModule : function() {
					// PageModuleUtils.initShopDianpuPaiHang(this.element);
				}
			});
})(jQuery);

/**
 * 初始化模块内容编辑页面
 */
function initShopDianpuPaiHangModuleConfig(func) {
	var PH_LIMIT = 12;
	$('#module-content').load(
			'/assets/js/page/module/ShopDianpuPaihangConfig.html?v='
					+ Math.random(), function() {
				if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
					var options = MODULE['page'
							+ PageModuleUtils
									.getModuleName(MODULE.attr('name'))]('option');
					if (options.cats) {// 根分类
						var cats = options.cats.split(',');
						for (var i = 0; i < cats.length; i++) {
							$('#module-content input[type="checkbox"][name="dianpupaihang-cat"][value="'
									+ cats[i] + '"]').attr('checked', true);
						}
					}
				}
				$('#module-content input[type="checkbox"][name="dianpupaihang-cat"]')
						.change(function() {
							var checkeds = $('#module-content input[type="checkbox"][name="dianpupaihang-cat"]:checked');
							if (checkeds.length > 12) {
								alert('您最多可以选择12个店铺排行榜分类');
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
function validateShopDianpuPaiHangModuleConfig() {
	var checkeds = $('#module-content input[type="checkbox"][name="dianpupaihang-cat"]:checked');
	if (checkeds.length == 0) {
		alert('您尚未选择店铺排行榜分类');
		return false;
	}
	if (checkeds.length > 12) {
		alert('您最多可以选择12个店铺排行榜分类');
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
function createShopDianpuPaiHangModuleContent(name, title, region, next, func) {
	var params = {};
	params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
	var cats = [];
	$('#module-content input[type="checkbox"][name="dianpupaihang-cat"]:checked')
			.each(function() {
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
function updateShopDianpuPaiHangModuleContent(id, title, func) {
	var params = {};
	params.isHd = $('#module-ishd').attr('checked') + "";// 是否显示标题
	var cats = [];
	$('#module-content input[type="checkbox"][name="dianpupaihang-cat"]:checked')
			.each(function() {
						cats.push($(this).val());
					});
	params.cats = cats.join(',');
	PageUtils.updateModule(id, title, params, function(data) {
				if (func) {
					func(data);
				}
			});
}