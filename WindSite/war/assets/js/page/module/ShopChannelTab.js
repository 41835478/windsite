/**
 * 内嵌模块
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopChannelTab", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'false'
					// 默认不显示标题栏
				},
				_initModule : function() {
				}
			});
})(jQuery);

/**
 * 初始化模块内容编辑页面
 */
function initShopChannelTabModuleConfig(func) {
	var layout = $('#page-module-editor').pageModuleEditor('option', 'layout');
	$('#module-content')
			.empty()
			.append('<div id="shop-channeltab-editor" style="width:400px;" align="center"><input type="hidden" id="channeltab-layout" value="'
					+ layout
					+ '"><input type="radio" name="channeltab" value="beauty" checked>美容咨询组件&nbsp;&nbsp;&nbsp;'
					+ (layout != '1'
							? '<input type="radio" name="channeltab" value="channel">网站内嵌模块（热卖关键词及商品）'
							: '') + '</div>');
	if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
		var channel = $('.shop-channeltab', MODULE).attr('channel');
		if (channel) {
			$('#shop-channeltab-editor input[type="radio"][name="channeltab"][value="'
					+ channel + '"]').attr('checked', true);
		}
	}
	if (func && typeof(func) == 'function') {
		func();
	}
	return true;
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopChannelTabModuleConfig() {
	var checked = $('#shop-channeltab-editor input[type="radio"][name="channeltab"]:checked');
	if (checked.length == 0) {
		alert('您尚未选择要添加的内嵌模块');
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
function createShopChannelTabModuleContent(name, title, region, next, func) {
	PageUtils.addModule(name, title, region, next, {
		isHd : ($('#module-ishd').attr('checked') + ""),
		channel : $('#shop-channeltab-editor input[type="radio"][name="channeltab"]:checked')
				.val(),
		layout : $('#channeltab-layout').val() + ''
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
function updateShopChannelTabModuleContent(id, title, func) {
	PageUtils.updateModule(id, title, {
		isHd : ($('#module-ishd').attr('checked') + ""),
		channel : $('#shop-channeltab-editor input[type="radio"][name="channeltab"]:checked')
				.val(),
		layout : $('#channeltab-layout').val() + ''
	}, function(data) {
		if (func) {
			func(data);
		}
	});
}