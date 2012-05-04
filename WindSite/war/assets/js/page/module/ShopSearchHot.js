/**
 * 显示组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopSearchHot", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'true'
					// 默认不显示标题栏
				},
				_initModule : function() {
					PageModuleUtils.initShopSearchHot(this.element);
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
function initShopSearchHotModuleConfig(func) {
	$('#module-content')
			.empty()
			.append('<div id="shop-searchhot-editor" style="width:500px;" align="center"><div class="help_info" align="left" style="position:relative;"><h3>1.此模块根据当前的搜索关键词或分类来显示该宝贝的同类推荐商品</h3><h3>2.不同关键词，分类显示的推荐商品列表不同。</h3></div><br/>排序方式：<input type="radio" name="searchhot" value="commissionNum_desc" checked>成交量&nbsp;&nbsp;&nbsp;<input type="radio" name="searchhot" value="commissionVolume_desc">总支出佣金&nbsp;&nbsp;&nbsp;<input type="radio" name="searchhot" value="credit_desc">信用等级<br/>显示数量<select id="J_ShopSearchHotCount"><option value="5" selected>5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></div>');
	if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
		var count = $('.shop-searchhot', MODULE).attr('data-count');
		var sort = $('.shop-searchhot', MODULE).attr('data-sort');
		if (sort) {
			$('#shop-searchhot-editor input[type="radio"][name="searchhot"][value="'
					+ sort + '"]').attr('checked', true);
		}
		if (count) {
			$('#J_ShopSearchHotCount').val(count);
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
function validateShopSearchHotModuleConfig() {
	var checked = $('#shop-searchhot-editor input[type="radio"][name="searchhot"]:checked');
	if (checked.length == 0) {
		alert('您尚未选择要显示的热卖宝贝排序方式');
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
function createShopSearchHotModuleContent(name, title, region, next, func) {
	PageUtils.addModule(name, title, region, next, {
		isHd : ($('#module-ishd').attr('checked') + ""),
		sort : $('#shop-searchhot-editor input[type="radio"][name="searchhot"]:checked')
				.val(),
		count : $('#J_ShopSearchHotCount').val() + ''
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
function updateShopSearchHotModuleContent(id, title, func) {
	PageUtils.updateModule(id, title, {
		isHd : $('#module-ishd').attr('checked') + "",
		sort : $('#shop-searchhot-editor input[type="radio"][name="searchhot"]:checked')
				.val(),
		count : $('#J_ShopSearchHotCount').val() + ''
	}, function(data) {
		if (func) {
			func(data);
		}
	});
}