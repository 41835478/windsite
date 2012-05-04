/**
 * 显示组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopFlashShow", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'false'
					// 默认不显示标题栏
				},
				_initModule : function() {
					PageModuleUtils.initShopFlashShow(this.element);
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
function initShopFlashShowModuleConfig(func) {
	PageUtils.loadCommonModuleConfig('ShopFlashShow', function() {
				if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
					var options = MODULE.pageShopFlashShow('option');
					$('#shopflashshow-flash').val(options.flash);
				}
				if (func) {
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
function validateShopFlashShowModuleConfig() {
	var url = $('#shopflashshow-flash').val();
	if (!url) {
		alert('阿里妈妈广告牌地址不能为空');
		$('#shopflashshow-flash').focus();
		return false;
	}
	if (!PageUtils.validateAlimamaFlashBM(url)) {
		$('#shopflashshow-flash').focus();
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
function createShopFlashShowModuleContent(name, title, region, next, func) {
	PageUtils.addModule(name, title, region, next, {
				flash : $('#shopflashshow-flash').val(),
				isHd : ($('#module-ishd').attr('checked') + "")
			}, function(data) {
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
function updateShopFlashShowModuleContent(id, title, func) {
	PageUtils.updateModule(id, title, {
				flash : $('#shopflashshow-flash').val(),
				isHd : $('#module-ishd').attr('checked') + ""
			}, function(data) {
				if (func) {
					func(data);
				}
			});
}