/**
 * 自定义组件（html编辑器）
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopCustom", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'true'
					// 默认不显示标题栏
				},
				_initModule : function() {
					// PageModuleUtils.initShopFlashShow(this.element);
				}
			});
})(jQuery);

/**
 * 初始化模块内容编辑页面
 */
function initShopCustomModuleConfig(func) {
	$('#module-content')
			.empty()
			.append('<textarea id="kissyTextArea" style="width:98%;height:250px"></textarea>');
	if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
		$('#kissyTextArea').val(MODULE.find('.custom-area').html());
	}
	PageUtils.initKissyEditor();
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
function validateShopCustomModuleConfig() {
	var html = KEDITOR.getData();
	if (!html) {
		alert('您尚未编辑内容');
		return false;
	} else {
		if (/J_TRegion|J_TBox/gi.test(html)) {
			alert('系统检测到您的源码当中含有非法样式名称【如:J_TRegion,J_TBox】，请修改');
			return false;
		}
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
function createShopCustomModuleContent(name, title, region, next, func) {
	var html = KEDITOR.getData();
	var div = $('<div></div>').html(html);
	var p = div.find('p:first');
	if (p.length == 1 && '&nbsp;' == p.html()) {
		p.remove();// 移除第一个空P
	}
	p = div.find('p:last');
	if (p.length == 1 && '&nbsp;' == p.html()) {
		p.remove();// 移除最后一个空P
	}
	PageUtils.addModule(name, title, region, next, {
				isHd : ($('#module-ishd').attr('checked') + ""),
				bd : $('<div></div>').text(div.html()).html()
			}, function(data) {
				if (func) {
					KEDITOR.setData('');
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
function updateShopCustomModuleContent(id, title, func) {
	var html = KEDITOR.getData();
	var html = KEDITOR.getData();
	var div = $('<div></div>').html(html);
	var p = div.find('p:first');
	if (p.length == 1 && '&nbsp;' == p.html()) {
		p.remove();// 移除第一个空P
	}
	p = div.find('p:last');
	if (p.length == 1 && '&nbsp;' == p.html()) {
		p.remove();// 移除最后一个空P
	}
	PageUtils.updateModule(id, title, {
				isHd : $('#module-ishd').attr('checked') + "",
				bd : $('<div></div>').text(div.html()).html()
			}, function(data) {
				if (func) {
					KEDITOR.setData('');
					func(data);
				}
			});
}