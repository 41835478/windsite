/**
 * 分类模块
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopLogo", $.ui.pageModule, {
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
function initShopLogoModuleConfig(func) {
	$('#module-content')
			.empty()
			.append('<form id="shop-logo-editor" style="margin-left:25px;"><div class="rowElem ks-clear "><label class="label-key">LOGO的图片地址:</label><input id="shop-logo-url" type="text" size=50 /></div><div class="help_info" align="left" style="position:relative;"><p>LOGO目前支持的大小为宽度不能大于250px,高度不能大于70px;支持格式gif,jpg,png,jpeg</p></div></form>');
	if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
		var logo = MODULE.find('.logo img');
		if (logo.length == 1) {
			$('#shop-logo-url').val(logo.attr('src'));
		}
	}

	if (func) {
		func();
	}
	return true;
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopLogoModuleConfig() {
	var reg = /^.+.(gif|jpg|png|jpeg)$/i;
	if (!reg.test($('#shop-logo-url').val())) {
		alert('LOGO的图片地址不正确，目前仅支持gif，jpg，png，jpeg格式');
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
function createShopLogoModuleContent(name, title, region, next, func) {
	PageUtils.addModule(name, title, region, next, {
				logo : $('#shop-logo-url').val()
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
function updateShopLogoModuleContent(id, title, func) {
	PageUtils.updateModule(id, title, {
				logo : $('#shop-logo-url').val()
			}, function(data) {
				if (func) {
					func(data);
				}
			});
}