/**
 * 显示组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopDetailHot", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'true'
					// 默认不显示标题栏
				},
				_initModule : function() {
					PageModuleUtils.initShopDetailHot(this.element);
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
function initShopDetailHotModuleConfig(func) {
	$('#module-content')
			.empty()
			.append('<div id="shop-detailhot-editor" style="width:400px;" align="center"><div class="help_info" align="left" style="position:relative;"><h3>1.此模块根据当前的宝贝来显示该宝贝的同类热卖商品</h3><h3>2.不同分类（店铺）的商品显示的热卖商品列表不同。</h3></div><br/><input type="radio" name="detailHot" value="cat" checked>分类相关(根据宝贝所属分类)&nbsp;&nbsp;&nbsp;<input type="radio" name="detailHot" value="seller">店铺相关（根据宝贝所在店铺）<br/>显示数量<select id="J_ShopDetailHotCount"><option value="5" selected>5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></div>');
	if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
		var count = $('.shop-detailhot', MODULE).attr('data-count');
		var rtype = $('.shop-detailhot', MODULE).attr('data-rtype');
		if (rtype) {
			$('#shop-detailhot-editor input[type="radio"][name="detailHot"][value="'
					+ rtype + '"]').attr('checked', true);
		}
		if (count) {
			$('#J_ShopDetailHotCount').val(count);
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
function validateShopDetailHotModuleConfig() {
	var checked = $('#shop-detailhot-editor input[type="radio"][name="detailHot"]:checked');
	if (checked.length == 0) {
		alert('您尚未选择要显示的同类宝贝推荐类型');
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
function createShopDetailHotModuleContent(name, title, region, next, func) {
	PageUtils.addModule(name, title, region, next, {
		isHd : ($('#module-ishd').attr('checked') + ""),
		rtype : $('#shop-detailhot-editor input[type="radio"][name="detailHot"]:checked')
				.val(),
		count : $('#J_ShopDetailHotCount').val() + ''
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
function updateShopDetailHotModuleContent(id, title, func) {
	PageUtils.updateModule(id, title, {
		isHd : $('#module-ishd').attr('checked') + "",
		rtype : $('#shop-detailhot-editor input[type="radio"][name="detailHot"]:checked')
				.val(),
		count : $('#J_ShopDetailHotCount').val() + ''
	}, function(data) {
		if (func) {
			func(data);
		}
	});
}