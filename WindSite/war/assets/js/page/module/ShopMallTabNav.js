/**
 * 页头浮动分类（返利商城）
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopMallTabNav", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'false'
					// 默认显示标题栏
				},
				_initModule : function() {
					PageModuleUtils.initShopMallTabNav(this.element);
				}
			});
})(jQuery);

/**
 * 初始化模块内容编辑页面
 */
function initShopMallTabNavModuleConfig(func) {
	$.ajax({
		url : '/router/member/page/config/mallCats?v=' + Math.random(),
		type : 'GET',
		data : {
			layout : $('#page-module-editor').pageModuleEditor('option',
					'layout'),
			module : $('#page-module-editor').pageModuleEditor('option',
					'module')
		},
		dataType : 'html',
		beforeSend : function(xhr) {
			xhr.setRequestHeader("WindType", "AJAX");// 请求方式
			xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
		},
		error : function(request, textStatus, errorThrown) {
			alert('网络错误:' + textStatus);
			return;
		},
		success : function(data) {
			$('#module-content').empty().append(data);
			if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
				var options = MODULE['page'
						+ PageModuleUtils.getModuleName(MODULE.attr('name'))]('option');
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
							alert('您最多可以选择8个商城分类');
							$(this).attr('checked', false);
							return;
						}
					});
			if (func && typeof(func) == 'function') {
				func();
			}
		}
	});
	return true;
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopMallTabNavModuleConfig() {
	var checkeds = $('#module-content input[type="checkbox"][name="tabnav-cat"]:checked');
	if (checkeds.length == 0) {
		alert('您尚未选择商城分类');
		return false;
	}
	if (checkeds.length > 8) {
		alert('您最多可以选择8个商城分类');
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
function createShopMallTabNavModuleContent(name, title, region, next, func) {
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
function updateShopMallTabNavModuleContent(id, title, func) {
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